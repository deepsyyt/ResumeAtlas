import Link from "next/link";
import { LastUpdated } from "@/app/components/LastUpdated";
import { ComparisonStickyCta } from "@/app/components/competitor/ComparisonStickyCta";
import type { CompetitorComparisonPageConfig } from "@/app/lib/competitorComparison/types";
import { absoluteCanonicalUrl } from "@/app/lib/searchIntentSeo";
import { getSiteUrl } from "@/app/lib/siteUrl";

type Props = {
  config: CompetitorComparisonPageConfig;
  benchmarkDisclaimer: string;
};

function ComparisonTable({
  rows,
  competitorName,
}: {
  rows: CompetitorComparisonPageConfig["comparisonRows"];
  competitorName: string;
}) {
  return (
    <div id="comparison-table" className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm scroll-mt-24">
      <table className="min-w-[640px] w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
              Feature
            </th>
            <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
              ResumeAtlas
            </th>
            <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
              {competitorName}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.feature} className="border-b border-slate-100 last:border-0">
              <th scope="row" className="px-4 py-3 font-medium text-slate-800 align-top">
                {row.feature}
              </th>
              <td className="px-4 py-3 text-slate-700 align-top">{row.resumeAtlas}</td>
              <td className="px-4 py-3 text-slate-700 align-top">{row.jobscan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function CompetitorComparisonPage({ config, benchmarkDisclaimer }: Props) {
  const canonicalBase = getSiteUrl().replace(/\/$/, "");
  const pageUrl = absoluteCanonicalUrl(config.path);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${canonicalBase}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: config.h1,
        item: pageUrl,
      },
    ],
  };

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
    <main className="min-h-screen bg-white pb-24 text-slate-900 lg:pb-0">
      <section className="border-b border-slate-200 bg-slate-50/60">
        <div className="mx-auto max-w-4xl px-4 pb-10 pt-6 sm:px-6 sm:pb-12 sm:pt-8 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-3 text-left text-[11px] text-slate-500 sm:text-xs">
            <Link href="/" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">
              Home
            </Link>
            <span className="mx-1.5 text-slate-400">/</span>
            <span className="text-slate-600">{config.h1}</span>
          </nav>

          <p className="text-xs font-semibold uppercase tracking-wide text-sky-800">
            {config.primaryKeyword} · side-by-side comparison
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {config.h1}
          </h1>
          <LastUpdated
            className="mt-3 text-xs text-slate-500"
            label={config.lastUpdatedLabel}
            noteOnly
          />

          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-700 sm:text-lg">
            {config.heroAnswer}
          </p>

          <ComparisonTable rows={config.comparisonRows} competitorName={config.competitorName} />

          <p className="mt-5 max-w-3xl text-sm text-slate-600">{config.verdictSummary}</p>

          <Link
            href={config.ctaHref}
            className="mt-6 inline-flex rounded-xl bg-slate-900 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-slate-800"
          >
            {config.ctaLabel}
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-12 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <section id="quick-verdict">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">Quick verdict</h2>
          <p className="mt-2 text-sm text-slate-600">
            A {config.primaryKeyword} should fit your workflow, not just chase a higher match percentage. Summary below;
            see the{" "}
            <a href="#comparison-table" className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950">
              full comparison table
            </a>{" "}
            above.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
            {config.quickVerdictPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>

        <section id="real-test" className="scroll-mt-20">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">Real resume test</h2>
          <p className="mt-2 text-sm text-slate-600">{benchmarkDisclaimer}</p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Resume excerpt</p>
              <p className="mt-2 text-sm text-slate-800">{config.benchmark.resumeExcerpt}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Job description excerpt</p>
              <p className="mt-2 text-sm text-slate-800">{config.benchmark.jdExcerpt}</p>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-[640px] w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
                    Output
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
                    ResumeAtlas
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
                    {config.competitorName}
                  </th>
                </tr>
              </thead>
              <tbody>
                {config.benchmark.results.map((row) => (
                  <tr key={row.label} className="border-b border-slate-100 last:border-0">
                    <th scope="row" className="px-4 py-3 font-medium text-slate-800 align-top">
                      {row.label}
                    </th>
                    <td className="px-4 py-3 text-slate-700 align-top">{row.resumeAtlas}</td>
                    <td className="px-4 py-3 text-slate-700 align-top">{row.jobscan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50/80 px-4 py-3 text-sm text-amber-950">
            {config.benchmark.takeaway}
          </p>
          <Link
            href={config.ctaHref}
            className="mt-5 inline-flex text-sm font-semibold text-sky-800 underline underline-offset-2 hover:text-sky-950"
          >
            Run the same test on your resume →
          </Link>
        </section>

        <section id="pricing">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">Pricing comparison</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-sky-200 bg-sky-50/50 p-5">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-sky-900">ResumeAtlas</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
                {config.pricing.resumeAtlas.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700">{config.competitorName}</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
                {config.pricing.jobscan.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="strengths">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Strengths and limitations
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-5">
              <h3 className="font-semibold text-slate-900">ResumeAtlas strengths</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
                {config.strengths.resumeAtlas.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold text-slate-900">{config.competitorName} strengths</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
                {config.strengths.jobscan.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold text-slate-900">ResumeAtlas limitations</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
                {config.limitations.resumeAtlas.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold text-slate-900">{config.competitorName} limitations</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
                {config.limitations.jobscan.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="who-should-use">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Who should use which tool?
          </h2>
          <ul className="mt-5 space-y-3">
            {config.audience.map((row) => (
              <li key={row.persona} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
                <span className="font-semibold text-slate-900">{row.persona}:</span>{" "}
                <span className="text-slate-700">{row.pick}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="why-alternatives">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Why users look for {config.competitorName} alternatives
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
            {config.whyAlternatives.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        {config.roleComparisons.length > 0 ? (
          <section id="by-role" className="scroll-mt-20">
            <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
              {config.h1} by role
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Same comparison, focused on roles where JD-specific proof matters most.
            </p>
            <div className="mt-6 space-y-6">
              {config.roleComparisons.map((section) => (
                <article
                  key={section.anchorSlug}
                  id={section.anchorSlug}
                  className="scroll-mt-20 rounded-xl border border-slate-200 bg-white p-5 sm:p-6"
                >
                  <h3 className="text-lg font-semibold text-slate-900">
                    {config.h1} for {section.role}
                  </h3>
                  <p className="mt-2 text-sm text-slate-700">{section.intro}</p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg border border-sky-200 bg-sky-50/50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-sky-900">
                        ResumeAtlas
                      </p>
                      <p className="mt-2 text-sm text-slate-700">{section.resumeAtlas}</p>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                        {config.competitorName}
                      </p>
                      <p className="mt-2 text-sm text-slate-700">{section.competitor}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section id="related-tools" className="rounded-xl border border-slate-200 bg-slate-50/70 p-5">
          <h2 className="text-base font-semibold text-slate-900">ResumeAtlas tools to try next</h2>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {config.internalLinks.map((link) => (
              <li key={link.path} className="list-none">
                <Link href={link.path} className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section id="faq">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">FAQ</h2>
          <div className="mt-6 space-y-3">
            {config.faq.map((item) => (
              <details key={item.question} className="group rounded-xl border border-slate-200 bg-white px-4 py-3">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-slate-900">{item.question}</h3>
                  <span className="text-slate-400 text-xs group-open:hidden">+</span>
                  <span className="text-slate-400 text-xs hidden group-open:inline">−</span>
                </summary>
                <p className="mt-2 text-sm text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-slate-900 px-6 py-8 text-center text-white sm:px-8">
          <h2 className="text-lg font-semibold sm:text-xl">Try the free {config.competitorName} alternative</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-300">
            Paste your resume and a job description to see keyword gaps and evidence match in one run.
          </p>
          <Link
            href={config.ctaHref}
            className="mt-5 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            {config.ctaLabel}
          </Link>
        </section>
      </div>

      <ComparisonStickyCta href={config.ctaHref} label={config.ctaLabel} />

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  );
}
