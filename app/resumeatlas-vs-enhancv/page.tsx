import type { Metadata } from "next";
import { CompetitorComparisonPage } from "@/app/components/competitor/CompetitorComparisonPage";
import {
  ENHANCV_BENCHMARK_DISCLAIMER,
  ENHANCV_COMPARISON_PATH,
  enhancvComparisonPageConfig,
} from "@/app/lib/competitorComparison/enhancvPageContent";
import { absoluteCanonicalUrl } from "@/app/lib/searchIntentSeo";

const config = enhancvComparisonPageConfig;

export const metadata: Metadata = {
  title: config.title,
  description: config.metaDescription,
  alternates: {
    canonical: ENHANCV_COMPARISON_PATH,
  },
  openGraph: {
    title: config.title,
    description: config.metaDescription,
    url: absoluteCanonicalUrl(ENHANCV_COMPARISON_PATH),
    siteName: "ResumeAtlas",
    type: "article",
  },
  robots: { index: true, follow: true },
};

export default function ResumeAtlasVsEnhancvPage() {
  return (
    <CompetitorComparisonPage config={config} benchmarkDisclaimer={ENHANCV_BENCHMARK_DISCLAIMER} />
  );
}
