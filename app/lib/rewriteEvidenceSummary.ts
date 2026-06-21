import { classifyBulletEvidenceSignals } from "@/app/lib/resumeEvidenceScore";

export type RewriteSignalKey = "impact" | "architecture" | "deployment" | "leadership";

export type RewriteEvidenceSummary = {
  bulletsRewritten: number;
  /** Bullets that newly gained this signal in a rewrite. */
  signalsGained: Record<RewriteSignalKey, number>;
  /** Bullets that already had this signal and were strengthened in a rewrite. */
  signalsStrengthened: Record<RewriteSignalKey, number>;
  themesAddressed: string[];
};

const SIGNAL_THEME_MAP: Partial<Record<RewriteSignalKey, string>> = {
  leadership: "Leadership",
  architecture: "Architecture",
  deployment: "Deployment",
};

export function buildRewriteEvidenceSummary(
  bulletDiffs: Array<{ original: string; improved: string }>
): RewriteEvidenceSummary {
  const signalsGained: Record<RewriteSignalKey, number> = {
    impact: 0,
    architecture: 0,
    deployment: 0,
    leadership: 0,
  };
  const signalsStrengthened: Record<RewriteSignalKey, number> = {
    impact: 0,
    architecture: 0,
    deployment: 0,
    leadership: 0,
  };

  const rewritten = bulletDiffs.filter(
    (d) => d.original.trim() && d.improved.trim() && d.original.trim() !== d.improved.trim()
  );

  for (const diff of rewritten) {
    const before = classifyBulletEvidenceSignals(diff.original);
    const after = classifyBulletEvidenceSignals(diff.improved);
    if (after.impact) {
      if (before.impact) signalsStrengthened.impact += 1;
      else signalsGained.impact += 1;
    }
    if (after.architecture) {
      if (before.architecture) signalsStrengthened.architecture += 1;
      else signalsGained.architecture += 1;
    }
    if (after.deployment) {
      if (before.deployment) signalsStrengthened.deployment += 1;
      else signalsGained.deployment += 1;
    }
    if (after.leadership) {
      if (before.leadership) signalsStrengthened.leadership += 1;
      else signalsGained.leadership += 1;
    }
  }

  const themesAddressed = (Object.keys(signalsGained) as RewriteSignalKey[])
    .filter((key) => signalsGained[key] > 0 || signalsStrengthened[key] > 0)
    .map((key) => SIGNAL_THEME_MAP[key])
    .filter((name): name is string => Boolean(name));

  return {
    bulletsRewritten: rewritten.length,
    signalsGained,
    signalsStrengthened,
    themesAddressed,
  };
}

export function rewriteGainLabel(key: RewriteSignalKey, count: number): string {
  if (count <= 0) return "";
  switch (key) {
    case "impact":
      return `${count} bullet${count === 1 ? "" : "s"} gained outcome proof`;
    case "architecture":
      return `${count} bullet${count === 1 ? "" : "s"} gained design/architecture proof`;
    case "deployment":
      return `${count} bullet${count === 1 ? "" : "s"} gained shipped/live proof`;
    case "leadership":
      return `${count} bullet${count === 1 ? "" : "s"} gained leadership proof`;
  }
}

export function rewriteStrengthenLabel(key: RewriteSignalKey, count: number): string {
  if (count <= 0) return "";
  switch (key) {
    case "impact":
      return `${count} outcome bullet${count === 1 ? "" : "s"} strengthened in rewrites`;
    case "architecture":
      return `${count} bullet${count === 1 ? "" : "s"} with stronger design/architecture proof`;
    case "deployment":
      return `${count} bullet${count === 1 ? "" : "s"} with stronger shipped/live proof`;
    case "leadership":
      return `${count} bullet${count === 1 ? "" : "s"} with stronger leadership proof`;
  }
}
