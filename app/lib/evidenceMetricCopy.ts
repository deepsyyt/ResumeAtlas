import type { EvidenceDashboard, EvidenceStrength } from "@/app/lib/resumeEvidenceScore";
import type { BulletRefinementBreakdown } from "@/app/lib/optimizeBulletEvidence";
import { jdDomainLabel } from "@/app/lib/jdDomainClass";
import { getKeywordCoverageLabel } from "@/app/lib/scoreColors";

/** Familiar SERP language first; Evidence Match is the product metric name in parentheses. */
export const EVIDENCE_MATCH_TITLE = "Job description match score (Evidence Match)";
/** Compact label for the score-row card (full title available via tooltip). */
export const EVIDENCE_MATCH_CARD_LABEL = "Evidence match";
export const EVIDENCE_MATCH_SUBTITLE =
  "Resume-to-job match: how much of this posting you prove in project bullets, not just skills lists.";

export const OPTIMIZE_EVIDENCE_MATCH_TITLE = "Proof changes from optimization";
export const OPTIMIZE_EVIDENCE_MATCH_SUBTITLE =
  "Green +N in rewrites = bullets that gained that proof signal. Full-resume % is context for the whole document.";

export const KEYWORD_COVERAGE_SCORE_TITLE = "Keyword coverage score";
export const KEYWORD_COVERAGE_SCORE_SUBTITLE =
  "Coverage % of JD keyword (matched vs missed).";

/** @deprecated Use KEYWORD_COVERAGE_SCORE_TITLE */
export const ATS_REFERENCE_TITLE = KEYWORD_COVERAGE_SCORE_TITLE;
/** @deprecated Use KEYWORD_COVERAGE_SCORE_SUBTITLE */
export const ATS_REFERENCE_SUBTITLE = KEYWORD_COVERAGE_SCORE_SUBTITLE;

export const ANALYSIS_REPORT_HEADING = "Increase shortlist odds";
export const ANALYSIS_REPORT_SUBTITLE =
  "Tailor project bullets to this posting with evidence-first rewrites.";

export const OPTIMIZE_CTA_LABEL = "Increase shortlist odds";
export const OPTIMIZE_CTA_LABEL_HERO = "Optimize Now";
export const OPTIMIZE_CTA_SUBLINE = "Critical gaps can be improved";
export const OPTIMIZE_ALIGN_PRIVACY_NOTE = "Your data is private and secure.";

export const OPTIMIZE_ALIGN_CARD_TITLE = "Align before you apply";
export const OPTIMIZE_ALIGN_CARD_BODY =
  "Recommended fixes are pre-selected for this role. Optimize to strengthen proof before you apply.";
export const OPTIMIZE_ALIGN_CARD_HINT =
  "Select at least one recommended fix on the left.";
export const OPTIMIZE_ALIGN_CARD_DEMO_HINT =
  "Run a check to see recommended fixes pre-selected here.";
export const OPTIMIZE_ALIGN_BENEFITS_TITLE = "What you'll get after optimize";
export const OPTIMIZE_ALIGN_BENEFITS = [
  "Critical skill representation improved in your bullets",
  "One impact-focused bullet refined per project (not every line)",
  "Weak keyword skills strengthened where evidence already exists",
  "Missing skills are never invented — gaps stay honest",
] as const;
export const OPTIMIZE_ALIGN_SELECTION_TITLE = "Recommended fixes";
export const OPTIMIZE_ALIGN_PREVIEW_TITLE = "Bullet preview";
export const OPTIMIZE_ALIGN_BEFORE_LABEL = "Before";
export const OPTIMIZE_ALIGN_AFTER_LABEL = "After (with selected fixes)";
export const OPTIMIZE_ALIGN_EMPTY_SELECTION =
  "Uncheck fixes on the left only if you do not want them optimized.";
export const OPTIMIZE_ALIGN_PREVIEW_PLACEHOLDER =
  "Select at least one fix to preview how a work bullet may be strengthened.";

export const OPTIMIZE_ALIGN_STEPS = [
  "Optimize the professional summary and title to align with the job role",
  "Add selected JD skills into work bullets with measurable outcomes",
  "Address selected rejection risks in the right projects",
] as const;

export const ANALYSIS_OPTIMIZE_STEPS = [
  "Move JD skills into work bullets",
  "Strengthen topic proof for this role",
  "Add measurable outcomes you already have",
] as const;

export const APPLICATION_VERDICT_TITLE = "Application verdict";
export const APPLICATION_VERDICT_SUBTITLE =
  "Based on topics this job cares about, top rejection risks, and skills proven in work bullets.";

