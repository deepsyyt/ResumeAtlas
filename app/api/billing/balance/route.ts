import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/app/lib/supabase/server";
import { getBearerUser } from "@/app/lib/billing/requestUser";

export async function GET(request: Request) {
  try {
    const { user } = await getBearerUser(request);
    if (!user) {
      return NextResponse.json(
        { error: "Login required.", code: "UNAUTHORIZED" },
        { status: 401 }
      );
    }

    const supabase = getSupabaseAdmin();
    const { data: wallet } = await supabase
      .from("credit_wallets")
      .select("credits_remaining, credits_reserved, credits_purchased_total, credits_consumed_total")
      .eq("user_id", user.id)
      .maybeSingle();

    const creditsRemaining = wallet?.credits_remaining ?? 0;
    const creditsReserved = wallet?.credits_reserved ?? 0;
    const creditsPurchased = wallet?.credits_purchased_total ?? 0;
    const creditsConsumed = wallet?.credits_consumed_total ?? 0;

    return NextResponse.json({
      creditsRemaining,
      creditsReserved,
      creditsPurchased,
      creditsConsumed,
    });
  } catch (e) {
    console.error("[billing/balance]", e);
    return NextResponse.json({ error: "Balance check failed" }, { status: 500 });
  }
}
