"use client";

import {
  formatCreditPackPrice,
  getCreditPackage,
  type CreditPackageId,
} from "@/app/lib/billing/packages";
import { SHOW_AUTOMATIC_OPTIMIZER_PAYWALL_MODALS } from "@/app/lib/optimizerPaywallFlags";
import {
  CONVERSION_MODAL_BENEFITS,
  CONVERSION_MODAL_BENEFITS_TITLE,
  CONVERSION_MODAL_CTA,
  CONVERSION_MODAL_HEADLINE,
  CONVERSION_MODAL_PRICE_HEADLINE,
  CONVERSION_MODAL_PRICE_LABEL,
  CONVERSION_MODAL_PRICE_SUBLINE,
  CONVERSION_MODAL_SUBHEAD,
} from "@/app/lib/evidenceMetricCopy";
import { PaymentCtaButton } from "@/app/components/PaymentCtaButton";

export type OptimizeConversionPaymentReceipt = {
  packName: string;
  creditsGranted: number;
  creditsRemaining: number;
};

export type OptimizeConversionModalProps = {
  open: boolean;
  onDismiss?: () => void;
  onClose: () => void;
  onContinueManual: () => void;
  onPrimaryAction: () => void | Promise<void>;
  onFixResumeNow: () => void | Promise<void>;
  paymentSuccess: boolean;
  paymentReceipt: OptimizeConversionPaymentReceipt | null;
  missingKeywordCount: number;
  isLoggedIn: boolean;
  hasOptimizationCredits: boolean;
  isBusy?: boolean;
  isStartingGoogleAuth?: boolean;
  localError?: string | null;
};

const STARTER_PACK_ID = "starter" satisfies CreditPackageId;

export function OptimizeConversionModal({
  open,
  onDismiss,
  onClose,
  onContinueManual,
  onPrimaryAction,
  onFixResumeNow,
  paymentSuccess,
  paymentReceipt,
  isLoggedIn,
  hasOptimizationCredits,
  isBusy = false,
  isStartingGoogleAuth = false,
  localError,
}: OptimizeConversionModalProps) {
  if (!SHOW_AUTOMATIC_OPTIMIZER_PAYWALL_MODALS || !open) return null;

  const starter = getCreditPackage(STARTER_PACK_ID);
  const priceLabel = starter
    ? formatCreditPackPrice(starter.razorpayAmount, starter.currency)
    : "N/A";
  const busy = isBusy || isStartingGoogleAuth;
  const isPaymentCta = isLoggedIn && !hasOptimizationCredits && !paymentSuccess;

  const primaryCtaLabel = (() => {
    if (isStartingGoogleAuth) return "Signing in with Google…";
    if (busy) return "Starting…";
    if (!isLoggedIn) return "Sign in to unlock optimization for this resume";
    if (hasOptimizationCredits) return "Start optimization for this resume";
    return starter ? CONVERSION_MODAL_CTA(priceLabel) : "Unlock optimization";
  })();

  if (paymentSuccess) {
    const granted = paymentReceipt?.creditsGranted ?? 1;
    const balance = paymentReceipt?.creditsRemaining ?? 1;
    const packName = paymentReceipt?.packName ?? "Starter";
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4">
        <div className="absolute inset-0 bg-slate-900/50" onClick={onClose} aria-hidden />
        <div
          className="nudge-modal-panel relative rounded-2xl bg-white p-5 shadow-xl border border-slate-200 sm:p-6"
          role="dialog"
          aria-labelledby="optimize-conversion-payment-success-title"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          <h2
            id="optimize-conversion-payment-success-title"
            className="text-lg font-semibold text-slate-900"
          >
            Payment successful
          </h2>
          <div
            className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50/90 px-3 py-3 text-slate-800"
            role="status"
            aria-live="polite"
          >
            <p className="text-sm font-semibold text-emerald-950">
              {packName}: +{granted} optimization run{granted === 1 ? "" : "s"} added to your account.
            </p>
            <p className="mt-1.5 text-xs text-slate-700 leading-snug sm:text-sm">
              You now have{" "}
              <span className="font-semibold tabular-nums text-slate-900">{balance}</span> optimization run
              {balance === 1 ? "" : "s"} available.
            </p>
            <div className="mt-3 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={busy}
                onClick={onClose}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition disabled:opacity-50"
              >
                Not now
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => void onFixResumeNow()}
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition disabled:opacity-60"
              >
                {busy ? "Starting…" : "Fix the resume Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const dismissPrompt = () => {
    onDismiss?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4">
      <div className="absolute inset-0 bg-slate-900/50" onClick={dismissPrompt} aria-hidden />
      <div
        className="nudge-modal-panel relative rounded-2xl bg-white p-3.5 shadow-xl border border-slate-200 sm:p-4"
        role="dialog"
        aria-labelledby="optimize-conversion-title"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="nudge-modal-panel__body space-y-2">
          <div className="text-center sm:text-left">
            <h2
              id="optimize-conversion-title"
              className="text-base font-semibold tracking-tight text-slate-900 leading-snug"
            >
              {CONVERSION_MODAL_HEADLINE}
            </h2>
            <p className="mt-1 text-[11px] leading-snug text-slate-600">{CONVERSION_MODAL_SUBHEAD}</p>
          </div>

          <div className="rounded-lg border border-emerald-200/80 bg-gradient-to-br from-emerald-50/90 via-white to-indigo-50/40 p-2.5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-800">
              {CONVERSION_MODAL_BENEFITS_TITLE}
            </p>
            <ul className="mt-1 space-y-1 text-[11px] leading-snug text-slate-800">
              {CONVERSION_MODAL_BENEFITS.map((benefit) => (
                <li key={benefit} className="flex gap-1.5">
                  <span aria-hidden className="text-emerald-600">
                    ✓
                  </span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="nudge-modal-panel__footer mt-2.5 space-y-1.5">
          <div className="payment-glow-shell payment-glow-card shadow-lg">
            <div className="payment-glow-card-inner overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 p-3 text-white text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-300">
                {CONVERSION_MODAL_PRICE_LABEL}
              </p>
              <p className="mt-1 text-2xl font-bold tracking-tight leading-none">
                {CONVERSION_MODAL_PRICE_HEADLINE(priceLabel)}
              </p>
              <p className="mt-0.5 text-sm font-semibold leading-snug">{CONVERSION_MODAL_PRICE_SUBLINE}</p>
              <p className="mt-1.5 text-[9px] leading-snug text-slate-400">
                One-time payment · Secure checkout · No subscription
              </p>

              {localError ? (
                <p className="mt-2 text-[11px] text-red-100 bg-red-500/20 border border-red-400/30 rounded-lg px-2 py-1.5">
                  {localError}
                </p>
              ) : null}

              {isPaymentCta ? (
                <PaymentCtaButton
                  className="mt-2.5"
                  disabled={busy}
                  onClick={() => void onPrimaryAction()}
                >
                  {primaryCtaLabel}
                </PaymentCtaButton>
              ) : (
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => void onPrimaryAction()}
                  className="mt-2.5 w-full rounded-xl bg-white px-3 py-2.5 text-sm font-semibold text-slate-900 shadow-md transition hover:bg-slate-100 disabled:opacity-60"
                >
                  {primaryCtaLabel}
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 px-0.5">
            <button
              type="button"
              disabled={busy}
              onClick={onContinueManual}
              className="text-xs font-medium text-slate-600 hover:text-slate-900 transition disabled:opacity-50"
            >
              Continue editing manually
            </button>
            <button
              type="button"
              onClick={dismissPrompt}
              className="text-xs font-medium text-slate-500 hover:text-slate-800"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
