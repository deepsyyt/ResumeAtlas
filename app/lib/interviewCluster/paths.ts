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

/** @deprecated Permanent redirect to {@link RESUME_NOT_GETTING_INTERVIEWS_PATH}. */
export const LEGACY_RESUME_NOT_GETTING_INTERVIEWS_PATH =
  "/problems/resume-not-getting-interviews" as const;
