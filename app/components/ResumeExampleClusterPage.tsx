import Link from "next/link";
import { LastUpdated } from "@/app/components/LastUpdated";
import { RoleOptimizeClusterNav } from "@/app/components/optimize/RoleOptimizeClusterNav";
import { RoleClusterNavSection } from "@/app/components/RoleClusterNavSection";
import { ResumeBulletPreviewCopyButton } from "@/app/components/ResumeBulletPreviewCopyButton";
import { CONTENT_LAST_UPDATED_LABEL } from "@/app/lib/contentFreshness";
import {
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  CHECK_RESUME_AGAINST_JD_PRIMARY_CTA,
} from "@/app/lib/internalLinks";
import {
  getResumeExampleClusterConfig,
  resumeExampleClusterPath,
  resumeSampleToPlainText,
  type ResumeExampleClusterSlug,
} from "@/app/lib/resumeExampleClusterPages";
import { SeoBreadcrumbs } from "@/app/components/SeoBreadcrumbs";
import { getOptimizeClusterNav } from "@/app/lib/roleOptimizer/clusterNav";

type Props = { slug: ResumeExampleClusterSlug };

export function ResumeExampleClusterPage({ slug }: Props) {
  const config = getResumeExampleClusterConfig(slug);
  const canonicalPath = resumeExampleClusterPath(slug);
  const plainResume = resumeSampleToPlainText(config.sample);
  const optimizeCluster = getOptimizeClusterNav(canonicalPath);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="border-b border-slate-200 bg-slate-50/50">
        <div className="page-prose-wide pb-10 pt-6 sm:pb-12 sm:pt-8">
          <SeoBreadcrumbs
            kind="example"
            currentLabel={`${config.roleName} Resume Example`}
            currentPath={canonicalPath}
            className="mb-3"
          />
          <div className="text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              {config.h1}
            </h1>
            <LastUpdated className="mt-3 text-xs text-slate-500" label={CONTENT_LAST_UPDATED_LABEL} />
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              {config.opening}
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
              Related:{" "}
              <Link
                href={config.keywordsPath}
                className="font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-900"
              >
                {config.roleNameLower} resume keywords
              </Link>
              {" · "}
              <Link
                href={config.guidePath}
                className="font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-900"
              >
                {config.roleNameLower} resume guide
              </Link>
            </p>
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="mt-8 inline-flex rounded-xl bg-slate-900 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-slate-800"
            >
              {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
            </Link>
          </div>
        </div>
      </section>

      <div className="page-prose space-y-12 py-10 sm:py-14">
        {optimizeCluster ? (
          <RoleOptimizeClusterNav cluster={optimizeCluster} currentPath={canonicalPath} />
        ) : null}

        <section id="who-for">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Who this {config.roleNameLower} resume example is for
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700 sm:text-base">
            {config.whoFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section id="ats-breakdown" className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            ATS score breakdown (sample)
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">{config.atsSummary}</p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[280px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-300">
                  <th className="py-2 pr-4 font-semibold text-slate-900">Dimension</th>
                  <th className="py-2 pr-4 font-semibold text-slate-900">Score</th>
                  <th className="py-2 font-semibold text-slate-900">Notes</th>
                </tr>
              </thead>
              <tbody>
                {config.atsDimensions.map((row) => (
                  <tr key={row.label} className="border-b border-slate-200">
                    <td className="py-3 pr-4 font-medium text-slate-800">{row.label}</td>
                    <td className="py-3 pr-4 tabular-nums text-slate-800">{row.score}/100</td>
                    <td className="py-3 text-slate-600">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-600">
            Scores are illustrative—compare your draft to a real posting with the{" "}
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-900"
            >
              resume-to-job-description checker
            </Link>
            .
          </p>
        </section>

        <section id="full-example">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            ATS-friendly {config.roleNameLower} resume example
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Fictional candidate for teaching structure only—do not copy employers or metrics you cannot defend in an
            interview.
          </p>
          <div className="relative mt-4">
            <pre className="overflow-x-auto rounded-xl border border-slate-200 bg-white p-4 text-xs leading-relaxed text-slate-800 sm:text-sm whitespace-pre-wrap font-mono">
              {plainResume}
            </pre>
            <ResumeBulletPreviewCopyButton
              text={plainResume}
              className="absolute right-3 top-3"
              tailoredPrompt="Paste your resume and a job description to see missing keywords."
              tailoredCtaHref={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              tailoredCtaLabel="Check against job description"
            />
          </div>
          <p className="mt-3 text-sm text-slate-600">
            Downloadable structure: copy the block above into a plain .docx or one-column layout—no tables, text boxes,
            icons, or graphics for core text. Need a Word/Google Docs starter? Use the{" "}
            <Link href="/ats-resume-template" className="font-semibold text-sky-700 underline underline-offset-2">
              ATS resume template guide
            </Link>
            .
          </p>
        </section>

        <section id="why-it-works">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Why this {config.roleNameLower} resume works
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700 sm:text-base">
            {config.whyItWorks.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section id="recruiter-review">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Recruiter review (section by section)
          </h2>
          <div className="mt-6 space-y-4">
            {config.recruiterReview.map((block) => (
              <div
                key={block.section}
                className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base font-semibold text-slate-900">{block.section}</h3>
                  <span className="text-xs font-semibold uppercase tracking-wide text-sky-800">
                    {block.verdict}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">{block.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="keywords">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Top keywords included (from real job descriptions)
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Mirror the posting you are applying to—use the full list on the{" "}
            <Link
              href={config.keywordsPath}
              className="font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-900"
            >
              {config.roleNameLower} resume keywords
            </Link>{" "}
            page.
          </p>
          <div className="mt-6 space-y-6">
            {config.keywordGroups.map((group) => (
              <div key={group.heading}>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
                  {group.heading}
                </h3>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {group.terms.map((term) => (
                    <li
                      key={term}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-800 sm:text-sm"
                    >
                      {term}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="mistakes">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Common {config.roleNameLower} resume mistakes
          </h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-700 sm:text-base">
            {config.mistakes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </section>

        <section id="customize">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            How to customize this resume for your level
          </h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[280px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-300">
                  <th className="py-2 pr-4 font-semibold text-slate-900">Level</th>
                  <th className="py-2 font-semibold text-slate-900">What to change</th>
                </tr>
              </thead>
              <tbody>
                {config.customizeLevels.map((row) => (
                  <tr key={row.level} className="border-b border-slate-200 align-top">
                    <td className="py-3 pr-4 font-medium text-slate-800 whitespace-nowrap">
                      {row.level}
                    </td>
                    <td className="py-3 text-slate-600">{row.guidance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="faq">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">FAQ</h2>
          <dl className="mt-6 space-y-6">
            {config.faq.map((item) => (
              <div key={item.question}>
                <dt className="text-base font-semibold text-slate-900">{item.question}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        {optimizeCluster ? (
          <RoleOptimizeClusterNav cluster={optimizeCluster} currentPath={canonicalPath} />
        ) : null}

        <RoleClusterNavSection currentPath={canonicalPath} />

        <section
          id="cta"
          className="rounded-2xl border border-slate-200 bg-slate-900 p-6 text-center text-white sm:p-8"
        >
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Use ResumeAtlas to check your {config.roleNameLower} resume
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-200 sm:text-base">
            Paste your resume and a job description to see missing keywords, weak bullets, and ATS risks before you
            apply—not after a rejection.
          </p>
          <Link
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="mt-6 inline-flex rounded-xl bg-white px-6 py-3.5 text-base font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
          </Link>
        </section>
      </div>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  );
}
