import type { Metadata } from "next";
import { RESUME_ATLAS_TITLE_SUFFIX } from "@/app/lib/searchIntentSeo";
import { getSiteUrl } from "@/app/lib/siteUrl";

const siteBase = () => getSiteUrl().replace(/\/$/, "");
const ogImage = () => `${siteBase()}/og-resume-checker.png`;

/** Aligns with on-page H1 (`HOME_MARKETING_H1`). One brand suffix, ~60 chars for SERP. */
export const HOME_PAGE_TITLE_ABSOLUTE =
  `Free AI Resume Checker & Optimizer for Any Job Role${RESUME_ATLAS_TITLE_SUFFIX}`;

export const HOME_PAGE_DESCRIPTION =
  "100% free AI resume checker and optimizer for any job role. Paste your resume and any job description to get an ATS score, keyword gap analysis, skill match report, recruiter confidence score, and AI-powered resume optimization. Free. No signup required.";

export function buildHomeMarketingMetadata(): Metadata {
  const url = siteBase();
  const img = ogImage();
  return {
    title: { absolute: HOME_PAGE_TITLE_ABSOLUTE },
    description: HOME_PAGE_DESCRIPTION,
    keywords: [
      "ai resume optimizer",
      "ats resume checker",
      "free resume checker",
      "compare resume to job description",
      "resume optimization",
      "instant resume checker",
    ],
    robots: { index: true, follow: true },
    alternates: { canonical: "/" },
    openGraph: {
      title: HOME_PAGE_TITLE_ABSOLUTE,
      description: HOME_PAGE_DESCRIPTION,
      siteName: "ResumeAtlas",
      type: "website",
      url,
      images: [{ url: img, width: 1200, height: 630, alt: "ResumeAtlas free AI resume checker" }],
    },
    twitter: {
      card: "summary_large_image",
      title: HOME_PAGE_TITLE_ABSOLUTE,
      description: HOME_PAGE_DESCRIPTION,
      images: [img],
    },
  };
}
