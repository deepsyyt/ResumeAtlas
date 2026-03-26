/**
 * Server-only Razorpay credentials. Never expose the secret to the client.
 *
 * Mode (which key pair is used):
 * - `RAZORPAY_MODE=test` → test keys
 * - `RAZORPAY_MODE=live` → live keys
 * - If unset: `VERCEL_ENV=production` → live; otherwise → test
 *
 * Env names (recommended):
 * - Test: `RAZORPAY_TEST_KEY_ID`, `RAZORPAY_TEST_KEY_SECRET`
 * - Live: `RAZORPAY_LIVE_KEY_ID`, `RAZORPAY_LIVE_KEY_SECRET`
 * Legacy fallbacks: `RAZORPAY_KEY_ID_TEST` / `_LIVE`, `NEXT_PUBLIC_RAZORPAY_KEY_ID` (test id only), `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET`.
 */
function trimEnv(v: string | undefined | null): string | null {
  const t = typeof v === "string" ? v.trim() : "";
  return t.length > 0 ? t : null;
}

export type RazorpayRuntimeMode = "live" | "test";

/** Razorpay India uses INR (amount in paise). Razorpay International uses USD. */
export type RazorpayCurrency = "USD" | "INR";

/**
 * Must match on server (API routes) and client (bundled `NEXT_PUBLIC_*`).
 * For Razorpay International (USD), set both to USD. If only one env is INR, orders and UI can disagree and checkout may fail.
 */
export function resolveRazorpayCurrency(): RazorpayCurrency {
  const pubRaw = process.env.NEXT_PUBLIC_RAZORPAY_CURRENCY?.trim() ?? "";
  const serverRaw = process.env.RAZORPAY_CURRENCY?.trim() ?? "";
  const c = (pubRaw.length > 0 ? pubRaw : serverRaw).toUpperCase();
  if (c === "INR") return "INR";
  return "USD";
}

export function resolveRazorpayMode(): RazorpayRuntimeMode {
  const m = process.env.RAZORPAY_MODE?.trim().toLowerCase();
  if (m === "live") return "live";
  if (m === "test") return "test";
  if (process.env.VERCEL_ENV === "production") return "live";
  return "test";
}

export function getRazorpayConfig() {
  const isLive = resolveRazorpayMode() === "live";

  const keyId = isLive
    ? trimEnv(
        process.env.RAZORPAY_LIVE_KEY_ID ??
          process.env.RAZORPAY_KEY_ID_LIVE ??
          process.env.RAZORPAY_KEY_ID
      )
    : trimEnv(
        process.env.RAZORPAY_TEST_KEY_ID ??
          process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ??
          process.env.RAZORPAY_KEY_ID_TEST ??
          process.env.RAZORPAY_KEY_ID
      );

  const keySecret = isLive
    ? trimEnv(
        process.env.RAZORPAY_LIVE_KEY_SECRET ??
          process.env.RAZORPAY_KEY_SECRET_LIVE ??
          process.env.RAZORPAY_KEY_SECRET
      )
    : trimEnv(
        process.env.RAZORPAY_TEST_KEY_SECRET ??
          process.env.RAZORPAY_TESR_KEY_SECRET ??
          process.env.RAZORPAY_KEY_SECRET_TEST ??
          process.env.RAZORPAY_KEY_SECRET
      );

  return {
    mode: isLive ? ("live" as const) : ("test" as const),
    isLive,
    keyId,
    keySecret,
  };
}

export function assertRazorpayConfigured(): { keyId: string; keySecret: string } {
  const { keyId, keySecret, mode } = getRazorpayConfig();
  if (!keyId || !keySecret) {
    throw new Error(
      `Razorpay is not configured for ${mode} mode. Set RAZORPAY_${mode === "live" ? "LIVE" : "TEST"}_KEY_ID and _KEY_SECRET (or legacy RAZORPAY_KEY_*).`
    );
  }
  return { keyId, keySecret };
}
