import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { ProblemConversionPage } from "@/app/components/ProblemConversionPage";
import {
  PROBLEM_PAGES,
  INDEXED_PROBLEM_SLUGS,
  PROBLEM_REDIRECT_SOURCE_SLUGS,
  PROBLEM_SLUGS,
  type ProblemSlug,
} from "@/app/lib/problemPages";
import { getSiteUrl } from "@/app/lib/siteUrl";

type PageParams = { slug: string };

const DEDICATED_PAGE_SLUGS = new Set<ProblemSlug>(["resume-not-getting-interviews"]);
const REDIRECT_SOURCE_SET = new Set<string>(PROBLEM_REDIRECT_SOURCE_SLUGS);
const LEGACY_PROBLEM_REDIRECTS: Record<string, string> = {
  "why-am-i-not-getting-interviews": "/problems/resume-not-getting-interviews",
  "applied-to-200-jobs-no-response": "/problems/no-response-after-applying",
  "resume-not-passing-ats": "/problems/ats-rejecting-my-resume",
  "how-to-tailor-resume-to-job-description": "/problems/resume-vs-job-description",
  "why-recruiters-ignore-resume": "/problems/resume-not-getting-interviews",
};

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
  const isIndexedProblem = (INDEXED_PROBLEM_SLUGS as readonly string[]).includes(params.slug);
  const siteUrl = getSiteUrl().replace(/\/$/, "");
  const path = `/problems/${params.slug}`;
  return {
    title: config.metaTitle,
    description: config.metaDescription,
    alternates: {
      canonical: `${siteUrl}${path}`,
    },
    ...(isIndexedProblem
      ? { robots: { index: true, follow: true } as const }
      : { robots: { index: false, follow: true } as const }),
  };
}

export default function ProblemPage({ params }: { params: PageParams }) {
  const legacyTarget = LEGACY_PROBLEM_REDIRECTS[params.slug];
  if (legacyTarget) {
    permanentRedirect(legacyTarget);
  }

  const config = PROBLEM_PAGES[params.slug as ProblemSlug];
  if (!config) notFound();

  return <ProblemConversionPage config={config} />;
}
