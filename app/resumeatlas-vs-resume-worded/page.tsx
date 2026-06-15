import type { Metadata } from "next";
import { CompetitorComparisonPage } from "@/app/components/competitor/CompetitorComparisonPage";
import {
  RESUME_WORDED_BENCHMARK_DISCLAIMER,
  RESUME_WORDED_COMPARISON_PATH,
  resumeWordedComparisonPageConfig,
} from "@/app/lib/competitorComparison/resumeWordedPageContent";
import { absoluteCanonicalUrl } from "@/app/lib/searchIntentSeo";

const config = resumeWordedComparisonPageConfig;

export const metadata: Metadata = {
  title: config.title,
  description: config.metaDescription,
  alternates: {
    canonical: RESUME_WORDED_COMPARISON_PATH,
  },
  openGraph: {
    title: config.title,
    description: config.metaDescription,
    url: absoluteCanonicalUrl(RESUME_WORDED_COMPARISON_PATH),
    siteName: "ResumeAtlas",
    type: "article",
  },
  robots: { index: true, follow: true },
};

export default function ResumeAtlasVsResumeWordedPage() {
  return (
    <CompetitorComparisonPage
      config={config}
      benchmarkDisclaimer={RESUME_WORDED_BENCHMARK_DISCLAIMER}
    />
  );
}
