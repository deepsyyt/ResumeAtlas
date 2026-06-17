"use client";

import { ThemeCoverageRow } from "@/app/components/EvidenceMetricBar";
import { OptimizeSignalBar } from "@/app/components/OptimizeSignalBar";
import { OptimizeSkillProofSection } from "@/app/components/OptimizeSkillProofSection";
import {
  OPTIMIZE_EVIDENCE_MATCH_SUBTITLE,
  OPTIMIZE_EVIDENCE_MATCH_TITLE,
  OPTIMIZE_RISK_AREAS_INTRO,
  OPTIMIZE_RISK_AREAS_TITLE,
  buildSignalMetrics,
  type EvidenceSignalKey,
} from "@/app/lib/evidenceMetricCopy";
import {
  buildRewriteEvidenceSummary,
  rewriteGainLabel,
  rewriteStrengthenLabel,
  type RewriteSignalKey,
} from "@/app/lib/rewriteEvidenceSummary";

import { describeJdGapEvidence, type JdGapDetail } from "@/app/lib/skillGapRules";
import type { EvidenceDashboard, OptimizedSkillProofRow } from "@/app/lib/resumeEvidenceScore";

const REWRITE_SIGNAL_KEYS: RewriteSignalKey[] = [
  "impact",
  "architecture",
  "deployment",
  "leadership",
];

export type ResumeOptimizationPanelProps = {
  surfacedKeywords: string[];
  bulletsRefined: number;
  summaryTailored: boolean;
  jdGapsRemaining: number;
  jdGapDetails?: JdGapDetail[];
  bulletDiffs?: Array<{ original: string; improved: string }>;
  evidenceDashboard?: {
    before: EvidenceDashboard;
    after: EvidenceDashboard;
  };
  improvedSkillProof?: OptimizedSkillProofRow[];
  targetSkillCoverage?: {
    coveredAfter: number;
    total: number;
  };
  scoreBefore: number;
  scoreAfter: number;
  evidenceMatchDelta?: number;
  atsScoreReference?: number;
  onDownloadPdf: () => void;
  onDownloadDocx: () => void;
};

