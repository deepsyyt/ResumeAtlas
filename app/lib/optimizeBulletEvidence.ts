import { makeExperienceBulletKey, resolveBulletTextByKey } from "@/app/lib/optimizeExperience";
import type { ResumeDocument } from "@/app/lib/resumeDocument";
import { collectResumeBulletDiffs } from "@/app/lib/resumeFactualAudit";
import type { OptimizedSkillProofRow } from "@/app/lib/resumeEvidenceScore";
import { strictSkillMatchesInBullet } from "@/app/lib/resumeTermMatch";

export function normalizeBulletCompareKey(text: string): string {
  return String(text ?? "")
    .replace(/\r?\n+/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim()
    .toLowerCase();
}

export type BulletChangeForEvidence = {
  bulletKey?: string;
  original: string;
  improved: string;
  addedKeywords: string[];
  quantified?: boolean;
  addressedRejectionRisks?: string[];
  impactFocusIndex?: number;
};

export type BulletClaimBadgeMaps = {
  bulletFixIndicesByKey: Record<string, number[]>;
  bulletProofIndicesByKey: Record<string, number[]>;
  bulletImpactIndicesByKey: Record<string, number[]>;
};

export type BulletDiffForEvidence = {
  original: string;
  improved: string;
  key: string;
};

export type BulletRefinementReason =
  | { kind: "rejection_risk"; risks: string[] }
  | { kind: "weak_keyword"; keywords: string[] }
  | { kind: "impact_polish"; quantified: boolean };

export type BulletRefinementBreakdown = {
  rejectionRiskBulletCount: number;
  weakKeywordBulletCount: number;
  impactPolishBulletCount: number;
  quantifiedBulletCount: number;
  weakKeywordCount: number;
  addressedRejectionRiskCount: number;
  selectedRejectionRiskCount: number;
  totalRefined: number;
  projectScopes: number;
};

function skillMatchesBulletText(skill: string, bulletText: string): boolean {
  return strictSkillMatchesInBullet(skill, bulletText);
}

function findBulletKeyForExactText(resume: ResumeDocument, text: string): string | null {
  const target = normalizeBulletCompareKey(text);
  if (!target) return null;

  for (let idx = 0; idx < resume.experience.length; idx++) {
    const exp = resume.experience[idx];
    if (!exp) continue;
    for (let j = 0; j < (exp.bullets ?? []).length; j++) {
      const bulletText = String(exp.bullets?.[j] ?? "");
      if (normalizeBulletCompareKey(bulletText) === target) {
        return makeExperienceBulletKey(idx, j);
      }
    }
    for (let pIdx = 0; pIdx < (exp.projects ?? []).length; pIdx++) {
      for (let j = 0; j < (exp.projects?.[pIdx]?.bullets ?? []).length; j++) {
        const bulletText = String(exp.projects?.[pIdx]?.bullets?.[j] ?? "");
        if (normalizeBulletCompareKey(bulletText) === target) {
          return makeExperienceBulletKey(idx, j, pIdx);
        }
      }
    }
  }

  return null;
}

function findBulletKeyForProvenSkill(
  resume: ResumeDocument,
  skill: string,
  evidenceHint?: string
): string | null {
  let bestKey: string | null = null;
  let bestScore = 0;
  const hintLower = evidenceHint?.toLowerCase().trim() ?? "";

  const consider = (key: string, text: string) => {
    if (!skillMatchesBulletText(skill, text)) return;
    let score = 1;
    const textLower = text.toLowerCase();
    if (hintLower && textLower.includes(hintLower.slice(0, Math.min(hintLower.length, 48)))) {
      score += 4;
    }
    if (key.includes(":p")) score += 2;
    if (score > bestScore) {
      bestScore = score;
      bestKey = key;
    }
  };

  for (let idx = 0; idx < resume.experience.length; idx++) {
    const exp = resume.experience[idx];
    if (!exp) continue;
    for (let j = 0; j < (exp.bullets ?? []).length; j++) {
      consider(makeExperienceBulletKey(idx, j), String(exp.bullets?.[j] ?? ""));
    }
    for (let pIdx = 0; pIdx < (exp.projects ?? []).length; pIdx++) {
      for (let j = 0; j < (exp.projects?.[pIdx]?.bullets ?? []).length; j++) {
        consider(
          makeExperienceBulletKey(idx, j, pIdx),
          String(exp.projects?.[pIdx]?.bullets?.[j] ?? "")
        );
      }
    }
  }

  return bestKey;
}

function normalizeKeywordToken(keyword: string): string {
  return keyword.toLowerCase().trim();
}

function isKeywordAssignedElsewhere(
  bulletKeywordsByKey: Record<string, string[]>,
  keyword: string,
  exceptKey?: string
): boolean {
  const norm = normalizeKeywordToken(keyword);
  if (!norm) return false;
  for (const [key, keywords] of Object.entries(bulletKeywordsByKey)) {
    if (exceptKey && key === exceptKey) continue;
    if (keywords.some((kw) => normalizeKeywordToken(kw) === norm)) return true;
  }
  return false;
}

/**
 * Each weak keyword may appear on at most one bullet. A single bullet may still
 * carry many keywords.
 */
export function dedupeBulletKeywordsGlobally(
  resume: ResumeDocument,
  bulletKeywordsByKey: Record<string, string[]>,
  bulletReasonByKey: Record<string, BulletRefinementReason>
): Record<string, string[]> {
  const keywordOwners = new Map<string, { bulletKey: string; keyword: string }>();

  for (const [bulletKey, keywords] of Object.entries(bulletKeywordsByKey)) {
    const bulletText = resolveBulletTextByKey(resume, bulletKey) ?? "";
    for (const keyword of keywords) {
      const kw = keyword.trim();
      if (!kw || !strictSkillMatchesInBullet(kw, bulletText)) continue;

      const norm = normalizeKeywordToken(kw);
      const existing = keywordOwners.get(norm);
      if (!existing) {
        keywordOwners.set(norm, { bulletKey, keyword: kw });
        continue;
      }

      const preferred = findBulletKeyForProvenSkill(resume, kw);
      const candidates = [existing.bulletKey, bulletKey];
      const winner =
        preferred && candidates.includes(preferred)
          ? preferred
          : existing.bulletKey;
      keywordOwners.set(norm, {
        bulletKey: winner,
        keyword: kw,
      });
    }
  }

  const next: Record<string, string[]> = {};
  for (const { bulletKey, keyword } of Array.from(keywordOwners.values())) {
    const list = next[bulletKey] ?? [];
    if (!list.some((kw) => normalizeKeywordToken(kw) === normalizeKeywordToken(keyword))) {
      list.push(keyword);
      next[bulletKey] = list;
    }
  }

  for (const key of Object.keys(bulletKeywordsByKey)) {
    if (next[key]) {
      bulletKeywordsByKey[key] = next[key]!;
    } else {
      delete bulletKeywordsByKey[key];
    }
  }

  for (const [key, reason] of Object.entries(bulletReasonByKey)) {
    if (reason.kind !== "weak_keyword") continue;
    const keywords = next[key];
    if (keywords && keywords.length > 0) {
      bulletReasonByKey[key] = { kind: "weak_keyword", keywords };
    } else {
      delete bulletReasonByKey[key];
    }
  }

  return bulletKeywordsByKey;
}

/** Map improved skill-proof rows to per-bullet weak-keyword metadata (client/API fallback). */
export function enrichWeakKeywordMapsFromSkillProof(
  resume: ResumeDocument,
  bulletKeywordsByKey: Record<string, string[]>,
  bulletReasonByKey: Record<string, BulletRefinementReason>,
  improvedSkillProof: OptimizedSkillProofRow[]
): void {
  for (const row of improvedSkillProof) {
    const skill = row.skill?.trim();
    if (!skill) continue;
    if (isKeywordAssignedElsewhere(bulletKeywordsByKey, skill)) continue;
    const key = findBulletKeyForProvenSkill(resume, skill, row.evidenceHint);
    if (!key) continue;
    if (isKeywordAssignedElsewhere(bulletKeywordsByKey, skill, key)) continue;

    const merged = new Set(
      (bulletKeywordsByKey[key] ?? []).map((kw) => kw.toLowerCase().trim())
    );
    if (!merged.has(skill.toLowerCase())) {
      bulletKeywordsByKey[key] = [...(bulletKeywordsByKey[key] ?? []), skill];
    }
    if (
      bulletReasonByKey[key]?.kind !== "impact_polish" &&
      (!bulletReasonByKey[key] || bulletReasonByKey[key].kind === "weak_keyword")
    ) {
      bulletReasonByKey[key] = {
        kind: "weak_keyword",
        keywords: bulletKeywordsByKey[key] ?? [skill],
      };
    }
  }
}

/** Map analyzer weak/implied skills to bullets in the optimized resume (UI + highlights). */
export function enrichWeakKeywordMapsFromWeakSkills(
  resume: ResumeDocument,
  weakSkills: string[],
  bulletKeywordsByKey: Record<string, string[]>,
  bulletReasonByKey: Record<string, BulletRefinementReason>
): string[] {
  const proven: string[] = [];
  const seenSkills = new Set<string>();

  for (const raw of weakSkills) {
    const skill = raw.trim();
    if (!skill) continue;
    const skillKey = skill.toLowerCase();
    if (seenSkills.has(skillKey)) continue;
    if (isKeywordAssignedElsewhere(bulletKeywordsByKey, skill)) continue;

    const key = findBulletKeyForProvenSkill(resume, skill);
    if (!key) continue;
    if (isKeywordAssignedElsewhere(bulletKeywordsByKey, skill, key)) continue;
    seenSkills.add(skillKey);
    proven.push(skill);

    const merged = new Set(
      (bulletKeywordsByKey[key] ?? []).map((kw) => kw.toLowerCase().trim())
    );
    if (!merged.has(skillKey)) {
      bulletKeywordsByKey[key] = [...(bulletKeywordsByKey[key] ?? []), skill];
    }
    if (
      bulletReasonByKey[key]?.kind !== "impact_polish" &&
      (!bulletReasonByKey[key] || bulletReasonByKey[key].kind === "weak_keyword")
    ) {
      bulletReasonByKey[key] = {
        kind: "weak_keyword",
        keywords: bulletKeywordsByKey[key] ?? [skill],
      };
    }
  }

  return proven;
}

export function buildBulletEvidenceMaps(
  bulletChanges: BulletChangeForEvidence[],
  bulletDiffs: BulletDiffForEvidence[]
): {
  bulletOriginalsByKey: Record<string, string>;
  bulletKeywordsByKey: Record<string, string[]>;
  bulletReasonByKey: Record<string, BulletRefinementReason>;
  strengthenedWeakKeywords: string[];
  breakdown: BulletRefinementBreakdown;
} {
  const keywordsByImproved = new Map<string, string[]>();
  const risksByImproved = new Map<string, string[]>();
  const quantifiedByImproved = new Map<string, boolean>();
  const impactFocusByImproved = new Map<string, number>();
  for (const change of bulletChanges) {
    if (!change.improved.trim()) continue;
    const key = normalizeBulletCompareKey(change.improved);
    if (change.addedKeywords.length > 0) {
      const merged = new Set([
        ...(keywordsByImproved.get(key) ?? []),
        ...change.addedKeywords.filter((kw) => kw.trim()),
      ]);
      keywordsByImproved.set(key, Array.from(merged));
    }
    if (change.addressedRejectionRisks && change.addressedRejectionRisks.length > 0) {
      const mergedRisks = new Set([
        ...(risksByImproved.get(key) ?? []),
        ...change.addressedRejectionRisks.filter((risk) => risk.trim()),
      ]);
      risksByImproved.set(key, Array.from(mergedRisks));
    }
    if (change.quantified) {
      quantifiedByImproved.set(key, true);
    }
    if (change.impactFocusIndex && change.impactFocusIndex > 0) {
      impactFocusByImproved.set(key, change.impactFocusIndex);
    }
  }

  const bulletOriginalsByKey: Record<string, string> = {};
  const bulletKeywordsByKey: Record<string, string[]> = {};
  const bulletReasonByKey: Record<string, BulletRefinementReason> = {};
  const allKeywords = new Set<string>();
  const allAddressedRisks = new Set<string>();
  let rejectionRiskBulletCount = 0;
  let weakKeywordBulletCount = 0;
  let impactPolishBulletCount = 0;
  let quantifiedBulletCount = 0;

  for (const diff of bulletDiffs) {
    const improvedKey = normalizeBulletCompareKey(diff.improved);
    const keywords = keywordsByImproved.get(improvedKey) ?? [];
    const risks = risksByImproved.get(improvedKey) ?? [];
    const quantified = quantifiedByImproved.get(improvedKey) === true;
    const impactFocusIndex = impactFocusByImproved.get(improvedKey) ?? 0;
    const isRewrite = Boolean(diff.original.trim());

    if (isRewrite) {
      bulletOriginalsByKey[diff.key] = diff.original.trim();
    }

    if (keywords.length > 0) {
      bulletKeywordsByKey[diff.key] = keywords;
      for (const kw of keywords) allKeywords.add(kw);
    }
    if (risks.length > 0) {
      bulletReasonByKey[diff.key] = { kind: "rejection_risk", risks };
      rejectionRiskBulletCount += 1;
      for (const risk of risks) allAddressedRisks.add(risk);
      if (keywords.length > 0) weakKeywordBulletCount += 1;
    } else if (keywords.length > 0) {
      bulletReasonByKey[diff.key] = { kind: "weak_keyword", keywords };
      weakKeywordBulletCount += 1;
    }
    if (impactFocusIndex > 0) {
      bulletReasonByKey[diff.key] = { kind: "impact_polish", quantified };
      impactPolishBulletCount += 1;
    }
    if (quantified) quantifiedBulletCount += 1;
  }

  return {
    bulletOriginalsByKey,
    bulletKeywordsByKey,
    bulletReasonByKey,
    strengthenedWeakKeywords: Array.from(allKeywords),
    breakdown: {
      rejectionRiskBulletCount,
      weakKeywordBulletCount,
      impactPolishBulletCount,
      quantifiedBulletCount,
      weakKeywordCount: allKeywords.size,
      addressedRejectionRiskCount: allAddressedRisks.size,
      selectedRejectionRiskCount: 0,
      totalRefined: bulletDiffs.filter((d) => d.original.trim()).length,
      projectScopes: 0,
    },
  };
}

/** Fill missing before/after keys and originals from structured resume diffs and bullet changes. */
export function supplementBulletEvidenceFromResumeDiff(
  before: ResumeDocument | undefined,
  after: ResumeDocument,
  bulletChanges: BulletChangeForEvidence[],
  maps: {
    bulletOriginalsByKey: Record<string, string>;
    refinedBulletKeys: string[];
    newBulletKeys: string[];
  }
): {
  bulletOriginalsByKey: Record<string, string>;
  refinedBulletKeys: string[];
  newBulletKeys: string[];
} {
  const bulletOriginalsByKey = { ...maps.bulletOriginalsByKey };
  const refinedSet = new Set(maps.refinedBulletKeys);
  const newSet = new Set(maps.newBulletKeys);

  if (before) {
    for (const diff of collectResumeBulletDiffs(before, after)) {
      if (diff.original.trim()) {
        bulletOriginalsByKey[diff.key] = diff.original;
        refinedSet.add(diff.key);
      } else if (diff.optimized.trim()) {
        newSet.add(diff.key);
      }
    }
  }

  for (const change of bulletChanges) {
    if (!change.improved.trim()) continue;
    const key = findBulletKeyForExactText(after, change.improved);
    if (!key) continue;

    if (!change.original.trim()) {
      newSet.add(key);
      continue;
    }

    if (
      normalizeBulletCompareKey(change.original) !==
      normalizeBulletCompareKey(change.improved)
    ) {
      bulletOriginalsByKey[key] = change.original.trim();
      refinedSet.add(key);
    }
  }

  return {
    bulletOriginalsByKey,
    refinedBulletKeys: Array.from(refinedSet),
    newBulletKeys: Array.from(newSet),
  };
}

function normalizeSkillToken(text: string): string {
  return String(text ?? "")
    .toLowerCase()
    .replace(/[\s_-]+/g, "");
}

function skillMatchesKeyword(skill: string, keyword: string): boolean {
  const skillNorm = normalizeSkillToken(skill);
  const keywordNorm = normalizeSkillToken(keyword);
  if (!skillNorm || !keywordNorm) return false;
  if (skillNorm === keywordNorm) return true;
  return skillNorm.includes(keywordNorm) || keywordNorm.includes(skillNorm);
}

/** Numbered Fix / Proof / Impact badges per bullet (independent; can stack on one line). */
export function buildBulletClaimBadgeMaps(
  bulletChanges: BulletChangeForEvidence[],
  bulletDiffs: BulletDiffForEvidence[],
  selectedFixes: string[],
  proofSkillsOrdered: string[],
  resume?: ResumeDocument
): BulletClaimBadgeMaps {
  const fixIndexByText = new Map(
    selectedFixes.map((fixText, index) => [fixText.trim(), index + 1] as const)
  );
  const proofIndexBySkill = new Map(
    proofSkillsOrdered.map((skill, index) => [skill.toLowerCase().trim(), index + 1] as const)
  );

  const diffKeyByImproved = new Map<string, string>();
  for (const diff of bulletDiffs) {
    if (!diff.key || !diff.improved.trim()) continue;
    diffKeyByImproved.set(normalizeBulletCompareKey(diff.improved), diff.key);
  }

  const bulletFixIndicesByKey: Record<string, number[]> = {};
  const bulletProofIndicesByKey: Record<string, number[]> = {};
  const bulletImpactIndicesByKey: Record<string, number[]> = {};

  const resolveBulletKey = (change: BulletChangeForEvidence): string | undefined => {
    if (change.bulletKey?.trim()) return change.bulletKey.trim();
    const fromDiff = diffKeyByImproved.get(normalizeBulletCompareKey(change.improved));
    if (fromDiff) return fromDiff;
    if (resume) {
      return findBulletKeyForExactText(resume, change.improved) ?? undefined;
    }
    return undefined;
  };

  const assignIndices = (key: string, change: BulletChangeForEvidence) => {
    const fixIndices = Array.from(
      new Set(
        (change.addressedRejectionRisks ?? [])
          .map((risk) => fixIndexByText.get(risk.trim()))
          .filter((index): index is number => typeof index === "number" && index > 0)
      )
    ).sort((a, b) => a - b);
    if (fixIndices.length > 0) bulletFixIndicesByKey[key] = fixIndices;

    const proofIndices = Array.from(
      new Set(
        (change.addedKeywords ?? [])
          .flatMap((keyword) => {
            const matches: number[] = [];
            for (const [skillKey, proofIndex] of Array.from(proofIndexBySkill.entries())) {
              if (skillMatchesKeyword(skillKey, keyword)) matches.push(proofIndex);
            }
            return matches;
          })
          .filter((index) => index > 0)
      )
    ).sort((a, b) => a - b);
    if (proofIndices.length > 0) bulletProofIndicesByKey[key] = proofIndices;

    if (change.impactFocusIndex && change.impactFocusIndex > 0) {
      bulletImpactIndicesByKey[key] = [change.impactFocusIndex];
    }
  };

  for (const change of bulletChanges) {
    if (!change.improved.trim()) continue;
    const key = resolveBulletKey(change);
    if (!key) continue;
    assignIndices(key, change);
  }

  return { bulletFixIndicesByKey, bulletProofIndicesByKey, bulletImpactIndicesByKey };
}
