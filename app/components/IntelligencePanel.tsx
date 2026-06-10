"use client";

// Intelligence panel driven by /api/analyze LLM result.
// Uses universal score colors, progress bars, verdict box, and improvement tips.

import React from "react";
import Link from "next/link";
import type { ATSAnalyzeResult } from "@/app/lib/atsAnalyze";
import { buildExperienceAlignmentSubtitle } from "@/app/lib/experienceCopy";
import {
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  CHECK_RESUME_AGAINST_JD_PRIMARY_CTA,
} from "@/app/lib/internalLinks";
import {
  getScoreStyle,
  getATSBadgeLabel,
  getATSVerdictLines,
  getATSRingHex,
  getKeywordCoverageStyle,
  getKeywordCoverageLabel,
  getSemanticStyle,
  getExperienceAlignmentStyle,
  getImpactStyle,
  getResumeQualityStyle,
} from "@/app/lib/scoreColors";
import { DEMO_EVIDENCE_BULLET_PREVIEW } from "@/app/lib/demoEvidenceDashboard";
import { EvidenceIntelligenceSection, ScoreBar } from "@/app/components/EvidenceIntelligenceSection";
import type { OptimizationClickSurface } from "@/app/lib/analyticsEvents";
import { AnimatedIntelligenceDashboardPreview } from "@/app/components/postingFit/AnimatedIntelligenceDashboardPreview";
import { OptimizePreviewBanner } from "@/app/components/postingFit/OptimizePreviewBanner";

const OPTIMIZER_STATIC_BULLET_PREVIEW = DEMO_EVIDENCE_BULLET_PREVIEW;

