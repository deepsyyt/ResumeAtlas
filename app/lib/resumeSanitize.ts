import type {
  ResumeDocument,
  ResumeExperience,
  ResumeSkillGroup,
} from "@/app/lib/resumeDocument";
import {
  getSkillGroups,
  isSoftSkillItem,
  normalizeSkillGroupLabel,
  parseSkillLinesToGroups,
  skillGroupsFromFlatSkills,
  syncResumeSkills,
} from "@/app/lib/resumeSkillGroups";

const CONTACT_LINE_RE =
  /@|linkedin|github\.com|\+?[\d][\d\s().-]{8,}\d|\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/i;

const DEGREE_LINE_RE =
  /\b(bachelor|master|b\.?\s*s\.?|b\.?\s*e\.?|b\.?\s*tech|mba|ph\.?\s*d|m\.?\s*s\.?|university|college|institute|gpa|degree|eee)\b/i;

const EXPERIENCE_ROLE_RE =
  /\b(data scientist|software engineer|engineer|architect|analyst|manager|lead|principal|associate|developer|consultant)\b/i;

const DATE_RANGE_RE = /\b(19|20)\d{2}\s*[-–—]\s*(present|current|(19|20)\d{2})\b/i;

const PROJECT_LINE_RE = /^project\s*\d*\s*:/i;

const KNOWN_SKILL_TOKENS =
  /^(python|pyspark|pytorch|sql|bigquery|databricks|airflow|github\/gitlab|github|gitlab|aws\s*&\s*gcp|aws|gcp|vscode|spark|scala|java|tensorflow|keras)$/i;

const SECTION_LABEL_RE =
  /^(contact|program(m)?ing|tools|soft\s*skills|technical\s*skills|profile|certifications?|awards?|education|experience|work\s*experience|professional\s*summary|summary)$/i;

