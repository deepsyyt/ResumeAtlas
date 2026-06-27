import { ENHANCV_COMPARISON_PATH } from "@/app/lib/competitorComparison/enhancvPageContent";
import { JOBSCAN_COMPARISON_PATH } from "@/app/lib/competitorComparison/jobscanPageContent";
import { KICKRESUME_COMPARISON_PATH } from "@/app/lib/competitorComparison/kickresumePageContent";
import { RESUME_WORDED_COMPARISON_PATH } from "@/app/lib/competitorComparison/resumeWordedPageContent";
import { TEAL_COMPARISON_PATH } from "@/app/lib/competitorComparison/tealPageContent";
import {
  ALREADY_HAVE_SKILLS_PATH,
  ATS_SCORE_VS_JOB_FIT_PATH,
  HIGH_ATS_SCORE_NO_INTERVIEWS_PATH,
  HOW_RECRUITERS_EVALUATE_PATH,
  RESUME_NOT_GETTING_INTERVIEWS_PATH,
  SKILLS_LISTED_NOT_PROVEN_PATH,
  WHAT_JOBS_SHOULD_I_APPLY_FOR_PATH,
} from "@/app/lib/interviewCluster/paths";

export type ClusterNavLink = {
  path: string;
  label: string;
  description?: string;
};

/**
 * Interview pain cluster — hub first, then tier-2 moat pillars, then spokes.
 * Expand this cluster (not role examples) for differentiation SERPs.
 */
export const INTERVIEW_CLUSTER_GUIDES: ClusterNavLink[] = [
  {
    path: RESUME_NOT_GETTING_INTERVIEWS_PATH,
    label: "Resume not getting interviews",
    description: "Hub — why silence happens and what to fix",
  },
  {
    path: ATS_SCORE_VS_JOB_FIT_PATH,
    label: "Why ATS scores are not enough",
    description: "Keyword match ≠ interview readiness",
  },
  {
    path: WHAT_JOBS_SHOULD_I_APPLY_FOR_PATH,
    label: "What jobs should I apply for",
    description: "Role fit vs wrong-title applications",
  },
  {
    path: HIGH_ATS_SCORE_NO_INTERVIEWS_PATH,
    label: "High ATS score, no interviews",
    description: "Why 85% match still gets rejected",
  },
  {
    path: SKILLS_LISTED_NOT_PROVEN_PATH,
    label: "Skills listed but not proven",
    description: "Mentioned vs evidenced in bullets",
  },
  {
    path: ALREADY_HAVE_SKILLS_PATH,
    label: "Have the skills, no interviews",
    description: "When background fits but proof does not",
  },
  {
    path: HOW_RECRUITERS_EVALUATE_PATH,
    label: "How recruiters evaluate resumes",
    description: "What they scan in ten seconds",
  },
];

/** Comparison pages — link to hub, do not expand aggressively. */
export const INTERVIEW_CLUSTER_COMPARISONS: ClusterNavLink[] = [
  { path: JOBSCAN_COMPARISON_PATH, label: "Jobscan alternative" },
  { path: RESUME_WORDED_COMPARISON_PATH, label: "Resume Worded alternative" },
  { path: TEAL_COMPARISON_PATH, label: "Teal alternative" },
  { path: ENHANCV_COMPARISON_PATH, label: "Enhancv alternative" },
  { path: KICKRESUME_COMPARISON_PATH, label: "Kickresume alternative" },
];

export const INTERVIEW_CLUSTER_ALL_PATHS = [
  ...INTERVIEW_CLUSTER_GUIDES.map((l) => l.path),
  ...INTERVIEW_CLUSTER_COMPARISONS.map((l) => l.path),
] as const;
