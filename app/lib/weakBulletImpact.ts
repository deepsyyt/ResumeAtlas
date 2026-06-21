import { isEvidenceWeakBullet } from "@/app/lib/resumeEvidenceScore";
import { resolveBulletPlacementLabel } from "@/app/lib/optimizeExperience";
import type { ResumeDocument } from "@/app/lib/resumeDocument";

export type ImpactFocusBulletOutcome = {
  impactIndex: number;
  bulletKey: string;
  original: string;
  improved: string;
  projectTitle?: string;
  placementLabel?: string;
  applied: boolean;
};

export type WeakBulletCandidate = {
  expIndex: number;
  bulletKey: string;
  text: string;
  company?: string;
  role?: string;
  projectTitle?: string;
};

const STRONG_VERB_RE =
  /^(Developed|Led|Built|Designed|Implemented|Created|Optimized|Drove|Owned|Delivered|Established|Scaled|Improved|Reduced|Increased|Spearheaded|Architected|Automated|Streamlined|Collaborated|Directed|Executed|Launched|Transformed|Accelerated|Negotiated|Analyzed|Defined|Operationalized)/i;

/** Weak bullet candidate for outcome-focused rewrite (project bullets preferred). */
export function isWeakBulletForImpact(bullet: string): boolean {
  if (isEvidenceWeakBullet(bullet)) return true;
  const trimmed = String(bullet ?? "").trim();
  if (!trimmed) return false;
  const tooShort = trimmed.length < 88;
  const noNumber = !/\d/.test(trimmed);
  const genericOpen =
    /^(responsible for|worked on|helped with|assisted|supported|involved in|participated in|duties included|tasked with|handled various)\b/i.test(
      trimmed
    );
  const noStrongVerb = !STRONG_VERB_RE.test(trimmed);
  return tooShort || genericOpen || (noNumber && noStrongVerb);
}

function tokenizeForMatch(text: string): string[] {
  return String(text ?? "")
    .toLowerCase()
    .split(/[^a-z0-9+/#.-]+/g)
    .map((t) => t.trim())
    .filter((t) => t.length >= 3);
}

function jdMatchScore(
  bullet: WeakBulletCandidate,
  jobDescription: string,
  matchedSkills: string[]
): number {
  const jdLower = jobDescription.toLowerCase();
  const context = `${bullet.projectTitle ?? ""} ${bullet.text} ${bullet.role ?? ""}`.toLowerCase();
  let score = bullet.projectTitle ? 12 : 0;

  for (const skill of matchedSkills.slice(0, 12)) {
    const tokens = tokenizeForMatch(skill);
    if (tokens.some((t) => context.includes(t))) score += 6;
    if (tokens.some((t) => jdLower.includes(t))) score += 2;
  }

  const jdTokens = tokenizeForMatch(jobDescription.slice(0, 2500));
  const uniqueJd = Array.from(new Set(jdTokens)).slice(0, 40);
  score += uniqueJd.filter((t) => context.includes(t)).length;

  if (isWeakBulletForImpact(bullet.text)) score += 8;
  return score;
}

/** Pick up to `limit` weak project bullets that best match this JD. */
export function pickWeakBulletsForImpactFocus(args: {
  bullets: WeakBulletCandidate[];
  jobDescription: string;
  matchedSkills: string[];
  excludeKeys?: Set<string>;
  limit?: number;
}): WeakBulletCandidate[] {
  const limit = args.limit ?? 2;
  const exclude = args.excludeKeys ?? new Set<string>();
  const projectBullets = args.bullets.filter((b) => b.projectTitle?.trim());

  const scoreCandidate = (b: WeakBulletCandidate) =>
    jdMatchScore(b, args.jobDescription, args.matchedSkills);

  const ranked = projectBullets
    .filter((b) => !exclude.has(b.bulletKey))
    .filter((b) => isWeakBulletForImpact(b.text))
    .map((b) => ({ bullet: b, score: scoreCandidate(b) }))
    .sort((a, b) => b.score - a.score);

  const picked: WeakBulletCandidate[] = [];
  const usedProjects = new Set<string>();

  for (const { bullet, score } of ranked) {
    if (picked.length >= limit) break;
    if (score <= 0 && picked.length > 0) continue;
    const projKey = `${bullet.expIndex}:${bullet.projectTitle?.trim().toLowerCase() ?? ""}`;
    if (usedProjects.has(projKey) && ranked.length > limit) continue;
    picked.push(bullet);
    usedProjects.add(projKey);
  }

  if (picked.length < limit) {
    for (const { bullet } of ranked) {
      if (picked.length >= limit) break;
      if (picked.some((p) => p.bulletKey === bullet.bulletKey)) continue;
      picked.push(bullet);
    }
  }

  return picked.slice(0, limit);
}

export function buildImpactFocusOutcomesFromBulletChanges(args: {
  bulletChangeMap: Record<
    string,
    {
      original: string;
      improved: string;
      impactFocusIndex?: number;
    }
  >;
  structured: ResumeDocument;
}): ImpactFocusBulletOutcome[] {
  const outcomes: ImpactFocusBulletOutcome[] = [];
  for (const [bulletKey, change] of Object.entries(args.bulletChangeMap)) {
    const impactIndex = change.impactFocusIndex;
    if (!impactIndex || impactIndex <= 0) continue;
    const original = String(change.original ?? "").trim();
    const improved = String(change.improved ?? "").trim();
    outcomes.push({
      impactIndex,
      bulletKey,
      original: original || improved,
      improved,
      projectTitle: projectTitleForBulletKey(args.structured, bulletKey),
      applied: improved.length > 0 && improved !== original,
    });
  }
  return enrichImpactFocusOutcomes(
    outcomes.sort((a, b) => a.impactIndex - b.impactIndex),
    args.structured
  );
}

function projectTitleForBulletKey(
  structured: ResumeDocument,
  bulletKey: string
): string | undefined {
  const parts = bulletKey.split(":");
  const expIndex = Number.parseInt(parts[0] ?? "", 10);
  if (!Number.isFinite(expIndex)) return undefined;
  const exp = structured.experience[expIndex];
  if (!exp) return undefined;
  if (parts[1]?.startsWith("p")) {
    const projectIndex = Number.parseInt(parts[1].slice(1), 10);
    return exp.projects?.[projectIndex]?.title;
  }
  return undefined;
}

export function buildImpactNumbersByBulletKey(
  outcomes: ImpactFocusBulletOutcome[]
): Record<string, number[]> {
  const map: Record<string, number[]> = {};
  for (const outcome of outcomes) {
    if (!outcome.applied || !outcome.bulletKey) continue;
    if (!map[outcome.bulletKey]) map[outcome.bulletKey] = [];
    map[outcome.bulletKey]!.push(outcome.impactIndex);
  }
  for (const key of Object.keys(map)) {
    map[key] = Array.from(new Set(map[key]!)).sort((a, b) => a - b);
  }
  return map;
}

export function enrichImpactFocusOutcomes(
  outcomes: ImpactFocusBulletOutcome[],
  structured: ResumeDocument
): ImpactFocusBulletOutcome[] {
  return outcomes.map((o) => ({
    ...o,
    placementLabel:
      o.placementLabel ??
      (o.bulletKey ? resolveBulletPlacementLabel(structured, o.bulletKey) ?? undefined : undefined),
  }));
}
