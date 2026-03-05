import crypto from "crypto";
import { getSupabaseAdmin } from "@/app/lib/supabase/server";

const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET ?? "";

type RazorpayWebhookPayload = {
  event?: string;
  payload?: {
    subscription?: {
      id?: string;
      notes?: Record<string, string>;
      user_id?: string;
    };
    payment?: {
      entity?: {
        notes?: Record<string, string>;
      };
    };
  };
};

export async function POST(request: Request) {
  try {
    if (!WEBHOOK_SECRET) {
      return new Response("Webhook not configured", { status: 500 });
    }

    // Read raw body for signature verification
    const rawBody = await request.arrayBuffer();
    const rawBodyBuffer = Buffer.from(rawBody);

    const signature = request.headers.get("x-razorpay-signature") ?? "";

    const expectedSignature = crypto
      .createHmac("sha256", WEBHOOK_SECRET)
      .update(rawBodyBuffer)
      .digest("hex");
    const expectedBuf = Buffer.from(expectedSignature);
    const receivedBuf = Buffer.from(signature);

    if (
      expectedBuf.length === 0 ||
      receivedBuf.length !== expectedBuf.length ||
      !crypto.timingSafeEqual(expectedBuf, receivedBuf)
    ) {
      return new Response("Invalid signature", { status: 400 });
    }

    const bodyText = rawBodyBuffer.toString("utf8");
    const payload = JSON.parse(bodyText) as RazorpayWebhookPayload;
    const event = payload.event;

    if (
      event !== "subscription.activated" &&
      event !== "subscription.charged" &&
      event !== "subscription.cancelled"
    ) {
      // Ignore unrelated events
      return new Response("Event ignored", { status: 200 });
    }

    const notesFromPayment = payload.payload?.payment?.entity?.notes;
    const notesFromSubscription = payload.payload?.subscription?.notes;

    const userId =
      notesFromPayment?.user_id ??
      notesFromSubscription?.user_id ??
      (payload.payload?.subscription as { user_id?: string } | undefined)?.user_id;

    if (!userId) {
      // Nothing to associate, but signature was valid
      return new Response("No user linked", { status: 200 });
    }

    const supabase = getSupabaseAdmin();
    const nowIso = new Date().toISOString();

    if (event === "subscription.activated" || event === "subscription.charged") {
      await supabase
        .from("profiles")
        .update({
          plan: "pro",
          generation_credits: 25,
          download_credits: 25,
          period_start: nowIso,
        })
        .eq("id", userId);
    } else if (event === "subscription.cancelled") {
      await supabase
        .from("profiles")
        .update({
          plan: null,
        })
        .eq("id", userId);
    }

    return new Response("Webhook processed", { status: 200 });
  } catch (error) {
    console.error("Razorpay webhook error", error);
    return new Response("Webhook error", { status: 500 });
  }
}
