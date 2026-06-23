import type { ATSAnalyzeResult } from "@/app/lib/atsAnalyze";
import type { KeywordCoverageMetricInput } from "@/app/lib/evidenceMetricCopy";
import { buildKeywordCoverageMetricInput } from "@/app/lib/evidenceMetricCopy";
import type { EvidenceDashboard } from "@/app/lib/resumeEvidenceScore";
import { buildKeywordCoverageMetricFromSkillProof } from "@/app/lib/skillProofLlm";
import {
  canShareRecruiterReport,
  type ShareRecruiterReportArgs,
} from "@/app/lib/shareRecruiterReport";
import type { BulletPreview } from "@/app/lib/atsAnalyze";
import {
  DEMO_ANALYZE_SUMMARY,
  DEMO_EVIDENCE_DASHBOARD,
  DEMO_KEYWORD_COVERAGE,
} from "@/app/lib/demoEvidenceDashboard";

export type DashboardContentData = {
  dashboard: EvidenceDashboard;
  keywordCoverage?: KeywordCoverageMetricInput;
  takeawayHeadline?: string;
  isDemo: boolean;
  bulletPreview?: BulletPreview | null;
  shareReport?: ShareRecruiterReportArgs | null;
};

export const DEMO_DASHBOARD_CONTENT_DATA: DashboardContentData = {
  dashboard: DEMO_EVIDENCE_DASHBOARD,
  keywordCoverage: DEMO_KEYWORD_COVERAGE,
  takeawayHeadline: DEMO_ANALYZE_SUMMARY,
  isDemo: true,
};

export function buildLiveDashboardContentData(
  analyzeResult: ATSAnalyzeResult,
  analysisUsedJobDescription: boolean
): DashboardContentData | null {
  const evidenceDashboard = analyzeResult.evidence_dashboard;
  if (!evidenceDashboard || !analysisUsedJobDescription) return null;

  const keywordCoverageRaw = analyzeResult.keyword_coverage;
  const matchedSkills = analyzeResult.matched_skills ?? [];
  const missingSkills = analyzeResult.missing_skills ?? [];
  const keywordCoverage =
    buildKeywordCoverageMetricFromSkillProof(
      evidenceDashboard.skillProofAll ?? evidenceDashboard.skillProof
    ) ??
    buildKeywordCoverageMetricInput({
      score: keywordCoverageRaw,
      matchedSkills,
      missingSkills,
    });

  const shareReport = canShareRecruiterReport(
    analyzeResult,
    evidenceDashboard,
    analysisUsedJobDescription
  )
    ? { analyzeResult, evidenceDashboard }
    : null;

  return {
    dashboard: evidenceDashboard,
    keywordCoverage,
    takeawayHeadline: analyzeResult.summary,
    isDemo: false,
    bulletPreview: analyzeResult.bullet_preview ?? null,
    shareReport,
  };
}

export function resolveDashboardContentData(
  analyzeResult: ATSAnalyzeResult | null,
  analysisUsedJobDescription: boolean
): DashboardContentData {
  if (analyzeResult) {
    const live = buildLiveDashboardContentData(analyzeResult, analysisUsedJobDescription);
    if (live) return live;
  }
  return DEMO_DASHBOARD_CONTENT_DATA;
}
