"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { OptimizeCta } from "@/app/components/EvidenceMetricBar";
import type { ApplicationVerdict } from "@/app/lib/applicationVerdict";
import {
  OPTIMIZE_ALIGN_PRIVACY_NOTE,
  OPTIMIZE_CTA_LABEL_HERO,
  RECOMMENDED_FIXES_INTRO,
  RECOMMENDED_FIXES_INTRO_COMPACT,
  RECOMMENDED_FIXES_IMPACT_TITLE,
  RECOMMENDED_FIXES_TITLE,
} from "@/app/lib/evidenceMetricCopy";
import { RecommendedFixTooltip } from "@/app/components/RecommendedFixTooltip";
import {
  distributeFixUplift,
  recommendedFixActionLabel,
  recommendedFixKey,
  type RecommendedFix,
  selectedFixUpliftTotal,
} from "@/app/lib/recommendedFixes";

type RecommendedFixesSectionProps = {
  fixes: RecommendedFix[];
  verdict: ApplicationVerdict;
  className?: string;
  selectedFixes?: RecommendedFix[];
  onSelectionChange?: (fixes: RecommendedFix[]) => void;
  /** Sample dashboard: all fixes appear selected without parent state. */
  demo?: boolean;
  /** Inside dashboard impact column — no outer card chrome. */
  embedded?: boolean;
  /** Middle impact column: title, intro, and fix list. */
  impactCardEmbed?: boolean;
  /** Dashboard impact row: purple optimize CTA below the fix list. */
  showOptimizeCta?: boolean;
  onOptimize?: () => void;
  optimizeDisabled?: boolean;
  optimizeBusy?: boolean;
  /** Workbench grid column — shorter title, tighter spacing. */
  compactDashboard?: boolean;
  uniformActionCard?: boolean;
};

