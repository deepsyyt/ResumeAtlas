import Link from "next/link";
import { LastUpdated } from "@/app/components/LastUpdated";
import { ComparisonStickyCta } from "@/app/components/competitor/ComparisonStickyCta";
import { InterviewProblemBridge } from "@/app/components/competitor/InterviewProblemBridge";
import type { CompetitorComparisonPageConfig } from "@/app/lib/competitorComparison/types";
import { InterviewClusterNav } from "@/app/components/interviewCluster/InterviewClusterNav";
import { ATS_SCORE_VS_JOB_FIT_PATH, RESUME_NOT_GETTING_INTERVIEWS_PATH } from "@/app/lib/interviewCluster/paths";
import { absoluteCanonicalUrl } from "@/app/lib/searchIntentSeo";
import { getSiteUrl } from "@/app/lib/siteUrl";

type Props = {
  config: CompetitorComparisonPageConfig;
  benchmarkDisclaimer: string;
};

function CapabilityTable({
  rows,
  competitorName,
}: {
  rows: CompetitorComparisonPageConfig["comparisonRows"];
  competitorName: string;
}) {
  return (
    <div
      id="comparison-table"
      className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm scroll-mt-24"
    >
      <table className="min-w-[640px] w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
              Capability
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
            <tr key={row.capability} className="border-b border-slate-100 last:border-0">
              <th scope="row" className="px-4 py-3 font-medium text-slate-800 align-top">
                {row.capability}
              </th>
              <td className="px-4 py-3 text-slate-700 align-top">{row.resumeAtlas}</td>
              <td className="px-4 py-3 text-slate-700 align-top">{row.competitor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function WorkflowList({ title, steps }: { title: string; steps: string[] }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700">{title}</h3>
      <ol className="mt-4 list-none space-y-0 p-0">
        {steps.map((step, index) => (
          <li key={step} className="flex gap-3 text-sm text-slate-700">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
              {index + 1}
            </span>
            <span className="pt-0.5 leading-relaxed">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function CompetitorComparisonPage({ config, benchmarkDisclaimer }: Props) {
  const canonicalBase = getSiteUrl().replace(/\/$/, "");
  const pageUrl = absoluteCanonicalUrl(config.path);
  const example = config.exampleAnalysis;
  const heroCtaLabel = config.primaryCtaLabel ?? config.ctaLabel;
  const stickyCtaLabel = config.stickyCtaLabel ?? config.ctaLabel;
  const capabilitySubheading =
    config.capabilitySubheading ??
    "Both tools cover ATS scores and keywords. ResumeAtlas adds apply-readiness: verdict, rejection risks, and skill proof for one posting.";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${canonicalBase}/` },
      { "@type": "ListItem", position: 2, name: config.h1, item: pageUrl },
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
        <div className="page-prose-wide pb-10 pt-6 sm:pb-12 sm:pt-8">
          <nav aria-label="Breadcrumb" className="mb-3 text-left text-[11px] text-slate-500 sm:text-xs">
            <Link href="/" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">
              Home
            </Link>
            <span className="mx-1.5 text-slate-400">/</span>
            <Link
              href={RESUME_NOT_GETTING_INTERVIEWS_PATH}
              className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
            >
              Resume not getting interviews
            </Link>
            <span className="mx-1.5 text-slate-400">/</span>
            <span className="text-slate-600">{config.h1}</span>
          </nav>

          <p className="text-xs font-semibold uppercase tracking-wide text-sky-800">
            {config.primaryKeyword} · ResumeAtlas vs {config.competitorName}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {config.h1}
          </h1>
          <LastUpdated className="mt-3 text-xs text-slate-500" label={config.lastUpdatedLabel} noteOnly />

          <div className="mt-6 max-w-3xl space-y-4">
            <p className="text-base leading-relaxed text-slate-800 sm:text-lg">
              <strong className="font-semibold text-slate-900">{config.competitorName}</strong>{" "}
              {config.heroCompetitorLine}
            </p>
            <p className="text-base leading-relaxed text-slate-800 sm:text-lg">
              <strong className="font-semibold text-slate-900">ResumeAtlas</strong>{" "}
              {config.heroResumeAtlasLine}
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 sm:max-w-3xl">
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
                {config.competitorName} answers
              </p>
              <p className="mt-1 text-sm font-medium text-slate-900">{config.competitorCoreQuestion}</p>
            </div>
            <div className="rounded-lg border border-sky-200 bg-sky-50/60 px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-wide text-sky-800">
                ResumeAtlas answers
              </p>
              <p className="mt-1 text-sm font-medium text-slate-900">{config.resumeAtlasCoreQuestion}</p>
            </div>
          </div>

          <Link
            href={config.ctaHref}
            className="mt-8 inline-flex rounded-xl bg-slate-900 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-slate-800"
          >
            {heroCtaLabel}
          </Link>
          {config.trustSignals?.length ? (
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
              {config.trustSignals.map((signal) => (
                <span key={signal} className="text-xs text-slate-500">
                  ✓ {signal}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <div className="page-prose-wide space-y-12 py-10 sm:py-14">
        <section id="why-alternative" className="scroll-mt-20">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Why people look for a {config.competitorName} alternative
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700 sm:text-base">
            {config.whyAlternative.intro}
          </p>
          <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 text-sm text-slate-700 sm:text-base">
            {config.whyAlternative.reasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </section>

        <section id="philosophy" className="scroll-mt-20">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            {config.competitorName} vs ResumeAtlas: Philosophy
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-600">
            Keyword match and interview readiness are not the same decision.{" "}
            <Link
              href={ATS_SCORE_VS_JOB_FIT_PATH}
              className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
            >
              Why ATS scores are not enough
            </Link>{" "}
            explains why.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                {config.competitorName}
              </p>
              <p className="mt-3 text-lg font-semibold leading-snug text-slate-900">
                {config.philosophy.competitorTagline}
              </p>
            </div>
            <div className="rounded-xl border border-sky-200 bg-sky-50/50 p-6">
              <p className="text-xs font-bold uppercase tracking-wide text-sky-800">ResumeAtlas</p>
              <p className="mt-3 text-lg font-semibold leading-snug text-slate-900">
                {config.philosophy.resumeAtlasTagline}
              </p>
            </div>
          </div>
        </section>

        <InterviewProblemBridge competitorName={config.competitorName} />

        <div className="rounded-lg border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-700">
          Most users searching for a {config.competitorName} alternative want the same outcome: more
          interviews.{" "}
          <Link
            href={RESUME_NOT_GETTING_INTERVIEWS_PATH}
            className="font-semibold text-sky-800 underline underline-offset-2 hover:text-sky-950"
          >
            Resume not getting interviews
          </Link>{" "}
          is the problem this comparison helps solve.
        </div>

        <InterviewClusterNav currentPath={config.path} showComparisons={false} />

        <section id="who-each-tool-is-for" className="scroll-mt-20">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Who each tool is for
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-600">
            Honest picks — including when {config.competitorName} is the better fit.
          </p>
          <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-[480px] w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
                    If you want…
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
                    Best choice
                  </th>
                </tr>
              </thead>
              <tbody>
                {config.whoEachToolIsFor.map((row) => (
                  <tr key={row.ifYouWant} className="border-b border-slate-100 last:border-0">
                    <td className="px-4 py-3 text-slate-700 align-top">{row.ifYouWant}</td>
                    <td className="px-4 py-3 font-medium text-slate-900 align-top">{row.bestChoice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="workflow-comparison" className="scroll-mt-20">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Real workflow comparison
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-600">
            Same starting point — paste resume and job description. Different decision at the end.
          </p>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <WorkflowList title="ResumeAtlas workflow" steps={config.workflow.resumeAtlasSteps} />
            <WorkflowList
              title={`${config.competitorName} workflow`}
              steps={config.workflow.competitorSteps}
            />
          </div>
          {config.workflowValueLadder || config.workflowCtaLabel ? (
            <div className="mt-5 max-w-3xl rounded-lg border border-slate-200 bg-slate-50/80 px-4 py-3">
              {config.workflowValueLadder ? (
                <p className="text-sm font-medium text-slate-800">{config.workflowValueLadder}</p>
              ) : null}
              {config.workflowCtaLabel ? (
                <Link
                  href={config.ctaHref}
                  className={`inline-flex text-sm font-semibold text-sky-800 underline underline-offset-2 hover:text-sky-950${config.workflowValueLadder ? " mt-2" : ""}`}
                >
                  {config.workflowCtaLabel}
                </Link>
              ) : null}
            </div>
          ) : null}
        </section>

        <section id="capabilities">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Capability comparison
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-600">{capabilitySubheading}</p>
          <CapabilityTable rows={config.comparisonRows} competitorName={config.competitorName} />
          {config.tableCtaLabel ? (
            <Link
              href={config.ctaHref}
              className="mt-4 inline-flex text-sm font-semibold text-sky-800 underline underline-offset-2 hover:text-sky-950"
            >
              {config.tableCtaLabel}
            </Link>
          ) : null}
        </section>

        <section id="example-analysis" className="scroll-mt-20">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Same resume, same job description
          </h2>
          <p className="mt-2 text-sm text-slate-600">{benchmarkDisclaimer}</p>
          <p className="mt-1 text-sm font-medium text-slate-700">Example role: {example.roleLabel}</p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Resume</p>
              <p className="mt-2 text-sm text-slate-800">{example.resumeExcerpt}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Job description
              </p>
              <p className="mt-2 text-sm text-slate-800">{example.jdExcerpt}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {config.competitorName} output
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{example.competitorHeadline}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{example.competitorDetail}</p>
            </div>
            <div className="rounded-xl border border-sky-200 bg-sky-50/50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-800">
                ResumeAtlas output
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{example.resumeAtlasVerdict}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{example.resumeAtlasDetail}</p>
              {example.rejectionRisks.length > 0 ? (
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-rose-800">
                    Top rejection risks
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                    {example.rejectionRisks.map((risk) => (
                      <li key={risk}>{risk}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {example.recommendedFixes.length > 0 ? (
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
                    Recommended fixes
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                    {example.recommendedFixes.map((fix) => (
                      <li key={fix}>{fix}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>

          <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50/80 px-4 py-3 text-sm text-amber-950">
            {example.takeaway}
          </p>
          {config.exampleCtaLabel ? (
            <Link
              href={config.ctaHref}
              className="mt-5 inline-flex rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              {config.exampleCtaLabel}
            </Link>
          ) : (
            <Link
              href={config.ctaHref}
              className="mt-5 inline-flex text-sm font-semibold text-sky-800 underline underline-offset-2 hover:text-sky-950"
            >
              Run this on your resume and job description →
            </Link>
          )}
        </section>

        <section id="pros-cons">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Pros and cons
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
                {config.strengths.competitor.map((item) => (
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
                {config.limitations.competitor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="related-tools" className="rounded-xl border border-slate-200 bg-slate-50/70 p-5">
          <h2 className="text-base font-semibold text-slate-900">Try ResumeAtlas tools</h2>
          <p className="mt-1 text-sm text-slate-600">
            Compare resume to job description, run an ATS checker, or scan for missing keywords.
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {config.internalLinks.map((link) => (
              <li key={link.path} className="list-none">
                <Link
                  href={link.path}
                  className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
                >
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
          <h2 className="text-lg font-semibold sm:text-xl">
            Know if you&apos;re ready to apply before you apply
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-300">
            Paste your resume and a job description. Application verdict, rejection risks, keyword
            coverage, and job-specific optimization in one free scan.
          </p>
          <Link
            href={config.ctaHref}
            className="mt-5 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            {config.ctaLabel}
          </Link>
        </section>
      </div>

      <ComparisonStickyCta href={config.ctaHref} label={stickyCtaLabel} />

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
