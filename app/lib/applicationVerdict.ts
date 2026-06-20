import type { EvidenceDashboard } from "@/app/lib/resumeEvidenceScore";
import { OPTIMIZE_CTA_LABEL } from "@/app/lib/evidenceMetricCopy";
import { getATSBadgeLabel, getScoreStyle, type ScoreStyle } from "@/app/lib/scoreColors";
import {
  APPLICATION_VERDICT_VERSION,
  recommendationBadgeLabel,
  recommendationToTier,
  type ApplicationVerdictLlm,
} from "@/app/lib/applicationVerdictLlm";
export type ApplicationVerdictTier = "strong" | "good" | "cautious" | "poor";

export type ApplicationVerdict = {
  tier: ApplicationVerdictTier;
  shortlistPct: number;
  optimizedShortlistPct: number;
  shortlistUplift: number;
  badgeLabel: string;
  scoreStyle: ScoreStyle;
  /** One-line apply recommendation. */
  headline: string;
  /** Reserved — no longer shown (summary covers detail). */
  subline: string;
  shouldApply: boolean;
  applyLabel: string;
  /** Copy for optimize card / CTA. */
  optimizeHeadline: string;
  optimizeSubline: string;
  optimizeCtaLabel: string;
  /** Breakdown for optional debug/tooltips. */
  inputs: {
    topicsAvg: number;
    skillsInBulletsPct: number;
    rejectionRiskCount: number;
  };
};

function clampPct(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)));
}

function averageTopicScore(dashboard: EvidenceDashboard): number {
  const topics = dashboard.categories;
  if (topics.length > 0) {
    return topics.reduce((sum, t) => sum + t.score, 0) / topics.length;
  }
  return dashboard.snapshot.jdSkillProof;
}

function skillsMatchedInBulletsPct(dashboard: EvidenceDashboard): number {
  const { jdSkillsProved, jdSkillsTotal, jdSkillProof } = dashboard.snapshot;
  if (jdSkillsTotal > 0) {
    return clampPct((jdSkillsProved / jdSkillsTotal) * 100);
  }
  return jdSkillProof;
}

function rejectionRiskFactor(dashboard: EvidenceDashboard): number {
  const risks = dashboard.mostMissingEvidence?.length
    ? dashboard.mostMissingEvidence
    : dashboard.riskAreas;
  const count = risks.length;
  if (count === 0) return 100;
  if (count === 1) return 82;
  if (count === 2) return 68;
  if (count === 3) return 52;
  return Math.max(18, 52 - (count - 3) * 14);
}

function tierFromShortlist(pct: number): ApplicationVerdictTier {
  if (pct >= 72) return "strong";
  if (pct >= 55) return "good";
  if (pct >= 40) return "cautious";
  return "poor";
}

function estimateOptimizedShortlist(args: {
  current: number;
  topicsAvg: number;
  skillsInBulletsPct: number;
  riskCount: number;
}): number {
  const topicGap = Math.max(0, 72 - args.topicsAvg);
  const skillGap = Math.max(0, 78 - args.skillsInBulletsPct);
  const riskBonus = Math.min(12, args.riskCount * 3);
  const uplift = Math.min(28, topicGap * 0.35 + skillGap * 0.4 + riskBonus);
  return clampPct(Math.min(88, args.current + uplift));
}

function tierCopy(tier: ApplicationVerdictTier, shortlistPct: number, optimizedPct: number): Pick<
  ApplicationVerdict,
  | "badgeLabel"
  | "headline"
  | "subline"
  | "shouldApply"
  | "applyLabel"
  | "optimizeHeadline"
  | "optimizeSubline"
  | "optimizeCtaLabel"
