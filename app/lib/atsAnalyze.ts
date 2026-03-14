/**
 * Result shape returned by the /api/analyze LLM-based ATS analysis.
 * Dashboard UI binds directly to this JSON.
 */
export type ATSAnalyzeResult = {
  ats_score: number;
  keyword_coverage: number;
  semantic_similarity: number;
  experience_alignment: number;
  /** Years of experience required by the job description; null if not specified in the JD. */
  required_years_experience: number | null;
  /** Years of experience reflected in the resume (inferred from roles and dates). */
  resume_years_experience: number;
  impact_score: number;
  resume_quality: number;
  matched_skills: string[];
  missing_skills: string[];
  summary: string;
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
  const resumeYearsOk = typeof o.resume_years_experience === "number";
  return (
    typeof o.ats_score === "number" &&
    typeof o.keyword_coverage === "number" &&
    typeof o.semantic_similarity === "number" &&
    typeof o.experience_alignment === "number" &&
    requiredYearsOk &&
    resumeYearsOk &&
    typeof o.impact_score === "number" &&
    typeof o.resume_quality === "number" &&
    Array.isArray(o.matched_skills) &&
    Array.isArray(o.missing_skills) &&
    typeof o.summary === "string"
  );
}
