"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  TOP_REJECTION_RISKS_FOOTER,
  TOP_REJECTION_RISKS_INTRO,
} from "@/app/lib/evidenceMetricCopy";
import { rejectionRiskRowCopy, rejectionRisksTitle } from "@/app/lib/rejectionRiskDisplay";

type Props = {
  items: string[];
  compact?: boolean;
  className?: string;
  showSelection?: boolean;
  selectionEnabled?: boolean;
  selectedRisks?: string[];
  onSelectionChange?: (risks: string[]) => void;
  variant?: "default" | "hero";
};

function formatRiskIndex(index: number): string {
  return String(index + 1).padStart(2, "0");
}

function riskKey(risk: string): string {
  return risk.toLowerCase().trim();
}

function HeaderWarningIcon() {
  return (
    <span className="rejection-risks-hero-icon rejection-risks-hero-icon--header" aria-hidden>
      <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor">
        <path d="M10 2.5 2.5 16h15L10 2.5zm0 4.2.01 5.2H9.99V6.7H10zm-.75 7.55a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0z" />
      </svg>
    </span>
  );
}

function RowIcon({ index }: { index: number }) {
  const icons = [
    <svg key="doc" viewBox="0 0 20 20" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M6 2.5h5.2L15 6.3v11.2H6V2.5z" strokeLinejoin="round" />
      <path d="M11 2.5V6.5H15" strokeLinejoin="round" />
    </svg>,
    <svg key="chart" viewBox="0 0 20 20" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 15.5V8.5M8.5 15.5V5.5M13 15.5V10M17.5 15.5V3.5" strokeLinecap="round" />
    </svg>,
    <svg key="clip" viewBox="0 0 20 20" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M7 3.5h8v12H7V3.5z" strokeLinejoin="round" />
      <path d="M5.5 6.5H7M5.5 9.5H7M5.5 12.5H7" strokeLinecap="round" />
      <path d="M10.5 11.2 12 12.7l3-3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
  ];

  return (
    <span className="rejection-risks-hero-icon rejection-risks-hero-icon--row" aria-hidden>
      {icons[index % icons.length]}
    </span>
  );
}

export function TopRejectionRisksSection({
  items,
  compact = false,
  className = "",
  showSelection = true,
  selectionEnabled = true,
  selectedRisks,
  onSelectionChange,
  variant = "default",
}: Props) {
  const [internalSelected, setInternalSelected] = useState<Set<string>>(() => new Set());
  const itemsKey = useMemo(() => items.join("\0"), [items]);

  const isControlled = onSelectionChange != null;
  const selectedSet = useMemo(
    () =>
      isControlled
        ? new Set((selectedRisks ?? []).map(riskKey))
        : internalSelected,
    [internalSelected, isControlled, selectedRisks]
  );

  useEffect(() => {
    setInternalSelected(new Set());
  }, [itemsKey]);

  const toggleRisk = useCallback(
    (risk: string) => {
      if (!showSelection || !selectionEnabled) return;
      const key = riskKey(risk);
      const next = new Set(selectedSet);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      const nextList = items.filter((item) => next.has(riskKey(item)));
      if (isControlled) onSelectionChange?.(nextList);
      else setInternalSelected(new Set(nextList.map(riskKey)));
    },
    [isControlled, items, onSelectionChange, selectedSet, selectionEnabled, showSelection]
  );

  if (items.length === 0) return null;

  const isHero = variant === "hero";
  const displayItems = isHero ? items.slice(0, 3) : items;

  if (isHero) {
    return (
      <section
        className={`rejection-risks-hero-card ${className}`}
        aria-labelledby="top-rejection-risks-heading"
      >
        <div className="rejection-risks-hero-header">
          <HeaderWarningIcon />
          <div className="min-w-0">
            <h3
              id="top-rejection-risks-heading"
              className="rejection-risks-hero-title text-sm font-bold leading-tight tracking-tight text-red-600"
            >
              {rejectionRisksTitle(displayItems.length)}
            </h3>
            <p className="rejection-risks-hero-intro mt-1 text-[10px] leading-snug text-slate-500">
              {TOP_REJECTION_RISKS_INTRO}
            </p>
          </div>
        </div>

        <ul className="rejection-risks-hero-list">
          {displayItems.map((item, index) => {
            const copy = rejectionRiskRowCopy(item);
            return (
              <li key={item} className="rejection-risks-hero-row">
                <RowIcon index={index} />
                <div className="min-w-0 flex-1">
                  <p className="rejection-risks-hero-row-title line-clamp-2 text-[10px] font-medium leading-snug text-slate-700">
                    {copy.headline}
                  </p>
                  <p className="rejection-risks-hero-row-desc mt-0.5 line-clamp-2 text-[9px] leading-snug text-slate-500">
                    {copy.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="rejection-risks-hero-footer">
          <span className="rejection-risks-hero-footer-icon" aria-hidden>
            <svg viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor">
              <path d="M8 1.2a4.2 4.2 0 0 0-1.4 8.17c.03.34-.1.7-.35 1.02l-.55.67a.35.35 0 0 0 .27.57h2.14a.35.35 0 0 0 .27-.14A5.2 5.2 0 1 0 8 1.2zm0 2.3a2.9 2.9 0 1 1 0 5.8 2.9 2.9 0 0 1 0-5.8z" />
            </svg>
          </span>
          <p className="text-[9px] font-medium leading-snug">{TOP_REJECTION_RISKS_FOOTER}</p>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`rejection-risks-panel ${compact ? "rejection-risks-panel-compact" : ""} ${className}`}
      aria-labelledby="top-rejection-risks-heading"
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3
            id="top-rejection-risks-heading"
            className="text-[11px] font-bold uppercase tracking-[0.14em] text-red-600"
          >
            {rejectionRisksTitle(displayItems.length)}
          </h3>
          {!compact ? (
            <p className="mt-0.5 text-[10px] leading-snug text-slate-600">{TOP_REJECTION_RISKS_INTRO}</p>
          ) : null}
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <span className="rounded-md bg-slate-900 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
            {items.length} risk{items.length === 1 ? "" : "s"}
          </span>
          {showSelection && selectionEnabled ? (
            <span className="text-[9px] text-slate-500">{selectedSet.size} selected</span>
          ) : null}
        </div>
      </div>

      <ol
        className={`rejection-risks-chevron-list ${
          compact ? "rejection-risks-chevron-list-compact" : ""
        }`}
      >
        {displayItems.map((item, index) => {
          const checked = selectedSet.has(riskKey(item));
          return (
            <li
              key={item}
              className={`rejection-risk-chevron ${compact ? "rejection-risk-chevron-compact" : ""} ${
                checked ? "ring-2 ring-indigo-400/60 ring-offset-1" : ""
              }`}
            >
              {showSelection ? (
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={!selectionEnabled}
                  onChange={() => toggleRisk(item)}
                  onClick={(event) => event.stopPropagation()}
                  className="relative z-[2] ml-0.5 h-3 w-3 shrink-0 rounded border-slate-400 text-indigo-600 focus:ring-indigo-500 disabled:opacity-50"
                  aria-label={`Include rejection risk: ${item}`}
                />
              ) : null}
              <span className="rejection-risk-chevron-num" aria-hidden>
                {formatRiskIndex(index)}
              </span>
              <span className="rejection-risk-chevron-text">{item}</span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/** @deprecated Use TopRejectionRisksSection */
export const MostMissingEvidenceSection = TopRejectionRisksSection;
