/**
 * Canonical site URL for SEO, metadata, structured data, and absolute URLs.
 * Uses NEXT_PUBLIC_SITE_URL or SITE_URL (env) with fallback to production domain.
 * No trailing slash.
 */
export function getSiteUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    "https://resumeatlas.io";
  return url.replace(/\/$/, "").trim();
}
