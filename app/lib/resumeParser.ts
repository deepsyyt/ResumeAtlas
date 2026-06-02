import type { ResumeSkillGroup } from "@/app/lib/resumeDocument";
import {
  isSoftSkillItem,
  normalizeSkillGroupLabel,
  parseSkillLinesToGroups,
} from "@/app/lib/resumeSkillGroups";

export type ParsedExperience = {
  company?: string;
  role?: string;
  dates?: string;
  bullets: string[];
  projects?: { title: string; bullets: string[] }[];
};

export type ParsedEducation = {
  institution?: string;
  degree?: string;
  year?: string;
};

export type ParsedResume = {
  headerLines: string[];
  name?: string;
  title?: string;
  contact?: string;
  summary?: string;
  skills: string[];
  skillsSectionLines?: string[];
  skillGroups?: ResumeSkillGroup[];
  experience: ParsedExperience[];
  education: ParsedEducation[];
  certifications?: string[];
  awards?: string[];
};

type Section =
  | "preamble"
  | "summary"
  | "experience"
  | "education"
  | "certifications"
  | "awards"
  | "skills";

type SkillBucket = { label: string; lines: string[] };

const PROJECT_HEADING_RE = /^(project\s*\d*\s*:\s*|project\s*:\s*)/i;

const DATE_LINE_RE =
  /^(19|20)\d{2}\s*[-–—]\s*(present|current|(19|20)\d{2})\s*$/i;

const ROLE_LINE_RE =
  /\b(manager|lead|principal|architect|scientist|engineer|analyst|developer|consultant|associate)\b/i;

const DEGREE_LINE_RE =
  /\b(bachelor|master|b\.?\s*s\.?|b\.?\s*e\.?|b\.?\s*tech|mba|ph\.?\s*d|university|college|gpa|degree)\b/i;

function detectSectionHeader(trimmed: string): Section | SkillBucket | null {
  const lower = trimmed.toLowerCase().replace(/\s+/g, " ").trim();
  if (/^contact$/.test(lower)) return "preamble";
  if (/^program(m)?ing$/.test(lower)) {
    return { label: "Programming Languages", lines: [] };
  }
  if (/^tools$/.test(lower)) {
    return { label: "Tools & Platforms", lines: [] };
  }
  if (/^soft\s*skills?$/.test(lower)) {
    return { label: "Soft Skills", lines: [] };
  }
  if (/^technical\s*skills?$/.test(lower)) {
    return { label: "Technical Skills", lines: [] };
  }
  if (
    /^(professional\s+summary|summary|profile)$/.test(lower) ||
    lower === "profile"
  ) {
    return "summary";
  }
  if (/^(work\s+experience|experience|employment)$/.test(lower)) {
    return "experience";
  }
  if (/^education$/.test(lower)) return "education";
  if (/^certifications?$/.test(lower)) return "certifications";
  if (/^awards?$/.test(lower)) return "awards";
  if (/^skills$/.test(lower)) return "skills";
  return null;
}

function isContactLine(line: string): boolean {
  const t = line.trim();
  return (
    /@|linkedin|github\.com|\+?[\d][\d\s().-]{8,}\d/i.test(t) ||
    (/\b(india|chennai|bangalore|mumbai|hyderabad)\b/i.test(t) && t.length < 80)
  );
}

