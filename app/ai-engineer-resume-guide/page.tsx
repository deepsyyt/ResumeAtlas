import type { Metadata } from "next";
import { AiEngineerResumeGuidePage } from "@/app/components/AiEngineerResumeGuidePage";
import { AI_ENGINEER_RESUME_GUIDE } from "@/app/lib/aiEngineerResumeGuide";
import { absoluteCanonicalUrl } from "@/app/lib/searchIntentSeo";

export function generateMetadata(): Metadata {
  const canonicalAbs = absoluteCanonicalUrl(AI_ENGINEER_RESUME_GUIDE.path);
  return {
    title: AI_ENGINEER_RESUME_GUIDE.title,
    description: AI_ENGINEER_RESUME_GUIDE.description,
    alternates: { canonical: canonicalAbs },
    robots: { index: true, follow: true },
    openGraph: {
      title: AI_ENGINEER_RESUME_GUIDE.title,
      description: AI_ENGINEER_RESUME_GUIDE.description,
      url: canonicalAbs,
      siteName: "ResumeAtlas",
      type: "article",
    },
  };
}

export default function AiEngineerResumeGuideRoute() {
  return <AiEngineerResumeGuidePage />;
}
