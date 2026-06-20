import type { Metadata } from "next";
import { InterviewClusterArticlePage } from "@/app/components/interviewCluster/InterviewClusterArticlePage";
import {
  SKILLS_LISTED_NOT_PROVEN_PATH,
  skillsListedNotProvenConfig,
} from "@/app/lib/interviewCluster/skillsListedNotProvenContent";
import { absoluteCanonicalUrl } from "@/app/lib/searchIntentSeo";

const config = skillsListedNotProvenConfig;

export const metadata: Metadata = {
  title: config.title,
  description: config.metaDescription,
  alternates: { canonical: SKILLS_LISTED_NOT_PROVEN_PATH },
  openGraph: {
    title: config.title,
    description: config.metaDescription,
    url: absoluteCanonicalUrl(SKILLS_LISTED_NOT_PROVEN_PATH),
    siteName: "ResumeAtlas",
    type: "article",
  },
  robots: { index: true, follow: true },
};

export default function SkillsListedNotProvenPage() {
  return <InterviewClusterArticlePage config={config} />;
}
