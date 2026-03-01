const API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = process.env.ANTHROPIC_MODEL || "claude-haiku-4-5-20251001";

export type ReoptimizeInput = {
  summary: string;
  jobDescription: string;
  roleLevel: string;
};

export async function reoptimizeSummary(input: ReoptimizeInput): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not set");

  const system = `You are an ATS resume expert. Rewrite the given professional summary to better align with the job description and role level.
Use strong action verbs, measurable impact where possible, and no first-person pronouns.
Return ONLY the rewritten summary text. No preamble, no explanation, no markdown.`;

  const user = `Role level: ${input.roleLevel}

Current summary:
${input.summary}

Job description:
${input.jobDescription}

Rewrite the summary to be stronger for this role. Output only the new summary.`;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1024,
      system,
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
    throw new Error(`Reoptimize failed (${response.status}): ${detail}`);
  }

  const data = (await response.json()) as { content?: { type: string; text?: string }[] };
  const text = data.content?.find((c) => c.type === "text")?.text?.trim() ?? "";
  return text || input.summary;
}
