import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/app/lib/siteUrl";
import {
  RESUME_PAGES,
  KEYWORD_PAGES,
  type RoleSlug,
} from "@/app/lib/seoPages";
import { ROLE_KEYWORD_INTENTS } from "@/app/lib/roleSeo";
import {
  RESUME_GUIDE_PAGES,
  type ResumeGuideSlug,
} from "@/app/lib/resumeGuidePages";
import { PROBLEM_SLUGS } from "@/app/lib/problemPages";

/** Resume topic slugs for /[role]/resume/[topic] */
export const RESUME_TOPICS = [
  "bullet-points",
  "skills",
  "summary",
  "responsibilities",
  "projects",
  "experience-examples",
] as const;

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
    pathname === "/ats-resume-checker-free" ||
    pathname === "/resume-score-checker" ||
    pathname === "/resume-keyword-scanner" ||
    pathname === "/ats-compatibility-check"
  ) {
    return 0.91;
  }
  if (pathname === "/problems") return 0.95;
  if (pathname.startsWith("/problems/")) return 0.92;
  if (pathname.startsWith("/how-ats-")) return 0.92;
  if (
    pathname === "/how-to-pass-ats" ||
    pathname === "/common-resume-mistakes-fail-ats"
  ) {
    return 0.85;
  }
  if (pathname.startsWith("/resume-guides/")) return 0.78;
  if (/^\/[^/]+\/keywords(\/[^/]+)?$/.test(pathname)) return 0.55;
  if (LEGAL_PATHS.includes(pathname as (typeof LEGAL_PATHS)[number])) return 0.6;
  if (/^\/[^/]+\/resume$/.test(pathname)) return 0.62;
  if (/^\/[^/]+\/resume\/[^/]+$/.test(pathname)) return 0.56;
  return 0.65;
}

function generateRoleResumeTopicPaths(): string[] {
  const roles = Object.keys(KEYWORD_PAGES) as RoleSlug[];
  const paths: string[] = [];
  for (const role of roles) {
    for (const topic of RESUME_TOPICS) {
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
  entries.push({
    url: `${base}/tools`,
    lastModified: new Date("2026-03-29"),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  });
  const toolClusterLastMod = new Date("2026-03-29");
  const toolClusterPaths = [
    "/ats-resume-checker-free",
    "/resume-score-checker",
    "/resume-keyword-scanner",
    "/ats-compatibility-check",
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
    url: `${base}/how-ats-scans-resumes`,
    lastModified: new Date("2026-03-08"),
    changeFrequency: "monthly" as const,
    priority: priorityForPath("/how-ats-scans-resumes"),
  });
  entries.push({
    url: `${base}/how-to-pass-ats`,
    lastModified: new Date("2026-03-09"),
    changeFrequency: "monthly" as const,
    priority: priorityForPath("/how-to-pass-ats"),
  });
  entries.push({
    url: `${base}/common-resume-mistakes-fail-ats`,
    lastModified: new Date("2026-03-07"),
    changeFrequency: "monthly" as const,
    priority: priorityForPath("/common-resume-mistakes-fail-ats"),
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

  const resumeExampleLastMod = new Date("2026-03-05");
  for (const slug of Object.keys(RESUME_PAGES) as (keyof typeof RESUME_PAGES)[]) {
    const path = `/${slug}`;
    entries.push({
      url: `${base}${path}`,
      lastModified: resumeExampleLastMod,
      changeFrequency: "monthly" as const,
      priority: priorityForPath(path),
    });
  }

  const roleResumeKeywordLastMod = new Date();
  for (const { slug } of Object.values(KEYWORD_PAGES)) {
    const path = `/${slug}/keywords`;
    entries.push({
      url: `${base}${path}`,
      lastModified: roleResumeKeywordLastMod,
      changeFrequency: "monthly" as const,
      priority: priorityForPath(path),
    });
    for (const intent of ROLE_KEYWORD_INTENTS) {
      const intentPath = `/${slug}/keywords/${intent}`;
      entries.push({
        url: `${base}${intentPath}`,
        lastModified: roleResumeKeywordLastMod,
        changeFrequency: "monthly" as const,
        priority: priorityForPath(intentPath),
      });
    }
  }

  const guideLastMod = new Date("2026-03-09");
  for (const slug of Object.keys(RESUME_GUIDE_PAGES) as ResumeGuideSlug[]) {
    const path = `/resume-guides/${slug}`;
    entries.push({
      url: `${base}${path}`,
      lastModified: guideLastMod,
      changeFrequency: "monthly" as const,
      priority: priorityForPath(path),
    });
  }
  entries.push({
    url: `${base}/resume-guides/resume-format-guide`,
    lastModified: new Date("2026-03-14"),
    changeFrequency: "monthly" as const,
    priority: priorityForPath("/resume-guides/resume-format-guide"),
  });

  for (const { slug } of Object.values(KEYWORD_PAGES)) {
    const roleHubPath = `/${slug}`;
    entries.push({
      url: `${base}${roleHubPath}`,
      lastModified: roleResumeKeywordLastMod,
      changeFrequency: "monthly" as const,
      priority: priorityForPath(roleHubPath),
    });
    const path = `/${slug}/resume`;
    entries.push({
      url: `${base}${path}`,
      lastModified: roleResumeKeywordLastMod,
      changeFrequency: "monthly" as const,
      priority: priorityForPath(path),
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
  entries.push({
    url: `${base}/problems`,
    lastModified: problemsHubLastMod,
    changeFrequency: "weekly" as const,
    priority: priorityForPath("/problems"),
  });
  for (const slug of PROBLEM_SLUGS) {
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

/** Keyword cluster URLs: /{role}/keywords and /{role}/keywords/{intent} */
export function isKeywordsClusterPath(pathname: string): boolean {
  return /^\/[^/]+\/keywords(\/[^/]+)?$/.test(pathname);
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
