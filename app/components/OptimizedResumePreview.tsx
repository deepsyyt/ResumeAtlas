"use client";

import React from "react";

export type OptimizedResumePreviewProps = {
  content: string;
  addedKeywords?: string[];
  className?: string;
};

/** Highlight added keywords in the resume text with a subtle background. */
function highlightKeywordsInText(text: string, keywords: string[]): React.ReactNode {
  if (!keywords || keywords.length === 0) return text;
  const escaped = keywords
    .filter((k) => k.trim().length > 0)
    .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .sort((a, b) => b.length - a.length);
  if (escaped.length === 0) return text;
  const re = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(re);
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
