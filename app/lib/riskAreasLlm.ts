import type { EvidenceDashboard } from "@/app/lib/resumeEvidenceScore";
import { resolveSkillProofRow } from "@/app/lib/jdSkillProofStatus";
import { parseAnthropicErrorType } from "@/app/lib/anthropicModels";
import { inferRiskAreasHeuristic } from "@/app/lib/resumeEvidenceScore";

const API_URL = "https://api.anthropic.com/v1/messages";

/** Bump when prompt/calibration changes — forces refresh of cached fix recommendations. */
export const RISK_AREAS_VERSION = 1;

export const RISK_AREAS_MIN = 3;
export const RISK_AREAS_MAX = 5;

const SYSTEM_PROMPT = `You recommend resume fixes to improve shortlist odds for a specific job posting.

Return ONLY valid JSON. No markdown, no explanation outside JSON.

Output format:
{
  "recommended_fixes": [
    "Surface AWS in a project bullet with a shipped outcome if you used it — skills-list only reads weak for this JD",
    "Add one quantified result to your top GenAI bullet (latency, accuracy, adoption, or revenue impact you can defend)"
  ]
}

Rules:
- Return ${RISK_AREAS_MIN} to ${RISK_AREAS_MAX} items, ordered by impact on shortlist odds for THIS role.
- Each item is one actionable resume edit the candidate can make before applying.
- Write as imperative coaching: what to change in the resume and why it helps for THIS JD.
- Base fixes only on gaps between the resume and job description — never invent skills, tools, or experience.
- Prefer: move skills into bullets, add metrics to existing work, surface indirect proof, align summary/title, strengthen thin topic proof.
- Do NOT repeat generic ATS advice ("improve formatting", "use keywords").
- Do NOT duplicate top rejection risks verbatim — fixes should tell them what TO DO, not only what is missing.
- Max 140 characters per item.
- Forbidden: inventing credentials, claiming experience they do not have, vague "improve your resume".`;

function extractJson(raw: string): string {
  const mdMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  const str = mdMatch ? mdMatch[1].trim() : raw;
  const start = str.indexOf("{");
  const end = str.lastIndexOf("}") + 1;
  if (start === -1 || end <= start) return raw;
  return str.slice(start, end);
}

function normalizeFixItem(raw: string): string | null {
  let item = String(raw ?? "")
    .replace(/^\s*\d+[.)]\s*/, "")
    .replace(/^[-•*]\s*/, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!item || item.length < 12) return null;
  if (item.length > 140) item = `${item.slice(0, 137).trim()}…`;
  if (/^(required|preferred|qualifications?|responsibilities?)\b/i.test(item)) return null;
  return item;
}

export function parseRecommendedFixes(payload: unknown): string[] {
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

  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of raw) {
    const clean = normalizeFixItem(String(item ?? ""));
    if (!clean) continue;
    const key = clean.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(clean);
    if (out.length >= RISK_AREAS_MAX) break;
  }
  return out;
}

function buildUserContent(args: {
  dashboard: EvidenceDashboard;
  resumeText: string;
  jobDescription: string;
  targetRoleTitle?: string;
  missingSkills: string[];
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
      return `- ${row.skill}: ${proofStatus}${why ? ` — ${why}` : ""}`;
    })
    .join("\n");

  const rejectionRisks = (args.dashboard.mostMissingEvidence ?? [])
    .slice(0, 5)
    .map((r) => `- ${r}`)
    .join("\n");

  return `TARGET ROLE: ${args.targetRoleTitle?.trim() || "(from job description)"}

EVIDENCE MATCH: ${args.dashboard.evidenceMatch}%
- JD skills in bullets: ${args.dashboard.snapshot.jdSkillProof}%
- Impact coverage: ${args.dashboard.snapshot.impactCoverage}%
- Seniority alignment: ${args.dashboard.seniority.score}%

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
}): Promise<string[]> {
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
        max_tokens: 500,
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
    return inferRiskAreasHeuristic(args.dashboard);
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
    const items = parseRecommendedFixes(parsed);
    if (items.length >= RISK_AREAS_MIN) return items;

    const fallback = inferRiskAreasHeuristic(args.dashboard);
    for (const item of fallback) {
      if (items.length >= RISK_AREAS_MAX) break;
      if (!items.some((x) => x.toLowerCase() === item.toLowerCase())) items.push(item);
    }
    return items.slice(0, RISK_AREAS_MAX);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[risk-areas] Failed to parse LLM JSON", msg);
    return inferRiskAreasHeuristic(args.dashboard);
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
    args.dashboard.riskAreasVersion === RISK_AREAS_VERSION
  ) {
    return args.dashboard;
  }

  const riskAreas = await fetchRecommendedFixesLlm(args);

  return {
    ...args.dashboard,
    riskAreas,
    riskAreasVersion: RISK_AREAS_VERSION,
  };
}
