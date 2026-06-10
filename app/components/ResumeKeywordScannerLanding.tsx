import Link from "next/link";
import HomeClient from "@/app/HomeClient";
import { LastUpdated } from "@/app/components/LastUpdated";
import { RelatedResumeGuidesSection } from "@/app/components/RelatedResumeGuidesSection";
import { ToolClusterRelatedLinks } from "@/app/components/ToolClusterRelatedLinks";
import {
  CHECK_ATS_COMPATIBILITY_ANCHOR,
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  CHECK_RESUME_AGAINST_JD_PRIMARY_CTA,
  CHECK_YOUR_RESUME_SCORE_ANCHOR,
} from "@/app/lib/internalLinks";
import {
  TOOL_CLUSTER_KEYWORD_SCANNER,
  toolClusterBreadcrumbSchema,
  toolClusterFaqSchema,
  toolClusterWebApplicationSchema,
} from "@/app/lib/toolClusterPages";

const path = TOOL_CLUSTER_KEYWORD_SCANNER.path;

const WHAT_YOU_GET = [
  "Missing ATS keywords",
  "Keyword coverage score",
  "Weak skills coverage",
  "Suggested optimization areas",
] as const;

function TrustStrip({ className = "" }: { className?: string }) {
  return (
    <p className={`text-xs font-medium text-slate-700 sm:text-sm ${className}`}>
      <span aria-hidden="true">✓</span> Free <span className="text-slate-400">•</span>{" "}
      <span aria-hidden="true">✓</span> No signup <span className="text-slate-400">•</span>{" "}
      <span aria-hidden="true">✓</span> Results in seconds
    </p>
  );
}

/**
 * Keyword gaps + missing skills vs a job description — tool-first layout (screenshot above the fold).
 */
export function ResumeKeywordScannerLanding() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <section
        className="border-b border-slate-200 bg-gradient-to-b from-emerald-50/50 to-white"
        aria-labelledby="keyword-scanner-heading"
      >
        <div className="mx-auto max-w-7xl px-4 py-4 text-center sm:px-6 sm:py-5 sm:text-left lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-800 sm:text-xs">
            Free resume keyword scanner
          </p>
          <h1
            id="keyword-scanner-heading"
            className="mt-1 text-pretty text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl lg:text-[1.65rem]"
          >
            {TOOL_CLUSTER_KEYWORD_SCANNER.h1}
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-pretty text-sm leading-relaxed text-slate-600 sm:mx-0 sm:text-[15px]">
            {TOOL_CLUSTER_KEYWORD_SCANNER.intro}
          </p>
        </div>
      </section>

      <HomeClient variant="toolOnly" analysisMode="keywordScanner" />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-4 text-center sm:px-6 sm:py-5 lg:px-8">
          <a
            href="#ats-checker-form"
            className="inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {TOOL_CLUSTER_KEYWORD_SCANNER.ctaAnchor}
          </a>
          <TrustStrip className="mt-3" />
        </div>
      </section>

      <section className="border-b border-emerald-200/80 bg-emerald-50/40">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-7 lg:px-8">
          <h2 className="text-center text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
            What you&apos;ll get
          </h2>
          <ul className="mx-auto mt-4 grid max-w-2xl gap-2.5 sm:grid-cols-2">
            {WHAT_YOU_GET.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 rounded-lg border border-emerald-200/80 bg-white/80 px-3.5 py-2.5 text-sm text-slate-800"
              >
                <span className="mt-0.5 shrink-0 font-semibold text-emerald-700" aria-hidden>
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mx-auto max-w-3xl space-y-8 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            {TOOL_CLUSTER_KEYWORD_SCANNER.howItWorksHeading}
          </h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-slate-700 sm:text-base">
            <li>
              <strong className="text-slate-900">Paste resume and job description.</strong> Copy the
              posting you are applying to — gaps are measured against that exact role.
            </li>
            <li>
              <strong className="text-slate-900">Extract must-have terms.</strong> Repeated skills,
              tools, and phrases from the job description are compared to your resume text.
            </li>
            <li>
              <strong className="text-slate-900">See missing and weak keywords.</strong> Get a
              coverage readout, skill gaps, and where terms are absent or unsupported.
            </li>
            <li>
              <strong className="text-slate-900">Fix honest gaps before you apply.</strong> Strengthen
              bullets and skills where the posting expects proof — not keyword stuffing.
            </li>
          </ol>
          <p className="mt-3 text-sm text-slate-600">
            Paste-only (no file upload). Job description required so results reflect a real posting.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6">
          <h2 className="text-lg font-semibold tracking-tight text-slate-900">
            Keyword scanner vs resume matching
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
            This page is built for <strong className="text-slate-900">missing keywords and skill gaps</strong>{" "}
            vs one posting — not ATS formatting audits or full match scoring. For evidence match,
            optimization, and download, use the{" "}
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
            >
              {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
            </Link>
            .
          </p>
        </section>

        <ToolClusterRelatedLinks currentPath={path} />

        <section id="faq">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Frequently asked questions
          </h2>
          <div className="mt-5 space-y-5 text-sm text-slate-700 sm:text-base">
            {TOOL_CLUSTER_KEYWORD_SCANNER.faq.map((item) => (
              <div key={item.question}>
                <h3 className="font-semibold text-slate-900">{item.question}</h3>
                <p className="mt-1">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-900/10 bg-slate-900 p-6 text-center text-white sm:p-8">
          <h2 className="text-lg font-semibold tracking-tight sm:text-xl">Scan before you apply</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-200 sm:text-base">
            Close honest keyword gaps so ATS and recruiters can map your fit faster.
          </p>
          <a
            href="#ats-checker-form"
            className="mt-5 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            {TOOL_CLUSTER_KEYWORD_SCANNER.ctaAnchor}
          </a>
          <TrustStrip className="mt-3 text-slate-300" />
        </section>

        <section>
          <h2 className="text-lg font-semibold tracking-tight text-slate-900">Related tools</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700 sm:text-base">
            <li>
              <Link
                href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
                className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
              >
                {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
              </Link>
            </li>
            <li>
              <Link
                href="/ats-resume-checker#ats-compatibility-check"
                className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
              >
                {CHECK_ATS_COMPATIBILITY_ANCHOR}
              </Link>
            </li>
            <li>
              <Link
                href="/ats-resume-checker#how-ats-scoring-works"
                className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
              >
                {CHECK_YOUR_RESUME_SCORE_ANCHOR}
              </Link>
            </li>
            <li>
              <Link href="/ats-keywords" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">
                Role-based keyword guides
              </Link>
            </li>
          </ul>
        </section>

        <RelatedResumeGuidesSection currentPath={path} className="border-t border-slate-200 pt-8" />

        <LastUpdated className="text-xs text-slate-500" />
      </div>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(toolClusterWebApplicationSchema(TOOL_CLUSTER_KEYWORD_SCANNER)),
        }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(toolClusterFaqSchema(TOOL_CLUSTER_KEYWORD_SCANNER)),
        }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(toolClusterBreadcrumbSchema(TOOL_CLUSTER_KEYWORD_SCANNER)),
        }}
      />
    </div>
  );
}
