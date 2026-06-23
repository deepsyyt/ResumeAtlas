import { CONTENT_FRESHNESS_YEAR, CONTENT_LAST_UPDATED_LABEL } from "@/app/lib/contentFreshness";
import { HIGH_ATS_SCORE_NO_INTERVIEWS_PATH } from "@/app/lib/interviewCluster/paths";

export { HIGH_ATS_SCORE_NO_INTERVIEWS_PATH };

export const HIGH_ATS_SCORE_NO_INTERVIEWS_TITLE =
  `High ATS Score But No Interviews? Why 85% Match Still Gets Rejected (${CONTENT_FRESHNESS_YEAR})` as const;

export const HIGH_ATS_SCORE_NO_INTERVIEWS_H1 =
  "My ATS Score Is 85%. Why Am I Still Getting Rejected?" as const;

export const HIGH_ATS_SCORE_NO_INTERVIEWS_SUBHEAD =
  "A strong keyword match does not mean recruiters will shortlist you." as const;

export const HIGH_ATS_SCORE_NO_INTERVIEWS_META =
  "High ATS score but no interviews? Learn why 75–90% keyword match still leads to rejection — unproven skills, scope gaps, seniority mismatch, and wrong role targeting — and what apply-readiness metrics show instead." as const;

export const HIGH_ATS_SCORE_NO_INTERVIEWS_LAST_UPDATED = CONTENT_LAST_UPDATED_LABEL;

export const HIGH_ATS_SCORE_NO_INTERVIEWS_HERO_CTA =
  "Check apply-readiness for this job" as const;

/** Why keyword match alone fails — the pain behind a high ATS score with silence. */
export const HIGH_SCORE_REJECTION_REASONS = [
  {
    title: "ATS score ≠ recruiter interest",
    body:
      "Keyword scanners measure term overlap and parseability. Recruiters measure whether your bullets prove you can do this job at this level. You can score 85% and still fail the ten-second human screen.",
  },
  {
    title: "Skills listed ≠ skills proven",
    body:
      "Tools and frameworks in your skills section inflate match rates. If experience bullets never show you used them on real work, screening stops before anyone reads your summary.",
  },
  {
    title: "Scope mismatch",
    body:
      "The posting expects platform ownership, cross-functional delivery, or system design — but your resume proves task execution. Same stack, wrong depth of ownership for the role.",
  },
  {
    title: "Seniority mismatch",
    body:
      "Director and Head titles filter on people leadership and program scope. A senior IC resume can match keywords for a leadership role while lacking the evidence recruiters expect at that level.",
  },
  {
    title: "Wrong role targeting",
    body:
      "You may be competitive for adjacent titles — Platform PM instead of Head of Product, Analytics Engineer instead of Staff Data Scientist — while repeatedly applying to roles your evidence does not support.",
  },
] as const;

/** ResumeAtlas metrics that answer what ATS scores cannot. */
export const APPLY_READINESS_METRICS = [
  {
    metric: "Application verdict",
    whatItShows:
      "Apply now, optimize first, or skip — with estimated shortlist odds for this specific posting",
    vsAts:
      "ATS scores say how many terms match. Application verdict says whether submitting today is a good bet.",
  },
  {
    metric: "Role fit",
    whatItShows:
      "Fit for the target title plus related roles you may be a stronger match for",
    vsAts:
      "ATS scores ignore whether you are targeting the right level and title. Role fit surfaces better-fit alternatives.",
  },
  {
    metric: "Shortlist odds",
    whatItShows:
      "Estimated chance a recruiter shortlists this resume for this job — before and after optimization",
    vsAts:
      "Match percentage is not interview probability. Shortlist odds connect evidence gaps to realistic outcomes.",
  },
] as const;

export const HIGH_ATS_SCORE_EXAMPLE = {
  keywordMatch: "85%",
  atsSays: "Strong coverage — keep tailoring keywords",
  readinessSays: "Optimize first — AWS and Kubernetes listed but not proven in bullets",
  shortlistOdds: "~22% today · ~41% after selected fixes",
} as const;

export const HIGH_ATS_SCORE_NO_INTERVIEWS_FAQ = [
  {
    question: "Why is my ATS score high but I'm not getting interviews?",
    answer:
      "Usually because requirements appear in your resume but are not proven in experience bullets, scope or seniority does not match the posting, or you are applying to titles above what your evidence supports. Keyword match measures presence of terms — not recruiter belief that you can do the job.",
  },
  {
    question: "Does a high Jobscan or ATS match score guarantee interviews?",
    answer:
      "No. Match-rate tools optimize for keyword presence. Recruiters shortlist candidates who demonstrate relevant work at the right level. You can score 75–90% and still get no callbacks if skill proof, scope, or role fit is weak for that posting.",
  },
  {
    question: "What does an 85% ATS match score actually mean?",
    answer:
      "Roughly that most terms from the job description appear somewhere in your resume text. It does not mean every skill is evidenced in bullets, that your seniority matches, or that a recruiter would pass you after a quick scan.",
  },
  {
    question: "How do I know if my resume is the problem or role fit?",
    answer:
      "Compare your resume to one target job description. If skill proof and evidence match are strong but role fit flags a better adjacent title, you may be applying to the wrong jobs. If rejection risks and unproven skills dominate, the resume needs stronger proof before you apply.",
  },
  {
    question: "What is application readiness vs ATS score?",
    answer:
      "ATS score and keyword coverage are inputs. Application readiness combines application verdict, elimination risks, skill proof, role fit, and estimated shortlist odds — the question recruiters actually answer: should we interview this person for this role?",
  },
] as const;
