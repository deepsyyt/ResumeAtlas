/**
 * Canonical app origin for Supabase OAuth / magic-link redirects.
 *
 * In the browser, uses `window.location.origin` so the callback always matches
 * the tab (correct host, port, and http vs https).
 *
 * Set `NEXT_PUBLIC_SITE_URL` per environment (e.g. http://localhost:3000 locally,
 * https://yourdomain.com in production) for parity in docs and any server-side
 * auth that builds links without `window`.
 */
export function getAuthRedirectOrigin(): string {
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }
  const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "").trim() ?? "";
  if (!base) {
    throw new Error(
      "Set NEXT_PUBLIC_SITE_URL for auth redirects outside the browser (e.g. email links)."
    );
  }
  return base;
}

/** Full Supabase `redirectTo` / `emailRedirectTo` for `/auth/callback`. */
export function buildAuthCallbackRedirectTo(nextPath: string): string {
  const origin = getAuthRedirectOrigin();
  const next =
    nextPath.startsWith("/") && !nextPath.startsWith("//") ? nextPath : "/";
  return `${origin}/auth/callback?next=${encodeURIComponent(next)}`;
}

/**
 * GoTrue's authorize URL includes `redirect_to`. If that value was rewritten to
 * Site URL (or the site root) while the user started OAuth on another origin
 * (e.g. localhost), they land on production with `?code=` and PKCE breaks.
 * Patch the query param to match the callback we actually requested.
 */
export function alignSupabaseOAuthAuthorizeUrl(
  authorizeUrl: string,
  intendedRedirectTo: string
): string {
  try {
    const link = new URL(authorizeUrl);
    const raw = link.searchParams.get("redirect_to");
    if (!raw) return authorizeUrl;

    let decoded = raw;
    try {
      decoded = decodeURIComponent(raw);
    } catch {
      /* keep */
    }

    let current: URL;
    try {
      current = new URL(decoded);
    } catch {
      if (typeof window === "undefined") return authorizeUrl;
      current = new URL(decoded, window.location.origin);
    }

    let intended: URL;
    try {
      intended = new URL(intendedRedirectTo);
    } catch {
      return authorizeUrl;
    }

    const tabOrigin = typeof window !== "undefined" ? window.location.origin : intended.origin;
    const p = current.pathname.replace(/\/+$/, "") || "/";
    const isCallback = p === "/auth/callback";

    const originMismatch = current.origin !== tabOrigin;
    if (originMismatch || !isCallback) {
      link.searchParams.set("redirect_to", intendedRedirectTo);
      return link.toString();
    }
    return authorizeUrl;
  } catch {
    return authorizeUrl;
  }
}
