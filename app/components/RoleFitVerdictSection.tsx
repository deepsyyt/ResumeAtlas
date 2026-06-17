"use client";

import type { RoleFitRow } from "@/app/lib/roleFitArchetypes";
import {
  ROLE_FIT_SECTION_INTRO,
  ROLE_FIT_SECTION_TITLE,
  roleFitVerdictStyle,
  verdictLabelFor,
} from "@/app/lib/roleFitArchetypes";

type RoleFitVerdictSectionProps = {
  rows: RoleFitRow[];
  compact?: boolean;
  className?: string;
};

export function RoleFitVerdictSection({
  rows,
  compact = false,
  className = "",
}: RoleFitVerdictSectionProps) {
  if (rows.length === 0) return null;

  return (
    <div
      className={`border-t border-indigo-200/80 pt-2 ${className}`}
    >
      <p className="text-[10px] font-bold uppercase tracking-wide text-indigo-950">
        {ROLE_FIT_SECTION_TITLE}
      </p>
      {!compact ? (
        <p className="mt-0.5 text-[10px] text-indigo-900/75">{ROLE_FIT_SECTION_INTRO}</p>
      ) : null}
      <div className="mt-1.5 overflow-hidden rounded-md border border-indigo-200/70 bg-white/80">
        <table className="w-full text-left text-[10px]">
          <thead>
            <tr className="border-b border-indigo-100 bg-indigo-50/60 text-indigo-950">
              <th className="px-2 py-1 font-semibold">Role</th>
              <th className="px-2 py-1 font-semibold text-right">Verdict</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const style = roleFitVerdictStyle(row.verdict);
              return (
                <tr
                  key={row.role}
                  className="border-b border-indigo-50 last:border-b-0"
                >
                  <td className="px-2 py-1 font-medium text-slate-800">{row.role}</td>
                  <td className="px-2 py-1 text-right">
                    <span
                      className="inline-block rounded-full px-1.5 py-0.5 text-[9px] font-semibold"
                      style={{ color: style.hex, backgroundColor: style.bgHex }}
                    >
                      {verdictLabelFor(row.verdict)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
