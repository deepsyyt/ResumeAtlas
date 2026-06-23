/** Hub: primary problem-intent page for the interview cluster. */
export const RESUME_NOT_GETTING_INTERVIEWS_PATH = "/resume-not-getting-interviews" as const;

/** Pillar: keyword match ≠ interview readiness. */
export const ATS_SCORE_VS_JOB_FIT_PATH = "/ats-score-vs-real-job-fit" as const;

/** Moat: skills listed in resume but not proven in bullets. */
export const SKILLS_LISTED_NOT_PROVEN_PATH =
  "/skills-listed-but-not-proven-on-resume" as const;

/** Have the skills but resume still silent. */
export const ALREADY_HAVE_SKILLS_PATH =
  "/already-have-the-skills-but-not-getting-interviews" as const;

/** How recruiters scan resumes in ~10 seconds. */
export const HOW_RECRUITERS_EVALUATE_PATH = "/how-recruiters-evaluate-resumes" as const;

/** Which jobs to apply for based on resume evidence and role fit. */
export const WHAT_JOBS_SHOULD_I_APPLY_FOR_PATH = "/what-jobs-should-i-apply-for" as const;

/** High ATS / keyword match but no interview callbacks. */
export const HIGH_ATS_SCORE_NO_INTERVIEWS_PATH =
  "/why-ats-score-is-high-but-no-interviews" as const;

/**
 * Tier 2 interview cluster core — apply-readiness moat pages (sitemap priority 0.9).
 * Hub + pillars that own distinct pain intent; spokes link here.
 */
export const INTERVIEW_CLUSTER_TIER2_CORE = [
  RESUME_NOT_GETTING_INTERVIEWS_PATH,
  ATS_SCORE_VS_JOB_FIT_PATH,
  WHAT_JOBS_SHOULD_I_APPLY_FOR_PATH,
] as const;

/** @deprecated Permanent redirect to {@link RESUME_NOT_GETTING_INTERVIEWS_PATH}. */
export const LEGACY_RESUME_NOT_GETTING_INTERVIEWS_PATH =
  "/problems/resume-not-getting-interviews" as const;
