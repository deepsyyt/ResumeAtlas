"use client";

import type { ReactNode } from "react";
import { getKeywordCoverageStyle } from "@/app/lib/scoreColors";
import { ScoreBar } from "@/app/components/EvidenceIntelligenceSection";

export type KeywordFrequencyRow = {
  term: string;
  resumeCount: number;
  postingCount: number;
};

export type KeywordScannerResultsData = {
  coverageScore: number;
  coverageDetail?: string;
  missingKeywords: string[];
  weakCoverageAreas: string[];
  keywordFrequency: KeywordFrequencyRow[];
  suggestedKeywords: string[];
};

type Props = {
  data: KeywordScannerResultsData;
  compact?: boolean;
};

function KeywordChip({
  label,
  tone,
}: {
  label: string;
  tone: "missing" | "weak" | "suggested" | "matched";
}) {
  const styles = {
    missing: { bg: "#FEF2F2", color: "#B91C1C", dot: "#EF4444" },
    weak: { bg: "#FFFBEB", color: "#B45309", dot: "#D97706" },
    suggested: { bg: "#EFF6FF", color: "#1D4ED8", dot: "#3B82F6" },
    matched: { bg: "#ECFDF5", color: "#15803D", dot: "#22C55E" },
  }[tone];

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium"
      style={{ backgroundColor: styles.bg, color: styles.color }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: styles.dot }} aria-hidden />
      {label}
    </span>
  );
}

function Section({
  title,
  children,
  compact,
}: {
  title: string;
  children: ReactNode;
  compact?: boolean;
}) {
  return (
    <div className={`rounded-xl border border-slate-200/90 bg-slate-50/70 ${compact ? "px-3 py-2.5" : "px-3 py-3 sm:px-4"}`}>
      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-600">{title}</p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

export function KeywordScannerResultsPanel({ data, compact = false }: Props) {
  const coverageStyle = getKeywordCoverageStyle(data.coverageScore);

  return (
    <div className={`space-y-2.5 ${compact ? "" : "sm:space-y-3"}`}>
      <div className={`rounded-xl border border-violet-200 bg-violet-50/70 ${compact ? "px-3 py-2.5" : "px-3 py-3 sm:px-4"}`}>
        <p className="text-[10px] font-semibold uppercase tracking-wide text-violet-900">
          Keyword coverage
        </p>
        <div className="mt-1.5 flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:gap-3">
          <span className="text-2xl font-bold tabular-nums text-slate-900 sm:text-3xl">
            {data.coverageScore}%
          </span>
          <div className="min-w-0 flex-1">
            <ScoreBar score={data.coverageScore} hex={coverageStyle.hex} />
            {data.coverageDetail ? (
              <p className="mt-1 text-[11px] leading-snug text-slate-600 sm:text-xs">
                {data.coverageDetail}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <Section title="Missing keywords" compact={compact}>
        {data.missingKeywords.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {data.missingKeywords.map((term) => (
              <KeywordChip key={term} label={term} tone="missing" />
            ))}
          </div>
        ) : (
          <p className="text-xs text-emerald-700">No major missing keywords detected for this posting.</p>
        )}
      </Section>

      <Section title="Weak coverage areas" compact={compact}>
        {data.weakCoverageAreas.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {data.weakCoverageAreas.map((term) => (
              <KeywordChip key={term} label={term} tone="weak" />
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-600">Matched terms appear with bullet-level proof.</p>
        )}
      </Section>

      {data.keywordFrequency.length > 0 ? (
        <Section title="Keyword frequency" compact={compact}>
          <ul className="space-y-1.5 text-xs text-slate-700">
            {data.keywordFrequency.map((row) => (
              <li key={row.term} className="flex items-center justify-between gap-3">
                <span className="font-medium text-slate-900">{row.term}</span>
                <span className="shrink-0 tabular-nums text-slate-500">
                  {row.resumeCount} in resume · {row.postingCount} in posting
                </span>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section title="Suggested keywords" compact={compact}>
        {data.suggestedKeywords.length > 0 ? (
          <>
            <div className="flex flex-wrap gap-2">
              {data.suggestedKeywords.map((term) => (
                <KeywordChip key={term} label={term} tone="suggested" />
              ))}
            </div>
            <p className="mt-2 text-[11px] leading-snug text-slate-500">
              Add only where your experience supports the term.
            </p>
          </>
        ) : (
          <p className="text-xs text-slate-600">No additional keyword suggestions for this scan.</p>
        )}
      </Section>
    </div>
  );
}
