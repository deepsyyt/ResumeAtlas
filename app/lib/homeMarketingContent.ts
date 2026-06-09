/** Shared homepage funnel copy (marketing `/` only — tool lives on the checker page). */

/** Page topic — checker + optimizer for any role. */
export const HOME_MARKETING_H1 = "AI resume checker and optimizer for any job role";

export const HOME_MARKETING_TRUST_EYEBROW = "100% free · no signup";

/** Compare section — first capability (no “Step 1” in UI). */
export const HOME_COMPARE_SECTION_EYEBROW = "First, compare to the job";

export const HOME_COMPARE_SECTION_HEADING = "Compare your resume to the job description";

export const HOME_COMPARE_SECTION_INTRO =
  "Paste your resume and a job description. You get a clear readout for that posting. Free, instant, paste-only.";

export const HOME_COMPARE_METRICS = [
  {
    label: "Evidence match",
    body: "how much of this job you prove in experience and project bullets, not just a skills list.",
  },
  {
    label: "ATS keyword score",
    body: "whether your resume is easy for ATS to read, plus keyword overlap with the posting.",
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

export const HOME_CAPABILITY_CARDS = [
  {
    title: "Check resume vs job description",
    body: "See evidence match, skill proof map, and honest gaps for the posting you paste.",
  },
  {
    title: "Free ATS resume checker",
    body: "Scan parsing risk, structure, and readability before you tailor keywords.",
  },
  {
    title: "AI resume optimization",
    body: "Strengthen thin bullets with architecture, deployment, and impact from work you already did.",
  },
  {
    title: "Edit and download",
    body: "Review every change, tweak in the editor, then export when ready.",
  },
] as const;

export const HOME_HOW_IT_WORKS_STEPS = [
  {
    key: "paste",
    emoji: "📝",
    title: "Paste resume & job description",
    line: "Copy-paste your resume and the posting. No file upload.",
  },
  {
    key: "analyze",
    emoji: "📊",
    title: "ATS + evidence match",
    line: "Get compatibility signals, proof map, and gap callouts for that job.",
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
