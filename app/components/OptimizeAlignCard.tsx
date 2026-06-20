"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { OptimizeCta } from "@/app/components/EvidenceMetricBar";
import { OptimizeAlignMetrics } from "@/app/components/OptimizeAlignMetrics";
import { OptimizeHubVisual } from "@/app/components/OptimizeHubVisual";
import type { ApplicationVerdict } from "@/app/lib/applicationVerdict";
import {
  OPTIMIZE_ALIGN_AFTER_LABEL,
  OPTIMIZE_ALIGN_BEFORE_LABEL,
  OPTIMIZE_ALIGN_BENEFITS,
  OPTIMIZE_ALIGN_BENEFITS_TITLE,
  OPTIMIZE_ALIGN_CARD_BODY,
  OPTIMIZE_ALIGN_CARD_DEMO_HINT,
  OPTIMIZE_ALIGN_CARD_HINT,
  OPTIMIZE_ALIGN_CARD_TITLE,
  OPTIMIZE_ALIGN_EMPTY_SELECTION,
  OPTIMIZE_ALIGN_PREVIEW_PLACEHOLDER,
  OPTIMIZE_ALIGN_PREVIEW_TITLE,
  OPTIMIZE_ALIGN_PRIVACY_NOTE,
  OPTIMIZE_ALIGN_SELECTION_TITLE,
  OPTIMIZE_CTA_LABEL,
  OPTIMIZE_CTA_LABEL_HERO,
  OPTIMIZE_CTA_SUBLINE,
} from "@/app/lib/evidenceMetricCopy";
import {
  recommendedFixChipLabel,
  selectedFixUpliftTotal,
} from "@/app/lib/recommendedFixes";

export type AlignBulletPreview = {
  before: string;
  after: string;
  highlights?: string[];
};

type OptimizeAlignCardProps = {
  verdict: ApplicationVerdict;
  selectedFixes?: string[];
  allFixes?: string[];
  bulletPreview?: AlignBulletPreview | null;
  onOptimize?: () => void;
  disabled?: boolean;
  busy?: boolean;
  className?: string;
  demo?: boolean;
  heroLayout?: boolean;
  /** Nudge modal: tighter layout, no in-card CTA (parent renders actions). */
  embedInModal?: boolean;
};

