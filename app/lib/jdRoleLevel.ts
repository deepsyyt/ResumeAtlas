/**
 * Infer seniority band from JD text (and optional years) so evidence metrics
 * adapt across junior IC, mid, senior IC, and people-leadership roles.
 */

export type JdRoleLevel = "junior" | "mid" | "senior_ic" | "leadership";

const JD_LEADERSHIP_RE =
  /\b(people\s+manager|engineering\s+manager|product\s+manager|director|head\s+of|vp\b|vice\s+president|managing\s+manager|manage(?:r|ment)\s+(?:a\s+)?team|direct\s+reports?|people\s+management|team\s+leadership|organizational\s+leadership|hiring\s+and\s+mentoring|lead\s+a\s+team)\b/i;

const JD_JUNIOR_RE =
  /\b(junior|entry[- ]level|intern(?:ship)?|graduate|new\s+grad|early[- ]career|0\s*[-–to]+\s*2\s*years?|1\s*[-–+]?\s*3\s*years?|up\s+to\s+2\s+years?|associate\s+(?:analyst|engineer|developer|consultant))\b/i;

const JD_SENIOR_IC_RE =
  /\b(senior|staff|principal|lead\s+(?:data|software|ml|machine learning|product|engineer|scientist|developer|architect)|architect|8\+\s*years?|10\+\s*years?|15\+\s*years?)\b/i;

const JD_MID_RE =
  /\b(mid[- ]level|intermediate|3\s*[-–+]?\s*7\s*years?|4\s*[-–+]?\s*8\s*years?|5\+\s*years?|experienced\s+(?:engineer|analyst|developer))\b/i;

export function roleLevelLabel(level: JdRoleLevel): string {
  switch (level) {
    case "junior":
      return "Junior / entry IC";
    case "mid":
      return "Mid-level IC";
    case "senior_ic":
      return "Senior IC";
    case "leadership":
      return "Leadership / management";
  }
}

/** UI label for the seniority-alignment metric tile. */
/** Mini-card label for leadership/collaboration signal (varies by JD level). */
export function leadershipSignalLabel(level: JdRoleLevel): string {
  switch (level) {
    case "junior":
      return "Collaboration";
    case "mid":
      return "Collaboration";
    case "senior_ic":
      return "Influence";
    case "leadership":
      return "Leadership";
  }
}

export function seniorityMetricLabel(level: JdRoleLevel): string {
  switch (level) {
    case "junior":
      return "Role fit";
    case "mid":
      return "Scope alignment";
    case "senior_ic":
      return "Senior IC alignment";
    case "leadership":
      return "Leadership alignment";
  }
}

export function detectJdRoleLevel(
  jobDescription: string,
  opts?: { requiredYears?: number | null; resumeYears?: number | null }
): JdRoleLevel {
  const jd = String(jobDescription ?? "");
  if (!jd.trim()) return "mid";

  if (JD_LEADERSHIP_RE.test(jd)) return "leadership";

  const req = opts?.requiredYears;
  if (typeof req === "number") {
    if (req <= 2) return "junior";
    if (req >= 10) return JD_SENIOR_IC_RE.test(jd) ? "senior_ic" : "leadership";
    if (req >= 7) return "senior_ic";
    if (req >= 3) return "mid";
    return "junior";
  }

  if (JD_JUNIOR_RE.test(jd)) return "junior";
  if (JD_SENIOR_IC_RE.test(jd) && !JD_LEADERSHIP_RE.test(jd)) return "senior_ic";
  if (JD_MID_RE.test(jd)) return "mid";

  // "Lead" without people-management context → senior IC (common in tech JDs)
  if (/\blead\s+(?:data|software|ml|engineer|scientist|developer|analyst)\b/i.test(jd)) {
    return "senior_ic";
  }

  return "mid";
}

/** Evidence-match composite weights by role level (must sum to 1). */
export function evidenceMatchWeights(level: JdRoleLevel): {
  jdSkillProof: number;
  impactCoverage: number;
  architectureSignal: number;
  leadershipSignal: number;
  deploymentSignal: number;
  seniorityAlignment: number;
} {
  switch (level) {
    case "junior":
      return {
        jdSkillProof: 0.38,
        impactCoverage: 0.22,
        architectureSignal: 0.08,
        leadershipSignal: 0.05,
        deploymentSignal: 0.17,
        seniorityAlignment: 0.1,
      };
    case "mid":
      return {
        jdSkillProof: 0.32,
        impactCoverage: 0.2,
        architectureSignal: 0.12,
        leadershipSignal: 0.08,
        deploymentSignal: 0.18,
        seniorityAlignment: 0.1,
      };
    case "senior_ic":
      return {
        jdSkillProof: 0.28,
        impactCoverage: 0.18,
        architectureSignal: 0.18,
        leadershipSignal: 0.08,
        deploymentSignal: 0.16,
        seniorityAlignment: 0.12,
      };
    case "leadership":
      return {
        jdSkillProof: 0.32,
        impactCoverage: 0.14,
        architectureSignal: 0.09,
        leadershipSignal: 0.13,
        deploymentSignal: 0.11,
        seniorityAlignment: 0.21,
      };
  }
}
