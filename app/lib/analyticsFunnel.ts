import {
  ANALYTICS_EVENTS,
  type AuthFlowSource,
  type CheckoutTriggerSurface,
  type OptimizationClickSurface,
  type OptimizeDismissSurface,
  type PdfDownloadSurface,
  type UserState,
} from "@/app/lib/analyticsEvents";
import { gtagEvent } from "@/app/lib/gtagClient";

const GA_ONCE_PREFIX = "resumeatlas_ga_once_v1_";

function markOnce(key: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (window.sessionStorage.getItem(`${GA_ONCE_PREFIX}${key}`) === "1") return false;
    window.sessionStorage.setItem(`${GA_ONCE_PREFIX}${key}`, "1");
    return true;
  } catch {
    return true;
  }
}

let optimizeClickLocked = false;

export function checkoutTriggerToSurface(trigger: string): CheckoutTriggerSurface {
  switch (trigger) {
    case "conversion_modal":
      return "conversion_modal";
    case "download_gate":
      return "optimize_download";
    case "oauth_resume":
      return "oauth_resume";
    default:
      return "credit_pack_modal";
  }
}

/** Once per browser session per tool path. */
export function trackToolPageViewed(pathname: string): void {
  const path = pathname.replace(/\/$/, "") || "/";
  if (!markOnce(`tool_page:${path}`)) return;
  gtagEvent(ANALYTICS_EVENTS.toolPageViewed, { page_path: path });
}

/** Once per analyze submit (fired at submit start). */
export function trackAnalysisClicked(userState: UserState): void {
  gtagEvent(ANALYTICS_EVENTS.analysisClicked, { user_state: userState });
}

/** Once per successful analyze response. */
export function trackDashboardGenerated(params: {
  evidenceMatch?: number;
  userState: UserState;
  jdUsed: "yes" | "no";
  analysisId: string;
}): void {
  if (!markOnce(`dashboard:${params.analysisId}`)) return;
  gtagEvent(ANALYTICS_EVENTS.dashboardGenerated, {
    evidence_match: params.evidenceMatch,
    user_state: params.userState,
    jd_used: params.jdUsed,
  });
}

/** Once per analysis run when the post-dashboard nudge is shown. */
export function trackPostDashboardOptimizeModalViewed(analysisTrigger: number): void {
  if (!markOnce(`nudge_view:${analysisTrigger}`)) return;
  gtagEvent(ANALYTICS_EVENTS.postDashboardOptimizeModalViewed, {});
}

/** Debounced — max one optimization click per 1.2s. */
export function trackOptimizationClicked(surface: OptimizationClickSurface): void {
  if (optimizeClickLocked) return;
  optimizeClickLocked = true;
  window.setTimeout(() => {
    optimizeClickLocked = false;
  }, 1200);
  gtagEvent(ANALYTICS_EVENTS.optimizationClicked, { surface });
}

export function trackOptimizePromptDismissed(surface: OptimizeDismissSurface): void {
  gtagEvent(ANALYTICS_EVENTS.optimizePromptDismissed, { surface });
}

/** Once per OAuth redirect (flow id). */
export function trackAuthFlowStarted(source: AuthFlowSource, flowId: string): void {
  if (!markOnce(`auth_start:${flowId}`)) return;
  gtagEvent(ANALYTICS_EVENTS.authFlowStarted, { auth_source: source });
}

/** Once per completed auth flow (flow id). */
export function trackUserLogin(source: AuthFlowSource, flowId: string): void {
  if (!markOnce(`auth_login:${flowId}`)) return;
  gtagEvent(ANALYTICS_EVENTS.userLogin, {
    method: "google",
    auth_source: source,
  });
}

/** Once per Razorpay open (order id). */
export function trackPaymentClicked(params: {
  checkoutTrigger: CheckoutTriggerSurface;
  packageId: string;
  valueMinor: number;
  currency: string;
  orderId: string;
}): void {
  if (!markOnce(`payment_click:${params.orderId}`)) return;
  gtagEvent(ANALYTICS_EVENTS.paymentClicked, {
    checkout_trigger: params.checkoutTrigger,
    package_id: params.packageId,
    value_minor: params.valueMinor,
    currency: params.currency,
  });
}

/** Razorpay checkout closed without payment. */
export function trackBillingRazorpayCheckoutDismissed(packageId: string): void {
  gtagEvent(ANALYTICS_EVENTS.billingRazorpayCheckoutDismissed, {
    package_id: packageId,
  });
}

/** Once per verified payment (payment id). */
export function trackPurchase(params: {
  transactionId: string;
  checkoutTrigger: CheckoutTriggerSurface;
  packageId: string;
  valueMinor: number;
  currency: string;
  creditsGranted: number;
}): void {
  if (!markOnce(`purchase:${params.transactionId}`)) return;
  const valueMajor = params.valueMinor / 100;
  gtagEvent(ANALYTICS_EVENTS.purchase, {
    transaction_id: params.transactionId,
    checkout_trigger: params.checkoutTrigger,
    package_id: params.packageId,
    value: valueMajor,
    currency: params.currency,
    credits_granted: params.creditsGranted,
  });
}

export function trackPaymentFailed(reason: string): void {
  gtagEvent(ANALYTICS_EVENTS.paymentFailed, { reason });
}

/** Once per optimization job (job id). */
export function trackOptimizationCompleted(params: {
  jobId: string;
  scoreBefore?: number;
  scoreAfter?: number;
  restoredFromCache: boolean;
}): void {
  if (!markOnce(`optimize_done:${params.jobId}`)) return;
  gtagEvent(ANALYTICS_EVENTS.optimizationCompleted, {
    score_before: params.scoreBefore,
    score_after: params.scoreAfter,
    restored_from_cache: params.restoredFromCache ? "yes" : "no",
  });
}

/** Once per successful PDF blob download. */
export function trackOptimizationPdfDownloaded(surface: PdfDownloadSurface): void {
  gtagEvent(ANALYTICS_EVENTS.optimizationPdfDownloaded, { surface });
}
