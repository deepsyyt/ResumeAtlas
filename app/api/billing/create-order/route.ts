import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/app/lib/supabase/server";
import { getBearerUser } from "@/app/lib/billing/requestUser";
import { getCreditPackage } from "@/app/lib/billing/packages";
import { assertRazorpayConfigured } from "@/app/lib/billing/razorpayConfig";

type Body = { packageId?: string };

export async function POST(request: Request) {
  try {
    const { user } = await getBearerUser(request);
    if (!user) {
      return NextResponse.json(
        { error: "Login required.", code: "UNAUTHORIZED" },
        { status: 401 }
      );
    }

    let packageId = "";
    try {
      const body = (await request.json()) as Body;
      packageId = typeof body?.packageId === "string" ? body.packageId.trim() : "";
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const pkg = getCreditPackage(packageId);
    if (!pkg) {
      return NextResponse.json({ error: "Unknown package" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { data: wallet } = await supabase
      .from("credit_wallets")
      .select("credits_remaining")
      .eq("user_id", user.id)
      .maybeSingle();

    const remaining = wallet?.credits_remaining ?? 0;
    if (remaining > 0) {
      return NextResponse.json(
        {
          error:
            "You still have optimizations available. Use them before buying another pack.",
          code: "CREDITS_REMAINING",
        },
        { status: 409 }
      );
    }

    const { keyId, keySecret } = assertRazorpayConfigured();
    const basicAuth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

    const receipt = `rc_${user.id.replace(/-/g, "").slice(0, 12)}_${Date.now()}`;
    const amountMinor = Math.round(pkg.razorpayAmount);
    const currency = pkg.currency.toUpperCase() as "USD" | "INR";
    if (!Number.isFinite(amountMinor) || amountMinor <= 0) {
      return NextResponse.json({ error: "Invalid package amount" }, { status: 500 });
    }

    const razorpayRes = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${basicAuth}`,
      },
      body: JSON.stringify({
        amount: amountMinor,
        currency,
        receipt,
        notes: {
          user_id: user.id,
          package_id: pkg.id,
        },
      }),
    });

    const orderText = await razorpayRes.text();
    if (!razorpayRes.ok) {
      console.error("[billing/create-order] Razorpay error", orderText);
      return NextResponse.json({ error: "Failed to create payment order" }, { status: 502 });
    }

    let order: { id?: string; amount?: number | string; currency?: string };
    try {
      order = JSON.parse(orderText) as typeof order;
    } catch {
      return NextResponse.json({ error: "Invalid Razorpay response" }, { status: 502 });
    }

    if (!order.id) {
      return NextResponse.json({ error: "Missing order id" }, { status: 502 });
    }

    const orderAmountMinor = Math.round(Number(order.amount ?? amountMinor));
    const orderCurrency = String(order.currency ?? currency).toUpperCase();

    const { error: insertErr } = await supabase.from("payments").insert({
      user_id: user.id,
      email: user.email ?? null,
      package_id: pkg.id,
      provider: "razorpay",
      provider_order_id: order.id,
      amount: orderAmountMinor,
      currency: orderCurrency,
      status: "created",
      credits_granted: pkg.credits,
    });

    if (insertErr) {
      const errMsg =
        insertErr instanceof Error ? insertErr.message : String(insertErr);
      const errCode =
        insertErr && typeof (insertErr as { code?: string }).code === "string"
          ? (insertErr as { code: string }).code
          : undefined;
      console.error(
        "[billing/create-order] insert payment failed",
        { message: errMsg, code: errCode, details: insertErr }
      );
      return NextResponse.json(
        { error: "Failed to record order", code: errCode ?? "DB_INSERT_FAILED" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      orderId: order.id,
      amount: orderAmountMinor,
      currency: orderCurrency,
      keyId,
      credits: pkg.credits,
      packageId: pkg.id,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Create order failed";
    if (message === "Razorpay is not configured") {
      return NextResponse.json({ error: message }, { status: 500 });
    }
    console.error("[billing/create-order]", e);
    return NextResponse.json({ error: "Create order failed" }, { status: 500 });
  }
}
