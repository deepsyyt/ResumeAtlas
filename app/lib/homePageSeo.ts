import type { Metadata } from "next";
import { RESUME_ATLAS_TITLE_SUFFIX } from "@/app/lib/searchIntentSeo";
import { getSiteUrl } from "@/app/lib/siteUrl";

const siteBase = () => getSiteUrl().replace(/\/$/, "");
const ogImage = () => `${siteBase()}/og-resume-checker.png`;

/** Layer 1 SEO — analysis + optimization. Layer 2 hero is apply-readiness + optimize (`HOME_MARKETING_H1`). */
export const HOME_PAGE_TITLE_ABSOLUTE =
  `Compare Resume to Job Description | Analyze Fit & Optimize Resume${RESUME_ATLAS_TITLE_SUFFIX}`;

export const HOME_PAGE_DESCRIPTION =
  "Compare your resume to a job description free. Application verdict, elimination risks, skill proof map, and selectable fixes — then free job-specific optimization after sign-in. Pay only to download PDF or DOCX.";

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
