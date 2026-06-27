import { CONTENT_FRESHNESS_YEAR } from "@/app/lib/contentFreshness";
import { COMPARISON_FRESHNESS_NOTE } from "@/app/lib/competitorComparison/constants";
import {
  ATS_RESUME_CHECKER_PATH,
  ATS_RESUME_TEMPLATE_GUIDE_PATH,
  ATS_SCORE_VS_JOB_FIT_PATH,
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  COMPETITOR_COMPARISON_CTA,
  CHECK_RESUME_AGAINST_JD_PATH,
  RESUME_KEYWORD_SCANNER_PATH,
  SKILLS_LISTED_NOT_PROVEN_PATH,
  RESUME_NOT_GETTING_INTERVIEWS_PATH,
} from "@/app/lib/internalLinks";
import type { CompetitorComparisonPageConfig } from "@/app/lib/competitorComparison/types";

export const ENHANCV_COMPARISON_PATH = "/resumeatlas-vs-enhancv" as const;

export const ENHANCV_BENCHMARK_DISCLAIMER =
  "Editorial example: identical plain-text resume and job description run through both tools. Scoring models differ — run your own paste test to verify." as const;

export const enhancvComparisonPageConfig: CompetitorComparisonPageConfig = {
  path: ENHANCV_COMPARISON_PATH,
  competitorName: "Enhancv",
  competitorSlug: "enhancv",
  primaryKeyword: "Enhancv alternative",
  title: `Enhancv Alternative: ResumeAtlas vs Enhancv (${CONTENT_FRESHNESS_YEAR})`,
  h1: "Enhancv Alternative: ResumeAtlas vs Enhancv",
  metaDescription:
    "Enhancv builds a polished visual resume. ResumeAtlas shows application verdict, unproven skills, rejection risks, and recommended fixes for the specific job you're applying to.",
  lastUpdatedLabel: COMPARISON_FRESHNESS_NOTE,
  heroCompetitorLine:
    "helps you build a visually designed resume with professional templates, drag-and-drop formatting, and content suggestions to stand out in the application pile.",
  heroResumeAtlasLine:
    "shows your estimated shortlist odds for this specific job, what's likely to eliminate you during screening, and which fixes to make before you submit — then optimizes your resume for that posting. Free to analyze. Free to optimize after sign-in. $2.99 to download the version you send.",
  competitorCoreQuestion: "How do I design a resume that stands out visually?",
  resumeAtlasCoreQuestion:
    "Should I apply to this job? If yes — what will eliminate me, and what can I fix before applying?",
  whyAlternative: {
    intro:
      "Many job seekers use Enhancv to build a polished, well-designed resume. Users often search for an Enhancv alternative when their visually strong resume still isn't generating interview callbacks — or when they need to understand how their resume performs against a specific job description, not just how it looks.",
    reasons: [
      "More than design — a clear answer on whether your resume matches this specific job posting",
      "Application Verdict for the role you're applying to, not a formatting quality score",
      "Rejection risks tied to the job description: which listed skills are unproven in bullets",
      "Skill proof analysis — the difference between what your resume claims and what it actually demonstrates",
      "Free to analyze and optimize — $2.99 only to download the ATS-ready version you send. No subscription, no recurring charge.",
    ],
  },
  philosophy: {
    competitorTagline: "Will this resume design get me interviews?",
    resumeAtlasTagline: "Will recruiters believe I can do this job?",
  },
  ctaHref: CHECK_RESUME_AGAINST_JD_FORM_HREF,
  ctaLabel: COMPETITOR_COMPARISON_CTA,
  primaryCtaLabel: "See your rejection risks — no signup needed",
  stickyCtaLabel: "See your rejection risks — free",
  trustSignals: [
    "Free to analyze — no signup needed",
    "Full intelligence dashboard — not a partial preview",
    "Results in 60 seconds",
  ],
  capabilitySubheading:
    "Enhancv checks whether your resume is formatted correctly. ResumeAtlas checks whether your bullets actually prove the requirements of this specific job — and shows your estimated shortlist odds before you apply.",
  tableCtaLabel: "Get all of this for your specific job posting — free, no signup →",
  workflowValueLadder:
    "Free to analyze. Free to optimize after Google sign-in. $2.99 to download the ATS-ready resume you send.",
  workflowCtaLabel: "Start step 1 now — paste resume and job description →",
  exampleCtaLabel: "See your own rejection risks — free, no signup",
  whoEachToolIsFor: [
    { ifYouWant: "Visual resume templates with drag-and-drop design control", bestChoice: "Enhancv" },
    { ifYouWant: "A professionally styled resume that stands out aesthetically", bestChoice: "Enhancv" },
    { ifYouWant: "Resume building with content suggestions and section prompts", bestChoice: "Enhancv" },
    { ifYouWant: "Multiple export formats with polished PDF presentation", bestChoice: "Enhancv" },
    { ifYouWant: "Job-specific apply-readiness before you hit Apply", bestChoice: "ResumeAtlas" },
    { ifYouWant: "Application Verdict, rejection risks, and skill proof for one posting", bestChoice: "ResumeAtlas" },
    { ifYouWant: "Free analysis without signup; pay only when you export a tailored resume", bestChoice: "ResumeAtlas" },
  ],
  workflow: {
    resumeAtlasSteps: [
      "Paste resume and job description",
      "See Application Verdict and Role Fit for this posting",
      "Review rejection risks and skill proof (listed vs proven in bullets)",
      "Select recommended fixes to apply",
      "Run job-specific resume optimization",
      "Download tailored resume",
      "Apply with clearer eyes",
    ],
    competitorSteps: [
      "Choose a template from the Enhancv gallery",
      "Build or import your resume using the drag-and-drop editor",
      "Add section content with AI-assisted suggestions",
      "Run Enhancv's ATS check (formatting/parsing review)",
      "Export and apply",
    ],
  },
  comparisonRows: [
    { capability: "Should you apply?", resumeAtlas: "Yes — Application Verdict", competitor: "No" },
    { capability: "Rejection risks", resumeAtlas: "Yes", competitor: "No" },
    { capability: "Skill proof analysis", resumeAtlas: "Yes — listed vs proven in bullets", competitor: "No" },
    { capability: "JD-specific keyword gaps", resumeAtlas: "Yes", competitor: "No" },
    { capability: "ATS check", resumeAtlas: "Yes — JD-specific scoring", competitor: "Limited — formatting/parsing only" },
    { capability: "Resume optimization", resumeAtlas: "Yes — job-specific", competitor: "Content suggestions only" },
    { capability: "Visual resume builder", resumeAtlas: "No", competitor: "Yes" },
    { capability: "Professional template gallery", resumeAtlas: "No", competitor: "Yes (100+ templates)" },
    { capability: "Download-ready tailored resume", resumeAtlas: "Yes — $2.99/export", competitor: "Yes — subscription required" },
    { capability: "Free analysis without signup", resumeAtlas: "Yes", competitor: "No" },
  ],
  exampleAnalysis: {
    roleLabel: "Product Manager",
    resumeExcerpt:
      "Led product roadmap for a mobile payments feature, aligning 3 engineering teams and launching to 2M users. Managed stakeholder communications with C-suite and reduced time-to-market by 30%. Defined priorities across two concurrent product lines.",
    jdExcerpt:
      "Product Manager: SQL proficiency required, A/B testing experience, user research background, Agile/Scrum delivery, roadmap prioritization, data-driven decision-making, cross-functional collaboration.",
    competitorHeadline: "Visually polished resume ready to submit",
    competitorDetail:
      "Design layout and section organization optimized for visual clarity. Content suggestions reviewed. ATS formatting check passed — resume parses correctly. No analysis of which job description requirements are missing or unproven in bullets.",
    resumeAtlasVerdict: "Apply with caution",
    resumeAtlasDetail:
      "Cross-functional leadership and delivery experience proven in bullets. Critical screening gaps for this specific posting: SQL is listed as a required skill but does not appear anywhere in the resume. A/B testing experience is not referenced. Data-driven framing is present but without a supporting methodology or quantified example.",
    rejectionRisks: [
      "SQL listed as a required skill — no evidence of SQL usage in any bullet or project",
      "A/B testing experience not mentioned anywhere in the resume",
      "User research not demonstrated with examples or outcomes",
    ],
    recommendedFixes: [
      'Add one bullet showing SQL usage in a shipped analysis or decision (e.g., "Queried Redshift to identify drop-off in checkout funnel, informing 3 roadmap reprioritizations")',
      "Include at least one A/B test with a measurable result before submitting",
      'Replace "data-driven decision-making" with a specific example naming the data source and the decision it changed',
    ],
    takeaway:
      "A beautifully formatted resume can pass every ATS parsing test and still fail screening — because the decision is made on evidence, not design. This Product Manager resume lists SQL, A/B testing, and user research as capabilities it never demonstrates in bullets. That is what ResumeAtlas finds. And it shows you the estimated shortlist odds before you apply, so you can fix the gaps that actually matter.",
  },
  strengths: {
    resumeAtlas: [
      "Application Verdict and rejection risks for one specific job posting",
      "Skill proof map — which JD requirements are proven in bullets vs listed only",
      "Recommended fixes you select before job-specific optimization",
      "Free core analysis without signup; $2.99 per export, no subscription",
      "Focused on apply-readiness, not general resume aesthetics",
    ],
    competitor: [
      "Professional template gallery with 100+ visual designs and formatting control",
      "Drag-and-drop resume builder with section suggestions and AI content prompts",
      "Resume ATS formatting check (parsing and structure review)",
      "Multiple export formats with premium PDF presentation quality",
      "Strong for creative roles where visual resume design influences hiring decisions",
    ],
  },
  limitations: {
    resumeAtlas: [
      "No visual resume builder or template gallery",
      "No cover letter builder or LinkedIn profile review",
      "Requires pasting a specific job description — not a general resume quality grade",
      "No design or formatting control over the exported resume",
    ],
    competitor: [
      "ATS check is a formatting review — not a JD-specific apply-readiness analysis",
      "No application verdict, rejection risks, or skill proof readout for a specific posting",
      "Subscription required for full export access and premium templates",
      "Does not surface which resume claims are unproven against the requirements in a job description",
    ],
  },
  faq: [
    {
      question: "Do I need to sign up to use ResumeAtlas?",
      answer:
        "No. Paste your resume and job description and get the full intelligence dashboard — Application Verdict, estimated shortlist odds, rejection risks, keyword coverage, and recommended fixes — in one free scan with no account required. Signing in with Google adds a second free scan and unlocks free job-specific resume optimization. You only pay ($2.99) if you want to download the optimized, ATS-ready version you send.",
    },
    {
      question: "Is there a free Enhancv alternative for resume analysis?",
      answer:
        "Yes. ResumeAtlas offers free resume-vs-JD analysis without signup: Application Verdict, ATS score, keyword coverage, rejection risks, and recommended fixes. Enhancv's ATS check is focused on formatting and parsing, not JD-specific intelligence. Run both if you want formatting validation and apply-readiness in one workflow.",
    },
    {
      question: "Is Enhancv free?",
      answer:
        "Enhancv offers a free tier with limited template access and watermarked exports. Premium templates and full PDF exports require a paid subscription. ResumeAtlas offers free resume-vs-JD analysis without signup — no watermarks, no scan limits for the core intelligence workflow. Pay-per-export is $2.99 for a tailored resume with no subscription.",
    },
    {
      question: "Does Enhancv help with ATS optimization?",
      answer:
        "Enhancv offers an ATS check that reviews whether your resume parses correctly — formatting, structure, and parsing compatibility. It does not analyze your resume against a specific job description to show keyword gaps, unproven skills, or rejection risks for that posting. That is what ResumeAtlas provides.",
    },
    {
      question: "Which tool is better for tailoring a resume to one specific job?",
      answer:
        "ResumeAtlas is built for this: paste resume and job description, see which requirements are proven vs listed only, select fixes, run job-specific optimization, and download the tailored version. Enhancv provides content suggestions during resume building but does not analyze your resume against a specific posting you paste.",
    },
    {
      question: "Is ResumeAtlas better than Enhancv?",
      answer:
        "For deciding whether to apply to a specific job and identifying what might eliminate you during screening, yes — that is what ResumeAtlas is built for. Enhancv is better if you need visual resume templates, drag-and-drop design control, and a polished PDF. Many job seekers use Enhancv to build their resume and switch to ResumeAtlas to check apply-readiness before submitting to a specific posting.",
    },
    {
      question: "Is ResumeAtlas a good Enhancv alternative?",
      answer:
        "Yes, if your goal is job-specific apply-readiness: Application Verdict, rejection risks, keyword coverage, skill proof, and recommended fixes for the posting you pasted. ResumeAtlas provides free analysis without signup and pay-per-export pricing. It does not replace Enhancv's visual builder or template gallery.",
    },
    {
      question: "ResumeAtlas vs Enhancv — which should I use?",
      answer:
        "Use Enhancv when you need to build or redesign your resume with professional templates and visual formatting. Use ResumeAtlas when you're about to apply to a specific job and need to know: will this resume pass screening, what might get you rejected, and what can you realistically fix before you submit?",
    },
    {
      question: "Does ResumeAtlas provide a resume builder?",
      answer:
        "No. ResumeAtlas requires you to paste your existing resume text. It analyzes that resume against a job description and can optimize your content for the specific posting. If you need to build or design a resume from scratch, Enhancv or a similar builder is a better starting point — then use ResumeAtlas to check apply-readiness before submitting.",
    },
    {
      question: "Can ResumeAtlas replace Enhancv?",
      answer:
        "For resume-vs-JD analysis, keyword gaps, apply-readiness, and job-specific optimization — yes. Enhancv remains the better choice if you need visual resume templates and drag-and-drop design. The two tools serve sequential needs: build with Enhancv, verify apply-readiness with ResumeAtlas.",
    },
    {
      question: "What are the best Enhancv alternatives?",
      answer:
        "Alternatives depend on what you need. For visual resume design: Zety, Resume.io, Canva Resume, or Kickresume. For apply-readiness and JD-specific intelligence: ResumeAtlas — Application Verdict, rejection risks, skill proof, and recommended fixes for the specific posting you're applying to, with free analysis and pay-per-export pricing.",
    },
  ],
  internalLinks: [
    { path: RESUME_NOT_GETTING_INTERVIEWS_PATH, label: "Resume not getting interviews" },
    { path: SKILLS_LISTED_NOT_PROVEN_PATH, label: "Skills listed but not proven" },
    { path: ATS_SCORE_VS_JOB_FIT_PATH, label: "Why ATS scores are not enough" },
    { path: CHECK_RESUME_AGAINST_JD_PATH, label: "Compare resume to job description" },
    { path: ATS_RESUME_CHECKER_PATH, label: "ATS resume checker" },
    { path: RESUME_KEYWORD_SCANNER_PATH, label: "Resume keyword scanner" },
    { path: ATS_RESUME_TEMPLATE_GUIDE_PATH, label: "ATS resume template guide" },
  ],
};
