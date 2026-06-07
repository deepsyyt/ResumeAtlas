import Link from "next/link";
import HomeClient from "@/app/HomeClient";
import { AtsResumeCheckerGuide } from "@/app/components/AtsResumeCheckerGuide";
import { LastUpdated } from "@/app/components/LastUpdated";
import { RelatedResumeGuidesSection } from "@/app/components/RelatedResumeGuidesSection";
import { ToolClusterNextSteps } from "@/app/components/ToolClusterNextSteps";
import { ToolClusterRelatedLinks } from "@/app/components/ToolClusterRelatedLinks";
import {
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  COMPARE_RESUME_WITH_JD_ANCHOR,
  MATCH_RESUME_TO_JOB_DESCRIPTION_ANCHOR,
  RESUME_VS_JOB_DESCRIPTION_CHECKER_ANCHOR,
} from "@/app/lib/internalLinks";
import {
  TOOL_CLUSTER_ATS_FREE,
  toolClusterBreadcrumbSchema,
  toolClusterFaqSchema,
  toolClusterWebApplicationSchema,
} from "@/app/lib/toolClusterPages";

const path = TOOL_CLUSTER_ATS_FREE.path;

/**
 * ATS compliance / parsing / score positioning - distinct from the JD matcher
 * (`/check-resume-against-job-description`).
 */
export function ATSResumeCheckerFreeLanding() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <section className="border-b border-slate-200 bg-slate-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
            {TOOL_CLUSTER_ATS_FREE.h1}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {TOOL_CLUSTER_ATS_FREE.intro}
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 text-center">
          <p className="text-sm sm:text-base text-slate-900">
            <strong>{TOOL_CLUSTER_ATS_FREE.topStripStrong}</strong>
          </p>
          <p className="mt-2 text-xs sm:text-sm font-medium text-slate-700">
            <span aria-hidden="true">✔</span> Free <span className="text-slate-400">•</span>{" "}
            <span aria-hidden="true">✔</span> Instant Results{" "}
            <span className="text-slate-400">•</span> <span aria-hidden="true">✔</span> No Signup
          </p>
          <a
            href="#ats-checker-form"
            className="mt-4 inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition"
          >
            {TOOL_CLUSTER_ATS_FREE.ctaAnchor}
          </a>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm">
            {[
              "Resume not getting shortlisted?",
              "Missing keywords for your role?",
              "ATS score too low?",
            ].map((line) => (
              <span
                key={line}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-medium text-slate-700"
              >
                {line}
              </span>
            ))}
          </div>
        </div>
      </section>

      <HomeClient variant="toolOnly" analysisMode="atsCompliance" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            How this free ATS resume checker works
          </h2>
          <ol className="mt-4 space-y-4 list-decimal pl-5 text-sm sm:text-base text-slate-700">
            <li>
              <strong className="text-slate-900">Paste your resume.</strong> Copy-paste your resume
              text into the field.
            </li>
            <li>
              <strong className="text-slate-900">ATS parsing simulation.</strong> The analysis
              reads your resume the way many ATS parsers consume plain text: sections, bullets, and
              structure.
            </li>
            <li>
              <strong className="text-slate-900">Compatibility score and issue signals.</strong> You
              get an ATS compatibility score plus parsing and formatting risk metrics.
            </li>
            <li>
              <strong className="text-slate-900">Fix suggestions.</strong> Use the takeaways to
              simplify layout, strengthen headings, and improve bullets before you apply.
            </li>
          </ol>
        </section>

        <AtsResumeCheckerGuide />

        <section className="rounded-xl border border-amber-200 bg-amber-50/40 p-5 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900">
            ATS resume scan vs keyword matching
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-700 leading-relaxed">
            {TOOL_CLUSTER_ATS_FREE.differentiatorBody[0]}
          </p>
          <p className="mt-3 text-sm sm:text-base text-slate-700">
            Compare your resume with a specific job description:{" "}
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
            >
              {COMPARE_RESUME_WITH_JD_ANCHOR}
            </Link>
            ,{" "}
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
            >
              {RESUME_VS_JOB_DESCRIPTION_CHECKER_ANCHOR}
            </Link>
            , or{" "}
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
            >
              {MATCH_RESUME_TO_JOB_DESCRIPTION_ANCHOR}
            </Link>
            .
          </p>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {TOOL_CLUSTER_ATS_FREE.serpVariantsParagraph}
          </p>
        </section>

        <ToolClusterRelatedLinks currentPath={path} />

        <ToolClusterNextSteps />

        <section id="faq">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Frequently asked questions
          </h2>
          <div className="mt-5 space-y-5 text-sm sm:text-base text-slate-700">
            {TOOL_CLUSTER_ATS_FREE.faq.map((item) => (
              <div key={item.question}>
                <h3 className="font-semibold text-slate-900">{item.question}</h3>
                <p className="mt-1">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-900/10 bg-slate-900 text-white p-6 sm:p-8 text-center">
          <h2 className="text-lg sm:text-xl font-semibold tracking-tight">Final step</h2>
          <p className="mt-2 text-sm sm:text-base text-slate-200 max-w-xl mx-auto">
            Do not let formatting or parsing issues block your resume before a recruiter sees it.
            Check your ATS compatibility score now and tighten structure first.
          </p>
          <a
            href="#ats-checker-form"
            className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100 transition"
          >
            {TOOL_CLUSTER_ATS_FREE.ctaAnchor}
          </a>
        </section>

        <RelatedResumeGuidesSection
          currentPath={path}
          className="border-t border-slate-200 pt-8"
        />

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
    </div>
  );
}
