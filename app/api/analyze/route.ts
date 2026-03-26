import { NextResponse } from "next/server";
import type { ATSAnalyzeResult } from "@/app/lib/atsAnalyze";
import { isATSAnalyzeResult } from "@/app/lib/atsAnalyze";
import { repairSkillListsAgainstResume } from "@/app/lib/skillResumeEvidence";
import {
  clipToWordLimit,
  JOB_DESCRIPTION_MAX_WORDS,
  RESUME_TEXT_MAX_WORDS,
} from "@/app/lib/inputWordLimits";
import {
  assertAnalysisQuotaOrThrow,
  recordSuccessfulAnalysis,
  resolveAnalysisActor,
  type QuotaExceededPayload,
} from "@/app/lib/quota";
import { getAnalysisQuotaStatus } from "@/app/lib/quota/store";
import {
  buildAnalysisCacheKey,
  getCachedAnalysisResult,
  setCachedAnalysisResult,
} from "@/app/lib/analysisResultCache";

const API_URL = "https://api.anthropic.com/v1/messages";

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
  - If the JD skill is "recommendation systems" and the resume says "Recommendation & Personalization Projects", "recommendation and personalization", or "Led Recommendation & Personalization" in a project title or bullet, you MUST treat "recommendation systems" as matched.
  - Treat "A/b", "a/b", and "A/B" as the same for A/B testing; do not require a dedicated Skills section.

Self-check before output:
- Re-read the full resume (including "Project 1:", case studies, and headings). If any phrase in matched_skills or missing_skills appears anywhere in that text under a clear variation, move it to matched_skills and remove it from missing_skills, missing_skills_required, and missing_skills_preferred.

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
4. experience_alignment – compare required years vs resume years (0-100). If the JD does not specify years of experience, set experience_alignment to 80 (neutral) and set required_years_experience and required_years_experience_max to null.
5. impact_score – based on quantified achievements (%, $, growth, etc.)
6. resume_quality – structure, bullet points, clarity

