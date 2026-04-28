"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createClient } from "@/app/lib/supabase/client";
import type { ResumeDocument } from "@/app/lib/resumeDocument";
import { StructuredResume } from "@/app/components/StructuredResume";
import { ResumeOptimizationPanel } from "@/app/components/ResumeOptimizationPanel";
import {
  formatCreditPackPrice,
  getCreditPackage,
  listCreditPackages,
  type CreditPackageId,
} from "@/app/lib/billing/packages";
import { openRazorpayPackCheckout } from "@/app/lib/billing/razorpayPackCheckout";
import { logBillingEvent } from "@/app/lib/billing/billingEventsClient";
import { gtagEvent } from "@/app/lib/gtagClient";
import { trackFunnelStep } from "@/app/lib/funnelTracking";
import { ANALYTICS_EVENTS } from "@/app/lib/analyticsEvents";

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
  funnelId?: string;
};

const PREVIEW_SAMPLE_RESUME: ResumeDocument = {
  name: "DEEPIKA NADARAJAN",
  title: "MANAGER LEAD DATA SCIENTIST",
  summary:
    "Data scientist with experience leading experimentation, ML-driven optimization, and business analytics. Rewritten for this JD to emphasize role-fit, ATS keywords, and measurable impact.",
  skills: ["Python", "SQL", "NLP", "Experimentation", "A/B Testing", "LLM workflows"],
  experience: [
    {
      company: "Manager | Lead Data Scientist",
      role: "Data & AI",
      dates: "2025 - Present",
      bullets: [
        "Rewrote weak bullet with role-specific verbs and quantified outcomes, improving recruiter skim clarity.",
        "Added new JD-aligned bullet where existing project evidence supported experimentation ownership.",
        "Improved keyword alignment while preserving truth-first claims and ATS readability.",
      ],
    },
  ],
  education: ["MS, Data Science"],
};

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
  funnelId,
}: CreditPackModalProps) {
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const [showBundles, setShowBundles] = useState(false);
  const trackedPrimaryViewRef = useRef(false);
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
      setShowBundles(false);
      trackedPrimaryViewRef.current = false;
    }
  }, [open, funnelId]);

  useEffect(() => {
    if (!open) return;
    void logBillingEvent("billing_payment_modal_open");
    gtagEvent(ANALYTICS_EVENTS.kpiPaymentModalOpened, {
      event_category: "conversion",
      funnel_id: funnelId,
    });
  }, [open, funnelId]);

  useEffect(() => {
    if (!open || checkoutSuccess || (isLoggedIn && creditsRemaining > 0)) return;
    if (trackedPrimaryViewRef.current) return;
    trackedPrimaryViewRef.current = true;
  }, [open, checkoutSuccess, isLoggedIn, creditsRemaining]);

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
          const displayPackName =
            packageId === "starter"
              ? "Optimize this resume"
              : packageId === "jobseeker"
                ? "5 Optimizations"
                : packageId === "power"
                  ? "15 Optimizations"
                  : pkg?.name ?? pkgMeta?.name ?? "Optimization pack";
          setCheckoutSuccess({
            packName: displayPackName,
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

  const handleContinueToOptimization = useCallback(async () => {
    if (postPaymentStartLockedRef.current) return;
    postPaymentStartLockedRef.current = true;
    try {
      gtagEvent(ANALYTICS_EVENTS.kpiPostPaymentStartOptimizationClick, {
        event_category: "conversion",
        source: "credit_pack_modal_payment_success",
        funnel_id: funnelId,
      });
      trackFunnelStep(
        "post_payment_start_optimization_click",
        { source: "credit_pack_modal_payment_success" },
        funnelId
      );
      await onStartOptimization();
    } catch {
      /* parent sets error / modal state */
    } finally {
      window.setTimeout(() => {
        postPaymentStartLockedRef.current = false;
      }, 1200);
    }
  }, [onStartOptimization, funnelId]);

  const handleDismissSuccessOnly = useCallback(() => {
    setCheckoutSuccess(null);
  }, []);

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
      gtagEvent(ANALYTICS_EVENTS.kpiPricingCardClick, {
        event_category: "conversion",
        package_id: pid,
        pack_name: selectedPack?.name ?? pid,
        next_step: isLoggedIn ? "razorpay" : "google_auth",
        funnel_id: funnelId,
      });
      if (!isLoggedIn) {
        trackFunnelStep("pricing_auth_redirect", { package_id: pid }, funnelId);
        void onStartGoogleAuthForPackage(pid);
        return;
      }
      trackFunnelStep("checkout_initiated", { package_id: pid, checkout_trigger: "pack_button" }, funnelId);
      void runCheckout(pid, "pack_button");
    },
    [isBusy, checkoutLoading, isStartingGoogleAuth, isLoggedIn, onStartGoogleAuthForPackage, runCheckout, funnelId]
  );

  if (!open) return null;

  const packs = listCreditPackages();
  const starterPack = packs.find((p) => p.id === "starter") ?? null;
  const fivePack = packs.find((p) => p.id === "jobseeker") ?? null;
  const fifteenPack = packs.find((p) => p.id === "power") ?? null;
  const showStart = isLoggedIn && creditsRemaining > 0;
  const showPurchasePacks = !isLoggedIn || creditsRemaining === 0;
  const busy = isBusy || checkoutLoading !== null || isStartingGoogleAuth;
  const previewKeywords = ["ATS", "optimization", "experimentation"];
  const previewRewritten = [
    "Rewrote weak bullet with role-specific verbs and quantified outcomes, improving recruiter skim clarity.",
  ];
  const previewNewBullets = [
    "Added new JD-aligned bullet where existing project evidence supported experimentation ownership.",
  ];
  const previewKeywordBullets = [
    "Improved keyword alignment while preserving truth-first claims and ATS readability.",
  ];
  const previewQuantified = [
    "Rewrote weak bullet with role-specific verbs and quantified outcomes, improving recruiter skim clarity.",
  ];

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
        <div className="absolute right-6 top-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
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
              {checkoutSuccess.packName}: +{checkoutSuccess.creditsAdded} optimization run
              {checkoutSuccess.creditsAdded === 1 ? "" : "s"} added to your account.
            </p>
            <p className="mt-2 text-sm text-slate-700">
              You now have{" "}
              <span className="font-semibold tabular-nums text-slate-900">
                {checkoutSuccess.balance}
              </span>{" "}
              optimization run{checkoutSuccess.balance === 1 ? "" : "s"} available. Each successful optimization for
              one job description uses 1 run; nothing is charged if optimization does not complete.
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
            {!showPurchasePacks && (
              <>
                <p className="mt-2 text-sm text-slate-600">
                  {showStart
                    ? "You are ready to optimize. One run is used when this resume is successfully optimized for this job description."
                    : "Sign in to save your optimization balance and download optimized resumes. ATS analysis stays free."}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  1 run = one tailored resume optimization for one job description. Runs are deducted only when
                  optimization completes successfully.
                </p>
              </>
            )}
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
              Balance: <span className="tabular-nums text-slate-900">{creditsRemaining}</span> optimization run
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
              You can buy another pack after these are used (balance reaches zero).
            </p>
          </div>
        )}

        {!checkoutSuccess && showPurchasePacks && (
        <div className={showStart ? "mt-8 border-t border-slate-200 pt-6" : "mt-6"}>
          <h2 className="text-2xl font-semibold text-center mb-2">
            Get an interview-ready, ATS-optimized resume in one click
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Instant ATS improvements, stronger bullets, downloadable resume.
          </p>

          {starterPack ? (
            <div className="border rounded-2xl p-6 shadow-sm max-w-md mx-auto bg-white">
              <div className="text-sm text-gray-500 mb-1">Most popular</div>
              <div className="text-3xl font-bold mb-1">
                {formatCreditPackPrice(starterPack.razorpayAmount, starterPack.currency)}
              </div>
              <div className="text-gray-600 mb-4">
                Optimize this resume (1 job description)
              </div>

              <ul className="space-y-2 text-sm mb-6">
                <li>✔ Add missing ATS keywords</li>
                <li>✔ Rewrite weak bullet points</li>
                <li>✔ Rewrite summary for this role</li>
                <li>✔ Improve score for this job</li>
                <li>✔ Download PDF + editable file</li>
              </ul>

              <button
                type="button"
                disabled={busy && checkoutLoading !== "starter"}
              onClick={() => handlePackageClick("starter")}
                className="w-full bg-black text-white rounded-xl py-3 font-medium disabled:opacity-60"
              >
                {checkoutLoading === "starter"
                  ? "Opening checkout…"
                  : isStartingGoogleAuth
                    ? "Signing in…"
                    : "Unlock optimization for this resume"}
              </button>

              <p className="text-xs text-center text-gray-500 mt-3">
                One-time payment • Secure checkout • No subscription
              </p>
            </div>
          ) : null}

          {(fivePack || fifteenPack) && (
            <>
              <button
                type="button"
                onClick={() => {
                  const next = !showBundles;
                  setShowBundles(next);
                }}
                className="mt-5 text-sm underline text-gray-600 block mx-auto"
              >
                Applying to multiple jobs? View bundles
              </button>

              {showBundles && (
                <div className="grid md:grid-cols-2 gap-4 mt-6 max-w-3xl mx-auto">
                  {fivePack ? (
                    <div className="border rounded-xl p-5">
                      <h3 className="font-semibold mb-1">5 Optimizations</h3>
                      <div className="text-2xl font-bold mb-2">
                        {formatCreditPackPrice(fivePack.razorpayAmount, fivePack.currency)}
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        Best for active job search
                      </p>
                      <button
                        type="button"
                        disabled={busy && checkoutLoading !== "jobseeker"}
                        onClick={() => handlePackageClick("jobseeker")}
                        className="w-full rounded-lg bg-slate-900 py-2 text-white hover:bg-slate-800 transition disabled:opacity-60"
                      >
                        {checkoutLoading === "jobseeker"
                          ? "Opening checkout…"
                          : isStartingGoogleAuth
                            ? "Signing in…"
                            : "Pay and get 5 optimizations"}
                      </button>
                    </div>
                  ) : null}

                  {fifteenPack ? (
                    <div className="border rounded-xl p-5">
                      <h3 className="font-semibold mb-1">15 Optimizations</h3>
                      <div className="text-2xl font-bold mb-2">
                        {formatCreditPackPrice(fifteenPack.razorpayAmount, fifteenPack.currency)}
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        For multiple roles &amp; iterations
                      </p>
                      <button
                        type="button"
                        disabled={busy && checkoutLoading !== "power"}
                        onClick={() => handlePackageClick("power")}
                        className="w-full rounded-lg bg-slate-900 py-2 text-white hover:bg-slate-800 transition disabled:opacity-60"
                      >
                        {checkoutLoading === "power"
                          ? "Opening checkout…"
                          : isStartingGoogleAuth
                            ? "Signing in…"
                            : "Pay and get 15 optimizations"}
                      </button>
                    </div>
                  ) : null}
                </div>
              )}
            </>
          )}
        </div>
        )}

        {!checkoutSuccess && (
          <section className="mt-6 rounded-xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
            <h3 className="text-sm font-semibold text-slate-900">What you unlock with optimization</h3>
            <p className="mt-1 text-xs text-slate-600">
              Before checkout, here is what the optimization step does for this exact job description.
            </p>

            <div className="mt-3 grid gap-2 text-xs sm:grid-cols-2">
              <p className="rounded-md border border-violet-200 bg-violet-50 px-2.5 py-2 text-violet-900">
                Rewrites weak bullets for role alignment and measurable impact.
              </p>
              <p className="rounded-md border border-amber-200 bg-amber-50 px-2.5 py-2 text-amber-900">
                Adds new bullets where your real experience supports missing JD requirements.
              </p>
              <p className="rounded-md border border-indigo-200 bg-indigo-50 px-2.5 py-2 text-indigo-900">
                Rewrites summary to align with the target role and posting language.
              </p>
              <p className="rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-2 text-emerald-900">
                Lets you edit everything before download (ATS-friendly PDF or DOCX).
              </p>
            </div>

            <div className="mt-4 rounded-lg border border-slate-200 bg-white p-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                Real output preview sample
              </p>
              <div className="mt-2 grid grid-cols-1 gap-4 xl:grid-cols-[3fr_2fr]">
                <div className="space-y-2">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-slate-700">Optimized resume preview</h4>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-3 [&_button]:pointer-events-none [&_button]:opacity-60 [&_button]:cursor-not-allowed">
                    <StructuredResume
                      resume={PREVIEW_SAMPLE_RESUME}
                      highlightKeywords={previewKeywords}
                      quantifiedBullets={previewQuantified}
                      highlightedBullets={previewRewritten}
                      keywordBullets={previewKeywordBullets}
                      newBullets={previewNewBullets}
                      highlightOptimizedSummary
                      showJdAlignedSummaryBadge
                      editable
                    />
                  </div>
                </div>
                <ResumeOptimizationPanel
                  addedKeywords={previewKeywords}
                  bulletImprovements={6}
                  bulletsAdded={2}
                  quantifiedAchievements={2}
                  summaryOptimized
                  scoreBefore={90}
                  scoreAfter={95}
                  roleAlignmentScore={74}
                  matchedStrengthScore={71}
                  onDownloadPdf={() => {
                    /* preview only */
                  }}
                  onDownloadDocx={() => {
                    /* preview only */
                  }}
                />
              </div>
            </div>
          </section>
        )}

        {!checkoutSuccess && !isLoggedIn && (
          <p className="mt-4 text-xs text-amber-800 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
            Choose an option to continue. We&apos;ll send you to Google sign-in and return you here before checkout.
          </p>
        )}

        {!checkoutSuccess && isLoggedIn && creditsRemaining === 0 && (
          <p className="mt-4 text-xs text-slate-600">
            You&apos;ve used all available optimizations. Buy another pack to keep tailoring your resume for new jobs.
          </p>
        )}

      </div>
    </div>
  );
}
