import Link from "next/link";
import {
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  RESUME_SKILLS_GUIDE_PATH,
} from "@/app/lib/internalLinks";
import { mergeResumeExampleFaqSchema, type FaqSchemaEntity } from "@/app/lib/resumeExampleSeoTemplate";

const COPY_PASTE_TEMPLATE = `[YOUR NAME]
Data Analyst
[City, State] | [Email] | [LinkedIn]

SUMMARY
[1 line about years/industry] + [1 line about tools] + [1 line about business impact].

SKILLS
SQL | Python | Excel | Tableau or Power BI | A/B Testing | ETL | Forecasting

EXPERIENCE
[Job Title] | [Company A] | [Dates]
- [Action verb] [business process] using [tool], improving [metric] by [X%].
- Built [dashboard/report] for [stakeholder], reducing [time/cost] by [X].
- Partnered with [team] on [analysis/experiment], resulting in [outcome].

PROJECTS AT COMPANY A
[Project Name]
- Problem: [what needed fixing]
- Approach: [SQL/Python/BI method]
- Impact: [metric lifted, time saved, or cost reduced]

[Job Title] | [Company B] | [Dates]
- Owned [KPI/reporting area] across [team/function].
- Improved data quality by [method], reducing [error/rework] by [X].

PROJECTS AT COMPANY B
[Project Name]
- Problem: [operational or growth issue]
- Approach: [analysis + stakeholder collaboration]
- Impact: [business result]

EDUCATION
[Degree], [School], [Year]

CERTIFICATIONS (OPTIONAL)
[Certification], [Year]`;

const skillChips = [
  "SQL",
  "Python",
  "Excel",
  "Tableau",
  "Power BI",
  "A/B Testing",
  "Dashboards",
] as const;

const topBullets = [
  "Built Tableau dashboards that reduced weekly reporting time by 62% for GTM leadership.",
  "Automated SQL reporting pipelines, saving 12 hours per week across analytics operations.",
  "Improved signup conversion by 14% by identifying funnel drop-offs and prioritizing test ideas.",
  "Standardized KPI definitions across teams, reducing reporting disputes and metric drift.",
  "Partnered with product and finance to uncover billing anomalies and recover missed revenue.",
  "Created cohort retention analysis in Python, identifying high-risk segments that informed lifecycle campaigns.",
  "Designed experiment readouts with guardrail metrics, helping teams ship winning variants with lower rollback risk.",
] as const;

const faqEntities: FaqSchemaEntity[] = [
  {
    "@type": "Question",
    name: "What should a data analyst resume include?",
    acceptedAnswer: {
      "@type": "Answer",
      text:
        "Include a short summary, job-matched skills, measurable experience bullets, and a clean ATS-friendly format with standard headings.",
    },
  },
  {
    "@type": "Question",
    name: "How long should a data analyst resume be?",
    acceptedAnswer: {
      "@type": "Answer",
      text:
        "One page for most early and mid-career applicants. Two pages can work if you have substantial relevant experience with measurable outcomes.",
    },
  },
  {
    "@type": "Question",
    name: "Is SQL required for a data analyst resume?",
    acceptedAnswer: {
      "@type": "Answer",
      text:
        "For most data analyst roles, yes. SQL is one of the highest-signal skills for ATS and recruiter screening.",
    },
  },
  {
    "@type": "Question",
    name: "How do I pass ATS screening?",
    acceptedAnswer: {
      "@type": "Answer",
      text:
        "Use one-column layout, standard headings, and role-matched keywords that reflect your real experience. Focus on measurable outcomes in each bullet.",
    },
  },
];

const faqPageSchema = mergeResumeExampleFaqSchema("Data Analyst", faqEntities);