function isLikelyNameLine(line: string): boolean {
  const t = line.trim();
  return (
    t.length >= 4 &&
    t.length <= 50 &&
    /^[A-Z][A-Z\s'.-]+$/.test(t) &&
    !/^(contact|programming|programing|tools|profile)$/i.test(t) &&
    t.split(/\s+/).length <= 5
  );
}

function isLikelyRoleLine(line: string): boolean {
  const t = line.trim();
  if (!t || t.length > 90 || PROJECT_HEADING_RE.test(t)) return false;
  if (DATE_LINE_RE.test(t)) return false;
  return ROLE_LINE_RE.test(t) && t.split(/\s+/).length <= 12;
}

function isLikelyCompanyLine(line: string): boolean {
  const t = line.trim();
  if (!t || t.length > 70 || PROJECT_HEADING_RE.test(t)) return false;
  if (DATE_LINE_RE.test(t) || isLikelyRoleLine(t)) return false;
  if (/[.!?]$/.test(t) && t.length > 40) return false;
  if (DEGREE_LINE_RE.test(t)) return false;
  return true;
}

function isSummaryParagraph(line: string): boolean {
  const t = line.trim();
  if (t.length < 70) return false;
  if (PROJECT_HEADING_RE.test(t) || DATE_LINE_RE.test(t)) return false;
  if (DEGREE_LINE_RE.test(t)) return false;
  return /\b(experience|years|expertise|leader|solutions|professional)\b/i.test(t);
}

function isMisplacedExperienceLine(line: string): boolean {
  const t = line.trim();
  if (PROJECT_HEADING_RE.test(t)) return true;
  if (DATE_LINE_RE.test(t) && ROLE_LINE_RE.test(t)) return true;
  if (isLikelyRoleLine(t) && /\b(infosys|cognizant|verizon|cond[eé]\s*nast|dhl)\b/i.test(t)) {
    return true;
  }
  if (/^\s*(senior|lead|principal|associate)\b/i.test(t) && t.length < 80) return true;
  return false;
}

function splitBulletsIntoProjects(bullets: string[]): {
  topBullets: string[];
  projects: { title: string; bullets: string[] }[];
} {
  let hasProjectLine = false;
  for (const b of bullets) {
    if (PROJECT_HEADING_RE.test(String(b ?? "").trim())) {
      hasProjectLine = true;
      break;
    }
  }
  if (!hasProjectLine) {
    return { topBullets: [...bullets], projects: [] };
  }

  const topBullets: string[] = [];
  const projects: { title: string; bullets: string[] }[] = [];
  let current: { title: string; bullets: string[] } | null = null;

  for (const line of bullets) {
    const t = String(line ?? "").trim();
    if (!t) continue;
    if (PROJECT_HEADING_RE.test(t)) {
      if (current && current.bullets.length > 0) projects.push(current);
      else if (current) topBullets.push(current.title);
      current = { title: t, bullets: [] };
    } else if (current) {
      current.bullets.push(t);
    } else {
      topBullets.push(t);
    }
  }
  if (current) {
    if (current.bullets.length > 0) projects.push(current);
    else topBullets.push(current.title);
  }

  return { topBullets, projects };
}

type JobDraft = {
  company: string;
  role: string;
  dates: string;
  lines: string[];
};

function flushJobDraft(draft: JobDraft, out: ParsedExperience[]) {
  const hasBody =
    draft.lines.length > 0 ||
    draft.company.trim().length > 0 ||
    draft.role.trim().length > 0;
  if (!hasBody) return;

  const split = splitBulletsIntoProjects(draft.lines);
  out.push({
    company: draft.company.trim(),
    role: draft.role.trim(),
    dates: draft.dates.trim(),
    bullets: split.topBullets,
    projects: split.projects.length > 0 ? split.projects : undefined,
  });
}

/** Split a large experience section into multiple jobs (common in contact-skills-header resumes). */
function parseExperienceSectionLines(lines: string[]): ParsedExperience[] {
  const jobs: ParsedExperience[] = [];
  let draft: JobDraft = { company: "", role: "", dates: "", lines: [] };

  const pushJob = () => {
    flushJobDraft(draft, jobs);
    draft = { company: "", role: "", dates: "", lines: [] };
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!.trim();
    if (!line) continue;

    if (DATE_LINE_RE.test(line)) {
      if (draft.dates && draft.lines.length > 0) {
        pushJob();
        draft.dates = line;
      } else {
        draft.dates = draft.dates ? `${draft.dates}; ${line}` : line;
      }
      continue;
    }

    if (isLikelyRoleLine(line)) {
      if (draft.role && draft.lines.length > 0) {
        pushJob();
      }
      if (!draft.role) {
        draft.role = line;
        continue;
      }
      if (!draft.company) {
        draft.company = draft.role;
        draft.role = line;
        continue;
      }
      pushJob();
      draft.role = line;
      continue;
    }

    if (
      isLikelyCompanyLine(line) &&
      !draft.company &&
      draft.lines.length === 0 &&
      !PROJECT_HEADING_RE.test(line)
    ) {
      draft.company = line;
      continue;
    }

    if (
      isLikelyCompanyLine(line) &&
      draft.lines.length > 4 &&
      (draft.company || draft.role)
    ) {
      pushJob();
      draft.company = line;
      continue;
    }

    draft.lines.push(line);
  }

  pushJob();
  return jobs.filter(
    (e) => e.role || e.company || e.bullets.length > 0 || (e.projects?.length ?? 0) > 0
  );
}

function parseExperienceBlock(block: string[]): ParsedExperience[] {
  const lines = block.map((l) => l.trim()).filter(Boolean);
  if (lines.length === 0) return [];

  const multiJobSignals =
    lines.filter((l) => PROJECT_HEADING_RE.test(l)).length >= 2 ||
    lines.filter((l) => isLikelyRoleLine(l)).length >= 2 ||
    lines.filter((l) => DATE_LINE_RE.test(l)).length >= 2;

  if (multiJobSignals) {
    return parseExperienceSectionLines(lines);
  }

  const single = (() => {
    let company = "";
    let role = "";
    let dates = "";
    const body: string[] = [];

    for (const line of lines) {
      if (DATE_LINE_RE.test(line)) {
        if (!dates) dates = line;
        else body.push(line);
        continue;
      }
      if (!company && lines.indexOf(line) === 0 && isLikelyCompanyLine(line)) {
        company = line;
        continue;
      }
      if (!role && body.length === 0 && isLikelyRoleLine(line) && line !== company) {
        role = line;
        continue;
      }
      body.push(line);
    }

    if (!role && company) {
      role = company;
      company = "";
    }

    const split = splitBulletsIntoProjects(body);
    return [
      {
        company,
        role,
        dates,
        bullets: split.topBullets,
        projects: split.projects.length > 0 ? split.projects : undefined,
      },
    ];
  })();

  return single.filter(
    (e) => e.role || e.company || e.bullets.length > 0 || (e.projects?.length ?? 0) > 0
  );
}

export function parseResumeToJSON(raw: string): ParsedResume {
  const lines = raw.split(/\r?\n/);

  let section: Section = "preamble";
  let activeSkillBucket: SkillBucket | null = null;
  const skillBuckets: SkillBucket[] = [];

  const summaryLines: string[] = [];
  const skillsLines: string[] = [];
  const experienceLineBlocks: string[][] = [];
  const educationBlocks: string[][] = [];
  const certificationLines: string[] = [];
  const awardLines: string[] = [];

  const preambleContact: string[] = [];
  const preambleSkills: string[] = [];
  let name: string | undefined;
  const titleParts: string[] = [];

  let currentBlock: string[] = [];

  const flushBlock = () => {
    if (currentBlock.length === 0) return;
    if (section === "experience") experienceLineBlocks.push([...currentBlock]);
    if (section === "education") educationBlocks.push([...currentBlock]);
    currentBlock = [];
  };

  const flushSkillBucket = () => {
    if (activeSkillBucket && activeSkillBucket.lines.length > 0) {
      skillBuckets.push(activeSkillBucket);
    }
    activeSkillBucket = null;
  };

  const routeMisplacedFromEducation = (trimmed: string): boolean => {
    if (isMisplacedExperienceLine(trimmed)) {
      flushBlock();
      section = "experience";
      currentBlock.push(trimmed);
      return true;
    }
    if (isSoftSkillItem(trimmed) || /^soft\s*skills?$/i.test(trimmed)) {
      flushBlock();
      flushSkillBucket();
      section = "preamble";
      if (!/^soft\s*skills?$/i.test(trimmed)) {
        activeSkillBucket = { label: "Soft Skills", lines: [trimmed] };
      } else {
        activeSkillBucket = { label: "Soft Skills", lines: [] };
      }
      return true;
    }
    return false;
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const trimmed = line.trim();
    if (!trimmed) {
      if (section === "experience" || section === "education") flushBlock();
      continue;
    }

    const header = detectSectionHeader(trimmed);
    if (header !== null) {
      flushBlock();
      flushSkillBucket();

      if (typeof header === "object" && "label" in header) {
        section = "preamble";
        activeSkillBucket = header;
        continue;
      }

      section = header;
      if (section === "experience" || section === "education") {
        currentBlock = [];
      }
      continue;
    }

    if (section === "education" && routeMisplacedFromEducation(trimmed)) {
      continue;
    }

    if (activeSkillBucket) {
      if (isContactLine(trimmed) || isLikelyNameLine(trimmed)) {
        flushSkillBucket();
      } else if (
        !trimmed.includes("|") &&
        (isSoftSkillItem(trimmed) ||
          /^(python|pyspark|pytorch|sql|bigquery|databricks|airflow|github|gitlab|aws|gcp|vscode|spark)$/i.test(
            trimmed
          ) ||
          trimmed.length < 36)
      ) {
        activeSkillBucket.lines.push(trimmed);
        continue;
      } else {
        flushSkillBucket();
      }
    }

    if (isSummaryParagraph(trimmed) && section !== "experience") {
      summaryLines.push(trimmed);
      continue;
    }

    switch (section) {
      case "preamble": {
        if (isContactLine(trimmed)) {
          preambleContact.push(trimmed);
        } else if (isSoftSkillItem(trimmed)) {
          preambleSkills.push(trimmed);
        } else if (
          /^(python|pyspark|pytorch|sql|bigquery|databricks|airflow|github|gitlab|aws|gcp|vscode|spark)$/i.test(
            trimmed
          )
        ) {
          preambleSkills.push(trimmed);
        } else if (isLikelyNameLine(trimmed)) {
          name = trimmed;
        } else if (trimmed.includes("|") || (trimmed.includes("&") && trimmed.length > 20)) {
          titleParts.push(trimmed);
        } else if (titleParts.length === 0 && trimmed.length > 25 && !isLikelyCompanyLine(trimmed)) {
          titleParts.push(trimmed);
        } else if (trimmed.length < 40 && !isContactLine(trimmed)) {
          preambleSkills.push(trimmed);
        }
        break;
      }
      case "summary":
        summaryLines.push(trimmed);
        break;
      case "skills":
        skillsLines.push(trimmed);
        break;
      case "experience":
      case "education":
        currentBlock.push(line);
        break;
      case "certifications":
        certificationLines.push(trimmed);
        break;
      case "awards":
        awardLines.push(trimmed);
        break;
    }
  }

  flushBlock();
  flushSkillBucket();

  const skillsSectionLines: string[] = [];
  for (const bucket of skillBuckets) {
    skillsSectionLines.push(bucket.label);
    skillsSectionLines.push(...bucket.lines);
  }
  skillsSectionLines.push(...skillsLines, ...preambleSkills);

  const skillGroups =
    skillsSectionLines.length > 0 ? parseSkillLinesToGroups(skillsSectionLines) : undefined;

  const skills =
    skillGroups?.flatMap((g) => g.items) ??
    skillsSectionLines
      .join(" ")
      .split(/[,;•\u2022]/)
      .map((s) => s.trim())
      .filter(Boolean);

  const experience = experienceLineBlocks.flatMap(parseExperienceBlock);

  const education: ParsedEducation[] = educationBlocks
    .map((block) =>
      block.filter((line) => {
        const t = line.trim();
        if (!t) return false;
        if (isMisplacedExperienceLine(t)) return false;
        if (isSoftSkillItem(t)) return false;
        return DEGREE_LINE_RE.test(t) || t.length < 60;
      })
    )
    .filter((block) => block.length > 0)
    .map((block) => {
      const degree = block[0]?.trim() || "";
      const second = block[1]?.trim();
      let institution: string | undefined;
      let year: string | undefined;
      if (second) {
        const parts = second.split(/[·|]/).map((p) => p.trim());
        institution = parts[0];
        if (parts.length > 1) year = parts[1];
      }
      return { degree, institution, year };
    });

  const headerLines: string[] = [];
  if (name) headerLines.push(name);
  const title = titleParts.join(" ").replace(/\s+/g, " ").trim() || undefined;
  if (title) headerLines.push(title);
  if (preambleContact.length > 0) headerLines.push(...preambleContact);

  const contact = preambleContact.length > 0 ? preambleContact.join("\n") : undefined;

  return {
    headerLines,
    name,
    title,
    contact,
    summary: summaryLines.join(" ").trim() || undefined,
    skills,
    skillsSectionLines: skillsSectionLines.length > 0 ? skillsSectionLines : undefined,
    skillGroups,
    experience,
    education,
    certifications: certificationLines.length > 0 ? certificationLines : undefined,
    awards: awardLines.length > 0 ? awardLines : undefined,
  };
}
