"use client";

import { OptimizeNudgeModalContent } from "@/app/components/OptimizeNudgeModalContent";
import { OptimizeCta } from "@/app/components/EvidenceMetricBar";
import type { ApplicationVerdict } from "@/app/lib/applicationVerdict";
import type { RecommendedFix } from "@/app/lib/recommendedFixes";
import {
  LOGIN_NUDGE_BANNER,
  LOGIN_NUDGE_HEADLINE,
  OPTIMIZE_CTA_LABEL_HERO,
  OPTIMIZE_NUDGE_PRIVACY_FOOTER,
} from "@/app/lib/evidenceMetricCopy";

export type OptimizeOAuthResumeModalProps = {
  open: boolean;
  onDismiss: () => void;
  onStartOptimization: () => void | Promise<void>;
  verdict: ApplicationVerdict;
  selectedFixes: RecommendedFix[];
  allFixes: RecommendedFix[];
  isBusy?: boolean;
};

/**
 * Post-OAuth modal — same layout as the dashboard nudge.
 */
export function OptimizeOAuthResumeModal({
  open,
  onDismiss,
  onStartOptimization,
  verdict,
  selectedFixes,
  allFixes,
  isBusy = false,
}: OptimizeOAuthResumeModalProps) {
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
        aria-labelledby="oauth-resume-align-title"
      >
        <h2 id="oauth-resume-align-title" className="sr-only">
          {LOGIN_NUDGE_HEADLINE}
        </h2>

        <div className="optimize-nudge-modal__credit optimize-nudge-modal__credit--oauth">
          <p>{LOGIN_NUDGE_BANNER}</p>
        </div>

        <div className="optimize-nudge-modal__body px-3.5 py-2.5 sm:px-4 sm:py-3">
          <OptimizeNudgeModalContent
            variant="post_login"
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
              onClick={() => void onStartOptimization()}
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
