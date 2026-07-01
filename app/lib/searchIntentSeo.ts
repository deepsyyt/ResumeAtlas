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
 * **`/{role}-resume-guide`** - Role resume example, bullets, summary, and projects (guide intent). Generic “ATS template” SERP belongs on `/ats-resume-template` only.
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

/** SERP `<title>` stem per role — no “template” (owned by `/ats-resume-template`). */
const ROLE_RESUME_EXAMPLE_TITLE_STEM: Record<RoleSlug, string> = {
  "software-engineer": `Software Engineer Resume Example (+ Bullet Library) (${RESUME_EXAMPLE_SERP_TITLE_YEAR})`,
  "data-analyst": `Data Analyst Resume Example (+ Metrics & Keywords) (${RESUME_EXAMPLE_SERP_TITLE_YEAR})`,
  "product-manager": `Product Manager Resume Example (+ Achievement Bullets) (${RESUME_EXAMPLE_SERP_TITLE_YEAR})`,
  "data-scientist": `Data Scientist Resume Example (+ Projects & Bullets) (${RESUME_EXAMPLE_SERP_TITLE_YEAR})`,
  "business-analyst": `Business Analyst Resume Example (+ Requirements & Bullets) (${RESUME_EXAMPLE_SERP_TITLE_YEAR})`,
  "frontend-developer": `Frontend Developer Resume Example (+ Projects & Bullets) (${RESUME_EXAMPLE_SERP_TITLE_YEAR})`,
  "backend-developer": `Backend Developer Resume Example (+ API & Impact Bullets) (${RESUME_EXAMPLE_SERP_TITLE_YEAR})`,
  "machine-learning-engineer": `Machine Learning Engineer Resume Example (+ MLOps Bullets) (${RESUME_EXAMPLE_SERP_TITLE_YEAR})`,
  "devops-engineer": `DevOps Resume Example (+ CI/CD & Reliability Bullets) (${RESUME_EXAMPLE_SERP_TITLE_YEAR})`,
  "full-stack-developer": `Full Stack Developer Resume Example (+ Stack & Bullets) (${RESUME_EXAMPLE_SERP_TITLE_YEAR})`,
};

/** On-page H1 — short role example intent (aligns with title, without SERP extras). */
export function roleResumeExampleH1(role: RoleSlug): string {
  return `${KEYWORD_PAGES[role].roleName} Resume Example`;
}

export function roleResumeExampleTitleStem(role: RoleSlug): string {
  return ROLE_RESUME_EXAMPLE_TITLE_STEM[role];
}

export function roleResumeExampleListMeta(role: RoleSlug): { title: string; description: string } {
  const kw = KEYWORD_PAGES[role];
  const resumeSlug = `${role}-resume-example` as ResumeSlug;
  const sample = RESUME_PAGES[resumeSlug];
  const rn = kw.roleName;
  const title = `${ROLE_RESUME_EXAMPLE_TITLE_STEM[role]}${RESUME_ATLAS_TITLE_SUFFIX}`;
  const baseDesc =
    role === "software-engineer"
      ? "Software engineer resume example with summary patterns, project bullets, and stack-specific impact lines recruiters and ATS look for."
      : role === "data-scientist"
        ? "Data scientist resume example with skills, projects, and measurable bullet patterns for ML and analytics roles."
      : role === "data-analyst"
        ? "Data analyst resume example with SQL, dashboard, and impact-focused bullets in a scannable one-column layout."
      : role === "product-manager"
        ? "Product manager resume example with roadmap, metrics, and launch-focused bullets that prove outcomes."
      : role === "devops-engineer"
        ? "DevOps resume example with cloud, CI/CD, reliability, and impact bullets for infrastructure roles."
      : sample?.metaDescription ??
        `${rn} resume example with summary, skills, projects, and bullet patterns on one page.`;
  const keywordHubHint = ` ATS keyword checklists for this role are on ${roleResumeKeywordsPath(role)}—not this page.`;
  const description = `${baseDesc} Mirror the section structure, then match your resume to a job description with our free tools before you apply.${keywordHubHint}`;
  return { title, description };
}

