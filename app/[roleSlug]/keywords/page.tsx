import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RoleKeywordsGuidePage from "@/app/components/RoleKeywordsGuidePage";
import { KEYWORD_PAGES, type RoleSlug } from "@/app/lib/seoPages";
import {
  absoluteCanonicalUrl,
  roleResumeKeywordsHubMeta,
  roleResumeKeywordsPath,
} from "@/app/lib/searchIntentSeo";

type PageParams = { roleSlug: RoleSlug };

export function generateMetadata({ params }: { params: PageParams }): Metadata {
  const config = KEYWORD_PAGES[params.roleSlug];
  if (!config) return {};
  const { title, description } = roleResumeKeywordsHubMeta(params.roleSlug);
  const path = roleResumeKeywordsPath(params.roleSlug);
  const canonicalAbs = absoluteCanonicalUrl(path);
  return {
    title,
    description,
    alternates: { canonical: canonicalAbs },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonicalAbs,
      siteName: "ResumeAtlas",
      type: "website",
    },
  };
}

export default function RoleKeywordsHubPage({ params }: { params: PageParams }) {
  if (!KEYWORD_PAGES[params.roleSlug]) notFound();
  return <RoleKeywordsGuidePage params={{ role: params.roleSlug }} />;
}
