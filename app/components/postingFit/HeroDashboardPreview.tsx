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

type HeroDashboardPreviewProps = {
  /** `hero`: marketing slice. `tool`: through topic coverage (no scroll). `full`: entire dashboard. */
  variant?: "hero" | "tool" | "full";
};

/**
 * Demo intelligence dashboard — hero slice or full metrics (matches live workbench readout).
 */
export function HeroDashboardPreview({ variant = "hero" }: HeroDashboardPreviewProps) {
  const isTool = variant === "tool";
  const isFull = variant === "full";
  const previewDepth = variant === "hero" ? "hero" : variant === "tool" ? "topics" : "full";
  const demoExpStyle = getExperienceAlignmentStyle(
    DEMO_REQUIRED_YEARS,
    DEMO_REQUIRED_YEARS_MAX,
    DEMO_RESUME_YEARS,
    DEMO_EXP
  );

  return (
    <div
      className={`relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none ${
        isTool ? "flex min-h-0 flex-1 flex-col" : ""
      }`}
      {...(isFull || isTool ? {} : { "aria-hidden": true })}
    >
      <div
        className={
          isFull
            ? "pointer-events-none absolute -inset-2 rounded-[1.75rem] bg-indigo-400/10 blur-2xl"
            : "pointer-events-none absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-sky-200/25 via-transparent to-indigo-200/15 blur-2xl"
        }
      />
      <div
        className={`relative overflow-hidden rounded-2xl border bg-white ring-1 ring-slate-900/[0.04] ${
          isTool
            ? "flex min-h-0 flex-1 flex-col border-slate-200/90 shadow-xl shadow-black/30"
            : isFull
              ? "border-slate-200/90 shadow-xl shadow-black/30"
              : "border-slate-200/90 shadow-[0_24px_60px_-22px_rgba(15,23,42,0.22)]"
        }`}
      >
        <div
          className={
            isTool
              ? "min-h-0 flex-1 overflow-hidden"
              : isFull
                ? "max-h-[min(58vh,34rem)] overflow-y-auto overscroll-contain"
                : "pointer-events-none max-h-[22rem] overflow-hidden sm:max-h-[24rem] lg:max-h-[26rem]"
          }
        >
          <section className={`bg-white ${isTool ? "p-2.5 sm:p-3" : "p-3 sm:p-3.5"}`}>
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
              previewDepth={previewDepth}
            />
          </section>
        </div>

        {!isFull ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-7 h-16 bg-gradient-to-t from-white via-white/90 to-transparent" />
        ) : null}

        <p
          className={`relative shrink-0 border-t border-slate-100 bg-white text-center leading-snug text-slate-500 ${
            isTool ? "px-2.5 py-1.5 text-[9px]" : "px-3 py-2 text-[10px]"
          }`}
        >
          {isTool
            ? "Sample readout through topic coverage. Run a check for your live scores."
            : isFull
              ? "Sample readout with full metrics. Your live report replaces this after you run a check."
              : "Sample readout. Your scores appear after you paste resume and job description."}
        </p>
      </div>
    </div>
  );
}
