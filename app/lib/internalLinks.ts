import { KEYWORD_PAGES, RESUME_PAGES, type RoleSlug } from "@/app/lib/seoPages";

export type InternalLink = { path: string; label: string };

/** Primary free tool landing: JD comparison (single canonical URL for all resume–JD intents). */
export const CHECK_RESUME_AGAINST_JD_PATH =
  "/check-resume-against-job-description" as const;

/** Canonical ATS guide: template/format/examples (legacy `/how-to-pass-ats` redirects here). */
export const ATS_RESUME_TEMPLATE_GUIDE_PATH =
  "/resume-guides/ats-resume-template" as const;

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
  { path: "/resume-keyword-scanner", label: "Resume keyword scanner" },
  { path: "/ats-resume-checker", label: "ATS resume checker" },
  {
    path: ATS_RESUME_TEMPLATE_GUIDE_PATH,
    label: "ATS resume template & format guide",
  },
  {
    path: "/customize-resume-without-lying",
    label: "Customize resume without lying",
  },
  { path: "/resume-examples", label: "Resume examples by role" },
  {
    path: "/data-scientist-resume-bullet-points",
    label: "Data scientist resume bullet examples",
  },
  {
    path: "/software-engineer-resume-bullet-points",
    label: "Software engineer resume bullet examples",
  },
  {
    path: "/product-manager-resume-bullet-points",
    label: "Product manager resume bullet examples",
  },
];

const RESUME_EXAMPLE_LINKS: InternalLink[] = (Object.keys(KEYWORD_PAGES) as RoleSlug[]).map(
  (role) => {
    const page = RESUME_PAGES[`${role}-resume-example` as keyof typeof RESUME_PAGES];
    return { path: `/${role}-resume-guide`, label: page.h1 };
  }
);

const ATS_KEYWORD_LINKS: InternalLink[] = Object.entries(KEYWORD_PAGES).map(([slug, page]) => ({
  path: `/${slug}-resume-keywords`,
  label: page.h1,
}));

export const ALL_SEO_LINKS: InternalLink[] = [
  ...ARTICLE_LINKS,
  ...RESUME_EXAMPLE_LINKS,
  ...ATS_KEYWORD_LINKS,
];

// Paths that are already heavily linked in "Popular Resume Examples" (first 6) and "ATS Keyword Guides" (first 6).
const POPULAR_EXAMPLES_PATHS = new Set(
  RESUME_EXAMPLE_LINKS.slice(0, 6).map((l) => l.path)
);
const ATS_GUIDES_PATHS = new Set(ATS_KEYWORD_LINKS.slice(0, 6).map((l) => l.path));
const FEATURED_PATHS = new Set<string>([
  CHECK_RESUME_AGAINST_JD_PATH,
  "/resume-keyword-scanner",
  "/ats-resume-checker",
  ...Array.from(POPULAR_EXAMPLES_PATHS),
  ...Array.from(ATS_GUIDES_PATHS),
]);

