import type { Metadata } from "next";
import { RoleSeoHubPage } from "@/app/components/RoleSeoHubPage";
import {
  CLUSTER_RESUME_KEYWORDS_INDEX_METADATA,
  getResumeKeywordsHubSections,
  RESUME_KEYWORDS_HUB_PATH,
} from "@/app/lib/seoHubPages";
import { absoluteCanonicalUrl } from "@/app/lib/searchIntentSeo";
import { CONTENT_FRESHNESS_YEAR } from "@/app/lib/contentFreshness";

const meta = CLUSTER_RESUME_KEYWORDS_INDEX_METADATA;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: absoluteCanonicalUrl(RESUME_KEYWORDS_HUB_PATH) },
  robots: { index: true, follow: true },
  openGraph: {
    title: meta.ogTitle,
    description: meta.ogDescription,
    url: absoluteCanonicalUrl(RESUME_KEYWORDS_HUB_PATH),
    siteName: "ResumeAtlas",
    type: "website",
  },
};

export default function ResumeKeywordsHubPage() {
  return (
    <RoleSeoHubPage
      hubPath={RESUME_KEYWORDS_HUB_PATH}
      hubTitle="Resume Keywords"
      h1={`Resume Keywords by Role (${CONTENT_FRESHNESS_YEAR})`}
      hubDescription={meta.description}
      sections={getResumeKeywordsHubSections()}
    />
  );
}
