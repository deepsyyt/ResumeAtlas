import { getSiteUrl } from "@/app/lib/siteUrl";
import type { RoleOptimizerContent } from "@/app/lib/roleOptimizerContent";
import { OPTIMIZE_HUB_CONTENT, OPTIMIZE_HUB_PATH } from "@/app/lib/roleOptimizerContent";

const siteBase = () => getSiteUrl().replace(/\/$/, "");
const abs = (path: string) => `${siteBase()}${path.startsWith("/") ? path : `/${path}`}`;

export function optimizeHubBreadcrumbJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: abs("/") },
      {
        "@type": "ListItem",
        position: 2,
        name: "Optimize resume for job description",
        item: abs(OPTIMIZE_HUB_PATH),
      },
    ],
  };
}

export function roleOptimizerBreadcrumbJsonLd(role: RoleOptimizerContent) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: abs("/") },
      {
        "@type": "ListItem",
        position: 2,
        name: "Optimize resume for job description",
        item: abs(OPTIMIZE_HUB_PATH),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: role.roleName,
        item: abs(role.path),
      },
    ],
  };
}

export function optimizeHubWebApplicationJsonLd() {
  const hub = OPTIMIZE_HUB_CONTENT;
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: hub.webAppName,
    url: abs(OPTIMIZE_HUB_PATH),
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    description: hub.webAppDescription,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
}

export function roleOptimizerWebApplicationJsonLd(role: RoleOptimizerContent) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${role.roleName} resume optimizer`,
    url: abs(role.path),
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    description: role.description,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
}

export function optimizerFaqJsonLd(items: readonly { question: string; answer: string }[]) {
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
