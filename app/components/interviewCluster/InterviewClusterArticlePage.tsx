import Link from "next/link";
import { LastUpdated } from "@/app/components/LastUpdated";
import { InterviewClusterNav } from "@/app/components/interviewCluster/InterviewClusterNav";
import { COMPARISON_FRESHNESS_NOTE } from "@/app/lib/competitorComparison/constants";
import type { ClusterArticleConfig } from "@/app/lib/interviewCluster/articleTypes";
import { RESUME_NOT_GETTING_INTERVIEWS_PATH } from "@/app/lib/interviewCluster/paths";
import {
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  CHECK_RESUME_AGAINST_JD_PRIMARY_CTA,
  COMPETITOR_COMPARISON_CTA,
} from "@/app/lib/internalLinks";
import { absoluteCanonicalUrl } from "@/app/lib/searchIntentSeo";
import { getSiteUrl } from "@/app/lib/siteUrl";

type Props = {
  config: ClusterArticleConfig;
};

export function InterviewClusterArticlePage({ config }: Props) {
  const canonicalBase = getSiteUrl().replace(/\/$/, "");
  const pageUrl = absoluteCanonicalUrl(config.path);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${canonicalBase}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Resume not getting interviews",
        item: `${canonicalBase}${RESUME_NOT_GETTING_INTERVIEWS_PATH}`,
      },
      { "@type": "ListItem", position: 3, name: config.h1, item: pageUrl },
    ],
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
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
            {config.primaryKeyword}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {config.h1}
          </h1>
          <LastUpdated className="mt-3 text-xs text-slate-500" label={COMPARISON_FRESHNESS_NOTE} noteOnly />
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-800 sm:text-lg">
            {config.heroIntro}
          </p>
          <Link
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="mt-8 inline-flex rounded-xl bg-slate-900 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-slate-800"
          >
            {COMPETITOR_COMPARISON_CTA}
          </Link>
        </div>
      </section>

      <div className="page-prose-wide space-y-12 py-10 sm:py-14">
        {config.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
              {section.heading}
            </h2>
            {section.paragraphs.map((p) => (
              <p key={p.slice(0, 48)} className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700 sm:text-base">
                {p}
              </p>
            ))}
            {section.bullets?.length ? (
              <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 text-sm text-slate-700 sm:text-base">
                {section.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        <section className="rounded-xl border border-sky-200 bg-sky-50/40 p-6">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">{config.productHeading}</h2>
          {config.productParagraphs.map((p) => (
            <p key={p.slice(0, 48)} className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700 sm:text-base">
              {p}
            </p>
          ))}
          <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 text-sm text-slate-700 sm:text-base">
            {config.productBullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <Link
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
          </Link>
        </section>

        <InterviewClusterNav currentPath={config.path} />

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
      </div>

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
