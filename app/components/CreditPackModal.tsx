"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createClient } from "@/app/lib/supabase/client";
import {
  formatCreditPackPrice,
  getCreditPackage,
  listCreditPackages,
  type CreditPackageId,
} from "@/app/lib/billing/packages";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

export type CreditPackModalProps = {
  open: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  creditsRemaining: number;
  /** Persist inputs + navigate to /optimize (after credits OK or purchase). */
  onStartOptimization: () => void | Promise<void>;
  onRefreshBalance?: () => void | Promise<void>;
  /** OAuth redirect must include billing checkout query + pending package in sessionStorage. */
  onStartGoogleAuthForPackage: (packageId: CreditPackageId) => void | Promise<void>;
  isStartingGoogleAuth?: boolean;
  isBusy?: boolean;
  /** After OAuth return, open checkout once for this package (then cleared by parent). */
  autoCheckoutPackageId?: CreditPackageId | null;
  onConsumedAutoCheckoutPackage?: () => void;
};

function loadRazorpayScript(): Promise<void> {
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

export function CreditPackModal({
  open,
  onClose,
  isLoggedIn,
  creditsRemaining,
  onStartOptimization,
  onRefreshBalance,
  onStartGoogleAuthForPackage,
  isStartingGoogleAuth = false,
  isBusy = false,
  autoCheckoutPackageId = null,
  onConsumedAutoCheckoutPackage,
}: CreditPackModalProps) {
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState<{
    packName: string;
    creditsAdded: number;
    balance: number;
  } | null>(null);
  const autoCheckoutDoneRef = useRef(false);

  useEffect(() => {
    if (!open) {
      setLocalError(null);
      setCheckoutLoading(null);
      setCheckoutSuccess(null);
      autoCheckoutDoneRef.current = false;
    }
  }, [open]);

  const getAuthHeaders = useCallback(async () => {
    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const h: HeadersInit = { "Content-Type": "application/json" };
    if (session?.access_token) {
      h["Authorization"] = `Bearer ${session.access_token}`;
    }
    return h;
  }, []);

  const runCheckout = useCallback(
    async (packageId: CreditPackageId) => {
      setLocalError(null);
      if (isLoggedIn && creditsRemaining > 0) {
        setLocalError("Use your current optimization credits before buying more.");
        return;
      }
      setCheckoutLoading(packageId);
      try {
        await loadRazorpayScript();
        const Razorpay = window.Razorpay;
        if (!Razorpay) throw new Error("Razorpay unavailable");

        const headers = await getAuthHeaders();
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
            throw new Error(
              typeof data.error === "string"
                ? data.error
                : "Use your credits before buying more."
            );
          }
          throw new Error(typeof data.error === "string" ? data.error : "Could not start checkout");
        }
        if (!data.orderId || !data.keyId) {
          throw new Error("Invalid checkout response");
        }

        await new Promise<void>((resolve, reject) => {
          const rzp = new Razorpay({
            key: data.keyId,
            amount: data.amount,
            currency: data.currency ?? "USD",
            order_id: data.orderId,
            name: "ResumeAtlas",
            description: `${data.credits ?? ""} optimization credit(s)`,
            handler: async (response: {
              razorpay_order_id?: string;
              razorpay_payment_id?: string;
              razorpay_signature?: string;
            }) => {
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
                  throw new Error(typeof vr.error === "string" ? vr.error : "Payment verification failed");
                }
                await onRefreshBalance?.();
                const pkg = getCreditPackage(packageId);
                const creditsAdded =
                  typeof vr.creditsGranted === "number"
                    ? vr.creditsGranted
                    : data.credits ?? 0;
                const balance =
                  typeof vr.creditsRemaining === "number"
                    ? vr.creditsRemaining
                    : creditsRemaining + creditsAdded;
                setCheckoutSuccess({
                  packName: pkg?.name ?? "Credit pack",
                  creditsAdded,
                  balance,
                });
                resolve();
              } catch (e) {
                reject(e instanceof Error ? e : new Error("Verification failed"));
              }
            },
            modal: {
              ondismiss: () => resolve(),
            },
          });
          rzp.open();
        });
      } catch (e) {
        setLocalError(e instanceof Error ? e.message : "Checkout failed");
      } finally {
        setCheckoutLoading(null);
      }
    },
    [getAuthHeaders, onRefreshBalance, creditsRemaining, isLoggedIn]
  );

  const handleContinueToOptimization = useCallback(async () => {
    try {
      await onStartOptimization();
    } catch {
      /* parent sets error / modal state */
    }
  }, [onStartOptimization]);

  const handleDismissSuccessOnly = useCallback(() => {
    setCheckoutSuccess(null);
  }, []);

  const runCheckoutRef = useRef(runCheckout);
  runCheckoutRef.current = runCheckout;

  useEffect(() => {
    if (!open || !autoCheckoutPackageId || !isLoggedIn || autoCheckoutDoneRef.current) return;
    if (creditsRemaining > 0) {
      autoCheckoutDoneRef.current = true;
      try {
        window.sessionStorage.removeItem("resumeatlas_pending_package_id");
      } catch {
        /* ignore */
      }
      onConsumedAutoCheckoutPackage?.();
      return;
    }
    autoCheckoutDoneRef.current = true;
    onConsumedAutoCheckoutPackage?.();
    void runCheckoutRef.current(autoCheckoutPackageId);
  }, [
    open,
    autoCheckoutPackageId,
    isLoggedIn,
    creditsRemaining,
    onConsumedAutoCheckoutPackage,
  ]);

  if (!open) return null;

  const packs = listCreditPackages();
  const showStart = isLoggedIn && creditsRemaining > 0;
  const showPurchasePacks = !isLoggedIn || creditsRemaining === 0;
  const busy = isBusy || checkoutLoading !== null || isStartingGoogleAuth;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/50"
        onClick={() => {
          if (!checkoutSuccess) onClose();
        }}
        aria-hidden
      />
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl border border-slate-200"
        role="dialog"
        aria-labelledby="credit-pack-title"
        aria-modal="true"
      >
        <h2 id="credit-pack-title" className="text-xl font-semibold text-slate-900">
          {checkoutSuccess
            ? "Payment successful"
            : showStart
              ? "Start optimization"
              : "Unlock resume optimization"}
        </h2>

        {checkoutSuccess ? (
          <div
            className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/90 px-4 py-4 text-slate-800"
            role="status"
            aria-live="polite"
          >
            <p className="text-sm font-semibold text-emerald-950">
              {checkoutSuccess.packName}: +{checkoutSuccess.creditsAdded} credit
              {checkoutSuccess.creditsAdded === 1 ? "" : "s"} added to your account.
            </p>
            <p className="mt-2 text-sm text-slate-700">
              You now have{" "}
              <span className="font-semibold tabular-nums text-slate-900">
                {checkoutSuccess.balance}
              </span>{" "}
              credit{checkoutSuccess.balance === 1 ? "" : "s"} available. Each successful optimization for one job
              description uses 1 credit; nothing is charged if optimization does not complete.
            </p>
            <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={busy}
                onClick={handleDismissSuccessOnly}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition disabled:opacity-50"
              >
                Not now
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => void handleContinueToOptimization()}
                className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition disabled:opacity-60"
              >
                {isBusy ? "Starting…" : "Start optimization"}
              </button>
            </div>
          </div>
        ) : (
          <>
        <p className="mt-2 text-sm text-slate-600">
          {showStart
            ? "You have credits ready. One credit is used when optimization runs successfully for this job description."
            : "Sign in to save your credits and download optimized resumes. ATS analysis stays free. Optimization uses credits."}
        </p>
        <p className="mt-1 text-xs text-slate-500">
          1 credit = one tailored resume optimization for one job description. Credits are deducted only when
          optimization completes successfully.
        </p>
          </>
        )}

        {localError && (
          <p className="mt-3 text-sm text-red-700 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            {localError}
          </p>
        )}

        {!checkoutSuccess && showStart && (
          <div className="mt-5">
            <p className="text-sm font-medium text-slate-700">
              Balance: <span className="tabular-nums text-slate-900">{creditsRemaining}</span> credit
              {creditsRemaining === 1 ? "" : "s"}
            </p>
            <button
              type="button"
              disabled={busy}
              onClick={() => void onStartOptimization()}
              className="mt-3 w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition disabled:opacity-60"
            >
              {isBusy ? "Starting…" : "Start optimization"}
            </button>
            <p className="mt-3 text-xs text-slate-500">
              You can buy more credits only after these are used (balance reaches zero).
            </p>
          </div>
        )}

        {!checkoutSuccess && showPurchasePacks && (
        <div className={showStart ? "mt-8 border-t border-slate-200 pt-6" : "mt-6"}>
          <h3 className="text-sm font-semibold text-slate-900">Buy optimization credits</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {packs.map((p) => {
              const pid = p.id as CreditPackageId;
              const loading = checkoutLoading === pid;
              return (
                <div
                  key={p.id}
                  className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 flex flex-col"
                >
                  <p className="text-sm font-semibold text-slate-900">{p.name}</p>
                  <p className="mt-1 text-2xl font-semibold tabular-nums text-slate-900">
                    {formatCreditPackPrice(p.razorpayAmount, p.currency)}
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                    {p.credits} credit{p.credits === 1 ? "" : "s"}
                  </p>
                  <p className="mt-2 text-[11px] text-slate-500 leading-snug">
                    Same amount at Razorpay checkout (taxes as applicable).
                  </p>
                  <button
                    type="button"
                    disabled={busy && !loading}
                    onClick={() => {
                      if (!isLoggedIn) {
                        void onStartGoogleAuthForPackage(pid);
                        return;
                      }
                      void runCheckout(pid);
                    }}
                    className="mt-auto pt-4 w-full rounded-lg bg-white border border-slate-300 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition disabled:opacity-60"
                  >
                    {loading
                      ? "Opening checkout…"
                      : isStartingGoogleAuth
                        ? "Signing in…"
                        : `Continue with ${p.credits} credit${p.credits === 1 ? "" : "s"}`}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        )}

        {!checkoutSuccess && !isLoggedIn && (
          <p className="mt-4 text-xs text-amber-800 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
            Pick a pack to continue. We&apos;ll send you to Google sign-in, then checkout.
          </p>
        )}

        {!checkoutSuccess && isLoggedIn && creditsRemaining === 0 && (
          <p className="mt-4 text-xs text-slate-600">
            You&apos;ve used all your optimization credits. Buy more to keep tailoring your resume for new jobs.
          </p>
        )}

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
