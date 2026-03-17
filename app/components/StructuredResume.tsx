"use client";

import type { ParsedResume } from "@/app/lib/resumeParser";
import React from "react";

type StructuredResumeProps = {
  resume: ParsedResume;
  highlightKeywords?: string[];
  /** Bullet texts that should have numeric metrics highlighted (quantified achievements). */
  quantifiedBullets?: string[];
};

function highlightKeywordsOnly(
  text: string,
  keywords: string[] | undefined
): React.ReactNode[] {
  let basePieces: React.ReactNode[] = [text];
  if (keywords && keywords.length > 0) {
    const escaped = keywords
      .filter((k) => k.trim().length > 0)
      .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .sort((a, b) => b.length - a.length);
    if (!escaped.length) return basePieces;
    const re = new RegExp(`(${escaped.join("|")})`, "gi");
    const parts = text.split(re);
    basePieces = parts.map((part, i) =>
      i % 2 === 1 ? (
        <mark
          key={`kw-${i}`}
          className="rounded bg-sky-100 px-0.5 font-medium text-sky-900"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  }
  return basePieces;
}

function highlightMetrics(
  nodes: React.ReactNode[]
): React.ReactNode {
  const out: React.ReactNode[] = [];
  const metricRe = /(\d[\d.,]*(?:\s*[%+xX]?)?)/g;

  nodes.forEach((node, idx) => {
    if (typeof node !== "string") {
      out.push(<React.Fragment key={`n-${idx}`}>{node}</React.Fragment>);
      return;
    }
    const parts = node.split(metricRe);
    parts.forEach((part, j) => {
      const key = `m-${idx}-${j}`;
      if (j % 2 === 1 && part.trim().length > 0) {
        out.push(
          <mark
            key={key}
            className="rounded bg-emerald-50 px-0.5 font-semibold text-emerald-800"
          >
            {part}
          </mark>
        );
      } else if (part) {
        out.push(<React.Fragment key={key}>{part}</React.Fragment>);
      }
    });
  });

  return <>{out}</>;
}

export function StructuredResume({
  resume,
  highlightKeywords,
  quantifiedBullets,
}: StructuredResumeProps) {
  const { headerLines, summary, skills, experience, education } = resume;

  return (
    <div className="h-full overflow-auto rounded-2xl border border-slate-200 bg-white shadow-sm p-8 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 pb-4 mb-4">
        {headerLines.length > 0 ? (
          <>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              {headerLines[0]}
            </h1>
            {headerLines.slice(1).map((line, i) => (
              <p key={i} className="text-xs text-slate-600 mt-0.5">
                {line}
              </p>
            ))}
          </>
        ) : (
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Resume</h1>
        )}
      </header>

      {/* Summary */}
      {summary && (
        <section className="border-t border-slate-100 pt-4 mt-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1.5">
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed text-slate-700">
            {highlightKeywordsOnly(summary, highlightKeywords).map((node, i) => (
              <React.Fragment key={i}>{node}</React.Fragment>
            ))}
          </p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="border-t border-slate-100 pt-4 mt-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
            Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline gap-2 flex-wrap">
                  <p className="font-semibold text-sm text-slate-900">
                    {exp.role || exp.company || "Experience"}
                  </p>
                  {exp.dates && (
                    <p className="text-xs text-slate-500 shrink-0">{exp.dates}</p>
                  )}
                </div>
                {exp.company && (
                  <p className="text-xs text-slate-600 mt-0.5">{exp.company}</p>
                )}
                {exp.bullets.length > 0 && (
                  <ul className="mt-2 list-disc pl-4 space-y-1 text-sm text-slate-700 leading-relaxed">
                    {exp.bullets.map((b, j) => (
                      <li key={j}>
                        {quantifiedBullets && quantifiedBullets.includes(b)
                          ? highlightMetrics(highlightKeywordsOnly(b, highlightKeywords))
                          : highlightKeywordsOnly(b, highlightKeywords).map((node, k) => (
                              <React.Fragment key={k}>{node}</React.Fragment>
                            ))}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="border-t border-slate-100 pt-4 mt-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
            Education
          </h2>
          <div className="space-y-2 text-sm text-slate-700">
            {education.map((edu, idx) => (
              <div key={idx}>
                {edu.degree && (
                  <p className="font-medium text-slate-900">{edu.degree}</p>
                )}
                <p className="text-xs text-slate-600">
                  {[edu.institution, edu.year].filter(Boolean).join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="border-t border-slate-100 pt-4 mt-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
            Skills
          </h2>
          <div className="flex flex-wrap gap-1.5 text-xs">
            {skills.map((s) => (
              <span
                key={s}
                className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-800"
              >
                {highlightKeywordsOnly(s, highlightKeywords).map((node, i) => (
                  <React.Fragment key={i}>{node}</React.Fragment>
                ))}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

