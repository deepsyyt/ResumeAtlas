export type JdGuideSection = {
  id: string;
  title: string;
  navLabel: string;
};

/** One section per distinct intent; legacy fragment ids live inside merged sections. */
export const JD_GUIDE_SECTIONS: readonly JdGuideSection[] = [
  {
    id: "compare-resume-jd",
    title: "Compare resume to job description or job posting",
    navLabel: "Compare",
  },
  {
    id: "resume-gap-analysis",
    title: "Resume gap analysis and keyword gaps",
    navLabel: "Gaps & keywords",
  },
  {
    id: "job-description-analysis",
    title: "Job description analysis: what recruiters look for",
    navLabel: "JD analysis",
  },
  {
    id: "resume-match-score",
    title: "ATS match score explained",
    navLabel: "Match score",
  },
  {
    id: "ai-resume-optimization",
    title: "AI resume optimization and tailoring",
    navLabel: "Optimize",
  },
  {
    id: "jd-match-example",
    title: "Resume job description match example",
    navLabel: "Example",
  },
] as const;
