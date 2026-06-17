import type { EvidenceDashboard } from "@/app/lib/resumeEvidenceScore";
import { parseAnthropicErrorType } from "@/app/lib/anthropicModels";
import {
  ROLE_FIT_ARCHETYPES,
  parseRoleFitVerdict,
  verdictLabelFor,
  type RoleFitRow,
  type RoleFitVerdict,
} from "@/app/lib/roleFitArchetypes";

const API_URL = "https://api.anthropic.com/v1/messages";

/** Bump when prompt/calibration changes — forces refresh of cached role_fit. */
export const ROLE_FIT_VERSION = 2;

const SYSTEM_PROMPT = `You assess career-level resume fit for standard AI role archetypes.

Return ONLY valid JSON. No markdown, no explanation outside JSON.

CRITICAL — differentiate across roles:
- These seven titles are NOT equally likely. A senior leader can be "High chance of clearing" for Head of AI but "Needs more implementation depth" for Hands-on LLM Engineer in the SAME response.
- You MUST use at least 3 different verdict levels unless the resume is a rare perfect match for every archetype (almost never).
- Do NOT give "High chance of clearing" to every role. That is an invalid response.

Verdict options (use exact strings):
- "High chance of clearing" — clear, current-level proof for this specific title.
- "Good" — credible but not slam-dunk; minor scope or proof gaps.
- "Moderate" — partial fit; would need resume retargeting for this title.
- "Needs more implementation depth" — strategy/leadership reads stronger than hands-on build, ship, and implementation proof.

Per-role rubric:
1. Head of AI — org leadership, AI strategy, team/stakeholder scope, senior titles. High bar for people leadership proof.
2. Director of GenAI — GenAI program ownership + leadership + delivery outcomes across teams.
3. Applied AI Engineering Leader — leads applied ML/GenAI engineering; needs both leadership AND shipped AI systems.
4. GenAI Platform Architect — system design, pipelines, RAG/LLM platform architecture, production deployment proof.
5. Principal AI Engineer — deep senior IC: architecture + technical depth; leadership is secondary. Often "Good" not top tier if proof is leadership-heavy.
6. Senior Staff GenAI Engineer — staff-level IC depth across GenAI stack; needs strong hands-on + architecture in multiple roles. Often "Moderate" for director-heavy resumes.
7. Hands-on LLM Engineer — individual contributor building/implementing LLM systems (APIs, evals, fine-tuning, deployment). DOWNGRADE here when bullets emphasize management/strategy over implementation. Use "Needs more implementation depth" when leadership scope outweighs build/deploy proof.

Use EVIDENCE SIGNALS (percent = share of roles/bullets showing that proof):
- If leadership % is much higher than shipped/live-work %, Hands-on LLM Engineer should NOT be "High chance of clearing".
- If architecture % is low, GenAI Platform Architect and Principal should not be top tier.
- If results-in-roles % is low, downgrade IC-heavy titles.

Base verdicts on resume text first; use evidence signals to calibrate and differentiate.

Output format:
{
  "role_fit": [
    { "role": "Head of AI", "verdict": "High chance of clearing" },
    { "role": "Hands-on LLM Engineer", "verdict": "Needs more implementation depth" }
  ]
}

Required roles (all must appear, this order):
${ROLE_FIT_ARCHETYPES.map((r) => `- ${r}`).join("\n")}`;

function extractJson(raw: string): string {
  const mdMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  const str = mdMatch ? mdMatch[1].trim() : raw;
  const start = str.indexOf("{");
  const end = str.lastIndexOf("}") + 1;
  if (start === -1 || end <= start) return raw;
  return str.slice(start, end);
}

function rowFor(role: string, verdict: RoleFitVerdict): RoleFitRow {
  return { role, verdict, verdictLabel: verdictLabelFor(verdict) };
}

