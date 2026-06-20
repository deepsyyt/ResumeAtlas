/**
 * Canonical URL → primary Google intent cluster.
 * One clear “job” per URL so pages do not cannibalize each other in title, description, and hero copy.
 *
 * | Cluster        | Canonical path |
 * |----------------|----------------|
 * | Homepage discovery | `/` exposes **role-only** link clusters (`#browse-by-role`); product/tools stay in-page and nav, not separate “topics” columns. |
 * | Brand + apply-readiness commercial (Layer 2 hero) + compare/ATS SEO (Layer 1 title) | / |
 * | Resume ↔ JD compare / match / score (tool execution) | `/check-resume-against-job-description` |
 * | Keyword gap scan (missing terms vs posting) | `/resume-keyword-scanner` (SEO cluster → workbench) |
 * | ATS education (traffic door → workbench) | /ats-resume-checker |
 * | ATS layout guide | /ats-resume-template |
 * | Work history section | /resume-guides/resume-work-experience-examples |
 * | Role examples index | /resume-examples |
 *
 * Freshness: bump `CONTENT_FRESHNESS_YEAR` and `CONTENT_LAST_UPDATED_LABEL` in `contentFreshness.ts`
 * when you refresh money pages (titles, meta, “last updated” lines).
 */

import { getSiteUrl } from "@/app/lib/siteUrl";
import {
  CHECK_RESUME_AGAINST_JD_PATH,
  ATS_RESUME_TEMPLATE_GUIDE_PATH,
  RESUME_WORK_EXPERIENCE_GUIDE_PATH,
} from "@/app/lib/internalLinks";
import { HOME_PAGE_DESCRIPTION, HOME_PAGE_TITLE_ABSOLUTE } from "@/app/lib/homePageSeo";
import {
  CONTENT_FRESHNESS_YEAR,
  CONTENT_LAST_UPDATED_LABEL,
  RESUME_ATLAS_TITLE_SUFFIX,
} from "@/app/lib/searchIntentSeo";

const siteBase = () => getSiteUrl().replace(/\/$/, "");
const abs = (path: string) => `${siteBase()}${path.startsWith("/") ? path : `/${path}`}`;

/** Resume ↔ this job description (tailor / compare / match). Layer 1 SEO + Layer 2 apply-readiness on-page. */
export const CLUSTER_JD_MATCH_TOOL_COPY = {
  titleAbsolute:
    `Compare Resume to Job Description | ATS Score, Gaps & Apply Readiness${RESUME_ATLAS_TITLE_SUFFIX}`,
  description:
    "Compare your resume to a job description free. ATS score, keyword coverage, application verdict, rejection risks, and job-specific fixes before you apply. No signup required.",
  ogTitle:
    `Compare Resume to Job Description | ATS Score, Gaps & Apply Readiness (${CONTENT_FRESHNESS_YEAR})`,
  ogDescription:
    "Compare your resume to a job description free. ATS score, keyword coverage, application verdict, rejection risks, and fixes before you apply.",
  twitterTitle: "Compare resume to job description | ATS score, gaps & apply readiness",
  twitterDescription:
    "Application verdict, keyword coverage, elimination risks, and job-specific optimization. Free, no signup.",
  h1: "Compare resume to a job description | ATS score, gaps, and apply readiness",
  intro:
    "Paste your resume and the exact job description. See whether you're likely to clear screening, what might get you rejected, which skills are proven in bullets vs listed only, and what to fix before you apply. Then optimize proof and download the version for this role.",
  heroEyebrow: "Free · compare resume to job description",
  heroH1: "Before you apply, see what may get you rejected.",
  heroIntro: "Paste your resume and a job description.",
  heroShowLabel: "We'll show:",
  heroBullets: [
    "Your application verdict",
    "Unproven skills",
    "Elimination risks",
    "Recommended fixes",
  ],
  postFormOutcomesHeading: "What you'll learn in one scan",
  postFormOutcomes: [
    "Should you apply?",
    "What may eliminate you?",
    "Which skills are proven vs weak?",
    "What should you fix first?",
    "Which resume version should you send?",
  ],
  primaryNarrative: "Can you realistically clear this role?",
  topStripStrong:
    "Diagnose fit → fix elimination risks → optimize proof → download the version you send.",
  webAppName: "ResumeAtlas compare resume to job description",
  webAppDescription:
    "Evaluate whether your experience supports a specific role: application verdict, unproven skills, elimination risks, and job-specific fixes.",
  differentiatorHeading: "Apply readiness — before you waste time applying",
  differentiatorBody: [
    "Most tools stop at keyword lists. ResumeAtlas evaluates whether your experience supports this specific role: application verdict, elimination risks, and which skills are proven in your bullets vs listed only.",
    "Fix what you can honestly defend, leave gaps visible, then download the posting-specific file you send.",
  ],
  serpVariantsParagraph:
    "People search compare resume to job description, resume match job description, ATS resume checker, resume keyword scanner, tailor resume to job description, and resume not getting interviews. This page delivers ATS score and keyword coverage, then shows application verdict, elimination risks, and fixes before you apply.",
  howItWorksHeading: "Diagnose → fix → apply",
  whyMatchHeading: "Listed vs proven: why strong resumes still get rejected",
  resultsHeading: "What your scan shows",
};

