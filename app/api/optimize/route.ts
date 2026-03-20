import { NextResponse } from "next/server";
import {
  clipToWordLimit,
  JOB_DESCRIPTION_MAX_WORDS,
  RESUME_TEXT_MAX_WORDS,
} from "@/app/lib/inputWordLimits";
import {
  resumeDocumentToPlainText,
  type ResumeDocument,
} from "@/app/lib/resumeDocument";

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
  scoreAfter: number;
  roleAlignmentScore?: number;
  matchedStrengthScore?: number;
  addedKeywords: string[];
  bulletImprovements: number;
  quantifiedAchievements: number;
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
    dominantIntents: string[];
  };
  debug?: {
    coveragePlan?: {
      existingBulletMappings: Record<string, { skills: string[]; bullet: string }>;
      skillsNeedingNewBullets: string[];
      rewriteBudget: number;
      maxNewBullets: number;
    };
  };
};

const API_URL = "https://api.anthropic.com/v1/messages";

type ExpandedSkillMap = Record<string, string[]>;

/** Weak bullet detector: short, no numbers, or missing strong action verb. */
function isWeakBullet(bullet: string): boolean {
  if (!bullet?.trim()) return false;
  const trimmed = bullet.trim();
  const tooShort = trimmed.length < 90;
  const noNumber = !/\d/.test(trimmed);
  const noStrongVerb = !/^(Developed|Led|Built|Designed|Implemented|Created|Optimized)/i.test(
    trimmed
  );
  return tooShort || noNumber || noStrongVerb;
}

