import type { Metadata } from "next";
import { InterviewClusterArticlePage } from "@/app/components/interviewCluster/InterviewClusterArticlePage";
import {
  HOW_RECRUITERS_EVALUATE_PATH,
  howRecruitersEvaluateConfig,
} from "@/app/lib/interviewCluster/howRecruitersEvaluateContent";
import { absoluteCanonicalUrl } from "@/app/lib/searchIntentSeo";

const config = howRecruitersEvaluateConfig;

export const metadata: Metadata = {
  title: config.title,
  description: config.metaDescription,
  alternates: { canonical: HOW_RECRUITERS_EVALUATE_PATH },
  openGraph: {
    title: config.title,
    description: config.metaDescription,
    url: absoluteCanonicalUrl(HOW_RECRUITERS_EVALUATE_PATH),
    siteName: "ResumeAtlas",
    type: "article",
  },
  robots: { index: true, follow: true },
};

export default function HowRecruitersEvaluatePage() {
  return <InterviewClusterArticlePage config={config} />;
}
