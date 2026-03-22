/** Free ATS analysis limits per rolling 24-hour window. */
export const ANALYSIS_QUOTA_LIMITS = {
  anonymous: 3,
  user: 5,
} as const;

export const ANONYMOUS_ID_COOKIE = "ra_anon_id";
export const ANONYMOUS_ID_MAX_AGE = 60 * 60 * 24 * 365; // 1 year
export const ANALYSIS_QUOTA_WINDOW_HOURS = 24;
