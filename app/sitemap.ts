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

/** SEO topic slugs for /seo/[slug] - must stay in sync with app/seo/[slug]/page.tsx */
const SEO_TOPIC_SUFFIXES = [
  "bullet-points",
  "skills",
  "summary",
  "responsibilities",
  "projects",
  "experience-examples",
] as const;

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

  // Static high-priority pages
  entries.push({
    url: `${base}/`,
    lastModified: new Date("2026-03-09"),
    changeFrequency: "weekly" as const,
    priority: 1.0,
  });
  entries.push({
    url: `${base}/how-ats-scans-resumes`,
    lastModified: new Date("2026-03-08"),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  });
  entries.push({
    url: `${base}/how-to-pass-ats`,
    lastModified: new Date("2026-03-09"),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  });
  entries.push({
    url: `${base}/common-resume-mistakes-fail-ats`,
    lastModified: new Date("2026-03-07"),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  });
  entries.push({
    url: `${base}/ats-keywords-data-scientist-resumes`,
    lastModified: new Date("2026-03-06"),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  });

  // Legal and contact pages
  const legalLastMod = new Date("2026-03-23");
  for (const path of ["/contact", "/privacy", "/terms", "/refund-policy", "/feedback"]) {
    entries.push({
      url: `${base}${path}`,
      lastModified: legalLastMod,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    });
  }

  // Resume examples (from RESUME_PAGES)
  const resumeExampleLastMod = new Date("2026-03-05");
  for (const slug of Object.keys(RESUME_PAGES) as (keyof typeof RESUME_PAGES)[]) {
    entries.push({
      url: `${base}/${slug}`,
      lastModified: resumeExampleLastMod,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    });
  }

  // ATS keywords (from KEYWORD_PAGES)
  const atsKeywordsLastMod = new Date("2026-03-05");
  for (const { slug } of Object.values(KEYWORD_PAGES)) {
    entries.push({
      url: `${base}/ats-keywords/${slug}`,
      lastModified: atsKeywordsLastMod,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    });
  }

  // Resume guides (from RESUME_GUIDE_PAGES)
  const guideLastMod = new Date("2026-03-09");
  for (const slug of Object.keys(RESUME_GUIDE_PAGES) as ResumeGuideSlug[]) {
    entries.push({
      url: `${base}/resume-guides/${slug}`,
      lastModified: guideLastMod,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    });
  }
  // resume-format-guide is a separate page, not in RESUME_GUIDE_PAGES
  entries.push({
    url: `${base}/resume-guides/resume-format-guide`,
    lastModified: new Date("2026-03-14"),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  });

  // Role hub pages ([role]/resume)
  const hubLastMod = new Date("2026-03-17");
  for (const { slug } of Object.values(KEYWORD_PAGES)) {
    entries.push({
      url: `${base}/${slug}/resume`,
      lastModified: hubLastMod,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    });
  }

  // SEO long-tail pages
  const seoLastMod = new Date("2026-03-17");
  for (const slug of generateSeoSlugs()) {
    entries.push({
      url: `${base}/seo/${slug}`,
      lastModified: seoLastMod,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    });
  }

  return entries;
}
