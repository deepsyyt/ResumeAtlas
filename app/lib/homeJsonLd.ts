import { HOME_PAGE_DESCRIPTION } from "@/app/lib/homePageSeo";
import { getSiteUrl } from "@/app/lib/siteUrl";

const siteBase = () => getSiteUrl().replace(/\/$/, "");

/** Homepage category hub — AI checker and optimizer (ATS checker SERP: `/ats-resume-checker`). */
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
      "ATS compatibility and parsing check",
      "Resume vs job description matching",
      "ATS keyword matching",
      "AI resume optimizer and bullet rewrites",
      "Edit and export PDF or DOCX",
    ],
  };
}
