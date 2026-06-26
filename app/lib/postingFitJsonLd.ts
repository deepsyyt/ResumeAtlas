import type { ToolClusterPageConfig } from "@/app/lib/toolClusterPages";
import { toolClusterAbsoluteUrl, toolClusterWebApplicationSchema } from "@/app/lib/toolClusterPages";
import { CHECK_RESUME_AGAINST_JD_PATH, HOME_MARKETING_PATH } from "@/app/lib/internalLinks";
import { getSiteUrl } from "@/app/lib/siteUrl";

const siteBase = () => getSiteUrl().replace(/\/$/, "");

const LIST_ITEM = "https://schema.org/ListItem";

export function postingFitWorkbenchBreadcrumbJsonLd() {
  const toolUrl = toolClusterAbsoluteUrl(CHECK_RESUME_AGAINST_JD_PATH);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": LIST_ITEM,
        position: 1,
        name: "ResumeAtlas",
        item: `${siteBase()}${HOME_MARKETING_PATH}`,
      },
      {
        "@type": LIST_ITEM,
        position: 2,
        name: "Compare resume to job description",
        item: toolUrl,
      },
    ],
  };
}

export function postingFitWebApplicationJsonLd(config: ToolClusterPageConfig) {
  return toolClusterWebApplicationSchema(config, {
    featureList: [
      "Compare resume to job description",
      "Application verdict and elimination risks",
      "Proven vs weak skills and missing requirements",
      "Job-specific resume optimization and download",
    ],
  });
}

export function postingFitFaqJsonLd(
  items: readonly { question: string; answer: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function postingFitHowToJsonLd(): Record<string, unknown> {
  const toolUrl = toolClusterAbsoluteUrl(CHECK_RESUME_AGAINST_JD_PATH);
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to compare your resume to a job description",
    description:
      "Paste your resume and a job description to get an apply/hold verdict, shortlist odds, rejection risks, and job-specific optimization in 60 seconds.",
    url: toolUrl,
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Paste your resume",
        text: "Copy your resume text or upload a PDF into the resume field on ResumeAtlas.",
        url: `${toolUrl}#ats-checker-form`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Paste the job description",
        text: "Copy the full job posting — role, requirements, and responsibilities — into the job description field.",
        url: `${toolUrl}#ats-checker-form`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Get your application verdict",
        text: "ResumeAtlas returns an apply or hold verdict, shortlist probability, rejection risks tied to the posting, and a skill proof map showing skills you claim vs. skills you prove in your bullets.",
        url: toolUrl,
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Optimize and download",
        text: "Review selectable fixes, run job-specific optimization to rewrite your resume for the posting, then download an ATS-friendly PDF or DOCX.",
        url: toolUrl,
      },
    ],
  };
}
