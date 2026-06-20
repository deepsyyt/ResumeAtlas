import { NextResponse } from "next/server";
import type { ATSAnalyzeResult } from "@/app/lib/atsAnalyze";
import { isAnalyzeLlmPayload } from "@/app/lib/atsAnalyze";
import { repairSkillListsAgainstResume } from "@/app/lib/skillResumeEvidence";
import {
  clipToWordLimit,
  JOB_DESCRIPTION_MAX_WORDS,
  RESUME_TEXT_MAX_WORDS,
} from "@/app/lib/inputWordLimits";
import { SKILL_GAP_LLM_RULES, filterSkillGapPhrases } from "@/app/lib/skillGapRules";
import { buildEvidenceDashboard } from "@/app/lib/resumeEvidenceScore";
import { SKILL_PROOF_VERSION, countKeywordProofCoverage } from "@/app/lib/skillProofLlm";
import { RISK_AREAS_VERSION } from "@/app/lib/riskAreasLlm";
import { APPLICATION_VERDICT_VERSION } from "@/app/lib/applicationVerdictLlm";
import { enrichEvidenceDashboardWithLlm } from "@/app/lib/enrichEvidenceDashboard";
import { normalizeTargetRoleTitle } from "@/app/lib/roleFitArchetypes";
import {
  assertCanRunAnalysisOrThrow,
  commitAnalysisApplication,
  type AnalysisAccess,
  type ApplicationCommitResult,
} from "@/app/lib/billing/funnelAccess";
import type { QuotaExceededPayload } from "@/app/lib/quota";
import { quotaAfterSuccessfulUse } from "@/app/lib/quota/validate";
import {
  buildAnalysisCacheKey,
  getCachedAnalysisResult,
  setCachedAnalysisResult,
} from "@/app/lib/analysisResultCache";
import {
  parseAnthropicErrorType,
  resolveAnthropicModelCandidates,
} from "@/app/lib/anthropicModels";
import {
  ANALYZE_MATCH_SUMMARY_RULE,
  ANALYZE_MATCH_SUMMARY_RULE_RESUME_ONLY,
  clampAnalyzeMatchSummary,
} from "@/app/lib/resumeTypography";

const API_URL = "https://api.anthropic.com/v1/messages";

const SYSTEM_PROMPT = `You are an ATS resume analysis engine. Your task is to evaluate how well a resume matches a job description using ATS-style signals that work across any industry or company job description format (domain-agnostic).

Return ONLY valid JSON. Do not include explanations, markdown, or any text outside the JSON object.

Skill extraction rules:
- Only extract skills that explicitly appear in the job description text.
- Extract concise, meaningful skill phrases (typically 1-3 words) that represent concrete capabilities, technologies, methods, or product domains (e.g. "recommendation systems", "search relevance", "A/B testing", "causal inference").
- ${SKILL_GAP_LLM_RULES}
- Do NOT treat extremely generic standalone words as separate skills (e.g. "search", "ranking", "relevance", "performance", "quality", "fairness") unless the job description clearly labels them as named skills or disciplines (for example in a "Skills" or "Requirements" list).
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
- summary MUST include all three labeled sections ("JD needs:", "Resume shows:", "Match:"); JD and Resume bodies each ≤28 words; at most 3 sentences and ≤110 tokens; shorten JD/resume text before dropping any section.

Section classification rules:
- Use robust, section-aware rules so required vs preferred skills are classified consistently across any JD format.
- Skills mentioned under "Responsibility", "Responsibilities", "What you'll do", "Job Skills Required", or the core role description MUST be treated as REQUIRED skills.
- Skills mentioned under "Requirements", "Must have", or generic "Skills" sections MUST be treated as REQUIRED skills.
- Skills mentioned under "Desired Qualifications", "Preferred", "Nice-to-have", "Good to have", "Bonus", or "Plus" MUST be treated as PREFERRED skills.
- If section headers exist, prioritize section-based classification over individual wording in the sentences.
- If the section is unclear, mixed, or not explicitly labeled, you MUST default to treating the skill as REQUIRED.

Extract years of experience from the job description and resume:
- required_years_experience: number or null. Lower bound from the JD. Examples: "5+ years" or "at least 5 years" -> 5. For an explicit range "10-15 years" or "10 to 15 years of experience" -> 10. If the JD does not mention years of experience at all, use null.
- required_years_experience_max: number or null. Upper bound ONLY when the JD states a clear range (e.g. "10-15 years" -> 15, "3 to 7 years" -> 7). For a minimum only ("5+", "minimum 8 years", no upper cap), use null. If required_years_experience is null, this MUST be null.
- resume_years_experience: number. Estimate total relevant years of experience from the resume (based on job dates and roles). Use a number (e.g. 7), not a range.

Also extract:
- matched_skills: array of skill phrases from the JD that appear in the resume (with direct textual evidence as above)
- missing_skills: array of skill phrases from the JD that do NOT appear in the resume (combined list). Do not include skills that have any clear textual evidence in the resume.
- missing_skills_required: array of missing skill phrases that the JD explicitly marks as required, must-have, or essential
- missing_skills_preferred: array of missing skill phrases that the JD marks as preferred, nice-to-have, or bonus. If the JD does not distinguish required vs preferred, leave this empty and put all missing skills in missing_skills_required.
- ${ANALYZE_MATCH_SUMMARY_RULE}

Output format (no other keys):
{
  "required_years_experience": number or null,
  "required_years_experience_max": number or null,
  "resume_years_experience": number,
  "matched_skills": [],
  "missing_skills": [],
  "missing_skills_required": [],
  "missing_skills_preferred": [],
  "summary": "string"
}`;