export function DataAnalystResumeExampleMain({ omitHero = false }: { omitHero?: boolean }) {
  return (
    <div className={omitHero ? "bg-white text-slate-900" : "min-h-screen bg-white text-slate-900"}>
      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 backdrop-blur sm:hidden">
        <Link
          href="#resume-example"
          className="block rounded-xl bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white"
        >
          View Resume Example
        </Link>
      </div>

      {!omitHero ? (
        <section className="border-b border-slate-200 bg-slate-50/60">
          <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Data Analyst Resume Example That Gets Interviews (2026)
            </h1>
            <p className="mt-3 max-w-2xl text-base text-slate-600 sm:text-lg">
              ATS-friendly resume example with SQL/Python skills, bullet points, and copy-paste template.
            </p>
            <p className="mt-3 text-sm font-medium text-slate-500">Updated 2026 • ATS-Friendly • Real Metrics Examples</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="#resume-example"
                className="inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                View Resume Example
              </Link>
              <Link
                href="#template"
                className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                Copy Template
              </Link>
              <Link
                href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
                className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                Match to Job Description
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <div className="mx-auto max-w-3xl space-y-10 px-4 py-8 pb-24 sm:px-6 sm:py-10 sm:pb-10 lg:px-8">
        <section id="resume-example" aria-labelledby="resume-example-h2">
          <h2 id="resume-example-h2" className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Data Analyst Resume Example
          </h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
              <p className="text-center text-xs font-medium uppercase tracking-wider text-slate-500">
                ATS-friendly full resume preview
              </p>
            </div>
            <div className="space-y-4 px-5 py-6 text-sm text-slate-800 sm:px-7">
              <p className="text-lg font-semibold text-slate-900">Jordan Chen</p>
              <p>Data Analyst | San Francisco, CA | jordan.chen@email.com</p>
              <div>
                <p className="font-semibold text-slate-900">Summary</p>
                <p className="mt-1">
                  Data analyst focused on SQL, dashboards, and experiment readouts that drive business decisions.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Skills</p>
                <p className="mt-1">Python, SQL, Excel, Power BI, A/B Testing, Data Visualization</p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Experience</p>
                <p className="mt-2 font-medium text-slate-900">Data Analyst | Northwind Analytics | 2022-Present</p>
                <ul className="mt-1 list-disc space-y-1.5 pl-5">
                  <li>Recovered ~$340K ARR by identifying and fixing trial-to-paid drop-off.</li>
                  <li>Cut ad-hoc reporting by ~6 hours/week through SQL and dashboard automation.</li>
                </ul>
                <p className="mt-2 font-medium text-slate-900">Project: Churn Signal Model</p>
                <ul className="mt-1 list-disc space-y-1.5 pl-5">
                  <li>Built churn-risk segmentation pipeline (SQL + Python); pilot outreach improved retention by 7%.</li>
                </ul>
                <p className="mt-3 font-medium text-slate-900">Junior Data Analyst | Harbor Retail Co. | 2020-2022</p>
                <ul className="mt-1 list-disc space-y-1.5 pl-5">
                  <li>Reduced monthly reporting from 12 hours to 90 minutes through workflow automation.</li>
                  <li>Improved stockout decisions by analyzing promotion and inventory datasets in SQL.</li>
                </ul>
                <p className="mt-2 font-medium text-slate-900">Project: Attribution Diagnostics</p>
                <ul className="mt-1 list-disc space-y-1.5 pl-5">
                  <li>Created Power BI attribution diagnostics dashboard; improved marketing forecast confidence.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="template" aria-labelledby="template-h2">
          <h2 id="template-h2" className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Data Analyst Resume Template
          </h2>
          <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            Fill-in template: replace every `[placeholder]` with your own details and metrics.
          </div>
          <pre className="mt-4 max-h-[22rem] overflow-auto rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs leading-relaxed text-slate-800 sm:text-sm">
            {COPY_PASTE_TEMPLATE}
          </pre>
          <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm text-slate-700">
            <li>Keep this to one page for most roles.</li>
            <li>Use numbers in at least 2 bullets per role.</li>
            <li>Mirror keywords from the target job description.</li>
          </ul>
        </section>

        <section id="skills" aria-labelledby="skills-h2">
          <h2 id="skills-h2" className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Skills for Data Analyst Resume
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-700 sm:grid-cols-4 sm:text-base">
            {skillChips.map((skill) => (
              <li key={skill} className="list-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-center">
                {skill}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-slate-600">
            Use only skills you can prove in your bullets. Need formatting help? See{" "}
            <Link href={RESUME_SKILLS_GUIDE_PATH} className="font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-900">
              resume skills examples
            </Link>
            .
          </p>
        </section>

        <section id="resume-bullet-points-h2" aria-labelledby="bullets-h2">
          <h2 id="bullets-h2" className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Data Analyst Resume Bullet Points
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700 sm:text-base">
            {topBullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="mistakes-h2">
          <h2 id="mistakes-h2" className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Common Data Analyst Resume Mistakes
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700 sm:text-base">
            <li>Listing tools without outcomes or metrics.</li>
            <li>Using generic bullets that do not match the posting language.</li>
            <li>Dense formatting that ATS parsers struggle to read.</li>
            <li>Submitting one resume version for every role.</li>
          </ul>
        </section>

        <section id="faq" aria-labelledby="faq-h2">
          <h2 id="faq-h2" className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            FAQ
          </h2>
          <div className="mt-4 space-y-3">
            {faqEntities.map((q) => (
              <details key={q.name} className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                <summary className="cursor-pointer text-sm font-semibold text-slate-900">{q.name}</summary>
                <p className="mt-2 text-sm text-slate-600">{q.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Want to tailor this resume to a real job posting?
          </h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/ats-resume-checker"
              className="inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Analyze My Resume
            </Link>
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              Match to Job Description
            </Link>
          </div>
        </section>
      </div>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
    </div>
  );
}
