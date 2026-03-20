import type { ParsedResume } from "@/app/lib/resumeParser";

export type ResumeProject = {
  title: string;
  bullets: string[];
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
  skills?: string[];
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
  const headerLine = headerParts.join(" — ");
  if (headerLine) lines.push(headerLine);
  if (doc.contact?.trim()) lines.push(doc.contact.trim());
  if (lines.length > 0) lines.push("");

  if (doc.summary?.trim()) {
    lines.push("Professional Summary");
    lines.push(doc.summary.trim());
    lines.push("");
  }

  if (Array.isArray(doc.skills) && doc.skills.length > 0) {
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
      const header = [role, company, dates].filter(Boolean).join(" — ");
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
  const headerLines = parsed.headerLines ?? [];
  const name = headerLines[0]?.trim() || undefined;
  const title = headerLines[1]?.trim() || undefined;
  const contact =
    headerLines.length > 2
      ? headerLines
          .slice(2)
          .map((l) => l.trim())
          .filter(Boolean)
          .join("\n")
      : undefined;

  const educationLines =
    parsed.education
      ?.map((edu) =>
        [edu.degree, edu.institution, edu.year].filter(Boolean).join(" · ").trim()
      )
      .filter((s) => s.length > 0) ?? [];

  return {
    name,
    title,
    contact,
    summary: parsed.summary?.trim() || undefined,
    skills: parsed.skills ?? [],
    experience: (parsed.experience ?? []).map((exp) => ({
      company: exp.company?.trim() ?? "",
      role: exp.role?.trim() ?? "",
      dates: exp.dates?.trim() ?? "",
      bullets: exp.bullets ?? [],
      projects: exp.projects,
    })),
    education: educationLines.length > 0 ? educationLines : undefined,
  };
}
