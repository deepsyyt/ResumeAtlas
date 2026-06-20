import type { Metadata } from "next";
import { InterviewClusterArticlePage } from "@/app/components/interviewCluster/InterviewClusterArticlePage";
import {
  ALREADY_HAVE_SKILLS_PATH,
  alreadyHaveSkillsConfig,
} from "@/app/lib/interviewCluster/alreadyHaveSkillsContent";
import { absoluteCanonicalUrl } from "@/app/lib/searchIntentSeo";

const config = alreadyHaveSkillsConfig;

export const metadata: Metadata = {
  title: config.title,
  description: config.metaDescription,
  alternates: { canonical: ALREADY_HAVE_SKILLS_PATH },
  openGraph: {
    title: config.title,
    description: config.metaDescription,
    url: absoluteCanonicalUrl(ALREADY_HAVE_SKILLS_PATH),
    siteName: "ResumeAtlas",
    type: "article",
  },
  robots: { index: true, follow: true },
};

export default function AlreadyHaveSkillsPage() {
  return <InterviewClusterArticlePage config={config} />;
}
