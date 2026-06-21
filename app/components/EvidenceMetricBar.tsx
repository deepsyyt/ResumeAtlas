"use client";

import { useEffect, useState, type ReactNode } from "react";
import { getScoreStyle } from "@/app/lib/scoreColors";
import {
  ANALYSIS_OPTIMIZE_STEPS,
  ANALYSIS_REPORT_HEADING,
  APPLICATION_VERDICT_TITLE,
  KEYWORD_COVERAGE_SCORE_SUBTITLE,
  KEYWORD_COVERAGE_SCORE_TITLE,
  OPTIMIZE_CTA_LABEL,
} from "@/app/lib/evidenceMetricCopy";
import type { ApplicationVerdict } from "@/app/lib/applicationVerdict";
import type { KeywordCoverageVerdict } from "@/app/lib/skillProofLlm";
import type { KeywordCoverageMetricInput } from "@/app/lib/evidenceMetricCopy";
import { getKeywordCoverageStyle } from "@/app/lib/scoreColors";
import { OptimizeHubVisual } from "@/app/components/OptimizeHubVisual";
import { ShortlistGauge } from "@/app/components/ShortlistGauge";

type OptimizeCtaProps = {
  onClick: () => void;
  children?: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  variant?: "green" | "purple";
  showSparkle?: boolean;
  /** Live dashboard: disable infinite chevron nudge (reduces perceived layout jitter). */
  steadyChevrons?: boolean;
};

export function OptimizeCta({
  onClick,
  children = OPTIMIZE_CTA_LABEL,
  className = "",
  size = "md",
  disabled = false,
  variant = "green",
  showSparkle = false,
  steadyChevrons = false,
}: OptimizeCtaProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`optimize-cta optimize-cta-${size} ${
        variant === "purple" ? "optimize-cta-purple" : ""
      } ${steadyChevrons ? "optimize-cta--steady" : ""} ${className}`}
    >
      <span className="optimize-cta-label">
        {showSparkle ? <span className="optimize-cta-sparkle" aria-hidden>✨ </span> : null}
        {children}
      </span>
      <span className="optimize-cta-chevrons" aria-hidden>
        <svg viewBox="0 0 24 24" fill="none" className="optimize-cta-chevron-svg">
          <path
            d="M8 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}

/** @deprecated Use OptimizeCta */
export const PremiumOptimizeCta = OptimizeCta;

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

type IntelligenceScoreCardProps = {
  label: string;
  /** Full title on hover (e.g. long metric name). */
  labelTitle?: string;
  score?: number;
  badgeLabel?: string;
  subtitle?: string;
  secondaryLine?: string;
  variant?: "default" | "highlight";
  footer?: React.ReactNode;
  className?: string;
  /** Aligns with application verdict + optimize cards in the top score row. */
  scoreRow?: boolean;
};

