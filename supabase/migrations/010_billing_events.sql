-- Client-side billing funnel events; mail_id = signed-in user email when present.
create table if not exists public.billing_events (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  event_type text not null,
  mail_id text,
  user_id uuid references auth.users (id) on delete set null,
  metadata jsonb,
  created_at timestamptz not null default now()
);

alter table public.billing_events enable row level security;

drop policy if exists "billing_events_insert_anon" on public.billing_events;
create policy "billing_events_insert_anon"
  on public.billing_events for insert
  to anon, authenticated
  with check (true);

create index if not exists billing_events_session_created_idx
  on public.billing_events (session_id, created_at desc);

create index if not exists billing_events_mail_id_idx
  on public.billing_events (mail_id, created_at desc)
  where mail_id is not null;

create index if not exists billing_events_event_type_idx
  on public.billing_events (event_type, created_at desc);

create index if not exists billing_events_user_id_idx
  on public.billing_events (user_id, created_at desc)
  where user_id is not null;

comment on table public.billing_events is 'Billing funnel analytics (modal, pack clicks, Razorpay open/dismiss, success).';
comment on column public.billing_events.mail_id is 'User email when logged in; null for anonymous.';
comment on column public.billing_events.metadata is 'Optional JSON: package_id, credits, currency, checkout_trigger, next_step, etc.';
