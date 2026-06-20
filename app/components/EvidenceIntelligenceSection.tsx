"use client";

import type { ReactNode } from "react";
import {
  ApplicationVerdictCard,
  AnimatedScoreBar,
  KeywordCoverageScoreCard,
} from "@/app/components/EvidenceMetricBar";
import { RoleFitVerdictSection } from "@/app/components/RoleFitVerdictSection";
import { TopRejectionRisksSection } from "@/app/components/MostMissingEvidenceSection";
import { RecommendedFixesSection } from "@/app/components/RecommendedFixesSection";
import { ShareRecruiterReportCta } from "@/app/components/ShareRecruiterReportCta";
import { SkillProofMapSection } from "@/app/components/SkillProofMapSection";
import { OptimizeAlignCard } from "@/app/components/OptimizeAlignCard";
import { AnalyzeMatchSummaryInsight } from "@/app/components/AnalyzeMatchSummaryInsight";
import { computeApplicationVerdict } from "@/app/lib/applicationVerdict";
import { SKILL_PROOF_MAP_TITLE, type KeywordCoverageMetricInput } from "@/app/lib/evidenceMetricCopy";
import { resolveKeywordCoverageVerdict } from "@/app/lib/skillProofLlm";
import type { ShareRecruiterReportArgs } from "@/app/lib/shareRecruiterReport";
import type { BulletPreview } from "@/app/lib/atsAnalyze";
import type { EvidenceDashboard } from "@/app/lib/resumeEvidenceScore";

function ScoreBar({ score, hex }: { score: number; hex: string }) {
  return <AnimatedScoreBar value={score} colorHex={hex} heightClass="h-1" className="mt-1" />;
}

export type EvidenceIntelligenceSectionProps = {
  dashboard: EvidenceDashboard;
  /** Keyword coverage score + matched/missed counts for the score card. */
  keywordCoverage?: KeywordCoverageMetricInput;
  isDemo?: boolean;
  takeawayHeadline?: string;
  takeawaySubline?: string;
  /** Rendered directly above skill-by-skill proof. */
  aboveSkillProof?: ReactNode;
  /** When set, shows share-with-recruiter CTA below the takeaway summary. */
  shareReport?: ShareRecruiterReportArgs | null;
  /** Optional analyze bullet preview for the align card. */
  bulletPreview?: BulletPreview | null;
  /** Tighter spacing and row limits for sample/workbench previews. */
  previewCompact?: boolean;
  /** Recommended fixes checked for optimization (live report only). */
  selectedRecommendedFixes?: string[];
  onSelectedRecommendedFixesChange?: (fixes: string[]) => void;
  onOptimize?: () => void;
  optimizeDisabled?: boolean;
  optimizeBusy?: boolean;
  /** Homepage hero: shorter slice of the dashboard (readable, not full scroll). */
  heroPreview?: boolean;
  /** @deprecated Use `full` — preview matches live layout; container CSS handles cropping. */
  previewDepth?: "hero" | "topics" | "toolScroll" | "full";
};

