import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/app/lib/siteUrl";
import {
  KEYWORD_PAGES,
  ROLES_WITH_STANDALONE_RESUME_EXAMPLE_PAGE,
  type RoleSlug,
} from "@/app/lib/seoPages";
import { INDEXED_PROBLEM_SLUGS } from "@/app/lib/problemPages";
import { getAltRoleKeywordConfig, getIndexedAltRoleKeywordSlugs } from "@/app/lib/altRoleKeywordPages";
import { PILOT_KEYWORD_SLUGS, getPilotKeywordConfig } from "@/app/lib/pilotKeywordPages";
import { DATA_ENGINEER_RESUME_GUIDE_PATH } from "@/app/lib/dataEngineerResumeGuide";
import {
  RESUME_KEYWORDS_HUB_PATH,
} from "@/app/lib/seoHubPages";
import { CHECK_RESUME_AGAINST_JD_PATH } from "@/app/lib/internalLinks";
import {
  ALREADY_HAVE_SKILLS_PATH,
  ATS_SCORE_VS_JOB_FIT_PATH,
  HIGH_ATS_SCORE_NO_INTERVIEWS_PATH,
  HOW_RECRUITERS_EVALUATE_PATH,
  INTERVIEW_CLUSTER_TIER2_CORE,
  RESUME_NOT_GETTING_INTERVIEWS_PATH,
  SKILLS_LISTED_NOT_PROVEN_PATH,
  WHAT_JOBS_SHOULD_I_APPLY_FOR_PATH,
} from "@/app/lib/interviewCluster/paths";
import {
  RESUME_BULLET_ROLES,
  publicPathForBulletHub,
} from "@/app/lib/resumeBulletPointContent";
import { OPTIMIZE_HUB_PATH } from "@/app/lib/roleOptimizerContent";
import { ROLE_OPTIMIZER_ORDER } from "@/app/lib/roleOptimizer/registry";

const LEGAL_PATHS = [
  "/contact",
  "/privacy",
  "/terms",
  "/refund-policy",
  "/feedback",
] as const;

/**
 * Coarse sitemap tiers only. Google largely ignores fine-grained priority — use tiers you can reason about.
 */
const SITEMAP_PRIORITY = {
  TOP: 1.0,
  CLUSTER_CORE: 0.9,
  CLUSTER_SPOKE: 0.8,
  SUPPORT: 0.7,
  SECONDARY: 0.65,
  LEGAL: 0.5,
} as const;

function priorityForPath(pathname: string): number {
  if (pathname === "/" || pathname === CHECK_RESUME_AGAINST_JD_PATH) {
    return SITEMAP_PRIORITY.TOP;
  }
  if (
    (INTERVIEW_CLUSTER_TIER2_CORE as readonly string[]).includes(pathname)
  ) {
    return SITEMAP_PRIORITY.CLUSTER_CORE;
  }
  if (
    pathname === HIGH_ATS_SCORE_NO_INTERVIEWS_PATH ||
    pathname === SKILLS_LISTED_NOT_PROVEN_PATH ||
    pathname === ALREADY_HAVE_SKILLS_PATH ||
    pathname === HOW_RECRUITERS_EVALUATE_PATH ||
    pathname.startsWith("/resumeatlas-vs-")
  ) {
    return SITEMAP_PRIORITY.CLUSTER_SPOKE;
  }
  if (
    pathname === "/ats-resume-checker" ||
    pathname === "/resume-keyword-scanner" ||
    pathname === OPTIMIZE_HUB_PATH ||
    pathname === "/methodology" ||
    pathname === "/resume-examples" ||
    pathname === "/resume-keywords" ||
    pathname === "/resume-guides" ||
    pathname.startsWith("/problems/") ||
    pathname.startsWith("/how-ats-")
  ) {
    return SITEMAP_PRIORITY.CLUSTER_SPOKE;
  }
  if (
    pathname === "/ats-resume-template" ||
    pathname === "/resume-guides/resume-work-experience-examples" ||
    pathname === "/resume-guides/resume-skills-examples" ||
    pathname === "/customize-resume-without-lying" ||
    pathname.startsWith("/resume-examples/") ||
    pathname.startsWith("/ats-resume-template-") ||
    pathname.endsWith("-resume-guide") ||
    pathname.endsWith("-resume-keywords") ||
    pathname.endsWith("-resume-optimizer") ||
    /^\/[^/]+-resume-bullet-points(-entry-level|-junior|-senior)?$/.test(pathname)
  ) {
    return SITEMAP_PRIORITY.SECONDARY;
  }
  if (LEGAL_PATHS.includes(pathname as (typeof LEGAL_PATHS)[number])) {
    return SITEMAP_PRIORITY.LEGAL;
  }
  if (/^\/[^/]+\/resume$/.test(pathname) || /^\/[^/]+\/resume\/[^/]+$/.test(pathname)) {
    return SITEMAP_PRIORITY.LEGAL;
  }
  if (
    /^\/[a-z0-9-]+$/.test(pathname) &&
    Object.prototype.hasOwnProperty.call(KEYWORD_PAGES, pathname.slice(1))
  ) {
    return SITEMAP_PRIORITY.SECONDARY;
  }
  return SITEMAP_PRIORITY.SECONDARY;
}

