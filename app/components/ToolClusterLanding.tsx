import Link from "next/link";
import HomeClient from "@/app/HomeClient";
import { LastUpdated } from "@/app/components/LastUpdated";
import { RelatedResumeGuidesSection } from "@/app/components/RelatedResumeGuidesSection";
import { ToolClusterNextSteps } from "@/app/components/ToolClusterNextSteps";
import { ToolClusterRelatedLinks } from "@/app/components/ToolClusterRelatedLinks";
import type { ToolClusterPageConfig } from "@/app/lib/toolClusterPages";
import {
  toolClusterBreadcrumbSchema,
  toolClusterFaqSchema,
  toolClusterWebApplicationSchema,
} from "@/app/lib/toolClusterPages";
import {
  ATS_RESUME_TEMPLATE_GUIDE_PATH,
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  CHECK_RESUME_AGAINST_JD_PATH,
} from "@/app/lib/internalLinks";

type Props = {
  config: ToolClusterPageConfig;
};

export function ToolClusterLanding({ config }: Props) {
  const path = config.path;
  const isKeywordScanner = path === "/resume-keyword-scanner";

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <section className="border-b border-slate-200 bg-slate-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
            {config.h1}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {config.intro}
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 text-center">
          <p className="text-sm sm:text-base text-slate-900">
            <strong>{config.topStripStrong}</strong>
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
            {config.ctaAnchor}
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

      {isKeywordScanner ? (
        <section className="border-b border-slate-200 bg-emerald-50/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 text-center">
            <p className="text-sm sm:text-base font-semibold text-slate-900">
              Scan resume keywords against job description in seconds.
            </p>
            <p className="mt-1 text-xs sm:text-sm text-slate-700">
              See missing terms first, then decide what to rewrite before you apply.
            </p>
          </div>
        </section>
      ) : null}

      <section className="border-b border-slate-200 bg-sky-50/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
          <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900">
            {config.differentiatorHeading}
          </h2>
          <div className="mt-3 space-y-2.5 text-sm sm:text-base text-slate-700 leading-relaxed">
            {config.differentiatorBody.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      <HomeClient variant="toolOnly" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {config.serpVariantsParagraph}
          </p>
        </section>

        {isKeywordScanner ? (
          <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
              Sample keyword gap report
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-700">
              Typical output from one real posting comparison:
            </p>
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Missing keywords example
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1.5 text-sm text-slate-700">
                <li>SQL window functions</li>
                <li>A/B testing</li>
                <li>Stakeholder communication</li>
                <li>Experiment design</li>
              </ul>
              <p className="mt-3 text-sm text-slate-700">
                Coverage estimate: <strong className="text-slate-900">61%</strong> before edits.
              </p>
              <p className="mt-1 text-sm text-slate-700">
                First fix: add one SQL-impact bullet and one experiment result line where truthful.
              </p>
            </div>
            <p className="mt-4 text-sm text-slate-700">
              Trust proof: this scanner uses the exact posting text you paste, not a generic keyword
              list.
            </p>
          </section>
        ) : null}

        <section className="rounded-2xl border border-indigo-200 bg-indigo-50/40 p-5 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Choose the right page for your intent
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-700 leading-relaxed">
            Ranking improves when each URL has one clear job. Use this page for the intent it owns,
            then branch to adjacent tools only when needed.
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-1.5 text-sm sm:text-base text-slate-700">
            <li>
              <strong>Resume vs JD matcher:</strong> compare fit to one posting and prioritize edits.
            </li>
            <li>
              <strong>Keyword scanner:</strong> isolate missing terms and weak keyword coverage.
            </li>
            <li>
              <strong>ATS checker:</strong> diagnose parsing, structure, and formatting risk.
            </li>
          </ul>
          <p className="mt-3 text-sm text-slate-700">
            Need full ATS format rules? Read the{" "}
            <Link
              href={ATS_RESUME_TEMPLATE_GUIDE_PATH}
              className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
            >
              ATS resume template guide
            </Link>
            . Need role examples before you tailor? Start with{" "}
            <Link
              href="/resume-examples"
              className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
            >
              resume examples by role
            </Link>
            .
          </p>
        </section>

        <ToolClusterRelatedLinks currentPath={path} />

        <section className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Check your resume now
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-700">
            Paste your resume and the job description above to get:
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-1.5 text-sm sm:text-base text-slate-700">
            <li>ATS compatibility score aligned to the posting</li>
            <li>Missing keywords from the job description</li>
            <li>Skill and experience gaps to address</li>
            <li>AI-powered resume optimization suggestions</li>
          </ul>
          <p className="mt-4 text-sm text-slate-600">
            No signup required. Instant results.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            How this score is computed
          </h2>
          <ul className="mt-3 list-disc pl-5 space-y-1.5 text-sm sm:text-base text-slate-700">
            <li>Keyword overlap between your resume and the target job description.</li>
            <li>Evidence quality in bullets (specific tools, outcomes, and scope clarity).</li>
            <li>ATS readability signals (section clarity and parser-friendly structure).</li>
          </ul>
          <p className="mt-3 text-sm text-slate-600">
            Scores are directional and help prioritize edits; they are not a hiring guarantee.
          </p>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            {config.howItWorksHeading}
          </h2>
          <ol className="mt-4 space-y-4 list-decimal pl-5 text-sm sm:text-base text-slate-700">
            <li>
              <strong className="text-slate-900">Paste your resume and job description.</strong>{" "}
              Copy-paste your resume and the posting into the input fields.
            </li>
            <li>
              <strong className="text-slate-900">ATS score and JD gap analysis.</strong> Get a
              detailed view of how well your resume matches the job description, including missing
              keywords.
            </li>
            <li>
              <strong className="text-slate-900">AI resume optimization.</strong> Receive
              JD-aligned suggestions to improve your resume while keeping your original experience
              intact.
            </li>
            <li>
              <strong className="text-slate-900">Edit and download.</strong> Refine your resume and
              export it as PDF or DOCX.
            </li>
          </ol>
        </section>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Fix these first for the fastest shortlist lift
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-700">
            Most resumes improve faster when edits are sequenced by impact, not by aesthetics.
          </p>
          <ol className="mt-3 list-decimal pl-5 space-y-2 text-sm sm:text-base text-slate-700">
            <li>
              Add missing must-have requirements from the posting where truthful (skills, tools, domain
              terms).
            </li>
            <li>
              Rewrite 2-3 top bullets to show outcomes (scope + metric), not responsibilities.
            </li>
            <li>
              Tighten section clarity for ATS parsing: standard headings, one-column flow, consistent dates.
            </li>
            <li>
              Then optimize wording for relevance and confidence, without inflating claims.
            </li>
          </ol>
          <p className="mt-3 text-sm text-slate-600">
            This order usually beats design-only edits or random keyword stuffing.
          </p>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            {config.whyMatchHeading}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-700">
            Most resumes are rejected not because of a lack of skills, but because:
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-1.5 text-sm sm:text-base text-slate-700">
            <li>They do not include the right keywords</li>
            <li>They are not tailored to the job role</li>
            <li>ATS systems fail to detect relevant experience</li>
          </ul>
          <p className="mt-4 text-sm sm:text-base text-slate-700">
            By comparing your resume directly with a job description, you can increase keyword
            alignment, improve ATS compatibility, and boost your chances of being shortlisted.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            When this page is the wrong tool
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-700">
            Use this page only when you have one specific job posting. Otherwise, start with the correct
            intent page to avoid low-signal edits.
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-2 text-sm sm:text-base text-slate-700">
            <li>
              No target posting yet? Start with{" "}
              <Link
                href="/ats-resume-checker"
                className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                ATS resume checker
              </Link>{" "}
              for structure and readability risk.
            </li>
            <li>
              Need only missing terms list? Use{" "}
              <Link
                href="/resume-keyword-scanner"
                className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                resume keyword scanner
              </Link>
              .
            </li>
            <li>
              Need role-specific wording patterns first? Open{" "}
              <Link
                href="/resume-examples"
                className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                resume examples by role
              </Link>
              .
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            {config.resultsHeading}
          </h2>
          <div className="mt-4 space-y-4 text-sm sm:text-base text-slate-700">
            <div>
              <h3 className="font-semibold text-slate-900">ATS match score</h3>
              <p className="mt-1">
                A percentage-style score showing how well your resume matches the job description.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Missing keywords</h3>
              <p className="mt-1">
                Important skills and terms from the posting that are not clearly present in your
                resume.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Skill gaps</h3>
              <p className="mt-1">
                Areas where your resume does not fully align with what the role asks for.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Optimization suggestions</h3>
              <p className="mt-1">
                Actionable ideas to improve bullets and align your experience with the job.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            Real-world proof example
          </h2>
          <p className="mt-2 text-sm text-slate-700">
            <strong className="text-slate-900">Job description requires:</strong>{" "}
            {config.exampleJobRequires}
          </p>
          <p className="mt-2 text-sm text-slate-700">
            <strong className="text-slate-900">Your resume contains:</strong>{" "}
            {config.exampleResumeContains}
          </p>
          <p className="mt-3 text-sm font-medium text-slate-900">Result</p>
          <ul className="mt-1 list-disc pl-5 text-sm text-slate-700 space-y-1">
            <li>Missing: {config.exampleMissing}</li>
            <li>{config.exampleScoreLine}</li>
            <li>Suggested fix: {config.exampleFixLine}</li>
          </ul>
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/60 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Multi-intent capture examples
            </p>
            <ul className="mt-2 list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Software Engineer: “Resume not getting shortlisted?”</li>
              <li>Data Scientist: “Missing keywords for your role?”</li>
              <li>Product Manager: “ATS score too low?”</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Improve your resume further
          </h2>
          <ul className="mt-3 list-disc pl-5 space-y-1.5 text-sm sm:text-base text-slate-700">
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
                href="/ats-keywords"
                className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
              >
                Keywords for your target job
              </Link>
            </li>
            <li>
              <Link
                href="/ats-resume-template"
                className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
              >
                How to pass ATS systems
              </Link>
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Quick answers before you apply
          </h2>
          <div className="mt-4 space-y-4 text-sm sm:text-base text-slate-700">
            <div>
              <h3 className="font-semibold text-slate-900">
                Should I tailor my resume for every job?
              </h3>
              <p className="mt-1">
                Yes. Keep a master resume, then tailor summary, top bullets, and skills to each
                posting so ATS and recruiters see direct fit.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">
                What is the fastest way to improve shortlist rate?
              </h3>
              <p className="mt-1">
                Compare resume vs one real job description, fix missing requirements first, then
                tighten ATS readability. This sequence usually creates the biggest lift.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">
                Which page should I use first?
              </h3>
              <p className="mt-1">
                If you have a target posting, start with{" "}
                <Link
                  href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
                  className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
                >
                  the resume vs job description checker
                </Link>
                . If not, run ATS structure checks first and then tune keywords.
              </p>
            </div>
          </div>
          {path !== CHECK_RESUME_AGAINST_JD_PATH ? (
            <p className="mt-4 text-sm text-slate-700">
              For posting-specific match diagnostics, use{" "}
              <Link
                href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
                className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                check resume against job description
              </Link>
              .
            </p>
          ) : null}
        </section>

        <ToolClusterNextSteps />

        <section id="faq">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Frequently asked questions
          </h2>
          <div className="mt-5 space-y-5 text-sm sm:text-base text-slate-700">
            {config.faq.map((item) => (
              <div key={item.question}>
                <h3 className="font-semibold text-slate-900">{item.question}</h3>
                <p className="mt-1">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-900/10 bg-slate-900 text-white p-6 sm:p-8 text-center">
          <h2 className="text-lg sm:text-xl font-semibold tracking-tight">
            Final step
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-200 max-w-xl mx-auto">
            Stop guessing why your resume is not getting shortlisted. Compare your resume with a job
            description now and fix the gaps.
          </p>
          <a
            href="#ats-checker-form"
            className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100 transition"
          >
            {config.ctaAnchor}
          </a>
        </section>

        {isKeywordScanner ? (
          <section className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 sm:p-6 text-center">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
              Ready to optimize after keyword scan?
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-700 max-w-2xl mx-auto">
              Run the scanner above, close high-signal gaps, then unlock optimization for JD-aligned
              rewrite suggestions and downloadable output.
            </p>
            <a
              href="#ats-checker-form"
              className="mt-5 inline-flex rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition"
            >
              Scan keywords and continue to optimization
            </a>
          </section>
        ) : null}

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
          __html: JSON.stringify(toolClusterWebApplicationSchema(config)),
        }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolClusterFaqSchema(config)) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(toolClusterBreadcrumbSchema(config)),
        }}
      />
    </div>
  );
}
