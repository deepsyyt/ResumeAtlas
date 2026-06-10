import Link from "next/link";
import {
  postingFitWebApplicationJsonLd,
  postingFitWorkbenchBreadcrumbJsonLd,
} from "@/app/lib/postingFitJsonLd";
import { CHECK_RESUME_AGAINST_JD_FORM_HREF } from "@/app/lib/internalLinks";
import { TOOL_CLUSTER_PRIMARY } from "@/app/lib/toolClusterPages";
import { HeroDashboardPreview } from "@/app/components/postingFit/HeroDashboardPreview";

/**
 * SEO-critical SSR hero for posting-fit workbench. Commercial intent above the fold.
 */
export function PostingFitSsrShell() {
  const jsonLd = [
    postingFitWorkbenchBreadcrumbJsonLd(),
    postingFitWebApplicationJsonLd(TOOL_CLUSTER_PRIMARY),
  ];

  const eyebrow = TOOL_CLUSTER_PRIMARY.heroEyebrow ?? "Free resume checker";
  const headline = TOOL_CLUSTER_PRIMARY.heroH1 ?? TOOL_CLUSTER_PRIMARY.h1;
  const intro = TOOL_CLUSTER_PRIMARY.heroIntro ?? TOOL_CLUSTER_PRIMARY.intro;

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

      <section
        className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-sky-50/90 via-white to-white"
        id="posting-fit-diagnosis"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_-15%,rgba(56,189,248,0.14),transparent)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-8 sm:px-6 sm:pb-10 sm:pt-9 lg:px-8 lg:pb-10 lg:pt-10">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10 xl:gap-12">
            <div className="text-center lg:py-1 lg:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-800">
                {eyebrow}
              </p>
              <h1 className="mt-1.5 text-pretty text-3xl font-semibold tracking-tight text-slate-900 sm:mt-2 sm:text-4xl sm:leading-[1.15] lg:text-[2.65rem]">
                {headline}
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg lg:mx-0">
                {intro}
              </p>

              <ul className="mx-auto mt-6 hidden max-w-md space-y-2 text-left text-sm text-slate-700 lg:mx-0 lg:block">
                {[
                  "Job description match score (Evidence Match)",
                  "Skill-by-skill proof map and topic coverage",
                  "Optimize thin bullets without inventing experience",
                ].map((line) => (
                  <li key={line} className="flex gap-2 leading-snug">
                    <span className="mt-0.5 font-semibold text-emerald-600" aria-hidden>
                      ✓
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col items-center gap-3.5 sm:mt-8 lg:items-start">
                <Link
                  href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
                  className="inline-flex min-w-[min(100%,18rem)] items-center justify-center rounded-2xl bg-slate-900 px-8 py-3.5 text-base font-semibold text-white shadow-[0_14px_40px_-14px_rgba(15,23,42,0.55)] transition hover:bg-slate-800"
                >
                  Check my resume for this job (free)
                </Link>
                <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm font-medium text-slate-600 lg:justify-start">
                  <span>
                    <span aria-hidden="true">✓</span> Free
                  </span>
                  <span className="text-slate-300" aria-hidden>
                    ·
                  </span>
                  <span>
                    <span aria-hidden="true">✓</span> Instant results
                  </span>
                  <span className="text-slate-300" aria-hidden>
                    ·
                  </span>
                  <span>
                    <span aria-hidden="true">✓</span> No signup
                  </span>
                </p>
                <p className="text-xs font-medium text-slate-500">
                  Paste-only · No file upload · Your data stays yours
                </p>
              </div>
            </div>

            <div className="mx-auto w-full max-w-lg lg:mx-0 lg:flex lg:justify-end">
              <div className="w-full lg:max-w-[30rem] xl:max-w-[32rem]">
                <HeroDashboardPreview />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
