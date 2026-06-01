import { getSiteUrl } from "@/app/lib/siteUrl";
import { CONTENT_FRESHNESS_YEAR } from "@/app/lib/contentFreshness";
import {
  KEYWORD_PAGES,
  RESUME_PAGES,
  type ResumeSlug,
  type RoleSlug,
} from "@/app/lib/seoPages";
import { ROLE_CONTENT_MAP } from "@/app/lib/roleContentMap";
import { ROLE_KEYWORDS_PRIMARY_H2 } from "@/app/lib/roleKeywordsPageConfig";
import { RESUME_EXAMPLE_SERP_TITLE_YEAR } from "@/app/lib/resumeExampleSeoTemplate";

export const RESUME_ATLAS_TITLE_SUFFIX = " | ResumeAtlas" as const;

export { CONTENT_FRESHNESS_YEAR, CONTENT_LAST_UPDATED_LABEL } from "@/app/lib/contentFreshness";

export function stripResumeAtlasTitleSuffix(title: string): string {
  const suf = RESUME_ATLAS_TITLE_SUFFIX;
  return title.endsWith(suf) ? title.slice(0, -suf.length).trim() : title.trim();
}

/**
 * Canonical URL owners (indexed) vs. query intent - use when writing titles, descriptions, and internal links.
 *
 * **`/{role}-resume-guide`** - Example, template, bullets, summary, and projects (guide intent).
 *
 * **`/{role}-resume-keywords`** - ATS keyword lists and JD-gap scanning (keyword intent). Serves `/{role}/keywords`.
 *
 * **`/{role}`** - Career / interview-framed hub (indexed only when there is no standalone pillar takeover in
 * `seoPages.ts`; otherwise noindex with canonical to `/{role}-resume-guide`).
 *
 * **Thin-content avoidance:** `/{role}/keywords/{intent}` **301** to `/{role}-resume-keywords#{intent}`.
 * Thin `/{role}/resume/{topic}` routes remain noindex with canonical to fragment on the guide where mapped.
 */

export function absoluteCanonicalUrl(path: string): string {
  const base = getSiteUrl().replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

/** Canonical indexed URL for merged role pillar (SEO Phase 1). */
export function roleResumePillarPath(role: RoleSlug): string {
  return `/${role}-resume-guide`;
}

/** Alias: legacy name; resolves to pillar. */
export function roleResumeExamplePath(role: RoleSlug): string {
  return roleResumePillarPath(role);
}

/** Public URL for role keyword intent (indexed; not the example guide). */
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
      ? `Software Engineer Resume Example, Sample & Template (${RESUME_EXAMPLE_SERP_TITLE_YEAR})${RESUME_ATLAS_TITLE_SUFFIX}`
      : role === "data-scientist"
        ? `Data Scientist Resume Example, Sample & Template (${RESUME_EXAMPLE_SERP_TITLE_YEAR})${RESUME_ATLAS_TITLE_SUFFIX}`
      : role === "data-analyst"
        ? `Data Analyst Resume Example (${RESUME_EXAMPLE_SERP_TITLE_YEAR} ATS-Friendly Template)${RESUME_ATLAS_TITLE_SUFFIX}`
      : role === "product-manager"
        ? `Product Manager Resume Example (${RESUME_EXAMPLE_SERP_TITLE_YEAR} ATS-Friendly Template)${RESUME_ATLAS_TITLE_SUFFIX}`
      : role === "devops-engineer"
        ? `DevOps Resume Example (${RESUME_EXAMPLE_SERP_TITLE_YEAR} ATS-Friendly Template)${RESUME_ATLAS_TITLE_SUFFIX}`
      : `${rn} Resume Example, Sample & Template (${RESUME_EXAMPLE_SERP_TITLE_YEAR}) - ATS Sections${RESUME_ATLAS_TITLE_SUFFIX}`;
  const baseDesc =
    role === "software-engineer"
      ? "Use a software engineer resume example, sample, and ATS-friendly template with summary/objective patterns, project bullets, and stack-specific impact lines."
      : role === "data-scientist"
        ? "Use a data scientist resume example, sample, and ATS-friendly template with summary/objective patterns, skills, projects, and measurable bullet points."
      : role === "data-analyst"
        ? "Use a data analyst resume example with SQL, dashboard, and impact-focused bullets in ATS-friendly format."
      : role === "product-manager"
        ? "Use a product manager resume example with roadmap, metrics, and launch-focused bullets in ATS-friendly format."
      : role === "devops-engineer"
        ? "Use a DevOps resume example with cloud, CI/CD, reliability, and ATS-safe structure for recruiter scans."
      : sample?.metaDescription ??
        `ATS-friendly ${rn.toLowerCase()} resume example with summary, skills, projects, and bullet patterns on one page.`;
  const keywordHubHint = ` ATS keyword checklists for this role are on ${roleResumeKeywordsPath(role)}—not this page.`;
  const description =
    role === "software-engineer"
      ? `${baseDesc}${keywordHubHint}`
      : `${baseDesc} Patterns align with ${CONTENT_FRESHNESS_YEAR} ATS and recruiter expectations. Use it as a resume template and sample: mirror the sections, then match your resume to a job description with our free tools before you apply.${keywordHubHint}`;
  return { title, description };
}

