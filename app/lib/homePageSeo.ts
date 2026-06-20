import type { Metadata } from "next";
import { RESUME_ATLAS_TITLE_SUFFIX } from "@/app/lib/searchIntentSeo";
import { getSiteUrl } from "@/app/lib/siteUrl";

const siteBase = () => getSiteUrl().replace(/\/$/, "");
const ogImage = () => `${siteBase()}/og-resume-checker.png`;

/** Layer 1 SEO — search demand (compare, ATS, gaps). Layer 2 hero is apply-readiness (`HOME_MARKETING_H1`). */
export const HOME_PAGE_TITLE_ABSOLUTE =
  `Compare Resume to Job Description | ATS Score, Gaps & Apply Readiness${RESUME_ATLAS_TITLE_SUFFIX}`;

export const HOME_PAGE_DESCRIPTION =
  "Compare your resume to a job description free. ATS score, keyword coverage, application verdict, rejection risks, and job-specific fixes before you apply. No signup required.";

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
          alt: "ResumeAtlas — compare resume to job description and check apply readiness",
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
