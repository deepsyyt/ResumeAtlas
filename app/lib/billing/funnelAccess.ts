import { getBearerUser } from "@/app/lib/billing/requestUser";
import { getFunnelWallet, openFunnel } from "@/app/lib/billing/funnelServer";
import {
  getAnalysisQuotaStatus,
  recordSuccessfulAnalysis,
  resolveAnalysisActor,
  type AnalysisActor,
  type AnalysisQuotaStatus,
  type QuotaExceededPayload,
} from "@/app/lib/quota";

export type AnalysisAccessSource = "free" | "pack";

export type AnalysisAccess = {
  actor: AnalysisActor;
  source: AnalysisAccessSource;
  quotaStatus: AnalysisQuotaStatus | null;
};

export type IncompleteFunnelPayload = {
  code: "INCOMPLETE_FUNNEL";
  message: string;
};

const FREE_EXHAUSTED_MESSAGE =
  "You've used your free ATS scan for this month. Upgrade for 5 full runs: scan → optimize → download.";
const ANON_EXHAUSTED_MESSAGE =
  "You've used your free ATS scan for this month. Sign in and upgrade for 5 full runs.";
const INCOMPLETE_FUNNEL_MESSAGE =
  "Finish optimizing and downloading your current resume before starting a new scan.";

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

function incompleteFunnelError(): Error & { funnelPayload: IncompleteFunnelPayload } {
  const err = new Error(INCOMPLETE_FUNNEL_MESSAGE) as Error & {
    funnelPayload: IncompleteFunnelPayload;
  };
  err.funnelPayload = {
    code: "INCOMPLETE_FUNNEL",
    message: INCOMPLETE_FUNNEL_MESSAGE,
  };
  return err;
}

/**
 * Free quota first; logged-in users with pack credits may start a new funnel when none is active.
 */
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
  if (wallet.activeFunnel) {
    throw incompleteFunnelError();
  }

  if (wallet.creditsRemaining > 0) {
    return { actor, source: "pack", quotaStatus: null };
  }

  throw quotaExceededError(FREE_EXHAUSTED_MESSAGE, quotaStatus, true);
}

export async function commitAnalysisFunnel(
  access: AnalysisAccess,
  resumeText: string,
  jobDescription: string
): Promise<void> {
  if (access.source === "free") {
    await recordSuccessfulAnalysis(access.actor, resumeText, jobDescription);
    if (access.actor.userId) {
      const opened = await openFunnel(
        access.actor.userId,
        resumeText,
        jobDescription,
        "free"
      );
      if (!opened.ok) {
        throw new Error(
          opened.code === "INCOMPLETE_FUNNEL"
            ? INCOMPLETE_FUNNEL_MESSAGE
            : "Could not start your free application flow. Try again."
        );
      }
    }
    return;
  }

  if (!access.actor.userId) {
    throw new Error("Pack-funded analysis requires login.");
  }

  const opened = await openFunnel(
    access.actor.userId,
    resumeText,
    jobDescription,
    "pack"
  );
  if (!opened.ok) {
    const msg =
      opened.code === "NO_CREDITS"
        ? "No application credits remaining. Buy a pack to continue."
        : opened.code === "INCOMPLETE_FUNNEL"
          ? INCOMPLETE_FUNNEL_MESSAGE
          : "Unable to start a new application flow. Try again.";
    throw new Error(msg);
  }
}

/** Opens or resumes the scan → optimize funnel before running optimization. */
export async function ensureFunnelForOptimize(
  userId: string,
  resumeText: string,
  jobDescription: string
): Promise<{ ok: true } | { ok: false; code: string; message: string }> {
  const wallet = await getFunnelWallet(userId);
  if (wallet.activeFunnel?.stage === "analyzed") {
    return { ok: true };
  }
  if (wallet.activeFunnel?.stage === "optimized") {
    return {
      ok: false,
      code: "ALREADY_OPTIMIZED",
      message:
        "This application flow is already optimized. Download your resume or finish your current funnel before optimizing again.",
    };
  }
  if (wallet.activeFunnel) {
    return {
      ok: false,
      code: "INCOMPLETE_FUNNEL",
      message: INCOMPLETE_FUNNEL_MESSAGE,
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
    const opened = await openFunnel(userId, resumeText, jobDescription, "free");
    if (!opened.ok) {
      return {
        ok: false,
        code: opened.code,
        message: "Could not start your free application flow. Try again.",
      };
    }
    return { ok: true };
  }

  if (wallet.creditsRemaining > 0) {
    const opened = await openFunnel(userId, resumeText, jobDescription, "pack");
    if (!opened.ok) {
      return {
        ok: false,
        code: opened.code,
        message:
          opened.code === "NO_CREDITS"
            ? "No application credits remaining. Buy a pack to continue."
            : "Could not start a paid application flow. Try again.",
      };
    }
    return { ok: true };
  }

  return {
    ok: false,
    code: "PURCHASE_REQUIRED",
    message: FREE_EXHAUSTED_MESSAGE,
  };
}

/** Whether the caller can buy another pack (no unused credits, no open funnel). */
export async function canPurchaseFunnelPack(request: Request): Promise<boolean> {
  const { user } = await getBearerUser(request);
  if (!user) return true;
  const wallet = await getFunnelWallet(user.id);
  return wallet.creditsRemaining <= 0 && !wallet.activeFunnel;
}