/** When no job description is provided: ATS readability, structure, parsing - not JD keyword match. */
const SYSTEM_PROMPT_RESUME_ONLY = `You are an ATS compatibility analyst. There is NO job description. Evaluate ONLY the resume for how likely it is to be parsed and processed correctly by typical Applicant Tracking Systems, and how strong the document is on structure and clarity.

Return ONLY valid JSON. Do not include explanations, markdown, or any text outside the JSON object.

Focus on:
- Parse-friendly structure: clear section headings (Experience, Work History, Education, Skills, Summary, etc.), logical order, plain text flow (infer from text; flag dense tab-like or column-like patterns as risky).
- Section coverage: contact signals, experience with dates, education, skills or technical terms somewhere readable.
- Formatting red flags implied by text: unusual characters-only blocks, heavy unicode decoration, role-play formatting that might break parsers.
- Bullet quality: action-led bullets, measurable outcomes where present.
- Keyword coverage: there is NO job description - you MUST set matched_skills, missing_skills, missing_skills_required, and missing_skills_preferred to empty arrays [].
- required_years_experience and required_years_experience_max: MUST be null (no JD).
- resume_years_experience: estimate total relevant years from employment dates in the resume (number ≥ 0).
- ats_score: 0-100 overall likelihood the resume parses cleanly and presents experience in an ATS-friendly way (not match to a specific job).
- ${ANALYZE_MATCH_SUMMARY_RULE_RESUME_ONLY}

Output format (no other keys):
{
  "ats_score": number,
  "required_years_experience": null,
  "required_years_experience_max": null,
  "resume_years_experience": number,
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
  targetRoleTitle?: string;
};

export async function POST(request: Request) {
  let analysisAccess: AnalysisAccess | null = null;
  let quotaStatusBefore: AnalysisAccess["quotaStatus"] | null = null;
  let applicationCommit: ApplicationCommitResult | null = null;

  try {
    const body = (await request.json()) as AnalyzeRequestBody;
    let resumeText = body?.resumeText;
    let jobDescription = body?.jobDescription;
    const targetRoleTitle =
      typeof body?.targetRoleTitle === "string" ? body.targetRoleTitle : undefined;

    if (typeof resumeText !== "string" || typeof jobDescription !== "string") {
      return NextResponse.json(
        { error: "resumeText and jobDescription (strings) are required" },
        { status: 400 }
      );
    }

    resumeText = clipToWordLimit(resumeText, RESUME_TEXT_MAX_WORDS);
    jobDescription = clipToWordLimit(jobDescription, JOB_DESCRIPTION_MAX_WORDS);

    const jdEmpty = !jobDescription.trim();
    if (!resumeText.trim()) {
      return NextResponse.json({ error: "resumeText is required" }, { status: 400 });
    }
    if (!jdEmpty && !normalizeTargetRoleTitle(targetRoleTitle)) {
      return NextResponse.json(
        { error: "targetRoleTitle is required when analyzing against a job description" },
        { status: 400 }
      );
    }

    const modelCandidates = resolveAnthropicModelCandidates();
    const cacheModelKey = modelCandidates.join(",");
    const cacheKey = buildAnalysisCacheKey(resumeText, jobDescription, cacheModelKey, {
      resumeOnly: jdEmpty,
    });

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "ATS analysis is not configured" },
        { status: 503 }
      );
    }

    const cached = await getCachedAnalysisResult(cacheKey);
    if (cached) {
      // Even if we reuse the cached ATS result, the user clicked "Analyze" and
      // should still consume a scan against the free/purchased quota.
      try {
        const resolved = await assertCanRunAnalysisOrThrow(request);
        analysisAccess = resolved;
        quotaStatusBefore = resolved.quotaStatus;
      } catch (accessErr) {
        const funnelPayload = (accessErr as Error & { funnelPayload?: { code: string; message: string } })
          .funnelPayload;
        if (funnelPayload) {
          return NextResponse.json({ error: funnelPayload }, { status: 409 });
        }
        const payload = (accessErr as Error & { quotaPayload?: QuotaExceededPayload }).quotaPayload;
        if (payload) {
          return NextResponse.json({ error: payload }, { status: 429 });
        }
        throw accessErr;
      }

      let usageRecorded = false;
      const cachedPayload = { ...cached };
      if (analysisAccess) {
        try {
          applicationCommit = await commitAnalysisApplication(
            analysisAccess,
            resumeText,
            jobDescription,
            cachedPayload
          );
          usageRecorded = analysisAccess.source === "free";
        } catch (recErr) {
          const msg = recErr instanceof Error ? recErr.message : String(recErr);
          console.error("[analyze] application commit failed (cache still returned result)", msg);
        }
      }

      const quotaAfter =
        quotaStatusBefore && usageRecorded
          ? quotaAfterSuccessfulUse(quotaStatusBefore)
          : quotaStatusBefore
            ? {
                remaining: quotaStatusBefore.remaining,
                used: quotaStatusBefore.used,
                limit: quotaStatusBefore.limit,
                scope: quotaStatusBefore.scope,
              }
            : undefined;

      if (cachedPayload.evidence_dashboard && !jdEmpty) {
        const hadLlmEnrichment =
          (cachedPayload.evidence_dashboard.roleFit?.length ?? 0) > 0 &&
          (cachedPayload.evidence_dashboard.mostMissingEvidence?.length ?? 0) > 0 &&
          cachedPayload.evidence_dashboard.skillProofVersion === SKILL_PROOF_VERSION &&
          cachedPayload.evidence_dashboard.riskAreasVersion === RISK_AREAS_VERSION &&
          cachedPayload.evidence_dashboard.applicationVerdictVersion ===
            APPLICATION_VERDICT_VERSION;
        cachedPayload.evidence_dashboard = await enrichEvidenceDashboardWithLlm({
          dashboard: cachedPayload.evidence_dashboard,
          apiKey,
          modelCandidates,
          resumeText,
          jobDescription,
          targetRoleTitle,
          missingSkills: cachedPayload.missing_skills ?? [],
          matchedSkills: cachedPayload.matched_skills ?? [],
        });
        const cachedProofRows =
          cachedPayload.evidence_dashboard.skillProofAll ??
          cachedPayload.evidence_dashboard.skillProof;
        if (cachedProofRows.length > 0) {
          const coverageScore = countKeywordProofCoverage(cachedProofRows).score;
          cachedPayload.keyword_coverage = coverageScore;
          cachedPayload.ats_score = coverageScore;
        }
        if (
          !hadLlmEnrichment &&
          ((cachedPayload.evidence_dashboard.roleFit?.length ?? 0) > 0 ||
            (cachedPayload.evidence_dashboard.mostMissingEvidence?.length ?? 0) > 0)
        ) {
          await setCachedAnalysisResult(cacheKey, cachedPayload);
        }
      }

      return NextResponse.json({
        ...cachedPayload,
        ...(quotaAfter && { quota: quotaAfter }),
        ...(applicationCommit && { application: applicationCommit }),
      });
    }

    try {
      const resolved = await assertCanRunAnalysisOrThrow(request);
      analysisAccess = resolved;
      quotaStatusBefore = resolved.quotaStatus;
    } catch (accessErr) {
      const funnelPayload = (accessErr as Error & { funnelPayload?: { code: string; message: string } })
        .funnelPayload;
      if (funnelPayload) {
        return NextResponse.json({ error: funnelPayload }, { status: 409 });
      }
      const payload = (accessErr as Error & { quotaPayload?: QuotaExceededPayload }).quotaPayload;
      if (payload) {
        return NextResponse.json({ error: payload }, { status: 429 });
      }
      throw accessErr;
    }

    const userContent = jdEmpty
      ? `RESUME ONLY - no job description was provided. Evaluate ATS parsing compatibility, section structure, and formatting signals only:\n${resumeText}`
      : `RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}`;

    let response: Response | null = null;
    let responseText = "";
    let selectedModel: string | null = null;
    for (const candidateModel of modelCandidates) {
      response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: candidateModel,
          max_tokens: 1000,
          temperature: 0,
          system: jdEmpty ? SYSTEM_PROMPT_RESUME_ONLY : SYSTEM_PROMPT,
          messages: [{ role: "user" as const, content: userContent }],
        }),
      });

      responseText = await response.text();
      if (response.ok) {
        selectedModel = candidateModel;
        break;
      }

      const errorType = parseAnthropicErrorType(responseText);
      const isModelUnavailable = response.status === 404 && errorType === "not_found_error";
      console.error(
        "[analyze] Anthropic error",
        response.status,
        `model=${candidateModel}`,
        responseText.slice(0, 300)
      );
      if (!isModelUnavailable) {
        break;
      }
    }

    if (!response || !response.ok) {
      const status = response?.status ?? 502;
      const friendly =
        status === 529
          ? "Our analysis service is temporarily overloaded. Please try again in a minute."
          : "Our analysis service is temporarily unavailable. Please try again shortly.";
      return NextResponse.json({ error: friendly }, { status: 502 });
    }
    if (selectedModel) {
      console.info("[analyze] Anthropic model selected", selectedModel);
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

    if (!isAnalyzeLlmPayload(result)) {
      console.error("[analyze] Invalid LLM payload keys", Object.keys(result as object));
      return NextResponse.json(
        { error: "Analysis missing required fields" },
        { status: 502 }
      );
    }

    const llmResult = result as Record<string, unknown>;
    const requiredYears =
      llmResult.required_years_experience === null ||
      typeof llmResult.required_years_experience !== "number"
        ? null
        : Math.max(0, Math.round(llmResult.required_years_experience as number));
    const rawMax = llmResult.required_years_experience_max;
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
      typeof llmResult.resume_years_experience === "number"
        ? Math.max(0, Math.round(llmResult.resume_years_experience))
        : 0;

    const missingSkills = Array.isArray(llmResult.missing_skills)
      ? (llmResult.missing_skills as string[])
      : [];
    const missingRequired = Array.isArray(llmResult.missing_skills_required)
      ? (llmResult.missing_skills_required as string[])
      : [];
    const missingPreferred = Array.isArray(llmResult.missing_skills_preferred)
      ? (llmResult.missing_skills_preferred as string[])
      : [];

    const matchedIn = Array.isArray(llmResult.matched_skills)
      ? (llmResult.matched_skills as string[])
      : [];
    const repaired = repairSkillListsAgainstResume(
      resumeText,
      matchedIn,
      missingSkills,
      missingRequired,
      missingPreferred,
      typeof llmResult.keyword_coverage === "number" ? llmResult.keyword_coverage : undefined
    );
    const missingSkillsAfter = filterSkillGapPhrases(repaired.missing_skills);
    const missingRequiredAfter = filterSkillGapPhrases(repaired.missing_skills_required ?? []);
    const missingPreferredAfter = filterSkillGapPhrases(repaired.missing_skills_preferred ?? []);
    const matchedSkillsAfter = filterSkillGapPhrases(repaired.matched_skills);
    const skillTotal = matchedSkillsAfter.length + missingSkillsAfter.length;
    const keywordCoverageAfter =
      skillTotal > 0 ? Math.round((matchedSkillsAfter.length / skillTotal) * 100) : 100;

    const normalized: ATSAnalyzeResult = {
      ats_score: keywordCoverageAfter,
      keyword_coverage: keywordCoverageAfter,
      required_years_experience: requiredYears,
      required_years_experience_max: requiredYearsMax,
      resume_years_experience: resumeYears,
      matched_skills: matchedSkillsAfter,
      missing_skills: missingSkillsAfter,
      missing_skills_required:
        missingRequiredAfter.length > 0 || missingPreferredAfter.length > 0
          ? missingRequiredAfter
          : undefined,
      missing_skills_preferred: missingPreferredAfter.length > 0 ? missingPreferredAfter : undefined,
      summary: clampAnalyzeMatchSummary(
        typeof llmResult.summary === "string" ? llmResult.summary : ""
      ),
    };

    if (jdEmpty) {
      normalized.keyword_coverage = null;
      if (typeof llmResult.ats_score === "number") {
        normalized.ats_score = Math.max(0, Math.min(100, Math.round(llmResult.ats_score)));
      }
      normalized.matched_skills = [];
      normalized.missing_skills = [];
      normalized.missing_skills_required = undefined;
      normalized.missing_skills_preferred = undefined;
    } else {
      const evidenceDashboard = buildEvidenceDashboard({
        resumeText,
        jobDescription,
        matchedSkills: matchedSkillsAfter,
        missingSkills: missingSkillsAfter,
        missingRequired: missingRequiredAfter,
        missingPreferred: missingPreferredAfter,
        requiredYearsExperience: requiredYears,
        resumeYearsExperience: resumeYears,
        targetRoleTitle,
        skillProofDisplayLimit: Math.min(
          20,
          matchedSkillsAfter.length + missingSkillsAfter.length
        ),
      });
      normalized.evidence_dashboard = await enrichEvidenceDashboardWithLlm({
        dashboard: evidenceDashboard,
        apiKey,
        modelCandidates,
        resumeText,
        jobDescription,
        targetRoleTitle,
        missingSkills: missingSkillsAfter,
        matchedSkills: matchedSkillsAfter,
        skillProofDisplayLimit: Math.min(
          20,
          matchedSkillsAfter.length + missingSkillsAfter.length
        ),
      });
      const proofRows =
        normalized.evidence_dashboard.skillProofAll ??
        normalized.evidence_dashboard.skillProof;
      if (proofRows.length > 0) {
        const coverageScore = countKeywordProofCoverage(proofRows).score;
        normalized.keyword_coverage = coverageScore;
        normalized.ats_score = coverageScore;
      }
    }

    await setCachedAnalysisResult(cacheKey, normalized);

    let usageRecorded = false;
    if (analysisAccess) {
      try {
        applicationCommit = await commitAnalysisApplication(
          analysisAccess,
          resumeText,
          jobDescription,
          normalized
        );
        usageRecorded = analysisAccess.source === "free";
      } catch (recErr) {
        const msg = recErr instanceof Error ? recErr.message : String(recErr);
        const hint = /analysis_usage|relation.*does not exist|permission denied/i.test(msg)
          ? " Ensure analysis_usage table exists (run supabase/migrations/005_ensure_billing_tables.sql)."
          : "";
        console.error("[analyze] funnel commit failed (analysis still returned)", msg, hint);
      }
    }

    const quotaAfter =
      quotaStatusBefore && usageRecorded
        ? quotaAfterSuccessfulUse(quotaStatusBefore)
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
      ...(applicationCommit && { application: applicationCommit }),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Analysis failed";
    const detail = err instanceof Error ? err.stack : String(err);
    console.error("[analyze] 500", message, detail);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
