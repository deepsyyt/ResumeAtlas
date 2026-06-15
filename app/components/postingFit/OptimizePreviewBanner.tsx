"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export const OPTIMIZE_PREVIEW_MESSAGE = "Optimize your resume for this job role";
export { ANALYSIS_REPORT_HEADING } from "@/app/lib/evidenceMetricCopy";

type Props = {
  onOptimize?: () => void;
  /** Stacked on the dark tool preview column. */
  darkSurface?: boolean;
  /** Compact row inside the Intelligence scroll panel. */
  inline?: boolean;
  message?: string;
  /** When false, hides the optimize CTA even if onOptimize is set. */
  showCta?: boolean;
  /** Re-run typewriter when a new analysis lands. */
  resetKey?: string | number;
};

export function OptimizePreviewBanner({
  onOptimize,
  darkSurface = false,
  inline = false,
  message = OPTIMIZE_PREVIEW_MESSAGE,
  showCta,
  resetKey = "idle",
}: Props) {
  const reduceMotion = useReducedMotion();
  const fullText = message;
  const [visibleChars, setVisibleChars] = useState(reduceMotion ? fullText.length : 0);
  const ctaVisible = (showCta ?? Boolean(onOptimize)) && onOptimize != null;

  useEffect(() => {
    if (reduceMotion) {
      setVisibleChars(fullText.length);
      return;
    }
    setVisibleChars(0);
  }, [fullText, reduceMotion, resetKey]);

  useEffect(() => {
    if (reduceMotion || visibleChars >= fullText.length) return;
    const id = window.setTimeout(() => setVisibleChars((n) => n + 1), 30);
    return () => window.clearTimeout(id);
  }, [visibleChars, fullText.length, reduceMotion]);

  const showCursor = visibleChars < fullText.length;

  if (inline) {
    return (
      <div
        className="rounded-lg border border-indigo-200/70 bg-gradient-to-r from-indigo-50/90 via-white to-violet-50/40 px-2.5 py-2"
        aria-label={fullText}
      >
        <p className="text-[11px] font-semibold leading-snug text-indigo-950 sm:text-xs" aria-live="polite">
          <span className="text-indigo-900">{fullText.slice(0, visibleChars)}</span>
          {showCursor ? (
            <span className="typewriter-cursor font-normal text-indigo-500" aria-hidden>
              |
            </span>
          ) : null}
          <span className="sr-only">{fullText}</span>
        </p>
      </div>
    );
  }

  return (
    <div className="relative z-10 shrink-0 text-center">
      <div
        className="analysis-preview-glow pointer-events-none absolute left-1/2 top-1/2 h-20 w-[min(100%,22rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-500/30 via-violet-500/25 to-cyan-500/25 blur-2xl"
        aria-hidden
      />
      <div
        className={`analysis-preview-intro-banner relative mx-auto max-w-xl rounded-xl border px-3 py-2.5 backdrop-blur-sm sm:px-5 sm:py-3 ${
          darkSurface
            ? "border-white/10 bg-white/[0.07]"
            : "border-indigo-200/80 bg-gradient-to-br from-indigo-50/95 via-white to-violet-50/50"
        }`}
      >
        <p
          className={`tracking-[-0.02em] ${
            darkSurface
              ? "text-base font-bold leading-snug sm:text-lg lg:text-xl"
              : "text-sm font-semibold sm:text-base"
          }`}
          aria-live="polite"
        >
          <span className={darkSurface ? "analysis-preview-intro-prominent" : "text-indigo-800"}>
            {fullText.slice(0, visibleChars)}
          </span>
          {showCursor ? (
            <span
              className={`typewriter-cursor font-normal ${
                darkSurface
                  ? "text-cyan-300 drop-shadow-[0_0_8px_rgba(103,232,249,0.8)]"
                  : "text-indigo-500"
              }`}
              aria-hidden
            >
              |
            </span>
          ) : null}
          <span className="sr-only">{fullText}</span>
        </p>

        {ctaVisible ? (
          <button
            type="button"
            onClick={onOptimize}
            className="mt-3 inline-flex w-full max-w-xs items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-900/25 transition hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 sm:w-auto sm:min-w-[220px]"
          >
            Optimize for this job
          </button>
        ) : null}
      </div>
    </div>
  );
}
