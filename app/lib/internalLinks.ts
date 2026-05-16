import { KEYWORD_PAGES, RESUME_PAGES, type RoleSlug } from "@/app/lib/seoPages";
import { roleResumePillarPath } from "@/app/lib/searchIntentSeo";

export type InternalLink = { path: string; label: string };

/** Primary free tool landing: JD comparison (single canonical URL for all resume-JD intents). */
export const CHECK_RESUME_AGAINST_JD_PATH =
  "/check-resume-against-job-description" as const;

/** Canonical ATS guide: template/format/examples (legacy `/how-to-pass-ats` redirects here). */
export const ATS_RESUME_TEMPLATE_GUIDE_PATH =
  "/ats-resume-template" as const;

/** Work experience section: format, samples, and query-aligned examples (single canonical hub). */
export const RESUME_WORK_EXPERIENCE_GUIDE_PATH =
  "/resume-guides/resume-work-experience-examples" as const;

/** Skills section guide: examples, ATS-safe formatting, and keyword alignment. */
export const RESUME_SKILLS_GUIDE_PATH =
  "/resume-guides/resume-skills-examples" as const;

/** Same tool with in-page form anchor (use for CTAs that should scroll to the checker). */
export const CHECK_RESUME_AGAINST_JD_FORM_HREF =
  `${CHECK_RESUME_AGAINST_JD_PATH}#ats-checker-form` as const;

/** Primary JD-tool CTA: keyword-rich anchor for buttons and links to the matcher. */
export const CHECK_RESUME_AGAINST_JD_PRIMARY_CTA =
  "Check resume against job description (free tool)" as const;

/** Anchor for links from ATS compliance page → JD matcher (distinct intent). */
export const COMPARE_RESUME_WITH_JD_ANCHOR = "compare resume with job description" as const;

/** Alternate anchor when linking to `/ats-resume-checker-free` (same URL as “ATS resume checker”). */
export const CHECK_ATS_COMPATIBILITY_ANCHOR = "check ATS compatibility" as const;

/** High-volume variant when linking to `/check-resume-against-job-description`. */
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
    path: "/problems/resume-vs-job-description",
    label: "Resume vs job description mismatch",
  },
];

/** One pillar URL per role (keywords + example + bullets consolidated). */
const ROLE_PILLAR_LINKS: InternalLink[] = (Object.keys(KEYWORD_PAGES) as RoleSlug[]).map((role) => {
  const page = RESUME_PAGES[`${role}-resume-example` as keyof typeof RESUME_PAGES];
  return { path: roleResumePillarPath(role), label: page.h1 };
});

export const ALL_SEO_LINKS: InternalLink[] = [...ARTICLE_LINKS, ...ROLE_PILLAR_LINKS];

// Paths that are already heavily linked in "Popular Resume Examples" (first 6) and "ATS Keyword Guides" (first 6).
const POPULAR_PILLAR_PATHS = new Set(ROLE_PILLAR_LINKS.slice(0, 6).map((l) => l.path));
const FEATURED_PATHS = new Set<string>([
  CHECK_RESUME_AGAINST_JD_PATH,
  "/ats-resume-checker",
  ...Array.from(POPULAR_PILLAR_PATHS),
]);

