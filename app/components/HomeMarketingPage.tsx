import Link from "next/link";
import {
  HiOutlineDocumentText,
  HiOutlineMagnifyingGlass,
  HiOutlineSparkles,
  HiOutlineArrowDownTray,
} from "react-icons/hi2";
import { HomeBrowseByRoleSection } from "@/app/components/HomeBrowseByRoleSection";
import { HomeOptimizedResumePreviewSection } from "@/app/components/HomeOptimizedResumePreviewSection";
import { HomeStep1PreviewSection } from "@/app/components/HomeStep1PreviewSection";
import {
  ATS_RESUME_CHECKER_PATH,
  CHECK_RESUME_AGAINST_JD_PATH,
  CHECK_RESUME_AGAINST_JD_PRIMARY_CTA,
} from "@/app/lib/internalLinks";
import {
  HOME_COMPARE_SECTION_EYEBROW,
  HOME_COMPARE_SECTION_HEADING,
  HOME_COMPARE_SECTION_INTRO,
  HOME_COMPARISON_ROWS,
  HOME_FAQ,
  HOME_MARKETING_OUTCOMES,
  HOME_MARKETING_SEO_BRIDGE,
  HOME_PROBLEM_HEADING,
  HOME_PROBLEM_INTRO,
  HOME_PROBLEM_SCENARIOS,
  HOME_VS_SECTION_EYEBROW,
  HOME_VS_SECTION_HEADING,
} from "@/app/lib/homeMarketingContent";

// ─── Constants ───────────────────────────────────────────────────────────────

const TRUST_SIGNALS = [
  "Free scan — no signup",
  "Instant results",
  "Job-specific, not generic",
  "Pay only to download",
] as const;

const HOW_STEPS = [
  {
    key: "paste",
    Icon: HiOutlineDocumentText,
    title: "Paste resume & job description",
    body: "Plain text, one posting at a time. No file upload, no account needed.",
    iconBg: "bg-indigo-50",
    iconText: "text-indigo-600",
    borderHover: "hover:border-indigo-200",
    accentFrom: "from-indigo-500",
    accentTo: "to-indigo-300",
  },
  {
    key: "analyze",
    Icon: HiOutlineMagnifyingGlass,
    title: "Get your Job Application Verdict",
    body: "Apply, Optimize First, or Skip — plus rejection risks, Shortlist Odds, and skill proof.",
    iconBg: "bg-violet-50",
    iconText: "text-violet-600",
    borderHover: "hover:border-violet-200",
    accentFrom: "from-violet-500",
    accentTo: "to-violet-300",
  },
  {
    key: "optimize",
    Icon: HiOutlineSparkles,
    title: "Select recommended fixes",
    body: "Choose what gets applied. Optimize free after sign-in — tailored summary, proven bullets.",
    iconBg: "bg-amber-50",
    iconText: "text-amber-600",
    borderHover: "hover:border-amber-200",
    accentFrom: "from-amber-500",
    accentTo: "to-amber-300",
  },
  {
    key: "download",
    Icon: HiOutlineArrowDownTray,
    title: "Download the version you send",
    body: "Review every change in an editable preview, then export ATS-ready PDF or DOCX.",
    iconBg: "bg-emerald-50",
    iconText: "text-emerald-600",
    borderHover: "hover:border-emerald-200",
    accentFrom: "from-emerald-500",
    accentTo: "to-emerald-300",
  },
] as const;

const OUTCOME_BADGE_CLASSES = [
  "bg-indigo-100 text-indigo-800",
  "bg-rose-100 text-rose-900",
  "bg-emerald-100 text-emerald-800",
  "bg-violet-100 text-violet-800",
  "bg-amber-100 text-amber-900",
  "bg-sky-100 text-sky-900",
  "bg-slate-200 text-slate-700",
] as const;

const OUTCOME_ACCENT_CLASSES = [
  "bg-indigo-400",
  "bg-rose-400",
  "bg-emerald-400",
  "bg-violet-400",
  "bg-amber-400",
  "bg-sky-400",
  "bg-slate-300",
] as const;

// ─── FAQ chevron ─────────────────────────────────────────────────────────────

