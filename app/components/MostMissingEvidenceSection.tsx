"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  TOP_REJECTION_RISKS_FOOTER,
  TOP_REJECTION_RISKS_INTRO,
  DASHBOARD_REJECTION_RISKS_TITLE,
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
  variant?: "default" | "hero" | "dashboard";
  uniformActionCard?: boolean;
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

function DashboardGapIcon({ index }: { index: number }) {
  const icons = [
    <svg key="doc" viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M6 2.5h5.2L15 6.3v11.2H6V2.5z" strokeLinejoin="round" />
      <path d="M11 2.5V6.5H15" strokeLinejoin="round" />
    </svg>,
    <svg key="chart" viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M4 15.5V8.5M8.5 15.5V5.5M13 15.5V10M17.5 15.5V3.5" strokeLinecap="round" />
    </svg>,
    <svg key="target" viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75">
      <circle cx="10" cy="10" r="6.5" />
      <circle cx="10" cy="10" r="2.5" />
      <path d="M10 3.5V5M10 15v1.5M3.5 10H5M15 10h1.5" strokeLinecap="round" />
    </svg>,
  ];

  return (
    <span className="rejection-risks-dashboard-gap-icon" aria-hidden>
      {icons[index % icons.length]}
    </span>
  );
}

function DashboardGapsWarningIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0" fill="currentColor" aria-hidden>
      <path d="M8 1.2 1.4 13.2h13.2L8 1.2zm0 3.4.01 4.1H7.99V4.6H8zm-.7 6.1a.7.7 0 1 1 1.4 0 .7.7 0 0 1-1.4 0z" />
    </svg>
  );
}

function HeroRowIcon({ index }: { index: number }) {
  return (
    <span className="rejection-risks-hero-icon rejection-risks-hero-icon--row" aria-hidden>
      <span className="text-[9px] font-bold leading-none">{index + 1}</span>
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
  uniformActionCard = false,
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

  const displayItemsHero = items.slice(0, 3);

  if (variant === "dashboard") {
    return (
      <section
        className={`rejection-risks-dashboard-card dashboard-content-card px-4 py-4 sm:px-5 sm:py-5 ${className}`}
        aria-labelledby="top-rejection-risks-heading"
      >
        <h3
          id="top-rejection-risks-heading"
          className="text-base font-bold leading-snug tracking-tight text-slate-900 sm:text-[1.05rem]"
        >
          {DASHBOARD_REJECTION_RISKS_TITLE}
        </h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-[13px] font-bold text-red-600">
          <DashboardGapsWarningIcon />
          <span>
            {displayItemsHero.length} critical gap{displayItemsHero.length === 1 ? "" : "s"}
          </span>
        </p>

        <ul className="rejection-risks-dashboard-grid mt-4">
          {displayItemsHero.map((item, index) => {
            const copy = rejectionRiskRowCopy(item);
            return (
              <li key={item} className="rejection-risks-dashboard-gap-card">
                <DashboardGapIcon index={index} />
                <p className="rejection-risks-dashboard-gap-title">{copy.headline}</p>
                <p className="rejection-risks-dashboard-gap-desc">{copy.description}</p>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }

  const displayItems = variant === "hero" ? displayItemsHero : items;

  if (variant === "hero") {
    const sectionTitle = rejectionRisksTitle(displayItems.length);

    return (
      <section
        className={`rejection-risks-hero-card flex h-full flex-col ${className}`}
        aria-labelledby="top-rejection-risks-heading"
      >
        <div
          className={
            uniformActionCard
              ? "rejection-risks-hero-header dashboard-action-card-head dashboard-action-card-head--risk"
              : "rejection-risks-hero-header"
          }
        >
          <HeaderWarningIcon />
          <div className="min-w-0">
            <h3
              id="top-rejection-risks-heading"
              className={
                uniformActionCard
                  ? "rejection-risks-hero-title dashboard-action-card-title dashboard-action-card-title--risk"
                  : "rejection-risks-hero-title text-sm font-bold leading-tight tracking-tight text-slate-900"
              }
            >
              {sectionTitle}
            </h3>
            <p
              className={
                uniformActionCard
                  ? "rejection-risks-hero-intro dashboard-action-card-intro mt-1"
                  : "rejection-risks-hero-intro mt-1 text-[10px] leading-snug text-slate-500"
              }
            >
              {TOP_REJECTION_RISKS_INTRO}
            </p>
          </div>
        </div>

        <ul className="rejection-risks-hero-list rejection-risks-card-grid">
          {displayItems.map((item, index) => {
            const copy = rejectionRiskRowCopy(item);
            return (
              <li key={item} className="rejection-risks-hero-row rejection-risk-card">
                <HeroRowIcon index={index} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="rejection-risks-hero-row-title line-clamp-2 text-[11px] font-semibold leading-snug text-slate-800">
                      {copy.headline}
                    </p>
                    <span className="rejection-risk-severity shrink-0" aria-hidden />
                  </div>
                  <p className="rejection-risks-hero-row-desc mt-1 line-clamp-2 text-[10px] leading-snug text-slate-500">
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
            {rejectionRisksTitle(items.length)}
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
        {items.map((item, index) => {
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
