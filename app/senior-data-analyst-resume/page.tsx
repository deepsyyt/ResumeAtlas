import type { Metadata } from "next";
import Link from "next/link";
import { LastUpdated } from "@/app/components/LastUpdated";
import {
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  SENIOR_DATA_ANALYST_RESUME_PATH,
  DATA_ANALYST_RESUME_SUMMARY_PATH,
  ENTRY_LEVEL_DATA_ANALYST_RESUME_PATH,
  ATS_RESUME_CHECKLIST_PATH,
  RESUME_SUMMARY_GUIDE_PATH,
  RESUME_ACTION_VERBS_PATH,
} from "@/app/lib/internalLinks";
import { roleResumeKeywordsPath, roleResumePillarPath } from "@/app/lib/searchIntentSeo";
import { CONTENT_FRESHNESS_YEAR, CONTENT_LAST_UPDATED_LABEL } from "@/app/lib/contentFreshness";
import { getSiteUrl } from "@/app/lib/siteUrl";

const siteBase = getSiteUrl().replace(/\/$/, "");
const pageUrl = `${siteBase}${SENIOR_DATA_ANALYST_RESUME_PATH}`;

export const metadata: Metadata = {
  title: `Senior Data Analyst Resume (${CONTENT_FRESHNESS_YEAR}): ATS Guide, Examples & Keywords | ResumeAtlas`,
  description:
    `Senior data analyst resume guide for ${CONTENT_FRESHNESS_YEAR}: how to show leadership, scope, and strategic impact. Keywords, bullet examples, summary, and a free JD keyword scan.`,
  alternates: { canonical: SENIOR_DATA_ANALYST_RESUME_PATH },
  openGraph: {
    title: `Senior Data Analyst Resume (${CONTENT_FRESHNESS_YEAR}): ATS Guide, Examples & Keywords`,
    description:
      "Senior data analyst resume: leadership, strategic impact, SQL optimization, and cross-functional ownership. Keywords, bullet rewrites, and a free JD scan.",
    url: pageUrl,
    type: "article",
    siteName: "ResumeAtlas",
  },
};

const faqItems = [
  {
    question: "Do I need to sign up to check my senior data analyst resume against a job description?",
    answer:
      "No signup needed. Paste your resume and the target JD into ResumeAtlas — you get a full keyword match score, rejection risks, and selectable fixes in about 60 seconds. First scan is free.",
  },
  {
    question: "What makes a senior data analyst resume different from a mid-level one?",
    answer:
      "Scope, ownership, and business impact. Senior resumes show cross-functional data ownership, stakeholder influence, team mentorship, and business decisions driven by analysis — not just analysis completed. A mid-level bullet says 'built dashboards'; a senior bullet says 'designed a self-serve reporting system adopted by 5 business units that reduced ad-hoc requests by 40%'.",
  },
  {
    question: "What keywords do senior data analyst job descriptions require?",
    answer:
      "Beyond SQL and Python, senior postings frequently require: stakeholder management, executive reporting, A/B test design, data governance, mentoring / coaching, data strategy, product analytics, self-serve BI, dashboard ownership, and cross-functional collaboration. Mirror the exact terms in the specific JD — these vary by company and domain.",
  },
  {
    question: "Should a senior data analyst resume be one page or two?",
    answer:
      "Two pages are appropriate at senior level with 5+ years of experience. Use the space for cross-functional projects, mentorship evidence, and strategic contributions — not for padding technical skills that don't show depth. If you can say it on one page without leaving out major contributions, one page is fine.",
  },
  {
    question: "How do I show leadership on a senior data analyst resume without a management title?",
    answer:
      "Leadership shows through ownership and influence: 'led the analytics workstream for a $2M product launch', 'mentored 3 junior analysts on SQL query optimization', 'drove adoption of a data governance standard across 4 teams'. You don't need 'Manager' in your title to show management-level contribution.",
  },
  {
    question: "How do I show business impact on a data analyst resume?",
    answer:
      "Connect analysis to the downstream business decision and its result. Not: 'analyzed customer churn data'. Yes: 'analyzed customer churn cohorts, identified 3 high-risk segments, and recommended a retention campaign that reduced quarterly churn from 8% to 5% — $400K ARR preserved'. The decision and the result are the evidence of senior-level thinking.",
  },
  {
    question: "What tools should a senior data analyst list on a resume?",
    answer:
      "SQL (with specific engines: BigQuery, Snowflake, Redshift), Python (pandas, numpy), Tableau or Power BI, dbt, Looker, A/B testing platforms, data modeling, and any domain-specific stack the JD names. Every tool in the skills section must appear in a bullet with scope and outcome.",
  },
  {
    question: "How do I quantify data analyst impact on a resume?",
    answer:
      "Use metrics from four categories: scale (rows, tables, users, requests), time (hours saved, days reduced, cycle time), money ($ARR, $cost reduction, $revenue attributed), and quality (defect rate, accuracy, coverage). At senior level, two or three metrics of significant business impact outweigh ten bullets of small technical tasks.",
  },
] as const;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: `Senior Data Analyst Resume (${CONTENT_FRESHNESS_YEAR}): ATS Guide, Examples & Keywords`,
  description:
    "How to write a senior data analyst resume: leadership, strategic impact, keyword coverage, and business outcomes. Before/after bullet examples and a free JD keyword scan.",
  url: pageUrl,
  datePublished: "2026-06-27",
  dateModified: "2026-06-27",
  author: { "@type": "Organization", name: "ResumeAtlas" },
  publisher: { "@type": "Organization", name: "ResumeAtlas", url: siteBase },
};

