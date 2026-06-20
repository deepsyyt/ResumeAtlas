"use client";

import { useReducedMotion } from "framer-motion";
import { HeroDashboardPreview } from "@/app/components/postingFit/HeroDashboardPreview";
import { HeroKeywordScannerPreview } from "@/app/components/postingFit/HeroKeywordScannerPreview";
import { PREVIEW_ANALYZING_MESSAGE } from "@/app/components/postingFit/TypewriterStatus";

type Props = {
  hint?: string;
  isAnalyzing?: boolean;
  previewVariant?: "fullDashboard" | "keywordScanner";
};

/**
 * Tool-page empty preview — sample dashboard at ~85% zoom, up to 44rem wide.
 */
export function AnimatedIntelligenceDashboardPreview({
  hint,
  isAnalyzing = false,
  previewVariant = "fullDashboard",
}: Props) {
  const reduceMotion = useReducedMotion();
  const analyzingLabel =
    previewVariant === "keywordScanner"
      ? "Scanning for keyword gaps…"
      : `${PREVIEW_ANALYZING_MESSAGE}…`;

  return (
    <div
      className={`workbench-preview-mockup relative flex w-full min-w-0 flex-col pb-1 transition duration-500 ${
        isAnalyzing ? "preview-mockup--analyzing min-h-full flex-1" : "opacity-[0.94]"
      }`}
    >
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
        aria-hidden={isAnalyzing}
      >
        {previewVariant === "keywordScanner" ? (
          <HeroKeywordScannerPreview variant="tool" />
        ) : (
          <HeroDashboardPreview variant="tool" hideFooter />
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

      {hint && !isAnalyzing ? (
        <p className="mt-2 shrink-0 rounded-lg border border-slate-700/50 bg-slate-900/50 px-2.5 py-2 text-center text-[10px] leading-snug text-slate-400 sm:px-3">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
