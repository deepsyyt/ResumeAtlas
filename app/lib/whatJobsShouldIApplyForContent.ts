import { CONTENT_FRESHNESS_YEAR, CONTENT_LAST_UPDATED_LABEL } from "@/app/lib/contentFreshness";
import { WHAT_JOBS_SHOULD_I_APPLY_FOR_PATH } from "@/app/lib/interviewCluster/paths";

export { WHAT_JOBS_SHOULD_I_APPLY_FOR_PATH };

export const WHAT_JOBS_SHOULD_I_APPLY_FOR_TITLE =
  `What Jobs Should I Apply For Based on My Resume? | Role Fit (${CONTENT_FRESHNESS_YEAR})` as const;

export const WHAT_JOBS_SHOULD_I_APPLY_FOR_H1 =
  "What Jobs Should I Apply For Based on My Resume?" as const;

export const WHAT_JOBS_SHOULD_I_APPLY_FOR_SUBHEAD =
  "See which roles you're most competitive for before you spend time applying." as const;

export const WHAT_JOBS_SHOULD_I_APPLY_FOR_META =
  "Compare your resume to a job description and discover which roles you're qualified for — and better-fit alternatives. Role fit, skill proof, and evidence match, not just ATS scores." as const;

export const WHAT_JOBS_SHOULD_I_APPLY_FOR_LAST_UPDATED = CONTENT_LAST_UPDATED_LABEL;

export const WHAT_JOBS_SHOULD_I_APPLY_FOR_HERO_CTA =
  "Check my resume against a job" as const;

export const WRONG_ROLE_EXAMPLE = {
  appliedFor: "Head of Product",
  findings: [
    { role: "Platform Product Manager", fit: "strong" as const },
    { role: "Senior Product Manager", fit: "strong" as const },
    { role: "Head of Product", fit: "weak" as const },
  ],
} as const;

export const ROLE_FIT_FRAMEWORK_SIGNALS = [
  {
    signal: "Skill proof",
    whatItMeasures:
      "Which job-description skills are demonstrated in project bullets vs listed only in your skills section",
    whyItMatters:
      "Recruiters shortlist candidates who show work performed — not candidates who named the right tools once",
  },
  {
    signal: "Evidence match",
    whatItMeasures:
      "How strongly your experience bullets support the scope, seniority, and domain of the target role",
    whyItMatters:
      "A posting may list your skills while still expecting a level of ownership your resume does not prove",
  },
  {
    signal: "Leadership depth",
    whatItMeasures:
      "People management, stakeholder influence, and program scope evidenced in your work history",
    whyItMatters:
      "Director and Head titles filter on leadership proof — not keyword overlap alone",
  },
  {
    signal: "Scope",
    whatItMeasures:
      "System design, cross-functional ownership, team size, and deliverable boundaries in your bullets",
    whyItMatters:
      "Two resumes can share a stack but differ on whether they owned outcomes at the level the role requires",
  },
  {
    signal: "Impact signals",
    whatItMeasures:
      "Metrics, outcomes, and business results tied to the work you describe",
    whyItMatters:
      "Impact language separates competitive candidates when titles and tools look similar on paper",
  },
  {
    signal: "Keyword coverage",
    whatItMeasures:
      "Which posting terms appear in your resume text — matched vs missed",
    whyItMatters:
      "Useful for ATS parsing and recruiter skim — but coverage alone does not prove you can do the job",
  },
] as const;

export const ROLE_TRANSITION_EXAMPLES = [
  {
    sourceRole: "Data Analyst",
    alsoFit: ["BI Analyst", "Analytics Engineer", "Product Analyst"],
  },
  {
    sourceRole: "ML Engineer",
    alsoFit: ["Applied Scientist", "AI Engineer", "Data Scientist"],
  },
  {
    sourceRole: "Product Manager",
    alsoFit: ["Platform PM", "Product Strategy Lead", "Growth PM"],
  },
] as const;

export const WHAT_JOBS_SHOULD_I_APPLY_FOR_FAQ = [
  {
    question: "Can AI tell me what jobs I'm qualified for?",
    answer:
      "Yes — when it compares your resume evidence to a specific job description, not just keyword lists. ResumeAtlas scores skill proof, evidence match, leadership depth, and impact signals for the role you paste, then surfaces related titles you may be a stronger fit for.",
  },
  {
    question: "How do I know if I'm applying for the wrong roles?",
    answer:
      "If your resume proves platform or senior IC work but you keep targeting Head or Director titles, rejections may be a fit problem — not a writing problem. Compare your resume to one target posting and check role fit for that title plus related roles before you apply widely.",
  },
  {
    question: "Can I use my resume to find better job matches?",
    answer:
      "Yes. Paste your resume and a job description for a role you're considering. The dashboard shows fit for that posting and other related roles you may want to apply for — so you can prioritize applications where your evidence is strongest.",
  },
  {
    question: "What jobs fit my experience?",
    answer:
      "Jobs where your bullets prove the scope, tools, and outcomes the posting expects — not jobs that merely share keywords. ResumeAtlas maps your experience to the target role and suggests adjacent titles (for example, Platform PM when you applied for Head of Product).",
  },
  {
    question: "Can ATS scores tell me which jobs I should apply for?",
    answer:
      "No. ATS scores measure term overlap and parseability. They do not tell you whether your experience matches the level and responsibilities of the role. Use role fit and evidence match to decide where to apply; use keyword coverage to see what terms still need honest proof.",
  },
] as const;
