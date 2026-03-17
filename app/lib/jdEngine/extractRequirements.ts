import { normalizeText } from "./normalize";

const API_URL = "https://api.anthropic.com/v1/messages";
// Use a concrete, widely-available Anthropic model name by default.
// You can override this via ANTHROPIC_MODEL in .env.local if your account uses a different ID.
const MODEL = process.env.ANTHROPIC_MODEL || "claude-3-haiku-20240307";

export type JDCategories = {
  technical_skills: string[];
  tools_technologies: string[];
  certifications: string[];
  domain_expertise: string[];
  explicit_soft_skills: string[];
};

const EMPTY_CATEGORIES: JDCategories = {
  technical_skills: [],
  tools_technologies: [],
  certifications: [],
  domain_expertise: [],
  explicit_soft_skills: [],
};

function buildFallbackCategories(jdText: string): JDCategories {
  // Deterministic, conservative extractor for when LLM is unavailable.
  // Focus on "Required Skills", "Experience", and similar sections, and
  // capture short capability phrases instead of every word.
  const lines = jdText.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (!lines.length) return EMPTY_CATEGORIES;

  const capabilityPhrases: string[] = [];

  let inSkillsBlock = false;
  for (const line of lines) {
    const lower = line.toLowerCase();

    if (
      lower.startsWith("required skills") ||
      lower.startsWith("required skills & experience") ||
      lower.startsWith("required experience") ||
      lower.startsWith("required qualifications")
    ) {
      inSkillsBlock = true;
      continue;
    }

    if (lower.startsWith("preferred qualifications") || lower.startsWith("preferred skills")) {
      inSkillsBlock = true;
      continue;
    }

    if (lower.startsWith("key performance indicators") || lower.startsWith("kpis")) {
      // End of the requirements block
      inSkillsBlock = false;
    }

    if (!inSkillsBlock) continue;

    // Example: "Leadership Experience: Demonstrated success in leading..."
    const [headingPart] = line.split(".", 1);
    const [maybeLabel] = headingPart.split(":", 1);
    const label = maybeLabel.trim();
    if (!label) continue;

    const normalizedLabel = normalizeText(label);
    if (!normalizedLabel) continue;

    capabilityPhrases.push(normalizedLabel);
  }

  if (!capabilityPhrases.length) return EMPTY_CATEGORIES;

  const domain_expertise: string[] = [];
  const explicit_soft_skills: string[] = [];

  const softSkillIndicators = ["leadership", "management", "communication", "presentation", "mindset", "orientation", "stakeholder", "consulting"];

  for (const phrase of capabilityPhrases) {
    if (!phrase) continue;
    if (softSkillIndicators.some((s) => phrase.includes(s))) {
      explicit_soft_skills.push(phrase);
    } else {
      domain_expertise.push(phrase);
    }
  }

  if (
    !domain_expertise.length &&
    !explicit_soft_skills.length
  ) {
    return EMPTY_CATEGORIES;
  }

  return {
    technical_skills: [],
    tools_technologies: [],
    certifications: [],
    domain_expertise,
    explicit_soft_skills,
  };
}

