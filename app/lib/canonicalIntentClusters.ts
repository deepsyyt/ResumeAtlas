/**
 * Canonical URL → primary Google intent cluster.
 * One clear “job” per URL so pages do not cannibalize each other in title, description, and hero copy.
 *
 * | Cluster        | Canonical path |
 * |----------------|----------------|
 * | Homepage discovery | `/` exposes **role-only** link clusters (`#browse-by-role`); product/tools stay in-page and nav, not separate “topics” columns. |
 * | Brand + tools hub | / |
 * | Resume ↔ JD   | `/` (posting-fit workbench on homepage) |
 * | Keyword gaps  | (consolidated into homepage workbench) |
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

/** Resume ↔ this job description (tailor / compare / match). */
export const CLUSTER_JD_MATCH_TOOL_COPY = {
  titleAbsolute: `Compare Resume to Job Description — Free AI Checker${RESUME_ATLAS_TITLE_SUFFIX}`,
  description:
    "Compare your resume to any job description for free. Get evidence match, ATS score, keyword gaps, skill proof map, and AI optimization for that posting. Paste only, no signup.",
  ogTitle:
    `Compare Resume to Job Description — Free AI Checker (${CONTENT_FRESHNESS_YEAR})${RESUME_ATLAS_TITLE_SUFFIX}`,
  ogDescription:
    "Free compare resume to job description tool: evidence match, ATS score, keyword gaps, skill proof map, and AI bullet optimization. Paste only, no signup.",
  twitterTitle: "Compare resume to job description — free AI checker",
  twitterDescription:
    "Compare resume to job description: evidence match, keyword gaps, and AI optimization. Free, paste only, no signup.",
  h1: "Compare resume to job description: evidence match, skill proof map & evidence-first optimization",
  intro:
    "Paste your resume and the exact job description. See how much of the job you prove in real project bullets (not just skills lists), a skill-by-skill proof map, honest gap callouts, and reference ATS metrics. Then run evidence-first optimization: move supported JD skills into the right bullets with architecture, deployment, and impact proof. No signup.",
  /** Human-facing homepage hero (metadata keeps SEO `h1` / `intro`). */
  heroEyebrow: "Free resume vs job description checker",
  heroH1: "Match your resume to the job description",
  heroIntro:
    "Compare alignment with the posting you paste, review evidence and skill gaps, then apply AI optimization to strengthen bullets grounded in work you can defend.",
  topStripStrong:
    "Analyze proof, then optimize: evidence match, skill gaps, and interview-safe bullet rewrites for the posting you paste.",
  webAppName: "ResumeAtlas compare resume to job description checker",
  webAppDescription:
    "Free tool to compare resume to job description: evidence match, ATS score, keyword gaps, skill proof map, and AI optimization for that posting.",
  differentiatorHeading: "Evidence match analysis and optimization in one free tool",
  differentiatorBody: [
    "This page is not keyword stuffing. After you paste resume + job description, you get an evidence match score, what-we-measured signals (impact, architecture, deployment, JD skills in bullets), and a skill-by-skill proof map. Optimization moves real work into project bullets and leaves unsupported requirements honest.",
    "ATS keyword score is shown as a reference metric only. It can look fine when proof is thin. Use the ATS checker for parsing and layout; use this page when you need to see what you actually prove for this posting and strengthen bullets without inventing skills.",
  ],
  serpVariantsParagraph:
    "People search compare resume to job description, resume match score, resume gap analysis, optimize resume for job description, and tailor resume to job description. This page is the canonical free tool: read evidence match and skill proof, close honest gaps, then optimize with evidence-first rewrites.",
  howItWorksHeading: "How evidence analysis and optimization works",
  whyMatchHeading: "Why proof in bullets beats keyword lists alone",
  resultsHeading: "What the intelligence dashboard highlights",
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
    "Resume Keyword Scanner (Free) - Find Missing Keywords (2026) | ResumeAtlas",
  description:
    "Scan your resume against a job description and find missing keywords, weak coverage, and ATS-relevant term gaps. Free, instant, and no signup.",
  ogTitle: "Resume Keyword Scanner (Free, 2026) - Missing Keywords Finder | ResumeAtlas",
  ogDescription:
    "Find missing resume keywords vs a real job posting, skill gaps and ATS keyword coverage, instantly.",
  twitterTitle: "Resume keyword scanner (free)",
  twitterDescription: "Keyword gaps vs a detailed JD, instant; works with long postings.",
  h1: "Scan your resume for missing keywords (vs this job description)",
  intro:
    "Paste your resume and a job description to see which important terms from the posting are missing or only appear weakly in your resume. This page is optimized for keyword gap scanning and ATS keyword coverage for that role, not for full match storytelling or formatting-only audits.",
  topStripStrong: "Keyword gap scan: resume text vs the posting you paste.",
  webAppName: "Resume keyword scanner",
  webAppDescription:
    "Detect missing and weak keywords in your resume compared to a target job description.",
  differentiatorHeading: "Keyword gaps vs full resume-to-job-description matching",
  differentiatorBody: [
    "This scan centers on coverage: skills, tools, and phrases from the job description that should show up clearly in your experience and skills if they reflect your real background. It is intentionally narrower than a full “does this resume win this role?” analysis.",
    "When you also need fit narrative, section balance, and match-style scoring against the same posting, use the job description matcher. When formatting and parser risk dominate, use the ATS checker first.",
  ],
  serpVariantsParagraph:
    "Queries include resume keywords scanner, scanning resumes for keywords, resume keyword checker, cv keyword scanner, keywords for resume scanners, missing keywords in resume, and job posting keyword gap. This page owns keyword gap detection vs a pasted posting.",
  howItWorksHeading: "How the keyword scan works",
  whyMatchHeading: "Why keyword coverage still matters for ATS and recruiters",
  resultsHeading: "What you see after scanning",
};

