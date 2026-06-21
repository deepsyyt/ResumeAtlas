import type { EvidenceStrength, JdSkillEvidenceRow } from "@/app/lib/resumeEvidenceScore";

export type JdSkillProofStatus = "proven" | "implied" | "weak" | "missing";

export type SkillOptimizeAction = "strengthen" | "surface" | "add_evidence" | "do_not_invent";

export type SkillOptimizePlan = {
  strengthen: string[];
  surface: string[];
  addEvidence: string[];
  doNotInvent: string[];
  /** Skills eligible for bullet rewrites — excludes do_not_invent. */
  optimizableSkills: string[];
  actionBySkill: Record<string, SkillOptimizeAction>;
};

export const JD_SKILL_STATUS_COPY: Record<
  JdSkillProofStatus,
  { meaning: string; action: string; actionKey: SkillOptimizeAction }
> = {
  proven: {
    meaning: "Found in bullets",
    action: "Strengthen",
    actionKey: "strengthen",
  },
  implied: {
    meaning: "Evidence exists indirectly",
    action: "Surface",
    actionKey: "surface",
  },
  weak: {
    meaning: "Mentioned but not proven",
    action: "Add evidence",
    actionKey: "add_evidence",
  },
  missing: {
    meaning: "Not in resume",
    action: "Skip",
    actionKey: "do_not_invent",
  },
};

const STATUS_DISPLAY_ORDER: Record<JdSkillProofStatus, number> = {
  weak: 0,
  implied: 1,
  proven: 2,
  missing: 3,
};

/** Map legacy strength scores when cached dashboards lack proofStatus. */
export function proofStatusFromStrength(strength: EvidenceStrength): JdSkillProofStatus {
  switch (strength) {
    case "strong":
      return "proven";
    case "medium":
    case "weak":
      return "weak";
    case "gap":
      return "missing";
  }
}

export function optimizeActionFromProofStatus(
  status: JdSkillProofStatus
): SkillOptimizeAction {
  return JD_SKILL_STATUS_COPY[status].actionKey;
}

/** Resolve display fields — handles analyze cache rows missing proofStatus. */
export function resolveSkillProofRow(row: JdSkillEvidenceRow): {
  proofStatus: JdSkillProofStatus;
  optimizeAction: SkillOptimizeAction;
} {
  const proofStatus = row.proofStatus ?? proofStatusFromStrength(row.strength);
  const optimizeAction =
    row.optimizeAction ?? optimizeActionFromProofStatus(proofStatus);
  return { proofStatus, optimizeAction };
}

export function skillProofStatusLabel(status: JdSkillProofStatus): string {
  switch (status) {
    case "proven":
      return "Proven";
    case "implied":
      return "Implied";
    case "weak":
      return "Weak";
    case "missing":
      return "Missing";
  }
}

/** Compact live dashboard table — Partial / Not found user-facing labels. */
export function skillProofTableStatusLabel(status: JdSkillProofStatus): string {
  switch (status) {
    case "proven":
      return "Proven";
    case "implied":
      return "Partial";
    case "weak":
      return "Weak";
    case "missing":
      return "Not found";
  }
}

export function countSkillProofMatchedMissed(rows: JdSkillEvidenceRow[]): {
  matched: number;
  missed: number;
} {
  let matched = 0;
  let missed = 0;
  for (const row of rows) {
    if (resolveSkillProofRow(row).proofStatus === "missing") missed += 1;
    else matched += 1;
  }
  return { matched, missed };
}

export function countSkillProofStatusBreakdown(rows: JdSkillEvidenceRow[]): {
  proven: number;
  weak: number;
  missing: number;
} {
  let proven = 0;
  let weak = 0;
  let missing = 0;
  for (const row of rows) {
    const status = resolveSkillProofRow(row).proofStatus;
    if (status === "proven") proven += 1;
    else if (status === "missing") missing += 1;
    else weak += 1;
  }
  return { proven, weak, missing };
}

export function skillOptimizeActionPrompt(action: SkillOptimizeAction): string {
  switch (action) {
    case "strengthen":
      return "Strengthen — tighten existing bullet proof (metrics, scope, outcomes). Do not invent new work.";
    case "surface":
      return "Demonstrate — weave this skill into the work you performed (action + artifact + outcome using this skill). Do not bare-mention or skills-list it; show it as part of experience.";
    case "add_evidence":
      return "Demonstrate — prove this skill in this bullet as work performed (what you built, shipped, or measured using it). Move from list/summary mention into experience evidence.";
    case "do_not_invent":
      return "Do not invent — leave this skill out of bullets if unsupported.";
  }
}

