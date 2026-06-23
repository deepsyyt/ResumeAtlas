import type { ATSAnalyzeResult, BulletPreview } from "@/app/lib/atsAnalyze";
import { computeApplicationVerdict, type ApplicationVerdict } from "@/app/lib/applicationVerdict";
import { buildKeywordCoverageMetricInput } from "@/app/lib/evidenceMetricCopy";
import { countSkillProofStatusBreakdown, resolveSkillProofRow } from "@/app/lib/jdSkillProofStatus";
import {
  distributeFixUplift,
  resolveDashboardRecommendedFixes,
  selectedFixUpliftTotal,
  type RecommendedFix,
} from "@/app/lib/recommendedFixes";
import {
  rejectionRiskRowCopy,
  rejectionRisksTitle,
  type RejectionRiskRow,
} from "@/app/lib/rejectionRiskDisplay";
import type { EvidenceDashboard, JdSkillEvidenceRow } from "@/app/lib/resumeEvidenceScore";
import { parseAnalyzeMatchSummary, type ParsedAnalyzeMatchSummary } from "@/app/lib/resumeTypography";
import type { RoleFitRow } from "@/app/lib/roleFitArchetypes";
import { buildKeywordCoverageMetricFromSkillProof } from "@/app/lib/skillProofLlm";

export type KeywordTone = "proven" | "weak" | "missing";

function groupKeywordsByTone(rows: JdSkillEvidenceRow[]): Record<KeywordTone, JdSkillEvidenceRow[]> {
  const groups: Record<KeywordTone, JdSkillEvidenceRow[]> = {
    proven: [],
    weak: [],
    missing: [],
  };
  for (const row of rows) {
    const status = resolveSkillProofRow(row).proofStatus;
    if (status === "proven") groups.proven.push(row);
    else if (status === "missing") groups.missing.push(row);
    else groups.weak.push(row);
  }
  return groups;
}

export type DashboardReportSnapshot = {
  applicationVerdict: ApplicationVerdict;
  summaryLine: string;
  parsedSummary: ParsedAnalyzeMatchSummary | null;
  risks: string[];
  riskItems: RejectionRiskRow[];
  risksTitle: string;
  recommendedFixes: RecommendedFix[];
  fixUplifts: number[];
  projectedUplift: number;
  keywordScore: number;
  breakdown: ReturnType<typeof countSkillProofStatusBreakdown>;
  keywordGroups: Record<KeywordTone, JdSkillEvidenceRow[]>;
  roleFitRows: RoleFitRow[];
  bulletPreview: BulletPreview | null;
};

export function buildDashboardReportSnapshot(args: {
  analyzeResult: ATSAnalyzeResult;
  evidenceDashboard: EvidenceDashboard;
  selectedRecommendedFixes?: RecommendedFix[];
}): DashboardReportSnapshot {
  const { analyzeResult: r, evidenceDashboard: dash } = args;
  const applicationVerdict = computeApplicationVerdict(dash);
  const recommendedFixes = resolveDashboardRecommendedFixes(dash.riskAreas);
  const risks = dash.mostMissingEvidence ?? [];
  const riskItems = risks.slice(0, 3).map(rejectionRiskRowCopy);
  const selectedList =
    args.selectedRecommendedFixes && args.selectedRecommendedFixes.length > 0
      ? args.selectedRecommendedFixes
      : recommendedFixes;
  const uplifts = distributeFixUplift(applicationVerdict.shortlistUplift, recommendedFixes.length);
  const projectedUplift = selectedFixUpliftTotal(recommendedFixes, selectedList, applicationVerdict);
  const skillRows = dash.skillProofAll ?? dash.skillProof;
  const breakdown = countSkillProofStatusBreakdown(skillRows);
  const keywordGroups = groupKeywordsByTone(skillRows);
  const keywordCoverage =
    buildKeywordCoverageMetricFromSkillProof(skillRows) ??
    buildKeywordCoverageMetricInput({
      score: r.keyword_coverage ?? r.ats_score,
      matchedSkills: r.matched_skills ?? [],
      missingSkills: r.missing_skills ?? [],
    });
  const keywordScore = keywordCoverage?.score ?? dash.snapshot.jdSkillProof;
  const summaryLine = r.summary?.trim() || applicationVerdict.headline;

  return {
    applicationVerdict,
    summaryLine,
    parsedSummary: parseAnalyzeMatchSummary(summaryLine),
    risks,
    riskItems,
    risksTitle: rejectionRisksTitle(riskItems.length || 1),
    recommendedFixes,
    fixUplifts: uplifts,
    projectedUplift,
    keywordScore,
    breakdown,
    keywordGroups,
    roleFitRows: dash.roleFit ?? [],
    bulletPreview: r.bullet_preview ?? null,
  };
}
