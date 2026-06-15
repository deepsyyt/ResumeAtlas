"use client";

import { useState } from "react";
import { AnimatedScoreBar, strengthBarHex, strengthBarPercent } from "@/app/components/EvidenceMetricBar";
import {
  SKILL_PROOF_MAP_INTRO,
  SKILL_PROOF_MAP_TITLE,
  evidenceStrengthDescription,
  evidenceStrengthShortLabel,
} from "@/app/lib/evidenceMetricCopy";
import {
  evidenceStrengthLabel,
  type EvidenceStrength,
  type JdSkillEvidenceRow,
} from "@/app/lib/resumeEvidenceScore";

/** Matches demo dashboard row count (`DEMO_EVIDENCE_DASHBOARD.skillProof`). */
export const SKILL_PROOF_DASHBOARD_ROW_LIMIT = 8;

const STRENGTH_DISPLAY_ORDER: Record<EvidenceStrength, number> = {
  strong: 0,
  medium: 1,
  weak: 2,
  gap: 3,
};

export function sortSkillProofForDisplay(rows: JdSkillEvidenceRow[]): JdSkillEvidenceRow[] {
  return [...rows].sort((a, b) => {
    const byStrength =
      STRENGTH_DISPLAY_ORDER[a.strength] - STRENGTH_DISPLAY_ORDER[b.strength];
    if (byStrength !== 0) return byStrength;
    if (a.jdRequired !== b.jdRequired) return a.jdRequired ? -1 : 1;
    return a.skill.localeCompare(b.skill);
  });
}

function strengthChipClass(strength: EvidenceStrength): string {
  switch (strength) {
    case "strong":
      return "bg-emerald-50 text-emerald-800 ring-emerald-200";
    case "medium":
      return "bg-sky-50 text-sky-900 ring-sky-200";
    case "weak":
      return "bg-amber-50 text-amber-950 ring-amber-200";
    case "gap":
      return "bg-slate-100 text-slate-700 ring-slate-200";
  }
}

function formatEvidenceLocation(row: JdSkillEvidenceRow): string {
  if (row.evidenceLocation === "none") return "Not found";
  if (row.evidenceLocation === "skills_only") return "Skills list only";
  return row.evidenceHint ?? row.evidenceLocation;
}

export type SkillProofMapSectionProps = {
  rows: JdSkillEvidenceRow[];
  /** Dashboard demo uses 8; optimize results may show up to 10. */
  maxRows?: number;
  className?: string;
};

export function SkillProofMapSection({
  rows,
  maxRows = SKILL_PROOF_DASHBOARD_ROW_LIMIT,
  className = "mt-3",
}: SkillProofMapSectionProps) {
  const [missingExpanded, setMissingExpanded] = useState(false);

  if (rows.length === 0) return null;

  const sorted = sortSkillProofForDisplay(rows);
  const visible = sorted.slice(0, maxRows);
  const hiddenMissing = sorted.slice(maxRows).filter((row) => row.strength === "gap");

  return (
    <div
      className={`${className} rounded-xl border border-slate-200/80 bg-slate-50/80 px-2.5 py-2.5 shadow-sm`}
    >
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-600">
        {SKILL_PROOF_MAP_TITLE}
      </p>
      <p className="mt-0.5 text-[11px] leading-snug text-slate-600">{SKILL_PROOF_MAP_INTRO}</p>
      <div className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
        {(["strong", "medium", "weak", "gap"] as EvidenceStrength[]).map((strength) => (
          <span key={strength} className="inline-flex items-start gap-1 text-[10px] text-slate-600">
            <span
              className={`mt-px inline-flex shrink-0 rounded px-1 py-0.5 font-semibold ring-1 ${strengthChipClass(strength)}`}
            >
              {evidenceStrengthShortLabel(strength)}
            </span>
            <span className="leading-snug">{evidenceStrengthDescription(strength)}</span>
          </span>
        ))}
      </div>
      <div className="mt-2 overflow-x-auto">
        <table className="w-full min-w-[300px] text-left text-[10px]">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500">
              <th className="pb-1 pr-2 font-semibold">JD skill</th>
              <th className="pb-1 pr-2 font-semibold">Proof level</th>
              <th className="pb-1 pr-2 font-semibold">Status</th>
              <th className="pb-1 font-semibold">Where in resume</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((row, index) => (
              <tr
                key={row.skill}
                className="border-b border-slate-100 transition-colors hover:bg-white/80"
              >
                <td className="py-1.5 pr-2 font-medium text-slate-800">{row.skill}</td>
                <td className="py-1.5 pr-2 min-w-[72px]">
                  <AnimatedScoreBar
                    value={strengthBarPercent(row.strength)}
                    colorHex={strengthBarHex(row.strength)}
                    heightClass="h-1.5"
                    delayMs={80 + index * 40}
                  />
                </td>
                <td className="py-1.5 pr-2">
                  <span
                    className={`inline-flex rounded px-1 py-0.5 font-semibold ring-1 ${strengthChipClass(row.strength)}`}
                    title={evidenceStrengthDescription(row.strength)}
                  >
                    {evidenceStrengthShortLabel(row.strength)}
                  </span>
                  <span className="sr-only">{evidenceStrengthLabel(row.strength)}</span>
                </td>
                <td className="py-1.5 text-slate-600">{formatEvidenceLocation(row)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {hiddenMissing.length > 0 ? (
        <div className="mt-1.5">
          <button
            type="button"
            onClick={() => setMissingExpanded((open) => !open)}
            aria-expanded={missingExpanded}
            className="text-left text-[10px] font-medium text-indigo-600 transition-colors hover:text-indigo-800 focus:outline-none focus-visible:underline"
          >
            + {hiddenMissing.length} more JD skill{hiddenMissing.length === 1 ? "" : "s"} missing in
            your resume
            <span className="text-indigo-500"> {missingExpanded ? "▾ Hide" : "▸ Show"}</span>
          </button>
          {missingExpanded ? (
            <ul className="mt-1 space-y-0.5 rounded-md border border-slate-200/80 bg-white/70 px-2 py-1.5">
              {hiddenMissing.map((row) => (
                <li key={row.skill} className="text-[10px] leading-snug text-slate-700">
                  • {row.skill}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
