"use client";

export type DownloadPaymentSuccessModalProps = {
  open: boolean;
  onClose: () => void;
  onDownloadPdf: () => void | Promise<void>;
  onDownloadEditable: () => void | Promise<void>;
  isBusy?: boolean;
};

function SuccessGlyph() {
  return (
    <div
      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_12px_40px_-12px_rgba(16,185,129,0.55)] ring-4 ring-emerald-100 sm:h-20 sm:w-20"
      aria-hidden
    >
      <svg
        className="h-8 w-8 text-white drop-shadow-sm sm:h-10 sm:w-10"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.2}
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
  );
}

/**
 * Shown after Razorpay completes on /optimize (download gate) so users get a clear
 * success moment before choosing PDF vs editable export.
 */
export function DownloadPaymentSuccessModal({
  open,
  onClose,
  onDownloadPdf,
  onDownloadEditable,
  isBusy = false,
}: DownloadPaymentSuccessModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/45 backdrop-blur-[2px] transition-colors"
        aria-label="Close dialog"
        onClick={() => {
          if (!isBusy) onClose();
        }}
      />
      <div
        className="relative w-full max-w-lg sm:max-w-2xl overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-[0_25px_80px_-12px_rgba(15,23,42,0.35)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="download-paid-title"
        aria-describedby="download-paid-desc"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-emerald-50/90 to-transparent" />
        <div className="relative px-8 pb-10 pt-10 sm:px-12 sm:pb-12 sm:pt-12">
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <SuccessGlyph />
            <p
              className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-600 sm:text-xs"
              id="download-paid-eyebrow"
            >
              Payment successful
            </p>
            <h2
              id="download-paid-title"
              className="mt-2 max-w-xl text-pretty text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl sm:leading-snug md:text-[2rem]"
            >
              You can download your optimized resume
            </h2>
            <p
              id="download-paid-desc"
              className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg"
            >
              Your purchase unlocked downloads for this optimization. Choose PDF for applications, or the
              editable file if you want to tweak the text first.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:flex-nowrap sm:items-stretch sm:gap-3 md:gap-4">
            <button
              type="button"
              disabled={isBusy}
              onClick={() => onClose()}
              className="order-3 w-full shrink-0 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-base font-medium text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 disabled:opacity-50 sm:order-none sm:w-[min(100%,10rem)] sm:px-6"
            >
              Close
            </button>
            <button
              type="button"
              disabled={isBusy}
              onClick={() => void onDownloadEditable()}
              className="order-1 w-full min-w-0 flex-1 rounded-2xl border border-slate-300/90 bg-white px-5 py-4 text-base font-semibold text-slate-900 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 disabled:opacity-60 sm:order-none sm:px-6"
            >
              Download editable file
            </button>
            <button
              type="button"
              disabled={isBusy}
              onClick={() => void onDownloadPdf()}
              className="order-2 inline-flex w-full min-w-0 flex-1 items-center justify-center gap-2.5 rounded-2xl bg-slate-900 px-6 py-4 text-base font-semibold text-white shadow-[0_14px_40px_-14px_rgba(15,23,42,0.65)] transition hover:bg-slate-800 disabled:opacity-60 sm:order-none md:px-8"
            >
              {isBusy ? (
                <>
                  <span
                    className="h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-white/30 border-t-white"
                    aria-hidden
                  />
                  Preparing…
                </>
              ) : (
                "Download PDF"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
