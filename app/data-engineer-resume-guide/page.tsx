import type { Metadata } from "next";
import { DataEngineerResumeGuidePage } from "@/app/components/DataEngineerResumeGuidePage";
import { DATA_ENGINEER_RESUME_GUIDE } from "@/app/lib/dataEngineerResumeGuide";
import { absoluteCanonicalUrl } from "@/app/lib/searchIntentSeo";

export function generateMetadata(): Metadata {
  const canonicalAbs = absoluteCanonicalUrl(DATA_ENGINEER_RESUME_GUIDE.path);
  return {
    title: DATA_ENGINEER_RESUME_GUIDE.title,
    description: DATA_ENGINEER_RESUME_GUIDE.description,
    alternates: { canonical: canonicalAbs },
    robots: { index: true, follow: true },
    openGraph: {
      title: DATA_ENGINEER_RESUME_GUIDE.title,
      description: DATA_ENGINEER_RESUME_GUIDE.description,
      url: canonicalAbs,
      siteName: "ResumeAtlas",
      type: "article",
    },
  };
}

export default function DataEngineerResumeGuideRoute() {
  return <DataEngineerResumeGuidePage />;
}
