import crypto from "crypto";
import { getSupabaseAdmin } from "@/app/lib/supabase/server";

export type ReserveResult =
  | { ok: true; optimizationId: string }
  | { ok: false; code: string };

export async function reserveOptimizationCredit(
  userId: string,
  resumeText: string,
  jobDescription: string
): Promise<ReserveResult> {
  const supabase = getSupabaseAdmin();
  const resumeHash = crypto.createHash("md5").update(resumeText.slice(0, 8000)).digest("hex");
  const jdHash = crypto.createHash("md5").update(jobDescription.slice(0, 8000)).digest("hex");
  const { data, error } = await supabase.rpc("billing_reserve_optimization", {
    p_user_id: userId,
    p_resume_hash: resumeHash,
    p_jd_hash: jdHash,
  });
  if (error) {
    console.error("[billing] reserveOptimizationCredit rpc error", error);
    return { ok: false, code: "RESERVE_FAILED" };
  }
  const row = data as { ok?: boolean; code?: string; optimization_id?: string } | null;
  if (!row?.ok) {
    return { ok: false, code: typeof row?.code === "string" ? row.code : "NO_CREDITS" };
  }
  if (typeof row.optimization_id !== "string") {
    return { ok: false, code: "RESERVE_FAILED" };
  }
  return { ok: true, optimizationId: row.optimization_id };
}

export async function finalizeOptimizationCredit(
  optimizationId: string,
  userId: string,
  success: boolean
): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.rpc("billing_finalize_optimization", {
    p_optimization_id: optimizationId,
    p_user_id: userId,
    p_success: success,
  });
  if (error) {
    console.error("[billing] finalizeOptimizationCredit rpc error", error);
  }
}
