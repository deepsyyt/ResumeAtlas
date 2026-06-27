import type { Metadata } from "next";
import { CompetitorComparisonPage } from "@/app/components/competitor/CompetitorComparisonPage";
import {
  KICKRESUME_BENCHMARK_DISCLAIMER,
  KICKRESUME_COMPARISON_PATH,
  kickresumeComparisonPageConfig,
} from "@/app/lib/competitorComparison/kickresumePageContent";
import { absoluteCanonicalUrl } from "@/app/lib/searchIntentSeo";

const config = kickresumeComparisonPageConfig;

export const metadata: Metadata = {
  title: config.title,
  description: config.metaDescription,
  alternates: {
    canonical: KICKRESUME_COMPARISON_PATH,
  },
  openGraph: {
    title: config.title,
    description: config.metaDescription,
    url: absoluteCanonicalUrl(KICKRESUME_COMPARISON_PATH),
    siteName: "ResumeAtlas",
    type: "article",
  },
  robots: { index: true, follow: true },
};

export default function ResumeAtlasVsKickresumePage() {
  return (
    <CompetitorComparisonPage config={config} benchmarkDisclaimer={KICKRESUME_BENCHMARK_DISCLAIMER} />
  );
}
