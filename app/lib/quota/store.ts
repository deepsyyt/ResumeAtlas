import { getSupabaseAdmin } from "@/app/lib/supabase/server";
import { ANALYSIS_QUOTA_LIMITS } from "./constants";
import type { AnalysisActor, AnalysisQuotaStatus } from "./types";

const WINDOW_MS = 24 * 60 * 60 * 1000;

export type RecordUsageParams = {
  actor: AnalysisActor;
  resumeHash?: string | null;
  jdHash?: string | null;
};

export async function recordAnalysisUsage(params: RecordUsageParams): Promise<void> {
  const { actor, resumeHash, jdHash } = params;
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("analysis_usage").insert({
    user_id: actor.userId,
    anonymous_id: actor.anonymousId,
    ip_hash: actor.ipHash,
    resume_hash: resumeHash || null,
    jd_hash: jdHash || null,
  });
  if (error) {
    console.error(
      "[quota] recordAnalysisUsage failed",
      error.message,
      error.code,
      error.details,
      error.hint
    );
    const hint =
      error.code === "42501" || /permission denied|row-level security/i.test(error.message)
        ? " Use SUPABASE_SERVICE_ROLE_KEY from Supabase Dashboard → Settings → API (secret service_role key), not the anon/publishable key."
        : "";
    throw new Error(`Failed to record analysis usage${hint}`);
  }
}

export async function getAnalysisQuotaStatus(actor: AnalysisActor): Promise<AnalysisQuotaStatus> {
  const supabase = getSupabaseAdmin();
  const since = new Date(Date.now() - WINDOW_MS).toISOString();
  const limit = actor.scope === "user" ? ANALYSIS_QUOTA_LIMITS.user : ANALYSIS_QUOTA_LIMITS.anonymous;

  let query = supabase
    .from("analysis_usage")
    .select("created_at", { count: "exact" })
    .gte("created_at", since)
    .order("created_at", { ascending: true });

  if (actor.userId) {
    query = query.eq("user_id", actor.userId);
  } else if (actor.anonymousId) {
    query = query.eq("anonymous_id", actor.anonymousId);
  } else {
    return {
      allowed: false,
      remaining: 0,
      used: 0,
      limit,
      scope: actor.scope,
    };
  }

  const { count, data, error } = await query.limit(limit + 1);
  if (error) {
    console.error("[quota] getAnalysisQuotaStatus failed", error.message);
    throw new Error("Failed to check quota");
  }

  const used = count ?? 0;
  const remaining = Math.max(0, limit - used);
  const allowed = used < limit;

  let resetAt: string | undefined;
  if (used >= limit && data && data.length > 0) {
    const oldest = (data[0] as { created_at?: string }).created_at;
    if (oldest) {
      const reset = new Date(new Date(oldest).getTime() + WINDOW_MS);
      resetAt = reset.toISOString();
    }
  }

  return {
    allowed,
    remaining,
    used,
    limit,
    resetAt,
    scope: actor.scope,
  };
}
