import { NextResponse } from "next/server";
import { extractBullets, getWeakestBullet, isStrongBullet } from "@/app/lib/bulletPreview";

const API_URL = "https://api.anthropic.com/v1/messages";

const SYSTEM_PROMPT = `You are a resume optimization assistant. Rewrite the given resume bullet to be stronger for ATS systems.

Rules:
- Start with a strong action verb (e.g. Developed, Led, Implemented).
- Include measurable impact if possible (%, numbers, scale).
- Weave in 1–2 relevant keywords from the job context if they fit naturally.
- Keep a realistic, professional tone.
- Maximum 25 words.
- Output ONLY the rewritten bullet. No quotes, no preamble, no explanation.`;

export type BulletPreviewRequestBody = {
  resumeText: string;
  jobDescription: string;
  missingSkills?: string[];
};

export type BulletPreviewResponse = {
  before: string;
  after: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BulletPreviewRequestBody;
    const resumeText = body?.resumeText;
    const jobDescription = body?.jobDescription;
    const missingSkills = body?.missingSkills ?? [];

    if (typeof resumeText !== "string" || typeof jobDescription !== "string") {
      return NextResponse.json(
        { error: "resumeText and jobDescription are required" },
        { status: 400 }
      );
    }

    const bullets = extractBullets(resumeText);
    const before = getWeakestBullet(bullets) ?? bullets[0] ?? null;

    if (!before || !before.trim()) {
      return NextResponse.json(
        { error: "No suitable bullet found in resume" },
        { status: 400 }
      );
    }

    if (isStrongBullet(before)) {
      return NextResponse.json(
        { skip: "already_strong", message: "Bullet already has strong quantified achievements." },
        { status: 200 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    const model = process.env.ANTHROPIC_MODEL?.trim() || "claude-3-haiku-20240307";

    if (!apiKey) {
      return NextResponse.json(
        { error: "Optimization service not configured" },
        { status: 503 }
      );
    }

    const keywordHint =
      missingSkills.length > 0
        ? `Relevant keywords to consider (use only if they fit naturally): ${missingSkills.slice(0, 8).join(", ")}.`
        : "";

    const userContent = `JOB DESCRIPTION (for context):
${jobDescription.slice(0, 1500)}

${keywordHint}

BULLET TO REWRITE:
${before}

Output only the rewritten bullet, nothing else.`;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        max_tokens: 120,
        temperature: 0,
        top_p: 1,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user" as const, content: userContent }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("[bullet-preview] Anthropic error", response.status, errText.slice(0, 200));
      return NextResponse.json(
        { error: "Optimization service failed" },
        { status: 502 }
      );
    }

    const data = (await response.json()) as { content?: { type: string; text?: string }[] };
    const rawAfter = data.content?.find((c) => c.type === "text")?.text?.trim() ?? "";
    const after = rawAfter.replace(/^["']|["']$/g, "").trim() || before;

    const result: BulletPreviewResponse = { before, after };
    return NextResponse.json(result);
  } catch (err) {
    console.error("[bullet-preview]", err);
    const message = err instanceof Error ? err.message : "Preview failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
