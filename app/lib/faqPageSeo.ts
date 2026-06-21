import type { Metadata } from "next";
import { CONTENT_FRESHNESS_YEAR } from "@/app/lib/contentFreshness";
import { RESUME_ATLAS_TITLE_SUFFIX } from "@/app/lib/searchIntentSeo";
import { getSiteUrl } from "@/app/lib/siteUrl";

const siteBase = () => getSiteUrl().replace(/\/$/, "");
const ogImage = () => `${siteBase()}/og-resume-checker.png`;

export const FAQ_PAGE_PATH = "/faq" as const;

export const FAQ_PAGE_KEYWORDS = [
  "ai resume optimization",
  "optimize resume for job description",
  "check resume against job description",
  "compare resume to job description",
  "resume not getting interviews",
  "why am i not getting interviews",
  "ats resume checker",
  "free ats resume checker",
  "resume jd match",
  "resume gap analysis",
  "keyword gap analysis",
  "evidence match resume",
  "tailor resume to job description",
  "resume keyword scanner",
] as const;

export const FAQ_PAGE_TITLE_ABSOLUTE =
  `AI Resume Optimization FAQ: Check Resume vs Job Description & ATS Checker (${CONTENT_FRESHNESS_YEAR})${RESUME_ATLAS_TITLE_SUFFIX}`;

export const FAQ_PAGE_DESCRIPTION =
  "Answers on application verdict, unproven skills, elimination risks, and job-specific fixes when checking your resume against a job description. ResumeAtlas FAQ.";

export const FAQ_PAGE_OG_TITLE =
  `Apply-Readiness & Resume vs Job Description FAQ (${CONTENT_FRESHNESS_YEAR})${RESUME_ATLAS_TITLE_SUFFIX}`;

export const FAQ_PAGE_OG_DESCRIPTION =
  "Application verdict, unproven skills, elimination risks, and recommended fixes before you apply. Answers on checking resume vs job description.";

export const FAQ_PAGE_TWITTER_TITLE = "Apply-readiness FAQ: application verdict, unproven skills, elimination risks";

export const FAQ_PAGE_TWITTER_DESCRIPTION =
  "Application verdict, unproven skills, elimination risks, and job-specific fixes. ResumeAtlas FAQ.";

/** Visible H1 support copy (not the HTML title tag). */
export const FAQ_PAGE_HERO_INTRO =
  "Answers on AI resume optimization, checking your resume against a job description, ATS resume checker scores, why you're not getting interviews, and how to close proof gaps before you apply.";

export function buildFaqPageMetadata(): Metadata {
  const absolutePageUrl = `${siteBase()}${FAQ_PAGE_PATH}`;
  const img = ogImage();
  return {
    title: { absolute: FAQ_PAGE_TITLE_ABSOLUTE },
    description: FAQ_PAGE_DESCRIPTION,
    keywords: [...FAQ_PAGE_KEYWORDS],
    robots: { index: false, follow: true },
    alternates: { canonical: FAQ_PAGE_PATH },
    openGraph: {
      title: FAQ_PAGE_OG_TITLE,
      description: FAQ_PAGE_OG_DESCRIPTION,
      siteName: "ResumeAtlas",
      type: "website",
      url: absolutePageUrl,
      images: [
        {
          url: img,
          width: 1200,
          height: 630,
          alt: "ResumeAtlas FAQ: AI resume optimization and job description match",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: FAQ_PAGE_TWITTER_TITLE,
      description: FAQ_PAGE_TWITTER_DESCRIPTION,
      images: [img],
    },
  };
}
