import type { Metadata } from "next";
import { RoleSeoHubPage } from "@/app/components/RoleSeoHubPage";
import {
  CLUSTER_RESUME_GUIDES_INDEX_METADATA,
  getResumeGuidesHubItems,
  RESUME_GUIDES_HUB_PATH,
} from "@/app/lib/seoHubPages";
import { absoluteCanonicalUrl } from "@/app/lib/searchIntentSeo";
import { CONTENT_FRESHNESS_YEAR } from "@/app/lib/contentFreshness";

const meta = CLUSTER_RESUME_GUIDES_INDEX_METADATA;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: absoluteCanonicalUrl(RESUME_GUIDES_HUB_PATH) },
  robots: { index: true, follow: true },
  openGraph: {
    title: meta.ogTitle,
    description: meta.ogDescription,
    url: absoluteCanonicalUrl(RESUME_GUIDES_HUB_PATH),
    siteName: "ResumeAtlas",
    type: "website",
  },
};

export default function ResumeGuidesHubPage() {
  return (
    <RoleSeoHubPage
      hubPath={RESUME_GUIDES_HUB_PATH}
      hubTitle="Resume Guides"
      h1={`Resume Guides by Role (${CONTENT_FRESHNESS_YEAR})`}
      hubDescription={meta.description}
      items={getResumeGuidesHubItems()}
      listHeading="Section-by-section resume guides"
    />
  );
}
