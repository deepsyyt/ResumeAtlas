import type { Metadata } from "next";
import { PilotKeywordsGuidePage } from "@/app/components/PilotKeywordsGuidePage";
import { getPilotKeywordConfig } from "@/app/lib/pilotKeywordPages";
import { absoluteCanonicalUrl } from "@/app/lib/searchIntentSeo";

const SLUG = "python-developer" as const;

export function generateMetadata(): Metadata {
  const config = getPilotKeywordConfig(SLUG);
  const canonicalAbs = absoluteCanonicalUrl(config.path);
  return {
    title: config.title,
    description: config.description,
    alternates: { canonical: canonicalAbs },
    robots: { index: true, follow: true },
    openGraph: {
      title: config.title,
      description: config.description,
      url: canonicalAbs,
      siteName: "ResumeAtlas",
      type: "website",
    },
  };
}

export default function PythonDeveloperResumeKeywordsPage() {
  return <PilotKeywordsGuidePage slug={SLUG} />;
}
