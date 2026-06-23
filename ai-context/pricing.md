# ResumeAtlas — Pricing & Billing

> **Session rule:** Read all files in `/ai-context` before making product, copy, SEO, billing, or analytics changes.

---

## Provider

**Razorpay only.** No Stripe integration in billing code.

Currency resolved via `RAZORPAY_CURRENCY` / `NEXT_PUBLIC_RAZORPAY_CURRENCY` (`USD` or `INR`).

---

## Active packages (UI)

**Only the starter pack is enabled in the UI today.**

| Package ID | Display name | Credits | USD | INR | UI status |
|------------|--------------|---------|-----|-----|-----------|
| `starter` | Job Application Pack | 5 | $2.99 | ₹249 | **Enabled** |
| `jobseeker` | Job Seeker | 5 | $9.99 | ₹849 | Defined in code, **hidden in UI** |
| `power` | Power Pack | 15 | $24.99 | ₹2,099 | Defined in code, **hidden in UI** |

Source: `app/lib/billing/packages.ts`, `app/components/CreditPackModal.tsx` (renders `starter` only via `starterPack`).

**No subscriptions.** One-time credit packs only.

---

## What credits buy

Each credit = one full **job application run**:

1. Analyze resume against a JD (match check + dashboard)
2. Optimize (summary, bullets, selected fixes)
3. Download PDF + DOCX

Starter pack messaging: *"5 jobs end-to-end (scan, optimize, download)"*

---

## Free tier

| Resource | Limit |
|----------|-------|
| Analysis scans | **1 per 30-day rolling window** (anonymous and signed-in) |
| Optimization | **Free after Google sign-in** |
| Download | **Requires payment** on free-source runs |

Quota constants: `app/lib/quota/constants.ts`  
- `ANALYSIS_QUOTA_LIMITS.anonymous: 1`  
- `ANALYSIS_QUOTA_LIMITS.user: 1`  
- `ANALYSIS_QUOTA_WINDOW_MS: 30 days`

Anonymous users see **full intelligence** (`showFullIntelligence: true`).

---

## Monetization gates

### Gate 1 — Quota exhausted (scan blocked)

| User state | Modal | Action |
|------------|-------|--------|
| Anonymous | `LimitModal` | Sign in with Google |
| Logged-in, no credits | `CreditPackModal` (upgrade variant) | Buy starter pack |

### Gate 2 — Download (free optimization path)

When `applicationSource === "free"` and `state === "optimized"` and `download_unlocked !== true`:

→ `DownloadPaymentModal` sells **starter pack** ($2.99 / ₹249).

Unlocks: PDF + DOCX for current job **plus** 5 credits for future roles.

### Pack-funded path

Credit deducted at application start (`funnelAccess.ts`). Download included — no second payment.

---

## Payment flow

```
User clicks pay
    → POST /api/billing/create-order  (Razorpay order + payments row)
    → Razorpay checkout widget       (razorpayPackCheckout.ts)
    → POST /api/billing/verify       (HMAC signature, grant credits, unlock download)
    → Webhook: /api/razorpay-webhook (backup)
```

**DB tables:** `credit_wallets`, `payments`, `credit_transactions`, `job_applications`, `optimizations`

**Funnel stages:** `analyzed → optimized → completed` (tracked on `job_applications` + `credit_wallets.funnel_stage`)

---

## Download gate logic

From `app/lib/usage.ts`:

```ts
downloadPaymentRequired =
  app.source === "free" &&
  app.state === "optimized" &&
  app.download_unlocked !== true
```

Pack users: `downloadPaymentRequired: false`.

---

## Checkout surfaces

| Surface | Trigger param | Package |
|---------|---------------|---------|
| `CreditPackModal` | `credit_pack_modal` | starter |
| `DownloadPaymentModal` | `optimize_download` | starter |
| `OptimizeConversionModal` | `conversion_modal` | starter (modal disabled) |

---

## Copy reference (billing modals)

Source: `app/lib/evidenceMetricCopy.ts`

- Download unlock: *"Pay to download your resume"* — includes 5 job credits.
- Credit pack CTA: *"Get 5 job credits for {price}"*
- Upgrade after free scan: *"Your free scan covered one job. Add credits to check, optimize, and download for your next role."*

---

## Environment

See `docs/BILLING_SETUP.md` for Razorpay keys, webhook URL, and currency config.

**Key files:**

| File | Purpose |
|------|---------|
| `app/lib/billing/packages.ts` | Package definitions |
| `app/lib/billing/razorpayConfig.ts` | Currency resolution |
| `app/lib/billing/funnelAccess.ts` | Credit commit at analyze |
| `app/lib/billing/razorpayPackCheckout.ts` | Client checkout widget |
| `app/api/billing/create-order/route.ts` | Order creation |
| `app/api/billing/verify/route.ts` | Payment verification + credit grant |
| `app/components/CreditPackModal.tsx` | Primary purchase UI |
| `app/components/DownloadPaymentModal.tsx` | Download gate UI |
