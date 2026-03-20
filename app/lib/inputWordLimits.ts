/**
 * Word limits for resume + job description inputs (LLM cost, latency, abuse).
 */
export const JOB_DESCRIPTION_MAX_WORDS = 650;
export const RESUME_TEXT_MAX_WORDS = 1000;

export function countWords(text: string): number {
  const t = String(text ?? "").trim();
  if (!t) return 0;
  return t.split(/\s+/).filter(Boolean).length;
}

/** Truncate after the Nth word, preserving leading text and line breaks up to that point. */
export function clipToWordLimit(text: string, maxWords: number): string {
  if (maxWords <= 0) return "";
  let count = 0;
  let i = 0;
  const len = text.length;
  while (i < len && count < maxWords) {
    while (i < len && /\s/.test(text[i]!)) i++;
    if (i >= len) break;
    count++;
    while (i < len && !/\s/.test(text[i]!)) i++;
  }
  return text.slice(0, i).replace(/\s+$/, "");
}
