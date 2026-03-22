import crypto from "crypto";

const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET ?? "";

/**
 * Acknowledges signed Razorpay webhooks. One-time credit purchases are completed
 * in the browser via /api/billing/verify; this endpoint exists so dashboard
 * webhook URLs stay valid without applying subscription or other side effects.
 */
export async function POST(request: Request) {
  try {
    if (!WEBHOOK_SECRET) {
      return new Response("Webhook not configured", { status: 500 });
    }

    const rawBodyBuffer = Buffer.from(await request.arrayBuffer());
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

    return new Response("ok", { status: 200 });
  } catch (error) {
    console.error("Razorpay webhook error", error);
    return new Response("Webhook error", { status: 500 });
  }
}
