import { leadershipSignalLabel, type JdRoleLevel } from "@/app/lib/jdRoleLevel";
import type { EvidenceDashboard, EvidenceStrength } from "@/app/lib/resumeEvidenceScore";

export const EVIDENCE_MATCH_TITLE = "Evidence match";
export const EVIDENCE_MATCH_SUBTITLE =
  "How much of this job you prove in experience and project bullets, not just skills lists.";

export const OPTIMIZE_EVIDENCE_MATCH_TITLE = "Proof changes from optimization";
export const OPTIMIZE_EVIDENCE_MATCH_SUBTITLE =
  "Green +N in rewrites = bullets that gained that proof signal. Full-resume % is context for the whole document.";

export const ATS_REFERENCE_TITLE = "ATS keyword score";
export const ATS_REFERENCE_SUBTITLE =
  "Formatting and keyword overlap only. Can look good even when proof is thin.";

export const SIGNALS_SECTION_TITLE = "What we measured";
export const SIGNALS_SECTION_INTRO =
  "Each score answers one question about how your resume fits this job posting.";

export const EXPERIENCE_ALIGNMENT_LABEL = "Experience vs JD";

export type ExperienceAlignmentMetric = {
  score: number;
  /** Plain-language years comparison (required vs resume). */
  subtitle: string;
};

export const SKILL_PROOF_MAP_TITLE = "Skill-by-skill proof";
export const SKILL_PROOF_MAP_INTRO =
  "For each JD skill: is it shown in real work, only listed, or missing?";

export const OPTIMIZE_SKILL_PROOF_TITLE = "Skills strengthened for this job";
export const OPTIMIZE_SKILL_PROOF_INTRO =
  "Partial proof you already had — upgraded to align with the topics this role emphasizes. Missing JD requirements are not shown here.";

export const RISK_AREAS_TITLE = "Fix before you apply";
export const RISK_AREAS_INTRO = "Honest gaps only. We never invent skills you do not have.";

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
      return "Results in bullets";
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
      return "Bullets with numbers or clear business outcomes (CTR, engagement, efficiency, etc.).";
    case "architecture":
      return roleLevel === "junior"
        ? "% of bullets showing what you built, shipped, or delivered."
        : "% of bullets describing design, architecture, or end-to-end ownership.";
    case "deployment":
      return "% of bullets mentioning production, APIs, deployments, or live systems.";
    case "leadership":
      if (roleLevel === "junior" || roleLevel === "mid") {
        return "% of bullets naming teams, partners, or cross-functional work.";
      }
      if (roleLevel === "senior_ic") {
        return "% of bullets showing influence with stakeholders or partners.";
      }
      return "% of bullets showing team leadership, ownership, or stakeholder scope.";
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
      return "Shown in a project or role bullet with detail";
    case "medium":
      return "Mentioned in experience text; could be stronger";
    case "weak":
      return "Skills list only, not proven in work bullets";
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
  return `This job reads as ${seniority.roleLevelLabel.toLowerCase()}. ${snapshot.jdSkillsProved} of ${snapshot.jdSkillsTotal} JD skills appear in work bullets. ${snapshot.bulletsWithMetrics} of ${snapshot.totalBullets} bullets include measurable results.`;
}