export async function extractRequirementsFromJD(
  jdText: string
): Promise<JDCategories> {
  const trimmed = jdText?.trim();
  if (!trimmed) return EMPTY_CATEGORIES;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    // No key available in this environment – log once and fall back.
    console.warn("[jdEngine] ANTHROPIC_API_KEY is not set – using fallback JD extractor.");
    // Fallback to a simple deterministic extractor if no API key
    return buildFallbackCategories(jdText);
  }

  const system =
    "You are a strict job description parser. You only return JSON. You never add commentary.";

  const userPrompt = `
You are a strict job description parser.

Extract ONLY concrete, explicitly mentioned requirements from the job description below.

Categorize into the following arrays:
- technical_skills
- tools_technologies
- certifications
- domain_expertise
- explicit_soft_skills

 Rules:
- Do NOT infer or guess tools/technologies that are not mentioned.
- Do NOT expand acronyms.
- Do NOT assume leadership or seniority if not explicitly stated.
- Exclude cultural statements and generic company descriptions.
- Whenever the job description lists REQUIRED capabilities (not just nice-to-have traits),
  TREAT them as skills. This applies to all role types (e.g. IC, manager, director, VP, C-level).
  Examples of capability-style requirements that SHOULD be captured:
  - ownership of a function, domain, or account
  - leadership of teams or programs
  - stakeholder or client management
  - consulting skills or "consulting mindset"
  - storytelling with data or executive communication
  - innovation, growth, or transformation responsibilities
- Map these to:
  - domain_expertise when they describe business/industry/functional expertise or ownership.
  - explicit_soft_skills when they describe leadership, communication, consulting, or influence.
- Exclude only very generic personality descriptors like "hard working", "self starter",
  "team player" when they are not framed as concrete responsibilities or requirements.
- Remove duplicates.
- Keep phrases concise.
- Preserve original wording where possible.

Return strictly valid JSON with this exact shape:
{
  "technical_skills": [],
  "tools_technologies": [],
  "certifications": [],
  "domain_expertise": [],
  "explicit_soft_skills": []
}

Do not include any explanation or additional keys.

JOB DESCRIPTION:
"""${jdText}"""
`.trim();

  try {
    const body = {
      model: MODEL,
      max_tokens: 1024,
      temperature: 0,
      top_p: 1,
      system,
      messages: [{ role: "user" as const, content: userPrompt }],
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
      const errorText = await response.text().catch(() => "");
      console.error(
        "[jdEngine] Anthropic JD extraction request failed",
        JSON.stringify({
          status: response.status,
          statusText: response.statusText,
          bodySnippet: errorText.slice(0, 300),
        })
      );
      return buildFallbackCategories(jdText);
    }

    const data = (await response.json()) as {
      content?: { type: string; text?: string }[];
    };

    const textBlock = data.content?.find((c) => c.type === "text");
    const rawText = (typeof textBlock?.text === "string" ? textBlock.text : "")?.trim() ?? "";

    const parsed = safeParseCategories(rawText);
    if (!parsed) {
      console.error("[jdEngine] Failed to parse Anthropic JD categories JSON. Raw text snippet:", rawText.slice(0, 300));
      return buildFallbackCategories(jdText);
    }

    const normalized = normalizeCategories(parsed);
    const hasAny =
      normalized.technical_skills.length ||
      normalized.tools_technologies.length ||
      normalized.certifications.length ||
      normalized.domain_expertise.length ||
      normalized.explicit_soft_skills.length;

    if (!hasAny) {
      console.warn("[jdEngine] Anthropic JD extraction returned empty categories – using fallback extractor.");
      return buildFallbackCategories(jdText);
    }

    return normalized;
  } catch {
    console.error("[jdEngine] Anthropic JD extraction threw – using fallback extractor.");
    return buildFallbackCategories(jdText);
  }
}

function extractJson(raw: string): string {
  const mdMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  const str = mdMatch ? mdMatch[1].trim() : raw;
  const start = str.indexOf("{");
  const end = str.lastIndexOf("}") + 1;
  if (start === -1 || end <= start) return raw;
  return str.slice(start, end);
}

function safeParseCategories(text: string): JDCategories | null {
  try {
    const cleaned = extractJson(text);
    const obj = JSON.parse(cleaned) as Partial<JDCategories>;
    return {
      technical_skills: Array.isArray(obj.technical_skills)
        ? obj.technical_skills.filter((v): v is string => typeof v === "string")
        : [],
      tools_technologies: Array.isArray(obj.tools_technologies)
        ? obj.tools_technologies.filter((v): v is string => typeof v === "string")
        : [],
      certifications: Array.isArray(obj.certifications)
        ? obj.certifications.filter((v): v is string => typeof v === "string")
        : [],
      domain_expertise: Array.isArray(obj.domain_expertise)
        ? obj.domain_expertise.filter((v): v is string => typeof v === "string")
        : [],
      explicit_soft_skills: Array.isArray(obj.explicit_soft_skills)
        ? obj.explicit_soft_skills.filter((v): v is string => typeof v === "string")
        : [],
    };
  } catch {
    return null;
  }
}

function normalizeArray(values: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const v of values) {
    const normalized = normalizeText(v);
    if (!normalized) continue;
    if (seen.has(normalized)) continue;
    seen.add(normalized);
    out.push(normalized);
  }
  return out;
}

function normalizeCategories(cats: JDCategories): JDCategories {
  return {
    technical_skills: normalizeArray(cats.technical_skills),
    tools_technologies: normalizeArray(cats.tools_technologies),
    certifications: normalizeArray(cats.certifications),
    domain_expertise: normalizeArray(cats.domain_expertise),
    explicit_soft_skills: normalizeArray(cats.explicit_soft_skills),
  };
}

