/** Shared homepage funnel copy (marketing `/` — commercial page; tool on workbench URL). */

import {
  ANALYSIS_BENEFITS,
  FREE_TIER_EYEBROW,
  OPTIMIZATION_BENEFITS,
  PRODUCT_PIPELINE_ONE_LINER,
  PRODUCT_VALUE_ONE_LINER,
} from "@/app/lib/productBenefits";

/** Layer 2 — product truth (analysis + optimization). */
export const HOME_MARKETING_H1 = "Is your resume ready for this specific job?";

export const HOME_MARKETING_SUBHEAD =
  "Paste your resume and job description. Get a Job Application Verdict (Apply, Optimize First, or Skip), your rejection risks, and recommended fixes — in 60 seconds. Free, no signup.";

/** Hero differentiation — not an ATS checker hook. */
export const HOME_MARKETING_DIFFERENTIATION =
  "Not a keyword score. A real apply decision for this specific job.";

/** Above-the-fold proof points (3 max) — matches messaging hierarchy in ai-context/02_PRODUCT.md. */
export const HOME_MARKETING_HERO_BULLETS = [
  "Job Application Verdict — Apply, Optimize First, or Skip",
  "Rejection risks — what will get you screened out before a human reads it",
  "Recommended fixes — selectable, applied only to what you choose",
] as const;

export const HOME_MARKETING_HERO_EYEBROW = "Free resume check · no signup needed";

/** Layer 1 bridge — below-fold SEO intent (not hero body). AI-citation-ready entity definition block. */
export const HOME_MARKETING_SEO_BRIDGE =
  "ResumeAtlas is a free apply-readiness tool that compares your resume against a specific job description and returns an Application Verdict (Apply, Optimize First, or Skip), Shortlist Odds (the estimated probability your resume advances to interview for that posting), and critical rejection risks — before you submit. Free job-specific optimization after sign-in. Pay only to download the ATS-ready PDF or DOCX.";

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

// ─── Comparison vs competitors ──────────────────────────────────────────────

// ─── Problem agitation ──────────────────────────────────────────────────────

export const HOME_PROBLEM_HEADING = "Sending applications and hearing nothing?";

export const HOME_PROBLEM_INTRO =
  "Most resume tools tell you what keywords are missing. They don't tell you whether to apply — or why you're being screened out.";

export type ProblemScenario = {
  pain: string;
  fix: string;
};

export const HOME_PROBLEM_SCENARIOS: readonly ProblemScenario[] = [
  {
    pain: "\"I have the right skills. My resume looks strong. Why is no one calling?\"",
    fix: "Rejection risks surface what's really wrong: skills listed but not proven in bullets — the gap recruiters catch in 10 seconds.",
  },
  {
    pain: "\"Jobscan says 78% match. I still got no response.\"",
    fix: "Keyword match ≠ apply-readiness. Your Job Application Verdict shows whether your experience actually proves the role — not just whether the terms appear.",
  },
  {
    pain: "\"I don't know if I should even apply to this posting.\"",
    fix: "Apply, Optimize First, or Skip — a clear verdict with your Shortlist Odds in 60 seconds, so you spend time on applications worth submitting.",
  },
] as const;

// ─── Comparison vs competitors ──────────────────────────────────────────────

export const HOME_VS_SECTION_EYEBROW = "Apply-readiness intelligence";

export const HOME_VS_SECTION_HEADING =
  "Keyword checkers tell you what's missing. We tell you whether to apply.";

export type ComparisonRow = {
  label: string;
  other: string;
  us: string;
};

export const HOME_COMPARISON_ROWS: readonly ComparisonRow[] = [
  {
    label: "What they tell you",
    other: "Keyword match percentage",
    us: "Application verdict + shortlist odds",
  },
  {
    label: "Why you get rejected",
    other: "Missing keywords",
    us: "Missing proof in your bullets",
  },
  {
    label: "What they optimize",
    other: "Keyword density, generic rewrites",
    us: "Demonstrated experience for this posting",
  },
  {
    label: "Fixes applied",
    other: "All at once, without your consent",
    us: "Only what you select — nothing fabricated",
  },
  {
    label: "First scan cost",
    other: "Signup required",
    us: "Free, no signup",
  },
] as const;

// ─── FAQ ────────────────────────────────────────────────────────────────────

export type FaqItem = {
  question: string;
  answer: string;
};

export const HOME_FAQ: readonly FaqItem[] = [
  {
    question: "Is it really free? Do I need to sign up?",
    answer:
      "One full scan free with no account required — complete Job Application Verdict, rejection risks, Shortlist Odds, and recommended fixes. Sign in with Google for a second free scan and free job-specific optimization. Pay $2.99 only to download the ATS-ready PDF or DOCX.",
  },
  {
    question: "How is this different from Jobscan or an ATS checker?",
    answer:
      "ATS checkers and keyword tools tell you what's missing. ResumeAtlas tells you whether to apply, what will get you rejected before a human reads your resume, and which fixes to make before you submit — not just a keyword match percentage.",
  },
  {
    question: "What is a Job Application Verdict?",
    answer:
      "A Job Application Verdict is ResumeAtlas's apply decision for one specific posting: Apply (your resume is competitive as-is), Optimize First (fixable gaps exist — address them before submitting), or Skip (significant proof gaps make this role a low-probability application at this time). It is based on your resume's rejection risks and estimated Shortlist Odds for that posting.",
  },
  {
    question: "What does job-specific optimization do?",
    answer:
      "After seeing your analysis, you select the recommended fixes you want addressed. ResumeAtlas rewrites your summary and bullets to prove those specific skills for this job — not a generic rewrite. You review every change in an editable preview before downloading.",
  },
  {
    question: "Do I need to upload a file?",
    answer:
      "No file upload required. Paste your resume text and the job description into the tool. The first scan needs no account.",
  },
  {
    question: "Is my resume data safe?",
    answer:
      "Your resume and job description are only used to generate your analysis and optimization. We don't sell or share your data.",
  },
] as const;

// ─── Workbench ──────────────────────────────────────────────────────────────

/** Workbench hero bullets (shared with PostingFitSsrShell and JD workbench). */
export const WORKBENCH_HERO_BULLETS = [
  "Application Verdict — Apply, Optimize First, or Skip",
  "Critical rejection risks — why the verdict",
  "Shortlist odds — confidence for this job",
  "Free job-specific optimization after sign-in",
] as const;

/** Shared pipeline line for CTAs and footers. */
export const HOME_PRODUCT_PIPELINE = PRODUCT_PIPELINE_ONE_LINER;

/** Shared value prop for capability sections. */
export const HOME_PRODUCT_VALUE = PRODUCT_VALUE_ONE_LINER;
