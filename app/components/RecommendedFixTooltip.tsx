"use client";

import type { RecommendedFix } from "@/app/lib/recommendedFixes";
import {
  recommendedFixActionLabel,
  recommendedFixPlacementLabel,
} from "@/app/lib/recommendedFixes";

type RecommendedFixTooltipProps = {
  fix: RecommendedFix;
};

export function RecommendedFixTooltip({ fix }: RecommendedFixTooltipProps) {
  const fullAction = fix.action.trim();
  const shortLabel = recommendedFixActionLabel(fix);
  const placement = recommendedFixPlacementLabel(fix);
  const detail = fix.detail?.trim();
  const showFullAction = fullAction !== shortLabel;

  if (!showFullAction && !detail) return null;

  return (
    <span
      className="recommended-fix-tooltip pointer-events-none absolute bottom-full left-0 z-30 mb-1 hidden w-[min(100%,18rem)] rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-left shadow-lg group-hover/fix:block group-focus-within/fix:block"
      role="tooltip"
    >
      {showFullAction ? (
        <span className="block text-[11px] font-medium leading-snug text-slate-900">{fullAction}</span>
      ) : null}
      {placement ? (
        <span
          className={`block text-[10px] leading-snug text-slate-500${
            showFullAction ? " mt-1" : " font-semibold text-slate-900"
          }`}
        >
          {placement}
        </span>
      ) : null}
      {detail ? (
        <span className="mt-1 block text-[10px] leading-snug text-slate-600">{detail}</span>
      ) : null}
    </span>
  );
}
