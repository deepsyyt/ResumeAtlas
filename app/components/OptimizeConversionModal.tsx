"use client";

import {
  formatCreditPackPrice,
  getCreditPackage,
  type CreditPackageId,
} from "@/app/lib/billing/packages";

export type OptimizeConversionPaymentReceipt = {
  packName: string;
  creditsGranted: number;
  creditsRemaining: number;
};

export type OptimizeConversionModalProps = {
  open: boolean;
  onClose: () => void;
  /** Secondary: trust / manual path */
  onContinueManual: () => void;
  /**
   * Pay / sign-in / or start optimization when credits already available.
   * Parent handles: OAuth, Razorpay, or launch when user already has credits.
   */
  onPrimaryAction: () => void | Promise<void>;
  /** After successful payment; runs optimization for this JD. */
  onFixResumeNow: () => void | Promise<void>;
  /** User completed Razorpay; show success + actions. */
  paymentSuccess: boolean;
  /** Credit line item from checkout (matches CreditPackModal success copy). */
  paymentReceipt: OptimizeConversionPaymentReceipt | null;
  missingKeywordCount: number;
  isLoggedIn: boolean;
  /** True when wallet has at least one optimization credit (skip payment). */
  hasOptimizationCredits: boolean;
  isBusy?: boolean;
  isStartingGoogleAuth?: boolean;
  localError?: string | null;
};

const STARTER_PACK_ID = "starter" satisfies CreditPackageId;

/** Illustrative before/after for the proof block (not the user’s live score). */
const PROOF_ATS_BEFORE = 60;
const PROOF_ATS_AFTER = "80+";