/** Dense semantic internal links: 6–8 topically related paths per page for topical authority. */
const SEMANTIC_RECOMMENDATIONS: Record<string, string[]> = {
  [CHECK_RESUME_AGAINST_JD_PATH]: [
    "/ats-resume-checker",
    "/resume-keyword-scanner",
    "/customize-resume-without-lying",
    ATS_RESUME_TEMPLATE_GUIDE_PATH,
    ATS_RESUME_TEMPLATE_GUIDE_PATH,
    "/data-scientist-resume-keywords",
    "/software-engineer-resume-keywords",
    "/data-scientist-resume-guide",
    "/software-engineer-resume-guide",
  ],
  [ATS_RESUME_TEMPLATE_GUIDE_PATH]: [
    CHECK_RESUME_AGAINST_JD_PATH,
    "/customize-resume-without-lying",
    "/resume-examples",
    "/software-engineer-resume-keywords",
    "/software-engineer-resume-guide",
    "/data-scientist-resume-guide",
    "/resume-keyword-scanner",
  ],
  "/customize-resume-without-lying": [
    CHECK_RESUME_AGAINST_JD_PATH,
    "/ats-resume-checker",
    "/resume-keyword-scanner",
    ATS_RESUME_TEMPLATE_GUIDE_PATH,
    ATS_RESUME_TEMPLATE_GUIDE_PATH,
    "/software-engineer-resume-keywords",
    "/data-scientist-resume-keywords",
  ],
  "/data-scientist-resume-keywords": [
    CHECK_RESUME_AGAINST_JD_PATH,
    "/data-scientist-resume-bullet-points",
    "/data-scientist-resume-guide",
    "/customize-resume-without-lying",
    ATS_RESUME_TEMPLATE_GUIDE_PATH,
    ATS_RESUME_TEMPLATE_GUIDE_PATH,
    "/machine-learning-engineer-resume-keywords",
    "/resume-examples",
  ],
  "/ats-resume-checker-free": [
    CHECK_RESUME_AGAINST_JD_PATH,
    "/resume-score-checker",
    "/resume-keyword-scanner",
    "/ats-compatibility-check",
    ATS_RESUME_TEMPLATE_GUIDE_PATH,
    ATS_RESUME_TEMPLATE_GUIDE_PATH,
    "/customize-resume-without-lying",
    "/software-engineer-resume-keywords",
  ],
  "/resume-score-checker": [
    CHECK_RESUME_AGAINST_JD_PATH,
    "/ats-resume-checker-free",
    "/resume-keyword-scanner",
    "/ats-compatibility-check",
    ATS_RESUME_TEMPLATE_GUIDE_PATH,
    ATS_RESUME_TEMPLATE_GUIDE_PATH,
    "/data-scientist-resume-keywords",
    "/customize-resume-without-lying",
  ],
  "/resume-keyword-scanner": [
    CHECK_RESUME_AGAINST_JD_PATH,
    "/ats-resume-checker",
    ATS_RESUME_TEMPLATE_GUIDE_PATH,
    ATS_RESUME_TEMPLATE_GUIDE_PATH,
    "/software-engineer-resume-keywords",
    "/software-engineer-resume-guide",
  ],
  "/ats-compatibility-check": [
    CHECK_RESUME_AGAINST_JD_PATH,
    "/ats-resume-checker-free",
    "/resume-score-checker",
    "/resume-keyword-scanner",
    ATS_RESUME_TEMPLATE_GUIDE_PATH,
    ATS_RESUME_TEMPLATE_GUIDE_PATH,
    "/data-analyst-resume-keywords",
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

/** Build 6–8 semantic path recommendations for a given page (topic cluster). */
function getSemanticPathsFor(currentPath: string): string[] {
  const normalized = currentPath.replace(/\/$/, "") || "/";
  const explicit = SEMANTIC_RECOMMENDATIONS[normalized];
  if (explicit) return explicit;

  const atsKeywordMatch = normalized.match(/^\/([a-z0-9-]+)-resume-keywords$/);
  if (atsKeywordMatch) {
    const role = atsKeywordMatch[1];
    const mergedGuidePath = `/${role}-resume-guide`;
    return [
      CHECK_RESUME_AGAINST_JD_PATH,
      mergedGuidePath,
      "/customize-resume-without-lying",
      ATS_RESUME_TEMPLATE_GUIDE_PATH,
      ATS_RESUME_TEMPLATE_GUIDE_PATH,
      "/resume-examples",
      ATS_RESUME_TEMPLATE_GUIDE_PATH,
      "/customize-resume-without-lying",
      "/resume-keyword-scanner",
    ].filter((p) => PATH_BY_PATH[p] != null);
  }

  const roleOnlyHub = normalized.match(/^\/([a-z0-9-]+)$/);
  if (
    roleOnlyHub &&
    Object.prototype.hasOwnProperty.call(KEYWORD_PAGES, roleOnlyHub[1])
  ) {
    const role = roleOnlyHub[1];
    const atsKeywordPath = `/${role}-resume-keywords`;
    return [
      CHECK_RESUME_AGAINST_JD_PATH,
      atsKeywordPath,
      "/customize-resume-without-lying",
      ATS_RESUME_TEMPLATE_GUIDE_PATH,
      "/resume-examples",
      ATS_RESUME_TEMPLATE_GUIDE_PATH,
      ATS_RESUME_TEMPLATE_GUIDE_PATH,
      "/resume-keyword-scanner",
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
 * Returns 5–8 related internal links for the given page path (dense semantic linking for topical authority).
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
