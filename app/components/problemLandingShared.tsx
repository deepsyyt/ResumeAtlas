import Link from "next/link";
import type { PreviewEmphasis } from "@/app/lib/problemLandingVariants";
import {
  CHECK_RESUME_AGAINST_JD_ANCHOR,
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
} from "@/app/lib/internalLinks";

export const btnPrimary =
  "inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900";

export const btnPrimarySm =
  "inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900";

export const HOW_STEPS = [
  { title: "Paste resume + job description", body: "Drop both into ResumeAtlas. No login for your first analysis." },
  { title: "Get ATS score + gap analysis", body: "See estimated alignment, missing keywords, and weak spots for that posting." },
  { title: "AI rewrites and aligns bullets", body: "Job-specific wording from the JD, grounded in what you actually did." },
  { title: "Edit and personalize", body: "Tune tone (more human, concise, or technical). Change any line." },
  { title: "Download and apply", body: "Export PDF or DOCX and submit to that role." },
] as const;

const BENEFIT_ITEMS = [
  "Identify missing keywords and ATS-style gaps for the exact job you paste",
  "Rewrite bullets aligned to the job description, not generic resume filler",
  "Preserve your real experience: no fake employers, tools, or wins",
  "Full editing flexibility before download: accept, reject, or rewrite",
  "Export a ready-to-apply resume as PDF or DOCX",
] as const;

const CHIP_SETS: Record<PreviewEmphasis, string[]> = {
  keywords: ["Python", "Snowflake", "Airflow", "Stakeholder mgmt", "A/B tests", "SLA"],
  ats: ["Section labels", "Date format", "Plain text PDF", "SQL"],
  alignment: ["Kubernetes", "CI/CD", "Cross-functional", "Metrics"],
  "overall-gaps": ["Stakeholder mgmt", "SQL", "A/B tests", "CI/CD"],
};

export type ProductPreviewSectionProps = {
  id?: string;
  emphasis: PreviewEmphasis;
  title: string;
  subtitle: string;
};

