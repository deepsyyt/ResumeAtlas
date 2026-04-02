import type { Metadata } from "next";
import Link from "next/link";
import { RelatedProblemsWidget } from "@/app/components/RelatedProblemsWidget";
import { TopicClusterCallout } from "@/app/components/problemLandingShared";
import { getSiteUrl } from "@/app/lib/siteUrl";
import { PROBLEM_PAGES, getRelatedProblemEntries } from "@/app/lib/problemPages";

const SLUG = "resume-not-getting-interviews" as const;
const config = PROBLEM_PAGES[SLUG];

export const metadata: Metadata = {
  title: "Applied to 100 Jobs but No Interviews? Fix Your Resume in 2 Minutes | ResumeAtlas",
  description: config.metaDescription,
  alternates: {
    canonical: "/problems/resume-not-getting-interviews",
  },
};

const btnPrimary =
  "inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900";

const btnPrimarySm =
  "inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900";

const HOW_STEPS = [
  { title: "Paste resume + job description", body: "Drop both texts into ResumeAtlas. No signup for the first pass." },
  { title: "Get ATS score + gap analysis", body: "See estimated alignment, missing keywords, and weak spots for that posting." },
  { title: "AI rewrites and aligns bullets", body: "Job-aligned bullets using real JD language, grounded in what you actually did." },
  { title: "Edit and personalize", body: "Tune tone (more human, concise, or technical). Change any line before you ship it." },
  { title: "Download and apply", body: "Export PDF or DOCX and submit with confidence to that role." },
] as const;

const FEATURE_BLOCKS = [
  {
    title: "Find gaps instantly",
    body: "Surface missing keywords, thin skills, and ATS-style issues for the exact job you are targeting.",
  },
  {
    title: "AI-optimized, job-aligned bullets",
    body: "Rewrite bullets to match the role using phrasing from the job description, not generic resume speak.",
  },
  {
    title: "Preserve your experience",
    body: "No fake employers, tools, or wins. Your core profile stays intact, only sharpened and better aligned.",
  },
  {
    title: "Full editing control",
    body: "Edit bullets, tone, and sections after optimization. Accept, reject, or rewrite until it sounds like you.",
  },
  {
    title: "Ready-to-apply download",
    body: "Export to PDF or DOCX in one click after you are happy with the draft.",
  },
] as const;

