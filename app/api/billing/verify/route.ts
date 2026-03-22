import crypto from "crypto";
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/app/lib/supabase/server";
import { getBearerUser } from "@/app/lib/billing/requestUser";
import { assertRazorpayConfigured } from "@/app/lib/billing/razorpayConfig";

type Body = {
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
};

async function walletSnapshot(supabase: ReturnType<typeof getSupabaseAdmin>, userId: string) {
  const { data: wallet } = await supabase
    .from("credit_wallets")
    .select("credits_remaining, credits_reserved, credits_purchased_total, credits_consumed_total")
    .eq("user_id", userId)
    .maybeSingle();
  return {
    creditsRemaining: wallet?.credits_remaining ?? 0,
    creditsReserved: wallet?.credits_reserved ?? 0,
    creditsPurchased: wallet?.credits_purchased_total ?? 0,
    creditsConsumed: wallet?.credits_consumed_total ?? 0,
  };
}

export async function POST(request: Request) {
  try {
    const { user } = await getBearerUser(request);
    if (!user) {
      return NextResponse.json(
        { error: "Login required.", code: "UNAUTHORIZED" },
        { status: 401 }
      );
    }

    let body: Body;
    try {
      body = (await request.json()) as Body;
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const orderId = typeof body.razorpay_order_id === "string" ? body.razorpay_order_id.trim() : "";
    const paymentId =
      typeof body.razorpay_payment_id === "string" ? body.razorpay_payment_id.trim() : "";
    const signature =
      typeof body.razorpay_signature === "string" ? body.razorpay_signature.trim() : "";

    if (!orderId || !paymentId || !signature) {
      return NextResponse.json(
        { error: "razorpay_order_id, razorpay_payment_id, and razorpay_signature are required" },
        { status: 400 }
      );
    }

    const { keySecret } = assertRazorpayConfigured();
    const expected = crypto
      .createHmac("sha256", keySecret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    const a = Buffer.from(expected, "utf8");
    const b = Buffer.from(signature, "utf8");
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { data: payment, error: fetchErr } = await supabase
      .from("payments")
      .select("id, user_id, status, credits_granted")
      .eq("provider_order_id", orderId)
      .eq("user_id", user.id)
      .maybeSingle();

    if (fetchErr || !payment) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (payment.status === "paid") {
      const snap = await walletSnapshot(supabase, user.id);
      return NextResponse.json({
        ok: true,
        alreadyProcessed: true,
        creditsGranted: payment.credits_granted ?? 0,
        ...snap,
      });
    }

    if (payment.status !== "created") {
      return NextResponse.json({ error: "Order cannot be completed" }, { status: 409 });
    }

    const { data: updated, error: updErr } = await supabase
      .from("payments")
      .update({
        status: "paid",
        provider_payment_id: paymentId,
      })
      .eq("id", payment.id)
      .eq("status", "created")
      .select("id")
      .maybeSingle();

    if (updErr) {
      console.error("[billing/verify] payment update", updErr);
      return NextResponse.json({ error: "Failed to record payment" }, { status: 500 });
    }

    if (!updated) {
      const snap = await walletSnapshot(supabase, user.id);
      return NextResponse.json({
        ok: true,
        alreadyProcessed: true,
        creditsGranted: payment.credits_granted ?? 0,
        ...snap,
      });
    }

    const credits = Math.max(0, payment.credits_granted ?? 0);
    if (credits > 0) {
      const { error: grantErr } = await supabase.rpc("billing_grant_credits", {
        p_user_id: user.id,
        p_payment_id: payment.id,
        p_credits: credits,
      });
      if (grantErr) {
        console.error("[billing/verify] grant credits", grantErr);
        await supabase
          .from("payments")
          .update({ status: "created", provider_payment_id: null })
          .eq("id", payment.id)
          .eq("status", "paid");
        return NextResponse.json({ error: "Failed to grant credits" }, { status: 500 });
      }
    } else {
      await supabase.from("payments").update({ status: "paid" }).eq("id", payment.id);
    }

    const snap = await walletSnapshot(supabase, user.id);
    return NextResponse.json({
      ok: true,
      alreadyProcessed: false,
      creditsGranted: credits,
      ...snap,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Verify failed";
    if (message === "Razorpay is not configured") {
      return NextResponse.json({ error: message }, { status: 500 });
    }
    console.error("[billing/verify]", e);
    return NextResponse.json({ error: "Verify failed" }, { status: 500 });
  }
}