export function IntelligenceScoreCard({
  label,
  labelTitle,
  score,
  badgeLabel,
  subtitle,
  secondaryLine,
  variant = "default",
  footer,
  className = "",
  scoreRow = false,
}: IntelligenceScoreCardProps) {
  const style = score != null ? getScoreStyle(score) : null;
  const isHighlight = variant === "highlight";

  if (scoreRow) {
    return (
      <div
        className={`score-row-card score-row-card--metric flex h-full flex-col ${className}`}
        title={labelTitle}
      >
        <p className="score-row-card-label">{label}</p>

        {score != null && style ? (
          <div className="score-row-card-visual w-full">
            <div className="flex w-full items-end justify-between gap-2">
              <span
                className="score-row-card-value text-[1.65rem] font-bold leading-none tracking-tight sm:text-[1.85rem]"
                style={{ color: style.hex }}
              >
                {score}%
              </span>
              {badgeLabel ? (
                <span
                  className="mb-0.5 inline-flex rounded-full border px-1.5 py-0.5 text-[9px] font-semibold"
                  style={{
                    color: style.hex,
                    backgroundColor: `${style.bgHex}bb`,
                    borderColor: `${style.hex}30`,
                  }}
                >
                  {badgeLabel}
                </span>
              ) : null}
            </div>
            <AnimatedScoreBar
              value={score}
              colorHex={style.hex}
              heightClass="h-1"
              className="score-row-bar mt-1.5 w-full"
            />
          </div>
        ) : null}

        <div className="score-row-card-footer space-y-0.5">
          {subtitle ? (
            <p className="text-[9px] font-medium leading-snug text-slate-600">{subtitle}</p>
          ) : null}
          {secondaryLine ? (
            <p className="text-[9px] leading-snug text-slate-500 line-clamp-2">{secondaryLine}</p>
          ) : null}
          {footer}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex h-full flex-col rounded-xl border p-2.5 shadow-sm ${
        isHighlight ? "analysis-report-card" : "border-slate-200/80 bg-white"
      } ${className}`}
      title={labelTitle}
    >
      <p
        className={`text-[10px] font-semibold leading-snug ${
          isHighlight
            ? "analysis-report-title font-bold text-[11px]"
            : "uppercase tracking-wide text-slate-500"
        }`}
      >
        {label}
      </p>

      {score != null && style ? (
        <>
          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span
              className="text-xl font-bold tabular-nums leading-none sm:text-2xl"
              style={{ color: style.hex }}
            >
              {score}%
            </span>
            {badgeLabel ? (
              <span
                className="inline-flex rounded-full border px-1.5 py-0.5 text-[10px] font-semibold"
                style={{
                  color: style.hex,
                  backgroundColor: style.bgHex,
                  borderColor: `${style.hex}44`,
                }}
              >
                {badgeLabel}
              </span>
            ) : null}
          </div>
          <AnimatedScoreBar
            value={score}
            colorHex={style.hex}
            heightClass="h-1.5"
            className="mt-2"
          />
        </>
      ) : null}

      <div className={`space-y-1 ${score != null ? "mt-2" : "mt-2"} flex-1`}>
        {subtitle ? <p className="text-[10px] leading-snug text-slate-600">{subtitle}</p> : null}
        {secondaryLine ? (
          <p className="text-[10px] leading-snug text-slate-500">{secondaryLine}</p>
        ) : null}
      </div>

      {footer ? (
        <div className={`shrink-0 ${score != null || subtitle ? "mt-auto pt-2.5" : "mt-2"}`}>
          {footer}
        </div>
      ) : null}
    </div>
  );
}

type CompactScoreCardProps = {
  title: string;
  score: number;
  subtitle?: string;
  secondaryLine?: string;
};

export function CompactScoreCard({ title, score, subtitle, secondaryLine }: CompactScoreCardProps) {
  return (
    <IntelligenceScoreCard
      label={title}
      score={score}
      subtitle={subtitle}
      secondaryLine={secondaryLine}
      className="h-full"
    />
  );
}

type ApplicationVerdictCardProps = {
  verdict: ApplicationVerdict;
  className?: string;
};

export function ApplicationVerdictCard({ verdict, className = "" }: ApplicationVerdictCardProps) {
  const { scoreStyle } = verdict;

  return (
    <div className={`score-row-card score-row-card--verdict flex h-full flex-col ${className}`}>
      <p className="score-row-card-label">{APPLICATION_VERDICT_TITLE}</p>

      <div className="score-row-card-visual">
        <ShortlistGauge
          value={verdict.shortlistPct}
          compact
          accentHex={scoreStyle.hex}
          className="w-full max-w-[124px]"
        />
        <span
          className="score-row-card-badge inline-flex rounded-full border px-2.5 py-0.5 text-[9px] font-semibold tracking-wide backdrop-blur-sm"
          style={{
            color: scoreStyle.hex,
            backgroundColor: `${scoreStyle.bgHex}d9`,
            borderColor: `${scoreStyle.hex}28`,
          }}
        >
          {verdict.badgeLabel}
        </span>
      </div>

      <div className="score-row-card-footer space-y-0.5">
        <p className="line-clamp-2 text-[9px] font-semibold leading-snug text-slate-900">
          {verdict.headline}
        </p>
        {verdict.subline ? (
          <p className="line-clamp-2 text-[9px] leading-snug text-slate-700">{verdict.subline}</p>
        ) : null}
      </div>
    </div>
  );
}

type KeywordCoverageScoreCardProps = {
  score: number;
  verdict: KeywordCoverageVerdict;
  className?: string;
};

export function KeywordCoverageScoreCard({
  score,
  verdict,
  className = "",
}: KeywordCoverageScoreCardProps) {
  const scoreStyle = getKeywordCoverageStyle(score);

  return (
    <div className={`score-row-card score-row-card--metric flex h-full flex-col ${className}`}>
      <p className="score-row-card-label">{KEYWORD_COVERAGE_SCORE_TITLE}</p>

      <div className="score-row-card-visual !items-center">
        <ShortlistGauge
          value={score}
          compact
          accentHex={scoreStyle.hex}
          className="w-full max-w-[124px]"
        />
        <span
          className="score-row-card-badge inline-flex rounded-full border px-2.5 py-0.5 text-[9px] font-semibold tracking-wide backdrop-blur-sm"
          style={{
            color: scoreStyle.hex,
            backgroundColor: `${scoreStyle.bgHex}d9`,
            borderColor: `${scoreStyle.hex}28`,
          }}
        >
          {verdict.badgeLabel}
        </span>
      </div>

      <div className="score-row-card-footer space-y-0.5">
        <p className="line-clamp-2 text-[9px] font-semibold leading-snug text-slate-900">
          {verdict.headline}
        </p>
        {verdict.reason ? (
          <p className="line-clamp-2 text-[9px] leading-snug text-slate-700">{verdict.reason}</p>
        ) : null}
        <p className="text-[9px] leading-snug text-slate-600">{KEYWORD_COVERAGE_SCORE_SUBTITLE}</p>
      </div>
    </div>
  );
}

type AnalysisReportCardProps = {
  onOptimize: () => void;
  verdict: ApplicationVerdict;
};

export function AnalysisReportCard({ onOptimize, verdict }: AnalysisReportCardProps) {
  const { shortlistPct, optimizedShortlistPct, shortlistUplift } = verdict;

  return (
    <div className="score-row-card flex h-full flex-col">
      <p className="score-row-card-label">{ANALYSIS_REPORT_HEADING}</p>

      <div className="score-row-card-visual !min-h-[7.5rem] !items-stretch !justify-center px-0.5">
        <OptimizeHubVisual
          value={optimizedShortlistPct}
          steps={ANALYSIS_OPTIMIZE_STEPS}
          className="w-full"
        />
      </div>

      <div className="score-row-card-footer space-y-2 pt-2">
        <div className="flex flex-wrap items-baseline justify-center gap-1.5 text-center">
          <span className="text-sm font-bold tabular-nums text-slate-700">{shortlistPct}%</span>
          <span className="text-slate-300" aria-hidden>
            →
          </span>
          <span className="text-sm font-bold tabular-nums text-emerald-600">
            ~{optimizedShortlistPct}%
          </span>
          {shortlistUplift > 0 ? (
            <span className="text-[10px] font-semibold text-emerald-600">
              (+{shortlistUplift})
            </span>
          ) : null}
        </div>
        <OptimizeCta onClick={onOptimize} size="lg" className="w-full">
          {OPTIMIZE_CTA_LABEL}
        </OptimizeCta>
      </div>
    </div>
  );
}