/** Evidence-grounded fallback when the model returns identical top verdicts for every role. */
export function inferTieredRoleFitFromEvidence(dashboard: EvidenceDashboard): RoleFitRow[] {
  const s = dashboard.snapshot;
  const senior = s.seniorityAlignment;
  const lead = s.leadershipSignal;
  const deploy = s.deploymentSignal;
  const arch = s.architectureSignal;
  const skills = s.jdSkillProof;

  const leadershipTier = (): RoleFitVerdict => {
    if (senior >= 55 && lead >= 40 && skills >= 65) return "strong";
    if (senior >= 45 && skills >= 50) return "good";
    return "moderate";
  };

  const architectTier = (): RoleFitVerdict => {
    if (arch >= 55 && deploy >= 45 && skills >= 65) return "strong";
    if (arch >= 40 || skills >= 60) return "good";
    return "moderate";
  };

  const principalTier = (): RoleFitVerdict => {
    if (arch >= 60 && senior >= 60 && lead < 70) return "strong";
    if (arch >= 45 || skills >= 65) return "good";
    return "moderate";
  };

  const seniorStaffTier = (): RoleFitVerdict => {
    if (deploy >= 65 && arch >= 55 && skills >= 70) return "good";
    return "moderate";
  };

  const handsOnTier = (): RoleFitVerdict => {
    if (deploy >= 65 && arch >= 50 && lead <= deploy) return "good";
    if (lead >= deploy + 10 || deploy < 50 || arch < 40) return "needs_depth";
    return "moderate";
  };

  return [
    rowFor("Head of AI", leadershipTier()),
    rowFor("Director of GenAI", leadershipTier()),
    rowFor("Applied AI Engineering Leader", leadershipTier()),
    rowFor("GenAI Platform Architect", architectTier()),
    rowFor("Principal AI Engineer", principalTier()),
    rowFor("Senior Staff GenAI Engineer", seniorStaffTier()),
    rowFor("Hands-on LLM Engineer", handsOnTier()),
  ];
}

/** Enforce differentiation using measured evidence signals. */
export function calibrateRoleFitRows(
  rows: RoleFitRow[],
  dashboard: EvidenceDashboard
): RoleFitRow[] {
  const s = dashboard.snapshot;
  const uniqueVerdicts = new Set(rows.map((r) => r.verdict));

  if (rows.length > 0 && uniqueVerdicts.size === 1 && uniqueVerdicts.has("strong")) {
    return inferTieredRoleFitFromEvidence(dashboard);
  }

  return rows.map((row) => {
    let verdict = row.verdict;

    if (row.role === "Hands-on LLM Engineer") {
      const leadershipHeavy =
        s.leadershipSignal >= 45 && s.deploymentSignal < s.leadershipSignal - 5;
      const thinImplementation = s.deploymentSignal < 55 || s.architectureSignal < 40;
      if ((leadershipHeavy || thinImplementation) && (verdict === "strong" || verdict === "good")) {
        verdict = "needs_depth";
      }
    }

    if (row.role === "Senior Staff GenAI Engineer" && verdict === "strong") {
      if (s.deploymentSignal < 60 || s.architectureSignal < 50) {
        verdict = "moderate";
      }
    }

    if (row.role === "Principal AI Engineer" && verdict === "strong") {
      if (s.architectureSignal < 55 || s.seniorityAlignment < 55) {
        verdict = "good";
      }
    }

    if (
      (row.role === "GenAI Platform Architect" || row.role === "Principal AI Engineer") &&
      verdict === "strong" &&
      s.architectureSignal < 45
    ) {
      verdict = "good";
    }

    if (
      (row.role === "Head of AI" ||
        row.role === "Director of GenAI" ||
        row.role === "Applied AI Engineering Leader") &&
      verdict === "strong" &&
      s.seniorityAlignment < 45 &&
      s.leadershipSignal < 35
    ) {
      verdict = "good";
    }

    if (verdict === row.verdict) return row;
    return rowFor(row.role, verdict);
  });
}

