"use client";

export type ScoreImprovementBannerProps = {
  scoreBefore: number;
  scoreAfter: number;
  keywordsAdded: number;
  quantifiedAchievements: number;
  bulletImprovements: number;
};

export function ScoreImprovementBanner({
  scoreBefore,
  scoreAfter,
  keywordsAdded,
  quantifiedAchievements,
  bulletImprovements,
}: ScoreImprovementBannerProps) {
  const safeBefore = Number.isFinite(scoreBefore) ? Math.max(0, Math.min(100, scoreBefore)) : 0;
  const safeAfter = Number.isFinite(scoreAfter) ? Math.max(0, Math.min(100, scoreAfter)) : 0;
  const delta = safeAfter - safeBefore;
  const improved = delta > 0;

  return (
    <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-4 sm:p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
        {improved ? "Your ATS score improved" : delta < 0 ? "Your ATS score decreased" : "Your ATS score stayed the same"}
      </p>
      <div className="mt-3 flex flex-wrap items-baseline gap-2">
        <span className="text-2xl font-bold text-slate-700">{safeBefore}</span>
        <span className="text-slate-400" aria-hidden>→</span>
        <span className="text-2xl font-bold text-emerald-700">{safeAfter}</span>
        <span className="text-sm font-medium text-slate-600">ATS Score</span>
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-700">
        <li>
          {delta >= 0 ? `+${delta}` : `${delta}`} overall score change
        </li>
        <li>+{keywordsAdded} keywords added</li>
        <li>+{quantifiedAchievements} quantified achievements</li>
        <li>+{bulletImprovements} bullet improvements</li>
      </ul>
    </div>
  );
}
