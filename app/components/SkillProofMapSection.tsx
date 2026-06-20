"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  JD_SKILL_STATUS_COPY,
  actionChipClass,
  compareSkillProofRows,
  countSkillProofMatchedMissed,
  countSkillProofStatusBreakdown,
  isSkillSelectableForOptimize,
  resolveSkillProofRow,
  skillProofStatusLabel,
  skillProofTableStatusLabel,
  sortSkillProofMatchedFirst,
  statusChipClass,
} from "@/app/lib/jdSkillProofStatus";
import {
  KEYWORD_COVERAGE_MISSING_DESC,
  KEYWORD_COVERAGE_MISSING_LABEL,
  KEYWORD_COVERAGE_PROVEN_DESC,
  KEYWORD_COVERAGE_PROVEN_LABEL,
  KEYWORD_COVERAGE_VIEW_ALL,
  KEYWORD_COVERAGE_WEAK_DESC,
  KEYWORD_COVERAGE_WEAK_LABEL,
  SKILL_PROOF_MAP_TITLE,
  type KeywordCoverageMetricInput,
} from "@/app/lib/evidenceMetricCopy";
import type { JdSkillEvidenceRow } from "@/app/lib/resumeEvidenceScore";

/** Matches demo dashboard row count (`DEMO_EVIDENCE_DASHBOARD.skillProof`). */
export const SKILL_PROOF_DASHBOARD_ROW_LIMIT = 8;

export function sortSkillProofForDisplay(rows: JdSkillEvidenceRow[]): JdSkillEvidenceRow[] {
  return [...rows].sort(compareSkillProofRows);
}

function formatEvidenceLocation(row: JdSkillEvidenceRow): string {
  if (row.evidenceLocation === "none") return "Not found";
  if (row.evidenceLocation === "skills_only") return "Skills list only";
  return row.evidenceHint ?? row.evidenceLocation;
}

function skillKey(skill: string): string {
  return skill.toLowerCase().trim();
}

type KeywordStatusGroup = "weak" | "proven" | "missing";

function keywordStatusGroup(proofStatus: ReturnType<typeof resolveSkillProofRow>["proofStatus"]): KeywordStatusGroup {
  if (proofStatus === "missing") return "missing";
  if (proofStatus === "proven") return "proven";
  return "weak";
}

function groupKeywordsByStatus(rows: JdSkillEvidenceRow[]): Record<KeywordStatusGroup, JdSkillEvidenceRow[]> {
  const groups: Record<KeywordStatusGroup, JdSkillEvidenceRow[]> = {
    weak: [],
    proven: [],
    missing: [],
  };
  for (const row of rows) {
    groups[keywordStatusGroup(resolveSkillProofRow(row).proofStatus)].push(row);
  }
  return groups;
}

function ProvenStatIcon() {
  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-600" aria-hidden>
      <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3.5 8.5 6.5 11.5 12.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function WeakStatIcon() {
  return (
    <span className="flex h-7 w-7 items-center justify-center text-amber-500" aria-hidden>
      <svg viewBox="0 0 16 16" className="h-7 w-7" fill="currentColor">
        <path d="M8 1.5 14.5 13.5H1.5L8 1.5zm0 4.25a.75.75 0 0 0-.75.75v3a.75.75 0 0 0 1.5 0v-3A.75.75 0 0 0 8 5.75zM8 11.25a.875.875 0 1 0 0 1.75.875.875 0 0 0 0-1.75z" />
      </svg>
    </span>
  );
}

function MissingStatIcon() {
  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100 text-red-600" aria-hidden>
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4l8 8M12 4 4 12" strokeLinecap="round" />
      </svg>
    </span>
  );
}

/** Collapsed row count for live keyword coverage table. */
export const SKILL_PROOF_LIVE_COLLAPSED_ROWS = 12;

