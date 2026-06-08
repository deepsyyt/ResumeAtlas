import { NextResponse } from "next/server";
import { getBearerUser } from "@/app/lib/billing/requestUser";
import {
  clipToWordLimit,
  JOB_DESCRIPTION_MAX_WORDS,
  RESUME_TEXT_MAX_WORDS,
} from "@/app/lib/inputWordLimits";
import {
  appendBulletToExperience,
  mergeExperienceWithRecomposed,
  pickProjectIndexForNewBullet,
  type RecomposedExperienceCompany,
} from "@/app/lib/optimizeExperience";
import {
  finalizeResumeSkillSections,
  resumeDocumentToPlainText,
  syncResumeSkills,
  type ResumeDocument,
} from "@/app/lib/resumeDocument";
import { resolveAnthropicModelCandidates } from "@/app/lib/anthropicModels";
import {
  buildBulletRewriteSystemPrompt,
  GENERATE_BULLET_SYSTEM_PROMPT,
  RECOMPOSE_SYSTEM_PROMPT,
  SUMMARY_ONLY_SYSTEM,
} from "@/app/lib/optimizePrompts";
import {
  applyAuditRejections,
  auditOptimizedResume,
  buildRefinementEvidence,
  collectResumeBulletDiffs,
  type AuditResult,
  type RefinementEvidence,
} from "@/app/lib/resumeFactualAudit";
import {
  acceptBulletRewrite,
  clampSummaryTokenLength,
  isInvalidBulletRewrite,
  sanitizeResumeDocumentProse,
  sanitizeResumeProse,
} from "@/app/lib/resumeTypography";
import { filterSkillGapPhrases, type JdGapDetail, type JdGapSource } from "@/app/lib/skillGapRules";
import {
  buildEvidenceDashboard,
  buildOptimizedSkillProofRows,
  buildSkillProofForSkills,
  isEvidenceWeakBullet,
  type EvidenceDashboard,
  type OptimizedSkillProofRow,
} from "@/app/lib/resumeEvidenceScore";
import {
  jdThemePriorityBoost,
  jdThemesToStrengthenForBullet,
  weakJdCategoriesForRewrite,
} from "@/app/lib/jdTopicHighlights";

export type OptimizeRequestBody = {
  resumeText: string;
  jobDescription: string;
  analyzeResult: {
    ats_score: number;
    missing_skills?: string[];
    missing_skills_required?: string[];
    missing_skills_preferred?: string[];
    matched_skills?: string[];
    keyword_coverage?: number;
    impact_score?: number;
    semantic_similarity?: number;
    required_years_experience?: number | null;
    resume_years_experience?: number | null;
  };
  /** Structured resume parsed on the client via /api/parse-resume. */
  structuredResume?: ResumeDocument;
  /** Optional debug mode to inspect optimization planning. */
  debug?: boolean;
};

export type OptimizeResponse = {
  /**
   * Plain-text resume for ATS-style use. Always derived from `optimizedStructuredResume`
   * when optimization runs (same output as {@link resumeDocumentToPlainText}).
   */
  optimizedResume: string;
  /** Evidence match % before optimization (same scale as scoreAfter). */
  scoreBefore: number;
  /** Evidence match % after optimization. */
  scoreAfter: number;
  /** Evidence match delta (scoreAfter - scoreBefore). */
  evidenceMatchDelta: number;
  /** ATS score from analyze step (reference only). */
  atsScoreReference?: number;
  roleAlignmentScore?: number;
  matchedStrengthScore?: number;
  addedKeywords: string[];
  /** Existing bullets rewritten (not net-new lines). */
  bulletImprovements: number;
  /** Entirely new bullets appended during optimization. */
  bulletsAdded: number;
  quantifiedAchievements: number;
  /** True when the professional summary text changed vs the pre-optimization snapshot (JD-aligned rewrite). */
  summaryOptimized: boolean;
  /** Optimized structured resume (bullets rewritten, structure preserved). */
  optimizedStructuredResume?: ResumeDocument;
  /** Bullet texts where new quantification (numbers) was added. */
  quantifiedBullets?: string[];
  /** Detailed per-bullet changes for UI explanation. */
  bulletChanges?: {
    original: string;
    improved: string;
    addedKeywords: string[];
    quantified: boolean;
  }[];
  alignmentInsights?: {
    coverageBreakdown: {
      covered: string[];
      missing: string[];
    };
  };
  /** Same JD-optimization targets as the bullet pass; before/after literal coverage counts. */
  targetSkillCoverage?: {
    total: number;
    coveredBefore: number;
    coveredAfter: number;
  };
  /** Estimated keyword-coverage % after optimization (capped), when analyze provided a baseline. */
  keywordCoverage?: { before: number; after: number };
  /** Estimated impact/metrics emphasis score after optimization, when analyze provided a baseline. */
  impactScore?: { before: number; after: number };
  insights?: {
    strongMatches: string[];
    missingCritical: string[];
    jdGapDetails?: JdGapDetail[];
    dominantIntents: string[];
  };
  /** Post-audit diff vs pre-optimization resume for preview highlights. */
  refinementEvidence?: RefinementEvidence;
  /** Proof-based strength before and after optimization. */
  evidenceDashboard?: {
    before: EvidenceDashboard;
    after: EvidenceDashboard;
  };
  /** Partial/list-only proof skills strengthened during optimization (not full JD gap map). */
  improvedSkillProof?: OptimizedSkillProofRow[];
  debug?: {
    coveragePlan?: {
      existingBulletMappings: Record<string, { skills: string[]; bullet: string }>;
      skillsNeedingNewBullets: string[];
      rewriteBudget: number;
      maxNewBullets: number;
    };
    factualAudit?: AuditResult;
  };
};

const API_URL = "https://api.anthropic.com/v1/messages";

/**
 * Trade quality vs Anthropic token spend for /api/optimize (env: OPTIMIZE_DEPTH).
 * - economy: fewer rewrites, smaller max_tokens; skips full experience recompose when there are no keyword gaps (summary still gets a JD-aligned pass)
 * - balanced (default): moderate depth
 * - quality: deepest passes / highest cost
 */
type OptimizeDepthTier = "economy" | "balanced" | "quality";

type OptimizeLlmBudget = {
  maxTargetSkills: number;
  expansionSkillCap: number;
  expandMaxTokens: number;
  expandJdChars: number;
  intentMaxTokens: number;
  intentJdChars: number;
  recomposeMaxTokens: number;
  recomposeJdChars: number;
  skipRecomposeWhenNoGap: boolean;
  noGapRewriteMin: number;
  noGapRewriteMax: number;
  gapRewriteAbsoluteCap: number;
  semanticExtraRewrites: number;
  quantCapExplicit: number;
  quantFracExplicit: number;
  quantCapNoGap: number;
  quantFracNoGap: number;
  bulletRewriteMaxTokens: number;
  generateBulletMaxTokens: number;
  generateJdChars: number;
  coverageBoostMax: number;
  maxRequiredNewBullets: number;
  validateCoverageMaxTokens: number;
  factualAuditMaxTokens: number;
  resumeAnchorChars: number;
};

const OPTIMIZE_BUDGET_BY_TIER: Record<OptimizeDepthTier, OptimizeLlmBudget> = {
  economy: {
    maxTargetSkills: 8,
    expansionSkillCap: 12,
    expandMaxTokens: 360,
    expandJdChars: 2400,
    intentMaxTokens: 360,
    intentJdChars: 2400,
    recomposeMaxTokens: 900,
    recomposeJdChars: 3800,
    skipRecomposeWhenNoGap: true,
    noGapRewriteMin: 2,
    noGapRewriteMax: 4,
    gapRewriteAbsoluteCap: 6,
    semanticExtraRewrites: 0,
    quantCapExplicit: 2,
    quantFracExplicit: 0.28,
    quantCapNoGap: 2,
    quantFracNoGap: 0.3,
    bulletRewriteMaxTokens: 96,
    generateBulletMaxTokens: 100,
    generateJdChars: 900,
    coverageBoostMax: 0,
    maxRequiredNewBullets: 0,
    validateCoverageMaxTokens: 450,
    factualAuditMaxTokens: 900,
    resumeAnchorChars: 2000,
  },
  balanced: {
    maxTargetSkills: 10,
    expansionSkillCap: 16,
    expandMaxTokens: 480,
    expandJdChars: 3200,
    intentMaxTokens: 480,
    intentJdChars: 3200,
    recomposeMaxTokens: 1200,
    recomposeJdChars: 5000,
    skipRecomposeWhenNoGap: false,
    noGapRewriteMin: 4,
    noGapRewriteMax: 10,
    gapRewriteAbsoluteCap: 10,
    semanticExtraRewrites: 2,
    quantCapExplicit: 3,
    quantFracExplicit: 0.3,
    quantCapNoGap: 3,
    quantFracNoGap: 0.38,
    bulletRewriteMaxTokens: 108,
    generateBulletMaxTokens: 110,
    generateJdChars: 1200,
    coverageBoostMax: 0,
    maxRequiredNewBullets: 0,
    validateCoverageMaxTokens: 520,
    factualAuditMaxTokens: 1200,
    resumeAnchorChars: 2600,
  },
  quality: {
    maxTargetSkills: 12,
    expansionSkillCap: 20,
    expandMaxTokens: 600,
    expandJdChars: 5000,
    intentMaxTokens: 600,
    intentJdChars: 5000,
    recomposeMaxTokens: 2000,
    recomposeJdChars: 8000,
    skipRecomposeWhenNoGap: false,
    noGapRewriteMin: 3,
    noGapRewriteMax: 10,
    gapRewriteAbsoluteCap: 12,
    semanticExtraRewrites: 2,
    quantCapExplicit: 3,
    quantFracExplicit: 0.32,
    quantCapNoGap: 5,
    quantFracNoGap: 0.5,
    bulletRewriteMaxTokens: 120,
    generateBulletMaxTokens: 120,
    generateJdChars: 1400,
    coverageBoostMax: 0,
    maxRequiredNewBullets: 0,
    validateCoverageMaxTokens: 600,
    factualAuditMaxTokens: 1600,
    resumeAnchorChars: 3500,
  },
};

