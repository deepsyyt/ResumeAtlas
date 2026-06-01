import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResumeExampleClusterPage } from "@/app/components/ResumeExampleClusterPage";
import {
  getResumeExampleClusterConfig,
  isResumeExampleClusterSlug,
  RESUME_EXAMPLE_CLUSTER_SLUGS,
  resumeExampleClusterPath,
  type ResumeExampleClusterSlug,
} from "@/app/lib/resumeExampleClusterPages";
import { absoluteCanonicalUrl } from "@/app/lib/searchIntentSeo";

type PageParams = { roleSlug: string };

export function generateStaticParams(): { roleSlug: ResumeExampleClusterSlug }[] {
  return RESUME_EXAMPLE_CLUSTER_SLUGS.map((roleSlug) => ({ roleSlug }));
}

export function generateMetadata({ params }: { params: PageParams }): Metadata {
  if (!isResumeExampleClusterSlug(params.roleSlug)) return {};
  const config = getResumeExampleClusterConfig(params.roleSlug);
  const canonicalPath = resumeExampleClusterPath(params.roleSlug);
  const canonicalAbs = absoluteCanonicalUrl(canonicalPath);
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
      type: "article",
    },
  };
}

export default function ResumeExampleClusterRoutePage({ params }: { params: PageParams }) {
  if (!isResumeExampleClusterSlug(params.roleSlug)) notFound();
  return <ResumeExampleClusterPage slug={params.roleSlug} />;
}