/** Homepage `/` marketing metadata (see `buildHomeMarketingMetadata`). */
export const CLUSTER_HOME_METADATA = {
  title: HOME_PAGE_TITLE_ABSOLUTE,
  description: HOME_PAGE_DESCRIPTION,
  canonicalPath: "/" as const,
  openGraph: {
    title: HOME_PAGE_TITLE_ABSOLUTE,
    description: HOME_PAGE_DESCRIPTION,
    url: abs("/"),
    siteName: "ResumeAtlas" as const,
    type: "website" as const,
  },
};

/** Missing keywords vs a pasted posting (gap list intent). */
export const CLUSTER_KEYWORD_SCANNER_TOOL_COPY = {
  titleAbsolute:
    `Resume Keyword Scanner | Find Missing ATS Keywords Free${RESUME_ATLAS_TITLE_SUFFIX}`,
  description:
    "Extract keywords from a job posting and scan your resume for missing terms, weak coverage, and ATS skill gaps. Free, instant, no signup.",
  ogTitle:
    `Resume Keyword Scanner | Find Missing ATS Keywords Free${RESUME_ATLAS_TITLE_SUFFIX}`,
  ogDescription:
    "Extract posting keywords and find gaps in your resume: missing terms, weak coverage, and skill gaps vs the job.",
  twitterTitle: "Resume Keyword Scanner | Find Missing ATS Keywords Free",
  twitterDescription: "Keyword gaps vs a job posting: missing terms and weak coverage, instantly.",
  h1: "Scan your resume for missing keywords",
  intro:
    "Open the free checker to paste your resume and a job posting. We extract must-have terms from the posting and show missing keywords, weak coverage, and where your resume needs stronger proof.",
  topStripStrong: "Keyword gap scan: posting terms vs your resume text.",
  webAppName: "Resume keyword scanner",
  webAppDescription:
    "Extract keywords from a job posting and find missing or weak terms in your resume.",
  differentiatorHeading: "Keyword gaps vs full resume evaluation",
  differentiatorBody: [
    "This scan centers on keyword coverage: skills, tools, and phrases from the posting that should appear clearly in your experience if they reflect your real background. You get missing keywords, weak coverage areas, term frequency, and suggested terms to add truthfully.",
    "When you also need an application verdict, elimination risks, and optimize-before-apply for one posting, use the job description matcher. When formatting and parser risk dominate, use the ATS checker first.",
  ],
  serpVariantsParagraph:
    "Queries include resume keywords scanner, scanning resumes for keywords, scan my resume for keywords, resume keyword checker, cv keyword scanner, keywords for resume scanners, missing keywords in resume, and job posting keyword gap. This page owns keyword gap detection from a pasted posting.",
  howItWorksHeading: "How the keyword scan works",
  whyMatchHeading: "Why keyword coverage still matters for ATS and recruiters",
  resultsHeading: "What you see after scanning",
};

export const ATS_CHECKER_META_TITLE =
  `Free ATS Resume Checker | ATS Score, Parsing & Format Analysis${RESUME_ATLAS_TITLE_SUFFIX}`;

export const ATS_CHECKER_META_DESCRIPTION =
  "Free ATS resume checker. Analyze parsing compatibility, formatting issues, ATS readability, and keyword coverage before you apply. No signup required.";

export const ATS_CHECKER_WEB_APP_DESCRIPTION =
  "Free ATS resume checker and resume parser for parsing score, readability, formatting, and ATS compatibility.";

/** Prominent contextual link on `/ats-resume-checker` → JD workbench (not in title/meta/H1). */
export const ATS_CHECKER_JD_CONTEXTUAL_LINK = {
  prefix: "Need to compare your resume against a specific job posting? Use our ",
  anchor: "resume-to-job description matcher",
  suffix: ".",
};

