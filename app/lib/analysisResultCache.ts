import type { ATSAnalyzeResult } from "@/app/lib/atsAnalyze";
import { isATSAnalyzeResult } from "@/app/lib/atsAnalyze";
import { hashResumeJd } from "@/app/lib/quota/hash";
import { getSupabaseAdmin } from "@/app/lib/supabase/server";

/**
 * Bump when prompts, post-processing, or scoring logic changes so old cache rows are ignored.
 */
export const ANALYSIS_RESULT_CACHE_STAMP = "20260326-v1";

export function buildAnalysisCacheKey(
  resumeClipped: string,
  jobDescriptionClipped: string,
  model: string
): string {
  const m = model.trim() || "default";
  return `${ANALYSIS_RESULT_CACHE_STAMP}:${m}:${hashResumeJd(resumeClipped, jobDescriptionClipped)}`;
}

export async function getCachedAnalysisResult(
  cacheKey: string
): Promise<ATSAnalyzeResult | null> {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("analysis_result_cache")
      .select("result")
      .eq("cache_key", cacheKey)
      .maybeSingle();
    if (error || !data?.result) return null;
    const parsed = data.result as unknown;
    if (!isATSAnalyzeResult(parsed)) return null;
    return parsed;
  } catch (e) {
    console.warn("[analysisResultCache] read failed", e);
    return null;
  }
}

export async function setCachedAnalysisResult(
  cacheKey: string,
  result: ATSAnalyzeResult
): Promise<void> {
  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("analysis_result_cache").upsert(
      {
        cache_key: cacheKey,
        result: result as unknown as Record<string, unknown>,
      },
      { onConflict: "cache_key" }
    );
    if (error) {
      console.warn("[analysisResultCache] upsert failed", error.message);
    }
  } catch (e) {
    console.warn("[analysisResultCache] write failed", e);
  }
}
