import type { EvidenceDashboard } from "@/app/lib/resumeEvidenceScore";
import { resolveSkillProofRow } from "@/app/lib/jdSkillProofStatus";
import { parseAnthropicErrorType } from "@/app/lib/anthropicModels";
import type { ApplicationVerdictTier } from "@/app/lib/applicationVerdict";

const API_URL = "https://api.anthropic.com/v1/messages";

/** Bump when prompt/calibration changes — forces refresh of cached apply verdict. */
export const APPLICATION_VERDICT_VERSION = 2;

export type ApplicationVerdictRecommendation = "apply" | "optimize_first" | "skip";

export type ApplicationVerdictLlm = {
  recommendation: ApplicationVerdictRecommendation;
  headline: string;
  shortlistPct?: number;
};

const SYSTEM_PROMPT = `You decide whether a candidate should apply to a specific job posting now, optimize the resume first, or skip applying.

Return ONLY valid JSON. No markdown, no explanation outside JSON.

Output format:
{
  "recommendation": "apply",
  "headline": "Yes, apply — your GenAI delivery proof matches this senior IC role.",
  "shortlist_pct": 68
}

recommendation must be exactly one of:
- "apply" — competitive for this posting; reasonable to submit now
- "optimize_first" — viable fit but thin proof on key JD themes; polish resume before applying
- "skip" — major misalignment or missing must-have proof; not recommended to apply yet

Rules:
- headline: one short sentence (max 140 chars) — clear apply / optimize-first / skip guidance for THIS role; include the main gaps or strengths recruiters care about
- Do NOT add a second sentence or separate reason field — the dashboard summary already covers detail
- shortlist_pct: integer 0-100 — honest estimated shortlist odds if they apply today
- Base the call on resume bullet proof vs this JD — never invent experience
- Do not recommend apply if multiple required JD themes lack bullet proof
- Forbidden: generic encouragement without JD-specific evidence`;

function extractJson(raw: string): string {
  const mdMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  const str = mdMatch ? mdMatch[1].trim() : raw;
  const start = str.indexOf("{");
  const end = str.lastIndexOf("}") + 1;
  if (start === -1 || end <= start) return raw;
  return str.slice(start, end);
}

function clampPct(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)));
}

function normalizeRecommendation(raw: string): ApplicationVerdictRecommendation | null {
  const s = String(raw ?? "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_");
  if (s === "apply") return "apply";
  if (s === "optimize_first" || s === "optimize" || s === "polish_first") return "optimize_first";
  if (s === "skip" || s === "do_not_apply" || s === "pass") return "skip";
  return null;
}

function normalizeText(raw: string, max: number): string {
  return String(raw ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

export function parseApplicationVerdictLlm(payload: unknown): ApplicationVerdictLlm | null {
  if (!payload || typeof payload !== "object") return null;
  const obj = payload as {
    recommendation?: unknown;
    headline?: unknown;
    shortlist_pct?: unknown;
    shortlistPct?: unknown;
  };

  const recommendation = normalizeRecommendation(String(obj.recommendation ?? ""));
  const headline = normalizeText(String(obj.headline ?? ""), 140);
  if (!recommendation || headline.length < 8) return null;

  const pctRaw = obj.shortlist_pct ?? obj.shortlistPct;
  const shortlistPct =
    typeof pctRaw === "number" && Number.isFinite(pctRaw) ? clampPct(pctRaw) : undefined;

  return { recommendation, headline, shortlistPct };
}

export function recommendationToTier(
  recommendation: ApplicationVerdictRecommendation
): ApplicationVerdictTier {
  switch (recommendation) {
    case "apply":
      return "strong";
    case "optimize_first":
      return "cautious";
    case "skip":
      return "poor";
  }
}

export function recommendationBadgeLabel(
  recommendation: ApplicationVerdictRecommendation
): string {
  switch (recommendation) {
    case "apply":
      return "Apply now";
    case "optimize_first":
      return "Optimize first";
    case "skip":
      return "Skip for now";
  }
}

function buildUserContent(args: {
  dashboard: EvidenceDashboard;
  resumeText: string;
  jobDescription: string;
  targetRoleTitle?: string;
  missingSkills: string[];
}): string {
  const skillRows = args.dashboard.skillProofAll ?? args.dashboard.skillProof;
  const proved = skillRows
    .filter((row) => resolveSkillProofRow(row).proofStatus === "proven")
    .slice(0, 8)
    .map((row) => row.skill)
    .join(", ");
  const gaps = skillRows
    .filter((row) => {
      const s = resolveSkillProofRow(row).proofStatus;
      return s === "missing" || s === "weak";
    })
    .slice(0, 8)
    .map((row) => row.skill)
    .join(", ");

  return `TARGET ROLE: ${args.targetRoleTitle?.trim() || "(from job description)"}

EVIDENCE MATCH: ${args.dashboard.evidenceMatch}%
JD KEYWORDS IN BULLETS: ${args.dashboard.snapshot.jdSkillProof}%

STRONG KEYWORD PROOF: ${proved || "(none)"}
WEAK / MISSING KEYWORDS: ${gaps || "(none)"}

TOP REJECTION RISKS:
${(args.dashboard.mostMissingEvidence ?? []).slice(0, 5).join("; ") || "(none)"}

RECOMMENDED FIXES:
${(args.dashboard.riskAreas ?? []).slice(0, 4).join("; ") || "(none)"}

MISSING JD KEYWORDS:
${args.missingSkills.slice(0, 10).join(", ") || "(none)"}

RESUME:
${args.resumeText}

JOB DESCRIPTION:
${args.jobDescription}`;
}

export async function fetchApplicationVerdictLlm(args: {
  apiKey: string;
  modelCandidates: string[];
  resumeText: string;
  jobDescription: string;
  dashboard: EvidenceDashboard;
  missingSkills: string[];
  targetRoleTitle?: string;
}): Promise<ApplicationVerdictLlm | null> {
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
        max_tokens: 350,
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
      "[application-verdict] Anthropic error",
      response.status,
      `model=${candidateModel}`,
      responseText.slice(0, 300)
    );
    if (!isModelUnavailable) break;
  }

  if (!response?.ok) {
    console.error("[application-verdict] LLM call failed; using heuristic verdict");
    return null;
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
    return parseApplicationVerdictLlm(parsed);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[application-verdict] Failed to parse LLM JSON", msg);
    return null;
  }
}

export async function attachApplicationVerdictToEvidenceDashboard(args: {
  dashboard: EvidenceDashboard;
  apiKey: string;
  modelCandidates: string[];
  resumeText: string;
  jobDescription: string;
  missingSkills: string[];
  targetRoleTitle?: string;
}): Promise<EvidenceDashboard> {
  if (
    args.dashboard.applicationVerdictLlm &&
    args.dashboard.applicationVerdictVersion === APPLICATION_VERDICT_VERSION
  ) {
    return args.dashboard;
  }

  const applicationVerdictLlm = await fetchApplicationVerdictLlm(args);
  if (!applicationVerdictLlm) return args.dashboard;

  return {
    ...args.dashboard,
    applicationVerdictLlm,
    applicationVerdictVersion: APPLICATION_VERDICT_VERSION,
  };
}
