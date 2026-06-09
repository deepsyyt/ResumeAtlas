"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import {
  AnimatedScoreBar,
  CompactScoreCard,
  SignalMetricCard,
  ThemeCoverageRow,
} from "@/app/components/EvidenceMetricBar";
import { SkillProofMapSection } from "@/app/components/SkillProofMapSection";
import {
  ATS_REFERENCE_SUBTITLE,
  ATS_REFERENCE_TITLE,
  EVIDENCE_MATCH_SUBTITLE,
  EVIDENCE_MATCH_TITLE,
  RISK_AREAS_INTRO,
  RISK_AREAS_TITLE,
  SIGNALS_SECTION_INTRO,
  SIGNALS_SECTION_TITLE,
  buildSignalMetrics,
  snapshotSummaryLine,
  type ExperienceAlignmentMetric,
} from "@/app/lib/evidenceMetricCopy";
import type { EvidenceDashboard } from "@/app/lib/resumeEvidenceScore";
import { getScoreStyle, getATSRingHex, getATSBadgeLabel } from "@/app/lib/scoreColors";

function ScoreBar({ score, hex }: { score: number; hex: string }) {
  return <AnimatedScoreBar value={score} colorHex={hex} heightClass="h-1" className="mt-1" />;
}

export type EvidenceIntelligenceSectionProps = {
  dashboard: EvidenceDashboard;
  atsScoreReference?: number;
  experienceAlignment?: ExperienceAlignmentMetric | null;
  isDemo?: boolean;
  takeawayHeadline?: string;
  takeawaySubline?: string;
  /** Rendered directly above skill-by-skill proof (e.g. optimize CTA). */
  aboveSkillProof?: ReactNode;
  /** Homepage hero: shorter slice of the dashboard (readable, not full scroll). */
  heroPreview?: boolean;
  /** `topics`: through theme coverage only (tool empty state). `toolScroll`: compact through topics, full below-fold. `full`: entire dashboard. */
  previewDepth?: "hero" | "topics" | "toolScroll" | "full";
};

