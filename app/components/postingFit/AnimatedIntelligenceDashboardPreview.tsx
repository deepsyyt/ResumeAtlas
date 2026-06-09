"use client";

import { HeroDashboardPreview } from "@/app/components/postingFit/HeroDashboardPreview";
import { TypewriterStatus } from "@/app/components/postingFit/TypewriterStatus";

type Props = {
  hint?: string;
  isAnalyzing?: boolean;
};

/**
 * Tool-page empty preview — full sample dashboard with intro typewriter above the demo.
 */
export function AnimatedIntelligenceDashboardPreview({ hint, isAnalyzing = false }: Props) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="relative flex min-h-0 flex-1 flex-col px-3 py-3 sm:px-4 sm:py-4">
        <div className="relative z-10 mb-3 shrink-0 text-center">
          <div
            className="analysis-preview-glow pointer-events-none absolute left-1/2 top-1/2 h-24 w-[min(100%,24rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-500/25 via-violet-500/20 to-cyan-500/25 blur-2xl"
            aria-hidden
          />
          <div className="analysis-preview-intro-banner relative mx-auto max-w-xl rounded-xl border border-white/10 bg-white/[0.07] px-3 py-2.5 backdrop-blur-sm sm:px-5 sm:py-3">
            <TypewriterStatus isAnalyzing={isAnalyzing} darkSurface />
            {!isAnalyzing ? (
              <span className="mt-2.5 flex items-center justify-center gap-1.5" aria-hidden>
                <span className="analysis-preview-dot h-2 w-2 rounded-full bg-indigo-400" />
                <span className="analysis-preview-dot h-2 w-2 rounded-full bg-violet-400" />
                <span className="analysis-preview-dot h-2 w-2 rounded-full bg-cyan-400" />
              </span>
            ) : null}
          </div>
        </div>

        <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
          <div
            className={`flex min-h-0 flex-1 flex-col transition duration-500 ${
              isAnalyzing ? "scale-[1.01] opacity-100" : "opacity-[0.95]"
            }`}
          >
            <HeroDashboardPreview variant="tool" />
          </div>

          <div
            className="generating-scan-line pointer-events-none absolute inset-x-0 top-12 bottom-10 overflow-hidden rounded-2xl"
            aria-hidden
          />
          {isAnalyzing ? (
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-indigo-400/[0.06] ring-1 ring-inset ring-indigo-400/25" />
          ) : null}
        </div>
      </div>

      {hint ? (
        <p className="border-t border-slate-700/60 bg-slate-900/40 px-3 py-2.5 text-center text-[11px] leading-snug text-slate-400 sm:px-4">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
