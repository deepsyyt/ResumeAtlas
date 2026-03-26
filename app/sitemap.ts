import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/app/lib/siteUrl";
import {
  RESUME_PAGES,
  KEYWORD_PAGES,
  type RoleSlug,
} from "@/app/lib/seoPages";
import {
  RESUME_GUIDE_PAGES,
  type ResumeGuideSlug,
} from "@/app/lib/resumeGuidePages";
import { PROBLEM_SLUGS } from "@/app/lib/problemPages";

/** SEO topic slugs for /seo/[slug] - must stay in sync with app/seo/[slug]/page.tsx */
const SEO_TOPIC_SUFFIXES = [
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

/**
 * Tiered priorities so bulk long-tail URLs do not compete with core landing pages.
 * Tier 1: home, problems, /how-ats-*
 * Tier 2: resume guides
 * Tier 3 (low): /seo/*, /ats-keywords/*
 */
function priorityForPath(pathname: string): number {
  if (pathname === "/") return 1.0;
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
  if (pathname.startsWith("/seo/")) return 0.5;
  if (pathname.startsWith("/ats-keywords/")) return 0.5;
  if (LEGAL_PATHS.includes(pathname as (typeof LEGAL_PATHS)[number])) return 0.6;
  if (/^\/[^/]+\/resume$/.test(pathname)) return 0.62;
  return 0.65;
}

function generateSeoSlugs(): string[] {
  const roles = Object.keys(KEYWORD_PAGES) as RoleSlug[];
  const slugs: string[] = [];
  for (const role of roles) {
    slugs.push(`bullet-points-${role}-resume`);
    for (const topic of SEO_TOPIC_SUFFIXES) {
      if (topic === "bullet-points") continue;
      slugs.push(`${role}-resume-${topic}`);
    }
  }
  return slugs;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();

  const entries: MetadataRoute.Sitemap = [];

  // Static pages (priorities from tiers)
  entries.push({
    url: `${base}/`,
    lastModified: new Date("2026-03-09"),
    changeFrequency: "weekly" as const,
    priority: priorityForPath("/"),
  });
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

  const atsKeywordsLastMod = new Date("2026-03-05");
  for (const { slug } of Object.values(KEYWORD_PAGES)) {
    const path = `/ats-keywords/${slug}`;
    entries.push({
      url: `${base}${path}`,
      lastModified: atsKeywordsLastMod,
      changeFrequency: "monthly" as const,
      priority: priorityForPath(path),
    });
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

  const hubLastMod = new Date("2026-03-17");
  for (const { slug } of Object.values(KEYWORD_PAGES)) {
    const path = `/${slug}/resume`;
    entries.push({
      url: `${base}${path}`,
      lastModified: hubLastMod,
      changeFrequency: "monthly" as const,
      priority: priorityForPath(path),
    });
  }

  const seoLastMod = new Date("2026-03-17");
  for (const slug of generateSeoSlugs()) {
    const path = `/seo/${slug}`;
    entries.push({
      url: `${base}${path}`,
      lastModified: seoLastMod,
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
