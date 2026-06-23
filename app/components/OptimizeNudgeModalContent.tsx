"use client";

import { useMemo } from "react";
import type { ApplicationVerdict } from "@/app/lib/applicationVerdict";
import {
  LOGIN_NUDGE_HEADLINE,
  LOGIN_NUDGE_SUBHEAD_SHORT,
  OPTIMIZE_NUDGE_BENEFITS,
  OPTIMIZE_NUDGE_BENEFITS_TITLE,
  OPTIMIZE_NUDGE_CURRENT_MATCH_LABEL,
  OPTIMIZE_NUDGE_ESTIMATED_MATCH_LABEL,
  OPTIMIZE_NUDGE_EYEBROW,
  OPTIMIZE_NUDGE_HEADLINE,
  OPTIMIZE_NUDGE_OPTIMIZATION_POTENTIAL_LABEL,
  OPTIMIZE_NUDGE_URGENCY,
  OPTIMIZE_NUDGE_URGENCY_EMPHASIS,
} from "@/app/lib/evidenceMetricCopy";
import {
  type RecommendedFix,
  selectedFixUpliftTotal,
} from "@/app/lib/recommendedFixes";

function NudgeBenefitCheckIcon() {
  return (
    <span className="optimize-nudge-ref__check" aria-hidden>
      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2.5 6l2.25 2.25L9.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function NudgeDonutGauge({ pct }: { pct: number }) {
  const value = Math.max(0, Math.min(100, Math.round(pct)));
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - value / 100);

  return (
    <div className="optimize-nudge-ref__gauge-wrap">
      <div className="optimize-nudge-ref__gauge" role="img" aria-label={`${value} percent optimization potential`}>
        <svg viewBox="0 0 88 88" className="optimize-nudge-ref__gauge-svg" aria-hidden>
          <defs>
            <linearGradient id="optimize-nudge-gauge-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          <circle cx="44" cy="44" r={radius} fill="none" stroke="#ecfdf5" strokeWidth="9" />
          <circle
            cx="44"
            cy="44"
            r={radius}
            fill="none"
            stroke="url(#optimize-nudge-gauge-grad)"
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            transform="rotate(-90 44 44)"
          />
        </svg>
        <div className="optimize-nudge-ref__gauge-label">
          <p className="optimize-nudge-ref__gauge-pct">
            ~{value}
            <span>%</span>
          </p>
        </div>
      </div>
      <p className="optimize-nudge-ref__gauge-caption">{OPTIMIZE_NUDGE_OPTIMIZATION_POTENTIAL_LABEL}</p>
    </div>
  );
}

function NudgeUrgencyIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="optimize-nudge-ref__urgency-icon" aria-hidden>
      <circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="13" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3.5 15.5c0-2 1.57-3.5 3.5-3.5s3.5 1.5 3.5 3.5M10 15.5c0-2 1.57-3.5 3.5-3.5s3.5 1.5 3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export type OptimizeNudgeModalContentProps = {
  variant?: "post_analysis" | "post_login";
  verdict: ApplicationVerdict;
  selectedFixes: RecommendedFix[];
  allFixes: RecommendedFix[];
};

export function OptimizeNudgeModalContent({
  variant = "post_analysis",
  verdict,
  selectedFixes,
  allFixes,
}: OptimizeNudgeModalContentProps) {
  const { shortlistPct } = verdict;

  const selectedUplift = useMemo(
    () => selectedFixUpliftTotal(allFixes, selectedFixes, verdict),
    [allFixes, selectedFixes, verdict]
  );

  const projectedShortlist = Math.min(95, shortlistPct + selectedUplift);
  const headline = variant === "post_login" ? LOGIN_NUDGE_HEADLINE : OPTIMIZE_NUDGE_HEADLINE;

  return (
    <div className="optimize-nudge-ref">
      {variant === "post_analysis" ? (
        <p className="optimize-nudge-ref__eyebrow">{OPTIMIZE_NUDGE_EYEBROW}</p>
      ) : null}

      <h3 className="optimize-nudge-ref__headline">{headline}</h3>
      {variant === "post_login" ? (
        <p className="optimize-nudge-ref__subhead">{LOGIN_NUDGE_SUBHEAD_SHORT}</p>
      ) : null}

      <div className="optimize-nudge-ref__stats">
        <div className="optimize-nudge-ref__stats-gauge">
          <NudgeDonutGauge pct={projectedShortlist} />
        </div>
        <div className="optimize-nudge-ref__stats-compare">
          <div className="optimize-nudge-ref__match-row">
            <span className="optimize-nudge-ref__match-label">{OPTIMIZE_NUDGE_CURRENT_MATCH_LABEL}</span>
            <span className="optimize-nudge-ref__match-value optimize-nudge-ref__match-value--current">
              {shortlistPct}%
            </span>
          </div>
          <span className="optimize-nudge-ref__stats-arrow" aria-hidden>
            →
          </span>
          <div className="optimize-nudge-ref__match-row optimize-nudge-ref__match-row--estimated">
            <span className="optimize-nudge-ref__match-label">{OPTIMIZE_NUDGE_ESTIMATED_MATCH_LABEL}</span>
            <span className="optimize-nudge-ref__match-estimated">
              <span className="optimize-nudge-ref__match-value optimize-nudge-ref__match-value--projected">
                ~{Math.round(projectedShortlist)}%
              </span>
              {selectedUplift > 0 ? (
                <span className="optimize-nudge-ref__uplift-pill">+{selectedUplift}%</span>
              ) : null}
            </span>
          </div>
        </div>
      </div>

      <div className="optimize-nudge-ref__benefits">
        <p className="optimize-nudge-ref__benefits-title">{OPTIMIZE_NUDGE_BENEFITS_TITLE}</p>
        <ul className="optimize-nudge-ref__benefits-list">
          {OPTIMIZE_NUDGE_BENEFITS.map((benefit) => (
            <li key={benefit} className="optimize-nudge-ref__benefit">
              <NudgeBenefitCheckIcon />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {variant === "post_analysis" ? (
        <div className="optimize-nudge-ref__urgency">
          <NudgeUrgencyIcon />
          <p>
            {OPTIMIZE_NUDGE_URGENCY}{" "}
            <strong>{OPTIMIZE_NUDGE_URGENCY_EMPHASIS}</strong>
          </p>
        </div>
      ) : null}
    </div>
  );
}
