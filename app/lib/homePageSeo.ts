import type { Metadata } from "next";
import { RESUME_ATLAS_TITLE_SUFFIX } from "@/app/lib/searchIntentSeo";
import { getSiteUrl } from "@/app/lib/siteUrl";

const siteBase = () => getSiteUrl().replace(/\/$/, "");
const ogImage = () => `${siteBase()}/og-resume-checker.png`;

/**
 * Layer 1 SEO — exact-match "compare resume to job description" + 2026 freshness + apply-readiness differentiator.
 * Layer 2 hero is apply-readiness outcome (`HOME_MARKETING_H1` — "Know before you apply.").
 * Keep "free" and no-signup signals in description to defend CTR against Jobscan's subscription framing.
 */
export const HOME_PAGE_TITLE_ABSOLUTE =
  `Free Resume Checker — Job Application Verdict, Rejection Risks & Recommended Fixes${RESUME_ATLAS_TITLE_SUFFIX}`;

export const HOME_PAGE_DESCRIPTION =
  "Paste your resume and job description. Get a Job Application Verdict (Apply, Optimize First, or Skip), your rejection risks, and recommended fixes in 60 seconds. Free, no signup. Optimize free after sign-in. Pay only to download.";

export function buildHomeMarketingMetadata(): Metadata {
  const url = siteBase();
  const img = ogImage();
  return {
    title: { absolute: HOME_PAGE_TITLE_ABSOLUTE },
    description: HOME_PAGE_DESCRIPTION,
    keywords: [
      "compare resume to job description",
      "resume vs job description",
      "ats resume checker",
      "resume keyword scanner",
      "tailor resume to job description",
      "resume match job description",
      "resume not getting interviews",
      "resume optimizer",
      "resumeatlas",
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
        {
          url: img,
          width: 1200,
          height: 630,
          alt: "ResumeAtlas — analyze resume fit and optimize for the job description",
        },
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
