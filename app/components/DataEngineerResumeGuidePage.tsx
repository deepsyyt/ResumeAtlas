import Link from "next/link";
import { LastUpdated } from "@/app/components/LastUpdated";
import { RoleOptimizeClusterNav } from "@/app/components/optimize/RoleOptimizeClusterNav";
import { RoleClusterNavSection } from "@/app/components/RoleClusterNavSection";
import { SeoBreadcrumbs } from "@/app/components/SeoBreadcrumbs";
import { DATA_ENGINEER_RESUME_GUIDE } from "@/app/lib/dataEngineerResumeGuide";
import { getOptimizeClusterNav } from "@/app/lib/roleOptimizer/clusterNav";
import { CONTENT_LAST_UPDATED_LABEL } from "@/app/lib/contentFreshness";
import {
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  CHECK_RESUME_AGAINST_JD_PRIMARY_CTA,
} from "@/app/lib/internalLinks";
export function DataEngineerResumeGuidePage() {
  const config = DATA_ENGINEER_RESUME_GUIDE;
  const optimizeCluster = getOptimizeClusterNav(config.path);

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
            kind="guide"
            currentLabel="Data Engineer Resume Guide"
            currentPath={config.path}
            className="mb-3"
          />
          <div className="text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              {config.h1}
            </h1>
            <LastUpdated className="mt-3 text-xs text-slate-500" label={CONTENT_LAST_UPDATED_LABEL} />
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              {config.intro}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {config.sections.map((s) => (
                <Link
                  key={s.id}
                  href={`#${s.id}`}
                  className="inline-flex scroll-mt-24 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                >
                  {s.title}
                </Link>
              ))}
              <Link
                href={config.examplePath}
                className="inline-flex scroll-mt-24 rounded-xl border border-sky-300 bg-sky-50 px-4 py-2.5 text-sm font-semibold text-sky-900 transition hover:bg-sky-100"
              >
                Full resume example
              </Link>
            </div>
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="mt-8 inline-flex rounded-xl bg-slate-900 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-slate-800"
            >
              {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
            </Link>
          </div>
        </div>
      </section>

      <div className="page-prose space-y-10 py-10 sm:py-14">
        {optimizeCluster ? (
          <RoleOptimizeClusterNav cluster={optimizeCluster} currentPath={config.path} />
        ) : null}

        {config.sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
              {section.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">{section.body}</p>
            {section.bullets.length > 0 ? (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700 sm:text-base">
                {section.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        <section className="rounded-2xl border border-sky-100 bg-sky-50/50 p-6 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Full data engineer resume example
          </h2>
          <p className="mt-3 text-sm text-slate-700 sm:text-base">
            Ready-to-study sample with ATS score breakdown, recruiter section review, keywords, and FAQs—not
            just bullet patterns.
          </p>
          <Link
            href={config.examplePath}
            className="mt-4 inline-flex font-semibold text-sky-800 underline underline-offset-2 hover:text-sky-950"
          >
            View data engineer resume example →
          </Link>
        </section>

        {optimizeCluster ? (
          <RoleOptimizeClusterNav cluster={optimizeCluster} currentPath={config.path} />
        ) : null}

        <RoleClusterNavSection currentPath={config.path} />

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
      </div>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  );
}
