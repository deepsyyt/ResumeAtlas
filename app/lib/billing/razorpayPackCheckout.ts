import { createClient } from "@/app/lib/supabase/client";
import { getCreditPackage, type CreditPackageId } from "@/app/lib/billing/packages";
import { logBillingEvent } from "@/app/lib/billing/billingEventsClient";
import {
  checkoutTriggerToSurface,
  trackPaymentClicked,
  trackPaymentFailed,
  trackPurchase,
} from "@/app/lib/analyticsFunnel";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

export function loadRazorpayScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Razorpay) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load Razorpay"));
    document.body.appendChild(s);
  });
}

export type PackCheckoutResult =
  | {
      status: "paid";
      creditsGranted: number;
      creditsRemaining: number;
    }
  | { status: "dismissed" }
  | { status: "error"; message: string };

export type CheckoutTrigger =
  | "pack_button"
  | "oauth_resume"
  | "conversion_modal"
  | "download_gate";

export type OpenRazorpayPackCheckoutParams = {
  packageId: CreditPackageId;
  /** Current wallet balance before purchase (used only for client-side guard + fallback balance math). */
  creditsRemaining: number;
  isLoggedIn: boolean;
  getAuthHeaders: () => Promise<HeadersInit>;
  onRefreshBalance?: () => void | Promise<void>;
  checkoutTrigger?: CheckoutTrigger;
  funnelId?: string;
};

/**
 * Opens Razorpay for a single credit pack. Resolves when the checkout widget closes
 * (paid, dismissed, or failed before opening).
 */
export async function openRazorpayPackCheckout({
  packageId,
  creditsRemaining,
  isLoggedIn,
  getAuthHeaders,
  onRefreshBalance,
  checkoutTrigger = "pack_button",
  funnelId: _funnelId,
}: OpenRazorpayPackCheckoutParams): Promise<PackCheckoutResult> {
  try {
    await loadRazorpayScript();
    const Razorpay = window.Razorpay;
    if (!Razorpay) {
      trackPaymentFailed("razorpay_unavailable");
      return { status: "error", message: "Razorpay unavailable" };
    }

    const headers = await getAuthHeaders();
    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const res = await fetch("/api/billing/create-order", {
      method: "POST",
      headers,
      body: JSON.stringify({ packageId }),
    });
    const data = (await res.json().catch(() => ({}))) as {
      error?: string;
      code?: string;
      orderId?: string;
      amount?: number;
      currency?: string;
      keyId?: string;
      credits?: number;
    };
    if (!res.ok) {
      if (res.status === 409 && data.code === "CREDITS_REMAINING") {
        trackPaymentFailed("order_create_credits_remaining");
        return {
          status: "error",
          message:
            typeof data.error === "string"
              ? data.error
              : "Use your available optimizations before buying another pack.",
        };
      }
      trackPaymentFailed("order_create_failed");
      return {
        status: "error",
        message: typeof data.error === "string" ? data.error : "Could not start checkout",
      };
    }
    if (!data.orderId || !data.keyId) {
      trackPaymentFailed("invalid_checkout_response");
      return { status: "error", message: "Invalid checkout response" };
    }

    const amountMinor = Math.round(Number(data.amount));
    const currency = String(data.currency ?? "USD").toUpperCase();
    if (!Number.isFinite(amountMinor) || amountMinor <= 0) {
      trackPaymentFailed("invalid_amount");
      return { status: "error", message: "Invalid payment amount from server" };
    }

    const pkgMeta = getCreditPackage(packageId);
    const checkoutDescription =
      checkoutTrigger === "download_gate"
        ? "ResumeAtlas — tailored resume download"
        : `${data.credits ?? ""} credit${data.credits === 1 ? "" : "s"} (check, optimize, download)`;
    void logBillingEvent("billing_razorpay_checkout_opened", {
      package_id: packageId,
      credits: pkgMeta?.credits ?? 0,
      currency,
      value_minor: amountMinor,
      checkout_trigger: checkoutTrigger,
    });

    const prefill: Record<string, string> = {};
    if (session?.user?.email) prefill.email = session.user.email;
    const meta = session?.user?.user_metadata as Record<string, unknown> | undefined;
    const rawName = meta?.full_name ?? meta?.name;
    const displayName = typeof rawName === "string" ? rawName.trim() : "";
    if (displayName) prefill.name = displayName;

    const result = await new Promise<PackCheckoutResult>((resolve) => {
      let razorpayReportedPaymentSuccess = false;
      let settled = false;
      const finish = (r: PackCheckoutResult) => {
        if (settled) return;
        settled = true;
        resolve(r);
      };
      const rzp = new Razorpay({
        key: data.keyId,
        amount: String(amountMinor),
        currency,
        order_id: data.orderId,
        name: "ResumeAtlas",
        description: checkoutDescription,
        ...(Object.keys(prefill).length > 0 ? { prefill } : {}),
        theme: { color: "#0f172a" },
        handler: async (response: {
          razorpay_order_id?: string;
          razorpay_payment_id?: string;
          razorpay_signature?: string;
        }) => {
          razorpayReportedPaymentSuccess = true;
          try {
            const v = await fetch("/api/billing/verify", {
              method: "POST",
              headers: await getAuthHeaders(),
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            const vr = (await v.json().catch(() => ({}))) as {
              error?: string;
              creditsGranted?: number;
              creditsRemaining?: number;
            };
            if (!v.ok) {
              trackPaymentFailed("verify_failed");
              finish({
                status: "error",
                message: typeof vr.error === "string" ? vr.error : "Payment verification failed",
              });
              return;
            }
            await onRefreshBalance?.();
            const creditsAdded =
              typeof vr.creditsGranted === "number"
                ? vr.creditsGranted
                : data.credits ?? 0;
            const balance =
              typeof vr.creditsRemaining === "number"
                ? vr.creditsRemaining
                : creditsRemaining + creditsAdded;
            void logBillingEvent("billing_payment_success", {
              package_id: packageId,
              credits: creditsAdded,
              currency,
              value_minor: amountMinor,
              credits_remaining: balance,
            });
            trackPurchase({
              transactionId:
                response.razorpay_payment_id ?? data.orderId ?? `order_${packageId}`,
              checkoutTrigger: checkoutTriggerToSurface(checkoutTrigger),
              packageId,
              valueMinor: amountMinor,
              currency,
              creditsGranted: creditsAdded,
            });
            finish({
              status: "paid",
              creditsGranted: creditsAdded,
              creditsRemaining: balance,
            });
          } catch {
            trackPaymentFailed("verify_exception");
            finish({ status: "error", message: "Verification failed" });
          }
        },
        modal: {
          ondismiss: () => {
            if (!razorpayReportedPaymentSuccess) {
              void logBillingEvent("billing_razorpay_checkout_dismissed", {
                package_id: packageId,
              });
              trackPaymentFailed("dismissed");
            }
            finish({ status: "dismissed" });
          },
        },
      });
      trackPaymentClicked({
        checkoutTrigger: checkoutTriggerToSurface(checkoutTrigger),
        packageId,
        valueMinor: amountMinor,
        currency,
        orderId: data.orderId ?? `order_${packageId}`,
      });
      rzp.open();
    });

    return result;
  } catch (e) {
    trackPaymentFailed("checkout_exception");
    return {
      status: "error",
      message: e instanceof Error ? e.message : "Checkout failed",
    };
  }
}
