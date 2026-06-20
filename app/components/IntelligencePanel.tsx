"use client";

// Intelligence panel driven by /api/analyze LLM result.
// Uses universal score colors, progress bars, and verdict box.

import React from "react";
import Link from "next/link";
import type { ATSAnalyzeResult } from "@/app/lib/atsAnalyze";
import {
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  CHECK_RESUME_AGAINST_JD_PRIMARY_CTA,
} from "@/app/lib/internalLinks";
import {
  getScoreStyle,
  getATSBadgeLabel,
  getATSVerdictLines,
  getATSRingHex,
} from "@/app/lib/scoreColors";
import { buildKeywordScannerResultsData } from "@/app/lib/keywordScannerResults";
import { KeywordScannerResultsPanel } from "@/app/components/KeywordScannerResultsPanel";
import {
  canShareRecruiterReport,
  type ShareRecruiterReportArgs,
} from "@/app/lib/shareRecruiterReport";
import { buildKeywordCoverageMetricInput } from "@/app/lib/evidenceMetricCopy";
import { buildKeywordCoverageMetricFromSkillProof } from "@/app/lib/skillProofLlm";
import { EvidenceIntelligenceSection } from "@/app/components/EvidenceIntelligenceSection";
import type { OptimizationClickSurface } from "@/app/lib/analyticsEvents";
import { AnalysisPreviewIntroBanner } from "@/app/components/postingFit/AnalysisPreviewIntroBanner";
import { AnimatedIntelligenceDashboardPreview } from "@/app/components/postingFit/AnimatedIntelligenceDashboardPreview";

type IntelligencePanelProps = {
  analyzeResult: ATSAnalyzeResult | null;
  showFullIntelligence?: boolean;
  showLocked?: boolean;
  /** When provided, shows optimizer CTA and static before/after sample. */
  onOpenOptimizer?: (surface: OptimizationClickSurface) => void;
  resumeText?: string;
  jobDescription?: string;
  /** False when /api/analyze ran with an empty job description (resume-only ATS scan). */
  analysisUsedJobDescription?: boolean;
  /** Empty-state demo copy: `ats` for ATS-first landing pages. */
  emptyStateVariant?: "jd" | "ats";
  /**
   * `keywordScanner`: emphasize keyword coverage + skill gaps only (hides full ATS/score grid).
   */
  panelVariant?: "default" | "keywordScanner";
  /** Homepage workbench: hero already shows sample dashboard — keep this panel minimal. */
  compactHomeEmpty?: boolean;
  /** Tool pages: minimal empty panel with tool-specific hint. */
  compactToolEmpty?: boolean;
  compactEmptyHint?: string;
  /** Tinted preview column — elevate card on colored workbench background. */
  previewSurface?: boolean;
  /** Show live generation animation while analyze API runs. */
  isAnalyzing?: boolean;
  /** Tool workbench: compact, non-scrolling result preview with optimize CTA above. */
  compactToolResult?: boolean;
  selectedRecommendedFixes?: string[];
  onSelectedRecommendedFixesChange?: (fixes: string[]) => void;
  optimizeDisabled?: boolean;
  optimizeBusy?: boolean;
};

