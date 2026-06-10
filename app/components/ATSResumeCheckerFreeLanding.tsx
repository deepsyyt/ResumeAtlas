import Link from "next/link";
import { AtsResumeCheckerGuide } from "@/app/components/AtsResumeCheckerGuide";
import { LastUpdated } from "@/app/components/LastUpdated";
import { RelatedResumeGuidesSection } from "@/app/components/RelatedResumeGuidesSection";
import {
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  CHECK_RESUME_AGAINST_JD_PATH,
  CHECK_RESUME_AGAINST_JD_PRIMARY_CTA,
} from "@/app/lib/internalLinks";
import {
  TOOL_CLUSTER_ATS_FREE,
  toolClusterBreadcrumbSchema,
  toolClusterFaqSchema,
  toolClusterWebApplicationSchema,
} from "@/app/lib/toolClusterPages";

const path = TOOL_CLUSTER_ATS_FREE.path;

/**
 * ATS topical cluster — educational guide + CTAs to the single workbench (`/check-resume-against-job-description`).
 * Not a separate tool surface (no embedded paste form).
 */
export function ATSResumeCheckerFreeLanding() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="border-b border-slate-200 bg-gradient-to-b from-slate-50/90 to-white">
        <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 sm:py-14 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-800">
            ATS guide · parsing · format · compatibility
          </p>
          <h1 className="mt-3 text-pretty text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl sm:leading-tight">
            {TOOL_CLUSTER_ATS_FREE.h1}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg">
            {TOOL_CLUSTER_ATS_FREE.intro}
          </p>
          <p className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs font-medium text-slate-600 sm:text-sm">
            <span>✓ Free</span>
            <span className="text-slate-300" aria-hidden>
              ·
            </span>
            <span>✓ One workflow</span>
            <span className="text-slate-300" aria-hidden>
              ·
            </span>
            <span>✓ No signup</span>
          </p>
          <Link
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="mt-8 inline-flex rounded-full bg-slate-900 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
          </Link>
          <p className="mx-auto mt-3 max-w-lg text-xs text-slate-500 sm:text-sm">
            Paste resume and job description in our free checker — ATS parsing, evidence match, and
            AI optimization in one place.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl space-y-12 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
            {TOOL_CLUSTER_ATS_FREE.differentiatorHeading}
          </h2>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-700 sm:text-base">
            {TOOL_CLUSTER_ATS_FREE.differentiatorBody.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>

        <div id="ats-guide">
          <AtsResumeCheckerGuide />
        </div>

        <section className="rounded-2xl border border-slate-900/10 bg-slate-900 p-6 text-center text-white sm:p-8">
          <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
            Ready to check your resume?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-200 sm:text-base">
            Run the free resume checker &amp; optimizer — ATS readability, job-description match, and
            bullet optimization without switching tools.
          </p>
          <Link
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
          </Link>
          <p className="mt-3 text-xs text-slate-400">
            Opens{" "}
            <Link href={CHECK_RESUME_AGAINST_JD_PATH} className="underline underline-offset-2">
              Resume checker &amp; optimizer
            </Link>
          </p>
        </section>

        <section id="faq">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Frequently asked questions
          </h2>
          <div className="mt-5 space-y-5 text-sm text-slate-700 sm:text-base">
            {TOOL_CLUSTER_ATS_FREE.faq.map((item) => (
              <div key={item.question}>
                <h3 className="font-semibold text-slate-900">{item.question}</h3>
                <p className="mt-1">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-slate-50/80 px-5 py-6 text-center sm:px-6">
          <h2 className="text-lg font-semibold text-slate-900">More answers</h2>
          <p className="mt-2 text-sm text-slate-600">
            Evidence match, optimization, interviews, and how the checker works.
          </p>
          <Link
            href="/faq"
            className="mt-4 inline-flex rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-slate-400"
          >
            View FAQ
          </Link>
        </section>

        <RelatedResumeGuidesSection currentPath={path} className="border-t border-slate-200 pt-8" />

        <LastUpdated className="text-xs text-slate-500" />
      </div>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(toolClusterWebApplicationSchema(TOOL_CLUSTER_ATS_FREE)),
        }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(toolClusterFaqSchema(TOOL_CLUSTER_ATS_FREE)),
        }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(toolClusterBreadcrumbSchema(TOOL_CLUSTER_ATS_FREE)),
        }}
      />
    </main>
  );
}
