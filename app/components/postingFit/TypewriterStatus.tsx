"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const IDLE_MESSAGE = "Your analysis report will appear like below";
const ANALYZING_MESSAGE = "Generating your analysis report";

type Props = {
  isAnalyzing?: boolean;
  className?: string;
  darkSurface?: boolean;
};

export function TypewriterStatus({
  isAnalyzing = false,
  className = "",
  darkSurface = false,
}: Props) {
  const reduceMotion = useReducedMotion();
  const fullText = isAnalyzing ? ANALYZING_MESSAGE : IDLE_MESSAGE;
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
          ? "text-lg font-bold leading-snug sm:text-xl lg:text-[1.375rem]"
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
