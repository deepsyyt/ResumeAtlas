"use client";

import { TypewriterStatus } from "@/app/components/postingFit/TypewriterStatus";

type Props = {
  isAnalyzing?: boolean;
  darkSurface?: boolean;
};

/** Compact empty-state strip above the sample dashboard in the tool preview column. */
export function AnalysisPreviewIntroBanner({
  isAnalyzing = false,
  darkSurface = true,
}: Props) {
  return (
    <div className="relative z-10 shrink-0 text-center">
      <div
        className={`analysis-preview-intro-banner relative mx-auto inline-flex max-w-md items-center justify-center rounded-lg border px-3 py-1.5 backdrop-blur-sm sm:px-3.5 ${
          darkSurface
            ? "border-white/10 bg-white/[0.07]"
            : "border-indigo-200/80 bg-gradient-to-br from-indigo-50/95 via-white to-violet-50/50"
        }`}
      >
        <TypewriterStatus isAnalyzing={isAnalyzing} darkSurface={darkSurface} compact />
      </div>
    </div>
  );
}
