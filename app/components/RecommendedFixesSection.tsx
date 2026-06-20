"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ApplicationVerdict } from "@/app/lib/applicationVerdict";
import {
  RECOMMENDED_FIXES_INTRO,
  RECOMMENDED_FIXES_TITLE,
} from "@/app/lib/evidenceMetricCopy";
import {
  distributeFixUplift,
  recommendedFixActionLabel,
  recommendedFixKey,
  recommendedFixPlacementLabel,
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
};

function FixPlacementTooltip({ fix }: { fix: RecommendedFix }) {
  const placement = recommendedFixPlacementLabel(fix);
  const detail = fix.detail?.trim();

  return (
    <span
      className="pointer-events-none absolute left-0 top-full z-20 mt-1 hidden w-[min(100%,16rem)] rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-left shadow-lg group-hover/fix:block group-focus-within/fix:block"
      role="tooltip"
    >
      <span className="block text-[10px] font-semibold leading-snug text-slate-900">{placement}</span>
      {detail ? (
        <span className="mt-1 block text-[10px] leading-snug text-slate-600">{detail}</span>
      ) : null}
    </span>
  );
}

export function RecommendedFixesSection({
  fixes,
  verdict,
  className = "",
  selectedFixes,
  onSelectionChange,
  demo = false,
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

  return (
    <section className={`dashboard-content-card px-3 py-3 ${className}`} aria-labelledby="recommended-fixes-heading">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3
            id="recommended-fixes-heading"
            className="text-[11px] font-semibold leading-snug text-slate-800"
          >
            {RECOMMENDED_FIXES_TITLE}
          </h3>
          <p className="mt-0.5 text-[10px] leading-snug text-slate-500">{RECOMMENDED_FIXES_INTRO}</p>
        </div>
        {projectedUplift > 0 ? (
          <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
            +{projectedUplift}% projected
          </span>
        ) : null}
      </div>

      <div className="mt-2.5 flex flex-col gap-1.5">
        {fixes.map((fix, index) => {
          const checked = selectedSet.has(recommendedFixKey(fix));
          const uplift = uplifts[index] ?? 0;
          return (
            <div key={`${index}-${recommendedFixKey(fix)}`} className="group/fix relative">
              <button
                type="button"
                disabled={demo}
                onClick={() => toggleFix(fix)}
                aria-label={`${recommendedFixActionLabel(fix)}. ${recommendedFixPlacementLabel(fix)}`}
                className={`recommended-fix-toggle flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-left transition ${
                  checked
                    ? "bg-emerald-50/90 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                    : "bg-slate-50/80 hover:bg-slate-100/80"
                }`}
                aria-pressed={checked}
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px] font-bold ${
                    checked
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : "border-slate-300 bg-white text-transparent"
                  }`}
                  aria-hidden
                >
                  ✓
                </span>
                <span className="min-w-0 flex-1 text-[11px] font-medium leading-snug text-slate-800">
                  {recommendedFixActionLabel(fix)}
                </span>
                {uplift > 0 ? (
                  <span className="shrink-0 text-[10px] font-semibold tabular-nums text-emerald-700">
                    (+{uplift}%)
                  </span>
                ) : null}
              </button>
              <FixPlacementTooltip fix={fix} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
