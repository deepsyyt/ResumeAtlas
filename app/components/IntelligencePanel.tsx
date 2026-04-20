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

/**
 * Illustrative before/after only (not from the user’s resume). Shown next to the optimize CTA.
 * Highlights in “After” use this JD’s missing skills when they appear in the sample line.
 */
const OPTIMIZER_STATIC_BULLET_PREVIEW = {
  before:
    "developing innovative machine learning solutions, managing complex data pipelines, and leading cross-functional initiatives.",
  after:
    "Developed innovative machine learning solutions to enhance customer analytics, driving data-driven decision-making and improving customer experience at scale.",
} as const;

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
  onOpenOptimizer?: () => void;
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
}: IntelligencePanelProps) {
  const hasAny = !!analyzeResult;
  const emptyAts = emptyStateVariant === "ats";
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

  // Empty state – static demo using same color codes and layout as live dashboard
  if (!hasAny) {
    const demoAts = 78;
    const demoKeyword = 82;
    const demoSemantic = 75;
    const demoExp = 90;
    const demoImpact = 50;
    const demoQuality = 72;
    const demoRequiredYears = 10;
    const demoRequiredYearsMax = 15;
    const demoResumeYears = 12;
    const demoMatched = ["Python", "machine learning", "LLMs", "RAG", "AWS", "Docker"];
    const demoMissing = ["transformers", "orchestration frameworks", "experimentation platforms"];

    const demoAtsStyle = getScoreStyle(demoAts);
    const demoAtsRingHex = getATSRingHex(demoAts);
    const demoKeywordStyle = getKeywordCoverageStyle(demoKeyword);
    const demoSemanticStyle = getSemanticStyle(demoSemantic);
    const demoExpStyle = getExperienceAlignmentStyle(
      demoRequiredYears,
      demoRequiredYearsMax,
      demoResumeYears,
      demoExp
    );
    const demoImpactStyle = getImpactStyle(demoImpact);
    const demoQualityStyle = getResumeQualityStyle(demoQuality);
    const demoVerdict = getATSVerdictLines(demoAts);

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
      <section className="rounded-xl bg-white p-3 sm:p-4 shadow-sm ring-1 ring-slate-900/[0.06]">
        {/* Compact header: label + description + demo badge */}
        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
          <div className="flex items-baseline gap-1.5 min-w-0">
            <h2 className="text-[10px] font-semibold tracking-[0.2em] text-slate-500 uppercase shrink-0">
              Intelligence
            </h2>
            <p className="text-[11px] text-slate-600 truncate sm:truncate-none sm:text-xs">
              {emptyAts
                ? "ATS parsing, structure, and readability — not job posting keyword match."
                : "ATS-style signals for your resume vs job description."}
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center rounded-full bg-slate-800 text-white px-2.5 py-0.5 text-[11px] font-medium">
            Demo dashboard
          </span>
        </div>

        {/* ATS Pass Likelihood – dominant hero block */}
        <div className="mt-3 flex items-center gap-3 sm:gap-4 py-1">
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

        {/* Verdict: confidence + upside (conversion) */}
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
            <p className="text-[10px] font-semibold text-slate-600">Quick takeaway</p>
            <p className="mt-1 text-xs font-semibold text-slate-900 leading-snug">{demoVerdict.headline}</p>
            <p className="mt-0.5 text-xs text-slate-700 leading-snug">{demoVerdict.subline}</p>
          </div>
        </div>

        <p className="mt-2 text-[11px] text-slate-500 leading-snug">
          {emptyAts
            ? "Paste your resume to run an ATS-focused scan. Add a job description only if you also want keyword overlap vs that posting."
            : "Paste your resume and job description, then see your score and fix your resume."}
        </p>

        {/* Supporting metrics – compact cards */}
        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-1.5">
          <div
            className="rounded-xl px-2.5 py-2"
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
            className="rounded-xl px-2.5 py-2"
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
            className="rounded-xl px-2.5 py-2"
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
              {buildExperienceAlignmentSubtitle({
                requiredMin: demoRequiredYears,
                requiredMax: demoRequiredYearsMax,
                resumeYears: demoResumeYears,
                verdictLabel: demoExpStyle.style.label,
              })}
            </p>
          </div>
        </div>

        <div className="mt-1.5 grid grid-cols-1 md:grid-cols-2 gap-1.5">
          <div
            className="rounded-xl px-2.5 py-2"
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
            className="rounded-xl px-2.5 py-2"
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
        <div className="mt-3 rounded-xl bg-slate-50/80 px-2.5 py-2.5">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">
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
        <div className="mt-2.5 rounded-xl bg-slate-50/80 px-2.5 py-2.5">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">
            {emptyAts
              ? "Missing skills vs job description (example)"
              : "Missing skills (from JD)"}
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

        <p className="mt-2 text-xs text-slate-500 leading-snug">
          {emptyAts
            ? "Illustrative JD match panel. A resume-only scan emphasizes parsing and structure; use the job description checker to align with a specific posting."
            : "Your score and fix suggestions use your resume and the job description you pasted."}
        </p>
      </section>
    );
  }

  // Live analysis – ATS dashboard (flat JSON from /api/analyze)
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
          ? `Add ${missingRequired.length} Required skills (from JD) automatically with AI optimization`
          : `Add ${missingSkills.length} missing keywords automatically with AI optimization`
      );
    }
    if (impactScore < 70) {
      improvementTips.push("Add measurable impact metrics (%, $, growth) to your bullets");
    }
    if (
      typeof keywordCoverageRaw === "number" &&
      keywordScore < 70 &&
      missingSkills.length > 0
    ) {
      improvementTips.push("Mention specific tools and skills from the job description");
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

  if (isKeywordScanner && analysisUsedJobDescription) {
    improvementTips.length = 0;
    if (missingSkills.length > 0) {
      improvementTips.push(
        `Address ${missingSkills.length} missing keyword${missingSkills.length === 1 ? "" : "s"} from the posting in your bullets or skills—only where truthful.`
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
        className="rounded-xl px-2.5 py-2"
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
    <section className="rounded-xl bg-white p-3 sm:p-4 shadow-sm ring-1 ring-slate-900/[0.06]">
      {/* Compact header: title + description, live result badge */}
      <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
        <div className="flex items-baseline gap-2 min-w-0">
          <h2 className="text-[10px] font-semibold tracking-[0.2em] text-slate-500 uppercase shrink-0">
            {isKeywordScanner ? "Keyword scan" : "Intelligence"}
          </h2>
          <p className="text-xs text-slate-600 truncate sm:truncate-none">
            {isKeywordScanner
              ? "Missing skills and keyword gaps vs your job description (not a full ATS parse report)."
              : analysisUsedJobDescription
                ? "Your score and fix suggestions for this resume and job."
                : "ATS-focused scores from your resume text (no job description used)."}
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center rounded-full border border-emerald-500/50 bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-medium">
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
              {keywordNotApplicable ? "—" : `${keywordScore}%`}
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

      {/* ATS Pass Likelihood – dominant hero block */}
      {!isKeywordScanner ? (
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
          <p className="mt-0.5 text-xs text-slate-500">
            {analysisUsedJobDescription
              ? "Resume vs this job description"
              : "Resume scan only — no job description"}
          </p>
        </div>
      </div>

      {/* Verdict: confidence + upside (analysis only) */}
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

      {/* Single optimization card – header (problem + opportunity), two-column preview, centered CTA */}
      {onOpenOptimizer && (() => {
        const potentialNum = atsScore < 90 ? 90 : 95;
        const potentialLabel = atsScore < 90 ? "90+" : "95+";
        const delta = Math.max(0, potentialNum - atsScore);
        return (
          <div className="mt-3 rounded-xl bg-slate-50 px-2.5 py-2">
            {/* Top row: headline + keywords + score (left) | CTA button (right) */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
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
                  className="w-full sm:w-auto sm:shrink-0 inline-flex items-center justify-center rounded-lg bg-slate-900 py-2 px-3.5 text-xs font-semibold text-white shadow-md hover:shadow-lg hover:bg-slate-800 transition min-w-[180px] sm:min-w-[200px]"
                >
                  Unlock optimization for this resume
                </button>
                <p className="text-[10px] text-slate-500 text-center sm:text-right">
                  Adds missing keywords and strengthens bullets for this job.
                </p>
              </div>
            </div>

            {/* Before | After – static example (same for all users; not from their resume) */}
            <div className="mt-2.5 space-y-1.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="rounded-lg bg-slate-100 px-2.5 py-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                    Before
                  </p>
                  <div className="text-xs text-slate-600 leading-relaxed line-clamp-3 max-h-[3.5rem] overflow-hidden">
                    {OPTIMIZER_STATIC_BULLET_PREVIEW.before}
                  </div>
                </div>
                <div className="rounded-lg bg-emerald-50 px-2.5 py-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700 mb-1.5">
                    After
                  </p>
                  <div className="text-xs text-slate-800 leading-relaxed line-clamp-3 max-h-[3.5rem] overflow-hidden">
                    {highlightImprovementsInText(
                      OPTIMIZER_STATIC_BULLET_PREVIEW.after,
                      missingSkills
                    )}
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 leading-snug">
                Example only. Your optimized resume uses your real bullets and this job&apos;s keywords.
              </p>
            </div>
          </div>
        );
      })()}

      {/* Supporting metrics – compact cards (hidden on keyword scanner — hero above) */}
      {!isKeywordScanner ? (
        <>
      <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-1.5">
        {keywordNotApplicable ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2">
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
        <div
          className="rounded-xl px-2.5 py-2"
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
            {buildExperienceAlignmentSubtitle({
              requiredMin: requiredYearsExperience,
              requiredMax: requiredYearsExperienceMax,
              resumeYears: resumeYearsExperience,
              verdictLabel: expAlignment.style.label,
            })}
          </p>
        </div>
      </div>

      <div className="mt-1.5 grid grid-cols-1 md:grid-cols-2 gap-1.5">
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
          {/* Matched skills – green chips */}
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

          {/* Missing skills – Required vs Preferred when classified, else single list */}
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
        </>
      ) : null}

      {/* Improvement tips */}
      {improvementTips.length > 0 && (
        <div className="mt-3 rounded-xl bg-amber-50/80 px-3 py-2.5">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-800 mb-1.5">
                Fix your resume
              </p>
              <ul className="list-disc list-inside space-y-0.5 text-xs sm:text-sm text-amber-900">
                {improvementTips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
            {onOpenOptimizer && (
              <button
                type="button"
                onClick={onOpenOptimizer}
                className="sm:shrink-0 w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-slate-900 py-2 px-3.5 text-xs font-semibold text-white shadow-md hover:shadow-lg hover:bg-slate-800 transition min-w-[180px]"
              >
                Unlock optimization for this resume
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

