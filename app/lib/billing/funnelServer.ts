import crypto from "crypto";
import { getSupabaseAdmin } from "@/app/lib/supabase/server";

export type FunnelStage = "analyzed" | "optimized";
export type FunnelSource = "free" | "pack";

export type ActiveFunnel = {
  stage: FunnelStage;
  source: FunnelSource;
  resumeHash: string | null;
  jdHash: string | null;
};

export type FunnelWalletSnapshot = {
  creditsRemaining: number;
  creditsReserved: number;
  activeFunnel: ActiveFunnel | null;
};

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

function parseActiveFunnel(row: {
  funnel_stage?: string | null;
  funnel_source?: string | null;
  funnel_resume_hash?: string | null;
  funnel_jd_hash?: string | null;
} | null): ActiveFunnel | null {
  if (!row?.funnel_stage || (row.funnel_stage !== "analyzed" && row.funnel_stage !== "optimized")) {
    return null;
  }
  const source = row.funnel_source === "pack" ? "pack" : "free";
  return {
    stage: row.funnel_stage,
    source,
    resumeHash: row.funnel_resume_hash ?? null,
    jdHash: row.funnel_jd_hash ?? null,
  };
}

export async function getFunnelWallet(userId: string): Promise<FunnelWalletSnapshot> {
  const supabase = getSupabaseAdmin();
  const { data: wallet } = await supabase
    .from("credit_wallets")
    .select(
      "credits_remaining, credits_reserved, funnel_stage, funnel_source, funnel_resume_hash, funnel_jd_hash"
    )
    .eq("user_id", userId)
    .maybeSingle();

  return {
    creditsRemaining: wallet?.credits_remaining ?? 0,
    creditsReserved: wallet?.credits_reserved ?? 0,
    activeFunnel: parseActiveFunnel(wallet),
  };
}

export async function openFunnel(
  userId: string,
  resumeText: string,
  jobDescription: string,
  source: FunnelSource
): Promise<{ ok: true } | { ok: false; code: string }> {
  const { resumeHash, jdHash } = funnelContentHashes(resumeText, jobDescription);
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.rpc("billing_open_funnel", {
    p_user_id: userId,
    p_resume_hash: resumeHash,
    p_jd_hash: jdHash,
    p_source: source,
  });
  if (error) {
    console.error("[funnel] openFunnel rpc error", error);
    return { ok: false, code: "OPEN_FAILED" };
  }
  const row = data as { ok?: boolean; code?: string } | null;
  if (!row?.ok) {
    return { ok: false, code: typeof row?.code === "string" ? row.code : "OPEN_FAILED" };
  }
  return { ok: true };
}

export async function advanceFunnelToOptimized(
  userId: string
): Promise<{ ok: true } | { ok: false; code: string }> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.rpc("billing_advance_funnel", {
    p_user_id: userId,
  });
  if (error) {
    console.error("[funnel] advanceFunnel rpc error", error);
    return { ok: false, code: "ADVANCE_FAILED" };
  }
  const row = data as { ok?: boolean; code?: string } | null;
  if (!row?.ok) {
    return { ok: false, code: typeof row?.code === "string" ? row.code : "BAD_FUNNEL_STAGE" };
  }
  return { ok: true };
}

export async function completeFunnel(
  userId: string
): Promise<{ ok: true } | { ok: false; code: string }> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.rpc("billing_complete_funnel", {
    p_user_id: userId,
  });
  if (error) {
    console.error("[funnel] completeFunnel rpc error", error);
    return { ok: false, code: "COMPLETE_FAILED" };
  }
  const row = data as { ok?: boolean; code?: string } | null;
  if (!row?.ok) {
    return { ok: false, code: typeof row?.code === "string" ? row.code : "BAD_FUNNEL_STAGE" };
  }
  return { ok: true };
}

export async function assertFunnelAllowsOptimize(userId: string): Promise<
  | { ok: true }
  | { ok: false; code: string; message: string }
> {
  const wallet = await getFunnelWallet(userId);
  if (!wallet.activeFunnel) {
    return {
      ok: false,
      code: "FUNNEL_REQUIRED",
      message: "Run an ATS scan on this resume and job first, then optimize.",
    };
  }
  if (wallet.activeFunnel.stage !== "analyzed") {
    return {
      ok: false,
      code: "BAD_FUNNEL_STAGE",
      message:
        wallet.activeFunnel.stage === "optimized"
          ? "This resume is already optimized. Download it or start a new scan when your current funnel is finished."
          : "Complete your current scan → optimize → download flow before optimizing again.",
    };
  }
  return { ok: true };
}

export async function assertFunnelAllowsDownload(userId: string): Promise<
  | { ok: true }
  | { ok: false; code: string; message: string }
> {
  const wallet = await getFunnelWallet(userId);
  if (!wallet.activeFunnel || wallet.activeFunnel.stage !== "optimized") {
    return {
      ok: false,
      code: "OPTIMIZE_REQUIRED",
      message: "Optimize your resume before downloading the ATS-friendly file.",
    };
  }
  return { ok: true };
}
