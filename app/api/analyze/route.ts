import { NextResponse } from "next/server";
import { createHash } from "crypto";
import type { ATSAnalyzeResult } from "@/app/lib/atsAnalyze";
import { isATSAnalyzeResult } from "@/app/lib/atsAnalyze";

const API_URL = "https://api.anthropic.com/v1/messages";

const SYSTEM_PROMPT = `You are an ATS resume analysis engine. Your task is to evaluate how well a resume matches a job description using ATS-style signals.

Return ONLY valid JSON. Do not include explanations, markdown, or any text outside the JSON object.

Evaluate the following metrics (each 0-100):
1. ats_score – overall probability the resume passes ATS
2. keyword_coverage – % of JD skills present in the resume
3. semantic_similarity – how closely the experience matches the role context
4. experience_alignment – compare required years vs resume years (0-100). If the JD does not specify years of experience, set experience_alignment to 80 (neutral) and set required_years_experience to null.
5. impact_score – based on quantified achievements (%, $, growth, etc.)
6. resume_quality – structure, bullet points, clarity

For experience alignment you MUST also output:
- required_years_experience: number or null. Extract the minimum years of experience required from the job description (e.g. "5+ years" -> 5, "3-7 years" -> 3). If the JD does not mention years of experience at all, use null.
- resume_years_experience: number. Estimate total relevant years of experience from the resume (based on job dates and roles). Use a number (e.g. 7), not a range.

Also extract:
- matched_skills: array of skill phrases from the JD that appear in the resume
- missing_skills: array of skill phrases from the JD that are missing or weak in the resume
- summary: one short sentence summarizing the match. If years of experience are not mentioned in the JD, include in the summary that experience requirements are not specified in the job description.

Output format (no other keys):
{
  "ats_score": number,
  "keyword_coverage": number,
  "semantic_similarity": number,
  "experience_alignment": number,
  "required_years_experience": number or null,
  "resume_years_experience": number,
  "impact_score": number,
  "resume_quality": number,
  "matched_skills": [],
  "missing_skills": [],
  "summary": "string"
}`;

function hashInput(resumeText: string, jobDescription: string): string {
  const combined = resumeText.trim() + "\n---\n" + jobDescription.trim();
  return createHash("sha256").update(combined, "utf8").digest("hex");
}

const analysisCache = new Map<string, ATSAnalyzeResult>();

function extractJson(raw: string): string {
  const mdMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  const str = mdMatch ? mdMatch[1].trim() : raw;
  const start = str.indexOf("{");
  const end = str.lastIndexOf("}") + 1;
  if (start === -1 || end <= start) return raw;
  return str.slice(start, end);
}

export type AnalyzeRequestBody = {
  resumeText: string;
  jobDescription: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AnalyzeRequestBody;
    const resumeText = body?.resumeText;
    const jobDescription = body?.jobDescription;

    if (typeof resumeText !== "string" || typeof jobDescription !== "string") {
      return NextResponse.json(
        { error: "resumeText and jobDescription (strings) are required" },
        { status: 400 }
      );
    }

    const key = hashInput(resumeText, jobDescription);
    const cached = analysisCache.get(key);
    if (cached) {
      // Ensure legacy cache entries have experience fields for the UI
      const out: ATSAnalyzeResult = {
        ...cached,
        required_years_experience:
          cached.required_years_experience ?? null,
        resume_years_experience: cached.resume_years_experience ?? 0,
      };
      return NextResponse.json(out);
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    const model =
      process.env.ANTHROPIC_MODEL?.trim() || "claude-3-haiku-20240307";

    if (!apiKey) {
      return NextResponse.json(
        { error: "ATS analysis is not configured" },
        { status: 503 }
      );
    }

    const userContent = `RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}`;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user" as const, content: userContent }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("[analyze] Anthropic error", response.status, errText.slice(0, 300));
      return NextResponse.json(
        { error: "Analysis service failed" },
        { status: 502 }
      );
    }

    const data = (await response.json()) as { content?: { type: string; text?: string }[] };
    const text = data.content?.find((c) => c.type === "text")?.text?.trim() ?? "";
    const jsonStr = extractJson(text);
    let result: unknown;
    try {
      result = JSON.parse(jsonStr);
    } catch {
      console.error("[analyze] Invalid JSON from LLM", text.slice(0, 400));
      return NextResponse.json(
        { error: "Analysis returned invalid format" },
        { status: 502 }
      );
    }

    if (!isATSAnalyzeResult(result)) {
      return NextResponse.json(
        { error: "Analysis missing required fields" },
        { status: 502 }
      );
    }

    const requiredYears =
      result.required_years_experience === null ||
      typeof result.required_years_experience !== "number"
        ? null
        : Math.max(0, Math.round(result.required_years_experience));
    const resumeYears =
      typeof result.resume_years_experience === "number"
        ? Math.max(0, Math.round(result.resume_years_experience))
        : 0;

    const normalized: ATSAnalyzeResult = {
      ats_score: Math.max(0, Math.min(100, Math.round(result.ats_score))),
      keyword_coverage: Math.max(0, Math.min(100, Math.round(result.keyword_coverage))),
      semantic_similarity: Math.max(0, Math.min(100, Math.round(result.semantic_similarity))),
      experience_alignment: Math.max(0, Math.min(100, Math.round(result.experience_alignment))),
      required_years_experience: requiredYears,
      resume_years_experience: resumeYears,
      impact_score: Math.max(0, Math.min(100, Math.round(result.impact_score))),
      resume_quality: Math.max(0, Math.min(100, Math.round(result.resume_quality))),
      matched_skills: Array.isArray(result.matched_skills) ? result.matched_skills : [],
      missing_skills: Array.isArray(result.missing_skills) ? result.missing_skills : [],
      summary: typeof result.summary === "string" ? result.summary : "",
    };

    analysisCache.set(key, normalized);
    return NextResponse.json(normalized);
  } catch (err) {
    console.error("[analyze]", err);
    const message = err instanceof Error ? err.message : "Analysis failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
