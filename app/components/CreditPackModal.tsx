"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createClient } from "@/app/lib/supabase/client";
import {
  formatCreditPackPrice,
  getCreditPackage,
  listCreditPackages,
  type CreditPackageId,
} from "@/app/lib/billing/packages";
import { openRazorpayPackCheckout } from "@/app/lib/billing/razorpayPackCheckout";
import { logBillingEvent } from "@/app/lib/billing/billingEventsClient";
import type { CreditModalOptimizationEntryPoint } from "@/app/lib/analyticsEvents";
import {
  CREDIT_PACK_BENEFITS,
  CREDIT_PACK_CTA,
  CREDIT_PACK_EXHAUSTED_HEADLINE,
  CREDIT_PACK_EXHAUSTED_SUBHEAD,
  CREDIT_PACK_OFFER_SUBHEAD,
  CREDIT_PACK_UPGRADE_BADGE,
  CREDIT_PACK_UPGRADE_BENEFITS,
  CREDIT_PACK_UPGRADE_FOOTNOTE,
  CREDIT_PACK_UPGRADE_HEADLINE,
  CREDIT_PACK_UPGRADE_SUBHEAD,
  CREDIT_PACK_PAYMENT_SUCCESS_ANALYZE_BODY,
  CREDIT_PACK_PAYMENT_SUCCESS_ANALYZE_HEADLINE,
  CREDIT_PACK_PAYMENT_SUCCESS_CONTINUE_BODY,
  CREDIT_PACK_PAYMENT_SUCCESS_CONTINUE_CTA,
} from "@/app/lib/evidenceMetricCopy";
export type CreditPackPostPaymentAction = "analyze" | "continue";

export type CreditPackModalVariant = "upgrade" | "default";

export type CreditPackModalProps = {
  open: boolean;
  onDismiss?: () => void;
  onClose: () => void;
  isLoggedIn: boolean;
  creditsRemaining: number;
  /** Clear upgrade messaging when free scan is exhausted (vs generic pricing). */
  variant?: CreditPackModalVariant;
  /** After checkout: analyze when scan was blocked; continue when topping up or post-analysis purchase. */
  postPaymentAction: CreditPackPostPaymentAction;
  onPostPaymentPrimary: () => void | Promise<void>;
  /** Persist inputs + navigate to /optimize when user still has credits in modal. */
  onStartOptimization: (entryPoint: CreditModalOptimizationEntryPoint) => void | Promise<void>;
  onRefreshBalance?: () => void | Promise<void>;
  /** OAuth redirect must include billing checkout query + pending package in sessionStorage. */
  onStartGoogleAuthForPackage: (packageId: CreditPackageId) => void | Promise<void>;
  isStartingGoogleAuth?: boolean;
  isBusy?: boolean;
  funnelId?: string;
};

