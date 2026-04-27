import { NextResponse } from "next/server";
import { parseResumeToJSON } from "@/app/lib/resumeParser";
import { resolveAnthropicModelCandidates } from "@/app/lib/anthropicModels";
import type {
  ResumeDocument,
  ResumeExperience,
  ResumeProject,
} from "@/app/lib/resumeDocument";

const API_URL = "https://api.anthropic.com/v1/messages";

/** @deprecated Use `ResumeProject` from `@/app/lib/resumeDocument` */
export type StructuredProject = ResumeProject;
/** @deprecated Use `ResumeExperience` from `@/app/lib/resumeDocument` */
export type StructuredExperience = ResumeExperience;
/** Canonical resume JSON; alias for {@link ResumeDocument}. */
export type StructuredResume = ResumeDocument;

export type ParseResumeRequestBody = {
  resumeText: string;
};

export type ParseResumeResponse = {
  resume: StructuredResume;
};

const PARSER_SYSTEM_PROMPT = `You are a resume parser. Convert raw resume text into a clean structured JSON object.

Rules:
- Extract fields only from the resume text provided.
- Do NOT invent companies, roles, tools, or dates.
- Preserve the original order of experience entries.
- For each experience entry, keep company, role, and dates exactly as written.
- Bullets should be short achievement statements, without leading bullet characters.
- If any field is not present, omit it or return an empty array instead of guessing.
- IMPORTANT: When a role lists work under headings like "Project 1:", "Project 2:", or "Project: Name", do NOT flatten them into one bullet list. Use the "projects" array: each item has "title" (the full heading line as written) and "bullets" (achievements under that project only). Lines before the first project heading stay in top-level "bullets".

Return ONLY valid JSON with this exact shape (no markdown, no explanations):
{
  "name": "string | null",
  "title": "string | null",
  "contact": "string | null",
  "summary": "string | null",
  "skills": ["string"],
  "experience": [
    {
      "company": "string",
      "role": "string",
      "dates": "string",
      "bullets": ["string"],
      "projects": [ { "title": "string", "bullets": ["string"] } ]
    }
  ],
  "education": ["string"],
  "tools": ["string"],
  "certifications": ["string"],
  "awards": ["string"]
}`.trim();

function extractJson(raw: string): string {
  const mdMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  const str = mdMatch ? mdMatch[1].trim() : raw;
  const start = str.indexOf("{");
  const end = str.lastIndexOf("}") + 1;
  if (start === -1 || end <= start) return raw;
  return str.slice(start, end);
}

function coerceArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((v) => (typeof v === "string" ? v.trim() : ""))
    .filter((v) => v.length > 0);
}

function coerceProjects(value: unknown): ResumeProject[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const out: ResumeProject[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const rec = item as Record<string, unknown>;
    const title = typeof rec.title === "string" ? rec.title.trim() : "";
    const bullets = coerceArray(rec.bullets);
    if (!title || bullets.length === 0) continue;
    out.push({ title, bullets });
  }
  return out.length > 0 ? out : undefined;
}

const PROJECT_HEADING_RE = /^(project\s*\d*\s*:\s*|project\s*:\s*)/i;

