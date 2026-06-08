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
    title: "Skill proof map and JD gaps",
    navLabel: "Skill proof",
  },
  {
    id: "job-description-analysis",
    title: "Job description analysis: what recruiters look for",
    navLabel: "JD analysis",
  },
  {
    id: "resume-match-score",
    title: "Evidence match and dashboard metrics",
    navLabel: "Evidence metrics",
  },
  {
    id: "ai-resume-optimization",
    title: "Evidence-first optimization",
    navLabel: "Optimize",
  },
  {
    id: "jd-match-example",
    title: "Resume job description match example",
    navLabel: "Example",
  },
] as const;
