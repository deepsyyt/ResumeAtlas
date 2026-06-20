import type { ATSAnalyzeResult } from "@/app/lib/atsAnalyze";
import { resolveSkillProofRow } from "@/app/lib/jdSkillProofStatus";
import type { KeywordScannerResultsData } from "@/app/components/KeywordScannerResultsPanel";

export function buildKeywordScannerResultsData(
  analyzeResult: ATSAnalyzeResult
): KeywordScannerResultsData {
  const keywordScore =
    typeof analyzeResult.keyword_coverage === "number" ? analyzeResult.keyword_coverage : 0;
  const matchedSkills = analyzeResult.matched_skills ?? [];
  const missingSkills = analyzeResult.missing_skills ?? [];
  const totalKeywords = matchedSkills.length + missingSkills.length;
  const skillProof = analyzeResult.evidence_dashboard?.skillProof ?? [];

  const weakCoverageAreas = skillProof
    .filter((row) => {
      const status = resolveSkillProofRow(row).proofStatus;
      return status === "weak" || status === "implied";
    })
    .map((row) => row.skill)
    .filter((skill, index, all) => all.indexOf(skill) === index)
    .slice(0, 8);

  const keywordFrequency = skillProof
    .filter((row) => row.mentionCount > 0)
    .sort((a, b) => b.mentionCount - a.mentionCount)
    .slice(0, 6)
    .map((row) => ({
      term: row.skill,
      resumeCount: row.mentionCount,
      postingCount: row.jdRequired ? 2 : 1,
    }));

  const suggestedKeywords = [
    ...(analyzeResult.missing_skills_required ?? []),
    ...missingSkills.filter(
      (skill) => !(analyzeResult.missing_skills_required ?? []).includes(skill)
    ),
    ...weakCoverageAreas,
  ]
    .filter((skill, index, all) => all.indexOf(skill) === index)
    .slice(0, 8);

  return {
    coverageScore: keywordScore,
    coverageDetail:
      totalKeywords > 0
        ? `${matchedSkills.length} of ${totalKeywords} posting terms found in your resume`
        : undefined,
    missingKeywords: missingSkills.slice(0, 12),
    weakCoverageAreas,
    keywordFrequency,
    suggestedKeywords,
  };
}
