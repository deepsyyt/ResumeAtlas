import { normalizeText } from "./jdEngine/normalize";

const API_URL = "https://api.anthropic.com/v1/messages";

export type ResumeProfile = {
  skills: string[];
  job_titles: string[];
  years_experience: number;
  summary?: string;
  projects: string[] | { description?: string; [key: string]: unknown }[];
  metrics: string[];
  tools: string[];
  education: string[];
  industries: string[];
  work_experience?: { description?: string; [key: string]: unknown }[];
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
        temperature: 0,
        top_p: 1,
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
      summary:
        typeof (parsed.resume_profile as any)?.summary === "string"
          ? ((parsed.resume_profile as any).summary as string)
          : "",
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
        summary: "",
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

function normalizeForPhrase(text: string): string {
  return text
    .toLowerCase()
    // keep letters, numbers, +, # and whitespace, strip other punctuation
    .replace(/[^a-z0-9+#\s.?!]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractSkillPhrases(text: string): string[] {
  const cleaned = text
    .toLowerCase()
    .replace(/[^a-z0-9+#/\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) return [];

  const phraseRegex = /\b([a-zA-Z0-9+#/]{2,}\s?){1,3}\b/g;
  const phrases = new Set<string>();

  const matches = cleaned.match(phraseRegex);
  if (!matches) return [];

  for (let phrase of matches) {
    phrase = phrase.toLowerCase().replace(/[^a-z0-9+#/\s]/g, " ").replace(/\s+/g, " ").trim();
    if (!phrase) continue;
    phrases.add(phrase);
  }

  return Array.from(phrases);
}

function extractJDSkillPhrases(jd: JDProfile): string[] {
  const phraseRegex = /\b([a-zA-Z0-9+#/]{2,}\s?){1,3}\b/g;
  const banned = [
    "ability",
    "responsibility",
    "ensure",
    "optimize",
    "improve",
    "foster",
    "collaborate",
    "track",
    "report",
  ];

  const seen = new Set<string>();

  const addFromText = (text: string | undefined) => {
    if (!text) return;
    const cleaned = text
      .toLowerCase()
      .replace(/[^a-z0-9+#/\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (!cleaned) return;

    const matches = cleaned.match(phraseRegex);
    if (!matches) return;

    for (let phrase of matches) {
      phrase = phrase.toLowerCase().replace(/[^a-z0-9+#/\s]/g, " ").replace(/\s+/g, " ").trim();
      if (!phrase) continue;

      const words = phrase.split(" ").filter(Boolean);
      if (words.length === 0) continue;

      // Rule 4: reject if more than 3 words
      if (words.length > 3) continue;

      // Rule 3: filter banned words
      const hasBanned = banned.some((b) => phrase.includes(b));
      if (hasBanned) continue;

      // Rule 5: max 25 characters
      if (phrase.length > 25) continue;

      if (!seen.has(phrase)) {
        seen.add(phrase);
      }
    }
  };

  jd.required_skills.forEach((s) => addFromText(s));

  return Array.from(seen);
}

function phraseSimilarity(a: string, b: string): number {
  const aTokens = a
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
  const bTokens = b
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  if (!aTokens.length || !bTokens.length) return 0;

  const aFreq = new Map<string, number>();
  const bFreq = new Map<string, number>();

  for (const t of aTokens) {
    aFreq.set(t, (aFreq.get(t) ?? 0) + 1);
  }
  for (const t of bTokens) {
    bFreq.set(t, (bFreq.get(t) ?? 0) + 1);
  }

  let dot = 0;
  let aNormSq = 0;
  let bNormSq = 0;

  aFreq.forEach((val, token) => {
    aNormSq += val * val;
    const bVal = bFreq.get(token);
    if (typeof bVal === "number") {
      dot += val * bVal;
    }
  });

  bFreq.forEach((val) => {
    bNormSq += val * val;
  });

  if (!aNormSq || !bNormSq) return 0;

  const cosine = dot / (Math.sqrt(aNormSq) * Math.sqrt(bNormSq));
  return Math.max(0, Math.min(1, cosine));
}

function computeKeywordCoverage(
  resume: ResumeProfile,
  jd: JDProfile
): KeywordCoverageMetric {
  const resumePhraseSet = new Set<string>();
  const resumeTextParts: string[] = [];

  if (typeof resume.summary === "string") {
    resumeTextParts.push(resume.summary);
  }

  resumeTextParts.push(...resume.skills);
  resumeTextParts.push(...resume.tools);

  if (Array.isArray(resume.work_experience)) {
    resume.work_experience.forEach((exp) => {
      if (exp && typeof exp.description === "string") {
        resumeTextParts.push(exp.description);
      }
    });
  }

  if (Array.isArray(resume.projects)) {
    resume.projects.forEach((project) => {
      if (typeof project === "string") {
        resumeTextParts.push(project);
      } else if (project && typeof project.description === "string") {
        resumeTextParts.push(project.description);
      }
    });
  }

  const resumeText = resumeTextParts.filter(Boolean).join(" ");

  extractSkillPhrases(resumeText).forEach((p) => resumePhraseSet.add(p));

  // Also include structured skills and tools explicitly
  resume.skills.forEach((s) => {
    const norm = normalizeForPhrase(s);
    if (norm) resumePhraseSet.add(norm);
  });
  resume.tools.forEach((t) => {
    const norm = normalizeForPhrase(t);
    if (norm) resumePhraseSet.add(norm);
  });

  const required = extractJDSkillPhrases(jd);

  const matched: string[] = [];
  const missing: string[] = [];
  const resumePhrases = Array.from(resumePhraseSet);

  for (const skill of required) {
    if (!skill) continue;
    let present = false;
    for (let i = 0; i < resumePhrases.length; i++) {
      const sim = phraseSimilarity(skill, resumePhrases[i]);
      if (sim > 0.6) {
        present = true;
        break;
      }
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
  const impact_score = computeImpactScore(resumeText);
  const resume_quality = computeResumeQuality(resumeText);

  const atsScoreRaw =
    0.35 * keyword_coverage.score +
    0.2 * semantic_similarity.score +
    0.3 * experience_alignment.score +
    0.1 * impact_score.score +
    0.05 * resume_quality.score;

  const ats_score = Math.round(Math.max(0, Math.min(100, atsScoreRaw)));
  const ats_band = bandForScore(ats_score);

  return {
    keyword_coverage,
    semantic_similarity,
    experience_alignment,
    impact_score,
    resume_quality,
    ats_score,
    ats_band,
  };
}

