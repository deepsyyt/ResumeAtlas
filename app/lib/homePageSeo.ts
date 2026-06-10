import type { Metadata } from "next";
import { RESUME_ATLAS_TITLE_SUFFIX } from "@/app/lib/searchIntentSeo";
import { getSiteUrl } from "@/app/lib/siteUrl";

const siteBase = () => getSiteUrl().replace(/\/$/, "");
const ogImage = () => `${siteBase()}/og-resume-checker.png`;

/** Aligns with on-page H1 (`HOME_MARKETING_H1`). Category hub — not JD-compare or ATS-checker SERP (see workbench URLs). */
export const HOME_PAGE_TITLE_ABSOLUTE =
  `Free AI Resume Checker & ATS Resume Optimizer${RESUME_ATLAS_TITLE_SUFFIX}`;

export const HOME_PAGE_DESCRIPTION =
  "ResumeAtlas — free AI resume checker and ATS resume optimizer. Scan resume for keywords, check ATS compatibility, strengthen bullets with AI. No signup required.";

export function buildHomeMarketingMetadata(): Metadata {
  const url = siteBase();
  const img = ogImage();
  return {
    title: { absolute: HOME_PAGE_TITLE_ABSOLUTE },
    description: HOME_PAGE_DESCRIPTION,
    keywords: [
      "resumeatlas",
      "resume atlas",
      "free resume checker",
      "resume optimizer",
      "resume optimization tool",
      "ai resume checker",
      "scan resume for keywords",
      "resume keyword scanner",
      "ats keyword matching resume",
      "ai resume optimizer",
    ],
    robots: { index: true, follow: true },
    alternates: { canonical: "/" },
    openGraph: {
      title: HOME_PAGE_TITLE_ABSOLUTE,
      description: HOME_PAGE_DESCRIPTION,
      siteName: "ResumeAtlas",
      type: "website",
      url,
      images: [
        { url: img, width: 1200, height: 630, alt: "ResumeAtlas free AI resume checker and ATS optimizer" },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: HOME_PAGE_TITLE_ABSOLUTE,
      description: HOME_PAGE_DESCRIPTION,
      images: [img],
    },
  };
}
