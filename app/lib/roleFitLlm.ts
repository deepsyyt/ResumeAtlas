import type { EvidenceDashboard } from "@/app/lib/resumeEvidenceScore";
import { recommendedFixActionLabel, resolveDashboardRecommendedFixes } from "@/app/lib/recommendedFixes";
import { parseAnthropicErrorType } from "@/app/lib/anthropicModels";
import {
  PARALLEL_ROLE_COUNT,
  ROLE_FIT_ARCHETYPES,
  normalizeTargetRoleTitle,
  parseRoleFitVerdict,
  resolveTargetRoleTitle,
  sanitizeParallelRoleTitle,
  roleTitleLooksArchitectOrStaff,
  roleTitleLooksHandsOnIc,
  roleTitleLooksLeadership,
  verdictLabelFor,
  type RoleFitRow,
  type RoleFitVerdict,
} from "@/app/lib/roleFitArchetypes";

const API_URL = "https://api.anthropic.com/v1/messages";

/** Bump when prompt/calibration changes — forces refresh of cached role_fit. */
export const ROLE_FIT_VERSION = 4;

function buildRoleFitSystemPrompt(targetRoleTitle: string): string {
  return `You assess career-level resume fit for parallel job titles related to a target role posting.

Return ONLY valid JSON. No markdown, no explanation outside JSON.

TARGET ROLE (from user or job description):
${targetRoleTitle}

Step 1 — parallel_roles:
- Output exactly ${PARALLEL_ROLE_COUNT} distinct job titles in the same domain as the target role.
- Include the target role title (core title only, no suffixes) as one of the seven.
- Span seniority and scope: e.g. one level up (director/head), peer titles, one level down, adjacent specializations.
- Titles must be realistic hiring titles — not JD section headers, not skill lists, not requirements blocks.

TITLE FORMAT (strict — violations invalidate the response):
- Each entry is ONLY a job title (typically 2–6 words).
- NEVER copy JD section headers or labels. Forbidden examples: "Required Qualifications", "Preferred Qualifications", "Responsibilities", "About the Role", "Job Description", "Skills", "Requirements".
- NEVER append industry, company, domain, team, or location after a comma or dash.
  BAD: "Technical Program Manager, Semiconductor Equipment"
  BAD: "Engineering Program Manager, Fab Automation"
  GOOD: "Technical Program Manager"
  GOOD: "Engineering Program Manager"
- Do NOT quote non-title lines from the JD. Invent adjacent titles a recruiter would list on a job board.

Step 2 — role_fit:
- For each title in parallel_roles (same order), assign exactly one verdict using resume + JD evidence.

CRITICAL — differentiate across roles:
- These titles are NOT equally likely. You MUST use at least 3 different verdict levels unless the resume is a rare perfect match for every title.
- Do NOT give "High chance of clearing" to every role. That is invalid.

Verdict options (use exact strings):
- "High chance of clearing" — clear, current-level proof for this specific title.
- "Good" — credible but not slam-dunk; minor scope or proof gaps.
- "Moderate" — partial fit; would need resume retargeting for this title.
- "Needs more implementation depth" — strategy/leadership reads stronger than hands-on build, ship, and implementation proof.

Per-role guidance:
- Leadership titles (Head, Director, Manager, VP): weight people leadership, program scope, stakeholder outcomes.
- Architect / Staff / Principal titles: weight system design, platform depth, production deployment proof.
- Hands-on IC titles (Engineer, Developer, Scientist without "Head/Director"): DOWNGRADE when bullets emphasize management/strategy over implementation.

Use EVIDENCE SIGNALS (percent = share of roles/bullets showing that proof):
- If leadership % is much higher than shipped/live-work %, hands-on IC titles should NOT be "High chance of clearing".
- If architecture % is low, architect/staff/principal titles should not be top tier.
- If results-in-roles % is low, downgrade IC-heavy titles.

Output format:
{
  "parallel_roles": ["Title 1", "Title 2", "..."],
  "role_fit": [
    { "role": "Title 1", "verdict": "Good" },
    { "role": "Title 2", "verdict": "Needs more implementation depth" }
  ]
}

parallel_roles and role_fit must each have exactly ${PARALLEL_ROLE_COUNT} entries with matching role strings.`;
}

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

function leadershipTier(s: EvidenceDashboard["snapshot"]): RoleFitVerdict {
  if (s.seniorityAlignment >= 55 && s.leadershipSignal >= 40 && s.jdSkillProof >= 65) return "strong";
  if (s.seniorityAlignment >= 45 && s.jdSkillProof >= 50) return "good";
  return "moderate";
}

