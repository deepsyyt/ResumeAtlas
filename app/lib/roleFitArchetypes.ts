export const ROLE_FIT_ARCHETYPES = [
  "Head of AI",
  "Director of GenAI",
  "Applied AI Engineering Leader",
  "GenAI Platform Architect",
  "Principal AI Engineer",
  "Senior Staff GenAI Engineer",
  "Hands-on LLM Engineer",
] as const;

export type RoleFitVerdict = "strong" | "good" | "moderate" | "needs_depth";

export type RoleFitRow = {
  role: string;
  verdict: RoleFitVerdict;
  verdictLabel: string;
};

export function verdictLabelFor(verdict: RoleFitVerdict): string {
  switch (verdict) {
    case "strong":
      return "High chance of clearing";
    case "good":
      return "Good";
    case "moderate":
      return "Moderate";
    case "needs_depth":
      return "Needs more implementation depth";
  }
}

/** Map LLM verdict strings to canonical enum + display label. */
export function parseRoleFitVerdict(raw: string): RoleFitVerdict | null {
  const normalized = raw.trim().toLowerCase();
  if (
    normalized === "strong" ||
    normalized === "strong match" ||
    normalized === "high chance of clearing"
  ) {
    return "strong";
  }
  if (normalized === "good") return "good";
  if (normalized === "moderate") return "moderate";
  if (
    normalized === "needs more implementation depth" ||
    normalized === "needs depth" ||
    normalized === "needs_implementation_depth"
  ) {
    return "needs_depth";
  }
  return null;
}

export function roleFitVerdictStyle(verdict: RoleFitVerdict): { hex: string; bgHex: string } {
  switch (verdict) {
    case "strong":
      return { hex: "#16A34A", bgHex: "#ECFDF5" };
    case "good":
      return { hex: "#22C55E", bgHex: "#F0FDF4" };
    case "moderate":
      return { hex: "#EAB308", bgHex: "#FEFCE8" };
    case "needs_depth":
      return { hex: "#F97316", bgHex: "#FFF7ED" };
  }
}

export const ROLE_FIT_SECTION_TITLE = "If this person is applying for";
export const ROLE_FIT_SECTION_INTRO =
  "Career-level fit for common AI role archetypes — assessed from your resume by the analysis model.";
