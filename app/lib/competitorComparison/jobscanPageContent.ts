import { CONTENT_FRESHNESS_YEAR } from "@/app/lib/contentFreshness";
import { COMPARISON_FRESHNESS_NOTE } from "@/app/lib/competitorComparison/constants";
import {
  ATS_RESUME_CHECKER_PATH,
  ATS_RESUME_TEMPLATE_GUIDE_PATH,
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  COMPETITOR_COMPARISON_CTA,
  CHECK_RESUME_AGAINST_JD_PATH,
  RESUME_KEYWORD_SCANNER_PATH,
} from "@/app/lib/internalLinks";
import type { CompetitorComparisonPageConfig } from "@/app/lib/competitorComparison/types";

export const JOBSCAN_COMPARISON_PATH = "/resumeatlas-vs-jobscan" as const;

/** Editorial side-by-side test: same inputs in both tools; compare output types, not headline scores alone. */
export const JOBSCAN_BENCHMARK_DISCLAIMER =
  "Editorial example: identical plain-text resume and job description pasted into ResumeAtlas and Jobscan. Tools use different scoring models. Run the same inputs on your resume to verify results." as const;

export const jobscanComparisonPageConfig: CompetitorComparisonPageConfig = {
  path: JOBSCAN_COMPARISON_PATH,
  competitorName: "Jobscan",
  competitorSlug: "jobscan",
  primaryKeyword: "jobscan alternative",
  title: `Best Jobscan Alternative? ResumeAtlas vs Jobscan (${CONTENT_FRESHNESS_YEAR})`,
  h1: "ResumeAtlas vs Jobscan",
  metaDescription:
    "Need a jobscan alternative? ResumeAtlas vs Jobscan compared side by side: free resume-vs-JD analysis, keyword gaps, truth-based optimize, $2.99 export. Best free alternative to Jobscan in 2026.",
  lastUpdatedLabel: COMPARISON_FRESHNESS_NOTE,
  heroAnswer:
    "Jobscan is a well-known ATS match scanner with a limited free tier and paid subscription plans. ResumeAtlas is a free Jobscan alternative: paste resume and JD for evidence match, keyword gaps, impact metrics, and bullet suggestions, no signup. Signed-in users get truth-based one-click optimization (1 run per rolling day). You only pay $2.99 when you export a tailored resume, no monthly subscription. This page is a side-by-side decision guide, not a sales pitch.",
  verdictSummary:
    "Choose ResumeAtlas when you want free resume-vs-JD analysis with metrics-rich feedback, truth-based optimization (no invented skills), and a simple $2.99 export with no subscription. Choose Jobscan when you need LinkedIn optimization, cover-letter scanning, or a job tracker bundled with match-rate scoring, and you are OK with scan limits or recurring paid tiers.",
  quickVerdictPoints: [
    "ResumeAtlas fits jobscan alternative searches when you want paste-and-compare on one screen, metrics in the analysis (evidence match, impact coverage, which job skills you prove in bullets), truth-based one-click optimize (1 free run per rolling day when signed in), and a $2.99 per-resume export with no subscription.",
    "Jobscan fits when you want a familiar match-rate score plus LinkedIn, cover-letter, and job-tracker tools in a paid bundle.",
    "Neither percentage is directly comparable. ResumeAtlas emphasizes provable bullets and honest gaps; Jobscan emphasizes match-rate lift and formatting checks.",
  ],
  ctaHref: CHECK_RESUME_AGAINST_JD_FORM_HREF,
  ctaLabel: COMPETITOR_COMPARISON_CTA,
  comparisonRows: [
    { feature: "ATS score / match metric", resumeAtlas: "Evidence match + reference ATS keyword score", jobscan: "Match rate (0–100%)" },
    { feature: "Keyword gap analysis", resumeAtlas: "Yes: missing JD terms + which skills you prove in bullets", jobscan: "Yes: hard/soft skills vs posting" },
    { feature: "JD match workflow", resumeAtlas: "Paste resume + JD on one screen", jobscan: "Upload resume + paste JD; tabbed report" },
    { feature: "Resume review depth", resumeAtlas: "Evidence match, impact coverage, architecture/deployment signals, which JD skills you back up in experience", jobscan: "Formatting, searchability, keyword categories" },
    { feature: "Pricing", resumeAtlas: "Free core analysis (no signup); $2.99 per resume export, no subscription", jobscan: "Free tier with limited scans; paid subscription plans on jobscan.com" },
    { feature: "Free usage", resumeAtlas: "1 compare + optimize run per rolling day (signed in); 1/month without signup", jobscan: "Limited monthly scans on free plan (see Jobscan site)" },
    { feature: "Export / rewrite help", resumeAtlas: "Truth-based one-click optimize (1 free/day signed in); export $2.99/resume (PDF + editable)", jobscan: "One-Click Optimize on paid tiers" },
  ],
  benchmark: {
    roleLabel: "Software engineer",
    resumeExcerpt:
      "Built REST APIs in Node.js and PostgreSQL, reducing p95 latency 35%. Implemented CI/CD with GitHub Actions. Refactored React + TypeScript modules, cutting production errors 22%.",
    jdExcerpt:
      "Senior Software Engineer: TypeScript, React, Node.js, AWS, CI/CD, system design, Kubernetes, observability, on-call.",
    results: [
      {
        label: "Primary readout",
        resumeAtlas: "Evidence match, reference ATS keyword coverage, and which posting skills you prove in bullets",
        jobscan: "Match rate (0–100%) plus hard/soft skill panels vs the posting",
      },
      {
        label: "Missing keywords / skills called out",
        resumeAtlas: "Kubernetes, Terraform, on-call (weak or absent in bullets)",
        jobscan: "Kubernetes, cloud architecture, observability (skills panel)",
      },
      {
        label: "Suggestions",
        resumeAtlas: "Truth-based optimize aligns matched skills to the JD, no invented experience (1 free run per rolling day when signed in); export $2.99/resume",
        jobscan: "Keyword additions + formatting notes; AI rewrite on premium",
      },
    ],
    takeaway:
      "Both tools flagged Kubernetes and platform language missing from the resume. ResumeAtlas tied gaps to bullet proof; Jobscan emphasized match-rate lift via keyword insertion. Run your own paste test to compare outputs for your role.",
  },
  pricing: {
    resumeAtlas: [
      "Free core resume-vs-JD analysis, no signup required",
      "Paste resume + JD: match signals, keyword gaps, impact metrics, and bullet suggestions",
      "Metrics include evidence match, bullets with metrics, architecture and deployment signals",
      "Signed in: truth-based one-click optimize, 1 free run per rolling day",
      "Optimization aligns skills you already matched; never invents experience",
      "Only paid step: $2.99 per tailored resume export (PDF + editable), less than a coffee",
      "No monthly subscription",
    ],
    jobscan: [
      "Free tier: limited monthly resume scans and basic match-rate analysis",
      "Premium: monthly, quarterly, or annual plans (see jobscan.com)",
      "Paid adds unlimited scans, One-Click Optimize, LinkedIn and cover-letter tools, job tracker",
      "Verify current prices at checkout",
    ],
  },
  strengths: {
    resumeAtlas: [
      "Free core compare without signup: metrics-rich readout before you pay anything",
      "Truth-based optimization: aligns matched skills to the JD; never invents experience",
      "One-click optimize included (1 free run per rolling day when signed in)",
      "Simple pricing: $2.99 per resume export, no subscription lock-in",
    ],
    jobscan: [
      "Established match-rate benchmark many job seekers recognize",
      "LinkedIn profile and cover-letter optimization on paid plans",
      "ATS vendor detection and formatting guidance in reports",
      "Job tracker and resume builder in the premium bundle",
    ],
  },
  limitations: {
    resumeAtlas: [
      "No LinkedIn profile optimizer or cover-letter scanner today",
      "No built-in job-application tracker like Jobscan premium",
      "Focused on resume-vs-JD proof, not a full career suite",
    ],
    jobscan: [
      "Free tier caps monthly scans, easy to hit during active searches",
      "Premium pricing adds up for multi-month searches (see jobscan.com)",
      "Match-rate optimization can push keyword insertion over bullet evidence if misused",
    ],
  },
  audience: [
    {
      persona: "Job seekers comparing one posting at a time",
      pick: "ResumeAtlas for free JD match + one-click optimize (1/day signed in); Jobscan free tier if you need ≤ few scans/month",
    },
    {
      persona: "Students and early-career applicants",
      pick: "ResumeAtlas: free analysis and 1 optimize run/day; pay $2.99 only when you export a final resume",
    },
    {
      persona: "Software engineers and data scientists",
      pick: "ResumeAtlas when JD skills must map to shipped work in bullets; Jobscan for quick match-rate baseline",
    },
    {
      persona: "Career changers",
      pick: "ResumeAtlas to see honest skill gaps vs a new JD; Jobscan if you also want LinkedIn + cover letter tooling (paid)",
    },
  ],
  whyAlternatives: [
    "Subscription fatigue: Jobscan premium adds up across a multi-month search; ResumeAtlas charges $2.99 only when you export",
    "Free scan limits when applying to more roles than the free tier allows",
    "Workflow friction: upload, tabs, and upsells vs a single paste-and-compare screen",
    "Match-rate focus without metrics on bullet evidence, or risk of keyword stuffing over truthful alignment",
  ],
  roleComparisons: [
    {
      role: "Software Engineers",
      anchorSlug: "software-engineers",
      intro:
        "Software engineer postings usually stress stacks like React, Node, AWS, and Kubernetes. The question is not just whether those words appear, but whether your bullets prove you used them.",
      resumeAtlas:
        "Highlights missing technical skills from the job description and ties each gap to specific experience bullets. Shows which stack terms you only listed in skills vs proved in project or work history.",
      competitor:
        "Match rate and keyword panels vs the posting. Strong on formatting and searchability checks; keyword insertion suggestions can outpace bullet-level proof if used without editing.",
    },
    {
      role: "Data Scientists",
      anchorSlug: "data-scientists",
      intro:
        "Data scientist roles combine modeling, experimentation, and deployment language. Postings often ask for Python, SQL, ML frameworks, and measurable experiment outcomes.",
      resumeAtlas:
        "Maps JD skills to bullet-level proof: which models, pipelines, or metrics you actually describe vs list-only skills. Surfaces honest gaps when a posting asks for MLOps or experiment design you have not shipped.",
      competitor:
        "Quick match-rate baseline and missing keyword lists vs the posting. Less emphasis on whether experiment or deployment work is proved in bullets vs listed in skills.",
    },
  ],
  faq: [
    {
      question: "Is ResumeAtlas better than Jobscan?",
      answer:
        "It depends on the job. ResumeAtlas is stronger for free, metrics-rich resume-vs-JD matching, truth-based bullet optimization, and a simple $2.99 export with no subscription. Jobscan is stronger if you want LinkedIn optimization, cover-letter scanning, and a job tracker in one paid subscription.",
    },
    {
      question: "Is there a free alternative to Jobscan?",
      answer:
        "Yes. ResumeAtlas offers free resume-vs-job-description analysis without signup: evidence match, keyword gaps, impact metrics, and bullet suggestions. Signed-in users get 1 truth-based optimize run per rolling day. Export is $2.99 per resume with no subscription. Jobscan also has a limited free tier; compare scan limits and pricing models before you rely on either for a full search.",
    },
    {
      question: "Does ResumeAtlas invent skills to match a job description?",
      answer:
        "No. Optimization aligns skills you already matched to the posting: moving proof from your skills list into bullets, strengthening impact language, and surfacing honest gaps. Missing requirements stay missing; we do not add experience you cannot defend in an interview.",
    },
    {
      question: "Which ATS checker is most accurate?",
      answer:
        "No third-party checker perfectly simulates every employer ATS. Use tools to find missing keywords and weak bullets, then validate with human-readable evidence in your experience section, not a single percentage alone.",
    },
    {
      question: "Can ResumeAtlas compare resumes to job descriptions?",
      answer:
        "Yes. Paste your resume and the full job description on the compare tool page. You get evidence match analysis, missing keywords, and optimization suggestions for that posting.",
    },
  ],
  internalLinks: [
    { path: CHECK_RESUME_AGAINST_JD_PATH, label: "Compare resume to job description" },
    { path: ATS_RESUME_CHECKER_PATH, label: "ATS resume checker" },
    { path: RESUME_KEYWORD_SCANNER_PATH, label: "Resume keyword scanner" },
    { path: ATS_RESUME_TEMPLATE_GUIDE_PATH, label: "ATS resume template guide" },
  ],
};
