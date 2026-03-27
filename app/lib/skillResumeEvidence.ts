/**
 * Deterministic checks that a JD skill phrase appears in the resume text.
 * Used to repair LLM false negatives (skills only mentioned in projects/titles, not Skills section).
 */

function normalizeResumeBlob(text: string): string {
  return String(text ?? "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[(){}\[\],;:]/g, " ")
    .replace(/\r?\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Regex bundles keyed by lowercase JD skill phrase (trimmed). */
const SKILL_EVIDENCE: Record<string, RegExp[]> = {
  "large language models": [
    /\blarge\s+language\s+models?\b/i,
    /\bllms?\b/i,
    /\bfoundation\s+models?\b/i,
  ],
  llms: [/\bllms?\b/i, /\blarge\s+language\s+models?\b/i],
  "a/b testing": [
    /\ba\/b\s*tests?\b/i,
    /\ba\/b\s+testing\b/i,
    /\bab\s+testing\b/i,
    /\bab\s+tests?\b/i,
    /\bsplit\s+tests?\b/i,
    /\bmultivariate\s+(tests?|experiment)/i,
  ],
  "ab testing": [
    /\ba\/b\s*tests?\b/i,
    /\ba\/b\s+testing\b/i,
    /\bab\s+testing\b/i,
    /\bab\s+tests?\b/i,
    /\bsplit\s+tests?\b/i,
  ],
  "recommendation systems": [
    /\brecommendation\s+systems?\b/i,
    /\brecommendation\s+(&|and)\s+personalization\b/i,
    /\brecommendation\s*[,&]\s*personalization\b/i,
    /\bpersonalization.{0,80}\brecommendation\b/i,
    /\brecommendation.{0,80}\bpersonalization\b/i,
    /\brecommender\s+(systems?|models?|engines?|pipelines?)\b/i,
    /\brecommendation\s+(engines?|models?|pipelines?|platforms?)\b/i,
  ],
  experimentation: [
    /\ba\/b\s*tests?\b/i,
    /\ba\/b\s+testing\b/i,
    /\bab\s+testing\b/i,
    /\bexperimentation\b/i,
    /\bexperimental\s+design\b/i,
    /\brandomized\s+controlled\b/i,
  ],
  "causal inference": [/\bcausal\s+inference\b/i, /\bcausality\b/i, /\bcausal\s+models?\b/i],
  "search relevance": [
    /\bsearch\s+relevance\b/i,
    /\brelevance.{0,40}\bsearch\b/i,
    /\bsearch.{0,40}\brelevance\b/i,
    /\branking\s+(&|and)\s+relevance\b/i,
  ],
  "natural language understanding": [
    /\bnatural\s+language\s+understanding\b/i,
    /\bnlu\b/i,
  ],
  "knowledge graphs": [/\bknowledge\s+graphs?\b/i, /\bknowledge\s+graph\b/i],
  "anomaly detection": [/\banomaly\s+detection\b/i],
  "time series forecasting": [
    /\btime\s*series\s+forecast/i,
    /\bforecasting\b.*\btime\s+series\b/i,
    /\btime\s+series\b.*\bforecast/i,
  ],
  optimization: [/\boptimization\b/i, /\boptimisation\b/i],
  "cloud platforms": [
    /\baws\b/i,
    /\bgcp\b/i,
    /\bazure\b/i,
    /\bgoogle\s+cloud\b/i,
    /\bamazon\s+web\s+services\b/i,
    /\bmicrosoft\s+azure\b/i,
    /\bcloud\s+(platform|infrastructure|services?)\b/i,
  ],
};

function normalizeSkillKey(skill: string): string {
  return skill
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/\([^)]*\)/g, " ")
    .replace(/[^\w\s/+.-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractParentheticalOptions(skill: string): string[] {
  const chunks = Array.from(skill.matchAll(/\(([^)]*)\)/g))
    .map((m) => m[1]?.trim() ?? "")
    .filter(Boolean);
  if (!chunks.length) return [];
  const opts: string[] = [];
  for (const chunk of chunks) {
    const cleaned = chunk
      .replace(/\be\.?g\.?\b/gi, " ")
      .replace(/\bi\.?e\.?\b/gi, " ")
      .replace(/[^\w\s/+.-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (!cleaned) continue;
    const split = cleaned
      .split(/\s*(?:,|\/|\bor\b|\band\b)\s*/i)
      .map((s) => s.trim())
      .filter(Boolean);
    opts.push(...split);
  }
  return Array.from(new Set(opts));
}

function phraseRegexFromSkill(skill: string): RegExp | null {
  const words = skill
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .filter(Boolean);
  if (words.length === 0) return null;
  return new RegExp(words.join("\\s+"), "i");
}

/**
 * Returns true if the resume contains textual evidence for skillPhrase
 * (substring, flexible phrase, or known synonym patterns).
 */
export function resumeShowsSkillEvidence(resumeText: string, skillPhrase: string): boolean {
  const skill = skillPhrase.trim();
  if (!skill) return false;

  const blob = normalizeResumeBlob(resumeText);
  const key = normalizeSkillKey(skill);
  const rawKey = skill.toLowerCase().trim();

  if (blob.includes(key)) return true;
  if (rawKey && blob.includes(rawKey)) return true;

  const flex = phraseRegexFromSkill(skill);
  if (flex && flex.test(blob)) return true;

  const normalizedFlex = phraseRegexFromSkill(key);
  if (normalizedFlex && normalizedFlex.test(blob)) return true;

  const patterns = SKILL_EVIDENCE[key];
  if (patterns?.some((re) => re.test(blob))) return true;
  const rawPatterns = SKILL_EVIDENCE[rawKey];
  if (rawPatterns?.some((re) => re.test(blob))) return true;

  // Slash/casing variants for short skills (e.g. "A/b" vs "a/b")
  const compactKey = key.replace(/\s*\/\s*/g, "/");
  if (compactKey !== key && blob.includes(compactKey)) return true;

  // Parenthetical variants are common in JD skills:
  // "cloud platforms (Azure, GCP, or AWS)" or "Large Language Models (LLMs)".
  // Treat explicit options as equivalent evidence.
  const options = extractParentheticalOptions(skill);
  for (const option of options) {
    const optKey = normalizeSkillKey(option);
    if (!optKey) continue;
    if (blob.includes(optKey)) return true;
    const optFlex = phraseRegexFromSkill(optKey);
    if (optFlex && optFlex.test(blob)) return true;
    const optPatterns = SKILL_EVIDENCE[optKey];
    if (optPatterns?.some((re) => re.test(blob))) return true;
  }

  return false;
}

export type SkillListsRepair = {
  matched_skills: string[];
  missing_skills: string[];
  missing_skills_required?: string[];
  missing_skills_preferred?: string[];
  keyword_coverage: number;
};

/**
 * Promote skills from missing → matched when deterministic evidence exists in the resume.
 * Recalculates keyword_coverage from matched / (matched + missing).
 */
export function repairSkillListsAgainstResume(
  resumeText: string,
  matched_skills: string[],
  missing_skills: string[],
  missing_skills_required?: string[],
  missing_skills_preferred?: string[],
  keyword_coverage?: number
): SkillListsRepair {
  const dedupe = (arr: string[]) => {
    const seen = new Set<string>();
    const out: string[] = [];
    for (const s of arr) {
      const t = typeof s === "string" ? s.trim() : "";
      if (!t || seen.has(t)) continue;
      seen.add(t);
      out.push(t);
    }
    return out;
  };

  let matched = dedupe(matched_skills);
  let missing = dedupe(missing_skills);
  let req = dedupe(missing_skills_required ?? []);
  let pref = dedupe(missing_skills_preferred ?? []);

  const promoted = new Set<string>();
  for (const s of missing) {
    if (resumeShowsSkillEvidence(resumeText, s)) promoted.add(s);
  }

  if (promoted.size === 0) {
    const total = matched.length + missing.length;
    const cov =
      typeof keyword_coverage === "number"
        ? Math.max(0, Math.min(100, Math.round(keyword_coverage)))
        : total > 0
          ? Math.round((matched.length / total) * 100)
          : 100;
    return {
      matched_skills: matched,
      missing_skills: missing,
      missing_skills_required: req.length > 0 || pref.length > 0 ? req : undefined,
      missing_skills_preferred: pref.length > 0 ? pref : undefined,
      keyword_coverage: cov,
    };
  }

  const matchedSet = new Set(matched);
  Array.from(promoted).forEach((s) => {
    if (!matchedSet.has(s)) {
      matched.push(s);
      matchedSet.add(s);
    }
  });
  missing = missing.filter((s) => !promoted.has(s));
  req = req.filter((s) => !promoted.has(s));
  pref = pref.filter((s) => !promoted.has(s));

  const total = matched.length + missing.length;
  const cov = total > 0 ? Math.round((matched.length / total) * 100) : 100;

  return {
    matched_skills: matched,
    missing_skills: missing,
    missing_skills_required: req.length > 0 || pref.length > 0 ? req : undefined,
    missing_skills_preferred: pref.length > 0 ? pref : undefined,
    keyword_coverage: cov,
  };
}
