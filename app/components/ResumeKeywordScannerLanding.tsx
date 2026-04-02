import Link from "next/link";
import HomeClient from "@/app/HomeClient";
import { LastUpdated } from "@/app/components/LastUpdated";
import { RelatedResumeGuidesSection } from "@/app/components/RelatedResumeGuidesSection";
import { ToolClusterNextSteps } from "@/app/components/ToolClusterNextSteps";
import { ToolClusterRelatedLinks } from "@/app/components/ToolClusterRelatedLinks";
import {
  CHECK_ATS_COMPATIBILITY_ANCHOR,
  CHECK_RESUME_AGAINST_JD_PATH,
  CHECK_YOUR_RESUME_SCORE_ANCHOR,
  RESUME_VS_JOB_DESCRIPTION_CHECKER_ANCHOR,
} from "@/app/lib/internalLinks";
import {
  TOOL_CLUSTER_KEYWORD_SCANNER,
  toolClusterBreadcrumbSchema,
  toolClusterFaqSchema,
  toolClusterWebApplicationSchema,
} from "@/app/lib/toolClusterPages";

const path = TOOL_CLUSTER_KEYWORD_SCANNER.path;

/**
 * Keyword gaps + missing skills vs a job description — distinct from ATS parsing, overall score, and full JD matcher narrative.
 */
