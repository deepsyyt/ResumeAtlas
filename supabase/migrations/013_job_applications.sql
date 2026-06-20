-- Option A: deduct pack credit at scan; track job application state on server.

create table if not exists public.job_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  state text not null check (state in ('analyzed', 'optimized', 'completed')),
  source text not null check (source in ('free', 'pack')),
  resume_hash text,
  jd_hash text,
  resume_text text,
  job_description text,
  analysis_result jsonb,
  credit_deducted boolean not null default false,
  download_unlocked boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists job_applications_user_id_idx on public.job_applications (user_id);
create index if not exists job_applications_user_state_idx on public.job_applications (user_id, state);

alter table public.credit_wallets
  add column if not exists active_application_id uuid references public.job_applications (id) on delete set null;

alter table public.job_applications enable row level security;

create or replace function public.billing_start_application (
  p_user_id uuid,
  p_resume_hash text,
  p_jd_hash text,
  p_source text,
  p_resume_text text,
  p_job_description text,
  p_analysis jsonb
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_active uuid;
  v_app_id uuid;
  v_updated int;
begin
  if p_source not in ('free', 'pack') then
    return jsonb_build_object('ok', false, 'code', 'BAD_SOURCE');
  end if;

  insert into credit_wallets (user_id)
  values (p_user_id)
  on conflict (user_id) do nothing;

  select active_application_id into v_active
  from credit_wallets
  where user_id = p_user_id
  for update;

  if v_active is not null then
    return jsonb_build_object('ok', false, 'code', 'INCOMPLETE_APPLICATION');
  end if;

  if p_source = 'pack' then
    update credit_wallets w
    set
      credits_remaining = w.credits_remaining - 1,
      credits_consumed_total = w.credits_consumed_total + 1,
      updated_at = now()
    where
      w.user_id = p_user_id
      and w.credits_remaining > 0;

    get diagnostics v_updated = row_count;
    if v_updated = 0 then
      return jsonb_build_object('ok', false, 'code', 'NO_CREDITS');
    end if;

    insert into credit_transactions (user_id, type, credits)
    values (p_user_id, 'consume', -1);
  end if;

  insert into job_applications (
    user_id,
    state,
    source,
    resume_hash,
    jd_hash,
    resume_text,
    job_description,
    analysis_result,
    credit_deducted
  )
  values (
    p_user_id,
    'analyzed',
    p_source,
    nullif(trim(p_resume_hash), ''),
    nullif(trim(p_jd_hash), ''),
    nullif(left(p_resume_text, 12000), ''),
    nullif(left(p_job_description, 12000), ''),
    p_analysis,
    p_source = 'pack'
  )
  returning id into v_app_id;

  update credit_wallets w
  set
    active_application_id = v_app_id,
    funnel_resume_hash = nullif(trim(p_resume_hash), ''),
    funnel_jd_hash = nullif(trim(p_jd_hash), ''),
    funnel_stage = 'analyzed',
    funnel_source = p_source,
    updated_at = now()
  where w.user_id = p_user_id;

  return jsonb_build_object(
    'ok',
    true,
    'application_id',
    v_app_id,
    'state',
    'analyzed',
    'source',
    p_source,
    'credit_used',
    p_source = 'pack'
  );
end;
$$;

create or replace function public.billing_advance_application (
  p_user_id uuid
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_app_id uuid;
  v_updated int;
begin
  select active_application_id into v_app_id
  from credit_wallets
  where user_id = p_user_id
  for update;

  if v_app_id is null then
    return jsonb_build_object('ok', false, 'code', 'NO_ACTIVE_APPLICATION');
  end if;

  update job_applications
  set
    state = 'optimized',
    updated_at = now()
  where
    id = v_app_id
    and user_id = p_user_id
    and state = 'analyzed';

  get diagnostics v_updated = row_count;
  if v_updated = 0 then
    return jsonb_build_object('ok', false, 'code', 'BAD_STATE');
  end if;

  update credit_wallets
  set
    funnel_stage = 'optimized',
    updated_at = now()
  where user_id = p_user_id;

  return jsonb_build_object('ok', true, 'state', 'optimized');
end;
$$;

create or replace function public.billing_complete_application (
  p_user_id uuid
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_app_id uuid;
  v_source text;
  v_unlocked boolean;
  v_updated int;
begin
  select w.active_application_id, a.source, a.download_unlocked
  into v_app_id, v_source, v_unlocked
  from credit_wallets w
  join job_applications a on a.id = w.active_application_id
  where w.user_id = p_user_id
  for update of w;

  if v_app_id is null then
    return jsonb_build_object('ok', false, 'code', 'NO_ACTIVE_APPLICATION');
  end if;

  if v_source = 'free' and not coalesce(v_unlocked, false) then
    return jsonb_build_object('ok', false, 'code', 'DOWNLOAD_PAYMENT_REQUIRED');
  end if;

  update job_applications
  set
    state = 'completed',
    updated_at = now()
  where
    id = v_app_id
    and user_id = p_user_id
    and state = 'optimized';

  get diagnostics v_updated = row_count;
  if v_updated = 0 then
    return jsonb_build_object('ok', false, 'code', 'BAD_STATE');
  end if;

  update credit_wallets
  set
    active_application_id = null,
    funnel_resume_hash = null,
    funnel_jd_hash = null,
    funnel_stage = null,
    funnel_source = null,
    updated_at = now()
  where user_id = p_user_id;

  return jsonb_build_object('ok', true, 'state', 'completed');
end;
$$;

create or replace function public.billing_unlock_application_download (
  p_user_id uuid
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_app_id uuid;
  v_updated int;
begin
  select active_application_id into v_app_id
  from credit_wallets
  where user_id = p_user_id
  for update;

  if v_app_id is null then
    return jsonb_build_object('ok', false, 'code', 'NO_ACTIVE_APPLICATION');
  end if;

  update job_applications
  set
    download_unlocked = true,
    updated_at = now()
  where
    id = v_app_id
    and user_id = p_user_id
    and source = 'free'
    and state = 'optimized';

  get diagnostics v_updated = row_count;
  if v_updated = 0 then
    return jsonb_build_object('ok', false, 'code', 'BAD_STATE');
  end if;

  return jsonb_build_object('ok', true);
end;
$$;

revoke all on function public.billing_start_application (uuid, text, text, text, text, text, jsonb) from public;
revoke all on function public.billing_advance_application (uuid) from public;
revoke all on function public.billing_complete_application (uuid) from public;
revoke all on function public.billing_unlock_application_download (uuid) from public;

grant execute on function public.billing_start_application (uuid, text, text, text, text, text, jsonb) to service_role;
grant execute on function public.billing_advance_application (uuid) to service_role;
grant execute on function public.billing_complete_application (uuid) to service_role;
grant execute on function public.billing_unlock_application_download (uuid) to service_role;
