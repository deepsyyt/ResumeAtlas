import {
  ALT_ROLE_KEYWORD_PAGES,
  getIndexedAltRoleKeywordSlugs,
  isAltRoleKeywordPath,
} from "@/app/lib/altRoleKeywordPages";
import {
  PILOT_KEYWORD_PAGES,
  PILOT_KEYWORD_SLUGS,
  isPilotKeywordPath,
} from "@/app/lib/pilotKeywordPages";
import { KEYWORD_PAGES, RESUME_PAGES, type RoleSlug } from "@/app/lib/seoPages";
import {
  getRoleClusterNavLinks,
  resolveRoleClusterKeyFromPath,
  roleClusterInternalLinks,
} from "@/app/lib/roleClusterLinks";
import { roleResumeKeywordsPath, roleResumePillarPath } from "@/app/lib/searchIntentSeo";

export type InternalLink = { path: string; label: string };

/** Primary free tool: AI resume checker, JD match, and optimizer (workbench). */
export const CHECK_RESUME_AGAINST_JD_PATH = "/check-resume-against-job-description" as const;

/** Keyword gap SEO cluster (missing terms vs a posting). Tool runs on {@link CHECK_RESUME_AGAINST_JD_PATH}. */
export const RESUME_KEYWORD_SCANNER_PATH = "/resume-keyword-scanner" as const;

/** Marketing homepage (funnel only; tool is {@link CHECK_RESUME_AGAINST_JD_PATH}). */
export const HOME_MARKETING_PATH = "/" as const;

/** @deprecated Homepage tool consolidated onto {@link CHECK_RESUME_AGAINST_JD_PATH}. */
export const LEGACY_CHECK_RESUME_AGAINST_JD_PATH = CHECK_RESUME_AGAINST_JD_PATH;

/** Same tool with in-page form anchor (primary funnel CTAs). */
export const CHECK_RESUME_AGAINST_JD_FORM_HREF =
  `${CHECK_RESUME_AGAINST_JD_PATH}#ats-checker-form` as const;

/** Keyword scanner cluster CTA → JD workbench (no embedded form on `/resume-keyword-scanner`). */
export const RESUME_KEYWORD_SCANNER_FORM_HREF = CHECK_RESUME_AGAINST_JD_FORM_HREF;

/** Hub for optimize / tailor resume to job description intent (role spokes link here). */
export const OPTIMIZE_RESUME_FOR_JD_PATH =
  "/optimize-resume-for-job-description" as const;

/** @deprecated Alias for {@link CHECK_RESUME_AGAINST_JD_FORM_HREF}. */
export const OPTIMIZE_RESUME_FOR_JD_FORM_HREF = CHECK_RESUME_AGAINST_JD_FORM_HREF;

/** Secondary CTA anchor when linking from compare tool → optimize hub (distinct intent). */
export const OPTIMIZE_RESUME_FOR_JD_ANCHOR =
  "Optimize resume for job description" as const;

/** Primary funnel CTA: compare tool does analysis + AI optimization (optimize SEO pages link here). */
export const ANALYZE_OPTIMIZE_RESUME_JD_CTA =
  "Analyze and optimize resume for this job description (free)" as const;

/** Canonical ATS guide: template/format/examples (legacy `/how-to-pass-ats` redirects here). */
export const ATS_RESUME_TEMPLATE_GUIDE_PATH =
  "/ats-resume-template" as const;

/** Work experience section: format, samples, and query-aligned examples (single canonical hub). */
export const RESUME_WORK_EXPERIENCE_GUIDE_PATH =
  "/resume-guides/resume-work-experience-examples" as const;

/** Skills section guide: examples, ATS-safe formatting, and keyword alignment. */
export const RESUME_SKILLS_GUIDE_PATH =
  "/resume-guides/resume-skills-examples" as const;

/** Navbar label for the primary tool page (matches product H1 intent). */
export const TOOL_PAGE_NAV_LABEL = "Compare resume to job description" as const;

/** Short navbar label on small screens. */
export const TOOL_PAGE_NAV_LABEL_SHORT = "Resume JD match" as const;

/** Navbar + hero CTA (apply-readiness). */
export const CHECK_RESUME_AGAINST_JD_HERO_CTA = "Check if I'm ready to apply" as const;

