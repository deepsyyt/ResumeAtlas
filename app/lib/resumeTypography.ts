import type { ResumeDocument } from "@/app/lib/resumeDocument";

/** Instruct LLMs not to use long dashes in resume copy (common AI tell). */
export const NO_EM_DASH_RULE =
  "Do not use em dashes (—) or en dashes (–) as punctuation in resume prose. Use commas, colons, or separate sentences instead. Hyphens in compound words and date ranges (e.g. 2019-2023) are fine.";

export const SUMMARY_TOKEN_MIN = 120;
export const SUMMARY_TOKEN_MAX = 150;

export const SUMMARY_LENGTH_RULE = `Keep the professional summary between ${SUMMARY_TOKEN_MIN} and ${SUMMARY_TOKEN_MAX} tokens (roughly 4-6 tight sentences). Never exceed ${SUMMARY_TOKEN_MAX} tokens.`;

/** Dashboard takeaway from /api/analyze — three labeled lines. */
export const ANALYZE_MATCH_SUMMARY_MAX_TOKENS = 110;
export const ANALYZE_MATCH_SUMMARY_SECTION_MAX_WORDS = 28;
export const ANALYZE_MATCH_SUMMARY_SECTION_MAX_TOKENS = 36;
export const ANALYZE_MATCH_SUMMARY_MAX_SENTENCES = 3;

export const ANALYZE_MATCH_SUMMARY_RULE = `summary: REQUIRED structured string with EXACTLY 3 sentences. You MUST include all three labeled sections below in this order. Each JD/resume body is ≤ ${ANALYZE_MATCH_SUMMARY_SECTION_MAX_WORDS} words. Total ≤ ${ANALYZE_MATCH_SUMMARY_MAX_TOKENS} tokens.

Required format:
"JD needs: [≤${ANALYZE_MATCH_SUMMARY_SECTION_MAX_WORDS} words]. Resume shows: [≤${ANALYZE_MATCH_SUMMARY_SECTION_MAX_WORDS} words]. Match: strong|weak|no match."

Section rules:
1) "JD needs: " — top 1-2 JD priorities only (level, domain, must-have skills). Shorten if over ${ANALYZE_MATCH_SUMMARY_SECTION_MAX_WORDS} words; never skip this label.
2) "Resume shows: " — bullet-proven evidence only from the resume text. Shorten if over ${ANALYZE_MATCH_SUMMARY_SECTION_MAX_WORDS} words; never skip this label.
3) "Match: " — exactly one of: strong, weak, or no match (strong = most JD priorities evidenced; weak = partial/thin proof; no match = major mismatch).

If space is tight, shorten JD needs and Resume shows — NEVER omit Resume shows or Match. No fourth sentence. No newlines, bullets, em dashes, or lists.

Self-check before JSON: all three prefixes present; JD and Resume bodies each ≤ ${ANALYZE_MATCH_SUMMARY_SECTION_MAX_WORDS} words.`;

export type AnalyzeMatchLevel = "strong" | "weak" | "no_match";

export type ParsedAnalyzeMatchSummary = {
  jdNeeds: string;
  resumeShows: string;
  match: AnalyzeMatchLevel;
};

export type PartialAnalyzeMatchSummary = {
  jdNeeds?: string;
  resumeShows?: string;
  match?: AnalyzeMatchLevel;
};

const stripSectionTail = (s: string) => s.replace(/\.\s*$/, "").trim();

function matchLevelFromToken(token: string): AnalyzeMatchLevel {
  const levelToken = token.toLowerCase().replace(/\s+/g, " ");
  return levelToken === "no match" ? "no_match" : (levelToken as "strong" | "weak");
}

function matchLevelToken(level: AnalyzeMatchLevel): string {
  return level === "no_match" ? "no match" : level;
}

/** Split structured analyze summary into labeled sections (partial OK). */
export function splitAnalyzeMatchSummarySections(text: string): PartialAnalyzeMatchSummary {
  const raw = String(text ?? "").trim();
  const parts: PartialAnalyzeMatchSummary = {};

  const jdMatch = raw.match(/\bJD needs:\s*(.*?)(?=\s*Resume shows:|\s*Match:|$)/is);
  const resumeMatch = raw.match(/\bResume shows:\s*(.*?)(?=\s*Match:|$)/is);
  const levelMatch = raw.match(/\bMatch:\s*(strong|weak|no\s*match)\b/i);

  if (jdMatch?.[1]?.trim()) parts.jdNeeds = stripSectionTail(jdMatch[1]);
  if (resumeMatch?.[1]?.trim()) parts.resumeShows = stripSectionTail(resumeMatch[1]);
  if (levelMatch?.[1]) parts.match = matchLevelFromToken(levelMatch[1]);

  return parts;
}

