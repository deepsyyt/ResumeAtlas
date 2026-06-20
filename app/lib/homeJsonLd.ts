import { HOME_PAGE_DESCRIPTION } from "@/app/lib/homePageSeo";
import { getSiteUrl } from "@/app/lib/siteUrl";

const siteBase = () => getSiteUrl().replace(/\/$/, "");

/** Homepage — compare/ATS SEO + apply-readiness product. */
export function homeWebApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "ResumeAtlas",
    url: `${siteBase()}/`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    description: HOME_PAGE_DESCRIPTION,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "Compare resume to job description",
      "ATS score and keyword coverage",
      "Application verdict and shortlist odds",
      "Elimination risks and recommended fixes",
      "Skill proof map — listed vs proven in bullets",
      "Job-specific resume optimization and download",
    ],
  };
}
