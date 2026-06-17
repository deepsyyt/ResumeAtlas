import { leadershipSignalLabel, type JdRoleLevel } from "@/app/lib/jdRoleLevel";
import type { EvidenceDashboard, EvidenceStrength } from "@/app/lib/resumeEvidenceScore";

/** Familiar SERP language first; Evidence Match is the product metric name in parentheses. */
export const EVIDENCE_MATCH_TITLE = "Job description match score (Evidence Match)";
/** Compact label for the score-row card (full title available via tooltip). */
export const EVIDENCE_MATCH_CARD_LABEL = "Evidence match";
export const EVIDENCE_MATCH_SUBTITLE =
  "Resume-to-job match: how much of this posting you prove in project bullets, not just skills lists.";

export const OPTIMIZE_EVIDENCE_MATCH_TITLE = "Proof changes from optimization";
export const OPTIMIZE_EVIDENCE_MATCH_SUBTITLE =
  "Green +N in rewrites = bullets that gained that proof signal. Full-resume % is context for the whole document.";

export const ATS_REFERENCE_TITLE = "ATS keyword score";
export const ATS_REFERENCE_SUBTITLE = "Formatting and keyword overlap only.";

export const ANALYSIS_REPORT_HEADING = "Your Analysis report";
export const ANALYSIS_REPORT_SUBTITLE =
  "Tailor project bullets to this posting with evidence-first rewrites.";

