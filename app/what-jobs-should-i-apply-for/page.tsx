import type { Metadata } from "next";
import Link from "next/link";
import { LastUpdated } from "@/app/components/LastUpdated";
import { InterviewClusterNav } from "@/app/components/interviewCluster/InterviewClusterNav";
import { ATS_SCORE_VS_JOB_FIT_PATH } from "@/app/lib/interviewCluster/paths";
import { RESUME_NOT_GETTING_INTERVIEWS_PATH } from "@/app/lib/interviewCluster/paths";
import { CHECK_RESUME_AGAINST_JD_FORM_HREF } from "@/app/lib/internalLinks";
import { absoluteCanonicalUrl } from "@/app/lib/searchIntentSeo";
import { getSiteUrl } from "@/app/lib/siteUrl";
import {
  ROLE_FIT_FRAMEWORK_SIGNALS,
  ROLE_TRANSITION_EXAMPLES,
  WHAT_JOBS_SHOULD_I_APPLY_FOR_FAQ,
  WHAT_JOBS_SHOULD_I_APPLY_FOR_H1,
  WHAT_JOBS_SHOULD_I_APPLY_FOR_HERO_CTA,
  WHAT_JOBS_SHOULD_I_APPLY_FOR_LAST_UPDATED,
  WHAT_JOBS_SHOULD_I_APPLY_FOR_META,
  WHAT_JOBS_SHOULD_I_APPLY_FOR_PATH,
  WHAT_JOBS_SHOULD_I_APPLY_FOR_SUBHEAD,
  WHAT_JOBS_SHOULD_I_APPLY_FOR_TITLE,
  WRONG_ROLE_EXAMPLE,
} from "@/app/lib/whatJobsShouldIApplyForContent";

export const metadata: Metadata = {
  title: WHAT_JOBS_SHOULD_I_APPLY_FOR_TITLE,
  description: WHAT_JOBS_SHOULD_I_APPLY_FOR_META,
  alternates: {
    canonical: WHAT_JOBS_SHOULD_I_APPLY_FOR_PATH,
  },
  openGraph: {
    title: WHAT_JOBS_SHOULD_I_APPLY_FOR_TITLE,
    description: WHAT_JOBS_SHOULD_I_APPLY_FOR_META,
    url: absoluteCanonicalUrl(WHAT_JOBS_SHOULD_I_APPLY_FOR_PATH),
    siteName: "ResumeAtlas",
    type: "article",
  },
  robots: { index: true, follow: true },
};

function FitBadge({ fit }: { fit: "strong" | "weak" }) {
  if (fit === "strong") {
    return (
      <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-800">
        <span aria-hidden>✓</span> Strong fit
      </span>
    );
  }
  return (
    <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-rose-200 bg-rose-50 px-2 py-0.5 text-xs font-semibold text-rose-800">
      <span aria-hidden>✗</span> Weak fit
    </span>
  );
}

