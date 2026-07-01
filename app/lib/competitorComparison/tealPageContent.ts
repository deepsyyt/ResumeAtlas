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

export const TEAL_COMPARISON_PATH = "/resumeatlas-vs-teal" as const;

export const TEAL_BENCHMARK_DISCLAIMER =
  "Editorial example: identical plain-text resume and job description run through both tools. Scoring models differ — run your own paste test to verify." as const;

export const tealComparisonPageConfig: CompetitorComparisonPageConfig = {
  path: TEAL_COMPARISON_PATH,
  competitorName: "Teal",
  competitorSlug: "teal",
  primaryKeyword: "Teal alternative",
  title: `Teal Alternative: ResumeAtlas vs Teal (${CONTENT_FRESHNESS_YEAR})`,
  h1: "Teal Alternative: ResumeAtlas vs Teal",
  metaDescription:
    "Teal tracks applications and match scores. ResumeAtlas shows application verdict, unproven skills, elimination risks, and recommended fixes per posting.",
  lastUpdatedLabel: COMPARISON_FRESHNESS_NOTE,
  heroCompetitorLine:
    "helps you track applications, build resumes, and check keyword match as part of a broader job-search workflow.",
  heroResumeAtlasLine:
    "gives you an Application Verdict (Apply, Optimize First, or Skip), your Shortlist Odds for this specific posting, and critical rejection risks for that role — then optimizes your resume for it, free after sign-in.",
  competitorCoreQuestion: "How do I manage and optimize my job search?",
  resumeAtlasCoreQuestion:
    "Should I apply to this job? If yes — what will eliminate me, and what can I fix before applying?",
  whyAlternative: {
    intro:
      "Many job seekers use Teal for job tracking, Chrome extension capture, and resume matching inside a unified job-search workflow. Users often search for a Teal alternative when their resume is still not getting interviews despite organized applications and decent match scores — and need to understand why specific postings are not advancing.",
    reasons: [
      "A 74% match in Teal's tracker does not tell you whether to apply — ResumeAtlas gives you an Application Verdict and the specific rejection risks for that posting",
      "Match scores show keyword presence; ResumeAtlas shows which listed skills are not proven in your experience bullets — the gap that screens you out in 10 seconds",
      "No subscription required for apply-readiness — free to analyze without signup, $2.99 only when you download a tailored resume",
      "Shortlist Odds: an estimated probability your resume advances to interview for this posting, not just a match percentage",
      "Use Teal and ResumeAtlas together — track in Teal, check apply-readiness in ResumeAtlas before each submission",
    ],
  },
  philosophy: {
    competitorTagline: "How do I run my job search efficiently?",
    resumeAtlasTagline: "Will recruiters believe you can do this job?",
  },
  ctaHref: CHECK_RESUME_AGAINST_JD_FORM_HREF,
  ctaLabel: COMPETITOR_COMPARISON_CTA,
  whoEachToolIsFor: [
    { ifYouWant: "Job tracking, Chrome extension, and application pipeline in one place", bestChoice: "Teal" },
    { ifYouWant: "Resume builder templates inside a job-search OS", bestChoice: "Teal" },
    { ifYouWant: "Career content and networking tools bundled with search", bestChoice: "Teal" },
    { ifYouWant: "Job-specific apply-readiness before you hit Apply", bestChoice: "ResumeAtlas" },
    { ifYouWant: "Application verdict, rejection risks, and skill proof per posting", bestChoice: "ResumeAtlas" },
    { ifYouWant: "Free compare without signup, pay only when you export a tailored resume", bestChoice: "ResumeAtlas" },
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
      "Save job from board or extension to Teal tracker",
      "Upload or build resume in Teal",
      "Run match score vs saved job description",
      "Edit resume or notes in tracker",
      "Apply and track status in pipeline",
    ],
  },
  comparisonRows: [
    { capability: "Should you apply?", resumeAtlas: "Yes — Application Verdict", competitor: "No" },
    { capability: "Rejection risks", resumeAtlas: "Yes", competitor: "No" },
    { capability: "Skill proof analysis", resumeAtlas: "Yes — listed vs proven in bullets", competitor: "Limited" },
    { capability: "Missing evidence detection", resumeAtlas: "Yes", competitor: "No" },
    { capability: "Role fit analysis", resumeAtlas: "Yes", competitor: "Limited" },
    { capability: "ATS score", resumeAtlas: "Yes", competitor: "Yes" },
    { capability: "Keyword coverage", resumeAtlas: "Yes", competitor: "Yes" },
    { capability: "Resume optimization", resumeAtlas: "Yes — job-specific", competitor: "Limited" },
    { capability: "Job application tracker", resumeAtlas: "No", competitor: "Yes" },
    { capability: "Download-ready tailored resume", resumeAtlas: "Yes — $2.99/export", competitor: "Limited" },
  ],
  exampleAnalysis: {
    roleLabel: "Business Analyst",
    resumeExcerpt:
      "Gathered requirements for 3 enterprise software implementations. Facilitated stakeholder workshops and documented user stories. Mapped business processes using Visio. Skills listed: SQL, Power BI, JIRA, Agile, stakeholder management.",
    jdExcerpt:
      "Business Analyst: SQL, Power BI, JIRA, stakeholder management, requirements documentation, process mapping, Agile/Scrum, data analysis, user acceptance testing, presenting findings to senior leadership.",
    competitorHeadline: "74% resume match in Teal tracker",
    competitorDetail:
      "Match panel highlights SQL, Power BI, and UAT as gaps. Workflow centers on tracking the application status and improving match score — analysis does not surface whether listed skills are actually proven in experience bullets.",
    resumeAtlasVerdict: "Apply with caution",
    resumeAtlasDetail:
      "Requirements documentation and process mapping are evident in bullets. SQL and Power BI are listed in skills but absent from any experience bullet — recruiters cannot verify depth. 'Facilitated stakeholder workshops' has no scope or outcome, making it unverifiable against the posting's requirements.",
    rejectionRisks: [
      "SQL listed in skills section with no experience bullet showing query context, dataset, or business outcome",
      "Power BI required in JD — not referenced in resume at all",
      "'Facilitated stakeholder workshops' — no participant count, project outcome, or scope described",
    ],
    recommendedFixes: [
      'Add one SQL bullet if the experience exists: "Wrote 6 SQL queries in MySQL to validate UAT datasets across 50K+ records for enterprise ERP rollout"',
      "Add Power BI or equivalent BI tool bullet if genuine — even basic dashboard experience counts for mid-level BA roles",
      'Upgrade stakeholder bullet with scope: "Facilitated 10 sprint planning sessions with 6-person cross-functional team, delivering $2.5M implementation on schedule"',
    ],
    takeaway:
      "Organizing your job search in Teal and improving match scores does not fix unproven skills. A Business Analyst resume with 74% match can still stop at the recruiter screen because 'SQL' in skills and 'SQL proven in analysis work' read differently in 10 seconds. ResumeAtlas shows the proof gap — not just the keyword gap.",
  },
  strengths: {
    resumeAtlas: [
      "Application Verdict and rejection risks for one specific posting",
      "Skill proof map: listed vs proven in experience bullets",
      "Recommended fixes you select before job-specific optimization",
      "Free core analysis without signup; $2.99 per export, no subscription",
      "Focused on why resumes stop getting interviews — not pipeline hygiene alone",
    ],
    competitor: [
      "Strong job tracker with Chrome extension for saving postings",
      "Resume builder and templates inside the job-search workflow",
      "Match scoring integrated with application pipeline",
      "Popular with active job seekers managing many roles at once",
      "Free tier for core tracking features",
    ],
  },
  limitations: {
    resumeAtlas: [
      "No job application tracker or Chrome extension",
      "No pipeline CRM for managing dozens of active applications",
      "Focused on apply-readiness per posting, not full job-search OS",
    ],
    competitor: [
      "Match score does not surface rejection risks or skill proof depth",
      "Resume not getting interviews may persist despite organized tracking",
      "Apply-readiness analysis is not the primary workflow",
      "Premium features for deeper resume tooling (see tealhq.com)",
    ],
  },
  faq: [
    {
      question: "Is ResumeAtlas better than Teal?",
      answer:
        "For deciding whether to apply to a specific job and what might eliminate you, yes. Teal is better if you want job tracking, a Chrome extension, and resume matching inside one job-search OS. Many users track in Teal and run apply-readiness checks in ResumeAtlas before submitting.",
    },
    {
      question: "Do I need to sign up to use ResumeAtlas?",
      answer:
        "No. Paste your resume and job description for a full free scan — Application Verdict, estimated Shortlist Odds, rejection risks, keyword coverage, and recommended fixes — with no account required. Sign in with Google to unlock a second free scan plus free job-specific resume optimization. Pay $2.99 only when you want to download the tailored resume you send.",
    },
    {
      question: "Is ResumeAtlas a good Teal alternative?",
      answer:
        "Yes, if your resume is not getting interviews and you need more than match scores and tracking: Application Verdict, rejection risks, skill proof, and recommended fixes for the posting you pasted. Teal remains stronger for pipeline management.",
    },
    {
      question: "Resume not getting interviews — can Teal or ResumeAtlas help?",
      answer:
        "Both can improve keyword alignment. ResumeAtlas diagnoses why silence persists: unproven skills (mentioned but not in bullets), rejection risks, and prioritized fixes. See the resume not getting interviews guide for the full chain.",
    },
    {
      question: "Does ResumeAtlas replace Teal's job tracker?",
      answer:
        "No. ResumeAtlas does not replace application tracking. Use Teal (or similar) to organize your search and ResumeAtlas to check apply-readiness before you submit to a specific role.",
    },
    {
      question: "Can I use Teal and ResumeAtlas together?",
      answer:
        "Yes — they serve complementary needs. Use Teal to save jobs, build your resume, and track application status across your pipeline. Use ResumeAtlas to run apply-readiness analysis on each posting before you submit: Application Verdict, rejection risks, skill proof, and job-specific optimization. The two tools fit sequentially in the same workflow.",
    },
    {
      question: "Which tool is better for tailoring resumes to one job?",
      answer:
        "Teal integrates matching into your tracker workflow. ResumeAtlas goes deeper on one posting: verdict, unproven skills, rejection risks, then optimize and download — built for the moment before you apply.",
    },
    {
      question: "Is there a free Teal alternative for resume matching?",
      answer:
        "ResumeAtlas offers free resume-vs-JD analysis without signup: Application Verdict, rejection risks, keyword coverage, and recommended fixes. Teal offers free tracking with match features — compare what each unlocks for apply-readiness vs organization.",
    },
    {
      question: "What are the best Teal alternatives?",
      answer:
        "Alternatives depend on whether you need tracking or apply-readiness. For job pipeline management: Huntr or Notion-based trackers. For ATS keyword matching: Jobscan. For job-specific apply-readiness — Application Verdict, rejection risks, skill proof, and optimization per posting: ResumeAtlas, with free analysis and pay-per-export pricing.",
    },
    {
      question: "Is Teal worth it?",
      answer:
        "Teal is worth it if organized pipeline management helps you stay consistent during an active search. Its Chrome extension, resume builder, and tracking workflow are strong for high-volume applications. It is less useful as a primary apply-readiness tool — match scores do not surface rejection risks or skill proof gaps. Many users pair Teal for tracking with ResumeAtlas for apply-readiness before each submission.",
    },
    {
      question: "ResumeAtlas vs Teal vs Jobscan — which should I use?",
      answer:
        "Each tool answers a different question. Teal: 'How do I organize my job search?' Jobscan: 'Does my resume contain the right keywords?' ResumeAtlas: 'Should I apply to this specific job, and what will eliminate me?' For high-intent applications where you want to maximize interview odds, use ResumeAtlas to check apply-readiness before submitting — then track the outcome in Teal.",
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
  primaryCtaLabel: "Get your apply verdict — no signup needed",
  stickyCtaLabel: "Check apply-readiness — free",
  trustSignals: [
    "Free to analyze — no signup needed",
    "Apply verdict + rejection risks per posting",
    "Results in 60 seconds",
  ],
  capabilitySubheading:
    "Teal tracks your job applications and integrates resume matching into your workflow. ResumeAtlas goes deeper on each posting — apply verdict, elimination risks, shortlist odds, and job-specific optimization before you hit submit.",
  tableCtaLabel: "Get an apply verdict for your specific job — free, no signup →",
  workflowValueLadder:
    "Free to analyze. Free to optimize after Google sign-in. $2.99 to download the ATS-ready resume you send.",
  workflowCtaLabel: "Start now — paste resume and job description →",
  exampleCtaLabel: "Check apply-readiness for your job — free, no signup",
};
