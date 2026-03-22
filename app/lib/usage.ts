import { getSupabaseAdmin } from "@/app/lib/supabase/server";

export type UsageType = "anon" | "member";

export type Usage = {
  type: UsageType;
  /** Available optimization credits (not held in reserve). */
  creditsRemaining: number;
  creditsReserved: number;
  creditsPurchased: number;
  creditsConsumed: number;
  showFullIntelligence: boolean;
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
    };
  }

  const { data: wallet } = await supabase
    .from("credit_wallets")
    .select(
      "credits_remaining, credits_reserved, credits_purchased_total, credits_consumed_total"
    )
    .eq("user_id", user.id)
    .maybeSingle();

  return {
    type: "member",
    creditsRemaining: wallet?.credits_remaining ?? 0,
    creditsReserved: wallet?.credits_reserved ?? 0,
    creditsPurchased: wallet?.credits_purchased_total ?? 0,
    creditsConsumed: wallet?.credits_consumed_total ?? 0,
    showFullIntelligence: true,
  };
}
