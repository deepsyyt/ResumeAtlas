-- Link analysis_events to auth users (for mail_id + future backfills).
alter table public.analysis_events add column if not exists user_id uuid references auth.users (id) on delete set null;

create index if not exists analysis_events_user_id_idx
  on public.analysis_events (user_id, created_at desc)
  where user_id is not null;

comment on column public.analysis_events.user_id is 'auth.users.id when the event was logged while signed in.';

-- payments.email: fill from auth.users (and profiles if auth email is empty).
update public.payments p
set email = coalesce(nullif(trim(u.email), ''), nullif(trim(prof.email), ''))
from auth.users u
left join public.profiles prof on prof.id = u.id
where p.user_id = u.id
  and (p.email is null or trim(p.email) = '')
  and coalesce(nullif(trim(u.email), ''), nullif(trim(prof.email), '')) is not null;

-- analysis_events.mail_id: only rows with user_id can be resolved (legacy rows without user_id stay unchanged).
update public.analysis_events ae
set mail_id = coalesce(nullif(trim(u.email), ''), nullif(trim(prof.email), ''))
from auth.users u
left join public.profiles prof on prof.id = u.id
where ae.user_id = u.id
  and (ae.mail_id is null or trim(ae.mail_id) = '')
  and coalesce(nullif(trim(u.email), ''), nullif(trim(prof.email), '')) is not null;
