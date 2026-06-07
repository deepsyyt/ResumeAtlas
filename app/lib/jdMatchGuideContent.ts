export type JdGuideSection = {
  id: string;
  title: string;
  navLabel: string;
};

export const JD_GUIDE_SECTIONS: readonly JdGuideSection[] = [
  {
    id: "compare-resume-jd",
    title: "How to compare resume to a job description",
    navLabel: "Compare resume to JD",
  },
  {
    id: "resume-match-score",
    title: "Resume match score explained",
    navLabel: "Match score",
  },
  {
    id: "jd-keyword-matching",
    title: "Resume keyword matching vs a job posting",
    navLabel: "Keyword matching",
  },
  {
    id: "tailor-resume-jd",
    title: "How to tailor resume to a job description",
    navLabel: "Tailor resume",
  },
  {
    id: "jd-match-example",
    title: "Resume job description match example",
    navLabel: "Match example",
  },
] as const;
