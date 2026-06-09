"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const OPTIMIZE_MESSAGE = "Optimize your resume for this job role";

type Props = {
  onOptimize?: () => void;
  /** Stacked on the dark tool preview column. */
  darkSurface?: boolean;
  /** Re-run typewriter when a new analysis lands. */
  resetKey?: string | number;
};

export function OptimizePreviewBanner({
  onOptimize,
  darkSurface = false,
  resetKey = "idle",
}: Props) {
  const reduceMotion = useReducedMotion();
  const fullText = OPTIMIZE_MESSAGE;
  const [visibleChars, setVisibleChars] = useState(reduceMotion ? fullText.length : 0);

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

        {onOptimize ? (
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
