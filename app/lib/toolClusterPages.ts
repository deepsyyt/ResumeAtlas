import type { Metadata } from "next";
import { getSiteUrl } from "@/app/lib/siteUrl";
import {
  CHECK_RESUME_AGAINST_JD_PATH,
  RESUME_VS_JOB_DESCRIPTION_CHECKER_ANCHOR,
} from "@/app/lib/internalLinks";

export type ToolClusterFaqItem = { question: string; answer: string };

export type ToolClusterPageConfig = {
  path: string;
  /** Breadcrumb list item name (position 3) */
  breadcrumbName: string;
  /** Anchor text when this URL is linked from other cluster pages */
  clusterLinkAnchor: string;
  titleAbsolute: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
  h1: string;
  /** Intro under hero bullets */
  intro: string;
  /** Trust-strip line right above top CTA (intent-specific). */
  topStripStrong: string;
  webAppName: string;
  webAppDescription: string;
  faq: ToolClusterFaqItem[];
  /** Primary button + final CTA link text */
  ctaAnchor: string;
  /** Unique H2 block per URL (reduces duplicate-content risk vs other tool pages). */
  differentiatorHeading: string;
  /** 2–4 short paragraphs; must differ materially from other cluster pages. */
  differentiatorBody: string[];
  /** One paragraph weaving in long-tail / variant phrases for broader query coverage. */
  serpVariantsParagraph: string;
  /** Variant section headings to reduce template repetition across money pages. */
  howItWorksHeading: string;
  whyMatchHeading: string;
  resultsHeading: string;
  exampleJobRequires: string;
  exampleResumeContains: string;
  exampleMissing: string;
  exampleScoreLine: string;
  exampleFixLine: string;
};

const siteBase = () => getSiteUrl().replace(/\/$/, "");
const ogImage = () => `${siteBase()}/og-resume-checker.png`;

