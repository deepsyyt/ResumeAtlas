-- Client-side analytics events; mail_id = signed-in user email when present.
create table if not exists public.analysis_events (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  event_type text not null,
  mail_id text,
  created_at timestamptz not null default now()
);

alter table public.analysis_events add column if not exists mail_id text;

alter table public.analysis_events enable row level security;

drop policy if exists "analysis_events_insert_anon" on public.analysis_events;
create policy "analysis_events_insert_anon"
  on public.analysis_events for insert
  to anon, authenticated
  with check (true);

create index if not exists analysis_events_session_created_idx
  on public.analysis_events (session_id, created_at desc);

create index if not exists analysis_events_mail_id_idx
  on public.analysis_events (mail_id)
  where mail_id is not null;

comment on column public.analysis_events.mail_id is 'User email when logged in; null for anonymous sessions.';