function architectTier(s: EvidenceDashboard["snapshot"]): RoleFitVerdict {
  if (s.architectureSignal >= 55 && s.deploymentSignal >= 45 && s.jdSkillProof >= 65) return "strong";
  if (s.architectureSignal >= 40 || s.jdSkillProof >= 60) return "good";
  return "moderate";
}

function principalTier(s: EvidenceDashboard["snapshot"]): RoleFitVerdict {
  if (s.architectureSignal >= 60 && s.seniorityAlignment >= 60 && s.leadershipSignal < 70) return "strong";
  if (s.architectureSignal >= 45 || s.jdSkillProof >= 65) return "good";
  return "moderate";
}

function seniorStaffTier(s: EvidenceDashboard["snapshot"]): RoleFitVerdict {
  if (s.deploymentSignal >= 65 && s.architectureSignal >= 55 && s.jdSkillProof >= 70) return "good";
  return "moderate";
}

function handsOnTier(s: EvidenceDashboard["snapshot"]): RoleFitVerdict {
  if (s.deploymentSignal >= 65 && s.architectureSignal >= 50 && s.leadershipSignal <= s.deploymentSignal) {
    return "good";
  }
  if (s.leadershipSignal >= s.deploymentSignal + 10 || s.deploymentSignal < 50 || s.architectureSignal < 40) {
    return "needs_depth";
  }
  return "moderate";
}

function verdictForRoleTitle(role: string, dashboard: EvidenceDashboard): RoleFitVerdict {
  const s = dashboard.snapshot;
  if (roleTitleLooksLeadership(role)) return leadershipTier(s);
  if (roleTitleLooksArchitectOrStaff(role)) {
    if (/\bprincipal\b/i.test(role)) return principalTier(s);
    if (/\bstaff\b/i.test(role)) return seniorStaffTier(s);
    return architectTier(s);
  }
  if (roleTitleLooksHandsOnIc(role)) return handsOnTier(s);
  return leadershipTier(s);
}

/** Heuristic parallel titles when the model call fails. */
export function inferParallelRolesFromTargetTitle(targetRoleTitle: string): string[] {
  const target = normalizeTargetRoleTitle(targetRoleTitle) || "Target role";
  const lower = target.toLowerCase();

  if (/\b(program|project|tpm|scrum|agile)\b/i.test(lower)) {
    return [
      "Director of Program Management",
      "Senior Technical Program Manager",
      target,
      "Engineering Program Manager",
      "Program Director",
      "Project Manager",
      "Scrum Master",
    ];
  }

  if (/\b(ai|genai|llm|ml|machine learning|data sci)\b/i.test(lower)) {
    return [
      `Head of ${/\bgenai\b/i.test(lower) ? "GenAI" : "AI"}`,
      `Director of ${/\bgenai\b/i.test(lower) ? "GenAI" : "AI Engineering"}`,
      target,
      "Applied AI Engineering Leader",
      "GenAI Platform Architect",
      "Principal AI Engineer",
      "Hands-on LLM Engineer",
    ];
  }

  if (/\b(software|backend|frontend|full.?stack|platform|devops|sre)\b/i.test(lower)) {
    return [
      "Engineering Manager",
      "Director of Engineering",
      target,
      "Staff Software Engineer",
      "Principal Software Engineer",
      "Platform Architect",
      "Senior Software Engineer",
    ];
  }

  if (/\b(product|pm\b)\b/i.test(lower)) {
    return [
      "VP of Product",
      "Director of Product",
      target,
      "Group Product Manager",
      "Principal Product Manager",
      "Senior Product Manager",
      "Associate Product Manager",
    ];
  }

  if (/\b(data engineer|analytics|bi\b)\b/i.test(lower)) {
    return [
      "Head of Data Engineering",
      "Director of Data Platform",
      target,
      "Staff Data Engineer",
      "Data Platform Architect",
      "Principal Data Engineer",
      "Analytics Engineer",
    ];
  }

  return [...ROLE_FIT_ARCHETYPES];
}

/** Evidence-grounded fallback when the model returns identical top verdicts for every role. */
export function inferTieredRoleFitFromEvidence(
  dashboard: EvidenceDashboard,
  parallelRoles: string[]
): RoleFitRow[] {
  const roles =
    parallelRoles.length >= PARALLEL_ROLE_COUNT
      ? parallelRoles.slice(0, PARALLEL_ROLE_COUNT)
      : inferParallelRolesFromTargetTitle(dashboard.targetRoleTitle ?? "Target role");

  return roles.map((role) => rowFor(role, verdictForRoleTitle(role, dashboard)));
}

