"use client";

import { useReducedMotion } from "framer-motion";
import { EvidenceIntelligenceSection } from "@/app/components/EvidenceIntelligenceSection";
import { WorkbenchDashboardPreviewShell } from "@/app/components/postingFit/WorkbenchDashboardPreviewShell";
import { PREVIEW_ANALYZING_MESSAGE } from "@/app/components/postingFit/TypewriterStatus";
import type { DashboardContentData } from "@/app/lib/dashboardContentData";
import type { RecommendedFix } from "@/app/lib/recommendedFixes";

export type DashboardContentProps = {
  data: DashboardContentData;
  /** Workbench: dark shell + full grid. Hero: cropped marketing preview. */
  variant?: "workbench" | "hero";
  isAnalyzing?: boolean;
  hint?: string;
  hideFooter?: boolean;
  hideShell?: boolean;
  selectedRecommendedFixes?: RecommendedFix[];
  onSelectedRecommendedFixesChange?: (fixes: RecommendedFix[]) => void;
  onOptimize?: () => void;
  optimizeDisabled?: boolean;
  optimizeBusy?: boolean;
};

function DashboardBadge({ isDemo }: { isDemo: boolean }) {
  if (isDemo) {
    return (
      <span className="inline-flex shrink-0 items-center rounded-full bg-slate-800 px-2.5 py-0.5 text-[10px] font-medium text-white">
        Sample
      </span>
    );
  }

  return (
    <span className="intelligence-result-badge inline-flex shrink-0 items-center rounded-full">
      Your result
    </span>
  );
}

function DashboardHeader({ isDemo, heroLayout }: { isDemo: boolean; heroLayout?: boolean }) {
  if (heroLayout) {
    return (
      <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
        <div className="flex min-w-0 items-baseline gap-1.5">
          <h2 className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Intelligence
          </h2>
          <p className="hidden text-[11px] text-slate-600 sm:inline sm:text-xs">
            Resume vs job description
          </p>
        </div>
        <DashboardBadge isDemo={isDemo} />
      </div>
    );
  }

  return (
    <div className="flex shrink-0 flex-wrap items-center justify-between gap-x-3 gap-y-1 px-5 py-4 sm:px-6 border-b border-slate-100/80">
      <div className="flex min-w-0 flex-col gap-0.5">
        <h2 className="intelligence-panel-title">Intelligence</h2>
        <p className="intelligence-panel-subtitle truncate">
          Application verdict, elimination risks, and recommended fixes
        </p>
      </div>
      <DashboardBadge isDemo={isDemo} />
    </div>
  );
}

function DashboardIntelligenceBody({
  data,
  previewDepth,
  selectedRecommendedFixes,
  onSelectedRecommendedFixesChange,
  onOptimize,
  optimizeDisabled,
  optimizeBusy,
}: Pick<
  DashboardContentProps,
  | "data"
  | "selectedRecommendedFixes"
  | "onSelectedRecommendedFixesChange"
  | "onOptimize"
  | "optimizeDisabled"
  | "optimizeBusy"
> & { previewDepth: "hero" | "full" }) {
  return (
    <EvidenceIntelligenceSection
      dashboard={data.dashboard}
      keywordCoverage={data.keywordCoverage}
      isDemo={data.isDemo}
      takeawayHeadline={data.takeawayHeadline}
      bulletPreview={data.isDemo ? undefined : data.bulletPreview}
      shareReport={data.isDemo ? undefined : data.shareReport}
      previewDepth={previewDepth}
      previewCompact={false}
      selectedRecommendedFixes={data.isDemo ? undefined : selectedRecommendedFixes}
      onSelectedRecommendedFixesChange={data.isDemo ? undefined : onSelectedRecommendedFixesChange}
      onOptimize={data.isDemo ? undefined : onOptimize}
      optimizeDisabled={optimizeDisabled}
      optimizeBusy={optimizeBusy}
    />
  );
}

/**
 * Unified results dashboard — same layout for demo and live; only `data` changes.
 */
