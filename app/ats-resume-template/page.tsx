import type { Metadata } from "next";
import { ATS_RESUME_TEMPLATE_GUIDE_PATH } from "@/app/lib/internalLinks";
import { CLUSTER_ATS_GUIDE_METADATA } from "@/app/lib/canonicalIntentClusters";
import { AtsResumeTemplateGuide } from "@/app/resume-guides/ats-resume-template/atsResumeTemplateGuide";

const g = CLUSTER_ATS_GUIDE_METADATA;

export const metadata: Metadata = {
  title: g.title,
  description: g.description,
  keywords: [
    "free ATS resume template",
    "ATS resume template free download",
    "google docs ATS resume template",
    "ATS friendly resume template",
    "ATS resume template",
    "ATS resume format",
    "resume format for ATS",
    "ATS CV template",
    "applicant tracking system resume template",
    "scannable resume template",
    "resume template ATS",
    "ATS resume examples",
  ],
  alternates: {
    canonical: ATS_RESUME_TEMPLATE_GUIDE_PATH,
  },
  openGraph: {
    title: g.title,
    description: g.description,
    type: "article",
    url: g.openGraphUrl,
    siteName: "ResumeAtlas",
  },
};

export default function AtsResumeTemplateCanonicalPage() {
  return <AtsResumeTemplateGuide />;
}