type BulletWithContext = {
  expIndex: number;
  /** Top-level bullet: "${exp}:${i}"; project bullet: "${exp}:p${proj}:${i}" */
  bulletKey: string;
  text: string;
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

type RecomposedExperienceCompany = {
  company: string;
  role: string;
  bullets: string[];
};

type RecomposedExperience = {
  summary: string;
  experience: RecomposedExperienceCompany[];
};

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

function normalizeInlineText(text: string): string {
  const stripped = String(text ?? "")
    // Guard against model leaking labels like "Optimized bullet:" into content.
    .replace(/^\s*(?:optimized|optimised|rewritten|improved)\s+bullet\s*:\s*/i, "")
    .replace(/^\s*bullet\s*:\s*/i, "");
  return stripped
    .replace(/\r?\n+/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
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
      const score = tokenHits + weakBonus;
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
  model: string
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
- Keep phrases concise (2–5 words)
- Avoid generic fluff

IMPORTANT:
These expansions will be used for semantic matching in resumes.

OUTPUT STRICT JSON:

{
  "fraud detection": ["fraud analysis", "anomaly detection", "risk identification"],
  "kpi tracking": ["performance metrics", "dashboard monitoring"]
}`;

  const userPrompt = `JOB DESCRIPTION:
${jobDescription}

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
      max_tokens: 600,
      temperature: 0.2,
      top_p: 1,
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
  model: string
): Promise<IntentCluster[]> {
  if (!targetSkills.length) return [];
  if (!apiKey) return fallbackIntentClustering(jobDescription, targetSkills);

  const SYSTEM = `You are a resume strategist converting skills into intent clusters.
Return 4–6 clusters that are domain intents (not generic categories).
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

  const userPrompt = `JOB DESCRIPTION:
${jobDescription}

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
        max_tokens: 600,
        temperature: 0.2,
        top_p: 1,
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

const RECOMPOSE_SYSTEM_PROMPT = `You are a senior resume strategist specializing in job-specific experience rewriting.

Your objective is to transform the candidate’s resume so it feels like it was originally written for the given job description — while remaining truthful.

CRITICAL RULES:
1. NEVER fabricate new roles, companies, or unrelated projects.
2. You may:
   - Reframe existing bullets.
   - Expand bullets.
   - Add supporting bullets ONLY when logically consistent with the existing role.
3. Maintain factual integrity — no fake domain claims.
4. Avoid keyword stuffing — use natural, recruiter-friendly language.
5. Each company must have a clear thematic alignment with the job.

RECOMPOSITION STRATEGY (PHASE 1):

STEP 1 — JOB INTENT CLUSTERING
Convert missing skills into 4–6 intent clusters such as:
- Risk / Fraud / Investigation
- Operations / Process / Workflow
- KPIs / Performance Tracking
- Compliance / Governance
- Stakeholder / Vendor Management
- Customer Experience / Decision Systems

STEP 2 — COMPANY INTENT ASSIGNMENT
For each company:
- Assign 1–2 dominant intent clusters.
- Base this on the closest match with existing experience.
- Ensure different companies emphasize different intents where possible.

STEP 3 — EXPERIENCE RECOMPOSITION
For each company:
- PRESERVE strong bullets that already show concrete impact or clearly aligned skills.
- ONLY rewrite bullets that are vague, generic, or missing important required skills.
- Maintain a consistent narrative across bullets.
- Ensure bullets feel cohesive and role-specific.

REQUIRED SKILL COVERAGE (MANDATORY):
- You are given a list of REQUIRED missing skills.
- For each REQUIRED skill:
  - If it can be honestly tied to an existing role, ensure it appears verbatim in at least one bullet for that role.
  - If it cannot be safely claimed based on the resume, you MUST leave it uncovered (do NOT fabricate experience).
- Across the whole resume, you may add AT MOST 2 new bullets specifically for REQUIRED skills.
- New bullets MUST:
  - Be clearly aligned to the company and role.
  - Include the required skill phrase and a realistic outcome.
  - Avoid repeated or templated wording.
- Keyword grouping rule:
  - If multiple missing/required skills are closely related (same domain/intent), combine them naturally in one bullet instead of spreading them across many bullets.
  - Example of related grouping: "data integrity" + "data quality" + "governance/documentation".
  - Do NOT force unrelated skills into one bullet.

IMPACT QUANTIFICATION (MANDATORY, BULLET-LEVEL):
- Add quantification to 2–3 experience bullets across the resume when plausibly inferable.
- Quantification must appear inside bullet points (not separate metadata).
- If exact values are uncertain, use safe approximations/ranges (for example: "improved throughput by ~10–15%" or "reduced turnaround time by about 20%").
- Do NOT fabricate highly specific numbers that are not supported by context.

Strength-first rule:
- Prioritize and amplify evidence from the candidate’s existing strengths (matched skills) by rephrasing them into job-relevant intent language.
- Only use missing skills for targeted, non-spam gap filling within those rewritten bullets.

STEP 4 — BULLET RULES
Each bullet must:
- Start with a strong action verb.
- Be between 18–28 words.
- Reflect 1 primary intent (no mixing).
- Include domain-relevant phrasing where natural.
- Do NOT aggressively add new numeric metrics in this phase; only preserve or mildly clarify impact that is already implied. A separate layer will handle stronger quantification.
- Sound like it belongs to THIS job description.

Bullet-to-bullet variation (MANDATORY):
- Within each company, vary the focus:
  - some bullets should emphasize analytics and insight generation;
  - some should emphasize operations, processes, and execution;
  - some should emphasize outcomes, KPIs, and business impact.
- Within each company, the FIRST WORD of each bullet must be different.
- If you are about to start a bullet with a verb already used as the first word for that company, choose a different strong verb instead.

STEP 5 — SAFE DOMAIN ADAPTATION
If direct experience is missing:
- Use transferable framing:
  - anomaly detection → risk pattern identification;
  - dashboards → KPI tracking;
  - ML models → decision-support systems.
- Use soft language:
  - “supporting”, “enabling”, “contributing to”.
- NEVER claim direct ownership of domain-specific processes unless clearly implied.

STEP 6 — SUMMARY REWRITE
Rewrite the summary to:
- Clearly state the job domain and focus in the FIRST sentence (this is mandatory).
- Avoid generic “AI/ML” or generic “data scientist” language.
- Include 2–3 high-value intent concepts from the job (for example risk analysis, operational KPIs, decision systems).
- Emphasize business impact, decision-making, and domain alignment over tools.
- Sound confident and targeted, not like a generic AI-generated summary.

OUTPUT FORMAT (STRICT JSON):

{
  "summary": "...",
  "experience": [
    {
      "company": "...",
      "role": "...",
      "bullets": ["...", "..."]
    }
  ]
}`;

async function recomposeExperience(
  structuredResume: ResumeDocument,
  jobDescription: string,
  targetSkills: string[],
  requiredSkills: string[],
  matchedSkills: string[],
  apiKey: string | undefined,
  model: string
): Promise<RecomposedExperience | null> {
  if (!apiKey || targetSkills.length === 0) return null;

  const userPrompt = `JOB DESCRIPTION:
${jobDescription}

MATCHED SKILLS (strengths):
${matchedSkills.join(", ")}

MISSING SKILLS:
${targetSkills.join(", ")}

REQUIRED MISSING SKILLS (must be covered in experience bullets):
${requiredSkills.join(", ")}

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
      max_tokens: 2000,
      temperature: 0.4,
      top_p: 1,
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
  if (!recomposed || !Array.isArray(recomposed.experience)) return original;

  const newExperience = original.experience.map((exp) => {
    if (!exp.company) return exp;
    if (exp.projects && exp.projects.length > 0) {
      return exp;
    }
    const companyName = exp.company.toLowerCase();
    const match = recomposed.experience.find(
      (r) =>
        typeof r.company === "string" &&
        r.company &&
        (r.company.toLowerCase().includes(companyName) ||
          companyName.includes(r.company.toLowerCase()))
    );
    if (!match || !Array.isArray(match.bullets) || match.bullets.length === 0) {
      return exp;
    }

    const originalBullets = exp.bullets ?? [];
    const newBullets = match.bullets
      .filter((b) => typeof b === "string" && b.trim().length > 0)
      .map((b) => normalizeInlineText(b));
    if (originalBullets.length === 0 || newBullets.length === 0) return exp;

    // Preserve 1–2 of the strongest original bullets to keep authenticity.
    const keepCount = Math.min(
      2,
      Math.max(1, Math.round(originalBullets.length * 0.3))
    );
    const preserved = originalBullets.slice(0, keepCount);

    // Take a subset of recomposed bullets so total per company stays reasonable.
    const maxTotal = Math.max(keepCount + 2, 6);
    const rewriteSlots = Math.max(0, maxTotal - keepCount);
    const rewritten = newBullets.slice(0, rewriteSlots);

    return {
      ...exp,
      bullets: [...preserved, ...rewritten],
    };
  });

  return {
    ...original,
    summary:
      typeof recomposed.summary === "string" && recomposed.summary.trim().length > 0
        ? recomposed.summary.trim()
        : original.summary,
    experience: newExperience,
  };
}

async function rewriteBullet(
  bullet: string,
  keywords: string[],
  apiKey: string,
  model: string,
  forceQuantified: boolean,
  globalStyle: GlobalStyle
): Promise<string> {
  const systemPrompt = `You are improving a resume bullet for ATS optimization.

You MUST:
- Keep the original meaning.
- Start with a strong action verb.
- Action verb diversity:
  - Prefer a different opening verb than nearby bullets in the same role.
  - Avoid repeating the same first word across multiple rewritten bullets.
- Naturally include ALL provided keywords when they fit logically.
- Do NOT add keywords in a forced or spammy way. If one or more keywords truly cannot fit this bullet without fabrication, omit only those keywords.
- Keep it realistic (no fake metrics).
- Maximum 28 words.
- Quantification mode:
  - If QUANTIFY=true: add one realistic numeric metric only when it can be reasonably inferred from context.
  - This metric must be part of the bullet text and tied to an impact outcome.
  - Avoid fabricating precise numbers. Prefer ranges/approximate values when uncertain.
  - If QUANTIFY=false: do NOT introduce new numeric metrics unless the original bullet already contains them.
- Style consistency rules:
  - Use consistent tense: ${globalStyle.tense}
  - Use consistent tone: ${globalStyle.tone}
  - Do not repeat the same starting word used in other bullets.
  - Specifically avoid these starting words for this rewrite: ${globalStyle.avoidWords.join(", ") || "none"}

If the original bullet already has strong impact, improve clarity instead.

Return ONLY the improved bullet. No quotes, no explanation.`;

  const userPrompt = `Bullet:
"${bullet}"

Keywords to include (subtly, where they logically fit):
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
      max_tokens: 120,
      temperature: 0,
      top_p: 1,
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
  return cleaned.length > 0 ? cleaned : bullet;
}

async function generateAlignedBullet(
  role: string,
  company: string,
  jobDescription: string,
  skill: string,
  apiKey: string,
  model: string
): Promise<string | null> {
  const systemPrompt = `You write one realistic resume bullet aligned to a candidate's existing role.

Rules:
- Output exactly one bullet line only.
- Must include this required skill phrase verbatim: ${skill}
- Keep it truthful and role-consistent.
- 18-28 words, strong action verb, professional tone.
- Include one impact outcome.
- Include a quantified metric only when reasonably inferable from context.
- Avoid fabricating precise values; prefer ranges/approximate magnitudes when uncertain.
- No templated language or placeholders.`;

  const userPrompt = `ROLE: ${role || "Unknown role"}
COMPANY: ${company || "Unknown company"}
JOB DESCRIPTION CONTEXT:
${jobDescription.slice(0, 1400)}

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
      max_tokens: 120,
      temperature: 0,
      top_p: 1,
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
  return cleaned.length > 0 ? cleaned : null;
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
  if (target.projects && target.projects.length > 0) {
    const last = target.projects[target.projects.length - 1]!;
    last.bullets = [...(last.bullets ?? []), ...filtered];
  } else {
    target.bullets.push(...filtered);
  }
  return updated;
}

async function validateResumeCoverage(args: {
  resumeText: string;
  requiredSkills: string[];
  apiKey: string | undefined;
  model: string;
}): Promise<ValidationResult> {
  const { resumeText, requiredSkills, apiKey, model } = args;
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
      max_tokens: 600,
      temperature: 0,
      top_p: 1,
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

    const apiKey = process.env.ANTHROPIC_API_KEY;
    const model =
      process.env.ANTHROPIC_MODEL && process.env.ANTHROPIC_MODEL.trim().length > 0
        ? process.env.ANTHROPIC_MODEL
        : "claude-3-haiku-20240307";

    // If no structured resume is provided, do not attempt to rebuild from raw text.
    // Just return the original resume and unchanged score.
    if (!body.structuredResume || !Array.isArray(body.structuredResume.experience)) {
      const scoreBefore = analyzeResult.ats_score;
      const response: OptimizeResponse = {
        optimizedResume: resumeText,
        scoreAfter: scoreBefore,
        addedKeywords: [],
        bulletImprovements: 0,
        quantifiedAchievements: 0,
      };
      return NextResponse.json(response);
    }

    let baseStructured = body.structuredResume;

    const missingRequired = Array.isArray(analyzeResult.missing_skills_required)
      ? analyzeResult.missing_skills_required
          .filter((s) => typeof s === "string")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];
    const missingSkills = Array.isArray(analyzeResult.missing_skills)
      ? analyzeResult.missing_skills.filter((s) => typeof s === "string" && s.trim().length > 0)
      : [];

    const matchedSkills = Array.isArray(analyzeResult.matched_skills)
      ? analyzeResult.matched_skills.filter((s) => typeof s === "string" && s.trim().length > 0).map((s) => s.trim())
      : [];

    // Rank skills and keep top 8–12 most important for optimization.
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

    const MAX_TARGET = 12;
    const targetSkills = candidates.slice(0, MAX_TARGET).map((c) => c.skill);
    const requiredSkills = candidates.filter((c) => c.required).map((c) => c.skill);
    const optionalSkills = candidates.filter((c) => !c.required).map((c) => c.skill);

    // Expand semantically for both:
    // - targetSkills (missing skills we try to add)
    // - matchedSkills (existing strengths we want to preserve)
    const skillsForExpansion = Array.from(new Set([...targetSkills, ...matchedSkills])).slice(0, 20);
    const expandedMap = await expandSkillsSemantically(jobDescription, skillsForExpansion, apiKey, model);

    const intentClusters = await mapSkillsToIntents(jobDescription, targetSkills, apiKey, model);

    // Role-aware recomposition layer (single LLM call) before bullet-level polish.
    try {
      const recomposed = await recomposeExperience(
        baseStructured,
        jobDescription,
        targetSkills,
        missingRequired,
        matchedSkills,
        apiKey,
        model
      );
      baseStructured = mergeRecomposed(baseStructured, recomposed);
    } catch (e) {
      console.warn("[optimize] recomposition step failed", e);
    }

    const bulletsWithContext: BulletWithContext[] = [];
    baseStructured.experience.forEach((exp, expIndex) => {
      (exp.bullets ?? []).forEach((text, bulletIndex) => {
        if (text && text.trim()) {
          bulletsWithContext.push({
            expIndex,
            bulletKey: `${expIndex}:${bulletIndex}`,
            text,
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

    if (apiKey && orderedBullets.length > 0 && targetSkills.length > 0) {
      const baseGlobalStyle: GlobalStyle = {
        tense: "past",
        tone: "impact-driven",
        avoidWords: [],
      };
      const usedStartWords = new Set<string>();
      const coveragePlan = buildCoveragePlan(targetSkills, orderedBullets, expandedMap);
      const weakBulletKeys = new Set(
        orderedBullets.filter((b) => isWeakBullet(b.text)).map((b) => b.bulletKey)
      );
      // Preserve strong existing bullets: only weak mapped bullets are eligible for rewrite.
      const mappingEntries = Object.entries(coveragePlan.existingBulletMappings).filter(
        ([key]) => weakBulletKeys.has(key)
      );
      // Rewrite budget remains decoupled from coverage plan, but bounded by weak eligible bullets.
      const rewriteBudget = Math.min(
        mappingEntries.length,
        Math.max(1, targetSkills.length)
      );
      const requiredNeedingNewBullets = coveragePlan.skillsNeedingNewBullets.filter(
        (skill) =>
          missingRequired.some(
            (req) => req.toLowerCase().trim() === skill.toLowerCase().trim()
          )
      );
      const maxNewBullets = Math.min(4, requiredNeedingNewBullets.length);
      if (debugEnabled) {
        const mapped: CoveragePlanDebug["existingBulletMappings"] = {};
        for (const [key, skills] of mappingEntries) {
          const bulletText =
            orderedBullets.find((x) => x.bulletKey === key)?.text ?? "";
          mapped[key] = {
            skills,
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
      const quantTarget =
        rewriteBudget < 2
          ? rewriteBudget
          : Math.min(3, Math.max(2, Math.ceil(rewriteBudget * 0.3)));
      let quantUsed = 0;

      for (let i = 0; i < rewriteBudget && i < mappingEntries.length; i++) {
        const [key, assigned] = mappingEntries[i]!;
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
            globalStyleForThisBullet
          )
        );
        if (improved && improved !== original) {
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
        } else {
          // No change; still continue so remaining skills can be assigned to next bullets.
        }
      }

      // New bullets for uncovered intents/skills (capped for latency).
      for (let i = 0; i < maxNewBullets; i++) {
        const skill = requiredNeedingNewBullets[i]!;
        if (baseStructured.experience.length === 0) break;
        const expIndex = i % baseStructured.experience.length;
        const exp = baseStructured.experience[expIndex]!;
        const generated = await generateAlignedBullet(
          exp.role ?? "",
          exp.company ?? "",
          jobDescription,
          skill,
          apiKey,
          model
        );
        if (!generated) continue;
        const next = normalizeInlineText(generated);
        if (!next) continue;
        const existing = new Set(allExperienceBulletTextsNormalized(exp));
        if (existing.has(next) || isSimilar(next, Array.from(existing))) continue;
        let bulletKey: string;
        if (exp.projects && exp.projects.length > 0) {
          const pi = exp.projects.length - 1;
          const proj = exp.projects[pi]!;
          proj.bullets = proj.bullets ?? [];
          proj.bullets.push(next);
          bulletKey = `${expIndex}:p${pi}:${proj.bullets.length - 1}`;
        } else {
          exp.bullets = exp.bullets ?? [];
          exp.bullets.push(next);
          bulletKey = `${expIndex}:${exp.bullets.length - 1}`;
        }
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

    // Coverage boost: if many target skills are still missing, add a few aligned bullets
    // for remaining gaps (add-only; no rewrite in this stage).
    if (apiKey && targetSkills.length > 0 && optimizedStructured.experience.length > 0) {
      const currentText = (
        resumeDocumentToPlainText(optimizedStructured) || resumeText
      ).toLowerCase();
      const uncoveredTargetSkills = targetSkills.filter(
        (skill) => !isSkillCovered(currentText, skill, expandedMap)
      );

      if (uncoveredTargetSkills.length > 0) {
        // Add a few new role-aligned bullets (includes optional skills too).
        const stillUncovered = targetSkills.filter(
          (skill) =>
            !isSkillCovered(
              (resumeDocumentToPlainText(optimizedStructured) || resumeText).toLowerCase(),
              skill,
              expandedMap
            )
        );
        const maxCoverageNewBullets = Math.min(4, stillUncovered.length);
        for (let i = 0; i < maxCoverageNewBullets; i++) {
          const skill = stillUncovered[i]!;
          const expIndex = i % optimizedStructured.experience.length;
          const exp = optimizedStructured.experience[expIndex]!;
          const generated = await generateAlignedBullet(
            exp.role ?? "",
            exp.company ?? "",
            jobDescription,
            skill,
            apiKey,
            model
          );
          if (!generated) continue;
          const next = normalizeInlineText(generated);
          if (!next) continue;
          const existing = new Set(allExperienceBulletTextsNormalized(exp));
          if (existing.has(next) || isSimilar(next, Array.from(existing))) continue;
          let bulletKey: string;
          if (exp.projects && exp.projects.length > 0) {
            const pi = exp.projects.length - 1;
            const proj = exp.projects[pi]!;
            proj.bullets = proj.bullets ?? [];
            proj.bullets.push(next);
            bulletKey = `${expIndex}:p${pi}:${proj.bullets.length - 1}`;
          } else {
            exp.bullets = exp.bullets ?? [];
            exp.bullets.push(next);
            bulletKey = `${expIndex}:${exp.bullets.length - 1}`;
          }
          improvedMap[bulletKey] = next;
          upsertBulletChange(bulletChangeMap, bulletKey, "", next, [skill]);
        }
      }
    }

    const bulletChanges = Object.values(bulletChangeMap);
    const rewrittenChanges = bulletChanges.filter(
      (c) => c.original.trim().length > 0 && c.improved !== c.original
    );
    const improvedBullets = rewrittenChanges.map((c) => c.improved);
    const bulletImprovements = improvedBullets.length;
    const quantifiedBullets = bulletChanges.filter((c) => c.quantified).map((c) => c.improved);
    const quantifiedAchievements = quantifiedBullets.length;

    let optimizedText = resumeDocumentToPlainText(optimizedStructured) || resumeText;

    // Phase 2: single validation pass + deterministic minimal patch.
    if (missingRequired.length > 0) {
      const validation = await validateResumeCoverage({
        resumeText: optimizedText,
        requiredSkills: missingRequired,
        apiKey,
        model,
      });
      if (validation.status === "FIX_NEEDED") {
        const missingSkills = Array.isArray(validation.missing_skills)
          ? validation.missing_skills.filter((s) => typeof s === "string").map((s) => s.trim()).filter(Boolean)
          : [];
        const newBullets = Array.isArray(validation.new_bullets)
          ? validation.new_bullets.filter((b) => typeof b === "string").map((b) => normalizeInlineText(b)).filter(Boolean)
          : [];
        // Safety constraints: keep this bounded and minimal.
        if (missingSkills.length <= 3 && newBullets.length > 0) {
          const cappedBullets = newBullets.slice(0, 2);
          const existingBullets = optimizedStructured.experience.flatMap((e) =>
            allExperienceBulletTextsNormalized(e)
          );
          const filteredBullets = cappedBullets.filter((b) => !isSimilar(b, existingBullets));
          if (filteredBullets.length > 0) {
            optimizedStructured = appendBulletsToBestMatchingRole({
              resume: optimizedStructured,
              bullets: filteredBullets,
            });
            optimizedText = resumeDocumentToPlainText(optimizedStructured) || optimizedText;
          }
        }
      }
    }

    const originalTextLower = String(resumeText ?? "").toLowerCase();
    const optimizedTextLower = optimizedText.toLowerCase();

    // Semantic coverage: which target skills newly appear.
    const addedKeywords = targetSkills.filter((skill) => {
      const inOriginal = isSkillCovered(originalTextLower, skill, expandedMap);
      const inOptimized = isSkillCovered(optimizedTextLower, skill, expandedMap);
      return inOptimized && !inOriginal;
    });

    // Coverage breakdown for UX.
    const covered: string[] = [];
    const missing: string[] = [];
    for (const skill of targetSkills) {
      if (isSkillCovered(optimizedTextLower, skill, expandedMap)) {
        covered.push(skill);
      } else {
        missing.push(skill);
      }
    }

    const targetSkillCoverage =
      targetSkills.length > 0
        ? {
            total: targetSkills.length,
            coveredBefore: targetSkills.filter((skill) =>
              isSkillCovered(originalTextLower, skill, expandedMap)
            ).length,
            coveredAfter: targetSkills.filter((skill) =>
              isSkillCovered(optimizedTextLower, skill, expandedMap)
            ).length,
          }
        : undefined;

    const scoreBefore = analyzeResult.ats_score;

    const k = addedKeywords.length;
    const b = bulletImprovements;
    const q = quantifiedAchievements;
    const f = 1; // formatting is always improved for optimized resumes

    let scoreAfter: number;

    if (k === 0 && b === 0 && q === 0) {
      // No concrete improvements detected – keep score unchanged
      scoreAfter = scoreBefore;
    } else {
      const keywordScore = Math.min(k * 2, 20);
      const bulletScore = Math.min(b * 1.5, 10);
      const impactScore = Math.min(q * 3, 12);
      const formatScore = f ? 5 : 0;

      const improvementRaw =
        keywordScore * 0.5 +
        bulletScore * 0.2 +
        impactScore * 0.2 +
        formatScore * 0.1;

      const improvement = Math.round(improvementRaw);

      let tentative = scoreBefore + improvement;
      tentative = Math.max(scoreBefore + 2, tentative);
      tentative = Math.min(95, tentative);
      scoreAfter = Math.round(tentative);
    }

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

    const missingCritical = missingRequired
      .filter((s) => !isSkillCovered(optimizedLowerForInsights, s, expandedMap))
      .slice(0, 6);

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
      dominantIntents,
    };

    const kwBefore =
      typeof analyzeResult.keyword_coverage === "number"
        ? Math.max(0, Math.min(100, Math.round(analyzeResult.keyword_coverage)))
        : undefined;
    const keywordCoverage =
      kwBefore === undefined
        ? undefined
        : {
            before: kwBefore,
            after: Math.min(100, kwBefore + Math.min(22, k * 3 + Math.max(0, (targetSkillCoverage?.coveredAfter ?? 0) - (targetSkillCoverage?.coveredBefore ?? 0)) * 2)),
          };

    const impBefore =
      typeof analyzeResult.impact_score === "number"
        ? Math.max(0, Math.min(100, Math.round(analyzeResult.impact_score)))
        : undefined;
    const impactScore =
      impBefore === undefined
        ? undefined
        : {
            before: impBefore,
            after: Math.min(
              100,
              Math.round(impBefore + q * 4 + b * 1.5 + Math.min(12, k * 1.2))
            ),
          };

    const response: OptimizeResponse = {
      optimizedResume: resumeDocumentToPlainText(optimizedStructured) || optimizedText,
      scoreAfter,
      roleAlignmentScore,
      matchedStrengthScore,
      addedKeywords,
      bulletImprovements,
      quantifiedAchievements,
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
      ...(debugEnabled ? { debug: { coveragePlan: coveragePlanDebug } } : {}),
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
