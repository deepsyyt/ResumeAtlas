"use client";

import {
  OptimizeAlignCard,
  type AlignBulletPreview,
} from "@/app/components/OptimizeAlignCard";
import { OptimizeCta } from "@/app/components/EvidenceMetricBar";
import type { ApplicationVerdict } from "@/app/lib/applicationVerdict";
import type { RecommendedFix } from "@/app/lib/recommendedFixes";
import { OPTIMIZE_ALIGN_CARD_TITLE, OPTIMIZE_CTA_LABEL_HERO } from "@/app/lib/evidenceMetricCopy";

export type OptimizeDashboardNudgeModalProps = {
  open: boolean;
  onDismiss: () => void;
  onOptimize: () => void | Promise<void>;
  verdict: ApplicationVerdict;
  selectedFixes: RecommendedFix[];
  allFixes: RecommendedFix[];
  bulletPreview?: AlignBulletPreview | null;
  isBusy?: boolean;
  /** Shown after a paid scan when 1 credit was deducted at dashboard generation. */
  creditNotice?: string | null;
};

/**
 * Post-dashboard modal — compact "Align before you apply" (no scroll).
 */
export function OptimizeDashboardNudgeModal({
  open,
  onDismiss,
  onOptimize,
  verdict,
  selectedFixes,
  allFixes,
  bulletPreview = null,
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
        className="optimize-nudge-modal relative flex w-full max-w-md flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_24px_64px_-16px_rgba(15,23,42,0.45)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="optimize-nudge-align-title"
      >
        <h2 id="optimize-nudge-align-title" className="sr-only">
          {OPTIMIZE_ALIGN_CARD_TITLE}
        </h2>
        <div className="px-3 py-2.5 sm:px-3.5 sm:py-3">
          {creditNotice ? (
            <p className="mb-2.5 rounded-lg border border-amber-200/90 bg-amber-50/90 px-3 py-2 text-xs leading-relaxed text-amber-950 sm:text-sm">
              {creditNotice}
            </p>
          ) : null}
          <OptimizeAlignCard
            verdict={verdict}
            selectedFixes={selectedFixes}
            allFixes={allFixes}
            bulletPreview={bulletPreview}
            disabled={selectedFixes.length === 0}
            busy={isBusy}
            heroLayout
            embedInModal
            className="!static min-w-0 border-0 bg-transparent p-0 shadow-none ring-0 lg:!static"
          />
        </div>
        <div className="shrink-0 border-t border-slate-200/80 bg-slate-50/70 px-3 py-2.5 sm:px-3.5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
            <button
              type="button"
              disabled={isBusy}
              onClick={() => onDismiss()}
              className="w-full shrink-0 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 disabled:opacity-50 sm:min-w-[6.5rem] sm:w-auto"
            >
              Not now
            </button>
            <OptimizeCta
              onClick={() => void onOptimize()}
              size="md"
              disabled={ctaDisabled}
              className="w-full min-w-0 flex-1"
              variant="purple"
              showSparkle
            >
              {isBusy ? "Starting…" : OPTIMIZE_CTA_LABEL_HERO}
            </OptimizeCta>
          </div>
        </div>
      </div>
    </div>
  );
}
