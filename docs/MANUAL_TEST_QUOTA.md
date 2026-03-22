# Manual Test Checklist: ATS Analysis Quota

## Prerequisites

- Supabase with `analysis_usage` table (run migration `004_analysis_usage.sql`)
- `ANTHROPIC_API_KEY` set for analysis
- Optional: `ANALYSIS_QUOTA_IP_SALT` for production IP hashing (default uses built-in salt)

## Anonymous User

### Under limit

1. Open app in incognito (or clear cookies for localhost).
2. Run 1–2 ATS analyses. Each should succeed.
3. Verify "X of 3 free scans today" appears near the form.
4. Count decrements after each successful run.

### At limit

1. Run 3 analyses (all succeed).
2. On the 4th, expect 429 with modal: "You've used your free ATS scans for now. Sign in to continue with more free scans."
3. Click "Sign in for more free scans" → Google OAuth → return to home.
4. After sign-in, you get the signed-in quota (5 scans per 24h); run an analysis to confirm.

### Failed analysis does not consume quota

1. Temporarily break `ANTHROPIC_API_KEY` or simulate 502.
2. Run analysis → fails with 502.
3. Fix API key, run again → should succeed and consume 1 (not 2).

## Signed-in User

### Under limit

1. Sign in, run 1–2 analyses. All succeed.
2. Verify "X of 5 free scans today" in form.

### At limit

1. Run 5 analyses.
2. On the 6th, expect 429 with modal: "You've used your free ATS scans for the last 24 hours. Please try again later."
3. Click "Got it" to dismiss. No sign-in CTA (user is already signed in).

## Rolling 24-hour window

1. Run 3 analyses as anonymous → quota exhausted.
2. Wait 24+ hours (or manually delete rows in `analysis_usage` for testing).
3. Run analysis again → should succeed.

## Cookie and identity

1. As anonymous, run 1 analysis.
2. Refresh page. Quota badge should persist (same anonymous_id cookie).
3. Clear cookies. Badge may show fresh 3/3 until next fetch.

## Edge cases

- Retry after network error: quota should not be double-consumed (only recorded after success).
- Sign in mid-session: quota should switch from anonymous (3) to user (5) on next refresh.
