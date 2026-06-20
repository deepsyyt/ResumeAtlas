import type { Metadata } from "next";
import { ResumeNotGettingInterviewsHub } from "@/app/components/interviewCluster/ResumeNotGettingInterviewsHub";
import { PROBLEM_PAGES } from "@/app/lib/problemPages";
import { RESUME_NOT_GETTING_INTERVIEWS_PATH } from "@/app/lib/interviewCluster/paths";
import { getSiteUrl } from "@/app/lib/siteUrl";

const config = PROBLEM_PAGES["resume-not-getting-interviews"];

export const metadata: Metadata = {
  title: config.metaTitle,
  description: config.metaDescription,
  robots: { index: true, follow: true },
  alternates: {
    canonical: `${getSiteUrl().replace(/\/$/, "")}${RESUME_NOT_GETTING_INTERVIEWS_PATH}`,
  },
};

export default function ResumeNotGettingInterviewsPage() {
  return <ResumeNotGettingInterviewsHub />;
}
