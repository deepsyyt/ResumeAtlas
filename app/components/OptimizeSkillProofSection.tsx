"use client";

import {
  AnimatedScoreBar,
  strengthBarHex,
  strengthBarPercent,
} from "@/app/components/EvidenceMetricBar";
import {
  OPTIMIZE_SKILL_PROOF_INTRO,
  OPTIMIZE_SKILL_PROOF_TITLE,
  evidenceStrengthShortLabel,
} from "@/app/lib/evidenceMetricCopy";
import type { EvidenceStrength, OptimizedSkillProofRow } from "@/app/lib/resumeEvidenceScore";

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

function formatLocation(
  location: OptimizedSkillProofRow["afterLocation"],
  hint?: string
): string {
  if (location === "none") return "Not found";
  if (location === "skills_only") return "Skills list only";
  return hint ?? location;
}

export type OptimizeSkillProofSectionProps = {
  rows: OptimizedSkillProofRow[];
  className?: string;
};

export function OptimizeSkillProofSection({
  rows,
  className = "mt-3",
}: OptimizeSkillProofSectionProps) {
  if (rows.length === 0) return null;

  return (
    <div
      className={`${className} rounded-xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/60 to-white px-2.5 py-2.5 shadow-sm`}
    >
      <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-950">
        {OPTIMIZE_SKILL_PROOF_TITLE}
      </p>
      <p className="mt-0.5 text-[11px] leading-snug text-emerald-950/75">
        {OPTIMIZE_SKILL_PROOF_INTRO}
      </p>

      <div className="mt-2 overflow-x-auto">
        <table className="w-full min-w-[320px] text-left text-[10px]">
          <thead>
            <tr className="border-b border-emerald-200/80 text-emerald-900/70">
              <th className="pb-1 pr-2 font-semibold">Skill</th>
              <th className="pb-1 pr-2 font-semibold">Proof</th>
              <th className="pb-1 pr-2 font-semibold">JD topic</th>
              <th className="pb-1 font-semibold">Where now</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={row.skill}
                className="border-b border-emerald-100/80 transition-colors hover:bg-white/70"
              >
                <td className="py-2 pr-2 align-top">
                  <p className="font-semibold text-slate-800">{row.skill}</p>
                  <p className="mt-0.5 leading-snug text-slate-600">{row.improvementNote}</p>
                </td>
                <td className="py-2 pr-2 align-top min-w-[108px]">
                  <div className="flex flex-wrap items-center gap-1">
                    <span
                      className={`inline-flex rounded px-1 py-0.5 font-semibold ring-1 ${strengthChipClass(row.beforeStrength)}`}
                    >
                      {evidenceStrengthShortLabel(row.beforeStrength)}
                    </span>
                    <span className="text-slate-400" aria-hidden>
                      →
                    </span>
                    <span
                      className={`inline-flex rounded px-1 py-0.5 font-semibold ring-1 ${strengthChipClass(row.afterStrength)}`}
                    >
                      {evidenceStrengthShortLabel(row.afterStrength)}
                    </span>
                  </div>
                  <AnimatedScoreBar
                    value={strengthBarPercent(row.afterStrength)}
                    beforeValue={strengthBarPercent(row.beforeStrength)}
                    colorHex={strengthBarHex(row.afterStrength)}
                    className="mt-1.5"
                    heightClass="h-1.5"
                    delayMs={60 + index * 40}
                  />
                </td>
                <td className="py-2 pr-2 align-top text-slate-700">
                  {row.jdTopic ?? "—"}
                </td>
                <td className="py-2 align-top text-slate-600">
                  {formatLocation(row.afterLocation, row.evidenceHint)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
