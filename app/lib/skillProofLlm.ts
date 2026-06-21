import type {
  EvidenceDashboard,
  EvidenceStrength,
  JdSkillEvidenceRow,
} from "@/app/lib/resumeEvidenceScore";
import {
  optimizeActionFromProofStatus,
  resolveSkillProofRow,
  type JdSkillProofStatus,
} from "@/app/lib/jdSkillProofStatus";
import { selectSkillProofForDashboard } from "@/app/lib/resumeEvidenceScore";
import { getKeywordCoverageLabel } from "@/app/lib/scoreColors";
import type { KeywordCoverageMetricInput } from "@/app/lib/evidenceMetricCopy";
import { parseAnthropicErrorType } from "@/app/lib/anthropicModels";
import { HOMOGRAPH_SKILL_LLM_RULES } from "@/app/lib/skillGapRules";

const API_URL = "https://api.anthropic.com/v1/messages";

/** Bump when prompt/calibration changes — forces refresh of cached keyword proof rows. */
export const SKILL_PROOF_VERSION = 3;

export const SKILL_PROOF_LLM_MAX = 24;

const SYSTEM_PROMPT = `You classify JD keyword proof for a resume versus a specific job description and summarize overall keyword coverage.

Return ONLY valid JSON. No markdown, no explanation outside JSON.

Output format:
{
  "coverage_verdict": {
    "badge": "Good coverage",
    "headline": "Most required JD keywords are evidenced in work bullets.",
    "reason": "AWS is skills-list only; LangChain not found in resume."
  },
  "keyword_proof": [
    {
      "skill": "Python",
      "proof_status": "proven",
      "why": "Named in ML project bullets with delivery outcomes"
    }
  ]
}

coverage_verdict rules:
- badge: short label (max 28 chars) — e.g. "Strong coverage", "Good coverage", "Thin coverage", "Low coverage"
- headline: one sentence (max 120 chars) on matched vs missed JD keywords for THIS resume
- reason: one sentence (max 140 chars) naming the most important missed or weak keywords only

keyword_proof rules:
- Classify EVERY keyword listed in the user message (same spelling).
- proof_status must be exactly one of: proven, partial, weak, not_found
  - proven: named in work or project bullets with clear usage
  - partial: indirect or related evidence in bullets, not explicitly named
  - weak: mentioned in skills list or summary only, not proven in work bullets
  - not_found: absent from resume or only a generic buzzword with no role proof
- why: one short phrase (max 72 chars) explaining the status for THIS resume and JD
- Do NOT invent skills not in the keyword list
- Do NOT inflate to proven when proof is skills-list-only
- ${HOMOGRAPH_SKILL_LLM_RULES}
- Order output the same as the keyword list`;

function extractJson(raw: string): string {
  const mdMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  const str = mdMatch ? mdMatch[1].trim() : raw;
  const start = str.indexOf("{");
  const end = str.lastIndexOf("}") + 1;
  if (start === -1 || end <= start) return raw;
  return str.slice(start, end);
}

function skillKey(skill: string): string {
  return skill.toLowerCase().trim();
}

function mapLlmProofStatus(raw: string): JdSkillProofStatus | null {
  const s = String(raw ?? "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_");
  if (s === "proven") return "proven";
  if (s === "partial" || s === "implied") return "implied";
  if (s === "weak") return "weak";
  if (s === "not_found" || s === "missing" || s === "gap") return "missing";
  return null;
}

function strengthFromProofStatus(status: JdSkillProofStatus): EvidenceStrength {
  switch (status) {
    case "proven":
      return "strong";
    case "implied":
      return "medium";
    case "weak":
      return "weak";
    case "missing":
      return "gap";
  }
}

function normalizeWhy(raw: string, status: JdSkillProofStatus): string {
  const text = String(raw ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 72);
  if (text.length >= 8) return text;
  switch (status) {
    case "proven":
      return "Found in work or project bullets";
    case "implied":
      return "Evidence exists indirectly";
    case "weak":
      return "Mentioned but not proven";
    case "missing":
      return "Not in resume";
  }
}

export type KeywordCoverageVerdict = {
  badgeLabel: string;
  headline: string;
  reason?: string;
};

export type KeywordProofLlmResult = {
  rows: LlmKeywordProofRow[];
  coverageVerdict: KeywordCoverageVerdict | null;
};

export type LlmKeywordProofRow = {
  skill: string;
  proof_status: string;
  why: string;
};

export function parseCoverageVerdict(payload: unknown): KeywordCoverageVerdict | null {
  if (!payload || typeof payload !== "object") return null;
  const obj = payload as { coverage_verdict?: unknown };
  if (!obj.coverage_verdict || typeof obj.coverage_verdict !== "object") return null;
  const v = obj.coverage_verdict as { badge?: unknown; headline?: unknown; reason?: unknown };
  const badgeLabel = String(v.badge ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 28);
  const headline = String(v.headline ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);
  const reason = String(v.reason ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 140);
  if (badgeLabel.length < 4 || headline.length < 10) return null;
  return {
    badgeLabel,
    headline,
    reason: reason.length >= 8 ? reason : undefined,
  };
}