const STANDALONE_RESUME_EXAMPLE_ROLE_SET = new Set<RoleSlug>(
  ROLES_WITH_STANDALONE_RESUME_EXAMPLE_PAGE
);

/** Full sitemap entries (same composition as legacy app/sitemap.ts). */
export function getAllSitemapEntries(): MetadataRoute.Sitemap {
  const base = getSiteUrl().replace(/\/$/, "");
  const entries: MetadataRoute.Sitemap = [];

  entries.push({
    url: `${base}/`,
    lastModified: new Date("2026-06-20"),
    changeFrequency: "weekly" as const,
    priority: priorityForPath("/"),
  });
  const primaryToolLastMod = new Date("2026-06-20");
  entries.push({
    url: `${base}${CHECK_RESUME_AGAINST_JD_PATH}`,
    lastModified: primaryToolLastMod,
    changeFrequency: "weekly" as const,
    priority: priorityForPath(CHECK_RESUME_AGAINST_JD_PATH),
  });
  const siteSupportLastMod = new Date("2026-06-20");
  // `/faq` is noindex support content — omit from sitemap (linked from workbench only).
  const resumeBulletLastMod = new Date("2026-06-13");
  for (const role of RESUME_BULLET_ROLES) {
    const hubPath = publicPathForBulletHub(role);
    entries.push({
      url: `${base}${hubPath}`,
      lastModified: resumeBulletLastMod,
      changeFrequency: "monthly" as const,
      priority: priorityForPath(hubPath),
    });
  }
  const optimizerLastMod = new Date("2026-06-07");
  entries.push({
    url: `${base}${OPTIMIZE_HUB_PATH}`,
    lastModified: optimizerLastMod,
    changeFrequency: "weekly" as const,
    priority: priorityForPath(OPTIMIZE_HUB_PATH),
  });
  for (const role of ROLE_OPTIMIZER_ORDER) {
    entries.push({
      url: `${base}${role.path}`,
      lastModified: optimizerLastMod,
      changeFrequency: "monthly" as const,
      priority: priorityForPath(role.path),
    });
  }
  entries.push({
    url: `${base}/methodology`,
    lastModified: new Date("2026-05-13"),
    changeFrequency: "monthly" as const,
    priority: priorityForPath("/methodology"),
  });
  const toolClusterLastMod = new Date("2026-03-29");
  const toolClusterPaths = ["/ats-resume-checker", "/resume-keyword-scanner"] as const;
  for (const p of toolClusterPaths) {
    entries.push({
      url: `${base}${p}`,
      lastModified: toolClusterLastMod,
      changeFrequency: "weekly" as const,
      priority: priorityForPath(p),
    });
  }
  // Keep guide cluster freshness aligned after tiered SEO updates.
  const guideClusterLastMod = new Date("2026-04-17");
  entries.push({
    url: `${base}/ats-resume-template`,
    lastModified: guideClusterLastMod,
    changeFrequency: "monthly" as const,
    priority: priorityForPath("/ats-resume-template"),
  });
  entries.push({
    url: `${base}/resume-guides/resume-work-experience-examples`,
    lastModified: guideClusterLastMod,
    changeFrequency: "monthly" as const,
    priority: priorityForPath("/resume-guides/resume-work-experience-examples"),
  });
  entries.push({
    url: `${base}/resume-guides/resume-skills-examples`,
    lastModified: guideClusterLastMod,
    changeFrequency: "monthly" as const,
    priority: priorityForPath("/resume-guides/resume-skills-examples"),
  });
  entries.push({
    url: `${base}/customize-resume-without-lying`,
    lastModified: new Date("2026-04-02"),
    changeFrequency: "monthly" as const,
    priority: priorityForPath("/customize-resume-without-lying"),
  });
  entries.push({
    url: `${base}/resumeatlas-vs-jobscan`,
    lastModified: new Date("2026-06-20"),
    changeFrequency: "monthly" as const,
    priority: priorityForPath("/resumeatlas-vs-jobscan"),
  });
  entries.push({
    url: `${base}/resumeatlas-vs-resume-worded`,
    lastModified: new Date("2026-06-20"),
    changeFrequency: "monthly" as const,
    priority: priorityForPath("/resumeatlas-vs-resume-worded"),
  });
  entries.push({
    url: `${base}/resume-not-getting-interviews`,
    lastModified: new Date("2026-06-20"),
    changeFrequency: "monthly" as const,
    priority: priorityForPath("/resume-not-getting-interviews"),
  });
  entries.push({
    url: `${base}/skills-listed-but-not-proven-on-resume`,
    lastModified: new Date("2026-06-20"),
    changeFrequency: "monthly" as const,
    priority: priorityForPath("/skills-listed-but-not-proven-on-resume"),
  });
  entries.push({
    url: `${base}/already-have-the-skills-but-not-getting-interviews`,
    lastModified: new Date("2026-06-20"),
    changeFrequency: "monthly" as const,
    priority: priorityForPath("/already-have-the-skills-but-not-getting-interviews"),
  });
  entries.push({
    url: `${base}/how-recruiters-evaluate-resumes`,
    lastModified: new Date("2026-06-20"),
    changeFrequency: "monthly" as const,
    priority: priorityForPath("/how-recruiters-evaluate-resumes"),
  });
  entries.push({
    url: `${base}/resumeatlas-vs-teal`,
    lastModified: new Date("2026-06-20"),
    changeFrequency: "monthly" as const,
    priority: priorityForPath("/resumeatlas-vs-teal"),
  });
  entries.push({
    url: `${base}/ats-score-vs-real-job-fit`,
    lastModified: new Date("2026-06-20"),
    changeFrequency: "monthly" as const,
    priority: priorityForPath("/ats-score-vs-real-job-fit"),
  });
  entries.push({
    url: `${base}${WHAT_JOBS_SHOULD_I_APPLY_FOR_PATH}`,
    lastModified: new Date("2026-06-22"),
    changeFrequency: "monthly" as const,
    priority: priorityForPath(WHAT_JOBS_SHOULD_I_APPLY_FOR_PATH),
  });
  entries.push({
    url: `${base}${HIGH_ATS_SCORE_NO_INTERVIEWS_PATH}`,
    lastModified: new Date("2026-06-22"),
    changeFrequency: "monthly" as const,
    priority: priorityForPath(HIGH_ATS_SCORE_NO_INTERVIEWS_PATH),
  });
  const legalLastMod = new Date("2026-03-23");
  for (const path of LEGAL_PATHS) {
    entries.push({
      url: `${base}${path}`,
      lastModified: legalLastMod,
      changeFrequency: "yearly" as const,
      priority: priorityForPath(path),
    });
  }

  const resumeGuideLastMod = new Date("2026-03-09");
  const roleKeywordsLastMod = new Date("2026-06-15");
  const roleHubLastMod = new Date("2026-04-09");
  for (const { slug } of Object.values(KEYWORD_PAGES)) {
    const roleHubPath = `/${slug}`;
    if (!STANDALONE_RESUME_EXAMPLE_ROLE_SET.has(slug)) {
      entries.push({
        url: `${base}${roleHubPath}`,
        lastModified: roleHubLastMod,
        changeFrequency: "monthly" as const,
        priority: priorityForPath(roleHubPath),
      });
    }
    const resumeGuidePath = `/${slug}-resume-guide`;
    entries.push({
      url: `${base}${resumeGuidePath}`,
      lastModified: resumeGuideLastMod,
      changeFrequency: "monthly" as const,
      priority: priorityForPath(resumeGuidePath),
    });
    const resumeKeywordsPath = `/${slug}-resume-keywords`;
    entries.push({
      url: `${base}${resumeKeywordsPath}`,
      lastModified: roleKeywordsLastMod,
      changeFrequency: "monthly" as const,
      priority: priorityForPath(resumeKeywordsPath),
    });
  }

  const seoHubLastMod = new Date("2026-06-02");

  // Alt + pilot keyword pages are featured on /resume-keywords (not separate hub indexes).
  for (const altSlug of getIndexedAltRoleKeywordSlugs()) {
    const altPath = getAltRoleKeywordConfig(altSlug).path;
    entries.push({
      url: `${base}${altPath}`,
      lastModified: seoHubLastMod,
      changeFrequency: "monthly" as const,
      priority: priorityForPath(altPath),
    });
  }

  // Pilot keyword pages are listed on /resume-keywords (not a separate /ats-keywords index).
  for (const pilotSlug of PILOT_KEYWORD_SLUGS) {
    const pilotPath = getPilotKeywordConfig(pilotSlug).path;
    entries.push({
      url: `${base}${pilotPath}`,
      lastModified: seoHubLastMod,
      changeFrequency: "monthly" as const,
      priority: priorityForPath(pilotPath),
    });
  }

  entries.push({
    url: `${base}${DATA_ENGINEER_RESUME_GUIDE_PATH}`,
    lastModified: seoHubLastMod,
    changeFrequency: "monthly" as const,
    priority: priorityForPath(DATA_ENGINEER_RESUME_GUIDE_PATH),
  });
  entries.push({
    url: `${base}/resume-examples`,
    lastModified: seoHubLastMod,
    changeFrequency: "weekly" as const,
    priority: priorityForPath("/resume-examples"),
  });
  entries.push({
    url: `${base}${RESUME_KEYWORDS_HUB_PATH}`,
    lastModified: seoHubLastMod,
    changeFrequency: "weekly" as const,
    priority: priorityForPath(RESUME_KEYWORDS_HUB_PATH),
  });
  // `/resume-guides` and `/resume-guides/ats-resume-template` 308 → `/ats-resume-template` — omit from sitemap.

  const problemsHubLastMod = new Date("2026-03-25");
  // `/problems` hub is intentionally low-demand (noindex set on the page).
  // Kept reachable but excluded from sitemap to reduce crawl focus.
  for (const slug of INDEXED_PROBLEM_SLUGS) {
    const path = `/problems/${slug}`;
    entries.push({
      url: `${base}${path}`,
      lastModified: problemsHubLastMod,
      changeFrequency: "weekly" as const,
      priority: priorityForPath(path),
    });
  }

  return entries;
}