export function DashboardContent({
  data,
  variant = "workbench",
  isAnalyzing = false,
  hint,
  hideFooter = false,
  hideShell = false,
  selectedRecommendedFixes,
  onSelectedRecommendedFixesChange,
  onOptimize,
  optimizeDisabled = false,
  optimizeBusy = false,
}: DashboardContentProps) {
  const reduceMotion = useReducedMotion();
  const isHero = variant === "hero";
  const analyzingLabel = `${PREVIEW_ANALYZING_MESSAGE}…`;
  const previewDepth = isHero ? "hero" : "full";

  const intelligenceBody = (
    <DashboardIntelligenceBody
      data={data}
      previewDepth={previewDepth}
      selectedRecommendedFixes={selectedRecommendedFixes}
      onSelectedRecommendedFixesChange={onSelectedRecommendedFixesChange}
      onOptimize={onOptimize}
      optimizeDisabled={optimizeDisabled}
      optimizeBusy={optimizeBusy}
    />
  );

  const workbenchCard = (
    <div className="ref-dash-main-inner">{intelligenceBody}</div>
  );

  const dashboardBody = (
    <div
      className={`relative w-full transition duration-300 ${
        isAnalyzing ? "min-h-[12rem] flex-1" : ""
      } ${
        isAnalyzing
          ? reduceMotion
            ? "pointer-events-none opacity-40"
            : "pointer-events-none scale-[0.985] opacity-40 blur-[2px]"
          : ""
      }`}
      aria-hidden={isAnalyzing && isHero ? true : undefined}
    >
      {isHero ? (
        <div className="relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none">
          <div className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-sky-200/25 via-transparent to-indigo-200/15 blur-2xl" />
          <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white ring-1 ring-slate-900/[0.04] shadow-[0_24px_60px_-22px_rgba(15,23,42,0.22)]">
            <div className="pointer-events-none max-h-[22rem] overflow-hidden sm:max-h-[24rem] lg:max-h-[26rem]">
              <section className="bg-white p-3 sm:p-3.5">
                <DashboardHeader isDemo={data.isDemo} heroLayout />
                {intelligenceBody}
              </section>
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-7 h-16 bg-gradient-to-t from-white via-white/90 to-transparent" />
            {!hideFooter ? (
              <p className="relative shrink-0 border-t border-slate-100 bg-white px-3 py-2 text-center text-[10px] leading-snug text-slate-500">
                Sample readout, same layout as live. Your scores appear after you paste resume and
                job description.
              </p>
            ) : null}
          </div>
        </div>
      ) : (
        workbenchCard
      )}

      {isAnalyzing ? (
        <div
          className="preview-analyzing-overlay absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-2xl px-4"
          role="status"
          aria-live="polite"
          aria-label={analyzingLabel}
        >
          <div
            className="preview-analyzing-spinner h-9 w-9 animate-spin rounded-full border-2 border-cyan-200/25 border-t-cyan-300"
            aria-hidden
          />
          <p className="text-center text-sm font-semibold text-white">{analyzingLabel}</p>
        </div>
      ) : null}
    </div>
  );

  const shellContent = (
    <div
      className={`relative flex w-full min-w-0 flex-col pb-1 transition duration-500 ${
        isAnalyzing ? "preview-mockup--analyzing min-h-full flex-1" : isHero ? "" : "opacity-[0.94]"
      }`}
    >
      {dashboardBody}
      {!isHero && data.isDemo && !isAnalyzing && !hint ? (
        <p className="mt-2 shrink-0 text-center text-[9px] leading-snug text-slate-400 sm:text-[10px]">
          Sample readout, same layout as your live report. Run a check for your scores.
        </p>
      ) : null}
    </div>
  );

  if (hideShell || isHero) {
    return (
      <section
        className={`mx-auto flex w-full min-w-0 flex-1 flex-col pb-2 sm:pb-3 ${
          isAnalyzing ? "h-full min-h-full" : ""
        }`}
        aria-label={data.isDemo ? "Sample analysis report" : "Your analysis report"}
        {...(isHero && data.isDemo ? { "aria-hidden": true } : {})}
      >
        <div className={`flex w-full flex-col ${isAnalyzing ? "min-h-0 flex-1" : ""}`}>
          {shellContent}
        </div>
      </section>
    );
  }

  return (
    <section className="w-full" aria-label={data.isDemo ? "Sample analysis report" : "Your analysis report"}>
      <WorkbenchDashboardPreviewShell>{shellContent}</WorkbenchDashboardPreviewShell>
    </section>
  );
}