/** Enforce differentiation using measured evidence signals. */
export function calibrateRoleFitRows(
  rows: RoleFitRow[],
  dashboard: EvidenceDashboard
): RoleFitRow[] {
  const s = dashboard.snapshot;
  const uniqueVerdicts = new Set(rows.map((r) => r.verdict));

  if (rows.length > 0 && uniqueVerdicts.size === 1 && uniqueVerdicts.has("strong")) {
    return inferTieredRoleFitFromEvidence(
      dashboard,
      rows.map((r) => r.role)
    );
  }

  return rows.map((row) => {
    let verdict = row.verdict;

    if (roleTitleLooksHandsOnIc(row.role)) {
      const leadershipHeavy =
        s.leadershipSignal >= 45 && s.deploymentSignal < s.leadershipSignal - 5;
      const thinImplementation = s.deploymentSignal < 55 || s.architectureSignal < 40;
      if ((leadershipHeavy || thinImplementation) && (verdict === "strong" || verdict === "good")) {
        verdict = "needs_depth";
      }
    }

    if (/\bstaff\b/i.test(row.role) && verdict === "strong") {
      if (s.deploymentSignal < 60 || s.architectureSignal < 50) {
        verdict = "moderate";
      }
    }

    if (/\bprincipal\b/i.test(row.role) && verdict === "strong") {
      if (s.architectureSignal < 55 || s.seniorityAlignment < 55) {
        verdict = "good";
      }
    }

    if (
      roleTitleLooksArchitectOrStaff(row.role) &&
      verdict === "strong" &&
      s.architectureSignal < 45
    ) {
      verdict = "good";
    }

    if (roleTitleLooksLeadership(row.role) && verdict === "strong") {
      if (s.seniorityAlignment < 45 && s.leadershipSignal < 35) {
        verdict = "good";
      }
    }

    if (verdict === row.verdict) return row;
    return rowFor(row.role, verdict);
  });
}

function sanitizeParallelRoleList(rawTitles: string[], targetRoleTitle: string): string[] {
  const fallback = inferParallelRolesFromTargetTitle(targetRoleTitle);
  const seen = new Set<string>();
  const out: string[] = [];

  const push = (candidate: string) => {
    const clean = sanitizeParallelRoleTitle(candidate);
    if (!clean) return;
    const key = clean.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    out.push(clean);
  };

  for (const raw of rawTitles) {
    push(raw);
  }

  const targetClean =
    sanitizeParallelRoleTitle(targetRoleTitle) ?? normalizeTargetRoleTitle(targetRoleTitle);
  if (targetClean) push(targetClean);

  for (const fb of fallback) {
    if (out.length >= PARALLEL_ROLE_COUNT) break;
    push(fb);
  }

  return out.slice(0, PARALLEL_ROLE_COUNT);
}

function parseParallelRoles(payload: unknown, targetRoleTitle: string): string[] {
  const normalizedTarget = normalizeTargetRoleTitle(targetRoleTitle) || "Target role";

  if (!payload || typeof payload !== "object") {
    return sanitizeParallelRoleList([], normalizedTarget);
  }
  const raw = (payload as { parallel_roles?: unknown }).parallel_roles;
  if (!Array.isArray(raw)) {
    return sanitizeParallelRoleList([], normalizedTarget);
  }

  const titles = raw.map((item) => String(item ?? "").trim()).filter(Boolean);
  return sanitizeParallelRoleList(titles, normalizedTarget);
}

function parseRoleFitRows(payload: unknown, parallelRoles: string[]): RoleFitRow[] {
  if (!payload || typeof payload !== "object") return [];
  const rawRows = (payload as { role_fit?: unknown }).role_fit;
  if (!Array.isArray(rawRows)) return [];

  const byRole = new Map<string, RoleFitRow>();
  for (const item of rawRows) {
    if (!item || typeof item !== "object") continue;
    const roleRaw = String((item as { role?: unknown }).role ?? "").trim();
    const role = sanitizeParallelRoleTitle(roleRaw);
    const verdictRaw = String((item as { verdict?: unknown }).verdict ?? "").trim();
    if (!role) continue;
    const verdict = parseRoleFitVerdict(verdictRaw);
    if (!verdict) continue;
    byRole.set(role.toLowerCase(), rowFor(role, verdict));
  }

  return parallelRoles.map((canonical, index) => {
    const found =
      byRole.get(canonical.toLowerCase()) ?? Array.from(byRole.values())[index];
    return found ? { ...found, role: canonical } : rowFor(canonical, "moderate");
  });
}