export function EvidenceIntelligenceSection({
  dashboard,
  keywordCoverage,
  isDemo = false,
  takeawayHeadline,
  takeawaySubline,
  aboveSkillProof,
  heroPreview = false,
  shareReport,
  bulletPreview,
  previewCompact = false,
  selectedRecommendedFixes,
  onSelectedRecommendedFixesChange,
  onOptimize,
  optimizeDisabled = false,
  optimizeBusy = false,
  previewDepth,
}: EvidenceIntelligenceSectionProps) {
  const depth = previewDepth ?? (heroPreview ? "hero" : "full");
  const compact = previewCompact || depth === "topics" || depth === "toolScroll";
  const applicationVerdict = computeApplicationVerdict(dashboard);
  const headline = takeawayHeadline ?? applicationVerdict.headline;
  const subline = takeawaySubline;
  const showAtsCard = keywordCoverage != null;
  const scoreGridCols = showAtsCard ? "lg:grid-cols-2" : "";
  const skillProofMaxRows = previewCompact ? 4 : undefined;
  const roleFitRows =
    isDemo && previewCompact && dashboard.roleFit
      ? dashboard.roleFit.slice(0, 3)
      : dashboard.roleFit ?? [];

  const roleFitSection =
    roleFitRows.length > 0 ? (
      <RoleFitVerdictSection rows={roleFitRows} compact={compact} className="mt-2" />
    ) : null;

  const hasRejectionRisks = (dashboard.mostMissingEvidence?.length ?? 0) > 0;
  const hasSkillProof = dashboard.skillProof.length > 0;
  const hasRecommendedFixes = dashboard.riskAreas.length > 0;
  const showOptimizeCard = isDemo || !!onOptimize;
  const useLiveActionLayout = !previewCompact;

  const demoFixes = isDemo ? dashboard.riskAreas : (selectedRecommendedFixes ?? []);

  const rejectionRisksSection = hasRejectionRisks ? (
    <TopRejectionRisksSection
      items={dashboard.mostMissingEvidence ?? []}
      compact={compact}
      className="min-w-0"
      showSelection={false}
      variant={useLiveActionLayout ? "hero" : "default"}
    />
  ) : null;

  const recommendedFixesSection = hasRecommendedFixes ? (
    <RecommendedFixesSection
      fixes={dashboard.riskAreas}
      verdict={applicationVerdict}
      selectedFixes={isDemo ? undefined : (selectedRecommendedFixes ?? [])}
      onSelectionChange={isDemo ? undefined : onSelectedRecommendedFixesChange}
      demo={isDemo}
      className="min-w-0"
    />
  ) : null;

  const skillProofSection = hasSkillProof ? (
    <SkillProofMapSection
      title={SKILL_PROOF_MAP_TITLE}
      rows={dashboard.skillProof}
      allRows={dashboard.skillProofAll ?? dashboard.skillProof}
      maxRows={skillProofMaxRows}
      parallelLayout={false}
      variant={useLiveActionLayout ? "liveCompact" : "default"}
      coverageSummary={useLiveActionLayout ? keywordCoverage : undefined}
      collapsedByDefault={useLiveActionLayout}
      showSelection={false}
      className="mt-0"
    />
  ) : null;

  const optimizeAlignSection = showOptimizeCard ? (
    <OptimizeAlignCard
      verdict={applicationVerdict}
      selectedFixes={demoFixes}
      allFixes={dashboard.riskAreas}
      bulletPreview={isDemo ? undefined : bulletPreview}
      onOptimize={isDemo ? undefined : onOptimize}
      disabled={isDemo ? true : optimizeDisabled}
      busy={optimizeBusy}
      demo={isDemo}
      heroLayout={useLiveActionLayout}
      className="min-w-0"
    />
  ) : null;

  const actionPanelBlock =
    hasRejectionRisks ||
    hasSkillProof ||
    hasRecommendedFixes ||
    aboveSkillProof ||
    showOptimizeCard ? (
      <div className={compact ? "mt-1.5 space-y-2" : "mt-2 space-y-2"}>
        {aboveSkillProof}

        {useLiveActionLayout ? (
          hasRejectionRisks || hasRecommendedFixes || hasSkillProof || showOptimizeCard ? (
            <div className="grid min-w-0 grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_min(360px,100%)] lg:items-start">
              <div className="dashboard-action-stack flex min-w-0 flex-col gap-2">
                {rejectionRisksSection}
                {recommendedFixesSection}
                {skillProofSection}
              </div>
              {optimizeAlignSection}
            </div>
          ) : null
        ) : (
          <>
            {rejectionRisksSection}
            {hasSkillProof || showOptimizeCard ? (
              <div className="grid min-w-0 grid-cols-1 gap-2 lg:grid-cols-[minmax(0,1fr)_min(360px,100%)] lg:items-start">
                {hasRecommendedFixes || hasSkillProof ? (
                  <div className="min-w-0 space-y-2">
                    {recommendedFixesSection}
                    {skillProofSection}
                  </div>
                ) : null}
                {optimizeAlignSection}
              </div>
            ) : (
              recommendedFixesSection
            )}
          </>
        )}
      </div>
    ) : null;

  const scrollBelowFoldSection =
    roleFitSection || (shareReport && !isDemo) ? (
      <div className="preview-dashboard-below-fold mt-1 border-t border-dashed border-slate-200/90 pt-1.5">
        {roleFitSection}
        {shareReport && !isDemo ? (
          <ShareRecruiterReportCta
            report={shareReport}
            compact={compact}
            className={roleFitSection ? "mt-2" : "mt-0"}
          />
        ) : null}
      </div>
    ) : null;

  return (
    <div className={previewCompact ? "preview-dashboard-compact" : undefined}>
      <div
        className={`grid grid-cols-1 gap-2.5 ${scoreGridCols} items-stretch ${
          compact ? "mt-1.5" : "mt-2"
        }`}
      >
        <ApplicationVerdictCard verdict={applicationVerdict} className="h-full" />
        {showAtsCard && keywordCoverage ? (
          <KeywordCoverageScoreCard
            score={keywordCoverage.score}
            verdict={resolveKeywordCoverageVerdict(dashboard, keywordCoverage)}
            className="h-full"
          />
        ) : null}
      </div>

      <div
        className={`evidence-takeaway-insight flex items-start gap-2 rounded-lg transition-shadow hover:shadow-sm ${
          compact ? "mt-1.5 px-2 py-1.5" : "mt-2 px-2.5 py-2"
        }`}
      >
        <span
          className="evidence-takeaway-insight-dot mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full"
          aria-hidden
        />
        <div className="min-w-0">
          <AnalyzeMatchSummaryInsight summary={headline} compact={compact} />
          {subline ? (
            <p className="mt-0.5 text-xs leading-snug text-slate-700">{subline}</p>
          ) : null}
        </div>
      </div>

      {actionPanelBlock}

      {previewCompact ? (
        scrollBelowFoldSection
      ) : (
        <>
          {shareReport && !isDemo ? (
            <ShareRecruiterReportCta
              report={shareReport}
              compact={compact}
              className={compact ? "mt-1.5" : "mt-2"}
            />
          ) : null}
          {roleFitSection}
        </>
      )}
    </div>
  );
}

export { ScoreBar };
