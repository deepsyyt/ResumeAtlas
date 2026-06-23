/** Shared homepage funnel copy (marketing `/` — commercial page; tool on workbench URL). */

import {
  ANALYSIS_BENEFITS,
  FREE_TIER_EYEBROW,
  OPTIMIZATION_BENEFITS,
  PRODUCT_PIPELINE_ONE_LINER,
  PRODUCT_VALUE_ONE_LINER,
} from "@/app/lib/productBenefits";

/** Layer 2 — product truth (analysis + optimization). */
export const HOME_MARKETING_H1 =
  "Analyze fit and optimize your resume before you apply";

export const HOME_MARKETING_SUBHEAD =
  "Paste your resume and a job description. ResumeAtlas shows whether you're likely to clear first screening, what might get you rejected, and which fixes to select — then optimizes a job-specific resume you can edit and download.";

/** Layer 1 bridge — search-native phrase users recognize. */
export const HOME_MARKETING_SEO_BRIDGE =
  "Free scan: ATS score, application verdict, elimination risks, skill proof map, and selectable recommended fixes. Then free optimize after sign-in — JD-tailored summary, proven bullets, and impact metrics. Pay only to download PDF or DOCX.";

export const HOME_MARKETING_TRUST_EYEBROW = FREE_TIER_EYEBROW;

/** Layer 3 preview — analysis outcomes (matches live dashboard). */
export const HOME_MARKETING_OUTCOMES = ANALYSIS_BENEFITS;

/** Evaluate section — first scroll after hero (search intent → dashboard). */
export const HOME_COMPARE_SECTION_EYEBROW = "Compare resume to job description";

export const HOME_COMPARE_SECTION_HEADING =
  "Apply-readiness analysis: ATS score, gaps, and verdict in one paste";

export const HOME_COMPARE_SECTION_INTRO =
  "You came for a resume check. Get an apply decision for this specific role — verdict, risks, skill proof, and fixes you can select for optimization — not a generic score alone.";

export const HOME_COMPARE_SECTION_DETAIL_LINK_PREFIX = "Open the ";
export const HOME_COMPARE_SECTION_DETAIL_LINK_SUFFIX =
  " workbench to paste resume + posting and run the full scan.";
export const HOME_COMPARE_SECTION_DETAIL_LINK_ANCHOR =
  "compare resume to job description";

/** @deprecated Use HOME_MARKETING_OUTCOMES — kept for any legacy imports. */
export const HOME_COMPARE_METRICS = HOME_MARKETING_OUTCOMES;

/** Optimize section — second hero band. */
export const HOME_OPTIMIZE_SECTION_EYEBROW = "Job-specific resume optimization";

export const HOME_OPTIMIZE_SECTION_HEADING =
  "Turn your analysis into a shortlist-ready resume for this job";

export const HOME_OPTIMIZE_SECTION_INTRO =
  "Select the recommended fixes you want addressed. ResumeAtlas rewrites your summary and bullets for this posting — demonstrated experience for your selections, impact metrics on thin lines, and an editable preview before you download.";

export const HOME_OPTIMIZE_POINTS = OPTIMIZATION_BENEFITS;

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
    title: "Apply-readiness analysis",
    bodyLink: {
      prefix: "",
      anchor: "Compare your resume to a job description",
      suffix:
        " for an application verdict, elimination risks, skill proof map, and selectable recommended fixes.",
    },
  },
  {
    key: "ats-checker",
    title: "ATS score and parsing",
    bodyLink: {
      prefix: "Check format and keyword overlap with our ",
      anchor: "free ATS resume checker",
      suffix: ", then add a job description for posting-specific analysis and optimization.",
    },
  },
  {
    key: "ai-optimize",
    title: "Job-specific optimization",
    body: "Free after sign-in: JD-tailored summary, listed-only skills proven in bullets, selected rejection fixes demonstrated, and impact quantification — only the fixes you select.",
  },
  {
    key: "edit-download",
    title: "Edit and download",
    body: "Review every change in an editable preview, then download application-ready PDF or DOCX for this role.",
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
    title: "Analyze apply-readiness",
    line: "Application verdict, ATS score, keyword coverage, elimination risks, skill proof map, and recommended fixes.",
  },
  {
    key: "fix",
    emoji: "✨",
    title: "Optimize for this job",
    line: "Select fixes and optimize free after sign-in — summary, proven bullets, rejection fixes, and impact metrics for this posting.",
  },
  {
    key: "apply",
    emoji: "⬇️",
    title: "Edit & download",
    line: "Tweak the tailored resume in the preview, then download PDF or DOCX when you're ready to apply.",
  },
] as const;

/** Workbench hero bullets (shared with PostingFitSsrShell and JD workbench). */
export const WORKBENCH_HERO_BULLETS = [
  "Your application verdict & shortlist odds",
  "Role fit if applying for this posting",
  "Elimination risks & unproven skills",
  "Recommended fixes",
] as const;

/** Shared pipeline line for CTAs and footers. */
export const HOME_PRODUCT_PIPELINE = PRODUCT_PIPELINE_ONE_LINER;

/** Shared value prop for capability sections. */
export const HOME_PRODUCT_VALUE = PRODUCT_VALUE_ONE_LINER;
