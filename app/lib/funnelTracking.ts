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

/** Creates a funnel correlation id stored in session (for server logs / payloads only; not GA). */
export function startNewFunnel(_source: string): string {
  const funnelId = crypto.randomUUID();
  setActiveFunnelId(funnelId);
  return funnelId;
}