const ROLE_KEYWORDS_SERP_TOOL_HINT: Record<RoleSlug, string> = {
  "data-analyst": "SQL, Tableau, Excel, Looker, dashboarding",
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

/**
 * Unique SERP titles per role — avoids copy-paste `Free ATS List` cannibalization across analyst siblings.
 * Each override leads with the role keyword, includes the freshness year, and adds a role-specific
 * differentiator to improve CTR over Jobscan-style generic "ATS list" titles.
 */
const ROLE_KEYWORDS_SERP_TITLE_OVERRIDE: Partial<Record<RoleSlug, string>> = {
  "data-analyst": `Top Data Analyst Resume Keywords (${CONTENT_FRESHNESS_YEAR}) | ATS Skills Checklist${RESUME_ATLAS_TITLE_SUFFIX}`,
  "business-analyst": `Business Analyst Resume Keywords (${CONTENT_FRESHNESS_YEAR}) | Requirements, JIRA & Power BI ATS List${RESUME_ATLAS_TITLE_SUFFIX}`,
  "data-scientist": `Data Scientist Resume Keywords That Pass ATS (${CONTENT_FRESHNESS_YEAR}) — Python, SQL & ML Must-Haves${RESUME_ATLAS_TITLE_SUFFIX}`,
  "frontend-developer": `Frontend Developer Resume Keywords for ATS (${CONTENT_FRESHNESS_YEAR}) — React, TypeScript & Top 25 List${RESUME_ATLAS_TITLE_SUFFIX}`,
  "software-engineer": `Software Engineer Resume Keywords (${CONTENT_FRESHNESS_YEAR}) | ATS Checklist (Top 25+)${RESUME_ATLAS_TITLE_SUFFIX}`,
  "machine-learning-engineer": `Machine Learning Engineer Resume Keywords for ATS (${CONTENT_FRESHNESS_YEAR}) — PyTorch, MLOps & Must-Haves${RESUME_ATLAS_TITLE_SUFFIX}`,
};

function roleKeywordsSerpTitle(roleName: string, role: RoleSlug): string {
  const override = ROLE_KEYWORDS_SERP_TITLE_OVERRIDE[role];
  if (override) return override;
  const shortName =
    role === "devops-engineer" ? "DevOps" : roleName;
  return `${shortName} Resume Keywords (${CONTENT_FRESHNESS_YEAR}) - Free ATS List${RESUME_ATLAS_TITLE_SUFFIX}`;
}

const ROLE_KEYWORDS_CTR_DESCRIPTION: Partial<Record<RoleSlug, string>> = {
  "data-analyst":
    "Data analyst resume keywords ATS checklist for 2026: SQL, Tableau, Excel, Looker, dbt, dashboarding, ETL, and KPI reporting. Copy-paste list, then scan your resume against the job description for missing terms.",
  "data-scientist":
    "Python, SQL, scikit-learn, Spark, A/B testing — the data scientist resume keywords ATS systems and recruiters scan for in 2026. Copy the verified list free, then paste your JD to see which terms your resume is missing.",
  "devops-engineer":
    "DevOps resume keywords for ATS (2026): Kubernetes, Terraform, CI/CD, AWS, SRE, Prometheus, Grafana. Free copy-ready list — paste your job description to find missing infrastructure and reliability terms.",
  "machine-learning-engineer":
    "PyTorch, TensorFlow, MLOps, feature engineering, experiment tracking — the ML engineer resume keywords ATS filters on in 2026. Copy the list free, then paste your JD to find the exact terms your resume is missing.",
  "frontend-developer":
    "React, TypeScript, Next.js, Core Web Vitals, WCAG — the frontend developer resume keywords ATS and recruiters scan for in 2026. Copy the top-25 list, then paste your JD to see exactly which keywords you're missing.",
  "software-engineer":
    "Software engineer resume keywords for ATS (2026): TypeScript, JavaScript, system design, REST APIs, PostgreSQL, AWS, CI/CD, testing. Copy the top-25 list — then paste your job description to see which terms your resume is missing.",
  "business-analyst":
    "Business analyst resume keywords for ATS (2026): requirements gathering, JIRA, Power BI, BPMN, user stories, stakeholder management, process mapping. Free checklist — paste your JD to find gaps before you apply.",
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
