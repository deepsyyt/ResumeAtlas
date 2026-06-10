import { HOME_PAGE_DESCRIPTION } from "@/app/lib/homePageSeo";
import { getSiteUrl } from "@/app/lib/siteUrl";

const siteBase = () => getSiteUrl().replace(/\/$/, "");

/** Homepage category hub — AI/ATS checker and resume optimizer (not JD-compare SERP). */
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
      "Free AI resume checker",
      "ATS resume checker and compatibility scan",
      "Resume keyword scanner",
      "ATS keyword matching",
      "AI resume optimizer and bullet rewrites",
      "Edit and export PDF or DOCX",
    ],
  };
}