export default function ResumeNotGettingInterviewsLandingPage() {
  const related = getRelatedProblemEntries(SLUG);
  const siteUrl = getSiteUrl();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-slate-50/80 to-white">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-18 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-sky-700">Resume optimization</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl sm:leading-tight">
            Applied to 100 Jobs but No Interviews? Fix Your Resume in 2 Minutes
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-700 sm:text-base">
            If your resume is not getting interviews, here&apos;s why and how to fix it using
            role-specific examples, keyword alignment, and ATS-focused improvements.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
            Compare your resume with a job description to find missing keywords, weak bullets, and ATS gaps. Get
            optimized, job-aligned bullet points while keeping your original experience intact.
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm font-medium text-slate-700 sm:text-base">
            AI rewrites your resume. You stay in control: edit, refine, or personalize before downloading.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:gap-4">
            <Link href="/#ats-checker-form" className={btnPrimary}>
              Upload resume and get instant fix suggestions
            </Link>
            <p className="text-xs text-slate-500 sm:text-sm">
              No login required · Free ATS analysis · Takes under 30 seconds
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 pt-6 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-rose-200 bg-rose-50/40 p-4 sm:p-5">
          <h2 className="text-base sm:text-lg font-semibold tracking-tight text-slate-900">
            Top 3 reasons your resume fails first screening
          </h2>
          <ul className="mt-3 list-disc pl-5 space-y-1.5 text-sm text-slate-700">
            <li>Missing must-have keywords from the target job description.</li>
            <li>Bullets describe tasks, not outcomes recruiters can quickly score.</li>
            <li>ATS-parsing friction hides core experience (titles, tools, or dates).</li>
          </ul>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Example failure output</p>
            <p className="mt-2 text-sm text-slate-700">
              Match estimate: <strong className="text-slate-900">62%</strong> · Missing terms:
              <span className="ml-1">SQL, experimentation, stakeholder communication</span> ·
              Highest-impact fix: rewrite top 3 bullets using JD language + measurable outcomes.
            </p>
          </div>
          <div className="mt-4">
            <Link href="/#ats-checker-form" className={btnPrimarySm}>
              Show me exactly what is failing
            </Link>
          </div>
        </section>
      </div>

      <div className="mx-auto max-w-3xl px-4 pb-6 sm:px-6 lg:px-8">
        <TopicClusterCallout />
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
          <h2 className="text-base sm:text-lg font-semibold tracking-tight text-slate-900">
            Role-specific diagnosis
          </h2>
          <ul className="mt-3 list-disc pl-5 space-y-2 text-sm text-slate-700">
            <li>
              <strong>Software Engineer:</strong> weak delivery proof (latency, uptime, CI/CD) often
              blocks interviews.{" "}
              <Link href="/software-engineer-resume-guide#skills" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">
                See role fix
              </Link>
              {" · "}
              <Link href="/software-engineer/keywords/technical-skills" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">
                keywords
              </Link>
            </li>
            <li>
              <strong>Data Scientist:</strong> missing SQL and experiment-impact terms can hide fit.{" "}
              <Link href="/data-scientist-resume-guide#projects" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">
                See role fix
              </Link>
              {" · "}
              <Link href="/data-scientist/keywords/core-keywords" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">
                keywords
              </Link>
            </li>
            <li>
              <strong>Product Manager:</strong> no quantified outcomes (activation, retention, ARR)
              makes bullets look generic.{" "}
              <Link href="/product-manager-resume-guide#summary" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">
                See role fix
              </Link>
              {" · "}
              <Link href="/product-manager/keywords/projects" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">
                keywords
              </Link>
            </li>
          </ul>
          <p className="mt-3 text-sm text-slate-700">
            Related ATS guides:{" "}
            <Link
              href="/how-to-pass-ats#how-ats-scans-resumes"
              className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
            >
              how ATS scans resumes
            </Link>
            {" · "}
            <Link href="/how-to-pass-ats" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">
              how to pass ATS
            </Link>
          </p>
        </section>
      </div>

      {/* Product preview mock */}
      <section className="border-b border-slate-100 bg-white py-12 sm:py-16" aria-labelledby="product-preview-heading">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 id="product-preview-heading" className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
              See what&apos;s wrong and how to fix it, instantly
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
              A single view for score, gaps, and stronger bullets, tailored to the job you paste.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/40 p-5 shadow-sm sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Estimated ATS alignment</p>
                <p className="mt-1 text-4xl font-bold tabular-nums text-slate-900 sm:text-5xl">78%</p>
                <p className="mt-1 text-xs text-slate-500">Example readout for one resume + one job description</p>
              </div>
              <div className="flex-1 lg:max-w-md">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Missing keywords</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["Kubernetes", "Terraform", "CI/CD", "SLOs"].map((k) => (
                    <span
                      key={k}
                      className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-950"
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between text-xs font-medium text-slate-600">
                <span>Keyword coverage vs this job</span>
                <span className="tabular-nums text-slate-900">72%</span>
              </div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full w-[72%] rounded-full bg-emerald-500" />
              </div>
            </div>

            <div className="mt-8 grid gap-4 border-t border-slate-200/80 pt-8 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Current bullet</p>
                <p className="mt-2 rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-600">
                  Responsible for backend services and deployments.
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800">Aligned preview</p>
                <p className="mt-2 rounded-xl border border-emerald-200 bg-emerald-50/60 p-3 text-sm text-slate-800">
                  Shipped Go microservices on Kubernetes (EKS); cut deploy time 40% with Terraform + CI/CD.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature / benefit grid */}
      <section className="py-12 sm:py-16" aria-labelledby="features-heading">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 id="features-heading" className="text-center text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Everything you need to fix your resume, in one pass
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-slate-600 sm:text-base">
            Built for speed, job fit, and shortlists, not generic &quot;resume tips.&quot;
          </p>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURE_BLOCKS.map((f) => (
              <li
                key={f.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300"
              >
                <h3 className="text-base font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-slate-200 bg-slate-50/50 py-12 sm:py-16" aria-labelledby="how-heading">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 id="how-heading" className="text-center text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            How it works
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-slate-600 sm:text-base">
            One guided flow replaces hours of manual rewriting and keyword hunting.
          </p>

          <div className="relative mt-10">
            <ol className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-5 md:gap-3 md:overflow-visible md:pb-0 md:snap-none">
              {HOW_STEPS.map((step, i) => (
                <li
                  key={step.title}
                  className="min-w-[220px] flex-1 snap-center rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:min-w-0"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                    {i + 1}
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
          <p className="mt-8 text-center text-sm font-medium text-slate-700">
            All in minutes, not hours of manual rewriting.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl space-y-14 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Why resumes fail */}
        <section aria-labelledby="why-fail-heading">
          <h2 id="why-fail-heading" className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Why resumes fail to reach interviews
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">{config.rootCauses.intro}</p>
          <ul className="mt-6 space-y-5">
            {config.rootCauses.bullets.map((b) => (
              <li key={b.title}>
                <h3 className="text-base font-semibold text-slate-900">{b.title}</h3>
                <p className="mt-1.5 text-sm text-slate-600 sm:text-base">{b.text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex justify-center">
            <Link href="/#ats-checker-form" className={btnPrimarySm}>
              Run instant resume failure check
            </Link>
          </div>
        </section>

        {/* Mistakes - compact */}
        <section aria-labelledby="mistakes-heading">
          <h2 id="mistakes-heading" className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            {config.mistakes.heading}
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">{config.mistakes.intro}</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700 sm:text-base">
            {config.mistakes.bullets.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>

        {/* What works */}
        <section aria-labelledby="what-works-heading">
          <h2 id="what-works-heading" className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            {config.whatWorks.heading}
          </h2>
          <ol className="mt-5 list-decimal space-y-5 pl-5 text-sm marker:font-semibold sm:text-base">
            {config.whatWorks.steps.map((step) => (
              <li key={step.title} className="pl-1 text-slate-700">
                <span className="font-semibold text-slate-900">{step.title}</span>
                <span className="mt-1.5 block text-slate-600">{step.body}</span>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex justify-center">
            <Link href="/#ats-checker-form" className={btnPrimarySm}>
              Fix my resume
            </Link>
          </div>
        </section>

        {/* Before vs after */}
        <section aria-labelledby="before-after-heading">
          <h2 id="before-after-heading" className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Before vs after
          </h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Outcome-focused signals recruiters and ATS look for first.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
              <h3 className="text-sm font-semibold text-slate-900">Before</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li className="flex gap-2">
                  <span className="shrink-0" aria-hidden>
                    ❌
                  </span>
                  <span>Generic summary</span>
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0" aria-hidden>
                    ❌
                  </span>
                  <span>No job-specific keywords</span>
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0" aria-hidden>
                    ❌
                  </span>
                  <span>Weak, non-impact bullets</span>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/40 p-5">
              <h3 className="text-sm font-semibold text-slate-900">After</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-800">
                <li className="flex gap-2">
                  <span className="shrink-0" aria-hidden>
                    ✅
                  </span>
                  <span>Role-specific bullet points</span>
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0" aria-hidden>
                    ✅
                  </span>
                  <span>Keywords aligned to job description</span>
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0" aria-hidden>
                    ✅
                  </span>
                  <span>Clear, measurable impact</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <Link href="/#ats-checker-form" className={btnPrimary}>
              Get this transformation
            </Link>
          </div>
        </section>

        {/* Control + flexibility */}
        <section className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8" aria-labelledby="control-heading">
          <h2 id="control-heading" className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            AI optimization without losing control
          </h2>
          <ul className="mt-5 space-y-3 text-sm text-slate-700 sm:text-base">
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" aria-hidden />
              <span>Keep your original experience and intent intact. No invented jobs or skills.</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" aria-hidden />
              <span>Adjust tone: more human, more concise, or more technical.</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" aria-hidden />
              <span>Edit any bullet or section before downloading.</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" aria-hidden />
              <span>Accept or reject AI suggestions line by line.</span>
            </li>
          </ul>
          <p className="mt-6 text-sm font-semibold text-slate-900 sm:text-base">
            You get speed from AI and control to make it yours.
          </p>
        </section>

        {/* Time saving */}
        <section aria-labelledby="time-heading">
          <h2 id="time-heading" className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            From hours of manual editing to done in minutes
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            Instead of manually rewriting every bullet, hunting for keywords, and aligning with job descriptions one
            screen at a time, run one guided pass: paste resume and JD, review gaps and rewrites, edit tone, then
            export. What used to take an evening becomes a focused few minutes per application.
          </p>
        </section>

        {/* ResumeAtlas bridge + bottom CTA */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8" aria-labelledby="resumeatlas-heading">
          <h2 id="resumeatlas-heading" className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            {config.resumeAtlas.heading}
          </h2>
          {config.resumeAtlas.paragraphs.map((p, i) => (
            <p key={i} className="mt-3 text-sm text-slate-600 sm:text-base">
              {p}
            </p>
          ))}
          <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
            <Link href="/#ats-checker-form" className={`${btnPrimary} sm:px-8`}>
              Check my resume
            </Link>
            <Link
              href="/#ats-checker-form"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              Compare resume with job description
            </Link>
          </div>
          <div className="mt-8 border-t border-slate-200 pt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Guides and tools</p>
            <ul className="mt-2 space-y-1 text-sm">
              <li>
                <Link href="/how-to-pass-ats" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">
                  How to pass ATS screening
                </Link>
              </li>
              <li>
                <Link
                  href="/resume-guides/resume-skills-examples"
                  className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
                >
                  Resume skills examples
                </Link>
              </li>
              <li>
                <Link href="/problems" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">
                  All problem pages
                </Link>
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">FAQ</h2>
          <div className="mt-6 space-y-4">
            {config.faq.map((f) => (
              <details
                key={f.question}
                className="group rounded-xl border border-slate-200 bg-white px-4 py-3"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-slate-900">{f.question}</h3>
                  <span className="text-xs text-slate-400 group-open:hidden">+</span>
                  <span className="hidden text-xs text-slate-400 group-open:inline">−</span>
                </summary>
                <p className="mt-2 text-sm text-slate-600">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>

      <RelatedProblemsWidget entries={related} siteUrl={siteUrl} />

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  );
}