function ChevronDown() {
  return (
    <svg
      className="mt-0.5 h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-180"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export function HomeMarketingPage() {
  return (
    <main className="min-h-screen">

      {/* ─── Hero ──────────────────────────────────────────────────────── */}
      <HomeStep1PreviewSection />

      {/* ─── Trust bar ─────────────────────────────────────────────────── */}
      <div className="border-b border-slate-100 bg-white">
        <div className="page-shell py-3 sm:py-3.5">
          <ul
            className="flex list-none flex-wrap items-center justify-center gap-x-6 gap-y-2 p-0 sm:gap-x-10"
            aria-label="ResumeAtlas trust signals"
          >
            {TRUST_SIGNALS.map((signal) => (
              <li
                key={signal}
                className="flex items-center gap-2 text-xs font-medium text-slate-600 sm:text-sm"
              >
                <span
                  className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[9px] font-bold leading-none text-emerald-700"
                  aria-hidden
                >
                  ✓
                </span>
                {signal}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ─── Problem agitation ─────────────────────────────────────────── */}
      <section
        aria-labelledby="home-problem-heading"
        className="border-b border-slate-100 bg-slate-50"
      >
        <div className="page-shell py-10 sm:py-12 lg:py-14">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-600/90">
              Sound familiar?
            </p>
            <h2
              id="home-problem-heading"
              className="mt-2 text-xl font-bold tracking-[-0.025em] text-slate-900 sm:text-2xl"
            >
              {HOME_PROBLEM_HEADING}
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-slate-500">
              {HOME_PROBLEM_INTRO}
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {HOME_PROBLEM_SCENARIOS.map((scenario, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                {/* Top accent */}
                <div className="absolute inset-x-0 top-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-rose-400 to-rose-300" />
                <blockquote className="mt-1 text-sm font-medium italic leading-relaxed text-slate-700">
                  {scenario.pain}
                </blockquote>
                <div className="mt-4 flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-bold text-indigo-700">
                    →
                  </span>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {scenario.fix}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href={CHECK_RESUME_AGAINST_JD_PATH}
              className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 sm:text-base"
            >
              Check my resume — free, no signup
            </Link>
          </div>
        </div>
      </section>

      {/* ─── How it works ──────────────────────────────────────────────── */}
      <section
        aria-labelledby="home-how-heading"
        className="border-b border-slate-100 bg-white"
      >
        <div className="page-shell py-10 sm:py-12 lg:py-14">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700/90">
              How it works
            </p>
            <h2
              id="home-how-heading"
              className="mt-2 text-xl font-bold tracking-[-0.025em] text-slate-900 sm:text-2xl"
            >
              From paste to application-ready in minutes
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500">
              No account needed for the first scan.
            </p>
          </div>

          <ol className="mt-8 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_STEPS.map((step, index) => (
              <li
                key={step.key}
                className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 ${step.borderHover} hover:shadow-md`}
              >
                <div className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${step.accentFrom} ${step.accentTo}`} aria-hidden />
                <div className="p-5">
                  <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${step.iconBg}`}>
                    <step.Icon className={`h-5 w-5 ${step.iconText}`} aria-hidden />
                  </div>
                  <p className="mt-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-1 text-sm font-semibold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-8 text-center">
            <Link
              href={CHECK_RESUME_AGAINST_JD_PATH}
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 sm:text-base"
            >
              {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
            </Link>
          </div>
        </div>
      </section>

      {/* ─── vs Competitors — moved before optimization preview ────────── */}
      <section
        aria-labelledby="home-vs-heading"
        className="border-b border-slate-100 bg-slate-50"
      >
        <div className="page-shell py-10 sm:py-12 lg:py-14">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700/90">
              {HOME_VS_SECTION_EYEBROW}
            </p>
            <h2
              id="home-vs-heading"
              className="mt-2 text-xl font-bold tracking-[-0.025em] text-slate-900 sm:text-2xl"
            >
              {HOME_VS_SECTION_HEADING}
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-slate-600">
              Jobscan, Resume Worded, and ATS checkers score keywords. ResumeAtlas gives you the apply decision — verdict, risks, and fixes — before you submit.
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* Header row */}
            <div className="grid grid-cols-[2fr_2fr_2.5fr] border-b border-slate-100 bg-slate-50">
              <div className="px-5 py-3.5" />
              <div className="border-l border-slate-100 px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-slate-400">
                Keyword checkers
              </div>
              <div className="border-l border-slate-100 px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-indigo-600">
                ResumeAtlas
              </div>
            </div>

            {HOME_COMPARISON_ROWS.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-[2fr_2fr_2.5fr] border-t border-slate-100 transition-colors hover:bg-slate-50/60 ${i % 2 === 1 ? "bg-slate-50/40" : ""}`}
              >
                <div className="px-5 py-4 text-xs font-medium text-slate-700 sm:text-sm">
                  {row.label}
                </div>
                <div className="border-l border-slate-100 px-5 py-4 text-center text-xs text-slate-400 sm:text-sm">
                  {row.other}
                </div>
                <div className="border-l border-slate-100 px-5 py-4 text-center text-xs font-semibold text-emerald-600 sm:text-sm">
                  {row.us}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center gap-2.5">
            <Link
              href={CHECK_RESUME_AGAINST_JD_PATH}
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 sm:text-base"
            >
              {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
            </Link>
            <p className="text-xs text-slate-500">Free · no signup · 60 seconds</p>
          </div>
        </div>
      </section>

      {/* ─── Optimization preview ───────────────────────────────────────── */}
      <HomeOptimizedResumePreviewSection />

      {/* ─── Below-fold content ─────────────────────────────────────────── */}
      <div className="page-shell space-y-14 py-10 sm:space-y-16 sm:py-12 lg:py-14">

        {/* What your free scan shows */}
        <section aria-labelledby="home-analysis-detail-heading">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700/90">
              Free · no signup
            </p>
            <h2
              id="home-analysis-detail-heading"
              className="mt-2 text-xl font-bold tracking-[-0.025em] text-slate-900 sm:text-2xl"
            >
              What your free scan shows in 60 seconds
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Paste resume + job description once. No file upload, no account.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {HOME_MARKETING_OUTCOMES.map((outcome, index) => (
              <div
                key={outcome.label}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                {/* Colored accent bar */}
                <div
                  className={`absolute inset-x-0 top-0 h-0.5 ${OUTCOME_ACCENT_CLASSES[index] ?? OUTCOME_ACCENT_CLASSES[3]}`}
                />
                <span
                  className={`mb-3 inline-flex h-7 w-7 items-center justify-center self-start rounded-full text-xs font-bold ${OUTCOME_BADGE_CLASSES[index] ?? OUTCOME_BADGE_CLASSES[3]}`}
                >
                  {index + 1}
                </span>
                <p className="text-sm font-semibold leading-snug text-slate-900">
                  {outcome.label}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  {outcome.body}
                </p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-slate-400">
            {HOME_MARKETING_SEO_BRIDGE}
          </p>
        </section>

        {/* FAQ */}
        <section aria-labelledby="home-faq-heading">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700/90">
              Questions
            </p>
            <h2
              id="home-faq-heading"
              className="mt-2 text-xl font-bold tracking-[-0.025em] text-slate-900 sm:text-2xl"
            >
              Frequently asked questions
            </h2>
          </div>

          <dl className="mx-auto mt-6 max-w-2xl">
            {HOME_FAQ.map((item, i) => (
              <div
                key={item.question}
                className={`border-slate-100 ${i === 0 ? "border-t" : ""} border-b`}
              >
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-1 py-4 transition-colors hover:text-indigo-700 [&::-webkit-details-marker]:hidden">
                    <dt className="text-sm font-semibold leading-snug text-slate-900 transition-colors group-hover:text-indigo-700 sm:text-base">
                      {item.question}
                    </dt>
                    <ChevronDown />
                  </summary>
                  <dd className="px-1 pb-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                    {item.answer}
                  </dd>
                </details>
              </div>
            ))}
          </dl>
        </section>

        {/* Final CTA */}
        <section aria-labelledby="home-final-cta-heading">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 px-6 py-10 text-white sm:px-10">
            {/* Subtle texture */}
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-2xl" />
              <div className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-white/5 blur-2xl" />
            </div>

            <div className="relative text-center">
              <h2
                id="home-final-cta-heading"
                className="text-xl font-bold tracking-tight sm:text-2xl"
              >
                Check your resume before you hit Apply.
              </h2>
              <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-indigo-100 sm:text-base">
                Free scan · no signup · 60 seconds · Job Application Verdict + rejection risks + recommended fixes
              </p>
              <Link
                href={CHECK_RESUME_AGAINST_JD_PATH}
                className="mt-6 inline-flex rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-indigo-700 shadow-sm transition hover:bg-indigo-50 sm:text-base"
              >
                Check my resume — it&apos;s free
              </Link>
              <p className="mt-4 text-sm text-indigo-200">
                ATS format only?{" "}
                <Link
                  href={ATS_RESUME_CHECKER_PATH}
                  className="font-medium text-white underline underline-offset-2 transition hover:text-indigo-100"
                >
                  ATS resume checker
                </Link>
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* ─── Browse by role ────────────────────────────────────────────── */}
      <HomeBrowseByRoleSection />
    </main>
  );
}