function clampLikelihoodPct(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

/** Footer line under keyword coverage score card. */
export function keywordCoverageScoreLine(coverage: KeywordCoverageMetricInput): string {
  const { matchedCount, totalCount, coverageLabel } = coverage;
  if (totalCount <= 0) return coverageLabel;
  const missed = Math.max(0, totalCount - matchedCount);
  return `${matchedCount} matched · ${missed} missed — ${coverageLabel.toLowerCase()}.`;
}

/** @deprecated Use keywordCoverageScoreLine */
export function atsShortlistLikelihoodLine(score: number): string {
  const pct = clampLikelihoodPct(score);
  return `~${pct}% estimated shortlist likelihood after ATS review.`;
}

/** Second line under Evidence Match — derived from the evidence match score. */
export function evidenceInterviewLikelihoodLine(score: number): string {
  const pct = clampLikelihoodPct(score);
  return `~${pct}% estimated interview clearance at current proof level.`;
}

export const SKILL_PROOF_MAP_TITLE = "Keyword coverage";
export const SKILL_PROOF_MAP_INTRO =
  "Every missing JD skill gets a status, meaning, and optimize action. We never invent missing skills.";

export const KEYWORD_COVERAGE_VIEW_ALL = "View all keywords";
export const KEYWORD_COVERAGE_PROVEN_LABEL = "Proven";
export const KEYWORD_COVERAGE_PROVEN_DESC = "Skills clearly proven";
export const KEYWORD_COVERAGE_WEAK_LABEL = "Weak";
export const KEYWORD_COVERAGE_WEAK_DESC = "Mentioned, not proven";
export const KEYWORD_COVERAGE_MISSING_LABEL = "Missing";
export const KEYWORD_COVERAGE_MISSING_DESC = "Not mentioned";

export const OPTIMIZE_SKILL_PROOF_TITLE = "Skills strengthened for this job";
export const OPTIMIZE_SKILL_PROOF_INTRO =
  "Skills you already had that now show stronger proof in project or role bullets. Missing JD requirements are not shown here.";

export const OPTIMIZE_SUMMARY_CHANGED_LINE =
  "Professional summary tightened for this job using experience you already have (not invented)";

export function optimizeBulletSummaryLine(refinedCount: number, projectScopes: number): string {
  if (refinedCount <= 0) return "";
  const scope =
    projectScopes > 0
      ? projectScopes
      : refinedCount;
  if (scope === 1) {
    return "One impact-focused bullet refined where proof was thin (not every line rewritten)";
  }
  return `${refinedCount} bullet${refinedCount === 1 ? "" : "s"} refined across ${scope} project${
    scope === 1 ? "" : "s"
  } — about one impact line per project, not a full rewrite`;
}

/** Why bullets were rewritten — rejection risks, weak keyword proof, or impact polish. */
export function optimizeBulletRefinementSummaryLines(
  breakdown: BulletRefinementBreakdown
): string[] {
  const lines: string[] = [];
  const {
    rejectionRiskBulletCount,
    weakKeywordBulletCount,
    impactPolishBulletCount,
    quantifiedBulletCount,
    addressedRejectionRiskCount,
    selectedRejectionRiskCount,
    totalRefined,
  } = breakdown;

  if (totalRefined <= 0) return lines;

  if (rejectionRiskBulletCount > 0) {
    lines.push(
      `${rejectionRiskBulletCount} bullet${rejectionRiskBulletCount === 1 ? "" : "s"} updated to address selected rejection risks (including new lines in the best-matching project)`
    );
  } else if (selectedRejectionRiskCount > 0) {
    lines.push(
      `${selectedRejectionRiskCount} selected rejection risk${selectedRejectionRiskCount === 1 ? "" : "s"} targeted with new or refined project bullets`
    );
  }
  if (weakKeywordBulletCount > 0) {
    lines.push(
      `${weakKeywordBulletCount} bullet${weakKeywordBulletCount === 1 ? "" : "s"} refined to strengthen weak or implied JD keywords you already had`
    );
  }
  if (impactPolishBulletCount > 0) {
    const metricsNote =
      quantifiedBulletCount > 0
        ? `; ${quantifiedBulletCount} gained clearer metrics`
        : "";
    lines.push(
      `${impactPolishBulletCount} bullet${impactPolishBulletCount === 1 ? "" : "s"} polished for stronger impact language${metricsNote}`
    );
  }
  if (lines.length === 0) {
    return [optimizeBulletSummaryLine(totalRefined, breakdown.projectScopes)];
  }
  return lines;
}

export const OPTIMIZE_BULLET_REFINEMENT_NOTE =
  "Each selected rejection risk gets a refined or new bullet in the project where your experience best fits.";

export function optimizeSkillsSurfacedLine(skillCount: number): string {
  if (skillCount <= 0) return "";
  return `${skillCount} skill${skillCount === 1 ? "" : "s"} now proven in project bullets`;
}

export function optimizeWeakKeywordsStrengthenedLine(keywordCount: number): string {
  if (keywordCount <= 0) return "";
  return `${keywordCount} weak keyword${keywordCount === 1 ? "" : "s"} strengthened in refined bullets`;
}

export const RISK_AREAS_TITLE = "Fix before you apply (recommended fix)";
export const RISK_AREAS_INTRO =
  "Resume changes to improve shortlist odds for this role. Only fixes you can defend — we never invent experience.";

export const RECOMMENDED_FIXES_TITLE = "Recommended fixes for this role";
export const RECOMMENDED_FIXES_INTRO =
  "Pre-selected for this posting. Keep at least one checked to run Optimize.";

export const TOP_REJECTION_RISKS_TITLE = "3 things reducing interview chances";
export const TOP_REJECTION_RISKS_INTRO =
  "These gaps may cause recruiters to skip your application.";
export const TOP_REJECTION_RISKS_FOOTER =
  "Fixing these gaps can increase your shortlist odds.";

/** Fix banner when JD lists skills not proven in work bullets (missing from resume or skills-list only). */
export function missingSkillsImprovementTip(args: {
  missingCount: number;
  requiredMissingCount?: number;
  hasRequiredPreferred?: boolean;
}): string {
  const { missingCount, requiredMissingCount = 0, hasRequiredPreferred = false } = args;
  if (missingCount <= 0) return "";

  if (hasRequiredPreferred && requiredMissingCount > 0) {
    return `${requiredMissingCount} required skill${requiredMissingCount === 1 ? "" : "s"} from this job ${requiredMissingCount === 1 ? "isn't" : "aren't"} proven in your work bullets yet. Add ${requiredMissingCount === 1 ? "it" : "them"} only where your experience supports ${requiredMissingCount === 1 ? "it" : "them"}.`;
  }

  return `${missingCount} skill${missingCount === 1 ? "" : "s"} this job asks for ${missingCount === 1 ? "isn't" : "aren't"} shown in your work bullets yet. Add ${missingCount === 1 ? "an example" : "examples"} in experience only if you've actually used ${missingCount === 1 ? "it" : "them"}.`;
}

export const OPTIMIZE_RISK_AREAS_TITLE = "Still honest gaps";
export const OPTIMIZE_RISK_AREAS_INTRO =
  "Your resume is already optimized. These stayed out on purpose. We never invent skills or experience you do not have.";

export type KeywordCoverageMetricInput = {
  score: number;
  matchedCount: number;
  totalCount: number;
  coverageLabel: string;
};

export function buildKeywordCoverageMetricInput(args: {
  score: number | null | undefined;
  matchedSkills: string[];
  missingSkills: string[];
}): KeywordCoverageMetricInput | undefined {
  if (args.score === null) return undefined;
  const score = typeof args.score === "number" ? args.score : 0;
  const totalCount = args.matchedSkills.length + args.missingSkills.length;
  return {
    score,
    matchedCount: args.matchedSkills.length,
    totalCount,
    coverageLabel: getKeywordCoverageLabel(score),
  };
}

export function evidenceStrengthDescription(strength: EvidenceStrength): string {
  switch (strength) {
    case "strong":
      return "In a project or role bullet, counts as work proof";
    case "medium":
      return "Skills list only, move into work bullets";
    case "weak":
      return "Summary only, not in project or role bullets";
    case "gap":
      return "Not in resume (left honest, not invented)";
  }
}

export function evidenceStrengthShortLabel(strength: EvidenceStrength): string {
  switch (strength) {
    case "strong":
      return "Proven";
    case "medium":
      return "Partial";
    case "weak":
      return "Listed only";
    case "gap":
      return "Missing";
  }
}

export function snapshotSummaryLine(dashboard: EvidenceDashboard): string {
  const { snapshot, seniority } = dashboard;
  const domainPhrase = jdDomainLabel(dashboard.jdDomain);
  return `This posting reads as ${domainPhrase} at ${seniority.roleLevelLabel.toLowerCase()} scope. ${snapshot.jdSkillsProved} of ${snapshot.jdSkillsTotal} required skills are proven in work bullets. Measurable-outcome coverage averages ${snapshot.impactCoverage}% across project experiences.`;
}
