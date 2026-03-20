export type ParsedExperience = {
  company?: string;
  role?: string;
  dates?: string;
  bullets: string[];
  /** Optional project-style groupings preserved from structured parse / optimizer. */
  projects?: { title: string; bullets: string[] }[];
};

export type ParsedEducation = {
  institution?: string;
  degree?: string;
  year?: string;
};

export type ParsedResume = {
  headerLines: string[];
  summary?: string;
  skills: string[];
  experience: ParsedExperience[];
  education: ParsedEducation[];
};

const SECTION_HEADER_REGEX =
  /^(professional summary|summary|profile|experience|work experience|education|skills)\b/i;

export function parseResumeToJSON(raw: string): ParsedResume {
  const lines = raw.split(/\r?\n/);
  const headerLines: string[] = [];
  const summaryLines: string[] = [];
  const skillsLines: string[] = [];
  const experienceBlocks: string[][] = [];
  const educationBlocks: string[][] = [];

  let currentSection: "header" | "summary" | "skills" | "experience" | "education" = "header";
  let currentBlock: string[] = [];

  const flushBlock = () => {
    if (currentBlock.length === 0) return;
    if (currentSection === "experience") experienceBlocks.push(currentBlock);
    if (currentSection === "education") educationBlocks.push(currentBlock);
    currentBlock = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const trimmed = line.trim();
    if (!trimmed) {
      if (currentSection === "experience" || currentSection === "education") {
        flushBlock();
      }
      continue;
    }

    if (SECTION_HEADER_REGEX.test(trimmed)) {
      const lower = trimmed.toLowerCase();
      if (lower.startsWith("experience") || lower.startsWith("work experience")) {
        flushBlock();
        currentSection = "experience";
      } else if (lower.startsWith("education")) {
        flushBlock();
        currentSection = "education";
      } else if (lower.startsWith("skills")) {
        flushBlock();
        currentSection = "skills";
      } else if (lower.startsWith("summary") || lower.startsWith("professional summary") || lower.startsWith("profile")) {
        flushBlock();
        currentSection = "summary";
      }
      continue;
    }

    switch (currentSection) {
      case "header":
        headerLines.push(line);
        break;
      case "summary":
        summaryLines.push(line);
        break;
      case "skills":
        skillsLines.push(line);
        break;
      case "experience":
      case "education":
        currentBlock.push(line);
        break;
    }
  }
  flushBlock();

  const skillsText = skillsLines.join(" ");
  const skills =
    skillsText.length > 0
      ? skillsText
          .split(/[,;•\u2022]/)
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

  const experience: ParsedExperience[] = experienceBlocks.map((block) => {
    const [first, ...rest] = block;
    let role: string | undefined;
    let company: string | undefined;
    let dates: string | undefined;
    const header = first ?? "";
    const parts = header.split(/[–—-]/).map((p) => p.trim());
    if (parts.length >= 2) {
      role = parts[0];
      company = parts[1];
      if (parts.length >= 3) dates = parts[2];
    } else {
      role = header;
    }
    const bullets: string[] = [];
    for (const l of rest) {
      const t = l.replace(/^[•\-\*\u2022]\s*/, "").trim();
      if (t) bullets.push(t);
    }
    return { company, role, dates, bullets };
  });

  const education: ParsedEducation[] = educationBlocks.map((block) => {
    const [first, second] = block;
    const degree = first?.trim() || undefined;
    let institution: string | undefined;
    let year: string | undefined;
    if (second) {
      const parts = second.split(/[·|\-]/).map((p) => p.trim());
      institution = parts[0];
      if (parts.length > 1) year = parts[1];
    }
    return { institution, degree, year };
  });

  return {
    headerLines,
    summary: summaryLines.join(" ").trim() || undefined,
    skills,
    experience,
    education,
  };
}

