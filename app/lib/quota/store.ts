import { getSupabaseAdmin } from "@/app/lib/supabase/server";
import { ANALYSIS_QUOTA_LIMITS, ANALYSIS_QUOTA_WINDOW_MS } from "./constants";
import type { AnalysisActor, AnalysisQuotaStatus } from "./types";
import { normalizeQuotaStatus } from "./validate";

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
  const windowMs = ANALYSIS_QUOTA_WINDOW_MS[actor.scope];
  const since = new Date(Date.now() - windowMs).toISOString();
  const limit = actor.scope === "user" ? ANALYSIS_QUOTA_LIMITS.user : ANALYSIS_QUOTA_LIMITS.anonymous;

  let query = supabase
    .from("analysis_usage")
    .select("created_at", { count: "exact" })
    .gte("created_at", since)
    .order("created_at", { ascending: true });

  if (actor.userId) {
    query = query.eq("user_id", actor.userId);
  } else if (actor.scope === "anonymous") {
    // Anonymous free scan: 1 per rolling month per ra_anon_id cookie.
    query = query.is("user_id", null);
    if (actor.anonymousId) {
      query = query.eq("anonymous_id", actor.anonymousId);
    } else if (actor.ipHash) {
      query = query.eq("ip_hash", actor.ipHash);
    } else {
      return {
        allowed: false,
        remaining: 0,
        used: 0,
        limit,
        scope: actor.scope,
      };
    }
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

  const rawUsed = count ?? 0;
  const used = Math.min(rawUsed, limit);
  const remaining = Math.max(0, limit - rawUsed);
  const allowed = rawUsed < limit;

  let resetAt: string | undefined;
  if (used >= limit && data && data.length > 0) {
    const oldest = (data[0] as { created_at?: string }).created_at;
    if (oldest) {
      const reset = new Date(new Date(oldest).getTime() + windowMs);
      resetAt = reset.toISOString();
    }
  }

  return normalizeQuotaStatus({
    allowed,
    remaining,
    used,
    limit,
    resetAt,
    scope: actor.scope,
  });
}