export function buildToolClusterMetadata(config: ToolClusterPageConfig): Metadata {
  const absolutePageUrl = `${siteBase()}${config.path}`;
  const img = ogImage();
  return {
    title: { absolute: config.titleAbsolute },
    description: config.description,
    alternates: { canonical: absolutePageUrl },
    openGraph: {
      title: config.ogTitle,
      description: config.ogDescription,
      type: "website",
      url: absolutePageUrl,
      images: [
        {
          url: img,
          width: 1200,
          height: 630,
          alt: config.webAppName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: config.twitterTitle,
      description: config.twitterDescription,
      images: [img],
    },
  };
}

export function toolClusterAbsoluteUrl(path: string): string {
  return `${siteBase()}${path}`;
}

export function toolClusterWebApplicationSchema(config: ToolClusterPageConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: config.webAppName,
    url: toolClusterAbsoluteUrl(config.path),
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    description: config.webAppDescription,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

export function toolClusterFaqSchema(config: ToolClusterPageConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function toolClusterBreadcrumbSchema(config: ToolClusterPageConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteBase(),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: `${siteBase()}/tools`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: config.breadcrumbName,
        item: toolClusterAbsoluteUrl(config.path),
      },
    ],
  };
}

export const TOOL_CLUSTER_PRIMARY: ToolClusterPageConfig = {
  path: CHECK_RESUME_AGAINST_JD_PATH,
  breadcrumbName: "Check resume against job description",
  clusterLinkAnchor: RESUME_VS_JOB_DESCRIPTION_CHECKER_ANCHOR,
  titleAbsolute:
    "Check Resume Against Job Description (Free ATS Match + Keyword Gaps)",
  description:
    "Check your resume against a job description: see ATS-style match, missing keywords, and weak sections—then fix alignment before you apply. Free, instant, no signup.",
  ogTitle: "Check Resume Against Job Description (Free ATS Match + Keyword Gaps)",
  ogDescription:
    "Check resume vs job description: missing keywords, match estimate, and fixes. Free, no signup.",
  twitterTitle: "Check Resume Against Job Description",
  twitterDescription: "ATS match + keyword gaps vs the JD—free.",
  h1: "Check Your Resume Against the Job Description (Free ATS Match + Gaps)",
  intro:
    "Paste your resume and the exact job description to check alignment in seconds—missing keywords, skill gaps, and the edits most likely to improve shortlist odds.",
  topStripStrong: "Paste your resume and job description to get results instantly.",
  webAppName: "Check resume against job description",
  webAppDescription:
    "Check your resume against a job description for keyword gaps, match-style feedback, and ATS alignment before you apply.",
  ctaAnchor: "Check why my resume gets rejected",
  differentiatorHeading: "Why Match Your Resume to the Job Description (Not a Generic Resume)",
  differentiatorBody: [
    "Employers and ATS tools compare your resume to the exact job description for that role. A generic resume that never references the posting’s skills, tools, or outcomes will almost always score lower than one that mirrors the same language—honestly and specifically.",
    "This page focuses on resume–job description alignment: you paste both texts so the analysis can highlight gaps recruiters and filters care about for that single application.",
  ],
  serpVariantsParagraph:
    "People also search for resume and job description comparison, resume JD match, job description keyword checker, and ATS resume review against a posting. This free tool gives you a practical read on how your resume lines up with the role you are targeting—before you spend time on rewrites.",
  howItWorksHeading: "How resume-to-JD matching works",
  whyMatchHeading: "Why tailoring to each job description increases interview odds",
  resultsHeading: "What to expect in your match report",
  exampleJobRequires: "Python, SQL, stakeholder communication, and experimentation.",
  exampleResumeContains: "Python, dashboards, and ad-hoc analysis.",
  exampleMissing: "SQL depth, experimentation, and stakeholder-facing outcomes.",
  exampleScoreLine: "Estimated match score: 66% before targeted edits.",
  exampleFixLine:
    "Fix first: add one SQL project bullet and one experiment-impact bullet where truthful.",
  faq: [
    {
      question: "What does it mean to match a resume to a job description?",
      answer:
        "It means aligning your resume with the skills and keywords mentioned in the job posting to improve ATS compatibility.",
    },
    {
      question: "Why is ATS matching important?",
      answer:
        "Most companies use ATS to filter resumes. If your resume does not match the job description, it may not reach recruiters.",
    },
    {
      question: "Is this resume checker free?",
      answer:
        "Yes, you can check your resume against a job description for free and get instant insights.",
    },
    {
      question: "How can I improve my resume score?",
      answer:
        "You can improve your score by adding missing keywords, aligning your experience with the job requirements, and optimizing your resume structure.",
    },
  ],
};

export const TOOL_CLUSTER_ATS_FREE: ToolClusterPageConfig = {
  path: "/ats-resume-checker",
  breadcrumbName: "ATS Resume Checker",
  clusterLinkAnchor: "ATS resume checker",
  titleAbsolute: "Why Your Resume Is Getting Rejected by ATS (Check Now)",
  description:
    "Why your resume is getting rejected by ATS: test parsing, formatting, and section structure, then fix the issues that block screening. Paste-only, free, no signup.",
  ogTitle: "Why Your Resume Is Getting Rejected by ATS (Check Now)",
  ogDescription:
    "Check ATS compatibility: parsing, section structure, formatting signals, and an instant score. Not the same as matching a specific job description.",
  twitterTitle: "Why Your Resume Is Getting Rejected by ATS",
  twitterDescription: "Check ATS parsing, formatting, and structure—free. No signup.",
  h1: "Why Your Resume Is Getting Rejected by ATS (Check Now)",
  intro:
    "Check if your resume passes applicant tracking systems: parsing, formatting, section structure, and an ATS compatibility score — without focusing on a single job posting.",
  topStripStrong: "Paste your resume below to get your ATS score in seconds.",
  webAppName: "ATS Resume Checker",
  webAppDescription:
    "Estimate whether ATS software can read your resume cleanly: structure, parsing-friendly layout, and compatibility scoring. Optional job description for extra keyword overlap.",
  ctaAnchor: "Check why ATS rejects my resume",
  differentiatorHeading: "What This ATS Check Actually Measures",
  differentiatorBody: [
    "This scan emphasizes how applicant tracking systems ingest your resume: whether sections and bullets parse cleanly, whether headings look machine-readable, and whether the document avoids patterns that often break parsers (dense columns, unusual separators, heavy decoration).",
    "It is intentionally different from “does this resume match this job description?” — that deeper keyword alignment lives on the job description checker when you paste a posting.",
  ],
  serpVariantsParagraph:
    "People search for ATS resume checker, check ATS compatibility, applicant tracking system resume test, ATS resume scanner, and free ATS resume checker online. This page targets ATS readability and parsing; for resume vs a specific job description, use the JD matcher tool.",
  howItWorksHeading: "How this free ATS resume checker works",
  whyMatchHeading: "Why ATS readability matters before keyword tuning",
  resultsHeading: "What your ATS check reports",
  exampleJobRequires: "N/A (ATS readability-first scan).",
  exampleResumeContains: "Dense formatting, mixed bullet styles, and unclear section labels.",
  exampleMissing: "Standard headings and clean parser-friendly structure.",
  exampleScoreLine: "Estimated ATS readability score: 58% before formatting cleanup.",
  exampleFixLine:
    "Fix first: one-column layout, standard headings, and consistent bullet/date formatting.",
  faq: [
    {
      question: "What is an ATS resume checker?",
      answer:
        "It analyzes how well your resume is likely to perform in applicant tracking systems based on structure, formatting, and readability — how the system reads your file — not full job-description matching unless you add a posting.",
    },
    {
      question: "Is this ATS checker free?",
      answer:
        "Yes. Paste your resume to get instant feedback for free with no signup required.",
    },
    {
      question: "Why does ATS reject resumes?",
      answer:
        "Common reasons include poor formatting, missing standard sections, layouts that do not parse cleanly, and content that machines cannot map into experience and skills fields.",
    },
    {
      question: "Can ATS read PDF resumes?",
      answer:
        "Often yes, but complex design, text in images, and multi-column layouts can cause parsing errors. Simple, linear text usually parses more reliably.",
    },
    {
      question: "What score is good for ATS?",
      answer:
        "Scores from 80% and up are generally strong for ATS readability; 60–79% usually means targeted fixes; below 60% often correlates with higher filter risk.",
    },
  ],
};

export const TOOL_CLUSTER_SCORE: ToolClusterPageConfig = {
  path: "/resume-score-checker",
  breadcrumbName: "Resume Score Checker",
  clusterLinkAnchor: "resume score checker",
  titleAbsolute: "Resume Score Checker vs Job Description (Free ATS Match)",
  description:
    "Free resume score checker: compare your resume to a job description and see match score, missing keywords, and improvements. No signup.",
  ogTitle: "Resume Score Checker vs Job Description (Free ATS Match)",
  ogDescription:
    "Get a resume match score against your target role, plus keyword gaps and suggestions—instantly and free.",
  twitterTitle: "Resume Score Checker (Free)",
  twitterDescription: "See your resume match score vs the job description.",
  h1: "Resume Score Checker Online Free",
  intro:
    "Get a clear match score versus a specific job posting, understand what drives the score, and focus your next edits on the gaps that matter most.",
  topStripStrong: "Paste your resume and target job description to get a match score.",
  webAppName: "Resume Score Checker",
  webAppDescription:
    "Check your resume score against a job description: keyword match, gaps, and ATS-style alignment.",
  ctaAnchor: "resume score checker",
  differentiatorHeading: "How Resume Score Is Calculated",
  differentiatorBody: [
    "Your score summarizes how well your resume aligns with the pasted job description—especially keyword coverage, skills overlap, and whether your experience reads relevant to that posting. It is an estimate meant to mirror what many systems reward: clear match to the role’s stated requirements.",
    "Scores are not published by employers and can vary by ATS. Treat the number as a directional signal: if it is low, your first lever is usually stronger alignment to the job description (keywords + outcomes), not a fancier template.",
  ],
  serpVariantsParagraph:
    "Users often look for a resume score checker, job match score for resumes, resume rating vs job description, or ATS match score. This page is built around resume scoring against a specific JD—so you can see where your application might look weak before you submit.",
  howItWorksHeading: "How your resume score is generated",
  whyMatchHeading: "Why score-based feedback improves resume decisions",
  resultsHeading: "What you see in a resume score report",
  exampleJobRequires: "Roadmapping, analytics, and cross-functional execution.",
  exampleResumeContains: "Delivery ownership and release cadence, but thin analytics language.",
  exampleMissing: "Prioritization framework terms and measurable business impact.",
  exampleScoreLine: "Estimated resume score: 63% against this posting.",
  exampleFixLine:
    "Fix first: add KPI-linked outcomes and explicit prioritization decisions in bullets.",
  faq: [
    {
      question: "What does a resume score mean?",
      answer:
        "It reflects how closely your resume aligns with the job description for skills and keywords—similar to what many ATS use as a signal.",
    },
    {
      question: "Is the resume score the same as an employer’s ATS score?",
      answer:
        "Employers use different systems and rules. Our score is an estimate to help you improve alignment before you apply.",
    },
    {
      question: "How do I improve my resume score?",
      answer:
        "Add truthful keywords from the posting, clarify impact in your bullets, and keep formatting simple so parsers can read your sections.",
    },
    {
      question: "Is the resume score checker free?",
      answer:
        "Yes. You can check your resume against a job description for free and get instant insights.",
    },
  ],
};

export const TOOL_CLUSTER_KEYWORD_SCANNER: ToolClusterPageConfig = {
  path: "/resume-keyword-scanner",
  breadcrumbName: "Resume Keyword Scanner",
  clusterLinkAnchor: "resume keyword scanner",
  titleAbsolute: "Find Missing Keywords in Your Resume (ATS Fix Tool)",
  description:
    "Find missing keywords in your resume vs a job description. See skill gaps and improve ATS keyword coverage with truthful edits. Free, instant, no signup.",
  ogTitle: "Find Missing Keywords in Your Resume (ATS Fix Tool)",
  ogDescription:
    "Find missing keywords, identify skill gaps, and improve ATS keyword coverage. Paste resume + job description.",
  twitterTitle: "Find Missing Keywords in Your Resume",
  twitterDescription: "Spot missing keywords and skill gaps vs the posting—instantly.",
  h1: "Find Missing Keywords in Your Resume (ATS Fix Tool)",
  intro:
    "Scan your resume to find missing keywords, identify skill gaps, and improve how your profile lines up with applicant tracking systems—before you apply.",
  topStripStrong: "Paste your resume to find missing keywords instantly.",
  webAppName: "Resume Keyword Scanner",
  webAppDescription:
    "Compare your resume to a job posting to detect missing keywords, skill gaps, and weak keyword coverage.",
  ctaAnchor: "Scan my resume for missing keywords",
  differentiatorHeading: "Keyword Gaps vs Full Resume Matching",
  differentiatorBody: [
    "This entry focuses on what is missing: skills and terms from the job description that do not show up clearly in your resume. It is built for gap detection and keyword coverage—not a full ATS formatting audit (use the ATS checker) or a deep role-fit narrative (use the job description matcher).",
    "Paste your resume and the posting text so the scan can compare the two. Use the lists to add honest evidence in bullets and skills—projects, tools, and outcomes—not a block of disconnected buzzwords.",
  ],
  serpVariantsParagraph:
    "Related searches include resume keyword analysis, ATS keyword scanner, resume keyword checker, keyword optimization for resume, missing keywords resume, and job description keyword gap. This page targets keyword and skill gaps versus a specific posting—not generic keyword clouds.",
  howItWorksHeading: "How resume keyword scanning works",
  whyMatchHeading: "Why keyword coverage affects shortlist rate",
  resultsHeading: "What keyword-gap results show",
  exampleJobRequires: "Machine learning, SQL, A/B testing, and stakeholder communication.",
  exampleResumeContains: "Python, data analysis, dashboards.",
  exampleMissing: "A/B testing language, SQL depth, and stakeholder terms.",
  exampleScoreLine: "Keyword coverage estimate: 61% for the target posting.",
  exampleFixLine:
    "Fix first: add concrete SQL + experiment bullets tied to project outcomes.",
  faq: [
    {
      question: "What is a resume keyword scanner?",
      answer:
        "It analyzes your resume against a job description to surface missing or weak keywords that can affect ATS ranking and recruiter skim speed.",
    },
    {
      question: "Why are keywords important in resumes?",
      answer:
        "Applicant tracking systems and recruiters often use role-relevant terms to filter and rank candidates. Thin keyword coverage can hide strong experience.",
    },
    {
      question: "Is this keyword scanner free?",
      answer:
        "Yes. Paste your resume and job description to get keyword insights instantly without signing up.",
    },
    {
      question: "How do I add keywords naturally?",
      answer:
        "Work them into your experience, projects, and skills sections with concrete examples instead of listing them out of context.",
    },
    {
      question: "Can this guarantee job selection?",
      answer:
        "No tool can guarantee an outcome. It helps you pass filters more often by closing honest keyword gaps before you apply.",
    },
  ],
};

export const TOOL_CLUSTER_COMPAT: ToolClusterPageConfig = {
  path: "/ats-compatibility-check",
  breadcrumbName: "ATS Compatibility Check",
  clusterLinkAnchor: "ATS compatibility check",
  titleAbsolute: "ATS Compatibility Check — Free Resume vs Job Description Test",
  description:
    "Run an ATS compatibility check: compare your resume with a job description for keyword fit, structure, and gaps. Free, no signup.",
  ogTitle: "ATS Compatibility Check — Free Resume vs Job Description Test",
  ogDescription:
    "Test ATS compatibility before you apply. See how your resume lines up with the posting.",
  twitterTitle: "ATS Compatibility Check",
  twitterDescription: "Test resume ATS compatibility vs the job description—free.",
  h1: "ATS Compatibility Check Online Free",
  intro:
    "Test whether your resume is both machine-readable and role-aligned, so ATS parsing issues or weak keyword alignment do not block interviews.",
  topStripStrong: "Paste resume + job description to test ATS compatibility quickly.",
  webAppName: "ATS Compatibility Check",
  webAppDescription:
    "Free ATS compatibility test: compare your resume with a job description for keyword and structure alignment.",
  ctaAnchor: "ATS compatibility check",
  differentiatorHeading: "ATS Formatting & Parsing Issues That Hurt Compatibility",
  differentiatorBody: [
    "Even strong experience can underperform if the ATS cannot parse your layout: multi-column designs, text in images, tables for core content, or unusual section titles. Compatibility is partly “does my resume say the right things?” and partly “can a machine read it reliably?”",
    "Pair keyword alignment with simple structure: standard headings (Experience, Education, Skills), one main column, and plain text for important skills. That combination usually improves both machine readability and recruiter skim speed.",
  ],
  serpVariantsParagraph:
    "Common queries include ATS compatibility test, ATS friendly resume check, resume parser compatibility, and ATS readable resume format. This page emphasizes compatibility in the broad sense—language match to the job plus structure that parsers typically handle well.",
  howItWorksHeading: "How ATS compatibility checking works",
  whyMatchHeading: "Why compatibility is both content and structure",
  resultsHeading: "What your compatibility report includes",
  exampleJobRequires: "Role-specific terms plus readable experience structure.",
  exampleResumeContains: "Good skills list but weak section naming and inconsistent chronology.",
  exampleMissing: "Parser-friendly section hierarchy and tighter role alignment terms.",
  exampleScoreLine: "Compatibility estimate: 64% before structure + keyword fixes.",
  exampleFixLine:
    "Fix first: normalize section titles and align bullets to posting language honestly.",
  faq: [
    {
      question: "What is ATS compatibility?",
      answer:
        "It means your resume is easy for applicant tracking systems to read and maps well to the skills and keywords in the job description.",
    },
    {
      question: "Why does formatting affect ATS compatibility?",
      answer:
        "Complex layouts, images, and tables can break parsing. Simple sections and standard headings usually parse more reliably.",
    },
    {
      question: "Can I improve ATS compatibility quickly?",
      answer:
        "Yes. Align keywords with the posting where accurate, tighten bullets, and simplify formatting.",
    },
    {
      question: "Is this ATS compatibility check free?",
      answer:
        "Yes. Paste your resume and job description to run a free compatibility-style check.",
    },
  ],
};

/** All tool cluster pages (primary first). */
export const ALL_TOOL_CLUSTER_CONFIGS: ToolClusterPageConfig[] = [
  TOOL_CLUSTER_PRIMARY,
  TOOL_CLUSTER_ATS_FREE,
  TOOL_CLUSTER_KEYWORD_SCANNER,
];

export const TOOL_CLUSTER_PATHS_FOR_OAUTH: readonly string[] = ALL_TOOL_CLUSTER_CONFIGS.map(
  (c) => c.path
);

export function getToolClusterConfig(path: string): ToolClusterPageConfig | undefined {
  const n = path.replace(/\/$/, "") || "/";
  return ALL_TOOL_CLUSTER_CONFIGS.find((c) => c.path === n);
}
