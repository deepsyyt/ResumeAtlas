import type { Metadata } from "next";
import Link from "next/link";
import { LastUpdated } from "@/app/components/LastUpdated";
import { InterviewClusterNav } from "@/app/components/interviewCluster/InterviewClusterNav";
import {
  ATS_SCORE_VS_JOB_FIT_PATH,
  RESUME_NOT_GETTING_INTERVIEWS_PATH,
  SKILLS_LISTED_NOT_PROVEN_PATH,
  WHAT_JOBS_SHOULD_I_APPLY_FOR_PATH,
} from "@/app/lib/interviewCluster/paths";
import { CHECK_RESUME_AGAINST_JD_FORM_HREF } from "@/app/lib/internalLinks";
import { absoluteCanonicalUrl } from "@/app/lib/searchIntentSeo";
import { getSiteUrl } from "@/app/lib/siteUrl";
import {
  APPLY_READINESS_METRICS,
  HIGH_ATS_SCORE_EXAMPLE,
  HIGH_ATS_SCORE_NO_INTERVIEWS_FAQ,
  HIGH_ATS_SCORE_NO_INTERVIEWS_H1,
  HIGH_ATS_SCORE_NO_INTERVIEWS_HERO_CTA,
  HIGH_ATS_SCORE_NO_INTERVIEWS_LAST_UPDATED,
  HIGH_ATS_SCORE_NO_INTERVIEWS_META,
  HIGH_ATS_SCORE_NO_INTERVIEWS_PATH,
  HIGH_ATS_SCORE_NO_INTERVIEWS_SUBHEAD,
  HIGH_ATS_SCORE_NO_INTERVIEWS_TITLE,
  HIGH_SCORE_REJECTION_REASONS,
} from "@/app/lib/whyAtsScoreHighButNoInterviewsContent";

export const metadata: Metadata = {
  title: HIGH_ATS_SCORE_NO_INTERVIEWS_TITLE,
  description: HIGH_ATS_SCORE_NO_INTERVIEWS_META,
  alternates: {
    canonical: HIGH_ATS_SCORE_NO_INTERVIEWS_PATH,
  },
  openGraph: {
    title: HIGH_ATS_SCORE_NO_INTERVIEWS_TITLE,
    description: HIGH_ATS_SCORE_NO_INTERVIEWS_META,
    url: absoluteCanonicalUrl(HIGH_ATS_SCORE_NO_INTERVIEWS_PATH),
    siteName: "ResumeAtlas",
    type: "article",
  },
  robots: { index: true, follow: true },
};

