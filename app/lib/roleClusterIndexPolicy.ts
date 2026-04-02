import type { ResumeSeoTopic } from "@/app/lib/resumeTopicTypes";

/**
 * Hybrid SEO policy: index role hubs + a small set of high-intent resume deep pages per role.
 * Thinner / overlapping URLs stay reachable (follow) but are not indexed to reduce duplicate/thin signals.
 *
 * Indexed: /{role} (single hub; /{role}/resume redirects), /{role}-resume-keywords, and the merged resume guide page /{role}-resume-guide.
 * Noindex: /{role}/keywords/{intent} (all), all /{role}/resume/{topic} pages (merged into /{role}-resume-guide).
 */
export const INDEXED_ROLE_RESUME_TOPICS = [] as const satisfies readonly ResumeSeoTopic[];

const INDEXED_SET = new Set<string>(INDEXED_ROLE_RESUME_TOPICS);

export function isRoleResumeTopicIndexed(topic: string): boolean {
  return INDEXED_SET.has(topic);
}

/** When true, /{role}/keywords/{intent} pages use noindex,follow (hubs + resume deep pages stay indexed). */
export const NOINDEX_ROLE_KEYWORD_INTENT_PAGES = true;
