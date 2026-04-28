import { gtagEvent } from "@/app/lib/gtagClient";
import { ANALYTICS_EVENTS } from "@/app/lib/analyticsEvents";

const ACTIVE_FUNNEL_ID_KEY = "resumeatlas_active_funnel_id_v1";

export function getActiveFunnelId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage.getItem(ACTIVE_FUNNEL_ID_KEY);
  } catch {
    return null;
  }
}

export function setActiveFunnelId(funnelId: string): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(ACTIVE_FUNNEL_ID_KEY, funnelId);
  } catch {
    // ignore storage failures
  }
}

export function startNewFunnel(source: string): string {
  const funnelId = crypto.randomUUID();
  setActiveFunnelId(funnelId);
  trackFunnelStep("funnel_started", { source }, funnelId);
  return funnelId;
}

export function trackFunnelStep(
  step: string,
  params?: Record<string, string | number | undefined>,
  explicitFunnelId?: string | null
): void {
  const funnelId = explicitFunnelId ?? getActiveFunnelId();
  gtagEvent(ANALYTICS_EVENTS.funnelStep, {
    event_category: "conversion_funnel",
    funnel_step: step,
    funnel_id: funnelId ?? undefined,
    ...params,
  });
}