export function ResumeOptimizationPanel({
  surfacedKeywords,
  bulletsRefined,
  summaryTailored,
  jdGapsRemaining,
  jdGapDetails = [],
  bulletDiffs = [],
  evidenceDashboard,
  improvedSkillProof = [],
  scoreBefore,
  scoreAfter,
  evidenceMatchDelta,
  atsScoreReference,
  onDownloadPdf,
  onDownloadDocx,
}: ResumeOptimizationPanelProps) {
  const kwCount = surfacedKeywords.length;
  const before = evidenceDashboard?.before;
  const after = evidenceDashboard?.after;
  const evidenceDelta =
    evidenceMatchDelta ??
    (before && after ? after.evidenceMatch - before.evidenceMatch : scoreAfter - scoreBefore);

  const rewriteSummary = buildRewriteEvidenceSummary(
    bulletDiffs,
    after?.categories ?? []
  );

  const rewriteGainedByMetric: Partial<Record<EvidenceSignalKey, number>> = {
    impact: rewriteSummary.signalsGained.impact,
    architecture: rewriteSummary.signalsGained.architecture,
    deployment: rewriteSummary.signalsGained.deployment,
    leadership: rewriteSummary.signalsGained.leadership,
  };
  const rewriteStrengthenedByMetric: Partial<Record<EvidenceSignalKey, number>> = {
    impact: rewriteSummary.signalsStrengthened.impact,
    architecture: rewriteSummary.signalsStrengthened.architecture,
    deployment: rewriteSummary.signalsStrengthened.deployment,
    leadership: rewriteSummary.signalsStrengthened.leadership,
  };

  const improvementLines: { text: string; show: boolean }[] = [
    {
      text: "Summary reframed with JD-relevant proof from your real projects",
      show: summaryTailored,
    },
    {
      text: `${bulletsRefined} bullet${bulletsRefined === 1 ? "" : "s"} upgraded with stronger architecture, deployment, or impact evidence`,
      show: bulletsRefined > 0,
    },
    {
      text: `${kwCount} skill${kwCount === 1 ? "" : "s"} you already had moved into stronger project proof`,
      show: kwCount > 0,
    },
    {
      text:
        jdGapsRemaining > 0
          ? `${jdGapsRemaining} missing JD requirement${jdGapsRemaining === 1 ? "" : "s"} left honest (not invented)`
          : "",
      show: jdGapsRemaining > 0,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <section className="rounded-xl border border-slate-900 bg-slate-900 p-3.5 text-white shadow-md">
        <h3 className="text-sm font-bold">Your resume is ready</h3>
        <p className="mt-1 text-xs text-slate-300 leading-snug">
          Evidence-first tailoring: stronger proof from work you already did, nothing invented.
        </p>
        <div className="mt-3 flex flex-col gap-1.5 sm:flex-row">
          <button
            type="button"
            onClick={onDownloadPdf}
            className="inline-flex flex-1 items-center justify-center rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-900 shadow-sm hover:bg-slate-100"
          >
            Download PDF
          </button>
          <button
            type="button"
            onClick={onDownloadDocx}
            className="inline-flex flex-1 items-center justify-center rounded-lg border border-white/30 bg-transparent px-3 py-2 text-xs font-semibold text-white hover:bg-white/10"
          >
            Download editable file
          </button>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <h3 className="text-[11px] font-bold uppercase tracking-wide text-slate-800">
          What changed
        </h3>
        <p className="mt-0.5 text-[10px] leading-snug text-slate-500">
          Optimization strengthens skills you already have in project bullets, not missing JD requirements.
        </p>
        <ul className="mt-1.5 space-y-1">
          {improvementLines
            .filter((l) => l.show)
            .map((l) => (
              <li key={l.text} className="flex gap-2 text-xs leading-snug text-slate-700">
                <span className="mt-px shrink-0 text-[11px] font-semibold text-emerald-600" aria-hidden>
                  ✓
                </span>
                <span className="min-w-0">{l.text}</span>
              </li>
            ))}
        </ul>

        {kwCount > 0 ? (
          <div className="mt-2 border-t border-slate-100 pt-2">
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-600">
              Proof surfaced in bullets
            </p>
            <div className="mt-1 flex flex-wrap gap-1">
              {surfacedKeywords.map((kw) => (
                <span
                  key={kw}
                  className="rounded-md bg-sky-50 px-1.5 py-0.5 text-[10px] font-semibold text-sky-900 ring-1 ring-sky-200/80"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {bulletDiffs.length > 0 ? (
          <div className="mt-2 border-t border-slate-100 pt-2">
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-600">
              Strengthened bullets ({bulletDiffs.length})
            </p>
            <ul className="mt-1.5 space-y-1.5">
              {bulletDiffs.slice(0, 5).map((diff) => (
                <li
                  key={`${diff.original.slice(0, 40)}-${diff.improved.slice(0, 40)}`}
                  className="rounded-md border border-emerald-100 bg-emerald-50/50 px-2 py-1.5 text-[10px] leading-snug text-slate-800"
                >
                  {diff.improved}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>

      {after ? (
        <section className="rounded-xl border border-indigo-200/80 bg-gradient-to-br from-indigo-50/90 via-white to-violet-50/40 p-3 shadow-sm">
          <h3 className="text-[11px] font-bold uppercase tracking-wide text-indigo-950">
            {OPTIMIZE_EVIDENCE_MATCH_TITLE}
          </h3>
          <p className="mt-1 text-lg font-bold tabular-nums text-indigo-950">
            {scoreBefore}% → {scoreAfter}%
            {evidenceDelta !== 0 ? (
              <span
                className={`ml-1 text-sm font-semibold ${evidenceDelta > 0 ? "text-emerald-700" : "text-amber-800"}`}
              >
                {evidenceDelta > 0 ? "+" : ""}
                {evidenceDelta}
              </span>
            ) : null}
          </p>
          <p className="mt-0.5 text-[11px] leading-snug text-indigo-900/80">
            {OPTIMIZE_EVIDENCE_MATCH_SUBTITLE}
          </p>

          {rewriteSummary.bulletsRewritten > 0 ? (
            <div className="mt-2 rounded-lg border border-emerald-200/80 bg-emerald-50/50 px-2.5 py-2">
              <p className="text-[10px] font-semibold text-emerald-950">
                {rewriteSummary.bulletsRewritten} bullet
                {rewriteSummary.bulletsRewritten === 1 ? "" : "s"} rewritten
                {rewriteSummary.themesAddressed.length > 0
                  ? ` · JD topics strengthened: ${rewriteSummary.themesAddressed.join(", ")}`
                  : ""}
              </p>
              <ul className="mt-1 space-y-0.5">
                {REWRITE_SIGNAL_KEYS.flatMap((key) => {
                  const lines: string[] = [];
                  if (rewriteSummary.signalsGained[key] > 0) {
                    lines.push(rewriteGainLabel(key, rewriteSummary.signalsGained[key]));
                  }
                  if (rewriteSummary.signalsStrengthened[key] > 0) {
                    lines.push(
                      rewriteStrengthenLabel(key, rewriteSummary.signalsStrengthened[key])
                    );
                  }
                  return lines.map((line) => (
                    <li key={`${key}-${line}`} className="text-[9px] font-medium text-emerald-900">
                      {line}
                    </li>
                  ));
                })}
              </ul>
            </div>
          ) : null}

          <div className="mt-3 space-y-2">
            {[...buildSignalMetrics(after)]
              .sort((a, b) => {
                const gainA =
                  (rewriteGainedByMetric[a.key] ?? 0) +
                  (rewriteStrengthenedByMetric[a.key] ?? 0);
                const gainB =
                  (rewriteGainedByMetric[b.key] ?? 0) +
                  (rewriteStrengthenedByMetric[b.key] ?? 0);
                const beforeA =
                  before != null
                    ? buildSignalMetrics(before).find((m) => m.key === a.key)?.value ?? 0
                    : 0;
                const deltaA = a.value - beforeA;
                const beforeB =
                  before != null
                    ? buildSignalMetrics(before).find((m) => m.key === b.key)?.value ?? 0
                    : 0;
                const deltaB = b.value - beforeB;
                const scoreA = gainA * 100 + Math.max(0, deltaA);
                const scoreB = gainB * 100 + Math.max(0, deltaB);
                return scoreB - scoreA;
              })
              .map((metric, index) => {
              const beforeMetric =
                before != null
                  ? buildSignalMetrics(before).find((m) => m.key === metric.key)
                  : undefined;
              const beforeValue = beforeMetric?.value;
              const rewriteGained = rewriteGainedByMetric[metric.key] ?? 0;
              const rewriteStrengthened = rewriteStrengthenedByMetric[metric.key] ?? 0;
              const impactDelta =
                before && metric.key === "impact"
                  ? after.snapshot.experiencesWithMetrics - before.snapshot.experiencesWithMetrics
                  : 0;
              const impactStrengthened = rewriteStrengthenedByMetric.impact ?? 0;
              const roleWord = after.snapshot.totalExperiences === 1 ? "role" : "roles";
              const countLabel =
                metric.key === "impact" && before
                  ? impactStrengthened > 0
                    ? `${after.snapshot.experiencesWithMetrics} of ${after.snapshot.totalExperiences} ${roleWord} with outcomes · ${impactStrengthened} strengthened in your rewrites`
                    : impactDelta > 0
                      ? `${after.snapshot.experiencesWithMetrics} of ${after.snapshot.totalExperiences} ${roleWord} with outcomes (+${impactDelta} new from optimization)`
                      : `${after.snapshot.experiencesWithMetrics} of ${after.snapshot.totalExperiences} ${roleWord} with outcomes`
                  : metric.key !== "impact" && beforeValue != null
                    ? `Full resume: ${metric.value}% (was ${beforeValue}%)`
                    : undefined;
              return (
                <OptimizeSignalBar
                  key={metric.key}
                  label={metric.label}
                  hint={metric.hint}
                  value={metric.value}
                  beforeValue={beforeValue}
                  countLabel={countLabel}
                  rewriteGained={rewriteGained}
                  rewriteStrengthened={rewriteStrengthened}
                  index={index}
                />
              );
            })}
          </div>

          {after.categories.length > 0 ? (
            <div className="mt-3 border-t border-indigo-200/80 pt-2">
              <p className="text-[10px] font-bold uppercase tracking-wide text-indigo-950">
                Topics this job cares about
              </p>
              <ul className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {after.categories.map((c, index) => (
                  <ThemeCoverageRow
                    key={c.category}
                    category={c.category}
                    score={c.score}
                    detail={c.detail}
                    index={index}
                  />
                ))}
              </ul>
            </div>
          ) : null}

        </section>
      ) : null}

      {improvedSkillProof.length > 0 ? (
        <OptimizeSkillProofSection rows={improvedSkillProof} className="mt-3" />
      ) : null}

      {after && after.riskAreas.length > 0 ? (
        <section className="rounded-xl border border-amber-200 bg-amber-50/60 p-3">
          <h3 className="text-[11px] font-bold uppercase tracking-wide text-amber-950">
            {OPTIMIZE_RISK_AREAS_TITLE}
          </h3>
          <p className="mt-0.5 text-[10px] text-amber-900/80">{OPTIMIZE_RISK_AREAS_INTRO}</p>
          <ul className="mt-1.5 space-y-1">
            {after.riskAreas.map((risk) => (
              <li key={risk} className="text-[11px] leading-snug text-amber-950/90">
                {risk}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {jdGapDetails.length > 0 ? (
        <section className="rounded-xl border border-amber-200/70 bg-amber-50/40 p-3">
          <h3 className="text-[11px] font-bold uppercase tracking-wide text-amber-950">
            Honest JD gaps ({jdGapsRemaining})
          </h3>
          <p className="mt-0.5 text-[10px] text-amber-900/75">
            Not added to your resume on purpose.
          </p>
          <ul className="mt-1.5 flex flex-wrap gap-1.5">
            {jdGapDetails.map((gap) => (
              <li
                key={gap.phrase}
                className="rounded-md border border-amber-200/70 bg-white/80 px-2 py-1 text-[10px] font-medium text-amber-950"
                title={describeJdGapEvidence(gap)}
              >
                {gap.phrase}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {atsScoreReference != null ? (
        <p className="text-[10px] text-slate-500">
          ATS compatibility (analyze step): {atsScoreReference}% — separate from evidence match
        </p>
      ) : null}
    </div>
  );
}
