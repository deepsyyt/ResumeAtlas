import type { ToolClusterPageConfig } from "@/app/lib/toolClusterPages";
import { toolClusterAbsoluteUrl } from "@/app/lib/toolClusterPages";
import { CHECK_RESUME_AGAINST_JD_PATH } from "@/app/lib/internalLinks";
import {
  DIAGNOSTIC_PRIMITIVES,
  DIAGNOSTIC_REGISTRY_VERSION,
} from "@/app/lib/diagnostics/primitiveRegistry";

const LIST_ITEM = "https://schema.org/ListItem";

export function postingFitWorkbenchBreadcrumbJsonLd() {
  const base = toolClusterAbsoluteUrl(CHECK_RESUME_AGAINST_JD_PATH);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": LIST_ITEM, position: 1, name: "Home", item: toolClusterAbsoluteUrl("/") },
      {
        "@type": LIST_ITEM,
        position: 2,
        name: "Resume keyword scanner",
        item: base,
      },
    ],
  };
}

export function postingFitWebApplicationJsonLd(config: ToolClusterPageConfig) {
  const features = DIAGNOSTIC_PRIMITIVES.map((p) => ({
    "@type": "Thing",
    name: p.label,
    description: p.shortDefinition,
  }));
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "ResumeAtlas resume keyword scanner",
    url: toolClusterAbsoluteUrl(config.path),
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    description:
      "Compare a resume to a job posting for posting vocabulary coverage, required skill debt, semantic fit, evidence density, parse hygiene, skim friction, and truth-envelope alignment.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: features,
    softwareVersion: DIAGNOSTIC_REGISTRY_VERSION,
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
