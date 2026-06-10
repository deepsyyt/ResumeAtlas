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
      "Resume match score and ATS match score",
      "Resume keyword gap analysis and missing keywords",
      "Tailor resume to job description with AI optimization",
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
