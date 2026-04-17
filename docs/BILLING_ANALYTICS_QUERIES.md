## Billing Analytics Queries

Run these in the Supabase SQL Editor to track checkout funnel performance and identify successful payments.

### 1) Funnel by checkout trigger (last 30 days)

This shows distinct sessions that reached each billing step, grouped by `checkout_trigger`.

```sql
with windowed as (
  select
    session_id,
    event_type,
    created_at,
    coalesce(metadata->>'checkout_trigger', 'unknown') as checkout_trigger
  from public.billing_events
  where created_at >= now() - interval '30 days'
    and event_type in (
      'billing_payment_modal_open',
      'billing_credit_pack_checkout_click',
      'billing_razorpay_checkout_opened',
      'billing_razorpay_checkout_dismissed',
      'billing_payment_success'
    )
),
session_triggers as (
  select
    session_id,
    max(checkout_trigger) filter (where checkout_trigger <> 'unknown') as trigger_known
  from windowed
  group by session_id
),
normalized as (
  select
    w.session_id,
    w.event_type,
    coalesce(st.trigger_known, w.checkout_trigger, 'unknown') as checkout_trigger
  from windowed w
  left join session_triggers st using (session_id)
)
select
  checkout_trigger,
  count(distinct session_id) filter (where event_type = 'billing_payment_modal_open') as modal_open_sessions,
  count(distinct session_id) filter (where event_type = 'billing_credit_pack_checkout_click') as pack_click_sessions,
  count(distinct session_id) filter (where event_type = 'billing_razorpay_checkout_opened') as checkout_opened_sessions,
  count(distinct session_id) filter (where event_type = 'billing_razorpay_checkout_dismissed') as checkout_dismissed_sessions,
  count(distinct session_id) filter (where event_type = 'billing_payment_success') as success_sessions
from normalized
group by checkout_trigger
order by success_sessions desc, checkout_opened_sessions desc;
```

### 2) Conversion rates by checkout trigger (last 30 days)

This adds key conversion percentages from modal -> checkout open and checkout open -> success.

```sql
with funnel as (
  with windowed as (
    select
      session_id,
      event_type,
      coalesce(metadata->>'checkout_trigger', 'unknown') as checkout_trigger
    from public.billing_events
    where created_at >= now() - interval '30 days'
      and event_type in (
        'billing_payment_modal_open',
        'billing_credit_pack_checkout_click',
        'billing_razorpay_checkout_opened',
        'billing_payment_success'
      )
  ),
  session_triggers as (
    select
      session_id,
      max(checkout_trigger) filter (where checkout_trigger <> 'unknown') as trigger_known
    from windowed
    group by session_id
  ),
  normalized as (
    select
      w.session_id,
      w.event_type,
      coalesce(st.trigger_known, w.checkout_trigger, 'unknown') as checkout_trigger
    from windowed w
    left join session_triggers st using (session_id)
  )
  select
    checkout_trigger,
    count(distinct session_id) filter (where event_type = 'billing_payment_modal_open') as modal_open_sessions,
    count(distinct session_id) filter (where event_type = 'billing_credit_pack_checkout_click') as pack_click_sessions,
    count(distinct session_id) filter (where event_type = 'billing_razorpay_checkout_opened') as checkout_opened_sessions,
    count(distinct session_id) filter (where event_type = 'billing_payment_success') as success_sessions
  from normalized
  group by checkout_trigger
)
select
  checkout_trigger,
  modal_open_sessions,
  pack_click_sessions,
  checkout_opened_sessions,
  success_sessions,
  round(100.0 * checkout_opened_sessions / nullif(modal_open_sessions, 0), 2) as modal_to_checkout_open_pct,
  round(100.0 * success_sessions / nullif(checkout_opened_sessions, 0), 2) as checkout_open_to_success_pct,
  round(100.0 * success_sessions / nullif(modal_open_sessions, 0), 2) as modal_to_success_pct
from funnel
order by success_sessions desc, checkout_opened_sessions desc;
```

### 3) Who had successful payments

Use this to see users/emails with successful payment rows (`status = 'paid'`).

```sql
select
  p.created_at,
  p.email,
  p.user_id,
  p.package_id,
  p.provider,
  p.provider_order_id,
  p.provider_payment_id,
  p.amount,
  p.currency,
  p.credits_granted,
  p.status
from public.payments p
where p.status = 'paid'
order by p.created_at desc;
```

### 4) Aggregate successful payments by email

Use this for support/reporting to see total paid orders and credits per email.

```sql
select
  coalesce(nullif(trim(p.email), ''), '(missing-email)') as email,
  count(*) as paid_orders,
  sum(p.amount) as total_amount_minor,
  max(p.currency) as currency,
  sum(p.credits_granted) as total_credits_granted,
  min(p.created_at) as first_paid_at,
  max(p.created_at) as last_paid_at
from public.payments p
where p.status = 'paid'
group by 1
order by last_paid_at desc;
```

### Notes

- Amounts are stored in minor units (`USD` cents, `INR` paise).
- If you want a fixed date range, replace `now() - interval '30 days'` with explicit timestamps.