export default function WhyAtsScoreHighButNoInterviewsPage() {
  const canonicalBase = getSiteUrl().replace(/\/$/, "");
  const pageUrl = absoluteCanonicalUrl(HIGH_ATS_SCORE_NO_INTERVIEWS_PATH);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HIGH_ATS_SCORE_NO_INTERVIEWS_FAQ.map((item) => ({
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
      { "@type": "ListItem", position: 3, name: HIGH_ATS_SCORE_NO_INTERVIEWS_H1, item: pageUrl },
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
            <span className="text-slate-600">{HIGH_ATS_SCORE_NO_INTERVIEWS_H1}</span>
          </nav>

          <p className="text-xs font-semibold uppercase tracking-wide text-sky-800">
            High ATS score · No interviews · Apply-readiness
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {HIGH_ATS_SCORE_NO_INTERVIEWS_H1}
          </h1>
          <p className="mt-2 text-lg font-medium text-slate-700">{HIGH_ATS_SCORE_NO_INTERVIEWS_SUBHEAD}</p>
          <LastUpdated
            className="mt-3 text-xs text-slate-500"
            label={HIGH_ATS_SCORE_NO_INTERVIEWS_LAST_UPDATED}
            noteOnly
          />

          <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-800 sm:text-lg">
            You ran your resume through a keyword scanner. The score looks great. Applications go out —
            and silence comes back. The gap is not always your resume quality. Often it is what ATS
            scores cannot measure: proof, scope, seniority, and role fit.
          </p>

          <div className="mt-8 flex max-w-2xl flex-col items-stretch gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <p className="text-sm font-medium text-slate-500">What the score does not show</p>
              <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {HIGH_ATS_SCORE_EXAMPLE.keywordMatch} match{" "}
                <span className="text-rose-600">≠</span> interviews
              </p>
            </div>
          </div>

          <Link
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="mt-8 inline-flex rounded-xl bg-slate-900 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-slate-800"
          >
            {HIGH_ATS_SCORE_NO_INTERVIEWS_HERO_CTA}
          </Link>
        </div>
      </section>

      <div className="page-prose-wide space-y-12 py-10 sm:py-14">
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Why a high ATS score does not mean interviews
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700 sm:text-base">
            Keyword tools reward term presence. Recruiters reward evidence. When those diverge, you get
            a high match rate and no callbacks — and no clear answer from the score alone.
          </p>
          <div className="mt-6 grid gap-4">
            {HIGH_SCORE_REJECTION_REASONS.map((reason) => (
              <div
                key={reason.title}
                className="rounded-xl border border-slate-200 bg-slate-50/70 p-5"
              >
                <h3 className="text-base font-semibold text-slate-900">{reason.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{reason.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Example: {HIGH_ATS_SCORE_EXAMPLE.keywordMatch} keyword match, still not ready
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700 sm:text-base">
            A software engineer resume matches {HIGH_ATS_SCORE_EXAMPLE.keywordMatch} of a senior
            platform role&apos;s keywords. Kubernetes, AWS, and observability appear in the skills section.
            Experience bullets prove Node.js and CI/CD — not platform ownership or on-call work.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                ATS score says
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {HIGH_ATS_SCORE_EXAMPLE.atsSays}
              </p>
            </div>
            <div className="rounded-xl border border-sky-200 bg-sky-50/50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-800">
                Apply-readiness says
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {HIGH_ATS_SCORE_EXAMPLE.readinessSays}
              </p>
              <p className="mt-2 text-sm text-slate-700">
                Shortlist odds: {HIGH_ATS_SCORE_EXAMPLE.shortlistOdds}
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            What to check instead of the ATS score
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700 sm:text-base">
            ResumeAtlas is built around apply-readiness — metrics that answer whether you should submit
            for this posting, not just whether keywords appear:
          </p>
          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-[640px] w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
                    Metric
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
                    What it shows
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
                    vs ATS score alone
                  </th>
                </tr>
              </thead>
              <tbody>
                {APPLY_READINESS_METRICS.map((row) => (
                  <tr key={row.metric} className="border-b border-slate-100 last:border-0">
                    <th scope="row" className="px-4 py-3 font-medium text-slate-800 align-top">
                      {row.metric}
                    </th>
                    <td className="px-4 py-3 text-slate-700 align-top">{row.whatItShows}</td>
                    <td className="px-4 py-3 text-slate-700 align-top">{row.vsAts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-700 sm:text-base">
            You still get keyword coverage and ATS signals — they are inputs on the dashboard, not the
            final decision.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Related guides
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-700 sm:text-base">
            <li>
              <Link
                href={ATS_SCORE_VS_JOB_FIT_PATH}
                className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                ATS score vs real job fit
              </Link>
              {" — "}why keyword match is not interview readiness
            </li>
            <li>
              <Link
                href={SKILLS_LISTED_NOT_PROVEN_PATH}
                className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                Skills listed but not proven
              </Link>
              {" — "}when requirements appear in your skills section but not in bullets
            </li>
            <li>
              <Link
                href={WHAT_JOBS_SHOULD_I_APPLY_FOR_PATH}
                className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                What jobs should I apply for
              </Link>
              {" — "}role fit and better-fit titles when targeting is off
            </li>
          </ul>
        </section>

        <section className="rounded-xl border border-slate-200 bg-slate-50/70 p-5">
          <InterviewClusterNav currentPath={HIGH_ATS_SCORE_NO_INTERVIEWS_PATH} />
        </section>

        <section id="faq">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">FAQ</h2>
          <div className="mt-6 space-y-3">
            {HIGH_ATS_SCORE_NO_INTERVIEWS_FAQ.map((item) => (
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
            Go beyond the ATS score for this posting
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-300">
            Paste your resume and job description. Application verdict, shortlist odds, role fit, skill
            proof, and elimination risks — one free scan.
          </p>
          <Link
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="mt-5 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            {HIGH_ATS_SCORE_NO_INTERVIEWS_HERO_CTA}
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
