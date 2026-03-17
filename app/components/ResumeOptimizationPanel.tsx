"use client";

export type ResumeOptimizationPanelProps = {
  addedKeywords: string[];
  bulletImprovements: number;
  quantifiedAchievements: number;
  onEditSection?: (section: string) => void;
  onRegenerateSection?: (section: string) => void;
  bulletChanges?: {
    original: string;
    improved: string;
    addedKeywords: string[];
    quantified: boolean;
  }[];
  onUpdateBullet?: (original: string, updated: string) => void;
};

const IMPROVEMENTS_APPLIED = [
  "Added missing keywords",
  "Rewrote weak bullet points",
  "Added quantified achievements",
  "Optimized ATS formatting",
];

const RESUME_SECTIONS = [
  { id: "summary", label: "Professional Summary" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
];

export function ResumeOptimizationPanel({
  addedKeywords,
  bulletImprovements,
  quantifiedAchievements,
  bulletChanges = [],
  onEditSection,
  onRegenerateSection,
  onUpdateBullet,
}: ResumeOptimizationPanelProps) {
  const keywordBullets = bulletChanges.filter((c) => c.addedKeywords.length > 0);
  const quantifiedBullets = bulletChanges.filter((c) => c.quantified);
  const improvedBullets = bulletChanges;

  return (
    <div className="flex flex-col gap-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* A. Improvements Applied */}
      <section>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Improvements applied
        </h3>
        <ul className="mt-2 space-y-1.5">
          {IMPROVEMENTS_APPLIED.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
              <span className="text-emerald-600" aria-hidden>✓</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* B. Keyword Insertions */}
      <section>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Keywords added from job description
        </h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {addedKeywords.length === 0 ? (
            <span className="text-sm text-slate-500">None</span>
          ) : (
            addedKeywords.map((kw) => (
              <span
                key={kw}
                className="inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800"
              >
                {kw}
              </span>
            ))
          )}
        </div>
      </section>

      {/* C. Bullet-level changes */}
      {improvedBullets.length > 0 && (
        <section>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Bullet-level improvements
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Showing exactly which bullets were improved, where keywords were added, and where
            quantified achievements were introduced.
          </p>
          <div className="mt-3 space-y-4 text-xs text-slate-700">
            {/* Keywords added section */}
            <div>
              <p className="font-semibold text-slate-800 mb-1">
                +{addedKeywords.length} keywords added
              </p>
              {keywordBullets.length === 0 ? (
                <p className="text-slate-500">No specific bullets received new keywords.</p>
              ) : (
                <ul className="space-y-2">
                  {keywordBullets.map((change, idx) => (
                    <li key={`kw-${idx}`}>
                      <div className="mb-0.5 flex flex-wrap gap-1.5">
                        {change.addedKeywords.map((kw) => (
                          <span
                            key={kw}
                            className="inline-flex items-center rounded-full bg-sky-50 px-2 py-0.5 text-[10px] font-medium text-sky-900 border border-sky-100"
                          >
                            + {kw}
                          </span>
                        ))}
                      </div>
                      <p className="text-[11px] text-slate-900">{change.improved}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Quantified achievements section */}
            <div>
              <p className="font-semibold text-slate-800 mb-1">
                +{quantifiedAchievements} quantified achievements
              </p>
              {quantifiedBullets.length === 0 ? (
                <p className="text-slate-500">
                  No bullets had new numeric impact metrics added.
                </p>
              ) : (
                <ul className="space-y-2">
                  {quantifiedBullets.map((change, idx) => (
                    <li key={`q-${idx}`}>
                      <p className="text-[11px] text-slate-900">{change.improved}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* All bullet improvements (editable) */}
            <div>
              <p className="font-semibold text-slate-800 mb-1">
                +{bulletImprovements} bullet improvements
              </p>
              <ul className="space-y-3">
                {improvedBullets.slice(0, 5).map((change, idx) => (
                  <li
                    key={`all-${idx}`}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
                  >
                    <p className="text-[11px] text-slate-500 line-through decoration-slate-300 mb-1">
                      {change.original}
                    </p>
                    <textarea
                      defaultValue={change.improved}
                      onBlur={(e) =>
                        onUpdateBullet?.(
                          change.improved,
                          e.target.value.trim() || change.improved
                        )
                      }
                      className="mt-0 w-full rounded border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400"
                      rows={2}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
