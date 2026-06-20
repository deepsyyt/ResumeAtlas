"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export const PREVIEW_IDLE_MESSAGE = "See your analysis instantly";
export const PREVIEW_ANALYZING_MESSAGE = "Generating your report";

type Props = {
  isAnalyzing?: boolean;
  className?: string;
  darkSurface?: boolean;
  compact?: boolean;
};

export function TypewriterStatus({
  isAnalyzing = false,
  className = "",
  darkSurface = false,
  compact = false,
}: Props) {
  const reduceMotion = useReducedMotion();
  const fullText = isAnalyzing ? PREVIEW_ANALYZING_MESSAGE : PREVIEW_IDLE_MESSAGE;
  const [visibleChars, setVisibleChars] = useState(reduceMotion ? fullText.length : 0);

  useEffect(() => {
    if (reduceMotion) {
      setVisibleChars(fullText.length);
      return;
    }
    setVisibleChars(0);
  }, [fullText, reduceMotion]);

  useEffect(() => {
    if (reduceMotion || visibleChars >= fullText.length) return;
    const id = window.setTimeout(() => setVisibleChars((n) => n + 1), isAnalyzing ? 28 : 32);
    return () => window.clearTimeout(id);
  }, [visibleChars, fullText.length, isAnalyzing, reduceMotion]);

  const showCursor = visibleChars < fullText.length || isAnalyzing;

  const textClass = darkSurface
    ? "analysis-preview-intro-prominent"
    : isAnalyzing
      ? "analysis-preview-empty-title"
      : "text-indigo-800";

  return (
    <p
      className={`tracking-[-0.02em] ${
        darkSurface
          ? compact
            ? "text-xs font-bold leading-snug sm:text-sm"
            : "text-base font-bold leading-snug sm:text-lg"
          : "text-sm font-semibold sm:text-base"
      } ${className}`}
      aria-live="polite"
    >
      <span className={textClass}>
        {fullText.slice(0, visibleChars)}
      </span>
      {showCursor ? (
        <span
          className={`typewriter-cursor font-normal ${
            darkSurface ? "text-cyan-300 drop-shadow-[0_0_8px_rgba(103,232,249,0.8)]" : "text-indigo-500"
          }`}
          aria-hidden
        >
          |
        </span>
      ) : null}
      <span className="sr-only">{fullText}</span>
    </p>
  );
}
