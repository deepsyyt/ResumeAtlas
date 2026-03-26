-- Store purchaser email on each payment row for support and reporting.
alter table public.payments add column if not exists email text;

create index if not exists payments_email_idx on public.payments (email)
  where email is not null;

comment on column public.payments.email is 'User email at checkout (from auth.users at order creation).';
