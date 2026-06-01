import Link from "next/link";
import { LastUpdated } from "@/app/components/LastUpdated";
import { RoleClusterNavSection } from "@/app/components/RoleClusterNavSection";
import { SeoBreadcrumbs } from "@/app/components/SeoBreadcrumbs";
import {
  allCategorizedTerms,
  getPilotKeywordConfig,
  type PilotKeywordSlug,
} from "@/app/lib/pilotKeywordPages";
import { CONTENT_LAST_UPDATED_LABEL } from "@/app/lib/contentFreshness";
import {
  ATS_RESUME_TEMPLATE_GUIDE_PATH,
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  CHECK_RESUME_AGAINST_JD_PRIMARY_CTA,
} from "@/app/lib/internalLinks";

type Props = { slug: PilotKeywordSlug };

export function PilotKeywordsGuidePage({ slug }: Props) {
  const config = getPilotKeywordConfig(slug);
  const categorizedCount = allCategorizedTerms(config).length;

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
        <div className="mx-auto max-w-4xl px-4 pb-10 pt-6 sm:px-6 sm:pb-12 sm:pt-8 lg:px-8">
          <SeoBreadcrumbs
            kind="keywords"
            currentLabel={`${config.roleName} Resume Keywords`}
            currentPath={config.path}
            className="mb-3"
          />
          <div className="text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              {config.h1}
            </h1>
            <LastUpdated className="mt-3 text-xs text-slate-500" label={CONTENT_LAST_UPDATED_LABEL} />
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">{config.intro}</p>
            <p className="mx-auto mt-3 max-w-2xl rounded-lg border border-amber-200 bg-amber-50/80 px-3 py-2 text-sm text-amber-950">
              {config.scopeNote}
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

      <div className="mx-auto max-w-3xl space-y-12 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            {config.roleName} role overview
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">{config.roleOverview}</p>
        </section>

        <section id="top-keywords" className="rounded-2xl border border-sky-200 bg-sky-50/50 p-6 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Top {categorizedCount}+ ATS resume keywords (by category)
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Copy terms that appear in your target job description. Prioritize the first two categories, then
            tools and cloud platforms.
          </p>
          <div className="mt-6 space-y-6">
            {config.keywordCategories.map((block) => (
              <div key={block.heading}>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
                  {block.heading}
                </h3>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {block.terms.map((term) => (
                    <li
                      key={term}
                      className="list-none rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-800"
                    >
                      {term}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            {config.seniority.title}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {config.seniority.tiers.map((tier) => (
              <div key={tier.label} className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                <h3 className="text-sm font-semibold text-slate-900">{tier.label}</h3>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-700 sm:text-sm">
                  {tier.keywords.map((k) => (
                    <li key={k}>{k}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-6 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            ATS-optimized resume bullet examples
          </h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-sm text-slate-700 sm:text-base">
            {config.exampleBullets.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Common ATS keyword mistakes ({config.roleName.toLowerCase()} roles)
          </h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-slate-700 sm:text-base">
            {config.keywordMistakes.map((mistake) => (
              <li key={mistake}>{mistake}</li>
            ))}
          </ol>
        </section>

        <section className="rounded-2xl border border-violet-200 bg-violet-50/30 p-6 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Keyword placement strategy
          </h2>
          <dl className="mt-4 space-y-4">
            {config.placementStrategy.map((row) => (
              <div key={row.section}>
                <dt className="text-sm font-semibold text-slate-900">{row.section}</dt>
                <dd className="mt-1 text-sm text-slate-700">{row.guidance}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Resume example snippets
          </h2>
          <div className="mt-4 space-y-4">
            {config.resumeSnippets.map((snippet) => (
              <div key={snippet.label} className="rounded-xl border border-slate-200 bg-white p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {snippet.label}
                </h3>
                <p className="mt-2 text-sm text-slate-800">{snippet.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-sky-100 bg-sky-50/40 p-6 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            How ResumeAtlas scores {config.roleName.toLowerCase()} keyword match
          </h2>
          <p className="mt-3 text-sm text-slate-700 sm:text-base">{config.howResumeAtlasScores}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
            </Link>
            <Link
              href="/ats-resume-checker"
              className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              ATS resume checker
            </Link>
          </div>
        </section>

        {slug === "data-engineer" ? (
          <RoleClusterNavSection currentPath={config.path} />
        ) : (
          <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">Related pages</h2>
            <h3 className="mt-4 text-sm font-semibold text-slate-800">Keyword lists</h3>
            <ul className="mt-2 space-y-2 text-sm">
              {config.relatedKeywordPages.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="font-medium text-sky-700 underline underline-offset-2 hover:text-sky-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mt-6 text-sm font-semibold text-slate-800">Resume examples & format</h3>
            <ul className="mt-2 space-y-2 text-sm">
              {config.relatedGuidePages.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={ATS_RESUME_TEMPLATE_GUIDE_PATH}
                  className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
                >
                  ATS resume template & format guide
                </Link>
              </li>
            </ul>
          </section>
        )}

        <section id="faq">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">FAQs</h2>
          <div className="mt-6 space-y-4">
            {config.faq.map((item) => (
              <details
                key={item.question}
                className="group rounded-xl border border-slate-200 bg-white px-4 py-3"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-slate-900">{item.question}</h3>
                  <span className="text-xs text-slate-400 group-open:hidden">+</span>
                  <span className="hidden text-xs text-slate-400 group-open:inline">−</span>
                </summary>
                <p className="mt-2 text-sm text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
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
