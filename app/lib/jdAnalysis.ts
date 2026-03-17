const API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = process.env.ANTHROPIC_MODEL || "claude-haiku-4-5-20251001";

export type JDAnalysisResult = {
  coreSkills: string[];
  coreCompetencies: string[];
  leadershipExpectations: string[];
  businessOutcomes: string[];
};

const SCHEMA = `
{
  "coreSkills": ["string"],
  "coreCompetencies": ["string"],
  "leadershipExpectations": ["string"],
  "businessOutcomes": ["string"]
}
`;

const SYSTEM = `You are a job description analyst. Extract structured competencies from the job description.
Return ONLY valid JSON matching the schema. No explanation. No markdown. No extra text.`;

export async function analyzeJD(jobDescription: string): Promise<JDAnalysisResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not set");

  const user = `Extract from this job description and return ONLY a JSON object with these exact keys (arrays of strings):
${SCHEMA}

Job description:
${jobDescription}`;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 2048,
      temperature: 0,
      top_p: 1,
      system: SYSTEM,
      messages: [{ role: "user" as const, content: user }],
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    let detail = errText;
    try {
      const j = JSON.parse(errText) as { error?: { message?: string }; message?: string };
      detail = j?.error?.message ?? j?.message ?? errText;
    } catch {
      /* use errText */
    }
    throw new Error(`JD analysis failed (${response.status}): ${detail}`);
  }

  const data = (await response.json()) as { content?: { type: string; text?: string }[] };
  const text = data.content?.find((c) => c.type === "text")?.text?.trim() ?? "";
  const raw = extractJson(text);
  try {
    const obj = JSON.parse(raw) as Record<string, unknown>;
    return {
      coreSkills: Array.isArray(obj.coreSkills) ? (obj.coreSkills as string[]) : [],
      coreCompetencies: Array.isArray(obj.coreCompetencies) ? (obj.coreCompetencies as string[]) : [],
      leadershipExpectations: Array.isArray(obj.leadershipExpectations) ? (obj.leadershipExpectations as string[]) : [],
      businessOutcomes: Array.isArray(obj.businessOutcomes) ? (obj.businessOutcomes as string[]) : [],
    };
  } catch {
    throw new Error("JD analysis returned invalid JSON");
  }
}

function extractJson(raw: string): string {
  const md = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  const str = md ? md[1].trim() : raw;
  const start = str.indexOf("{");
  const end = str.lastIndexOf("}") + 1;
  if (start === -1 || end <= start) return raw;
  return str.slice(start, end);
}
