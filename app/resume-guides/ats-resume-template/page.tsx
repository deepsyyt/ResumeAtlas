import type { Metadata } from "next";
import { ATS_RESUME_TEMPLATE_GUIDE_PATH } from "@/app/lib/internalLinks";
import { CLUSTER_ATS_GUIDE_METADATA } from "@/app/lib/canonicalIntentClusters";
import { AtsResumeTemplateGuide } from "./atsResumeTemplateGuide";

const g = CLUSTER_ATS_GUIDE_METADATA;

export const metadata: Metadata = {
  title: g.title,
  description: g.description,
  keywords: [
    "ATS resume template",
    "ATS resume format",
    "best resume format for ATS",
    "ATS CV template",
    "resume template ATS",
    "applicant tracking system resume template",
    "scannable resume template",
    "ATS resume examples",
    "resume format for ATS",
    "ATS optimized resume",
    "resume formatting for ATS",
    "resume templates for ATS systems",
    "ATS resume design",
  ],
  alternates: {
    canonical: ATS_RESUME_TEMPLATE_GUIDE_PATH,
  },
  openGraph: {
    title: g.ogTitle,
    description: g.ogDescription,
    type: "article",
    url: g.openGraphUrl,
    siteName: "ResumeAtlas",
  },
};

export default function AtsResumeTemplatePage() {
  return <AtsResumeTemplateGuide />;
}
