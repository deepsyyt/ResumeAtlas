/**
 * Result shape returned by the /api/analyze LLM-based ATS analysis.
 * Dashboard UI binds directly to this JSON.
 */
export type BulletPreview = {
  before: string;
  after: string;
};

export type ATSAnalyzeResult = {
  ats_score: number;
  /** JD keyword overlap %; `null` when no job description was analyzed (resume-only ATS scan). */
  keyword_coverage: number | null;
  semantic_similarity: number;
  experience_alignment: number;
  /** Years of experience required by the job description; null if not specified in the JD. */
  required_years_experience: number | null;
  /**
   * When the JD states a range (e.g. 10–15 years), upper bound; null for a minimum only ("5+ years") or unspecified.
   */
  required_years_experience_max?: number | null;
  /** Years of experience reflected in the resume (inferred from roles and dates). */
  resume_years_experience: number;
  impact_score: number;
  resume_quality: number;
  matched_skills: string[];
  missing_skills: string[];
  /** Missing skills the JD lists as required/must-have. When set, UI shows Required vs Preferred. */
  missing_skills_required?: string[];
  /** Missing skills the JD lists as preferred/nice-to-have. When set, UI shows Required vs Preferred. */
  missing_skills_preferred?: string[];
  summary: string;
  /** Optional before/after bullet preview for conversion. Null if skipped (no bullets or already strong). */
  bullet_preview?: BulletPreview | null;
  /** When bullet_preview is null: "already_strong" | "no_bullets" so UI can show the right message. */
  bullet_preview_skip?: "already_strong" | "no_bullets";
};

export function atsBandFromScore(score: number): "low" | "moderate" | "strong" | "very_strong" {
  if (score < 40) return "low";
  if (score < 60) return "moderate";
  if (score < 75) return "strong";
  return "very_strong";
}

export function isATSAnalyzeResult(obj: unknown): obj is ATSAnalyzeResult {
  if (!obj || typeof obj !== "object") return false;
  const o = obj as Record<string, unknown>;
  const requiredYearsOk =
    o.required_years_experience === null || typeof o.required_years_experience === "number";
  const requiredMaxOk =
    o.required_years_experience_max === undefined ||
    o.required_years_experience_max === null ||
    typeof o.required_years_experience_max === "number";
  const resumeYearsOk = typeof o.resume_years_experience === "number";
  const keywordCovOk =
    o.keyword_coverage === null || typeof o.keyword_coverage === "number";
  return (
    typeof o.ats_score === "number" &&
    keywordCovOk &&
    typeof o.semantic_similarity === "number" &&
    typeof o.experience_alignment === "number" &&
    requiredYearsOk &&
    requiredMaxOk &&
    resumeYearsOk &&
    typeof o.impact_score === "number" &&
    typeof o.resume_quality === "number" &&
    Array.isArray(o.matched_skills) &&
    Array.isArray(o.missing_skills) &&
    (o.missing_skills_required === undefined || Array.isArray(o.missing_skills_required)) &&
    (o.missing_skills_preferred === undefined || Array.isArray(o.missing_skills_preferred)) &&
    typeof o.summary === "string" &&
    (o.bullet_preview === undefined ||
      o.bullet_preview === null ||
      (typeof o.bullet_preview === "object" &&
        typeof (o.bullet_preview as BulletPreview).before === "string" &&
        typeof (o.bullet_preview as BulletPreview).after === "string"))
  );
}
