import type { Metadata } from "next";
import { getSiteUrl } from "@/app/lib/siteUrl";
import {
  CHECK_RESUME_AGAINST_JD_PATH,
  CHECK_RESUME_AGAINST_JD_PRIMARY_CTA,
  RESUME_VS_JOB_DESCRIPTION_CHECKER_ANCHOR,
} from "@/app/lib/internalLinks";
import {
  CLUSTER_ATS_CHECKER_TOOL_COPY,
  CLUSTER_JD_MATCH_TOOL_COPY,
  CLUSTER_KEYWORD_SCANNER_TOOL_COPY,
} from "@/app/lib/canonicalIntentClusters";

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
  keywords?: string[];
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
    keywords: config.keywords,
    robots: { index: true, follow: true },
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
  breadcrumbName: "Match resume to job description",
  clusterLinkAnchor: RESUME_VS_JOB_DESCRIPTION_CHECKER_ANCHOR,
  ...CLUSTER_JD_MATCH_TOOL_COPY,
  ctaAnchor: CHECK_RESUME_AGAINST_JD_PRIMARY_CTA,
  exampleJobRequires: "Python, SQL, stakeholder communication, and experimentation.",
  exampleResumeContains: "Python, dashboards, and ad-hoc analysis.",
  exampleMissing: "SQL depth, experimentation, and stakeholder-facing outcomes.",
  exampleScoreLine: "Estimated match score: 66% before targeted edits.",
  exampleFixLine:
    "Fix first: add one SQL project bullet and one experiment-impact bullet where truthful.",
  keywords: [
    "match resume to job description",
    "resume vs job description checker",
    "compare resume to job posting",
    "tailor resume to job description",
    "resume job description match",
    "resume matching tool",
    "optimize resume for job description",
    "job description and resume match",
  ],
  faq: [
    {
      question: "What does it mean to match a resume to a job description?",
      answer:
        "It means comparing your resume to one specific posting so you can tailor: add evidence where keywords are missing, rewrite bullets for fit, and show outcomes the JD cares about—honestly. For a missing-keyword list only, use the resume keyword scanner; for layout and parsing risk without a JD, use the ATS checker.",
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
  ...CLUSTER_ATS_CHECKER_TOOL_COPY,
  ctaAnchor: CHECK_RESUME_AGAINST_JD_PRIMARY_CTA,
  exampleJobRequires: "N/A (ATS readability-first scan).",
  exampleResumeContains: "Dense formatting, mixed bullet styles, and unclear section labels.",
  exampleMissing: "Standard headings and clean parser-friendly structure.",
  exampleScoreLine: "Estimated ATS readability score: 58% before formatting cleanup.",
  exampleFixLine:
    "Fix first: one-column layout, standard headings, and consistent bullet/date formatting.",
  keywords: [
    "ATS resume checker",
    "ATS friendly resume check",
    "resume ATS format",
    "check resume for ATS compatibility",
    "resume that will pass ATS",
    "ATS system for resume",
    "resume formatting for ATS",
    "ATS resume format template",
  ],
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
  ctaAnchor: CHECK_RESUME_AGAINST_JD_PRIMARY_CTA,
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
  ...CLUSTER_KEYWORD_SCANNER_TOOL_COPY,
  ctaAnchor: "Scan my resume for missing keywords",
  exampleJobRequires: "Machine learning, SQL, A/B testing, and stakeholder communication.",
  exampleResumeContains: "Python, data analysis, dashboards.",
  exampleMissing: "A/B testing language, SQL depth, and stakeholder terms.",
  exampleScoreLine: "Keyword coverage estimate: 61% for the target posting.",
  exampleFixLine:
    "Fix first: add concrete SQL + experiment bullets tied to project outcomes.",
  keywords: [
    "resume keyword scanner",
    "resume keyword checker",
    "job description keyword finder",
    "resume keyword analyzer",
    "scanning resumes for keywords",
    "keywords for resume scanners",
    "cv keyword scanner",
    "find keywords from job description",
  ],
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
  ctaAnchor: CHECK_RESUME_AGAINST_JD_PRIMARY_CTA,
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
