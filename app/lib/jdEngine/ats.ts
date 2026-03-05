import { normalizeText } from "./normalize";

// Public helpers to compute readability and stuffing score from a resume.
// These are deterministic and role-agnostic.

export function computeATSReadability(resumeText: string): number {
  const normalizedResume = normalizeText(resumeText);

  let readability = 0;
  const sectionKeywords = ["summary", "experience", "education", "skills"];
  for (const keyword of sectionKeywords) {
    if (normalizedResume.includes(keyword)) {
      readability += 25;
    }
  }
  return clamp0to100(readability);
}

export function computeKeywordStuffingScore(resumeText: string): number {
  const normalized = normalizeText(resumeText);
  const words = normalized.split(/\s+/).filter((w) => w.length > 2);
  const total = words.length;
  if (total === 0) return 100;

  const freq: Record<string, number> = {};
  for (const w of words) {
    freq[w] = (freq[w] ?? 0) + 1;
  }
  const maxFreq = Math.max(0, ...Object.values(freq));
  const ratio = maxFreq / total; // higher ratio => more stuffing

  // Map ratio to a stuffing "health" score (higher is better, less stuffing)
  // ratio <= 3%  -> 100
  // ratio >= 12% -> 50
  const minRatio = 0.03;
  const maxRatio = 0.12;
  if (ratio <= minRatio) return 100;
  if (ratio >= maxRatio) return 50;

  const t = (ratio - minRatio) / (maxRatio - minRatio); // 0..1
  const score = 100 - Math.round(t * 50); // 100 -> 50
  return clamp0to100(score);
}

// Core ATS pass probability using keyword coverage only
export function computeATSPassProbability(
  matchedCount: number,
  totalRequired: number
): number {
  let coverage = 0;
  if (totalRequired > 0 && matchedCount >= 0) {
    coverage = Math.round((matchedCount / totalRequired) * 100);
  }
  const coverageClamped = clamp0to100(coverage);
  return coverageClamped;
}

function clamp0to100(value: number): number {
  if (!Number.isFinite(value)) return 0;
  if (value < 0) return 0;
  if (value > 100) return 100;
  return Math.round(value);
}

