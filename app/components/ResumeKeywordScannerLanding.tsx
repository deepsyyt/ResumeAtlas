import Link from "next/link";
import { LastUpdated } from "@/app/components/LastUpdated";
import { RelatedResumeGuidesSection } from "@/app/components/RelatedResumeGuidesSection";
import { ToolClusterRelatedLinks } from "@/app/components/ToolClusterRelatedLinks";
import { CHECK_RESUME_AGAINST_JD_FORM_HREF } from "@/app/lib/internalLinks";
import {
  TOOL_CLUSTER_KEYWORD_SCANNER,
  toolClusterBreadcrumbSchema,
  toolClusterFaqSchema,
  toolClusterWebApplicationSchema,
} from "@/app/lib/toolClusterPages";

const path = TOOL_CLUSTER_KEYWORD_SCANNER.path;

const WHAT_YOU_GET = [
  "Missing keywords from the posting",
  "Keyword coverage score",
  "Weak coverage areas",
  "Keyword frequency",
  "Suggested keywords to add truthfully",
] as const;

/**
 * Keyword gap SEO cluster — educational guide + CTA to the workbench (no embedded paste form).
 */
export function ResumeKeywordScannerLanding() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section
        className="border-b border-slate-200 bg-gradient-to-b from-emerald-50/50 to-white"
        aria-labelledby="keyword-scanner-heading"
      >
        <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 sm:py-14 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-800">
            Keyword gap scan · missing terms vs a job posting
          </p>
          <h1
            id="keyword-scanner-heading"
            className="mt-3 text-pretty text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl sm:leading-tight"
          >
            {TOOL_CLUSTER_KEYWORD_SCANNER.h1}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg">
            {TOOL_CLUSTER_KEYWORD_SCANNER.intro}
          </p>
          <p className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs font-medium text-slate-600 sm:text-sm">
            <span>✓ Free</span>
            <span className="text-slate-300" aria-hidden>
              ·
            </span>
            <span>✓ Paste only</span>
            <span className="text-slate-300" aria-hidden>
              ·
            </span>
            <span>✓ No signup</span>
          </p>
          <Link
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="mt-8 inline-flex rounded-full bg-slate-900 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            {TOOL_CLUSTER_KEYWORD_SCANNER.ctaAnchor}
          </Link>
          <p className="mx-auto mt-3 max-w-lg text-xs text-slate-500 sm:text-sm">
            Free, paste-only, no signup — results in seconds on the checker.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl space-y-12 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <section className="rounded-xl border border-emerald-200/80 bg-emerald-50/40 p-5 sm:p-6">
          <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
            What you&apos;ll get
          </h2>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
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
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
            {TOOL_CLUSTER_KEYWORD_SCANNER.differentiatorHeading}
          </h2>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-700 sm:text-base">
            {TOOL_CLUSTER_KEYWORD_SCANNER.differentiatorBody.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            {TOOL_CLUSTER_KEYWORD_SCANNER.howItWorksHeading}
          </h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-slate-700 sm:text-base">
            <li>
              <strong className="text-slate-900">Paste your resume and a job posting.</strong> Use the
              full posting text so extracted keywords match the role you are targeting.
            </li>
            <li>
              <strong className="text-slate-900">Extract must-have terms.</strong> Skills, tools, and
              phrases from the posting are mapped against your resume text.
            </li>
            <li>
              <strong className="text-slate-900">See missing and weak keywords.</strong> Coverage score,
              weak areas, term frequency, and suggested keywords to add where truthful.
            </li>
            <li>
              <strong className="text-slate-900">Fix honest gaps before you apply.</strong> Strengthen
              bullets where terms are missing or only listed in skills, not keyword stuffing.
            </li>
          </ol>
          <p className="mt-3 text-sm text-slate-600">
            Paste-only (no file upload). A job posting is required so keywords reflect a real role.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6">
          <h2 className="text-lg font-semibold tracking-tight text-slate-900">
            Need evidence match and optimization?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
            The free checker covers keyword gaps plus evidence match and optimization on the same posting.
            Open the{" "}
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
            >
              job description matcher
            </Link>{" "}
            to paste resume and posting in one workflow.
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
          <Link
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="mt-5 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            {TOOL_CLUSTER_KEYWORD_SCANNER.ctaAnchor}
          </Link>
        </section>

        <RelatedResumeGuidesSection
          currentPath={path}
          linkScope="toolsAndKeywords"
          className="border-t border-slate-200 pt-8"
        />

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
    </main>
  );
}
