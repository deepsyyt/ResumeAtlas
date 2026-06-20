"use client";



import { EvidenceIntelligenceSection } from "@/app/components/EvidenceIntelligenceSection";

import {

  DEMO_ANALYZE_SUMMARY,

  DEMO_EVIDENCE_DASHBOARD,
  DEMO_KEYWORD_COVERAGE,
} from "@/app/lib/demoEvidenceDashboard";

type HeroDashboardPreviewProps = {

  /** `hero`: marketing crop. `tool`: workbench fill + scroll. `full`: legacy alias for tool scroll. */

  variant?: "hero" | "tool" | "full";

  /** Hide in-card footer when the parent shell already shows hint text. */

  hideFooter?: boolean;

};



/**

 * Demo intelligence dashboard — same section order as live; variant only controls viewport crop.

 */

export function HeroDashboardPreview({

  variant = "hero",

  hideFooter = false,

}: HeroDashboardPreviewProps) {

  const isHero = variant === "hero";

  const isWorkbench = variant === "tool" || variant === "full";

  return (

    <div
      className={
        isWorkbench
          ? "relative mx-auto w-full max-w-none"
          : "relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none"
      }
      {...(isHero ? { "aria-hidden": true } : {})}
    >

      <div

        className={

          isWorkbench

            ? "pointer-events-none absolute -inset-2 rounded-[1.75rem] bg-indigo-400/10 blur-2xl"

            : "pointer-events-none absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-sky-200/25 via-transparent to-indigo-200/15 blur-2xl"

        }

      />

      <div
        className={`relative rounded-2xl border bg-white ring-1 ring-slate-900/[0.04] ${
          isWorkbench
            ? "border-slate-300/90 shadow-xl shadow-black/30"
            : "overflow-hidden border-slate-200/90 shadow-[0_24px_60px_-22px_rgba(15,23,42,0.22)]"
        }`}
      >

        <div

          className={

            isWorkbench

              ? ""

              : "pointer-events-none max-h-[22rem] overflow-hidden sm:max-h-[24rem] lg:max-h-[26rem]"

          }

        >

          <section className={`bg-white ${isWorkbench ? "p-2 pb-3 sm:p-2.5 sm:pb-3.5" : "p-3 sm:p-3.5"}`}>

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

              isDemo

              keywordCoverage={DEMO_KEYWORD_COVERAGE}

              takeawayHeadline={DEMO_ANALYZE_SUMMARY}

              previewDepth={isWorkbench ? "toolScroll" : "hero"}
              previewCompact={false}

            />

          </section>

        </div>



        {isHero ? (

          <div className="pointer-events-none absolute inset-x-0 bottom-7 h-16 bg-gradient-to-t from-white via-white/90 to-transparent" />

        ) : null}



        {!hideFooter ? (

          <p

            className={`relative shrink-0 border-t border-slate-100 bg-white text-center leading-snug text-slate-500 ${

              isWorkbench ? "px-2.5 py-1.5 text-[9px]" : "px-3 py-2 text-[10px]"

            }`}

          >

            {isWorkbench

              ? "Sample readout, same layout as your live report. Run a check for your scores."

              : "Sample readout, same layout as live. Your scores appear after you paste resume and job description."}

          </p>

        ) : null}

      </div>

    </div>

  );

}

