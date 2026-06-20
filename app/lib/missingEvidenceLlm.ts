import type { EvidenceDashboard } from "@/app/lib/resumeEvidenceScore";
import { resolveSkillProofRow } from "@/app/lib/jdSkillProofStatus";
import { parseAnthropicErrorType } from "@/app/lib/anthropicModels";

const API_URL = "https://api.anthropic.com/v1/messages";

/** Bump when prompt/calibration changes — forces refresh of cached rejection-risk lists. */
export const MISSING_EVIDENCE_VERSION = 3;

export const TOP_REJECTION_RISKS_LIMIT = 5;
export const TOP_REJECTION_RISKS_MIN = 3;

const SYSTEM_PROMPT = `You identify top rejection risks for a resume versus a job description — reasons a recruiter or ATS may pass on this candidate for THIS posting.

Return ONLY valid JSON. No markdown, no explanation outside JSON.

Output format:
{
  "top_rejection_risks": [
    "No FP&A experience",
    "No forecasting/budgeting evidence",
    "No finance analytics platform exposure"
  ]
}

Rules:
- Return ${TOP_REJECTION_RISKS_MIN} to ${TOP_REJECTION_RISKS_LIMIT} items, ordered by rejection severity for THIS posting (highest risk first).
- Each item MUST start with "No " and read like a screening rejection reason (short phrase, not a full sentence).
- Good endings: "experience", "evidence", "exposure", "proof in bullets", "platform experience", "ownership shown".
- Only include gaps the JD expects that the resume does NOT prove in work or project bullets.
- Do NOT list skills or topics already proven in bullets.
- Do NOT invent requirements absent from the JD.
- Prefer domain-specific capabilities, tools, methods, and deliverable types over vague soft skills.
- Forbidden: generic advice ("improve formatting", "add more metrics"), bare tool names without "No", JD section headers.`;

function extractJson(raw: string): string {
  const mdMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  const str = mdMatch ? mdMatch[1].trim() : raw;
  const start = str.indexOf("{");
  const end = str.lastIndexOf("}") + 1;
  if (start === -1 || end <= start) return raw;
  return str.slice(start, end);
}

function normalizeRejectionRiskItem(raw: string): string | null {
  let item = String(raw ?? "")
    .replace(/^\s*\d+[.)]\s*/, "")
    .replace(/^[-•*]\s*/, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!item || item.length < 6) return null;
  if (item.length > 88) return null;
  if (/^(required|preferred|qualifications?|responsibilities?|skills?|summary|overview)\b/i.test(item)) {
    return null;
  }

  if (!/^no\b/i.test(item)) {
    const lower = item.charAt(0).toLowerCase() + item.slice(1);
    if (/\b(experience|evidence|exposure|proof)\b/i.test(lower)) {
      item = `No ${lower}`;
    } else {
      item = `No ${lower} evidence`;
    }
  }

  if (!/^No /.test(item)) {
    item = `No ${item.replace(/^no\s+/i, "").trim()}`;
  }

  return item;
}

function rawRiskItemsFromPayload(payload: unknown): unknown[] {
  if (!payload || typeof payload !== "object") return [];
  const obj = payload as {
    top_rejection_risks?: unknown;
    most_missing_evidence?: unknown;
  };
  if (Array.isArray(obj.top_rejection_risks)) return obj.top_rejection_risks;
  if (Array.isArray(obj.most_missing_evidence)) return obj.most_missing_evidence;
  return [];
}

export function parseTopRejectionRisks(payload: unknown): string[] {
  const raw = rawRiskItemsFromPayload(payload);
  const seen = new Set<string>();
  const out: string[] = [];

  for (const item of raw) {
    const clean = normalizeRejectionRiskItem(String(item ?? ""));
    if (!clean) continue;
    const key = clean.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(clean);
    if (out.length >= TOP_REJECTION_RISKS_LIMIT) break;
  }
  return out;
}

function buildUserContent(args: {
  dashboard: EvidenceDashboard;
  resumeText: string;
  jobDescription: string;
  missingSkills: string[];
}): string {
  const s = args.dashboard.snapshot;
  const gapSkills = args.dashboard.skillProof
    .filter((row) => resolveSkillProofRow(row).proofStatus !== "proven")
    .slice(0, 12)
    .map((row) => {
      const { proofStatus, optimizeAction } = resolveSkillProofRow(row);
      return `- ${row.skill}: ${proofStatus} → ${optimizeAction}${row.evidenceLocation !== "none" ? ` (${row.evidenceLocation})` : ""}`;
    })
    .join("\n");

  return `EVIDENCE MATCH: ${args.dashboard.evidenceMatch}%
- JD skills in bullets: ${s.jdSkillProof}% (${s.jdSkillsProved}/${s.jdSkillsTotal})
- Shipped / live work signal: ${s.deploymentSignal}%
- System & design scope: ${s.architectureSignal}%
- Measurable outcome coverage: ${s.impactCoverage}%

SKILL GAPS FROM ANALYSIS (may include skills-list-only):
${gapSkills || "(none flagged)"}

MISSING JD KEYWORDS (reference only):
${args.missingSkills.slice(0, 12).join(", ") || "(none)"}

RESUME:
${args.resumeText}

JOB DESCRIPTION:
${args.jobDescription}`;
}

export async function fetchTopRejectionRisksLlm(args: {
  apiKey: string;
  modelCandidates: string[];
  resumeText: string;
  jobDescription: string;
  dashboard: EvidenceDashboard;
  missingSkills: string[];
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
        max_tokens: 400,
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
      "[rejection-risks] Anthropic error",
      response.status,
      `model=${candidateModel}`,
      responseText.slice(0, 300)
    );
    if (!isModelUnavailable) break;
  }

  if (!response?.ok) {
    console.error("[rejection-risks] LLM call failed; returning no rejection risks");
    return [];
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
    return parseTopRejectionRisks(parsed);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[rejection-risks] Failed to parse LLM JSON", msg);
    return [];
  }
}

/** Stored on evidence dashboard as mostMissingEvidence for backward compatibility. */
export async function attachMissingEvidenceToEvidenceDashboard(args: {
  dashboard: EvidenceDashboard;
  apiKey: string;
  modelCandidates: string[];
  resumeText: string;
  jobDescription: string;
  missingSkills: string[];
}): Promise<EvidenceDashboard> {
  if (
    Array.isArray(args.dashboard.mostMissingEvidence) &&
    args.dashboard.mostMissingEvidence.length > 0 &&
    args.dashboard.missingEvidenceVersion === MISSING_EVIDENCE_VERSION
  ) {
    return args.dashboard;
  }

  const mostMissingEvidence = await fetchTopRejectionRisksLlm(args);

  return {
    ...args.dashboard,
    mostMissingEvidence,
    missingEvidenceVersion: MISSING_EVIDENCE_VERSION,
  };
}
