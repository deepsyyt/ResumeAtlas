-- Allow a new job check to replace an in-progress application (analyze → optimize → download
-- is one credit, but users may start another check without downloading the prior job).

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
    update job_applications
    set
      state = 'completed',
      updated_at = now()
    where
      id = v_active
      and user_id = p_user_id
      and state in ('analyzed', 'optimized');

    update credit_wallets
    set
      active_application_id = null,
      funnel_resume_hash = null,
      funnel_jd_hash = null,
      funnel_stage = null,
      funnel_source = null,
      updated_at = now()
    where user_id = p_user_id;
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
