import { makeExperienceBulletKey } from "@/app/lib/optimizeExperience";
import type { ResumeDocument } from "@/app/lib/resumeDocument";
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
    const key = findBulletKeyForProvenSkill(resume, skill, row.evidenceHint);
    if (!key) continue;

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

    const key = findBulletKeyForProvenSkill(resume, skill);
    if (!key) continue;
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
    } else if (impactFocusIndex > 0) {
      if (keywords.length > 0) weakKeywordBulletCount += 1;
      bulletReasonByKey[diff.key] = { kind: "impact_polish", quantified };
      impactPolishBulletCount += 1;
    } else if (keywords.length > 0) {
      bulletReasonByKey[diff.key] = { kind: "weak_keyword", keywords };
      weakKeywordBulletCount += 1;
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
  proofSkillsOrdered: string[]
): BulletClaimBadgeMaps {
  const fixIndexByText = new Map(
    selectedFixes.map((fixText, index) => [fixText.trim(), index + 1] as const)
  );
  const proofIndexBySkill = new Map(
    proofSkillsOrdered.map((skill, index) => [skill.toLowerCase().trim(), index + 1] as const)
  );

  const changeByImprovedKey = new Map<string, BulletChangeForEvidence>();
  for (const change of bulletChanges) {
    if (!change.improved.trim()) continue;
    changeByImprovedKey.set(normalizeBulletCompareKey(change.improved), change);
  }

  const bulletFixIndicesByKey: Record<string, number[]> = {};
  const bulletProofIndicesByKey: Record<string, number[]> = {};
  const bulletImpactIndicesByKey: Record<string, number[]> = {};

  for (const diff of bulletDiffs) {
    if (!diff.key || !diff.improved.trim()) continue;
    const change = changeByImprovedKey.get(normalizeBulletCompareKey(diff.improved));
    if (!change) continue;

    const fixIndices = Array.from(
      new Set(
        (change.addressedRejectionRisks ?? [])
          .map((risk) => fixIndexByText.get(risk.trim()))
          .filter((index): index is number => typeof index === "number" && index > 0)
      )
    ).sort((a, b) => a - b);
    if (fixIndices.length > 0) bulletFixIndicesByKey[diff.key] = fixIndices;

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
    if (proofIndices.length > 0) bulletProofIndicesByKey[diff.key] = proofIndices;

    if (change.impactFocusIndex && change.impactFocusIndex > 0) {
      bulletImpactIndicesByKey[diff.key] = [change.impactFocusIndex];
    }
  }

  return { bulletFixIndicesByKey, bulletProofIndicesByKey, bulletImpactIndicesByKey };
}
