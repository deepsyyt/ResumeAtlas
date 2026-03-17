-- optimize_events: one row per "Optimize Resume" action (authenticated users only)
create table if not exists public.optimize_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  ats_score_before int,
  created_at timestamptz not null default now()
);

alter table public.optimize_events enable row level security;

-- Only service role can insert (API uses getSupabaseAdmin()); no direct client access needed
create index if not exists optimize_events_user_id_idx on public.optimize_events(user_id);
create index if not exists optimize_events_created_at_idx on public.optimize_events(created_at);
