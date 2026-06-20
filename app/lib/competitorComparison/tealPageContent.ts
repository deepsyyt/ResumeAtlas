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
    "Resume not getting interviews with Teal? Compare apply-readiness vs job-search tracking: unproven skills, rejection risks, and recommended fixes per posting.",
  lastUpdatedLabel: COMPARISON_FRESHNESS_NOTE,
  heroCompetitorLine:
    "helps you track applications, build resumes, and check keyword match as part of a broader job-search workflow.",
  heroResumeAtlasLine:
    "tells you whether you're ready to apply to a specific job, what may eliminate you during screening, and what to fix before you submit.",
  competitorCoreQuestion: "How do I manage and optimize my job search?",
  resumeAtlasCoreQuestion:
    "Should I apply to this job? If yes — what will eliminate me, and what can I fix before applying?",
  whyAlternative: {
    intro:
      "Many job seekers use Teal for job tracking, Chrome extension capture, and resume matching. Users often search for a Teal alternative when their resume is still not getting interviews despite organized applications and match scores.",
    reasons: [
      "More than job-search organization — a clear answer on whether to apply to this role",
      "Rejection risks for the posting, not just a match percentage in the tracker",
      "Skill proof: which requirements are listed but not proven in bullets",
      "Recommended fixes prioritized before you tailor and apply",
      "Deep apply-readiness without replacing your entire job-search stack",
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
    roleLabel: "Senior Software Engineer",
    resumeExcerpt:
      "Built REST APIs in Node.js and PostgreSQL, reducing p95 latency 35%. Implemented CI/CD with GitHub Actions. Refactored React + TypeScript modules, cutting production errors 22%.",
    jdExcerpt:
      "Senior Software Engineer: TypeScript, React, Node.js, AWS, CI/CD, system design, Kubernetes, observability, on-call.",
    competitorHeadline: "74% resume match in tracker",
    competitorDetail:
      "Match panel highlights Kubernetes, AWS, and observability as gaps. Workflow centers on tracking the application and improving match — not whether unproven skills will fail screening.",
    resumeAtlasVerdict: "Apply with caution",
    resumeAtlasDetail:
      "Core stack is proven in bullets. Match score looks decent, but AWS and Kubernetes are listed without project evidence — a common reason resumes stop getting interviews.",
    rejectionRisks: [
      "AWS in skills with no supporting experience bullet",
      "Kubernetes and on-call work not evidenced",
      "Platform and observability outcomes not quantified",
    ],
    recommendedFixes: [
      "Add one bullet proving AWS on a production service with a concrete metric",
      "Move proven stack terms from skills-only into bullets recruiters scan first",
      "Address the highest-risk gap before applying, even if tracker match improves",
    ],
    takeaway:
      "Organizing applications does not fix unproven skills. A 74% match in Teal can still leave your resume not getting interviews — apply-readiness shows why.",
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
      question: "Which tool is better for tailoring resumes to one job?",
      answer:
        "Teal integrates matching into your tracker workflow. ResumeAtlas goes deeper on one posting: verdict, unproven skills, rejection risks, then optimize and download — built for the moment before you apply.",
    },
    {
      question: "Is there a free Teal alternative for resume matching?",
      answer:
        "ResumeAtlas offers free resume-vs-JD analysis without signup: Application Verdict, rejection risks, keyword coverage, and recommended fixes. Teal offers free tracking with match features — compare what each unlocks for apply-readiness vs organization.",
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