export function OptimizeConversionModal({
  open,
  onClose,
  onContinueManual,
  onPrimaryAction,
  onFixResumeNow,
  paymentSuccess,
  paymentReceipt,
  missingKeywordCount,
  isLoggedIn,
  hasOptimizationCredits,
  isBusy = false,
  isStartingGoogleAuth = false,
  localError,
}: OptimizeConversionModalProps) {
  if (!open) return null;

  const starter = getCreditPackage(STARTER_PACK_ID);
  const priceLabel = starter
    ? formatCreditPackPrice(starter.razorpayAmount, starter.currency)
    : "N/A";
  const keywordLine =
    missingKeywordCount > 0
      ? `Missing ${missingKeywordCount} keyword${missingKeywordCount === 1 ? "" : "s"}. We’ll fix them instantly.`
      : "We’ll align keywords and bullets to this posting instantly";

  const busy = isBusy || isStartingGoogleAuth;

  const primaryCtaLabel = (() => {
    if (isStartingGoogleAuth) return "Signing in with Google…";
    if (busy) return "Starting…";
    if (!isLoggedIn) return "Sign in to continue";
    if (hasOptimizationCredits) return "Fix the resume now";
    return "Pay and unlock optimization";
  })();

  /** Lightweight success screen (aligned with CreditPackModal payment success). */
  if (paymentSuccess) {
    const granted = paymentReceipt?.creditsGranted ?? 1;
    const balance = paymentReceipt?.creditsRemaining ?? 1;
    const packName = paymentReceipt?.packName ?? "Starter";
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-slate-900/50" onClick={onClose} aria-hidden />
        <div
          className="relative w-full max-w-md max-h-[92vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl border border-slate-200"
          role="dialog"
          aria-labelledby="optimize-conversion-payment-success-title"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          <h2
            id="optimize-conversion-payment-success-title"
            className="text-xl font-semibold text-slate-900"
          >
            Payment successful
          </h2>
          <div
            className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/90 px-4 py-4 text-slate-800"
            role="status"
            aria-live="polite"
          >
            <p className="text-sm font-semibold text-emerald-950">
              {packName}: +{granted} credit{granted === 1 ? "" : "s"} added to your account.
            </p>
            <p className="mt-2 text-sm text-slate-700 leading-snug">
              You now have{" "}
              <span className="font-semibold tabular-nums text-slate-900">{balance}</span> credit
              {balance === 1 ? "" : "s"} available. Each successful optimization for one job description uses 1
              credit; nothing is charged if optimization does not complete.
            </p>
            <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={busy}
                onClick={onClose}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition disabled:opacity-50"
              >
                Not now
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => void onFixResumeNow()}
                className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition disabled:opacity-60"
              >
                {busy ? "Starting…" : "Fix the resume Now"}
              </button>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50" onClick={onClose} aria-hidden />
      <div
        className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-2xl bg-white p-5 sm:p-6 shadow-xl border border-slate-200"
        role="dialog"
        aria-labelledby="optimize-conversion-title"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="optimize-conversion-title"
          className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900"
        >
          Still trying to fix your resume manually?
        </h2>
        <p className="mt-2 text-sm text-slate-600 leading-snug">
          We can optimize it for this job in one click: keywords, bullets, ATS format.
        </p>

        <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50/90 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Your likely result after optimization
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-slate-200 bg-white px-3 py-2.5">
              <p className="text-[11px] font-medium text-slate-500">Before</p>
              <p className="mt-0.5 text-lg font-semibold tabular-nums text-slate-800">
                ATS score {PROOF_ATS_BEFORE}
              </p>
            </div>
            <div className="rounded-lg border border-emerald-200 bg-emerald-50/90 px-3 py-2.5">
              <p className="text-[11px] font-medium text-emerald-800">After</p>
              <p className="mt-0.5 text-lg font-semibold tabular-nums text-emerald-900">
                ATS score {PROOF_ATS_AFTER}
              </p>
            </div>
          </div>
          <ul className="mt-3 space-y-1.5 text-sm text-slate-700">
            <li className="flex gap-2">
              <span aria-hidden>+</span>
              <span>Added missing keywords</span>
            </li>
            <li className="flex gap-2">
              <span aria-hidden>+</span>
              <span>Rewritten bullet points</span>
            </li>
            <li className="flex gap-2">
              <span aria-hidden>+</span>
              <span>Improved impact &amp; clarity</span>
            </li>
          </ul>
        </div>

        <p className="mt-4 text-sm font-medium text-slate-800">{keywordLine}</p>

        <ul className="mt-4 space-y-2 text-sm text-slate-700">
          <li className="flex gap-2">
            <span className="text-emerald-600 font-bold" aria-hidden>
              ✓
            </span>
            Fix missing ATS keywords automatically
          </li>
          <li className="flex gap-2">
            <span className="text-emerald-600 font-bold" aria-hidden>
              ✓
            </span>
            Rewrite weak bullet points
          </li>
          <li className="flex gap-2">
            <span className="text-emerald-600 font-bold" aria-hidden>
              ✓
            </span>
            Improve score for this exact job
          </li>
        </ul>

        <div className="mt-5 rounded-xl border-2 border-slate-900 bg-white p-4 sm:p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Recommended</p>
          <p className="mt-1 text-base font-semibold text-slate-900">
            Optimize this resume for {priceLabel}
          </p>
          <p className="mt-1.5 text-xs text-slate-500">One-time optimization for this job</p>
          <p className="mt-3 text-sm text-slate-700 leading-snug">
            You’ve already tried improving it. We’ll fix everything in one click.
          </p>

          {localError ? (
            <p className="mt-3 text-sm text-red-700 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {localError}
            </p>
          ) : null}

          <button
            type="button"
            disabled={busy}
            onClick={() => void onPrimaryAction()}
            className="mt-4 w-full rounded-xl bg-black px-4 py-4 text-[15px] sm:text-base font-semibold leading-snug text-white text-center shadow-lg shadow-slate-900/25 ring-1 ring-black/10 hover:bg-slate-950 hover:shadow-xl transition disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
          >
            {primaryCtaLabel}
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <button
            type="button"
            disabled={busy}
            onClick={onContinueManual}
            className="w-full py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition disabled:opacity-50"
          >
            Continue editing manually
          </button>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-medium text-slate-500 hover:text-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
