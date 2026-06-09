"use client";

export type OptimizeDashboardNudgeModalProps = {
  open: boolean;
  onDismiss: () => void;
  onOptimize: () => void | Promise<void>;
  isLoggedIn: boolean;
  isBusy?: boolean;
  isStartingGoogleAuth?: boolean;
};

const BENEFITS = [
  "Rewrite thin bullets with real architecture, deployment, and impact proof",
  "Move existing skills into the project bullets this job cares about",
  "Tailor your summary to lead with role-relevant proof, not tool lists",
  "Leave unsupported gaps honest — nothing invented",
] as const;

function SparkGlyph() {
  return (
    <div
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-[0_8px_24px_-10px_rgba(234,88,12,0.45)] ring-2 ring-amber-100"
      aria-hidden
    >
      <svg
        className="h-5 w-5 text-white drop-shadow-sm"
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

/**
 * Post-dashboard prompt to start evidence-gap optimization.
 */
export function OptimizeDashboardNudgeModal({
  open,
  onDismiss,
  onOptimize,
  isLoggedIn,
  isBusy = false,
  isStartingGoogleAuth = false,
}: OptimizeDashboardNudgeModalProps) {
  if (!open) return null;

  const busy = isBusy || isStartingGoogleAuth;
  const ctaLabel = isStartingGoogleAuth
    ? "Signing in with Google…"
    : isBusy
      ? "Starting…"
      : !isLoggedIn
        ? "Sign in & optimize for gaps"
        : "Optimize resume for evidence gaps";

  return (
    <div className="fixed inset-0 z-[62] flex items-center justify-center p-3 sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/45 backdrop-blur-[2px] transition-colors"
        aria-label="Dismiss"
        onClick={() => {
          if (!busy) onDismiss();
        }}
      />
      <div
        className="relative w-full max-w-md rounded-2xl border border-slate-200/90 bg-white shadow-[0_20px_60px_-12px_rgba(15,23,42,0.35)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="optimize-nudge-title"
        aria-describedby="optimize-nudge-desc"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-amber-50/90 to-transparent" />
        <div className="relative px-4 py-4 sm:px-5 sm:py-5">
          <div className="flex gap-3">
            <SparkGlyph />
            <div className="min-w-0 flex-1">
              <p
                className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-700"
                id="optimize-nudge-eyebrow"
              >
                Next step
              </p>
              <h2
                id="optimize-nudge-title"
                className="mt-0.5 text-pretty text-lg font-semibold leading-snug tracking-tight text-slate-900 sm:text-xl"
              >
                Close your evidence gaps for this job
              </h2>
            </div>
          </div>

          <p
            id="optimize-nudge-desc"
            className="mt-2.5 text-pretty text-xs leading-snug text-slate-600 sm:text-[13px]"
          >
            Your analysis flagged thin spots vs this job. One click strengthens those gaps with project
            proof — while leaving requirements you don&apos;t have honest.
          </p>

          <div className="mt-3 rounded-xl border border-slate-200/90 bg-slate-50/80 px-3 py-2.5">
            <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-500">
              What the optimizer will do
            </p>
            <ul className="mt-1.5 space-y-1 text-[11px] leading-snug text-slate-800 sm:text-xs">
              {BENEFITS.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="shrink-0 font-semibold text-emerald-600" aria-hidden>
                    +
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-stretch">
            <button
              type="button"
              disabled={busy}
              onClick={() => onDismiss()}
              className="w-full shrink-0 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 disabled:opacity-50 sm:w-auto sm:min-w-[6.5rem]"
            >
              Not now
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => void onOptimize()}
              className="inline-flex w-full min-w-0 flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-slate-800 disabled:opacity-60"
            >
              {busy ? (
                <>
                  <span
                    className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-white/30 border-t-white"
                    aria-hidden
                  />
                  {ctaLabel}
                </>
              ) : (
                ctaLabel
              )}
            </button>
          </div>

          {!isLoggedIn && !busy ? (
            <p className="mt-2 text-[11px] leading-snug text-slate-500">
              Google sign-in, then we optimize for the evidence gaps we found.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
