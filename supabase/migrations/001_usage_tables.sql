-- anonymous_usage: lifetime limits per device (cookie anon_id)
create table if not exists public.anonymous_usage (
  anon_id uuid primary key default gen_random_uuid(),
  resume_count int not null default 0,
  summary_count int not null default 0,
  created_at timestamptz not null default now()
);

-- profiles: one per auth user (id = auth.users.id)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  plan text default null,
  monthly_resume_count int not null default 0,
  monthly_summary_count int not null default 0,
  period_start timestamptz not null default now()
);

-- RLS: no policies = anon key has no access; service_role bypasses RLS in API
alter table public.anonymous_usage enable row level security;
alter table public.profiles enable row level security;

create index if not exists profiles_plan_idx on public.profiles(plan);
