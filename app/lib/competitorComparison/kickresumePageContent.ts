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

export const KICKRESUME_COMPARISON_PATH = "/resumeatlas-vs-kickresume" as const;

export const KICKRESUME_BENCHMARK_DISCLAIMER =
  "Editorial example: identical plain-text resume and job description run through both tools. Scoring models differ — run your own paste test to verify." as const;

export const kickresumeComparisonPageConfig: CompetitorComparisonPageConfig = {
  path: KICKRESUME_COMPARISON_PATH,
  competitorName: "Kickresume",
  competitorSlug: "kickresume",
  primaryKeyword: "Kickresume alternative",
  title: `Kickresume Alternative: ResumeAtlas vs Kickresume (${CONTENT_FRESHNESS_YEAR})`,
  h1: "Kickresume Alternative: ResumeAtlas vs Kickresume",
  metaDescription:
    "Kickresume builds resumes fast with AI and templates. ResumeAtlas shows application verdict, unproven skills, rejection risks, and recommended fixes for the job you're applying to.",
  lastUpdatedLabel: COMPARISON_FRESHNESS_NOTE,
  heroCompetitorLine:
    "helps you build a professional resume quickly with AI-written content suggestions, templates, and cover letter tools.",
  heroResumeAtlasLine:
    "shows your estimated shortlist odds for this specific job, what's likely to eliminate you during screening, and which fixes to make before you submit — then optimizes your resume for that posting. Free to analyze. Free to optimize after sign-in. $2.99 to download the version you send.",
  competitorCoreQuestion: "How do I build a professional resume quickly?",
  resumeAtlasCoreQuestion:
    "Should I apply to this job? If yes — what will eliminate me, and what can I fix before applying?",
  whyAlternative: {
    intro:
      "Many job seekers use Kickresume to generate and format a resume fast with AI. Users often search for a Kickresume alternative when their completed resume still isn't generating interview callbacks — or when they need to know how it performs against a specific job description, not just whether it looks professional.",
    reasons: [
      "More than AI-generated content — a clear answer on whether your resume matches this specific job posting",
      "Application Verdict for the role you're applying to, not a generic resume quality score",
      "Rejection risks tied to the job description: which listed skills are unproven in bullets",
      "Skill proof analysis — evidence-based fixes, not AI content that invents experience",
      "Free to analyze and optimize — $2.99 only to download the ATS-ready version you send. No subscription, no recurring charge.",
    ],
  },
  philosophy: {
    competitorTagline: "Will this AI-built resume get me interviews?",
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
    "Kickresume helps you author a resume quickly. ResumeAtlas checks whether your bullets actually prove the requirements of this specific job — and shows your estimated shortlist odds before you apply.",
  tableCtaLabel: "Get all of this for your specific job posting — free, no signup →",
  workflowValueLadder:
    "Free to analyze. Free to optimize after Google sign-in. $2.99 to download the ATS-ready resume you send.",
  workflowCtaLabel: "Start step 1 now — paste resume and job description →",
  exampleCtaLabel: "See your own rejection risks — free, no signup",
  whoEachToolIsFor: [
    { ifYouWant: "AI-assisted resume writing and fast first drafts", bestChoice: "Kickresume" },
    { ifYouWant: "Template library and cover letter generation in one tool", bestChoice: "Kickresume" },
    { ifYouWant: "A resume builder when you are starting from scratch", bestChoice: "Kickresume" },
    { ifYouWant: "Portfolio or personal website features alongside your resume", bestChoice: "Kickresume" },
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
      "Choose a template or start from AI-generated content",
      "Edit sections with AI writing suggestions",
      "Add skills, experience, and optional cover letter",
      "Export resume (premium for unlimited downloads)",
      "Apply",
    ],
  },
  comparisonRows: [
    { capability: "Should you apply?", resumeAtlas: "Yes — Application Verdict", competitor: "No" },
    { capability: "Rejection risks", resumeAtlas: "Yes", competitor: "No" },
    { capability: "Skill proof analysis", resumeAtlas: "Yes — listed vs proven in bullets", competitor: "No" },
    { capability: "JD-specific keyword gaps", resumeAtlas: "Yes", competitor: "Limited" },
    { capability: "ATS check", resumeAtlas: "Yes — JD-specific scoring", competitor: "Limited" },
    { capability: "Resume optimization", resumeAtlas: "Yes — job-specific, user-selected fixes", competitor: "AI rewrite suggestions" },
    { capability: "AI resume builder", resumeAtlas: "No", competitor: "Yes" },
    { capability: "Template gallery", resumeAtlas: "No", competitor: "Yes" },
    { capability: "Cover letter builder", resumeAtlas: "No", competitor: "Yes" },
    { capability: "Download-ready tailored resume", resumeAtlas: "Yes — $2.99/export", competitor: "Yes — subscription required" },
    { capability: "Free analysis without signup", resumeAtlas: "Yes", competitor: "No" },
  ],
  exampleAnalysis: {
    roleLabel: "Marketing Manager",
    resumeExcerpt:
      "Managed digital campaigns across social and email, increasing brand awareness 40%. Led a team of 3 coordinators and launched a product rebrand. Drove website traffic growth through content marketing and paid ads.",
    jdExcerpt:
      "Marketing Manager: Google Analytics required, A/B testing experience, CRM (HubSpot/Salesforce), SEO strategy, budget management, cross-functional campaign leadership, data-driven reporting.",
    competitorHeadline: "Professional resume ready to export",
    competitorDetail:
      "AI content suggestions applied. Template formatting complete. Resume reads cleanly with strong action verbs. No analysis of which job description requirements are missing or unproven in bullets.",
    resumeAtlasVerdict: "Apply with caution",
    resumeAtlasDetail:
      "Campaign leadership and content marketing proven in bullets. Critical screening gaps for this specific posting: Google Analytics not referenced anywhere. A/B testing experience absent. CRM tools (HubSpot/Salesforce) not mentioned despite being listed in required skills.",
    rejectionRisks: [
      "Google Analytics proficiency required — no evidence of analytics tool usage in any bullet",
      "A/B testing experience not mentioned anywhere in the resume",
      "CRM experience (HubSpot/Salesforce) not demonstrated with examples",
    ],
    recommendedFixes: [
      'Add one bullet showing Google Analytics usage with a measurable outcome (e.g., "Used GA4 to identify top-converting landing pages, reallocating 30% of ad spend to high-ROI channels")',
      "Include at least one A/B test with a quantified result before submitting",
      "Reference CRM work with a specific platform and outcome if you have it",
    ],
    takeaway:
      "An AI-polished resume can read professionally and still fail screening — because the decision is made on evidence, not writing quality. This Marketing Manager resume never demonstrates Google Analytics, A/B testing, or CRM usage the posting requires. That is what ResumeAtlas finds. And it shows you the estimated shortlist odds before you apply, so you can fix the gaps that actually matter.",
  },
  strengths: {
    resumeAtlas: [
      "Application Verdict and rejection risks for one specific job posting",
      "Skill proof map — which JD requirements are proven in bullets vs listed only",
      "Recommended fixes you select before job-specific optimization — no invented experience",
      "Free core analysis without signup; $2.99 per export, no subscription",
      "Focused on apply-readiness for the posting you paste",
    ],
    competitor: [
      "AI-assisted resume writing for fast first drafts",
      "Template library with professional designs",
      "Cover letter generator paired with resume builder",
      "Portfolio and personal website features",
      "Strong for job seekers starting from scratch who need structure quickly",
    ],
  },
  limitations: {
    resumeAtlas: [
      "No AI resume builder or template gallery",
      "No cover letter builder or portfolio site features",
      "Requires pasting a specific job description — not a general resume quality grade",
      "Optimizes existing content — does not generate a resume from scratch",
    ],
    competitor: [
      "No application verdict, rejection risks, or skill proof readout for a specific posting",
      "AI generation can produce generic content without job-specific evidence",
      "Subscription required for unlimited exports and premium templates",
      "Does not surface which resume claims are unproven against a job description you paste",
    ],
  },
  faq: [
    {
      question: "Do I need to sign up to use ResumeAtlas?",
      answer:
        "No. Paste your resume and job description and get the full intelligence dashboard — Application Verdict, estimated shortlist odds, rejection risks, keyword coverage, and recommended fixes — in one free scan with no account required. Signing in with Google adds a second free scan and unlocks free job-specific resume optimization. You only pay ($2.99) if you want to download the optimized, ATS-ready version you send.",
    },
    {
      question: "Is there a free Kickresume alternative for resume analysis?",
      answer:
        "Yes. ResumeAtlas offers free resume-vs-JD analysis without signup: Application Verdict, ATS score, keyword coverage, rejection risks, and recommended fixes. Kickresume focuses on resume building and AI content — not JD-specific apply-readiness intelligence.",
    },
    {
      question: "Is Kickresume free?",
      answer:
        "Kickresume offers a free tier with limited downloads and basic templates. Premium templates, AI credits, and unlimited exports require a paid subscription. ResumeAtlas offers free resume-vs-JD analysis without signup. Pay-per-export is $2.99 for a tailored resume with no subscription.",
    },
    {
      question: "Does Kickresume help with ATS optimization?",
      answer:
        "Kickresume may offer basic ATS-friendly formatting guidance as part of its builder. It does not analyze your resume against a specific job description to show keyword gaps, unproven skills, or rejection risks for that posting. That is what ResumeAtlas provides.",
    },
    {
      question: "Which tool is better for tailoring a resume to one specific job?",
      answer:
        "ResumeAtlas is built for this: paste resume and job description, see which requirements are proven vs listed only, select fixes, run job-specific optimization, and download the tailored version. Kickresume provides AI writing suggestions during resume building but does not analyze your resume against a specific posting you paste.",
    },
    {
      question: "Is ResumeAtlas better than Kickresume?",
      answer:
        "For deciding whether to apply to a specific job and identifying what might eliminate you during screening, yes — that is what ResumeAtlas is built for. Kickresume is better if you need AI-assisted resume writing, templates, and cover letters. Many job seekers build with Kickresume and switch to ResumeAtlas to check apply-readiness before submitting to a specific posting.",
    },
    {
      question: "Is ResumeAtlas a good Kickresume alternative?",
      answer:
        "Yes, if your goal is job-specific apply-readiness: Application Verdict, rejection risks, keyword coverage, skill proof, and recommended fixes for the posting you pasted. ResumeAtlas provides free analysis without signup and pay-per-export pricing. It does not replace Kickresume's AI builder or template gallery.",
    },
    {
      question: "ResumeAtlas vs Kickresume — which should I use?",
      answer:
        "Use Kickresume when you need to build or rewrite your resume quickly with AI and templates. Use ResumeAtlas when you're about to apply to a specific job and need to know: will this resume pass screening, what might get you rejected, and what can you realistically fix before you submit?",
    },
    {
      question: "Does ResumeAtlas provide a resume builder?",
      answer:
        "No. ResumeAtlas requires you to paste your existing resume text. It analyzes that resume against a job description and can optimize your content for the specific posting. If you need to build a resume from scratch, Kickresume or a similar builder is a better starting point — then use ResumeAtlas to check apply-readiness before submitting.",
    },
    {
      question: "Can ResumeAtlas replace Kickresume?",
      answer:
        "For resume-vs-JD analysis, keyword gaps, apply-readiness, and job-specific optimization — yes. Kickresume remains the better choice if you need AI resume building, templates, and cover letters. The two tools serve sequential needs: build with Kickresume, verify apply-readiness with ResumeAtlas.",
    },
    {
      question: "What are the best Kickresume alternatives?",
      answer:
        "Alternatives depend on what you need. For AI resume building and templates: Enhancv, Zety, Resume.io, or Canva Resume. For apply-readiness and JD-specific intelligence: ResumeAtlas — Application Verdict, rejection risks, skill proof, and recommended fixes for the specific posting you're applying to, with free analysis and pay-per-export pricing.",
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
