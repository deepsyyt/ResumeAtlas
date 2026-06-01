import type { Metadata } from "next";
import { AltRoleKeywordsGuidePage } from "@/app/components/AltRoleKeywordsGuidePage";
import { getAltRoleKeywordConfig } from "@/app/lib/altRoleKeywordPages";
import { absoluteCanonicalUrl } from "@/app/lib/searchIntentSeo";

const SLUG = "systems-analyst" as const;

export function generateMetadata(): Metadata {
  const config = getAltRoleKeywordConfig(SLUG);
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

export default function SystemsAnalystResumeKeywordsPage() {
  return <AltRoleKeywordsGuidePage slug={SLUG} />;
}
