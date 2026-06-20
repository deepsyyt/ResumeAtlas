# Manual Test Checklist: ATS Analysis Quota & Funnel Billing

## Prerequisites

- Supabase with `analysis_usage` and `credit_wallets` (migrations `004`, `005`, `012`)
- `ANTHROPIC_API_KEY` set for analysis
- Optional: `ANALYSIS_QUOTA_IP_SALT` for production IP hashing

## Free scan quota (anonymous & signed-in)

Both scopes: **1 scan per rolling 30 days**.

### Under limit

1. Run 1 ATS analysis — should succeed.
2. Badge shows `0/1` or `1/1` free scan **this month**.

### At limit (anonymous)

1. Run 1 analysis, then a 2nd — expect 429 and sign-in / upgrade modal.

### At limit (signed-in)

1. Run 1 analysis, then a 2nd — expect 429 and **CreditPackModal** (paywall) if no pack credits.

## Funnel billing ($2.99 → 5 flows)

Each **application flow** = scan → optimize → download for one job.

1. Exhaust free scan, buy starter pack ($2.99).
2. Run analysis — 1 pack credit reserved (`credits_remaining` −1, funnel stage `analyzed`).
3. Try another analysis before optimizing — expect 409 `INCOMPLETE_FUNNEL`.
4. Run optimize — funnel stage becomes `optimized`.
5. Download PDF — funnel clears; credit consumed.
6. Repeat until 5 flows used; next scan requires another purchase.

## Failed steps

- Failed analysis must not open a funnel or consume pack credits.
- Failed optimize must not advance funnel to `optimized`.
- Failed download must not complete funnel (credit stays reserved until successful download).

## Edge cases

- Sign in mid-session: quota scope switches; optimize may open a free funnel if signed-in free scan remains.
- Cannot buy a new pack while `credits_remaining > 0` or an incomplete funnel exists.
