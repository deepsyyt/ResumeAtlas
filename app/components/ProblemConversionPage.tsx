import Link from "next/link";
import { ResumeExampleSeoFunnel } from "@/app/components/ResumeExampleSeoFunnel";
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
import {
  getRelatedProblemEntries,
  type ProblemPageConfig,
  type ProblemSlug,
} from "@/app/lib/problemPages";
import { getSiteUrl } from "@/app/lib/siteUrl";
import { CHECK_RESUME_AGAINST_JD_FORM_HREF } from "@/app/lib/internalLinks";

type Props = {
  config: ProblemPageConfig;
};

export function ProblemConversionPage({ config }: Props) {
  const v = PROBLEM_LANDING_VARIANTS[config.slug];
  const related = getRelatedProblemEntries(config.slug);
  const siteUrl = getSiteUrl();
  const hasExamples = Boolean(config.scenario?.before && config.scenario?.after);
  const h1 = hasExamples
    ? `${v.heroHeadline} (Examples + Fixes)`
    : `${v.heroHeadline} (Why + Fix)`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${siteUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Problems",
        item: `${siteUrl}/problems`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: v.heroHeadline,
        item: `${siteUrl}/problems/${config.slug}`,
      },
    ],
  } as const;

  const topReasonsItemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Top reasons your resume is not getting interviews",
    itemListElement: config.rootCauses.bullets.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.title,
    })),
  } as const;

  const toneBox = problemToneCalloutClass(v.intent);
  const eyebrowTone = heroEyebrowClass(v.intent);

  // Intent-specific example output.
  // This avoids a "template" feel on every /problems/* page.
  const exampleBySlug: Partial<
    Record<
      ProblemSlug,
      { estimate: number; missingTerms: string[]; highestImpactFix: string }
    >
  > = {
    "resume-not-getting-interviews": {
      estimate: 62,
      missingTerms: ["SQL depth", "experiment language", "stakeholder outcomes"],
      highestImpactFix: "rewrite top bullets with JD terms + measurable proof",
    },
    "no-response-after-applying": {
      estimate: 58,
      missingTerms: ["role vocabulary", "tool mentions in bullets", "outcome framing"],
      highestImpactFix: "tighten headline/summary + lead bullets with the posting's must-haves",
    },
    "ats-rejecting-my-resume": {
      estimate: 54,
      missingTerms: ["standard section headings", "clean one-column structure", "parser-friendly dates"],
      highestImpactFix: "simplify layout and normalize headings so ATS can map fields reliably",
    },
    "missing-keywords-in-resume": {
      estimate: 61,
      missingTerms: ["must-have JD keywords", "context (where you used them)", "evidence-backed bullets"],
      highestImpactFix: "add truthful keyword coverage with proof in experience/skills sections",
    },
    "resume-vs-job-description": {
      estimate: 63,
      missingTerms: ["key JD themes", "metric-backed outcomes", "translation between titles and responsibilities"],
      highestImpactFix: "map each JD requirement to a specific bullet and reorder for relevance",
    },
  };

  const example = exampleBySlug[config.slug] ?? {
    estimate: 64,
    missingTerms: ["must-have terms", "evidence in top bullets", "clean ATS parsing"],
    highestImpactFix: "add missing JD terms with measurable proof",
  };

  const heroToolLineBySlug: Partial<Record<ProblemSlug, string>> = {
    "no-response-after-applying":
      "Paste your resume and one target job description to see why applications go silent.",
    "ats-rejecting-my-resume":
      "Paste your resume first to detect ATS parsing and structure issues before reapplying.",
    "missing-keywords-in-resume":
      "Paste resume + JD to find missing keywords and where to add truthful proof.",
    "resume-vs-job-description":
      "Paste both texts and map each job requirement to resume evidence in minutes.",
  };
  const heroToolLine =
    heroToolLineBySlug[config.slug] ??
    "Paste your resume and a target job description to diagnose gaps before applying.";

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* 1. Hero */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-slate-50/80 to-white">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-18 lg:px-8">
          <p className={`text-xs font-semibold uppercase tracking-wider ${eyebrowTone}`}>{v.heroEyebrow}</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl sm:leading-tight">
            {h1}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-700 sm:text-base">
            If your resume is {config.primaryKeyword}, here&apos;s why this happens and how to fix it
            with ATS-aware, role-specific improvements before your next application.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">{v.heroSubheadline}</p>
          <p className="mx-auto mt-3 max-w-xl text-sm font-medium text-slate-700 sm:text-base">{v.heroSupportLine}</p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            <Link href={CHECK_RESUME_AGAINST_JD_FORM_HREF} className={btnPrimary}>
              {v.cta.hero}
            </Link>
            <Link
              href="/resume-keyword-scanner"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              Find missing keywords in your resume
            </Link>
            <p className="w-full text-center text-xs text-slate-500 sm:text-sm">
              No login required · Free ATS analysis · Takes under 30 seconds
            </p>
          </div>
          <div className="mx-auto mt-5 max-w-2xl rounded-xl border border-slate-200 bg-white p-3 text-left">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Instant tool output preview
            </p>
            <p className="mt-1 text-sm text-slate-700">{heroToolLine}</p>
            <p className="mt-2 text-sm text-slate-700">
              Example: <strong className="text-slate-900">{example.estimate}%</strong> match · Missing:
              <span className="ml-1">{example.missingTerms.slice(0, 2).join(", ")}</span>.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 pt-6 sm:px-6 lg:px-8">
        <ResumeExampleSeoFunnel />
      </div>

      <div className="mx-auto max-w-3xl px-4 pt-4 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-rose-200 bg-rose-50/40 p-4 sm:p-5">
          <h2 className="text-base sm:text-lg font-semibold tracking-tight text-slate-900">
            Top reasons your resume is not getting interviews
          </h2>
          <ul className="mt-3 list-disc pl-5 space-y-1.5 text-sm text-slate-700">
            {config.rootCauses.bullets.slice(0, 3).map((b) => (
              <li key={b.title}>{b.title}</li>
            ))}
          </ul>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Example failure output
            </p>
            <p className="mt-2 text-sm text-slate-700">
              Match estimate: <strong className="text-slate-900">{example.estimate}%</strong> · Missing
              must-have terms: <span className="ml-1">{example.missingTerms.join(", ")}</span> ·
              Highest-impact fix: {example.highestImpactFix}.
            </p>
          </div>
          <div className="mt-4">
            <Link href={CHECK_RESUME_AGAINST_JD_FORM_HREF} className={btnPrimarySm}>
              Show me exactly what is failing
            </Link>
          </div>
        </section>

        <section className="mt-4 rounded-2xl border border-indigo-200 bg-indigo-50/40 p-4 sm:p-5">
          <h2 className="text-base sm:text-lg font-semibold tracking-tight text-slate-900">
            30-second diagnosis flow (use this order)
          </h2>
          <ol className="mt-3 list-decimal pl-5 space-y-1.5 text-sm text-slate-700">
            <li>
              Compare your resume with one target job description to find true relevance gaps.
            </li>
            <li>Fix top missing requirements first (not cosmetic edits).</li>
            <li>
              Run keyword scan for weak coverage and then clean ATS formatting before reapplying.
            </li>
          </ol>
          <p className="mt-3 text-sm text-slate-700">
            This avoids the common trap of rewriting blindly without posting-level alignment.
          </p>
        </section>
      </div>

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
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Role solution bridges
            </p>
            <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>
                <Link href="/software-engineer-resume-example#skills" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">
                  Software Engineer resume skills
                </Link>
              </li>
              <li>
                <Link href="/data-scientist-resume-example#skills" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">
                  Data Scientist resume skills
                </Link>
              </li>
              <li>
                <Link href="/product-manager-resume-example#summary" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">
                  Product Manager resume summary
                </Link>
              </li>
            </ul>
          </div>

          <div className={`mt-8 rounded-2xl border p-4 sm:p-5 text-sm sm:text-base ${toneBox}`}>
            <p className="leading-relaxed">{v.problemToneIntro}</p>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
            <h3 className="text-base font-semibold text-slate-900">Role-specific diagnosis and fixes</h3>
            <ul className="mt-3 list-disc pl-5 space-y-2 text-sm text-slate-700 sm:text-base">
              <li>
                <strong>If you&apos;re a Software Engineer:</strong> missing delivery keywords like
                APIs, CI/CD, reliability, or latency can lower match.
                <span className="ml-1">
                  <Link href="/software-engineer-resume-example#skills" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">Fix skills</Link>
                  {" · "}
                  <Link href="/software-engineer-resume-keywords" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">Engineer keywords</Link>
                </span>
              </li>
              <li>
                <strong>If you&apos;re a Data Scientist:</strong> resumes often miss SQL + experiment
                language or model evaluation metrics.
                <span className="ml-1">
                  <Link href="/data-scientist-resume-example#projects" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">Fix projects</Link>
                  {" · "}
                  <Link href="/data-scientist-resume-keywords" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">Scientist keywords</Link>
                </span>
              </li>
              <li>
                <strong>If you&apos;re a Product Manager:</strong> no quantified outcome language
                (activation, retention, revenue) is a common blocker.
                <span className="ml-1">
                  <Link href="/product-manager-resume-example#summary" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">Fix summary</Link>
                  {" · "}
                  <Link href="/product-manager-resume-keywords" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">PM keywords</Link>
                </span>
              </li>
            </ul>
            <p className="mt-3 text-sm text-slate-700">
              Common scenario patterns: missing SQL terms usually hurts analyst/scientist profiles;
              missing quantified impact usually hurts PM and leadership-oriented roles.
            </p>
            <p className="mt-3 text-sm text-slate-700">
              ATS guide links:{" "}
              <Link href="/ats-resume-template#how-ats-scans" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">
                how ATS scans resumes
              </Link>
              {" · "}
              <Link href="/ats-resume-template" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">
                how to pass ATS
              </Link>
              {" · "}
              <Link href="/ats-resume-template#common-mistakes" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">
                common ATS mistakes
              </Link>
            </p>
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
            <Link href={CHECK_RESUME_AGAINST_JD_FORM_HREF} className={btnPrimarySm}>
              {v.cta.afterProblem}
            </Link>
          </div>
        </section>
      </div>

      {/* 4. Benefits (shared) */}
      <BenefitsProductSection />
      <div className="flex justify-center pb-4">
        <Link href={CHECK_RESUME_AGAINST_JD_FORM_HREF} className={btnPrimarySm}>
          {v.cta.afterBenefits}
        </Link>
      </div>

      {/* 5. How it works (shared) */}
      <HowItWorksSection />

      {/* 6. Before / after (shared) */}
      <BeforeAfterVisualSection />
      <div className="flex justify-center pb-12">
        <Link href={CHECK_RESUME_AGAINST_JD_FORM_HREF} className={btnPrimary}>
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

        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Questions people ask before fixing this problem
          </h2>
          <div className="mt-4 space-y-4 text-sm sm:text-base text-slate-700">
            <div>
              <h3 className="font-semibold text-slate-900">
                Why am I getting impressions but no interview calls?
              </h3>
              <p className="mt-1">
                Usually because your resume has partial overlap with the posting but weak evidence in
                top sections. Improve alignment and proof, not just formatting.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">
                Should I use one resume for all applications?
              </h3>
              <p className="mt-1">
                A single master file is fine, but each application should have a tailored version for
                summary, core skills, and first bullets.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">
                What should I fix first for fastest improvement?
              </h3>
              <p className="mt-1">
                Start with must-have requirements from the JD, then strengthen proof bullets, then
                clean ATS readability issues.
              </p>
            </div>
          </div>
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
            <Link href={CHECK_RESUME_AGAINST_JD_FORM_HREF} className={`${btnPrimary} sm:px-8`}>
              {v.cta.bottomPrimary}
            </Link>
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
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
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(topReasonsItemListSchema) }}
      />
    </div>
  );
}
