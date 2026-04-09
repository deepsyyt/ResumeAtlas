import type { Metadata } from "next";
import Link from "next/link";
import { ResumeExampleSeoFunnel } from "@/app/components/ResumeExampleSeoFunnel";
import { CHECK_RESUME_AGAINST_JD_FORM_HREF } from "@/app/lib/internalLinks";
import { goodResumeSnippet } from "@/app/lib/roleHubSeo";
import { getSiteUrl } from "@/app/lib/siteUrl";

const JD_CHECK_HREF = CHECK_RESUME_AGAINST_JD_FORM_HREF;
const KEYWORD_SCANNER_HREF = "/resume-keyword-scanner";
const ATS_CHECKER_HREF = "/ats-resume-checker";

const CANONICAL_PATH = "/data-analyst-resume-example";

export const metadata: Metadata = {
  title: "Data Analyst Resume Example & Template (ATS-Friendly + Sample Projects)",
  description:
    "Data analyst resume example and copy-paste template: SQL, Python, Power BI, metrics, and sample bullets for data analytics roles. Use this ATS-friendly format as your base, then match it to any job description.",
  keywords: [
    "data analyst resume",
    "data analyst resume example",
    "data analyst resume template",
    "data analyst resume sample",
    "data analytics resume",
    "best resume for data analyst",
    "ATS resume example",
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${getSiteUrl()}${CANONICAL_PATH}`,
  },
};

const COPY_PASTE_TEMPLATE = `JORDAN CHEN
Data Analyst
San Francisco, CA | jordan.chen@email.com | linkedin.com/in/jordanchen

SUMMARY
Data analyst with experience building dashboards, SQL pipelines, and experiment readouts for product and growth teams. Comfortable turning messy data into clear recommendations for stakeholders. Seeking a data analyst role where SQL, Python, and storytelling drive decisions.

SKILLS
Python • SQL • Excel • Power BI • A/B Testing • Data Visualization • Statistical Testing

EXPERIENCE

Data Analyst | Northwind Analytics | 2022 – Present
• Owned weekly KPI reporting for a B2B SaaS funnel; surfaced a 19% drop in trial-to-paid conversion and led a fix that recovered $340K ARR within two quarters.
• Built SQL models and Power BI dashboards used by sales and CS leadership, cutting ad-hoc request time by ~6 hours per week.
• Partnered with PMs on A/B tests: designed metrics, validated sample sizes, and summarized results for exec reviews.

Junior Data Analyst | Harbor Retail Co. | 2020 – 2022
• Automated Excel reporting for 40+ stores; reduced manual compilation from 12 hours to 90 minutes per month.
• Analyzed promotion and inventory data in SQL; helped reduce stockouts by 11% in a pilot region.

PROJECTS

Customer Churn Drivers: Python, SQL, Power BI
Clustered at-risk accounts and built a Power BI story for sales; prioritized outreach list that correlated with a 7% lift in retention in a 90-day pilot.

Marketing Attribution: SQL, Excel
Mapped multi-touch journeys from raw event data; aligned with marketing on a simpler rule set that improved forecast accuracy vs. last-click by 14%.

EDUCATION
B.S. Statistics, State University, 2020`;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a good data analyst resume?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "A strong data analyst resume leads with measurable outcomes (revenue, conversion, time saved), names tools like SQL and Python in context, and mirrors the job description for the role you want, not a generic list of duties.",
      },
    },
    {
      "@type": "Question",
      name: "How do I write a data analyst resume with no experience?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Use projects, coursework, and internships: show SQL or Python work, a dashboard or notebook, and clear metrics (even if the scale is small). Pair that with a tailored skills section and bullets that match the posting’s language.",
      },
    },
    {
      "@type": "Question",
      name: "How do I pass ATS screening?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Use standard section headings, plain one-column layout, and include keywords from the job description where they match your real experience. Run a quick scan against the posting before you submit. Most ATS issues are fixable gaps, not mystery.",
      },
    },
  ],
};

const copyPasteExampleBullets = [
  "Owned weekly KPI reporting for a B2B SaaS funnel; surfaced a 19% drop in trial-to-paid conversion and led a fix that recovered $340K ARR within two quarters.",
  "Built SQL models and Power BI dashboards for sales and CS leadership, cutting ad-hoc request time by ~6 hours per week.",
  "Partnered with PMs on A/B tests: designed metrics, validated sample sizes, and summarized results for exec reviews.",
];

const copyPasteItemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Data Analyst Resume Example (Copy & Paste)",
  itemListElement: copyPasteExampleBullets.map((text, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: text,
  })),
} as const;

export default function DataAnalystResumeExamplePage() {
  const goodResumeLines = goodResumeSnippet("data-analyst", "Data Analyst");

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* 1. Hero */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Data Analyst Resume Example &amp; Template (ATS-Friendly + Sample Projects)
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            One page for <strong className="font-semibold text-slate-800">data analyst resume examples</strong>, a
            plain-text <strong className="font-semibold text-slate-800">template</strong>, and a full sample you can
            copy, built for data analytics and analyst roles, ATS scans, and hiring managers.
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Whether you need a <strong className="font-semibold text-slate-800">resume sample</strong> for your first
            analyst job or a stronger layout for a senior data analytics resume, start here and tailor to each posting.
          </p>
          <p className="mt-3 text-sm font-medium text-slate-500">
            Takes 10 seconds • No signup required
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href={JD_CHECK_HREF}
              className="inline-flex justify-center rounded-xl bg-slate-900 px-6 py-3.5 text-center text-base font-semibold text-white transition hover:bg-slate-800"
            >
              Optimize this resume for a job description
            </Link>
            <Link
              href={KEYWORD_SCANNER_HREF}
              className="inline-flex justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-center text-base font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              Find missing keywords in your resume
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl space-y-14 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <section aria-labelledby="da-copy-paste-heading">
          <h2
            id="da-copy-paste-heading"
            className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl"
          >
            Data Analyst Resume Example (Copy &amp; Paste)
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            Metric-driven bullets recruiters and ATS both look for. Paste into your experience section
            and rewrite with your own numbers.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-800 sm:text-base">
            {copyPasteExampleBullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
            What is a good data analyst resume?
          </h2>
          <p className="mt-3 text-sm text-slate-700 sm:text-base">{goodResumeLines.line1}</p>
          <p className="mt-2 text-sm text-slate-700 sm:text-base">{goodResumeLines.line2}</p>
        </section>

        <ResumeExampleSeoFunnel />

        {/* 2. Full resume example */}
        <section aria-labelledby="resume-preview-heading">
          <h2 id="resume-preview-heading" className="sr-only">
            Full resume example
          </h2>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 bg-slate-50/80 px-5 py-4 sm:px-6">
              <p className="text-center text-xs font-medium uppercase tracking-wider text-slate-500">
                Resume preview (ATS-friendly layout)
              </p>
            </div>
            <div className="space-y-5 px-5 py-6 text-sm leading-relaxed text-slate-800 sm:px-8 sm:py-8 sm:text-[15px]">
              <header className="text-center">
                <p className="text-lg font-semibold tracking-tight text-slate-900">Jordan Chen</p>
                <p className="mt-1 text-slate-700">Data Analyst</p>
                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  San Francisco, CA · jordan.chen@email.com · linkedin.com/in/jordanchen
                </p>
              </header>

              <div>
                <h3 className="border-b border-slate-200 pb-1 text-xs font-bold uppercase tracking-wide text-slate-900">
                  Summary
                </h3>
                <p className="mt-2 text-slate-700">
                  Data analyst who turns messy data into clear recommendations for product and growth.
                  Strong in SQL, Python, and dashboards; comfortable partnering with PMs on A/B tests and
                  funnel analysis. Excited to align analysis with business goals and measurable impact.
                </p>
              </div>

              <div>
                <h3 className="border-b border-slate-200 pb-1 text-xs font-bold uppercase tracking-wide text-slate-900">
                  Skills
                </h3>
                <p className="mt-2 text-slate-700">
                  Python · SQL · Excel · Power BI · A/B Testing · Data Visualization · Statistical Testing
                </p>
              </div>

              <div>
                <h3 className="border-b border-slate-200 pb-1 text-xs font-bold uppercase tracking-wide text-slate-900">
                  Experience
                </h3>
                <div className="mt-3 space-y-4">
                  <div>
                    <p className="font-semibold text-slate-900">
                      Data Analyst · Northwind Analytics{" "}
                      <span className="font-normal text-slate-600">(2022–Present)</span>
                    </p>
                    <ul className="mt-2 list-disc space-y-1.5 pl-5 text-slate-700">
                      <li>
                        Owned weekly KPI reporting for a B2B SaaS funnel; flagged a 19% trial-to-paid drop
                        and supported a fix that recovered ~$340K ARR within two quarters.
                      </li>
                      <li>
                        Built SQL-backed models and Power BI dashboards for sales and CS, saving ~6 hours
                        of ad-hoc requests per week.
                      </li>
                      <li>
                        Ran A/B tests with PMs: metrics, sample sizes, and exec-ready summaries, driving
                        clearer product decisions.
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">
                      Junior Data Analyst · Harbor Retail Co.{" "}
                      <span className="font-normal text-slate-600">(2020–2022)</span>
                    </p>
                    <ul className="mt-2 list-disc space-y-1.5 pl-5 text-slate-700">
                      <li>
                        Automated Excel reporting for 40+ stores; cut monthly reporting from 12 hours to
                        about 90 minutes.
                      </li>
                      <li>
                        Used SQL on promotion and inventory data to help reduce stockouts by 11% in a pilot
                        region.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="border-b border-slate-200 pb-1 text-xs font-bold uppercase tracking-wide text-slate-900">
                  Projects
                </h3>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-slate-700">
                  <li>
                    <span className="font-medium text-slate-900">Customer churn drivers</span>: Python,
                    SQL, Power BI: prioritized at-risk accounts; pilot cohort showed ~7% retention lift in 90
                    days.
                  </li>
                  <li>
                    <span className="font-medium text-slate-900">Marketing attribution</span>: SQL,
                    Excel: simplified multi-touch rules; improved forecast accuracy vs. last-click by 14%.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="border-b border-slate-200 pb-1 text-xs font-bold uppercase tracking-wide text-slate-900">
                  Education
                </h3>
                <p className="mt-2 text-slate-700">B.S. Statistics, State University, 2020</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Template */}
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Data Analyst Resume Template (Copy-Paste)
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            Plain text, single column, standard headings. Easy for ATS to parse. Copy the block below
            into Word or Google Docs and swap in your details.
          </p>
          <pre className="mt-4 max-h-[min(28rem,70vh)] overflow-auto rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs leading-relaxed text-slate-800 sm:p-5 sm:text-[13px]">
            {COPY_PASTE_TEMPLATE}
          </pre>
        </section>

        {/* 4. Bullet point bridge */}
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Data Analyst Resume Bullet Points
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            Strong bullets prove impact. Use numbers, tools, and scope, then tailor to each posting.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700 sm:text-base">
            <li>
              Automated SQL + Python reporting for a 12-person revenue team, reducing weekly prep from 8
              hours to 2 while improving forecast accuracy.
            </li>
            <li>
              Designed Power BI dashboards for funnel and cohort metrics; used by PM and exec staff in
              weekly QBRs.
            </li>
            <li>
              Analyzed A/B test results with statistical significance checks; recommended a ship that
              lifted signup conversion by 6.3%.
            </li>
            <li>
              Partnered with finance to reconcile billing anomalies in SQL, recovering $180K in missed
              revenue recognition in one quarter.
            </li>
            <li>
              Built Excel models for pricing scenarios; influenced a 4% margin improvement on a core SKU
              bundle.
            </li>
            <li>
              Documented data definitions and metric lineage in a shared wiki, cutting cross-team “what does
              this number mean?” questions by roughly half.
            </li>
          </ul>
          <p className="mt-5 text-sm text-slate-600">
            <Link
              href="/data-scientist-resume-bullet-points"
              className="font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-900"
            >
              See more data analyst-style bullet points
            </Link>{" "}
            (closest cluster on ResumeAtlas; many patterns overlap with analytics and experimentation
            roles).
          </p>
        </section>

        {/* 5. Common mistakes */}
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Common Mistakes in Data Analyst Resumes
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700 sm:text-base">
            <li>
              <strong className="text-slate-900">No metrics</strong>: “Analyzed data” doesn’t tell
              recruiters or ATS what changed. Tie work to outcomes.
            </li>
            <li>
              <strong className="text-slate-900">Missing keywords</strong>: If the job asks for SQL,
              Python, and experimentation, those words should appear where you truly have the experience.
            </li>
            <li>
              <strong className="text-slate-900">Generic descriptions</strong>: One resume for every
              application usually fails. Most resumes fail because they don&apos;t mirror the job
              description.
            </li>
            <li>
              <strong className="text-slate-900">Not matching job description</strong>: The posting is
              your cheat sheet. Align skills and bullets without inventing experience.
            </li>
          </ul>
          <Link
            href="/problems/ats-rejecting-my-resume"
            className="mt-6 inline-flex text-sm font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-900"
          >
            Fix why your resume is getting rejected
          </Link>
        </section>

        {/* 6. Core conversion */}
        <section className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Check if Your Resume Matches the Job Description
          </h2>
          <p className="mt-3 text-sm text-slate-700 sm:text-base">
            Most resumes fail because they don&apos;t match the job description. See exactly what&apos;s
            missing: keywords, emphasis, and gaps. Fix them before you hit submit.
          </p>
          <Link
            href={JD_CHECK_HREF}
            className="mt-6 inline-flex rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 sm:text-base"
          >
            Optimize this resume for a job description
          </Link>
        </section>

        {/* 7. Keywords */}
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Keywords to Include in a Data Analyst Resume
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            These show up often in data analyst postings. Use them only where they reflect your real work.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700 sm:text-base">
            <li>Python</li>
            <li>SQL</li>
            <li>Data Visualization</li>
            <li>Machine Learning</li>
            <li>A/B Testing</li>
          </ul>
          <Link
            href={KEYWORD_SCANNER_HREF}
            className="mt-6 inline-flex rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            Scan my resume for missing keywords
          </Link>
        </section>

        {/* 8. ATS */}
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            How to Make Your Resume ATS-Friendly
          </h2>
          <p className="mt-3 text-sm text-slate-700 sm:text-base">
            Keep one column, standard headings (Summary, Experience, Education, Skills), and avoid
            graphics-heavy layouts for core text. ATS tools parse simple text best; then humans skim for
            impact and clarity.
          </p>
          <p className="mt-3 text-sm text-slate-700 sm:text-base">
            <Link
              href="/how-to-pass-ats"
              className="font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-900"
            >
              Read the full ATS checklist
            </Link>{" "}
            (formatting, keywords, file types). For a dedicated score pass, use the{" "}
            <Link
              href={ATS_CHECKER_HREF}
              className="font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-900"
            >
              ATS resume checker
            </Link>
            .
          </p>
        </section>

        {/* 10. FAQ */}
        <section id="faq">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            FAQ
          </h2>
          <div className="mt-6 space-y-3">
            {(faqSchema.mainEntity as { name: string; acceptedAnswer: { text: string } }[]).map(
              (q) => (
                <details
                  key={q.name}
                  className="group rounded-xl border border-slate-200 bg-white px-4 py-3"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-slate-900">{q.name}</span>
                    <span className="text-xs text-slate-400 group-open:hidden">+</span>
                    <span className="hidden text-xs text-slate-400 group-open:inline">−</span>
                  </summary>
                  <p className="mt-2 text-sm text-slate-600">{q.acceptedAnswer.text}</p>
                </details>
              )
            )}
          </div>
        </section>
      </div>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(copyPasteItemListSchema) }}
      />
    </div>
  );
}
