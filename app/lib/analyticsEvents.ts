export const ANALYTICS_EVENTS = {
  // KPI events (single GA4 taxonomy)
  kpiAnalyzeButtonClick: "analyze_button_click",
  kpiDashboardGenerated: "dashboard_generated",
  kpiOptimizeClicked: "unlock_optimize_clicked",
  kpiOptimizeModalShown: "optimize_conversion_modal_shown",
  kpiOptimizeModalFixResumeNow: "optimize_conversion_modal_fix_resume_now_click",
  kpiOptimizeModalContinueManual: "optimize_conversion_modal_continue_manual_click",
  kpiUpgradeModalPayClick: "upgrade_modal_pay_click",
  kpiAuthGoogleStart: "auth_google_start",
  kpiAuthGoogleFailed: "auth_google_failed",
  kpiAuthGoogleCancelOrReturn: "auth_google_cancel_or_return",
  kpiLoginSuccess: "login_success",
  kpiPaymentModalOpened: "payment_modal_opened",
  kpiPaymentSuccess: "payment_success",
  kpiPricingCardClick: "pricing_card_click",
  kpiPostPaymentStartOptimizationClick: "post_payment_start_optimization_click",
  kpiOptimizationSuccess: "optimization_success",
  kpiDownloadPdf: "download_pdf",
  kpiDownloadEditableFile: "download_editable_file",
} as const;

