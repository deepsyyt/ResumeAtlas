import { normalizeText } from "./jdEngine/normalize";

const API_URL = "https://api.anthropic.com/v1/messages";

export type ResumeProfile = {
  skills: string[];
  job_titles: string[];
  years_experience: number;
  projects: string[];
  metrics: string[];
  tools: string[];
  education: string[];
  industries: string[];
};

export type JDProfile = {
  job_title: string;
  min_years_experience: number;
  required_skills: string[];
  preferred_skills: string[];
  tools: string[];
  education_requirement: string;
  industry_domain: string;
};

export type MetricScore = {
  score: number; // 0-100
  explanation: string;
};

export type KeywordCoverageMetric = MetricScore & {
  matched_skills: string[];
  missing_skills: string[];
  total_required: number;
};

export type ExperienceAlignmentMetric = MetricScore & {
  required_experience: number;
  resume_experience: number;
};

export type TitleAlignmentMetric = MetricScore & {
  target_title: string;
  resume_titles: string[];
};

export type ImpactScoreMetric = MetricScore & {
  metrics_detected: number;
  experience_lines: number;
};

export type ResumeQualityMetric = MetricScore & {
  bullet_density: number;
  avg_sentence_length: number;
  has_skills_section: boolean;
  has_experience_section: boolean;
};

export type ATSAnalysisResult = {
  keyword_coverage: KeywordCoverageMetric;
  semantic_similarity: MetricScore;
  experience_alignment: ExperienceAlignmentMetric;
  title_alignment: TitleAlignmentMetric;
  impact_score: ImpactScoreMetric;
  resume_quality: ResumeQualityMetric;
  ats_score: number;
  ats_band: "low" | "moderate" | "strong" | "very_strong";
};

function preprocess(text: string): string {
  return normalizeText(text);
}

function tokenizeWords(text: string): string[] {
  return preprocess(text)
    .split(" ")
    .filter((t) => t.length >= 3);
}

function jaccardCosineSimilarity(a: string, b: string): number {
  const aTokens = new Set(tokenizeWords(a));
  const bTokens = new Set(tokenizeWords(b));
  if (!aTokens.size || !bTokens.size) return 0;
  let intersection = 0;
  aTokens.forEach((t) => {
    if (bTokens.has(t)) intersection += 1;
  });
  const cosine = intersection / Math.sqrt(aTokens.size * bTokens.size);
  return Math.max(0, Math.min(1, cosine));
}

