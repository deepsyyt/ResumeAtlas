-- Deterministic ATS analysis cache: same normalized resume+JD (+ model stamp) → same JSON result.
-- Populated by /api/analyze via service role; not exposed to anon/authenticated clients.

create table if not exists public.analysis_result_cache (
  cache_key text primary key,
  result jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists analysis_result_cache_created_at_idx
  on public.analysis_result_cache (created_at desc);

alter table public.analysis_result_cache enable row level security;

comment on table public.analysis_result_cache is
  'Server-side cache for POST /api/analyze outputs; keyed by content hash and model/prompt stamp. RLS on, no policies: service role only.';