/** Primary JD-tool CTA: keyword-rich anchor for buttons and links to the matcher. */
export const CHECK_RESUME_AGAINST_JD_PRIMARY_CTA =
  "Check if you're ready to apply (free)" as const;

/** Competitor comparison pages: message match for alternative-intent traffic. */
export const COMPETITOR_COMPARISON_CTA = "Try ResumeAtlas free" as const;

/** Pillar: keyword match ≠ apply-readiness; linked from comparison pages. */
export {
  ATS_SCORE_VS_JOB_FIT_PATH,
  RESUME_NOT_GETTING_INTERVIEWS_PATH,
  SKILLS_LISTED_NOT_PROVEN_PATH,
  ALREADY_HAVE_SKILLS_PATH,
  HOW_RECRUITERS_EVALUATE_PATH,
} from "@/app/lib/interviewCluster/paths";

/** Primary nav label for the workbench tool. */
export const PRIMARY_TOOL_NAV_LABEL = "Resume checker & optimizer" as const;

export const PRIMARY_TOOL_NAV_LABEL_SHORT = "Checker" as const;

export const ATS_RESUME_NAV_LABEL = "ATS resume checker" as const;

export const ATS_RESUME_CHECKER_PATH = "/ats-resume-checker" as const;

/** Primary ATS checker CTA on `/ats-resume-checker` (parsing/format, JD optional). */
export const CHECK_ATS_RESUME_PRIMARY_CTA =
  "Check my resume ATS compatibility (free)" as const;

/** Anchor for links from ATS compliance page → JD matcher (distinct intent). */
export const COMPARE_RESUME_WITH_JD_ANCHOR = "compare resume with job description" as const;

/** Alternate anchor when linking to `/ats-resume-checker-free` (same URL as “ATS resume checker”). */
export const CHECK_ATS_COMPATIBILITY_ANCHOR = "check ATS compatibility" as const;

/** High-volume variant when linking to the homepage workbench. */
export const RESUME_VS_JOB_DESCRIPTION_CHECKER_ANCHOR =
  "resume vs job description checker" as const;

/** Third common variant for the same JD matcher URL (search-aligned phrasing). */
export const MATCH_RESUME_TO_JOB_DESCRIPTION_ANCHOR =
  "match resume to job description" as const;

/** Same tool as {@link CHECK_RESUME_AGAINST_JD_PATH} (legacy alias for anchor copy). */
export const MATCH_RESUME_TO_JOB_DESCRIPTION_PATH = CHECK_RESUME_AGAINST_JD_PATH;

/** Linking to `/resume-score-checker` from keyword/ATS cluster pages. */
export const CHECK_YOUR_RESUME_SCORE_ANCHOR = "check your resume score" as const;

// All SEO pages (excluding home) for internal linking. Order: articles, resume examples, ats keyword pages.
const ARTICLE_LINKS: InternalLink[] = [
  {
    path: CHECK_RESUME_AGAINST_JD_PATH,
    label: RESUME_VS_JOB_DESCRIPTION_CHECKER_ANCHOR,
  },
  { path: RESUME_KEYWORD_SCANNER_PATH, label: "resume keyword scanner" },
  { path: "/ats-resume-checker", label: "ATS resume checker" },
  {
    path: ATS_RESUME_TEMPLATE_GUIDE_PATH,
    label: "ATS resume template",
  },
  {
    path: RESUME_WORK_EXPERIENCE_GUIDE_PATH,
    label: "Resume work experience examples & format",
  },
  {
    path: RESUME_SKILLS_GUIDE_PATH,
    label: "Resume skills examples & format",
  },
  {
    path: "/customize-resume-without-lying",
    label: "Customize resume without lying",
  },
  { path: "/resume-examples", label: "Resume examples by role" },
  { path: "/resume-keywords", label: "Resume keywords by role" },
  {
    path: roleResumePillarPath("data-analyst"),
    label: "Data analyst resume bullet examples",
  },
  {
    path: roleResumePillarPath("business-analyst"),
    label: "Business analyst resume bullet examples",
  },
  {
    path: roleResumePillarPath("data-scientist"),
    label: "Data scientist resume bullet examples",
  },
  {
    path: roleResumePillarPath("software-engineer"),
    label: "Software engineer resume bullet examples",
  },
  {
    path: roleResumePillarPath("product-manager"),
    label: "Product manager resume bullet examples",
  },
  {
    path: CHECK_RESUME_AGAINST_JD_PATH,
    label: "Compare resume to job description",
  },
];