export function buildSkillOptimizePlan(rows: JdSkillEvidenceRow[]): SkillOptimizePlan {
  const strengthen: string[] = [];
  const surface: string[] = [];
  const addEvidence: string[] = [];
  const doNotInvent: string[] = [];
  const actionBySkill: Record<string, SkillOptimizeAction> = {};

  for (const row of rows) {
    const key = row.skill.toLowerCase().trim();
    actionBySkill[key] = row.optimizeAction;
    switch (row.optimizeAction) {
      case "strengthen":
        strengthen.push(row.skill);
        break;
      case "surface":
        surface.push(row.skill);
        break;
      case "add_evidence":
        addEvidence.push(row.skill);
        break;
      case "do_not_invent":
        doNotInvent.push(row.skill);
        break;
    }
  }

  return {
    strengthen,
    surface,
    addEvidence,
    doNotInvent,
    optimizableSkills: [...strengthen, ...surface, ...addEvidence],
    actionBySkill,
  };
}

export function formatSkillActionBlock(rows: JdSkillEvidenceRow[]): string {
  const lines = rows
    .filter((row) => row.optimizeAction !== "do_not_invent")
    .map((row) => `- ${row.skill}: ${skillOptimizeActionPrompt(row.optimizeAction)}`);
  return lines.length > 0 ? lines.join("\n") : "(none — all JD gaps left honest)";
}

export function selectSkillProofForDisplay(
  rows: JdSkillEvidenceRow[],
  limit: number
): JdSkillEvidenceRow[] {
  if (rows.length <= limit) {
    return [...rows].sort(compareSkillProofRows);
  }

  const pickBalanced = (pool: JdSkillEvidenceRow[], max: number): JdSkillEvidenceRow[] => {
    const groups: JdSkillProofStatus[] = ["weak", "implied", "proven", "missing"];
    const out: JdSkillEvidenceRow[] = [];
    for (const status of groups) {
      for (const row of pool.filter((r) => resolveSkillProofRow(r).proofStatus === status)) {
        if (out.length >= max) return out;
        out.push(row);
      }
    }
    return out;
  };

  const required = rows.filter((r) => r.jdRequired);
  const optional = rows.filter((r) => !r.jdRequired);
  const requiredPick = pickBalanced(required, limit);
  if (requiredPick.length >= limit) return requiredPick.sort(compareSkillProofRows);
  const optionalPick = pickBalanced(optional, limit - requiredPick.length);
  return [...requiredPick, ...optionalPick].sort(compareSkillProofRows);
}

/** Live keyword table: matched rows first, then missed; stable within each group. */
export function sortSkillProofMatchedFirst(rows: JdSkillEvidenceRow[]): JdSkillEvidenceRow[] {
  return [...rows].sort((a, b) => {
    const aMissing = resolveSkillProofRow(a).proofStatus === "missing";
    const bMissing = resolveSkillProofRow(b).proofStatus === "missing";
    if (aMissing !== bMissing) return aMissing ? 1 : -1;
    return compareSkillProofRows(a, b);
  });
}

export function compareSkillProofRows(a: JdSkillEvidenceRow, b: JdSkillEvidenceRow): number {
  if (a.jdRequired !== b.jdRequired) return a.jdRequired ? -1 : 1;
  const statusA = resolveSkillProofRow(a).proofStatus;
  const statusB = resolveSkillProofRow(b).proofStatus;
  const byStatus = STATUS_DISPLAY_ORDER[statusA] - STATUS_DISPLAY_ORDER[statusB];
  if (byStatus !== 0) return byStatus;
  return a.skill.localeCompare(b.skill);
}

export function statusChipClass(status: JdSkillProofStatus): string {
  switch (status) {
    case "proven":
      return "bg-emerald-50 text-emerald-800 ring-emerald-200";
    case "implied":
      return "bg-violet-50 text-violet-900 ring-violet-200";
    case "weak":
      return "bg-amber-50 text-amber-950 ring-amber-200";
    case "missing":
      return "bg-slate-100 text-slate-700 ring-slate-200";
  }
}

export function actionChipClass(action: SkillOptimizeAction): string {
  switch (action) {
    case "strengthen":
      return "bg-emerald-600 text-white";
    case "surface":
      return "bg-violet-600 text-white";
    case "add_evidence":
      return "bg-amber-600 text-white";
    case "do_not_invent":
      return "bg-slate-500 text-white";
  }
}

export function isSkillSelectableForOptimize(status: JdSkillProofStatus): boolean {
  return status !== "missing";
}

/** Checkbox default — unchecked; user opts in per skill. */
export function defaultSkillSelectedForOptimize(_status: JdSkillProofStatus): boolean {
  return false;
}

export function filterSkillProofRowsBySelection(
  rows: JdSkillEvidenceRow[],
  selectedSkills: string[] | null | undefined
): JdSkillEvidenceRow[] {
  if (!selectedSkills || selectedSkills.length === 0) return rows;
  const selected = new Set(selectedSkills.map((s) => s.toLowerCase().trim()));
  return rows.filter((row) => selected.has(row.skill.toLowerCase().trim()));
}

/** Skills in the keyword-coverage "weak" bucket — mentioned but not proven (includes implied). */
export function resolveWeakUnprovenSkillsForOptimize(
  rows: JdSkillEvidenceRow[]
): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const row of rows) {
    const { proofStatus } = resolveSkillProofRow(row);
    if (proofStatus !== "weak" && proofStatus !== "implied") continue;
    const key = row.skill.toLowerCase().trim();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(row.skill.trim());
  }
  return out;
}