function resolveOptimizeDepth(): OptimizeDepthTier {
  const v = (process.env.OPTIMIZE_DEPTH || "balanced").toLowerCase().trim();
  if (v === "economy" || v === "quality") return v;
  return "balanced";
}

function getOptimizeLlmBudget(): OptimizeLlmBudget {
  return OPTIMIZE_BUDGET_BY_TIER[resolveOptimizeDepth()];
}

type ExpandedSkillMap = Record<string, string[]>;

const STRONG_VERB_RE =
  /^(Developed|Led|Built|Designed|Implemented|Created|Optimized|Drove|Owned|Delivered|Established|Scaled|Improved|Reduced|Increased|Spearheaded|Architected|Automated|Streamlined|Collaborated|Directed|Executed|Launched|Transformed|Accelerated|Negotiated|Analyzed|Defined|Operationalized)/i;

/** Weak / polish-worthy bullet: short, generic opening, weak verb, or long without metrics. */
function isWeakBullet(bullet: string): boolean {
  if (isEvidenceWeakBullet(bullet)) return true;
  if (!bullet?.trim()) return false;
  const trimmed = bullet.trim();
  const tooShort = trimmed.length < 88;
  const noNumber = !/\d/.test(trimmed);
  const genericOpen =
    /^(responsible for|worked on|helped with|assisted|supported|involved in|participated in|duties included|tasked with|handled various)\b/i.test(
      trimmed
    );
  const noStrongVerb = !STRONG_VERB_RE.test(trimmed);
  const longFlabby = trimmed.length > 195 && noNumber;
  return tooShort || genericOpen || longFlabby || (noNumber && noStrongVerb);
}

function dedupeSkillsPreserveOrder(skills: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const s of skills) {
    const t = String(s ?? "").trim();
    if (!t) continue;
    const k = t.toLowerCase();
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(t);
  }
  return out;
}

/** When the analyzer reports no missing skills, still need JD anchors for paid optimization. */
function extractJdAnchorPhrases(jobDescription: string, max: number): string[] {
  const text = String(jobDescription ?? "").replace(/\s+/g, " ").trim();
  if (!text) return [];
  const parts = text.split(/[,;•]|\s+and\s+/gi);
  const seen = new Set<string>();
  const out: string[] = [];
  for (let raw of parts) {
    raw = raw.replace(/^[\s\-–, ]+|[\s\-–, ]+$/g, "").trim();
    if (raw.length < 8 || raw.length > 70) continue;
    if (/^\d|years?\s+of|minimum|preferred|required\b/i.test(raw)) continue;
    const k = raw.toLowerCase();
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(raw);
    if (out.length >= max) break;
  }
  return out.slice(0, max);
}

type BulletWithContext = {
  expIndex: number;
  /** Top-level bullet: "${exp}:${i}"; project bullet: "${exp}:p${proj}:${i}" */
  bulletKey: string;
  text: string;
  company?: string;
  role?: string;
  projectTitle?: string;
};

type GlobalStyle = {
  tense: "past";
  tone: "impact-driven";
  avoidWords: string[];
};

type CoveragePlan = {
  existingBulletMappings: Record<string, string[]>;
  skillsNeedingNewBullets: string[];
};

type CoveragePlanDebug = {
  existingBulletMappings: Record<string, { skills: string[]; bullet: string }>;
  skillsNeedingNewBullets: string[];
  rewriteBudget: number;
  maxNewBullets: number;
};

type ValidationResult =
  | { status: "NO_CHANGES" }
  | {
      status: "FIX_NEEDED";
      missing_skills?: string[];
      new_bullets?: string[];
    };

type ImprovedMap = Record<string, string>;
type BaselineMap = Record<string, string>;

type BulletChangeInternal = {
  original: string;
  improved: string;
  addedKeywords: string[];
  quantified: boolean;
};

type RecomposedExperience = {
  summary: string;
  experience: RecomposedExperienceCompany[];
};

