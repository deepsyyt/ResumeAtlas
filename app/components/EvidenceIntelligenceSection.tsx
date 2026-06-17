"use client";

import type { ReactNode } from "react";
import {
  AnalysisReportCard,
  AnimatedScoreBar,
  IntelligenceScoreCard,
  SignalMetricCard,
  ThemeCoverageRow,
} from "@/app/components/EvidenceMetricBar";
import { RoleFitVerdictSection } from "@/app/components/RoleFitVerdictSection";
import { ShareRecruiterReportCta } from "@/app/components/ShareRecruiterReportCta";
import { SkillProofMapSection } from "@/app/components/SkillProofMapSection";
import {
  ATS_REFERENCE_SUBTITLE,
  ATS_REFERENCE_TITLE,
  EVIDENCE_MATCH_CARD_LABEL,
  EVIDENCE_MATCH_SUBTITLE,
  EVIDENCE_MATCH_TITLE,
  atsShortlistLikelihoodLine,
  evidenceInterviewLikelihoodLine,
  RISK_AREAS_INTRO,
  RISK_AREAS_TITLE,
  SIGNALS_SECTION_INTRO,
  SIGNALS_SECTION_TITLE,
  buildSignalMetrics,
  snapshotSummaryLine,
  type ExperienceAlignmentMetric,
} from "@/app/lib/evidenceMetricCopy";
import type { ShareRecruiterReportArgs } from "@/app/lib/shareRecruiterReport";
import type { EvidenceDashboard } from "@/app/lib/resumeEvidenceScore";
import { getScoreStyle, getATSBadgeLabel } from "@/app/lib/scoreColors";

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
  /** Opens optimizer from the score-row analysis card. */
  onOptimize?: () => void;
  /** When set, shows share-with-recruiter CTA below the takeaway summary. */
  shareReport?: ShareRecruiterReportArgs | null;
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
  onOptimize,
  shareReport,
  previewDepth,
}: EvidenceIntelligenceSectionProps) {
  const depth = previewDepth ?? (heroPreview ? "hero" : "full");
  const compact = depth === "topics" || depth === "toolScroll";
  const showBelowFold = depth === "full" || depth === "toolScroll";
  const signalMetrics = buildSignalMetrics(dashboard, experienceAlignment);
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
  const showAtsCard = atsScoreReference != null;
  const showAnalysisCard = onOptimize != null;
  const scoreCardCount = 1 + (showAtsCard ? 1 : 0) + (showAnalysisCard ? 1 : 0);
  const scoreGridCols =
    scoreCardCount >= 3 ? "lg:grid-cols-3" : scoreCardCount === 2 ? "lg:grid-cols-2" : "";

  return (
    <>
      <div
        className={`grid grid-cols-1 gap-2.5 ${scoreGridCols} lg:items-stretch ${
          compact ? "mt-1.5" : "mt-2"
        }`}
      >
        <IntelligenceScoreCard
          label={EVIDENCE_MATCH_CARD_LABEL}
          labelTitle={EVIDENCE_MATCH_TITLE}
          score={dashboard.evidenceMatch}
          badgeLabel={getATSBadgeLabel(dashboard.evidenceMatch)}
          subtitle={EVIDENCE_MATCH_SUBTITLE}
          secondaryLine={evidenceInterviewLikelihoodLine(dashboard.evidenceMatch)}
        />
        {showAtsCard ? (
          <IntelligenceScoreCard
            label={ATS_REFERENCE_TITLE}
            score={atsScoreReference}
            subtitle={ATS_REFERENCE_SUBTITLE}
            secondaryLine={atsShortlistLikelihoodLine(atsScoreReference)}
          />
        ) : null}
        {showAnalysisCard ? <AnalysisReportCard onOptimize={onOptimize} /> : null}
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

      {shareReport && depth !== "hero" && depth !== "topics" ? (
        <ShareRecruiterReportCta
          report={shareReport}
          compact={compact}
          className={compact ? "mt-1.5" : "mt-2"}
        />
      ) : null}

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
            />
          ))}
        </div>
        {!heroPreview && (dashboard.roleFit?.length ?? 0) > 0 ? (
          <RoleFitVerdictSection rows={dashboard.roleFit ?? []} compact={compact} className="mt-2" />
        ) : null}
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
