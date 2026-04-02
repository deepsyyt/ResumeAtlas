import type { RoleSlug } from "@/app/lib/seoPages";

export const ROLE_KEYWORD_INTENTS = [
  "core-keywords",
  "technical-skills",
  "tools-platforms",
  "action-verbs",
  "projects",
  "summary",
] as const;

export type RoleKeywordIntent = (typeof ROLE_KEYWORD_INTENTS)[number];

export function isRoleKeywordIntent(value: string): value is RoleKeywordIntent {
  return (ROLE_KEYWORD_INTENTS as readonly string[]).includes(value);
}

export function keywordIntentLabel(intent: RoleKeywordIntent): string {
  switch (intent) {
    case "core-keywords":
      return "Core Keywords";
    case "technical-skills":
      return "Technical Skills Keywords";
    case "tools-platforms":
      return "Tools and Platforms Keywords";
    case "action-verbs":
      return "Action Verbs";
    case "projects":
      return "Project Keywords";
    case "summary":
      return "Summary Keywords";
    default:
      return "Keywords";
  }
}

export function keywordIntentDescription(intent: RoleKeywordIntent, roleName: string): string {
  const roleLower = roleName.toLowerCase();
  switch (intent) {
    case "core-keywords":
      return `The highest-signal ATS terms recruiters expect in ${roleLower} resumes.`;
    case "technical-skills":
      return `Role-specific technical skill keywords to include in your ${roleLower} resume.`;
    case "tools-platforms":
      return `Tools and platform keywords commonly required in ${roleLower} job descriptions.`;
    case "action-verbs":
      return `Action verbs and phrasing that make ${roleLower} bullets stronger and more scannable.`;
    case "projects":
      return `Project-related keywords that improve ${roleLower} resume-job alignment.`;
    case "summary":
      return `Summary-line keyword patterns for ${roleLower} resumes and ATS matching.`;
    default:
      return `Keywords to strengthen your ${roleLower} resume for ATS and recruiter review.`;
  }
}

/** Up to 3 lateral links for crawl / UX (not all sibling intents). */
const RELATED_KEYWORD_INTENTS: Record<RoleKeywordIntent, RoleKeywordIntent[]> = {
  "core-keywords": ["technical-skills", "action-verbs", "summary"],
  "technical-skills": ["core-keywords", "tools-platforms", "projects"],
  "tools-platforms": ["technical-skills", "core-keywords", "projects"],
  "action-verbs": ["core-keywords", "technical-skills", "projects"],
  projects: ["core-keywords", "technical-skills", "action-verbs"],
  summary: ["core-keywords", "action-verbs", "technical-skills"],
};

export function getRelatedKeywordIntents(current: RoleKeywordIntent): RoleKeywordIntent[] {
  return RELATED_KEYWORD_INTENTS[current];
}

export function roleToProblemPath(role: RoleSlug): string {
  if (role === "product-manager" || role === "business-analyst") {
    return "/problems/resume-vs-job-description";
  }
  if (role === "devops-engineer" || role === "backend-developer") {
    return "/problems/ats-rejecting-my-resume";
  }
  return "/problems/resume-not-getting-interviews";
}
