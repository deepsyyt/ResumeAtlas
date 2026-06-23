"use client";

import { useEffect, useId, useState } from "react";

type OptimizeAlignMetricsProps = {
  currentPct: number;
  projectedPct: number;
  uplift: number;
  className?: string;
  compact?: boolean;
  /** Hero align card: less top whitespace above the arc. */
  tight?: boolean;
  /** Dashboard grid align cell: match ShortlistGauge compact scale. */
  dashboardGrid?: boolean;
  /** When false, show percentage only (no arc). */
  showRing?: boolean;
};

/** Cropped viewBox — removes empty space above the arc so the ring sits under the label. */
const GAUGE_VIEWBOX = "0 42 280 106";

/** Shortlist odds gauge for the align card hero metrics. */
export function OptimizeAlignMetrics({
  currentPct,
  projectedPct,
  uplift,
  className = "",
  compact = false,
  tight = false,
  dashboardGrid = false,
  showRing = true,
}: OptimizeAlignMetricsProps) {
  const gradientId = useId().replace(/:/g, "");
  const trackId = useId().replace(/:/g, "");
  const pct = Math.max(0, Math.min(100, Math.round(projectedPct)));
  const [animatedPct, setAnimatedPct] = useState(pct);

  useEffect(() => {
    if (animatedPct === pct) return;
    const timer = window.setTimeout(() => setAnimatedPct(pct), 80);
    return () => window.clearTimeout(timer);
  }, [animatedPct, pct]);

  const cx = 140;
  const cy = 118;
  const radius = dashboardGrid ? 46 : 72;
  const strokeWidth = dashboardGrid ? 6 : 14;
  const startAngle = 180;
  const endAngle = 0;
  const arcSpan = startAngle - endAngle;
  const filledAngle = startAngle - (animatedPct / 100) * arcSpan;

  const polar = (angleDeg: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: cx + radius * Math.cos(rad),
      y: cy - radius * Math.sin(rad),
    };
  };

  const trackStart = polar(startAngle);
  const trackEnd = polar(endAngle);
  const progressEnd = polar(filledAngle);
  const filledSweep = startAngle - filledAngle;
  const largeArc = filledSweep > 180 ? 1 : 0;

  const trackPath = `M ${trackStart.x} ${trackStart.y} A ${radius} ${radius} 0 1 1 ${trackEnd.x} ${trackEnd.y}`;
  const progressPath =
    filledSweep > 0
      ? `M ${trackStart.x} ${trackStart.y} A ${radius} ${radius} 0 ${largeArc} 1 ${progressEnd.x} ${progressEnd.y}`
      : "";

  const gaugeHeight = dashboardGrid ? 76 : compact ? 88 : tight ? 96 : 104;
  const labelTop = dashboardGrid ? "40%" : compact ? "38%" : tight ? "36%" : "34%";
  const labelBottom = dashboardGrid ? "12%" : compact ? "14%" : tight ? "12%" : "10%";
  const pctClass = dashboardGrid
    ? "text-xl"
    : compact
      ? "text-[1.75rem]"
      : tight
        ? "text-[2rem]"
        : "text-[2.125rem]";
  const pctSuffixClass = dashboardGrid ? "text-sm" : compact ? "text-lg" : tight ? "text-xl" : "text-2xl";
  const gaugeMaxWidth = dashboardGrid
    ? "max-w-[132px]"
    : compact
      ? "max-w-[188px]"
      : tight
        ? "max-w-[220px]"
        : "max-w-[240px]";

  if (!showRing && dashboardGrid) {
    return (
      <div
        className={`flex w-full flex-col items-center gap-1 ${className}`}
        role="img"
        aria-label={`Shortlist odds ${pct} percent, up from ${currentPct} percent`}
      >
        <p className="score-row-card-value text-xl font-bold tabular-nums leading-none text-[#0d9488]">
          ~{animatedPct}
          <span className="text-sm font-semibold text-slate-400">%</span>
        </p>
        <span className="score-row-card-badge inline-flex rounded-full border border-teal-200/80 bg-teal-50/90 px-2.5 py-0.5 text-[9px] font-semibold tabular-nums tracking-wide text-teal-700">
          {currentPct}% → ~{pct}%
          {uplift > 0 ? (
            <span className="ml-1 font-semibold text-emerald-600">(+{uplift}%)</span>
          ) : null}
        </span>
      </div>
    );
  }

  if (!showRing) {
    return (
      <div
        className={`optimize-align-metrics flex w-full flex-col items-center ${
          dashboardGrid ? "optimize-align-metrics--dashboard-grid" : ""
        } ${className}`}
        role="img"
        aria-label={`Shortlist odds ${pct} percent, up from ${currentPct} percent`}
      >
        <p className={`shrink-0 font-bold leading-none tabular-nums text-[#0d9488] ${pctClass}`}>
          ~{animatedPct}
          <span className={`font-bold ${pctSuffixClass}`}>%</span>
        </p>
        <p
          className={`text-center leading-snug ${
            dashboardGrid ? "mt-0.5 text-[10px]" : compact ? "mt-0.5 text-xs" : "mt-1 text-sm"
          }`}
        >
          <span className="font-semibold tabular-nums text-slate-500">{currentPct}%</span>
          <span className="mx-1.5 text-slate-300" aria-hidden>
            →
          </span>
          <span className="font-bold tabular-nums text-[#0d9488]">~{pct}%</span>
          {uplift > 0 ? (
            <span className="ml-1 font-semibold tabular-nums text-[#22c55e]">(+{uplift}%)</span>
          ) : null}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`optimize-align-metrics flex w-full flex-col items-center ${
        dashboardGrid
          ? "optimize-align-metrics--dashboard-grid"
          : compact
            ? "optimize-align-metrics--compact"
            : tight
              ? "optimize-align-metrics--tight"
              : ""
      } ${className}`}
    >
      <div
        className={`optimize-align-gauge-wrap relative mx-auto w-full ${gaugeMaxWidth}`}
        style={{ height: gaugeHeight }}
        role="img"
        aria-label={`Shortlist odds ${pct} percent, up from ${currentPct} percent`}
      >
        <svg
          viewBox={GAUGE_VIEWBOX}
          preserveAspectRatio="xMidYMax meet"
          className="optimize-align-gauge-svg h-full w-full"
          aria-hidden
        >
          <defs>
            <linearGradient id={trackId} x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#ecfdf5" />
              <stop offset="100%" stopColor="#d1fae5" />
            </linearGradient>
            <linearGradient id={gradientId} x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#6ee7b7" />
              <stop offset="55%" stopColor="#2dd4bf" />
              <stop offset="100%" stopColor="#0d9488" />
            </linearGradient>
          </defs>

          <path
            d={trackPath}
            fill="none"
            stroke={`url(#${trackId})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className="optimize-align-gauge-track"
          />

          {progressPath ? (
            <path
              d={progressPath}
              fill="none"
              stroke={`url(#${gradientId})`}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
          ) : null}
        </svg>

        <div
          className="optimize-align-gauge-label absolute inset-x-0 flex flex-col items-center justify-center text-center"
          style={{ top: labelTop, bottom: labelBottom }}
        >
          <p className={`shrink-0 font-bold leading-none tabular-nums text-[#0d9488] ${pctClass}`}>
            ~{animatedPct}
            <span className={`font-bold ${pctSuffixClass}`}>%</span>
          </p>
          {!compact ? (
            <p className="mt-0.5 shrink-0 text-[10px] leading-none text-slate-500">shortlist odds</p>
          ) : null}
        </div>
      </div>

      <p
        className={`text-center leading-snug ${
          dashboardGrid ? "mt-0.5 text-[10px]" : compact ? "mt-0.5 text-xs" : "mt-1 text-sm"
        }`}
      >
        <span className="font-semibold tabular-nums text-slate-500">{currentPct}%</span>
        <span className="mx-1.5 text-slate-300" aria-hidden>
          →
        </span>
        <span className="font-bold tabular-nums text-[#0d9488]">~{pct}%</span>
        {uplift > 0 ? (
          <span className="ml-1 font-semibold tabular-nums text-[#22c55e]">(+{uplift}%)</span>
        ) : null}
      </p>
      {!compact && !dashboardGrid ? (
        <p className="mt-0.5 text-[11px] text-slate-500">Estimated shortlist odds</p>
      ) : null}
    </div>
  );
}