export function inferCoverageVerdictFallback(
  coverage: KeywordCoverageMetricInput
): KeywordCoverageVerdict {
  const missed = Math.max(0, coverage.totalCount - coverage.matchedCount);
  return {
    badgeLabel: getKeywordCoverageLabel(coverage.score),
    headline: `${coverage.matchedCount} matched · ${missed} missed JD keywords in your resume.`,
  };
}

export function resolveKeywordCoverageVerdict(
  dashboard: EvidenceDashboard,
  coverage: KeywordCoverageMetricInput
): KeywordCoverageVerdict {
  if (dashboard.keywordCoverageVerdict) return dashboard.keywordCoverageVerdict;
  return inferCoverageVerdictFallback(coverage);
}

export function parseKeywordProofRows(payload: unknown): LlmKeywordProofRow[] {
  if (!payload || typeof payload !== "object") return [];
  const obj = payload as { keyword_proof?: unknown; skill_proof?: unknown };
  const raw = Array.isArray(obj.keyword_proof)
    ? obj.keyword_proof
    : Array.isArray(obj.skill_proof)
      ? obj.skill_proof
      : [];
  const out: LlmKeywordProofRow[] = [];
  const seen = new Set<string>();

  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const row = item as { skill?: unknown; proof_status?: unknown; why?: unknown };
    const skill = String(row.skill ?? "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 64);
    if (!skill || skill.length < 2) continue;
    const key = skillKey(skill);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({
      skill,
      proof_status: String(row.proof_status ?? "").trim(),
      why: String(row.why ?? "").trim(),
    });
  }
  return out;
}

function mergeLlmProofOntoBaseline(
  baseline: JdSkillEvidenceRow,
  llm: LlmKeywordProofRow | undefined
): JdSkillEvidenceRow {
  if (!llm) return baseline;
  const proofStatus = mapLlmProofStatus(llm.proof_status);
  if (!proofStatus) return baseline;

  const strength = strengthFromProofStatus(proofStatus);
  const optimizeAction = optimizeActionFromProofStatus(proofStatus);
  const whyDetail = normalizeWhy(llm.why, proofStatus);

  let evidenceLocation = baseline.evidenceLocation;
  if (proofStatus === "missing") {
    evidenceLocation = "none";
  } else if (proofStatus === "weak" && evidenceLocation === "none") {
    evidenceLocation = "skills_only";
  } else if (proofStatus === "proven" && evidenceLocation === "none") {
    evidenceLocation = "experience";
  }

  return {
    ...baseline,
    strength,
    proofStatus,
    optimizeAction,
    whyDetail,
    evidenceLocation,
    mentionCount:
      proofStatus === "missing" ? 0 : Math.max(baseline.mentionCount, proofStatus === "proven" ? 1 : 0),
  };
}

export function applyKeywordProofLlmToRows(
  baselineRows: JdSkillEvidenceRow[],
  llmRows: LlmKeywordProofRow[]
): JdSkillEvidenceRow[] {
  const bySkill = new Map<string, LlmKeywordProofRow>();
  for (const row of llmRows) {
    bySkill.set(skillKey(row.skill), row);
  }
  return baselineRows.map((baseline) =>
    mergeLlmProofOntoBaseline(baseline, bySkill.get(skillKey(baseline.skill)))
  );
}

export function countKeywordProofCoverage(rows: JdSkillEvidenceRow[]): {
  matched: number;
  missed: number;
  total: number;
  score: number;
} {
  let matched = 0;
  let missed = 0;
  for (const row of rows) {
    if (resolveSkillProofRow(row).proofStatus === "missing") missed += 1;
    else matched += 1;
  }
  const total = matched + missed;
  const score = total > 0 ? Math.round((matched / total) * 100) : 100;
  return { matched, missed, total, score };
}

export function buildKeywordCoverageMetricFromSkillProof(
  rows: JdSkillEvidenceRow[] | undefined
): KeywordCoverageMetricInput | undefined {
  if (!rows || rows.length === 0) return undefined;
  const { matched, total, score } = countKeywordProofCoverage(rows);
  return {
    score,
    matchedCount: matched,
    totalCount: total,
    coverageLabel: getKeywordCoverageLabel(score),
  };
}

function buildUserContent(args: {
  dashboard: EvidenceDashboard;
  resumeText: string;
  jobDescription: string;
  matchedSkills: string[];
  missingSkills: string[];
  targetRoleTitle?: string;
}): string {
  const allRows = args.dashboard.skillProofAll ?? args.dashboard.skillProof;
  const keywords = allRows.map((row) => row.skill).slice(0, SKILL_PROOF_LLM_MAX);

  const heuristicHints = allRows
    .slice(0, SKILL_PROOF_LLM_MAX)
    .map((row) => {
      const { proofStatus } = resolveSkillProofRow(row);
      return `- ${row.skill}: heuristic=${proofStatus} (${row.evidenceLocation})`;
    })
    .join("\n");

  return `TARGET ROLE: ${args.targetRoleTitle?.trim() || "(from job description)"}

JD KEYWORDS TO CLASSIFY (${keywords.length} — return all in this order):
${keywords.map((k, i) => `${i + 1}. ${k}`).join("\n")}

MATCHED FROM ANALYSIS (reference):
${args.matchedSkills.slice(0, 16).join(", ") || "(none)"}

MISSING FROM ANALYSIS (reference):
${args.missingSkills.slice(0, 16).join(", ") || "(none)"}

HEURISTIC HINTS (may be wrong — verify against resume):
${heuristicHints || "(none)"}

RESUME:
${args.resumeText}

JOB DESCRIPTION:
${args.jobDescription}`;
}

