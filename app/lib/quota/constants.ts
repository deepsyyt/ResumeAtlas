/** Free ATS analysis limits per rolling quota window (see ANALYSIS_QUOTA_WINDOW_MS). */
export const ANALYSIS_QUOTA_LIMITS = {
  anonymous: 1,
  user: 1,
} as const;

/** Rolling window length per scope. Both anonymous and signed-in: 30 days. */
export const ANALYSIS_QUOTA_WINDOW_MS = {
  anonymous: 30 * 24 * 60 * 60 * 1000,
  user: 30 * 24 * 60 * 60 * 1000,
} as const;

export const ANONYMOUS_ID_COOKIE = "ra_anon_id";
export const ANONYMOUS_ID_MAX_AGE = 60 * 60 * 24 * 365; // 1 year
