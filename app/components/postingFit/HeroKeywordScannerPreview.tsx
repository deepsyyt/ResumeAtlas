"use client";

import { KeywordScannerResultsPanel } from "@/app/components/KeywordScannerResultsPanel";
import { DEMO_KEYWORD_SCANNER_RESULTS } from "@/app/lib/demoKeywordScannerPreview";

type HeroKeywordScannerPreviewProps = {
  variant?: "tool";
};

/**
 * Keyword-only demo for `/resume-keyword-scanner` — no evidence match or seniority metrics.
 */
export function HeroKeywordScannerPreview({ variant = "tool" }: HeroKeywordScannerPreviewProps) {
  const isTool = variant === "tool";

  return (
    <div
      className={`relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none ${
        isTool ? "flex min-h-0 flex-1 flex-col" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden rounded-2xl border bg-white ring-1 ring-slate-900/[0.04] ${
          isTool
            ? "flex min-h-0 flex-1 flex-col border-slate-200/90 shadow-xl shadow-black/30"
            : "border-slate-200/90 shadow-[0_24px_60px_-22px_rgba(15,23,42,0.22)]"
        }`}
      >
        <div className={isTool ? "min-h-0 flex-1 overflow-hidden" : "max-h-[26rem] overflow-hidden"}>
          <section className={`bg-white ${isTool ? "p-2.5 sm:p-3" : "p-3 sm:p-3.5"}`}>
            <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
              <div className="flex min-w-0 items-baseline gap-1.5">
                <h2 className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Keyword scan
                </h2>
                <p className="hidden text-[11px] text-slate-600 sm:inline sm:text-xs">
                  Gaps vs this job posting
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center rounded-full bg-slate-800 px-2.5 py-0.5 text-[10px] font-medium text-white">
                Sample
              </span>
            </div>

            <div className="mt-2">
              <KeywordScannerResultsPanel data={DEMO_KEYWORD_SCANNER_RESULTS} compact />
            </div>
          </section>
        </div>

        <p
          className={`relative shrink-0 border-t border-slate-100 bg-white text-center leading-snug text-slate-500 ${
            isTool ? "px-2.5 py-1.5 text-[9px]" : "px-3 py-2 text-[10px]"
          }`}
        >
          Sample keyword gap readout. Run a scan for your resume and posting.
        </p>
      </div>
    </div>
  );
}
