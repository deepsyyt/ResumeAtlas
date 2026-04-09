import type { ResumeSeoTopic } from "@/app/lib/resumeTopicTypes";

/**
 * Hybrid SEO policy: index high-intent role URLs; thin duplicates stay noindex where noted.
 *
 * Indexed: `/{role}` hub for roles **without** a dedicated `/{role}-resume-example` page; `/{role}-resume-keywords`,
 * `/{role}-resume-guide`, dedicated `/{role}-resume-example` pages, bullet hubs.
 * Noindex: `/{role}` hub when that role has a dedicated `/{role}-resume-example` page in `seoPages.ts` (canonical merges to example);
 * `/{role}/keywords/{intent}` (when {@link NOINDEX_ROLE_KEYWORD_INTENT_PAGES}); `/{role}/resume/{topic}` (merged into guide).
 */
export const INDEXED_ROLE_RESUME_TOPICS = [] as const satisfies readonly ResumeSeoTopic[];

const INDEXED_SET = new Set<string>(INDEXED_ROLE_RESUME_TOPICS);

export function isRoleResumeTopicIndexed(topic: string): boolean {
  return INDEXED_SET.has(topic);
}

/** When true, /{role}/keywords/{intent} pages use noindex,follow (keyword cluster + merged guides stay indexed). */
export const NOINDEX_ROLE_KEYWORD_INTENT_PAGES = true;