export function IntelligencePanel({
  analyzeResult,
  showFullIntelligence = true,
  showLocked = false,
  onOpenOptimizer,
  resumeText = "",
  jobDescription = "",
  analysisUsedJobDescription = true,
  emptyStateVariant = "jd",
  panelVariant = "default",
  compactHomeEmpty = false,
  compactToolEmpty = false,
  compactEmptyHint,
  previewSurface = false,
  isAnalyzing = false,
  compactToolResult = false,
  selectedRecommendedFixes,
  onSelectedRecommendedFixesChange,
  optimizeDisabled = false,
  optimizeBusy = false,
}: IntelligencePanelProps) {
  const elevatedPanelClass = previewSurface
    ? "rounded-xl border border-slate-200/90 bg-white p-2.5 shadow-xl shadow-black/25 ring-1 ring-white/10 sm:p-3"
    : "rounded-xl bg-white p-2.5 sm:p-3 shadow-sm ring-1 ring-slate-900/[0.06]";
  const elevatedEmptyClass = previewSurface
    ? "flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden bg-transparent"
    : "flex min-h-[min(70vh,34rem)] flex-1 flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm ring-1 ring-slate-900/[0.05]";
  const compactToolResultShellClass = previewSurface
    ? "flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-xl bg-transparent"
    : "flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm ring-1 ring-slate-900/[0.05]";
  const hasAny = !!analyzeResult;
  const emptyAts = emptyStateVariant === "ats";
  const compactEmptyTitle = emptyAts
    ? "Your ATS report appears here"
    : "Your analysis report appears here";
  const isKeywordScanner = panelVariant === "keywordScanner";

  if (showLocked) {
    return (
      <section className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-900/[0.06]">
        <div className="relative">
          <div className="absolute inset-0 rounded-xl bg-slate-100/90 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="text-center p-4">
              <p className="text-sm font-medium text-slate-700">
                Buy a resume optimization pack to unlock full Intelligence insights for your resume.
              </p>
              <a
                href="#ats-checker-form"
                className="mt-3 inline-block rounded-full bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition"
              >
                Buy a pack
              </a>
            </div>
          </div>
          <h2 className="text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase mb-4">
            Intelligence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 opacity-40">
            <div className="rounded-xl bg-slate-100 h-20" />
            <div className="rounded-xl bg-slate-100 h-20" />
            <div className="rounded-xl bg-slate-100 h-20" />
          </div>
        </div>
      </section>
    );
  }

  // Empty state — keep light until the user runs a check (hero shows illustrative preview).
  if (!hasAny) {
    if (compactHomeEmpty || compactToolEmpty) {
      const hint =
        compactEmptyHint ??
        (compactHomeEmpty
          ? "Paste on the left and run a check. Your scores replace the sample readout above."
          : emptyAts
            ? "Paste your resume on the left and run a free ATS check."
            : isKeywordScanner
              ? "Paste your resume and a job posting, then scan for keyword gaps."
              : "Paste resume and job description on the left, then run evidence match and optimization.");

      if (isKeywordScanner) {
        return (
          <section
            className="rounded-xl border border-dashed border-slate-200 bg-slate-50/90 px-4 py-8 text-center ring-1 ring-slate-900/[0.04] sm:px-6"
            aria-label="Keyword scan results"
          >
            {isAnalyzing ? (
              <>
                <div
                  className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-emerald-100 border-t-emerald-600"
                  aria-hidden
                />
                <p className="mt-3 text-sm font-medium text-slate-800">Scanning for keyword gaps…</p>
              </>
            ) : (
              <>
                <p className="text-sm font-medium text-slate-800">Keyword gap results appear here</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{hint}</p>
              </>
            )}
          </section>
        );
      }

      if (previewSurface) {
        return (
          <section
            className={`mx-auto flex w-full min-w-0 flex-1 flex-col pb-2 sm:pb-3 ${
              isAnalyzing ? "h-full min-h-full" : ""
            }`}
            aria-label={compactEmptyTitle}
          >
            <div className={`flex w-full flex-col ${isAnalyzing ? "min-h-0 flex-1" : ""}`}>
              <AnimatedIntelligenceDashboardPreview
                isAnalyzing={isAnalyzing}
                previewVariant="fullDashboard"
              />
            </div>
          </section>
        );
      }

      return (
        <div className="flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden">
          <div className="shrink-0 border-b border-slate-100 px-2 pt-2 pb-2 sm:px-3 sm:pt-2.5">
            <AnalysisPreviewIntroBanner
              isAnalyzing={isAnalyzing}
              darkSurface={false}
            />
          </div>
          <section className={`${elevatedEmptyClass} flex min-h-0 flex-1 flex-col`} aria-label={compactEmptyTitle}>
            <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden p-2 pt-0 sm:p-2.5 sm:pt-0">
              <AnimatedIntelligenceDashboardPreview
                hint={hint}
                isAnalyzing={isAnalyzing}
                previewVariant="fullDashboard"
              />
            </div>
          </section>
        </div>
      );
    }

    const emptyBullets = emptyAts
      ? [
          "ATS readability and parsing risk",
          "Structure, headings, and bullet clarity",
          "Optional: add a job description for evidence match",
        ]
      : [
          "Job description match score (Evidence Match)",
          "JD skill proof map and topic coverage",
          "Honest gap callouts plus optimize option",
        ];

    return (
      <section className="rounded-xl bg-white p-5 sm:p-6 shadow-sm ring-1 ring-slate-900/[0.06]">
        <div className="flex flex-col items-center px-2 py-6 text-center sm:py-8">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 to-indigo-100 text-2xl shadow-inner"
            aria-hidden
          >
            📊
          </div>
          <h2 className="mt-4 text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
            Your analysis report appears here
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-600">
            {emptyAts
              ? "Paste your resume on the left and run a free ATS check. Add a job description anytime for evidence match."
              : "Paste your resume and job description on the left, then run a free check."}
          </p>
          <ul className="mt-6 w-full max-w-md space-y-2.5 text-left text-sm text-slate-700">
            {emptyBullets.map((line) => (
              <li key={line} className="flex gap-2.5 rounded-lg border border-slate-100 bg-slate-50/80 px-3 py-2">
                <span className="mt-0.5 font-semibold text-emerald-600" aria-hidden>
                  ✓
                </span>
                <span className="leading-snug">{line}</span>
              </li>
            ))}
          </ul>
          <a
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="mt-6 text-sm font-semibold text-sky-800 underline underline-offset-2 hover:text-sky-950"
          >
            Jump to paste fields
          </a>
        </div>
      </section>
    );
  }

  // Live analysis - ATS dashboard (flat JSON from /api/analyze)
  const atsScore = analyzeResult?.ats_score ?? 0;
  const keywordCoverageRaw = analyzeResult?.keyword_coverage;
  const evidenceDashboard = analyzeResult?.evidence_dashboard;
  const matchedSkills = analyzeResult?.matched_skills ?? [];
  const missingSkills = analyzeResult?.missing_skills ?? [];
  const missingRequired = analyzeResult?.missing_skills_required ?? [];
  const missingPreferred = analyzeResult?.missing_skills_preferred ?? [];
  const hasRequiredPreferred = missingRequired.length > 0 || missingPreferred.length > 0;
  const keywordScannerData =
    isKeywordScanner && analyzeResult && analysisUsedJobDescription
      ? buildKeywordScannerResultsData(analyzeResult)
      : null;

  const atsStyle = getScoreStyle(atsScore);
  const atsRingHex = getATSRingHex(atsScore);
  const atsVerdict = getATSVerdictLines(atsScore);
  const shareRecruiterReport: ShareRecruiterReportArgs | null =
    analyzeResult &&
    evidenceDashboard &&
    canShareRecruiterReport(analyzeResult, evidenceDashboard, analysisUsedJobDescription)
      ? {
          analyzeResult,
          evidenceDashboard,
        }
      : null;
  const keywordCoverageMetric =
    buildKeywordCoverageMetricFromSkillProof(
      evidenceDashboard?.skillProofAll ?? evidenceDashboard?.skillProof
    ) ??
    buildKeywordCoverageMetricInput({
      score: keywordCoverageRaw,
      matchedSkills,
      missingSkills,
    });

  if (compactToolResult && previewSurface) {
    return (
      <section className={`${compactToolResultShellClass} h-full w-full`} aria-label="Your analysis report">
        <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden p-2 sm:p-2.5">
          <div className="relative flex h-full min-h-0 flex-1 flex-col overflow-hidden">
            <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-xl shadow-black/25 ring-1 ring-slate-900/[0.04]">
              <div className="flex shrink-0 flex-wrap items-center justify-between gap-x-2 gap-y-1 border-b border-slate-100 px-2.5 py-2 sm:px-3">
                <div className="flex min-w-0 flex-col gap-0.5">
                  <h2 className="intelligence-panel-title">
                    {isKeywordScanner ? "Keyword scan" : "Intelligence"}
                  </h2>
                  <p className="intelligence-panel-subtitle truncate">
                    {isKeywordScanner
                      ? "Keyword gaps vs this posting"
                      : analysisUsedJobDescription
                        ? "Evidence match, keyword coverage, and alignment actions"
                        : "ATS readability snapshot"}
                  </p>
                </div>
                <span className="intelligence-result-badge inline-flex shrink-0 items-center rounded-full">
                  Your result
                </span>
              </div>

              <div className="preview-panel-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-2.5 pb-4 pt-1.5 sm:px-3 sm:pb-5 sm:pt-2">
                {isKeywordScanner && keywordScannerData ? (
                  <KeywordScannerResultsPanel data={keywordScannerData} compact />
                ) : evidenceDashboard && analysisUsedJobDescription ? (
                  <>
                    <EvidenceIntelligenceSection
                      dashboard={evidenceDashboard}
                      keywordCoverage={keywordCoverageMetric}
                      bulletPreview={analyzeResult?.bullet_preview ?? undefined}
                      shareReport={shareRecruiterReport}
                      takeawayHeadline={analyzeResult?.summary}
                      selectedRecommendedFixes={selectedRecommendedFixes}
                      onSelectedRecommendedFixesChange={onSelectedRecommendedFixesChange}
                      onOptimize={
                        onOpenOptimizer ? () => onOpenOptimizer("intelligence_panel") : undefined
                      }
                      optimizeDisabled={optimizeDisabled}
                      optimizeBusy={optimizeBusy}
                    />
                  </>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: atsStyle.bgHex }}
                      >
                        <div
                          className="absolute inset-0 rounded-full border-[3px]"
                          style={{ borderColor: atsRingHex }}
                        />
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-white shadow-sm">
                          <span className="text-xl font-bold text-slate-900 tabular-nums">
                            {atsScore}%
                          </span>
                        </div>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900">ATS readability</p>
                        <p
                          className="mt-0.5 inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold"
                          style={{
                            color: atsStyle.hex,
                            backgroundColor: atsStyle.bgHex,
                            borderColor: atsStyle.hex,
                          }}
                        >
                          {getATSBadgeLabel(atsScore)}
                        </p>
                      </div>
                    </div>
                    <div
                      className="flex items-start gap-2 rounded-lg border px-2.5 py-2"
                      style={{ backgroundColor: atsStyle.bgHex, borderColor: atsStyle.hex }}
                    >
                      <span
                        className="mt-0.5 h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: atsStyle.hex }}
                        aria-hidden
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold leading-snug text-slate-900">
                          {atsVerdict.headline}
                        </p>
                        <p className="mt-0.5 text-[11px] leading-snug text-slate-700">
                          {atsVerdict.subline}
                        </p>
                      </div>
                    </div>
                    {!analysisUsedJobDescription ? (
                      <Link
                        href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
                        className="inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
                      >
                        {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
                      </Link>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={elevatedPanelClass}>
      {/* Compact header: title + description, live result badge */}
      <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-0.5">
        <div className="flex items-baseline gap-2 min-w-0">
          <h2 className="text-[10px] font-semibold tracking-[0.2em] text-slate-500 uppercase shrink-0">
            {isKeywordScanner ? "Keyword scan" : "Intelligence"}
          </h2>
          <p className="text-xs text-slate-600 truncate sm:truncate-none">
            {isKeywordScanner
              ? "Missing keywords, weak coverage, and term frequency vs your job posting."
              : analysisUsedJobDescription
                ? "How much of this job your resume proves in real work, plus honest gaps."
                : "ATS-focused scores from your resume text (no job description used)."}
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center rounded-full border border-emerald-500/50 bg-emerald-50 text-emerald-700 px-2 py-0.5 text-[11px] font-medium">
          Your result. Fix below.
        </span>
      </div>

      {keywordScannerData ? (
        <div className="mt-3">
          <KeywordScannerResultsPanel data={keywordScannerData} />
        </div>
      ) : null}

      {evidenceDashboard && analysisUsedJobDescription && !isKeywordScanner ? (
        <EvidenceIntelligenceSection
          dashboard={evidenceDashboard}
          keywordCoverage={keywordCoverageMetric}
          bulletPreview={analyzeResult?.bullet_preview ?? undefined}
          shareReport={shareRecruiterReport}
          takeawayHeadline={analyzeResult?.summary}
          selectedRecommendedFixes={selectedRecommendedFixes}
          onSelectedRecommendedFixesChange={onSelectedRecommendedFixesChange}
          onOptimize={
            onOpenOptimizer ? () => onOpenOptimizer("intelligence_panel") : undefined
          }
          optimizeDisabled={optimizeDisabled}
          optimizeBusy={optimizeBusy}
        />
      ) : null}

      {/* ATS hero when no JD evidence dashboard (resume-only scan) */}
      {!isKeywordScanner && !(evidenceDashboard && analysisUsedJobDescription) ? (
        <>
      <div className="mt-3 flex items-center gap-3 sm:gap-4 py-1">
        <div
          className="relative flex items-center justify-center h-20 w-20 sm:h-24 sm:w-24 rounded-full flex-shrink-0"
          style={{ backgroundColor: atsStyle.bgHex }}
        >
          <div
            className="absolute inset-0 rounded-full border-4"
            style={{ borderColor: atsRingHex }}
          />
          <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-white flex items-center justify-center border-2 border-white shadow-sm">
            <span className="text-2xl sm:text-3xl font-bold text-slate-900">{atsScore}%</span>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-900">ATS readability</p>
          <p
            className="mt-1 inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold"
            style={{
              color: atsStyle.hex,
              backgroundColor: atsStyle.bgHex,
              borderColor: atsStyle.hex,
            }}
          >
            {getATSBadgeLabel(atsScore)}
          </p>
          <p className="mt-0.5 text-xs text-slate-500">Resume scan only - no job description</p>
        </div>
      </div>

      <div
        className="mt-3 flex items-start gap-2.5 rounded-lg border px-3 py-2.5"
        style={{ backgroundColor: atsStyle.bgHex, borderColor: atsStyle.hex }}
      >
        <span
          className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full"
          style={{ backgroundColor: atsStyle.hex }}
          aria-hidden
        />
        <div className="min-w-0">
          <p className="text-[10px] font-semibold text-slate-600">Quick takeaway</p>
          <p className="mt-1 text-xs font-semibold text-slate-900 leading-snug">{atsVerdict.headline}</p>
          <p className="mt-0.5 text-xs text-slate-700 leading-snug">{atsVerdict.subline}</p>
        </div>
      </div>

      {!analysisUsedJobDescription ? (
        <div className="mt-3 rounded-xl border border-sky-200 bg-gradient-to-br from-sky-50 to-white px-3 py-3 sm:px-4 sm:py-3.5">
          <p className="text-sm font-semibold text-slate-900">Want better results?</p>
          <p className="mt-1 text-xs text-slate-700 leading-snug">
            Compare your resume with a job description to see keyword overlap, missing skills, and a
            match-style score for that posting.
          </p>
          <Link
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="mt-3 inline-flex w-full sm:w-auto items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm ring-1 ring-slate-900/10 transition hover:bg-slate-800"
          >
            {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
          </Link>
        </div>
      ) : null}
        </>
      ) : null}

      {analysisUsedJobDescription || matchedSkills.length > 0 || missingSkills.length > 0 ? (
        <>
          {!isKeywordScanner && !evidenceDashboard ? (
          <div className="mt-3 rounded-xl bg-slate-50/80 px-2.5 py-2.5">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">
              Matched skills
            </p>
            {matchedSkills.length ? (
              <div className="flex flex-wrap gap-2">
                {matchedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium"
                    style={{ backgroundColor: "#ECFDF5", color: "#16A34A" }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500">No explicit skill matches detected yet.</p>
            )}
          </div>
          ) : null}

          {!isKeywordScanner && !evidenceDashboard ? (
          <div className="mt-2.5 rounded-xl bg-slate-50/80 px-2.5 py-2.5">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">
              Missing skills (from JD)
            </p>
            {!missingSkills.length ? (
              <p className="text-xs text-slate-600" style={{ color: "#16A34A" }}>
                No major missing skills detected compared to the JD.
              </p>
            ) : hasRequiredPreferred ? (
              <div className="space-y-2">
                {missingRequired.length > 0 && (
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-red-700 mb-1.5">
                      Required
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {missingRequired.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium"
                          style={{ backgroundColor: "#FEF2F2", color: "#EF4444" }}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-[#EF4444]" aria-hidden />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {missingPreferred.length > 0 && (
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-700 mb-1.5">
                      Preferred
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {missingPreferred.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium"
                          style={{ backgroundColor: "#FFFBEB", color: "#D97706" }}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-[#D97706]" aria-hidden />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {missingSkills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium"
                    style={{ backgroundColor: "#FEF2F2", color: "#EF4444" }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#EF4444]" aria-hidden />
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
          ) : null}
        </>
      ) : null}
    </section>
  );
}

