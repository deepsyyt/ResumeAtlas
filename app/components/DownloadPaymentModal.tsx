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
  const creditCount = starter?.credits ?? 5;

  return (
    <div className="fixed inset-0 z-[65] flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-slate-900/55 backdrop-blur-[2px]"
        onClick={() => {
          if (!isCheckoutLoading) onClose();
        }}
        aria-hidden
      />
      <div
        className="nudge-modal-panel nudge-modal-panel--download relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xl"
        role="dialog"
        aria-labelledby="download-payment-title"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1 bg-gradient-to-r from-emerald-500 via-indigo-500 to-violet-500" aria-hidden />

        <div className="p-5 sm:p-6">
          <div className="nudge-modal-panel__body space-y-4">
            <header className="space-y-2.5">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-2.5 py-1 ring-1 ring-emerald-200/80">
                <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                <span className="text-[11px] font-semibold uppercase tracking-wide text-emerald-800">
                  {DOWNLOAD_UNLOCK_EYEBROW}
                </span>
              </div>
              <h2
                id="download-payment-title"
                className="text-xl font-bold tracking-tight text-slate-900 leading-tight sm:text-[1.35rem]"
              >
                {DOWNLOAD_UNLOCK_TITLE}
              </h2>
              <p className="text-sm leading-relaxed text-slate-600">{DOWNLOAD_UNLOCK_BODY}</p>
            </header>

            <section className="rounded-xl border border-slate-200/90 bg-slate-50/90 p-3.5 sm:p-4">
              <h3 className="text-xs font-bold uppercase tracking-wide text-slate-700">
                {DOWNLOAD_UNLOCK_BENEFITS_TITLE(priceLabel)}
              </h3>
              <ul className="mt-2.5 space-y-2">
                {DOWNLOAD_UNLOCK_BENEFITS.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2.5 text-sm leading-snug text-slate-700">
                    <span
                      aria-hidden
                      className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white"
                    >
                      ✓
                    </span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="nudge-modal-panel__footer mt-4 space-y-3 border-t border-slate-100 pt-4">
            <div className="payment-glow-shell payment-glow-card shadow-lg">
              <div className="payment-glow-card-inner overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-4 text-white">
                <div className="flex items-end justify-between gap-4">
                  <div className="min-w-0 text-left">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      One-time unlock
                    </p>
                    <p className="mt-1 text-3xl font-bold tracking-tight leading-none">{priceLabel}</p>
                    <p className="mt-2 text-sm leading-snug text-slate-300">
                      {creditCount} job credits included
                    </p>
                  </div>
                  <p className="hidden shrink-0 text-right text-[11px] leading-snug text-slate-400 sm:block">
                    Secure checkout
                    <br />
                    No subscription
                  </p>
                </div>

                {checkoutError ? (
                  <p className="mt-3 text-sm text-red-100 bg-red-500/20 border border-red-400/30 rounded-lg px-3 py-2">
                    {checkoutError}
                  </p>
                ) : null}

                <PaymentCtaButton
                  variant="solid"
                  size="xl"
                  className="mt-4 w-full"
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
                className="text-sm font-medium text-slate-500 hover:text-slate-800 disabled:opacity-50"
              >
                Keep editing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
