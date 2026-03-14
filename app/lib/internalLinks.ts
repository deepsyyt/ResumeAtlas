import { RESUME_PAGES } from "@/app/lib/seoPages";
import { KEYWORD_PAGES } from "@/app/lib/seoPages";
import { RESUME_GUIDE_PAGES } from "@/app/lib/resumeGuidePages";

export type InternalLink = { path: string; label: string };

// All SEO pages (excluding home) for internal linking. Order: articles, resume examples, ats keyword pages, resume guides.
const ARTICLE_LINKS: InternalLink[] = [
  { path: "/how-ats-scans-resumes", label: "How ATS Systems Scan Resumes" },
  { path: "/how-to-pass-ats", label: "How to Pass ATS Screening" },
  { path: "/common-resume-mistakes-fail-ats", label: "Common Resume Mistakes That Fail ATS" },
  { path: "/ats-keywords-data-scientist-resumes", label: "ATS Keywords for Data Scientist Resumes" },
];

const RESUME_EXAMPLE_LINKS: InternalLink[] = Object.entries(RESUME_PAGES).map(([slug, page]) => ({
  path: `/${slug}`,
  label: page.h1,
}));

const ATS_KEYWORD_LINKS: InternalLink[] = Object.entries(KEYWORD_PAGES).map(([slug, page]) => ({
  path: `/ats-keywords/${slug}`,
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
// We rotate other pages into "Related Resume Guides" so they get stronger internal links.
const POPULAR_EXAMPLES_PATHS = new Set(
  RESUME_EXAMPLE_LINKS.slice(0, 6).map((l) => l.path)
);
const ATS_GUIDES_PATHS = new Set(ATS_KEYWORD_LINKS.slice(0, 6).map((l) => l.path));
const FEATURED_PATHS = new Set([...POPULAR_EXAMPLES_PATHS, ...ATS_GUIDES_PATHS]);

/** Simple deterministic hash for a string (djb2). */
function hashString(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h) ^ s.charCodeAt(i);
  return h >>> 0;
}

/**
 * Returns a deterministic set of related internal links for the given page path.
 * Excludes the current page. Prefers pages NOT in the featured "Popular Resume Examples"
 * or "ATS Keyword Guides" sections so that all 44 pages get stronger internal links.
 * Same path always returns the same list (good for SSG/caching).
 */
export function getRelatedResumeGuides(
  currentPath: string,
  count: number = 5
): InternalLink[] {
  const normalized = currentPath.replace(/\/$/, "") || "/";
  const others = ALL_SEO_LINKS.filter((l) => {
    const p = l.path.replace(/\/$/, "");
    return p !== normalized;
  });

  // Put non-featured pages first so they get more exposure in the rotation.
  const sorted = [...others].sort((a, b) => {
    const aFeatured = FEATURED_PATHS.has(a.path) ? 1 : 0;
    const bFeatured = FEATURED_PATHS.has(b.path) ? 1 : 0;
    return aFeatured - bFeatured;
  });

  if (sorted.length <= count) return sorted;

  const seed = hashString(normalized);
  const start = seed % (sorted.length - count + 1);
  return sorted.slice(start, start + count);
}
