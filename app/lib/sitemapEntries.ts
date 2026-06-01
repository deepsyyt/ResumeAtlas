import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/app/lib/siteUrl";
import {
  KEYWORD_PAGES,
  ROLES_WITH_STANDALONE_RESUME_EXAMPLE_PAGE,
  type RoleSlug,
} from "@/app/lib/seoPages";
import { INDEXED_PROBLEM_SLUGS } from "@/app/lib/problemPages";
import { ALT_ROLE_KEYWORD_SLUGS, getAltRoleKeywordConfig } from "@/app/lib/altRoleKeywordPages";
import { PILOT_KEYWORD_SLUGS, getPilotKeywordConfig } from "@/app/lib/pilotKeywordPages";
import { DATA_ENGINEER_RESUME_GUIDE_PATH } from "@/app/lib/dataEngineerResumeGuide";
import {
  RESUME_GUIDES_HUB_PATH,
  RESUME_KEYWORDS_HUB_PATH,
} from "@/app/lib/seoHubPages";
import {
  RESUME_EXAMPLE_CLUSTER_SLUGS,
  resumeExampleClusterPath,
} from "@/app/lib/resumeExampleClusterPages";

const LEGAL_PATHS = [
  "/contact",
  "/privacy",
  "/terms",
  "/refund-policy",
  "/feedback",
] as const;

function priorityForPath(pathname: string): number {
  if (pathname === "/") return 1.0;
  if (pathname === "/check-resume-against-job-description") return 0.94;
  if (pathname === "/methodology") return 0.93;
  if (pathname === "/ats-resume-checker") {
    return 0.91;
  }
  if (pathname === "/resume-examples") return 0.86;
  if (pathname === "/resume-keywords" || pathname === "/resume-guides") return 0.87;
  if (pathname.startsWith("/resume-examples/")) return 0.88;
  if (pathname.startsWith("/problems/")) return 0.92;
  if (pathname.startsWith("/how-ats-")) return 0.92;
  if (
    pathname === "/ats-resume-template" ||
    pathname === "/resume-guides/resume-work-experience-examples" ||
    pathname === "/resume-guides/resume-skills-examples" ||
    pathname === "/customize-resume-without-lying"
  ) {
    return 0.85;
  }
  if (pathname.startsWith("/ats-resume-template-")) return 0.84;
  if (pathname.endsWith("-resume-guide")) return 0.84;
  if (pathname.endsWith("-resume-keywords")) return 0.86;
  if (
    /^\/[a-z0-9-]+$/.test(pathname) &&
    Object.prototype.hasOwnProperty.call(KEYWORD_PAGES, pathname.slice(1))
  ) {
    return 0.83;
  }
  if (LEGAL_PATHS.includes(pathname as (typeof LEGAL_PATHS)[number])) return 0.6;
  if (/^\/[^/]+\/resume$/.test(pathname)) return 0.62;
  if (/^\/[^/]+\/resume\/[^/]+$/.test(pathname)) return 0.56;
  return 0.65;
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
    lastModified: new Date("2026-03-09"),
    changeFrequency: "weekly" as const,
    priority: priorityForPath("/"),
  });
  entries.push({
    url: `${base}/check-resume-against-job-description`,
    lastModified: new Date("2026-03-29"),
    changeFrequency: "weekly" as const,
    priority: priorityForPath("/check-resume-against-job-description"),
  });
  entries.push({
    url: `${base}/methodology`,
    lastModified: new Date("2026-05-13"),
    changeFrequency: "monthly" as const,
    priority: priorityForPath("/methodology"),
  });
  const toolClusterLastMod = new Date("2026-03-29");
  const toolClusterPaths = ["/ats-resume-checker"] as const;
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
      lastModified: resumeGuideLastMod,
      changeFrequency: "monthly" as const,
      priority: priorityForPath(resumeKeywordsPath),
    });
  }

  for (const altSlug of ALT_ROLE_KEYWORD_SLUGS) {
    const altPath = getAltRoleKeywordConfig(altSlug).path;
    entries.push({
      url: `${base}${altPath}`,
      lastModified: resumeGuideLastMod,
      changeFrequency: "monthly" as const,
      priority: priorityForPath(altPath),
    });
  }

  for (const pilotSlug of PILOT_KEYWORD_SLUGS) {
    const pilotPath = getPilotKeywordConfig(pilotSlug).path;
    entries.push({
      url: `${base}${pilotPath}`,
      lastModified: resumeGuideLastMod,
      changeFrequency: "monthly" as const,
      priority: priorityForPath(pilotPath),
    });
  }

  entries.push({
    url: `${base}${DATA_ENGINEER_RESUME_GUIDE_PATH}`,
    lastModified: new Date("2026-06-01"),
    changeFrequency: "monthly" as const,
    priority: priorityForPath(DATA_ENGINEER_RESUME_GUIDE_PATH),
  });

  const seoHubLastMod = new Date("2026-06-01");
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
  entries.push({
    url: `${base}${RESUME_GUIDES_HUB_PATH}`,
    lastModified: seoHubLastMod,
    changeFrequency: "weekly" as const,
    priority: priorityForPath(RESUME_GUIDES_HUB_PATH),
  });

  const resumeExampleClusterLastMod = new Date("2026-06-01");
  for (const clusterSlug of RESUME_EXAMPLE_CLUSTER_SLUGS) {
    const clusterPath = resumeExampleClusterPath(clusterSlug);
    entries.push({
      url: `${base}${clusterPath}`,
      lastModified: resumeExampleClusterLastMod,
      changeFrequency: "monthly" as const,
      priority: priorityForPath(clusterPath),
    });
  }

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