/** One pillar URL per role (example + bullets; keyword lists live on *-resume-keywords). */
const ROLE_PILLAR_LINKS: InternalLink[] = (Object.keys(KEYWORD_PAGES) as RoleSlug[]).map((role) => {
  const page = RESUME_PAGES[`${role}-resume-example` as keyof typeof RESUME_PAGES];
  return { path: roleResumePillarPath(role), label: page.h1 };
});

const ROLE_KEYWORD_HUB_LINKS: InternalLink[] = (Object.keys(KEYWORD_PAGES) as RoleSlug[]).map((role) => ({
  path: roleResumeKeywordsPath(role),
  label: `${KEYWORD_PAGES[role].roleName} resume keywords`,
}));

const ALT_ROLE_KEYWORD_HUB_LINKS: InternalLink[] = getIndexedAltRoleKeywordSlugs().map((slug) => {
  const page = ALT_ROLE_KEYWORD_PAGES[slug];
  return { path: page.path, label: `${page.roleName} resume keywords` };
});

const PILOT_KEYWORD_HUB_LINKS: InternalLink[] = PILOT_KEYWORD_SLUGS.map((slug) => {
  const page = PILOT_KEYWORD_PAGES[slug];
  return { path: page.path, label: `${page.roleName} resume keywords` };
});

export const ALL_SEO_LINKS: InternalLink[] = [
  ...ARTICLE_LINKS,
  ...ROLE_KEYWORD_HUB_LINKS,
  ...ALT_ROLE_KEYWORD_HUB_LINKS,
  ...PILOT_KEYWORD_HUB_LINKS,
  ...ROLE_PILLAR_LINKS,
  ...roleClusterInternalLinks(),
];

// Paths that are already heavily linked in "Popular Resume Examples" (first 6) and "ATS Keyword Guides" (first 6).
const POPULAR_PILLAR_PATHS = new Set(ROLE_PILLAR_LINKS.slice(0, 6).map((l) => l.path));
const FEATURED_PATHS = new Set<string>([
  CHECK_RESUME_AGAINST_JD_PATH,
  RESUME_KEYWORD_SCANNER_PATH,
  "/ats-resume-checker",
  ...Array.from(POPULAR_PILLAR_PATHS),
]);

