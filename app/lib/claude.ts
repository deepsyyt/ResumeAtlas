import { buildSystemPrompt, buildUserPrompt } from "./prompts";
import type { Resume } from "@/app/types/resume";

const API_URL = "https://api.anthropic.com/v1/messages";
// claude-3-5-haiku-20241022 is retired; use current Haiku
const MODEL = process.env.ANTHROPIC_MODEL || "claude-haiku-4-5-20251001";

export type GenerateInput = {
  resumeText: string;
  jobDescription: string;
  country: "USA" | "Canada" | "UK";
  roleLevel: string;
};

export async function generateResume(input: GenerateInput): Promise<Resume> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not set");
  }

  const roleLevel = input.roleLevel?.trim() || "Mid";
  const system = buildSystemPrompt(roleLevel);
  const user = buildUserPrompt(
    input.resumeText,
    input.jobDescription,
    input.country,
    roleLevel
  );

  const body = {
    model: MODEL,
    max_tokens: 4096,
    temperature: 0,
    top_p: 1,
    system,
    messages: [{ role: "user" as const, content: user }],
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errText = await response.text();
    let errDetail = errText || String(response.status);
    try {
      const errJson = JSON.parse(errText) as { error?: { message?: string }; message?: string };
      errDetail = errJson?.error?.message ?? errJson?.message ?? errDetail;
    } catch {
      /* use errText */
    }
    throw new Error(`Claude API (${response.status}): ${errDetail}`);
  }

  const data = (await response.json()) as {
    content?: { type: string; text?: string }[];
  };

  const textBlock = data.content?.find((c) => c.type === "text");
  const text = (typeof textBlock?.text === "string" ? textBlock.text : "")?.trim() ?? "";

  const parsed = parseJsonResponse(text);
  if (parsed) return parsed;

  // Retry once with raw extraction
  const retryParsed = parseJsonResponse(extractJson(text));
  if (retryParsed) return retryParsed;

  throw new Error("Claude returned invalid JSON");
}

function extractJson(raw: string): string {
  // Strip markdown code block if present
  const mdMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  const str = mdMatch ? mdMatch[1].trim() : raw;
  const start = str.indexOf("{");
  const end = str.lastIndexOf("}") + 1;
  if (start === -1 || end <= start) return raw;
  return str.slice(start, end);
}

function parseJsonResponse(text: string): Resume | null {
  try {
    const cleaned = extractJson(text);
    const obj = JSON.parse(cleaned) as unknown;
    if (!obj || typeof obj !== "object") return null;
    const r = obj as Record<string, unknown>;
    if (!r.basics || typeof r.basics !== "object") return null;
    const basics = r.basics as Record<string, unknown>;
    const experience = Array.isArray(r.experience) ? r.experience : [];
    const skills = Array.isArray(r.skills) ? r.skills : [];
    const education = Array.isArray(r.education) ? r.education : [];
    return {
      basics: {
        name: typeof basics.name === "string" ? basics.name : "",
        title: typeof basics.title === "string" ? basics.title : "",
        summary: typeof basics.summary === "string" ? basics.summary : "",
        contact:
          typeof basics.contact === "string" && basics.contact.trim()
            ? basics.contact
            : undefined,
      },
      experience: experience.map((exp) => {
        const e = exp && typeof exp === "object" ? (exp as Record<string, unknown>) : {};
        return {
          company: typeof e.company === "string" ? e.company : "",
          role: typeof e.role === "string" ? e.role : "",
          duration: typeof e.duration === "string" ? e.duration : "",
          bullets: Array.isArray(e.bullets) ? (e.bullets as string[]) : [],
        };
      }),
      skills: skills.map((s) => (typeof s === "string" ? s : String(s))),
      education: education.map((edu) => {
        const ed = edu && typeof edu === "object" ? (edu as Record<string, unknown>) : {};
        return {
          institution: typeof ed.institution === "string" ? ed.institution : "",
          degree: typeof ed.degree === "string" ? ed.degree : "",
          year: typeof ed.year === "string" ? ed.year : "",
        };
      }),
    };
  } catch {
    return null;
  }
}
