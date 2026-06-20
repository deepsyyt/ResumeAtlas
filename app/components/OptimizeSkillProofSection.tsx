"use client";

import {
  JD_SKILL_STATUS_COPY,
  skillProofStatusLabel,
  statusChipClass,
} from "@/app/lib/jdSkillProofStatus";
import {
  OPTIMIZE_SKILL_PROOF_INTRO,
  OPTIMIZE_SKILL_PROOF_TITLE,
} from "@/app/lib/evidenceMetricCopy";
import type { OptimizedSkillProofRow } from "@/app/lib/resumeEvidenceScore";

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
              <th className="pb-1 pr-2 font-semibold">Status</th>
              <th className="pb-1 font-semibold">Where now</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.skill}
                className="border-b border-emerald-100/80 transition-colors hover:bg-white/70"
              >
                <td className="py-2 pr-2 align-top">
                  <p className="font-semibold text-slate-800">{row.skill}</p>
                  <p className="mt-0.5 leading-snug text-slate-600">{row.improvementNote}</p>
                </td>
                <td className="py-2 pr-2 align-top">
                  <div className="flex flex-wrap items-center gap-1">
                    <span
                      className={`inline-flex rounded px-1 py-0.5 font-semibold ring-1 ${statusChipClass(row.beforeProofStatus)}`}
                    >
                      {skillProofStatusLabel(row.beforeProofStatus)}
                    </span>
                    <span className="text-slate-400" aria-hidden>
                      →
                    </span>
                    <span
                      className={`inline-flex rounded px-1 py-0.5 font-semibold ring-1 ${statusChipClass(row.afterProofStatus)}`}
                    >
                      {skillProofStatusLabel(row.afterProofStatus)}
                    </span>
                  </div>
                  <p className="mt-1 text-[9px] text-slate-500">
                    {JD_SKILL_STATUS_COPY[row.afterProofStatus].action}
                  </p>
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
