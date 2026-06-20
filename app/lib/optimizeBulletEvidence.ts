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
    const isRewrite = Boolean(diff.original.trim());

    if (isRewrite) {
      bulletOriginalsByKey[diff.key] = diff.original.trim();
    }

    if (risks.length > 0) {
      bulletReasonByKey[diff.key] = { kind: "rejection_risk", risks };
      rejectionRiskBulletCount += 1;
      for (const risk of risks) allAddressedRisks.add(risk);
    } else if (keywords.length > 0) {
      bulletKeywordsByKey[diff.key] = keywords;
      bulletReasonByKey[diff.key] = { kind: "weak_keyword", keywords };
      weakKeywordBulletCount += 1;
      for (const kw of keywords) allKeywords.add(kw);
    } else if (isRewrite) {
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