/** ATS readability / parse / score — no JD-match SERP (see `/check-resume-against-job-description`). */
export const CLUSTER_ATS_CHECKER_TOOL_COPY = {
  titleAbsolute: ATS_CHECKER_META_TITLE,
  description: ATS_CHECKER_META_DESCRIPTION,
  ogTitle: ATS_CHECKER_META_TITLE,
  ogDescription: ATS_CHECKER_META_DESCRIPTION,
  twitterTitle: "Free ATS Resume Checker | ATS Score, Parsing & Format Analysis",
  twitterDescription: ATS_CHECKER_META_DESCRIPTION,
  h1: "Check whether your resume passes ATS screening",
  intro:
    "Learn how ATS parsers read resumes: parsing, readability, formatting, and ATS compatibility signals—headings, bullets, dates, and layout risks that decide whether your file is parsable. Run a free ATS parsing check when you are ready.",
  topStripStrong: "ATS parsing guide first; run the free readability check when you are ready.",
  webAppName: "ResumeAtlas ATS resume checker",
  webAppDescription: ATS_CHECKER_WEB_APP_DESCRIPTION,
  differentiatorHeading: "Why ATS parsing matters before keyword tuning",
  differentiatorBody: [
    "Employers still care whether your file parses into the right fields. Multi-column layouts, icons, tables for core content, and odd section titles can silently weaken you, even when your experience is strong.",
    "Read this guide to fix structure and format mistakes, then run the free ATS checker for parsing and readability signals before you tailor keywords for a role.",
  ],
  serpVariantsParagraph:
    "Searchers ask about ATS parser behavior, ATS parsing, ATS readability, resume parser tools, parsable resume format, resume formatting for ATS, ATS compatibility, and how ATS scoring works. This page owns parsing and readability education; run the free checker for a live score.",
  howItWorksHeading: "How this ATS resume checker works",
  whyMatchHeading: "Why fix parsing before you chase every keyword",
  resultsHeading: "What your ATS check includes",
};

/** Long-form: templates, layout, how ATS reads resumes (education, not interactive product). */
export const ATS_TEMPLATE_META_TITLE =
  `Free ATS Resume Template (${CONTENT_FRESHNESS_YEAR}) | Word, Google Docs & Copy-Paste${RESUME_ATLAS_TITLE_SUFFIX}`;

export const ATS_TEMPLATE_META_DESCRIPTION =
  "Free ATS resume template for 2026. Download Word format, copy-paste plain text version, and Google Docs template. ATS-friendly layout with real examples.";

export const ATS_TEMPLATE_H1 = "Free ATS Resume Template for Word and Google Docs";

export const CLUSTER_ATS_GUIDE_METADATA = {
  path: ATS_RESUME_TEMPLATE_GUIDE_PATH,
  title: ATS_TEMPLATE_META_TITLE,
  description: ATS_TEMPLATE_META_DESCRIPTION,
  h1: ATS_TEMPLATE_H1,
  /** Same as `title` — one SERP string for HTML, OG, and Article schema. */
  ogTitle: ATS_TEMPLATE_META_TITLE,
  ogDescription: ATS_TEMPLATE_META_DESCRIPTION,
  openGraphUrl: abs(ATS_RESUME_TEMPLATE_GUIDE_PATH),
};

/** Long-form: experience section only (not full resume template hub). */
export const CLUSTER_WORK_EXPERIENCE_METADATA = {
  path: RESUME_WORK_EXPERIENCE_GUIDE_PATH,
  title: `Resume Work Experience Examples (${CONTENT_FRESHNESS_YEAR}) - Work History Section Format${RESUME_ATLAS_TITLE_SUFFIX}`,
  description:
    `How to write the work history section for ${CONTENT_FRESHNESS_YEAR} applications: where it goes, what jobs to list, dates and titles, and bullet examples recruiters skim fast, plus ATS-safe plain text layout. Work-experience intent only. Updated ${CONTENT_LAST_UPDATED_LABEL}. For skills-section formatting, use the resume skills guide; for full resume layout and ATS template rules, use the ATS resume guide.`,
  ogTitle: `Resume Work Experience Examples & Format${RESUME_ATLAS_TITLE_SUFFIX}`,
  ogDescription:
    `Sample work experience blocks and bullet patterns for ${CONTENT_FRESHNESS_YEAR} job searches, experience section only. Updated ${CONTENT_LAST_UPDATED_LABEL}.`,
  openGraphUrl: abs(RESUME_WORK_EXPERIENCE_GUIDE_PATH),
};

/** Hub: pick a role; every card links to that role’s canonical example URL. */
export const CLUSTER_RESUME_EXAMPLES_INDEX_METADATA = {
  path: "/resume-examples" as const,
  title: `Resume Examples by Role (Browse + Open Your Sample Page)${RESUME_ATLAS_TITLE_SUFFIX}`,
  description:
    `Browse ${CONTENT_FRESHNESS_YEAR} resume examples by role: each card links to that role’s canonical guide at /[role]-resume-guide (summary, skills, projects, bullets). Use this hub to pick your job family. For ATS layout rules, read the ATS resume guide; for compare resume to a posting, use the free matcher.`,
  ogTitle: `Resume Examples by Role | ResumeAtlas`,
  ogDescription:
    `ATS-friendly resume examples by role for ${CONTENT_FRESHNESS_YEAR} job searches, one canonical URL per role.`,
  openGraphUrl: abs("/resume-examples"),
};
