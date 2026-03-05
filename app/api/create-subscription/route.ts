import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/app/lib/supabase/server";

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;
const RAZORPAY_PLAN_ID = process.env.RAZORPAY_PLAN_ID;

export async function POST(request: Request) {
  try {
    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET || !RAZORPAY_PLAN_ID) {
      return NextResponse.json(
        { error: "Razorpay is not configured" },
        { status: 500 }
      );
    }

    const authHeader = request.headers.get("authorization");
    const accessToken =
      authHeader?.replace(/Bearer\s+/i, "").trim() || null;

    if (!accessToken) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const supabase = getSupabaseAdmin();
    const {
      data: { user },
    } = await supabase.auth.getUser(accessToken);

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Optional override from body, but default to env plan
    let planId = RAZORPAY_PLAN_ID;
    try {
      const body = await request.json();
      if (body && typeof body.planId === "string" && body.planId.trim()) {
        planId = body.planId.trim();
      }
    } catch {
      // ignore body parse errors, use default plan
    }

    const basicAuth = Buffer.from(
      `${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`
    ).toString("base64");

    const razorpayRes = await fetch(
      "https://api.razorpay.com/v1/subscriptions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${basicAuth}`,
        },
        body: JSON.stringify({
          plan_id: planId,
          customer_notify: 1,
          total_count: 0, // recurring until canceled
          notes: {
            user_id: user.id,
            email: user.email ?? "",
          },
        }),
      }
    );

    if (!razorpayRes.ok) {
      const errorText = await razorpayRes.text();
      console.error("Razorpay subscription create error", errorText);
      return NextResponse.json(
        { error: "Failed to create subscription" },
        { status: 502 }
      );
    }

    const subscription = await razorpayRes.json();

    return NextResponse.json(
      {
        subscription,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Create subscription error", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

