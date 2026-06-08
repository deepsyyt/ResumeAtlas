/**
 * Lightweight validation helpers for quota logic.
 * Use in tests or runtime checks.
 */

import type { AnalysisQuotaStatus } from "./types";
import { ANALYSIS_QUOTA_LIMITS } from "./constants";

export function isValidQuotaStatus(obj: unknown): obj is AnalysisQuotaStatus {
  if (!obj || typeof obj !== "object") return false;
  const o = obj as Record<string, unknown>;
  return (
    typeof o.allowed === "boolean" &&
    typeof o.remaining === "number" &&
    typeof o.used === "number" &&
    typeof o.limit === "number" &&
    (o.scope === "anonymous" || o.scope === "user") &&
    o.remaining >= 0 &&
    o.used >= 0 &&
    o.limit >= 0
  );
}

/** Caps display/enforcement fields so used never exceeds limit. */
export function normalizeQuotaStatus(status: AnalysisQuotaStatus): AnalysisQuotaStatus {
  const used = Math.min(Math.max(0, status.used), status.limit);
  const remaining = Math.max(0, status.limit - used);
  return {
    ...status,
    used,
    remaining,
    allowed: used < status.limit,
  };
}

export function quotaAfterSuccessfulUse(
  before: AnalysisQuotaStatus
): Pick<AnalysisQuotaStatus, "remaining" | "used" | "limit" | "scope"> {
  const used = Math.min(before.limit, before.used + 1);
  const remaining = Math.max(0, before.limit - used);
  return { used, remaining, limit: before.limit, scope: before.scope };
}

export function quotaStatusConsistent(status: AnalysisQuotaStatus): boolean {
  const limit = status.scope === "user" ? ANALYSIS_QUOTA_LIMITS.user : ANALYSIS_QUOTA_LIMITS.anonymous;
  if (status.limit !== limit) return false;
  if (status.used > limit) return false;
  if (status.used + status.remaining !== limit) return false;
  if (status.used >= limit && status.allowed) return false;
  if (status.used < limit && !status.allowed) return false;
  return true;
}

export function isQuotaExceededPayload(
  obj: unknown
): obj is { code: string; message: string; quota: AnalysisQuotaStatus } {
  if (!obj || typeof obj !== "object") return false;
  const o = obj as Record<string, unknown>;
  return (
    o.code === "ANALYSIS_QUOTA_EXCEEDED" &&
    typeof o.message === "string" &&
    isValidQuotaStatus(o.quota)
  );
}
