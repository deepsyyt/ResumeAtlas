-- Ensure billing + analysis quota tables exist (safe to run multiple times).
-- Run this in Supabase SQL Editor if create-order fails or analysis usage limit does not reduce.

-- analysis_usage: required for free ATS scan quota (rolling 24h)
create table if not exists public.analysis_usage (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  anonymous_id uuid,
  ip_hash text,
  created_at timestamptz not null default now(),
  resume_hash text,
  jd_hash text,
  source text,
  metadata jsonb,
  constraint analysis_usage_identity_check check (user_id is not null or anonymous_id is not null)
);

alter table public.analysis_usage enable row level security;

create index if not exists analysis_usage_user_created_idx
  on public.analysis_usage (user_id, created_at desc) where user_id is not null;

create index if not exists analysis_usage_anon_created_idx
  on public.analysis_usage (anonymous_id, created_at desc) where anonymous_id is not null;

create index if not exists analysis_usage_ip_created_idx
  on public.analysis_usage (ip_hash, created_at desc) where ip_hash is not null;

-- billing tables
create table if not exists public.credit_wallets (
  user_id uuid primary key references auth.users (id) on delete cascade,
  credits_remaining int not null default 0 check (credits_remaining >= 0),
  credits_reserved int not null default 0 check (credits_reserved >= 0),
  credits_purchased_total int not null default 0 check (credits_purchased_total >= 0),
  credits_consumed_total int not null default 0 check (credits_consumed_total >= 0),
  updated_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  package_id text not null,
  provider text not null default 'razorpay',
  provider_order_id text not null,
  provider_payment_id text,
  amount int not null,
  currency text not null default 'USD',
  status text not null check (status in ('created', 'paid', 'failed', 'refunded')),
  credits_granted int not null default 0 check (credits_granted >= 0),
  created_at timestamptz not null default now(),
  unique (provider, provider_order_id)
);

create index if not exists payments_user_id_idx on public.payments (user_id);
create index if not exists payments_status_idx on public.payments (status);

create table if not exists public.credit_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  type text not null check (type in ('purchase', 'consume', 'refund', 'admin_adjustment')),
  credits int not null,
  payment_id uuid references public.payments (id) on delete set null,
  optimization_id uuid,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create index if not exists credit_transactions_user_id_idx on public.credit_transactions (user_id);

create table if not exists public.optimizations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  resume_hash text,
  jd_hash text,
  status text not null check (status in ('reserved', 'succeeded', 'failed')),
  credit_consumed boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists optimizations_user_id_idx on public.optimizations (user_id);

alter table public.credit_wallets enable row level security;
alter table public.payments enable row level security;
alter table public.credit_transactions enable row level security;
alter table public.optimizations enable row level security;

-- Create billing functions
create or replace function public.billing_reserve_optimization (
  p_user_id uuid,
  p_resume_hash text,
  p_jd_hash text
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
  v_updated int;
begin
  insert into credit_wallets (user_id)
  values (p_user_id)
  on conflict (user_id) do nothing;

  update credit_wallets w
  set
    credits_remaining = w.credits_remaining - 1,
    credits_reserved = w.credits_reserved + 1,
    updated_at = now()
  where w.user_id = p_user_id and w.credits_remaining > 0;

  get diagnostics v_updated = row_count;
  if v_updated = 0 then
    return jsonb_build_object('ok', false, 'code', 'NO_CREDITS');
  end if;

  insert into optimizations (user_id, resume_hash, jd_hash, status)
  values (p_user_id, nullif(trim(p_resume_hash), ''), nullif(trim(p_jd_hash), ''), 'reserved')
  returning id into v_id;

  return jsonb_build_object('ok', true, 'optimization_id', v_id);
end;
$$;

create or replace function public.billing_finalize_optimization (
  p_optimization_id uuid,
  p_user_id uuid,
  p_success boolean
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  st text;
begin
  select o.status into st
  from optimizations o
  where o.id = p_optimization_id and o.user_id = p_user_id
  for update;

  if st is null then
    return jsonb_build_object('ok', false, 'code', 'NOT_FOUND');
  end if;

  if st <> 'reserved' then
    return jsonb_build_object('ok', false, 'code', 'BAD_STATE');
  end if;

  if p_success then
    update optimizations set status = 'succeeded', credit_consumed = true
    where id = p_optimization_id;
    update credit_wallets
    set credits_reserved = credits_reserved - 1, credits_consumed_total = credits_consumed_total + 1, updated_at = now()
    where user_id = p_user_id and credits_reserved > 0;
    insert into credit_transactions (user_id, type, credits, optimization_id)
    values (p_user_id, 'consume', -1, p_optimization_id);
  else
    update optimizations set status = 'failed', credit_consumed = false
    where id = p_optimization_id;
    update credit_wallets
    set credits_reserved = credits_reserved - 1, credits_remaining = credits_remaining + 1, updated_at = now()
    where user_id = p_user_id and credits_reserved > 0;
    insert into credit_transactions (user_id, type, credits, optimization_id)
    values (p_user_id, 'refund', 1, p_optimization_id);
  end if;

  return jsonb_build_object('ok', true);
end;
$$;

create or replace function public.billing_grant_credits (
  p_user_id uuid,
  p_payment_id uuid,
  p_credits int
) returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_credits <= 0 then return; end if;

  insert into credit_wallets (user_id) values (p_user_id)
  on conflict (user_id) do nothing;

  update credit_wallets
  set credits_remaining = credits_remaining + p_credits,
      credits_purchased_total = credits_purchased_total + p_credits,
      updated_at = now()
  where user_id = p_user_id;

  insert into credit_transactions (user_id, type, credits, payment_id)
  values (p_user_id, 'purchase', p_credits, p_payment_id);
end;
$$;

revoke all on function public.billing_reserve_optimization (uuid, text, text) from public;
revoke all on function public.billing_finalize_optimization (uuid, uuid, boolean) from public;
revoke all on function public.billing_grant_credits (uuid, uuid, int) from public;

grant execute on function public.billing_reserve_optimization (uuid, text, text) to service_role;
grant execute on function public.billing_finalize_optimization (uuid, uuid, boolean) to service_role;
grant execute on function public.billing_grant_credits (uuid, uuid, int) to service_role;
