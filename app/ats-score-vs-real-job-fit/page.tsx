import type { Metadata } from "next";
import Link from "next/link";
import { LastUpdated } from "@/app/components/LastUpdated";
import { InterviewClusterNav } from "@/app/components/interviewCluster/InterviewClusterNav";
import {
  ATS_SCORE_VS_JOB_FIT_FAQ,
  ATS_SCORE_VS_JOB_FIT_H1,
  ATS_SCORE_VS_JOB_FIT_SUBHEAD,
  ATS_SCORE_VS_JOB_FIT_LAST_UPDATED,
  ATS_SCORE_VS_JOB_FIT_META,
  ATS_SCORE_VS_JOB_FIT_PATH,
  ATS_SCORE_VS_JOB_FIT_TITLE,
  APPLY_READINESS_CHECKS,
  KEYWORD_VS_READINESS,
} from "@/app/lib/atsScoreVsJobFitContent";
import { RESUME_NOT_GETTING_INTERVIEWS_PATH } from "@/app/lib/interviewCluster/paths";
import {
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  COMPETITOR_COMPARISON_CTA,
} from "@/app/lib/internalLinks";
import { absoluteCanonicalUrl } from "@/app/lib/searchIntentSeo";
import { getSiteUrl } from "@/app/lib/siteUrl";

export const metadata: Metadata = {
  title: ATS_SCORE_VS_JOB_FIT_TITLE,
  description: ATS_SCORE_VS_JOB_FIT_META,
  alternates: {
    canonical: ATS_SCORE_VS_JOB_FIT_PATH,
  },
  openGraph: {
    title: ATS_SCORE_VS_JOB_FIT_TITLE,
    description: ATS_SCORE_VS_JOB_FIT_META,
    url: absoluteCanonicalUrl(ATS_SCORE_VS_JOB_FIT_PATH),
    siteName: "ResumeAtlas",
    type: "article",
  },
  robots: { index: true, follow: true },
};

export default function AtsScoreVsRealJobFitPage() {
  const canonicalBase = getSiteUrl().replace(/\/$/, "");
  const pageUrl = absoluteCanonicalUrl(ATS_SCORE_VS_JOB_FIT_PATH);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ATS_SCORE_VS_JOB_FIT_FAQ.map((item) => ({
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
      { "@type": "ListItem", position: 3, name: ATS_SCORE_VS_JOB_FIT_H1, item: pageUrl },
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
            <span className="text-slate-600">{ATS_SCORE_VS_JOB_FIT_H1}</span>
          </nav>

          <p className="text-xs font-semibold uppercase tracking-wide text-sky-800">
            Apply-readiness · ATS checker · Keyword scanner
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {ATS_SCORE_VS_JOB_FIT_H1}
          </h1>
          <p className="mt-2 text-lg font-medium text-slate-700">{ATS_SCORE_VS_JOB_FIT_SUBHEAD}</p>
          <LastUpdated className="mt-3 text-xs text-slate-500" label={ATS_SCORE_VS_JOB_FIT_LAST_UPDATED} noteOnly />

          <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-800 sm:text-lg">
            A strong ATS score or keyword match feels like progress. It is not the same as being ready to
            apply. Recruiters do not hire keyword density — they hire evidence that you can do the job.
          </p>

          <div className="mt-8 flex max-w-2xl flex-col items-stretch gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <p className="text-sm font-medium text-slate-500">The gap most tools do not close</p>
              <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Keyword match <span className="text-rose-600">≠</span> Interview readiness
              </p>
            </div>
          </div>

          <Link
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="mt-8 inline-flex rounded-xl bg-slate-900 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-slate-800"
          >
            {COMPETITOR_COMPARISON_CTA}
          </Link>
        </div>
      </section>

      <div className="page-prose-wide space-y-12 py-10 sm:py-14">
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            What ATS scores actually measure
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700 sm:text-base">
            When you compare resume to job description, most tools return a match percentage, keyword
            coverage, or ATS compatibility score. Those signals answer:{" "}
            <em>Do the right words appear?</em> They do not fully answer:{" "}
            <em>Will someone shortlist this resume for this role?</em>
          </p>
          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-[640px] w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
                    Signal
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
                    What it measures
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
                    What it often misses
                  </th>
                </tr>
              </thead>
              <tbody>
                {KEYWORD_VS_READINESS.map((row) => (
                  <tr key={row.signal} className="border-b border-slate-100 last:border-0">
                    <th scope="row" className="px-4 py-3 font-medium text-slate-800 align-top">
                      {row.signal}
                    </th>
                    <td className="px-4 py-3 text-slate-700 align-top">{row.whatItMeasures}</td>
                    <td className="px-4 py-3 text-slate-700 align-top">{row.whatItMisses}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            What real job fit requires
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700 sm:text-base">
            Apply-readiness is a different question. Before you submit, you need to know whether the
            evidence in your resume supports the requirements of this posting — and what will eliminate
            you if it does not.
          </p>
          <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 text-sm text-slate-700 sm:text-base">
            {APPLY_READINESS_CHECKS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-700 sm:text-base">
            ResumeAtlas is built around that checklist. You still get ATS score and keyword coverage —
            they are inputs, not the final decision.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Example: 78% keyword match, still not ready
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700 sm:text-base">
            A software engineer resume matches 78% of a senior role&apos;s keywords. Kubernetes, AWS,
            and observability appear in the skills section. The experience bullets prove Node.js, React,
            and CI/CD — but not platform ownership or on-call work.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Keyword match says
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900">Good coverage — keep tailoring</p>
              <p className="mt-2 text-sm text-slate-700">
                Add missing terms to raise the score. The primary action is insertion.
              </p>
            </div>
            <div className="rounded-xl border border-sky-200 bg-sky-50/50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-800">
                Job fit says
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900">Apply with caution</p>
              <p className="mt-2 text-sm text-slate-700">
                AWS and Kubernetes are not proven in bullets. A recruiter may pass despite a strong match
                rate. Fix what you can honestly prove before you apply.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-slate-50/70 p-5">
          <InterviewClusterNav currentPath={ATS_SCORE_VS_JOB_FIT_PATH} />
        </section>

        <section id="faq">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">FAQ</h2>
          <div className="mt-6 space-y-3">
            {ATS_SCORE_VS_JOB_FIT_FAQ.map((item) => (
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
            Check apply-readiness, not just keyword match
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-300">
            Paste your resume and a job description. Application Verdict, rejection risks, keyword
            coverage, and recommended fixes in one free scan.
          </p>
          <Link
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="mt-5 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            {COMPETITOR_COMPARISON_CTA}
          </Link>
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
