import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/app/lib/siteUrl";
import { KEYWORD_PAGES, type RoleSlug } from "@/app/lib/seoPages";
import { INDEXED_PROBLEM_SLUGS } from "@/app/lib/problemPages";
import { INDEXED_ROLE_RESUME_TOPICS } from "@/app/lib/roleClusterIndexPolicy";
import {
  RESUME_BULLET_ROLES,
  publicPathForBulletHub,
  publicPathForBulletDetail,
  RESUME_BULLET_LEVELS,
} from "@/app/lib/resumeBulletPointContent";

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
  if (
    pathname === "/ats-resume-checker" ||
    pathname === "/resume-keyword-scanner"
  ) {
    return 0.91;
  }
  if (pathname === "/problems") return 0.95;
  if (pathname.startsWith("/problems/")) return 0.92;
  if (pathname.startsWith("/how-ats-")) return 0.92;
  if (
    pathname === "/how-to-pass-ats" ||
    pathname === "/common-resume-mistakes-fail-ats" ||
    pathname === "/customize-resume-without-lying"
  ) {
    return 0.85;
  }
  if (pathname.endsWith("-resume-guide")) return 0.84;
  if (
    /^\/[^/]+-resume-bullet-points(-entry-level|-junior|-senior)?$/.test(pathname)
  ) {
    return 0.82;
  }
  if (/^\/[^/]+-resume-keywords$/.test(pathname)) return 0.55;
  if (LEGAL_PATHS.includes(pathname as (typeof LEGAL_PATHS)[number])) return 0.6;
  if (/^\/[^/]+\/resume$/.test(pathname)) return 0.62;
  if (/^\/[^/]+\/resume\/[^/]+$/.test(pathname)) return 0.56;
  return 0.65;
}

function generateRoleResumeTopicPaths(): string[] {
  const roles = Object.keys(KEYWORD_PAGES) as RoleSlug[];
  const paths: string[] = [];
  for (const role of roles) {
    for (const topic of INDEXED_ROLE_RESUME_TOPICS) {
      paths.push(`/${role}/resume/${topic}`);
    }
  }
  return paths;
}

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
  const toolClusterLastMod = new Date("2026-03-29");
  const toolClusterPaths = [
    "/ats-resume-checker",
    "/resume-keyword-scanner",
  ] as const;
  for (const p of toolClusterPaths) {
    entries.push({
      url: `${base}${p}`,
      lastModified: toolClusterLastMod,
      changeFrequency: "weekly" as const,
      priority: priorityForPath(p),
    });
  }
  entries.push({
    url: `${base}/how-to-pass-ats`,
    lastModified: new Date("2026-03-09"),
    changeFrequency: "monthly" as const,
    priority: priorityForPath("/how-to-pass-ats"),
  });
  entries.push({
    url: `${base}/customize-resume-without-lying`,
    lastModified: new Date("2026-04-02"),
    changeFrequency: "monthly" as const,
    priority: priorityForPath("/customize-resume-without-lying"),
  });
  const resumeBulletLastMod = new Date("2026-04-05");
  for (const role of RESUME_BULLET_ROLES) {
    const hubPath = publicPathForBulletHub(role);
    entries.push({
      url: `${base}${hubPath}`,
      lastModified: resumeBulletLastMod,
      changeFrequency: "monthly" as const,
      priority: priorityForPath(hubPath),
    });
    for (const level of RESUME_BULLET_LEVELS) {
      const p = publicPathForBulletDetail(role, level);
      entries.push({
        url: `${base}${p}`,
        lastModified: resumeBulletLastMod,
        changeFrequency: "monthly" as const,
        priority: priorityForPath(p),
      });
    }
  }
  const legalLastMod = new Date("2026-03-23");
  for (const path of LEGAL_PATHS) {
    entries.push({
      url: `${base}${path}`,
      lastModified: legalLastMod,
      changeFrequency: "yearly" as const,
      priority: priorityForPath(path),
    });
  }

  const roleResumeKeywordLastMod = new Date();
  for (const { slug } of Object.values(KEYWORD_PAGES)) {
    const path = `/${slug}-resume-keywords`;
    entries.push({
      url: `${base}${path}`,
      lastModified: roleResumeKeywordLastMod,
      changeFrequency: "monthly" as const,
      priority: priorityForPath(path),
    });
  }

  const resumeGuideLastMod = new Date("2026-03-09");
  for (const { slug } of Object.values(KEYWORD_PAGES)) {
    const resumeGuidePath = `/${slug}-resume-guide`;
    entries.push({
      url: `${base}${resumeGuidePath}`,
      lastModified: resumeGuideLastMod,
      changeFrequency: "monthly" as const,
      priority: priorityForPath(resumeGuidePath),
    });
  }

  for (const path of generateRoleResumeTopicPaths()) {
    entries.push({
      url: `${base}${path}`,
      lastModified: roleResumeKeywordLastMod,
      changeFrequency: "monthly" as const,
      priority: priorityForPath(path),
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

function pathnameFromEntryUrl(url: string, base: string): string {
  const baseNorm = base.replace(/\/$/, "");
  if (url.startsWith(baseNorm)) {
    const p = url.slice(baseNorm.length) || "/";
    return p.startsWith("/") ? p : `/${p}`;
  }
  try {
    const u = new URL(url);
    return u.pathname || "/";
  } catch {
    return "/";
  }
}

/** Keyword cluster URLs: /{role}-resume-keywords */
export function isKeywordsClusterPath(pathname: string): boolean {
  return /^\/[^/]+-resume-keywords$/.test(pathname);
}

export function splitSitemapEntries(
  entries: MetadataRoute.Sitemap,
  baseUrl: string
): { keywords: MetadataRoute.Sitemap; resume: MetadataRoute.Sitemap } {
  const keywords: MetadataRoute.Sitemap = [];
  const resume: MetadataRoute.Sitemap = [];
  const base = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;

  for (const entry of entries) {
    const path = pathnameFromEntryUrl(entry.url, base);
    if (isKeywordsClusterPath(path)) {
      keywords.push(entry);
    } else {
      resume.push(entry);
    }
  }
  return { keywords, resume };
}