export async function fetchKeywordProofLlm(args: {
  apiKey: string;
  modelCandidates: string[];
  resumeText: string;
  jobDescription: string;
  dashboard: EvidenceDashboard;
  matchedSkills: string[];
  missingSkills: string[];
  targetRoleTitle?: string;
}): Promise<KeywordProofLlmResult> {
  const userContent = buildUserContent(args);

  let response: Response | null = null;
  let responseText = "";

  for (const candidateModel of args.modelCandidates) {
    response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": args.apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: candidateModel,
        max_tokens: 1200,
        temperature: 0,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user" as const, content: userContent }],
      }),
    });

    responseText = await response.text();
    if (response.ok) break;

    const errorType = parseAnthropicErrorType(responseText);
    const isModelUnavailable = response.status === 404 && errorType === "not_found_error";
    console.error(
      "[skill-proof] Anthropic error",
      response.status,
      `model=${candidateModel}`,
      responseText.slice(0, 300)
    );
    if (!isModelUnavailable) break;
  }

  if (!response?.ok) {
    console.error("[skill-proof] LLM call failed; keeping heuristic keyword rows");
    return { rows: [], coverageVerdict: null };
  }

  try {
    const data = JSON.parse(responseText) as { content?: unknown };
    const content = Array.isArray(data.content) ? data.content : [];
    const text =
      (
        content.find((c: { type?: string; text?: string }) => c?.type === "text") as
          | { text?: string }
          | undefined
      )?.text?.trim() ?? "";
    const parsed = JSON.parse(extractJson(text));
    return {
      rows: parseKeywordProofRows(parsed),
      coverageVerdict: parseCoverageVerdict(parsed),
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[skill-proof] Failed to parse LLM JSON", msg);
    return { rows: [], coverageVerdict: null };
  }
}

function refreshSnapshotJdSkillProof(
  dashboard: EvidenceDashboard,
  skillProofAll: JdSkillEvidenceRow[]
): EvidenceDashboard {
  const { matched, total, score } = countKeywordProofCoverage(skillProofAll);
  return {
    ...dashboard,
    snapshot: {
      ...dashboard.snapshot,
      jdSkillProof: score,
      jdSkillsProved: matched,
      jdSkillsTotal: total,
    },
  };
}

export async function attachSkillProofToEvidenceDashboard(args: {
  dashboard: EvidenceDashboard;
  apiKey: string;
  modelCandidates: string[];
  resumeText: string;
  jobDescription: string;
  matchedSkills: string[];
  missingSkills: string[];
  targetRoleTitle?: string;
  skillProofDisplayLimit?: number;
}): Promise<EvidenceDashboard> {
  const baselineAll = args.dashboard.skillProofAll ?? args.dashboard.skillProof;
  if (baselineAll.length === 0) return args.dashboard;

  if (
    args.dashboard.skillProofVersion === SKILL_PROOF_VERSION &&
    baselineAll.some((row) => typeof row.whyDetail === "string" && row.whyDetail.length > 0) &&
    args.dashboard.keywordCoverageVerdict
  ) {
    return args.dashboard;
  }

  const llmResult = await fetchKeywordProofLlm(args);
  const llmRows = llmResult.rows;
  const skillProofAll =
    llmRows.length > 0
      ? applyKeywordProofLlmToRows(baselineAll, llmRows)
      : baselineAll;

  const displayLimit =
    args.skillProofDisplayLimit ??
    Math.max(args.dashboard.skillProof.length, 14);

  const coverageCounts = countKeywordProofCoverage(skillProofAll);
  const coverageMetric: KeywordCoverageMetricInput = {
    score: coverageCounts.score,
    matchedCount: coverageCounts.matched,
    totalCount: coverageCounts.total,
    coverageLabel: getKeywordCoverageLabel(coverageCounts.score),
  };

  let next: EvidenceDashboard = {
    ...args.dashboard,
    skillProofAll,
    skillProof: selectSkillProofForDashboard(skillProofAll, displayLimit),
    skillProofVersion: SKILL_PROOF_VERSION,
    keywordCoverageVerdict:
      llmResult.coverageVerdict ?? inferCoverageVerdictFallback(coverageMetric),
  };

  if (llmRows.length > 0) {
    next = refreshSnapshotJdSkillProof(next, skillProofAll);
  }

  return next;
}
