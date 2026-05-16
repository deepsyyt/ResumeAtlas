/**
 * Temporary kill-switch: hides automatic optimize paywall dialogs that open after OAuth-return
 * URLs (`/?openOptimizer=1…`), including conversion upsell AND the credit-pack fallback.
 * Does not affect the post-dashboard optimize nudge, Intelligence CTAs, or /optimize downloads.
 */
export const SHOW_AUTOMATIC_OPTIMIZER_PAYWALL_MODALS = false;