function normalizeSummaryForCompare(raw: string | undefined): string {
  return String(raw ?? "")
    .replace(/\r?\n+/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim()
    .toLowerCase();
}

type IntentCluster = {
  name: string;
  skills: string[];
};

type MapSkillsToIntentsResult = {
  intents: IntentCluster[];
};

function normalizeExpandedMap(
  expanded: ExpandedSkillMap | null | undefined
): ExpandedSkillMap {
  const cleaned: ExpandedSkillMap = {};
  if (!expanded) return cleaned;

  for (const [skill, variants] of Object.entries(expanded)) {
    const unique = new Set<string>();
    for (const v of variants || []) {
      const val = v.toLowerCase().trim();
      if (
        val.length < 3 ||
        val.length > 40 ||
        ["analysis", "data", "process"].includes(val)
      ) {
        continue;
      }
      unique.add(val);
    }
    cleaned[skill] = Array.from(unique).slice(0, 5);
  }

  return cleaned;
}

function isSkillCovered(
  textLower: string,
  skill: string,
  expanded: ExpandedSkillMap
): boolean {
  const variants = [skill, ...(expanded[skill] || [])];
  return variants.some((v) => textLower.includes(v.toLowerCase()));
}

function buildJdGapDetails(
  phrases: string[],
  opts: {
    requiredPhrases: string[];
    preferredPhrases: string[];
    originalLower: string;
    optimizedLower: string;
    expanded: ExpandedSkillMap;
  }
): JdGapDetail[] {
  const requiredSet = new Set(opts.requiredPhrases.map((s) => s.toLowerCase()));
  const preferredSet = new Set(opts.preferredPhrases.map((s) => s.toLowerCase()));

  return phrases.map((phrase) => {
    const key = phrase.toLowerCase();
    const jdSource: JdGapSource = requiredSet.has(key)
      ? "required"
      : preferredSet.has(key)
        ? "preferred"
        : "target";
    return {
      phrase,
      jdSource,
      inOriginalResume: isSkillCovered(opts.originalLower, phrase, opts.expanded),
      inOptimizedResume: isSkillCovered(opts.optimizedLower, phrase, opts.expanded),
    };
  });
}

function normalizeInlineText(text: string): string {
  const stripped = String(text ?? "")
    // Guard against model leaking labels like "Optimized bullet:" into content.
    .replace(/^\s*(?:optimized|optimised|rewritten|improved)\s+bullet\s*:\s*/i, "")
    .replace(/^\s*bullet\s*:\s*/i, "");
  return sanitizeResumeProse(
    stripped
      .replace(/\r?\n+/g, " ")
      .replace(/\s{2,}/g, " ")
      .trim()
  );
}

function hasImpactMetric(text: string): boolean {
  const t = String(text ?? "");
  return /(\d[\d.,]*\s*%|\$\s*\d[\d.,]*|\d[\d.,]*\s*(x|k|m|b|million|billion|users?|customers?|tickets?|projects?|hours?|days?|weeks?|months?|years?))/i.test(
    t
  );
}

function tokenizeSkill(skill: string): string[] {
  return String(skill ?? "")
    .toLowerCase()
    .split(/[^a-z0-9+/#.-]+/g)
    .map((t) => t.trim())
    .filter((t) => t.length >= 3);
}

function buildCoveragePlan(
  targetSkills: string[],
  bullets: BulletWithContext[],
  expanded: ExpandedSkillMap
): CoveragePlan {
  const existingBulletMappings: Record<string, string[]> = {};
  const skillsNeedingNewBullets: string[] = [];

  for (const skill of targetSkills) {
    const skillTokens = tokenizeSkill(skill);
    let bestKey: string | null = null;
    let bestScore = 0;
    for (const b of bullets) {
      const textLower = b.text.toLowerCase();
      if (isSkillCovered(textLower, skill, expanded)) {
        bestKey = b.bulletKey;
        bestScore = 999;
        break;
      }
      const tokenHits = skillTokens.filter((t) => textLower.includes(t)).length;
      const weakBonus = isWeakBullet(b.text) ? 1 : 0;
      const projectContext = `${b.projectTitle ?? ""} ${b.text}`.toLowerCase();
      const projectTokenHits = skillTokens.filter((t) => projectContext.includes(t)).length;
      const projectBonus = b.projectTitle ? (projectTokenHits > 0 ? 3 : 1) : 0;
      const score = tokenHits + weakBonus + projectBonus;
      if (score > bestScore) {
        bestScore = score;
        bestKey = b.bulletKey;
      }
    }
    if (bestKey && bestScore > 0) {
      if (!existingBulletMappings[bestKey]) existingBulletMappings[bestKey] = [];
      existingBulletMappings[bestKey]!.push(skill);
    } else {
      skillsNeedingNewBullets.push(skill);
    }
  }

  return { existingBulletMappings, skillsNeedingNewBullets };
}

type BulletRewriteQueueItem = {
  bulletKey: string;
  skills: string[];
  priority: number;
};

/** Skills the candidate already has — strengthen in bullets (not missing JD gaps). */
function buildProofTargetSkills(args: {
  matchedSkills: string[];
  resumeText: string;
  structuredResume: ResumeDocument;
  gapSkills: string[];
  max: number;
}): string[] {
  const resumeLower = args.resumeText.toLowerCase();
  const gapSet = new Set(args.gapSkills.map((s) => s.toLowerCase().trim()));

  const fromMatched = dedupeSkillsPreserveOrder(args.matchedSkills).filter(
    (s) => !gapSet.has(s.toLowerCase())
  );

  const resumeSkills: string[] = [];
  for (const s of args.structuredResume.skills ?? []) {
    if (s?.trim()) resumeSkills.push(s.trim());
  }
  for (const g of args.structuredResume.skillGroups ?? []) {
    for (const item of g.items ?? []) {
      if (item?.trim()) resumeSkills.push(item.trim());
    }
  }
  const fromResume = dedupeSkillsPreserveOrder(resumeSkills).filter(
    (s) => !gapSet.has(s.toLowerCase()) && resumeLower.includes(s.toLowerCase())
  );

  return dedupeSkillsPreserveOrder([...fromMatched, ...fromResume]).slice(0, args.max);
}

function buildBulletRewriteQueue(
  proofSkills: string[],
  bullets: BulletWithContext[],
  expanded: ExpandedSkillMap,
  maxBullets: number,
  weakJdCategories: string[] = []
): BulletRewriteQueueItem[] {
  const coveragePlan = buildCoveragePlan(proofSkills, bullets, expanded);
  const queue: BulletRewriteQueueItem[] = [];
  const seen = new Set<string>();

  for (const [bulletKey, skills] of Object.entries(coveragePlan.existingBulletMappings)) {
    const b = bullets.find((x) => x.bulletKey === bulletKey);
    const weak = b ? isWeakBullet(b.text) : false;
    const themeBoost = b ? jdThemePriorityBoost(b.text, weakJdCategories) : 0;
    queue.push({
      bulletKey,
      skills: Array.from(new Set(skills)),
      priority: (weak ? 120 : 40) + skills.length * 8 + themeBoost,
    });
    seen.add(bulletKey);
  }

  for (const b of bullets) {
    if (seen.has(b.bulletKey)) continue;
    const textLower = b.text.toLowerCase();
    const localSkills = proofSkills.filter((skill) => {
      const tokens = tokenizeSkill(skill);
      return (
        isSkillCovered(textLower, skill, expanded) ||
        tokens.some((t) => textLower.includes(t))
      );
    });
    if (!isWeakBullet(b.text) && localSkills.length === 0 && weakJdCategories.length === 0) {
      continue;
    }
    const themeBoost = jdThemePriorityBoost(b.text, weakJdCategories);
    if (!isWeakBullet(b.text) && localSkills.length === 0 && themeBoost === 0) continue;
    queue.push({
      bulletKey: b.bulletKey,
      skills: (localSkills.length > 0 ? localSkills : proofSkills).slice(0, 6),
      priority:
        (isWeakBullet(b.text) ? 80 : 20) +
        localSkills.length * 5 +
        themeBoost,
    });
    seen.add(b.bulletKey);
  }

  queue.sort((a, b) => b.priority - a.priority);
  return queue.slice(0, maxBullets);
}

function upsertBulletChange(
  map: Record<string, BulletChangeInternal>,
  key: string,
  baseline: string,
  improved: string,
  addedKeywords: string[]
) {
  const prev = map[key];
  const existingKeywords = new Set<string>(prev?.addedKeywords ?? []);
  for (const kw of addedKeywords) {
    if (kw && kw.trim()) existingKeywords.add(kw);
  }
  map[key] = {
    original: prev?.original ?? baseline,
    improved,
    addedKeywords: Array.from(existingKeywords),
    quantified:
      hasImpactMetric(improved) && !hasImpactMetric(prev?.original ?? baseline),
  };
}

function computeAlignmentScoreSemantic(
  optimizedText: string,
  requiredSkills: string[],
  optionalSkills: string[],
  expanded: ExpandedSkillMap
): number {
  const lower = optimizedText.toLowerCase();

  const reqMatches = requiredSkills.filter((s) =>
    isSkillCovered(lower, s, expanded)
  ).length;
  const optMatches = optionalSkills.filter((s) =>
    isSkillCovered(lower, s, expanded)
  ).length;

  const reqScore = requiredSkills.length
    ? reqMatches / requiredSkills.length
    : 0;
  const optScore = optionalSkills.length
    ? optMatches / optionalSkills.length
    : 0;

  const coverage = reqScore * 0.7 + optScore * 0.3;
  return Math.min(95, Math.round(60 + coverage * 35));
}

function isSkillStronglyCovered(
  textLower: string,
  skill: string,
  expanded: ExpandedSkillMap
): boolean {
  const variants = [skill, ...(expanded[skill] || [])];
  let matchCount = 0;
  for (const v of variants) {
    if (v && textLower.includes(v.toLowerCase())) matchCount++;
  }
  return matchCount >= 1;
}

type SkillCandidate = { skill: string; required: boolean; score: number };

function baseSkillScore(
  skill: string,
  required: boolean,
  jdLower: string
): number {
  const s = skill.toLowerCase();
  let score = 0;
  if (required) score += 3;
  const re = new RegExp(s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
  const occ = (jdLower.match(re) || []).length;
  if (occ >= 2) score += 2;
  else if (occ === 1) score += 1;
  if (
    /\b(risk|fraud|chargeback|dispute|compliance|governance|kpi|metric|operations?|workflow|decision)\b/i.test(
      s
    )
  ) {
    score += 2;
  }
  return score;
}

async function expandSkillsSemantically(
  jobDescription: string,
  targetSkills: string[],
  apiKey: string | undefined,
  model: string,
  llm: Pick<OptimizeLlmBudget, "expandMaxTokens" | "expandJdChars">
): Promise<ExpandedSkillMap> {
  if (!apiKey || targetSkills.length === 0) return {};

  const systemPrompt = `You are an expert in job description interpretation and semantic equivalence.

TASK:
For each skill, generate alternative phrases or concepts that represent the SAME underlying capability in real-world resumes.

RULES:
- Do NOT invent unrelated skills
- Keep expansions realistic and commonly used in resumes
- Include both:
  - direct variations (e.g., "fraud detection" → "fraud analysis")
  - transferable equivalents (e.g., "fraud detection" → "anomaly detection", "risk pattern identification")
- Max 5 expansions per skill
- Keep phrases concise (2-5 words)
- Avoid generic fluff

IMPORTANT:
These expansions will be used for semantic matching in resumes.

OUTPUT STRICT JSON:

{
  "fraud detection": ["fraud analysis", "anomaly detection", "risk identification"],
  "kpi tracking": ["performance metrics", "dashboard monitoring"]
}`;

  const jd = jobDescription.slice(0, llm.expandJdChars);
  const userPrompt = `JOB DESCRIPTION:
${jd}

SKILLS:
${targetSkills.join(", ")}`;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: llm.expandMaxTokens,
      temperature: 0.2,
      system: systemPrompt,
      messages: [{ role: "user" as const, content: userPrompt }],
    }),
  });

  if (!response.ok) {
    return {};
  }

  const data = (await response.json().catch(() => null)) as
    | { content?: { type: string; text?: string }[] }
    | null;
  const raw = data?.content?.[0]?.text ?? "";

  try {
    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}");
    if (start === -1 || end === -1 || end <= start) return {};
    const clean = raw.slice(start, end + 1);
    const parsed = JSON.parse(clean) as ExpandedSkillMap;
    return normalizeExpandedMap(parsed);
  } catch {
    return {};
  }
}

function parseStrictJsonFromLLM(text: string): any | null {
  const raw = text ?? "";
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  const clean = raw.slice(start, end + 1);
  try {
    return JSON.parse(clean);
  } catch {
    return null;
  }
}

function fallbackIntentClustering(
  jobDescription: string,
  targetSkills: string[]
): IntentCluster[] {
  const jdLower = (jobDescription || "").toLowerCase();
  const has = (re: RegExp) => re.test(jdLower);

  const clusters: { name: string; re: RegExp }[] = [
    { name: "Risk & Investigation", re: /\b(risk|fraud|chargeback|dispute|investigation|anomaly)\b/i },
    { name: "Operations & KPIs", re: /\b(operations?|workflow|process|kpi|metrics?|performance|throughput|sla)\b/i },
    { name: "Compliance & Governance", re: /\b(compliance|governance|regulation|policy|audit)\b/i },
    { name: "Stakeholder & Vendor Management", re: /\b(vendor|stakeholder|partner|cross[- ]functional|collaboration)\b/i },
    { name: "Decision Systems & Analytics", re: /\b(decision|insight|analytics?|model|prediction|dashboard)\b/i },
  ];

  const used = new Set<string>();
  const intents: IntentCluster[] = [];

  for (const c of clusters) {
    const skills = targetSkills.filter((s) => {
      const v = (s || "").toLowerCase();
      if (!v || used.has(s)) return false;
      return c.re.test(v);
    });
    for (const s of skills) used.add(s);
    if (skills.length > 0) intents.push({ name: c.name, skills });
  }

  const remaining = targetSkills.filter((s) => !used.has(s));
  if (remaining.length > 0) {
    intents.push({
      name: has(/risk|fraud/i) ? "Risk & Investigation" : "Operations & KPIs",
      skills: remaining,
    });
  }

  return intents.slice(0, 6);
}

