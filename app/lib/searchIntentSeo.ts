import { getSiteUrl } from "@/app/lib/siteUrl";
import { CONTENT_FRESHNESS_YEAR } from "@/app/lib/contentFreshness";
import {
  KEYWORD_PAGES,
  RESUME_PAGES,
  type ResumeSlug,
  type RoleSlug,
} from "@/app/lib/seoPages";
import { RESUME_EXAMPLE_SERP_TITLE_YEAR } from "@/app/lib/resumeExampleSeoTemplate";

export const RESUME_ATLAS_TITLE_SUFFIX = " | ResumeAtlas" as const;

export { CONTENT_FRESHNESS_YEAR, CONTENT_LAST_UPDATED_LABEL } from "@/app/lib/contentFreshness";

export function stripResumeAtlasTitleSuffix(title: string): string {
  const suf = RESUME_ATLAS_TITLE_SUFFIX;
  return title.endsWith(suf) ? title.slice(0, -suf.length).trim() : title.trim();
}

/**
 * Canonical URL owners (indexed) vs. query intent — use when writing titles, descriptions, and internal links.
 *
 * **`/{role}-resume-example`** — Example / sample / template intent: queries like
 * "{role} resume example", "{role} resume sample", "ATS {role} resume", "{role} resume template".
 *
 * **`/{role}-resume-keywords`** — Keyword list / ATS coverage intent: queries like
 * "{role} resume keywords", "ATS keywords for {role}", "{role} skills to put on resume".
 *
 * **`/{role}-resume-bullet-points`** (subset of roles) — Bullet-only intent: queries like
 * "{role} resume bullet points", "{role} resume achievements examples".
 *
 * **`/{role}`** — Career / interview-framed hub (indexed only when there is no standalone example takeover;
 * otherwise noindex with canonical to `/{role}-resume-example`).
 *
 * **Thin-content avoidance:** `/{role}/keywords/{intent}` pages are **noindex** (see
 * `NOINDEX_ROLE_KEYWORD_INTENT_PAGES` in `roleClusterIndexPolicy.ts`); they support depth internally while the
 * keyword **hub** stays the indexed owner for keyword intent. Legacy `/{role}/resume/{topic}` routes
 * are noindex with canonical to the matching fragment on `/{role}-resume-example` where mapped.
 */

export function absoluteCanonicalUrl(path: string): string {
  const base = getSiteUrl().replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

export function roleResumeExamplePath(role: RoleSlug): string {
  return `/${role}-resume-example`;
}

export function roleResumeKeywordsPath(role: RoleSlug): string {
  return `/${role}-resume-keywords`;
}

export function roleResumeExampleListMeta(role: RoleSlug): { title: string; description: string } {
  const kw = KEYWORD_PAGES[role];
  const resumeSlug = `${role}-resume-example` as ResumeSlug;
  const sample = RESUME_PAGES[resumeSlug];
  const rn = kw.roleName;
  const title = `${rn} Resume Example, Sample & Template (${RESUME_EXAMPLE_SERP_TITLE_YEAR}) — ATS Sections${RESUME_ATLAS_TITLE_SUFFIX}`;
  const baseDesc =
    sample?.metaDescription ??
    `ATS-friendly ${rn.toLowerCase()} resume example with summary, skills, projects, and bullet patterns on one page.`;
  const description = `${baseDesc} Patterns align with ${CONTENT_FRESHNESS_YEAR} ATS and recruiter expectations. Use it as a resume template and sample: mirror the sections, then match your resume to a job description with our free tools before you apply.`;
  return { title, description };
}

export function roleResumeKeywordsHubMeta(role: RoleSlug): { title: string; description: string } {
  const { roleName, metaDescription } = KEYWORD_PAGES[role];
  const title =
    role === "devops-engineer"
      ? `DevOps Resume Keywords (${CONTENT_FRESHNESS_YEAR} ATS Phrases That Get Interviews)${RESUME_ATLAS_TITLE_SUFFIX}`
      : `${roleName} Resume Keywords for ATS & Job Descriptions${RESUME_ATLAS_TITLE_SUFFIX}`;
  const description =
    role === "devops-engineer"
      ? `Real DevOps resume keywords used in ${CONTENT_FRESHNESS_YEAR} hiring. ATS-friendly skills, tools, and action verbs recruiters search for - grouped by role and experience level.`
      : `${metaDescription} Keyword themes reflect common ${CONTENT_FRESHNESS_YEAR} hiring language—browse by category, then validate wording against a real posting or run ResumeAtlas’s resume keyword scan.`;
  return { title, description };
}

export function roleResumeKeywordIntentMeta(
  role: RoleSlug,
  intentLabel: string,
  intentDescription: string
): { title: string; description: string } {
  const rn = KEYWORD_PAGES[role].roleName;
  const title = `${rn} Resume Keywords: ${intentLabel} (ATS Examples)${RESUME_ATLAS_TITLE_SUFFIX}`;
  return {
    title,
    description: `${intentDescription} For the full keyword map, use the main ${rn} resume keywords hub on ResumeAtlas; this page expands one category with usage examples.`,
  };
}