export function CreditPackModal({
  open,
  onDismiss,
  onClose,
  isLoggedIn,
  creditsRemaining,
  variant = "default",
  postPaymentAction,
  onPostPaymentPrimary,
  onStartOptimization,
  onRefreshBalance,
  onStartGoogleAuthForPackage,
  isStartingGoogleAuth = false,
  isBusy = false,
  funnelId,
}: CreditPackModalProps) {
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const lastPricingCardClickAtRef = useRef(0);
  const postPaymentStartLockedRef = useRef(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState<{
    packName: string;
    creditsAdded: number;
    balance: number;
  } | null>(null);

  useEffect(() => {
    if (!open) {
      setLocalError(null);
      setCheckoutLoading(null);
      setCheckoutSuccess(null);
    }
  }, [open, funnelId]);

  useEffect(() => {
    if (!open) return;
    void logBillingEvent("billing_payment_modal_open");
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
    async (
      packageId: CreditPackageId,
      checkoutTrigger: "pack_button" | "oauth_resume" = "pack_button"
    ) => {
      setLocalError(null);
      setCheckoutLoading(packageId);
      try {
        const pkgMeta = getCreditPackage(packageId);
        const result = await openRazorpayPackCheckout({
          packageId,
          creditsRemaining,
          isLoggedIn,
          getAuthHeaders,
          onRefreshBalance,
          checkoutTrigger,
          funnelId,
        });
        if (result.status === "paid") {
          const pkg = getCreditPackage(packageId);
          setCheckoutSuccess({
            packName: pkg?.name ?? pkgMeta?.name ?? "Job credits",
            creditsAdded: result.creditsGranted,
            balance: result.creditsRemaining,
          });
        } else if (result.status === "error") {
          setLocalError(result.message);
        }
      } catch (e) {
        setLocalError(e instanceof Error ? e.message : "Checkout failed");
      } finally {
        setCheckoutLoading(null);
      }
    },
    [getAuthHeaders, onRefreshBalance, creditsRemaining, isLoggedIn, funnelId]
  );

  const handlePostPaymentPrimary = useCallback(async () => {
    if (postPaymentStartLockedRef.current) return;
    postPaymentStartLockedRef.current = true;
    try {
      await onPostPaymentPrimary();
    } catch {
      /* parent sets error / modal state */
    } finally {
      window.setTimeout(() => {
        postPaymentStartLockedRef.current = false;
      }, 1200);
    }
  }, [onPostPaymentPrimary]);

  const handlePackageClick = useCallback(
    (pid: CreditPackageId) => {
      const now = Date.now();
      if (isBusy || checkoutLoading !== null || isStartingGoogleAuth || now - lastPricingCardClickAtRef.current < 1000) return;
      lastPricingCardClickAtRef.current = now;
      const selectedPack = getCreditPackage(pid);
      void logBillingEvent("billing_credit_pack_checkout_click", {
        package_id: pid,
        credits: selectedPack?.credits ?? 0,
        pack_name: selectedPack?.name ?? pid,
        next_step: isLoggedIn ? "razorpay" : "google_auth",
      });
      if (!isLoggedIn) {
        void onStartGoogleAuthForPackage(pid);
        return;
      }
      void runCheckout(pid, "pack_button");
    },
    [isBusy, checkoutLoading, isStartingGoogleAuth, isLoggedIn, onStartGoogleAuthForPackage, runCheckout]
  );

  if (!open) return null;

  const packs = listCreditPackages();
  const starterPack = packs.find((p) => p.id === "starter") ?? null;
  const showStart = isLoggedIn && creditsRemaining > 0;
  const showPurchasePacks = !checkoutSuccess;
  const busy = isBusy || checkoutLoading !== null || isStartingGoogleAuth;
  const isUpgradeView = variant === "upgrade" && !showStart && !checkoutSuccess;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isUpgradeView ? "p-2 sm:p-3" : "p-3 sm:p-4"
      }`}
    >
      <div
        className="absolute inset-0 bg-slate-900/50"
        onClick={() => {
          if (!checkoutSuccess) {
            onDismiss?.();
            onClose();
          }
        }}
        aria-hidden
      />
      <div
        className={`relative rounded-2xl bg-white shadow-xl border border-slate-200 ${
          isUpgradeView
            ? "upgrade-modal-panel w-full max-w-[21.5rem] p-3 sm:max-w-[22rem]"
            : "nudge-modal-panel nudge-modal-panel--fit p-3 sm:p-3.5"
        }`}
        role="dialog"
        aria-labelledby="credit-pack-title"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={isUpgradeView ? "pr-12" : "flex-shrink-0 pr-16"}>
          {isUpgradeView ? (
            <>
              <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-2 py-px text-[10px] font-semibold uppercase tracking-wide text-amber-950">
                {CREDIT_PACK_UPGRADE_BADGE}
              </span>
              <h2
                id="credit-pack-title"
                className="mt-1.5 text-base font-bold tracking-tight text-slate-900"
              >
                {CREDIT_PACK_UPGRADE_HEADLINE}
              </h2>
              <p className="mt-1 text-[11px] leading-snug text-slate-500">
                {CREDIT_PACK_UPGRADE_SUBHEAD}
              </p>
            </>
          ) : (
            <h2 id="credit-pack-title" className="text-base font-semibold text-slate-900 leading-snug sm:text-lg">
              {checkoutSuccess
                ? "Payment successful"
                : showStart
                  ? "Continue where you left off"
                  : CREDIT_PACK_EXHAUSTED_HEADLINE}
            </h2>
          )}
        </div>
        <div className={isUpgradeView ? "absolute right-3 top-3" : "absolute right-4 top-4 sm:right-5 sm:top-5"}>
          <button
            type="button"
            onClick={onClose}
            className={`rounded-lg border border-slate-200 font-medium text-slate-700 hover:bg-slate-50 transition ${
              isUpgradeView ? "px-2.5 py-1 text-xs" : "rounded-xl px-4 py-2 text-sm"
            }`}
          >
            Close
          </button>
        </div>

        {checkoutSuccess ? (
          <div
            className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/90 px-4 py-4 text-slate-800"
            role="status"
            aria-live="polite"
          >
            <p className="text-sm font-semibold text-emerald-950">
              {postPaymentAction === "analyze"
                ? CREDIT_PACK_PAYMENT_SUCCESS_ANALYZE_HEADLINE(checkoutSuccess.creditsAdded)
                : (
                  <>
                    {checkoutSuccess.packName}: {checkoutSuccess.creditsAdded} credit
                    {checkoutSuccess.creditsAdded === 1 ? "" : "s"} added.
                  </>
                )}
            </p>
            <p className="mt-2 text-sm text-slate-700">
              {postPaymentAction === "analyze"
                ? CREDIT_PACK_PAYMENT_SUCCESS_ANALYZE_BODY
                : (
                  <>
                    You now have{" "}
                    <span className="font-semibold tabular-nums text-slate-900">
                      {checkoutSuccess.balance}
                    </span>{" "}
                    credit{checkoutSuccess.balance === 1 ? "" : "s"} left.{" "}
                    {CREDIT_PACK_PAYMENT_SUCCESS_CONTINUE_BODY}
                  </>
                )}
            </p>
            <div className="mt-4 flex justify-end">
              {postPaymentAction === "analyze" ? (
                <button
                  type="button"
                  disabled={busy}
                  onClick={onClose}
                  className="w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition disabled:opacity-60 sm:w-auto"
                >
                  Close
                </button>
              ) : (
                <div className="flex w-full flex-col-reverse gap-2 sm:w-auto sm:flex-row">
                  <button
                    type="button"
                    disabled={busy}
                    onClick={onClose}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition disabled:opacity-50"
                  >
                    Not now
                  </button>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void handlePostPaymentPrimary()}
                    className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition disabled:opacity-60"
                  >
                    {isBusy ? "Continuing…" : CREDIT_PACK_PAYMENT_SUCCESS_CONTINUE_CTA}
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            {!showPurchasePacks && (
              <>
                <p className="mt-2 text-sm text-slate-600">
                  {showStart
                    ? "Next: optimize your resume for this job, then download the PDF."
                    : "Sign in to save your credits and pick up where you left off."}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  1 credit = one job end to end (check, optimize, download). Finish that job before starting another.
                </p>
              </>
            )}
          </>
        )}

        {!checkoutSuccess && showStart && (
          <div className="mt-3 flex-shrink-0">
            <p className="text-sm font-medium text-slate-700">
              Remaining:{" "}
              <span className="tabular-nums text-slate-900">{creditsRemaining}</span> credit
              {creditsRemaining === 1 ? "" : "s"}
            </p>
            <button
              type="button"
              disabled={busy}
              onClick={() => void onStartOptimization("credit_modal_balance")}
              className="mt-3 w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition disabled:opacity-60"
            >
              {isBusy ? "Starting…" : "Optimize my resume"}
            </button>
            <p className="mt-3 text-xs text-slate-500">You can buy another pack after you use these up.</p>
          </div>
        )}

        {!checkoutSuccess && showPurchasePacks && starterPack ? (
          <>
            <div
              className={
                isUpgradeView
                  ? "mt-2 space-y-2"
                  : `nudge-modal-panel__body space-y-1.5 ${showStart ? "mt-3 border-t border-slate-200 pt-3" : "mt-1.5"}`
              }
            >
              {isUpgradeView ? (
                <div className="rounded-md border border-indigo-200/80 bg-indigo-50/50 px-2 py-1.5 ring-1 ring-indigo-100/60">
                  <h3 className="text-[10px] font-bold uppercase tracking-wide text-indigo-950">
                    What you get with {starterPack.credits} job credits
                  </h3>
                  <ol className="mt-1 space-y-1">
                    {CREDIT_PACK_UPGRADE_BENEFITS.map((benefit, index) => (
                      <li key={benefit.title} className="flex gap-1.5">
                        <span
                          aria-hidden
                          className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[9px] font-bold text-white"
                        >
                          {index + 1}
                        </span>
                        <div className="min-w-0">
                          <p className="text-[11px] font-bold leading-tight text-slate-900">{benefit.title}</p>
                          <p className="mt-px text-[10px] leading-snug text-indigo-950/70">
                            {benefit.detail}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              ) : (
                <>
                  {!showStart ? (
                    <p className="text-xs text-slate-600 leading-snug">
                      {CREDIT_PACK_EXHAUSTED_SUBHEAD}{" "}
                      <span className="text-slate-500">{CREDIT_PACK_OFFER_SUBHEAD}</span>
                    </p>
                  ) : null}

                  {showStart ? (
                    <div className="text-center sm:text-left">
                      <h3 className="text-base font-semibold tracking-tight text-slate-900 leading-snug">
                        Buy 5 more credits
                      </h3>
                      <p className="mt-0.5 text-[11px] leading-snug text-slate-600 sm:text-xs">
                        You have {creditsRemaining} credit{creditsRemaining === 1 ? "" : "s"} left. Buy 5 more anytime.
                        They add to your balance.
                      </p>
                    </div>
                  ) : null}

                  <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 px-2.5 py-2 shadow-sm">
                    <span className="inline-block rounded-md bg-emerald-800 px-1.5 py-px text-[10px] font-bold uppercase tracking-wider text-white">
                      Best value
                    </span>
                    <ul className="mt-1.5 space-y-1 text-[11px] leading-snug text-slate-900">
                      {CREDIT_PACK_BENEFITS.map((benefit) => (
                        <li key={benefit} className="flex gap-1.5">
                          <span
                            aria-hidden
                            className="mt-px flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-[9px] font-bold text-white"
                          >
                            ✓
                          </span>
                          <span className="font-medium">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {localError ? (
                <p className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                  {localError}
                </p>
              ) : null}

              {!isUpgradeView && !isLoggedIn ? (
                <p className="text-[11px] text-amber-800 bg-amber-50 border border-amber-100 rounded-lg px-2.5 py-1.5 leading-snug">
                  Choose an option to continue. We&apos;ll send you to Google sign-in and return you here before
                  checkout.
                </p>
              ) : null}
            </div>

            <div className={isUpgradeView ? "mt-2" : "nudge-modal-panel__footer mt-4"}>
              <div
                className={`payment-glow-shell payment-glow-card ${
                  isUpgradeView ? "payment-glow-card--compact shadow-lg" : "payment-glow-card--prominent shadow-2xl"
                }`}
              >
                <div
                  className={`payment-glow-card-inner overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white text-center ${
                    isUpgradeView ? "px-3.5 py-3" : "px-5 py-5"
                  }`}
                >
                  <p
                    className={`font-semibold uppercase tracking-widest text-slate-300 ${
                      isUpgradeView ? "text-[10px]" : "text-sm"
                    }`}
                  >
                    {starterPack.credits} job credits
                  </p>
                  <p
                    className={`font-bold tracking-tight leading-none ${
                      isUpgradeView ? "mt-1 text-3xl" : "mt-1.5 text-4xl sm:text-[2.75rem]"
                    }`}
                  >
                    {formatCreditPackPrice(starterPack.razorpayAmount, starterPack.currency)}
                  </p>
                  <p className={`font-semibold leading-snug ${isUpgradeView ? "mt-1 text-xs" : "mt-2 text-base"}`}>
                    {isUpgradeView
                      ? `Analyze, optimize, and download for ${starterPack.credits} roles`
                      : `Check, optimize, and download for ${starterPack.credits} roles`}
                  </p>
                  <p
                    className={`leading-snug text-slate-400 ${
                      isUpgradeView ? "mt-1 text-[10px]" : "mt-2.5 text-[11px]"
                    }`}
                  >
                    One-time payment · Secure checkout · No subscription
                  </p>

                  <button
                    type="button"
                    className={`w-full rounded-xl bg-white font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60 ${
                      isUpgradeView ? "mt-2.5 px-3 py-2.5 text-sm" : "mt-4 px-4 py-3.5 text-sm sm:text-base"
                    }`}
                    disabled={busy && checkoutLoading !== "starter"}
                    onClick={() => handlePackageClick("starter")}
                  >
                    {checkoutLoading === "starter"
                      ? "Opening checkout…"
                      : isStartingGoogleAuth
                        ? "Signing in…"
                        : showStart
                          ? `Add 5 more for ${formatCreditPackPrice(starterPack.razorpayAmount, starterPack.currency)}`
                          : CREDIT_PACK_CTA(formatCreditPackPrice(starterPack.razorpayAmount, starterPack.currency))}
                  </button>
                </div>
              </div>
              {isUpgradeView ? (
                <p className="mt-1.5 text-center text-[10px] leading-snug text-slate-500">
                  {CREDIT_PACK_UPGRADE_FOOTNOTE}
                </p>
              ) : null}
            </div>
          </>
        ) : null}

      </div>
    </div>
  );
}
