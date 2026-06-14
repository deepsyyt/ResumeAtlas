import type { Metadata } from "next";
import { RESUME_ATLAS_TITLE_SUFFIX } from "@/app/lib/searchIntentSeo";
import { getSiteUrl } from "@/app/lib/siteUrl";

const siteBase = () => getSiteUrl().replace(/\/$/, "");
const ogImage = () => `${siteBase()}/og-resume-checker.png`;

export const HOW_IT_WORKS_PATH = "/how-it-works" as const;

export const HOW_IT_WORKS_TITLE = `How to Use ResumeAtlas: Check Resume vs Job Description (Step by Step)${RESUME_ATLAS_TITLE_SUFFIX}`;

export const HOW_IT_WORKS_DESCRIPTION =
  "Step-by-step guide to checking your resume against a job description in ResumeAtlas: paste resume and JD, get ATS score and fix suggestions, use the dashboard as a checklist, iterate, and optionally save.";

export function buildHowItWorksPageMetadata(): Metadata {
  const absolutePageUrl = `${siteBase()}${HOW_IT_WORKS_PATH}`;
  const img = ogImage();
  return {
    title: { absolute: HOW_IT_WORKS_TITLE },
    description: HOW_IT_WORKS_DESCRIPTION,
    robots: { index: true, follow: true },
    alternates: { canonical: HOW_IT_WORKS_PATH },
    openGraph: {
      title: HOW_IT_WORKS_TITLE,
      description: HOW_IT_WORKS_DESCRIPTION,
      siteName: "ResumeAtlas",
      type: "website",
      url: absolutePageUrl,
      images: [
        {
          url: img,
          width: 1200,
          height: 630,
          alt: "How to use ResumeAtlas to check your resume against a job description",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "How to use ResumeAtlas: resume vs job description",
      description: HOW_IT_WORKS_DESCRIPTION,
      images: [img],
    },
  };
}
