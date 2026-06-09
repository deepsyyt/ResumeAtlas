"use client";

import { useEffect, useState } from "react";
import { getScoreStyle } from "@/app/lib/scoreColors";
import type { EvidenceStrength } from "@/app/lib/resumeEvidenceScore";

export function strengthBarPercent(strength: EvidenceStrength): number {
  switch (strength) {
    case "strong":
      return 100;
    case "medium":
      return 62;
    case "weak":
      return 28;
    case "gap":
      return 0;
  }
}

export function strengthBarHex(strength: EvidenceStrength): string {
  switch (strength) {
    case "strong":
      return "#16A34A";
    case "medium":
      return "#0EA5E9";
    case "weak":
      return "#F59E0B";
    case "gap":
      return "#94A3B8";
  }
}

type AnimatedScoreBarProps = {
  value: number;
  colorHex?: string;
  heightClass?: string;
  className?: string;
  delayMs?: number;
  /** When set, shows a faint before marker on the track (optimize delta view). */
  beforeValue?: number;
};

export function barColorForDelta(delta: number | undefined, value: number): string {
  if (delta != null && delta > 0) return "#16A34A";
  if (delta != null && delta < 0) return "#F97316";
  return getScoreStyle(value).hex;
}

export function AnimatedScoreBar({
  value,
  colorHex,
  heightClass = "h-2",
  className = "",
  delayMs = 0,
  beforeValue,
}: AnimatedScoreBarProps) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  const beforePct =
    beforeValue != null
      ? Math.max(0, Math.min(100, Math.round(beforeValue)))
      : undefined;
  const style = getScoreStyle(pct);
  const fill = colorHex ?? style.hex;
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => setWidth(pct), 50 + delayMs);
    return () => window.clearTimeout(timer);
  }, [pct, delayMs]);

  return (
    <div
      className={`relative w-full overflow-hidden rounded-full bg-slate-200/90 ${heightClass} ${className}`}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {beforePct != null && beforePct > 0 ? (
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-slate-400/35"
          style={{ width: `${beforePct}%` }}
          aria-hidden
        />
      ) : null}
      <div
        className="relative h-full rounded-full transition-[width] duration-700 ease-out"
        style={{
          width: `${width}%`,
          background: `linear-gradient(90deg, ${fill}dd, ${fill})`,
          boxShadow: width > 0 ? `0 1px 6px ${fill}55` : undefined,
        }}
      />
    </div>
  );
}

type SignalMetricCardProps = {
  label: string;
  value: number;
  hint: string;
  index?: number;
  expanded?: boolean;
  onToggle?: () => void;
};

export function SignalMetricCard({
  label,
  value,
  hint,
  index = 0,
  expanded = false,
  onToggle,
}: SignalMetricCardProps) {
  const style = getScoreStyle(value);
  const interactive = onToggle != null;

  const body = (
    <>
      <div className="flex items-start justify-between gap-2">
        <span className="text-[11px] font-semibold leading-snug text-slate-800">{label}</span>
        <span
          className="shrink-0 rounded-md px-1.5 py-0.5 text-xs font-bold tabular-nums"
          style={{ color: style.hex, backgroundColor: style.bgHex }}
        >
          {value}%
        </span>
      </div>
      <AnimatedScoreBar value={value} className="mt-1.5" heightClass="h-1.5" delayMs={index * 60} />
      <p
        className={`mt-1 text-[10px] leading-snug text-slate-600 ${
          expanded || !interactive ? "" : "line-clamp-2"
        }`}
      >
        {hint}
      </p>
      {interactive ? (
        <p className="mt-0.5 text-[9px] font-medium text-indigo-600/80">
          {expanded ? "Tap to collapse" : "Tap for details"}
        </p>
      ) : null}
    </>
  );

  if (!interactive) {
    return (
      <div className="rounded-lg border border-white/90 bg-white/90 px-2 py-1.5 shadow-sm ring-1 ring-slate-100">
        {body}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`w-full rounded-lg border px-2 py-1.5 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
        expanded
          ? "border-indigo-300 bg-white ring-2 ring-indigo-100"
          : "border-white/90 bg-white/90 ring-1 ring-slate-100 hover:border-indigo-200"
      }`}
    >
      {body}
    </button>
  );
}

type ScoreRingProps = {
  value: number;
  size?: number;
  strokeWidth?: number;
  delayMs?: number;
  className?: string;
};

function ScoreRing({
  value,
  size = 46,
  strokeWidth = 3.5,
  delayMs = 0,
  className = "",
}: ScoreRingProps) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  const style = getScoreStyle(pct);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const [offset, setOffset] = useState(circumference);
  const center = size / 2;

  useEffect(() => {
    const timer = window.setTimeout(
      () => setOffset(circumference - (pct / 100) * circumference),
      50 + delayMs
    );
    return () => window.clearTimeout(timer);
  }, [pct, delayMs, circumference]);

  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${pct}%`}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={style.hex}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center text-[10px] font-bold tabular-nums"
        style={{ color: style.hex }}
      >
        {pct}%
      </span>
    </div>
  );
}

type ThemeCoverageRowProps = {
  category: string;
  score: number;
  detail: string;
  index?: number;
  compact?: boolean;
};

export function ThemeCoverageRow({
  category,
  score,
  detail,
  index = 0,
  compact = false,
}: ThemeCoverageRowProps) {
  return (
    <li
      className={`flex flex-col items-center rounded-lg border border-indigo-100/80 bg-white/75 text-center transition-colors hover:border-indigo-200 hover:bg-white ${
        compact ? "px-1 py-1.5" : "px-1.5 py-2"
      }`}
    >
      <ScoreRing value={score} size={compact ? 38 : 46} delayMs={120 + index * 50} />
      <p
        className={`w-full font-semibold leading-tight text-indigo-950 ${
          compact ? "mt-1 text-[9px]" : "mt-1.5 text-[10px]"
        }`}
      >
        {category}
      </p>
      {!compact ? (
        <p className="mt-0.5 line-clamp-2 w-full text-[9px] leading-snug text-indigo-900/70">
          {detail}
        </p>
      ) : null}
    </li>
  );
}

type CompactScoreCardProps = {
  title: string;
  score: number;
  subtitle?: string;
};

export function CompactScoreCard({ title, score, subtitle }: CompactScoreCardProps) {
  const style = getScoreStyle(score);
  return (
    <div
      className="rounded-lg border px-2 py-2 transition-shadow hover:shadow-sm"
      style={{ borderColor: `${style.hex}33`, backgroundColor: style.bgHex }}
    >
      <p className="text-[10px] font-semibold text-slate-800">{title}</p>
      <p className="mt-0.5 text-base font-bold tabular-nums leading-none" style={{ color: style.hex }}>
        {score}%
      </p>
      <AnimatedScoreBar value={score} heightClass="h-1" className="mt-1.5" />
      {subtitle ? (
        <p className="mt-1 text-[10px] leading-snug text-slate-600">{subtitle}</p>
      ) : null}
    </div>
  );
}
