/**
 * GA4 conversion funnel — one event name per step; use `surface` / param dimensions
 * instead of duplicating event names (avoids double-counting in Explorations).
 */
export const ANALYTICS_EVENTS = {
  toolPageViewed: "tool_page_viewed",
  analysisClicked: "analysis_clicked",
  dashboardGenerated: "dashboard_generated",
  postDashboardOptimizeModalViewed: "post_dashboard_optimize_modal_viewed",
  optimizationClicked: "optimization_clicked",
  optimizePromptDismissed: "optimize_prompt_dismissed",
  authFlowStarted: "auth_flow_started",
  userLogin: "user_login",
  paymentClicked: "payment_clicked",
  purchase: "purchase",
  paymentFailed: "payment_failed",
  optimizationCompleted: "optimization_completed",
  optimizationPdfDownloaded: "optimization_pdf_downloaded",
} as const;

export type UserState = "anonymous" | "logged_in";

export type OptimizationClickSurface =
  | "intelligence_panel"
  | "score_row"
  | "preview_banner"
  | "post_dashboard_nudge"
  | "oauth_return"
  | "conversion_modal"
  | "conversion_modal_after_payment"
  | "credit_modal_balance"
  | "credit_modal_after_purchase";

export type OptimizeDismissSurface =
  | "post_dashboard_nudge"
  | "oauth_return"
  | "conversion_modal"
  | "credit_pack";

export type AuthFlowSource =
  | "quota_modal"
  | "pricing_modal"
  | "conversion_modal"
  | "navbar";

export type CheckoutTriggerSurface =
  | "credit_pack_modal"
  | "optimize_download"
  | "oauth_resume"
  | "conversion_modal";

export type PdfDownloadSurface = "optimize_panel" | "payment_success_modal";

/** CreditPackModal optimize entry — maps to OptimizationClickSurface. */
export type CreditModalOptimizationEntryPoint =
  | "credit_modal_balance"
  | "credit_modal_after_purchase";
