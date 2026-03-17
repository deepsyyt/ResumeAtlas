"use client";

// Intelligence panel driven by /api/analyze LLM result.
// Uses universal score colors, progress bars, verdict box, and improvement tips.

import React from "react";
import type { ATSAnalyzeResult } from "@/app/lib/atsAnalyze";
import {
  getScoreStyle,
  getATSBadgeLabel,
  getATSVerdictMessage,
  getATSRingHex,
  getKeywordCoverageStyle,
  getKeywordCoverageLabel,
  getSemanticStyle,
  getExperienceAlignmentStyle,
  getImpactStyle,
  getResumeQualityStyle,
} from "@/app/lib/scoreColors";

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
  /** When provided, shows optimizer CTA and bullet preview. */
  onOpenOptimizer?: () => void;
  /** For bullet preview: before/after sample. When provided with jobDescription, fetches preview. */
  resumeText?: string;
  jobDescription?: string;
};

export function IntelligencePanel({
  analyzeResult,
  showFullIntelligence = true,
  showLocked = false,
  onOpenOptimizer,
  resumeText = "",
  jobDescription = "",
}: IntelligencePanelProps) {
  const hasAny = !!analyzeResult;

  if (showLocked) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="relative">
          <div className="absolute inset-0 rounded-2xl bg-slate-100/90 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="text-center p-4">
              <p className="text-sm font-medium text-slate-700">
                Upgrade to unlock full Intelligence insights for your resume.
              </p>
              <a
                href="/upgrade"
                className="mt-3 inline-block rounded-full bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition"
              >
                Upgrade to Pro
              </a>
            </div>
          </div>
          <h2 className="text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase mb-4">
            Intelligence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 opacity-40">
            <div className="rounded-xl border border-slate-200 bg-slate-50 h-20" />
            <div className="rounded-xl border border-slate-200 bg-slate-50 h-20" />
            <div className="rounded-xl border border-slate-200 bg-slate-50 h-20" />
          </div>
        </div>
      </section>
    );
  }

  // Empty state – static demo using same color codes and layout as live dashboard
  if (!hasAny) {
    const demoAts = 78;
    const demoKeyword = 82;
    const demoSemantic = 75;
    const demoExp = 90;
    const demoImpact = 50;
    const demoQuality = 72;
    const demoRequiredYears = 5;
    const demoResumeYears = 7;
    const demoMatched = ["Python", "machine learning", "LLMs", "RAG", "AWS", "Docker"];
    const demoMissing = ["transformers", "orchestration frameworks", "experimentation platforms"];

    const demoAtsStyle = getScoreStyle(demoAts);
    const demoAtsRingHex = getATSRingHex(demoAts);
    const demoKeywordStyle = getKeywordCoverageStyle(demoKeyword);
    const demoSemanticStyle = getSemanticStyle(demoSemantic);
    const demoExpStyle = getExperienceAlignmentStyle(demoRequiredYears, demoResumeYears, demoExp);
    const demoImpactStyle = getImpactStyle(demoImpact);
    const demoQualityStyle = getResumeQualityStyle(demoQuality);

    const DemoScoreBar = ({ score, hex }: { score: number; hex: string }) => {
      const pct = Math.max(0, Math.min(100, Math.round(score)));
      return (
        <div className="mt-1.5 h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{ width: `${pct}%`, backgroundColor: hex }}
          />
        </div>
      );
    };

    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
        {/* Compact header: label + description + demo badge */}
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <div className="flex items-baseline gap-2 min-w-0">
            <h2 className="text-[10px] font-semibold tracking-[0.2em] text-slate-500 uppercase shrink-0">
              Intelligence
            </h2>
            <p className="text-xs text-slate-600 truncate sm:truncate-none">
              ATS-style signals for your resume vs job description.
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center rounded-full bg-slate-800 text-white px-3 py-1 text-xs font-medium">
            Demo dashboard
          </span>
        </div>

        {/* ATS Pass Likelihood – dominant hero block */}
        <div className="mt-5 flex items-center gap-4 sm:gap-5 py-2">
          <div
            className="relative flex items-center justify-center h-20 w-20 sm:h-24 sm:w-24 rounded-full flex-shrink-0"
            style={{ backgroundColor: demoAtsStyle.bgHex }}
          >
            <div
              className="absolute inset-0 rounded-full border-4"
              style={{ borderColor: demoAtsRingHex }}
            />
            <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-white flex items-center justify-center border-2 border-white shadow-sm">
              <span className="text-2xl sm:text-3xl font-bold text-slate-900">{demoAts}%</span>
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-slate-900">ATS Pass Likelihood</p>
            <p
              className="mt-1 inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold"
              style={{
                color: demoAtsStyle.hex,
                backgroundColor: demoAtsStyle.bgHex,
                borderColor: demoAtsStyle.hex,
              }}
            >
              {getATSBadgeLabel(demoAts)}
            </p>
            <p className="mt-0.5 text-xs text-slate-500">Sample result</p>
          </div>
        </div>

        {/* ATS Verdict – compact */}
        <div
          className="mt-3 flex items-start gap-2.5 rounded-lg border px-3 py-2.5"
          style={{ backgroundColor: demoAtsStyle.bgHex, borderColor: demoAtsStyle.hex }}
        >
          <span
            className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: demoAtsStyle.hex }}
            aria-hidden
          />
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-600">
              ATS Verdict
            </p>
            <p className="mt-0.5 text-xs text-slate-800">
              {getATSVerdictMessage(demoAts)}
            </p>
          </div>
        </div>

        <p className="mt-2.5 text-[11px] text-slate-500">
          Paste your resume and job description, then see your score and fix your resume.
        </p>

        {/* Supporting metrics – compact cards */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-2">
          <div
            className="rounded-lg border border-slate-200 px-2.5 py-2"
            style={{ backgroundColor: demoKeywordStyle.bgHex }}
          >
            <div className="flex items-center justify-between gap-1.5">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                Keyword coverage
              </p>
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: demoKeywordStyle.hex }}
                aria-hidden
              />
            </div>
            <p className="mt-0.5 text-base font-semibold" style={{ color: demoKeywordStyle.hex }}>
              {demoKeyword}%
            </p>
            <DemoScoreBar score={demoKeyword} hex={demoKeywordStyle.hex} />
            <p className="mt-1 text-[11px] text-slate-600">
              {demoMatched.length} / {demoMatched.length + demoMissing.length} matched. {getKeywordCoverageLabel(demoKeyword)}.
            </p>
          </div>
          <div
            className="rounded-lg border border-slate-200 px-2.5 py-2"
            style={{ backgroundColor: demoSemanticStyle.bgHex }}
          >
            <div className="flex items-center justify-between gap-1.5">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                Semantic similarity
              </p>
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: demoSemanticStyle.hex }}
                aria-hidden
              />
            </div>
            <p className="mt-0.5 text-base font-semibold" style={{ color: demoSemanticStyle.hex }}>
              {demoSemantic}%
            </p>
            <DemoScoreBar score={demoSemantic} hex={demoSemanticStyle.hex} />
            <p className="mt-1 text-[11px] text-slate-600">{demoSemanticStyle.label}</p>
          </div>
          <div
            className="rounded-lg border border-slate-200 px-2.5 py-2"
            style={{ backgroundColor: demoExpStyle.style.bgHex }}
          >
            <div className="flex items-center justify-between gap-1.5">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                Experience alignment
              </p>
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: demoExpStyle.style.hex }}
                aria-hidden
              />
            </div>
            <p className="mt-0.5 text-base font-semibold" style={{ color: demoExpStyle.style.hex }}>
              {demoExp}%
            </p>
            <DemoScoreBar score={demoExp} hex={demoExpStyle.style.hex} />
            <p className="mt-1 text-[11px] text-slate-600">
              JD {demoRequiredYears} yrs · resume ~{demoResumeYears} yrs. {demoExpStyle.style.label}.
            </p>
          </div>
        </div>

        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
          <div
            className="rounded-lg border border-slate-200 px-2.5 py-2"
            style={{ backgroundColor: demoImpactStyle.bgHex }}
          >
            <div className="flex items-center justify-between gap-1.5">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                Impact score
              </p>
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: demoImpactStyle.hex }}
                aria-hidden
              />
            </div>
            <p className="mt-0.5 text-base font-semibold" style={{ color: demoImpactStyle.hex }}>
              {demoImpact}%
            </p>
            <DemoScoreBar score={demoImpact} hex={demoImpactStyle.hex} />
            <p className="mt-1 text-[11px] text-slate-600">Quantified achievements (%, $, growth).</p>
          </div>
          <div
            className="rounded-lg border border-slate-200 px-2.5 py-2"
            style={{ backgroundColor: demoQualityStyle.bgHex }}
          >
            <div className="flex items-center justify-between gap-1.5">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                Resume quality
              </p>
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: demoQualityStyle.hex }}
                aria-hidden
              />
            </div>
            <p className="mt-0.5 text-base font-semibold" style={{ color: demoQualityStyle.hex }}>
              {demoQuality}%
            </p>
            <DemoScoreBar score={demoQuality} hex={demoQualityStyle.hex} />
            <p className="mt-1 text-[11px] text-slate-600">Structure, bullets, clarity.</p>
          </div>
        </div>

        {/* Matched skills – green chips */}
        <div className="mt-4 rounded-xl border border-slate-200 px-3 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-2">
            Matched skills
          </p>
          <div className="flex flex-wrap gap-2">
            {demoMatched.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium"
                style={{ backgroundColor: "#ECFDF5", color: "#16A34A" }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Missing skills – red chips */}
        <div className="mt-3 rounded-xl border border-slate-200 px-3 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-2">
            Missing skills (from JD)
          </p>
          <div className="flex flex-wrap gap-2">
            {demoMissing.map((skill) => (
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

        <p className="mt-3 text-xs text-slate-500">
          Your score and fix suggestions use your resume and the job description you pasted.
        </p>
      </section>
    );
  }

  // Live analysis – ATS dashboard (flat JSON from /api/analyze)
  const atsScore = analyzeResult?.ats_score ?? 0;
  const keywordScore = analyzeResult?.keyword_coverage ?? 0;
  const semanticScore = analyzeResult?.semantic_similarity ?? 0;
  const experienceScore = analyzeResult?.experience_alignment ?? 0;
  const requiredYearsExperience = analyzeResult?.required_years_experience ?? null;
  const resumeYearsExperience = analyzeResult?.resume_years_experience ?? 0;
  const impactScore = analyzeResult?.impact_score ?? 0;
  const qualityScore = analyzeResult?.resume_quality ?? 0;
  const matchedSkills = analyzeResult?.matched_skills ?? [];
  const missingSkills = analyzeResult?.missing_skills ?? [];
  const missingRequired = analyzeResult?.missing_skills_required ?? [];
  const missingPreferred = analyzeResult?.missing_skills_preferred ?? [];
  const hasRequiredPreferred = missingRequired.length > 0 || missingPreferred.length > 0;

  const atsStyle = getScoreStyle(atsScore);
  const atsRingHex = getATSRingHex(atsScore);
  const keywordStyle = getKeywordCoverageStyle(keywordScore);
  const semanticStyle = getSemanticStyle(semanticScore);
  const expAlignment = getExperienceAlignmentStyle(
    requiredYearsExperience,
    resumeYearsExperience,
    experienceScore
  );
  const impactStyle = getImpactStyle(impactScore);
  const qualityStyle = getResumeQualityStyle(qualityScore);
  const totalKeywords = matchedSkills.length + missingSkills.length;
  const keywordLabel = getKeywordCoverageLabel(keywordScore);

  const improvementTips: string[] = [];
  if (missingSkills.length > 0) {
    improvementTips.push(
      hasRequiredPreferred && missingRequired.length > 0
        ? `Add ${missingRequired.length} Required skills (from JD) automatically with AI optimization`
        : `Add ${missingSkills.length} missing keywords automatically with AI optimization`
    );
  }
  if (impactScore < 70) {
    improvementTips.push("Add measurable impact metrics (%, $, growth) to your bullets");
  }
  if (keywordScore < 70 && missingSkills.length > 0) {
    improvementTips.push("Mention specific tools and skills from the job description");
  }
  if (qualityScore < 70) {
    improvementTips.push("Improve structure: use bullet points and clear Skills/Experience sections");
  }

  function ScoreBar({ score, hex }: { score: number; hex: string }) {
    const pct = Math.max(0, Math.min(100, Math.round(score)));
    return (
      <div className="mt-1.5 h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: hex }}
        />
      </div>
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
        className="rounded-lg border border-slate-200 px-2.5 py-2"
        style={{ backgroundColor: style.bgHex }}
      >
        <div className="flex items-center justify-between gap-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-600">
            {title}
          </p>
          <span
            className="h-2 w-2 shrink-0 rounded-full"
            style={{ backgroundColor: style.hex }}
            title={iconLabel}
            aria-hidden
          />
        </div>
        <p className="mt-0.5 text-base font-semibold" style={{ color: style.hex }}>
          {score}%
        </p>
        <ScoreBar score={score} hex={style.hex} />
        <p className="mt-1 text-[11px] text-slate-600">{subtitle}</p>
      </div>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
      {/* Compact header: title + description, live result badge */}
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <div className="flex items-baseline gap-2 min-w-0">
          <h2 className="text-[10px] font-semibold tracking-[0.2em] text-slate-500 uppercase shrink-0">
            Intelligence
          </h2>
          <p className="text-xs text-slate-600 truncate sm:truncate-none">
            Your score and fix suggestions for this resume and job.
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center rounded-full border border-emerald-500/50 bg-emerald-50 text-emerald-700 px-4 py-1.5 text-sm font-medium">
          Your result — fix below
        </span>
      </div>

      {/* ATS Pass Likelihood – dominant hero block */}
      <div className="mt-5 flex items-center gap-4 sm:gap-5 py-2">
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
          <p className="text-sm font-semibold text-slate-900">ATS Pass Likelihood</p>
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
          <p className="mt-0.5 text-xs text-slate-500">Resume vs this job description</p>
        </div>
      </div>

      {/* ATS Verdict – compact (analysis only) */}
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
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-600">
            ATS Verdict
          </p>
          <p className="mt-0.5 text-xs text-slate-800">
            {getATSVerdictMessage(atsScore)}
          </p>
        </div>
      </div>

      {/* Single optimization card – header (problem + opportunity), two-column preview, centered CTA */}
      {onOpenOptimizer && (() => {
        const potentialNum = atsScore < 90 ? 90 : 95;
        const potentialLabel = atsScore < 90 ? "90+" : "95+";
        const delta = Math.max(0, potentialNum - atsScore);
        const bulletPreview = analyzeResult?.bullet_preview ?? null;
        const bulletPreviewSkip = analyzeResult?.bullet_preview_skip;
        const showPreview = bulletPreview || bulletPreviewSkip === "already_strong";
        return (
          <div className="mt-4 rounded-xl border border-slate-200 bg-white px-2.5 py-2.5 shadow-sm">
            {/* Top row: headline + keywords + score (left) | CTA button (right) */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  ⚡ Improve this resume for this job
                </h3>
                {missingSkills.length > 0 && (
                  <p className="text-xs text-slate-600 mt-0.5">
                    {hasRequiredPreferred && missingRequired.length > 0
                      ? `Add ${missingRequired.length} Required skill${missingRequired.length === 1 ? "" : "s"} (from JD) to improve your resume`
                      : `Add ${missingSkills.length} mandatory skill${missingSkills.length === 1 ? "" : "s"} to improve your resume`}
                  </p>
                )}
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-lg font-bold text-slate-700">{atsScore}%</span>
                  <span className="text-slate-300" aria-hidden>→</span>
                  <span className="text-lg font-bold text-emerald-600">{potentialLabel}</span>
                  {delta > 0 && (
                    <span className="text-xs font-semibold text-emerald-600 ml-0.5">
                      +{delta} ATS score improvement possible
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-center sm:items-end gap-1">
                <button
                  type="button"
                  onClick={onOpenOptimizer}
                  className="w-full sm:w-auto sm:shrink-0 inline-flex items-center justify-center rounded-lg bg-slate-900 py-2.5 px-4 text-xs font-semibold text-white shadow-md hover:shadow-lg hover:bg-slate-800 transition min-w-[200px] sm:min-w-[220px]"
                >
                  Optimize Resume For This Job
                </button>
                <p className="text-[10px] text-slate-500 text-center sm:text-right">
                  AI will rewrite with missing keywords and stronger bullets.
                </p>
              </div>
            </div>

            {/* Before | After – clear separation, comfortable padding */}
            {showPreview && (
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                    Before
                  </p>
                  <div className="text-xs text-slate-600 leading-relaxed line-clamp-3 max-h-[3.5rem] overflow-hidden">
                    {bulletPreviewSkip === "already_strong"
                      ? "Strong achievements already."
                      : bulletPreview ? bulletPreview.before : null}
                  </div>
                </div>
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700 mb-1.5">
                    After
                  </p>
                  <div className="text-xs text-slate-800 leading-relaxed line-clamp-3 max-h-[3.5rem] overflow-hidden">
                    {bulletPreviewSkip === "already_strong"
                      ? "Keyword alignment & ATS formatting."
                      : bulletPreview
                        ? highlightImprovementsInText(bulletPreview.after, missingSkills)
                        : null}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })()}

      {/* Supporting metrics – compact cards */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-2">
        <MetricCard
          title="Keyword coverage"
          score={keywordScore}
          style={keywordStyle}
          subtitle={totalKeywords > 0 ? `${matchedSkills.length} / ${totalKeywords} matched. ${keywordLabel}.` : "% of JD skills present in the resume."}
          iconLabel={keywordLabel}
        />
        <MetricCard
          title="Semantic similarity"
          score={semanticScore}
          style={semanticStyle}
          subtitle={semanticStyle.label}
          iconLabel={semanticStyle.label}
        />
        <div
          className="rounded-lg border border-slate-200 px-2.5 py-2"
          style={{ backgroundColor: expAlignment.style.bgHex }}
        >
          <div className="flex items-center justify-between gap-1.5">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-600">
              Experience alignment
            </p>
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: expAlignment.style.hex }}
              aria-hidden
            />
          </div>
          <p className="mt-0.5 text-base font-semibold" style={{ color: expAlignment.style.hex }}>
            {experienceScore}%
          </p>
          <ScoreBar score={experienceScore} hex={expAlignment.style.hex} />
          <p className="mt-1 text-[11px] text-slate-600">
            {requiredYearsExperience !== null
              ? `JD ${requiredYearsExperience} yr${requiredYearsExperience === 1 ? "" : "s"} · resume ~${resumeYearsExperience} yr${resumeYearsExperience === 1 ? "" : "s"}. ${expAlignment.style.label}.`
              : `Resume ~${resumeYearsExperience} yr${resumeYearsExperience === 1 ? "" : "s"}. JD experience not specified.`}
          </p>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
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

      {/* Matched skills – green chips */}
      <div className="mt-4 rounded-xl border border-slate-200 px-3 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-2">
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

      {/* Missing skills – Required vs Preferred when classified, else single list */}
      <div className="mt-3 rounded-xl border border-slate-200 px-3 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-2">
          Missing skills (from JD)
        </p>
        {!missingSkills.length ? (
          <p className="text-xs text-slate-600" style={{ color: "#16A34A" }}>
            No major missing skills detected compared to the JD.
          </p>
        ) : hasRequiredPreferred ? (
          <div className="space-y-3">
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

      {/* Improvement tips */}
      {improvementTips.length > 0 && (
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/70 px-4 py-3">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-800 mb-2">
                Fix your resume
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-amber-900">
                {improvementTips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
            {onOpenOptimizer && (
              <button
                type="button"
                onClick={onOpenOptimizer}
                className="sm:shrink-0 w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-slate-900 py-2.5 px-4 text-xs font-semibold text-white shadow-md hover:shadow-lg hover:bg-slate-800 transition min-w-[200px]"
              >
                Optimize Resume For This Job
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

