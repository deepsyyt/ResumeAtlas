import { getBearerUser } from "@/app/lib/billing/requestUser";
import {
  getFunnelWallet,
  startApplication,
  type ApplicationSource,
} from "@/app/lib/billing/funnelServer";
import { getSupabaseAdmin } from "@/app/lib/supabase/server";
import {
  getAnalysisQuotaStatus,
  recordSuccessfulAnalysis,
  resolveAnalysisActor,
  type AnalysisActor,
  type AnalysisQuotaStatus,
  type QuotaExceededPayload,
} from "@/app/lib/quota";
import { ANALYSIS_QUOTA_WINDOW_MS } from "@/app/lib/quota/constants";
import { hashText } from "@/app/lib/quota/hash";
import { getOrCreateAnonymousAnalysisIdentity } from "@/app/lib/quota/identity";

export type AnalysisAccessSource = "free" | "pack";

export type AnalysisAccess = {
  actor: AnalysisActor;
  source: AnalysisAccessSource;
  quotaStatus: AnalysisQuotaStatus | null;
};

export type ApplicationCommitResult = {
  applicationId: string;
  source: ApplicationSource;
  creditUsed: boolean;
};

export type IncompleteFunnelPayload = {
  code: "INCOMPLETE_FUNNEL";
  message: string;
};

const FREE_EXHAUSTED_MESSAGE =
  "You've used your free scan for this month. Get 5 job credits for $2.99: check, optimize, and download for five jobs.";
const ANON_EXHAUSTED_MESSAGE =
  "You've used your free scan for this month. Sign in to get 5 job credits for $2.99.";
const INCOMPLETE_APPLICATION_MESSAGE =
  "Finish optimizing and downloading this resume before you check another job.";

function quotaExceededError(
  message: string,
  quota: AnalysisQuotaStatus,
  purchaseRequired = false
): Error & { quotaPayload: QuotaExceededPayload & { purchaseRequired?: boolean } } {
  const err = new Error(message) as Error & {
    quotaPayload: QuotaExceededPayload & { purchaseRequired?: boolean };
  };
  err.quotaPayload = {
    code: "ANALYSIS_QUOTA_EXCEEDED",
    message,
    quota,
    ...(purchaseRequired ? { purchaseRequired: true } : {}),
  };
  return err;
}

function incompleteApplicationError(): Error & { funnelPayload: IncompleteFunnelPayload } {
  const err = new Error(INCOMPLETE_APPLICATION_MESSAGE) as Error & {
    funnelPayload: IncompleteFunnelPayload;
  };
  err.funnelPayload = {
    code: "INCOMPLETE_FUNNEL",
    message: INCOMPLETE_APPLICATION_MESSAGE,
  };
  return err;
}

export async function assertCanRunAnalysisOrThrow(
  request: Request
): Promise<AnalysisAccess> {
  const actor = await resolveAnalysisActor(request);
  const quotaStatus = await getAnalysisQuotaStatus(actor);

  if (quotaStatus.allowed) {
    return { actor, source: "free", quotaStatus };
  }

  if (!actor.userId) {
    throw quotaExceededError(ANON_EXHAUSTED_MESSAGE, quotaStatus);
  }

  const wallet = await getFunnelWallet(actor.userId);
  if (wallet.activeApplication) {
    throw incompleteApplicationError();
  }

  if (wallet.creditsRemaining > 0) {
    return { actor, source: "pack", quotaStatus: null };
  }

  throw quotaExceededError(FREE_EXHAUSTED_MESSAGE, quotaStatus, true);
}

export async function commitAnalysisApplication(
  access: AnalysisAccess,
  resumeText: string,
  jobDescription: string,
  analysisResult: unknown
): Promise<ApplicationCommitResult | null> {
  if (access.source === "free") {
    await recordSuccessfulAnalysis(access.actor, resumeText, jobDescription);
    if (!access.actor.userId) {
      return null;
    }
    const started = await startApplication(
      access.actor.userId,
      resumeText,
      jobDescription,
      "free",
      analysisResult
    );
    if (!started.ok) {
      throw new Error(
        started.code === "INCOMPLETE_APPLICATION"
          ? INCOMPLETE_APPLICATION_MESSAGE
          : "Could not save your job check. Please try again."
      );
    }
    return {
      applicationId: started.applicationId,
      source: started.source,
      creditUsed: false,
    };
  }

  if (!access.actor.userId) {
    throw new Error("Pack-funded analysis requires login.");
  }

  const started = await startApplication(
    access.actor.userId,
    resumeText,
    jobDescription,
    "pack",
    analysisResult
  );
  if (!started.ok) {
    const msg =
      started.code === "NO_CREDITS"
        ? "No credits left. Buy a pack to continue."
        : started.code === "INCOMPLETE_APPLICATION"
          ? INCOMPLETE_APPLICATION_MESSAGE
          : "Unable to start a new job check. Try again.";
    throw new Error(msg);
  }
  return {
    applicationId: started.applicationId,
    source: started.source,
    creditUsed: started.creditUsed,
  };
}

