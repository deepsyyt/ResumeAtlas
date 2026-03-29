import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RoleKeywordsGuidePage from "@/app/components/RoleKeywordsGuidePage";
import { KEYWORD_PAGES, type RoleSlug } from "@/app/lib/seoPages";

type PageParams = { roleSlug: RoleSlug };

export function generateMetadata({ params }: { params: PageParams }): Metadata {
  const config = KEYWORD_PAGES[params.roleSlug];
  if (!config) return {};
  return {
    title: `${config.roleName} Resume Keywords (Complete Guide) | ResumeAtlas`,
    description: `${config.metaDescription} Full guide to keyword categories, examples, and placement.`,
    alternates: {
      canonical: `/${params.roleSlug}/keywords`,
    },
  };
}

export default function RoleKeywordsHubPage({ params }: { params: PageParams }) {
  if (!KEYWORD_PAGES[params.roleSlug]) notFound();
  return <RoleKeywordsGuidePage params={{ role: params.roleSlug }} />;
}
