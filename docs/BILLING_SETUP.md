# Billing & Analysis Quota Setup (Razorpay + Supabase)

## 1. Run database migrations

Required for:
- **"Failed to record order"** → `payments` table missing
- **Usage limit not reducing after scans** → `analysis_usage` table missing

Apply the schema:

### Option A: Supabase Dashboard (recommended)

1. Go to [Supabase Dashboard](https://supabase.com/dashboard) → your project
2. **SQL Editor** → **New query**
3. Copy and run the contents of `supabase/migrations/005_ensure_billing_tables.sql`
4. Or run all migrations in order: `001` → `002` → `003` → `004` → `005`

### Option B: npm script (requires DATABASE_URL)

Add `DATABASE_URL` to `.env.local` (Supabase Dashboard → Settings → Database → Connection string URI):

```bash
npm run db:migrate
```

### Option C: Supabase CLI

```bash
npx supabase db push
```

---

## 2. Vercel environment variables

Production uses **live** Razorpay keys. In Vercel → Project → Settings → Environment Variables:

| Variable | Value | Notes |
|----------|-------|-------|
| `RAZORPAY_LIVE_KEY_ID` | `rzp_live_...` | From Razorpay Dashboard → Settings → API Keys |
| `RAZORPAY_LIVE_KEY_SECRET` | Live secret | Never expose to client |
| `RAZORPAY_CURRENCY` | `INR` or `USD` | **INR** for Razorpay India, **USD** for Razorpay International |
| `NEXT_PUBLIC_RAZORPAY_CURRENCY` | Same as above | For checkout price display (match `RAZORPAY_CURRENCY`) |
| `RAZORPAY_MODE` | `live` | Optional; production defaults to live |
| `RAZORPAY_WEBHOOK_SECRET` | Live webhook secret | From Razorpay Webhooks |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` | Supabase Dashboard → Settings → API (service_role) |

**Currency note:** Razorpay India accounts use **INR**. Set `RAZORPAY_CURRENCY=INR` and `NEXT_PUBLIC_RAZORPAY_CURRENCY=INR` so checkout shows ₹249, ₹849, ₹2,099 instead of USD.

---

## 3. Razorpay configuration

1. **Activate international payments** (for USD): Razorpay Dashboard → Settings → Configuration
2. **Add webhook**: `https://resumeatlas.io/api/razorpay-webhook` with events: `payment.captured`, `payment.failed`
3. **Whitelist domain**: `resumeatlas.io` in Razorpay if required

---

## 4. Verify

After running migrations and setting env vars:

1. Redeploy Vercel (or wait for auto-deploy)
2. **Billing:** Click "Continue with 1 credit" → should open Razorpay checkout
3. **Analysis quota:** Run a free ATS scan → quota (e.g. 2/3 remaining) should decrease
4. Check Vercel Function Logs for `[billing/create-order]` or `[analyze] usage record failed` if errors persist