/** Dense semantic internal links: 6-8 topically related paths per page for topical authority. */
const SEMANTIC_RECOMMENDATIONS: Record<string, string[]> = {
  [CHECK_RESUME_AGAINST_JD_PATH]: [
    RESUME_KEYWORD_SCANNER_PATH,
    "/ats-resume-checker",
    "/resume-examples",
    "/resume-keywords",
    "/customize-resume-without-lying",
    ATS_RESUME_TEMPLATE_GUIDE_PATH,
    "/problems/ats-rejecting-my-resume",
    "/data-analyst-resume-guide",
    "/data-analyst-resume-keywords",
  ],
  [RESUME_KEYWORD_SCANNER_PATH]: [
    CHECK_RESUME_AGAINST_JD_PATH,
    "/ats-resume-checker",
    "/resume-keywords",
    "/data-analyst-resume-keywords",
    "/software-engineer-resume-keywords",
    "/product-manager-resume-keywords",
    "/data-scientist-resume-keywords",
    "/business-analyst-resume-keywords",
  ],
  [ATS_RESUME_TEMPLATE_GUIDE_PATH]: [
    CHECK_RESUME_AGAINST_JD_PATH,
    "/customize-resume-without-lying",
    "/resume-examples",
    RESUME_WORK_EXPERIENCE_GUIDE_PATH,
    roleResumePillarPath("software-engineer"),
    roleResumePillarPath("data-scientist"),
  ],
  [RESUME_WORK_EXPERIENCE_GUIDE_PATH]: [
    CHECK_RESUME_AGAINST_JD_PATH,
    ATS_RESUME_TEMPLATE_GUIDE_PATH,
    RESUME_SKILLS_GUIDE_PATH,
    "/resume-examples",
    roleResumePillarPath("data-analyst"),
    roleResumePillarPath("product-manager"),
    "/customize-resume-without-lying",
    "/ats-resume-checker",
  ],
  "/customize-resume-without-lying": [
    CHECK_RESUME_AGAINST_JD_PATH,
    "/ats-resume-checker",
    ATS_RESUME_TEMPLATE_GUIDE_PATH,
    roleResumePillarPath("software-engineer"),
    roleResumePillarPath("data-scientist"),
  ],
  "/data-analyst-resume-keywords": [
    CHECK_RESUME_AGAINST_JD_PATH,
    "/ats-resume-checker",
    "/power-bi-resume-keywords",
    "/data-analyst-resume-guide",
    roleResumePillarPath("data-analyst"),
  ],
  "/data-engineer-resume-keywords": [
    CHECK_RESUME_AGAINST_JD_PATH,
    "/ats-resume-checker",
    "/sql-developer-resume-keywords",
    "/data-engineer-resume-guide",
    "/data-engineer-resume-guide",
  ],
  "/resume-keywords": [
    CHECK_RESUME_AGAINST_JD_PATH,
    "/ats-resume-checker",
    "/resume-examples",
    "/data-analyst-resume-keywords",
    "/data-engineer-resume-keywords",
  ],
  "/resume-examples": [
    CHECK_RESUME_AGAINST_JD_PATH,
    "/ats-resume-checker",
    "/resume-keywords",
    ATS_RESUME_TEMPLATE_GUIDE_PATH,
    "/data-analyst-resume-guide",
    "/software-engineer-resume-guide",
  ],
  "/data-engineer-resume-guide": [
    CHECK_RESUME_AGAINST_JD_PATH,
    "/ats-resume-checker",
    "/data-engineer-resume-guide",
    "/data-engineer-resume-keywords",
    "/sql-developer-resume-keywords",
  ],
  "/sql-developer-resume-keywords": [
    CHECK_RESUME_AGAINST_JD_PATH,
    "/data-analyst-resume-keywords",
    "/data-engineer-resume-keywords",
    roleResumePillarPath("data-analyst"),
    ATS_RESUME_TEMPLATE_GUIDE_PATH,
    "/ats-resume-checker",
    "/resume-examples",
    "/business-intelligence-resume-keywords",
  ],
  "/power-bi-resume-keywords": [
    CHECK_RESUME_AGAINST_JD_PATH,
    "/business-intelligence-resume-keywords",
    "/data-analyst-resume-keywords",
    "/sql-developer-resume-keywords",
    roleResumePillarPath("data-analyst"),
    ATS_RESUME_TEMPLATE_GUIDE_PATH,
    "/ats-resume-checker",
    "/resume-examples",
  ],
  "/data-scientist-resume-keywords": [
    CHECK_RESUME_AGAINST_JD_PATH,
    "/ats-resume-checker",
    roleResumeKeywordsPath("machine-learning-engineer"),
    roleResumePillarPath("data-scientist"),
  ],
  "/business-analyst-resume-keywords": [
    CHECK_RESUME_AGAINST_JD_PATH,
    "/systems-analyst-resume-keywords",
    "/business-intelligence-resume-keywords",
    roleResumePillarPath("business-analyst"),
    ATS_RESUME_TEMPLATE_GUIDE_PATH,
    "/resume-examples",
  ],
  "/data-scientist-resume-guide": [
    CHECK_RESUME_AGAINST_JD_PATH,
    "/ats-resume-checker",
    roleResumeKeywordsPath("data-scientist"),
    roleResumeKeywordsPath("machine-learning-engineer"),
  ],
  "/resume-score-checker": [
    CHECK_RESUME_AGAINST_JD_PATH,
    "/ats-resume-checker",
    "/ats-compatibility-check",
    ATS_RESUME_TEMPLATE_GUIDE_PATH,
    roleResumePillarPath("data-scientist"),
    "/customize-resume-without-lying",
  ],
  "/ats-resume-checker": [
    CHECK_RESUME_AGAINST_JD_PATH,
    RESUME_KEYWORD_SCANNER_PATH,
    "/resume-examples",
    "/resume-keywords",
    ATS_RESUME_TEMPLATE_GUIDE_PATH,
    RESUME_WORK_EXPERIENCE_GUIDE_PATH,
    RESUME_SKILLS_GUIDE_PATH,
  ],
  "/ats-compatibility-check": [
    CHECK_RESUME_AGAINST_JD_PATH,
    "/ats-resume-checker",
    "/resume-score-checker",
    ATS_RESUME_TEMPLATE_GUIDE_PATH,
    roleResumePillarPath("data-analyst"),
    "/customize-resume-without-lying",
  ],
};