export function EvidenceIntelligenceSection({
  dashboard,
  atsScoreReference,
  experienceAlignment,
  isDemo = false,
  takeawayHeadline,
  takeawaySubline,
  aboveSkillProof,
  heroPreview = false,
  previewDepth,
}: EvidenceIntelligenceSectionProps) {
  const depth = previewDepth ?? (heroPreview ? "hero" : "full");
  const compact = depth === "topics" || depth === "toolScroll";
  const showBelowFold = depth === "full" || depth === "toolScroll";
  const signalMetrics = buildSignalMetrics(dashboard, experienceAlignment);
  const [expandedMetric, setExpandedMetric] = useState<string | null>(null);
  const headline =
    takeawayHeadline ??
    (isDemo
      ? "You likely have strong proof in your background, but much of it may sit in skills lists instead of project bullets."
      : "Review what is proven vs what is only listed before you apply.");
  const subline =
    takeawaySubline ??
    (isDemo
      ? "Good optimization moves real evidence into bullets and leaves honest gaps instead of inventing keywords."
      : dashboard.riskAreas[0] ??
        "Move tools and outcomes from lists into project bullets where your experience supports it.");
  const evidenceStyle = getScoreStyle(dashboard.evidenceMatch);
  const evidenceRing = getATSRingHex(dashboard.evidenceMatch);
  const atsStyle = atsScoreReference != null ? getScoreStyle(atsScoreReference) : null;

  return (
    <>
      <div
        className={`flex flex-col sm:flex-row sm:items-start ${
          compact ? "mt-1.5 gap-1.5 sm:gap-2" : "mt-2 gap-2 sm:gap-3"
        }`}
      >
        <div
          className={`min-w-0 flex-1 rounded-lg border border-slate-200/80 bg-gradient-to-br from-white to-slate-50 shadow-sm ${
            compact ? "px-2 py-1.5" : "px-2.5 py-2"
          }`}
        >
          <div className={`flex items-center ${compact ? "gap-2" : "gap-2.5 sm:gap-3"}`}>
            <div
              className={`relative flex shrink-0 items-center justify-center rounded-full ${
                compact ? "h-14 w-14" : "h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]"
              }`}
              style={{ backgroundColor: evidenceStyle.bgHex }}
            >
              <div
                className="absolute inset-0 rounded-full border-[3px]"
                style={{ borderColor: evidenceRing }}
              />
              <div
                className={`flex items-center justify-center rounded-full border-2 border-white bg-white shadow-sm ${
                  compact ? "h-9 w-9" : "h-11 w-11 sm:h-12 sm:w-12"
                }`}
              >
                <span
                  className={`font-bold text-slate-900 tabular-nums ${
                    compact ? "text-lg" : "text-xl sm:text-2xl"
                  }`}
                >
                  {dashboard.evidenceMatch}%
                </span>
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-slate-900 leading-tight">{EVIDENCE_MATCH_TITLE}</p>
              <p
                className="mt-0.5 inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold"
                style={{
                  color: evidenceStyle.hex,
                  backgroundColor: evidenceStyle.bgHex,
                  borderColor: evidenceStyle.hex,
                }}
              >
                {getATSBadgeLabel(dashboard.evidenceMatch)}
              </p>
              <p className="mt-0.5 text-[11px] leading-snug text-slate-600">{EVIDENCE_MATCH_SUBTITLE}</p>
              {isDemo && !compact ? (
                <p className="mt-0.5 text-[11px] text-slate-400">Sample result below</p>
              ) : null}
            </div>
          </div>
          <AnimatedScoreBar
            value={dashboard.evidenceMatch}
            className={compact ? "mt-1.5" : "mt-2"}
            heightClass={compact ? "h-1" : "h-1.5"}
          />
        </div>
        {atsStyle && atsScoreReference != null ? (
          <div className={`sm:shrink-0 sm:self-stretch ${compact ? "sm:max-w-[188px]" : "sm:max-w-[210px]"}`}>
            <CompactScoreCard
              title={ATS_REFERENCE_TITLE}
              score={atsScoreReference}
              subtitle={ATS_REFERENCE_SUBTITLE}
            />
          </div>
        ) : null}
      </div>

      <div
        className={`flex items-start gap-2 rounded-lg border transition-shadow hover:shadow-sm ${
          compact ? "mt-1.5 px-2 py-1.5" : "mt-2 px-2.5 py-2"
        }`}
        style={{ backgroundColor: evidenceStyle.bgHex, borderColor: evidenceStyle.hex }}
      >
        <span
          className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full"
          style={{ backgroundColor: evidenceStyle.hex }}
          aria-hidden
        />
        <div className="min-w-0">
          <p className="text-xs font-semibold leading-snug text-slate-900">{headline}</p>
          <p className="mt-0.5 text-xs leading-snug text-slate-700">{subline}</p>
        </div>
      </div>

      <div
        className={`rounded-lg border border-indigo-200/80 bg-gradient-to-br from-indigo-50/90 via-white to-violet-50/40 shadow-sm ${
          compact ? "mt-1.5 px-2 py-1.5" : "mt-2 px-2.5 py-2"
        }`}
      >
        <p className="text-[10px] font-semibold uppercase tracking-wide text-indigo-950">
          {SIGNALS_SECTION_TITLE}
        </p>
        <p className="mt-0.5 text-[11px] leading-snug text-indigo-900/80">{SIGNALS_SECTION_INTRO}</p>
        <p className="mt-1 text-[11px] font-medium leading-snug text-indigo-950">
          {snapshotSummaryLine(dashboard)}
        </p>
        <div className="mt-2 grid grid-cols-2 gap-1.5 lg:grid-cols-3">
          {signalMetrics.map((metric, index) => (
            <SignalMetricCard
              key={metric.key}
              label={metric.label}
              value={metric.value}
              hint={metric.hint}
              index={index}
              expanded={expandedMetric === metric.key}
              onToggle={() =>
                setExpandedMetric((prev) => (prev === metric.key ? null : metric.key))
              }
            />
          ))}
        </div>
        {!heroPreview && dashboard.categories.length > 0 ? (
          <div className="mt-2 border-t border-indigo-200/80 pt-2">
            <p className="text-[10px] font-bold uppercase tracking-wide text-indigo-950">
              Topics this job cares about
            </p>
            {!compact ? (
              <p className="mt-0.5 text-[10px] text-indigo-900/75">
                How much your resume talks about each theme the JD mentions.
              </p>
            ) : null}
            <ul
              className={`grid grid-cols-2 sm:grid-cols-4 ${
                compact ? "mt-1.5 gap-1.5" : "mt-2 gap-2"
              }`}
            >
              {dashboard.categories.map((c, index) => (
                <ThemeCoverageRow
                  key={c.category}
                  category={c.category}
                  score={c.score}
                  detail={c.detail}
                  index={index}
                  compact={compact}
                />
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      {depth === "toolScroll" ? (
        <p className="mt-2 text-center text-[10px] font-medium text-slate-500">
          ↓ Scroll for skill-by-skill proof, risk areas & metrics
        </p>
      ) : null}

      {aboveSkillProof}

      {showBelowFold ? (
        <SkillProofMapSection rows={dashboard.skillProof} className="mt-2" />
      ) : depth === "hero" ? (
        <SkillProofMapSection rows={dashboard.skillProof} className="mt-2" maxRows={3} />
      ) : null}

      {showBelowFold && dashboard.riskAreas.length > 0 ? (
        <div className="mt-2 rounded-lg border border-amber-200 bg-gradient-to-r from-amber-50/90 to-orange-50/50 px-2 py-2 shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-amber-900">
            {RISK_AREAS_TITLE}
          </p>
          <p className="mt-0.5 text-[10px] text-amber-900/80">{RISK_AREAS_INTRO}</p>
          <ul className="mt-1 space-y-0.5 text-[10px] leading-snug text-amber-950/90">
            {dashboard.riskAreas.map((risk) => (
              <li
                key={risk}
                className="rounded border border-amber-200/60 bg-white/50 px-1.5 py-0.5 transition-colors hover:bg-white/80"
              >
                • {risk}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
}

export { ScoreBar };
