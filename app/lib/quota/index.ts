export { ANALYSIS_QUOTA_LIMITS, ANONYMOUS_ID_COOKIE } from "./constants";
export { getClientIp, hashIp } from "./ip";
export { getOrCreateAnonymousAnalysisIdentity } from "./identity";
export { getAnalysisQuotaStatus, recordAnalysisUsage } from "./store";
export { hashText, hashResumeJd } from "./hash";
export type { AnalysisActor, AnalysisQuotaStatus, AnalysisQuotaScope } from "./types";
export type { RecordUsageParams } from "./store";

import { getBearerUser } from "@/app/lib/billing/requestUser";
import { getOrCreateAnonymousAnalysisIdentity } from "./identity";
import { getClientIp, hashIp } from "./ip";
import { getAnalysisQuotaStatus, recordAnalysisUsage } from "./store";
import { hashText } from "./hash";
import type { AnalysisActor, AnalysisQuotaStatus } from "./types";

export type QuotaExceededPayload = {
  code: "ANALYSIS_QUOTA_EXCEEDED";
  message: string;
  quota: AnalysisQuotaStatus;
};

const ANON_MESSAGE =
  "You've used your guest free scan. Sign in with Google to run one more free scan this month.";
const USER_MESSAGE =
  "You've used your free scan for this month. Get 5 job credits for $2.99.";

/**
 * Resolves the actor for quota: signed-in user takes precedence; otherwise anonymous.
 * Anonymous quota is 1 scan per rolling month per `ra_anon_id` cookie. IP is recorded for
 * abuse signals only; when the cookie is missing we fall back to `ip_hash`.
 */
export async function resolveAnalysisActor(request: Request): Promise<AnalysisActor> {
  const { user } = await getBearerUser(request);
  if (user) {
    return {
      userId: user.id,
      anonymousId: null,
      ipHash: hashIp(getClientIp(request)),
      scope: "user",
    };
  }
  const { anonymousId } = await getOrCreateAnonymousAnalysisIdentity(request);
  return {
    userId: null,
    anonymousId,
    ipHash: hashIp(getClientIp(request)),
    scope: "anonymous",
  };
}

/**
 * Checks quota and throws if exceeded. Use before running analysis.
 */
export async function assertAnalysisQuotaOrThrow(
  request: Request
): Promise<{ actor: AnalysisActor; status: AnalysisQuotaStatus }> {
  const actor = await resolveAnalysisActor(request);
  const status = await getAnalysisQuotaStatus(actor);
  if (!status.allowed) {
    const err = new Error(status.scope === "anonymous" ? ANON_MESSAGE : USER_MESSAGE) as Error & {
      quotaPayload: QuotaExceededPayload;
    };
    err.quotaPayload = {
      code: "ANALYSIS_QUOTA_EXCEEDED",
      message: status.scope === "anonymous" ? ANON_MESSAGE : USER_MESSAGE,
      quota: status,
    };
    throw err;
  }
  return { actor, status };
}

/**
 * Records one analysis usage after a successful run. Call only after LLM returns valid result.
 */
export async function recordSuccessfulAnalysis(
  actor: AnalysisActor,
  resumeText: string,
  jobDescription: string
): Promise<void> {
  const resumeHash = resumeText ? hashText(resumeText).slice(0, 32) : null;
  const jdHash = jobDescription ? hashText(jobDescription).slice(0, 32) : null;
  await recordAnalysisUsage({
    actor,
    resumeHash,
    jdHash,
  });
}
