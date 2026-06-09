import type { ResumeDocument } from "@/app/lib/resumeDocument";

/** Instruct LLMs not to use long dashes in resume copy (common AI tell). */
export const NO_EM_DASH_RULE =
  "Do not use em dashes (—) or en dashes (–) as punctuation in resume prose. Use commas, colons, or separate sentences instead. Hyphens in compound words and date ranges (e.g. 2019-2023) are fine.";

export const SUMMARY_TOKEN_MIN = 120;
export const SUMMARY_TOKEN_MAX = 150;

export const SUMMARY_LENGTH_RULE = `Keep the professional summary between ${SUMMARY_TOKEN_MIN} and ${SUMMARY_TOKEN_MAX} tokens (roughly 4-6 tight sentences). Never exceed ${SUMMARY_TOKEN_MAX} tokens.`;

/** Rough LLM token estimate for English prose (word count × 1.33). */
export function estimateTokenCount(text: string): number {
  const words = String(text ?? "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return 0;
  return Math.ceil(words.length * 1.33);
}

/** Enforce summary max token length without breaking mid-word when possible. */
export function clampSummaryTokenLength(text: string, maxTokens = SUMMARY_TOKEN_MAX): string {
  let result = sanitizeResumeProse(String(text ?? "").trim());
  if (!result || estimateTokenCount(result) <= maxTokens) return result;

  const sentences = result.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [result];
  while (sentences.length > 1 && estimateTokenCount(sentences.join(" ").trim()) > maxTokens) {
    sentences.pop();
  }
  result = sentences.join(" ").trim();
  if (estimateTokenCount(result) <= maxTokens) return result;

  const words = result.split(/\s+/).filter(Boolean);
  while (words.length > 0 && estimateTokenCount(words.join(" ")) > maxTokens) {
    words.pop();
  }
  return words.join(" ").trim();
}

const META_BULLET_PATTERNS: RegExp[] = [
  /\bi cannot rewrite\b/i,
  /\bi can't rewrite\b/i,
  /\bto proceed,?\s+i need\b/i,
  /\bthe source bullet\b/i,
  /\bas presented because\b/i,
  /\blacks concrete\b/i,
  /\bno evidence of:\b/i,
  /\bgeneric filler\b/i,
  /\bplease provide\b/i,
  /\bunable to rewrite\b/i,
  /\bcannot improve this bullet\b/i,
  /\breturn the original bullet\b/i,
  /\bi need the following\b/i,
];

/** True when LLM output is a refusal, question, or meta-commentary — not resume prose. */
export function isInvalidBulletRewrite(candidate: string, _original?: string): boolean {
  const c = String(candidate ?? "").trim();
  if (!c) return true;
  if (/^reject$/i.test(c)) return true;
  if (c.length > 320) return true;
  if (/^(I cannot|I can't|Unfortunately|Sorry|Note:|Please note|As an AI)\b/i.test(c)) {
    return true;
  }
  if (META_BULLET_PATTERNS.some((re) => re.test(c))) return true;
  if ((c.match(/\*\*[^*]+\*\*/g) ?? []).length >= 1) return true;
  if ((c.match(/\n\s*-\s+/g) ?? []).length >= 2) return true;
  if ((c.match(/\n\s*\d+\.\s+/g) ?? []).length >= 1) return true;
  const words = c.split(/\s+/).filter(Boolean);
  if (words.length > 45) return true;
  return false;
}

/** Use LLM bullet rewrite only when output is valid resume prose; otherwise keep original. */
export function acceptBulletRewrite(original: string, candidate: string): string {
  const orig = sanitizeResumeProse(String(original ?? "").trim());
  const cand = sanitizeResumeProse(String(candidate ?? "").trim());
  if (!cand || isInvalidBulletRewrite(cand, orig)) return orig;
  return cand;
}

/** Strip em/en dashes used as punctuation; preserve year ranges. */
export function sanitizeResumeProse(text: string): string {
  let result = String(text ?? "");
  result = result.replace(
    /\b((?:19|20)\d{2})\s*[—–]\s*(present|current|(?:19|20)\d{2})\b/gi,
    (_, year: string, end: string) => `${year}-${end}`
  );
  result = result.replace(/\s+--\s+/g, ", ");
  result = result.replace(/\s*[—–]\s*/g, ", ");
  result = result.replace(/,\s*,+/g, ", ");
  result = result.replace(/,\s*([.;])/g, "$1");
  result = result.replace(/\s{2,}/g, " ");
  return result.trim();
}

/** Apply {@link sanitizeResumeProse} to every user-facing text field in a resume document. */
export function sanitizeResumeDocumentProse(doc: ResumeDocument): ResumeDocument {
  const prose = (text?: string) => {
    if (!text?.trim()) return text;
    return sanitizeResumeProse(text);
  };

  return {
    ...doc,
    name: prose(doc.name),
    title: prose(doc.title),
    summary: prose(doc.summary),
    skills: doc.skills?.map(sanitizeResumeProse),
    skillGroups: doc.skillGroups?.map((group) => ({
      ...group,
      label: sanitizeResumeProse(group.label),
      items: group.items.map(sanitizeResumeProse),
    })),
    experience: doc.experience?.map((exp) => ({
      ...exp,
      company: sanitizeResumeProse(exp.company),
      role: sanitizeResumeProse(exp.role),
      dates: prose(exp.dates) ?? "",
      bullets: exp.bullets?.map(sanitizeResumeProse),
      projects: exp.projects?.map((project) => ({
        ...project,
        title: sanitizeResumeProse(project.title),
        bullets: project.bullets?.map(sanitizeResumeProse),
      })),
    })),
    education: doc.education?.map(sanitizeResumeProse),
    certifications: doc.certifications?.map(sanitizeResumeProse),
    awards: doc.awards?.map(sanitizeResumeProse),
    additionalSections: doc.additionalSections?.map((section) => ({
      title: sanitizeResumeProse(section.title),
      lines: section.lines?.map(sanitizeResumeProse),
    })),
  };
}