function clampLikelihoodPct(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

/** Second line under ATS keyword score card — derived from the displayed score. */
export function atsShortlistLikelihoodLine(score: number): string {
  const pct = clampLikelihoodPct(score);
  return `~${pct}% estimated shortlist likelihood after ATS review.`;
}

/** Second line under Evidence Match — derived from the evidence match score. */
export function evidenceInterviewLikelihoodLine(score: number): string {
  const pct = clampLikelihoodPct(score);
  return `~${pct}% estimated interview clearance at current proof level.`;
}

export const SIGNALS_SECTION_TITLE = "What we measured";
export const SIGNALS_SECTION_INTRO =
  "Each score answers one question about how your resume fits this job posting — measured per role/company, not every bullet.";

export const EXPERIENCE_ALIGNMENT_LABEL = "Experience vs JD";

export type ExperienceAlignmentMetric = {
  score: number;
  /** Plain-language years comparison (required vs resume). */
  subtitle: string;
};

export const SKILL_PROOF_MAP_TITLE = "Skill-by-skill proof";
export const SKILL_PROOF_MAP_INTRO =
  "For each JD skill: proven in work bullets, only listed, or missing?";

export const OPTIMIZE_SKILL_PROOF_TITLE = "Skills strengthened for this job";
export const OPTIMIZE_SKILL_PROOF_INTRO =
  "Partial proof you already had — upgraded to align with the topics this role emphasizes. Missing JD requirements are not shown here.";

export const RISK_AREAS_TITLE = "Fix before you apply";
export const RISK_AREAS_INTRO = "Honest gaps only. We never invent skills you do not have.";

/** Fix banner when JD lists skills not proven in work bullets (missing from resume or skills-list only). */
export function missingSkillsImprovementTip(args: {
  missingCount: number;
  requiredMissingCount?: number;
  hasRequiredPreferred?: boolean;
}): string {
  const { missingCount, requiredMissingCount = 0, hasRequiredPreferred = false } = args;
  if (missingCount <= 0) return "";

  if (hasRequiredPreferred && requiredMissingCount > 0) {
    return `${requiredMissingCount} required skill${requiredMissingCount === 1 ? "" : "s"} from this job ${requiredMissingCount === 1 ? "isn't" : "aren't"} proven in your work bullets yet — add ${requiredMissingCount === 1 ? "it" : "them"} only where your experience supports ${requiredMissingCount === 1 ? "it" : "them"}.`;
  }

  return `${missingCount} skill${missingCount === 1 ? "" : "s"} this job asks for ${missingCount === 1 ? "isn't" : "aren't"} shown in your work bullets yet — add ${missingCount === 1 ? "an example" : "examples"} in experience only if you've actually used ${missingCount === 1 ? "it" : "them"}.`;
}

export const OPTIMIZE_RISK_AREAS_TITLE = "Still honest gaps";
export const OPTIMIZE_RISK_AREAS_INTRO =
  "Your resume is already optimized. These stayed out on purpose—we never invent skills or experience you do not have.";

export type EvidenceSignalKey =
  | "impact"
  | "architecture"
  | "deployment"
  | "leadership"
  | "seniority"
  | "jdSkillProof"
  | "experienceAlignment";

export function signalMetricLabel(key: EvidenceSignalKey, roleLevel: JdRoleLevel): string {
  switch (key) {
    case "impact":
      return "Results in roles";
    case "architecture":
      return roleLevel === "junior" ? "Hands-on work" : "System & design scope";
    case "deployment":
      return "Shipped / live work";
    case "leadership":
      return leadershipSignalLabel(roleLevel);
    case "seniority":
      return roleLevel === "junior"
        ? "Role fit"
        : roleLevel === "mid"
          ? "Scope fit"
          : roleLevel === "senior_ic"
            ? "Senior scope fit"
            : "Leadership scope fit";
    case "jdSkillProof":
      return "JD skills in bullets";
    case "experienceAlignment":
      return EXPERIENCE_ALIGNMENT_LABEL;
  }
}

export function signalMetricHint(key: EvidenceSignalKey, roleLevel: JdRoleLevel): string {
  switch (key) {
    case "impact":
      return "% of roles where project bullets include numbers or clear business outcomes.";
    case "architecture":
      return roleLevel === "junior"
        ? "% of roles where bullets show what you built, shipped, or delivered."
        : "% of roles where bullets describe design, architecture, or end-to-end ownership.";
    case "deployment":
      return "% of roles where bullets mention production, APIs, deployments, or live systems.";
    case "leadership":
      if (roleLevel === "junior" || roleLevel === "mid") {
        return "% of roles where bullets name teams, partners, or cross-functional work.";
      }
      if (roleLevel === "senior_ic") {
        return "% of roles where bullets show influence with stakeholders or partners.";
      }
      return "% of roles where bullets show team leadership, ownership, or stakeholder scope.";
    case "seniority":
      if (roleLevel === "junior") {
        return "How well project bullets match an entry-level posting.";
      }
      if (roleLevel === "mid") {
        return "How clearly you show ownership and delivery for a mid-level role.";
      }
      if (roleLevel === "senior_ic") {
        return "How well scope, design, and outcomes match a senior IC posting.";
      }
      return "How well people leadership and org scope match this management posting.";
    case "jdSkillProof":
      return "% of JD skills proven in project or experience text, not skills lists only.";
    case "experienceAlignment":
      return "Whether your total years of experience match what this posting asks for.";
  }
}

export function evidenceStrengthDescription(strength: EvidenceStrength): string {
  switch (strength) {
    case "strong":
      return "In a project or role bullet — counts as work proof";
    case "medium":
      return "Skills list only — move into work bullets";
    case "weak":
      return "Summary only — not in project or role bullets";
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

export type SignalMetricRow = {
  key: EvidenceSignalKey;
  label: string;
  value: number;
  hint: string;
};

export function buildSignalMetrics(
  dashboard: EvidenceDashboard,
  experienceAlignment?: ExperienceAlignmentMetric | null
): SignalMetricRow[] {
  const level = dashboard.seniority.roleLevel;
  const keys: EvidenceSignalKey[] = [
    "impact",
    "architecture",
    "deployment",
    "leadership",
    "seniority",
    "jdSkillProof",
    "experienceAlignment",
  ];
  const values: Partial<Record<EvidenceSignalKey, number>> = {
    impact: dashboard.snapshot.impactCoverage,
    architecture: dashboard.snapshot.architectureSignal,
    deployment: dashboard.snapshot.deploymentSignal,
    leadership: dashboard.snapshot.leadershipSignal,
    seniority: dashboard.snapshot.seniorityAlignment,
    jdSkillProof: dashboard.snapshot.jdSkillProof,
    experienceAlignment: experienceAlignment?.score,
  };
  return keys
    .filter((key) => key !== "experienceAlignment" || experienceAlignment != null)
    .map((key) => ({
      key,
      label: signalMetricLabel(key, level),
      value: values[key] ?? 0,
      hint:
        key === "experienceAlignment" && experienceAlignment
          ? experienceAlignment.subtitle
          : signalMetricHint(key, level),
    }));
}

export function snapshotSummaryLine(dashboard: EvidenceDashboard): string {
  const { snapshot, seniority } = dashboard;
  const rolesWithMetrics =
    snapshot.experiencesWithMetrics ?? snapshot.bulletsWithMetrics ?? 0;
  const totalRoles = snapshot.totalExperiences ?? snapshot.totalBullets ?? 0;
  const roleWord = totalRoles === 1 ? "role" : "roles";
  return `This job reads as ${seniority.roleLevelLabel.toLowerCase()}. ${snapshot.jdSkillsProved} of ${snapshot.jdSkillsTotal} JD skills appear in work bullets. ${rolesWithMetrics} of ${totalRoles} ${roleWord} include measurable results.`;
}