const PATH_BY_PATH = (() => {
  const m: Record<string, InternalLink> = {};
  for (const l of ALL_SEO_LINKS) {
    const p = l.path.replace(/\/$/, "") || "/";
    m[p] = l;
  }
  return m;
})();

/** Build semantic path recommendations for a given page (topic cluster). */
function getSemanticPathsFor(currentPath: string): string[] {
  const normalized = currentPath.replace(/\/$/, "") || "/";

  if (resolveRoleClusterKeyFromPath(normalized)) {
    return getRoleClusterNavLinks(normalized).map((l) => l.path);
  }

  const explicit = SEMANTIC_RECOMMENDATIONS[normalized];
  if (explicit) return explicit;

  const pillarMatch = normalized.match(/^\/([a-z0-9-]+)-resume-guide$/);
  if (pillarMatch) {
    const role = pillarMatch[1] as RoleSlug;
    return getRoleClusterNavLinks(roleResumePillarPath(role)).map((l) => l.path);
  }

  const altSlug = isAltRoleKeywordPath(normalized);
  if (altSlug) {
    const page = ALT_ROLE_KEYWORD_PAGES[altSlug];
    return [
      CHECK_RESUME_AGAINST_JD_PATH,
      ...page.relatedKeywordPages.map((l) => l.path),
      ...page.relatedGuidePages.map((l) => l.path),
      "/ats-resume-checker",
      ATS_RESUME_TEMPLATE_GUIDE_PATH,
      "/resume-examples",
      "/customize-resume-without-lying",
    ].filter((p) => PATH_BY_PATH[p] != null);
  }

  const pilotSlug = isPilotKeywordPath(normalized);
  if (pilotSlug) {
    const page = PILOT_KEYWORD_PAGES[pilotSlug];
    return [
      CHECK_RESUME_AGAINST_JD_PATH,
      ...page.relatedKeywordPages.map((l) => l.path),
      ...page.relatedGuidePages.map((l) => l.path),
      "/ats-resume-checker",
      ATS_RESUME_TEMPLATE_GUIDE_PATH,
      "/resume-examples",
      "/customize-resume-without-lying",
    ].filter((p) => PATH_BY_PATH[p] != null);
  }

  const keywordHubMatch = normalized.match(/^\/([a-z0-9-]+)-resume-keywords$/);
  if (keywordHubMatch && KEYWORD_PAGES[keywordHubMatch[1] as RoleSlug]) {
    const role = keywordHubMatch[1] as RoleSlug;
    return getRoleClusterNavLinks(roleResumeKeywordsPath(role)).map((l) => l.path);
  }

  const roleOnlyHub = normalized.match(/^\/([a-z0-9-]+)$/);
  if (
    roleOnlyHub &&
    Object.prototype.hasOwnProperty.call(KEYWORD_PAGES, roleOnlyHub[1])
  ) {
    const role = roleOnlyHub[1] as RoleSlug;
    return [
      CHECK_RESUME_AGAINST_JD_PATH,
      roleResumePillarPath(role),
      "/customize-resume-without-lying",
      ATS_RESUME_TEMPLATE_GUIDE_PATH,
      "/resume-examples",
    ].filter((p) => PATH_BY_PATH[p] != null);
  }

  return [];
}

/** Simple deterministic hash for a string (djb2). */
function hashString(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h) ^ s.charCodeAt(i);
  return h >>> 0;
}

const DEFAULT_RELATED_COUNT = 8;

const TOOL_CLUSTER_PATHS = new Set<string>([
  CHECK_RESUME_AGAINST_JD_PATH,
  RESUME_KEYWORD_SCANNER_PATH,
  ATS_RESUME_CHECKER_PATH,
  "/resume-score-checker",
  "/ats-compatibility-check",
]);

