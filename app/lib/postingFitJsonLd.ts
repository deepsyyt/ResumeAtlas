import type { ToolClusterPageConfig } from "@/app/lib/toolClusterPages";
import { toolClusterAbsoluteUrl } from "@/app/lib/toolClusterPages";
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
  const features = [
    "ATS match score for a pasted job description",
    "Resume keyword gap analysis and missing keywords",
    "Resume JD match and skill gap readout",
    "AI resume optimization and bullet tailoring",
  ];
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "ResumeAtlas compare and optimize for job descriptions",
    url: toolClusterAbsoluteUrl(config.path),
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    description:
      "Compare resume to job description: ATS match score, resume JD match, keyword gap analysis, missing keywords, and AI resume optimization for that posting.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: features,
  };
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
