/** Escape special regex characters in a literal term. */
export function escapeRegExp(text: string): string {
  return String(text ?? "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Short skills that double as common English words — never match via substring search. */
const HOMOGRAPH_SKILL_KEYS = new Set([
  "go",
  "r",
  "c",
  "d",
  "f",
  "ai",
  "bi",
  "it",
  "os",
  "ui",
  "ux",
  "qa",
  "pm",
]);

/** True for 1–2 letter skills or known English homographs (e.g. Go the language vs "go"). */
export function isHomographSkillTerm(skill: string): boolean {
  const trimmed = String(skill ?? "").trim();
  if (!trimmed) return false;
  if (HOMOGRAPH_SKILL_KEYS.has(trimmed.toLowerCase())) return true;
  return /^[a-z]{1,2}$/i.test(trimmed);
}

const GO_TECHNICAL_PATTERNS: RegExp[] = [
  /\bgolang\b/i,
  /\bgo\s*\/\s*golang\b/i,
  /\bgo\s+(programming|language|toolchain|toolchains|modules?|routines?|services?|microservices?|backend|binaries|developer|engineers?)\b/i,
  /\bwritten\s+in\s+go\b/i,
  /\bgo\s+and\s+(rust|python|java)\b/i,
  /\b(rust|python|java)\s+and\s+go\b/i,
];

/** Technical evidence for homograph skills — avoids matching "google", "going", or verb "go". */
export function homographSkillEvidenceInText(text: string, skill: string): boolean {
  const haystack = String(text ?? "");
  if (!haystack.trim()) return false;
  const key = String(skill ?? "").trim().toLowerCase();
  if (!key) return false;

  if (key === "go") {
    if (GO_TECHNICAL_PATTERNS.some((re) => re.test(haystack))) return true;
    // Language convention: capital "Go" in skills lists / bullets (not lowercase verb "go").
    return /\bGo\b/.test(haystack);
  }

  if (key === "r") {
    return (
      /\br\s+programming\b/i.test(haystack) ||
      /\br\s+language\b/i.test(haystack) ||
      /\brstudio\b/i.test(haystack) ||
      /\bggplot2\b/i.test(haystack) ||
      /\btidyverse\b/i.test(haystack) ||
      /\bshiny\s+apps?\b/i.test(haystack)
    );
  }

  if (key === "c") {
    return (
      /\bc\s+programming\b/i.test(haystack) ||
      /\bc\s+language\b/i.test(haystack) ||
      /\bansi\s+c\b/i.test(haystack)
    );
  }

  if (key === "ai") {
    return (
      /\bartificial\s+intelligence\b/i.test(haystack) ||
      /\bAI\b/.test(haystack) ||
      /\bA\.I\.\b/i.test(haystack) ||
      /\bmachine\s+learning\b/i.test(haystack) ||
      /\bML\b/.test(haystack)
    );
  }

  // Other homographs: require whole-word match, never substring.
  return strictTermMatchesInText(haystack, skill);
}

/** JD must name a homograph skill as a technology, not an English verb or generic word. */
export function jdMentionsHomographSkillAsTechnical(jdText: string, skill: string): boolean {
  const trimmed = String(skill ?? "").trim();
  if (!trimmed || !isHomographSkillTerm(trimmed)) return true;
  return homographSkillEvidenceInText(jdText, trimmed);
}

/**
 * Safe resume evidence check for short / homograph skills.
 * Returns null when the caller should use normal (longer-phrase) matching.
 */
export function resumeShowsHomographOrShortSkillEvidence(
  resumeText: string,
  skillPhrase: string
): boolean | null {
  const skill = String(skillPhrase ?? "").trim();
  if (!skill) return null;

  if (isHomographSkillTerm(skill)) {
    return homographSkillEvidenceInText(resumeText, skill);
  }

  if (skill.length <= 3) {
    return strictTermMatchesInText(resumeText, skill);
  }

  return null;
}

/**
 * Build a regex fragment that matches a skill/keyword as a whole term,
 * not as a substring inside another word (e.g. "spa" ≠ "transparency").
 */
export function strictTermHighlightPattern(term: string): string {
  const trimmed = String(term ?? "").trim();
  if (!trimmed) return "";
  const escaped = escapeRegExp(trimmed);
  if (trimmed.includes("/")) return escaped;
  return `\\b${escaped}\\b`;
}

/** True when `term` appears in `text` as a whole word or phrase — not embedded in another word. */
export function strictTermMatchesInText(text: string, term: string): boolean {
  const haystack = String(text ?? "");
  const needle = String(term ?? "").trim();
  if (!needle || !haystack) return false;
  const pattern = strictTermHighlightPattern(needle);
  if (!pattern) return false;
  return new RegExp(pattern, "i").test(haystack);
}

const PERCENT_HIGHLIGHT_PATTERN = String.raw`\d+(?:\.\d+)?%`;

/** Build a regex that highlights only whole-word terms present in `text`. */
export function buildStrictHighlightRegex(
  text: string,
  terms: string[],
  options?: { includePercents?: boolean }
): RegExp | null {
  const present = filterTermsPresentInText(text, terms).sort((a, b) => b.length - a.length);
  const patterns = present
    .map((term) => strictTermHighlightPattern(term))
    .filter((pattern) => pattern.length > 0);

  if (options?.includePercents !== false && new RegExp(PERCENT_HIGHLIGHT_PATTERN).test(text)) {
    patterns.push(PERCENT_HIGHLIGHT_PATTERN);
  }

  if (patterns.length === 0) return null;
  return new RegExp(`(${patterns.join("|")})`, "gi");
}

/** Split text into segments; odd indices are strict whole-word highlight matches. */
export function splitTextByStrictHighlights(
  text: string,
  terms: string[],
  options?: { includePercents?: boolean }
): string[] {
  const re = buildStrictHighlightRegex(text, terms, options);
  if (!re) return [text];
  return text.split(re);
}

/** Keep only terms that strictly appear in the text (for safe UI highlighting). */
export function filterTermsPresentInText(text: string, terms: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of terms) {
    const term = raw.trim();
    if (!term) continue;
    const key = term.toLowerCase();
    if (seen.has(key)) continue;
    if (!strictTermMatchesInText(text, term)) continue;
    seen.add(key);
    out.push(term);
  }
  return out.sort((a, b) => b.length - a.length);
}

/** Acronyms ≤3 letters only count when written in uppercase in the bullet (e.g. SPA, not spa in transparency). */
export function strictSkillMatchesInBullet(skill: string, bulletText: string): boolean {
  const skillTrimmed = String(skill ?? "").trim();
  if (!skillTrimmed) return false;

  if (isHomographSkillTerm(skillTrimmed)) {
    return homographSkillEvidenceInText(bulletText, skillTrimmed);
  }

  if (/^[A-Za-z]{1,3}$/.test(skillTrimmed) && skillTrimmed === skillTrimmed.toUpperCase()) {
    const escaped = escapeRegExp(skillTrimmed);
    return new RegExp(`\\b${escaped}\\b`).test(bulletText);
  }

  if (strictTermMatchesInText(bulletText, skillTrimmed)) return true;

  const tokens = skillTrimmed
    .toLowerCase()
    .split(/[^a-z0-9+/#.-]+/g)
    .map((t) => t.trim())
    .filter((t) => t.length >= 3);
  if (tokens.length === 0) return false;

  const strongTokens = tokens.filter((t) => t.length >= 4);
  if (strongTokens.length > 0) {
    return strongTokens.every((t) => strictTermMatchesInText(bulletText, t));
  }
  return tokens.every((t) => strictTermMatchesInText(bulletText, t));
}
