"use client";

import { useState } from "react";
import { OptimizeSkillProofSection } from "@/app/components/OptimizeSkillProofSection";
import {
  buildOptimizeBenefitItems,
  OPTIMIZE_ATS_BADGE_LABEL,
  optimizeAtsBadgeTooltip,
  OPTIMIZE_BENEFITS_TITLE,
  OPTIMIZE_FIXES_SECTION_SUBTITLE,
  OPTIMIZE_FIXES_SECTION_TITLE,
  OPTIMIZE_GAPS_SECTION_SUBTITLE,
  OPTIMIZE_GAPS_SECTION_TITLE,
  OPTIMIZE_HERO_SUBTITLE,
  OPTIMIZE_HERO_TITLE,
  OPTIMIZE_KEYWORDS_SECTION_TITLE,
  recommendedFixShortTitle,
  type OptimizeBenefitItem,
} from "@/app/lib/optimizeResultsCopy";
import type { AppliedFixOutcome } from "@/app/lib/recommendedFixes";
import {
  extractFixDisplayChips,
  recommendedFixActionLabel,
  recommendedFixToOptimizeText,
  resolveRecommendedFixInput,
  type RecommendedFix,
} from "@/app/lib/recommendedFixes";
import { describeJdGapEvidence, type JdGapDetail } from "@/app/lib/skillGapRules";
import type { OptimizedSkillProofRow } from "@/app/lib/resumeEvidenceScore";

export type ResumeOptimizationPanelProps = {
  surfacedKeywords: string[];
  bulletsRefined: number;
  bulletsAdded?: number;
  projectsRefined?: number;
  summaryTailored: boolean;
  jdGapsRemaining: number;
  jdGapDetails?: JdGapDetail[];
  improvedSkillProof?: OptimizedSkillProofRow[];
  evidenceMatchDelta?: number;
  atsScoreReference?: number;
  weakKeywordsStrengthened?: number;
  /** Per-fix outcomes after optimize (preferred). */
  appliedFixOutcomes?: AppliedFixOutcome[];
  /** @deprecated Use appliedFixOutcomes — legacy optimize text lines. */
  selectedFixes?: string[];
  /** All recommended fixes from analyze (for unselected count). */
  availableRecommendedFixes?: RecommendedFix[];
  onDownloadPdf: () => void;
  onDownloadDocx: () => void;
  onScrollToPreview?: () => void;
};

