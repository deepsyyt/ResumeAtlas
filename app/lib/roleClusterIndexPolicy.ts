import type { ResumeSeoTopic } from "@/app/lib/resumeTopicTypes";

/**
 * Hybrid SEO policy: index high-intent role URLs; thin duplicates stay noindex where noted.
 *
 * Indexed: `/{role}-resume-guide` (examples, bullets, sections); `/{role}-resume-keywords` (ATS keyword lists).
 * Standalone `/{role}` hubs 301 to pillars. Legacy `/{role}/resume/*` and `/{role}/keywords/*` 301 in
 * `next.config.mjs` (no App Router pages).
 */
export const INDEXED_ROLE_RESUME_TOPICS = [] as const satisfies readonly ResumeSeoTopic[];

const INDEXED_SET = new Set<string>(INDEXED_ROLE_RESUME_TOPICS);

export function isRoleResumeTopicIndexed(topic: string): boolean {
  return INDEXED_SET.has(topic);
}

/** Legacy intent URLs redirect to `/{role}-resume-keywords#{intent}`; no standalone intent routes. */
export const NOINDEX_ROLE_KEYWORD_INTENT_PAGES = true;
