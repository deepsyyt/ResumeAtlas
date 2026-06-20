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

export const RESUME_WORDED_COMPARISON_PATH = "/resumeatlas-vs-resume-worded" as const;

/** Editorial side-by-side test: same inputs in both tools; compare output types, not headline scores alone. */
export const RESUME_WORDED_BENCHMARK_DISCLAIMER =
  "Editorial example: identical plain-text resume and job description pasted into ResumeAtlas and Resume Worded Targeted Resume (Pro). Tools use different scoring models. Run the same inputs on your resume to verify results." as const;

export const resumeWordedComparisonPageConfig: CompetitorComparisonPageConfig = {
  path: RESUME_WORDED_COMPARISON_PATH,
  competitorName: "Resume Worded",
  competitorSlug: "resume-worded",
  primaryKeyword: "resume worded alternative",
  title: `Best Resume Worded Alternative? ResumeAtlas vs Resume Worded (${CONTENT_FRESHNESS_YEAR})`,
  h1: "ResumeAtlas vs Resume Worded",
  metaDescription:
    "Need a resume worded alternative? ResumeAtlas vs Resume Worded compared: free JD match, no subscription, truth-based bullets, $2.99 export. Best free alternative to Resume Worded in 2026.",
  lastUpdatedLabel: COMPARISON_FRESHNESS_NOTE,
  heroAnswer:
    "Resume Worded is a popular resume scoring platform with a free partial report and Pro plans for targeted resume matching, line-by-line feedback, and AI rewrites. ResumeAtlas is a free resume worded alternative for comparing your resume to a job description: evidence match, keyword gaps, impact metrics, and bullet suggestions, no signup. Signed-in users get truth-based one-click optimization (1 run per rolling day). You only pay $2.99 when you export a tailored resume, no monthly subscription. This page is a side-by-side decision guide, not a sales pitch.",
  verdictSummary:
    "Choose ResumeAtlas when you want free resume-vs-JD analysis with metrics-rich feedback, truth-based optimization (no invented skills), and a simple $2.99 export with no subscription. Choose Resume Worded when you want recruiter-style resume scoring, LinkedIn review, sample bullet libraries, and Pro templates in a monthly or annual subscription.",
  quickVerdictPoints: [
    "ResumeAtlas fits resume worded alternative searches when you want paste-and-compare on one screen, metrics in the analysis (evidence match, impact coverage, which job skills you prove in bullets), truth-based one-click optimize (1 free run per rolling day when signed in), and a $2.99 per-resume export with no subscription.",
    "Resume Worded fits when you want Score My Resume grading, LinkedIn feedback, and Pro tools like Targeted Resume and Magic Write in one subscription.",
    "Neither percentage is directly comparable. ResumeAtlas emphasizes provable bullets and honest gaps for one posting; Resume Worded emphasizes overall resume quality scores and Pro-gated line-by-line fixes.",
  ],
  ctaHref: CHECK_RESUME_AGAINST_JD_FORM_HREF,
  ctaLabel: COMPETITOR_COMPARISON_CTA,
  comparisonRows: [
    {
      feature: "ATS score / match metric",
      resumeAtlas: "Evidence match + reference ATS keyword score",
      jobscan: "Overall resume score + Targeted Resume match (Pro)",
    },
    {
      feature: "Keyword gap analysis",
      resumeAtlas: "Yes: missing JD terms + which skills you prove in bullets",
      jobscan: "Yes: Targeted Resume keyword gaps (Pro); basic ATS check on free tier",
    },
    {
      feature: "JD match workflow",
      resumeAtlas: "Paste resume + JD on one screen",
      jobscan: "Upload resume; paste JD in Targeted Resume (Pro)",
    },
    {
      feature: "Resume review depth",
      resumeAtlas: "Evidence match, impact coverage, architecture/deployment signals, which JD skills you back up in experience",
      jobscan: "Recruiter-style categories, line-by-line feedback (Pro), LinkedIn review",
    },
    {
      feature: "Pricing",
      resumeAtlas: "Free core analysis (no signup); $2.99 per resume export, no subscription",
      jobscan: "Free partial score; Pro from ~$49/mo (see resumeworded.com)",
    },
    {
      feature: "Free usage",
      resumeAtlas: "1 compare + optimize run per rolling day (signed in); 1/month without signup",
      jobscan: "Free Score My Resume preview; detailed fixes and Targeted Resume on Pro",
    },
    {
      feature: "Export / rewrite help",
      resumeAtlas: "Truth-based one-click optimize (1 free/day signed in); export $2.99/resume (PDF + editable)",
      jobscan: "Magic Write and AI rewrites on Pro; templates on Pro",
    },
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
        jobscan: "Targeted Resume match score and keyword gap panel (Pro)",
      },
      {
        label: "Missing keywords / skills called out",
        resumeAtlas: "Kubernetes, Terraform, on-call (weak or absent in bullets)",
        jobscan: "Kubernetes, AWS architecture, observability (keyword panel)",
      },
      {
        label: "Suggestions",
        resumeAtlas: "Truth-based optimize aligns matched skills to the JD, no invented experience (1 free run per rolling day when signed in); export $2.99/resume",
        jobscan: "Keyword and bullet suggestions; Magic Write rewrites on Pro",
      },
    ],
    takeaway:
      "Both tools flagged Kubernetes and platform language missing from the resume. ResumeAtlas tied gaps to bullet proof for that posting; Resume Worded emphasized overall resume score lift and Pro rewrite suggestions. Run your own paste test to compare outputs for your role.",
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
      "Free tier: partial Score My Resume report and basic LinkedIn feedback",
      "Pro: monthly (~$49), quarterly (~$99), or annual (~$229) plans (see resumeworded.com)",
      "Paid adds Targeted Resume, full line-by-line feedback, Magic Write, templates, unlimited reviews",
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
      "Well-known Score My Resume grading many job seekers recognize",
      "LinkedIn profile review on free and Pro tiers",
      "Large sample bullet library and ATS templates on Pro",
      "Targeted Resume and Magic Write for JD-specific rewrites on Pro",
    ],
  },
  limitations: {
    resumeAtlas: [
      "No standalone LinkedIn profile scorer like Resume Worded today",
      "No general resume score without a job description pasted",
      "Focused on resume-vs-JD proof, not a full career content suite",
    ],
    jobscan: [
      "Detailed line-by-line fixes and Targeted Resume gated behind Pro (~$49/mo+)",
      "Free tier shows scores but limits actionable rewrite guidance",
      "Subscription adds up across multi-month searches (see resumeworded.com)",
    ],
  },
  audience: [
    {
      persona: "Job seekers comparing one posting at a time",
      pick: "ResumeAtlas for free JD match + one-click optimize (1/day signed in); Resume Worded Pro if you also want LinkedIn + general resume scoring in one subscription",
    },
    {
      persona: "Students and early-career applicants",
      pick: "ResumeAtlas: free analysis and 1 optimize run/day; pay $2.99 only when you export a final resume",
    },
    {
      persona: "Software engineers and data scientists",
      pick: "ResumeAtlas when JD skills must map to shipped work in bullets; Resume Worded for recruiter-style resume grades plus Pro Targeted Resume",
    },
    {
      persona: "Career changers",
      pick: "ResumeAtlas to see honest skill gaps vs a new JD; Resume Worded if you want sample bullets and LinkedIn polish in Pro",
    },
  ],
  whyAlternatives: [
    "Subscription cost: Resume Worded Pro at ~$49/mo adds up during long searches; ResumeAtlas charges $2.99 only when you export",
    "Free tier shows a score but paywalls line-by-line fixes and Targeted Resume detail",
    "Need JD-specific matching without committing to a monthly plan",
    "Prefer truth-based bullet alignment over generic AI rewrites that can oversell skills",
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
        "Score My Resume grades overall resume quality and writing (action verbs, impact language). Targeted Resume on Pro matches keywords to the posting; line-by-line fixes sit behind the subscription.",
    },
    {
      role: "Data Scientists",
      anchorSlug: "data-scientists",
      intro:
        "Data scientist roles combine modeling, experimentation, and deployment language. Postings often ask for Python, SQL, ML frameworks, and measurable experiment outcomes.",
      resumeAtlas:
        "Maps JD skills to bullet-level proof: which models, pipelines, or metrics you actually describe vs list-only skills. Surfaces honest gaps when a posting asks for MLOps or experiment design you have not shipped.",
      competitor:
        "Strong on general resume polish and recruiter-style categories. Targeted Resume on Pro can flag missing keywords, but depth depends on Pro access and focuses less on experiment or deployment proof in bullets.",
    },
  ],
  faq: [
    {
      question: "Is ResumeAtlas better than Resume Worded?",
      answer:
        "It depends on the job. ResumeAtlas is stronger for free, metrics-rich resume-vs-JD matching, truth-based bullet optimization, and a simple $2.99 export with no subscription. Resume Worded is stronger if you want general resume scoring, LinkedIn review, sample bullet libraries, and Pro templates in one subscription.",
    },
    {
      question: "Is there a free alternative to Resume Worded?",
      answer:
        "Yes. ResumeAtlas offers free resume-vs-job-description analysis without signup: evidence match, keyword gaps, impact metrics, and bullet suggestions. Signed-in users get 1 truth-based optimize run per rolling day. Export is $2.99 per resume with no subscription. Resume Worded also has a free partial score; compare what each free tier actually unlocks before you rely on either for a full search.",
    },
    {
      question: "Does ResumeAtlas invent skills to match a job description?",
      answer:
        "No. Optimization aligns skills you already matched to the posting: moving proof from your skills list into bullets, strengthening impact language, and surfacing honest gaps. Missing requirements stay missing; we do not add experience you cannot defend in an interview.",
    },
    {
      question: "Which tool is better for tailoring a resume to one job posting?",
      answer:
        "For one posting at a time with no subscription, ResumeAtlas is built around paste resume + JD, gap analysis, and truth-based optimize. Resume Worded Targeted Resume on Pro is strong for JD-specific keyword matching and rewrites if you already pay for Pro.",
    },
    {
      question: "Can ResumeAtlas compare resumes to job descriptions?",
      answer:
        "Yes. Paste your resume and the full job description on the compare tool page. You get evidence match analysis, missing keywords, and optimization suggestions for that posting.",
    },
    {
      question: "ResumeAtlas vs Resume Worded for ATS optimization",
      answer:
        "ResumeAtlas is built for ATS optimization against one pasted job description: keyword gaps, evidence match, reference ATS keyword coverage, and truth-based bullet rewrites. Resume Worded offers ATS checks and Targeted Resume on Pro, plus general Score My Resume grading. Pick ResumeAtlas for posting-specific proof; Resume Worded if you want broader resume coaching in a subscription.",
    },
    {
      question: "Can ResumeAtlas replace Resume Worded?",
      answer:
        "For resume-vs-job-description matching, keyword gaps, and truth-based bullet optimization, yes. ResumeAtlas is a strong replacement. Resume Worded still leads if you need LinkedIn review, a large sample bullet library, and general resume scoring without pasting a specific job description every time.",
    },
    {
      question: "Does ResumeAtlas offer resume scoring?",
      answer:
        "Yes, tied to a job description you paste: evidence match, reference ATS keyword score, impact coverage, and which posting skills you prove in bullets. It is not a standalone generic resume grade without a JD like Score My Resume.",
    },
    {
      question: "ResumeAtlas vs Resume Worded pricing",
      answer:
        "ResumeAtlas: free core resume-vs-JD analysis (no signup), 1 optimize run per rolling day when signed in, $2.99 per resume export, no subscription. Resume Worded: free partial score; Pro from about $49/month with Targeted Resume, Magic Write, and templates. Verify current Resume Worded prices at resumeworded.com before checkout.",
    },
  ],
  internalLinks: [
    { path: CHECK_RESUME_AGAINST_JD_PATH, label: "Compare resume to job description" },
    { path: ATS_RESUME_CHECKER_PATH, label: "ATS resume checker" },
    { path: RESUME_KEYWORD_SCANNER_PATH, label: "Resume keyword scanner" },
    { path: ATS_RESUME_TEMPLATE_GUIDE_PATH, label: "ATS resume template guide" },
  ],
};
