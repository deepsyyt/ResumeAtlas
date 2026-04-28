export const ANALYTICS_EVENTS = {
  // Legacy (kept for backwards compatibility)
  funnelStep: "conv_funnel_step",
  analyzeClick: "conv_analyze_click",
  analyzeStarted: "conv_analyze_started",
  dashboardGenerated: "conv_dashboard_generated",
  optimizeAfterAnalysisClick: "conv_optimize_after_analysis_click",
  optimizeConversionModalShown: "conv_optimize_modal_shown",
  optimizeConversionModalFixClick: "conv_optimize_modal_fix_click",
  optimizeConversionModalFixResumeNow: "conv_optimize_modal_fix_resume_now",
  postPaymentStartOptimizationClick: "conv_post_payment_start_optimization_click",
  optimizeConversionModalContinueManual: "conv_optimize_modal_continue_manual",
  upgradeModalPayClick: "conv_upgrade_modal_pay_click",
  authGoogleStart: "conv_auth_google_start",
  authGoogleSuccess: "conv_auth_google_success",
  authGoogleFailed: "conv_auth_google_failed",
  authGoogleCancelOrReturn: "conv_auth_google_cancel_or_return",

  // KPI v2 (clean reporting set)
  kpiAnalyzeButtonClick: "analyze_button_click",
  kpiDashboardGenerated: "dashboard_generated",
  kpiOptimizeClicked: "optimize_clicked",
  kpiLoginSuccess: "login_success",
  kpiPaymentModalOpened: "payment_modal_opened",
  kpiPricingCardClick: "pricing_card_click",
  kpiPostPaymentStartOptimizationClick: "post_payment_start_optimization_click",
  kpiOptimizationSuccess: "optimization_success",
  kpiDownloadPdf: "download_pdf",
  kpiDownloadEditableFile: "download_editable_file",
} as const;

