"use client";

import {
  analyzeMatchLevelLabel,
  splitAnalyzeMatchSummarySections,
  type AnalyzeMatchLevel,
} from "@/app/lib/resumeTypography";

type AnalyzeMatchSummaryInsightProps = {
  summary: string;
  compact?: boolean;
};

const MATCH_LEVEL_CLASS: Record<AnalyzeMatchLevel, string> = {
  strong: "analyze-match-level--strong",
  weak: "analyze-match-level--weak",
  no_match: "analyze-match-level--none",
};

function SummaryRow({
  label,
  value,
  compact,
}: {
  label: string;
  value: string;
  compact?: boolean;
}) {
  return (
    <p className={`leading-snug text-slate-800 ${compact ? "text-[11px]" : "text-xs"}`}>
      <span className="font-semibold text-slate-900">{label}</span> {value}
    </p>
  );
}

export function AnalyzeMatchSummaryInsight({ summary, compact = false }: AnalyzeMatchSummaryInsightProps) {
  const parts = splitAnalyzeMatchSummarySections(summary);
  const hasStructured = Boolean(parts.jdNeeds || parts.resumeShows || parts.match);

  if (!hasStructured) {
    return (
      <p className={`leading-snug text-slate-900 ${compact ? "text-[11px]" : "text-xs"}`}>{summary}</p>
    );
  }

  const rowGap = compact ? "space-y-0.5" : "space-y-1";

  return (
    <div className={rowGap}>
      {parts.jdNeeds ? <SummaryRow label="JD needs:" value={parts.jdNeeds} compact={compact} /> : null}
      {parts.resumeShows ? (
        <SummaryRow label="Resume shows:" value={parts.resumeShows} compact={compact} />
      ) : null}
      {parts.match ? (
        <p className={`flex flex-wrap items-center gap-1.5 leading-snug ${compact ? "text-[11px]" : "text-xs"}`}>
          <span className="font-semibold text-slate-900">Match:</span>
          <span
            className={`analyze-match-level inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${MATCH_LEVEL_CLASS[parts.match]}`}
          >
            {analyzeMatchLevelLabel(parts.match)}
          </span>
        </p>
      ) : null}
    </div>
  );
}
