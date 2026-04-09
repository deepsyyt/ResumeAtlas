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
}: CreditPackModalProps) {
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
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
  }, [open]);

  useEffect(() => {
    if (!open) return;
    gtagEvent("billing_payment_modal_open", { event_category: "billing" });
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
        });
        if (result.status === "paid") {
          const pkg = getCreditPackage(packageId);
          setCheckoutSuccess({
            packName: pkg?.name ?? pkgMeta?.name ?? "Credit pack",
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

  if (!open) return null;

  const packs = listCreditPackages();
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
                    {packs[0]?.currency === "USD"
                      ? "Charged in US dollars at Razorpay checkout (taxes as applicable)."
                      : "Same amount at Razorpay checkout (taxes as applicable)."}
                  </p>
                  <button
                    type="button"
                    disabled={busy && !loading}
                    onClick={() => {
                      gtagEvent("billing_credit_pack_checkout_click", {
                        event_category: "billing",
                        package_id: pid,
                        credits: p.credits,
                        pack_name: p.name,
                        next_step: isLoggedIn ? "razorpay" : "google_auth",
                      });
                      void logBillingEvent("billing_credit_pack_checkout_click", {
                        package_id: pid,
                        credits: p.credits,
                        pack_name: p.name,
                        next_step: isLoggedIn ? "razorpay" : "google_auth",
                      });
                      if (!isLoggedIn) {
                        void onStartGoogleAuthForPackage(pid);
                        return;
                      }
                      void runCheckout(pid, "pack_button");
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
            Pick a pack to continue. We&apos;ll send you to Google sign-in and return you here to choose your pack again before checkout.
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
