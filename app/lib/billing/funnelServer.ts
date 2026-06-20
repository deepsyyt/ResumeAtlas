import crypto from "crypto";
import { getSupabaseAdmin } from "@/app/lib/supabase/server";

export type ApplicationState = "analyzed" | "optimized" | "completed";
export type ApplicationSource = "free" | "pack";

export type ActiveApplication = {
  id: string;
  state: ApplicationState;
  source: ApplicationSource;
  creditDeducted: boolean;
  downloadUnlocked: boolean;
};

export type FunnelWalletSnapshot = {
  creditsRemaining: number;
  creditsConsumed: number;
  activeApplication: ActiveApplication | null;
  /** @deprecated mirror of activeApplication.state for clients not yet migrated */
  activeFunnel: {
    stage: "analyzed" | "optimized";
    source: ApplicationSource;
  } | null;
};

export type StartApplicationResult =
  | {
      ok: true;
      applicationId: string;
      source: ApplicationSource;
      creditUsed: boolean;
    }
  | { ok: false; code: string };

export function funnelContentHashes(resumeText: string, jobDescription: string): {
  resumeHash: string;
  jdHash: string;
} {
  const resumeHash = crypto
    .createHash("md5")
    .update(resumeText.slice(0, 8000))
    .digest("hex");
  const jdHash = crypto
    .createHash("md5")
    .update(jobDescription.slice(0, 8000))
    .digest("hex");
  return { resumeHash, jdHash };
}

async function fetchWalletRow(userId: string) {
  const supabase = getSupabaseAdmin();
  const { data: wallet } = await supabase
    .from("credit_wallets")
    .select(
      "credits_remaining, credits_consumed_total, active_application_id, funnel_stage, funnel_source"
    )
    .eq("user_id", userId)
    .maybeSingle();

  let application: ActiveApplication | null = null;
  if (wallet?.active_application_id) {
    const { data: app } = await supabase
      .from("job_applications")
      .select("id, state, source, credit_deducted, download_unlocked")
      .eq("id", wallet.active_application_id)
      .eq("user_id", userId)
      .maybeSingle();
    if (
      app &&
      (app.state === "analyzed" || app.state === "optimized") &&
      (app.source === "free" || app.source === "pack")
    ) {
      application = {
        id: app.id,
        state: app.state,
        source: app.source,
        creditDeducted: app.credit_deducted === true,
        downloadUnlocked: app.download_unlocked === true,
      };
    }
  } else if (
    wallet?.funnel_stage === "analyzed" ||
    wallet?.funnel_stage === "optimized"
  ) {
    application = {
      id: "legacy",
      state: wallet.funnel_stage,
      source: wallet.funnel_source === "pack" ? "pack" : "free",
      creditDeducted: wallet.funnel_source === "pack",
      downloadUnlocked: false,
    };
  }

  return { wallet, application };
}

export async function getFunnelWallet(userId: string): Promise<FunnelWalletSnapshot> {
  const { wallet, application } = await fetchWalletRow(userId);
  return {
    creditsRemaining: wallet?.credits_remaining ?? 0,
    creditsConsumed: wallet?.credits_consumed_total ?? 0,
    activeApplication: application,
    activeFunnel: application
      ? { stage: application.state as "analyzed" | "optimized", source: application.source }
      : null,
  };
}

export async function startApplication(
  userId: string,
  resumeText: string,
  jobDescription: string,
  source: ApplicationSource,
  analysisResult: unknown
): Promise<StartApplicationResult> {
  const { resumeHash, jdHash } = funnelContentHashes(resumeText, jobDescription);
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.rpc("billing_start_application", {
    p_user_id: userId,
    p_resume_hash: resumeHash,
    p_jd_hash: jdHash,
    p_source: source,
    p_resume_text: resumeText.slice(0, 12000),
    p_job_description: jobDescription.slice(0, 12000),
    p_analysis: analysisResult ?? null,
  });
  if (error) {
    console.error("[application] startApplication rpc error", error);
    return { ok: false, code: "START_FAILED" };
  }
  const row = data as {
    ok?: boolean;
    code?: string;
    application_id?: string;
    source?: ApplicationSource;
    credit_used?: boolean;
  } | null;
  if (!row?.ok || typeof row.application_id !== "string") {
    return { ok: false, code: typeof row?.code === "string" ? row.code : "START_FAILED" };
  }
  return {
    ok: true,
    applicationId: row.application_id,
    source: row.source === "pack" ? "pack" : "free",
    creditUsed: row.credit_used === true,
  };
}

export async function advanceApplicationToOptimized(
  userId: string
): Promise<{ ok: true } | { ok: false; code: string }> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.rpc("billing_advance_application", {
    p_user_id: userId,
  });
  if (error) {
    console.error("[application] advance rpc error", error);
    return { ok: false, code: "ADVANCE_FAILED" };
  }
  const row = data as { ok?: boolean; code?: string } | null;
  if (!row?.ok) {
    return { ok: false, code: typeof row?.code === "string" ? row.code : "BAD_STATE" };
  }
  return { ok: true };
}

export async function completeApplication(
  userId: string
): Promise<{ ok: true } | { ok: false; code: string }> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.rpc("billing_complete_application", {
    p_user_id: userId,
  });
  if (error) {
    console.error("[application] complete rpc error", error);
    return { ok: false, code: "COMPLETE_FAILED" };
  }
  const row = data as { ok?: boolean; code?: string } | null;
  if (!row?.ok) {
    return { ok: false, code: typeof row?.code === "string" ? row.code : "BAD_STATE" };
  }
  return { ok: true };
}

export async function unlockApplicationDownload(
  userId: string
): Promise<{ ok: true } | { ok: false; code: string }> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.rpc("billing_unlock_application_download", {
    p_user_id: userId,
  });
  if (error) {
    console.error("[application] unlock download rpc error", error);
    return { ok: false, code: "UNLOCK_FAILED" };
  }
  const row = data as { ok?: boolean; code?: string } | null;
  if (!row?.ok) {
    return { ok: false, code: typeof row?.code === "string" ? row.code : "BAD_STATE" };
  }
  return { ok: true };
}

export async function assertFunnelAllowsOptimize(userId: string): Promise<
  | { ok: true }
  | { ok: false; code: string; message: string }
> {
  const wallet = await getFunnelWallet(userId);
  const app = wallet.activeApplication;
  if (!app) {
    return {
      ok: false,
      code: "APPLICATION_REQUIRED",
      message: "Run a job check on this resume first, then tailor it.",
    };
  }
  if (app.state !== "analyzed") {
    return {
      ok: false,
      code: "BAD_STATE",
      message:
        app.state === "optimized"
          ? "Your resume is already tailored. Download it, or finish this job before starting another check."
          : "Finish this job before starting another check.",
    };
  }
  return { ok: true };
}

export async function assertFunnelAllowsDownload(userId: string): Promise<
  | { ok: true; source: ApplicationSource; paymentRequired: boolean }
  | { ok: false; code: string; message: string }
> {
  const wallet = await getFunnelWallet(userId);
  const app = wallet.activeApplication;
  if (!app || app.state !== "optimized") {
    return {
      ok: false,
      code: "OPTIMIZE_REQUIRED",
      message: "Tailor your resume before downloading the ATS-ready file.",
    };
  }
  if (app.source === "free" && !app.downloadUnlocked) {
    return {
      ok: true,
      source: "free",
      paymentRequired: true,
    };
  }
  return { ok: true, source: app.source, paymentRequired: false };
}
