/** Shared homepage funnel copy (marketing `/` only — tool lives on the checker page). */

/** Page topic — category hub (checker + optimizer). JD-compare SERP lives on the workbench URL. */
export const HOME_MARKETING_H1 = "Free AI resume checker and ATS resume optimizer";

export const HOME_MARKETING_TRUST_EYEBROW = "100% free · no signup";

/** Compare section — first capability (no “Step 1” in UI). */
export const HOME_COMPARE_SECTION_EYEBROW = "First, check ATS and keyword fit";

export const HOME_COMPARE_SECTION_HEADING = "Resume fit readout for the posting you paste";

export const HOME_COMPARE_SECTION_INTRO =
  "Paste your resume and a job description. You get a clear readout for that posting. Free, instant, paste-only.";

/** Contextual internal link copy (homepage → JD workbench). */
export const HOME_COMPARE_SECTION_DETAIL_LINK_PREFIX = "Need a detailed comparison? ";
export const HOME_COMPARE_SECTION_DETAIL_LINK_SUFFIX =
  " to identify keyword gaps, missing requirements, and ATS issues.";
export const HOME_COMPARE_SECTION_DETAIL_LINK_ANCHOR =
  "compare your resume against a job description";

export const HOME_COMPARE_METRICS = [
  {
    label: "Job description match score (Evidence Match)",
    body: "resume-to-job match — how much of the posting you prove in project bullets, not just a skills list.",
  },
  {
    label: "ATS keyword score",
    body: "resume keyword scan: ATS readability plus keyword overlap with the posting.",
  },
  {
    label: "Skill proof map",
    body: "each job skill requirement marked strong, weak, or only listed in skills with no bullet proof.",
  },
  {
    label: "Gap callouts",
    body: "missing requirements and thin areas called out honestly so you know what to fix first.",
  },
] as const;

/** Optimize section — second capability (no “Step 2” in UI). */
export const HOME_OPTIMIZE_SECTION_EYEBROW = "Then, optimize for the role";

export const HOME_OPTIMIZE_SECTION_HEADING = "Your resume, rewritten for the job you pasted";

export const HOME_OPTIMIZE_SECTION_INTRO =
  "AI tailors your resume for the posting in an ATS-friendly format. It does not invent skills or fake experience. It only uses what you already have.";

export const HOME_OPTIMIZE_POINTS = [
  {
    label: "Summary",
    body: "strengthened for this role using your real background.",
  },
  {
    label: "Bullets",
    body: "rewritten for topics the job cares about, but only for skills you already have and that match the job description.",
  },
  {
    label: "Skills list → proof",
    body: "if a matched skill only sat in your skills section, AI moves it into experience bullets with real examples.",
  },
  {
    label: "Honest gaps",
    body: "missing requirements stay missing. We do not add them for you.",
  },
] as const;

export type HomeContextualLink = {
  prefix: string;
  anchor: string;
  suffix: string;
};

export type HomeCapabilityCard =
  | {
      key: string;
      title: string;
      bodyLink: HomeContextualLink;
    }
  | {
      key: string;
      title: string;
      body: string;
    };

export const HOME_CAPABILITY_CARDS: HomeCapabilityCard[] = [
  {
    key: "jd-compare",
    title: "Resume vs job description",
    bodyLink: {
      prefix: "You can ",
      anchor: "compare your resume to a job description",
      suffix: " and see job description match score, skill proof map, and keyword gaps.",
    },
  },
  {
    key: "ats-checker",
    title: "Free ATS resume checker",
    body: "Scan resume for keywords, parsing risk, structure, and ATS readability before you tailor.",
  },
  {
    key: "ai-optimize",
    title: "AI resume optimization",
    body: "Strengthen thin bullets with architecture, deployment, and impact from work you already did.",
  },
  {
    key: "edit-download",
    title: "Edit and download",
    body: "Review every change, tweak in the editor, then export when ready.",
  },
];

export const HOME_HOW_IT_WORKS_STEPS = [
  {
    key: "paste",
    emoji: "📝",
    title: "Paste resume & job description",
    lineLead: {
      prefix: "Open the free ",
      anchor: "resume-job comparison tool",
      suffix: " and paste both documents. ",
    },
    line: "Copy-paste your resume and the posting. No file upload.",
  },
  {
    key: "analyze",
    emoji: "📊",
    title: "ATS scan + job match",
    line: "Get ATS keyword match, resume match score, proof map, and gap callouts.",
  },
  {
    key: "aiOptimize",
    emoji: "✨",
    title: "AI optimization",
    line: "Close evidence gaps in bullets you already have. Nothing invented.",
  },
  {
    key: "download",
    emoji: "⬇️",
    title: "Edit & download",
    line: "Tweak any section, then export PDF or DOCX.",
  },
] as const;
