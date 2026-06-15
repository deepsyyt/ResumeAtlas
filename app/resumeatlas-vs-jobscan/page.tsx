import type { Metadata } from "next";
import { CompetitorComparisonPage } from "@/app/components/competitor/CompetitorComparisonPage";
import {
  JOBSCAN_BENCHMARK_DISCLAIMER,
  JOBSCAN_COMPARISON_PATH,
  jobscanComparisonPageConfig,
} from "@/app/lib/competitorComparison/jobscanPageContent";
import { absoluteCanonicalUrl } from "@/app/lib/searchIntentSeo";

const config = jobscanComparisonPageConfig;

export const metadata: Metadata = {
  title: config.title,
  description: config.metaDescription,
  alternates: {
    canonical: JOBSCAN_COMPARISON_PATH,
  },
  openGraph: {
    title: config.title,
    description: config.metaDescription,
    url: absoluteCanonicalUrl(JOBSCAN_COMPARISON_PATH),
    siteName: "ResumeAtlas",
    type: "article",
  },
  robots: { index: true, follow: true },
};

export default function ResumeAtlasVsJobscanPage() {
  return (
    <CompetitorComparisonPage config={config} benchmarkDisclaimer={JOBSCAN_BENCHMARK_DISCLAIMER} />
  );
}