/** Parse structured analyze summary ("JD needs / Resume shows / Match"). */
export function parseAnalyzeMatchSummary(text: string): ParsedAnalyzeMatchSummary | null {
  const parts = splitAnalyzeMatchSummarySections(text);
  if (!parts.jdNeeds || !parts.resumeShows || !parts.match) return null;
  return {
    jdNeeds: parts.jdNeeds,
    resumeShows: parts.resumeShows,
    match: parts.match,
  };
}

export function analyzeMatchLevelLabel(level: AnalyzeMatchLevel): string {
  if (level === "no_match") return "No match";
  if (level === "weak") return "Weak match";
  return "Strong match";
}

export const ANALYZE_MATCH_SUMMARY_RULE_RESUME_ONLY = `summary: EXACTLY 1-2 short sentences, total ≤ ${ANALYZE_MATCH_SUMMARY_MAX_TOKENS} tokens. Sentence 1: ATS structure and readability. Sentence 2: state that no job description was used, so posting keyword match was not evaluated. No newlines or bullets.`;

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

/** Enforce max word count for a summary section body (JD needs / Resume shows). */
export function clampSectionWordLength(text: string, maxWords = ANALYZE_MATCH_SUMMARY_SECTION_MAX_WORDS): string {
  const words = String(text ?? "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length <= maxWords) return words.join(" ");
  return words
    .slice(0, maxWords)
    .join(" ")
    .replace(/[,;:\-]+$/, "")
    .trim();
}

function clampAnalyzeSectionBody(text: string): string {
  const wordClamped = clampSectionWordLength(text);
  return clampSummaryTokenLength(wordClamped, ANALYZE_MATCH_SUMMARY_SECTION_MAX_TOKENS);
}

function assembleAnalyzeMatchSummary(parts: PartialAnalyzeMatchSummary): string {
  const segments: string[] = [];
  if (parts.jdNeeds) segments.push(`JD needs: ${parts.jdNeeds}.`);
  if (parts.resumeShows) segments.push(`Resume shows: ${parts.resumeShows}.`);
  if (parts.match) segments.push(`Match: ${matchLevelToken(parts.match)}.`);
  return segments.join(" ").trim();
}

/** Enforce analyze dashboard summary: preserve all labeled sections when possible. */
export function clampAnalyzeMatchSummary(text: string): string {
  let result = String(text ?? "")
    .trim()
    .replace(/\s+/g, " ");
  if (!result) return result;

  const sections = splitAnalyzeMatchSummarySections(result);
  if (sections.jdNeeds || sections.resumeShows || sections.match) {
    const clamped: PartialAnalyzeMatchSummary = {
      jdNeeds: sections.jdNeeds ? clampAnalyzeSectionBody(sections.jdNeeds) : undefined,
      resumeShows: sections.resumeShows ? clampAnalyzeSectionBody(sections.resumeShows) : undefined,
      match: sections.match,
    };

    let assembled = assembleAnalyzeMatchSummary(clamped);
    if (estimateTokenCount(assembled) <= ANALYZE_MATCH_SUMMARY_MAX_TOKENS) return assembled;

    if (clamped.resumeShows) {
      clamped.resumeShows = clampSectionWordLength(
        clamped.resumeShows,
        Math.max(10, ANALYZE_MATCH_SUMMARY_SECTION_MAX_WORDS - 6)
      );
      assembled = assembleAnalyzeMatchSummary(clamped);
      if (estimateTokenCount(assembled) <= ANALYZE_MATCH_SUMMARY_MAX_TOKENS) return assembled;
    }

    if (clamped.jdNeeds) {
      clamped.jdNeeds = clampSectionWordLength(
        clamped.jdNeeds,
        Math.max(10, ANALYZE_MATCH_SUMMARY_SECTION_MAX_WORDS - 6)
      );
      assembled = assembleAnalyzeMatchSummary(clamped);
      if (estimateTokenCount(assembled) <= ANALYZE_MATCH_SUMMARY_MAX_TOKENS) return assembled;
    }

    return assembled;
  }

  const sentences = result.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [result];
  if (sentences.length > ANALYZE_MATCH_SUMMARY_MAX_SENTENCES) {
    result = sentences.slice(0, ANALYZE_MATCH_SUMMARY_MAX_SENTENCES).join(" ").trim();
  }

  return clampSummaryTokenLength(result, ANALYZE_MATCH_SUMMARY_MAX_TOKENS);
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
