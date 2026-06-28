-- Returns up to N profile emails ordered by auth.users.created_at (newest first).
-- Used by the daily Resend campaign cron (service role only).

create or replace function public.recent_profile_emails_for_campaign(recipient_limit int default 100)
returns setof text
language sql
security definer
set search_path = public, auth
as $$
  select p.email
  from public.profiles p
  inner join auth.users u on u.id = p.id
  where p.email is not null
    and trim(p.email) <> ''
  order by u.created_at desc
  limit greatest(recipient_limit, 0);
$$;

revoke all on function public.recent_profile_emails_for_campaign(int) from public;
grant execute on function public.recent_profile_emails_for_campaign(int) to service_role;

comment on function public.recent_profile_emails_for_campaign(int) is
  'Most recent profile emails for the daily Resend campaign (max 100 by default).';
