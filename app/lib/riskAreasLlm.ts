import type { EvidenceDashboard } from "@/app/lib/resumeEvidenceScore";
import { resolveSkillProofRow } from "@/app/lib/jdSkillProofStatus";
import { parseAnthropicErrorType } from "@/app/lib/anthropicModels";
import { inferRiskAreasHeuristic } from "@/app/lib/resumeEvidenceScore";
import {
  dedupeRecommendedFixes,
  extractResumePlacementTargets,
  isStructuredRecommendedFixes,
  normalizeRecommendedFix,
  type RecommendedFix,
  validateRecommendedFixTargets,
} from "@/app/lib/recommendedFixes";

const API_URL = "https://api.anthropic.com/v1/messages";

/** Bump when prompt/calibration changes — forces refresh of cached fix recommendations. */
export const RISK_AREAS_VERSION = 3;

export const RISK_AREAS_MIN = 3;
export const RISK_AREAS_MAX = 5;

const SYSTEM_PROMPT = `You recommend resume fixes to improve shortlist odds for a specific job posting.

Return ONLY valid JSON. No markdown, no explanation outside JSON.

Output format:
{
  "recommended_fixes": [
    {
      "action": "Add Kubernetes deployment proof with a shipped outcome",
      "target": "Conde Nast",
      "section": "experience",
      "detail": "JD requires deep cloud-native delivery; surface orchestration or pipeline work you can defend"
    },
    {
      "action": "Quantify GenAI impact in your strongest ML bullet",
      "target": "Senior Data Scientist",
      "section": "experience",
      "detail": "Add latency, accuracy, adoption, or revenue impact you can defend"
    }
  ]
}

Rules:
- Return ${RISK_AREAS_MIN} to ${RISK_AREAS_MAX} items, ordered by impact on shortlist odds for THIS role.
- "action": imperative coaching — what to change (max 110 chars). Do NOT repeat the company name if "target" is set.
- "target": MUST be an exact company, role title, or project name from the RESUME ROLES list in the user message. Omit or null if the fix applies to summary/skills only.
- "section": one of "experience" | "summary" | "skills" | "projects".
- "detail": optional one-line why for this JD (max 90 chars).
- Base fixes only on gaps between the resume and job description — never invent skills, tools, or experience.
- Each fix must target a different gap. Never repeat the same theme twice.
- Do NOT repeat generic ATS advice ("improve formatting", "use keywords").
- Forbidden: inventing credentials, claiming experience they do not have, vague "improve your resume".`;

function extractJson(raw: string): string {
  const mdMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  const str = mdMatch ? mdMatch[1].trim() : raw;
  const start = str.indexOf("{");
  const end = str.lastIndexOf("}") + 1;
  if (start === -1 || end <= start) return raw;
  return str.slice(start, end);
}

export function parseRecommendedFixes(payload: unknown): RecommendedFix[] {
  if (!payload || typeof payload !== "object") return [];
  const obj = payload as {
    recommended_fixes?: unknown;
    risk_areas?: unknown;
    fixes?: unknown;
  };
  const raw = Array.isArray(obj.recommended_fixes)
    ? obj.recommended_fixes
    : Array.isArray(obj.risk_areas)
      ? obj.risk_areas
      : Array.isArray(obj.fixes)
        ? obj.fixes
        : [];

  const out: RecommendedFix[] = [];
  const seen = new Set<string>();

  for (const item of raw) {
    const fix = normalizeRecommendedFix(item);
    if (!fix) continue;
    const key = `${fix.action}::${fix.target ?? ""}`.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(fix);
    if (out.length >= RISK_AREAS_MAX) break;
  }

  return dedupeRecommendedFixes(out);
}