function BenefitIconSvg({ icon }: { icon: OptimizeBenefitItem["icon"] }) {
  const base = "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ring-1";
  const svgClass = "h-4 w-4";
  const tones: Record<OptimizeBenefitItem["icon"], string> = {
    ats: "bg-emerald-100 text-emerald-800 ring-emerald-200/70",
    summary: "bg-indigo-100 text-indigo-800 ring-indigo-200/70",
    bullets: "bg-sky-100 text-sky-800 ring-sky-200/70",
    fixes: "bg-teal-100 text-teal-800 ring-teal-200/70",
    keywords: "bg-amber-100 text-amber-900 ring-amber-200/70",
    edit: "bg-violet-100 text-violet-800 ring-violet-200/70",
    match: "bg-cyan-100 text-cyan-800 ring-cyan-200/70",
    download: "bg-blue-100 text-blue-800 ring-blue-200/70",
    gaps: "bg-orange-100 text-orange-900 ring-orange-200/70",
    skipped: "bg-slate-100 text-slate-700 ring-slate-200/70",
  };
  const tone = tones[icon] ?? tones.skipped;

  switch (icon) {
    case "ats":
      return (
        <span className={`${base} ${tone}`} aria-hidden>
          <svg viewBox="0 0 20 20" className={svgClass} fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M6 2.5h5.2L15 6.3v11.2H6V2.5z" strokeLinejoin="round" />
            <path d="M11 2.5V6.5H15" strokeLinejoin="round" />
            <path d="M8 10.5l1.5 1.5L12.5 9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      );
    case "summary":
      return (
        <span className={`${base} ${tone}`} aria-hidden>
          <svg viewBox="0 0 20 20" className={svgClass} fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M4 5.5h12M4 9.5h9M4 13.5h11" strokeLinecap="round" />
          </svg>
        </span>
      );
    case "bullets":
      return (
        <span className={`${base} ${tone}`} aria-hidden>
          <svg viewBox="0 0 20 20" className={svgClass} fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M8 6h8M8 10h8M8 14h8" strokeLinecap="round" />
            <path d="M5 6h.01M5 10h.01M5 14h.01" strokeLinecap="round" strokeWidth="2.4" />
          </svg>
        </span>
      );
    case "fixes":
      return (
        <span className={`${base} ${tone}`} aria-hidden>
          <svg viewBox="0 0 20 20" className={svgClass} fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="10" cy="10" r="6.5" />
            <path d="M7 10.2 9.2 12.5 13.5 8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      );
    case "keywords":
      return (
        <span className={`${base} ${tone}`} aria-hidden>
          <svg viewBox="0 0 20 20" className={svgClass} fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M11.5 3.5 16.5 8.5 8.5 16.5H3.5v-5L11.5 3.5z" strokeLinejoin="round" />
            <circle cx="7.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
          </svg>
        </span>
      );
    case "edit":
      return (
        <span className={`${base} ${tone}`} aria-hidden>
          <svg viewBox="0 0 20 20" className={svgClass} fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M12.5 3.5 16.5 7.5 8 16H4v-4l8.5-8.5z" strokeLinejoin="round" />
            <path d="M11 5 15 9" strokeLinecap="round" />
          </svg>
        </span>
      );
    case "match":
      return (
        <span className={`${base} ${tone}`} aria-hidden>
          <svg viewBox="0 0 20 20" className={svgClass} fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M4 14.5 8 10.5 11 13.5 16 7.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13 7.5h3v3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      );
    case "download":
      return (
        <span className={`${base} ${tone}`} aria-hidden>
          <svg viewBox="0 0 20 20" className={svgClass} fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M10 3.5v9" strokeLinecap="round" />
            <path d="M6.5 9 10 12.5 13.5 9" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 16.5h12" strokeLinecap="round" />
          </svg>
        </span>
      );
    case "gaps":
      return (
        <span className={`${base} ${tone}`} aria-hidden>
          <svg viewBox="0 0 20 20" className={svgClass} fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="10" cy="10" r="6.5" />
            <path d="M10 7v4" strokeLinecap="round" />
            <circle cx="10" cy="13.25" r="0.75" fill="currentColor" stroke="none" />
          </svg>
        </span>
      );
    case "skipped":
      return (
        <span className={`${base} ${tone}`} aria-hidden>
          <svg viewBox="0 0 20 20" className={svgClass} fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M10 3.5 3.5 16h13L10 3.5z" strokeLinejoin="round" />
            <path d="M10 8v3.5" strokeLinecap="round" />
            <circle cx="10" cy="13.75" r="0.75" fill="currentColor" stroke="none" />
          </svg>
        </span>
      );
    default:
      return (
        <span className={`${base} ${tone}`} aria-hidden>
          <svg viewBox="0 0 20 20" className={svgClass} fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="10" cy="10" r="6.5" />
            <path d="M10 7v6" strokeLinecap="round" />
          </svg>
        </span>
      );
  }
}

function AtsBadge({ score }: { score?: number }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-flex">
      <button
        type="button"
        className="inline-flex items-center gap-1 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-100 ring-1 ring-emerald-400/20 hover:bg-emerald-500/25"
        aria-label={`${OPTIMIZE_ATS_BADGE_LABEL}. ${optimizeAtsBadgeTooltip(score)}`}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        <span aria-hidden>✓</span>
        {OPTIMIZE_ATS_BADGE_LABEL}
        <span className="text-emerald-200/80" aria-hidden>
          ⓘ
        </span>
      </button>
      {open ? (
        <span
          role="tooltip"
          className="absolute left-0 top-full z-10 mt-1.5 w-56 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-2 text-[10px] leading-snug text-slate-100 shadow-lg"
        >
          {optimizeAtsBadgeTooltip(score)}
        </span>
      ) : null}
    </span>
  );
}

export function ResumeOptimizationPanel({
  surfacedKeywords,
  bulletsRefined,
  bulletsAdded = 0,
  projectsRefined = 0,
  summaryTailored,
  jdGapsRemaining,
  jdGapDetails = [],
  improvedSkillProof = [],
  evidenceMatchDelta,
  atsScoreReference,
  weakKeywordsStrengthened = 0,
  appliedFixOutcomes = [],
  selectedFixes = [],
  availableRecommendedFixes = [],
  onDownloadPdf,
  onDownloadDocx,
  onScrollToPreview,
}: ResumeOptimizationPanelProps) {
  const fixOutcomes: AppliedFixOutcome[] =
    appliedFixOutcomes.length > 0
      ? appliedFixOutcomes
      : selectedFixes.map((fixText) => ({
          fixText,
          action: recommendedFixShortTitle(fixText),
          applied: true,
        }));
  const selectedSet = new Set(selectedFixes.map((f) => f.trim().toLowerCase()));
  const unselectedFixes = availableRecommendedFixes.filter(
    (fix) => !selectedSet.has(recommendedFixToOptimizeText(fix).trim().toLowerCase())
  );
  const kwCount = surfacedKeywords.length;

  const benefits = buildOptimizeBenefitItems({
    atsScore: atsScoreReference,
    summaryTailored,
    bulletsRefined,
    bulletsAdded,
    projectsRefined,
    selectedFixCount: fixOutcomes.length,
    unselectedFixCount: unselectedFixes.length,
    keywordCount: kwCount,
    evidenceMatchDelta,
    jdGapsRemaining,
  });

  return (
    <div className="flex flex-col gap-3">
      {/* Hero + download */}
      <div className="payment-glow-shell payment-glow-card shadow-md">
        <section className="payment-glow-card-inner bg-gradient-to-br from-slate-900 to-slate-800 p-4 text-white">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="text-base font-bold tracking-tight">{OPTIMIZE_HERO_TITLE}</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-300">{OPTIMIZE_HERO_SUBTITLE}</p>
            </div>
            <AtsBadge score={atsScoreReference} />
          </div>
          <div className="mt-3 flex flex-col gap-2">
            <button
              type="button"
              onClick={onDownloadPdf}
              className="inline-flex flex-1 items-center justify-center rounded-lg bg-white px-3 py-2.5 text-xs font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100"
            >
              Download PDF
            </button>
            <button
              type="button"
              onClick={onDownloadDocx}
              className="inline-flex flex-1 items-center justify-center rounded-lg border border-white/25 bg-white/5 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-white/10"
            >
              Download editable file
            </button>
          </div>
        </section>
      </div>

      {/* Benefits */}
      <section className="rounded-xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/40 p-4 shadow-sm">
        <h3 className="text-sm font-semibold tracking-tight text-slate-900">{OPTIMIZE_BENEFITS_TITLE}</h3>
        <ul className="mt-3 divide-y divide-slate-100 rounded-xl border border-slate-100 bg-white/90">
          {benefits.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-3 bg-white px-3 py-2.5"
            >
              <BenefitIconSvg icon={item.icon} />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold leading-snug text-slate-900">{item.title}</p>
                {item.detail ? (
                  <p className="mt-0.5 text-[11px] leading-snug text-slate-500">{item.detail}</p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Selected fixes */}
      {fixOutcomes.length > 0 ? (
        <section className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                {OPTIMIZE_FIXES_SECTION_TITLE}{" "}
                <span className="font-normal text-emerald-600">({fixOutcomes.length} applied)</span>
              </h3>
              <p className="mt-0.5 text-[11px] leading-snug text-slate-500">
                {OPTIMIZE_FIXES_SECTION_SUBTITLE}
              </p>
            </div>
            {onScrollToPreview ? (
              <button
                type="button"
                onClick={onScrollToPreview}
                className="shrink-0 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800"
              >
                View resume →
              </button>
            ) : null}
          </div>
          <ul className="mt-2.5 space-y-2">
            {fixOutcomes.map((outcome) => {
              const parsedFix = resolveRecommendedFixInput(outcome.fixText);
              const fixKeywords = extractFixDisplayChips(
                parsedFix ?? outcome.fixText,
                4
              );
              return (
                <li
                  key={outcome.fixText}
                  className="rounded-lg border border-slate-100 bg-white px-2.5 py-2 shadow-sm"
                >
                  <div className="flex gap-2">
                    <span
                      className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[9px] font-bold text-white"
                      aria-hidden
                    >
                      ✓
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold leading-snug text-slate-900">
                        {parsedFix
                          ? recommendedFixActionLabel(parsedFix)
                          : recommendedFixActionLabel({
                              action: outcome.action,
                              target: null,
                              section: null,
                              detail: null,
                            })}
                      </p>
                      {fixKeywords.length > 0 ? (
                        <p className="mt-1.5 flex flex-wrap gap-1">
                          {fixKeywords.map((kw) => (
                            <span
                              key={`${outcome.fixText}-${kw}`}
                              className="inline-flex rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-900 ring-1 ring-emerald-100"
                            >
                              {kw}
                            </span>
                          ))}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      {/* Keywords */}
      {kwCount > 0 ? (
        <section className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900">{OPTIMIZE_KEYWORDS_SECTION_TITLE}</h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {surfacedKeywords.map((kw) => (
              <span
                key={kw}
                className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${
                  weakKeywordsStrengthened > 0
                    ? "bg-amber-50 text-amber-950 ring-amber-200/80"
                    : "bg-sky-50 text-sky-900 ring-sky-200/80"
                }`}
              >
                {kw}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      {improvedSkillProof.length > 0 ? (
        <OptimizeSkillProofSection rows={improvedSkillProof} />
      ) : null}

      {jdGapDetails.length > 0 ? (
        <section className="rounded-xl border border-amber-200/80 bg-amber-50/40 p-3.5">
          <h3 className="text-sm font-semibold text-amber-950">{OPTIMIZE_GAPS_SECTION_TITLE}</h3>
          <p className="mt-0.5 text-[11px] text-amber-900/75">{OPTIMIZE_GAPS_SECTION_SUBTITLE}</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {jdGapDetails.map((gap) => (
              <li
                key={gap.phrase}
                className="rounded-md border border-amber-200/70 bg-white/90 px-2 py-1 text-[11px] font-medium text-amber-950"
                title={describeJdGapEvidence(gap)}
              >
                {gap.phrase}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
