"use client";

import { EvidenceIntelligenceSection } from "@/app/components/EvidenceIntelligenceSection";
import { DEMO_EVIDENCE_DASHBOARD } from "@/app/lib/demoEvidenceDashboard";
import { buildExperienceAlignmentSubtitle } from "@/app/lib/experienceCopy";
import { getExperienceAlignmentStyle } from "@/app/lib/scoreColors";

const DEMO_ATS = 78;
const DEMO_EXP = 90;
const DEMO_REQUIRED_YEARS = 10;
const DEMO_REQUIRED_YEARS_MAX = 15;
const DEMO_RESUME_YEARS = 12;

/**
 * Homepage hero preview — representative demo dashboard slice, height-matched to hero copy.
 */
export function HeroDashboardPreview() {
  const demoExpStyle = getExperienceAlignmentStyle(
    DEMO_REQUIRED_YEARS,
    DEMO_REQUIRED_YEARS_MAX,
    DEMO_RESUME_YEARS,
    DEMO_EXP
  );

  return (
    <div className="relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none" aria-hidden>
      <div className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-sky-200/25 via-transparent to-indigo-200/15 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_24px_60px_-22px_rgba(15,23,42,0.22)] ring-1 ring-slate-900/[0.04]">
        <div className="pointer-events-none max-h-[22rem] overflow-hidden sm:max-h-[24rem] lg:max-h-[26rem]">
          <section className="bg-white p-3 sm:p-3.5">
            <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
              <div className="flex min-w-0 items-baseline gap-1.5">
                <h2 className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Intelligence
                </h2>
                <p className="hidden text-[11px] text-slate-600 sm:inline sm:text-xs">
                  Resume vs job description
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center rounded-full bg-slate-800 px-2.5 py-0.5 text-[10px] font-medium text-white">
                Sample
              </span>
            </div>

            <EvidenceIntelligenceSection
              dashboard={DEMO_EVIDENCE_DASHBOARD}
              atsScoreReference={DEMO_ATS}
              experienceAlignment={{
                score: DEMO_EXP,
                subtitle: buildExperienceAlignmentSubtitle({
                  requiredMin: DEMO_REQUIRED_YEARS,
                  requiredMax: DEMO_REQUIRED_YEARS_MAX,
                  resumeYears: DEMO_RESUME_YEARS,
                  verdictLabel: demoExpStyle.style.label,
                }),
              }}
              isDemo
              heroPreview
            />
          </section>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-7 h-16 bg-gradient-to-t from-white via-white/90 to-transparent" />

        <p className="relative border-t border-slate-100 bg-white px-3 py-2 text-center text-[10px] leading-snug text-slate-500">
          Sample dashboard. Your scores appear after you run a check.
        </p>
      </div>
    </div>
  );
}
