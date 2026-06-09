import type { AuthFlowSource } from "@/app/lib/analyticsEvents";
import { trackAuthFlowStarted } from "@/app/lib/analyticsFunnel";

const AUTH_FLOW_PENDING_KEY = "resumeatlas_auth_flow_pending_v1";
const AUTH_FLOW_SOURCE_KEY = "resumeatlas_auth_flow_source_v1";
const AUTH_FLOW_ID_KEY = "resumeatlas_auth_flow_id_v1";
const AUTH_FLOW_FUNNEL_ID_KEY = "resumeatlas_auth_flow_funnel_id_v1";
const AUTH_FLOW_STARTED_AT_KEY = "resumeatlas_auth_flow_started_at_v1";
const AUTH_FLOW_SUCCESS_TRACKED_PREFIX = "resumeatlas_auth_flow_success_tracked_v1_";
const AUTH_FLOW_MAX_AGE_MS = 15 * 60 * 1000;

export function beginPendingAuthFlow(
  source: AuthFlowSource,
  funnelId?: string | null
): string {
  const flowId = crypto.randomUUID();
  if (typeof window === "undefined") return flowId;
  try {
    window.sessionStorage.setItem(AUTH_FLOW_PENDING_KEY, "1");
    window.sessionStorage.setItem(AUTH_FLOW_SOURCE_KEY, source);
    window.sessionStorage.setItem(AUTH_FLOW_ID_KEY, flowId);
    window.sessionStorage.setItem(AUTH_FLOW_STARTED_AT_KEY, String(Date.now()));
    if (funnelId) window.sessionStorage.setItem(AUTH_FLOW_FUNNEL_ID_KEY, funnelId);
  } catch {
    // ignore quota / private mode
  }
  trackAuthFlowStarted(source, flowId);
  return flowId;
}

export function readPendingAuthFlow():
  | {
      source: AuthFlowSource;
      flowId: string;
      funnelId: string | null;
    }
  | null {
  if (typeof window === "undefined") return null;
  try {
    if (window.sessionStorage.getItem(AUTH_FLOW_PENDING_KEY) !== "1") return null;
    const source = window.sessionStorage.getItem(AUTH_FLOW_SOURCE_KEY) as AuthFlowSource | null;
    const flowId = window.sessionStorage.getItem(AUTH_FLOW_ID_KEY);
    const funnelId = window.sessionStorage.getItem(AUTH_FLOW_FUNNEL_ID_KEY);
    const startedAtRaw = window.sessionStorage.getItem(AUTH_FLOW_STARTED_AT_KEY);
    const startedAt = startedAtRaw ? Number(startedAtRaw) : NaN;
    if (!Number.isFinite(startedAt) || Date.now() - startedAt > AUTH_FLOW_MAX_AGE_MS) {
      clearPendingAuthFlow();
      return null;
    }
    const validSources: AuthFlowSource[] = [
      "quota_modal",
      "pricing_modal",
      "conversion_modal",
      "navbar",
    ];
    if (source && validSources.includes(source) && flowId) {
      return { source, flowId, funnelId };
    }
  } catch {
    // ignore
  }
  return null;
}

export function clearPendingAuthFlow(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(AUTH_FLOW_PENDING_KEY);
    window.sessionStorage.removeItem(AUTH_FLOW_SOURCE_KEY);
    window.sessionStorage.removeItem(AUTH_FLOW_ID_KEY);
    window.sessionStorage.removeItem(AUTH_FLOW_FUNNEL_ID_KEY);
    window.sessionStorage.removeItem(AUTH_FLOW_STARTED_AT_KEY);
  } catch {
    // ignore
  }
}

export function hasTrackedAuthFlowSuccess(flowId: string | null): boolean {
  if (typeof window === "undefined" || !flowId) return false;
  try {
    return window.sessionStorage.getItem(`${AUTH_FLOW_SUCCESS_TRACKED_PREFIX}${flowId}`) === "1";
  } catch {
    return false;
  }
}

export function markAuthFlowSuccessTracked(flowId: string | null): void {
  if (typeof window === "undefined" || !flowId) return;
  try {
    window.sessionStorage.setItem(`${AUTH_FLOW_SUCCESS_TRACKED_PREFIX}${flowId}`, "1");
  } catch {
    // ignore
  }
}
