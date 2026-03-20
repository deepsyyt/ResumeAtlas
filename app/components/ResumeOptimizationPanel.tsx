"use client";

export type ResumeOptimizationPanelProps = {
  addedKeywords: string[];
  bulletImprovements: number;
  quantifiedAchievements: number;
  scoreBefore: number;
  scoreAfter: number;
  roleAlignmentScore?: number;
  matchedStrengthScore?: number;
  onDownloadPdf: () => void;
  onDownloadDocx: () => void;
};

function atsReadinessLabel(score: number): string {
  if (score >= 82) return "High";
  if (score >= 68) return "Strong";
  if (score >= 55) return "Good";
  return "Building";
}

export function ResumeOptimizationPanel({
  addedKeywords,
  bulletImprovements,
  quantifiedAchievements,
  scoreBefore,
  scoreAfter,
  roleAlignmentScore,
  matchedStrengthScore,
  onDownloadPdf,
  onDownloadDocx,
}: ResumeOptimizationPanelProps) {
  const kwCount = addedKeywords.length;
  const atsDelta = Math.max(0, scoreAfter - scoreBefore);
  const summaryTailored = scoreAfter > scoreBefore || bulletImprovements > 0;

  const improvementLines: { text: string; show: boolean }[] = [
    {
      text: `${kwCount} job-relevant keyword${kwCount === 1 ? "" : "s"} surfaced in your resume`,
      show: kwCount > 0,
    },
    {
      text: `${bulletImprovements} bullet${bulletImprovements === 1 ? "" : "s"} sharpened for clarity and scanning`,
      show: bulletImprovements > 0,
    },
    {
      text: `${quantifiedAchievements} achievement${quantifiedAchievements === 1 ? "" : "s"} with clearer impact metrics`,
      show: quantifiedAchievements > 0,
    },
    {
      text: "ATS-friendly structure and formatting applied",
      show: true,
    },
    {
      text: "Professional summary aligned to this job where supported by your experience",
      show: summaryTailored,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* 1 — CTA (above readiness for download intent) */}
      <section className="rounded-xl border border-slate-900 bg-slate-900 p-3.5 text-white shadow-md">
        <h3 className="text-sm font-bold">Your resume is ready</h3>
        <p className="mt-1 text-xs text-slate-300 leading-snug">
          Download your optimized resume and give your application a stronger shot.
        </p>
        <div className="mt-3 flex flex-col gap-1.5 sm:flex-row">
          <button
            type="button"
            onClick={onDownloadPdf}
            className="inline-flex flex-1 items-center justify-center rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-900 shadow-sm hover:bg-slate-100"
          >
            Download PDF
          </button>
          <button
            type="button"
            onClick={onDownloadDocx}
            className="inline-flex flex-1 items-center justify-center rounded-lg border border-white/30 bg-transparent px-3 py-2 text-xs font-semibold text-white hover:bg-white/10"
          >
            Download editable file
          </button>
        </div>
        <p className="mt-2 text-[10px] text-slate-400 leading-snug">
          <span className="text-slate-300">Best for job portals</span>
          {" · "}
          Editable version included (plain text)
        </p>
      </section>

      {/* 2 — Optimization summary (legend, metrics + alignment rows, keywords, truth-first, what improved) */}
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Optimization summary
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          This version is stronger, more targeted, formatted for ATS review, and fully tailored to
          this JD.
        </p>

        <div className="mt-3 flex flex-wrap gap-2 rounded-lg border border-slate-100 bg-slate-50 p-2.5">
          <span className="inline-flex items-center rounded-full bg-violet-100 px-2 py-0.5 text-[11px] font-semibold text-violet-800 ring-1 ring-violet-200">
            Rewritten bullets
          </span>
          <span className="inline-flex items-center rounded-full bg-sky-100 px-2 py-0.5 text-[11px] font-semibold text-sky-800 ring-1 ring-sky-200">
            Keywords added
          </span>
          <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-800 ring-1 ring-emerald-200">
            Quantified impact
          </span>
        </div>

        <div className="mt-3 grid grid-cols-1 items-stretch gap-2.5 sm:grid-cols-6 lg:grid-cols-12">
          <div className="isolate min-w-0 rounded-md border border-emerald-200 bg-emerald-50/70 p-3 sm:col-span-6 lg:col-span-12">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-800">
              ATS score
            </p>
            <p className="mt-1 text-lg font-bold text-emerald-900 tabular-nums">
              {scoreBefore} → {scoreAfter}
            </p>
            <p className="mt-0.5 text-[11px] text-emerald-800/80">
              {atsDelta > 0
                ? `+${atsDelta} overall score change`
                : "Score held steady"}
            </p>
          </div>
          <div className="isolate flex min-h-[5.5rem] min-w-0 flex-col items-center justify-center gap-2 rounded-md border border-violet-200 bg-violet-50/60 px-2.5 py-3 text-center sm:col-span-2 lg:col-span-4">
            <p className="w-full text-[10px] font-semibold uppercase leading-snug tracking-wide text-violet-800 break-words">
              Rewritten bullets
            </p>
            <p className="text-lg font-bold leading-none text-violet-900 tabular-nums">{bulletImprovements}</p>
          </div>
          <div className="isolate flex min-h-[5.5rem] min-w-0 flex-col items-center justify-center gap-2 rounded-md border border-sky-200 bg-sky-50/60 px-2.5 py-3 text-center sm:col-span-2 lg:col-span-4">
            <p className="w-full text-[10px] font-semibold uppercase leading-snug tracking-wide text-sky-800 break-words">
              Keywords added
            </p>
            <p className="text-lg font-bold leading-none text-sky-900 tabular-nums">{kwCount}</p>
          </div>
          <div className="isolate flex min-h-[5.5rem] min-w-0 flex-col items-center justify-center gap-2 rounded-md border border-emerald-200 bg-emerald-50/60 px-2.5 py-3 text-center sm:col-span-2 lg:col-span-4">
            <p className="w-full text-[10px] font-semibold uppercase leading-snug tracking-wide text-emerald-800 break-words">
              Quantified impacts
            </p>
            <p className="text-lg font-bold leading-none text-emerald-900 tabular-nums">
              {quantifiedAchievements}
            </p>
          </div>

          <dl className="col-span-1 grid grid-cols-1 gap-2.5 sm:col-span-6 sm:grid-cols-3 lg:col-span-12">
            <div className="isolate flex min-h-[5.5rem] min-w-0 flex-col items-center justify-center gap-2 rounded-md border border-slate-200 bg-slate-50/90 px-2.5 py-3 text-center">
              <dt className="w-full text-[10px] font-semibold uppercase leading-snug tracking-wide text-slate-500 break-words">
                ATS readiness
              </dt>
              <dd className="text-lg font-bold leading-none text-slate-900">{atsReadinessLabel(scoreAfter)}</dd>
            </div>
            {typeof roleAlignmentScore === "number" ? (
              <div className="isolate flex min-h-[5.5rem] min-w-0 flex-col items-center justify-center gap-2 rounded-md border border-slate-200 bg-slate-50/90 px-2.5 py-3 text-center">
                <dt className="w-full text-[10px] font-semibold uppercase leading-snug tracking-wide text-slate-500 break-words">
                  Job alignment
                </dt>
                <dd className="text-lg font-bold leading-none text-slate-900 tabular-nums">{roleAlignmentScore}%</dd>
              </div>
            ) : null}
            {typeof matchedStrengthScore === "number" ? (
              <div className="isolate flex min-h-[5.5rem] min-w-0 flex-col items-center justify-center gap-2 rounded-md border border-slate-200 bg-slate-50/90 px-2.5 py-3 text-center">
                <dt className="w-full text-[10px] font-semibold uppercase leading-snug tracking-wide text-slate-500 break-words">
                  Strengths preserved
                </dt>
                <dd className="text-lg font-bold leading-none text-slate-900 tabular-nums">{matchedStrengthScore}%</dd>
              </div>
            ) : null}
          </dl>
        </div>

        <div className="mt-3 space-y-0 border-t border-slate-100 pt-3">
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-wide text-slate-700">
              Keywords highlighted in optimized resume
            </h3>
            <div className="mt-2 flex flex-wrap content-start gap-x-1.5 gap-y-1.5">
              {addedKeywords.length === 0 ? (
                <p className="text-sm leading-snug text-slate-500">
                  None this pass — your wording already covered the key terms.
                </p>
              ) : (
                addedKeywords.map((kw) => (
                  <span
                    key={kw}
                    className="inline-flex max-w-full break-words rounded-md bg-sky-50 px-2 py-1 text-[11px] font-semibold leading-snug text-sky-900 ring-1 ring-sky-200/80"
                  >
                    {kw}
                  </span>
                ))
              )}
            </div>
          </div>
          <div className="border-t border-slate-100 pt-3">
            <h3 className="text-[11px] font-semibold uppercase tracking-wide text-slate-700">
              Truth-first optimization
            </h3>
            <p className="mt-1.5 text-sm leading-snug text-slate-600">
              We only added skills and wording that fit what you already did. Some JD phrases were{" "}
              <span className="font-semibold text-slate-800">left out on purpose</span> so your resume
              stays honest and defensible in interviews.
            </p>
          </div>
        </div>

        <div className="mt-3 border-t border-slate-100 pt-3">
          <h3 className="text-[11px] font-semibold uppercase tracking-wide text-slate-700">
            What improved
          </h3>
          <ul className="mt-2 space-y-2">
            {improvementLines
              .filter((l) => l.show)
              .map((l) => (
                <li key={l.text} className="flex gap-2.5 text-sm leading-snug text-slate-700">
                  <span className="mt-px shrink-0 font-semibold text-emerald-600" aria-hidden>
                    ✓
                  </span>
                  <span className="min-w-0">{l.text}</span>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