function parseRoleFitRows(payload: unknown): RoleFitRow[] {
  if (!payload || typeof payload !== "object") return [];
  const rawRows = (payload as { role_fit?: unknown }).role_fit;
  if (!Array.isArray(rawRows)) return [];

  const byRole = new Map<string, RoleFitRow>();
  for (const item of rawRows) {
    if (!item || typeof item !== "object") continue;
    const role = String((item as { role?: unknown }).role ?? "").trim();
    const verdictRaw = String((item as { verdict?: unknown }).verdict ?? "").trim();
    if (!role) continue;
    const verdict = parseRoleFitVerdict(verdictRaw);
    if (!verdict) continue;
    byRole.set(role.toLowerCase(), rowFor(role, verdict));
  }

  return ROLE_FIT_ARCHETYPES.map((canonical) => {
    const found = byRole.get(canonical.toLowerCase());
    return found ? { ...found, role: canonical } : rowFor(canonical, "moderate");
  });
}

function buildEvidenceContext(dashboard: EvidenceDashboard): string {
  const s = dashboard.snapshot;
  const sen = dashboard.seniority;
  return `EVIDENCE SIGNALS (from resume analysis — use to differentiate verdicts):
- Results in roles: ${s.impactCoverage}% (${s.experiencesWithMetrics}/${s.totalExperiences} roles with measurable outcomes)
- System & design scope: ${s.architectureSignal}%
- Shipped / live work: ${s.deploymentSignal}%
- Leadership: ${s.leadershipSignal}%
- Leadership scope fit: ${s.seniorityAlignment}% (${sen.roleLevelLabel})
- JD skills in bullets: ${s.jdSkillProof}% (${s.jdSkillsProved}/${s.jdSkillsTotal} skills)
- Evidence match overall: ${dashboard.evidenceMatch}%
${dashboard.riskAreas.length > 0 ? `- Key gaps: ${dashboard.riskAreas.slice(0, 3).join("; ")}` : ""}`;
}

export async function fetchRoleFitVerdictsLlm(args: {
  apiKey: string;
  modelCandidates: string[];
  resumeText: string;
  jobDescription: string;
  dashboard: EvidenceDashboard;
}): Promise<RoleFitRow[]> {
  const userContent = `${buildEvidenceContext(args.dashboard)}

RESUME:
${args.resumeText}

JOB DESCRIPTION (context only):
${args.jobDescription}`;

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
      "[role-fit] Anthropic error",
      response.status,
      `model=${candidateModel}`,
      responseText.slice(0, 300)
    );
    if (!isModelUnavailable) break;
  }

  if (!response?.ok) {
    console.error("[role-fit] LLM call failed; using evidence-tiered fallback");
    return inferTieredRoleFitFromEvidence(args.dashboard);
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
    const rows = parseRoleFitRows(parsed);
    return calibrateRoleFitRows(rows, args.dashboard);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[role-fit] Failed to parse LLM JSON", msg);
    return inferTieredRoleFitFromEvidence(args.dashboard);
  }
}

/** Attach LLM role-fit verdicts to an evidence dashboard. */
export async function attachRoleFitToEvidenceDashboard(args: {
  dashboard: EvidenceDashboard;
  apiKey: string;
  modelCandidates: string[];
  resumeText: string;
  jobDescription: string;
}): Promise<EvidenceDashboard> {
  if (
    Array.isArray(args.dashboard.roleFit) &&
    args.dashboard.roleFit.length > 0 &&
    args.dashboard.roleFitVersion === ROLE_FIT_VERSION
  ) {
    return args.dashboard;
  }

  const roleFit = await fetchRoleFitVerdictsLlm({
    apiKey: args.apiKey,
    modelCandidates: args.modelCandidates,
    resumeText: args.resumeText,
    jobDescription: args.jobDescription,
    dashboard: args.dashboard,
  });

  return {
    ...args.dashboard,
    roleFit,
    roleFitVersion: ROLE_FIT_VERSION,
  };
}
