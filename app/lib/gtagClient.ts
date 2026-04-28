/**
 * Best-effort GA4 events via gtag (injected in app/layout.tsx).
 */
export function gtagEvent(
  name: string,
  params?: Record<string, string | number | undefined>
): void {
  if (typeof window === "undefined") return;
  const g = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof g !== "function") return;
  g("event", name, params);
}

/**
 * Sets or clears GA4 user_id so unique-user metrics map to app accounts.
 */
export function gtagSetUserId(userId: string | null): void {
  if (typeof window === "undefined") return;
  const g = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof g !== "function") return;
  g("set", "user_id", userId);
}
