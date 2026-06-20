"use client";

import { useEffect, useId, useState } from "react";

type ShortlistGaugeProps = {
  value: number;
  className?: string;
  compact?: boolean;
  /** Tier accent for score + arc (from application verdict). */
  accentHex?: string;
};

export function ShortlistGauge({
  value,
  className = "",
  compact = false,
  accentHex = "#6366f1",
}: ShortlistGaugeProps) {
  const gradientId = useId().replace(/:/g, "");
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  const radius = compact ? 46 : 72;
  const strokeWidth = compact ? 4 : 8;
  const cx = 100;
  const cy = compact ? 82 : 92;
  const startX = cx - radius;
  const endX = cx + radius;
  const pathD = `M ${startX} ${cy} A ${radius} ${radius} 0 0 1 ${endX} ${cy}`;
  const arcLength = Math.PI * radius;
  const [animatedPct, setAnimatedPct] = useState(pct);

  useEffect(() => {
    if (animatedPct === pct) return;
    const timer = window.setTimeout(() => setAnimatedPct(pct), 60);
    return () => window.clearTimeout(timer);
  }, [animatedPct, pct]);

  const progress = (animatedPct / 100) * arcLength;

  return (
    <div
      className={`relative mx-auto w-full ${compact ? "max-w-[124px]" : "max-w-[220px]"} ${className}`}
      role="img"
      aria-label={`${pct}% shortlist chance`}
    >
      <svg
        viewBox={compact ? "0 0 200 96" : "0 0 200 118"}
        className="h-auto w-full"
        aria-hidden
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="45%" stopColor={accentHex} />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
        <path
          d={pathD}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <path
          d={pathD}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${progress} ${arcLength}`}
          className="shortlist-gauge-progress transition-[stroke-dasharray] duration-700 ease-out"
        />
      </svg>

      <div
        className={`absolute inset-x-0 flex flex-col items-center justify-end ${
          compact ? "bottom-0 top-[42%]" : "bottom-0 top-[36%]"
        }`}
      >
        <p
          className={`score-row-card-value font-bold tabular-nums leading-none ${
            compact ? "text-xl" : "text-2xl sm:text-[1.75rem]"
          }`}
          style={{ color: accentHex }}
        >
          {animatedPct}
          <span
            className={`font-semibold text-slate-400 ${compact ? "text-sm" : "text-lg"}`}
          >
            %
          </span>
        </p>
      </div>
    </div>
  );
}