async function hasClaimableAnonymousScan(
  anonymousId: string,
  resumeText: string,
  jobDescription: string
): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  const since = new Date(Date.now() - ANALYSIS_QUOTA_WINDOW_MS.anonymous).toISOString();
  const resumeHash = resumeText ? hashText(resumeText).slice(0, 32) : null;
  const jdHash = jobDescription ? hashText(jobDescription).slice(0, 32) : null;

  let query = supabase
    .from("analysis_usage")
    .select("id", { count: "exact", head: true })
    .is("user_id", null)
    .eq("anonymous_id", anonymousId)
    .gte("created_at", since);

  if (resumeHash) query = query.eq("resume_hash", resumeHash);
  if (jdHash) query = query.eq("jd_hash", jdHash);

  const { count, error } = await query;
  if (error) {
    console.error("[application] hasClaimableAnonymousScan failed", error.message);
    return false;
  }
  return (count ?? 0) > 0;
}

async function startApplicationFromAnalysis(
  userId: string,
  resumeText: string,
  jobDescription: string,
  analysisResult: unknown
): Promise<{ ok: true } | { ok: false; code: string; message: string }> {
  const started = await startApplication(
    userId,
    resumeText,
    jobDescription,
    "free",
    analysisResult
  );
  if (!started.ok) {
    return {
      ok: false,
      code: started.code,
      message: "Something went wrong saving your job check. Please try again.",
    };
  }
  return { ok: true };
}

/** Resume a free scan after sign-in (anonymous analyzed first). */
export async function ensureApplicationForOptimize(
  userId: string,
  resumeText: string,
  jobDescription: string,
  analysisResult: unknown
): Promise<{ ok: true } | { ok: false; code: string; message: string }> {
  const wallet = await getFunnelWallet(userId);
  if (wallet.activeApplication?.state === "analyzed") {
    return { ok: true };
  }
  if (wallet.activeApplication?.state === "optimized") {
    return {
      ok: false,
      code: "ALREADY_OPTIMIZED",
      message:
        "This resume is already optimized. Download it, or finish this job before optimizing again.",
    };
  }
  if (wallet.activeApplication) {
    return {
      ok: false,
      code: "INCOMPLETE_FUNNEL",
      message: INCOMPLETE_APPLICATION_MESSAGE,
    };
  }

  const actor = {
    userId,
    anonymousId: null,
    ipHash: "",
    scope: "user" as const,
  };
  const quotaStatus = await getAnalysisQuotaStatus(actor);

  if (quotaStatus.allowed) {
    await recordSuccessfulAnalysis(actor, resumeText, jobDescription);
    return startApplicationFromAnalysis(userId, resumeText, jobDescription, analysisResult);
  }

  // Anonymous scan → sign-in → optimize: link the existing scan without a second job check.
  const { anonymousId } = await getOrCreateAnonymousAnalysisIdentity();
  if (
    anonymousId &&
    (await hasClaimableAnonymousScan(anonymousId, resumeText, jobDescription))
  ) {
    return startApplicationFromAnalysis(userId, resumeText, jobDescription, analysisResult);
  }

  if ((wallet.creditsRemaining ?? 0) > 0) {
    const started = await startApplication(
      userId,
      resumeText,
      jobDescription,
      "pack",
      analysisResult
    );
    if (started.ok) {
      return { ok: true };
    }
  }

  return {
    ok: false,
    code: "APPLICATION_REQUIRED",
    message:
      quotaStatus.remaining <= 0
        ? FREE_EXHAUSTED_MESSAGE
        : "Run a job check first, then optimize your resume.",
  };
}

/** @deprecated */
export const commitAnalysisFunnel = commitAnalysisApplication;
/** @deprecated */
export const ensureFunnelForOptimize = ensureApplicationForOptimize;