export default function WhatJobsShouldIApplyForPage() {
  const canonicalBase = getSiteUrl().replace(/\/$/, "");
  const pageUrl = absoluteCanonicalUrl(WHAT_JOBS_SHOULD_I_APPLY_FOR_PATH);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: WHAT_JOBS_SHOULD_I_APPLY_FOR_FAQ.map((item) => ({
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
      { "@type": "ListItem", position: 3, name: WHAT_JOBS_SHOULD_I_APPLY_FOR_H1, item: pageUrl },
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
            <span className="text-slate-600">{WHAT_JOBS_SHOULD_I_APPLY_FOR_H1}</span>
          </nav>

          <p className="text-xs font-semibold uppercase tracking-wide text-sky-800">
            Role fit · Apply-readiness · Qualified roles
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {WHAT_JOBS_SHOULD_I_APPLY_FOR_H1}
          </h1>
          <p className="mt-2 text-lg font-medium text-slate-700">{WHAT_JOBS_SHOULD_I_APPLY_FOR_SUBHEAD}</p>
          <LastUpdated
            className="mt-3 text-xs text-slate-500"
            label={WHAT_JOBS_SHOULD_I_APPLY_FOR_LAST_UPDATED}
            noteOnly
          />

          <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-800 sm:text-lg">
            Compare your resume against a target job description and discover better-fit roles. ResumeAtlas
            shows whether you&apos;re getting rejected because your resume needs work — or because you&apos;re
            applying for the wrong level and title.
          </p>

          <Link
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="mt-8 inline-flex rounded-xl bg-slate-900 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-slate-800"
          >
            {WHAT_JOBS_SHOULD_I_APPLY_FOR_HERO_CTA}
          </Link>
        </div>
      </section>

      <div className="page-prose-wide space-y-12 py-10 sm:py-14">
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            You may be applying for the wrong role
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700 sm:text-base">
            Job seekers ask whether rejections mean a weak resume or a weak target. Often it is both — but
            the second problem is invisible until you compare fit across titles, not just keywords.
          </p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Example</p>
              <p className="mt-1 text-sm text-slate-700">
                Candidate applies for:{" "}
                <span className="font-semibold text-slate-900">{WRONG_ROLE_EXAMPLE.appliedFor}</span>
              </p>
            </div>
            <div className="px-5 py-4">
              <p className="text-sm font-medium text-slate-800">ResumeAtlas found:</p>
              <ul className="mt-3 space-y-3">
                {WRONG_ROLE_EXAMPLE.findings.map((row) => (
                  <li
                    key={row.role}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3"
                  >
                    <span className="font-semibold text-slate-900">{row.role}</span>
                    <FitBadge fit={row.fit} />
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                You are actually a stronger fit for{" "}
                <strong className="font-semibold text-slate-800">Platform Product Manager</strong> than{" "}
                <strong className="font-semibold text-slate-800">Head of Product</strong>. That is a
                targeting insight — not something an ATS score alone will tell you.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            How ResumeAtlas determines role fit
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700 sm:text-base">
            When you paste a resume and job description, the dashboard scores evidence against that posting
            — then surfaces related roles you may also qualify for. These signals drive the verdict:
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
                    Why it matters for role fit
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROLE_FIT_FRAMEWORK_SIGNALS.map((row) => (
                  <tr key={row.signal} className="border-b border-slate-100 last:border-0">
                    <th scope="row" className="px-4 py-3 font-medium text-slate-800 align-top">
                      {row.signal}
                    </th>
                    <td className="px-4 py-3 text-slate-700 align-top">{row.whatItMeasures}</td>
                    <td className="px-4 py-3 text-slate-700 align-top">{row.whyItMatters}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-700 sm:text-base">
            The dashboard also shows an application verdict, elimination risks, and selectable recommended
            fixes — so you can strengthen proof for a role you still want, or pivot to a better-fit title.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Example role transitions
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700 sm:text-base">
            The same resume can be competitive for adjacent titles recruiters bucket differently. Role fit
            surfaces those parallels from your evidence — not from generic job-board suggestions.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {ROLE_TRANSITION_EXAMPLES.map((example) => (
              <div
                key={example.sourceRole}
                className="rounded-xl border border-slate-200 bg-slate-50/70 p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {example.sourceRole}
                </p>
                <p className="mt-2 text-sm font-medium text-slate-800">Could also fit:</p>
                <ul className="mt-2 space-y-1.5">
                  {example.alsoFit.map((role) => (
                    <li key={role} className="text-sm text-slate-700">
                      {role}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Why ATS scores don&apos;t answer this
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700 sm:text-base">
            Most resume checkers optimize for keyword match and ATS compatibility. Jobscan, Resume Worded,
            and Teal fight over resume score and ATS checker SERPs. ResumeAtlas answers a different question:{" "}
            <em>which jobs should you actually apply for?</em>
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">ATS score says</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">Keywords exist — keep tailoring</p>
              <p className="mt-2 text-sm text-slate-700">
                Term overlap and parseability. Useful, but blind to seniority, scope, and proof depth.
              </p>
            </div>
            <div className="rounded-xl border border-sky-200 bg-sky-50/50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-800">Role fit says</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                Your evidence matches this level
              </p>
              <p className="mt-2 text-sm text-slate-700">
                Whether your experience actually supports the responsibilities of the role — and which
                adjacent titles are a stronger bet.
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-700">
            Read more:{" "}
            <Link
              href={ATS_SCORE_VS_JOB_FIT_PATH}
              className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
            >
              ATS score vs real job fit
            </Link>
          </p>
        </section>

        <section className="rounded-xl border border-slate-200 bg-slate-50/70 p-5">
          <InterviewClusterNav currentPath={WHAT_JOBS_SHOULD_I_APPLY_FOR_PATH} />
        </section>

        <section id="faq">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">FAQ</h2>
          <div className="mt-6 space-y-3">
            {WHAT_JOBS_SHOULD_I_APPLY_FOR_FAQ.map((item) => (
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
            Find roles you&apos;re competitive for — before you apply
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-300">
            Paste your resume and a job description. Role fit for the target title, related roles you may
            qualify for, skill proof, and elimination risks — one free scan.
          </p>
          <Link
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="mt-5 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            {WHAT_JOBS_SHOULD_I_APPLY_FOR_HERO_CTA}
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