function buildEvidenceContext(dashboard: EvidenceDashboard): string {
  const s = dashboard.snapshot;
  const sen = dashboard.seniority;
  return `EVIDENCE SIGNALS (from resume analysis — use to differentiate verdicts):
- Measurable outcome coverage: ${s.impactCoverage}% avg across project experiences (${s.bulletsWithMetrics}/${s.totalBullets} bullets with outcomes)
- System & design scope: ${s.architectureSignal}%
- Shipped / live work: ${s.deploymentSignal}%
- Leadership: ${s.leadershipSignal}%
- Leadership scope fit: ${s.seniorityAlignment}% (${sen.roleLevelLabel})
- JD skills in bullets: ${s.jdSkillProof}% (${s.jdSkillsProved}/${s.jdSkillsTotal} skills)
- Evidence match overall: ${dashboard.evidenceMatch}%
${resolveDashboardRecommendedFixes(dashboard.riskAreas).length > 0 ? `- Key gaps: ${resolveDashboardRecommendedFixes(dashboard.riskAreas).slice(0, 3).map((fix) => recommendedFixActionLabel(fix)).join("; ")}` : ""}`;
}

export async function fetchRoleFitVerdictsLlm(args: {
  apiKey: string;
  modelCandidates: string[];
  resumeText: string;
  jobDescription: string;
  targetRoleTitle: string;
  dashboard: EvidenceDashboard;
}): Promise<{ parallelRoles: string[]; roleFit: RoleFitRow[] }> {
  const targetRoleTitle = normalizeTargetRoleTitle(args.targetRoleTitle) || "Target role";

  const userContent = `${buildEvidenceContext(args.dashboard)}

TARGET ROLE TITLE:
${targetRoleTitle}

RESUME:
${args.resumeText}

JOB DESCRIPTION:
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
        max_tokens: 900,
        temperature: 0,
        system: buildRoleFitSystemPrompt(targetRoleTitle),
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
    const parallelRoles = inferParallelRolesFromTargetTitle(targetRoleTitle);
    return {
      parallelRoles,
      roleFit: inferTieredRoleFitFromEvidence(args.dashboard, parallelRoles),
    };
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
    const parallelRoles = parseParallelRoles(parsed, targetRoleTitle);
    const rows = parseRoleFitRows(parsed, parallelRoles);
    return {
      parallelRoles,
      roleFit: calibrateRoleFitRows(rows, args.dashboard),
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[role-fit] Failed to parse LLM JSON", msg);
    const parallelRoles = inferParallelRolesFromTargetTitle(targetRoleTitle);
    return {
      parallelRoles,
      roleFit: inferTieredRoleFitFromEvidence(args.dashboard, parallelRoles),
    };
  }
}

/** Attach LLM role-fit verdicts to an evidence dashboard. */
export async function attachRoleFitToEvidenceDashboard(args: {
  dashboard: EvidenceDashboard;
  apiKey: string;
  modelCandidates: string[];
  resumeText: string;
  jobDescription: string;
  targetRoleTitle?: string;
}): Promise<EvidenceDashboard> {
  const targetRoleTitle = resolveTargetRoleTitle(args.targetRoleTitle, args.jobDescription);

  if (
    Array.isArray(args.dashboard.roleFit) &&
    args.dashboard.roleFit.length > 0 &&
    args.dashboard.roleFitVersion === ROLE_FIT_VERSION &&
    normalizeTargetRoleTitle(args.dashboard.targetRoleTitle) === targetRoleTitle
  ) {
    return args.dashboard;
  }

  const dashboardWithTarget = { ...args.dashboard, targetRoleTitle };
  const { parallelRoles, roleFit } = await fetchRoleFitVerdictsLlm({
    apiKey: args.apiKey,
    modelCandidates: args.modelCandidates,
    resumeText: args.resumeText,
    jobDescription: args.jobDescription,
    targetRoleTitle,
    dashboard: dashboardWithTarget,
  });

  return {
    ...dashboardWithTarget,
    roleFit,
    roleFitTargetRoles: parallelRoles,
    roleFitVersion: ROLE_FIT_VERSION,
  };
}
