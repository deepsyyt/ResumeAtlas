/**
 * Legacy pathname segments that 301 in `next.config.mjs` and `middleware.ts`.
 * Kept in one module so edge middleware and scripts stay aligned.
 */

import {
  RESUME_BULLET_ROLES,
  publicPathForBulletHub,
  type ResumeBulletRole,
} from "@/app/lib/resumeBulletPointContent";

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
const BULLET_ROLE_SET = new Set<string>(RESUME_BULLET_ROLES);

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

/** Legacy `/ats-keywords` index and `/ats-keywords/{role}` → canonical keyword URLs (GSC de-dupe). */
export function resolveAtsKeywordsRedirect(pathname: string): string | null {
  const normalized =
    pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  if (normalized === "/ats-keywords") {
    return "/resume-keywords";
  }
  const match = normalized.match(/^\/ats-keywords\/([a-z0-9-]+)$/);
  if (match && ROLE_SET.has(match[1])) {
    return roleResumeKeywordsPublicPath(match[1]);
  }
  return null;
}

/** Legacy `/{role}/resume/{topic}` → public resume guide anchor or bullet hub. */
export function resolveLegacyResumeTopicRedirect(pathname: string): string | null {
  for (const role of ROLE_SLUGS_FOR_LEGACY_REDIRECTS) {
    for (const topic of ROLE_RESUME_TOPICS_FOR_LEGACY_REDIRECTS) {
      if (pathname === `/${role}/resume/${topic}` || pathname === `/${role}/resume/${topic}/`) {
        if (topic === "bullet-points" && BULLET_ROLE_SET.has(role)) {
          return publicPathForBulletHub(role as ResumeBulletRole);
        }
        return `${roleResumeGuidePublicPath(role)}#${topic}`;
      }
    }
  }
  return null;
}

export function isKnownRoleSlugForLegacyRedirect(segment: string): boolean {
  return ROLE_SET.has(segment);
}
