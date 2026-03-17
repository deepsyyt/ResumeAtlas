import { NextResponse } from "next/server";
import { createHash } from "crypto";
import type { ATSAnalyzeResult } from "@/app/lib/atsAnalyze";
import { isATSAnalyzeResult } from "@/app/lib/atsAnalyze";
import {
  extractBullets,
  getWeakestBullet,
  isStrongBullet,
} from "@/app/lib/bulletPreview";

const API_URL = "https://api.anthropic.com/v1/messages";

const BULLET_REWRITE_PROMPT = `You are a resume optimization assistant. Rewrite the given resume bullet to be stronger for ATS systems.

Rules:
- Start with a strong action verb (e.g. Developed, Led, Implemented).
- Include measurable impact if possible (%, numbers, scale).
- Include exactly one of the provided missing skills in the rewritten bullet when it fits naturally (e.g. a tool, platform, or method). This shows the candidate can address the gap.
- Never introduce tools or platforms that are not mentioned in either the resume or the job description. If the missing skill is a platform or tool not already present in the resume, incorporate it only in a realistic way that suggests familiarity but does not fabricate past usage.
- Keep a realistic, professional tone.
- Maximum 30 words.
- Output ONLY the rewritten bullet. No quotes, no preamble, no explanation.`;

const SYSTEM_PROMPT = `You are an ATS resume analysis engine. Your task is to evaluate how well a resume matches a job description using ATS-style signals that work across any industry or company job description format (domain-agnostic).

Return ONLY valid JSON. Do not include explanations, markdown, or any text outside the JSON object.

Skill extraction rules:
- Only extract skills that explicitly appear in the job description text.
- Extract concise, meaningful skill phrases (typically 1–3 words) that represent concrete capabilities, technologies, methods, or product domains (e.g. "recommendation systems", "search relevance", "A/B testing", "causal inference").
- Do NOT treat extremely generic standalone words as separate skills (e.g. "search", "ranking", "relevance", "performance", "quality") unless the job description clearly labels them as named skills or disciplines (for example in a "Skills" or "Requirements" list).
- When a generic word appears as part of a more specific phrase, you MUST extract only the specific phrase, not the generic word by itself (e.g. "search relevance" or "search ranking models", not separate "search" and "relevance").
- Do NOT infer tools, frameworks, or platforms that are not written in the JD.
- Do NOT expand the skill list using general knowledge.

Skill verification rules:
- When deciding whether a skill is matched or missing, you MUST check if the skill or a close variation appears in the resume text.
- You MUST consider exact matches, close variations, and clear semantic equivalents when detecting skills. Do not require verbatim string matches when the meaning is clearly the same.
- A skill should be considered matched if it appears: exactly; as a plural/singular form; inside a longer phrase; as part of a compound term; or as a very close semantic paraphrase in the same context.
- Examples: If the JD skill is "dashboards" and the resume contains "monitoring dashboards", treat it as matched. If the JD skill is "CI/CD pipelines" and the resume contains "CI/CD pipeline automation", treat it as matched.
- Treat obvious morphological variants and compounds as matches. Examples:
  - If the JD skill is "ranking" and the resume mentions "reranking strategies", you MUST treat "ranking" as matched.
  - If the JD skill is "recommendation systems" and the resume describes "leading recommendation and personalization projects" that clearly involve recommendation engines, you MUST treat "recommendation systems" as matched.
  - If the JD skill is "search" and the resume mentions "fashion search engine" or "search engine", you MUST treat "search" as matched.
  - If the JD skill is "relevance" and the resume mentions "user-item relevance" or "search relevance", you MUST treat "relevance" as matched.
- Only mark a skill as missing if there is no clear textual evidence of that capability in the resume. Do NOT guess missing skills.
- When a skill is classified as matched, ensure there is direct textual evidence in the resume. Prefer exact or near-exact phrase matches from the resume rather than inferred abilities.

Resume scanning rules:
- You MUST scan the entire resume body, including all of the following areas, not just any dedicated "Skills" section:
  - Headline, title, and professional summary/profile sections.
  - All section headings and sub-headings (e.g. "End-to-End AI Product Management:", "Cross-functional Collaboration:", "Search & Ranking Experience").
  - Experience bullets, responsibilities, and impact statements.
  - Project titles and project descriptions (including "Project 1:", "Case Study:", "Selected Projects" sections).
  - Tools/technologies lists, skills sections, and certifications where skills and domains are often summarized.
- Treat a skill as matched if it is clearly described anywhere in the resume, including inside headings or labels (e.g. "Cross-functional Collaboration:"), even if it appears only as part of a longer sentence or bullet.
- When checking for a JD skill, look for close semantic equivalents, abbreviations, and common paraphrases that appear in any of these sections of a modern resume.
- Examples:
  - If the JD skill is "A/B testing" and the resume mentions "A/B tests", "AB testing", or "split testing experiments" in any bullet, this MUST be treated as matched.
  - If the JD skill is "experimentation" and the resume mentions "designed and ran A/B tests to optimize conversion rate", you MUST treat "experimentation" as matched because the bullet clearly describes experimentation work.

Section classification rules:
- Use robust, section-aware rules so required vs preferred skills are classified consistently across any JD format.
- Skills mentioned under "Responsibility", "Responsibilities", "What you'll do", "Job Skills Required", or the core role description MUST be treated as REQUIRED skills.
- Skills mentioned under "Requirements", "Must have", or generic "Skills" sections MUST be treated as REQUIRED skills.
- Skills mentioned under "Desired Qualifications", "Preferred", "Nice-to-have", "Good to have", "Bonus", or "Plus" MUST be treated as PREFERRED skills.
- If section headers exist, prioritize section-based classification over individual wording in the sentences.
- If the section is unclear, mixed, or not explicitly labeled, you MUST default to treating the skill as REQUIRED.

Evaluate the following metrics (each 0-100):
1. ats_score – overall probability the resume passes ATS
2. keyword_coverage – must be calculated as: round((number of matched_skills ÷ total JD skills) × 100). Total JD skills = count of distinct skill phrases you extracted from the JD. If there are zero JD skills, set keyword_coverage to 100.
3. semantic_similarity – how closely the experience matches the role context
4. experience_alignment – compare required years vs resume years (0-100). If the JD does not specify years of experience, set experience_alignment to 80 (neutral) and set required_years_experience to null.
5. impact_score – based on quantified achievements (%, $, growth, etc.)
6. resume_quality – structure, bullet points, clarity

For experience alignment you MUST also output:
- required_years_experience: number or null. Extract the minimum years of experience required from the job description (e.g. "5+ years" -> 5, "3-7 years" -> 3). If the JD does not mention years of experience at all, use null.
- resume_years_experience: number. Estimate total relevant years of experience from the resume (based on job dates and roles). Use a number (e.g. 7), not a range.

Also extract:
- matched_skills: array of skill phrases from the JD that appear in the resume (with direct textual evidence as above)
- missing_skills: array of skill phrases from the JD that do NOT appear in the resume (combined list). Do not include skills that have any clear textual evidence in the resume.
- missing_skills_required: array of missing skill phrases that the JD explicitly marks as required, must-have, or essential
- missing_skills_preferred: array of missing skill phrases that the JD marks as preferred, nice-to-have, or bonus. If the JD does not distinguish required vs preferred, leave this empty and put all missing skills in missing_skills_required.
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
  "missing_skills_required": [],
  "missing_skills_preferred": [],
  "summary": "string"
}`;

