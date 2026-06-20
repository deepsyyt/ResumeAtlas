"use client";

import { useEffect, useId, useState } from "react";

type OptimizeHubVisualProps = {
  value: number;
  steps: readonly string[];
  className?: string;
  /** Gauge only — hides numbered steps (align card). */
  compact?: boolean;
  /** Large hero gauge for optimize panel. */
  hero?: boolean;
};

/** Infographic hub: green arc ring + optional numbered steps. */
export function OptimizeHubVisual({
  value,
  steps,
  className = "",
  compact = false,
  hero = false,
}: OptimizeHubVisualProps) {
  const gradientId = useId().replace(/:/g, "");
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  const [animatedPct, setAnimatedPct] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => setAnimatedPct(pct), 80);
    return () => window.clearTimeout(timer);
  }, [pct]);

  const cx = 70;
  const cy = 70;
  const size = hero ? 176 : compact ? 104 : 140;
  const arcRadius = hero ? 52 : compact ? 36 : 48;
  const outerRadius = hero ? 62 : compact ? 44 : 58;
  const strokeWidth = hero ? 12 : compact ? 9 : 11;
  const arcDegrees = 250;
  const filledDegrees = (animatedPct / 100) * arcDegrees;
  const startAngle = 135;
  const endAngle = startAngle + filledDegrees;

  const polar = (angleDeg: number, radius: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: cx + radius * Math.cos(rad),
      y: cy + radius * Math.sin(rad),
    };
  };

  const trackEnd = polar(startAngle + arcDegrees, arcRadius);
  const trackStart = polar(startAngle, arcRadius);
  const progressEnd = polar(endAngle, arcRadius);
  const largeArc = filledDegrees > 180 ? 1 : 0;

  const trackPath = `M ${trackStart.x} ${trackStart.y} A ${arcRadius} ${arcRadius} 0 1 1 ${trackEnd.x} ${trackEnd.y}`;
  const progressPath =
    filledDegrees > 0
      ? `M ${trackStart.x} ${trackStart.y} A ${arcRadius} ${arcRadius} 0 ${largeArc} 1 ${progressEnd.x} ${progressEnd.y}`
      : "";

  const outerDots = Array.from({ length: 8 }, (_, index) => {
    const angle = startAngle + (arcDegrees / 7) * index;
    const point = polar(angle, outerRadius);
    return point;
  });

  return (
    <div className={`flex items-center gap-2.5 ${hero ? "flex-col" : ""} ${className}`}>
      <div
        className="relative mx-auto shrink-0"
        style={{ width: size, height: size }}
        role="img"
        aria-label={`Projected shortlist odds ${pct} percent`}
      >
        <svg viewBox="0 0 140 140" className="h-full w-full overflow-visible" aria-hidden>
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#047857" />
              <stop offset="45%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#6ee7b7" />
            </linearGradient>
          </defs>

          <circle
            cx={cx}
            cy={cy}
            r={outerRadius}
            fill="none"
            stroke="#bbf7d0"
            strokeWidth={1.25}
            strokeDasharray="3.5 5.5"
            opacity={0.85}
          />

          {outerDots.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r={index % 2 === 0 ? 2.2 : 1.6}
              fill={index % 2 === 0 ? "#34d399" : "#a7f3d0"}
            />
          ))}

          <path
            d={trackPath}
            fill="none"
            stroke="#ecfdf5"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
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
          className={`absolute flex flex-col items-center justify-center rounded-full bg-white text-center shadow-[0_4px_24px_rgba(16,185,129,0.15)] ${
            hero ? "inset-[28px] ring-0" : `ring-1 ring-emerald-100 ${compact ? "inset-[22px]" : "inset-[26px]"}`
          }`}
        >
          {!hero ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className={`mb-0.5 text-emerald-600 ${compact ? "h-3 w-3" : "h-4 w-4"}`}
              aria-hidden
            >
              <path
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : null}
          <p
            className={`font-semibold uppercase leading-tight tracking-wide text-emerald-700/75 ${
              hero ? "text-[9px]" : compact ? "text-[7px]" : "text-[8px]"
            }`}
          >
            Projected
          </p>
          <p
            className={`font-bold tabular-nums leading-none text-emerald-700 ${
              hero ? "text-[2.5rem]" : compact ? "text-lg" : "text-[1.35rem]"
            }`}
          >
            ~{animatedPct}
            <span className={hero ? "text-xl" : compact ? "text-xs" : "text-sm"}>%</span>
          </p>
        </div>
      </div>

      {!compact && steps.length > 0 ? (
      <ol className="min-w-0 flex-1 space-y-1.5 pr-0.5">
        {steps.map((step, index) => (
          <li key={step} className="flex items-start gap-1.5">
            <span className="w-4 shrink-0 pt-px text-center text-sm font-bold tabular-nums leading-none text-emerald-600">
              {index + 1}
            </span>
            <span className="mt-0.5 h-4 w-px shrink-0 rounded-full bg-emerald-400/80" aria-hidden />
            <span className="text-[9px] font-semibold leading-tight text-slate-800">{step}</span>
          </li>
        ))}
      </ol>
      ) : null}
    </div>
  );
}
