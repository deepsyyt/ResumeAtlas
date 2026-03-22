-- analysis_usage: event-level records for rolling 24h quota
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
  constraint analysis_usage_identity_check check (
    user_id is not null or anonymous_id is not null
  )
);

alter table public.analysis_usage enable row level security;

create index if not exists analysis_usage_user_created_idx
  on public.analysis_usage (user_id, created_at desc)
  where user_id is not null;

create index if not exists analysis_usage_anon_created_idx
  on public.analysis_usage (anonymous_id, created_at desc)
  where anonymous_id is not null;

create index if not exists analysis_usage_ip_created_idx
  on public.analysis_usage (ip_hash, created_at desc)
  where ip_hash is not null;

comment on table public.analysis_usage is 'ATS analysis usage events for rolling 24h quota enforcement';
