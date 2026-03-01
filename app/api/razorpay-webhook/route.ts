import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/app/lib/supabase/server";
import crypto from "crypto";

const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET ?? "";

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = request.headers.get("x-razorpay-signature") ?? "";

    if (!WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
    }

    const expected = crypto
      .createHmac("sha256", WEBHOOK_SECRET)
      .update(body)
      .digest("hex");
    if (signature !== expected) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const payload = JSON.parse(body) as {
      event?: string;
      payload?: {
        subscription?: { id?: string };
        payment?: { entity?: { notes?: Record<string, string> } };
      };
    };

    if (payload.event !== "subscription.activated" && payload.event !== "payment.captured") {
      return NextResponse.json({ received: true });
    }

    const userId = payload.payload?.payment?.entity?.notes?.user_id
      ?? (payload.payload as { subscription?: { user_id?: string } })?.subscription?.user_id;
    if (!userId) {
      return NextResponse.json({ received: true });
    }

    const supabase = getSupabaseAdmin();
    const now = new Date().toISOString();
    await supabase
      .from("profiles")
      .update({
        plan: "pro",
        monthly_resume_count: 0,
        monthly_summary_count: 0,
        period_start: now,
      })
      .eq("id", userId);

    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}
