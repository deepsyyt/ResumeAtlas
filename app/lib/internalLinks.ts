import { RESUME_PAGES } from "@/app/lib/seoPages";
import { KEYWORD_PAGES } from "@/app/lib/seoPages";
import { RESUME_GUIDE_PAGES } from "@/app/lib/resumeGuidePages";

export type InternalLink = { path: string; label: string };

/** Primary free tool landing: resume vs job description matcher (preferred internal-link anchor sitewide). */
export const CHECK_RESUME_AGAINST_JD_PATH =
  "/check-resume-against-job-description" as const;

/** Exact anchor text for internal links to the primary tool URL (ranking signal). */
export const CHECK_RESUME_AGAINST_JD_ANCHOR = "check resume against job description" as const;

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

/** Linking to `/resume-score-checker` from keyword/ATS cluster pages. */
export const CHECK_YOUR_RESUME_SCORE_ANCHOR = "check your resume score" as const;

// All SEO pages (excluding home) for internal linking. Order: articles, resume examples, ats keyword pages, resume guides.
const ARTICLE_LINKS: InternalLink[] = [
  {
    path: CHECK_RESUME_AGAINST_JD_PATH,
    label: CHECK_RESUME_AGAINST_JD_ANCHOR,
  },
  { path: "/ats-resume-checker-free", label: "ATS resume checker" },
  { path: "/resume-score-checker", label: "Resume score checker" },
  { path: "/resume-keyword-scanner", label: "Resume keyword scanner" },
  { path: "/ats-compatibility-check", label: "ATS compatibility check" },
  { path: "/how-ats-scans-resumes", label: "How ATS Systems Scan Resumes" },
  { path: "/how-to-pass-ats", label: "How to Pass ATS Screening" },
  { path: "/common-resume-mistakes-fail-ats", label: "Common Resume Mistakes That Fail ATS" },
];

const RESUME_EXAMPLE_LINKS: InternalLink[] = Object.entries(RESUME_PAGES).map(([slug, page]) => ({
  path: `/${slug}`,
  label: page.h1,
}));

const ATS_KEYWORD_LINKS: InternalLink[] = Object.entries(KEYWORD_PAGES).map(([slug, page]) => ({
  path: `/${slug}/keywords`,
  label: page.h1,
}));

const RESUME_GUIDE_LINKS: InternalLink[] = [
  { path: "/resume-guides/resume-format-guide", label: "Resume Format Guide" },
  ...Object.entries(RESUME_GUIDE_PAGES).map(([slug, config]) => ({
    path: `/resume-guides/${slug}`,
    label: config.h1,
  })),
];

export const ALL_SEO_LINKS: InternalLink[] = [
  ...ARTICLE_LINKS,
  ...RESUME_EXAMPLE_LINKS,
  ...ATS_KEYWORD_LINKS,
  ...RESUME_GUIDE_LINKS,
];

// Paths that are already heavily linked in "Popular Resume Examples" (first 6) and "ATS Keyword Guides" (first 6).
const POPULAR_EXAMPLES_PATHS = new Set(
  RESUME_EXAMPLE_LINKS.slice(0, 6).map((l) => l.path)
);
const ATS_GUIDES_PATHS = new Set(ATS_KEYWORD_LINKS.slice(0, 6).map((l) => l.path));
const FEATURED_PATHS = new Set<string>([
  CHECK_RESUME_AGAINST_JD_PATH,
  "/ats-resume-checker-free",
  "/resume-score-checker",
  "/resume-keyword-scanner",
  "/ats-compatibility-check",
  ...Array.from(POPULAR_EXAMPLES_PATHS),
  ...Array.from(ATS_GUIDES_PATHS),
]);

