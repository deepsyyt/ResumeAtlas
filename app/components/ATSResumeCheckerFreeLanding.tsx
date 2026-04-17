import Link from "next/link";
import HomeClient from "@/app/HomeClient";
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
 * ATS compliance / parsing / score positioning — distinct from the JD matcher
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
        <section
          id="ats-compatibility-check"
          className="rounded-2xl border border-sky-200 bg-sky-50/50 p-5 sm:p-6"
        >
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Check your resume now
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
            Paste your resume in the form above to analyze:
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-1.5 text-sm sm:text-base text-slate-700">
            <li>ATS compatibility score</li>
            <li>Formatting and parsing risk signals</li>
            <li>Section structure and readability</li>
            <li>Whether essential resume elements read clearly to a parser</li>
          </ul>
          <p className="mt-4 text-sm text-slate-600">
            Paste-only (no file upload). Optional job description field if you also want keyword
            overlap vs that posting.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Why this ATS score changes
          </h2>
          <ul className="mt-3 list-disc pl-5 space-y-1.5 text-sm sm:text-base text-slate-700">
            <li>Parsing quality (are sections and dates machine-readable?).</li>
            <li>Layout simplicity (single-column, standard headings, no parser traps).</li>
            <li>Optional keyword overlap if a target job description is provided.</li>
          </ul>
          <p className="mt-3 text-sm text-slate-600">
            Use the score as a fix-priority signal, not a guaranteed pass/fail outcome.
          </p>
        </section>

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
              <strong className="text-slate-900">Score and issue signals.</strong> You get a score
              plus supporting metrics for structure, clarity, and readability.
            </li>
            <li>
              <strong className="text-slate-900">Fix suggestions.</strong> Use the takeaways to
              simplify layout, strengthen headings, and improve bullets before you apply.
            </li>
          </ol>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            {TOOL_CLUSTER_ATS_FREE.differentiatorHeading}
          </h2>
          <div className="mt-4 space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
            {TOOL_CLUSTER_ATS_FREE.differentiatorBody.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <ul className="mt-4 list-disc pl-5 space-y-1.5 text-sm text-slate-700">
            <li>
              <strong className="text-slate-900">Parsing accuracy</strong> — can an ATS map your
              content into experience and skills fields?
            </li>
            <li>
              <strong className="text-slate-900">Section detection</strong> — are headings like
              Experience and Skills easy to recognize?
            </li>
            <li>
              <strong className="text-slate-900">Formatting issues</strong> — tables, columns, and
              layouts that often break parsers
            </li>
            <li>
              <strong className="text-slate-900">Keyword signal (with a posting)</strong> — if you
              paste a job description, you also get JD keyword overlap; otherwise the scan stays
              resume-first.
            </li>
          </ul>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {TOOL_CLUSTER_ATS_FREE.serpVariantsParagraph}
          </p>
        </section>

        <ToolClusterRelatedLinks currentPath={path} />

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Your ATS score explained
          </h2>
          <ul className="mt-3 list-disc pl-5 space-y-1.5 text-sm sm:text-base text-slate-700">
            <li>
              <strong className="text-slate-900">80–100%</strong> — strong ATS compatibility
            </li>
            <li>
              <strong className="text-slate-900">60–79%</strong> — minor improvements likely help
            </li>
            <li>
              <strong className="text-slate-900">Below 60%</strong> — higher risk of being filtered
              before a human review
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Common ATS mistakes this scan helps surface
          </h2>
          <ul className="mt-3 list-disc pl-5 space-y-1.5 text-sm sm:text-base text-slate-700">
            <li>Tables or multi-column layouts in the text you paste</li>
            <li>Missing or nonstandard section headings</li>
            <li>Heavy graphics, icons, or decoration (when described in text)</li>
            <li>Thin keyword or skills context for your target function</li>
            <li>Inconsistent dates, titles, or bullet structure</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Best resume format for ATS
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-700 leading-relaxed">
            The most parser-friendly resumes are easy for both recruiters and software to read in a
            single pass:
          </p>
          <p className="mt-2 text-sm sm:text-base text-slate-700 leading-relaxed">
            Use reverse-chronological format for best ATS compatibility.
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-1.5 text-sm sm:text-base text-slate-700">
            <li>
              <strong className="text-slate-900">Single column</strong> — linear flow from top to
              bottom
            </li>
            <li>
              <strong className="text-slate-900">Standard headings</strong> — for example
              Experience, Education, Skills, and a short Summary
            </li>
            <li>
              <strong className="text-slate-900">No tables</strong> — avoid tables and multi-column
              layouts for structure when you can use headings and bullets instead
            </li>
            <li>
              <strong className="text-slate-900">Plain bullets</strong> — dated roles, one bullet
              style, measurable outcomes where possible
            </li>
            <li>
              <strong className="text-slate-900">No critical text in images</strong> — logos and
              icons should not carry skills or job titles the ATS must read
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-indigo-200 bg-indigo-50/40 p-5 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            ATS format resume template checklist (2026)
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-700 leading-relaxed">
            If you are searching for "ATS format resume", "best resume format for ATS systems", or
            "ATS resume format template", this is the practical checklist to use before applying.
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-1.5 text-sm sm:text-base text-slate-700">
            <li>Use one-column reverse-chronological structure.</li>
            <li>Keep section names standard: Summary, Experience, Skills, Education.</li>
            <li>Keep bullets concise and evidence-driven (tool + scope + outcome).</li>
            <li>Avoid tables, icons, text boxes, and image-only design elements.</li>
            <li>Validate ATS compatibility before each high-priority application.</li>
          </ul>
          <p className="mt-3 text-sm text-slate-700">
            Want posting-level alignment too? Then run{" "}
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
            >
              compare resume with job description
            </Link>{" "}
            after formatting cleanup.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            Real-world ATS proof example
          </h2>
          <p className="mt-2 text-sm text-slate-700">
            Candidate resume had strong experience but used mixed heading styles and decorative
            formatting.
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-slate-700">
            <li>Before: parser flagged weak section detection and chronology ambiguity.</li>
            <li>Compatibility estimate: 58% before cleanup.</li>
            <li>After fixes: one-column layout + standard headings + consistent dates.</li>
            <li>Expected outcome: cleaner ATS parsing and stronger recruiter skim clarity.</li>
          </ul>
          <p className="mt-3 text-sm text-slate-700">
            This is directional guidance, not a hiring guarantee, but it mirrors the most common ATS
            formatting failure pattern we see.
          </p>
        </section>

        <section
          id="resume-score-checker"
          className="rounded-xl border border-amber-200 bg-amber-50/40 p-5 sm:p-6"
        >
          <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900">
            ATS resume scan vs keyword matching
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-700 leading-relaxed">
            This page is built around <strong className="text-slate-900">ATS compatibility</strong>{" "}
            — parsing, structure, and readability — not full job matching to a posting unless you
            optionally paste a job description.
          </p>
          <p className="mt-3 text-sm sm:text-base text-slate-700">
            Want to compare your resume with a specific job description?{" "}
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
            >
              {COMPARE_RESUME_WITH_JD_ANCHOR}
            </Link>
            . You can also use our{" "}
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
            >
              {RESUME_VS_JOB_DESCRIPTION_CHECKER_ANCHOR}
            </Link>{" "}
            — same tool, phrased the way many people search. Searching for{" "}
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
            >
              {MATCH_RESUME_TO_JOB_DESCRIPTION_ANCHOR}
            </Link>{" "}
            leads to the same matcher.
          </p>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Improve your resume further
          </h2>
          <ul className="mt-3 list-disc pl-5 space-y-1.5 text-sm sm:text-base text-slate-700">
            <li>
              <Link
                href="/ats-keywords"
                className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
              >
                Find keywords for your role
              </Link>
            </li>
            <li>
              <Link
                href="/resume-examples"
                className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
              >
                Resume examples by role
              </Link>
            </li>
            <li>
              <Link
                href="/resume-guides/ats-resume-template#how-ats-scans-resumes"
                className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
              >
                Learn how ATS systems scan resumes
              </Link>
            </li>
          </ul>
        </section>

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
            Check your ATS score now and tighten structure first.
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
