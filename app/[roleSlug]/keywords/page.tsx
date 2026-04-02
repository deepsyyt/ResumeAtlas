import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RoleKeywordsGuidePage from "@/app/components/RoleKeywordsGuidePage";
import { KEYWORD_PAGES, type RoleSlug } from "@/app/lib/seoPages";

type PageParams = { roleSlug: RoleSlug };

export function generateMetadata({ params }: { params: PageParams }): Metadata {
  const config = KEYWORD_PAGES[params.roleSlug];
  if (!config) return {};
  return {
    title: `Top Missing Keywords in ${config.roleName} Resumes (Check Yours) | ResumeAtlas`,
    description: `Top missing keywords in ${config.roleName.toLowerCase()} resumes: compare JD vs resume wording, close role-specific gaps, and improve ATS keyword coverage.`,
    alternates: {
      canonical: `/${params.roleSlug}-resume-keywords`,
    },
  };
}

export default function RoleKeywordsHubPage({ params }: { params: PageParams }) {
  if (!KEYWORD_PAGES[params.roleSlug]) notFound();
  return <RoleKeywordsGuidePage params={{ role: params.roleSlug }} />;
}
