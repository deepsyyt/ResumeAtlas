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

export const JOBSCAN_COMPARISON_PATH = "/resumeatlas-vs-jobscan" as const;

export const JOBSCAN_BENCHMARK_DISCLAIMER =
  "Editorial example: identical plain-text resume and job description run through both tools. Scoring models differ — run your own paste test to verify." as const;

export const jobscanComparisonPageConfig: CompetitorComparisonPageConfig = {
  path: JOBSCAN_COMPARISON_PATH,
  competitorName: "Jobscan",
  competitorSlug: "jobscan",
  primaryKeyword: "Jobscan alternative",
  title: `Jobscan Alternative: ResumeAtlas vs Jobscan (${CONTENT_FRESHNESS_YEAR})`,
  h1: "Jobscan Alternative: ResumeAtlas vs Jobscan",
  metaDescription:
    "Jobscan shows keyword match. ResumeAtlas shows application verdict, unproven skills, elimination risks, and recommended fixes for one posting before you apply.",
  lastUpdatedLabel: COMPARISON_FRESHNESS_NOTE,
  heroCompetitorLine:
    "tells you whether the right keywords are present in your resume for a job posting.",
  heroResumeAtlasLine:
    "gives you an Application Verdict (Apply, Optimize First, or Skip), your Shortlist Odds for this specific posting, and the rejection risks that will eliminate you — then shows which fixes raise your odds before you apply.",
  competitorCoreQuestion: "Does my resume contain the right keywords?",
  resumeAtlasCoreQuestion:
    "Should I apply to this job? If yes — what will eliminate me, and what can I fix before applying?",
  whyAlternative: {
    intro:
      "Many job seekers start with Jobscan for ATS keyword matching and match-rate scoring. Users often search for a Jobscan alternative when they are still not getting interviews despite high keyword match scores — and need to understand why their resume is being screened out before a human reads it.",
    reasons: [
      "A 78% keyword match does not tell you whether to apply — ResumeAtlas gives you an Application Verdict and the specific rejection risks for this posting",
      "Keyword scores show missing terms; ResumeAtlas shows which listed skills are not proven in your bullets — the gap recruiters actually catch",
      "No subscription required — free to analyze, free to optimize after sign-in, $2.99 only when you download",
      "Skill proof analysis: which job requirements you claim in your skills section but haven't demonstrated in experience bullets",
      "Shortlist Odds: a concrete estimated probability your resume advances to interview, not just a match percentage",
    ],
  },
  philosophy: {
    competitorTagline: "Does the resume contain the right keywords?",
    resumeAtlasTagline: "Will recruiters believe you can do this job?",
  },
  ctaHref: CHECK_RESUME_AGAINST_JD_FORM_HREF,
  ctaLabel: COMPETITOR_COMPARISON_CTA,
  whoEachToolIsFor: [
    { ifYouWant: "ATS keyword matching and match-rate scoring", bestChoice: "Jobscan" },
    { ifYouWant: "LinkedIn optimization, cover-letter scanning, or a job tracker in one subscription", bestChoice: "Jobscan" },
    { ifYouWant: "Job-specific application readiness before you hit Apply", bestChoice: "ResumeAtlas" },
    { ifYouWant: "Application verdict, rejection risks, and skill proof for one posting", bestChoice: "ResumeAtlas" },
    { ifYouWant: "Free compare without signup, pay only when you export a tailored resume", bestChoice: "ResumeAtlas" },
    { ifYouWant: "A familiar 0–100% match rate many recruiters reference", bestChoice: "Jobscan" },
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
      "Upload resume and paste job description",
      "Get keyword match score (0–100%)",
      "Review hard/soft skill panels vs the posting",
      "Manually edit resume to add missing keywords",
      "Apply",
    ],
  },
  comparisonRows: [
    { capability: "Should you apply?", resumeAtlas: "Yes — Application Verdict", competitor: "No" },
    { capability: "Rejection risks", resumeAtlas: "Yes", competitor: "No" },
    { capability: "Skill proof analysis", resumeAtlas: "Yes — listed vs proven in bullets", competitor: "Limited" },
    { capability: "Missing evidence detection", resumeAtlas: "Yes", competitor: "No" },
    { capability: "Role fit analysis", resumeAtlas: "Yes", competitor: "No" },
    { capability: "ATS score", resumeAtlas: "Yes", competitor: "Yes" },
    { capability: "Keyword coverage", resumeAtlas: "Yes", competitor: "Yes" },
    { capability: "Resume optimization", resumeAtlas: "Yes — job-specific", competitor: "Yes — One-Click on paid tiers" },
    { capability: "Job-specific optimization", resumeAtlas: "Yes", competitor: "Yes — paid" },
    { capability: "Download-ready tailored resume", resumeAtlas: "Yes — $2.99/export", competitor: "Limited" },
  ],
  exampleAnalysis: {
    roleLabel: "Data Analyst",
    resumeExcerpt:
      "Analyzed customer churn using Python and SQL. Built Tableau dashboards for executive review. Worked with marketing on campaign performance metrics. Listed skills: SQL, Python, Tableau, Excel, A/B testing, Snowflake.",
    jdExcerpt:
      "Data Analyst: SQL, Python, dbt, Snowflake, Looker, A/B testing, product analytics, statistical modeling, stakeholder communication, presenting data-driven insights.",
    competitorHeadline: "71% keyword match",
    competitorDetail:
      "Hard skills panel flags dbt, Snowflake, Looker, and A/B testing as missing or weak. Suggestions focus on adding those terms to the resume. Match rate is the primary decision signal — no view into whether existing claims are proven in experience bullets.",
    resumeAtlasVerdict: "Apply with caution",
    resumeAtlasDetail:
      "SQL and Python are present but unproven — no query complexity, dataset scale, or business outcome in any bullet. dbt and Snowflake are not referenced. A/B testing appears in the skills section without a supporting experiment bullet. Keyword coverage looks adequate; proof depth does not.",
    rejectionRisks: [
      "SQL listed in skills with no bullet showing query type, dataset size, or business outcome — recruiters cannot verify depth",
      "A/B testing in skills section with zero supporting experiment example",
      "dbt and Snowflake listed as required — not present in resume at all",
    ],
    recommendedFixes: [
      'Add one SQL bullet with a concrete outcome: "Wrote 8 SQL queries in Redshift to identify $1.4M in renewal risk, presented to VP Sales"',
      "Replace 'A/B testing' in skills with a bullet showing one experiment with a measurable result",
      "Address the dbt/Snowflake gap honestly — note data warehouse tooling used if Snowflake is not genuine experience",
    ],
    takeaway:
      "A 71% keyword match score tells you which terms to add. It does not tell you that 'SQL' in your skills section and 'SQL proven in production analytics' read very differently to a recruiter — or that A/B testing listed without an experiment will stop your resume before a phone screen. ResumeAtlas surfaces the proof gap that keyword scores miss.",
  },
  strengths: {
    resumeAtlas: [
      "Application Verdict and rejection risks for one specific posting",
      "Skill proof map: which JD requirements you prove in bullets vs list only",
      "Recommended fixes you select before job-specific optimization",
      "Free core analysis without signup; $2.99 per export, no subscription",
      "Truth-based optimization — no invented skills or fake projects",
    ],
    competitor: [
      "Established match-rate benchmark many job seekers recognize",
      "LinkedIn profile and cover-letter optimization on paid plans",
      "ATS vendor detection and formatting guidance",
      "Job tracker and resume builder bundled in premium",
      "Strong keyword scanner for hard/soft skill categories",
    ],
  },
  limitations: {
    resumeAtlas: [
      "No LinkedIn profile optimizer or cover-letter scanner",
      "No built-in job-application tracker",
      "Focused on resume-vs-JD apply-readiness, not a full career suite",
      "Requires pasting a job description — not a generic resume grade alone",
    ],
    competitor: [
      "Free tier caps monthly scans during active searches",
      "Premium subscription adds up across multi-month job hunts",
      "Match-rate focus can encourage keyword insertion over bullet evidence",
      "No application verdict or rejection-risk readout for a specific posting",
    ],
  },
  faq: [
    {
      question: "Is ResumeAtlas better than Jobscan?",
      answer:
        "For deciding whether to apply to a specific job and what might eliminate you during screening, yes — that is what ResumeAtlas is built for. Jobscan is better if you want LinkedIn optimization, cover-letter scanning, a job tracker, and a familiar match-rate score in one subscription. Many job seekers use keyword tools first and switch to apply-readiness analysis before they submit.",
    },
    {
      question: "Do I need to sign up to use ResumeAtlas?",
      answer:
        "No. Paste your resume and a job description for a full free scan — Application Verdict, estimated Shortlist Odds, rejection risks, keyword coverage, and recommended fixes — with no account required. Sign in with Google to unlock a second free scan plus free job-specific resume optimization. Pay $2.99 only when you want to download the tailored, ATS-ready resume you send.",
    },
    {
      question: "Is ResumeAtlas a good Jobscan alternative?",
      answer:
        "Yes, if your goal is job-specific application readiness: Application Verdict, rejection risks, keyword coverage, skill proof, and recommended fixes for the posting you pasted. ResumeAtlas also provides ATS score and keyword scanner output. It does not replace Jobscan's LinkedIn tools or job tracker.",
    },
    {
      question: "Does ResumeAtlas provide ATS scores?",
      answer:
        "Yes. When you compare resume to job description, you get an ATS score alongside Application Verdict, keyword coverage, and rejection risks. The ATS score is one input — not the whole decision.",
    },
    {
      question: "Does ResumeAtlas optimize resumes?",
      answer:
        "Yes. After you review recommended fixes, you can run job-specific resume optimization for the posting you pasted. Signed-in users get one optimize run per rolling day. Export is $2.99 per tailored resume with no subscription.",
    },
    {
      question: "Which tool is better for tailoring resumes to one job?",
      answer:
        "Jobscan is strong for keyword match-rate lift and formatting checks. ResumeAtlas is stronger when you need to know whether your bullets actually prove the posting's requirements before you tailor — then optimize and download for that specific role.",
    },
    {
      question: "Can ResumeAtlas replace Jobscan?",
      answer:
        "For resume-vs-job-description matching, keyword gaps, apply-readiness, and truth-based optimization — yes. Jobscan still leads if you need LinkedIn review, cover-letter scanning, and application tracking in one paid bundle.",
    },
    {
      question: "ResumeAtlas vs Jobscan — which should I use?",
      answer:
        "Use Jobscan when keyword match rate and bundled career tools matter most. Use ResumeAtlas when you are about to apply and need to know: should I apply, what will eliminate me, and what can I realistically fix first? Both can compare resume to job description; ResumeAtlas adds the apply decision layer.",
    },
    {
      question: "Is Jobscan worth it?",
      answer:
        "Jobscan is worth it if you want keyword match scoring, LinkedIn optimization, and career tools in one subscription. It is less useful as a sole signal when you need to know whether to apply and what will eliminate you during screening. Many users pair or switch to apply-readiness tools like ResumeAtlas before submitting.",
    },
    {
      question: "What are the best Jobscan competitors?",
      answer:
        "Alternatives depend on what you need. Resume Worded focuses on resume writing quality. Teal bundles job tracking with resume tools. ResumeAtlas is built for job-specific apply-readiness: Application Verdict, rejection risks, skill proof, and recommended fixes for the posting you pasted — with free analysis and pay-per-export pricing.",
    },
    {
      question: "Is there a free alternative to Jobscan?",
      answer:
        "Yes. ResumeAtlas offers free resume-vs-JD analysis without signup: Application Verdict, ATS score, keyword coverage, rejection risks, and recommended fixes. Jobscan also has a limited free tier — compare scan limits and whether you need apply-readiness vs match-rate alone.",
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
    "Application verdict + shortlist odds, not just keyword %",
    "Results in 60 seconds",
  ],
  capabilitySubheading:
    "Jobscan scores keyword match rate. ResumeAtlas answers: should you apply to this posting — and what will get you rejected before a human even reads your resume?",
  tableCtaLabel: "Get an apply verdict for your specific job — free, no signup →",
  workflowValueLadder:
    "Free to analyze. Free to optimize after Google sign-in. $2.99 to download the ATS-ready resume you send.",
  workflowCtaLabel: "Start now — paste resume and job description →",
  exampleCtaLabel: "See your apply verdict — free, no signup",
};