For experience alignment you MUST also output:
- required_years_experience: number or null. Lower bound from the JD. Examples: "5+ years" or "at least 5 years" -> 5. For an explicit range "10-15 years" or "10 to 15 years of experience" -> 10. If the JD does not mention years of experience at all, use null.
- required_years_experience_max: number or null. Upper bound ONLY when the JD states a clear range (e.g. "10-15 years" -> 15, "3 to 7 years" -> 7). For a minimum only ("5+", "minimum 8 years", no upper cap), use null. If required_years_experience is null, this MUST be null.
- resume_years_experience: number. Estimate total relevant years of experience from the resume (based on job dates and roles). Use a number (e.g. 7), not a range.
- For experience_alignment scoring with a range: treat resume years within [required_years_experience, required_years_experience_max] as a strong match; below the range lower the score appropriately; above the max can remain high (candidate exceeds the stated range).

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
  "required_years_experience_max": number or null,
  "resume_years_experience": number,
  "impact_score": number,
  "resume_quality": number,
  "matched_skills": [],
  "missing_skills": [],
  "missing_skills_required": [],
  "missing_skills_preferred": [],
  "summary": "string"
}`;

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
  let actor: Awaited<ReturnType<typeof assertAnalysisQuotaOrThrow>>["actor"] | null = null;
  let quotaStatusBefore: Awaited<ReturnType<typeof assertAnalysisQuotaOrThrow>>["status"] | null = null;

  try {
    const body = (await request.json()) as AnalyzeRequestBody;
    let resumeText = body?.resumeText;
    let jobDescription = body?.jobDescription;

    if (typeof resumeText !== "string" || typeof jobDescription !== "string") {
      return NextResponse.json(
        { error: "resumeText and jobDescription (strings) are required" },
        { status: 400 }
      );
    }

    resumeText = clipToWordLimit(resumeText, RESUME_TEXT_MAX_WORDS);
    jobDescription = clipToWordLimit(jobDescription, JOB_DESCRIPTION_MAX_WORDS);

    const model =
      process.env.ANTHROPIC_MODEL?.trim() || "claude-3-haiku-20240307";
    const cacheKey = buildAnalysisCacheKey(resumeText, jobDescription, model);

    const cached = await getCachedAnalysisResult(cacheKey);
    if (cached) {
      // Even if we reuse the cached ATS result, the user clicked "Analyze" and
      // should still consume a scan against the free/purchased quota.
      try {
        const resolved = await assertAnalysisQuotaOrThrow(request);
        actor = resolved.actor;
        quotaStatusBefore = resolved.status;
      } catch (quotaErr) {
        const payload = (quotaErr as Error & { quotaPayload?: QuotaExceededPayload }).quotaPayload;
        if (payload) {
          return NextResponse.json({ error: payload }, { status: 429 });
        }
        throw quotaErr;
      }

      let usageRecorded = false;
      if (actor) {
        try {
          await recordSuccessfulAnalysis(actor, resumeText, jobDescription);
          usageRecorded = true;
        } catch (recErr) {
          const msg = recErr instanceof Error ? recErr.message : String(recErr);
          console.error("[analyze] usage record failed (cache still returned result)", msg);
        }
      }

      const quotaAfter =
        quotaStatusBefore && usageRecorded
          ? {
              remaining: Math.max(0, quotaStatusBefore.remaining - 1),
              used: quotaStatusBefore.used + 1,
              limit: quotaStatusBefore.limit,
              scope: quotaStatusBefore.scope,
            }
          : quotaStatusBefore
            ? {
                remaining: quotaStatusBefore.remaining,
                used: quotaStatusBefore.used,
                limit: quotaStatusBefore.limit,
                scope: quotaStatusBefore.scope,
              }
            : undefined;

      return NextResponse.json({
        ...cached,
        ...(quotaAfter && { quota: quotaAfter }),
      });
    }

    try {
      const resolved = await assertAnalysisQuotaOrThrow(request);
      actor = resolved.actor;
      quotaStatusBefore = resolved.status;
    } catch (quotaErr) {
      const payload = (quotaErr as Error & { quotaPayload?: QuotaExceededPayload }).quotaPayload;
      if (payload) {
        return NextResponse.json({ error: payload }, { status: 429 });
      }
      throw quotaErr;
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;

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
    const rawMax = (result as Record<string, unknown>).required_years_experience_max;
    let requiredYearsMax: number | null =
      requiredYears === null ||
      rawMax === null ||
      rawMax === undefined ||
      typeof rawMax !== "number"
        ? null
        : Math.max(0, Math.round(rawMax));
    if (
      requiredYears !== null &&
      requiredYearsMax !== null &&
      requiredYearsMax < requiredYears
    ) {
      requiredYearsMax = null;
    }
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

    const matchedIn = Array.isArray(result.matched_skills) ? result.matched_skills : [];
    const repaired = repairSkillListsAgainstResume(
      resumeText,
      matchedIn,
      missingSkills,
      missingRequired,
      missingPreferred,
      typeof result.keyword_coverage === "number" ? result.keyword_coverage : undefined
    );
    const missingSkillsAfter = repaired.missing_skills;
    const missingRequiredAfter = repaired.missing_skills_required ?? [];
    const missingPreferredAfter = repaired.missing_skills_preferred ?? [];

    const normalized: ATSAnalyzeResult = {
      ats_score: Math.max(0, Math.min(100, Math.round(result.ats_score))),
      keyword_coverage: repaired.keyword_coverage,
      semantic_similarity: Math.max(0, Math.min(100, Math.round(result.semantic_similarity))),
      experience_alignment: Math.max(0, Math.min(100, Math.round(result.experience_alignment))),
      required_years_experience: requiredYears,
      required_years_experience_max: requiredYearsMax,
      resume_years_experience: resumeYears,
      impact_score: Math.max(0, Math.min(100, Math.round(result.impact_score))),
      resume_quality: Math.max(0, Math.min(100, Math.round(result.resume_quality))),
      matched_skills: repaired.matched_skills,
      missing_skills: missingSkillsAfter,
      missing_skills_required:
        missingRequiredAfter.length > 0 || missingPreferredAfter.length > 0
          ? missingRequiredAfter
          : undefined,
      missing_skills_preferred: missingPreferredAfter.length > 0 ? missingPreferredAfter : undefined,
      summary: typeof result.summary === "string" ? result.summary : "",
    };

    await setCachedAnalysisResult(cacheKey, normalized);

    let usageRecorded = false;
    if (actor) {
      try {
        await recordSuccessfulAnalysis(actor, resumeText, jobDescription);
        usageRecorded = true;
      } catch (recErr) {
        const msg = recErr instanceof Error ? recErr.message : String(recErr);
        const hint = /analysis_usage|relation.*does not exist|permission denied/i.test(msg)
          ? " Ensure analysis_usage table exists (run supabase/migrations/005_ensure_billing_tables.sql)."
          : "";
        console.error("[analyze] usage record failed (analysis still returned)", msg, hint);
      }
    }

    const quotaAfter =
      quotaStatusBefore && usageRecorded
        ? {
            remaining: Math.max(0, quotaStatusBefore.remaining - 1),
            used: quotaStatusBefore.used + 1,
            limit: quotaStatusBefore.limit,
            scope: quotaStatusBefore.scope,
          }
        : quotaStatusBefore
          ? {
              remaining: quotaStatusBefore.remaining,
              used: quotaStatusBefore.used,
              limit: quotaStatusBefore.limit,
              scope: quotaStatusBefore.scope,
            }
          : undefined;

    return NextResponse.json({
      ...normalized,
      ...(quotaAfter && { quota: quotaAfter }),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Analysis failed";
    const detail = err instanceof Error ? err.stack : String(err);
    console.error("[analyze] 500", message, detail);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
