import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProblemConversionPage } from "@/app/components/ProblemConversionPage";
import {
  PROBLEM_PAGES,
  PROBLEM_SLUGS,
  type ProblemSlug,
} from "@/app/lib/problemPages";

type PageParams = { slug: string };

const DEDICATED_PAGE_SLUGS = new Set<ProblemSlug>(["resume-not-getting-interviews"]);

export function generateStaticParams(): { slug: ProblemSlug }[] {
  return PROBLEM_SLUGS.filter((slug) => !DEDICATED_PAGE_SLUGS.has(slug)).map((slug) => ({
    slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: PageParams;
}): Metadata {
  const config = PROBLEM_PAGES[params.slug as ProblemSlug];
  if (!config) return {};
  return {
    title: config.metaTitle,
    description: config.metaDescription,
  };
}

export default function ProblemPage({ params }: { params: PageParams }) {
  const config = PROBLEM_PAGES[params.slug as ProblemSlug];
  if (!config) notFound();

  return <ProblemConversionPage config={config} />;
}
