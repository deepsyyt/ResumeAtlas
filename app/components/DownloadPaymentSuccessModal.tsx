"use client";

import {
  DOWNLOAD_SUCCESS_BODY,
  DOWNLOAD_SUCCESS_EYEBROW,
  DOWNLOAD_SUCCESS_NEXT_JOBS,
  DOWNLOAD_SUCCESS_THIS_JOB,
  DOWNLOAD_SUCCESS_TITLE,
  downloadSuccessCreditsLine,
} from "@/app/lib/evidenceMetricCopy";

export type DownloadPaymentSuccessModalProps = {
  open: boolean;
  onClose: () => void;
  onDownloadPdf: () => void | Promise<void>;
  onDownloadEditable: () => void | Promise<void>;
  isBusy?: boolean;
  creditsGranted?: number;
  creditsRemaining?: number;
};

function SuccessGlyph() {
  return (
    <div
      className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_8px_24px_-8px_rgba(16,185,129,0.55)] ring-4 ring-emerald-100"
      aria-hidden
    >
      <svg
        className="h-6 w-6 text-white drop-shadow-sm"
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

export function DownloadPaymentSuccessModal({
  open,
  onClose,
  onDownloadPdf,
  onDownloadEditable,
  isBusy = false,
  creditsGranted = 5,
  creditsRemaining = 5,
}: DownloadPaymentSuccessModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/45 backdrop-blur-[2px] transition-colors"
        aria-label="Close dialog"
        onClick={() => {
          if (!isBusy) onClose();
        }}
      />
      <div
        className="nudge-modal-panel relative overflow-hidden rounded-2xl border border-emerald-200/80 bg-white p-3.5 shadow-[0_20px_60px_-16px_rgba(15,23,42,0.35)] sm:p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="download-paid-title"
        aria-describedby="download-paid-desc"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-emerald-50/90 to-transparent" />

        <div className="relative text-center">
          <SuccessGlyph />
          <p
            className="mt-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-600"
            id="download-paid-eyebrow"
          >
            {DOWNLOAD_SUCCESS_EYEBROW}
          </p>
          <h2
            id="download-paid-title"
            className="mt-1 text-base font-semibold tracking-tight text-slate-900 leading-snug"
          >
            {DOWNLOAD_SUCCESS_TITLE}
          </h2>
          <p id="download-paid-desc" className="mt-1.5 text-[11px] leading-snug text-slate-600">
            {DOWNLOAD_SUCCESS_BODY}
          </p>
        </div>

        <div className="relative mt-2.5 rounded-lg border border-emerald-200/80 bg-emerald-50/70 px-2.5 py-2 text-left">
          <p className="text-[11px] font-semibold text-emerald-950">
            {downloadSuccessCreditsLine(creditsGranted, creditsRemaining)}
          </p>
          <ul className="mt-1 space-y-0.5 text-[10px] leading-snug text-emerald-900/90">
            <li>✓ {DOWNLOAD_SUCCESS_THIS_JOB}</li>
            <li>✓ {DOWNLOAD_SUCCESS_NEXT_JOBS}</li>
          </ul>
        </div>

        <div className="relative mt-3 flex flex-col gap-2">
          <button
            type="button"
            disabled={isBusy}
            onClick={() => void onDownloadPdf()}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-3 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-slate-800 disabled:opacity-60"
          >
            {isBusy ? (
              <>
                <span
                  className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-white/30 border-t-white"
                  aria-hidden
                />
                Preparing…
              </>
            ) : (
              "Download PDF"
            )}
          </button>
          <button
            type="button"
            disabled={isBusy}
            onClick={() => void onDownloadEditable()}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 disabled:opacity-60"
          >
            Download editable file
          </button>
          <button
            type="button"
            disabled={isBusy}
            onClick={() => onClose()}
            className="text-[11px] font-medium text-slate-500 transition hover:text-slate-800 disabled:opacity-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
