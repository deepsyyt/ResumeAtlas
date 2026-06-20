/** Shared homepage funnel copy (marketing `/` — commercial page; tool on workbench URL). */

/** Layer 2 — product truth (apply-readiness). */
export const HOME_MARKETING_H1 = "Know if you're ready to apply — before you apply";

export const HOME_MARKETING_SUBHEAD =
  "Paste your resume and a job description. ResumeAtlas tells you whether you're likely to clear first screening, what might get you rejected, what you can realistically fix, and which version of your resume to send.";

/** Layer 1 bridge — search-native phrase users recognize. */
export const HOME_MARKETING_SEO_BRIDGE =
  "Compare your resume to a job description — ATS score, keyword coverage, rejection risks, and job-specific optimization in one scan.";

export const HOME_MARKETING_TRUST_EYEBROW = "100% free · no signup";

/** Layer 3 preview — what the dashboard delivers (matches live product). */
export const HOME_MARKETING_OUTCOMES = [
  {
    label: "Application verdict",
    body: "whether you're likely to clear screening for this role, or should optimize first.",
  },
  {
    label: "Elimination risks",
    body: "top reasons recruiters might skip your application for this posting.",
  },
  {
    label: "Skill proof map",
    body: "which JD skills are proven in project bullets vs listed only in your skills section.",
  },
  {
    label: "Recommended fixes",
    body: "concrete changes to strengthen proof before you hit submit.",
  },
] as const;

/** Evaluate section — first scroll after hero (search intent → dashboard). */
export const HOME_COMPARE_SECTION_EYEBROW = "Compare resume to job description";

export const HOME_COMPARE_SECTION_HEADING = "ATS score, gaps, and apply readiness in one paste";

export const HOME_COMPARE_SECTION_INTRO =
  "You came for a resume check. What you need is an apply decision for this specific role — fit, risks, and fixes, not a generic score alone.";

export const HOME_COMPARE_SECTION_DETAIL_LINK_PREFIX = "Open the ";
export const HOME_COMPARE_SECTION_DETAIL_LINK_SUFFIX =
  " workbench to paste resume + posting and run the full scan.";
export const HOME_COMPARE_SECTION_DETAIL_LINK_ANCHOR =
  "compare resume to job description";

/** @deprecated Use HOME_MARKETING_OUTCOMES — kept for any legacy imports. */
export const HOME_COMPARE_METRICS = HOME_MARKETING_OUTCOMES;

/** Fix → apply section. */
export const HOME_OPTIMIZE_SECTION_EYEBROW = "Then fix what matters and apply";

export const HOME_OPTIMIZE_SECTION_HEADING =
  "Optimize proof for this job, edit, and download the version you send";

export const HOME_OPTIMIZE_SECTION_INTRO =
  "Address elimination risks and strengthen proof in bullets you already have. Review every change, tweak wording, then export an ATS-friendly file for this posting only.";

export const HOME_OPTIMIZE_POINTS = [
  {
    label: "Verdict-driven",
    body: "optimize only when screening odds need a lift — or apply when you're already competitive.",
  },
  {
    label: "Selected fixes",
    body: "applied to the projects that best match this job.",
  },
  {
    label: "Listed → proven",
    body: "supported JD skills moved into work bullets with evidence, not keyword stuffing.",
  },
  {
    label: "Honest gaps",
    body: "unsupported requirements stay visible — we don't invent experience.",
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
    title: "Should I apply to this job?",
    bodyLink: {
      prefix: "",
      anchor: "Compare your resume to a job description",
      suffix:
        " for an application verdict, elimination risks, and keyword coverage for that posting.",
    },
  },
  {
    key: "ats-checker",
    title: "ATS score and parsing",
    bodyLink: {
      prefix: "Check format and keyword overlap with our ",
      anchor: "free ATS resume checker",
      suffix: ", then add a job description for posting-specific proof.",
    },
  },
  {
    key: "ai-optimize",
    title: "Fix elimination risks",
    body: "Strengthen proof in bullets for the fixes you select — summary, keywords, and impact from work you already did.",
  },
  {
    key: "edit-download",
    title: "Apply with confidence",
    body: "Edit the tailored version, then download PDF or DOCX for this role.",
  },
];

export const HOME_HOW_IT_WORKS_STEPS = [
  {
    key: "paste",
    emoji: "📝",
    title: "Paste resume & job description",
    lineLead: {
      prefix: "Open the ",
      anchor: "compare resume to job description",
      suffix: " tool and paste both. ",
    },
    line: "One posting at a time. No file upload.",
  },
  {
    key: "evaluate",
    emoji: "📊",
    title: "Evaluate fit",
    line: "Application verdict, ATS score, keyword coverage, elimination risks, and skill proof map.",
  },
  {
    key: "fix",
    emoji: "✨",
    title: "Fix proof",
    line: "Select recommended fixes and optimize bullets for this job — only what you can defend.",
  },
  {
    key: "apply",
    emoji: "⬇️",
    title: "Edit & apply",
    line: "Tweak the tailored resume, download, and submit the version built for this role.",
  },
] as const;

/** Workbench hero bullets (shared with PostingFitSsrShell and JD workbench). */
export const WORKBENCH_HERO_BULLETS = [
  "Your application verdict",
  "Unproven skills",
  "Elimination risks",
  "Recommended fixes",
] as const;
