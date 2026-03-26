/**
 * Canonical site URL for SEO, metadata, structured data, and absolute URLs.
 * Uses NEXT_PUBLIC_SITE_URL or SITE_URL (env) with fallback to production domain.
 * No trailing slash. Ensures a scheme so `new URL(siteUrl)` in layout metadata never throws.
 */
export function getSiteUrl(): string {
  let url =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.SITE_URL?.trim() ||
    "https://resumeatlas.io";
  url = url.replace(/\/$/, "");
  if (!url) url = "https://resumeatlas.io";
  if (!/^https?:\/\//i.test(url)) {
    if (/^localhost\b|^127\.0\.0\.1/i.test(url)) {
      url = `http://${url}`;
    } else {
      url = `https://${url}`;
    }
  }
  return url;
}
