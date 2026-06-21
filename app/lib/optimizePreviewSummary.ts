import { resolveBulletPlacementLabel } from "@/app/lib/optimizeExperience";
import type { BulletRefinementReason } from "@/app/lib/optimizeBulletEvidence";
import type { AppliedFixOutcome } from "@/app/lib/recommendedFixes";
import {
  recommendedFixActionLabel,
  resolveRecommendedFixInput,
} from "@/app/lib/recommendedFixes";
import type { ResumeDocument } from "@/app/lib/resumeDocument";

export type AppliedFixSummaryRow = {
  index: number;
  fixLabel: string;
  placementLabel: string | null;
  bulletSnippet: string | null;
  applied: boolean;
};

export type WeakKeywordProvenRow = {
  keyword: string;
  placementLabel: string;
  bulletSnippet: string;
};

export type ImpactQuantifiedRow = {
  placementLabel: string;
  bulletSnippet: string;
  quantTerms: string[];
};

const QUANT_TERM_RE =
  /(?:\$?\d[\d,]*(?:\.\d+)?(?:\s*(?:%|x|X|K|M|B|k|m|b|ms|sec|secs|seconds|minutes|hours|days|weeks|months|years|users|customers|requests|transactions|models|pipelines|systems|teams|engineers|projects))?)/g;

/** Numbers and measurable outcomes surfaced in a bullet. */
export function extractQuantificationTerms(text: string, max = 6): string[] {
  const matches = String(text ?? "").match(QUANT_TERM_RE) ?? [];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of matches) {
    const term = raw.trim();
    if (!term || term.length < 2) continue;
    const key = term.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(term);
    if (out.length >= max) break;
  }
  return out;
}

function bulletTextForKey(resume: ResumeDocument, bulletKey: string): string | null {
  const parts = bulletKey.split(":");
  const expIndex = Number.parseInt(parts[0] ?? "", 10);
  if (!Number.isFinite(expIndex)) return null;
  const exp = resume.experience[expIndex];
  if (!exp) return null;
  const bulletIndex = Number.parseInt(parts[parts.length - 1] ?? "", 10);
  if (!Number.isFinite(bulletIndex)) return null;
  const scopePart = parts[1];
  if (scopePart?.startsWith("p")) {
    const projectIndex = Number.parseInt(scopePart.slice(1), 10);
    return exp.projects?.[projectIndex]?.bullets?.[bulletIndex] ?? null;
  }
  return exp.bullets?.[bulletIndex] ?? null;
}

function snippet(text: string, maxLen = 96): string {
  const trimmed = String(text ?? "").replace(/\s+/g, " ").trim();
  if (trimmed.length <= maxLen) return trimmed;
  const slice = trimmed.slice(0, maxLen - 1);
  const lastSpace = slice.lastIndexOf(" ");
  return `${(lastSpace > 40 ? slice.slice(0, lastSpace) : slice).trim()}…`;
}

export function buildAppliedFixSummaryRows(
  outcomes: AppliedFixOutcome[],
  resume: ResumeDocument
): AppliedFixSummaryRow[] {
  return outcomes.map((outcome, i) => {
    const parsed = resolveRecommendedFixInput(outcome.fixText);
    const fixLabel = parsed
      ? recommendedFixActionLabel(parsed, 120)
      : outcome.action || outcome.fixText;
    const bulletText =
      outcome.improvedBullet?.trim() ||
      (outcome.bulletKey ? bulletTextForKey(resume, outcome.bulletKey) : null);
    return {
      index: i + 1,
      fixLabel,
      placementLabel: outcome.bulletKey
        ? resolveBulletPlacementLabel(resume, outcome.bulletKey)
        : null,
      bulletSnippet: bulletText ? snippet(bulletText) : null,
      applied: outcome.applied !== false,
    };
  });
}

export function buildWeakKeywordProvenRows(
  bulletKeywordsByKey: Record<string, string[]>,
  resume: ResumeDocument
): WeakKeywordProvenRow[] {
  const rows: WeakKeywordProvenRow[] = [];
  for (const [bulletKey, keywords] of Object.entries(bulletKeywordsByKey)) {
    const placementLabel = resolveBulletPlacementLabel(resume, bulletKey);
    if (!placementLabel) continue;
    const bulletText = bulletTextForKey(resume, bulletKey) ?? "";
    for (const keyword of keywords) {
      const kw = keyword.trim();
      if (!kw) continue;
      rows.push({
        keyword: kw,
        placementLabel,
        bulletSnippet: snippet(bulletText),
      });
    }
  }
  return rows.sort((a, b) => a.keyword.localeCompare(b.keyword));
}

export function buildImpactQuantifiedRows(args: {
  resume: ResumeDocument;
  bulletReasonByKey: Record<string, BulletRefinementReason>;
  bulletImpactIndicesByKey: Record<string, number[]>;
  quantifiedBulletTexts: string[];
  bulletKeysByText: Map<string, string>;
}): ImpactQuantifiedRow[] {
  const seenKeys = new Set<string>();
  const rows: ImpactQuantifiedRow[] = [];

  const addRow = (bulletKey: string, bulletText: string) => {
    if (seenKeys.has(bulletKey)) return;
    seenKeys.add(bulletKey);
    const placementLabel = resolveBulletPlacementLabel(args.resume, bulletKey);
    if (!placementLabel) return;
    const quantTerms = extractQuantificationTerms(bulletText);
    if (quantTerms.length === 0 && !args.bulletReasonByKey[bulletKey]) return;
    rows.push({
      placementLabel,
      bulletSnippet: snippet(bulletText, 110),
      quantTerms,
    });
  };

  for (const [bulletKey, reason] of Object.entries(args.bulletReasonByKey)) {
    if (reason.kind !== "impact_polish") continue;
    const text = bulletTextForKey(args.resume, bulletKey) ?? "";
    if (text.trim()) addRow(bulletKey, text);
  }

  for (const bulletKey of Object.keys(args.bulletImpactIndicesByKey)) {
    const text = bulletTextForKey(args.resume, bulletKey) ?? "";
    if (text.trim()) addRow(bulletKey, text);
  }

  for (const text of args.quantifiedBulletTexts) {
    const key = args.bulletKeysByText.get(text.trim().toLowerCase());
    if (key) addRow(key, text);
  }

  return rows;
}

export function countImpactRefinedBullets(
  bulletReasonByKey: Record<string, BulletRefinementReason>,
  bulletImpactIndicesByKey: Record<string, number[]>
): number {
  const keys = new Set<string>();
  for (const [key, reason] of Object.entries(bulletReasonByKey)) {
    if (reason.kind === "impact_polish") keys.add(key);
  }
  for (const key of Object.keys(bulletImpactIndicesByKey)) {
    keys.add(key);
  }
  return keys.size;
}
