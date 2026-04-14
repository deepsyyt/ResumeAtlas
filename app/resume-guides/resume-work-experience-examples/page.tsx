import type { Metadata } from "next";
import Link from "next/link";
import { LastUpdated } from "@/app/components/LastUpdated";
import {
  ATS_RESUME_TEMPLATE_GUIDE_PATH,
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  CHECK_RESUME_AGAINST_JD_PRIMARY_CTA,
  RESUME_WORK_EXPERIENCE_GUIDE_PATH,
} from "@/app/lib/internalLinks";
import { CLUSTER_WORK_EXPERIENCE_METADATA } from "@/app/lib/canonicalIntentClusters";
import { CONTENT_LAST_UPDATED_LABEL } from "@/app/lib/contentFreshness";
import { getSiteUrl } from "@/app/lib/siteUrl";

const PATH = RESUME_WORK_EXPERIENCE_GUIDE_PATH;

const wx = CLUSTER_WORK_EXPERIENCE_METADATA;
const title = wx.title;
const description = wx.description;

const siteBase = getSiteUrl().replace(/\/$/, "");
const pageUrl = `${siteBase}${PATH}`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PATH },
  keywords: [
    "work experience resume",
    "resume with job experience",
    "resume work experience format",
    "sample resume with work experience",
    "how to put work experience on a resume",
    "work experience section of resume",
    "resume format for work experience",
    "work experience resume examples",
    "scannable resume examples",
  ],
  openGraph: {
    title: wx.ogTitle,
    description: wx.ogDescription,
    url: pageUrl,
    type: "article",
    siteName: "ResumeAtlas",
  },
  twitter: {
    card: "summary_large_image",
    title: wx.ogTitle,
    description: wx.ogDescription,
  },
};

const faqItems = [
  {
    question: "Where does work experience go on a resume?",
    answer:
      "In most layouts it sits below your summary and skills, in reverse chronological order (most recent job first). Keep one column so ATS parsers read employer, title, dates, and bullets in order.",
  },
  {
    question: "How many jobs should I list in work experience?",
    answer:
      "List the roles that are relevant to the job you want, usually the last 10–15 years. Early-career candidates often show internships and part-time work; senior candidates can summarize older roles in one line without full bullet banks.",
  },
  {
    question: "How do I format work experience on a resume?",
    answer:
      "Use a clear line for Job title | Company | City (optional) | Dates. Under each role add 3–6 bullets that start with a verb, name scope/tools, and include outcomes (%, $, time saved, volume) when truthful.",
  },
  {
    question: "What should I write for work experience on a resume?",
    answer:
      "Write proof, not job descriptions. Each bullet should answer what you owned, how you did it, and what changed for the business or user. Mirror honest language from the posting for tools you actually used.",
  },
  {
    question: "How much work experience should a resume show?",
    answer:
      "Enough to prove you can do this next role - typically 3-6 roles or the last 10-15 years. If space is tight, shorten older roles to one line each and keep rich bullets for the most relevant positions.",
  },
] as const;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.answer,
    },
  })),
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  author: { "@type": "Organization", name: "ResumeAtlas" },
  publisher: { "@type": "Organization", name: "ResumeAtlas" },
  mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
};

export default function ResumeWorkExperienceExamplesPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([faqSchema, articleSchema]) }}
      />

      <section className="border-b border-slate-200 bg-gradient-to-b from-slate-50/90 to-white">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-18 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-sky-700">
            Format · samples · ATS-safe layout
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl sm:leading-tight">
            Resume work experience examples &amp; format (how to list jobs + bullets)
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
            For current hiring cycles, lead with a plain-text experience block recruiters and ATS parsers can
            skim fast: titles, dates, and proof-heavy bullets. Below: sample layout, format rules, and bullet
            patterns - whether you are drafting from scratch or tightening an existing experience section.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="inline-flex rounded-xl bg-slate-900 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-slate-800"
            >
              {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
            </Link>
            <Link
              href={ATS_RESUME_TEMPLATE_GUIDE_PATH}
              className="inline-flex rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              Full ATS resume template guide
            </Link>
          </div>
          <LastUpdated className="mx-auto mt-6 text-center text-xs text-slate-500" label={CONTENT_LAST_UPDATED_LABEL} />
        </div>
      </section>

      <article className="mx-auto max-w-3xl space-y-12 px-4 py-12 sm:px-6 lg:px-8">
        <section className="space-y-4 text-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
            The work experience block recruiters expect
          </h2>
          <p className="text-sm leading-relaxed sm:text-base">
            Whether you call it <strong>Experience</strong>, <strong>Work History</strong>, or{" "}
            <strong>Professional Experience</strong>, the job is the same: show titles, employers, dates,
            and a tight set of bullets that prove impact. That structure is also what ATS tools map into
            their “experience” fields - so keep it linear and text-first.
          </p>
          <p className="text-sm leading-relaxed sm:text-base">
            For layout rules that keep parsers happy (headings, columns, file types), pair this page with
            our{" "}
            <Link
              href={ATS_RESUME_TEMPLATE_GUIDE_PATH}
              className="font-semibold text-sky-800 underline underline-offset-2 hover:text-sky-950"
            >
              ATS resume template guide
            </Link>
            . Here we focus on <strong>what to write</strong> inside the experience section.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
            Sample resume work experience format (plain text)
          </h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Paste into Word or Google Docs, replace with your real employers and outcomes, then export a
            text-based PDF for applications.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-xl bg-white p-4 text-left text-xs leading-relaxed text-slate-800 ring-1 ring-slate-900/5 sm:text-sm">
            {`EXPERIENCE

Senior Product Analyst | Northwind Labs | Remote | 2021 – Present
• Defined KPIs for onboarding funnel; partnered with PM on tests that improved day-7 activation by 9%.
• Built self-serve dashboards in Mode + dbt models used weekly by GTM leadership.
• Cut ad-hoc SQL requests ~5 hours/week by documenting reusable queries and data definitions.

Data Analyst | Harbor Retail Co. | Chicago, IL | 2018 – 2021
• Automated weekly inventory reporting in Excel + SQL; reduced compile time from 12 hours to 90 minutes.
• Supported promotion analysis that lowered stockouts by 11% in a pilot region.`}
          </pre>
        </section>

        <section className="space-y-4 text-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
            How to write work experience bullets that rank for “impact”
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-sm sm:text-base">
            <li>
              <strong>Verb + scope + tool + outcome.</strong> Example: “Shipped pricing API in Node and
              Postgres; cut checkout errors by 22% in six weeks.”
            </li>
            <li>
              <strong>Avoid copied job descriptions.</strong> Phrases like “responsible for” or “worked
              closely with” are weak unless you add what you delivered.
            </li>
            <li>
              <strong>Group similar wins.</strong> Three strong bullets beat eight vague lines - especially
              for scannable resumes in high-volume roles.
            </li>
          </ul>
        </section>

        <section className="space-y-4 text-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
            Role-specific example pages on ResumeAtlas
          </h2>
          <p className="text-sm leading-relaxed sm:text-base">
            When you want a full walkthrough with FAQs, keyword strips, and copy-paste samples, use the
            dedicated example hubs below - they follow the same work experience rules described here.
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm sm:text-base">
            <li>
              <Link
                href="/data-analyst-resume-example"
                className="font-semibold text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                Data analyst resume example
              </Link>
            </li>
            <li>
              <Link
                href="/product-manager-resume-example"
                className="font-semibold text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                Product manager resume example
              </Link>
            </li>
            <li>
              <Link
                href="/resume-examples"
                className="font-semibold text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                More resume examples by role
              </Link>
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">Common questions</h2>
          <dl className="space-y-6">
            {faqItems.map((item) => (
              <div key={item.question}>
                <dt className="font-semibold text-slate-900">{item.question}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      </article>
    </main>
  );
}