export function ResumeKeywordScannerLanding() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <section className="border-b border-slate-200 bg-slate-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
            {TOOL_CLUSTER_KEYWORD_SCANNER.h1}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Find missing resume keywords against a real job description, close skill gaps with
            truthful edits, and improve ATS keyword coverage before you apply.
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 text-center">
          <p className="text-sm sm:text-base text-slate-900">
            <strong>{TOOL_CLUSTER_KEYWORD_SCANNER.topStripStrong}</strong>
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
            {TOOL_CLUSTER_KEYWORD_SCANNER.ctaAnchor}
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

      <section className="border-b border-emerald-200 bg-emerald-50/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
          <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900">
            {TOOL_CLUSTER_KEYWORD_SCANNER.differentiatorHeading}
          </h2>
          <div className="mt-3 space-y-2.5 text-sm sm:text-base text-slate-700 leading-relaxed">
            {TOOL_CLUSTER_KEYWORD_SCANNER.differentiatorBody.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      <HomeClient variant="toolOnly" analysisMode="keywordScanner" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        <section className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Scan your resume for keywords
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-700">
            Paste your resume and a job description in the form above to:
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-1.5 text-sm sm:text-base text-slate-700">
            <li>Detect missing keywords</li>
            <li>Identify skill gaps</li>
            <li>Analyze keyword relevance vs that posting</li>
            <li>Improve ATS keyword coverage</li>
          </ul>
          <p className="mt-3 text-sm text-slate-600">
            Paste-only (no file upload). The job description is required so gaps are measured against
            a real posting.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            How keyword gap scoring works
          </h2>
          <ul className="mt-3 list-disc pl-5 space-y-1.5 text-sm sm:text-base text-slate-700">
            <li>Extracts repeated must-have terms from the job description.</li>
            <li>Checks whether those terms appear in summary, skills, and bullet context.</li>
            <li>Flags weak coverage where terms are missing or unsupported by evidence.</li>
          </ul>
          <p className="mt-3 text-sm text-slate-600">
            Goal: close honest gaps so ATS and recruiters can map your fit faster.
          </p>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            How resume keyword scanning works
          </h2>
          <ol className="mt-4 space-y-4 list-decimal pl-5 text-sm sm:text-base text-slate-700">
            <li>
              <strong className="text-slate-900">Paste your resume.</strong> Enter your resume
              text.
            </li>
            <li>
              <strong className="text-slate-900">Keyword extraction.</strong> Skills and terms from
              your resume are compared to the job description.
            </li>
            <li>
              <strong className="text-slate-900">Gap detection.</strong> Missing or weak keywords
              from the posting are highlighted.
            </li>
            <li>
              <strong className="text-slate-900">Optimization suggestions.</strong> Use the takeaway
              to strengthen bullets and skills where truthful.
            </li>
          </ol>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Missing keywords in your resume
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-700 leading-relaxed">
            Many resumes fail ATS because they do not include the right keywords for the role.
            Common gap areas:
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-1.5 text-sm sm:text-base text-slate-700">
            <li>Technical skills (for example Python, SQL, machine learning)</li>
            <li>Tools and frameworks</li>
            <li>Role-specific terminology</li>
            <li>Action verbs and impact language</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Why keywords matter for ATS
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-700 leading-relaxed">
            Applicant tracking systems scan resumes for relevant keywords before ranking candidates.
            Without strong keyword coverage:
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-1.5 text-sm sm:text-base text-slate-700">
            <li>Your resume may not be shortlisted</li>
            <li>Recruiters may never see your profile</li>
            <li>Your experience may be undervalued</li>
          </ul>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {TOOL_CLUSTER_KEYWORD_SCANNER.serpVariantsParagraph}
          </p>
        </section>

        <ToolClusterRelatedLinks currentPath={path} />

        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            Real-world keyword proof example
          </h2>
          <p className="mt-2 text-sm font-medium text-slate-900">Resume contains</p>
          <ul className="mt-1 list-disc pl-5 text-sm text-slate-700">
            <li>Python</li>
            <li>Data analysis</li>
          </ul>
          <p className="mt-3 text-sm font-medium text-slate-900">Missing keywords (from posting)</p>
          <ul className="mt-1 list-disc pl-5 text-sm text-slate-700">
            <li>Machine learning</li>
            <li>SQL</li>
            <li>Data visualization</li>
          </ul>
          <p className="mt-3 text-sm text-slate-700">
            <strong className="text-slate-900">Result:</strong> keyword coverage estimated at 61%,
            with likely ranking drag for jobs emphasizing experimentation and SQL depth.
          </p>
          <p className="mt-2 text-sm text-slate-700">
            <strong className="text-slate-900">Fix:</strong> add truthful SQL + A/B testing evidence
            in project and experience bullets, then rescan against the same posting.
          </p>
        </section>

        <section className="rounded-xl border border-amber-200 bg-amber-50/40 p-5 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900">
            Keyword scanner vs resume matching
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-700 leading-relaxed">
            This page is built for <strong className="text-slate-900">keyword and skill gaps</strong>{" "}
            versus a pasted job description—not a full formatting audit or a deep narrative match
            report.
          </p>
          <p className="mt-3 text-sm sm:text-base text-slate-700">
            For deeper role comparison and match scoring, use the{" "}
            <Link
              href={CHECK_RESUME_AGAINST_JD_PATH}
              className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
            >
              {RESUME_VS_JOB_DESCRIPTION_CHECKER_ANCHOR}
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            How to improve keyword coverage
          </h2>
          <ul className="mt-3 list-disc pl-5 space-y-1.5 text-sm sm:text-base text-slate-700">
            <li>Add role-specific skills</li>
            <li>Include tools and technologies</li>
            <li>Use language from job descriptions you target</li>
            <li>Mention projects and measurable results</li>
            <li>Avoid vague, generic wording</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Improve your resume further
          </h2>
          <ul className="mt-3 list-disc pl-5 space-y-2 text-sm sm:text-base text-slate-700">
            <li>
              <Link
                href={CHECK_RESUME_AGAINST_JD_PATH}
                className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
              >
                {RESUME_VS_JOB_DESCRIPTION_CHECKER_ANCHOR}
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
                href="/ats-resume-checker#resume-score-checker"
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

        <ToolClusterNextSteps />

        <section id="faq">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Frequently asked questions
          </h2>
          <div className="mt-5 space-y-5 text-sm sm:text-base text-slate-700">
            {TOOL_CLUSTER_KEYWORD_SCANNER.faq.map((item) => (
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
            Do not let missing keywords cost you interviews. Scan your resume against a posting and
            close honest gaps before you apply.
          </p>
          <a
            href="#ats-checker-form"
            className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100 transition"
          >
            {TOOL_CLUSTER_KEYWORD_SCANNER.ctaAnchor}
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