export function RecommendedFixesSection({
  fixes,
  verdict,
  className = "",
  selectedFixes,
  onSelectionChange,
  demo = false,
  embedded = false,
  impactCardEmbed = false,
  showOptimizeCta = false,
  onOptimize,
  optimizeDisabled = false,
  optimizeBusy = false,
  compactDashboard = false,
  uniformActionCard = false,
}: RecommendedFixesSectionProps) {
  const fixesKey = useMemo(() => fixes.map(recommendedFixKey).join("\0"), [fixes]);
  const [internalSelected, setInternalSelected] = useState<Set<string>>(() => new Set());

  const isControlled = onSelectionChange != null;
  const selectedSet = useMemo(() => {
    if (demo) return new Set(fixes.map(recommendedFixKey));
    if (isControlled) return new Set((selectedFixes ?? []).map(recommendedFixKey));
    return internalSelected;
  }, [demo, fixes, internalSelected, isControlled, selectedFixes]);

  useEffect(() => {
    if (demo) {
      setInternalSelected(new Set(fixes.map(recommendedFixKey)));
      return;
    }
    setInternalSelected(new Set());
  }, [demo, fixesKey, fixes]);

  const uplifts = useMemo(
    () => distributeFixUplift(verdict.shortlistUplift, fixes.length),
    [fixes.length, verdict.shortlistUplift]
  );

  const selectedList = fixes.filter((f) => selectedSet.has(recommendedFixKey(f)));
  const projectedUplift = demo
    ? verdict.shortlistUplift
    : selectedFixUpliftTotal(fixes, selectedList, verdict);

  const toggleFix = useCallback(
    (fix: RecommendedFix) => {
      if (demo) return;
      const key = recommendedFixKey(fix);
      const next = new Set(selectedSet);
      if (next.has(key)) {
        if (next.size <= 1) return;
        next.delete(key);
      } else {
        next.add(key);
      }
      const nextList = fixes.filter((item) => next.has(recommendedFixKey(item)));
      if (isControlled) onSelectionChange?.(nextList);
      else setInternalSelected(new Set(nextList.map(recommendedFixKey)));
    },
    [demo, fixes, isControlled, onSelectionChange, selectedSet]
  );

  if (fixes.length === 0) return null;

  const ctaDisabled = demo || optimizeDisabled || optimizeBusy || !onOptimize;
  const sectionTitle = RECOMMENDED_FIXES_TITLE;
  const sectionIntro = compactDashboard ? RECOMMENDED_FIXES_INTRO_COMPACT : RECOMMENDED_FIXES_INTRO;
  const upliftBadgeClass = compactDashboard
    ? "shrink-0 rounded-full bg-emerald-100 px-1.5 py-px text-[10px] font-bold leading-none text-emerald-700"
    : "shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-700";

  const list = (
    <div
      className={`recommended-fixes-list flex flex-col ${
        compactDashboard ? "mt-2 gap-1.5" : embedded || impactCardEmbed ? "mt-1 gap-1.5" : "mt-3 gap-1.5"
      }`}
    >
      {fixes.map((fix, index) => {
        const checked = selectedSet.has(recommendedFixKey(fix));
        const uplift = uplifts[index] ?? 0;
        return (
          <div key={`${index}-${recommendedFixKey(fix)}`} className="group/fix relative min-w-0">
            <button
              type="button"
              disabled={demo}
              onClick={() => toggleFix(fix)}
              aria-label={recommendedFixActionLabel(fix)}
              className={`recommended-fix-toggle flex w-full min-w-0 items-start gap-3 rounded-xl text-left transition ${
                compactDashboard ? "px-3 py-2.5" : "px-3 py-3"
              } ${
                checked
                  ? "recommended-fix-toggle--selected border border-emerald-200/60 bg-emerald-50/80 shadow-sm"
                  : "border border-transparent bg-slate-50/60 hover:bg-slate-100/70"
              }`}
              aria-pressed={checked}
            >
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[10px] font-bold transition ${
                  checked
                    ? "bg-emerald-500 text-white shadow-sm shadow-emerald-500/30"
                    : "border border-slate-200 bg-white text-transparent"
                }`}
                aria-hidden
              >
                ✓
              </span>
              <span className="recommended-fix-label min-w-0 flex-1 text-pretty text-xs font-medium leading-snug text-slate-800">
                {recommendedFixActionLabel(fix)}
              </span>
              {uplift > 0 ? (
                <span className="recommended-fix-uplift mt-0.5 shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold tabular-nums leading-none text-emerald-700">
                  (+{uplift}%)
                </span>
              ) : null}
            </button>
            <RecommendedFixTooltip fix={fix} />
          </div>
        );
      })}
    </div>
  );

  if (impactCardEmbed) {
    return (
      <div className={className}>
        <div className="mb-2.5 flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="optimization-impact-card__fixes-title">{RECOMMENDED_FIXES_IMPACT_TITLE}</h3>
            <p className="mt-1 text-[11px] leading-snug text-slate-500">{RECOMMENDED_FIXES_INTRO}</p>
          </div>
          {projectedUplift > 0 ? (
            <span className="shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
              +{projectedUplift}% projected
            </span>
          ) : null}
        </div>
        {list}
      </div>
    );
  }

  if (embedded) {
    return (
      <div className={className}>
        <div className="mb-2 flex items-start justify-between gap-2">
          <p className="text-[11px] leading-snug text-slate-500">{RECOMMENDED_FIXES_INTRO}</p>
          {projectedUplift > 0 ? (
            <span className="shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
              +{projectedUplift}% projected
            </span>
          ) : null}
        </div>
        {list}
      </div>
    );
  }

  return (
    <section
      className={`recommended-fixes-dashboard-card dashboard-content-card flex h-full min-w-0 flex-col overflow-visible ${
        compactDashboard ? "px-3 py-3" : "px-4 py-3.5 sm:px-4 sm:py-4"
      } ${className}`}
      aria-labelledby="recommended-fixes-heading"
    >
      <div
        className={`recommended-fixes-dashboard-header min-w-0${
          uniformActionCard ? " dashboard-action-card-head dashboard-action-card-head--fixes" : ""
        }`}
      >
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <h3
            id="recommended-fixes-heading"
            className={
              uniformActionCard
                ? "dashboard-action-card-title dashboard-action-card-title--fixes min-w-0 flex-1 text-pretty"
                : `min-w-0 flex-1 text-pretty font-bold leading-tight tracking-tight text-slate-900 ${
                    compactDashboard ? "text-[13px]" : "text-sm sm:text-[0.9375rem]"
                  }`
            }
          >
            {sectionTitle}
          </h3>
          {projectedUplift > 0 ? (
            <span
              className={
                uniformActionCard
                  ? "dashboard-action-card-badge shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700"
                  : upliftBadgeClass
              }
            >
              +{projectedUplift}% projected
            </span>
          ) : null}
        </div>
        <p
          className={
            uniformActionCard
              ? "dashboard-action-card-intro text-pretty"
              : `text-pretty leading-snug text-slate-500 ${
                  compactDashboard ? "mt-1 hidden" : "mt-1 text-[11px]"
                }`
          }
        >
          {sectionIntro}
        </p>
      </div>

      {list}

      {showOptimizeCta ? (
        <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
          <OptimizeCta
            onClick={() => onOptimize?.()}
            size="lg"
            disabled={ctaDisabled}
            className="w-full"
            variant="purple"
            showSparkle
            steadyChevrons={!demo}
          >
            {optimizeBusy ? "Starting…" : OPTIMIZE_CTA_LABEL_HERO}
          </OptimizeCta>
          <p className="text-center text-[10px] leading-snug text-slate-500">
            Apply selected fixes &amp; see your improved resume
          </p>
          <p className="optimize-align-privacy-note justify-center">
            <svg viewBox="0 0 16 16" className="h-3 w-3 shrink-0" fill="currentColor" aria-hidden>
              <path d="M8 1a3 3 0 0 0-3 3v2H4a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1V4a3 3 0 0 0-3-3zm1 5H7V4a1 1 0 1 1 2 0v2z" />
            </svg>
            {OPTIMIZE_ALIGN_PRIVACY_NOTE}
          </p>
        </div>
      ) : null}
    </section>
  );
}
