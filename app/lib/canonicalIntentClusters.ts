/**
 * Canonical URL → primary Google intent cluster.
 * One clear “job” per URL so pages do not cannibalize each other in title, description, and hero copy.
 *
 * | Cluster        | Canonical path |
 * |----------------|----------------|
 * | Brand + tools hub | / |
 * | Resume ↔ JD   | /check-resume-against-job-description |
 * | Keyword gaps  | /resume-keyword-scanner |
 * | ATS read/score | /ats-resume-checker |
 * | ATS layout guide | /resume-guides/ats-resume-template |
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
import {
  CONTENT_FRESHNESS_YEAR,
  CONTENT_LAST_UPDATED_LABEL,
  RESUME_ATLAS_TITLE_SUFFIX,
} from "@/app/lib/searchIntentSeo";

const siteBase = () => getSiteUrl().replace(/\/$/, "");
const abs = (path: string) => `${siteBase()}${path.startsWith("/") ? path : `/${path}`}`;

export const CLUSTER_HOME_METADATA = {
  title: `ResumeAtlas — Match Resume to Job Description, Keyword Scan & ATS Check${RESUME_ATLAS_TITLE_SUFFIX}`,
  description:
    "ResumeAtlas: compare your resume to a job description, scan for missing keywords vs a posting, and check ATS-friendly formatting—free tools, paste text, no signup.",
  canonicalPath: "/" as const,
  openGraph: {
    title: `ResumeAtlas — Resume vs Job Description + ATS Tools${RESUME_ATLAS_TITLE_SUFFIX}`,
    description:
      "Match resume to job description, find keyword gaps, and improve ATS readability before you apply.",
    url: abs("/"),
    siteName: "ResumeAtlas" as const,
    type: "website" as const,
  },
};

/** Resume ↔ this job description (tailor / compare / match). */
export const CLUSTER_JD_MATCH_TOOL_COPY = {
  titleAbsolute:
    "Match Resume to Job Description (Free) - Compare, Score & Fix Gaps (2026) | ResumeAtlas",
  description:
    "Match your resume to a specific job description and get an estimated match score, missing keywords, and section-level fixes in minutes. Free, instant, no signup. Built for long, modern postings and real ATS screening in 2026 hiring workflows.",
  ogTitle: "Match Resume to Job Description (Free, 2026) | ResumeAtlas",
  ogDescription:
    "Resume vs job description: match-style feedback for the posting you paste—built for long, modern JDs—free, no signup.",
  twitterTitle: "Match resume to job description (free)",
  twitterDescription:
    "Compare resume to the posting—instant gaps; tuned for how employers write job descriptions today.",
  h1: "Match your resume to this job description",
  intro:
    "Paste your resume and the exact job posting. You get feedback focused on that pairing: how well your bullets and skills reflect the posting’s language, which keywords are missing or weak, and what to change first—so you are tailoring to this job description, not polishing a generic file.",
  topStripStrong:
    "Resume-to-job-description matching: use the same posting text you will apply with.",
  webAppName: "Resume vs job description checker",
  webAppDescription:
    "Compare resume text with a job description for keyword overlap, skill gaps, and match-style signals before you apply.",
  differentiatorHeading: "Different from keyword-only scans and ATS-only checks",
  differentiatorBody: [
    "A keyword scanner highlights missing terms. This flow keeps the full job description in view—requirements, responsibilities, and repeated phrases—so edits read as evidence for this role, not a disconnected keyword list.",
    "An ATS checker emphasizes whether machines can read your layout and sections. That matters, but it does not replace proving fit to this posting. Use the ATS checker when structure and parsing are the question; use this page when you have a real JD and need alignment and tailoring priorities.",
  ],
  serpVariantsParagraph:
    "People search compare resume to job description free, tailor resume to job description, resume job description match, resume vs JD, resume matching, and optimize resume for job description. This URL is ResumeAtlas’s canonical answer: paste resume + posting, read gaps for that job, then edit.",
  howItWorksHeading: "How resume-to-job-description matching works",
  whyMatchHeading: "Why one tailored resume beats mass generic applications",
  resultsHeading: "What the match-style readout highlights",
};

