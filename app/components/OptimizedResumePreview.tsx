"use client";

import React from "react";
import { splitTextByStrictHighlights } from "@/app/lib/resumeTermMatch";

export type OptimizedResumePreviewProps = {
  content: string;
  addedKeywords?: string[];
  className?: string;
};

/** Highlight added keywords in the resume text with a subtle background. */
function highlightKeywordsInText(text: string, keywords: string[]): React.ReactNode {
  if (!keywords || keywords.length === 0) return text;
  const parts = splitTextByStrictHighlights(text, keywords, { includePercents: false });
  if (parts.length === 1) return text;
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark
            key={i}
            className="rounded bg-amber-200/80 px-0.5 font-medium text-amber-900"
          >
            {part}
          </mark>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
}

export function OptimizedResumePreview({
  content,
  addedKeywords = [],
  className = "",
}: OptimizedResumePreviewProps) {
  const hasKeywords = addedKeywords.length > 0;
  return (
    <div
      className={`rounded-xl border border-slate-200 bg-white p-6 font-serif text-slate-800 shadow-sm ${className}`}
    >
      <div className="resume-preview whitespace-pre-wrap text-sm leading-relaxed">
        {hasKeywords ? highlightKeywordsInText(content, addedKeywords) : content}
      </div>
    </div>
  );
}
