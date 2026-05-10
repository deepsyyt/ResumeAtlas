"use client";

export type OptimizeOAuthResumeModalProps = {
  open: boolean;
  /** User chose not to optimize right now */
  onDismiss: () => void;
  /** User confirms optimization after sign-in */
  onStartOptimization: () => void | Promise<void>;
  isBusy?: boolean;
};

function ReadyGlyph() {
  return (
    <div
      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-600 shadow-[0_12px_40px_-12px_rgba(79,70,229,0.45)] ring-4 ring-sky-100 sm:h-20 sm:w-20"
      aria-hidden
    >
      <svg
        className="h-8 w-8 text-white drop-shadow-sm sm:h-10 sm:w-10"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.847a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.847.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z"
        />
      </svg>
    </div>
  );
}

export function OptimizeOAuthResumeModal({
  open,
  onDismiss,
  onStartOptimization,
  isBusy = false,
}: OptimizeOAuthResumeModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/45 backdrop-blur-[2px] transition-colors"
        aria-label="Close dialog"
        onClick={() => {
          if (!isBusy) onDismiss();
        }}
      />
      <div
        className="relative w-full max-w-lg sm:max-w-2xl overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-[0_25px_80px_-12px_rgba(15,23,42,0.35)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="oauth-resume-title"
        aria-describedby="oauth-resume-desc"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-sky-50/90 to-transparent" />
        <div className="relative px-8 pb-10 pt-10 sm:px-12 sm:pb-12 sm:pt-12">
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <ReadyGlyph />
            <p
              className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-600 sm:text-xs"
              id="oauth-resume-eyebrow"
            >
              All set
            </p>
            <h2
              id="oauth-resume-title"
              className="mt-2 max-w-xl text-pretty text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl sm:leading-snug md:text-[2rem]"
            >
              {"You're signed in"}
            </h2>
            <p
              id="oauth-resume-desc"
              className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg"
            >
              Now start the optimizer to align your resume with the job you pasted.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:flex-nowrap sm:items-stretch sm:gap-3 md:gap-4">
            <button
              type="button"
              disabled={isBusy}
              onClick={() => onDismiss()}
              className="w-full shrink-0 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-base font-medium text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 disabled:opacity-50 sm:w-[min(100%,10rem)] sm:px-6"
            >
              Not now
            </button>
            <button
              type="button"
              disabled={isBusy}
              onClick={() => void onStartOptimization()}
              className="inline-flex w-full min-w-0 flex-1 items-center justify-center gap-2.5 rounded-2xl bg-slate-900 px-6 py-4 text-base font-semibold text-white shadow-[0_14px_40px_-14px_rgba(15,23,42,0.65)] transition hover:bg-slate-800 disabled:opacity-60 md:px-8"
            >
              {isBusy ? (
                <>
                  <span
                    className="h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-white/30 border-t-white"
                    aria-hidden
                  />
                  Starting…
                </>
              ) : (
                "Start optimization"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
