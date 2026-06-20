"use client";

import {
  formatCreditPackPrice,
  getCreditPackage,
  type CreditPackageId,
} from "@/app/lib/billing/packages";
import {
  DOWNLOAD_UNLOCK_BENEFITS,
  DOWNLOAD_UNLOCK_BENEFITS_TITLE,
  DOWNLOAD_UNLOCK_BODY,
  DOWNLOAD_UNLOCK_CTA,
  DOWNLOAD_UNLOCK_EYEBROW,
  DOWNLOAD_UNLOCK_OUTCOME,
  DOWNLOAD_UNLOCK_PRICE_HEADLINE,
  DOWNLOAD_UNLOCK_PRICE_SUBLINE,
  DOWNLOAD_UNLOCK_TITLE,
} from "@/app/lib/evidenceMetricCopy";
import { PaymentCtaButton } from "@/app/components/PaymentCtaButton";

const STARTER_PACK_ID = "starter" satisfies CreditPackageId;

export type DownloadPaymentModalProps = {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void | Promise<void>;
  isCheckoutLoading?: boolean;
  checkoutError?: string | null;
};

export function DownloadPaymentModal({
  open,
  onClose,
  onCheckout,
  isCheckoutLoading = false,
  checkoutError = null,
}: DownloadPaymentModalProps) {
  if (!open) return null;

  const starter = getCreditPackage(STARTER_PACK_ID);
  const priceLabel = starter
    ? formatCreditPackPrice(starter.razorpayAmount, starter.currency)
    : "N/A";
  const creditLine = starter
    ? DOWNLOAD_UNLOCK_PRICE_SUBLINE(priceLabel, starter.credits)
    : "Includes job credits for future applications";

  return (
    <div className="fixed inset-0 z-[65] flex items-center justify-center p-3 sm:p-4">
      <div
        className="absolute inset-0 bg-slate-900/50"
        onClick={() => {
          if (!isCheckoutLoading) onClose();
        }}
        aria-hidden
      />
      <div
        className="nudge-modal-panel relative rounded-2xl border border-indigo-100 bg-white p-3.5 shadow-xl sm:p-4"
        role="dialog"
        aria-labelledby="download-payment-title"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="nudge-modal-panel__body space-y-2">
          <div className="text-center sm:text-left">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-indigo-700">
              {DOWNLOAD_UNLOCK_EYEBROW}
            </p>
            <h2
              id="download-payment-title"
              className="mt-0.5 text-base font-semibold tracking-tight text-slate-900 leading-snug"
            >
              {DOWNLOAD_UNLOCK_TITLE}
            </h2>
            <p className="mt-1 text-[11px] leading-snug text-slate-600">{DOWNLOAD_UNLOCK_BODY}</p>
          </div>

          <div className="rounded-lg border border-emerald-200/80 bg-gradient-to-br from-emerald-50/90 via-white to-indigo-50/40 p-2.5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-800">
              {DOWNLOAD_UNLOCK_BENEFITS_TITLE}
            </p>
            <ul className="mt-1 space-y-1 text-[11px] leading-snug text-slate-800">
              {DOWNLOAD_UNLOCK_BENEFITS.map((benefit) => (
                <li key={benefit} className="flex gap-1.5">
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-bold text-white"
                  >
                    ✓
                  </span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="rounded-lg border border-amber-200/90 bg-amber-50/90 px-2.5 py-1.5 text-[10px] leading-snug text-amber-950 text-center">
            {DOWNLOAD_UNLOCK_OUTCOME}
          </p>
        </div>

        <div className="nudge-modal-panel__footer mt-2.5 space-y-1.5">
          <div className="payment-glow-shell payment-glow-card shadow-lg">
            <div className="payment-glow-card-inner overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 p-3 text-white text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-300">
                One-time unlock
              </p>
              <div className="mt-1 flex flex-col items-center gap-0.5">
                <p className="text-2xl font-bold tracking-tight leading-none">{priceLabel}</p>
                <p className="text-sm font-semibold leading-snug">{DOWNLOAD_UNLOCK_PRICE_HEADLINE}</p>
              </div>
              <p className="mt-1.5 text-[10px] leading-snug text-slate-300">{creditLine}</p>
              <p className="mt-1 text-[9px] leading-snug text-slate-400">
                One-time payment · Secure checkout · No subscription
              </p>

              {checkoutError ? (
                <p className="mt-2 text-[11px] text-red-100 bg-red-500/20 border border-red-400/30 rounded-lg px-2 py-1.5">
                  {checkoutError}
                </p>
              ) : null}

              <PaymentCtaButton
                className="mt-2.5"
                disabled={isCheckoutLoading}
                onClick={() => void onCheckout()}
              >
                {isCheckoutLoading ? "Opening secure checkout…" : DOWNLOAD_UNLOCK_CTA(priceLabel)}
              </PaymentCtaButton>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              disabled={isCheckoutLoading}
              onClick={onClose}
              className="text-[11px] font-medium text-slate-500 hover:text-slate-800 disabled:opacity-50"
            >
              Keep editing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
