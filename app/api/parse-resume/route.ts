import { NextResponse } from "next/server";
import { parseResumeToJSON } from "@/app/lib/resumeParser";

const API_URL = "https://api.anthropic.com/v1/messages";

export type StructuredExperience = {
  company: string;
  role: string;
  dates: string;
  bullets: string[];
};

export type StructuredResume = {
  name?: string;
  title?: string;
  contact?: string;
  summary?: string;
  skills?: string[];
  experience: StructuredExperience[];
  education?: string[];
  tools?: string[];
  certifications?: string[];
  awards?: string[];
};

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
      "bullets": ["string"]
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

function coerceExperience(value: unknown): StructuredExperience[] {
  if (!Array.isArray(value)) return [];
  const out: StructuredExperience[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const rec = item as Record<string, unknown>;
    const company = typeof rec.company === "string" ? rec.company.trim() : "";
    const role = typeof rec.role === "string" ? rec.role.trim() : "";
    const dates = typeof rec.dates === "string" ? rec.dates.trim() : "";
    const bullets = coerceArray(rec.bullets);
    if (!company || !role || !dates) continue;
    out.push({ company, role, dates, bullets });
  }
  return out;
}

function buildFallbackStructured(resumeText: string): StructuredResume {
  const parsed = parseResumeToJSON(resumeText);
  const experience: StructuredExperience[] = parsed.experience.map((exp) => ({
    company: exp.company?.trim() || "",
    role: exp.role?.trim() || "",
    dates: exp.dates?.trim() || "",
    bullets: exp.bullets ?? [],
  })).filter((exp) => exp.company && exp.role);

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
    const model =
      process.env.ANTHROPIC_MODEL && process.env.ANTHROPIC_MODEL.trim().length > 0
        ? process.env.ANTHROPIC_MODEL
        : "claude-3-haiku-20240307";

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
        top_p: 1,
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

    const resume: StructuredResume = {
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

