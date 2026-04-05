import type { ResumeSeoTopic } from "@/app/lib/resumeTopicTypes";

/**
 * Hybrid SEO policy: index high-intent role URLs only; broad `/{role}` hubs are noindex,follow.
 * Thinner / overlapping URLs stay reachable (follow) but are not indexed to reduce duplicate/thin signals.
 *
 * Indexed: /{role}-resume-keywords, /{role}-resume-guide.
 * Noindex: /{role} (hub), /{role}/keywords/{intent} (all), /{role}/resume/{topic} (merged into /{role}-resume-guide).
 */
export const INDEXED_ROLE_RESUME_TOPICS = [] as const satisfies readonly ResumeSeoTopic[];

const INDEXED_SET = new Set<string>(INDEXED_ROLE_RESUME_TOPICS);

export function isRoleResumeTopicIndexed(topic: string): boolean {
  return INDEXED_SET.has(topic);
}

/** When true, /{role}/keywords/{intent} pages use noindex,follow (keyword cluster + merged guides stay indexed). */
export const NOINDEX_ROLE_KEYWORD_INTENT_PAGES = true;