function splitBulletsIntoProjects(bullets: string[]): {
  topBullets: string[];
  projects: ResumeProject[];
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
  const projects: ResumeProject[] = [];
  let current: ResumeProject | null = null;

  for (const line of bullets) {
    const t = String(line ?? "").trim();
    if (!t) continue;
    if (PROJECT_HEADING_RE.test(t)) {
      if (current && current.bullets.length > 0) {
        projects.push(current);
      } else if (current && current.bullets.length === 0) {
        topBullets.push(current.title);
      }
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

function coerceExperience(value: unknown): ResumeExperience[] {
  if (!Array.isArray(value)) return [];
  const out: ResumeExperience[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const rec = item as Record<string, unknown>;
    const company = typeof rec.company === "string" ? rec.company.trim() : "";
    const role = typeof rec.role === "string" ? rec.role.trim() : "";
    const dates = typeof rec.dates === "string" ? rec.dates.trim() : "";
    let bullets = coerceArray(rec.bullets);
    let projects = coerceProjects(rec.projects);
    if (!company || !role || !dates) continue;

    if ((!projects || projects.length === 0) && bullets.length > 0) {
      const split = splitBulletsIntoProjects(bullets);
      if (split.projects.length > 0) {
        bullets = split.topBullets;
        projects = split.projects;
      }
    }

    if (bullets.length === 0 && (!projects || projects.length === 0)) continue;
    const entry: ResumeExperience = { company, role, dates, bullets };
    if (projects && projects.length > 0) entry.projects = projects;
    out.push(entry);
  }
  return out;
}

function buildFallbackStructured(resumeText: string): ResumeDocument {
  const parsed = parseResumeToJSON(resumeText);
  const experience: ResumeExperience[] = parsed.experience.map((exp) => {
    const bullets = exp.bullets ?? [];
    const split = splitBulletsIntoProjects(bullets);
    const entry: ResumeExperience = {
      company: exp.company?.trim() || "",
      role: exp.role?.trim() || "",
      dates: exp.dates?.trim() || "",
      bullets: split.topBullets,
    };
    if (split.projects.length > 0) entry.projects = split.projects;
    return entry;
  }).filter(
    (exp) =>
      exp.company &&
      exp.role &&
      (exp.bullets.length > 0 || (exp.projects && exp.projects.length > 0))
  );

  return {
    name: parsed.headerLines[0] || "",
    title: parsed.headerLines[1] || "",
    contact: parsed.headerLines.slice(2).join(" • "),
    summary: parsed.summary ?? "",
    skills: parsed.skills ?? [],
    experience,
    education: parsed.education.map((e) =>
      [e.degree, e.institution, e.year].filter(Boolean).join(" • ")
    ),
    tools: [],
    certifications: [],
    awards: [],
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ParseResumeRequestBody;
    const resumeText = body?.resumeText;

    if (typeof resumeText !== "string" || !resumeText.trim()) {
      return NextResponse.json(
        { error: "resumeText (string) is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    const model = resolveAnthropicModelCandidates()[0] ?? "claude-haiku-4-5-20251001";

    if (!apiKey) {
      // Fallback to deterministic parser when LLM is not configured.
      const fallback = buildFallbackStructured(resumeText);
      return NextResponse.json({ resume: fallback } satisfies ParseResumeResponse);
    }

    const userPrompt = `RAW RESUME:
"""${resumeText}"""

Return ONLY the JSON object described in the system prompt.`;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        max_tokens: 2000,
        temperature: 0,
        system: PARSER_SYSTEM_PROMPT,
        messages: [{ role: "user" as const, content: userPrompt }],
      }),
    });

    const text = await response.text();

    if (!response.ok) {
      console.error("[parse-resume] LLM error", response.status, text.slice(0, 300));
      const fallback = buildFallbackStructured(resumeText);
      return NextResponse.json({ resume: fallback } satisfies ParseResumeResponse);
    }

    let rawJson: unknown;
    try {
      const parsed = JSON.parse(text) as { content?: unknown };
      const content = Array.isArray(parsed.content) ? parsed.content : [];
      const textBlock = content.find(
        (c: { type?: string; text?: string }) =>
          c && typeof c === "object" && c.type === "text"
      ) as { text?: string } | undefined;
      const llmText = textBlock?.text?.trim() ?? "";
      const jsonStr = extractJson(llmText || text);
      rawJson = JSON.parse(jsonStr) as unknown;
    } catch (err) {
      console.error("[parse-resume] Failed to parse LLM JSON", err);
      const fallback = buildFallbackStructured(resumeText);
      return NextResponse.json({ resume: fallback } satisfies ParseResumeResponse);
    }

    const obj = rawJson && typeof rawJson === "object" ? (rawJson as Record<string, unknown>) : {};
    const experience = coerceExperience(obj.experience);

    // Ensure minimal valid structure; if invalid, fall back to deterministic parser.
    if (experience.length === 0) {
      const fallback = buildFallbackStructured(resumeText);
      return NextResponse.json({ resume: fallback } satisfies ParseResumeResponse);
    }

    const resume: ResumeDocument = {
      name:
        typeof obj.name === "string" && obj.name.trim().length > 0
          ? obj.name.trim()
          : undefined,
      title:
        typeof obj.title === "string" && obj.title.trim().length > 0
          ? obj.title.trim()
          : undefined,
      contact:
        typeof obj.contact === "string" && obj.contact.trim().length > 0
          ? obj.contact.trim()
          : undefined,
      summary:
        typeof obj.summary === "string" && obj.summary.trim().length > 0
          ? obj.summary.trim()
          : undefined,
      skills: coerceArray(obj.skills),
      experience,
      education: coerceArray(obj.education),
      tools: coerceArray(obj.tools),
      certifications: coerceArray(obj.certifications),
      awards: coerceArray(obj.awards),
    };

    return NextResponse.json({ resume } satisfies ParseResumeResponse);
  } catch (err) {
    console.error("[parse-resume]", err);
    const message = err instanceof Error ? err.message : "Parsing failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