/** Dense semantic internal links: 6-8 topically related paths per page for topical authority. */
const SEMANTIC_RECOMMENDATIONS: Record<string, string[]> = {
  [CHECK_RESUME_AGAINST_JD_PATH]: [
    "/ats-resume-checker",
    "/customize-resume-without-lying",
    ATS_RESUME_TEMPLATE_GUIDE_PATH,
    RESUME_WORK_EXPERIENCE_GUIDE_PATH,
    RESUME_SKILLS_GUIDE_PATH,
    "/problems/resume-vs-job-description",
    roleResumePillarPath("software-engineer"),
    roleResumePillarPath("data-scientist"),
    roleResumePillarPath("product-manager"),
  ],
  [ATS_RESUME_TEMPLATE_GUIDE_PATH]: [
    CHECK_RESUME_AGAINST_JD_PATH,
    "/customize-resume-without-lying",
    "/resume-examples",
    RESUME_WORK_EXPERIENCE_GUIDE_PATH,
    roleResumePillarPath("software-engineer"),
    roleResumePillarPath("data-scientist"),
    "/check-resume-against-job-description",
  ],
  [RESUME_WORK_EXPERIENCE_GUIDE_PATH]: [
    CHECK_RESUME_AGAINST_JD_PATH,
    ATS_RESUME_TEMPLATE_GUIDE_PATH,
    RESUME_SKILLS_GUIDE_PATH,
    "/resume-examples",
    roleResumePillarPath("data-analyst"),
    roleResumePillarPath("product-manager"),
    "/customize-resume-without-lying",
    "/check-resume-against-job-description",
    "/ats-resume-checker",
  ],
  "/customize-resume-without-lying": [
    CHECK_RESUME_AGAINST_JD_PATH,
    "/ats-resume-checker",
    "/check-resume-against-job-description",
    ATS_RESUME_TEMPLATE_GUIDE_PATH,
    roleResumePillarPath("software-engineer"),
    roleResumePillarPath("data-scientist"),
  ],
  "/data-scientist-resume-guide": [
    CHECK_RESUME_AGAINST_JD_PATH,
    roleResumePillarPath("machine-learning-engineer"),
    "/customize-resume-without-lying",
    ATS_RESUME_TEMPLATE_GUIDE_PATH,
    "/resume-examples",
    "/check-resume-against-job-description",
    roleResumePillarPath("software-engineer"),
    roleResumePillarPath("product-manager"),
  ],
  "/resume-score-checker": [
    CHECK_RESUME_AGAINST_JD_PATH,
    "/ats-resume-checker",
    "/check-resume-against-job-description",
    "/ats-compatibility-check",
    ATS_RESUME_TEMPLATE_GUIDE_PATH,
    roleResumePillarPath("data-scientist"),
    "/customize-resume-without-lying",
  ],
  "/ats-resume-checker": [
    CHECK_RESUME_AGAINST_JD_PATH,
    "/check-resume-against-job-description",
    ATS_RESUME_TEMPLATE_GUIDE_PATH,
    RESUME_WORK_EXPERIENCE_GUIDE_PATH,
    RESUME_SKILLS_GUIDE_PATH,
    "/problems/resume-vs-job-description",
    roleResumePillarPath("software-engineer"),
    roleResumePillarPath("product-manager"),
    roleResumePillarPath("data-scientist"),
    roleResumePillarPath("business-analyst"),
  ],
  "/problems/resume-vs-job-description": [
    CHECK_RESUME_AGAINST_JD_PATH,
    "/check-resume-against-job-description",
    "/ats-resume-checker",
    ATS_RESUME_TEMPLATE_GUIDE_PATH,
    RESUME_SKILLS_GUIDE_PATH,
    roleResumePillarPath("software-engineer"),
    roleResumePillarPath("product-manager"),
    roleResumePillarPath("data-scientist"),
    roleResumePillarPath("business-analyst"),
  ],
  "/ats-compatibility-check": [
    CHECK_RESUME_AGAINST_JD_PATH,
    "/ats-resume-checker",
    "/resume-score-checker",
    "/check-resume-against-job-description",
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

/** Build 6-8 semantic path recommendations for a given page (topic cluster). */
function getSemanticPathsFor(currentPath: string): string[] {
  const normalized = currentPath.replace(/\/$/, "") || "/";
  const explicit = SEMANTIC_RECOMMENDATIONS[normalized];
  if (explicit) return explicit;

  const pillarMatch = normalized.match(/^\/([a-z0-9-]+)-resume-guide$/);
  if (pillarMatch) {
    const role = pillarMatch[1] as RoleSlug;
    return [
      CHECK_RESUME_AGAINST_JD_PATH,
      roleResumePillarPath(role),
      "/customize-resume-without-lying",
      ATS_RESUME_TEMPLATE_GUIDE_PATH,
      "/resume-examples",
      "/check-resume-against-job-description",
    ].filter((p) => PATH_BY_PATH[p] != null);
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
      "/check-resume-against-job-description",
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

/**
 * Returns 5-8 related internal links for the given page path (dense semantic linking for topical authority).
 * Uses topic-based recommendations when available, then fills with rotated links. Excludes current page.
 */
export function getRelatedResumeGuides(
  currentPath: string,
  count: number = DEFAULT_RELATED_COUNT
): InternalLink[] {
  const normalized = currentPath.replace(/\/$/, "") || "/";
  const semanticPaths = getSemanticPathsFor(currentPath).filter((p) => p !== normalized);
  const seen = new Set<string>();
  const out: InternalLink[] = [];

  for (let i = 0; i < semanticPaths.length && out.length < count; i++) {
    const p = semanticPaths[i];
    const link = PATH_BY_PATH[p];
    if (link && !seen.has(p)) {
      seen.add(p);
      out.push(link);
    }
  }

  if (out.length >= count) return out;

  const others = ALL_SEO_LINKS.filter((l) => {
    const p = l.path.replace(/\/$/, "") || "/";
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
