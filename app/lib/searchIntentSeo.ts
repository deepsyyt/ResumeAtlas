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
  const title =
    role === "software-engineer"
      ? `Software Engineer Resume Example (${RESUME_EXAMPLE_SERP_TITLE_YEAR} ATS-Friendly Template)${RESUME_ATLAS_TITLE_SUFFIX}`
      : role === "data-scientist"
        ? `Data Scientist Resume Example (${RESUME_EXAMPLE_SERP_TITLE_YEAR} ATS-Friendly Template)${RESUME_ATLAS_TITLE_SUFFIX}`
      : role === "data-analyst"
        ? `Data Analyst Resume Example (${RESUME_EXAMPLE_SERP_TITLE_YEAR} ATS-Friendly Template)${RESUME_ATLAS_TITLE_SUFFIX}`
      : role === "product-manager"
        ? `Product Manager Resume Example (${RESUME_EXAMPLE_SERP_TITLE_YEAR} ATS-Friendly Template)${RESUME_ATLAS_TITLE_SUFFIX}`
      : role === "devops-engineer"
        ? `DevOps Resume Example (${RESUME_EXAMPLE_SERP_TITLE_YEAR} ATS-Friendly Template)${RESUME_ATLAS_TITLE_SUFFIX}`
      : `${rn} Resume Example, Sample & Template (${RESUME_EXAMPLE_SERP_TITLE_YEAR}) — ATS Sections${RESUME_ATLAS_TITLE_SUFFIX}`;
  const baseDesc =
    role === "software-engineer"
      ? "Use a modern software engineer resume example with strong sections, metrics, keywords, and ATS-safe formatting."
      : role === "data-scientist"
        ? "Use a data scientist resume example with strong sections, metrics, and ATS-safe wording for ML and analytics roles."
      : role === "data-analyst"
        ? "Use a data analyst resume example with SQL, dashboard, and impact-focused bullets in ATS-friendly format."
      : role === "product-manager"
        ? "Use a product manager resume example with roadmap, metrics, and launch-focused bullets in ATS-friendly format."
      : role === "devops-engineer"
        ? "Use a DevOps resume example with cloud, CI/CD, reliability, and ATS-safe structure for recruiter scans."
      : sample?.metaDescription ??
        `ATS-friendly ${rn.toLowerCase()} resume example with summary, skills, projects, and bullet patterns on one page.`;
  const description =
    role === "software-engineer"
      ? baseDesc
      : `${baseDesc} Patterns align with ${CONTENT_FRESHNESS_YEAR} ATS and recruiter expectations. Use it as a resume template and sample: mirror the sections, then match your resume to a job description with our free tools before you apply.`;
  return { title, description };
}

export function roleResumeKeywordsHubMeta(role: RoleSlug): { title: string; description: string } {
  const { roleName, metaDescription } = KEYWORD_PAGES[role];
  const title =
    role === "devops-engineer"
      ? `DevOps Resume Keywords for ATS (${CONTENT_FRESHNESS_YEAR} Tools + Skills List)${RESUME_ATLAS_TITLE_SUFFIX}`
      : role === "data-scientist"
        ? `Data Scientist Resume Keywords for ATS (${CONTENT_FRESHNESS_YEAR} + Examples)${RESUME_ATLAS_TITLE_SUFFIX}`
      : role === "software-engineer"
        ? `Software Engineer Resume Keywords for ATS (${CONTENT_FRESHNESS_YEAR} + Examples)${RESUME_ATLAS_TITLE_SUFFIX}`
      : role === "data-analyst"
        ? `Data Analyst Resume Keywords for ATS (${CONTENT_FRESHNESS_YEAR} + Examples)${RESUME_ATLAS_TITLE_SUFFIX}`
      : role === "product-manager"
        ? `Product Manager Resume Keywords for ATS (${CONTENT_FRESHNESS_YEAR} + Examples)${RESUME_ATLAS_TITLE_SUFFIX}`
      : `${roleName} Resume Keywords (${CONTENT_FRESHNESS_YEAR}) - ATS Skills & Keywords${RESUME_ATLAS_TITLE_SUFFIX}`;
  const description =
    role === "devops-engineer"
      ? "Use proven DevOps resume keywords for AWS, Kubernetes, CI/CD, Terraform, Docker, monitoring, and automation."
      : role === "data-scientist"
        ? "Best data scientist resume keywords for Python, SQL, ML, experimentation, dashboards, and ATS screening with examples."
      : role === "software-engineer"
        ? "Best software engineer resume keywords for backend, frontend, APIs, cloud, testing, and ATS screening with examples."
      : role === "data-analyst"
        ? "Best data analyst resume keywords for SQL, Excel, dashboards, experimentation, and ATS screening with examples."
      : role === "product-manager"
        ? "Best product manager resume keywords for roadmap, discovery, metrics, launches, and ATS screening with examples."
      : `${metaDescription} Includes ATS-friendly skills, role terms, and action language used in ${CONTENT_FRESHNESS_YEAR} hiring. Browse by category, then validate against a real posting with ResumeAtlas keyword scan and JD match tools.`;
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
