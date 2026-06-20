import { getSupabaseAdmin } from "@/app/lib/supabase/server";

export type UsageType = "anon" | "member";

export type Usage = {
  type: UsageType;
  creditsRemaining: number;
  creditsReserved: number;
  creditsPurchased: number;
  creditsConsumed: number;
  showFullIntelligence: boolean;
  funnelStage?: "analyzed" | "optimized" | null;
  hasIncompleteFunnel?: boolean;
  applicationSource?: "free" | "pack" | null;
  downloadPaymentRequired?: boolean;
};

export async function getUsage(
  _request: Request,
  accessToken?: string | null
): Promise<Usage> {
  const supabase = getSupabaseAdmin();

  if (!accessToken) {
    return {
      type: "anon",
      creditsRemaining: 0,
      creditsReserved: 0,
      creditsPurchased: 0,
      creditsConsumed: 0,
      showFullIntelligence: true,
      funnelStage: null,
      hasIncompleteFunnel: false,
      applicationSource: null,
      downloadPaymentRequired: false,
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser(accessToken);

  if (!user) {
    return {
      type: "anon",
      creditsRemaining: 0,
      creditsReserved: 0,
      creditsPurchased: 0,
      creditsConsumed: 0,
      showFullIntelligence: true,
      funnelStage: null,
      hasIncompleteFunnel: false,
      applicationSource: null,
      downloadPaymentRequired: false,
    };
  }

  const { data: wallet } = await supabase
    .from("credit_wallets")
    .select(
      "credits_remaining, credits_reserved, credits_purchased_total, credits_consumed_total, funnel_stage, active_application_id"
    )
    .eq("user_id", user.id)
    .maybeSingle();

  let applicationSource: "free" | "pack" | null = null;
  let downloadPaymentRequired = false;
  let funnelStage =
    wallet?.funnel_stage === "analyzed" || wallet?.funnel_stage === "optimized"
      ? wallet.funnel_stage
      : null;

  if (wallet?.active_application_id) {
    const { data: app } = await supabase
      .from("job_applications")
      .select("state, source, download_unlocked")
      .eq("id", wallet.active_application_id)
      .eq("user_id", user.id)
      .maybeSingle();
    if (app && (app.state === "analyzed" || app.state === "optimized")) {
      funnelStage = app.state;
      applicationSource = app.source === "pack" ? "pack" : "free";
      downloadPaymentRequired =
        app.source === "free" &&
        app.state === "optimized" &&
        app.download_unlocked !== true;
    }
  }

  return {
    type: "member",
    creditsRemaining: wallet?.credits_remaining ?? 0,
    creditsReserved: wallet?.credits_reserved ?? 0,
    creditsPurchased: wallet?.credits_purchased_total ?? 0,
    creditsConsumed: wallet?.credits_consumed_total ?? 0,
    showFullIntelligence: true,
    funnelStage,
    hasIncompleteFunnel: funnelStage != null,
    applicationSource,
    downloadPaymentRequired,
  };
}
