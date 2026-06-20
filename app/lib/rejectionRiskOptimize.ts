/** Strip "No …" framing from rejection-risk lines for theme matching. */
export function rejectionRiskTheme(risk: string): string {
  return String(risk ?? "")
    .replace(/^no\s+/i, "")
    .replace(
      /\b(experience|evidence|exposure|proof in bullets|platform experience|ownership shown|proof)\b/gi,
      ""
    )
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export function rejectionRiskThemeTokens(risk: string): string[] {
  const theme = rejectionRiskTheme(risk);
  if (!theme) return [];
  const parts = theme
    .split(/[^a-z0-9+/#.&-]+/i)
    .map((t) => t.trim())
    .filter((t) => t.length >= 2);
  return Array.from(new Set([theme, ...parts]));
}

/** How plausibly this bullet can surface proof related to a rejection risk (higher = better rewrite target). */
export function rejectionRiskBulletScore(bulletText: string, risk: string): number {
  const lower = String(bulletText ?? "").toLowerCase();
  const tokens = rejectionRiskThemeTokens(risk);
  if (tokens.length === 0) return 0;

  let hits = 0;
  for (const token of tokens) {
    if (token.length >= 3 && lower.includes(token)) hits += 1;
  }

  const short = lower.length < 88;
  const noNumber = !/\d/.test(lower);

  if (hits === 0) return short || noNumber ? 2 : 1;
  return hits * 6 + (short ? 2 : 0) + (noNumber ? 1 : 0);
}

export function rejectionRisksForBullet(
  bulletText: string,
  selectedRisks: string[]
): string[] {
  if (selectedRisks.length === 0) return [];
  return selectedRisks
    .map((risk) => ({ risk, score: rejectionRiskBulletScore(bulletText, risk) }))
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((row) => row.risk);
}

export function riskAddressedInBulletText(bulletText: string, risk: string): boolean {
  if (rejectionRiskBulletScore(bulletText, risk) >= 2) return true;
  const lower = String(bulletText ?? "").toLowerCase();
  return rejectionRiskThemeTokens(risk).some((token) => token.length >= 4 && lower.includes(token));
}

export function risksBetterAddressedInRewrite(
  original: string,
  improved: string,
  selectedRisks: string[]
): string[] {
  if (selectedRisks.length === 0) return [];
  const out: string[] = [];
  for (const risk of selectedRisks) {
    if (
      riskAddressedInBulletText(improved, risk) &&
      (!original.trim() || !riskAddressedInBulletText(original, risk))
    ) {
      out.push(risk);
    }
  }
  return out;
}

export type RiskProjectPlacement = {
  expIndex: number;
  projectIndex?: number;
  score: number;
};

/** Best role/project to attach a new risk-mitigation bullet (always returns a placement when experience exists). */
export function pickBestProjectPlacementForRisk(
  experience: Array<{
    role?: string;
    company?: string;
    bullets?: string[];
    projects?: Array<{ title?: string; bullets?: string[] }>;
  }>,
  risk: string
): RiskProjectPlacement | null {
  if (!experience.length) return null;

  let best: RiskProjectPlacement = { expIndex: 0, score: -1 };

  for (let expIndex = 0; expIndex < experience.length; expIndex++) {
    const exp = experience[expIndex]!;
    const roleText = `${exp.role ?? ""} ${exp.company ?? ""}`.trim();
    const roleScore = rejectionRiskBulletScore(roleText, risk);

    for (let projectIndex = 0; projectIndex < (exp.projects ?? []).length; projectIndex++) {
      const proj = exp.projects![projectIndex]!;
      const projText = `${proj.title ?? ""} ${(proj.bullets ?? []).join(" ")}`.trim();
      const score = rejectionRiskBulletScore(projText, risk) + roleScore + 4;
      if (score > best.score) {
        best = { expIndex, projectIndex, score };
      }
    }

    const topText = `${roleText} ${(exp.bullets ?? []).join(" ")}`.trim();
    const topScore = rejectionRiskBulletScore(topText, risk) + roleScore;
    if (topScore > best.score) {
      best = { expIndex, score: topScore };
    }
  }

  if (best.score < 0) {
    const first = experience[0]!;
    const projectIndex = (first.projects ?? []).length > 0 ? 0 : undefined;
    return { expIndex: 0, projectIndex, score: 0 };
  }
  return best;
}

export function siblingBulletsForPlacement(
  experience: Array<{
    bullets?: string[];
    projects?: Array<{ bullets?: string[] }>;
  }>,
  placement: RiskProjectPlacement
): string[] {
  const exp = experience[placement.expIndex];
  if (!exp) return [];
  if (placement.projectIndex !== undefined) {
    return (exp.projects?.[placement.projectIndex]?.bullets ?? [])
      .map((b) => String(b ?? "").trim())
      .filter(Boolean)
      .slice(0, 6);
  }
  return (exp.bullets ?? [])
    .map((b) => String(b ?? "").trim())
    .filter(Boolean)
    .slice(0, 6);
}

export function pickBestBulletKeyForRisk(
  bullets: Array<{ bulletKey: string; text: string }>,
  risk: string,
  exclude: Set<string>
): string | null {
  let bestKey: string | null = null;
  let bestScore = -1;
  for (const bullet of bullets) {
    if (exclude.has(bullet.bulletKey)) continue;
    const score = rejectionRiskBulletScore(bullet.text, risk);
    if (score > bestScore) {
      bestScore = score;
      bestKey = bullet.bulletKey;
    }
  }
  return bestKey;
}
