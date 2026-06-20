import type { ApplicationVerdict } from "@/app/lib/applicationVerdict";
import { parseResumeToJSON } from "@/app/lib/resumeParser";
import { rejectionRiskThemeTokens } from "@/app/lib/rejectionRiskOptimize";

export type RecommendedFixSection = "experience" | "summary" | "skills" | "projects";

export type RecommendedFix = {
  /** What to change — short imperative coaching line. */
  action: string;
  /** Company, role, or project name from the resume (validated server-side). */
  target?: string | null;
  /** Where in the resume the edit applies. */
  section?: RecommendedFixSection | null;
  /** Optional extra context for optimize matching (JD rationale). */
  detail?: string | null;
};

const FIX_KEYWORD_STOP = new Set([
  "add",
  "the",
  "your",
  "you",
  "to",
  "in",
  "on",
  "at",
  "for",
  "and",
  "or",
  "with",
  "from",
  "into",
  "that",
  "this",
  "a",
  "an",
  "of",
  "by",
  "as",
  "is",
  "are",
  "was",
  "were",
  "be",
  "have",
  "has",
  "had",
  "not",
  "no",
  "mention",
  "include",
  "show",
  "proof",
  "evidence",
  "experience",
  "project",
  "bullet",
  "bullets",
  "resume",
  "role",
  "job",
  "using",
  "use",
  "more",
  "new",
  "line",
  "lines",
]);

const SECTION_LABELS: Record<RecommendedFixSection, string> = {
  experience: "Work experience",
  summary: "Professional summary",
  skills: "Skills section",
  projects: "Project bullets",
};

function normalizeSection(raw: unknown): RecommendedFixSection | null {
  const s = String(raw ?? "")
    .trim()
    .toLowerCase();
  if (s === "experience" || s === "work" || s === "work_experience") return "experience";
  if (s === "summary" || s === "professional_summary") return "summary";
  if (s === "skills" || s === "skill") return "skills";
  if (s === "projects" || s === "project") return "projects";
  return null;
}

