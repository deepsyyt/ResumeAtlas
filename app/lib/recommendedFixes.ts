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

/** Coaching / filler terms — omit from post-optimize fix chip rows. */
const FIX_DISPLAY_STOP = new Set([
  ...Array.from(FIX_KEYWORD_STOP),
  "section",
  "emphasizes",
  "emphasize",
  "surface",
  "scaled",
  "scale",
  "managed",
  "manage",
  "teams",
  "team",
  "across",
  "geographies",
  "verticals",
  "brand",
  "example",
  "coordination",
  "leadership",
  "establishing",
  "establish",
  "improvements",
  "improvement",
  "collaboration",
  "platform",
  "multiple",
  "how",
  "when",
  "where",
  "which",
  "jd",
  "work",
  "best",
  "matching",
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
  if (/\bTarget:\s*/i.test(raw) || /\bSection:\s*/i.test(raw)) {
    const parsed = parseRecommendedFixOptimizeText(raw);
    if (parsed) return parsed;
  }

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

/** Parse round-trip optimize text back into a structured fix. */
export function parseRecommendedFixOptimizeText(text: string): RecommendedFix | null {
  const trimmed = String(text ?? "").trim();
  if (!trimmed) return null;

  const parts = trimmed.split(/\s*—\s*/);
  const action = normalizeActionText(parts[0] ?? "");
  if (!action) return null;

  let target: string | null = null;
  let section: RecommendedFixSection | null = null;
  const detailParts: string[] = [];

  for (let i = 1; i < parts.length; i++) {
    const part = parts[i]!.trim();
    const targetMatch = part.match(/^Target:\s*(.+)$/i);
    const sectionMatch = part.match(/^Section:\s*(.+)$/i);
    if (targetMatch?.[1]) target = targetMatch[1].trim();
    else if (sectionMatch?.[1]) section = normalizeSection(sectionMatch[1]);
    else if (part) detailParts.push(part);
  }

  return {
    action,
    target,
    section: section ?? inferSectionFromLegacyText(action),
    detail: detailParts.length > 0 ? detailParts.join(" — ") : null,
  };
}

export function resolveRecommendedFixInput(item: RecommendedFix | string): RecommendedFix | null {
  if (typeof item === "string") {
    return parseRecommendedFixOptimizeText(item) ?? legacyStringToRecommendedFix(item);
  }
  return item;
}

/** Short coaching line for LLM prompts (action only, not full optimize payload). */
export function recommendedFixPromptLine(fix: RecommendedFix | string): string {
  const parsed = resolveRecommendedFixInput(fix);
  if (!parsed) return typeof fix === "string" ? fix.trim() : "";
  if (parsed.target?.trim()) {
    return `${parsed.action} (${parsed.target.trim()})`;
  }
  return parsed.action;
}

export function recommendedFixMatchTokens(fix: RecommendedFix | string): string[] {
  const parsed = resolveRecommendedFixInput(fix);
  if (!parsed) return [];

  const tokens = new Set<string>();
  const addParts = (text: string) => {
    for (const part of text
      .toLowerCase()
      .split(/[^a-z0-9+/#.&-]+/i)
      .map((t) => t.trim())
      .filter((t) => t.length >= 3 && !FIX_KEYWORD_STOP.has(t))) {
      tokens.add(part);
    }
  };

  addParts(parsed.action);
  if (parsed.detail) addParts(parsed.detail);
  if (parsed.target) addParts(parsed.target);

  for (const kw of extractFixHighlightKeywords([parsed])) {
    if (kw.trim().length >= 2) tokens.add(kw.toLowerCase());
  }

  return Array.from(tokens);
}

export function recommendedFixBulletScore(bulletText: string, fix: RecommendedFix | string): number {
  const lower = String(bulletText ?? "").toLowerCase();
  const tokens = recommendedFixMatchTokens(fix);
  if (tokens.length === 0) return 0;

  let hits = 0;
  for (const token of tokens) {
    if (token.length >= 3 && lower.includes(token)) hits += 1;
  }

  const parsed = resolveRecommendedFixInput(fix);
  if (parsed?.target && lower.includes(parsed.target.toLowerCase())) hits += 2;

  const short = lower.length < 88;
  const noNumber = !/\d/.test(lower);

  if (hits === 0) return short || noNumber ? 2 : 1;
  return hits * 6 + (short ? 2 : 0) + (noNumber ? 1 : 0);
}

export function recommendedFixAddressedInBullet(
  bulletText: string,
  fix: RecommendedFix | string
): boolean {
  if (recommendedFixBulletScore(bulletText, fix) >= 3) return true;
  const parsed = resolveRecommendedFixInput(fix);
  const lower = String(bulletText ?? "").toLowerCase();
  if (parsed?.target && lower.includes(parsed.target.toLowerCase())) {
    return recommendedFixMatchTokens(fix).some(
      (token) => token.length >= 4 && lower.includes(token)
    );
  }
  return recommendedFixMatchTokens(fix).some(
    (token) => token.length >= 5 && lower.includes(token)
  );
}

export function recommendedFixesForBullet(
  bulletText: string,
  selectedFixes: string[]
): string[] {
  if (selectedFixes.length === 0) return [];
  return selectedFixes
    .map((fix) => ({ fix, score: recommendedFixBulletScore(bulletText, fix) }))
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((row) => row.fix);
}

export function recommendedFixesBetterAddressedInRewrite(
  original: string,
  improved: string,
  selectedFixes: string[]
): string[] {
  if (selectedFixes.length === 0) return [];
  const out: string[] = [];
  for (const fix of selectedFixes) {
    if (
      recommendedFixAddressedInBullet(improved, fix) &&
      (!original.trim() || !recommendedFixAddressedInBullet(original, fix))
    ) {
      out.push(fix);
    }
  }
  return out;
}

export function pickBestBulletKeyForRecommendedFix(
  bullets: Array<{ bulletKey: string; text: string }>,
  fix: string,
  exclude: Set<string>
): string | null {
  let bestKey: string | null = null;
  let bestScore = 0;
  for (const bullet of bullets) {
    if (exclude.has(bullet.bulletKey)) continue;
    const score = recommendedFixBulletScore(bullet.text, fix);
    if (score > bestScore) {
      bestScore = score;
      bestKey = bullet.bulletKey;
    }
  }
  return bestKey;
}

export type AppliedFixOutcome = {
  fixText: string;
  action: string;
  applied: boolean;
  improvedBullet?: string;
  bulletKey?: string;
};

export function buildAppliedFixOutcomes(
  selectedFixes: string[],
  bulletChanges: Array<{
    original: string;
    improved: string;
    addressedRejectionRisks?: string[];
  }>,
  bulletKeyByImproved: Map<string, string>
): AppliedFixOutcome[] {
  const bulletByFix = new Map<string, { improvedBullet: string; bulletKey?: string }>();

  for (const change of bulletChanges) {
    for (const fixText of change.addressedRejectionRisks ?? []) {
      if (!bulletByFix.has(fixText) && change.improved.trim()) {
        bulletByFix.set(fixText, {
          improvedBullet: change.improved.trim(),
          bulletKey: bulletKeyByImproved.get(change.improved.trim().toLowerCase()),
        });
      }
    }
  }

  return selectedFixes.map((fixText) => {
    const parsed = resolveRecommendedFixInput(fixText);
    const fromMap = bulletByFix.get(fixText);
    let improvedBullet = fromMap?.improvedBullet;
    let bulletKey = fromMap?.bulletKey;

    if (!improvedBullet) {
      for (const change of bulletChanges) {
        if (!change.improved.trim()) continue;
        if (
          (change.addressedRejectionRisks ?? []).includes(fixText) ||
          recommendedFixAddressedInBullet(change.improved, fixText)
        ) {
          improvedBullet = change.improved.trim();
          bulletKey = bulletKeyByImproved.get(change.improved.trim().toLowerCase());
          break;
        }
      }
    }

    return {
      fixText,
      action: parsed?.action ?? fixText.slice(0, 80),
      applied: true,
      improvedBullet,
      bulletKey,
    };
  });
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

/** JD-facing keyword chips for post-optimize fix cards (not full recommendation text). */
export function extractFixDisplayChips(fix: RecommendedFix | string, max = 4): string[] {
  const parsed = resolveRecommendedFixInput(fix);
  if (!parsed) return [];

  const ranked: Array<{ term: string; score: number }> = [];
  const seen = new Set<string>();

  const add = (term: string, score: number) => {
    const cleaned = term.trim().replace(/^[-–—]+|[-–—]+$/g, "");
    if (cleaned.length < 3 || cleaned.length > 32) return;
    const lower = cleaned.toLowerCase();
    if (FIX_DISPLAY_STOP.has(lower)) return;
    if (seen.has(lower)) return;
    seen.add(lower);
    ranked.push({ term: cleaned, score });
  };

  const scan = (text: string, baseScore: number) => {
    const hyphenated = text.match(/\b[a-z][a-z0-9]*(?:-[a-z0-9]+)+\b/gi);
    if (hyphenated) {
      for (const term of hyphenated) add(term, baseScore + 40);
    }

    for (const raw of text.match(/["']([^"']{2,48})["']/g) ?? []) {
      add(raw.slice(1, -1), baseScore + 35);
    }

    for (const raw of text.match(/\(([^)]+)\)/g) ?? []) {
      for (const part of raw.slice(1, -1).split(/[,/]/)) {
        add(part, baseScore + 30);
      }
    }

    const caps = text.match(/\b([A-Z][a-zA-Z0-9+#/.-]{1,28}|[A-Z]{2,})\b/g);
    if (caps) {
      for (const token of caps) add(token, baseScore + 25);
    }

    for (const pct of text.match(/\d+(?:\.\d+)?%/g) ?? []) {
      add(pct, baseScore + 20);
    }
  };

  if (parsed.detail) scan(parsed.detail, 50);
  scan(parsed.action, 20);
  if (parsed.target?.trim()) add(parsed.target.trim(), 45);

  if (parsed.detail) {
    for (const token of parsed.detail.split(/[^a-z0-9+/#.&-]+/i)) {
      const trimmed = token.trim();
      if (trimmed.length >= 5 && !FIX_DISPLAY_STOP.has(trimmed.toLowerCase())) {
        add(trimmed, 15);
      }
    }
  }

  const chips = ranked
    .sort((a, b) => b.score - a.score || b.term.length - a.term.length)
    .slice(0, max)
    .map((row) => row.term);

  if (chips.length > 0) return chips;
  return extractFixHighlightKeywords([parsed]).slice(0, max);
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
