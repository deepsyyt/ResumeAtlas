/**
 * Legacy pathname segments that 301 in `next.config.mjs` and `middleware.ts`.
 * Kept in one module so edge middleware and scripts stay aligned.
 */

export const ROLE_SLUGS_FOR_LEGACY_REDIRECTS = [
  "data-analyst",
  "data-scientist",
  "software-engineer",
  "product-manager",
  "business-analyst",
  "frontend-developer",
  "backend-developer",
  "machine-learning-engineer",
  "devops-engineer",
  "full-stack-developer",
] as const;

export const ROLE_KEYWORD_INTENTS_FOR_LEGACY_REDIRECTS = [
  "core-keywords",
  "technical-skills",
  "tools-platforms",
  "action-verbs",
  "projects",
  "summary",
] as const;

export const ROLE_RESUME_TOPICS_FOR_LEGACY_REDIRECTS = [
  "bullet-points",
  "skills",
  "summary",
  "projects",
  "responsibilities",
  "experience-examples",
] as const;

const ROLE_SET = new Set<string>(ROLE_SLUGS_FOR_LEGACY_REDIRECTS);

export function roleResumeKeywordsPublicPath(role: string): string {
  return `/${role}-resume-keywords`;
}

export function roleResumeGuidePublicPath(role: string): string {
  return `/${role}-resume-guide`;
}

/** Legacy `/{role}/keywords` or `/{role}/keywords/{intent}` → public keyword hub. */
export function resolveLegacyKeywordsRedirect(pathname: string): string | null {
  for (const role of ROLE_SLUGS_FOR_LEGACY_REDIRECTS) {
    if (pathname === `/${role}/keywords` || pathname === `/${role}/keywords/`) {
      return roleResumeKeywordsPublicPath(role);
    }
    for (const intent of ROLE_KEYWORD_INTENTS_FOR_LEGACY_REDIRECTS) {
      if (pathname === `/${role}/keywords/${intent}` || pathname === `/${role}/keywords/${intent}/`) {
        return `${roleResumeKeywordsPublicPath(role)}#${intent}`;
      }
    }
  }
  return null;
}

/** Legacy `/{role}/resume/{topic}` → public resume guide anchor. */
export function resolveLegacyResumeTopicRedirect(pathname: string): string | null {
  for (const role of ROLE_SLUGS_FOR_LEGACY_REDIRECTS) {
    for (const topic of ROLE_RESUME_TOPICS_FOR_LEGACY_REDIRECTS) {
      if (pathname === `/${role}/resume/${topic}` || pathname === `/${role}/resume/${topic}/`) {
        return `${roleResumeGuidePublicPath(role)}#${topic}`;
      }
    }
  }
  return null;
}

export function isKnownRoleSlugForLegacyRedirect(segment: string): boolean {
  return ROLE_SET.has(segment);
}
