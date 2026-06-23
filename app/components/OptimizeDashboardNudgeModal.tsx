"use client";

import { OptimizeNudgeModalContent } from "@/app/components/OptimizeNudgeModalContent";
import { OptimizeCta } from "@/app/components/EvidenceMetricBar";
import type { ApplicationVerdict } from "@/app/lib/applicationVerdict";
import type { RecommendedFix } from "@/app/lib/recommendedFixes";
import {
  OPTIMIZE_CTA_LABEL_HERO,
  OPTIMIZE_NUDGE_CREDIT_APPLIED,
  OPTIMIZE_NUDGE_HEADLINE,
  OPTIMIZE_NUDGE_PRIVACY_FOOTER,
} from "@/app/lib/evidenceMetricCopy";

export type OptimizeDashboardNudgeModalProps = {
  open: boolean;
  onDismiss: () => void;
  onOptimize: () => void | Promise<void>;
  verdict: ApplicationVerdict;
  selectedFixes: RecommendedFix[];
  allFixes: RecommendedFix[];
  isBusy?: boolean;
  /** Shown after a paid scan when 1 credit was deducted at dashboard generation. */
  creditNotice?: string | null;
};

function CreditNoticeBanner({ notice }: { notice: string }) {
  const rest = notice.startsWith(OPTIMIZE_NUDGE_CREDIT_APPLIED)
    ? notice.slice(OPTIMIZE_NUDGE_CREDIT_APPLIED.length).trim()
    : notice;

  return (
    <div className="optimize-nudge-modal__credit">
      <svg viewBox="0 0 16 16" fill="currentColor" className="optimize-nudge-modal__credit-icon" aria-hidden>
        <path d="M8 1.2l1.62 3.28 3.62.53-2.62 2.55.62 3.61L8 9.98 4.76 11.17l.62-3.61L2.76 5.01l3.62-.53L8 1.2z" />
      </svg>
      <p>
        {notice.startsWith(OPTIMIZE_NUDGE_CREDIT_APPLIED) ? (
          <>
            <strong>{OPTIMIZE_NUDGE_CREDIT_APPLIED}</strong> {rest}
          </>
        ) : (
          notice
        )}
      </p>
    </div>
  );
}

/**
 * Post-dashboard modal — optimize nudge after analysis.
 */
export function OptimizeDashboardNudgeModal({
  open,
  onDismiss,
  onOptimize,
  verdict,
  selectedFixes,
  allFixes,
  isBusy = false,
  creditNotice = null,
}: OptimizeDashboardNudgeModalProps) {
  if (!open) return null;

  const ctaDisabled = isBusy || selectedFixes.length === 0;

  return (
    <div className="fixed inset-0 z-[62] flex items-end justify-center p-3 sm:items-center sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/50 backdrop-blur-[3px] transition-colors"
        aria-label="Dismiss"
        onClick={() => {
          if (!isBusy) onDismiss();
        }}
      />
      <div
        className="optimize-nudge-modal relative flex w-full max-w-[22.5rem] flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_24px_64px_-16px_rgba(15,23,42,0.45)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="optimize-nudge-align-title"
      >
        <h2 id="optimize-nudge-align-title" className="sr-only">
          {OPTIMIZE_NUDGE_HEADLINE}
        </h2>

        {creditNotice ? <CreditNoticeBanner notice={creditNotice} /> : null}

        <div className="optimize-nudge-modal__body px-3.5 py-2.5 sm:px-4 sm:py-3">
          <OptimizeNudgeModalContent
            variant="post_analysis"
            verdict={verdict}
            selectedFixes={selectedFixes}
            allFixes={allFixes}
          />
        </div>

        <div className="optimize-nudge-modal__footer shrink-0 border-t border-slate-200/80 bg-white px-3.5 py-2.5 sm:px-4">
          <div className="optimize-nudge-modal__footer-actions">
            <button
              type="button"
              disabled={isBusy}
              onClick={() => onDismiss()}
              className="w-auto shrink-0 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 disabled:opacity-50"
            >
              Not now
            </button>
            <OptimizeCta
              onClick={() => void onOptimize()}
              size="lg"
              disabled={ctaDisabled}
              className="w-full min-w-0 flex-1"
              variant="purple"
              showSparkle
            >
              {isBusy ? "Starting…" : OPTIMIZE_CTA_LABEL_HERO}
            </OptimizeCta>
          </div>
          <p className="optimize-nudge-modal__privacy">
            <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden>
              <path d="M8 1a3 3 0 0 0-3 3v2H4a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1V4a3 3 0 0 0-3-3zm1 5H7V4a1 1 0 1 1 2 0v2z" />
            </svg>
            {OPTIMIZE_NUDGE_PRIVACY_FOOTER}
          </p>
        </div>
      </div>
    </div>
  );
}
