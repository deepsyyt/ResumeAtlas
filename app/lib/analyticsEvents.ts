/**
 * GA4 event names - one event name per distinct funnel step (no custom dimensions
 * required to compare sources in standard Events reports).
 */
export const ANALYTICS_EVENTS = {
  analysisClicked: "analysis_clicked",
  dashboardGenerated: "dashboard_generated",
  userLogin: "user_login",
  optimizationCompleted: "optimization_completed",

  /** Start optimization - separate events per surface */
  optimizationClickedIntelligencePanel: "optimization_clicked_intelligence_panel",
  optimizationClickedPostDashboardNudge: "optimization_clicked_post_dashboard_nudge",
  optimizationClickedOauthReturnOptimize: "optimization_clicked_oauth_return_optimize",
  optimizationClickedConversionModal: "optimization_clicked_conversion_modal",
  optimizationClickedConversionModalAfterPayment: "optimization_clicked_conversion_modal_after_payment",
  optimizationClickedCreditModalBalance: "optimization_clicked_credit_modal_balance",
  optimizationClickedCreditModalAfterPurchase: "optimization_clicked_credit_modal_after_purchase",

  /** Modal impressions (prompt shown) */
  postDashboardOptimizeModalViewed: "post_dashboard_optimize_modal_viewed",
  oauthReturnOptimizeModalViewed: "oauth_return_optimize_modal_viewed",
  paymentSuccessDownloadModalViewed: "payment_success_download_modal_viewed",

  optimizationPdfDownloadedOptimizePanel: "optimization_pdf_downloaded_optimize_panel",
  optimizationPdfDownloadedPaymentSuccessModal: "optimization_pdf_downloaded_payment_success_modal",
  optimizationEditableDownloadedOptimizePanel: "optimization_editable_downloaded_optimize_panel",
  optimizationEditableDownloadedPaymentSuccessModal:
    "optimization_editable_downloaded_payment_success_modal",

  /** Razorpay opens - one event per checkout source */
  paymentClickedCreditPackModal: "payment_clicked_credit_pack_modal",
  paymentClickedOptimizeDownload: "payment_clicked_optimize_download",
  paymentClickedOauthResume: "payment_clicked_oauth_resume",
  paymentClickedConversionModal: "payment_clicked_conversion_modal",

  paymentSuccessCreditPackModal: "payment_success_credit_pack_modal",
  paymentSuccessOptimizeDownload: "payment_success_optimize_download",
  paymentSuccessOauthResume: "payment_success_oauth_resume",
  paymentSuccessConversionModal: "payment_success_conversion_modal",

  paymentFailed: "payment_failed",

  /** Posting-fit diagnosis engine (minimal funnel instrumentation) */
  postingFitWorkbenchSurfaceViewed: "posting_fit_workbench_surface_viewed",
  postingFitMethodologySurfaceViewed: "posting_fit_methodology_surface_viewed",
  postingFitTierSCtaClicked: "posting_fit_tier_s_cta_clicked",
  postingFitExportIntentClicked: "posting_fit_export_intent_clicked",
} as const;

/** Passed from CreditPackModal when starting optimize from the pricing UI. */
export type CreditModalOptimizationEntryPoint =
  | "credit_modal_balance"
  | "credit_modal_after_purchase";