function splitLines(text: string | undefined): string[] {
  if (!text?.trim()) return [];
  return text
    .split(/\r?\n|[•·]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function isContactLine(line: string): boolean {
  const t = line.trim();
  if (!t || t.length > 120) return false;
  if (SECTION_LABEL_RE.test(t)) return false;
  if (KNOWN_SKILL_TOKENS.test(t)) return false;
  if (/\b(chennai|india|linkedin)\b/i.test(t) && t.length < 80) return true;
  return CONTACT_LINE_RE.test(t);
}

function isLikelySkillItem(line: string): boolean {
  const t = line.trim();
  if (!t || t.length > 50) return false;
  if (isContactLine(t)) return false;
  if (SECTION_LABEL_RE.test(t)) return false;
  if (PROJECT_LINE_RE.test(t)) return false;
  if (DATE_RANGE_RE.test(t)) return false;
  if (EXPERIENCE_ROLE_RE.test(t) && t.split(/\s+/).length > 3) return false;
  if (KNOWN_SKILL_TOKENS.test(t)) return true;
  if (isSoftSkillItem(t)) return true;
  if (/^[A-Za-z+#.]{2,24}$/.test(t) && t.split(/\s+/).length <= 3) return true;
  return false;
}

function isEducationLine(line: string): boolean {
  const t = line.trim();
  if (!t) return false;
  if (DEGREE_LINE_RE.test(t)) return true;
  if (/\|\s*/.test(t) && DEGREE_LINE_RE.test(t)) return true;
  return false;
}

function isMisplacedExperienceLine(line: string): boolean {
  const t = line.trim();
  if (!t) return false;
  if (PROJECT_LINE_RE.test(t)) return true;
  if (DATE_RANGE_RE.test(t) && EXPERIENCE_ROLE_RE.test(t)) return true;
  if (EXPERIENCE_ROLE_RE.test(t) && /\b(infosys|cognizant|verizon|cond[eé]\s*nast|dhl)\b/i.test(t)) {
    return true;
  }
  if (/^\s*(senior|lead|principal|associate|manager)\b/i.test(t) && t.length < 80) return true;
  return false;
}

function parseLooseExperienceLine(line: string): Partial<ResumeExperience> | null {
  const t = line.trim();
  if (!t) return null;
  const dateMatch = t.match(
    /^(.*?)\s*[•·|]\s*((?:19|20)\d{2}\s*[-–—]\s*(?:present|current|(19|20)\d{2}))\s*(.*)$/i
  );
  if (dateMatch) {
    const role = dateMatch[1]?.trim() ?? "";
    const dates = dateMatch[2]?.trim() ?? "";
    const company = dateMatch[3]?.trim() ?? "";
    if (role || company) {
      return { role, company, dates, bullets: [] };
    }
  }
  if (DATE_RANGE_RE.test(t) && !EXPERIENCE_ROLE_RE.test(t)) {
    return null;
  }
  if (EXPERIENCE_ROLE_RE.test(t)) {
    return { role: t, company: "", dates: "", bullets: [] };
  }
  return null;
}

function cleanContactField(contact: string | undefined): string | undefined {
  const kept = splitLines(contact).filter((line) => isContactLine(line));
  const joined = kept.join("\n").trim();
  return joined.length > 0 ? joined : undefined;
}

function extractHeaderFromPollutedContact(
  contact: string | undefined,
  doc: ResumeDocument
): {
  name?: string;
  title?: string;
  contact?: string;
  skillOrphans: string[];
} {
  const lines = splitLines(contact);
  let name = doc.name?.trim();
  let title = doc.title?.trim();
  const contactOnly: string[] = [];
  const skillOrphans: string[] = [];

  for (const line of lines) {
    if (isContactLine(line)) {
      contactOnly.push(line);
      continue;
    }
    if (isLikelySkillItem(line)) {
      skillOrphans.push(line);
      continue;
    }
    if (!name && line.length >= 4 && /^[A-Z][A-Z\s]{3,}$/.test(line) && line.split(/\s+/).length <= 5) {
      name = line;
      continue;
    }
    if (!title && (line.includes("|") || line.includes("&"))) {
      title = line;
      continue;
    }
    if (!title && line.length > 20) {
      title = line;
    }
  }

  return {
    name: name || doc.name,
    title: title || doc.title,
    contact: contactOnly.length > 0 ? contactOnly.join("\n") : cleanContactField(contact),
    skillOrphans,
  };
}

function cleanEducation(
  education: string[] | undefined,
  experience: ResumeExperience[]
): { education: string[]; experience: ResumeExperience[]; softItems: string[] } {
  const eduOut: string[] = [];
  const softItems: string[] = [];
  const expOut = [...experience];

  for (const raw of education ?? []) {
    const line = String(raw ?? "").trim();
    if (!line) continue;

    if (isEducationLine(line)) {
      eduOut.push(line);
      continue;
    }

    if (isSoftSkillItem(line) || /^soft\s*skills?$/i.test(line)) {
      if (!/^soft\s*skills?$/i.test(line)) softItems.push(line);
      continue;
    }

    const loose = parseLooseExperienceLine(line);
    if (loose && (loose.role || loose.company)) {
      expOut.push({
        company: loose.company ?? "",
        role: loose.role ?? "",
        dates: loose.dates ?? "",
        bullets: [],
      });
      continue;
    }

    if (isMisplacedExperienceLine(line)) {
      expOut.push({
        company: "",
        role: line,
        dates: "",
        bullets: [],
      });
      continue;
    }

    if (line.length < 80 && !isLikelySkillItem(line)) {
      eduOut.push(line);
    }
  }

  return { education: eduOut, experience: expOut, softItems };
}

function mergeMislabeledSkillGroups(groups: ResumeSkillGroup[]): ResumeSkillGroup[] {
  const out = groups.map((g) => ({
    label: normalizeSkillGroupLabel(g.label),
    items: [...g.items],
  }));
  const programming =
    out.find((g) => /programming/i.test(g.label)) ??
    (() => {
      const g = { label: "Programming Languages", items: [] as string[] };
      out.unshift(g);
      return g;
    })();

  for (const g of [...out]) {
    if (g === programming) continue;
    if (
      /^sql$/i.test(g.label) ||
      (g.items.length <= 3 && /^technical/i.test(g.label))
    ) {
      programming.items.push(...g.items);
      const idx = out.indexOf(g);
      if (idx >= 0) out.splice(idx, 1);
    }
  }

  const soft = out.find((g) => /^soft\s*skills?$/i.test(g.label));
  if (soft) {
    const keep: string[] = [];
    const expHints: string[] = [];
    for (const item of soft.items) {
      if (isMisplacedExperienceLine(item) || EXPERIENCE_ROLE_RE.test(item)) {
        expHints.push(item);
      } else if (isSoftSkillItem(item)) {
        keep.push(item);
      }
    }
    soft.items = dedupe(keep);
    if (expHints.length > 0) {
      (soft as ResumeSkillGroup & { _expHints?: string[] })._expHints = expHints;
    }
  }

  return out.filter((g) => g.items.length > 0);
}

function filterInvalidSkillGroups(doc: ResumeDocument): ResumeDocument {
  const groups = getSkillGroups(doc);
  if (groups.length === 0) return doc;

  const cleaned = groups
    .map((g) => {
      const label = normalizeSkillGroupLabel(g.label);
      if (/^(contact|profile|programming languages)$/i.test(label) && g.items.some(isContactLine)) {
        return null;
      }
      const items = g.items.filter((item) => {
        const t = item.trim();
        if (!t) return false;
        if (isContactLine(t)) return false;
        if (SECTION_LABEL_RE.test(t)) return false;
        if (t.length > 60) return false;
        if (/@/.test(t)) return false;
        return true;
      });
      if (items.length === 0) return null;
      if (/^contact$/i.test(g.label)) return null;
      return { label, items };
    })
    .filter((g): g is NonNullable<typeof g> => g !== null);

  return { ...doc, skillGroups: cleaned.length > 0 ? cleaned : undefined };
}

/** Repair common parse/optimize mistakes before display or export. */
export function sanitizeResumeDocument(doc: ResumeDocument): ResumeDocument {
  let next: ResumeDocument = { ...doc };

  const headerFix = extractHeaderFromPollutedContact(next.contact, next);
  const skillOrphans = headerFix.skillOrphans;
  next = {
    ...next,
    name: headerFix.name,
    title: headerFix.title,
    contact: headerFix.contact,
  };

  const eduClean = cleanEducation(next.education, next.experience ?? []);
  next = {
    ...next,
    education: eduClean.education.length > 0 ? eduClean.education : undefined,
    experience: eduClean.experience,
  };

  if (skillOrphans.length > 0 || eduClean.softItems.length > 0) {
    const existing = getSkillGroups(next);
    const softGroup = existing.find((g) => /^soft\s*skills?$/i.test(g.label));
    const softItems = dedupe([
      ...(softGroup?.items ?? []),
      ...eduClean.softItems,
      ...skillOrphans.filter(isSoftSkillItem),
    ]);
    const techOrphans = [...skillOrphans.filter((s) => !isSoftSkillItem(s))];
    let groups = existing.filter((g) => !/^soft\s*skills?$/i.test(g.label));
    if (techOrphans.length > 0) {
      const prog = groups.find((g) => /programming/i.test(g.label));
      if (prog) prog.items.push(...techOrphans);
      else groups.unshift({ label: "Programming Languages", items: techOrphans });
    }
    if (softItems.length > 0) {
      groups.push({ label: "Soft Skills", items: softItems });
    }
    next = { ...next, skillGroups: groups };
  }

  next = filterInvalidSkillGroups(next);
  const mergedGroups = mergeMislabeledSkillGroups(getSkillGroups(next));
  const softGroup = mergedGroups.find((g) => /^soft\s*skills?$/i.test(g.label)) as
    | (ResumeSkillGroup & { _expHints?: string[] })
    | undefined;
  const expFromSoft = softGroup?._expHints ?? [];
  if (expFromSoft.length > 0) {
    next = {
      ...next,
      experience: [
        ...next.experience,
        ...expFromSoft.map((line) => {
          const loose = parseLooseExperienceLine(line);
          return {
            company: loose?.company ?? "",
            role: loose?.role ?? line,
            dates: loose?.dates ?? "",
            bullets: [],
          };
        }),
      ],
    };
  }
  next = { ...next, skillGroups: mergedGroups };

  const contactLines = splitLines(next.contact);
  const contactClean = contactLines.filter(
    (l) => !DATE_RANGE_RE.test(l) && !/\b(infosys|cognizant)\b/i.test(l)
  );
  next.contact = contactClean.length > 0 ? contactClean.join("\n") : undefined;

  return syncResumeSkills(next);
}

function dedupe(items: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of items) {
    const k = item.toLowerCase();
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(item);
  }
  return out;
}
