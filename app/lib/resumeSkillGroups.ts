import type { ResumeDocument, ResumeSkillGroup } from "@/app/lib/resumeDocument";

export type { ResumeSkillGroup };

const SOFT_SKILL_PHRASES = [
  "problem solving",
  "decision making",
  "decision-making",
  "mentoring",
  "mentorship",
  "communication",
  "collaboration",
  "teamwork",
  "leadership",
  "strategic thinking",
  "forward planning",
  "time management",
  "critical thinking",
  "stakeholder management",
  "presentation",
  "negotiation",
  "adaptability",
  "attention to detail",
  "emotional intelligence",
  "conflict resolution",
  "cross-functional",
  "interpersonal",
];

const TECHNICAL_LABEL_HINTS =
  /^(technical|programming|programing|languages?|tools?|platforms?|frameworks?|technologies|cloud|databases?|data\s+engineering|ml|ai|devops)/i;

const SOFT_LABEL_HINTS = /^(soft\s*skills?|interpersonal|leadership\s*skills?|core\s+competencies)/i;

/** ATS-friendly section labels (fix common resume typos). */
export function normalizeSkillGroupLabel(raw: string): string {
  const t = String(raw ?? "").trim();
  if (!t) return "Technical Skills";
  const lower = t.toLowerCase().replace(/\s+/g, " ");
  if (/^program(m)?ing(\s+languages?)?$/.test(lower) || lower === "programing") {
    return "Programming Languages";
  }
  if (/^tools?(\s*&\s*platforms?)?$/.test(lower) || /^platforms?$/.test(lower)) {
    return "Tools & Platforms";
  }
  if (SOFT_LABEL_HINTS.test(lower)) return "Soft Skills";
  if (/^technical(\s+skills?)?$/.test(lower)) return "Technical Skills";
  if (/^frameworks?$/.test(lower)) return "Frameworks";
  if (/^cloud(\s+platforms?)?$/.test(lower)) return "Cloud Platforms";
  // Title-case short headers
  if (t.length <= 40 && /^[A-Z0-9\s/&-]+$/.test(t)) {
    return t
      .toLowerCase()
      .split(/\s+/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")
      .replace(/\bAnd\b/g, "and");
  }
  return t;
}

export function isSoftSkillItem(item: string): boolean {
  const lower = String(item ?? "").toLowerCase().trim();
  if (!lower || lower.length > 80) return false;
  if (SOFT_LABEL_HINTS.test(lower)) return true;
  if (TECHNICAL_LABEL_HINTS.test(lower) && !SOFT_LABEL_HINTS.test(lower)) return false;
  // Tool/language tokens are technical
  if (
    /\b(python|java|sql|aws|gcp|azure|react|node|kubernetes|docker|spark|tableau|power\s*bi|databricks|airflow|git)\b/i.test(
      lower
    )
  ) {
    return false;
  }
  return SOFT_SKILL_PHRASES.some(
    (phrase) => lower === phrase || lower.includes(phrase)
  );
}

function isLikelySkillGroupHeader(line: string): boolean {
  const t = line.trim();
  if (!t || t.length > 48) return false;
  if (/^[•\-\*\u2022]/.test(t)) return false;
  if (t.includes(",") && t.split(",").length > 2) return false;
  if (SOFT_LABEL_HINTS.test(t) || TECHNICAL_LABEL_HINTS.test(t)) return true;
  if (/^[A-Z][A-Z0-9\s/&-]{2,40}$/.test(t)) {
    const words = t.split(/\s+/).filter(Boolean);
    if (words.length >= 2 && words.length <= 5 && !/^(WORK|DATA|SOFT|AWS|GCP|SQL)$/i.test(t)) {
      return false;
    }
    return true;
  }
  return false;
}

function splitSkillTokens(text: string): string[] {
  return String(text ?? "")
    .split(/[,;•\u2022|]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function dedupeItems(items: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of items) {
    const key = item.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}

/** Split items that were stored as "Python, SQL" into separate tokens. */
export function expandSkillGroupItems(items: string[]): string[] {
  const out: string[] = [];
  for (const raw of items) {
    const t = String(raw ?? "").trim();
    if (!t) continue;
    if (/[,;•\u2022|]/.test(t)) out.push(...splitSkillTokens(t));
    else out.push(t);
  }
  return dedupeItems(out);
}

/** Merge duplicate subgroup labels and normalize items (compact ATS layout). */
export function mergeSkillGroupsByLabel(groups: ResumeSkillGroup[]): ResumeSkillGroup[] {
  const map = new Map<string, ResumeSkillGroup>();
  for (const g of groups) {
    const label = normalizeSkillGroupLabel(g.label);
    const items = expandSkillGroupItems(g.items ?? []);
    if (items.length === 0) continue;
    const existing = map.get(label);
    if (existing) {
      existing.items = dedupeItems([...existing.items, ...items]);
    } else {
      map.set(label, { label, items });
    }
  }
  return normalizeSkillGroupOrder(Array.from(map.values()));
}

/** Comma-separated line for preview, PDF, and plain-text export. */
export function formatSkillGroupLine(items: string[]): string {
  return expandSkillGroupItems(items).join(", ");
}

/** Parse skills section lines that use sub-headings (PROGRAMING, TOOLS, Soft skills). */
export function parseSkillLinesToGroups(lines: string[]): ResumeSkillGroup[] {
  const groups: ResumeSkillGroup[] = [];
  let current: ResumeSkillGroup | null = null;
  const orphanItems: string[] = [];

  const pushCurrent = () => {
    if (!current) return;
    current.items = dedupeItems(current.items);
    if (current.items.length > 0) groups.push(current);
    current = null;
  };

  for (const rawLine of lines) {
    const trimmed = rawLine.trim().replace(/^[•\-\*\u2022]\s*/, "");
    if (!trimmed) continue;

    if (isLikelySkillGroupHeader(trimmed)) {
      pushCurrent();
      current = { label: normalizeSkillGroupLabel(trimmed), items: [] };
      continue;
    }

    const tokens = splitSkillTokens(trimmed);
    if (current) {
      current.items.push(...tokens);
    } else {
      orphanItems.push(...tokens);
    }
  }
  pushCurrent();

  if (groups.length === 0 && orphanItems.length > 0) {
    return skillGroupsFromFlatSkills(orphanItems);
  }

  if (orphanItems.length > 0) {
    const tech = groups.find((g) => !/^soft\s*skills?$/i.test(g.label));
    if (tech) tech.items.push(...orphanItems);
    else groups.unshift({ label: "Technical Skills", items: dedupeItems(orphanItems) });
  }

  return normalizeSkillGroupOrder(groups.map((g) => ({ ...g, label: normalizeSkillGroupLabel(g.label) })));
}

/** Classify a flat skill list into technical + soft groups. */
export function skillGroupsFromFlatSkills(skills: string[]): ResumeSkillGroup[] {
  const technical: string[] = [];
  const soft: string[] = [];
  for (const raw of skills) {
    const items = splitSkillTokens(raw);
    for (const item of items) {
      if (!item) continue;
      if (isSoftSkillItem(item)) soft.push(item);
      else technical.push(item);
    }
  }
  const groups: ResumeSkillGroup[] = [];
  if (technical.length > 0) {
    groups.push({ label: "Technical Skills", items: dedupeItems(technical) });
  }
  if (soft.length > 0) {
    groups.push({ label: "Soft Skills", items: dedupeItems(soft) });
  }
  return groups;
}

const GROUP_ORDER: Record<string, number> = {
  "Technical Skills": 10,
  "Programming Languages": 20,
  Frameworks: 25,
  "Tools & Platforms": 30,
  "Cloud Platforms": 35,
  "Soft Skills": 90,
};

function normalizeSkillGroupOrder(groups: ResumeSkillGroup[]): ResumeSkillGroup[] {
  return [...groups].sort(
    (a, b) => (GROUP_ORDER[a.label] ?? 50) - (GROUP_ORDER[b.label] ?? 50)
  );
}

export function getSkillGroups(doc: ResumeDocument): ResumeSkillGroup[] {
  if (Array.isArray(doc.skillGroups) && doc.skillGroups.length > 0) {
    return mergeSkillGroupsByLabel(
      doc.skillGroups
        .map((g) => ({
          label: normalizeSkillGroupLabel(g.label),
          items: expandSkillGroupItems(
            (g.items ?? []).map((i) => String(i).trim()).filter(Boolean)
          ),
        }))
        .filter((g) => g.items.length > 0)
    );
  }
  const flat = doc.skills ?? [];
  if (flat.length === 0) return [];
  return mergeSkillGroupsByLabel(skillGroupsFromFlatSkills(flat));
}

export function flattenSkillGroups(groups: ResumeSkillGroup[]): string[] {
  return dedupeItems(groups.flatMap((g) => g.items));
}

export function syncResumeSkills(doc: ResumeDocument): ResumeDocument {
  const groups = getSkillGroups(doc);
  if (groups.length === 0) {
    return { ...doc, skills: doc.skills ?? [], skillGroups: undefined };
  }
  return {
    ...doc,
    skillGroups: groups,
    skills: flattenSkillGroups(groups),
  };
}

/** Normalize skill subgroups only (does not inject JD keywords into the skills section). */
export function finalizeResumeSkillSections(doc: ResumeDocument): ResumeDocument {
  let groups = getSkillGroups(doc);

  groups = mergeSkillGroupsByLabel(groups);

  return {
    ...doc,
    skillGroups: groups.length > 0 ? groups : undefined,
    skills: groups.length > 0 ? flattenSkillGroups(groups) : doc.skills ?? [],
  };
}

export function coerceSkillGroupsFromJson(value: unknown): ResumeSkillGroup[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const groups: ResumeSkillGroup[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const rec = item as Record<string, unknown>;
    const label =
      typeof rec.label === "string" && rec.label.trim()
        ? normalizeSkillGroupLabel(rec.label)
        : "";
    const items = Array.isArray(rec.items)
      ? rec.items
          .filter((x): x is string => typeof x === "string")
          .map((x) => x.trim())
          .filter(Boolean)
      : [];
    if (!label || items.length === 0) continue;
    groups.push({ label, items: dedupeItems(items) });
  }
  return groups.length > 0 ? normalizeSkillGroupOrder(groups) : undefined;
}
