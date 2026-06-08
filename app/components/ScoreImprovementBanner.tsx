"use client";

import { EVIDENCE_MATCH_SUBTITLE, EVIDENCE_MATCH_TITLE } from "@/app/lib/evidenceMetricCopy";

export type ScoreImprovementBannerProps = {
  scoreBefore: number;
  scoreAfter: number;
  evidenceMatchDelta?: number;
  bulletsRefined?: number;
  keywordsSurfaced?: number;
};

export function ScoreImprovementBanner({
  scoreBefore,
  scoreAfter,
  evidenceMatchDelta,
  bulletsRefined = 0,
  keywordsSurfaced = 0,
}: ScoreImprovementBannerProps) {
  const safeBefore = Number.isFinite(scoreBefore) ? Math.max(0, Math.min(100, scoreBefore)) : 0;
  const safeAfter = Number.isFinite(scoreAfter) ? Math.max(0, Math.min(100, scoreAfter)) : 0;
  const delta = evidenceMatchDelta ?? safeAfter - safeBefore;
  const improved = delta > 0;

  return (
    <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-4 sm:p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
        {improved
          ? `${EVIDENCE_MATCH_TITLE} improved`
          : delta < 0
            ? `${EVIDENCE_MATCH_TITLE} decreased`
            : `${EVIDENCE_MATCH_TITLE} held steady`}
      </p>
      <div className="mt-3 flex flex-wrap items-baseline gap-2">
        <span className="text-2xl font-bold text-slate-700">{safeBefore}%</span>
        <span className="text-slate-400" aria-hidden>→</span>
        <span className="text-2xl font-bold text-emerald-700">{safeAfter}%</span>
        <span className="text-sm font-medium text-slate-600">{EVIDENCE_MATCH_TITLE}</span>
      </div>
      <p className="mt-1 text-xs text-slate-600 leading-snug">{EVIDENCE_MATCH_SUBTITLE}</p>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-700">
        <li>
          {delta >= 0 ? `+${delta}` : `${delta}`} points — more JD requirements proven in bullets
        </li>
        {bulletsRefined > 0 ? <li>{bulletsRefined} bullets strengthened with proof</li> : null}
        {keywordsSurfaced > 0 ? <li>{keywordsSurfaced} skills evidenced in projects</li> : null}
      </ul>
    </div>
  );
}
