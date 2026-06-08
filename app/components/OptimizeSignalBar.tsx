"use client";

import { AnimatedScoreBar, barColorForDelta } from "@/app/components/EvidenceMetricBar";
import { getScoreStyle } from "@/app/lib/scoreColors";

export type OptimizeSignalBarProps = {
  label: string;
  value: number;
  beforeValue?: number;
  hint?: string;
  countLabel?: string;
  /** Bullets in rewrites that newly gained this signal. */
  rewriteGained?: number;
  /** Bullets that already had this signal and were strengthened in rewrites. */
  rewriteStrengthened?: number;
  index?: number;
};

export function OptimizeSignalBar({
  label,
  value,
  beforeValue,
  hint,
  countLabel,
  rewriteGained = 0,
  rewriteStrengthened = 0,
  index = 0,
}: OptimizeSignalBarProps) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  const beforePct =
    beforeValue != null ? Math.max(0, Math.min(100, Math.round(beforeValue))) : undefined;
  const delta = beforePct != null ? pct - beforePct : undefined;
  const rewriteImproved = rewriteGained > 0 || rewriteStrengthened > 0;
  const improved = (delta != null && delta > 0) || rewriteImproved;
  const emerald = "#16A34A";
  const displayStyle = improved ? { hex: emerald } : getScoreStyle(pct);
  const barColor =
    rewriteImproved || (delta != null && delta > 0) ? emerald : barColorForDelta(delta, pct);

  return (
    <div
      className={`rounded-lg border px-2.5 py-2 transition-shadow ${
        improved
          ? "border-emerald-200/80 bg-emerald-50/40 hover:shadow-sm"
          : "border-white/80 bg-white/70 hover:shadow-sm"
      }`}
    >
      <div className="flex items-center justify-between gap-2 text-[10px]">
        <span className="font-semibold text-slate-700">{label}</span>
        <span className="tabular-nums font-bold">
          {beforePct != null && beforePct !== pct ? (
            <span className="text-slate-400 font-semibold">{beforePct}% → </span>
          ) : null}
          <span style={{ color: displayStyle.hex }}>{pct}%</span>
          {delta != null && delta !== 0 ? (
            <span className={delta > 0 ? " text-emerald-700" : " text-amber-800"}>
              {" "}
              ({delta > 0 ? "+" : ""}
              {delta})
            </span>
          ) : null}
        </span>
      </div>
      <AnimatedScoreBar
        value={pct}
        beforeValue={beforePct}
        colorHex={barColor}
        className="mt-1.5"
        heightClass="h-2"
        delayMs={index * 50}
      />
      {rewriteGained > 0 ? (
        <p className="mt-1 text-[9px] font-semibold text-emerald-800">
          +{rewriteGained} in rewrites gained this proof
        </p>
      ) : null}
      {rewriteStrengthened > 0 ? (
        <p className="mt-1 text-[9px] font-semibold text-emerald-800">
          {rewriteStrengthened} in rewrites strengthened this proof
        </p>
      ) : null}
      {countLabel ? (
        <p className="mt-0.5 text-[9px] font-medium text-slate-600">{countLabel}</p>
      ) : null}
      {hint ? <p className="mt-0.5 text-[9px] leading-snug text-slate-500">{hint}</p> : null}
    </div>
  );
}