/** Normalize `<loc>` for dedupe (strip hash, trailing slash except origin-only). */
function sitemapDedupeKey(url: string): string {
  try {
    const u = new URL(url);
    u.hash = "";
    let path = u.pathname;
    if (path.length > 1 && path.endsWith("/")) {
      path = path.slice(0, -1);
    }
    u.pathname = path;
    return u.href;
  } catch {
    return url.trim();
  }
}

function newerLastModified(
  a?: string | Date,
  b?: string | Date
): string | Date | undefined {
  if (!a) return b;
  if (!b) return a;
  const ta = typeof a === "string" ? new Date(a).getTime() : a.getTime();
  const tb = typeof b === "string" ? new Date(b).getTime() : b.getTime();
  if (Number.isNaN(ta)) return b;
  if (Number.isNaN(tb)) return a;
  return ta >= tb ? a : b;
}

/** One row per canonical URL - duplicate `<loc>`s merge to the freshest `lastModified`. */
export function dedupeSitemapEntries(entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  const byKey = new Map<string, MetadataRoute.Sitemap[number]>();
  for (const entry of entries) {
    const key = sitemapDedupeKey(entry.url);
    const prev = byKey.get(key);
    if (!prev) {
      byKey.set(key, { ...entry, url: key });
      continue;
    }
    byKey.set(key, {
      ...prev,
      url: key,
      lastModified: newerLastModified(prev.lastModified, entry.lastModified),
    });
  }
  return Array.from(byKey.values()).sort((x, y) => x.url.localeCompare(y.url));
}

export function getDedupedSitemapEntries(): MetadataRoute.Sitemap {
  return dedupeSitemapEntries(getAllSitemapEntries());
}
