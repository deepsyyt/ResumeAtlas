import Link from "next/link";
import {
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  CHECK_RESUME_AGAINST_JD_PATH,
} from "@/app/lib/internalLinks";
import {
  postingFitFaqJsonLd,
  postingFitWebApplicationJsonLd,
  postingFitWorkbenchBreadcrumbJsonLd,
} from "@/app/lib/postingFitJsonLd";
import { JD_MATCH_WORKBENCH_FAQ } from "@/app/lib/jdMatchWorkbenchFaqs";
import { TOOL_CLUSTER_PRIMARY } from "@/app/lib/toolClusterPages";

/**
 * SEO-critical SSR hero for posting-fit workbench. Commercial intent above the fold.
 */
export function PostingFitSsrShell() {
  const jsonLd = [
    postingFitWorkbenchBreadcrumbJsonLd(),
    postingFitWebApplicationJsonLd(TOOL_CLUSTER_PRIMARY),
    postingFitFaqJsonLd(JD_MATCH_WORKBENCH_FAQ),
  ];

  return (
    <>
      {jsonLd.map((obj, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger -- JSON-LD
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
        />
      ))}

      <section className="border-b border-slate-200 bg-white" id="posting-fit-diagnosis">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 text-center sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-widest text-sky-800">
            Free resume match score · compare resume to job description
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Match your resume to a job description — free match score &amp; keyword scanner
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-700 sm:text-lg max-w-3xl">
            Paste your resume and the exact job posting. Get your resume match score, missing
            keywords, skill gaps, and AI tailoring suggestions for that job description—no signup.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center sm:justify-start">
            <a
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition"
              data-analytics-event="posting_fit_tier_s_cta_clicked"
              data-analytics-location="ssr_shell_hero"
            >
              Check my resume against this job (free)
            </a>
            <Link
              href="/ats-resume-checker"
              className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition"
            >
              ATS formatting check
            </Link>
          </div>
          <p className="mt-4 text-xs sm:text-sm text-slate-500">
            Canonical URL:{" "}
            <span className="font-mono text-[11px]">{CHECK_RESUME_AGAINST_JD_PATH}</span>
          </p>
        </div>
      </section>
    </>
  );
}