/** Dense semantic internal links: 6–8 topically related paths per page for topical authority. */
const SEMANTIC_RECOMMENDATIONS: Record<string, string[]> = {
  [CHECK_RESUME_AGAINST_JD_PATH]: [
    "/ats-resume-checker-free",
    "/resume-score-checker",
    "/resume-keyword-scanner",
    "/ats-compatibility-check",
    "/how-to-pass-ats",
    "/how-ats-scans-resumes",
    "/common-resume-mistakes-fail-ats",
    "/resume-guides/resume-format-guide",
    "/data-scientist/keywords",
    "/software-engineer/keywords",
    "/data-scientist-resume-example",
    "/software-engineer-resume-example",
  ],
  "/how-ats-scans-resumes": [
    CHECK_RESUME_AGAINST_JD_PATH,
    "/data-scientist/keywords",
    "/resume-guides/resume-format-guide",
    "/resume-guides/resume-skills-examples",
    "/common-resume-mistakes-fail-ats",
    "/how-to-pass-ats",
    "/resume-guides/ats-friendly-resume-example",
    "/resume-guides/ats-resume-template",
    "/data-scientist-resume-example",
  ],
  "/how-to-pass-ats": [
    CHECK_RESUME_AGAINST_JD_PATH,
    "/how-ats-scans-resumes",
    "/resume-guides/resume-format-guide",
    "/common-resume-mistakes-fail-ats",
    "/software-engineer/keywords",
    "/resume-guides/resume-summary-examples",
    "/resume-guides/ats-friendly-resume-example",
    "/software-engineer-resume-example",
    "/resume-guides/ats-resume-template",
  ],
  "/common-resume-mistakes-fail-ats": [
    CHECK_RESUME_AGAINST_JD_PATH,
    "/how-to-pass-ats",
    "/how-ats-scans-resumes",
    "/resume-guides/resume-format-guide",
    "/resume-guides/resume-achievements-examples",
    "/resume-guides/resume-work-experience-examples",
    "/data-analyst/keywords",
    "/data-analyst-resume-example",
    "/resume-guides/ats-friendly-resume-example",
  ],
  "/data-scientist/keywords": [
    CHECK_RESUME_AGAINST_JD_PATH,
    "/data-scientist-resume-example",
    "/resume-guides/resume-format-guide",
    "/resume-guides/resume-skills-examples",
    "/how-ats-scans-resumes",
    "/common-resume-mistakes-fail-ats",
    "/how-to-pass-ats",
    "/resume-guides/resume-summary-examples",
    "/machine-learning-engineer/keywords",
  ],
  "/ats-resume-checker-free": [
    CHECK_RESUME_AGAINST_JD_PATH,
    "/resume-score-checker",
    "/resume-keyword-scanner",
    "/ats-compatibility-check",
    "/how-to-pass-ats",
    "/how-ats-scans-resumes",
    "/resume-guides/resume-format-guide",
    "/software-engineer/keywords",
  ],
  "/resume-score-checker": [
    CHECK_RESUME_AGAINST_JD_PATH,
    "/ats-resume-checker-free",
    "/resume-keyword-scanner",
    "/ats-compatibility-check",
    "/how-to-pass-ats",
    "/common-resume-mistakes-fail-ats",
    "/data-scientist/keywords",
    "/resume-guides/resume-format-guide",
  ],
  "/resume-keyword-scanner": [
    CHECK_RESUME_AGAINST_JD_PATH,
    "/ats-resume-checker-free",
    "/resume-score-checker",
    "/ats-compatibility-check",
    "/how-ats-scans-resumes",
    "/how-to-pass-ats",
    "/software-engineer/keywords",
    "/resume-guides/resume-skills-examples",
  ],
  "/ats-compatibility-check": [
    CHECK_RESUME_AGAINST_JD_PATH,
    "/ats-resume-checker-free",
    "/resume-score-checker",
    "/resume-keyword-scanner",
    "/common-resume-mistakes-fail-ats",
    "/how-to-pass-ats",
    "/data-analyst/keywords",
    "/resume-guides/ats-friendly-resume-example",
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

  const atsKeywordMatch = normalized.match(/^\/([a-z0-9-]+)\/keywords$/);
  if (atsKeywordMatch) {
    const role = atsKeywordMatch[1];
    const resumeExamplePath = `/${role}-resume-example`;
    return [
      CHECK_RESUME_AGAINST_JD_PATH,
      resumeExamplePath,
      "/resume-guides/resume-format-guide",
      "/how-to-pass-ats",
      "/common-resume-mistakes-fail-ats",
      "/resume-guides/ats-friendly-resume-example",
      "/how-ats-scans-resumes",
      "/resume-guides/resume-summary-examples",
      "/resume-guides/resume-achievements-examples",
    ].filter((p) => PATH_BY_PATH[p] != null);
  }

  const resumeExampleMatch = normalized.match(/^\/([a-z0-9-]+)-resume-example$/);
  if (resumeExampleMatch) {
    const role = resumeExampleMatch[1];
    const atsKeywordPath = `/${role}/keywords`;
    return [
      CHECK_RESUME_AGAINST_JD_PATH,
      atsKeywordPath,
      "/resume-guides/resume-format-guide",
      "/how-to-pass-ats",
      "/common-resume-mistakes-fail-ats",
      "/resume-guides/ats-friendly-resume-example",
      "/how-ats-scans-resumes",
      "/resume-guides/resume-skills-examples",
      "/resume-guides/resume-summary-examples",
    ].filter((p) => PATH_BY_PATH[p] != null);
  }

  const guideMatch = normalized.match(/^\/resume-guides\/([a-z0-9-]+)$/);
  if (guideMatch) {
    return [
      CHECK_RESUME_AGAINST_JD_PATH,
      "/resume-guides/resume-format-guide",
      "/how-to-pass-ats",
      "/common-resume-mistakes-fail-ats",
      "/how-ats-scans-resumes",
      "/resume-guides/ats-friendly-resume-example",
      "/software-engineer/keywords",
      "/data-analyst/keywords",
      "/software-engineer-resume-example",
      "/data-analyst-resume-example",
    ].filter((p) => PATH_BY_PATH[p] != null && p !== normalized).slice(0, 8);
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
