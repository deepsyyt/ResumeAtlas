import type { ATSAnalyzeResult } from "@/app/lib/atsAnalyze";
import {
  extractSkillsFromSelectedFixes,
  recommendedFixToOptimizeText,
  resolveDashboardRecommendedFixes,
  type RecommendedFix,
} from "@/app/lib/recommendedFixes";
import {
  resolveWeakUnprovenSkillsForOptimize,
  type SkillOptimizeAction,
} from "@/app/lib/jdSkillProofStatus";
import type { JdSkillEvidenceRow } from "@/app/lib/resumeEvidenceScore";

/** Analyze payload shape stored on optimize requests (includes enriched dashboard). */
export type OptimizeAnalyzeSnapshot = Pick<
  ATSAnalyzeResult,
  | "ats_score"
  | "matched_skills"
  | "missing_skills"
  | "missing_skills_required"
  | "missing_skills_preferred"
  | "required_years_experience"
  | "resume_years_experience"
  | "keyword_coverage"
  | "weak_skills"
> & {
  evidence_dashboard?: ATSAnalyzeResult["evidence_dashboard"];
};

/** Weak / unproven skills to prove in bullets — always from analyzer, never user-picked. */
export function deriveWeakSkillsFromAnalyze(
  analyzeResult: OptimizeAnalyzeSnapshot | undefined
): string[] {
  if (analyzeResult?.weak_skills && analyzeResult.weak_skills.length > 0) {
    return analyzeResult.weak_skills;
  }
  const rows =
    analyzeResult?.evidence_dashboard?.skillProofAll ??
    analyzeResult?.evidence_dashboard?.skillProof ??
    [];
  return resolveWeakUnprovenSkillsForOptimize(rows);
}

/** Recommended fixes the user checked on the dashboard (optimize text lines). */
export function deriveSelectedFixesFromRequest(args: {
  analyzeResult?: OptimizeAnalyzeSnapshot;
  selectedRejectionRisks?: string[];
}): string[] {
  const fromBody = (args.selectedRejectionRisks ?? []).filter(
    (risk): risk is string => typeof risk === "string" && risk.trim().length > 0
  );
  if (fromBody.length > 0) return fromBody;

  const riskAreas = args.analyzeResult?.evidence_dashboard?.riskAreas ?? [];
  return resolveDashboardRecommendedFixes(riskAreas).map(recommendedFixToOptimizeText);
}

export function resolveDashboardRecommendedFixesFromAnalyze(
  analyzeResult: OptimizeAnalyzeSnapshot | undefined
): RecommendedFix[] {
  return resolveDashboardRecommendedFixes(
    analyzeResult?.evidence_dashboard?.riskAreas ?? []
  );
}

function dedupeSkillsPreserveOrder(skills: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const skill of skills) {
    const trimmed = String(skill ?? "").trim();
    if (!trimmed) continue;
    const key = trimmed.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(trimmed);
  }
  return out;
}

/**
 * User-selected fixes = consent to strengthen named skills (including JD gaps).
 * Merges fix skills into proof targets and upgrades do_not_invent → add_evidence.
 */
export function mergeSelectedFixSkillsIntoOptimizePlan(args: {
  proofSkills: string[];
  skillActionBySkill: Record<string, SkillOptimizeAction>;
  optimizableSkillRows: JdSkillEvidenceRow[];
  jdSkillProofAll: JdSkillEvidenceRow[];
  selectedRejectionRisks: string[];
  maxTarget: number;
}): {
  proofSkills: string[];
  skillActionBySkill: Record<string, SkillOptimizeAction>;
  optimizableSkillRows: JdSkillEvidenceRow[];
} {
  const fixSkills = extractSkillsFromSelectedFixes(
    args.selectedRejectionRisks,
    args.jdSkillProofAll
  );
  if (fixSkills.length === 0) {
    return {
      proofSkills: args.proofSkills,
      skillActionBySkill: args.skillActionBySkill,
      optimizableSkillRows: args.optimizableSkillRows,
    };
  }

  const skillActionBySkill = { ...args.skillActionBySkill };
  let optimizableSkillRows = [...args.optimizableSkillRows];
  const rowBySkill = new Map(
    args.jdSkillProofAll.map((row) => [row.skill.toLowerCase().trim(), row])
  );

  for (const skill of fixSkills) {
    const key = skill.toLowerCase().trim();
    skillActionBySkill[key] = "add_evidence";
    const existing = rowBySkill.get(key);
    const rowIndex = optimizableSkillRows.findIndex(
      (row) => row.skill.toLowerCase().trim() === key
    );
    if (rowIndex >= 0) {
      optimizableSkillRows[rowIndex] = {
        ...optimizableSkillRows[rowIndex]!,
        optimizeAction: "add_evidence",
      };
    } else if (existing) {
      optimizableSkillRows.push({ ...existing, optimizeAction: "add_evidence" });
    } else {
      optimizableSkillRows.push({
        skill,
        strength: "gap",
        proofStatus: "missing",
        optimizeAction: "add_evidence",
        mentionCount: 0,
        evidenceLocation: "none",
        jdRequired: true,
      });
    }
  }

  const proofSkills = dedupeSkillsPreserveOrder([
    ...fixSkills,
    ...args.proofSkills,
  ]).slice(0, args.maxTarget);

  return { proofSkills, skillActionBySkill, optimizableSkillRows };
}