export type SkillProofMapSectionProps = {
  rows: JdSkillEvidenceRow[];
  /** Full keyword list for expand-all (defaults to rows). */
  allRows?: JdSkillEvidenceRow[];
  /** Section heading (shared by live results and workbench preview). */
  title?: string;
  /** Dashboard demo uses 8; optimize results may show up to 10. */
  maxRows?: number;
  className?: string;
  /** Side-by-side with rejection risks — tighter columns, hide location column. */
  parallelLayout?: boolean;
  /** Live dashboard: compact 3-column table with matched/missed summary. */
  variant?: "default" | "liveCompact";
  /** Live dashboard: align header counts with keyword coverage metric. */
  coverageSummary?: KeywordCoverageMetricInput;
  /** Live dashboard: start collapsed with proven/weak/missing summary only. */
  collapsedByDefault?: boolean;
  /** Show per-skill checkboxes for optimization selection. */
  showSelection?: boolean;
  /** When false, checkboxes are visible but disabled (sample readout). */
  selectionEnabled?: boolean;
  selectedSkills?: string[];
  onSelectionChange?: (skills: string[]) => void;
};

export function SkillProofMapSection({
  rows,
  allRows,
  title = SKILL_PROOF_MAP_TITLE,
  maxRows = SKILL_PROOF_DASHBOARD_ROW_LIMIT,
  className = "mt-3",
  parallelLayout = false,
  variant = "default",
  coverageSummary,
  collapsedByDefault = false,
  showSelection = true,
  selectionEnabled = true,
  selectedSkills,
  onSelectionChange,
}: SkillProofMapSectionProps) {
  const isLiveCompact = variant === "liveCompact";
  const useGroupedLayout = isLiveCompact && collapsedByDefault;
  const [expanded, setExpanded] = useState(!collapsedByDefault);
  const [expandedGroups, setExpandedGroups] = useState<KeywordStatusGroup[]>([]);
  const [viewAllKeywords, setViewAllKeywords] = useState(false);
  const catalogRows = allRows ?? rows;
  const rowsKey = useMemo(() => catalogRows.map((row) => row.skill).join("\0"), [catalogRows]);
  const [internalSelected, setInternalSelected] = useState<Set<string>>(() => new Set());

  const isControlled = onSelectionChange != null;
  const selectedSet = useMemo(
    () =>
      isControlled
        ? new Set((selectedSkills ?? []).map(skillKey))
        : internalSelected,
    [internalSelected, isControlled, selectedSkills]
  );

  useEffect(() => {
    setInternalSelected(new Set());
    setExpanded(!collapsedByDefault);
    setExpandedGroups([]);
    setViewAllKeywords(false);
  }, [collapsedByDefault, rowsKey]);

  const toggleSkill = useCallback(
    (skill: string, selectable: boolean) => {
      if (!showSelection || !selectionEnabled || !selectable) return;
      const key = skillKey(skill);
      const next = new Set(selectedSet);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      const nextList = catalogRows
        .filter((row) => next.has(skillKey(row.skill)))
        .map((row) => row.skill);
      if (isControlled) onSelectionChange?.(nextList);
      else setInternalSelected(new Set(nextList.map(skillKey)));
    },
    [catalogRows, isControlled, onSelectionChange, selectedSet, selectionEnabled, showSelection]
  );

  const toggleKeywordGroup = useCallback((group: KeywordStatusGroup) => {
    setViewAllKeywords(false);
    setExpandedGroups((prev) =>
      prev.includes(group) ? prev.filter((item) => item !== group) : [...prev, group]
    );
  }, []);

  const toggleViewAllKeywords = useCallback(() => {
    setViewAllKeywords((open) => {
      if (open) {
        setExpandedGroups([]);
        return false;
      }
      setExpandedGroups(["proven", "weak", "missing"]);
      return true;
    });
  }, []);

  const keywordGroups = useMemo(
    () => groupKeywordsByStatus(catalogRows),
    [catalogRows]
  );

  if (catalogRows.length === 0) return null;

  const sortedCatalog = isLiveCompact
    ? sortSkillProofMatchedFirst(catalogRows)
    : sortSkillProofForDisplay(catalogRows);
  const collapsedLimit = isLiveCompact ? SKILL_PROOF_LIVE_COLLAPSED_ROWS : maxRows;
  const canExpand = isLiveCompact && sortedCatalog.length > collapsedLimit;
  const visible = sortedCatalog
    .slice(0, expanded || !canExpand ? sortedCatalog.length : collapsedLimit)
    .filter((row) => {
      if (isLiveCompact) return true;
      return resolveSkillProofRow(row).proofStatus !== "missing";
    });

  const { matched, missed } = coverageSummary
    ? {
        matched: coverageSummary.matchedCount,
        missed: Math.max(0, coverageSummary.totalCount - coverageSummary.matchedCount),
      }
    : countSkillProofMatchedMissed(rows);

  const statusBreakdown = countSkillProofStatusBreakdown(catalogRows);
  const summaryParts = [
    statusBreakdown.proven > 0 ? `${statusBreakdown.proven} proven` : null,
    statusBreakdown.weak > 0 ? `${statusBreakdown.weak} weak` : null,
    statusBreakdown.missing > 0 ? `${statusBreakdown.missing} missing` : null,
  ].filter(Boolean);
  const statusSummary = summaryParts.join(" • ");
  const isCollapsed = collapsedByDefault && !expanded && !useGroupedLayout;

  const renderLiveCompactKeywordItem = (
    row: JdSkillEvidenceRow,
    options?: { showWhyAlways?: boolean }
  ) => {
    const { proofStatus } = resolveSkillProofRow(row);
    const copy = JD_SKILL_STATUS_COPY[proofStatus];
    const why = row.whyDetail?.trim() || copy.meaning;

    return (
      <div
        key={row.skill}
        className="skill-proof-keyword-item border-b border-slate-100/80 py-1.5 last:border-b-0"
      >
        <div className="flex items-start gap-2">
          <span
            className="min-w-0 flex-1 truncate text-[11px] font-medium text-slate-800"
            title={row.skill}
          >
            {row.skill}
          </span>
          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${statusChipClass(proofStatus)}`}
          >
            {skillProofTableStatusLabel(proofStatus)}
          </span>
        </div>
        {why ? (
          <p
            className={`mt-0.5 text-[10px] leading-snug text-slate-500 ${
              options?.showWhyAlways ? "" : "hidden sm:block"
            }`}
          >
            {why}
          </p>
        ) : null}
      </div>
    );
  };

  const renderExpandedKeywordGroups = () => {
    const groupsToShow: KeywordStatusGroup[] = viewAllKeywords
      ? ["weak", "proven", "missing"]
      : expandedGroups;

    if (groupsToShow.length === 0) return null;

    return (
      <div className="keyword-coverage-expanded-panel">
        {groupsToShow.map((group) => {
          const groupRows = keywordGroups[group];
          if (groupRows.length === 0) return null;

          const labels: Record<KeywordStatusGroup, string> = {
            proven: KEYWORD_COVERAGE_PROVEN_LABEL,
            weak: KEYWORD_COVERAGE_WEAK_LABEL,
            missing: KEYWORD_COVERAGE_MISSING_LABEL,
          };

          return (
            <div key={group} className="mb-2 last:mb-0">
              {!viewAllKeywords || groupsToShow.length > 1 ? (
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                  {labels[group]}
                </p>
              ) : null}
              {groupRows.map((row) =>
                renderLiveCompactKeywordItem(row, { showWhyAlways: group === "weak" })
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderKeywordCoverageHero = () => {
    const statConfig: Array<{
      group: KeywordStatusGroup;
      count: number;
      label: string;
      description: string;
      icon: ReactNode;
      modifier: string;
    }> = [
      {
        group: "proven",
        count: keywordGroups.proven.length,
        label: KEYWORD_COVERAGE_PROVEN_LABEL,
        description: KEYWORD_COVERAGE_PROVEN_DESC,
        icon: <ProvenStatIcon />,
        modifier: "proven",
      },
      {
        group: "weak",
        count: keywordGroups.weak.length,
        label: KEYWORD_COVERAGE_WEAK_LABEL,
        description: KEYWORD_COVERAGE_WEAK_DESC,
        icon: <WeakStatIcon />,
        modifier: "weak",
      },
      {
        group: "missing",
        count: keywordGroups.missing.length,
        label: KEYWORD_COVERAGE_MISSING_LABEL,
        description: KEYWORD_COVERAGE_MISSING_DESC,
        icon: <MissingStatIcon />,
        modifier: "missing",
      },
    ];

    return (
      <>
        <div className="keyword-coverage-hero-stats mt-3">
          {statConfig.map((stat) => {
            const isActive = expandedGroups.includes(stat.group);
            return (
              <button
                key={stat.group}
                type="button"
                onClick={() => toggleKeywordGroup(stat.group)}
                className={`keyword-coverage-stat-col keyword-coverage-stat-col--${stat.modifier} ${
                  isActive ? "keyword-coverage-stat-col--active" : ""
                }`}
                aria-expanded={isActive}
                aria-pressed={isActive}
                aria-label={`${stat.count} ${stat.label.toLowerCase()}. ${stat.description}`}
              >
                {stat.icon}
                <span className="keyword-coverage-stat-count text-2xl font-bold leading-none tabular-nums">
                  {stat.count}
                </span>
                <span className="text-[11px] font-semibold text-slate-800">{stat.label}</span>
                <span className="text-[9px] leading-snug text-slate-500">{stat.description}</span>
              </button>
            );
          })}
        </div>
        {renderExpandedKeywordGroups()}
      </>
    );
  };

  const renderLiveCompactRow = (row: JdSkillEvidenceRow) => {
    const { proofStatus } = resolveSkillProofRow(row);
    const copy = JD_SKILL_STATUS_COPY[proofStatus];
    const selectable = isSkillSelectableForOptimize(proofStatus);
    const checked = selectable && selectedSet.has(skillKey(row.skill));
    const checkboxDisabled = !showSelection || !selectionEnabled || !selectable;

    return (
      <tr
        key={row.skill}
        className={`skill-proof-live-row transition-colors hover:bg-slate-50/80 ${
          checked ? "skill-proof-row--selected bg-indigo-50/40" : ""
        }`}
      >
        {showSelection ? (
          <td className="w-6 py-0 pr-1 align-middle">
            <input
              type="checkbox"
              checked={checked}
              disabled={checkboxDisabled}
              onChange={() => toggleSkill(row.skill, selectable)}
              className={`skill-proof-row-checkbox h-3 w-3 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 disabled:cursor-not-allowed ${
                checked ? "opacity-100" : ""
              }`}
              aria-label={
                selectable
                  ? `Include ${row.skill} in optimization`
                  : `${row.skill}, not found in resume`
              }
            />
          </td>
        ) : null}
        <td className="max-w-[7rem] truncate py-0 pr-2 text-[11px] font-medium text-slate-800" title={row.skill}>
          {row.skill}
        </td>
        <td className="w-[4.25rem] py-0 pr-2">
          <span
            className={`inline-flex whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium ${statusChipClass(proofStatus)}`}
          >
            {skillProofTableStatusLabel(proofStatus)}
          </span>
        </td>
        <td className="py-0 text-[10px] leading-snug text-slate-500">
          {row.whyDetail?.trim() || copy.meaning}
        </td>
      </tr>
    );
  };

  const renderDefaultRow = (row: JdSkillEvidenceRow) => {
    const { proofStatus, optimizeAction } = resolveSkillProofRow(row);
    const copy = JD_SKILL_STATUS_COPY[proofStatus];
    const selectable = isSkillSelectableForOptimize(proofStatus);
    const checked = selectable && selectedSet.has(skillKey(row.skill));
    const checkboxDisabled = !showSelection || !selectionEnabled || !selectable;

    return (
      <tr
        key={row.skill}
        className={`border-b border-slate-100 transition-colors hover:bg-white/80 ${
          checked ? "bg-indigo-50/40" : ""
        }`}
      >
        {showSelection ? (
          <td className="w-6 py-1.5 pr-1 align-middle">
            <input
              type="checkbox"
              checked={checked}
              disabled={checkboxDisabled}
              onChange={() => toggleSkill(row.skill, selectable)}
              className="h-3 w-3 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label={
                selectable
                  ? `Include ${row.skill} in optimization`
                  : `${row.skill}, no evidence to optimize`
              }
            />
          </td>
        ) : null}
        <td className="py-1.5 pr-2 font-medium text-slate-800">{row.skill}</td>
        <td className="py-1.5 pr-2">
          <span
            className={`inline-flex rounded px-1 py-0.5 font-semibold ring-1 ${statusChipClass(proofStatus)}`}
          >
            {skillProofStatusLabel(proofStatus)}
          </span>
        </td>
        <td className={`py-1.5 pr-2 text-slate-600 ${parallelLayout ? "hidden sm:table-cell" : ""}`}>
          {row.whyDetail?.trim() || copy.meaning}
        </td>
        <td className="py-1.5 pr-2">
          <span
            className={`inline-flex rounded px-1 py-0.5 font-semibold ${actionChipClass(optimizeAction)}`}
          >
            {copy.action}
          </span>
        </td>
        {!parallelLayout ? (
          <td className="py-1.5 text-slate-600">{formatEvidenceLocation(row)}</td>
        ) : null}
      </tr>
    );
  };

  if (isLiveCompact) {
    return (
      <div
        className={`dashboard-content-card ${className} px-3 py-3`}
        aria-label={title}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-sm font-bold leading-snug text-slate-900">{title}</h3>
            <p className="mt-0.5 text-[11px] text-slate-500">
              {statusSummary || (
                <>
                  <span className="font-medium text-emerald-700">{matched} matched</span>
                  <span className="text-slate-300"> · </span>
                  <span className="font-medium text-slate-600">{missed} missed</span>
                </>
              )}
            </p>
          </div>
          {useGroupedLayout ? (
            <button
              type="button"
              onClick={toggleViewAllKeywords}
              className="shrink-0 text-[11px] font-semibold text-violet-600 transition hover:text-violet-800"
              aria-expanded={viewAllKeywords}
            >
              {viewAllKeywords ? "Hide keywords" : KEYWORD_COVERAGE_VIEW_ALL}
            </button>
          ) : showSelection && selectionEnabled ? (
            <p className="shrink-0 text-[10px] text-slate-400">{selectedSet.size} selected</p>
          ) : null}
        </div>

        {useGroupedLayout ? (
          renderKeywordCoverageHero()
        ) : !isCollapsed ? (
          <div
            className={`mt-2 overflow-x-auto ${expanded ? "max-h-64 overflow-y-auto overscroll-contain" : ""}`}
          >
            <table className="skill-proof-live-table w-full min-w-0 text-left">
              <thead>
                <tr className="border-b border-[#f3f4f6] text-[10px] text-slate-400">
                  {showSelection ? (
                    <th className="w-6 pb-1.5 pr-1 font-medium">
                      <span className="sr-only">Select</span>
                    </th>
                  ) : null}
                  <th className="pb-1.5 pr-2 font-medium">JD keywords</th>
                  <th className="pb-1.5 pr-2 font-medium">Status</th>
                  <th className="pb-1.5 font-medium">Why</th>
                </tr>
              </thead>
              <tbody>{visible.map(renderLiveCompactRow)}</tbody>
            </table>
          </div>
        ) : null}

        {!useGroupedLayout && (collapsedByDefault || canExpand) ? (
          <button
            type="button"
            onClick={() => setExpanded((open) => !open)}
            className="mt-2 w-full rounded-lg bg-slate-50 px-2 py-1.5 text-[10px] font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-800"
            aria-expanded={expanded}
          >
            {expanded
              ? "Collapse keyword coverage"
              : `Expand keyword coverage (${statusSummary || `${matched} matched, ${missed} missed`})`}
          </button>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className={`${className} rounded-xl border border-slate-200/80 bg-slate-50/80 px-2.5 py-2.5 shadow-sm`}
      aria-label={title}
    >
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-xs font-semibold leading-snug text-slate-700">{title}</h3>
        {showSelection && selectionEnabled ? (
          <p className="text-[9px] text-slate-500">{selectedSet.size} selected</p>
        ) : null}
      </div>
      <div className="mt-2 overflow-x-auto">
        <table
          className={`w-full text-left text-[10px] ${parallelLayout ? "min-w-[240px]" : "min-w-[360px]"}`}
        >
          <thead>
            <tr className="border-b border-slate-200 text-slate-500">
              {showSelection ? (
                <th className="w-6 pb-1 pr-1 font-semibold">
                  <span className="sr-only">Select</span>
                </th>
              ) : null}
              <th className="pb-1 pr-2 font-semibold">JD skill</th>
              <th className="pb-1 pr-2 font-semibold">Status</th>
              <th
                className={`pb-1 pr-2 font-semibold ${parallelLayout ? "hidden sm:table-cell" : ""}`}
              >
                Meaning
              </th>
              <th className="pb-1 pr-2 font-semibold">Action</th>
              {!parallelLayout ? <th className="pb-1 font-semibold">Where in resume</th> : null}
            </tr>
          </thead>
          <tbody>{visible.map(renderDefaultRow)}</tbody>
        </table>
      </div>
    </div>
  );
}