async function mapSkillsToIntents(
  jobDescription: string,
  targetSkills: string[],
  apiKey: string | undefined,
  model: string,
  llm: Pick<OptimizeLlmBudget, "intentMaxTokens" | "intentJdChars">
): Promise<IntentCluster[]> {
  if (!targetSkills.length) return [];
  if (!apiKey) return fallbackIntentClustering(jobDescription, targetSkills);

  const SYSTEM = `You are a resume strategist converting skills into intent clusters.
Return 4-6 clusters that are domain intents (not generic categories).
Each input skill must appear in exactly one cluster (best effort).
Use natural intent names like:
- Risk & Investigation
- Operations & KPIs
- Compliance & Governance
- Stakeholder & Vendor Management
- Decision Systems & Analytics

OUTPUT STRICT JSON:
{
  "intents": [
    { "name": "...", "skills": ["..."] }
  ]
}`;

  const jd = jobDescription.slice(0, llm.intentJdChars);
  const userPrompt = `JOB DESCRIPTION:
${jd}

TARGET SKILLS:
${targetSkills.join(", ")}

TASK:
Cluster the target skills into intent clusters that best match the job description.`;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        max_tokens: llm.intentMaxTokens,
        temperature: 0.2,
        system: SYSTEM,
        messages: [{ role: "user" as const, content: userPrompt }],
      }),
    });

    if (!response.ok) return fallbackIntentClustering(jobDescription, targetSkills);

    const data = (await response.json().catch(() => null)) as
      | { content?: { type: string; text?: string }[] }
      | null;

    const raw = data?.content?.find((c) => c.type === "text")?.text ?? "";
    const parsed = parseStrictJsonFromLLM(raw) as MapSkillsToIntentsResult | null;
    const intents = parsed?.intents ?? null;
    if (!Array.isArray(intents) || intents.length === 0) return fallbackIntentClustering(jobDescription, targetSkills);

    // sanitize + ensure every skill is represented at least once
    const seenSkills = new Set<string>();
    const cleaned: IntentCluster[] = [];

    for (const it of intents) {
      const name = it && typeof (it as any).name === "string" ? String((it as any).name).trim() : "";
      const skills = Array.isArray((it as any).skills)
        ? (it as any).skills.filter((s: any) => typeof s === "string").map((s: string) => s.trim()).filter(Boolean)
        : [];
      if (!name || skills.length === 0) continue;

      const uniqSkills = skills.filter((s: string) => !seenSkills.has(s));
      for (const s of uniqSkills) seenSkills.add(s);
      if (uniqSkills.length > 0) cleaned.push({ name, skills: uniqSkills });
    }

    const remaining = targetSkills.filter((s) => !seenSkills.has(s));
    if (remaining.length > 0) cleaned.push({ name: cleaned[0]?.name || "Operations & KPIs", skills: remaining });

    return cleaned.slice(0, 6);
  } catch {
    return fallbackIntentClustering(jobDescription, targetSkills);
  }
}

async function rewriteSummaryOnlyForJd(
  structuredResume: ResumeDocument,
  jobDescription: string,
  targetSkills: string[],
  requiredSkills: string[],
  matchedSkills: string[],
  jdChars: number,
  apiKey: string,
  model: string
): Promise<string | null> {
  const jd = jobDescription.slice(0, jdChars);
  const gapBlock =
    targetSkills.length > 0
      ? `JD ALIGNMENT TARGETS (use naturally where truthful):\n${targetSkills.join(", ")}\n${
          requiredSkills.length > 0
            ? `\nREQUIRED GAPS (technical, leadership, or soft skills only; do NOT invent coverage; leave unmatched if unsupported):\n${requiredSkills.join(", ")}\n`
            : ""
        }`
      : requiredSkills.length > 0
        ? `REQUIRED GAPS (technical, leadership, or soft skills only; do NOT invent coverage):\n${requiredSkills.join(", ")}\n`
        : "";
  const current = (structuredResume.summary ?? "").trim();
  const userPrompt = `JOB DESCRIPTION:
${jd}

${gapBlock}MATCHED STRENGTHS (elevate where true):
${matchedSkills.join(", ")}

CURRENT SUMMARY (may be empty - if empty, derive from resume body):
${current || "(none)"}

STRUCTURED RESUME (for facts only):
${JSON.stringify(
    {
      name: structuredResume.name,
      title: structuredResume.title,
      skills: structuredResume.skills,
      experience: structuredResume.experience?.map((e) => ({
        role: e.role,
        company: e.company,
        bullets: (e.bullets ?? []).slice(0, 4),
      })),
    },
    null,
    2
  )}

Return JSON: {"summary":"..."}`;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: 720,
      temperature: 0.35,
      system: SUMMARY_ONLY_SYSTEM,
      messages: [{ role: "user" as const, content: userPrompt }],
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    console.error("[optimize] summary-only rewrite error", response.status, text.slice(0, 200));
    return null;
  }

  const data = (await response.json().catch(() => null)) as
    | { content?: { type: string; text?: string }[] }
    | null;
  const raw = data?.content?.[0]?.text ?? "";

  try {
    const str = raw.trim();
    const start = str.indexOf("{");
    const end = str.lastIndexOf("}");
    if (start === -1 || end === -1 || end <= start) return null;
    const jsonSlice = str.slice(start, end + 1);
    const parsed = JSON.parse(jsonSlice) as { summary?: string };
    const s = typeof parsed.summary === "string" ? parsed.summary.trim() : "";
    return s.length > 0 ? clampSummaryTokenLength(sanitizeResumeProse(s)) : null;
  } catch (e) {
    console.error("[optimize] summary-only parse failed", e);
    return null;
  }
}

async function recomposeExperience(
  structuredResume: ResumeDocument,
  jobDescription: string,
  proofSkills: string[],
  gapSkills: string[],
  requiredGapSkills: string[],
  matchedSkills: string[],
  explicitSkillGaps: boolean,
  llm: Pick<
    OptimizeLlmBudget,
    "recomposeMaxTokens" | "recomposeJdChars" | "skipRecomposeWhenNoGap"
  >,
  apiKey: string | undefined,
  model: string
): Promise<RecomposedExperience | null> {
  if (!apiKey || proofSkills.length === 0) return null;
  if (llm.skipRecomposeWhenNoGap && !explicitSkillGaps) {
    const summaryOnly = await rewriteSummaryOnlyForJd(
      structuredResume,
      jobDescription,
      proofSkills,
      requiredGapSkills,
      matchedSkills,
      llm.recomposeJdChars,
      apiKey,
      model
    );
    if (!summaryOnly) return null;
    return { summary: summaryOnly, experience: [] };
  }

  const jd = jobDescription.slice(0, llm.recomposeJdChars);
  const proofBlock = `PROOF SKILLS TO STRENGTHEN (candidate already has this work — move from skills lists into project bullets with architecture, deployment, and impact):\n${proofSkills.join(", ")}`;
  const gapBlock =
    explicitSkillGaps && gapSkills.length > 0
      ? `HONEST GAPS ONLY (do NOT add to resume; note internally if needed):\n${gapSkills.join(", ")}\n\nREQUIRED GAPS (never fabricate):\n${requiredGapSkills.join(", ")}`
      : "";

  const userPrompt = `JOB DESCRIPTION:
${jd}

${proofBlock}

MATCHED SKILLS (elevate in the project bullets where this work happened):
${matchedSkills.join(", ")}

${gapBlock}

KEYWORD PLACEMENT:
- Weave supported JD keywords into the project/role bullets where that work actually happened.
- Do not add keywords only to Skills or as disconnected tool lists.
- Replace bullets in place; do not append parallel duplicates of the same achievement.

STRUCTURED RESUME:
${JSON.stringify(structuredResume, null, 2)}`;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: llm.recomposeMaxTokens,
      temperature: 0.25,
      system: RECOMPOSE_SYSTEM_PROMPT,
      messages: [{ role: "user" as const, content: userPrompt }],
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    console.error("[optimize] recomposition error", response.status, text.slice(0, 200));
    return null;
  }

  const data = (await response.json().catch(() => null)) as
    | { content?: { type: string; text?: string }[] }
    | null;
  const raw = data?.content?.[0]?.text ?? "";

  try {
    const str = raw.trim();
    const start = str.indexOf("{");
    const end = str.lastIndexOf("}");
    if (start === -1 || end === -1 || end <= start) return null;
    const jsonSlice = str.slice(start, end + 1);
    const parsed = JSON.parse(jsonSlice) as RecomposedExperience;
    if (!parsed || !Array.isArray(parsed.experience)) return null;
    return parsed;
  } catch (e) {
    console.error("[optimize] recomposition parse failed", e);
    return null;
  }
}

function mergeRecomposed(
  original: ResumeDocument,
  recomposed: RecomposedExperience | null
): ResumeDocument {
  if (!recomposed) return original;

  const expIn = recomposed.experience;
  const hasExperienceLayer = Array.isArray(expIn) && expIn.length > 0;
  const nextSummary =
    typeof recomposed.summary === "string" && recomposed.summary.trim().length > 0
      ? clampSummaryTokenLength(sanitizeResumeProse(recomposed.summary.trim()))
      : null;

  if (!hasExperienceLayer) {
    if (nextSummary) {
      return { ...original, summary: nextSummary };
    }
    return original;
  }

  if (!Array.isArray(expIn)) return original;

  const newExperience = original.experience.map((exp) =>
    mergeExperienceWithRecomposed(exp, expIn)
  );

  return {
    ...original,
    summary: nextSummary ?? original.summary,
    experience: newExperience,
  };
}

type BulletRewriteContext = {
  company?: string;
  role?: string;
  projectTitle?: string;
  jdThemes?: string[];
};