function buildUserContent(args: {
  dashboard: EvidenceDashboard;
  resumeText: string;
  jobDescription: string;
  targetRoleTitle?: string;
  missingSkills: string[];
  resumeRoles: string[];
}): string {
  const skillRows = args.dashboard.skillProofAll ?? args.dashboard.skillProof;
  const weakSkills = skillRows
    .filter((row) => {
      const { proofStatus } = resolveSkillProofRow(row);
      return proofStatus === "weak" || proofStatus === "implied" || proofStatus === "missing";
    })
    .slice(0, 10)
    .map((row) => {
      const { proofStatus } = resolveSkillProofRow(row);
      const why = row.whyDetail?.trim();
      const hint = row.evidenceHint?.trim();
      return `- ${row.skill}: ${proofStatus}${hint ? ` @ ${hint}` : ""}${why ? ` — ${why}` : ""}`;
    })
    .join("\n");

  const rejectionRisks = (args.dashboard.mostMissingEvidence ?? [])
    .slice(0, 5)
    .map((r) => `- ${r}`)
    .join("\n");

  const resumeRoles =
    args.resumeRoles.length > 0
      ? args.resumeRoles.map((r) => `- ${r}`).join("\n")
      : "(parse from resume text)";

  return `TARGET ROLE: ${args.targetRoleTitle?.trim() || "(from job description)"}

EVIDENCE MATCH: ${args.dashboard.evidenceMatch}%
- JD skills in bullets: ${args.dashboard.snapshot.jdSkillProof}%
- Impact coverage: ${args.dashboard.snapshot.impactCoverage}%
- Seniority alignment: ${args.dashboard.seniority.score}%

RESUME ROLES (use ONLY these for "target"):
${resumeRoles}

WEAK / MISSING KEYWORDS (fix opportunities):
${weakSkills || "(none flagged)"}

TOP REJECTION RISKS (context — turn gaps into actionable fixes):
${rejectionRisks || "(none)"}

MISSING JD KEYWORDS (reference):
${args.missingSkills.slice(0, 10).join(", ") || "(none)"}

RESUME:
${args.resumeText}

JOB DESCRIPTION:
${args.jobDescription}`;
}

export async function fetchRecommendedFixesLlm(args: {
  apiKey: string;
  modelCandidates: string[];
  resumeText: string;
  jobDescription: string;
  dashboard: EvidenceDashboard;
  missingSkills: string[];
  targetRoleTitle?: string;
  resumeRoles: string[];
}): Promise<RecommendedFix[]> {
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
        max_tokens: 700,
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
      "[risk-areas] Anthropic error",
      response.status,
      `model=${candidateModel}`,
      responseText.slice(0, 300)
    );
    if (!isModelUnavailable) break;
  }

  if (!response?.ok) {
    console.error("[risk-areas] LLM call failed; using heuristic fallback");
    return inferRiskAreasHeuristic(args.dashboard, args.resumeText);
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
    let items = validateRecommendedFixTargets(parseRecommendedFixes(parsed), args.resumeText);

    if (items.length >= RISK_AREAS_MIN) return items;

    const fallback = inferRiskAreasHeuristic(args.dashboard, args.resumeText);
    for (const item of fallback) {
      if (items.length >= RISK_AREAS_MAX) break;
      const key = `${item.action}::${item.target ?? ""}`.toLowerCase();
      if (!items.some((x) => `${x.action}::${x.target ?? ""}`.toLowerCase() === key)) {
        items.push(item);
      }
    }
    return dedupeRecommendedFixes(items).slice(0, RISK_AREAS_MAX);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[risk-areas] Failed to parse LLM JSON", msg);
    return inferRiskAreasHeuristic(args.dashboard, args.resumeText);
  }
}

export async function attachRiskAreasToEvidenceDashboard(args: {
  dashboard: EvidenceDashboard;
  apiKey: string;
  modelCandidates: string[];
  resumeText: string;
  jobDescription: string;
  missingSkills: string[];
  targetRoleTitle?: string;
}): Promise<EvidenceDashboard> {
  if (
    Array.isArray(args.dashboard.riskAreas) &&
    args.dashboard.riskAreas.length > 0 &&
    args.dashboard.riskAreasVersion === RISK_AREAS_VERSION &&
    isStructuredRecommendedFixes(args.dashboard.riskAreas)
  ) {
    return args.dashboard;
  }

  const resumeRoles = extractResumePlacementTargets(args.resumeText);

  const riskAreas = dedupeRecommendedFixes(
    await fetchRecommendedFixesLlm({
      ...args,
      resumeRoles,
    })
  );

  return {
    ...args.dashboard,
    riskAreas,
    riskAreasVersion: RISK_AREAS_VERSION,
  };
}
