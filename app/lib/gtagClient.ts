import { GA_MEASUREMENT_ID } from "@/app/lib/gaConfig";

type GtagFn = (...args: unknown[]) => void;

type GtagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: GtagFn;
};

function getGtagWindow(): GtagWindow | undefined {
  if (typeof window === "undefined") return undefined;
  return window as GtagWindow;
}

/** Ensure dataLayer + gtag stub exist (events queue until gtag.js loads). */
function ensureGtagStub(): GtagFn | undefined {
  const w = getGtagWindow();
  if (!w) return undefined;
  w.dataLayer = w.dataLayer || [];
  if (typeof w.gtag !== "function") {
    w.gtag = ((...args: unknown[]) => {
      w.dataLayer!.push(args);
    }) as GtagFn;
  }
  return w.gtag;
}

/**
 * Best-effort GA4 events via gtag (stub in app/layout.tsx + gtag.js).
 * Falls back to dataLayer queue if gtag is not ready yet.
 */
export function gtagEvent(
  name: string,
  params?: Record<string, string | number | undefined>
): void {
  const g = ensureGtagStub();
  if (!g) return;
  const payload =
    params && Object.keys(params).length > 0
      ? Object.fromEntries(
          Object.entries(params).filter(([, value]) => value !== undefined)
        )
      : undefined;
  g("event", name, payload);
}

/**
 * Sets or clears GA4 user_id so unique-user metrics map to app accounts.
 */
export function gtagSetUserId(userId: string | null): void {
  const g = ensureGtagStub();
  if (!g) return;
  g("config", GA_MEASUREMENT_ID, { user_id: userId ?? undefined });
}
