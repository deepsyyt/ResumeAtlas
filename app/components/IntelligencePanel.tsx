"use client";

import type { JDMatchResult } from "@/app/lib/jdMatch";
import type { ATSScanResult } from "@/app/lib/atsScan";

type IntelligencePanelProps = {
  jdMatch: JDMatchResult | null;
  atsResult: ATSScanResult | null;
  evidenceGaps: string[];
  showFullIntelligence?: boolean;
  showLocked?: boolean;
};

function BarColor(pct: number) {
  if (pct >= 75) return "bg-emerald-500";
  if (pct >= 50) return "bg-amber-500";
  return "bg-red-500";
}

export function IntelligencePanel({
  jdMatch,
  atsResult,
  evidenceGaps,
  showFullIntelligence = true,
  showLocked = false,
}: IntelligencePanelProps) {
  const hasAny = jdMatch !== null || atsResult !== null || evidenceGaps.length > 0;

  if (showLocked) {
    return (
      <div className="space-y-3">
        <div className="relative bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="absolute inset-0 rounded-2xl bg-slate-100/90 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="text-center p-4">
              <p className="text-sm font-medium text-slate-700">Upgrade to Pro to unlock deeper resume insights.</p>
              <a href="/upgrade" className="mt-3 inline-block rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition">
                Upgrade to Pro
              </a>
            </div>
          </div>
          <h3 className="text-sm font-semibold tracking-tight text-slate-500 uppercase tracking-widest mb-4">Intelligence</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 opacity-50">
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 h-24" />
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 h-24" />
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 h-24" />
          </div>
        </div>
      </div>
    );
  }

  if (!hasAny) {
    return (
      <div className="space-y-3">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-sm font-semibold tracking-tight text-slate-500 uppercase tracking-widest mb-4">
            Intelligence
          </h3>
          <p className="text-sm text-slate-400">
            Generate a resume to see JD match, ATS risk, and evidence gaps.
          </p>
        </div>
        <p className="text-xs text-slate-400 text-center">
          Most resumes score below 60% JD alignment.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <h3 className="text-sm font-semibold tracking-tight text-slate-500 uppercase tracking-widest">
            Intelligence
          </h3>
          {showFullIntelligence && jdMatch !== null && (
            <span className="text-sm font-semibold text-slate-700">
              Competitive Readiness: {jdMatch.matchPercentage}%
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1 – JD Match */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            JD Match
          </p>
          {jdMatch !== null ? (
            <>
              <p className="text-3xl font-bold tracking-tight text-slate-900">
                {jdMatch.matchPercentage}%
              </p>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${BarColor(jdMatch.matchPercentage)}`}
                  style={{ width: `${Math.min(100, jdMatch.matchPercentage)}%` }}
                />
              </div>
              {jdMatch.matchedKeywords.length > 0 && (
                <p className="text-xs text-slate-600 truncate" title={jdMatch.matchedKeywords.join(", ")}>
                  Matched: {jdMatch.matchedKeywords.slice(0, 8).join(", ")}
                  {jdMatch.matchedKeywords.length > 8 ? "…" : ""}
                </p>
              )}
              {jdMatch.missingKeywords.length > 0 && (
                <p className="text-xs text-amber-700 truncate" title={jdMatch.missingKeywords.join(", ")}>
                  Missing: {jdMatch.missingKeywords.slice(0, 6).join(", ")}
                  {jdMatch.missingKeywords.length > 6 ? "…" : ""}
                </p>
              )}
            </>
          ) : (
            <p className="text-sm text-slate-400">—</p>
          )}
        </div>

        {/* Card 2 – ATS Risk */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            ATS Risk
          </p>
          {atsResult !== null ? (
            <>
              <span
                className={`inline-block text-lg font-bold px-3 py-1 rounded-lg ${
                  atsResult.riskLevel === "High"
                    ? "bg-red-100 text-red-800"
                    : atsResult.riskLevel === "Medium"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-emerald-100 text-emerald-800"
                }`}
              >
                {atsResult.riskLevel}
              </span>
              {atsResult.issues.length > 0 && (
                <ul className="text-xs text-slate-600 space-y-0.5 list-disc pl-4">
                  {atsResult.issues.map((issue, i) => (
                    <li key={i}>{issue}</li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <p className="text-sm text-slate-400">—</p>
          )}
        </div>

        {showFullIntelligence && (
        <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Evidence Gaps
          </p>
          {evidenceGaps.length > 0 ? (
            <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
              {evidenceGaps.map((gap, i) => (
                <li key={i}>{gap}</li>
              ))}
            </ul>
          ) : (
            <div className="flex items-center gap-2 text-emerald-700">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 font-bold text-xs">
                ✓
              </span>
              <span className="text-sm font-medium">No major gaps detected</span>
            </div>
          )}
        </div>
        )}
        </div>
      </div>
      <p className="text-xs text-slate-400 text-center">
        Most resumes score below 60% JD alignment.
      </p>
    </div>
  );
}
