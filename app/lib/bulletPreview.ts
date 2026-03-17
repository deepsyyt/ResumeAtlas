/**
 * Extract bullet-like lines from resume text for preview optimization.
 */

const BULLET_CHARS = /^[\s]*[•\-*]\s+/;
const SECTION_HEADERS = /^(experience|education|skills|summary|work|employment|projects|technical|qualifications)$/i;

/** Common strong action verbs for resume bullets */
const ACTION_VERBS = new Set(
  [
    "developed", "led", "implemented", "built", "created", "managed", "designed",
    "delivered", "drove", "launched", "established", "improved", "reduced", "increased",
    "achieved", "executed", "coordinated", "optimized", "automated", "scaled",
    "architected", "mentored", "spearheaded", "pioneered", "transformed", "streamlined",
  ].map((w) => w.toLowerCase())
);

/** Words that signal measurable / business impact */
const IMPACT_PHRASES = new Set(
  [
    "improved", "reduced", "increased", "optimized", "accelerated", "automated",
    "saved", "grew", "decreased", "boosted", "enhanced", "cut", "delivered",
    "achieved", "exceeded", "outperformed", "streamlined", "scaled",
  ].map((w) => w.toLowerCase())
);

function hasActionVerb(text: string): boolean {
  const firstWord = text.trim().split(/\s+/)[0]?.toLowerCase().replace(/[^a-z]/g, "");
  if (firstWord && ACTION_VERBS.has(firstWord)) return true;
  const lower = text.toLowerCase();
  return [...ACTION_VERBS].some((verb) => lower.includes(verb));
}

function hasImpactPhrase(text: string): boolean {
  const lower = text.toLowerCase();
  return [...IMPACT_PHRASES].some((phrase) => lower.includes(phrase));
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function hasNumber(text: string): boolean {
  return /\d/.test(text);
}

/** Ratio of uppercase letters to total letters (a-z, A-Z). 1 = all caps. */
function uppercaseRatio(text: string): number {
  const letters = text.replace(/[^a-zA-Z]/g, "");
  if (letters.length === 0) return 0;
  const upper = letters.replace(/[a-z]/g, "").length;
  return upper / letters.length;
}

/** Extract lines that look like real resume bullets (not section headers, not ALL CAPS, not too short). */
export function extractBullets(resumeText: string): string[] {
  if (!resumeText?.trim()) return [];
  const lines = resumeText
    .split(/\n/)
    .map((l) => l.replace(BULLET_CHARS, "").trim())
    .filter((l) => l.length >= 8 && l.length <= 280);
  return lines.filter((line) => {
    const lower = line.toLowerCase();
    if (SECTION_HEADERS.test(lower)) return false;
    if (wordCount(line) < 4) return false;
    if (uppercaseRatio(line) > 0.7) return false;
    if (/^[\d.]+\s*$/.test(line.trim())) return false;
    return true;
  });
}

/**
 * Deterministic "weakest" bullet for preview: same resume always picks the same bullet.
 * Weak score: +2 no numbers, +1 if < 12 words, +1 no action verb, +2 no impact phrase.
 * Higher score = weaker bullet. Ties broken by document order (first in list).
 */
export function getWeakestBullet(bullets: string[]): string | null {
  if (bullets.length === 0) return null;
  const scored = bullets.map((b, index) => {
    const words = wordCount(b);
    const hasNum = hasNumber(b);
    const hasVerb = hasActionVerb(b);
    const hasImpact = hasImpactPhrase(b);
    const score =
      (!hasNum ? 2 : 0) +
      (words < 12 ? 1 : 0) +
      (!hasVerb ? 1 : 0) +
      (!hasImpact ? 2 : 0);
    return { bullet: b, score, index };
  });
  const sorted = [...scored].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.index - b.index;
  });
  return sorted[0]?.bullet ?? null;
}

/**
 * Bullet is "strong" if it has numbers and impact phrasing — don't rewrite, show trust message.
 */
export function isStrongBullet(bullet: string): boolean {
  if (!bullet?.trim()) return false;
  return hasNumber(bullet) && hasImpactPhrase(bullet);
}
