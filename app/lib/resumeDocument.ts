import type { ParsedResume } from "@/app/lib/resumeParser";
import {
  finalizeResumeSkillSections,
  formatSkillGroupLine,
  getSkillGroups,
  parseSkillLinesToGroups,
  syncResumeSkills,
} from "@/app/lib/resumeSkillGroups";
import { sanitizeResumeDocument } from "@/app/lib/resumeSanitize";

export {
  syncResumeSkills,
  finalizeResumeSkillSections,
  formatSkillGroupLine,
  getSkillGroups,
} from "@/app/lib/resumeSkillGroups";
export { sanitizeResumeDocument } from "@/app/lib/resumeSanitize";

export type ResumeProject = {
  title: string;
  bullets: string[];
};

/** Grouped skills under the single ATS section "Skills" (e.g. Programming, Tools, Soft Skills). */
export type ResumeSkillGroup = {
  label: string;
  items: string[];
};

export type ResumeExperience = {
  company: string;
  role: string;
  dates: string;
  bullets: string[];
  projects?: ResumeProject[];
};

/**
 * Canonical resume model: shared by /api/parse-resume, /api/optimize, and the optimize UI.
 * Plain text for ATS/export is always derived via {@link resumeDocumentToPlainText}.
 */
export type ResumeDocument = {
  name?: string;
  title?: string;
  contact?: string;
  summary?: string;
  /** Flat list for search/legacy; kept in sync with {@link skillGroups} via {@link syncResumeSkills}. */
  skills?: string[];
  /** ATS-friendly skill subsections (technical vs soft, tools vs languages, etc.). */
  skillGroups?: ResumeSkillGroup[];
  experience: ResumeExperience[];
  education?: string[];
  tools?: string[];
  certifications?: string[];
  awards?: string[];
};

/** Single serializer for ATS-style plain text (used on server and client). */
export function resumeDocumentToPlainText(doc: ResumeDocument): string {
  const lines: string[] = [];

  const headerParts: string[] = [];
  if (doc.name?.trim()) headerParts.push(doc.name.trim());
  if (doc.title?.trim()) headerParts.push(doc.title.trim());
  const headerLine = headerParts.join(" - ");
  if (headerLine) lines.push(headerLine);
  if (doc.contact?.trim()) lines.push(doc.contact.trim());
  if (lines.length > 0) lines.push("");

  if (doc.summary?.trim()) {
    lines.push("Professional Summary");
    lines.push(doc.summary.trim());
    lines.push("");
  }

  const skillGroups = getSkillGroups(doc);
  if (skillGroups.length > 0) {
    lines.push("Skills");
    for (const group of skillGroups) {
      const line = formatSkillGroupLine(group.items);
      if (line) lines.push(`${group.label}: ${line}`);
    }
    lines.push("");
  } else if (Array.isArray(doc.skills) && doc.skills.length > 0) {
    lines.push("Skills");
    lines.push(doc.skills.join(" · "));
    lines.push("");
  }

  if (Array.isArray(doc.experience) && doc.experience.length > 0) {
    lines.push("Experience");
    for (const exp of doc.experience) {
      const role = exp.role?.trim();
      const company = exp.company?.trim();
      const dates = exp.dates?.trim();
      const header = [role, company, dates].filter(Boolean).join(" - ");
      if (header) lines.push(header);
      for (const b of exp.bullets ?? []) {
        if (b && b.trim()) lines.push(`• ${b.trim()}`);
      }
      for (const proj of exp.projects ?? []) {
        if (proj.title?.trim()) {
          // Leading tab lets PDF/text parsers style project labels like the UI (not section headings).
          lines.push(`\t${proj.title.trim()}`);
        }
        for (const b of proj.bullets ?? []) {
          if (b && b.trim()) lines.push(`• ${b.trim()}`);
        }
      }
      lines.push("");
    }
  }

  if (Array.isArray(doc.certifications) && doc.certifications.length > 0) {
    lines.push("Certifications");
    for (const c of doc.certifications) {
      if (c?.trim()) lines.push(`• ${c.trim()}`);
    }
    lines.push("");
  }

  if (Array.isArray(doc.awards) && doc.awards.length > 0) {
    lines.push("Awards");
    for (const a of doc.awards) {
      if (a?.trim()) lines.push(`• ${a.trim()}`);
    }
    lines.push("");
  }

  if (Array.isArray(doc.education) && doc.education.length > 0) {
    lines.push("Education");
    for (const edu of doc.education) {
      if (edu && edu.trim()) {
        lines.push(edu.trim());
      }
    }
    lines.push("");
  }

  return lines.length > 0 ? lines.join("\n").trim() : "";
}

/** Convert heuristic section parser output into a {@link ResumeDocument}. */
export function resumeDocumentFromHeuristicParsed(parsed: ParsedResume): ResumeDocument {
  const name = parsed.name?.trim() || parsed.headerLines[0]?.trim() || undefined;
  const title = parsed.title?.trim() || parsed.headerLines[1]?.trim() || undefined;
  const contact =
    parsed.contact?.trim() ||
    (parsed.headerLines.length > 2
      ? parsed.headerLines
          .slice(2)
          .map((l) => l.trim())
          .filter(Boolean)
          .join("\n")
      : undefined);

  const educationLines =
    parsed.education
      ?.map((edu) =>
        [edu.degree, edu.institution, edu.year].filter(Boolean).join(" · ").trim()
      )
      .filter((s) => s.length > 0) ?? [];

  const skillLines = parsed.skillsSectionLines ?? [];
  const skillGroups =
    parsed.skillGroups ??
    (skillLines.length > 0 ? parseSkillLinesToGroups(skillLines) : undefined);

  const doc: ResumeDocument = {
    name,
    title,
    contact,
    summary: parsed.summary?.trim() || undefined,
    skills: parsed.skills ?? [],
    skillGroups,
    experience: (parsed.experience ?? []).map((exp) => ({
      company: exp.company?.trim() ?? "",
      role: exp.role?.trim() ?? "",
      dates: exp.dates?.trim() ?? "",
      bullets: exp.bullets ?? [],
      projects: exp.projects,
    })),
    education: educationLines.length > 0 ? educationLines : undefined,
    certifications: parsed.certifications,
    awards: parsed.awards,
  };
  return sanitizeResumeDocument(syncResumeSkills(finalizeResumeSkillSections(doc)));
}
