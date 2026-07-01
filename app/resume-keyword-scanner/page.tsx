import { ResumeKeywordScannerLanding } from "@/app/components/ResumeKeywordScannerLanding";
import {
  TOOL_CLUSTER_KEYWORD_SCANNER,
  buildToolClusterMetadata,
} from "@/app/lib/toolClusterPages";
import { getSiteUrl } from "@/app/lib/siteUrl";

export const metadata = buildToolClusterMetadata(TOOL_CLUSTER_KEYWORD_SCANNER);

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Resume Keyword Scanner",
  applicationCategory: "BusinessApplication",
  operatingSystem: "All",
  url: `${getSiteUrl().replace(/\/$/, "")}/resume-keyword-scanner`,
  description:
    "Free resume keyword scanner: paste your resume and a job description to instantly find missing ATS keywords, weak coverage, and skill gaps vs the posting.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  provider: {
    "@type": "Organization",
    name: "ResumeAtlas",
    url: getSiteUrl(),
  },
};

export default function ResumeKeywordScannerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <ResumeKeywordScannerLanding />
    </>
  );
}
