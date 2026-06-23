/** Fallback parallel roles when target title is missing and heuristics cannot infer domain. */
export const ROLE_FIT_ARCHETYPES = [
  "Head of AI",
  "Director of GenAI",
  "Applied AI Engineering Leader",
  "GenAI Platform Architect",
  "Principal AI Engineer",
  "Senior Staff GenAI Engineer",
  "Hands-on LLM Engineer",
] as const;

export const TARGET_ROLE_TITLE_MAX_CHARS = 120;
export const PARALLEL_ROLE_COUNT = 7;

export function normalizeTargetRoleTitle(raw: string | undefined | null): string {
  let title = String(raw ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, TARGET_ROLE_TITLE_MAX_CHARS);

  title = title.replace(/\s*\([^)]*\)\s*$/, "").trim();
  return stripRoleTitleIndustrySuffix(title);
}

/** Keep core job title; drop trailing industry, domain, or location after comma/dash. */
export function stripRoleTitleIndustrySuffix(title: string): string {
  if (title.includes(",")) {
    const head = title.split(",")[0]?.trim() ?? "";
    if (head.length >= 4) return head;
  }
  const dashParts = title.split(/\s[-–]\s/);
  if (dashParts.length > 1) {
    const head = dashParts[0]?.trim() ?? "";
    if (head.length >= 4 && !/^(about|job|role|company)\b/i.test(head)) return head;
  }
  return title.trim();
}

const JD_SECTION_HEADER_RE =
  /^(required|preferred|desired|minimum|qualifications?|requirements?|responsibilities?|what you|about (the )?(role|job|us|company)|job description|skills?(?:\s|$)|education|experience|benefits?|compensation|location|summary|overview|nice[- ]to[- ]have|must[- ]have|key responsib|duties|who you are|how to apply|equal opportunity)/i;

const ROLE_TITLE_SIGNAL_RE =
  /\b(manager|engineer|director|lead|head|architect|analyst|scientist|developer|consultant|specialist|coordinator|administrator|designer|program|project|scrum|master|coach|vp|president|chief|officer|associate|principal|staff|technician|supervisor|executive|partner|fellow|intern|owner|representative|strategist)\b/i;

/** Validate and normalize a parallel role title for display. Returns null if not a real job title. */
export function sanitizeParallelRoleTitle(raw: string | undefined | null): string | null {
  const title = normalizeTargetRoleTitle(raw);
  if (!title || title.length < 4) return null;
  if (JD_SECTION_HEADER_RE.test(title)) return null;
  if (/^(required|preferred|desired|minimum|qualification|requirement|responsibilit)\b/i.test(title)) {
    return null;
  }
  if (!ROLE_TITLE_SIGNAL_RE.test(title) && !/^(senior|staff|principal|lead|junior|associate|entry|hands-on)\b/i.test(title)) {
    return null;
  }
  if (/^[A-Z\s/&]+$/.test(title) && title.length > 28 && !ROLE_TITLE_SIGNAL_RE.test(title)) {
    return null;
  }
  return title;
}

/** Best-effort job title from the first lines of a pasted JD. */
export function extractTargetRoleFromJobDescription(jd: string): string | null {
  const lines = jd
    .split(/\n/)
    .map((l) => l.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  for (const line of lines.slice(0, 10)) {
    if (/^(about|company|location|remote|hybrid|department|team)\b/i.test(line)) continue;
    if (
      /^(senior|staff|principal|director|head|lead|manager|engineer|developer|analyst|scientist|architect|consultant|specialist|associate|vp|vice president|chief|program|product|designer|administrator)\b/i.test(
        line
      ) &&
      line.length <= TARGET_ROLE_TITLE_MAX_CHARS
    ) {
      return stripRoleTitleIndustrySuffix(line);
    }
    const colonIdx = line.indexOf(":");
    if (colonIdx > 0 && colonIdx < 60 && line.length <= TARGET_ROLE_TITLE_MAX_CHARS) {
      const head = line.slice(0, colonIdx).trim();
      if (head.length >= 4 && sanitizeParallelRoleTitle(head)) return head;
    }
  }

  const first = lines[0];
  if (first && first.length >= 4 && first.length <= 80) {
    const cleaned = sanitizeParallelRoleTitle(first);
    if (cleaned) return cleaned;
  }
  return null;
}

export function resolveTargetRoleTitle(
  userProvided: string | undefined | null,
  _jobDescription?: string
): string {
  const fromUser = normalizeTargetRoleTitle(userProvided);
  if (fromUser) return fromUser;
  return "Target role";
}

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

/** Shorter labels for the dashboard role-fit table so rows fit without scrolling. */
export function verdictLabelCompactFor(verdict: RoleFitVerdict): string {
  switch (verdict) {
    case "strong":
      return "Strong match";
    case "good":
      return "Good";
    case "moderate":
      return "Moderate";
    case "needs_depth":
      return "Needs depth";
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
      return { hex: "#14532D", bgHex: "#BBF7D0" };
    case "good":
      return { hex: "#166534", bgHex: "#DCFCE7" };
    case "moderate":
      return { hex: "#A16207", bgHex: "#FDE68A" };
    case "needs_depth":
      return { hex: "#C2410C", bgHex: "#FED7AA" };
  }
}

export const ROLE_FIT_SECTION_TITLE = "If this person is applying for";
export const ROLE_FIT_SECTION_INTRO =
  "Other related roles you may want to apply for.";

export function roleTitleLooksLeadership(role: string): boolean {
  return /\b(head|director|vp|vice president|chief|manager|leader|lead\b)\b/i.test(role);
}

export function roleTitleLooksHandsOnIc(role: string): boolean {
  return (
    /\b(hands-on|individual contributor|ic\b|engineer|developer|scientist|analyst|specialist)\b/i.test(
      role
    ) && !roleTitleLooksLeadership(role)
  );
}

export function roleTitleLooksArchitectOrStaff(role: string): boolean {
  return /\b(architect|platform|staff|principal|distinguished|fellow)\b/i.test(role);
}