const BULLET_REWRITES = [
  {
    weak: "Led a project to improve the reporting process for the sales team.",
    strong: "Redesigned the sales reporting pipeline in dbt + BigQuery, reducing weekly report generation time from 6 hours to 45 minutes and enabling self-serve access for 12 sales managers — eliminating 8 recurring analyst ad-hoc requests per week.",
  },
  {
    weak: "Worked with stakeholders to understand their data needs and built dashboards.",
    strong: "Partnered with 4 product, finance, and marketing stakeholders to define KPIs for a $5M growth initiative; built a Tableau dashboard suite that became the single source of truth for weekly OKR reviews.",
  },
  {
    weak: "Mentored junior analysts on the team.",
    strong: "Mentored 3 junior analysts on SQL optimization and A/B test design; both analysts progressed to independent project ownership within 6 months, reducing team backlog by 25%.",
  },
] as const;

const SENIOR_KEYWORDS = [
  "Senior data analyst", "Data strategy", "Stakeholder management", "Executive reporting",
  "Cross-functional collaboration", "Self-serve BI", "Data governance", "A/B test design",
  "Mentoring / coaching", "Product analytics", "Dashboard ownership", "BigQuery", "Snowflake",
  "Redshift", "dbt", "Looker", "Python (pandas)", "SQL optimization", "Data modeling",
  "OKR / KPI frameworks",
];

const SUMMARY_EXAMPLES = [
  {
    label: "Senior analyst — strategic impact focus",
    text: `Senior data analyst with 6 years of SQL, Python, and Tableau experience driving data strategy across product, marketing, and finance teams. Built self-serve BI infrastructure adopted by 8 business units; led A/B test program generating $1.2M in validated revenue uplifts. Seeking a senior or principal analyst role with cross-functional ownership at a product-led company.`,
  },
  {
    label: "Senior analyst — stakeholder leadership focus",
    text: `Senior data analyst with 7 years of end-to-end analytics ownership — from stakeholder discovery through insight delivery and mentorship. Partnered with C-suite on quarterly OKR reporting in Tableau; designed data governance standards adopted across 3 departments. Comfortable with BigQuery, dbt, and Looker in a modern data stack.`,
  },
] as const;

export default function SeniorDataAnalystResumePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <nav className="mb-6 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <span className="mx-2">/</span>
          <Link href={roleResumePillarPath("data-analyst")} className="hover:text-gray-700">Data Analyst Resume</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Senior Data Analyst Resume</span>
        </nav>

        <header className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-wide text-blue-600">Senior Role Resume Guide</p>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            Senior Data Analyst Resume ({CONTENT_FRESHNESS_YEAR}): ATS Guide, Keywords & Examples
          </h1>
          <p className="mb-3 text-lg text-gray-600">
            How to write a senior data analyst resume that goes beyond technical skills to show strategic impact, cross-functional leadership, and business outcomes — with before/after bullet rewrites and a free JD keyword scan.
          </p>
          <p className="mb-6 text-sm text-gray-500">No signup needed for the first scan &middot; Results in about 60 seconds</p>
          <Link href={CHECK_RESUME_AGAINST_JD_FORM_HREF} className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700">
            Check my senior data analyst resume — free
          </Link>
          <p className="mt-2 text-xs text-gray-400">Guest scan free &middot; sign in for +1 scan + free job-specific optimize &middot; pay to download an ATS-friendly resume in seconds</p>
          <LastUpdated label={CONTENT_LAST_UPDATED_LABEL} className="mt-4" />
        </header>

        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold text-gray-900">What ATS looks for on a senior data analyst resume</h2>
          <p className="mb-3 text-gray-700">
            Senior data analyst job descriptions require the same technical keywords as mid-level roles — but they also screen for scope indicators: cross-functional, stakeholder, governance, strategy, mentoring, and ownership-level verbs like &ldquo;led,&rdquo; &ldquo;designed,&rdquo; and &ldquo;drove.&rdquo; A senior resume that only shows technical skills without these signals may pass keyword matching but fail human review because it reads as a mid-level candidate.
          </p>
          <p className="text-gray-700">
            The highest-impact change for most senior candidates is adding a sentence to each bullet that shows the downstream business decision their analysis drove — not just the work completed.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Senior Data Analyst Resume Summary Examples</h2>
          <div className="space-y-5">
            {SUMMARY_EXAMPLES.map((ex) => (
              <div key={ex.label} className="rounded-xl border border-gray-200 p-5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">{ex.label}</p>
                <blockquote className="text-sm leading-relaxed text-gray-700 italic">&ldquo;{ex.text}&rdquo;</blockquote>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm text-gray-500">
            More summary patterns: <Link href={DATA_ANALYST_RESUME_SUMMARY_PATH} className="text-blue-600 hover:underline">data analyst resume summary — 20+ examples by level</Link>
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Senior Data Analyst Resume Bullet Rewrites</h2>
          <div className="space-y-5">
            {BULLET_REWRITES.map((b, i) => (
              <div key={i} className="rounded-xl border border-gray-200 p-5">
                <div className="mb-2 rounded-lg bg-red-50 p-3">
                  <p className="mb-0.5 text-xs font-semibold uppercase text-red-600">Before (no scope or outcome)</p>
                  <p className="text-sm text-gray-700 italic">&ldquo;{b.weak}&rdquo;</p>
                </div>
                <div className="rounded-lg bg-green-50 p-3">
                  <p className="mb-0.5 text-xs font-semibold uppercase text-green-600">After (scope + business outcome)</p>
                  <p className="text-sm text-gray-700 italic">&ldquo;{b.strong}&rdquo;</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Senior Data Analyst Keywords for ATS</h2>
          <div className="flex flex-wrap gap-2">
            {SENIOR_KEYWORDS.map((kw) => (
              <span key={kw} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-800">{kw}</span>
            ))}
          </div>
          <p className="mt-3 text-sm text-gray-500">
            Full keyword list: <Link href={roleResumeKeywordsPath("data-analyst")} className="text-blue-600 hover:underline">data analyst resume keywords — ATS guide</Link>
          </p>
        </section>

        <div className="mb-10 rounded-xl border border-blue-100 bg-blue-50 p-6">
          <p className="mb-1 text-base font-semibold text-blue-900">Generic senior keywords don&apos;t match specific postings.</p>
          <p className="mb-4 text-sm text-blue-700">
            One posting says &ldquo;Looker&rdquo;; another says &ldquo;Tableau&rdquo;. One says &ldquo;data governance&rdquo;; another says &ldquo;data quality.&rdquo; Paste your resume and the specific JD into ResumeAtlas to see exactly which terms are missing.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Link href={CHECK_RESUME_AGAINST_JD_FORM_HREF} className="inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
              Check keyword match — free
            </Link>
            <span className="text-xs text-blue-600">No signup needed for first scan</span>
          </div>
        </div>

        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Related Resources</h2>
          <ul className="space-y-2 text-sm">
            <li><Link href={roleResumePillarPath("data-analyst")} className="text-blue-600 hover:underline">Data analyst resume guide — full ATS guide and examples</Link></li>
            <li><Link href={roleResumeKeywordsPath("data-analyst")} className="text-blue-600 hover:underline">Data analyst resume keywords — 120+ ATS terms by category</Link></li>
            <li><Link href={DATA_ANALYST_RESUME_SUMMARY_PATH} className="text-blue-600 hover:underline">Data analyst resume summary — 20+ examples by level</Link></li>
            <li><Link href={ENTRY_LEVEL_DATA_ANALYST_RESUME_PATH} className="text-blue-600 hover:underline">Entry level data analyst resume — for junior and new grad roles</Link></li>
            <li><Link href={RESUME_SUMMARY_GUIDE_PATH} className="text-blue-600 hover:underline">Resume summary guide — how to write a summary that passes ATS</Link></li>
            <li><Link href={ATS_RESUME_CHECKLIST_PATH} className="text-blue-600 hover:underline">ATS resume checklist — 30-point pre-submission guide</Link></li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">Senior Data Analyst Resume — FAQ</h2>
          <div className="space-y-6">
            {faqItems.map((item, i) => (
              <div key={i}>
                <h3 className="mb-1 font-semibold text-gray-900">{item.question}</h3>
                <p className="text-sm text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-gray-900 px-6 py-10 text-center text-white">
          <h2 className="mb-3 text-2xl font-bold">Senior-level impact deserves senior-level keyword coverage.</h2>
          <p className="mx-auto mb-6 max-w-xl text-gray-300">
            Great contributions buried in vague bullets don&apos;t pass ATS. Paste your resume and the job description into ResumeAtlas. Full keyword match score, rejection risks, and selectable fixes in about 60 seconds.
          </p>
          <Link href={CHECK_RESUME_AGAINST_JD_FORM_HREF} className="inline-block rounded-lg bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow transition hover:bg-gray-100">
            Check my senior data analyst resume — no signup
          </Link>
          <p className="mt-3 text-xs text-gray-400">Guest scan free &middot; sign in for +1 scan + free job-specific optimize &middot; pay to download an ATS-friendly resume in seconds</p>
        </section>
      </main>
    </>
  );
}