/** ATS readability / parse / score (posting optional). */
export const CLUSTER_ATS_CHECKER_TOOL_COPY = {
  titleAbsolute:
    `Free ATS Resume Checker — Compatibility Score, Parsing & Format Guide (${CONTENT_FRESHNESS_YEAR})${RESUME_ATLAS_TITLE_SUFFIX}`,
  description:
    "Free ATS resume checker guide: what is ATS, how scoring works, parsing, keyword matching, format examples, templates, and common mistakes. Run the free checker when ready — no signup.",
  ogTitle:
    `Free ATS Resume Checker — Score, Parsing & ATS Guide (${CONTENT_FRESHNESS_YEAR})${RESUME_ATLAS_TITLE_SUFFIX}`,
  ogDescription:
    "ATS compatibility guide plus free resume checker: parsing, scoring, keyword matching, format examples, templates, and mistakes to fix.",
  twitterTitle: "Free ATS resume checker (score + parsing guide)",
  twitterDescription:
    "ATS compatibility score, parsing explained, format examples, and mistake fixes—free, instant, JD optional.",
  h1: "Check if your resume is ATS-friendly",
  intro:
    "Learn how applicant tracking systems read resumes: headings, bullets, dates, layout risks, and what a compatibility score actually means. When you are ready to scan your file, use our free resume checker — ATS parsing, job-description match, and optimization in one workflow.",
  topStripStrong: "ATS guide first; run the free checker when you are ready.",
  webAppName: "ResumeAtlas resume checker",
  webAppDescription:
    "Free resume checker: ATS parsing, evidence match vs job description, and AI bullet optimization in one workflow.",
  differentiatorHeading: "Why ATS parsing matters before keyword tuning",
  differentiatorBody: [
    "Employers still care whether your file parses into the right fields. Multi-column layouts, icons, tables for core content, and odd section titles can silently weaken you, even when your experience is strong.",
    "Read this guide to fix structure and format mistakes. Then run the free resume checker & optimizer with your resume and target job description — you get ATS readability signals, evidence match, and tailored bullet suggestions without switching tools.",
  ],
  serpVariantsParagraph:
    "Searchers ask what is ATS, how ATS scoring works, ATS parsing explained, ATS keyword matching, ATS resume format examples, ATS resume templates, ATS resume mistakes, and ATS compatibility score. This page owns ATS education; the live scan lives on the resume checker & optimizer.",
  howItWorksHeading: "How this ATS resume checker works",
  whyMatchHeading: "Why fix parsing before you chase every keyword",
  resultsHeading: "What your ATS check includes",
};

/** Long-form: templates, layout, how ATS reads resumes (education, not interactive product). */
export const CLUSTER_ATS_GUIDE_METADATA = {
  path: ATS_RESUME_TEMPLATE_GUIDE_PATH,
  title: `ATS Resume Template That Passes Screening (Free + Copyable, ${CONTENT_FRESHNESS_YEAR})${RESUME_ATLAS_TITLE_SUFFIX}`,
  description:
    `Free ATS resume template (${CONTENT_FRESHNESS_YEAR}): copyable layout, Word downloads, format rules, and examples that pass applicant tracking systems—not role keyword lists (those live on role keyword pages).`,
  ogTitle: `ATS Resume Template & Format (${CONTENT_FRESHNESS_YEAR}) - Pass ATS Screening${RESUME_ATLAS_TITLE_SUFFIX}`,
  ogDescription:
    "ATS resume format, template, and examples: layout and parsing rules to pass screening. Use the JD matcher to scan keywords for a specific posting.",
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
    `Browse ${CONTENT_FRESHNESS_YEAR} resume examples by role: each card links to that role’s canonical sample page (summary, skills, projects, bullets), not duplicate thin URLs. Use this hub to pick your job family, then open that role’s page. For ATS layout rules, read the ATS resume guide; for compare resume to a posting, use the free matcher.`,
  ogTitle: `Resume Examples by Role | ResumeAtlas`,
  ogDescription:
    `ATS-friendly resume examples by role for ${CONTENT_FRESHNESS_YEAR} job searches, one canonical URL per role.`,
  openGraphUrl: abs("/resume-examples"),
};
