import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProblemConversionPage } from "@/app/components/ProblemConversionPage";
import {
  PROBLEM_PAGES,
  CANONICAL_PROBLEM_SLUGS,
  PROBLEM_REDIRECT_SOURCE_SLUGS,
  PROBLEM_SLUGS,
  type ProblemSlug,
} from "@/app/lib/problemPages";

type PageParams = { slug: string };

const DEDICATED_PAGE_SLUGS = new Set<ProblemSlug>(["resume-not-getting-interviews"]);
const REDIRECT_SOURCE_SET = new Set<string>(PROBLEM_REDIRECT_SOURCE_SLUGS);

export function generateStaticParams(): { slug: ProblemSlug }[] {
  return PROBLEM_SLUGS.filter(
    (slug) => !DEDICATED_PAGE_SLUGS.has(slug) && !REDIRECT_SOURCE_SET.has(slug)
  ).map((slug) => ({
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
  const hasExamples = Boolean(config.scenario?.before && config.scenario?.after);
  const isCanonical = (CANONICAL_PROBLEM_SLUGS as readonly string[]).includes(params.slug);
  const normalizedTitle = config.metaTitle.replace(/\s*\(Examples \+ Fixes\)\s*$/i, "").trim();
  return {
    title: hasExamples ? `${normalizedTitle} (Examples + Fixes)` : `${normalizedTitle} (Why + Fix)`,
    description: config.metaDescription,
    alternates: {
      canonical: `/problems/${params.slug}`,
    },
    ...(isCanonical ? {} : { robots: { index: false, follow: true } }),
  };
}

export default function ProblemPage({ params }: { params: PageParams }) {
  const config = PROBLEM_PAGES[params.slug as ProblemSlug];
  if (!config) notFound();

  return <ProblemConversionPage config={config} />;
}