function normalizeActionText(raw: string): string | null {
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

function inferSectionFromLegacyText(text: string): RecommendedFixSection | null {
  const lower = text.toLowerCase();
  if (/\bsummary\b|\btitle\b|\/headline\b/.test(lower)) return "summary";
  if (/\bskills?\s*(list|section)?\b/.test(lower)) return "skills";
  if (/\bproject\b|\bbullet\b/.test(lower)) return "projects";
  if (/\bunder\b|\bat\b|\brole\b|\bexperience\b/.test(lower)) return "experience";
  return "experience";
}

/** Parse legacy plain-string fixes (cached analyze payloads). */
export function legacyStringToRecommendedFix(raw: string): RecommendedFix | null {
  const action = normalizeActionText(raw);
  if (!action) return null;

  let target: string | null = null;
  const underMatch = action.match(/\bunder\s+([^,—–;]+?)(?:\s+showing|\s+with|\s+where|\s+if\b|[—–;,]|$)/i);
  if (underMatch?.[1]) {
    target = underMatch[1].trim();
  } else {
    const atMatch = action.match(/\bat\s+([A-Z][A-Za-z0-9&.'\-\s]{2,40}?)(?:\s+[,—–;]|$)/);
    if (atMatch?.[1]) target = atMatch[1].trim();
  }

  const dashParts = action.split(/\s*[—–]\s*/);
  const detail = dashParts.length > 1 ? dashParts.slice(1).join(" — ").trim() : null;

  return {
    action: dashParts[0]?.trim() ?? action,
    target,
    section: inferSectionFromLegacyText(action),
    detail,
  };
}

export function normalizeRecommendedFix(raw: unknown): RecommendedFix | null {
  if (typeof raw === "string") return legacyStringToRecommendedFix(raw);
  if (!raw || typeof raw !== "object") return null;

  const obj = raw as Record<string, unknown>;
  const actionRaw =
    typeof obj.action === "string"
      ? obj.action
      : typeof obj.fix === "string"
        ? obj.fix
        : typeof obj.text === "string"
          ? obj.text
          : "";

  const action = normalizeActionText(actionRaw);
  if (!action) return null;

  const target =
    typeof obj.target === "string" && obj.target.trim() ? obj.target.trim() : null;
  const section = normalizeSection(obj.section);
  const detail =
    typeof obj.detail === "string" && obj.detail.trim() ? obj.detail.trim() : null;

  return { action, target, section, detail };
}

export function normalizeRecommendedFixes(raw: unknown): RecommendedFix[] {
  if (!Array.isArray(raw)) return [];
  const out: RecommendedFix[] = [];
  for (const item of raw) {
    const fix = normalizeRecommendedFix(item);
    if (fix) out.push(fix);
  }
  return out;
}

export function isStructuredRecommendedFixes(raw: unknown): boolean {
  if (!Array.isArray(raw) || raw.length === 0) return false;
  return raw.every((item) => typeof item === "object" && item != null && "action" in item);
}

/** Company / role / project names parsed from resume text. */
export function extractResumePlacementTargets(resumeText: string): string[] {
  const out = new Set<string>();
  const parsed = parseResumeToJSON(resumeText);
  for (const exp of parsed.experience ?? []) {
    if (exp.company?.trim()) out.add(exp.company.trim());
    if (exp.role?.trim()) out.add(exp.role.trim());
    for (const project of exp.projects ?? []) {
      if (project.title?.trim()) out.add(project.title.trim());
    }
  }
  if (parsed.title?.trim()) out.add(parsed.title.trim());
  return Array.from(out).filter((t) => t.length >= 2);
}

function normalizeTargetKey(value: string): string {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

/** Match LLM target to a parsed resume company/role/project. */
export function validateFixTarget(
  target: string | null | undefined,
  allowedTargets: string[]
): string | null {
  const raw = target?.trim();
  if (!raw) return null;
  if (allowedTargets.length === 0) return raw;

  const key = normalizeTargetKey(raw);
  for (const candidate of allowedTargets) {
    const cKey = normalizeTargetKey(candidate);
    if (cKey === key || cKey.includes(key) || key.includes(cKey)) return candidate;
  }
  return null;
}

export function validateRecommendedFixTargets(
  fixes: RecommendedFix[],
  resumeText: string
): RecommendedFix[] {
  const allowed = extractResumePlacementTargets(resumeText);
  return fixes.map((fix) => {
    const validated = validateFixTarget(fix.target, allowed);
    if (validated) return { ...fix, target: validated };
    if (fix.target && allowed.length > 0) {
      return { ...fix, target: null, detail: fix.detail ?? fix.target };
    }
    return fix;
  });
}

export function recommendedFixKey(fix: RecommendedFix): string {
  return `${fix.action}::${fix.target ?? ""}`.toLowerCase().trim();
}

export function recommendedFixToOptimizeText(fix: RecommendedFix): string {
  const parts = [fix.action.trim()];
  if (fix.target?.trim()) parts.push(`Target: ${fix.target.trim()}`);
  if (fix.section) parts.push(`Section: ${fix.section}`);
  if (fix.detail?.trim()) parts.push(fix.detail.trim());
  return parts.join(" — ");
}

export function recommendedFixActionLabel(fix: RecommendedFix, maxLen = 56): string {
  const text = fix.action.trim();
  if (text.length <= maxLen) return text;
  const cut = text.slice(0, maxLen - 1).replace(/\s+\S*$/, "").trim();
  return cut.length >= 16 ? `${cut}…` : `${text.slice(0, maxLen - 1)}…`;
}

export function recommendedFixPlacementLabel(fix: RecommendedFix): string | null {
  if (fix.target?.trim()) {
    const section =
      fix.section && fix.section !== "experience"
        ? SECTION_LABELS[fix.section]
        : "Work experience";
    return `Applies to: ${fix.target.trim()} · ${section}`;
  }
  if (fix.section) return `Applies to: ${SECTION_LABELS[fix.section]}`;
  return "Applies to: best matching role on your resume";
}

/** @deprecated Use recommendedFixActionLabel — kept for string legacy paths. */
export function recommendedFixChipLabel(fix: RecommendedFix | string, index: number): string {
  if (typeof fix === "string") {
    const parsed = legacyStringToRecommendedFix(fix);
    return parsed ? recommendedFixActionLabel(parsed) : `Fix ${index + 1}`;
  }
  return recommendedFixActionLabel(fix);
}

export function dedupeRecommendedFixes(fixes: RecommendedFix[]): RecommendedFix[] {
  const seenKeys = new Set<string>();
  const seenActions = new Set<string>();
  const out: RecommendedFix[] = [];

  for (const fix of fixes) {
    const key = recommendedFixKey(fix);
    const actionKey = recommendedFixActionLabel(fix).toLowerCase();
    if (seenKeys.has(key) || seenActions.has(actionKey)) continue;
    seenKeys.add(key);
    seenActions.add(actionKey);
    out.push(fix);
  }

  return out;
}

/** @deprecated Use dedupeRecommendedFixes */
export function dedupeRecommendedFixesByChipLabel(
  fixes: RecommendedFix[] | string[]
): RecommendedFix[] {
  return dedupeRecommendedFixes(normalizeRecommendedFixes(fixes));
}

export function resolveDashboardRecommendedFixes(raw: unknown): RecommendedFix[] {
  return dedupeRecommendedFixes(normalizeRecommendedFixes(raw));
}

/** Terms to highlight in preview for selected recommended fixes. */
export function extractFixHighlightKeywords(fixes: Array<RecommendedFix | string>): string[] {
  const out = new Set<string>();

  for (const item of fixes) {
    const fix = typeof item === "string" ? legacyStringToRecommendedFix(item) : item;
    if (!fix) continue;
    const trimmed = recommendedFixToOptimizeText(fix);

    const quoted = trimmed.match(/["']([^"']{2,48})["']/g);
    if (quoted) {
      for (const raw of quoted) {
        const inner = raw.slice(1, -1).trim();
        if (inner) out.add(inner);
      }
    }

    if (fix.target?.trim()) out.add(fix.target.trim());

    const caps = trimmed.match(/\b([A-Z][a-zA-Z0-9+#/.-]{1,28}|[A-Z]{2,})\b/g);
    if (caps) {
      for (const token of caps) {
        if (token.length >= 2 && !FIX_KEYWORD_STOP.has(token.toLowerCase())) {
          out.add(token);
        }
      }
    }

    const percents = trimmed.match(/\d+(?:\.\d+)?%/g);
    if (percents) {
      for (const pct of percents) out.add(pct);
    }

    for (const token of rejectionRiskThemeTokens(trimmed)) {
      if (token.length >= 3 && !FIX_KEYWORD_STOP.has(token.toLowerCase())) {
        out.add(token);
      }
    }

    const chipLower = recommendedFixActionLabel(fix).toLowerCase();
    if (chipLower.includes("aws")) out.add("AWS");
    if (chipLower.includes("azure")) out.add("Azure");
    if (chipLower.includes("genai") || chipLower.includes("llm")) out.add("GenAI");
    if (chipLower.includes("langchain")) out.add("LangChain");
    if (chipLower.includes("bedrock")) out.add("Bedrock");
    if (chipLower.includes("kubernetes") || chipLower.includes(" k8s")) out.add("Kubernetes");
  }

  return Array.from(out)
    .filter((kw) => kw.trim().length >= 2)
    .sort((a, b) => b.length - a.length);
}

export function distributeFixUplift(totalUplift: number, count: number): number[] {
  if (count <= 0) return [];
  if (totalUplift <= 0) return Array.from({ length: count }, () => 0);
  const base = Math.floor(totalUplift / count);
  const extra = totalUplift % count;
  return Array.from({ length: count }, (_, i) => base + (i < extra ? 1 : 0));
}

export function selectedFixUpliftTotal(
  fixes: RecommendedFix[],
  selected: RecommendedFix[],
  verdict: ApplicationVerdict
): number {
  if (fixes.length === 0 || selected.length === 0) return 0;
  const uplifts = distributeFixUplift(verdict.shortlistUplift, fixes.length);
  const selectedKeys = new Set(selected.map(recommendedFixKey));
  return fixes.reduce((sum, fix, index) => {
    if (selectedKeys.has(recommendedFixKey(fix))) return sum + (uplifts[index] ?? 0);
    return sum;
  }, 0);
}

export function recommendedFixesEqual(a: RecommendedFix, b: RecommendedFix): boolean {
  return recommendedFixKey(a) === recommendedFixKey(b);
}

export function filterSelectedRecommendedFixes(
  catalog: RecommendedFix[],
  selected: RecommendedFix[]
): RecommendedFix[] {
  const keys = new Set(selected.map(recommendedFixKey));
  return catalog.filter((fix) => keys.has(recommendedFixKey(fix)));
}
