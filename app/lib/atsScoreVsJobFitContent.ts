import { CONTENT_FRESHNESS_YEAR } from "@/app/lib/contentFreshness";
import { COMPARISON_FRESHNESS_NOTE } from "@/app/lib/competitorComparison/constants";
import { JOBSCAN_COMPARISON_PATH } from "@/app/lib/competitorComparison/jobscanPageContent";
import { RESUME_WORDED_COMPARISON_PATH } from "@/app/lib/competitorComparison/resumeWordedPageContent";
import { TEAL_COMPARISON_PATH } from "@/app/lib/competitorComparison/tealPageContent";
import { INTERVIEW_CLUSTER_GUIDES } from "@/app/lib/interviewCluster/clusterNav";
import { ATS_SCORE_VS_JOB_FIT_PATH, RESUME_NOT_GETTING_INTERVIEWS_PATH } from "@/app/lib/interviewCluster/paths";

export { ATS_SCORE_VS_JOB_FIT_PATH };

export const ATS_SCORE_VS_JOB_FIT_TITLE =
  `Why ATS Scores Are Not Enough | ATS Score vs Real Job Fit (${CONTENT_FRESHNESS_YEAR})` as const;

export const ATS_SCORE_VS_JOB_FIT_H1 = "Why ATS Scores Are Not Enough" as const;

export const ATS_SCORE_VS_JOB_FIT_SUBHEAD = "ATS score vs real job fit" as const;

export const ATS_SCORE_VS_JOB_FIT_META =
  "Why ATS scores are not enough: a high keyword match does not mean interview readiness. Learn how unproven skills and rejection risks explain when your resume is not getting interviews." as const;

export const ATS_SCORE_VS_JOB_FIT_LAST_UPDATED = COMPARISON_FRESHNESS_NOTE;

export const KEYWORD_VS_READINESS = [
  {
    signal: "Keyword coverage",
    whatItMeasures: "Whether terms from the job description appear in your resume",
    whatItMisses: "Whether your bullets prove you used those skills on real work",
  },
  {
    signal: "ATS match score",
    whatItMeasures: "Estimated parsing and term overlap vs the posting",
    whatItMisses: "Whether a recruiter would shortlist you after a 10-second scan",
  },
  {
    signal: "Resume writing score",
    whatItMeasures: "Action verbs, impact language, and general structure",
    whatItMisses: "Whether you meet the specific requirements of this role",
  },
] as const;

export const APPLY_READINESS_CHECKS = [
  "Application Verdict — should you apply to this job?",
  "Rejection risks — what may eliminate you during screening",
  "Skill proof — which requirements are listed vs proven in bullets",
  "Recommended fixes — what to change before you apply",
  "Role fit — how your experience lines up with this posting",
] as const;

export const ATS_SCORE_VS_JOB_FIT_FAQ = [
  {
    question: "Is a high ATS score enough to get an interview?",
    answer:
      "Not always. ATS scores measure term overlap and parseability. Recruiters still reject resumes that list skills without bullet proof, miss must-have requirements, or read as a poor fit for the specific role — even at 75%+ keyword match.",
  },
  {
    question: "What is the difference between keyword match and job fit?",
    answer:
      "Keyword match asks whether the right words appear. Job fit asks whether a recruiter would believe you can do this job based on evidence in your experience section. You can pass keyword checks and still fail the human screen.",
  },
  {
    question: "Why do I get no interviews with a good Jobscan score?",
    answer:
      "A match-rate score optimizes for presence of terms, not proof. Common gaps: skills listed but not demonstrated in bullets, missing platform or domain evidence, and thin impact metrics. Check rejection risks for the specific posting, not just the headline percentage.",
  },
  {
    question: "How do I know if I am ready to apply?",
    answer:
      "Paste your resume and the full job description into a compare tool. Look for Application Verdict, rejection risks, and skill proof — not only ATS score and keyword coverage. Fix the highest-risk gaps you can honestly address, then apply.",
  },
  {
    question: "Why is my resume not getting interviews with a good ATS score?",
    answer:
      "Usually because requirements are mentioned but not proven in experience bullets — or because role fit is weak for that specific posting. ATS scores measure term overlap, not whether recruiters will believe you can do the job. Check rejection risks and skill proof before you apply again.",
  },
  {
    question: "Can I use ATS tools and apply-readiness tools together?",
    answer:
      "Yes. Many job seekers use keyword scanners for baseline coverage, then run apply-readiness analysis before submitting. Keyword match tells you what is missing; job fit tells you whether fixing it is enough to apply.",
  },
] as const;

export const COMPARISON_PAGE_LINKS = [
  { path: JOBSCAN_COMPARISON_PATH, label: "Jobscan alternative" },
  { path: RESUME_WORDED_COMPARISON_PATH, label: "Resume Worded alternative" },
  { path: TEAL_COMPARISON_PATH, label: "Teal alternative" },
] as const;

export const PROBLEM_PAGE_LINKS = INTERVIEW_CLUSTER_GUIDES.map((link) => ({
  path: link.path,
  label: link.label,
}));
