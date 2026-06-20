-- Funnel billing: one credit = scan → optimize → download (logged-in users).
-- credits_remaining = unused funnel credits; credits_reserved = funnel opened, awaiting download.

alter table public.credit_wallets
  add column if not exists funnel_resume_hash text,
  add column if not exists funnel_jd_hash text,
  add column if not exists funnel_stage text check (
    funnel_stage is null
    or funnel_stage in ('analyzed', 'optimized')
  ),
  add column if not exists funnel_source text check (
    funnel_source is null
    or funnel_source in ('free', 'pack')
  );

create or replace function public.billing_open_funnel (
  p_user_id uuid,
  p_resume_hash text,
  p_jd_hash text,
  p_source text
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_stage text;
  v_updated int;
begin
  if p_source not in ('free', 'pack') then
    return jsonb_build_object('ok', false, 'code', 'BAD_SOURCE');
  end if;

  insert into credit_wallets (user_id)
  values (p_user_id)
  on conflict (user_id) do nothing;

  select funnel_stage into v_stage
  from credit_wallets
  where user_id = p_user_id
  for update;

  if v_stage is not null then
    return jsonb_build_object('ok', false, 'code', 'INCOMPLETE_FUNNEL');
  end if;

  if p_source = 'pack' then
    update credit_wallets w
    set
      credits_remaining = w.credits_remaining - 1,
      credits_reserved = w.credits_reserved + 1,
      funnel_resume_hash = nullif(trim(p_resume_hash), ''),
      funnel_jd_hash = nullif(trim(p_jd_hash), ''),
      funnel_stage = 'analyzed',
      funnel_source = 'pack',
      updated_at = now()
    where
      w.user_id = p_user_id
      and w.credits_remaining > 0
      and w.funnel_stage is null;

    get diagnostics v_updated = row_count;
    if v_updated = 0 then
      return jsonb_build_object('ok', false, 'code', 'NO_CREDITS');
    end if;
  else
    update credit_wallets w
    set
      funnel_resume_hash = nullif(trim(p_resume_hash), ''),
      funnel_jd_hash = nullif(trim(p_jd_hash), ''),
      funnel_stage = 'analyzed',
      funnel_source = 'free',
      updated_at = now()
    where
      w.user_id = p_user_id
      and w.funnel_stage is null;

    get diagnostics v_updated = row_count;
    if v_updated = 0 then
      return jsonb_build_object('ok', false, 'code', 'INCOMPLETE_FUNNEL');
    end if;
  end if;

  return jsonb_build_object('ok', true, 'stage', 'analyzed', 'source', p_source);
end;
$$;

create or replace function public.billing_advance_funnel (
  p_user_id uuid
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_updated int;
begin
  update credit_wallets w
  set
    funnel_stage = 'optimized',
    updated_at = now()
  where
    w.user_id = p_user_id
    and w.funnel_stage = 'analyzed';

  get diagnostics v_updated = row_count;
  if v_updated = 0 then
    return jsonb_build_object('ok', false, 'code', 'BAD_FUNNEL_STAGE');
  end if;

  return jsonb_build_object('ok', true, 'stage', 'optimized');
end;
$$;

create or replace function public.billing_complete_funnel (
  p_user_id uuid
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_source text;
  v_updated int;
begin
  select funnel_source into v_source
  from credit_wallets
  where user_id = p_user_id
    and funnel_stage = 'optimized'
  for update;

  if v_source is null then
    return jsonb_build_object('ok', false, 'code', 'BAD_FUNNEL_STAGE');
  end if;

  update credit_wallets w
  set
    funnel_resume_hash = null,
    funnel_jd_hash = null,
    funnel_stage = null,
    funnel_source = null,
    updated_at = now()
  where
    w.user_id = p_user_id
    and w.funnel_stage = 'optimized';

  if v_source = 'pack' then
    update credit_wallets w
    set
      credits_reserved = greatest(w.credits_reserved - 1, 0),
      credits_consumed_total = w.credits_consumed_total + 1,
      updated_at = now()
    where w.user_id = p_user_id;

    insert into credit_transactions (user_id, type, credits)
    values (p_user_id, 'consume', -1);
  end if;

  return jsonb_build_object('ok', true);
end;
$$;

revoke all on function public.billing_open_funnel (uuid, text, text, text) from public;
revoke all on function public.billing_advance_funnel (uuid) from public;
revoke all on function public.billing_complete_funnel (uuid) from public;

grant execute on function public.billing_open_funnel (uuid, text, text, text) to service_role;
grant execute on function public.billing_advance_funnel (uuid) to service_role;
grant execute on function public.billing_complete_funnel (uuid) to service_role;
