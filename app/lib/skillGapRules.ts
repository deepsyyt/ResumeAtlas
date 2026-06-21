/**
 * Strict rules for what counts as a JD skill gap / missing keyword.
 * Shared by analyze + optimize LLM prompts and post-processing filters.
 */
import {
  isHomographSkillTerm,
  jdMentionsHomographSkillAsTechnical,
} from "@/app/lib/resumeTermMatch";

/** Prompt block: only technical, leadership, and soft skills may appear as missing keywords. */
export const SKILL_GAP_LLM_RULES = `
Skill gap / missing keyword rules (STRICT — non-negotiable):

Only include a phrase in missing_skills, missing_skills_required, or missing_skills_preferred if it clearly belongs to ONE of these categories:

1. Technical skills — concrete tools, technologies, platforms, programming languages, frameworks, libraries, databases, cloud services, certifications, or named technical methods/disciplines (e.g. "Python", "Spark", "SQL", "A/B testing", "Graph Neural Networks", "CI/CD", "Kubernetes").

2. Leadership skills — people leadership, team or org management, mentoring, coaching, hiring, program/portfolio ownership, executive or cross-functional leadership, stakeholder leadership (e.g. "team leadership", "people management", "P&L ownership", "cross-functional leadership").

3. Soft skills — interpersonal and professional competencies explicitly named as skills (e.g. "communication", "collaboration", "presentation skills", "consulting skills", "problem solving", "influence").

Do NOT list as a missing keyword:
- Abstract values, principles, ethical ideals, or culture words (e.g. "fairness", "bias", "integrity", "transparency", "accountability", "diversity", "inclusion", "ethics") — these are NOT technology keywords and are NOT resume skill gaps unless the JD names a specific technical method (e.g. "fairness evaluation frameworks" may map to a technical phrase only when clearly a named discipline; standalone "fairness" must be omitted).
- Generic standalone nouns with no skill meaning (e.g. "quality", "performance", "innovation", "impact", "growth", "search", "ranking", "relevance") unless part of a specific named skill phrase from the JD (e.g. "search relevance engineering", not "relevance" alone).
- Job duty verbs or task descriptions ("build models", "work with PMs", "deliver outcomes") unless the JD explicitly labels them as a required skill or competency.
- Company mission, values, or personality fluff ("passionate", "self-starter", "team player") unless framed as a concrete required competency.

When extracting skills from the JD, apply the same three-category filter. If a phrase does not fit technical, leadership, or soft skills, omit it entirely from matched_skills and all missing_skills arrays.

Homograph / short technical term rules (STRICT):
- Short terms (≤3 characters) or words that double as common English (e.g. Go, R, C, AI, UI, UX) may ONLY be extracted when the JD clearly names them as a technology, tool, or programming language — e.g. "Golang", "Go programming", "Go (programming language)", "experience with Go", or listed in a Skills/Requirements technology list.
- Do NOT extract "Go" from job-duty verbs or phrases ("go to market", "go deep", "will go through", "go live") — that is English, not the Go language.
- Do NOT extract generic English words as skills even if they appear capitalized in prose.
- Prefer the full technical name when the JD provides it (e.g. extract "Golang" or "Go programming", not bare "go" unless the JD literally lists "Go" as a skill).
- When verifying resume evidence for homograph skills, require explicit technical usage (e.g. "Golang", capital "Go", "Go services") — never count substring matches inside unrelated words ("google", "going", "ago") or the verb "go".
`.trim();

/** Prompt block for analyze + skill-proof LLM passes. */
export const HOMOGRAPH_SKILL_LLM_RULES = `
Homograph skills (Go, R, C, AI, UI, UX, etc.):
- Classify as matched/proven ONLY with explicit technical evidence in the resume (e.g. "Golang", capital "Go", "Go microservices") — NOT verb "go", NOT substrings in "google"/"going"/"ago".
- If the JD lists Go the language but the resume only has the English verb or unrelated words, mark not_found or missing — not weak.
- Do not treat a homograph as weak/skills-list-only unless the actual technology name appears in a skills section.
`.trim();

/** Standalone phrases that must never be treated as missing keywords (values / generic nouns). */
const NON_SKILL_GAP_EXACT = new Set(
  [
    "fairness",
    "bias",
    "ethics",
    "integrity",
    "transparency",
    "accountability",
    "diversity",
    "inclusion",
    "equity",
    "innovation",
    "excellence",
    "quality",
    "performance",
    "impact",
    "growth",
    "passion",
    "mindset",
    "relevance",
    "ranking",
    "search",
    "trust",
    "safety",
    "responsible ai",
    "responsible ai practices",
  ].map((s) => s.toLowerCase())
);

function normalizeGapPhrase(phrase: string): string {
  return String(phrase ?? "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^\w\s/+.-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Deterministic guardrail after LLM output — drops values/generic nouns that are not skill gaps. */
export function isValidSkillGapPhrase(phrase: string): boolean {
  const raw = String(phrase ?? "").trim();
  if (!raw) return false;

  const key = normalizeGapPhrase(raw);
  if (!key) return false;
  if (NON_SKILL_GAP_EXACT.has(key)) return false;

  // Single generic word with no technical/leadership/soft skill signal.
  if (!key.includes(" ") && NON_SKILL_GAP_EXACT.has(key)) return false;

  return true;
}

export function filterSkillGapPhrases(phrases: string[], jdText?: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  const jd = String(jdText ?? "").trim();
  for (const phrase of phrases) {
    const trimmed = String(phrase ?? "").trim();
    if (!trimmed || !isValidSkillGapPhrase(trimmed)) continue;
    if (
      jd &&
      isHomographSkillTerm(trimmed) &&
      !jdMentionsHomographSkillAsTechnical(jd, trimmed)
    ) {
      continue;
    }
    const dedupeKey = normalizeGapPhrase(trimmed);
    if (seen.has(dedupeKey)) continue;
    seen.add(dedupeKey);
    out.push(trimmed);
  }
  return out;
}

export type JdGapSource = "required" | "preferred" | "target";

/** Evidence bundle for one honest JD gap shown in the optimization UI. */
export type JdGapDetail = {
  phrase: string;
  jdSource: JdGapSource;
  /** Whether the phrase (or a close variant) appears in the pre-optimization resume. */
  inOriginalResume: boolean;
  /** Whether the phrase appears in the optimized resume (should be false for honest gaps). */
  inOptimizedResume: boolean;
};

export function describeJdGapEvidence(detail: JdGapDetail): string {
  const sourceLabel =
    detail.jdSource === "required"
      ? "Required in job description"
      : detail.jdSource === "preferred"
        ? "Preferred in job description"
        : "JD alignment target";

  if (detail.inOriginalResume && !detail.inOptimizedResume) {
    return `${sourceLabel}; present in your upload but not emphasized in the optimized version.`;
  }
  if (!detail.inOriginalResume && !detail.inOptimizedResume) {
    return `${sourceLabel}; not evidenced in your resume; left out on purpose so nothing was invented.`;
  }
  return `${sourceLabel}; not matched in the optimized resume after truthful tailoring.`;
}
