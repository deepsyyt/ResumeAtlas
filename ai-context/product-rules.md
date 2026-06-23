# ResumeAtlas — Product Rules

> **Session rule:** Read all files in `/ai-context` before making product, copy, SEO, billing, or analytics changes.

**Domain:** https://resumeatlas.io  
**Stack:** Next.js 14 App Router · Supabase (auth + DB) · Razorpay · Anthropic API · GA4

---

## What ResumeAtlas is

ResumeAtlas helps job seekers **decide whether to apply** and **increase shortlist odds** for a specific posting — not generic resume scoring.

**Core promise:** *Know if you're ready to apply before you apply.*

Users paste **resume + job description** (text, no file upload). The product returns an **apply-readiness intelligence dashboard**, then optionally a **job-specific optimized resume**.

---

## Product outputs (analysis phase)

| Output | What it tells the user |
|--------|------------------------|
| **Application verdict** | Apply now, optimize first, or skip — with **estimated shortlist odds** (~X% if you apply today, ~Y% after optimize) |
| **Role fit for this posting** | **If you're applying for this role:** fit verdict for the target title plus related roles you may also qualify for |
| **Elimination / rejection risks** | Top reasons a recruiter might skip this application |
| **Skill proof map** | Which JD skills are proven in bullets vs listed only |
| **Keyword coverage** | ATS keyword match score — matched vs missed posting terms |
| **Recommended fixes** | Selectable coaching actions tied to rejection risks and skill gaps |

**Analysis is free:** 1 scan per 30-day rolling window, no signup required. Full intelligence is shown to anonymous users.

---

## Optimization — what it actually does

Optimization is **user-consented and fix-driven**. The user selects **recommended fixes** on the dashboard, then runs optimize. The AI applies only what the user selected — not random keyword stuffing.

### The five optimization benefits (under-marketed today — lead with these)

1. **Summary tailored to the JD** — role domain, focus, and fit rewritten for this posting.
2. **Weak / listed-only skills → proven** — skills that appeared only in the skills section are demonstrated in project bullets with concrete experience language.
3. **User-selected rejection fixes applied** — each selected elimination-risk fix is addressed in the strongest matching bullets with demonstrated experience, to improve shortlist odds for this role.
4. **Impact quantification** — weak bullets are refined with goal/outcome metrics (% faster, users served, scale, latency, revenue pipeline, etc.) when it strengthens proof.
5. **Editable preview + export** — user reviews every change in an editable UI on `/optimize`, then downloads an application-ready **PDF and DOCX**.

### Evidence rules (how the AI behaves)

From `app/lib/optimizePrompts.ts` (`REWRITE_EVIDENCE_RULES`):

- Demonstrate every **assigned skill or user-selected fix** as work performed: action + tool/method + deliverable + outcome.
- **May** name JD-aligned tools/methods when the project context supports that type of work — show transferable proof from the same role/company/project.
- **May** add plausible round metrics when source bullets lack numbers.
- **Must not** move work across companies, projects, or domains.
- **Must not** apply fixes the user did not select.
- Rejection-oriented skills (from selected fixes) may receive **constructed demonstrated experience** in bullets — this is intentional and user-initiated, not blanket invention across all skills.

### What optimization is NOT

- Not a generic resume builder or template designer.
- Not random keyword injection across the whole resume.
- Not automatic fabrication of every missing JD skill — only **user-selected fixes** and **assigned weak keywords** from the optimize run.

---

## Free vs paid boundaries

| Step | Cost | Auth required |
|------|------|---------------|
| Paste resume + JD | Free | No |
| Intelligence dashboard (full) | Free (1 scan / 30 days) | No |
| **Optimization** | **Free after Google sign-in** | Yes |
| **PDF / DOCX download** | **Paid** (starter pack) | Yes |

**Monetization gate:** Download on the **free-source** optimization path (`applicationSource: "free"`). User can optimize and preview for free; paying unlocks export + 5 job credits.

Pack-funded runs (`applicationSource: "pack"`) include download in the credit.

---

## User funnel (product view)

```
SEO / marketing page
    → /check-resume-against-job-description  (primary workbench)
    → Analyze (free)
    → Dashboard + select recommended fixes
    → Sign in with Google (for optimize)
    → /optimize  (free preview + edit)
    → Download PDF/DOCX  (payment on free path)
```

**Marketing homepage (`/`):** scroll funnel only — CTAs push to the workbench.  
**Money page:** `/check-resume-against-job-description`

---

## Auth

- **Supabase Auth — Google OAuth only** (no email/password, no NextAuth, no Clerk).
- Callback: `/auth/callback` (PKCE).
- Middleware handles SEO redirects only — **no route-level auth gating**.
- Pending optimize flows preserved in sessionStorage across OAuth (15 min TTL).

---

## Nudge / conversion surfaces

| Surface | Trigger | Purpose |
|---------|---------|---------|
| `OptimizeDashboardNudgeModal` | 3 min after JD dashboard (up to 3 impressions) | Push optimize CTA |
| `IntelligencePanel` CTAs | Always on dashboard | Optimize entry points |
| `LimitModal` | Anonymous quota exhausted | Drive Google sign-in |
| `CreditPackModal` | Logged-in quota exhausted | Sell starter pack |
| `OptimizeOAuthResumeModal` | After OAuth return | Resume optimize flow |
| `DownloadPaymentModal` | Free-path download attempt | Pay to unlock export |
| `DownloadPaymentSuccessModal` | After payment | Immediate download CTA |

**Disabled:** `OptimizeConversionModal` (`SHOW_AUTOMATIC_OPTIMIZER_PAYWALL_MODALS = false`).

---

## Copy guidelines for agents

- Lead with **apply-readiness** and **shortlist odds**, not just ATS score.
- Emphasize the **five optimization benefits** above — they are underrepresented in current marketing copy.
- Say **"user-selected fixes"** and **"demonstrated experience"** — not "honest tailoring with no invention."
- Free tier: **"Free scan · free optimize after sign-in · pay to download."**
- Do not claim Jobscan-style keyword-only optimization.
- Do not mention Stripe — billing is Razorpay only.

---

## Key source files

| Concern | File |
|---------|------|
| **Canonical benefits (analysis + optimization)** | `app/lib/productBenefits.ts` |
| Home marketing copy | `app/lib/homeMarketingContent.ts` |
| Optimize prompts / evidence rules | `app/lib/optimizePrompts.ts` |
| Recommended fixes | `app/lib/recommendedFixes.ts` |
| Rejection-risk → bullet matching | `app/lib/rejectionRiskOptimize.ts` |
| Conversion copy | `app/lib/evidenceMetricCopy.ts` |
| Usage / download gate | `app/lib/usage.ts` |
| Quota | `app/lib/quota/constants.ts` |
| Primary workbench | `app/check-resume-against-job-description/page.tsx` → `HomeClient.tsx` |
| Optimize workspace | `app/optimize/page.tsx` |
