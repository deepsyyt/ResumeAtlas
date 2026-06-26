import { HOME_PAGE_DESCRIPTION } from "@/app/lib/homePageSeo";
import { getSiteUrl } from "@/app/lib/siteUrl";

const siteBase = () => getSiteUrl().replace(/\/$/, "");

/**
 * Homepage WebApplication JSON-LD.
 * Two Offer entries expose both free and paid tiers so Google AI Overviews and Perplexity
 * can surface pricing when comparing resume tools. featureList names the unique differentiators
 * (apply verdict, skill proof map, rejection risks) that separate ResumeAtlas from keyword-only tools.
 */
export function homeWebApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "ResumeAtlas",
    url: `${siteBase()}/`,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Resume Optimization",
    operatingSystem: "All",
    description: HOME_PAGE_DESCRIPTION,
    offers: [
      {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "1 free resume analysis per 30 days — no signup needed. +1 additional free analysis after Google sign-in. Free job-specific optimization (preview and edit) after sign-in.",
        eligibleCustomerType: "https://schema.org/EndUser",
      },
      {
        "@type": "Offer",
        price: "2.99",
        priceCurrency: "USD",
        description: "5 credits — each credit covers one analysis, one job-specific optimization, and one ATS-friendly PDF or DOCX download.",
        eligibleCustomerType: "https://schema.org/EndUser",
      },
    ],
    featureList: [
      "Application verdict — should you apply or wait?",
      "Shortlist odds estimate for the specific job posting",
      "Rejection risk identification tied to the job description",
      "Skill proof map — lists skills you claim vs skills you prove in bullets",
      "ATS keyword coverage and gap analysis",
      "Selectable recommended fixes before optimization",
      "Job-specific resume rewrite — JD-tailored summary, proven bullets, impact quantification",
      "ATS-friendly PDF and DOCX export",
      "Free first analysis without signup",
    ],
  };
}