async function rewriteBullet(
  bullet: string,
  keywords: string[],
  apiKey: string,
  model: string,
  forceQuantified: boolean,
  globalStyle: GlobalStyle,
  maxOutputTokens: number,
  context?: BulletRewriteContext
): Promise<string> {
  const systemPrompt = buildBulletRewriteSystemPrompt({
    tense: globalStyle.tense,
    tone: globalStyle.tone,
    avoidWords: globalStyle.avoidWords,
  });

  const scopeLines: string[] = [];
  if (context?.company?.trim()) scopeLines.push(`Company: ${context.company.trim()}`);
  if (context?.role?.trim()) scopeLines.push(`Role: ${context.role.trim()}`);
  if (context?.projectTitle?.trim()) {
    scopeLines.push(
      `Project scope (rewrite ONLY for this project; do not attribute other clients' work): ${context.projectTitle.trim()}`
    );
  }

  const themeLine =
    context?.jdThemes && context.jdThemes.length > 0
      ? `JD topics to surface if truthful in this bullet: ${context.jdThemes.join(", ")}\n`
      : "";

  const userPrompt = `Bullet:
"${bullet}"

${scopeLines.length > 0 ? `ROLE CONTEXT:\n${scopeLines.join("\n")}\n\n` : ""}${themeLine}Skills/themes to strengthen as evidence (already supported by this bullet — do NOT add missing JD requirements):
"${keywords.filter(Boolean).join(", ")}"

QUANTIFY=${forceQuantified ? "true" : "false"}`;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: maxOutputTokens,
      temperature: 0.35,
      system: systemPrompt,
      messages: [{ role: "user" as const, content: userPrompt }],
    }),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => "");
    console.error("[optimize] bullet rewrite error", response.status, errText.slice(0, 200));
    return bullet;
  }

  const data = (await response.json().catch(() => null)) as
    | { content?: { type: string; text?: string }[] }
    | null;
  const raw = data?.content?.find((c) => c.type === "text")?.text?.trim() ?? "";
  const cleaned = normalizeInlineText(raw.replace(/^["']|["']$/g, "").trim());
  return acceptBulletRewrite(bullet, cleaned);
}

async function generateAlignedBullet(
  role: string,
  company: string,
  jobDescription: string,
  skill: string,
  apiKey: string,
  model: string,
  llm: Pick<OptimizeLlmBudget, "generateBulletMaxTokens" | "generateJdChars">,
  projectTitle?: string
): Promise<string | null> {
  const systemPrompt = `${GENERATE_BULLET_SYSTEM_PROMPT}

Required skill phrase (include verbatim ONLY if honestly supported): ${skill}`;

  const projectLine = projectTitle?.trim()
    ? `\nPROJECT SCOPE (this bullet must belong here only): ${projectTitle.trim()}`
    : "";

  const userPrompt = `ROLE: ${role || "Unknown role"}
COMPANY: ${company || "Unknown company"}${projectLine}
JOB DESCRIPTION CONTEXT:
${jobDescription.slice(0, llm.generateJdChars)}

Write one aligned bullet containing: ${skill}`;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: llm.generateBulletMaxTokens,
      temperature: 0,
      system: systemPrompt,
      messages: [{ role: "user" as const, content: userPrompt }],
    }),
  });
  if (!response.ok) return null;
  const data = (await response.json().catch(() => null)) as
    | { content?: { type: string; text?: string }[] }
    | null;
  const raw = data?.content?.find((c) => c.type === "text")?.text?.trim() ?? "";
  const cleaned = normalizeInlineText(raw.replace(/^["']|["']$/g, "").trim());
  if (!cleaned || isInvalidBulletRewrite(cleaned)) return null;
  return cleaned;
}

function tokenSet(text: string): Set<string> {
  return new Set(
    String(text ?? "")
      .toLowerCase()
      .split(/[^a-z0-9+/#.-]+/g)
      .map((t) => t.trim())
      .filter((t) => t.length >= 3)
  );
}

/** Count bullet text changes (e.g. after recomposition) when bulletChangeMap missed them. */
function diffResumeBulletTexts(
  before: ResumeDocument,
  after: ResumeDocument
): { changedBullets: number; newMetrics: number } {
  let changedBullets = 0;
  let newMetrics = 0;

  const walk = (blobsBefore: string[] | undefined, blobsAfter: string[] | undefined) => {
    const b = blobsBefore ?? [];
    const a = blobsAfter ?? [];
    const n = Math.max(b.length, a.length);
    for (let i = 0; i < n; i++) {
      const o = normalizeInlineText(b[i] ?? "");
      const nv = normalizeInlineText(a[i] ?? "");
      if (!o && !nv) continue;
      if (o !== nv) {
        changedBullets++;
        if (hasImpactMetric(nv) && !hasImpactMetric(o)) newMetrics++;
      }
    }
  };

  const exB = before.experience ?? [];
  const exA = after.experience ?? [];
  const len = Math.max(exB.length, exA.length);
  for (let i = 0; i < len; i++) {
    const eb = exB[i];
    const ea = exA[i];
    walk(eb?.bullets, ea?.bullets);
    const projB = eb?.projects ?? [];
    const projA = ea?.projects ?? [];
    const plen = Math.max(projB.length, projA.length);
    for (let j = 0; j < plen; j++) {
      walk(projB[j]?.bullets, projA[j]?.bullets);
    }
  }

  return { changedBullets, newMetrics };
}

function isSimilar(bullet: string, existing: string[]): boolean {
  const a = tokenSet(bullet);
  if (a.size === 0) return false;
  for (const e of existing) {
    const b = tokenSet(e);
    if (b.size === 0) continue;
    let inter = 0;
    Array.from(a).forEach((t) => {
      if (b.has(t)) inter++;
    });
    const union = new Set([...Array.from(a), ...Array.from(b)]).size;
    const jaccard = union > 0 ? inter / union : 0;
    if (jaccard >= 0.8) return true;
  }
  return false;
}

function allExperienceBulletTextsNormalized(exp: {
  bullets?: string[];
  projects?: { bullets?: string[] }[];
}): string[] {
  const top = (exp.bullets ?? []).map((b) => normalizeInlineText(b));
  const nested = (exp.projects ?? []).flatMap((p) =>
    (p.bullets ?? []).map((b) => normalizeInlineText(b))
  );
  return [...top, ...nested];
}

function pickBestExperienceIndexForSkill(
  experience: ResumeDocument["experience"],
  skillOrHint: string
): number | null {
  if (!Array.isArray(experience) || experience.length === 0) return null;
  const skillTokens = tokenSet(skillOrHint);
  if (skillTokens.size === 0) return null;

  let bestIdx = 0;
  let bestScore = -1;
  for (let i = 0; i < experience.length; i++) {
    const exp = experience[i]!;
    const text = `${exp.role ?? ""} ${exp.company ?? ""} ${(exp.bullets ?? []).join(" ")} ${(exp.projects ?? [])
      .map((p) => `${p.title ?? ""} ${(p.bullets ?? []).join(" ")}`)
      .join(" ")}`;
    const expTokens = tokenSet(text);
    let score = 0;
    skillTokens.forEach((t) => {
      if (expTokens.has(t)) score++;
    });
    if (score > bestScore) {
      bestScore = score;
      bestIdx = i;
    }
  }

  // No lexical evidence of fit across roles -> skip adding an odd/out-of-context bullet.
  if (bestScore <= 0) return null;
  return bestIdx;
}

function appendBulletsToBestMatchingRole(args: {
  resume: ResumeDocument;
  bullets: string[];
}): ResumeDocument {
  const { resume, bullets } = args;
  if (!Array.isArray(resume.experience) || resume.experience.length === 0 || bullets.length === 0) {
    return resume;
  }
  const updated = {
    ...resume,
    experience: resume.experience.map((e) => ({
      ...e,
      bullets: [...(e.bullets ?? [])],
      projects: (e.projects ?? []).map((p) => ({
        title: p.title,
        bullets: [...(p.bullets ?? [])],
      })),
    })),
  };
  // Default fallback: most recent/last role.
  let bestIndex = updated.experience.length - 1;
  // Prefer role with highest lexical similarity to new bullets.
  let bestScore = -1;
  for (let i = 0; i < updated.experience.length; i++) {
    const exp = updated.experience[i]!;
    const expText = `${exp.role ?? ""} ${exp.company ?? ""} ${(exp.bullets ?? []).join(" ")} ${(exp.projects ?? []).flatMap((p) => p.bullets ?? []).join(" ")}`;
    const expTokens = tokenSet(expText);
    let score = 0;
    for (const nb of bullets) {
      Array.from(tokenSet(nb)).forEach((t) => {
        if (expTokens.has(t)) score++;
      });
    }
    if (score > bestScore) {
      bestScore = score;
      bestIndex = i;
    }
  }
  const target = updated.experience[bestIndex]!;
  const existing = allExperienceBulletTextsNormalized(target);
  const filtered = bullets
    .map((b) => normalizeInlineText(b))
    .filter(Boolean)
    .filter((b) => !isSimilar(b, existing));
  if (filtered.length === 0) return updated;
  for (const bullet of filtered) {
    appendBulletToExperience(target, bestIndex, bullet, bullet);
  }
  return updated;
}

async function validateResumeCoverage(args: {
  resumeText: string;
  requiredSkills: string[];
  apiKey: string | undefined;
  model: string;
  maxOutputTokens: number;
}): Promise<ValidationResult> {
  const { resumeText, requiredSkills, apiKey, model, maxOutputTokens } = args;
  if (!apiKey || requiredSkills.length === 0) return { status: "NO_CHANGES" };

  const normalizeForLiteralMatch = (s: string) =>
    String(s ?? "")
      .toLowerCase()
      .replace(/[\u2013\u2014]/g, "-")
      .replace(/[^a-z0-9+/#.-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const resumeNorm = normalizeForLiteralMatch(resumeText);
  const missingByLiteral = requiredSkills
    .map((s) => String(s ?? "").trim())
    .filter(Boolean)
    .filter((skill) => {
      const sk = normalizeForLiteralMatch(skill);
      return sk.length === 0 ? false : !resumeNorm.includes(sk);
    });

  if (missingByLiteral.length === 0) return { status: "NO_CHANGES" };

  const system = `You are validating a resume against required job skills.

TASK:
1. Check if each required skill is clearly represented in the resume.
2. If ALL required skills are explicitly present -> return "NO_CHANGES"
3. If ANY required skills are missing:
   - Identify ONLY the missing ones
   - Suggest minimal fixes

STRICT RULES:
- REQUIRED SKILL MATCHING (STRICT):
  - Treat a skill as PRESENT only if the exact phrase (or a near-exact spacing/punctuation variant) appears in the resume text.
  - Do NOT mark a skill as present based on implication or paraphrase.
- Do NOT rewrite the resume
- Do NOT modify existing bullets
- ONLY suggest adding new bullet(s)
- New bullets must fit an existing role/project narrative and cannot introduce unrelated project scope.
- Maximum 2 bullets
- Each bullet must include:
  - action
  - tool/skill
  - outcome
- Avoid duplication
- Avoid keyword stuffing

EXPECTED OUTPUT FORMAT:
{"status":"NO_CHANGES"}
OR
{"status":"FIX_NEEDED","missing_skills":["airflow"],"new_bullets":["..."]}`;

  const user = JSON.stringify(
    {
      required_skills: missingByLiteral,
      resume: resumeText,
    },
    null,
    2
  );

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: maxOutputTokens,
      temperature: 0,
      system,
      messages: [{ role: "user" as const, content: user }],
    }),
  });
  if (!response.ok) return { status: "NO_CHANGES" };
  const data = (await response.json().catch(() => null)) as
    | { content?: { type: string; text?: string }[] }
    | null;
  const raw = data?.content?.find((c) => c.type === "text")?.text ?? "";
  const parsed = parseStrictJsonFromLLM(raw) as ValidationResult | null;
  if (!parsed || (parsed.status !== "NO_CHANGES" && parsed.status !== "FIX_NEEDED")) {
    return { status: "NO_CHANGES" };
  }
  return parsed;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as OptimizeRequestBody;
    let resumeText = body?.resumeText;
    let jobDescription = body?.jobDescription ?? "";
    const analyzeResult = body?.analyzeResult;
    const debugEnabled = body?.debug === true;

    if (typeof resumeText !== "string" || !analyzeResult || typeof analyzeResult.ats_score !== "number") {
      return NextResponse.json(
        { error: "resumeText and analyzeResult with ats_score are required" },
        { status: 400 }
      );
    }

    resumeText = clipToWordLimit(resumeText, RESUME_TEXT_MAX_WORDS);
    jobDescription = clipToWordLimit(jobDescription, JOB_DESCRIPTION_MAX_WORDS);

    const { user } = await getBearerUser(request);
    if (!user) {
      return NextResponse.json(
        { error: "Login required to optimize your resume.", code: "UNAUTHORIZED" },
        { status: 401 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    const model = resolveAnthropicModelCandidates()[0] ?? "claude-haiku-4-5-20251001";
    const budget = getOptimizeLlmBudget();

    // If no structured resume is provided, do not attempt to rebuild from raw text.
    // Just return the original resume and unchanged score.
    if (!body.structuredResume || !Array.isArray(body.structuredResume.experience)) {
      const evidenceOnly = buildEvidenceDashboard({
        resumeText,
        jobDescription,
        matchedSkills: analyzeResult.matched_skills,
        missingSkills: analyzeResult.missing_skills,
        missingRequired: analyzeResult.missing_skills_required,
        missingPreferred: analyzeResult.missing_skills_preferred,
        requiredYearsExperience: analyzeResult.required_years_experience ?? null,
        resumeYearsExperience: analyzeResult.resume_years_experience ?? null,
      });
      const evidenceMatch = evidenceOnly.evidenceMatch;
      const response: OptimizeResponse = {
        optimizedResume: resumeText,
        scoreBefore: evidenceMatch,
        scoreAfter: evidenceMatch,
        evidenceMatchDelta: 0,
        atsScoreReference: analyzeResult.ats_score,
        addedKeywords: [],
        bulletImprovements: 0,
        bulletsAdded: 0,
        quantifiedAchievements: 0,
        summaryOptimized: false,
        evidenceDashboard: { before: evidenceOnly, after: evidenceOnly },
      };
      return NextResponse.json(response);
    }

    const resumeSnapshotBeforeOptimization = JSON.parse(
      JSON.stringify(body.structuredResume)
    ) as ResumeDocument;

    let baseStructured = body.structuredResume;

    const missingRequired = filterSkillGapPhrases(
      Array.isArray(analyzeResult.missing_skills_required)
        ? analyzeResult.missing_skills_required
            .filter((s) => typeof s === "string")
            .map((s) => s.trim())
            .filter(Boolean)
        : []
    );
    const missingSkills = filterSkillGapPhrases(
      Array.isArray(analyzeResult.missing_skills)
        ? analyzeResult.missing_skills.filter((s) => typeof s === "string" && s.trim().length > 0)
        : []
    );
    const missingPreferred = filterSkillGapPhrases(
      Array.isArray(analyzeResult.missing_skills_preferred)
        ? analyzeResult.missing_skills_preferred
            .filter((s) => typeof s === "string")
            .map((s) => s.trim())
            .filter(Boolean)
        : []
    );

    const matchedSkills = Array.isArray(analyzeResult.matched_skills)
      ? analyzeResult.matched_skills.filter((s) => typeof s === "string" && s.trim().length > 0).map((s) => s.trim())
      : [];

    // Rank skills; cap count by OPTIMIZE_DEPTH budget (token / cost control).
    const jdLower = jobDescription.toLowerCase();
    const candidates: SkillCandidate[] = [];
    for (const s of missingRequired) {
      const skill = s.trim();
      if (!skill) continue;
      candidates.push({ skill, required: true, score: baseSkillScore(skill, true, jdLower) });
    }
    for (const s of missingSkills) {
      const skill = s.trim();
      if (!skill || missingRequired.includes(skill)) continue;
      candidates.push({ skill, required: false, score: baseSkillScore(skill, false, jdLower) });
    }
    candidates.sort((a, b) => b.score - a.score);

    const maxTarget = budget.maxTargetSkills;
    const explicitSkillGaps =
      missingRequired.length > 0 || missingSkills.length > 0;

    const gapSkills = candidates.slice(0, maxTarget).map((c) => c.skill);
    let proofSkills = buildProofTargetSkills({
      matchedSkills,
      resumeText,
      structuredResume: body.structuredResume,
      gapSkills,
      max: maxTarget,
    });
    if (proofSkills.length === 0) {
      proofSkills = dedupeSkillsPreserveOrder(matchedSkills).slice(0, maxTarget);
    }
    if (proofSkills.length === 0) {
      proofSkills = extractJdAnchorPhrases(
        `${jobDescription}\n${resumeText.slice(0, budget.resumeAnchorChars)}`,
        maxTarget
      ).filter((phrase) => resumeText.toLowerCase().includes(phrase.toLowerCase()));
    }

    let requiredSkills = candidates.filter((c) => c.required).map((c) => c.skill);
    let optionalSkills = candidates.filter((c) => !c.required).map((c) => c.skill);
    if (requiredSkills.length === 0 && optionalSkills.length === 0 && gapSkills.length > 0) {
      optionalSkills = [...gapSkills];
    }

    const semanticSimilarity =
      typeof analyzeResult.semantic_similarity === "number"
        ? Math.max(0, Math.min(100, analyzeResult.semantic_similarity))
        : undefined;

    const skillsForExpansion = Array.from(
      new Set([...proofSkills, ...matchedSkills, ...gapSkills])
    ).slice(0, budget.expansionSkillCap);
    const expandedMap = await expandSkillsSemantically(jobDescription, skillsForExpansion, apiKey, model, {
      expandMaxTokens: budget.expandMaxTokens,
      expandJdChars: budget.expandJdChars,
    });

    const intentClusters = await mapSkillsToIntents(jobDescription, proofSkills, apiKey, model, {
      intentMaxTokens: budget.intentMaxTokens,
      intentJdChars: budget.intentJdChars,
    });

    // Role-aware recomposition layer (single LLM call) before bullet-level polish.
    try {
      const recomposed = await recomposeExperience(
        baseStructured,
        jobDescription,
        proofSkills,
        gapSkills,
        missingRequired,
        matchedSkills,
        explicitSkillGaps,
        {
          recomposeMaxTokens: budget.recomposeMaxTokens,
          recomposeJdChars: budget.recomposeJdChars,
          skipRecomposeWhenNoGap: budget.skipRecomposeWhenNoGap,
        },
        apiKey,
        model
      );
      baseStructured = mergeRecomposed(baseStructured, recomposed);
    } catch (e) {
      console.warn("[optimize] recomposition step failed", e);
    }

    // Fallback: ensure summary is optimized when recomposition didn't update it (LLM
    // may omit/empty summary, or economy summary-only path may have failed).
    const summaryUnchanged =
      normalizeSummaryForCompare(resumeSnapshotBeforeOptimization.summary) ===
      normalizeSummaryForCompare(baseStructured.summary);
    if (
      summaryUnchanged &&
      apiKey &&
      proofSkills.length > 0
    ) {
      try {
        const summaryOnly = await rewriteSummaryOnlyForJd(
          baseStructured,
          jobDescription,
          proofSkills,
          missingRequired,
          matchedSkills,
          budget.recomposeJdChars,
          apiKey,
          model
        );
        if (summaryOnly) {
          baseStructured = { ...baseStructured, summary: summaryOnly };
        }
      } catch (e) {
        console.warn("[optimize] summary fallback rewrite failed", e);
      }
    }

    const bulletsWithContext: BulletWithContext[] = [];
    baseStructured.experience.forEach((exp, expIndex) => {
      const company = exp.company;
      const role = exp.role;
      (exp.bullets ?? []).forEach((text, bulletIndex) => {
        if (text && text.trim()) {
          bulletsWithContext.push({
            expIndex,
            bulletKey: `${expIndex}:${bulletIndex}`,
            text,
            company,
            role,
          });
        }
      });
      (exp.projects ?? []).forEach((proj, projectIndex) => {
        (proj.bullets ?? []).forEach((text, bulletIndex) => {
          if (text && text.trim()) {
            bulletsWithContext.push({
              expIndex,
              bulletKey: `${expIndex}:p${projectIndex}:${bulletIndex}`,
              text,
              company,
              role,
              projectTitle: proj.title,
            });
          }
        });
      });
    });

    const orderedBullets = [
      ...bulletsWithContext.filter((b) => isWeakBullet(b.text)),
      ...bulletsWithContext.filter((b) => !isWeakBullet(b.text)),
    ];

    const improvedMap: ImprovedMap = {};
    const baselineByKey: BaselineMap = {};
    for (const b of bulletsWithContext) {
      baselineByKey[b.bulletKey] = normalizeInlineText(b.text);
    }
    const bulletChangeMap: Record<string, BulletChangeInternal> = {};
    let coveragePlanDebug: CoveragePlanDebug | undefined;
    let factualAuditResult: AuditResult | undefined;

    if (apiKey && orderedBullets.length > 0 && proofSkills.length > 0) {
      const preOptimizeEvidence = buildEvidenceDashboard({
        resumeText,
        jobDescription,
        structuredResume: resumeSnapshotBeforeOptimization,
        matchedSkills,
        missingSkills,
        missingRequired,
        missingPreferred,
        requiredYearsExperience: analyzeResult.required_years_experience ?? null,
        resumeYearsExperience: analyzeResult.resume_years_experience ?? null,
      });
      const weakJdCategories = weakJdCategoriesForRewrite(preOptimizeEvidence.categories);

      const baseGlobalStyle: GlobalStyle = {
        tense: "past",
        tone: "impact-driven",
        avoidWords: [],
      };
      const usedStartWords = new Set<string>();
      const coveragePlan = buildCoveragePlan(proofSkills, orderedBullets, expandedMap);
      let rewriteBudget = Math.min(
        Math.max(
          budget.noGapRewriteMin,
          Math.min(
            budget.noGapRewriteMax,
            Math.ceil(orderedBullets.length * 0.45)
          )
        ),
        orderedBullets.length
      );
      if (
        semanticSimilarity !== undefined &&
        semanticSimilarity < 78 &&
        budget.semanticExtraRewrites > 0
      ) {
        rewriteBudget = Math.min(
          orderedBullets.length,
          rewriteBudget + budget.semanticExtraRewrites
        );
      }
      const rewriteQueue = buildBulletRewriteQueue(
        proofSkills,
        orderedBullets,
        expandedMap,
        rewriteBudget,
        weakJdCategories
      );
      const requiredNeedingNewBullets = coveragePlan.skillsNeedingNewBullets.filter(
        (skill) =>
          missingRequired.some(
            (req) => req.toLowerCase().trim() === skill.toLowerCase().trim()
          )
      );
      const maxNewBullets = Math.min(
        budget.maxRequiredNewBullets,
        requiredNeedingNewBullets.length
      );
      if (debugEnabled) {
        const mapped: CoveragePlanDebug["existingBulletMappings"] = {};
        for (const item of rewriteQueue) {
          const bulletText =
            orderedBullets.find((x) => x.bulletKey === item.bulletKey)?.text ?? "";
          mapped[item.bulletKey] = {
            skills: item.skills,
            bullet: normalizeInlineText(bulletText),
          };
        }
        coveragePlanDebug = {
          existingBulletMappings: mapped,
          skillsNeedingNewBullets: [...requiredNeedingNewBullets],
          rewriteBudget,
          maxNewBullets,
        };
      }
      const quantTarget = Math.min(
        rewriteBudget,
        Math.max(
          1,
          Math.min(
            budget.quantCapNoGap,
            Math.ceil(rewriteBudget * budget.quantFracNoGap)
          )
        )
      );
      let quantUsed = 0;
      let rewriteSuccesses = 0;

      for (const item of rewriteQueue) {
        if (rewriteSuccesses >= rewriteBudget) break;
        const { bulletKey: key, skills: assigned } = item;
        const b = orderedBullets.find((x) => x.bulletKey === key);
        if (!b) continue;
        const original = normalizeInlineText(b.text);
        const shouldQuantify = quantUsed < quantTarget;

        const globalStyleForThisBullet: GlobalStyle = {
          ...baseGlobalStyle,
          avoidWords: Array.from(usedStartWords),
        };
        const improved = normalizeInlineText(
          await rewriteBullet(
            original,
            assigned,
            apiKey,
            model,
            shouldQuantify,
            globalStyleForThisBullet,
            budget.bulletRewriteMaxTokens,
            {
              company: b.company,
              role: b.role,
              projectTitle: b.projectTitle,
              jdThemes: jdThemesToStrengthenForBullet(original, weakJdCategories),
            }
          )
        );
        if (improved && improved !== original) {
          rewriteSuccesses++;
          improvedMap[key] = improved;

          const originalLower = original.toLowerCase();
          const improvedLower = improved.toLowerCase();
          const addedForThisBullet = assigned.filter((kw) => {
            const s = kw.toLowerCase();
            return s && improvedLower.includes(s) && !originalLower.includes(s);
          });
          upsertBulletChange(
            bulletChangeMap,
            key,
            baselineByKey[key] ?? original,
            improved,
            addedForThisBullet
          );
          if (hasImpactMetric(improved) && !hasImpactMetric(original)) {
            quantUsed++;
          }
          const firstWord = improved.split(/\s+/)[0]?.toLowerCase().replace(/[^a-z]/g, "");
          if (firstWord) usedStartWords.add(firstWord);
        }
      }

      // New bullets for uncovered intents/skills (capped for latency).
      for (let i = 0; i < maxNewBullets; i++) {
        const skill = requiredNeedingNewBullets[i]!;
        if (baseStructured.experience.length === 0) break;
        const expIndex = pickBestExperienceIndexForSkill(
          baseStructured.experience,
          skill
        );
        if (expIndex === null) continue;
        const exp = baseStructured.experience[expIndex]!;
        const projectTitle =
          exp.projects && exp.projects.length > 0
            ? exp.projects[pickProjectIndexForNewBullet(exp, skill)]?.title
            : undefined;
        const generated = await generateAlignedBullet(
          exp.role ?? "",
          exp.company ?? "",
          jobDescription,
          skill,
          apiKey,
          model,
          {
            generateBulletMaxTokens: budget.generateBulletMaxTokens,
            generateJdChars: budget.generateJdChars,
          },
          projectTitle
        );
        if (!generated) continue;
        const next = normalizeInlineText(generated);
        if (!next) continue;
        const existing = new Set(allExperienceBulletTextsNormalized(exp));
        if (existing.has(next) || isSimilar(next, Array.from(existing))) continue;
        const bulletKey = appendBulletToExperience(exp, expIndex, next, skill);
        improvedMap[bulletKey] = next;
        upsertBulletChange(bulletChangeMap, bulletKey, "", next, [skill]);
      }
    }

    let optimizedStructured: ResumeDocument = {
      ...baseStructured,
      experience: baseStructured.experience.map((exp, expIndex) => ({
        ...exp,
        bullets: (exp.bullets ?? []).map((text, bulletIndex) => {
          const key = `${expIndex}:${bulletIndex}`;
          return normalizeInlineText(improvedMap[key] ?? text);
        }),
        projects: (exp.projects ?? []).map((proj, projectIndex) => ({
          ...proj,
          bullets: (proj.bullets ?? []).map((text, bulletIndex) => {
            const key = `${expIndex}:p${projectIndex}:${bulletIndex}`;
            return normalizeInlineText(improvedMap[key] ?? text);
          }),
        })),
      })),
    };

    // Second pass: interview-defensibility audit (reverts fabricated or high-risk rewrites).
    if (apiKey) {
      try {
        factualAuditResult = await auditOptimizedResume({
          before: resumeSnapshotBeforeOptimization,
          after: optimizedStructured,
          jobDescription,
          apiKey,
          model,
          maxOutputTokens: budget.factualAuditMaxTokens,
          jdChars: budget.recomposeJdChars,
        });
        optimizedStructured = applyAuditRejections(
          optimizedStructured,
          resumeSnapshotBeforeOptimization,
          factualAuditResult
        );

        for (const [key, change] of Object.entries(bulletChangeMap)) {
          const parts = key.split(":");
          const expIndex = Number.parseInt(parts[0] ?? "", 10);
          if (!Number.isFinite(expIndex)) continue;
          const exp = optimizedStructured.experience[expIndex];
          if (!exp) {
            delete bulletChangeMap[key];
            continue;
          }
          let current = "";
          if (parts[1]?.startsWith("p")) {
            const projectIndex = Number.parseInt(parts[1].slice(1), 10);
            const bulletIndex = Number.parseInt(parts[2] ?? "", 10);
            current =
              exp.projects?.[projectIndex]?.bullets?.[bulletIndex] ??
              "";
          } else {
            const bulletIndex = Number.parseInt(parts[1] ?? "", 10);
            current = exp.bullets?.[bulletIndex] ?? "";
          }
          const normalizedCurrent = normalizeInlineText(current);
          const normalizedOriginal = normalizeInlineText(change.original);
          if (!normalizedCurrent || normalizedCurrent === normalizedOriginal) {
            delete bulletChangeMap[key];
            continue;
          }
          bulletChangeMap[key] = {
            ...change,
            improved: normalizedCurrent,
          };
        }
      } catch (e) {
        console.warn("[optimize] factual audit failed", e);
      }
    }

    const bulletChanges = Object.values(bulletChangeMap);
    const rewrittenChanges = bulletChanges.filter(
      (c) => c.original.trim().length > 0 && c.improved !== c.original
    );
    const addedBulletChanges = bulletChanges.filter(
      (c) => c.original.trim().length === 0 && c.improved.trim().length > 0
    );
    const improvedBullets = rewrittenChanges.map((c) => c.improved);
    const quantifiedBullets = bulletChanges.filter((c) => c.quantified).map((c) => c.improved);

    let optimizedText = resumeDocumentToPlainText(optimizedStructured) || resumeText;

    /** Rewrites we tracked in bulletChanges (matches “rewritten” chips in the UI). */
    const postAuditDiffs = collectResumeBulletDiffs(
      resumeSnapshotBeforeOptimization,
      optimizedStructured
    );
    const bulletImprovements = postAuditDiffs.filter((d) => d.original.trim().length > 0).length;
    const bulletsAdded = postAuditDiffs.filter((d) => !d.original.trim()).length;
    const quantifiedAchievements = bulletChanges.filter((c) => c.quantified).length;

    const originalTextLower = String(resumeText ?? "").toLowerCase();
    const optimizedTextLower = optimizedText.toLowerCase();

    // Semantic coverage: which target skills newly appear.
    const addedKeywords = proofSkills.filter((skill) => {
      const inOriginal = isSkillCovered(originalTextLower, skill, expandedMap);
      const inOptimized = isSkillCovered(optimizedTextLower, skill, expandedMap);
      return inOptimized && !inOriginal;
    });

    const covered: string[] = [];
    const missing: string[] = [];
    for (const skill of proofSkills) {
      if (isSkillCovered(optimizedTextLower, skill, expandedMap)) {
        covered.push(skill);
      } else {
        missing.push(skill);
      }
    }

    const targetSkillCoverage =
      proofSkills.length > 0
        ? {
            total: proofSkills.length,
            coveredBefore: proofSkills.filter((skill) =>
              isSkillCovered(originalTextLower, skill, expandedMap)
            ).length,
            coveredAfter: proofSkills.filter((skill) =>
              isSkillCovered(optimizedTextLower, skill, expandedMap)
            ).length,
          }
        : undefined;

    const roleAlignmentScore = computeAlignmentScoreSemantic(
      optimizedText,
      requiredSkills,
      optionalSkills,
      expandedMap
    );

    const optimizedLowerForInsights = optimizedTextLower;

    // Strength preservation: how much of the previously matched skills remain in the optimized resume.
    const stronglyMatched = matchedSkills.filter((s) =>
      isSkillStronglyCovered(optimizedLowerForInsights, s, expandedMap)
    );
    const matchedStrengthScore =
      matchedSkills.length > 0
        ? Math.min(
            95,
            Math.round(50 + (stronglyMatched.length / matchedSkills.length) * 45)
          )
        : undefined;

    const missingCritical = filterSkillGapPhrases(
      missingRequired.filter((s) => !isSkillCovered(optimizedLowerForInsights, s, expandedMap))
    ).slice(0, 6);

    const jdGapDetails = buildJdGapDetails(missingCritical, {
      requiredPhrases: missingRequired,
      preferredPhrases: missingPreferred,
      originalLower: originalTextLower,
      optimizedLower: optimizedLowerForInsights,
      expanded: expandedMap,
    });

    const dominantIntents = (() => {
      if (!intentClusters || intentClusters.length === 0) return [];
      const scored = intentClusters
        .map((it) => {
          const coveredCount = it.skills.filter((sk) =>
            isSkillCovered(optimizedLowerForInsights, sk, expandedMap)
          ).length;
          return { name: it.name, coveredCount };
        })
        .sort((a, b) => b.coveredCount - a.coveredCount);
      const topNonZero = scored.filter((s) => s.coveredCount > 0).slice(0, 3);
      if (topNonZero.length > 0) return topNonZero.map((s) => s.name);
      return scored.slice(0, 1).map((s) => s.name);
    })();

    const insights = {
      strongMatches: stronglyMatched.slice(0, 8),
      missingCritical,
      jdGapDetails,
      dominantIntents,
    };

    optimizedStructured = syncResumeSkills(
      finalizeResumeSkillSections(optimizedStructured)
    );
    if (optimizedStructured.summary?.trim()) {
      optimizedStructured = {
        ...optimizedStructured,
        summary: clampSummaryTokenLength(optimizedStructured.summary),
      };
    }
    optimizedStructured = sanitizeResumeDocumentProse(optimizedStructured);
    optimizedText = resumeDocumentToPlainText(optimizedStructured) || optimizedText;

    const summaryOptimized =
      normalizeSummaryForCompare(resumeSnapshotBeforeOptimization.summary) !==
      normalizeSummaryForCompare(optimizedStructured.summary);

    const refinementEvidence = buildRefinementEvidence(
      resumeSnapshotBeforeOptimization,
      optimizedStructured,
      missingCritical,
      jdGapDetails
    );

    const evidenceDashboard = {
      before: buildEvidenceDashboard({
        resumeText,
        jobDescription,
        structuredResume: resumeSnapshotBeforeOptimization,
        matchedSkills,
        missingSkills,
        missingRequired,
        missingPreferred,
        requiredYearsExperience: analyzeResult.required_years_experience ?? null,
        resumeYearsExperience: analyzeResult.resume_years_experience ?? null,
      }),
      after: buildEvidenceDashboard({
        resumeText: optimizedText,
        jobDescription,
        structuredResume: optimizedStructured,
        matchedSkills,
        missingSkills,
        missingRequired,
        missingPreferred,
        requiredYearsExperience: analyzeResult.required_years_experience ?? null,
        resumeYearsExperience: analyzeResult.resume_years_experience ?? null,
      }),
    };

    const proofRequiredSet = new Set(
      filterSkillGapPhrases(missingRequired ?? []).map((s) => s.toLowerCase())
    );
    const improvedSkillProof = buildOptimizedSkillProofRows(
      buildSkillProofForSkills(
        proofSkills,
        resumeText,
        resumeSnapshotBeforeOptimization,
        proofRequiredSet
      ),
      buildSkillProofForSkills(
        proofSkills,
        optimizedText,
        optimizedStructured,
        proofRequiredSet
      ),
      evidenceDashboard.after.categories
    );

    const scoreBefore = evidenceDashboard.before.evidenceMatch;
    const scoreAfter = evidenceDashboard.after.evidenceMatch;
    const evidenceMatchDelta = scoreAfter - scoreBefore;

    const kwBefore =
      typeof analyzeResult.keyword_coverage === "number"
        ? Math.max(0, Math.min(100, Math.round(analyzeResult.keyword_coverage)))
        : undefined;
    const jdProofDelta =
      evidenceDashboard.after.snapshot.jdSkillProof -
      evidenceDashboard.before.snapshot.jdSkillProof;
    const keywordCoverage =
      kwBefore === undefined
        ? undefined
        : {
            before: kwBefore,
            after: Math.min(100, Math.max(0, kwBefore + jdProofDelta)),
          };

    const impBefore =
      typeof analyzeResult.impact_score === "number"
        ? Math.max(0, Math.min(100, Math.round(analyzeResult.impact_score)))
        : undefined;
    const impactDelta =
      evidenceDashboard.after.snapshot.impactCoverage -
      evidenceDashboard.before.snapshot.impactCoverage;
    const impactScore =
      impBefore === undefined
        ? undefined
        : {
            before: impBefore,
            after: Math.min(100, Math.max(0, impBefore + impactDelta)),
          };

    const response: OptimizeResponse = {
      optimizedResume: optimizedText,
      scoreBefore,
      scoreAfter,
      evidenceMatchDelta,
      atsScoreReference: analyzeResult.ats_score,
      roleAlignmentScore,
      matchedStrengthScore,
      addedKeywords,
      bulletImprovements,
      bulletsAdded,
      quantifiedAchievements,
      summaryOptimized,
      optimizedStructuredResume: optimizedStructured,
      quantifiedBullets,
      bulletChanges,
      alignmentInsights: {
        coverageBreakdown: { covered, missing },
      },
      targetSkillCoverage,
      keywordCoverage,
      impactScore,
      insights,
      refinementEvidence,
      evidenceDashboard,
      improvedSkillProof,
      ...(debugEnabled
        ? {
            debug: {
              coveragePlan: coveragePlanDebug,
              factualAudit: factualAuditResult,
            },
          }
        : {}),
    };

    return NextResponse.json(response);
  } catch (err) {
    console.error("[optimize]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Optimization failed" },
      { status: 500 }
    );
  }
}
