import { DATA_ENGINEER_RESUME_GUIDE_PATH } from "@/app/lib/dataEngineerResumeGuide";
import {
  ALT_ROLE_KEYWORD_PAGES,
  getIndexedAltRoleKeywordSlugs,
} from "@/app/lib/altRoleKeywordPages";
import { CONTENT_FRESHNESS_YEAR, RESUME_ATLAS_TITLE_SUFFIX } from "@/app/lib/searchIntentSeo";
import {
  getPilotKeywordConfig,
  PILOT_KEYWORD_SLUGS,
} from "@/app/lib/pilotKeywordPages";
import {
  getResumeExampleClusterConfig,
  RESUME_EXAMPLE_CLUSTER_SLUGS,
  resumeExampleClusterPath,
} from "@/app/lib/resumeExampleClusterPages";
import { KEYWORD_PAGES, resumeExamplePublicPath, type RoleSlug } from "@/app/lib/seoPages";
import { roleResumeKeywordsPath, roleResumePillarPath } from "@/app/lib/searchIntentSeo";

export const RESUME_EXAMPLES_HUB_PATH = "/resume-examples" as const;
export const RESUME_KEYWORDS_HUB_PATH = "/resume-keywords" as const;
export const RESUME_GUIDES_HUB_PATH = "/resume-guides" as const;

export type HubLinkItem = {
  path: string;
  label: string;
  description?: string;
  tier?: "primary" | "secondary" | "pilot";
};

export type HubLinkSection = {
  title: string;
  items: HubLinkItem[];
};

export const CLUSTER_RESUME_KEYWORDS_INDEX_METADATA = {
  path: RESUME_KEYWORDS_HUB_PATH,
  title: `Resume Keywords by Role (${CONTENT_FRESHNESS_YEAR} ATS Lists)${RESUME_ATLAS_TITLE_SUFFIX}`,
  description:
    "Browse ATS resume keyword guides by role: data engineer, SQL, Power BI, business systems analyst, systems analyst, business intelligence, and core tech roles. One hub → keyword page → free JD matcher.",
  ogTitle: `Resume Keywords by Role | ResumeAtlas`,
  ogDescription: `ATS resume keyword lists by role for ${CONTENT_FRESHNESS_YEAR} job searches.`,
};

export const CLUSTER_RESUME_GUIDES_INDEX_METADATA = {
  path: RESUME_GUIDES_HUB_PATH,
  title: `Resume Guides by Role (${CONTENT_FRESHNESS_YEAR} Sections & Bullets)${RESUME_ATLAS_TITLE_SUFFIX}`,
  description:
    "Browse resume guides by role: summary, skills, experience bullets, and ATS-safe structure. Links to examples, keywords, and the free job-description checker.",
  ogTitle: `Resume Guides by Role | ResumeAtlas`,
  ogDescription: `Role resume guides for ${CONTENT_FRESHNESS_YEAR} applications.`,
};

/** Tier-1 roles surfaced on homepage (high search demand). */
export const HOME_TOP_EXAMPLE_SLUGS = [
  "data-analyst",
  "software-engineer",
  "product-manager",
  "data-engineer",
  "business-analyst",
] as const;

export const HOME_TOP_KEYWORD_PATHS = [
  "/data-analyst-resume-keywords",
  "/software-engineer-resume-keywords",
  "/data-engineer-resume-keywords",
  "/sql-developer-resume-keywords",
  "/power-bi-resume-keywords",
] as const;

export function getResumeExamplesHubItems(): HubLinkItem[] {
  const cluster = RESUME_EXAMPLE_CLUSTER_SLUGS.map((slug) => {
    const c = getResumeExampleClusterConfig(slug);
    return {
      path: resumeExampleClusterPath(slug),
      label: `${c.roleName} resume example`,
      description: c.description,
      tier: "primary" as const,
    };
  });
  const other = (Object.keys(KEYWORD_PAGES) as RoleSlug[])
    .filter((role) => !RESUME_EXAMPLE_CLUSTER_SLUGS.includes(role as (typeof RESUME_EXAMPLE_CLUSTER_SLUGS)[number]))
    .map((role) => ({
      path: resumeExamplePublicPath(role),
      label: `${KEYWORD_PAGES[role].roleName} resume example`,
      tier: "secondary" as const,
    }));
  return [...cluster, ...other].sort((a, b) => a.label.localeCompare(b.label));
}

function hubDescriptionSnippet(text: string, max = 150): string {
  return text.length > max ? `${text.slice(0, max).trim()}…` : text;
}

function pilotKeywordHubItems(): HubLinkItem[] {
  return PILOT_KEYWORD_SLUGS.map((slug) => {
    const c = getPilotKeywordConfig(slug);
    return {
      path: c.path,
      label: `${c.roleName} resume keywords`,
      description: hubDescriptionSnippet(c.description),
      tier: "pilot" as const,
    };
  });
}

function altKeywordHubItems(): HubLinkItem[] {
  return getIndexedAltRoleKeywordSlugs().map((slug) => {
    const c = ALT_ROLE_KEYWORD_PAGES[slug];
    return {
      path: c.path,
      label: `${c.roleName} resume keywords`,
      description: hubDescriptionSnippet(c.description),
      tier: "pilot" as const,
    };
  }).sort((a, b) => a.label.localeCompare(b.label));
}

/** Hub sections: featured pilots & alt titles, then core role keyword guides. */
export function getResumeKeywordsHubSections(): HubLinkSection[] {
  const pilots = pilotKeywordHubItems();
  const alt = altKeywordHubItems();
  const core = (Object.keys(KEYWORD_PAGES) as RoleSlug[])
    .map((role) => ({
      path: roleResumeKeywordsPath(role),
      label: `${KEYWORD_PAGES[role].roleName} resume keywords`,
      tier: "primary" as const,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  return [
    {
      title: "Data engineering, SQL & Power BI keyword guides",
      items: pilots,
    },
    {
      title: "Systems analyst & BI keyword guides",
      items: alt,
    },
    {
      title: "Core role keyword guides",
      items: core,
    },
  ];
}

export function getResumeKeywordsHubItems(): HubLinkItem[] {
  return getResumeKeywordsHubSections().flatMap((section) => section.items);
}

export function getResumeGuidesHubItems(): HubLinkItem[] {
  const core = (Object.keys(KEYWORD_PAGES) as RoleSlug[]).map((role) => ({
    path: roleResumePillarPath(role),
    label: `${KEYWORD_PAGES[role].roleName} resume guide`,
    tier: "primary" as const,
  }));
  const de = {
    path: DATA_ENGINEER_RESUME_GUIDE_PATH,
    label: "Data engineer resume guide",
    tier: "primary" as const,
  };
  return [...core, de].sort((a, b) => a.label.localeCompare(b.label));
}

export function homeTopExampleLinks(): HubLinkItem[] {
  return HOME_TOP_EXAMPLE_SLUGS.map((slug) => {
    const c = getResumeExampleClusterConfig(slug);
    return {
      path: resumeExampleClusterPath(slug),
      label: c.roleName,
    };
  });
}

export function homeTopKeywordLinks(): HubLinkItem[] {
  const labels: Record<string, string> = {
    "/data-analyst-resume-keywords": "Data analyst",
    "/software-engineer-resume-keywords": "Software engineer",
    "/data-engineer-resume-keywords": "Data engineer",
    "/sql-developer-resume-keywords": "SQL developer",
    "/power-bi-resume-keywords": "Power BI",
  };
  return HOME_TOP_KEYWORD_PATHS.map((path) => ({
    path,
    label: labels[path] ?? path,
  }));
}
