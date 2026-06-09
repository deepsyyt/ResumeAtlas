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
  "Rewrite bullets where proof is thin — stronger architecture, deployment, and impact from work you already did",
  "Move skills you already have into the project bullets this job cares about",
  "Tailor your summary so it leads with role-relevant proof, not a tool list",
  "Leave real evidence gaps honest — we never invent skills or experience",
] as const;

function SparkGlyph() {
  return (
    <div
      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-[0_12px_40px_-12px_rgba(234,88,12,0.45)] ring-4 ring-amber-100 sm:h-20 sm:w-20"
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

/**
 * Full-screen-style prompt after dashboard generation so users notice optimization
 * (Intelligence panel CTA is easy to miss).
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
    <div className="fixed inset-0 z-[62] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/45 backdrop-blur-[2px] transition-colors"
        aria-label="Dismiss"
        onClick={() => {
          if (!busy) onDismiss();
        }}
      />
      <div
        className="relative w-full max-w-lg sm:max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border border-slate-200/90 bg-white shadow-[0_25px_80px_-12px_rgba(15,23,42,0.35)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="optimize-nudge-title"
        aria-describedby="optimize-nudge-desc"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-amber-50/90 to-transparent" />
        <div className="relative px-8 pb-10 pt-10 sm:px-12 sm:pb-12 sm:pt-12">
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <SparkGlyph />
            <p
              className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-700 sm:text-xs"
              id="optimize-nudge-eyebrow"
            >
              Next step
            </p>
            <h2
              id="optimize-nudge-title"
              className="mt-2 max-w-xl text-pretty text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl sm:leading-snug md:text-[2rem]"
            >
              Close your evidence gaps for this job
            </h2>
            <p id="optimize-nudge-desc" className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg">
              Your analysis flagged where your resume is thin vs this job description. One click optimizes
              your resume to strengthen those gaps — turning skills-list language into project proof — while
              leaving requirements you don&apos;t have honest.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200/90 bg-slate-50/80 px-5 py-5 sm:px-6 sm:py-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
              What the optimizer will do
            </p>
            <ul className="mt-3 space-y-2.5 text-base text-slate-800">
              {BENEFITS.map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-0.5 font-semibold text-emerald-600" aria-hidden>
                    +
                  </span>
                  <span className="leading-snug">{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:flex-nowrap sm:items-stretch sm:gap-3 md:gap-4">
            <button
              type="button"
              disabled={busy}
              onClick={() => onDismiss()}
              className="w-full shrink-0 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-base font-medium text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 disabled:opacity-50 sm:w-[min(100%,10rem)] sm:px-6"
            >
              Not now
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => void onOptimize()}
              className="inline-flex w-full min-w-0 flex-1 items-center justify-center gap-2.5 rounded-2xl bg-slate-900 px-6 py-4 text-base font-semibold text-white shadow-[0_14px_40px_-14px_rgba(15,23,42,0.65)] transition hover:bg-slate-800 disabled:opacity-60 md:px-8"
            >
              {busy ? (
                <>
                  <span
                    className="h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-white/30 border-t-white"
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
            <p className="mt-4 text-center text-sm text-slate-500 sm:text-left">
              We&apos;ll send you through Google sign-in, then optimize your resume for the evidence gaps
              we found.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