function truncateLine(text: string, max = 120): string {
  const t = text.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trim()}…`;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightsFromFixes(fixes: string[]): string[] {
  const tokens = new Set<string>();
  fixes.forEach((fix, index) => {
    const chip = recommendedFixChipLabel(fix, index);
    const lower = chip.toLowerCase();
    if (lower.includes("aws")) {
      tokens.add("AWS");
      tokens.add("AWS solutions");
    }
    if (lower.includes("genai")) tokens.add("GenAI");
    if (lower.includes("eval")) tokens.add("evaluation metrics");
    if (lower.includes("langchain")) tokens.add("LangChain");
    if (lower.includes("bedrock")) tokens.add("Bedrock");
    const percent = chip.match(/\d+%/);
    if (percent) tokens.add(percent[0]);
  });
  return Array.from(tokens);
}

function buildSyntheticPreview(fixes: string[]): AlignBulletPreview | null {
  if (fixes.length === 0) return null;
  const highlights = highlightsFromFixes(fixes);
  const lower = fixes.join(" ").toLowerCase();
  const parts: string[] = ["Led cross-functional delivery"];

  if (lower.includes("aws")) {
    parts.push("built AWS solutions that improved process efficiency by 32%");
  } else if (lower.includes("genai") || lower.includes("llm")) {
    parts.push("delivered measurable GenAI outcomes with 32% efficiency gains");
  } else {
    parts.push(`${recommendedFixChipLabel(fixes[0]!, 0).toLowerCase()} with measurable outcomes`);
  }

  if (lower.includes("eval")) {
    parts.push("included evaluation metrics to drive data-informed decisions");
  }

  const after = `${parts.join("; ")}.`;
  if (!highlights.includes("32%") && after.includes("32%")) highlights.push("32%");

  return {
    before: "Led cross-functional delivery with stakeholder alignment.",
    after,
    highlights,
  };
}

function renderHighlightedAfter(text: string, highlights: string[]): ReactNode {
  const patterns = [...highlights]
    .filter((item) => item.trim().length > 0)
    .sort((a, b) => b.length - a.length);

  if (patterns.length === 0) return text;

  const regex = new RegExp(`(${patterns.map(escapeRegExp).join("|")}|\\d+%)`, "gi");
  const parts = text.split(regex).filter((part) => part.length > 0);

  return parts.map((part, index) => {
    const isHighlight = patterns.some((pattern) => part.toLowerCase() === pattern.toLowerCase()) || /^\d+%$/.test(part);
    if (isHighlight) {
      return (
        <span key={`${part}-${index}`} className="optimize-align-highlight">
          {part}
        </span>
      );
    }
    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

function SelectionPill({ label, delayMs = 0 }: { label: string; delayMs?: number }) {
  return (
    <span
      className="optimize-align-pill-in inline-flex max-w-full items-center rounded-md border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 text-[9px] font-medium leading-tight text-emerald-950"
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <span className="truncate">{label}</span>
    </span>
  );
}

function BenefitCheckIcon({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white ${
        compact ? "mt-0 h-3.5 w-3.5" : "mt-0.5 h-4 w-4"
      }`}
      aria-hidden
    >
      <svg
        viewBox="0 0 12 12"
        className={compact ? "h-2 w-2" : "h-2.5 w-2.5"}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M2.5 6l2.25 2.25L9.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function OptimizeAlignCard({
  verdict,
  selectedFixes = [],
  allFixes,
  bulletPreview = null,
  onOptimize,
  disabled = false,
  busy = false,
  className = "",
  demo = false,
  heroLayout = false,
  embedInModal = false,
}: OptimizeAlignCardProps) {
  const { shortlistPct, shortlistUplift } = verdict;
  const ctaDisabled = demo || disabled || busy || !onOptimize;

  const fixCatalog = allFixes ?? selectedFixes;
  const hasSelection = selectedFixes.length > 0;
  const hadSelectionRef = useRef(false);
  const [panelEnter, setPanelEnter] = useState(false);

  const selectedUplift = useMemo(() => {
    if (demo) return shortlistUplift;
    return selectedFixUpliftTotal(fixCatalog, selectedFixes, verdict);
  }, [demo, fixCatalog, selectedFixes, shortlistUplift, verdict]);

  const projectedShortlist = Math.min(95, shortlistPct + selectedUplift);

  useEffect(() => {
    if (hasSelection && !hadSelectionRef.current) {
      setPanelEnter(true);
      hadSelectionRef.current = true;
      return;
    }
    if (!hasSelection) {
      hadSelectionRef.current = false;
      setPanelEnter(false);
    }
  }, [hasSelection]);

  const selectionPills = useMemo(
    () =>
      selectedFixes.map((fix, index) => ({
        key: fix,
        label: recommendedFixChipLabel(fix, index),
      })),
    [selectedFixes]
  );

  const preview = useMemo((): AlignBulletPreview | null => {
    if (!hasSelection && !demo) return null;
    if (bulletPreview?.before && bulletPreview?.after) {
      return {
        ...bulletPreview,
        highlights: bulletPreview.highlights ?? highlightsFromFixes(selectedFixes),
      };
    }
    if (hasSelection) return buildSyntheticPreview(selectedFixes);
    if (demo && fixCatalog.length > 0) return buildSyntheticPreview(fixCatalog);
    return null;
  }, [bulletPreview, demo, fixCatalog, hasSelection, selectedFixes]);

  const showPreview = preview != null;
  const sectionGap = embedInModal ? "mt-2" : heroLayout ? "mt-4" : "mt-2.5";
  const beforeTruncate = embedInModal ? 72 : 140;
  const afterTruncate = embedInModal ? 96 : 220;

  const shellClass = heroLayout
    ? `dashboard-hero-card optimize-align-card-hero flex flex-col items-center text-center lg:sticky lg:top-2 ${
        embedInModal ? "optimize-align-card-modal " : ""
      }${className}`
    : `flex flex-col rounded-xl border border-indigo-200/80 bg-gradient-to-br from-indigo-50/95 via-white to-violet-50/80 p-3 shadow-sm ring-1 ring-indigo-100/80 lg:sticky lg:top-2 ${className}`;

  const innerPanelClass = heroLayout
    ? "optimize-align-benefits-card"
    : "rounded-lg border border-white/80 bg-white/70 px-2 py-1.5 shadow-sm";

  const previewShellClass = heroLayout
    ? `optimize-align-preview-card ${embedInModal ? "mt-2" : "mt-3"} transition-colors duration-300`
    : `mt-2 rounded-lg border px-2.5 py-2 transition-colors duration-300 ${
        showPreview
          ? "border-emerald-200/80 bg-emerald-50/60"
          : "border-slate-200/70 bg-slate-50/50"
      }`;

  return (
    <div className={shellClass}>
      <p
        className={`font-bold text-slate-900 ${
          embedInModal
            ? "text-xs"
            : heroLayout
              ? "text-sm"
              : "text-[10px] uppercase tracking-[0.14em] text-indigo-950"
        }`}
      >
        {OPTIMIZE_ALIGN_CARD_TITLE}
      </p>
      {!heroLayout ? (
        <p className="mt-1 text-[11px] leading-snug text-indigo-950/90">{OPTIMIZE_ALIGN_CARD_BODY}</p>
      ) : null}

      {heroLayout ? (
        <div className={embedInModal ? "mt-1.5" : "mt-1"}>
          <OptimizeAlignMetrics
            currentPct={shortlistPct}
            projectedPct={projectedShortlist}
            uplift={selectedUplift}
            compact={embedInModal}
            tight={!embedInModal}
          />
        </div>
      ) : null}

      <div className={`${sectionGap} flex w-full ${heroLayout ? "flex-col items-stretch" : "items-start"} gap-2.5`}>
        {!heroLayout ? (
          <OptimizeHubVisual value={projectedShortlist} steps={[]} compact className="shrink-0" />
        ) : null}
        <div
          className={`optimize-align-selection-panel min-w-0 flex-1 ${innerPanelClass} ${
            hasSelection ? "optimize-align-selection-panel--active" : ""
          } ${panelEnter ? "optimize-align-panel-in" : ""} ${heroLayout ? "w-full" : ""}`}
        >
          {heroLayout ? (
            <>
              <p className={`font-bold text-slate-900 ${embedInModal ? "text-[11px]" : "text-xs"}`}>
                {OPTIMIZE_ALIGN_BENEFITS_TITLE}
              </p>
              <ul className={embedInModal ? "mt-1 space-y-1" : "mt-2.5 space-y-2"}>
                {OPTIMIZE_ALIGN_BENEFITS.map((benefit) => (
                  <li
                    key={benefit}
                    className={`flex items-start gap-1.5 leading-snug text-slate-800 ${
                      embedInModal ? "text-[10px]" : "text-[11px]"
                    }`}
                  >
                    <BenefitCheckIcon compact={embedInModal} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-500">
                {OPTIMIZE_ALIGN_SELECTION_TITLE}
              </p>
              {!hasSelection ? (
                <p className="mt-1 text-[10px] leading-snug text-slate-500">
                  {demo ? OPTIMIZE_ALIGN_CARD_DEMO_HINT : OPTIMIZE_ALIGN_EMPTY_SELECTION}
                </p>
              ) : (
                <div key={selectionPills.map((p) => p.key).join("\0")} className="optimize-align-preview-in">
                  <p className="mt-0.5 text-[10px] font-semibold text-slate-800">
                    {selectedFixes.length} fix{selectedFixes.length === 1 ? "" : "es"} selected
                    {selectedUplift > 0 ? (
                      <span className="ml-1 font-semibold text-emerald-700">(+{selectedUplift}%)</span>
                    ) : null}
                  </p>
                  <div className="mt-1.5 flex max-h-[4.5rem] flex-wrap gap-1 overflow-y-auto overscroll-contain">
                    {selectionPills.map((pill, index) => (
                      <SelectionPill key={pill.key} label={pill.label} delayMs={index * 45} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className={previewShellClass}>
        <p
          className={`font-bold text-slate-900 ${
            heroLayout ? (embedInModal ? "text-[10px]" : "text-xs") : "text-[9px] uppercase tracking-wide text-emerald-800"
          }`}
        >
          {OPTIMIZE_ALIGN_PREVIEW_TITLE}
        </p>
        {showPreview && preview ? (
          <div
            key={`${preview.before}:${preview.after}`}
            className={`optimize-align-preview-in ${embedInModal ? "mt-1 space-y-1" : "mt-2 space-y-2"}`}
          >
            <div>
              <p
                className={`font-semibold uppercase tracking-wide ${
                  heroLayout ? "text-[10px] text-violet-400" : "text-[8px] text-slate-500"
                }`}
              >
                {OPTIMIZE_ALIGN_BEFORE_LABEL}
              </p>
              <p
                className={`leading-snug text-slate-800 ${
                  embedInModal ? "mt-0.5 text-[10px] line-clamp-2" : "mt-1 text-[11px]"
                }`}
              >
                {truncateLine(preview.before, beforeTruncate)}
              </p>
            </div>
            <div
              className={`${
                heroLayout ? "border-t border-slate-200/80" : "border-t border-emerald-200/60"
              } ${embedInModal ? "pt-1" : "pt-2"}`}
            >
              <p
                className={`font-semibold uppercase tracking-wide ${
                  heroLayout ? "text-[10px] text-emerald-600" : "text-[8px] text-emerald-700"
                }`}
              >
                {heroLayout ? OPTIMIZE_ALIGN_AFTER_LABEL : "After"}
              </p>
              <p
                className={`leading-snug text-slate-800 ${
                  embedInModal ? "mt-0.5 text-[10px] line-clamp-3" : "mt-1 text-[11px]"
                }`}
              >
                {renderHighlightedAfter(truncateLine(preview.after, afterTruncate), preview.highlights ?? [])}
              </p>
            </div>
          </div>
        ) : (
          <p className="mt-1 text-[10px] leading-snug text-slate-600">
            {OPTIMIZE_ALIGN_PREVIEW_PLACEHOLDER}
          </p>
        )}
      </div>

      {!embedInModal ? (
        <div
          className={`space-y-2.5 ${heroLayout ? "mt-4 pt-0" : "mt-2.5 space-y-2 border-t border-indigo-100/90 pt-2.5"}`}
        >
          {!heroLayout ? (
            <p className="text-center text-[10px] text-slate-600">
              <span className="font-bold tabular-nums text-slate-700">{shortlistPct}%</span>
              <span className="mx-1 text-slate-300" aria-hidden>
                →
              </span>
              <span className="font-bold tabular-nums text-emerald-600">~{projectedShortlist}%</span>
              {selectedUplift > 0 ? (
                <span className="ml-1 font-semibold text-emerald-600">(+{selectedUplift})</span>
              ) : null}
              <span className="mt-0.5 block text-[9px] text-slate-500">estimated shortlist odds</span>
            </p>
          ) : null}

          {!demo && disabled ? (
            <p className="text-center text-[10px] text-amber-800/90">{OPTIMIZE_ALIGN_CARD_HINT}</p>
          ) : null}

          <OptimizeCta
            onClick={() => onOptimize?.()}
            size="lg"
            disabled={ctaDisabled}
            className="w-full"
            variant={heroLayout ? "purple" : "green"}
            showSparkle={heroLayout}
          >
            {busy ? "Starting…" : heroLayout ? OPTIMIZE_CTA_LABEL_HERO : OPTIMIZE_CTA_LABEL}
          </OptimizeCta>

          {heroLayout ? (
            <p className="optimize-align-privacy-note">
              <svg viewBox="0 0 16 16" className="h-3 w-3 shrink-0" fill="currentColor" aria-hidden>
                <path d="M8 1a3 3 0 0 0-3 3v2H4a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1V4a3 3 0 0 0-3-3zm1 5H7V4a1 1 0 1 1 2 0v2z" />
              </svg>
              {OPTIMIZE_ALIGN_PRIVACY_NOTE}
            </p>
          ) : !demo && !disabled ? (
            <p className="text-center text-[10px] font-medium leading-snug text-emerald-800/90">
              {OPTIMIZE_CTA_SUBLINE}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
