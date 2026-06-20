import type { Metadata } from "next";
import { CompetitorComparisonPage } from "@/app/components/competitor/CompetitorComparisonPage";
import {
  TEAL_BENCHMARK_DISCLAIMER,
  TEAL_COMPARISON_PATH,
  tealComparisonPageConfig,
} from "@/app/lib/competitorComparison/tealPageContent";
import { absoluteCanonicalUrl } from "@/app/lib/searchIntentSeo";

const config = tealComparisonPageConfig;

export const metadata: Metadata = {
  title: config.title,
  description: config.metaDescription,
  alternates: {
    canonical: TEAL_COMPARISON_PATH,
  },
  openGraph: {
    title: config.title,
    description: config.metaDescription,
    url: absoluteCanonicalUrl(TEAL_COMPARISON_PATH),
    siteName: "ResumeAtlas",
    type: "article",
  },
  robots: { index: true, follow: true },
};

export default function ResumeAtlasVsTealPage() {
  return (
    <CompetitorComparisonPage config={config} benchmarkDisclaimer={TEAL_BENCHMARK_DISCLAIMER} />
  );
}