/** Bold missing skills (from JD) and numbers/metrics (18%, 2x, 3+) in "After" text. */
function highlightImprovementsInText(text: string, keywords: string[]): React.ReactNode {
  const escapedKeywords = (keywords ?? [])
    .filter((k) => k.trim().length > 0)
    .sort((a, b) => b.length - a.length)
    .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  // Match whole phrases/words (word boundaries) so we bold missing skills clearly; also match metrics
  const combined =
    escapedKeywords.length > 0
      ? new RegExp(
          `(\\b(?:${escapedKeywords.join("|")})\\b|\\d+%|\\d+x|\\d+\\+?)`,
          "gi"
        )
      : /(\d+%|\d+x|\d+\+?)/gi;
  const parts = text.split(combined);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-slate-900">
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </>
  );
}

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
}: IntelligencePanelProps) {
  const elevatedPanelClass = previewSurface
    ? "rounded-xl border border-slate-200/90 bg-white p-2.5 shadow-xl shadow-black/25 ring-1 ring-white/10 sm:p-3"
    : "rounded-xl bg-white p-2.5 sm:p-3 shadow-sm ring-1 ring-slate-900/[0.06]";
  const elevatedEmptyClass = previewSurface
    ? "flex min-h-[min(82vh,42rem)] flex-1 flex-col overflow-hidden rounded-xl bg-transparent"
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
          ? "Paste on the left and run a check. Your scores replace the sample dashboard above."
          : emptyAts
            ? "Paste your resume on the left and run a free ATS check."
            : "Paste resume and job description on the left, then run evidence match and optimization.");

      return (
        <section className={elevatedEmptyClass} aria-label={compactEmptyTitle}>
          <AnimatedIntelligenceDashboardPreview hint={hint} isAnalyzing={isAnalyzing} />
        </section>
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
          "Skill-by-skill proof map and topic coverage",
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
  const keywordNotApplicable = keywordCoverageRaw === null;
  const keywordScore =
    typeof keywordCoverageRaw === "number" ? keywordCoverageRaw : 0;
  const semanticScore = analyzeResult?.semantic_similarity ?? 0;
  const experienceScore = analyzeResult?.experience_alignment ?? 0;
  const requiredYearsExperience = analyzeResult?.required_years_experience ?? null;
  const requiredYearsExperienceMax =
    analyzeResult?.required_years_experience_max ?? null;
  const resumeYearsExperience = analyzeResult?.resume_years_experience ?? 0;
  const impactScore = analyzeResult?.impact_score ?? 0;
  const qualityScore = analyzeResult?.resume_quality ?? 0;
  const evidenceDashboard = analyzeResult?.evidence_dashboard;
  const matchedSkills = analyzeResult?.matched_skills ?? [];
  const missingSkills = analyzeResult?.missing_skills ?? [];
  const missingRequired = analyzeResult?.missing_skills_required ?? [];
  const missingPreferred = analyzeResult?.missing_skills_preferred ?? [];
  const hasRequiredPreferred = missingRequired.length > 0 || missingPreferred.length > 0;

  const atsStyle = getScoreStyle(atsScore);
  const atsRingHex = getATSRingHex(atsScore);
  const atsVerdict = getATSVerdictLines(atsScore);
  const semanticStyle = getSemanticStyle(semanticScore);
  const expAlignment = getExperienceAlignmentStyle(
    requiredYearsExperience,
    requiredYearsExperienceMax,
    resumeYearsExperience,
    experienceScore
  );
  const impactStyle = getImpactStyle(impactScore);
  const qualityStyle = getResumeQualityStyle(qualityScore);
  const totalKeywords = matchedSkills.length + missingSkills.length;
  const keywordLabel = keywordNotApplicable
    ? "Not applicable"
    : getKeywordCoverageLabel(keywordScore);

  const improvementTips: string[] = [];
  if (analysisUsedJobDescription) {
    if (missingSkills.length > 0) {
      improvementTips.push(
        hasRequiredPreferred && missingRequired.length > 0
          ? `Strengthen evidence for ${missingRequired.length} required JD skill${missingRequired.length === 1 ? "" : "s"} in project bullets (only where your experience supports it)`
          : `Map ${missingSkills.length} JD skill${missingSkills.length === 1 ? "" : "s"} to project proof in your experience section`
      );
    }
    if (impactScore < 70) {
      improvementTips.push(
        "Upgrade weak bullets with measurable outcomes already in your work (do not invent metrics)"
      );
    }
    if (
      typeof keywordCoverageRaw === "number" &&
      keywordScore < 70 &&
      missingSkills.length > 0 &&
      !evidenceDashboard
    ) {
      improvementTips.push(
        "Move JD skills from lists into project bullets where you have real evidence"
      );
    }
    if (qualityScore < 70) {
      improvementTips.push(
        "Improve structure: use bullet points and clear Skills/Experience sections"
      );
    }
  } else {
    if (atsScore < 70) {
      improvementTips.push(
        "Simplify layout: avoid tables, multi-column text, and icons that confuse ATS parsers"
      );
    }
    if (qualityScore < 70) {
      improvementTips.push(
        "Use standard headings (Experience, Education, Skills) and plain bullet lists"
      );
    }
    if (impactScore < 70) {
      improvementTips.push("Add measurable outcomes (%, $, scale) so parsed bullets read stronger");
    }
    improvementTips.push(
      "Use “Want better results?” above to open the job description checker for keyword alignment and match scoring."
    );
  }

  const showEvidenceOptimizeInsideDashboard =
    Boolean(evidenceDashboard && analysisUsedJobDescription && !isKeywordScanner);

  const evidenceOptimizeCard =
    onOpenOptimizer != null ? (
      (() => {
        const evidenceNow = evidenceDashboard?.evidenceMatch ?? 0;
        const potentialNum = evidenceNow < 88 ? Math.min(88, evidenceNow + 12) : 92;
        const delta = Math.max(0, potentialNum - evidenceNow);
        return (
          <div className="mt-2 rounded-lg bg-slate-50 px-2 py-1.5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Close evidence gaps for this job
                </h3>
                {missingSkills.length > 0 && (
                  <p className="text-xs text-slate-600 mt-0.5">
                    Surface proof for JD skills in project bullets where your experience supports it
                    {hasRequiredPreferred && missingRequired.length > 0
                      ? ` (${missingRequired.length} required gap${missingRequired.length === 1 ? "" : "s"} left honest if unsupported)`
                      : ""}
                  </p>
                )}
                <div className="mt-0.5 flex items-baseline gap-1.5">
                  <span className="text-base font-bold text-slate-700 tabular-nums">
                    {evidenceDashboard ? `${evidenceNow}%` : `${atsScore}%`}
                  </span>
                  <span className="text-slate-300" aria-hidden>
                    →
                  </span>
                  <span className="text-base font-bold text-emerald-600 tabular-nums">
                    {evidenceDashboard ? `${potentialNum}%` : "90+"}
                  </span>
                  {delta > 0 && (
                    <span className="text-xs font-semibold text-emerald-600 ml-0.5">
                      +{delta} evidence match possible
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-center sm:items-end gap-1">
                <button
                  type="button"
                  onClick={() => onOpenOptimizer("intelligence_panel")}
                  className="w-full sm:w-auto sm:shrink-0 inline-flex items-center justify-center rounded-lg bg-slate-900 py-2 px-3.5 text-xs font-semibold text-white shadow-md hover:shadow-lg hover:bg-slate-800 transition min-w-[180px] sm:min-w-[200px]"
                >
                  Optimize for evidence gaps
                </button>
                <p className="text-[10px] text-slate-500 text-center sm:text-right">
                  Strengthens thin proof in bullets you already have — nothing invented.
                </p>
              </div>
            </div>

            <div className="mt-2 space-y-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                <div className="rounded-lg bg-slate-100 px-2 py-1.5">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                    Before
                  </p>
                  <div className="text-[11px] text-slate-600 leading-snug line-clamp-3 max-h-[3rem] overflow-hidden">
                    {OPTIMIZER_STATIC_BULLET_PREVIEW.before}
                  </div>
                </div>
                <div className="rounded-lg bg-emerald-50 px-2 py-1.5">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700 mb-1">
                    After
                  </p>
                  <div className="text-[11px] text-slate-800 leading-snug line-clamp-3 max-h-[3rem] overflow-hidden">
                    {highlightImprovementsInText(
                      OPTIMIZER_STATIC_BULLET_PREVIEW.after,
                      missingSkills
                    )}
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 leading-snug">
                Example only. Your optimized resume uses your real projects; nothing is invented.
              </p>
            </div>
          </div>
        );
      })()
    ) : null;

  if (isKeywordScanner && analysisUsedJobDescription) {
    improvementTips.length = 0;
    if (missingSkills.length > 0) {
      improvementTips.push(
        `Address ${missingSkills.length} missing keyword${missingSkills.length === 1 ? "" : "s"} from the posting in your bullets or skills, only where truthful.`
      );
    }
    if (typeof keywordCoverageRaw === "number" && keywordScore < 75) {
      improvementTips.push(
        "Improve keyword coverage by echoing the job’s terms in context (projects, tools, outcomes)."
      );
    }
    improvementTips.push(
      "For overall match scoring and deeper JD comparison, use the resume vs job description checker."
    );
  }

  function MetricCard({
    title,
    score,
    style,
    subtitle,
    iconLabel,
  }: {
    title: string;
    score: number;
    style: { hex: string; bgHex: string; label: string };
    subtitle: string;
    iconLabel: string;
  }) {
    return (
      <div
        className="rounded-lg px-2 py-1.5"
        style={{ backgroundColor: style.bgHex }}
      >
        <div className="flex items-center justify-between gap-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-600 leading-tight">
            {title}
          </p>
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ backgroundColor: style.hex }}
            title={iconLabel}
            aria-hidden
          />
        </div>
        <p className="mt-0.5 text-sm font-semibold leading-none" style={{ color: style.hex }}>
          {score}%
        </p>
        <ScoreBar score={score} hex={style.hex} />
        <p className="mt-0.5 text-[10px] leading-snug text-slate-600">{subtitle}</p>
      </div>
    );
  }

  if (compactToolResult && previewSurface) {
    const showOptimizeBanner = Boolean(onOpenOptimizer && analysisUsedJobDescription);
    const resultResetKey = evidenceDashboard?.evidenceMatch ?? atsScore;

    return (
      <section className={compactToolResultShellClass} aria-label="Your analysis report">
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          {showOptimizeBanner ? (
            <div className="mb-3 shrink-0 px-1 sm:px-2">
              <OptimizePreviewBanner
                darkSurface
                onOptimize={() => onOpenOptimizer?.("preview_banner")}
                resetKey={resultResetKey}
              />
            </div>
          ) : null}

          <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xl shadow-black/25 ring-1 ring-slate-900/[0.04]">
              <div className="flex shrink-0 flex-wrap items-center justify-between gap-x-2 gap-y-0.5 border-b border-slate-100 px-2.5 py-2 sm:px-3">
                <div className="flex min-w-0 items-baseline gap-1.5">
                  <h2 className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {isKeywordScanner ? "Keyword scan" : "Intelligence"}
                  </h2>
                  <p className="truncate text-[11px] text-slate-600 sm:text-xs">
                    {isKeywordScanner
                      ? "Keyword gaps vs this posting"
                      : analysisUsedJobDescription
                        ? "Scroll for skill proof, gaps & metrics"
                        : "ATS readability snapshot"}
                  </p>
                </div>
                <span className="inline-flex shrink-0 items-center rounded-full border border-emerald-500/50 bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                  Your result
                </span>
              </div>

              <div className="preview-panel-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-2.5 pb-2.5 pt-1.5 sm:px-3 sm:pb-3">
                {isKeywordScanner ? (
                  <div className="rounded-xl border border-violet-200 bg-violet-50/70 px-3 py-2.5">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-violet-900">
                      Keyword coverage vs this posting
                    </p>
                    <div className="mt-1.5 flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:gap-3">
                      <span className="text-2xl font-bold tabular-nums text-slate-900">
                        {keywordNotApplicable ? "—" : `${keywordScore}%`}
                      </span>
                      <p className="min-w-0 flex-1 text-xs leading-snug text-slate-700">
                        {analyzeResult?.summary}
                      </p>
                    </div>
                    {missingSkills.length > 0 ? (
                      <p className="mt-2 text-[11px] leading-snug text-slate-600">
                        {missingSkills.length} missing keyword
                        {missingSkills.length === 1 ? "" : "s"} — add a job-matched resume check for
                        full evidence scoring.
                      </p>
                    ) : null}
                  </div>
                ) : evidenceDashboard && analysisUsedJobDescription ? (
                  <>
                    <EvidenceIntelligenceSection
                      dashboard={evidenceDashboard}
                      atsScoreReference={atsScore}
                      experienceAlignment={{
                        score: experienceScore,
                        subtitle: buildExperienceAlignmentSubtitle({
                          requiredMin: requiredYearsExperience,
                          requiredMax: requiredYearsExperienceMax,
                          resumeYears: resumeYearsExperience,
                          verdictLabel: expAlignment.style.label,
                        }),
                      }}
                      takeawayHeadline={analyzeResult?.summary}
                      takeawaySubline={
                        evidenceDashboard.riskAreas[0] ??
                        "Optimize to strengthen architecture, deployment, and impact evidence in project bullets."
                      }
                      aboveSkillProof={
                        showEvidenceOptimizeInsideDashboard ? evidenceOptimizeCard : undefined
                      }
                      previewDepth="toolScroll"
                    />
                    <p className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                      Reference metrics
                    </p>
                    <div className="mt-1.5 grid grid-cols-2 gap-1.5 lg:grid-cols-4">
                      {keywordNotApplicable ? (
                        <div className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5">
                          <div className="flex items-center justify-between gap-1.5">
                            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                              Keyword coverage
                            </p>
                            <span
                              className="h-2 w-2 shrink-0 rounded-full bg-slate-400"
                              aria-hidden
                              title="Not applicable"
                            />
                          </div>
                          <p className="mt-0.5 text-sm font-semibold leading-snug text-slate-600">
                            Not applicable (no job description provided)
                          </p>
                        </div>
                      ) : (
                        <MetricCard
                          title="Keyword coverage"
                          score={keywordScore}
                          style={getKeywordCoverageStyle(keywordScore)}
                          subtitle={
                            totalKeywords > 0
                              ? `${matchedSkills.length} / ${totalKeywords} matched. ${keywordLabel}.`
                              : "% of JD skills present in the resume."
                          }
                          iconLabel={keywordLabel}
                        />
                      )}
                      <MetricCard
                        title="Semantic similarity"
                        score={semanticScore}
                        style={semanticStyle}
                        subtitle={semanticStyle.label}
                        iconLabel={semanticStyle.label}
                      />
                      <MetricCard
                        title="Impact score"
                        score={impactScore}
                        style={impactStyle}
                        subtitle="Based on quantified achievements (%, $, growth)."
                        iconLabel={impactStyle.label}
                      />
                      <MetricCard
                        title="Resume quality"
                        score={qualityScore}
                        style={qualityStyle}
                        subtitle="Structure, bullet points, and clarity."
                        iconLabel={qualityStyle.label}
                      />
                    </div>
                    {improvementTips.length > 0 ? (
                      <div className="mt-2 rounded-lg bg-amber-50/80 px-2.5 py-2">
                        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0 flex-1">
                            <p className="text-[10px] font-semibold uppercase tracking-wide text-amber-800 mb-1">
                              Fix before you apply
                            </p>
                            <ul className="list-disc list-inside space-y-0 text-[11px] leading-snug text-amber-900">
                              {improvementTips.map((tip, i) => (
                                <li key={i}>{tip}</li>
                              ))}
                            </ul>
                          </div>
                          {onOpenOptimizer ? (
                            <button
                              type="button"
                              onClick={() => onOpenOptimizer("intelligence_panel")}
                              className="inline-flex w-full shrink-0 items-center justify-center rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white shadow-md transition hover:bg-slate-800 sm:w-auto sm:min-w-[180px]"
                            >
                              Optimize this resume
                            </button>
                          ) : null}
                        </div>
                      </div>
                    ) : null}
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
              ? "Missing skills and keyword gaps vs your job description (not a full ATS parse report)."
              : analysisUsedJobDescription
                ? "How much of this job your resume proves in real work, plus honest gaps."
                : "ATS-focused scores from your resume text (no job description used)."}
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center rounded-full border border-emerald-500/50 bg-emerald-50 text-emerald-700 px-2 py-0.5 text-[11px] font-medium">
          Your result. Fix below.
        </span>
      </div>

      {isKeywordScanner && analyzeResult ? (
        <div className="mt-3 rounded-xl border border-violet-200 bg-violet-50/70 px-3 py-3 sm:px-4">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-violet-900">
            Keyword coverage vs this posting
          </p>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-4">
            <span className="text-2xl sm:text-3xl font-bold text-slate-900 tabular-nums">
              {keywordNotApplicable ? ", " : `${keywordScore}%`}
            </span>
            <p className="text-xs text-slate-700 leading-snug min-w-0 flex-1">
              {analyzeResult.summary}
            </p>
          </div>
          <p className="mt-2 text-[11px] text-slate-500 leading-snug">
            Formatting and parsing: use the ATS compatibility checker. Overall score breakdown: use
            the resume score checker.
          </p>
        </div>
      ) : null}

      {showEvidenceOptimizeInsideDashboard && evidenceDashboard ? (
        <EvidenceIntelligenceSection
          dashboard={evidenceDashboard}
          atsScoreReference={atsScore}
          experienceAlignment={{
            score: experienceScore,
            subtitle: buildExperienceAlignmentSubtitle({
              requiredMin: requiredYearsExperience,
              requiredMax: requiredYearsExperienceMax,
              resumeYears: resumeYearsExperience,
              verdictLabel: expAlignment.style.label,
            }),
          }}
          takeawayHeadline={analyzeResult?.summary}
          takeawaySubline={
            evidenceDashboard.riskAreas[0] ??
            "Optimize to strengthen architecture, deployment, and impact evidence in project bullets."
          }
          aboveSkillProof={evidenceOptimizeCard}
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

      {onOpenOptimizer && !showEvidenceOptimizeInsideDashboard ? evidenceOptimizeCard : null}

      {/* Secondary ATS metrics (reference when evidence dashboard is primary) */}
      {!isKeywordScanner ? (
        <>
      {evidenceDashboard && analysisUsedJobDescription ? (
        <p className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
          Reference metrics
        </p>
      ) : null}
      <div
        className={`${
          evidenceDashboard && analysisUsedJobDescription ? "mt-1.5" : "mt-2"
        } grid grid-cols-2 gap-1.5 ${
          evidenceDashboard && analysisUsedJobDescription ? "lg:grid-cols-4" : "md:grid-cols-3"
        }`}
      >
        {keywordNotApplicable ? (
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5">
            <div className="flex items-center justify-between gap-1.5">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                Keyword coverage
              </p>
              <span
                className="h-2 w-2 shrink-0 rounded-full bg-slate-400"
                aria-hidden
                title="Not applicable"
              />
            </div>
            <p className="mt-0.5 text-sm font-semibold text-slate-600 leading-snug">
              Not applicable (no job description provided)
            </p>
            <p className="mt-1.5 text-[11px] text-slate-600 leading-snug">
              JD keyword overlap is not scored for this scan.
            </p>
          </div>
        ) : (
          <MetricCard
            title="Keyword coverage"
            score={keywordScore}
            style={getKeywordCoverageStyle(keywordScore)}
            subtitle={
              totalKeywords > 0
                ? `${matchedSkills.length} / ${totalKeywords} matched. ${keywordLabel}.`
                : "% of JD skills present in the resume."
            }
            iconLabel={keywordLabel}
          />
        )}
        <MetricCard
          title="Semantic similarity"
          score={semanticScore}
          style={semanticStyle}
          subtitle={semanticStyle.label}
          iconLabel={semanticStyle.label}
        />
        {!(evidenceDashboard && analysisUsedJobDescription) ? (
          <div
            className="rounded-lg px-2 py-1.5"
            style={{ backgroundColor: expAlignment.style.bgHex }}
          >
            <div className="flex items-center justify-between gap-1.5">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-600 leading-tight">
                Experience alignment
              </p>
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: expAlignment.style.hex }}
                aria-hidden
              />
            </div>
            <p className="mt-0.5 text-sm font-semibold leading-none" style={{ color: expAlignment.style.hex }}>
              {experienceScore}%
            </p>
            <ScoreBar score={experienceScore} hex={expAlignment.style.hex} />
            <p className="mt-0.5 text-[10px] leading-snug text-slate-600">
              {buildExperienceAlignmentSubtitle({
                requiredMin: requiredYearsExperience,
                requiredMax: requiredYearsExperienceMax,
                resumeYears: resumeYearsExperience,
                verdictLabel: expAlignment.style.label,
              })}
            </p>
          </div>
        ) : null}
        <MetricCard
          title="Impact score"
          score={impactScore}
          style={impactStyle}
          subtitle="Based on quantified achievements (%, $, growth)."
          iconLabel={impactStyle.label}
        />
        <MetricCard
          title="Resume quality"
          score={qualityScore}
          style={qualityStyle}
          subtitle="Structure, bullet points, and clarity."
          iconLabel={qualityStyle.label}
        />
      </div>
        </>
      ) : null}

      {analysisUsedJobDescription || matchedSkills.length > 0 || missingSkills.length > 0 ? (
        <>
          {!evidenceDashboard ? (
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

          {!evidenceDashboard ? (
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

      {/* Improvement tips */}
      {improvementTips.length > 0 && (
        <div className="mt-2 rounded-lg bg-amber-50/80 px-2.5 py-2">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-amber-800 mb-1">
                Fix your resume
              </p>
              <ul className="list-disc list-inside space-y-0 text-[11px] sm:text-xs leading-snug text-amber-900">
                {improvementTips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
            {onOpenOptimizer && (
              <button
                type="button"
                onClick={() => onOpenOptimizer("intelligence_panel")}
                className="sm:shrink-0 w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-slate-900 py-2 px-3.5 text-xs font-semibold text-white shadow-md hover:shadow-lg hover:bg-slate-800 transition min-w-[180px]"
              >
                Optimize this resume
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

