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

export function quotaStatusConsistent(status: AnalysisQuotaStatus): boolean {
  const limit = status.scope === "user" ? ANALYSIS_QUOTA_LIMITS.user : ANALYSIS_QUOTA_LIMITS.anonymous;
  if (status.limit !== limit) return false;
  if (status.used + status.remaining !== limit && status.remaining > 0) return false;
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