> {
  const subline = "";

  switch (tier) {
    case "strong":
      return {
        badgeLabel: "Strong apply",
        headline: "Yes, you're a competitive candidate for this posting.",
        subline,
        shouldApply: true,
        applyLabel: "Apply now",
        optimizeHeadline: "You're in good shape, polish proof to stay ahead",
        optimizeSubline: `Shortlist odds are ~${shortlistPct}% today. Optimization can push them toward ~${optimizedPct}% before you submit.`,
        optimizeCtaLabel: OPTIMIZE_CTA_LABEL,
      };
    case "good":
      return {
        badgeLabel: "Worth applying",
        headline: "Yes, apply, but strengthen thin proof first if you can.",
        subline,
        shouldApply: true,
        applyLabel: "Apply after quick polish",
        optimizeHeadline: "Increase your shortlist odds before you apply",
        optimizeSubline: `You're at ~${shortlistPct}% shortlist odds. Optimization targets the rejection risks and weak topic proof holding you back, typically ~${optimizedPct}%.`,
        optimizeCtaLabel: OPTIMIZE_CTA_LABEL,
      };
    case "cautious":
      return {
        badgeLabel: "Optimize first",
        headline: "Risky to apply as-is, shortlist odds are below average.",
        subline,
        shouldApply: false,
        applyLabel: "Optimize before applying",
        optimizeHeadline: "Don't apply yet, raise shortlist odds first",
        optimizeSubline: `~${shortlistPct}% shortlist chance today. Fix topic gaps and move skills into work bullets to reach ~${optimizedPct}% before submitting.`,
        optimizeCtaLabel: OPTIMIZE_CTA_LABEL,
      };
    case "poor":
      return {
        badgeLabel: "Low shortlist odds",
        headline: "Not recommended to apply yet, major proof gaps vs this posting.",
        subline,
        shouldApply: false,
        applyLabel: "Major gaps, optimize first",
        optimizeHeadline: "Low shortlist odds, optimize before applying",
        optimizeSubline: `~${shortlistPct}% shortlist chance if you apply now. Honest bullet rewrites can lift you toward ~${optimizedPct}%.`,
        optimizeCtaLabel: OPTIMIZE_CTA_LABEL,
      };
  }
}

/** Composite apply verdict — LLM copy on live dashboard when enriched; formula fallback otherwise. */
export function computeApplicationVerdict(dashboard: EvidenceDashboard): ApplicationVerdict {
  const base = computeApplicationVerdictHeuristic(dashboard);
  const llm = dashboard.applicationVerdictLlm;
  if (!llm || dashboard.applicationVerdictVersion !== APPLICATION_VERDICT_VERSION) {
    return base;
  }
  return mergeApplicationVerdictLlm(base, llm);
}

function mergeApplicationVerdictLlm(
  base: ApplicationVerdict,
  llm: ApplicationVerdictLlm
): ApplicationVerdict {
  const tier = recommendationToTier(llm.recommendation);
  const shortlistPct =
    typeof llm.shortlistPct === "number" ? clampPct(llm.shortlistPct) : base.shortlistPct;
  const optimizedShortlistPct = estimateOptimizedShortlist({
    current: shortlistPct,
    topicsAvg: base.inputs.topicsAvg,
    skillsInBulletsPct: base.inputs.skillsInBulletsPct,
    riskCount: base.inputs.rejectionRiskCount,
  });
  const shortlistUplift = Math.max(0, optimizedShortlistPct - shortlistPct);
  const template = tierCopy(tier, shortlistPct, optimizedShortlistPct);

  return {
    ...base,
    tier,
    shortlistPct,
    optimizedShortlistPct,
    shortlistUplift,
    scoreStyle: getScoreStyle(shortlistPct),
    badgeLabel: recommendationBadgeLabel(llm.recommendation),
    headline: llm.headline,
    subline: "",
    shouldApply: llm.recommendation === "apply",
    applyLabel: template.applyLabel,
    optimizeHeadline: template.optimizeHeadline,
    optimizeSubline: template.optimizeSubline,
    optimizeCtaLabel: template.optimizeCtaLabel,
  };
}

function computeApplicationVerdictHeuristic(dashboard: EvidenceDashboard): ApplicationVerdict {
  const topicsAvg = clampPct(averageTopicScore(dashboard));
  const skillsInBulletsPct = skillsMatchedInBulletsPct(dashboard);
  const rejectionRiskCount = dashboard.mostMissingEvidence?.length ?? dashboard.riskAreas.length;
  const riskFactor = rejectionRiskFactor(dashboard);

  const rawShortlist =
    topicsAvg * 0.45 + skillsInBulletsPct * 0.4 + riskFactor * 0.15;
  const shortlistPct = clampPct(rawShortlist);
  const tier = tierFromShortlist(shortlistPct);
  const optimizedShortlistPct = estimateOptimizedShortlist({
    current: shortlistPct,
    topicsAvg,
    skillsInBulletsPct,
    riskCount: rejectionRiskCount,
  });
  const shortlistUplift = Math.max(0, optimizedShortlistPct - shortlistPct);

  return {
    tier,
    shortlistPct,
    optimizedShortlistPct,
    shortlistUplift,
    scoreStyle: getScoreStyle(shortlistPct),
    inputs: {
      topicsAvg,
      skillsInBulletsPct,
      rejectionRiskCount,
    },
    ...tierCopy(tier, shortlistPct, optimizedShortlistPct),
  };
}

export function shortlistBadgeLabel(pct: number): string {
  return getATSBadgeLabel(pct);
}
