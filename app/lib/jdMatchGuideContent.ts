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
    title: "Application verdict and dashboard metrics",
    navLabel: "Dashboard",
  },
  {
    id: "ai-resume-optimization",
    title: "Evidence-first optimization",
    navLabel: "Optimize",
  },
  {
    id: "jd-match-example",
    title: "Why a listed skill can still get you rejected",
    navLabel: "Example",
  },
] as const;

/** Fewer nav pills for non-compact guide pages. */
export const JD_GUIDE_SECTIONS_COMPACT: readonly JdGuideSection[] = [
  {
    id: "compare-resume-jd",
    title: "Can you realistically clear this role?",
    navLabel: "Verdict",
  },
  {
    id: "resume-gap-analysis",
    title: "Listed vs proven skills",
    navLabel: "Proof",
  },
  {
    id: "resume-match-score",
    title: "Your application verdict",
    navLabel: "Verdict",
  },
  {
    id: "ai-resume-optimization",
    title: "Fix proof, then apply",
    navLabel: "Fix",
  },
  {
    id: "jd-match-example",
    title: "Why a listed skill can still get you rejected",
    navLabel: "Example",
  },
] as const;