const ANALYZE_CACHE_VERSION = "v2-ats-prompt-2026-03-17";

/** Normalize string for stable cache key: same logical content => same hash. */
function normalizeForCacheKey(s: string): string {
  return s
    .replace(/\r\n?/g, "\n")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

/** SHA-256 hash of (cache version + prompt + resume + JD) so same logical inputs reuse results, but prompt changes invalidate old cache. */
function hashInput(resumeText: string, jobDescription: string): string {
  const combined =
    ANALYZE_CACHE_VERSION +
    "\nSYSTEM_PROMPT:\n" +
    SYSTEM_PROMPT +
    "\nRESUME:\n" +
    normalizeForCacheKey(resumeText) +
    "\n---\nJD:\n" +
    normalizeForCacheKey(jobDescription);
  return createHash("sha256").update(combined, "utf8").digest("hex");
}

/** In-memory cache: hash(resume+jd) -> ATSAnalyzeResult. Same resume+jd returns cached result. */
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
    console.log("[analyze] cache hit for key", key);
      // Return a deep clone so the cache is never mutated and client gets exact cached metrics
      // (including missing_skills, missing_skills_required, missing_skills_preferred).
      const out: ATSAnalyzeResult = {
        ...cached,
        required_years_experience: cached.required_years_experience ?? null,
        resume_years_experience: cached.resume_years_experience ?? 0,
        matched_skills: [...(cached.matched_skills ?? [])],
        missing_skills: [...(cached.missing_skills ?? [])],
        missing_skills_required: cached.missing_skills_required
          ? [...cached.missing_skills_required]
          : undefined,
        missing_skills_preferred: cached.missing_skills_preferred
          ? [...cached.missing_skills_preferred]
          : undefined,
        bullet_preview: cached.bullet_preview
          ? {
              before: cached.bullet_preview.before,
              after: cached.bullet_preview.after,
            }
          : cached.bullet_preview ?? null,
        bullet_preview_skip: cached.bullet_preview_skip,
      };
      return NextResponse.json(out);
    }

    console.log("[analyze] cache miss for key", key);

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
        temperature: 0,
        top_p: 1,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user" as const, content: userContent }],
      }),
    });

    const responseText = await response.text();
    if (!response.ok) {
      console.error("[analyze] Anthropic error", response.status, responseText.slice(0, 300));
      const friendly =
        response.status === 529
          ? "Our analysis service is temporarily overloaded. Please try again in a minute."
          : "Our analysis service is temporarily unavailable. Please try again shortly.";
      return NextResponse.json({ error: friendly }, { status: 502 });
    }

    let data: { content?: unknown };
    try {
      data = JSON.parse(responseText) as { content?: unknown };
    } catch {
      console.error("[analyze] Anthropic response not JSON", responseText.slice(0, 200));
      return NextResponse.json(
        { error: "Analysis service returned invalid response" },
        { status: 502 }
      );
    }
    const content = Array.isArray(data.content) ? data.content : [];
    const text = (content.find((c: { type?: string; text?: string }) => c?.type === "text") as { text?: string } | undefined)?.text?.trim() ?? "";
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

    const missingSkills = Array.isArray(result.missing_skills) ? result.missing_skills : [];
    const missingRequired = Array.isArray((result as Record<string, unknown>).missing_skills_required)
      ? ((result as Record<string, unknown>).missing_skills_required as string[])
      : [];
    const missingPreferred = Array.isArray((result as Record<string, unknown>).missing_skills_preferred)
      ? ((result as Record<string, unknown>).missing_skills_preferred as string[])
      : [];
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
      missing_skills: missingSkills,
      missing_skills_required: missingRequired.length > 0 || missingPreferred.length > 0 ? missingRequired : undefined,
      missing_skills_preferred: missingPreferred.length > 0 ? missingPreferred : undefined,
      summary: typeof result.summary === "string" ? result.summary : "",
    };

    // Generate bullet preview in same request (1 API call for client)
    const bullets = extractBullets(resumeText);
    const beforeBullet = getWeakestBullet(bullets);
    if (!beforeBullet?.trim()) {
      normalized.bullet_preview_skip = "no_bullets";
    } else if (isStrongBullet(beforeBullet)) {
      normalized.bullet_preview_skip = "already_strong";
    } else {
      try {
        const skillsForRewrite = missingRequired.length > 0 ? missingRequired : missingSkills;
        const keywordHint =
          skillsForRewrite.length > 0
            ? `MISSING SKILLS (include exactly one of these in the rewritten bullet where it fits naturally): ${skillsForRewrite.slice(0, 10).join(", ")}.`
            : "";
        const bulletUserContent = `JOB DESCRIPTION (for context):
${jobDescription.slice(0, 1500)}

${keywordHint}

BULLET TO REWRITE:
${beforeBullet}

Output only the rewritten bullet, nothing else.`;
        const bulletRes = await fetch(API_URL, {
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
            system: BULLET_REWRITE_PROMPT,
            messages: [{ role: "user" as const, content: bulletUserContent }],
          }),
        });
        if (bulletRes.ok) {
          const bulletData = (await bulletRes.json()) as { content?: unknown };
          const bulletContent = Array.isArray(bulletData.content) ? bulletData.content : [];
          const rawAfter = (bulletContent.find((c: { type?: string; text?: string }) => c?.type === "text") as { text?: string } | undefined)?.text?.trim() ?? "";
          const after = rawAfter.replace(/^["']|["']$/g, "").trim() || beforeBullet;
          normalized.bullet_preview = { before: beforeBullet, after };
        }
      } catch (e) {
        console.warn("[analyze] bullet preview failed", e);
      }
    }

    analysisCache.set(key, normalized);
    return NextResponse.json(normalized);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Analysis failed";
    const detail = err instanceof Error ? err.stack : String(err);
    console.error("[analyze] 500", message, detail);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
