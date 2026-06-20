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

export const RESUME_WORDED_COMPARISON_PATH = "/resumeatlas-vs-resume-worded" as const;

export const RESUME_WORDED_BENCHMARK_DISCLAIMER =
  "Editorial example: identical plain-text resume and job description run through both tools. Scoring models differ — run your own paste test to verify." as const;

export const resumeWordedComparisonPageConfig: CompetitorComparisonPageConfig = {
  path: RESUME_WORDED_COMPARISON_PATH,
  competitorName: "Resume Worded",
  competitorSlug: "resume-worded",
  primaryKeyword: "Resume Worded alternative",
  title: `Resume Worded Alternative: ResumeAtlas vs Resume Worded (${CONTENT_FRESHNESS_YEAR})`,
  h1: "Resume Worded Alternative: ResumeAtlas vs Resume Worded",
  metaDescription:
    "Resume not getting interviews after Resume Worded? Compare apply-readiness vs writing scores: unproven skills, rejection risks, and recommended fixes for one posting.",
  lastUpdatedLabel: COMPARISON_FRESHNESS_NOTE,
  heroCompetitorLine:
    "tells you whether your resume is written well — action verbs, impact language, and recruiter-style categories.",
  heroResumeAtlasLine:
    "tells you whether you're ready to apply to a specific job, what may eliminate you during screening, and what to fix before you apply.",
  competitorCoreQuestion: "Is my resume written well?",
  resumeAtlasCoreQuestion:
    "Should I apply to this job? If yes — what will eliminate me, and what can I fix before applying?",
  whyAlternative: {
    intro:
      "Many job seekers start with Resume Worded for resume writing feedback and Score My Resume grading. Users often search for a Resume Worded alternative when they need job-specific apply-readiness, not just a general writing score.",
    reasons: [
      "More than writing quality — a clear answer on whether to apply to this role",
      "Rejection risks for the posting you pasted, not generic resume categories",
      "Fixes tied to one job description before you optimize and download",
      "Skill proof: which JD requirements you list vs actually prove in bullets",
      "No Pro subscription required to compare resume to a specific job description",
    ],
  },
  philosophy: {
    competitorTagline: "Is my resume written well?",
    resumeAtlasTagline: "Will recruiters believe you can do this job?",
  },
  ctaHref: CHECK_RESUME_AGAINST_JD_FORM_HREF,
  ctaLabel: COMPETITOR_COMPARISON_CTA,
  whoEachToolIsFor: [
    { ifYouWant: "General resume writing feedback and recruiter-style scoring", bestChoice: "Resume Worded" },
    { ifYouWant: "LinkedIn profile review and sample bullet libraries", bestChoice: "Resume Worded" },
    { ifYouWant: "Magic Write rewrites and Pro templates in a subscription", bestChoice: "Resume Worded" },
    { ifYouWant: "Job-specific application readiness before you hit Apply", bestChoice: "ResumeAtlas" },
    { ifYouWant: "Application verdict, rejection risks, and skill proof for one posting", bestChoice: "ResumeAtlas" },
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
      "Upload resume for Score My Resume grading",
      "Paste job description in Targeted Resume (Pro)",
      "Get match score and keyword gap panel",
      "Apply line-by-line fixes or Magic Write rewrites (Pro)",
      "Apply",
    ],
  },
  comparisonRows: [
    { capability: "Should you apply?", resumeAtlas: "Yes — Application Verdict", competitor: "No" },
    { capability: "Rejection risks", resumeAtlas: "Yes", competitor: "No" },
    { capability: "Skill proof analysis", resumeAtlas: "Yes — listed vs proven in bullets", competitor: "Limited" },
    { capability: "Missing evidence detection", resumeAtlas: "Yes", competitor: "No" },
    { capability: "Role fit analysis", resumeAtlas: "Yes", competitor: "Limited — Pro Targeted Resume" },
    { capability: "ATS score", resumeAtlas: "Yes", competitor: "Yes — basic check; deeper on Pro" },
    { capability: "Keyword coverage", resumeAtlas: "Yes", competitor: "Yes — Targeted Resume on Pro" },
    { capability: "Resume optimization", resumeAtlas: "Yes — job-specific", competitor: "Yes — Magic Write on Pro" },
    { capability: "Job-specific optimization", resumeAtlas: "Yes", competitor: "Yes — Pro only" },
    { capability: "Download-ready tailored resume", resumeAtlas: "Yes — $2.99/export", competitor: "Limited — templates on Pro" },
  ],
  exampleAnalysis: {
    roleLabel: "Senior Software Engineer",
    resumeExcerpt:
      "Built REST APIs in Node.js and PostgreSQL, reducing p95 latency 35%. Implemented CI/CD with GitHub Actions. Refactored React + TypeScript modules, cutting production errors 22%.",
    jdExcerpt:
      "Senior Software Engineer: TypeScript, React, Node.js, AWS, CI/CD, system design, Kubernetes, observability, on-call.",
    competitorHeadline: "72% Targeted Resume match (Pro)",
    competitorDetail:
      "Keyword panel flags Kubernetes, AWS architecture, and observability. Line-by-line suggestions focus on stronger action verbs and adding missing terms. Primary signal is writing quality + keyword overlap.",
    resumeAtlasVerdict: "Apply with caution",
    resumeAtlasDetail:
      "Bullets are well written for core stack work. Keyword coverage is solid for Node, React, and CI/CD. Screening risk is requirements the resume lists but does not prove — platform and ops depth.",
    rejectionRisks: [
      "AWS in skills section with no supporting project bullet",
      "Kubernetes and on-call not evidenced in experience",
      "System design and observability language absent from measurable outcomes",
    ],
    recommendedFixes: [
      "Add one bullet proving AWS on a production workload with a concrete outcome",
      "Tie CI/CD work to reliability or incident reduction if you own on-call adjacent work",
      "Replace skills-only claims with bullet proof recruiters can verify in 10 seconds",
    ],
    takeaway:
      "A resume can score well on writing quality and still fail screening for a specific posting. ResumeAtlas separates 'well written' from 'ready to apply' — and shows which gaps are worth fixing before you submit.",
  },
  strengths: {
    resumeAtlas: [
      "Application Verdict and rejection risks for one specific posting",
      "Skill proof map: which JD requirements you prove in bullets vs list only",
      "Recommended fixes you select before job-specific optimization",
      "Free core analysis without signup; $2.99 per export, no subscription",
      "Truth-based optimization — strengthens real experience, does not invent projects",
    ],
    competitor: [
      "Well-known Score My Resume grading for overall resume quality",
      "LinkedIn profile review on free and Pro tiers",
      "Large sample bullet library and ATS templates on Pro",
      "Targeted Resume and Magic Write for JD-specific rewrites on Pro",
      "Strong feedback on action verbs, impact language, and recruiter-style categories",
    ],
  },
  limitations: {
    resumeAtlas: [
      "No standalone LinkedIn profile scorer",
      "No general resume grade without pasting a job description",
      "No sample bullet library or Pro template gallery",
      "Focused on apply-readiness per posting, not broad resume coaching",
    ],
    competitor: [
      "Targeted Resume and detailed fixes gated behind Pro (~$49/mo+)",
      "Free tier shows scores but limits actionable rewrite guidance",
      "Subscription cost adds up across multi-month searches",
      "No application verdict or rejection-risk readout for a specific posting",
    ],
  },
  faq: [
    {
      question: "Is ResumeAtlas better than Resume Worded?",
      answer:
        "For deciding whether to apply to a specific job and what might eliminate you, yes. Resume Worded is better for general resume writing quality, LinkedIn review, sample bullets, and Pro templates in a subscription. The tools answer different questions: 'Is my resume written well?' vs 'Should I apply to this job?'",
    },
    {
      question: "Is ResumeAtlas a good Resume Worded alternative?",
      answer:
        "Yes, if you are evaluating alternatives because you need job-specific apply-readiness — Application Verdict, rejection risks, keyword coverage, skill proof, and recommended fixes — without a monthly subscription. Resume Worded remains stronger for general resume coaching and LinkedIn polish.",
    },
    {
      question: "Does ResumeAtlas provide ATS scores?",
      answer:
        "Yes. Compare resume to job description and you get an ATS score plus Application Verdict, keyword coverage, and rejection risks. Resume Worded offers ATS checks too; ResumeAtlas ties scores to apply-readiness for the posting you pasted.",
    },
    {
      question: "Does ResumeAtlas optimize resumes?",
      answer:
        "Yes. Review recommended fixes, run job-specific optimization for that posting, and export a tailored resume ($2.99 per export, no subscription). Signed-in users get one optimize run per rolling day.",
    },
    {
      question: "Which tool is better for tailoring resumes to one job?",
      answer:
        "Resume Worded Targeted Resume on Pro is strong for keyword matching and Magic Write rewrites if you already subscribe. ResumeAtlas is built for one posting at a time with apply-readiness first: verdict, risks, skill proof, then optimize and download — free to start.",
    },
    {
      question: "Can ResumeAtlas replace Resume Worded?",
      answer:
        "For resume-vs-job-description matching, keyword gaps, apply-readiness, and truth-based optimization — yes. Resume Worded still leads for Score My Resume grading without a JD, LinkedIn review, and sample bullet libraries in Pro.",
    },
    {
      question: "Resume Worded vs Jobscan vs ResumeAtlas — which should I use?",
      answer:
        "Jobscan for keyword match rate and career-tool bundles. Resume Worded for resume writing quality and general coaching. ResumeAtlas when you are about to apply and need Application Verdict, rejection risks, and skill proof for that specific posting.",
    },
    {
      question: "Is Resume Worded worth it?",
      answer:
        "Resume Worded is worth it if you want general resume coaching, LinkedIn review, sample bullets, and Pro templates in a subscription. It is less useful alone when you need to know whether to apply to a specific posting and what will eliminate you. ResumeAtlas focuses on that apply decision for one job at a time.",
    },
    {
      question: "Is there a free alternative to Resume Worded?",
      answer:
        "Yes. ResumeAtlas offers free resume-vs-JD analysis without signup. Resume Worded offers a free partial Score My Resume preview — compare what each free tier unlocks before you commit to a Pro subscription.",
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
