"use client";

import { StructuredResume } from "@/app/components/StructuredResume";
import {
  DEMO_OPTIMIZED_RESUME,
  DEMO_OPTIMIZED_RESUME_HIGHLIGHTS,
} from "@/app/lib/demoOptimizedResumePreview";

/**
 * Workbench hero preview — sample optimized resume output, height-matched to intelligence dashboard hero.
 */
export function HeroOptimizedResumePreview() {
  const h = DEMO_OPTIMIZED_RESUME_HIGHLIGHTS;

  return (
    <div className="relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none" aria-hidden>
      <div className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-violet-200/20 via-transparent to-sky-200/15 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_24px_60px_-22px_rgba(15,23,42,0.22)] ring-1 ring-slate-900/[0.04]">
        <div className="pointer-events-none max-h-[22rem] overflow-hidden sm:max-h-[24rem] lg:max-h-[26rem]">
          <section className="bg-white p-3 sm:p-3.5">
            <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
              <div className="flex min-w-0 items-baseline gap-1.5">
                <h2 className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Optimized resume
                </h2>
                <p className="hidden text-[11px] text-slate-600 sm:inline sm:text-xs">
                  Matched to job description
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center rounded-full bg-slate-800 px-2.5 py-0.5 text-[10px] font-medium text-white">
                Sample
              </span>
            </div>

            <p className="mt-2 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-center text-xs font-bold uppercase tracking-[0.12em] text-emerald-900 sm:text-sm sm:tracking-[0.14em]">
              ATS-friendly · ready to apply
            </p>

            <ul className="mt-2 flex flex-wrap gap-1.5 print:hidden">
              {[
                { label: "Summary updated", className: "border-indigo-200 bg-indigo-50 text-indigo-800" },
                { label: "Bullet rewritten", className: "border-violet-200 bg-violet-50 text-violet-800" },
                { label: "Skill → proof", className: "border-amber-200 bg-amber-50 text-amber-900" },
              ].map((chip) => (
                <li
                  key={chip.label}
                  className={`rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide ${chip.className}`}
                >
                  {chip.label}
                </li>
              ))}
            </ul>

            <div className="mt-2.5 rounded-lg border border-slate-100 bg-slate-50/40 p-2.5 sm:p-3 [&_button]:hidden [&_textarea]:pointer-events-none">
              <StructuredResume
                resume={DEMO_OPTIMIZED_RESUME}
                highlightKeywords={[...h.keywords]}
                quantifiedBullets={[...h.quantified]}
                highlightedBullets={[...h.rewritten]}
                keywordBullets={[...h.keywordBullets]}
                newBullets={[...h.newBullets]}
                highlightOptimizedSummary
                showJdAlignedSummaryBadge
              />
            </div>
          </section>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-7 h-16 bg-gradient-to-t from-white via-white/90 to-transparent" />

        <p className="relative border-t border-slate-100 bg-white px-3 py-2 text-center text-[10px] leading-snug text-slate-500">
          ATS-friendly sample. Yours appears after you compare resume to job description and optimize.
        </p>
      </div>
    </div>
  );
}