/** Missing keywords vs a pasted posting (gap list intent). */
export const CLUSTER_KEYWORD_SCANNER_TOOL_COPY = {
  titleAbsolute:
    "Resume Keyword Scanner (Free) - Find Missing Keywords vs Job Description (2026) | ResumeAtlas",
  description:
    "Scan your resume against a job description and find missing keywords, weak coverage, and ATS-relevant term gaps for that posting. Free, instant, and no signup. Built for long JDs, job-description keyword finder workflows, and resume keyword checker intent in 2026 hiring.",
  ogTitle: "Resume Keyword Scanner (Free, 2026) - Missing Keywords Finder | ResumeAtlas",
  ogDescription:
    "Find missing resume keywords vs a real job posting—skill gaps and ATS keyword coverage—instantly.",
  twitterTitle: "Resume keyword scanner (free)",
  twitterDescription: "Keyword gaps vs a detailed JD—instant; works with long postings.",
  h1: "Scan your resume for missing keywords (vs this job description)",
  intro:
    "Paste your resume and a job description to see which important terms from the posting are missing or only appear weakly in your resume. This page is optimized for keyword gap scanning and ATS keyword coverage for that role—not for full match storytelling or formatting-only audits.",
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
    "ATS Resume Checker (Free) - Format, Parsing & Compatibility Score (2026) | ResumeAtlas",
  description:
    "Check if your resume is ATS-friendly with parsing, section-structure, and formatting-risk diagnostics plus a compatibility-style score. Free and no signup. Built for modern ATS parsing behavior in 2026 hiring systems; optional JD adds keyword overlap.",
  ogTitle: "ATS Resume Checker (Free, 2026) | ResumeAtlas",
  ogDescription:
    "ATS-friendly resume check: parsing, structure, formatting signals—instant, free, paste-only—aligned with how current ATS ingest resumes.",
  twitterTitle: "ATS resume checker (free)",
  twitterDescription: "Parsing + structure + ATS score—built for modern hiring stacks; JD optional.",
  h1: "Check if your resume is ATS-friendly",
  intro:
    "Paste your resume to see how applicant tracking systems are likely to read it: headings, bullets, dates, and layout risks that confuse parsers. The score here is about machine readability and common ATS friction—not the same thing as “did I mirror every line of this job description?”",
  topStripStrong: "ATS-first check: structure and parsing before keyword tuning.",
  webAppName: "ATS resume checker",
  webAppDescription:
    "Estimate ATS readability: structure, parsing-friendly layout, and compatibility scoring. Optional job description for keyword overlap.",
  differentiatorHeading: "ATS readability vs resume-to-job-description matching",
  differentiatorBody: [
    "Employers still care whether your file parses into the right fields. Multi-column layouts, icons, tables for core content, and odd section titles can silently weaken you—even when your experience is strong.",
    "When your main question is how well you match one posting end-to-end, use the job description matcher with that JD. When your main question is whether the file itself will survive ATS ingestion, stay on this checker.",
  ],
  serpVariantsParagraph:
    "Searchers ask does my resume pass ATS, what is an ATS-friendly resume, ATS resume format, ATS resume score, applicant tracking system resume test, ATS resume scanner, and resume formatting for ATS. This checker owns structure, parsing, and ATS-style readability; optional JD adds keyword overlap only.",
  howItWorksHeading: "How this ATS resume checker works",
  whyMatchHeading: "Why fix parsing before you chase every keyword",
  resultsHeading: "What your ATS check includes",
};

/** Long-form: templates, layout, how ATS reads resumes (education, not interactive product). */
export const CLUSTER_ATS_GUIDE_METADATA = {
  path: ATS_RESUME_TEMPLATE_GUIDE_PATH,
  title: `ATS Resume Template (${CONTENT_FRESHNESS_YEAR}) - Best ATS Format + Examples${RESUME_ATLAS_TITLE_SUFFIX}`,
  description:
    `ATS resume template (${CONTENT_FRESHNESS_YEAR}): copy-paste examples, section order, parser-safe layout, and how applicant tracking systems read resumes. Last updated ${CONTENT_LAST_UPDATED_LABEL}. For live resume vs a job description matching, use ResumeAtlas’s free checker; for keyword gap lists, use the keyword scanner.`,
  ogTitle: `ATS Resume Template (${CONTENT_FRESHNESS_YEAR} Format + Examples)${RESUME_ATLAS_TITLE_SUFFIX}`,
  ogDescription:
    `${CONTENT_FRESHNESS_YEAR} ATS-friendly resume layout, templates, and examples—structure and format that parsers and recruiters handle well. Updated ${CONTENT_LAST_UPDATED_LABEL}.`,
  openGraphUrl: abs(ATS_RESUME_TEMPLATE_GUIDE_PATH),
};

/** Long-form: experience section only (not full resume template hub). */
export const CLUSTER_WORK_EXPERIENCE_METADATA = {
  path: RESUME_WORK_EXPERIENCE_GUIDE_PATH,
  title: `Resume Work Experience Examples (${CONTENT_FRESHNESS_YEAR}) - Format, Jobs, Dates & Bullets${RESUME_ATLAS_TITLE_SUFFIX}`,
  description:
    `How to write the work experience section for ${CONTENT_FRESHNESS_YEAR} applications: where it goes, what jobs to list, dates and titles, and bullet examples recruiters skim fast—plus ATS-safe plain text layout. Updated ${CONTENT_LAST_UPDATED_LABEL}. For full resume layout and ATS template rules, use the ATS resume guide; for matching a posting, use the job description tool.`,
  ogTitle: `Resume Work Experience Examples & Format${RESUME_ATLAS_TITLE_SUFFIX}`,
  ogDescription:
    `Sample work experience blocks and bullet patterns for ${CONTENT_FRESHNESS_YEAR} job searches—experience section only. Updated ${CONTENT_LAST_UPDATED_LABEL}.`,
  openGraphUrl: abs(RESUME_WORK_EXPERIENCE_GUIDE_PATH),
};

/** Hub: pick a role; every card links to that role’s canonical example URL. */
export const CLUSTER_RESUME_EXAMPLES_INDEX_METADATA = {
  path: "/resume-examples" as const,
  title: `Resume Examples by Role (Browse + Open Your Sample Page)${RESUME_ATLAS_TITLE_SUFFIX}`,
  description:
    `Browse ${CONTENT_FRESHNESS_YEAR} resume examples by role: each card links to that role’s canonical sample page (summary, skills, projects, bullets)—not duplicate thin URLs. Use this hub to pick your job family, then open that role’s page. For ATS layout rules, read the ATS resume guide; for compare resume to a posting, use the free matcher.`,
  ogTitle: `Resume Examples by Role | ResumeAtlas`,
  ogDescription:
    `ATS-friendly resume examples by role for ${CONTENT_FRESHNESS_YEAR} job searches—one canonical URL per role.`,
  openGraphUrl: abs("/resume-examples"),
};