export type RelatedLinkScope = "all" | "toolsAndKeywords";

function normalizeInternalPath(path: string): string {
  return path.replace(/\/$/, "") || "/";
}

function isKeywordPagePath(path: string): boolean {
  const n = normalizeInternalPath(path);
  if (n === "/resume-keywords") return true;
  if (n.endsWith("-resume-keywords")) return true;
  return isAltRoleKeywordPath(n) != null || isPilotKeywordPath(n) != null;
}

function isToolPagePath(path: string): boolean {
  return TOOL_CLUSTER_PATHS.has(normalizeInternalPath(path));
}

function isToolsAndKeywordsPath(path: string): boolean {
  return isToolPagePath(path) || isKeywordPagePath(path);
}

function filterToolsAndKeywordsLinks(links: InternalLink[], currentPath: string): InternalLink[] {
  const normalized = normalizeInternalPath(currentPath);
  const seen = new Set<string>();
  const out: InternalLink[] = [];
  for (const link of links) {
    const p = normalizeInternalPath(link.path);
    if (p === normalized || seen.has(p) || !isToolsAndKeywordsPath(p)) continue;
    seen.add(p);
    out.push(link);
  }
  return out;
}

const TOOL_AND_KEYWORD_FILL_LINKS: InternalLink[] = [
  { path: CHECK_RESUME_AGAINST_JD_PATH, label: "Compare resume to job description" },
  { path: RESUME_KEYWORD_SCANNER_PATH, label: "Resume keyword scanner" },
  { path: ATS_RESUME_CHECKER_PATH, label: "ATS resume checker" },
  { path: "/resume-keywords", label: "Resume keywords by role" },
  ...ROLE_KEYWORD_HUB_LINKS,
  ...ALT_ROLE_KEYWORD_HUB_LINKS,
  ...PILOT_KEYWORD_HUB_LINKS,
];

/**
 * Returns 5-8 related internal links for the given page path (dense semantic linking for topical authority).
 * Uses topic-based recommendations when available, then fills with rotated links. Excludes current page.
 */
export function getRelatedResumeGuides(
  currentPath: string,
  count: number = DEFAULT_RELATED_COUNT,
  scope: RelatedLinkScope = "all"
): InternalLink[] {
  const normalized = normalizeInternalPath(currentPath);

  if (scope === "toolsAndKeywords" && resolveRoleClusterKeyFromPath(normalized)) {
    return filterToolsAndKeywordsLinks(getRoleClusterNavLinks(normalized), normalized).slice(0, count);
  }

  if (resolveRoleClusterKeyFromPath(normalized)) {
    return getRoleClusterNavLinks(normalized).slice(0, count);
  }

  const semanticPaths = getSemanticPathsFor(currentPath).filter((p) => p !== normalized);
  const seen = new Set<string>();
  const out: InternalLink[] = [];

  for (let i = 0; i < semanticPaths.length && out.length < count; i++) {
    const p = semanticPaths[i];
    const link = PATH_BY_PATH[p];
    if (link && !seen.has(p)) {
      if (scope === "toolsAndKeywords" && !isToolsAndKeywordsPath(p)) continue;
      seen.add(p);
      out.push(link);
    }
  }

  if (out.length >= count) return out;

  const pool =
    scope === "toolsAndKeywords"
      ? TOOL_AND_KEYWORD_FILL_LINKS
      : ALL_SEO_LINKS;

  const others = pool.filter((l) => {
    const p = normalizeInternalPath(l.path);
    return p !== normalized && !seen.has(p);
  });

  const sorted = others.slice().sort((a, b) => {
    const aFeatured = FEATURED_PATHS.has(a.path) ? 1 : 0;
    const bFeatured = FEATURED_PATHS.has(b.path) ? 1 : 0;
    return aFeatured - bFeatured;
  });

  const need = count - out.length;
  if (sorted.length <= need) {
    for (const l of sorted) out.push(l);
    return out;
  }

  const seed = hashString(normalized);
  const start = seed % (sorted.length - need + 1);
  for (let i = start; i < start + need && i < sorted.length; i++) out.push(sorted[i]);
  return out;
}
