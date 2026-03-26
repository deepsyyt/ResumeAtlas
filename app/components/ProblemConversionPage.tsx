import Link from "next/link";
import { RelatedProblemsWidget } from "@/app/components/RelatedProblemsWidget";
import {
  BeforeAfterVisualSection,
  BenefitsProductSection,
  btnPrimary,
  btnPrimarySm,
  FlexibilitySection,
  GuidesFooterLinks,
  HowItWorksSection,
  TopicClusterCallout,
  ProductPreviewSection,
  TimeSavingSection,
} from "@/app/components/problemLandingShared";
import {
  heroEyebrowClass,
  PROBLEM_LANDING_VARIANTS,
  problemToneCalloutClass,
} from "@/app/lib/problemLandingVariants";
import { getRelatedProblemEntries, type ProblemPageConfig } from "@/app/lib/problemPages";
import { getSiteUrl } from "@/app/lib/siteUrl";

type Props = {
  config: ProblemPageConfig;
};

export function ProblemConversionPage({ config }: Props) {
  const v = PROBLEM_LANDING_VARIANTS[config.slug];
  const related = getRelatedProblemEntries(config.slug);
  const siteUrl = getSiteUrl();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const toneBox = problemToneCalloutClass(v.intent);
  const eyebrowTone = heroEyebrowClass(v.intent);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* 1. Hero */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-slate-50/80 to-white">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-18 lg:px-8">
          <p className={`text-xs font-semibold uppercase tracking-wider ${eyebrowTone}`}>{v.heroEyebrow}</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl sm:leading-tight">
            {v.heroHeadline}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">{v.heroSubheadline}</p>
          <p className="mx-auto mt-3 max-w-xl text-sm font-medium text-slate-700 sm:text-base">{v.heroSupportLine}</p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:gap-4">
            <Link href="/#ats-checker-form" className={btnPrimary}>
              {v.cta.hero}
            </Link>
            <p className="text-xs text-slate-500 sm:text-sm">
              No login required · Free ATS analysis · Takes under 30 seconds
            </p>
          </div>
        </div>
      </section>

      {/* 2. Visual proof (intent-based emphasis) */}
      <ProductPreviewSection
        emphasis={v.previewEmphasis}
        title={v.previewTitle}
        subtitle={v.previewSubtitle}
      />

      {/* Unique section (per page) */}
      <section className="border-b border-slate-100 bg-white py-10 sm:py-12" aria-labelledby="unique-intent-section">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 id="unique-intent-section" className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            {v.uniqueSection.title}
          </h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            {v.uniqueSection.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Problem → solution bridge + SEO body */}
      <div className="mx-auto max-w-3xl space-y-12 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <section aria-labelledby="bridge-heading">
          <h2 id="bridge-heading" className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            {v.bridgeTitle}
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">{v.bridgeLead}</p>

          <TopicClusterCallout className="mt-6" />

          <div className={`mt-8 rounded-2xl border p-4 sm:p-5 text-sm sm:text-base ${toneBox}`}>
            <p className="leading-relaxed">{v.problemToneIntro}</p>
          </div>

          <h3 className="mt-8 text-base font-semibold text-slate-900">{config.rootCauses.heading}</h3>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">{config.rootCauses.intro}</p>
          <ul className="mt-5 space-y-4">
            {config.rootCauses.bullets.map((b) => (
              <li key={b.title}>
                <p className="text-sm font-semibold text-slate-900 sm:text-base">{b.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600 sm:text-base">{b.text}</p>
              </li>
            ))}
          </ul>

          <h3 className="mt-10 text-base font-semibold text-slate-900">{config.mistakes.heading}</h3>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">{config.mistakes.intro}</p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-slate-700 sm:text-base">
            {config.mistakes.bullets.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>

          <div className="mt-8 flex justify-center">
            <Link href="/#ats-checker-form" className={btnPrimarySm}>
              {v.cta.afterProblem}
            </Link>
          </div>
        </section>
      </div>

      {/* 4. Benefits (shared) */}
      <BenefitsProductSection />
      <div className="flex justify-center pb-4">
        <Link href="/#ats-checker-form" className={btnPrimarySm}>
          {v.cta.afterBenefits}
        </Link>
      </div>

      {/* 5. How it works (shared) */}
      <HowItWorksSection />

      {/* 6. Before / after (shared) */}
      <BeforeAfterVisualSection />
      <div className="flex justify-center pb-12">
        <Link href="/#ats-checker-form" className={btnPrimary}>
          {v.cta.afterBeforeAfter}
        </Link>
      </div>

      {/* 7–8. Flexibility + time (shared) */}
      <FlexibilitySection />
      <TimeSavingSection />

      {/* SEO: what works + product blurb */}
      <div className="mx-auto max-w-3xl space-y-10 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <section aria-labelledby="what-works-seo">
          <h2 id="what-works-seo" className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            {config.whatWorks.heading}
          </h2>
          <ol className="mt-5 list-decimal space-y-4 pl-5 text-sm marker:font-semibold sm:text-base">
            {config.whatWorks.steps.map((step) => (
              <li key={step.title} className="pl-1 text-slate-700">
                <span className="font-semibold text-slate-900">{step.title}</span>
                <span className="mt-1 block text-slate-600">{step.body}</span>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="resumeatlas-seo">
          <h2 id="resumeatlas-seo" className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            {config.resumeAtlas.heading}
          </h2>
          {config.resumeAtlas.paragraphs.map((p, i) => (
            <p key={i} className="mt-3 text-sm text-slate-600 sm:text-base">
              {p}
            </p>
          ))}
        </section>

        <section
          className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8"
          aria-labelledby="final-cta-heading"
        >
          <h2 id="final-cta-heading" className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            {config.cta.heading}
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">{config.cta.body}</p>
          <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
            <Link href="/#ats-checker-form" className={`${btnPrimary} sm:px-8`}>
              {v.cta.bottomPrimary}
            </Link>
            <Link
              href="/#ats-checker-form"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              {v.cta.bottomSecondary}
            </Link>
          </div>
          <GuidesFooterLinks />
        </section>

        <section id="faq">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">FAQ</h2>
          <div className="mt-6 space-y-4">
            {config.faq.map((f) => (
              <details key={f.question} className="group rounded-xl border border-slate-200 bg-white px-4 py-3">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-slate-900">{f.question}</h3>
                  <span className="text-xs text-slate-400 group-open:hidden">+</span>
                  <span className="hidden text-xs text-slate-400 group-open:inline">−</span>
                </summary>
                <p className="mt-2 text-sm text-slate-600">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>

      <RelatedProblemsWidget entries={related} siteUrl={siteUrl} />

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  );
}