async function extractProfiles(
  resumeText: string,
  jdText: string
): Promise<{ resume: ResumeProfile; jd: JDProfile }> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const model =
    process.env.ANTHROPIC_MODEL && process.env.ANTHROPIC_MODEL.trim().length > 0
      ? process.env.ANTHROPIC_MODEL
      : "claude-3-haiku-20240307";

  if (!apiKey) {
    // Deterministic empty profiles if no key configured
    return {
      resume: {
        skills: [],
        job_titles: [],
        years_experience: 0,
        projects: [],
        metrics: [],
        tools: [],
        education: [],
        industries: [],
      },
      jd: {
        job_title: "",
        min_years_experience: 0,
        required_skills: [],
        preferred_skills: [],
        tools: [],
        education_requirement: "",
        industry_domain: "",
      },
    };
  }

  const system =
    "You are a strict ATS parser. You only return JSON. You never add commentary.";

  const userPrompt = `
Extract structured profiles from the RESUME and JOB DESCRIPTION below.

Return a JSON object with this exact shape:
{
  "resume_profile": {
    "skills": [],
    "job_titles": [],
    "years_experience": 0,
    "projects": [],
    "metrics": [],
    "tools": [],
    "education": [],
    "industries": []
  },
  "jd_profile": {
    "job_title": "",
    "min_years_experience": 0,
    "required_skills": [],
    "preferred_skills": [],
    "tools": [],
    "education_requirement": "",
    "industry_domain": ""
  }
}

Rules:
- Only include information explicitly present in the text.
- Do not infer or guess technologies or industries that are not mentioned.
- years_experience and min_years_experience should be numeric estimates in years.
- metrics should capture quantified achievements from the resume (numbers, %, k/m, etc.).
- skills and tools should be concise, deduplicated phrases.

RESUME:
"""${resumeText}"""

JOB DESCRIPTION:
"""${jdText}"""
`.trim();

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        max_tokens: 1024,
        system,
        messages: [{ role: "user" as const, content: userPrompt }],
      }),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      console.error("[atsEngine] Profile extraction failed", {
        status: response.status,
        statusText: response.statusText,
        bodySnippet: text.slice(0, 300),
      });
      throw new Error("Profile extraction failed");
    }

    const data = (await response.json()) as {
      content?: { type: string; text?: string }[];
    };

    const textBlock = data.content?.find((c) => c.type === "text");
    const rawText = (typeof textBlock?.text === "string" ? textBlock.text : "")?.trim() ?? "";

    const jsonStr = extractJson(rawText);
    const parsed = JSON.parse(jsonStr) as {
      resume_profile?: Partial<ResumeProfile>;
      jd_profile?: Partial<JDProfile>;
    };

    const resume: ResumeProfile = {
      skills: parsed.resume_profile?.skills?.filter(isString) ?? [],
      job_titles: parsed.resume_profile?.job_titles?.filter(isString) ?? [],
      years_experience:
        typeof parsed.resume_profile?.years_experience === "number"
          ? parsed.resume_profile.years_experience
          : 0,
      projects: parsed.resume_profile?.projects?.filter(isString) ?? [],
      metrics: parsed.resume_profile?.metrics?.filter(isString) ?? [],
      tools: parsed.resume_profile?.tools?.filter(isString) ?? [],
      education: parsed.resume_profile?.education?.filter(isString) ?? [],
      industries: parsed.resume_profile?.industries?.filter(isString) ?? [],
    };

    const jd: JDProfile = {
      job_title: parsed.jd_profile?.job_title || "",
      min_years_experience:
        typeof parsed.jd_profile?.min_years_experience === "number"
          ? parsed.jd_profile.min_years_experience
          : 0,
      required_skills: parsed.jd_profile?.required_skills?.filter(isString) ?? [],
      preferred_skills: parsed.jd_profile?.preferred_skills?.filter(isString) ?? [],
      tools: parsed.jd_profile?.tools?.filter(isString) ?? [],
      education_requirement: parsed.jd_profile?.education_requirement || "",
      industry_domain: parsed.jd_profile?.industry_domain || "",
    };

    return { resume, jd };
  } catch (err) {
    console.error("[atsEngine] Profile extraction threw", err);
    // fall back to empty deterministic profiles
    return {
      resume: {
        skills: [],
        job_titles: [],
        years_experience: 0,
        projects: [],
        metrics: [],
        tools: [],
        education: [],
        industries: [],
      },
      jd: {
        job_title: "",
        min_years_experience: 0,
        required_skills: [],
        preferred_skills: [],
        tools: [],
        education_requirement: "",
        industry_domain: "",
      },
    };
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

function isString(v: unknown): v is string {
  return typeof v === "string";
}

function computeKeywordCoverage(
  resume: ResumeProfile,
  jd: JDProfile
): KeywordCoverageMetric {
  const resumeTokens = new Set([
    ...resume.skills.map(normalizeText),
    ...resume.tools.map(normalizeText),
  ]);

  const required = jd.required_skills.map(normalizeText).filter(Boolean);

  const matched: string[] = [];
  const missing: string[] = [];

  for (const skill of required) {
    if (!skill) continue;
    let present = false;
    for (const token of skill.split(" ")) {
      if (token.length < 3) continue;
      resumeTokens.forEach((r) => {
        if (!present && r.includes(token)) {
          present = true;
        }
      });
      if (present) break;
    }
    if (present) matched.push(skill);
    else missing.push(skill);
  }

  const total = required.length || 1;
  const coverage = Math.round((matched.length / total) * 100);

  return {
    score: coverage,
    explanation: "Coverage of required skills explicitly listed in the job description.",
    matched_skills: matched,
    missing_skills: missing,
    total_required: required.length,
  };
}

function computeSemanticSimilarity(
  resumeText: string,
  jdText: string
): MetricScore {
  const sim = jaccardCosineSimilarity(resumeText, jdText);
  const score = Math.round(sim * 100);
  return {
    score,
    explanation:
      "Lexical semantic similarity between your resume and the job description, based on overlapping concepts.",
  };
}

function computeExperienceAlignment(
  resume: ResumeProfile,
  jd: JDProfile
): ExperienceAlignmentMetric {
  const req = jd.min_years_experience || 0;
  const have = resume.years_experience || 0;
  let score: number;
  if (!req) {
    score = 100;
  } else if (have >= req) {
    score = 100;
  } else if (have >= 0.7 * req) {
    score = 70;
  } else {
    score = 40;
  }
  return {
    score,
    required_experience: req,
    resume_experience: have,
    explanation: "Alignment between your total relevant experience and the minimum required for this role.",
  };
}

function computeTitleAlignment(
  resume: ResumeProfile,
  jd: JDProfile
): TitleAlignmentMetric {
  const target = jd.job_title || "";
  if (!target || !resume.job_titles.length) {
    return {
      score: 50,
      target_title: target,
      resume_titles: resume.job_titles,
      explanation:
        "Title alignment is estimated because either the target title or resume titles are missing.",
    };
  }
  let best = 0;
  for (const t of resume.job_titles) {
    const sim = jaccardCosineSimilarity(target, t);
    if (sim > best) best = sim;
  }
  const score = Math.round(best * 100);
  return {
    score,
    target_title: target,
    resume_titles: resume.job_titles,
    explanation:
      "Similarity between the target job title and the most relevant titles in your resume.",
  };
}

function computeImpactScore(resumeText: string): ImpactScoreMetric {
  const lines = resumeText.split(/\r?\n/).map((l) => l.trim());
  const expLines = lines.filter((l) => l.length > 0);
  let metricsDetected = 0;
  const metricRegex =
    /(\d+(\.\d+)?\s*%|\b\d{2,}\b|\b(k|m|million|billion)\b|increase|decrease|improved|reduced|grew|scaled)/i;
  for (const line of expLines) {
    if (metricRegex.test(line)) metricsDetected += 1;
  }
  const total = expLines.length || 1;
  const ratio = metricsDetected / total;
  const score = Math.round(Math.min(1, ratio * 3) * 100);
  return {
    score,
    metrics_detected: metricsDetected,
    experience_lines: expLines.length,
    explanation:
      "How often your experience bullets include quantified, measurable impact (numbers, percentages, scale).",
  };
}

function computeResumeQuality(resumeText: string): ResumeQualityMetric {
  const lines = resumeText.split(/\r?\n/);
  const totalLines = lines.length || 1;
  const bulletLines = lines.filter((l) => /^[\-\*\u2022]/.test(l.trim())).length;
  const bulletDensity = bulletLines / totalLines;

  const sentences = resumeText
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const totalWords = sentences.reduce(
    (acc, s) => acc + s.split(/\s+/).filter(Boolean).length,
    0
  );
  const avgSentenceLength =
    sentences.length > 0 ? totalWords / sentences.length : totalWords;

  const lower = resumeText.toLowerCase();
  const hasSkills = lower.includes("skills");
  const hasExperience =
    lower.includes("experience") || lower.includes("work history");

  // Heuristic scoring
  let score = 70;
  if (bulletDensity > 0.4) score += 10;
  if (avgSentenceLength > 30) score -= 15;
  if (!hasSkills) score -= 10;
  if (!hasExperience) score -= 10;
  score = Math.max(0, Math.min(100, score));

  return {
    score,
    bullet_density: bulletDensity,
    avg_sentence_length: avgSentenceLength,
    has_skills_section: hasSkills,
    has_experience_section: hasExperience,
    explanation:
      "Readability of your resume based on bullet usage, sentence length, and presence of key sections.",
  };
}

function bandForScore(score: number): "low" | "moderate" | "strong" | "very_strong" {
  if (score < 40) return "low";
  if (score < 60) return "moderate";
  if (score < 75) return "strong";
  return "very_strong";
}

export async function analyzeATS(
  resumeText: string,
  jdText: string
): Promise<ATSAnalysisResult> {
  const { resume, jd } = await extractProfiles(resumeText, jdText);

  const keyword_coverage = computeKeywordCoverage(resume, jd);
  const semantic_similarity = computeSemanticSimilarity(resumeText, jdText);
  const experience_alignment = computeExperienceAlignment(resume, jd);
  const title_alignment = computeTitleAlignment(resume, jd);
  const impact_score = computeImpactScore(resumeText);
  const resume_quality = computeResumeQuality(resumeText);

  const atsScoreRaw =
    0.35 * keyword_coverage.score +
    0.2 * semantic_similarity.score +
    0.15 * experience_alignment.score +
    0.15 * title_alignment.score +
    0.1 * impact_score.score +
    0.05 * resume_quality.score;

  const ats_score = Math.round(Math.max(0, Math.min(100, atsScoreRaw)));
  const ats_band = bandForScore(ats_score);

  return {
    keyword_coverage,
    semantic_similarity,
    experience_alignment,
    title_alignment,
    impact_score,
    resume_quality,
    ats_score,
    ats_band,
  };
}