const ROLE_KEYWORDS_SERP_TOOL_HINT: Record<RoleSlug, string> = {
  "data-analyst": "SQL, Python, Power BI, dashboards",
  "data-scientist": "Python, SQL, ML, experimentation",
  "software-engineer": "TypeScript, React, APIs, cloud, testing",
  "product-manager": "roadmaps, discovery, metrics, launches",
  "business-analyst": "requirements, BPMN, Power BI, stakeholder alignment",
  "frontend-developer": "React, TypeScript, accessibility, performance",
  "backend-developer": "APIs, microservices, databases, cloud, reliability",
  "machine-learning-engineer": "Python, PyTorch, model deployment, MLOps",
  "devops-engineer": "Kubernetes, Terraform, CI/CD, AWS, observability",
  "full-stack-developer": "React, Node.js, SQL, REST APIs, full-stack delivery",
};

function roleKeywordsSerpTitle(roleName: string, role: RoleSlug): string {
  const shortName =
    role === "devops-engineer" ? "DevOps" : roleName;
  return `${shortName} Resume Keywords (${CONTENT_FRESHNESS_YEAR}) - Free ATS List${RESUME_ATLAS_TITLE_SUFFIX}`;
}

const ROLE_KEYWORDS_CTR_DESCRIPTION: Partial<Record<RoleSlug, string>> = {
  "data-analyst":
    "Free data analyst resume keywords for ATS: SQL, Python, Power BI, dashboards, and experiment language. Copy the list, then scan your resume against the job description for missing terms.",
  "data-scientist":
    "Data scientist resume keywords recruiters search for—Python, SQL, ML, experimentation, deployment. Free ATS checklist; paste your JD to see keyword gaps before you apply.",
  "devops-engineer":
    "DevOps resume keywords for ATS: Kubernetes, Terraform, CI/CD, AWS, SRE. Free copy-ready list plus job-description scan to find missing tools and reliability terms.",
  "machine-learning-engineer":
    "Machine learning engineer resume keywords with MLOps and production focus. Free ATS list; compare your resume to the posting to fix weak ML keyword coverage.",
};

function roleKeywordsSerpDescription(role: RoleSlug): string {
  const ctr = ROLE_KEYWORDS_CTR_DESCRIPTION[role];
  if (ctr) return ctr;
  const roleLower = KEYWORD_PAGES[role].roleName.toLowerCase();
  const tools = ROLE_CONTENT_MAP[role].tools.slice(0, 5).join(", ");
  const hint = ROLE_KEYWORDS_SERP_TOOL_HINT[role];
  return `Copy-ready ${roleLower} resume keywords for ATS (${hint}). Core tools: ${tools}. Paste your job description to see missing keywords before you apply.`;
}

/** SERP title + meta for indexed `/{role}-resume-keywords` pages (keyword intent only). */
export function roleResumeKeywordsHubMeta(role: RoleSlug): { title: string; description: string } {
  const { roleName } = KEYWORD_PAGES[role];
  return {
    title: roleKeywordsSerpTitle(roleName, role),
    description: roleKeywordsSerpDescription(role),
  };
}

/** On-page H1 for keyword hubs (matches query intent, shorter than SERP title). */
export function roleResumeKeywordsH1(role: RoleSlug): string {
  return ROLE_KEYWORDS_PRIMARY_H2[role];
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