export function ProductPreviewSection({ id = "product-preview-heading", emphasis, title, subtitle }: ProductPreviewSectionProps) {
  const chips = CHIP_SETS[emphasis];
  const scoreBlock = (
    <div
      className={
        emphasis === "ats"
          ? "rounded-2xl border-2 border-sky-300 bg-white p-5 shadow-md ring-4 ring-sky-100/80"
          : undefined
      }
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {emphasis === "ats" ? "Estimated ATS alignment (example)" : "Estimated ATS alignment"}
      </p>
      <p className="mt-1 text-4xl font-bold tabular-nums text-slate-900 sm:text-5xl">78%</p>
      <p className="mt-1 text-xs text-slate-500">
        {emphasis === "ats"
          ? "Parsing + keyword fit for one resume and one JD"
          : "Example for one resume + one job description"}
      </p>
    </div>
  );

  const keywordsBlock = (
    <div className={emphasis === "keywords" ? "lg:max-w-xl" : "flex-1 lg:max-w-md"}>
      <p
        className={
          emphasis === "keywords"
            ? "text-xs font-semibold uppercase tracking-wider text-amber-800"
            : "text-xs font-semibold uppercase tracking-wider text-slate-500"
        }
      >
        Missing keywords
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {chips.map((k) => (
          <span
            key={k}
            className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-950"
          >
            {k}
          </span>
        ))}
      </div>
    </div>
  );

  const topRowClass = "flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between";

  return (
    <section className="border-b border-slate-100 bg-white py-12 sm:py-16" aria-labelledby={id}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 id={id} className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
            {title}
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">{subtitle}</p>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/40 p-5 shadow-sm sm:p-8">
          {emphasis === "alignment" && (
            <div className="mb-6 grid gap-3 rounded-xl border border-sky-200/80 bg-white/80 p-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-sky-800">Job description asks</p>
                <p className="mt-1 text-sm text-slate-700">
                  SQL analytics, stakeholder reporting, experiment design…
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">Your resume shows</p>
                <p className="mt-1 text-sm text-slate-600">Strong ops work; JD terms thin or buried.</p>
              </div>
            </div>
          )}

          <div className={topRowClass}>
            {emphasis === "keywords" ? (
              <>
                <div className="order-1">{keywordsBlock}</div>
                <div className="order-2 shrink-0 lg:w-56">{scoreBlock}</div>
              </>
            ) : (
              <>
                <div className="order-1">{scoreBlock}</div>
                <div className="order-2">{keywordsBlock}</div>
              </>
            )}
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between text-xs font-medium text-slate-600">
              <span>
                {emphasis === "alignment"
                  ? "Resume vs job description overlap"
                  : "Keyword coverage vs this job"}
              </span>
              <span className="tabular-nums text-slate-900">{emphasis === "alignment" ? "68%" : "72%"}</span>
            </div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-200">
              <div
                className={`h-full rounded-full ${emphasis === "alignment" ? "w-[68%] bg-sky-500" : "w-[72%] bg-emerald-500"}`}
              />
            </div>
          </div>

          <div className="mt-8 grid gap-4 border-t border-slate-200/80 pt-8 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Current bullet</p>
              <p className="mt-2 rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-600">
                Helped improve reporting for the team.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800">Aligned preview</p>
              <p className="mt-2 rounded-xl border border-emerald-200 bg-emerald-50/60 p-3 text-sm text-slate-800">
                Built SQL dashboards for stakeholders; A/B tests lifted conversion 11% QoQ.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BenefitsProductSection() {
  return (
    <section className="py-12 sm:py-16" aria-labelledby="benefits-product-heading">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2
          id="benefits-product-heading"
          className="text-center text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl"
        >
          Fix your resume for this job, not in theory, but in practice
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-slate-600 sm:text-base">
          One flow: compare, rewrite, edit, export. Built for shortlists and ATS-style screens.
        </p>
        <ul className="mx-auto mt-10 max-w-2xl space-y-3 text-sm text-slate-700 sm:text-base">
          {BENEFIT_ITEMS.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function HowItWorksSection() {
  return (
    <section className="border-y border-slate-200 bg-slate-50/50 py-12 sm:py-16" aria-labelledby="how-it-works-heading">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 id="how-it-works-heading" className="text-center text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
          How it works
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-slate-600 sm:text-base">
          Done in minutes, not hours of manual rewriting.
        </p>

        <ol className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-5 md:gap-3 md:overflow-visible md:pb-0 md:snap-none">
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
    </section>
  );
}

export function BeforeAfterVisualSection() {
  return (
    <section className="py-12 sm:py-16" aria-labelledby="before-after-visual-heading">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 id="before-after-visual-heading" className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
          Before vs after
        </h2>
        <p className="mt-2 text-sm text-slate-600 sm:text-base">What changes when your resume matches the posting.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
            <h3 className="text-sm font-semibold text-slate-900">Before</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li className="flex gap-2">
                <span className="shrink-0" aria-hidden>
                  ❌
                </span>
                <span>Generic resume</span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0" aria-hidden>
                  ❌
                </span>
                <span>No keyword alignment</span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0" aria-hidden>
                  ❌
                </span>
                <span>Weak bullets</span>
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
                <span>Job-specific resume</span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0" aria-hidden>
                  ✅
                </span>
                <span>ATS-optimized keywords</span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0" aria-hidden>
                  ✅
                </span>
                <span>Strong, measurable bullets</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FlexibilitySection() {
  return (
    <section
      className="border-t border-slate-200 bg-slate-50/50 py-12 sm:py-16"
      aria-labelledby="flexibility-heading"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 id="flexibility-heading" className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
          AI optimization without losing control
        </h2>
        <ul className="mt-5 space-y-3 text-sm text-slate-700 sm:text-base">
          <li className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" aria-hidden />
            <span>Your original experience and intent stay intact.</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" aria-hidden />
            <span>No fake or exaggerated employers, tools, or metrics.</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" aria-hidden />
            <span>Edit any bullet or section before you download.</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" aria-hidden />
            <span>Adjust tone: more human, more concise, or more technical.</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" aria-hidden />
            <span>Accept or reject AI suggestions line by line.</span>
          </li>
        </ul>
        <p className="mt-6 text-sm font-semibold text-slate-900 sm:text-base">
          Speed from AI. Control to make it yours.
        </p>
      </div>
    </section>
  );
}

export function TimeSavingSection() {
  return (
    <section className="py-12 sm:py-16" aria-labelledby="time-saving-heading">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 id="time-saving-heading" className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
          From hours of rewriting to done in minutes
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
          Manual tailoring means rereading the JD, hunting keywords, rewriting bullets, and rechecking ATS rules, over and over. ResumeAtlas runs that loop in one guided flow so you focus on judgment, not busywork. Start with the{" "}
          <Link
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
          >
            AI ATS resume checker
          </Link>{" "}
          to compare your resume with a job description in one paste.
        </p>
      </div>
    </section>
  );
}

/** Core product phrases + internal links for topical cluster / SEO (problem landings, hub). */
export function TopicClusterCallout({ className = "" }: { className?: string }) {
  const a =
    "font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950";
  const b = "text-sky-800 underline underline-offset-2 hover:text-sky-950";
  return (
    <div
      className={`rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm leading-relaxed text-slate-700 ${className}`}
    >
      <p>
        <Link href={CHECK_RESUME_AGAINST_JD_FORM_HREF} className={a}>
          Use this AI ATS resume checker
        </Link>{" "}
        to find gaps against a real posting.{" "}
        <Link href={CHECK_RESUME_AGAINST_JD_FORM_HREF} className={a}>
          Compare your resume with a job description
        </Link>{" "}
        in one paste on the JD checker, free. Read{" "}
        <Link href="/how-to-pass-ats#how-ats-scans-resumes" className={b}>
          how ATS scans resumes
        </Link>
        ,{" "}
        <Link href="/how-to-pass-ats" className={b}>
          how to pass ATS
        </Link>
        , or{" "}
        <Link href="/problems/resume-vs-job-description" className={b}>
          resume vs job description
        </Link>
        . Browse{" "}
        <Link href="/resume-guides" className={b}>
          ATS-friendly resume guides
        </Link>
        .
      </p>
    </div>
  );
}

export function GuidesFooterLinks() {
  return (
    <div className="mt-8 border-t border-slate-200 pt-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Guides and tools</p>
      <ul className="mt-2 space-y-1 text-sm">
        <li>
          <Link
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
          >
            {CHECK_RESUME_AGAINST_JD_ANCHOR}
          </Link>
        </li>
        <li>
          <Link
            href="/problems/resume-vs-job-description"
            className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
          >
            Resume vs job description
          </Link>
        </li>
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
            All job-search problem pages
          </Link>
        </li>
      </ul>
    </div>
  );
}
