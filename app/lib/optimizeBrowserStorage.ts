/** Client-side keys for the /optimize handoff (home → optimize page). */
export const OPTIMIZE_INPUT_KEY = "resumeatlas_optimize_input";
export const OPTIMIZE_CACHE_KEY = "resumeatlas_optimize_cache";
export const OPTIMIZE_DONE_KEY = "resumeatlas_optimize_done";

export type OptimizeRunInput = {
  resumeText: string;
  jobDescription: string;
  analyzeResult: unknown;
  funnelId?: string;
  selectedSkills?: string[];
  selectedRejectionRisks?: string[];
  targetRoleTitle?: string;
  roleLevel?: string;
  parsedResume?: unknown;
  /** Fresh run token — cache must match this id to hydrate. */
  optimizeRunId?: string;
};

export function createOptimizeRunId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/** Drop cached optimize results so a new run cannot reuse stale browser state. */
export function clearOptimizeBrowserArtifacts(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(OPTIMIZE_DONE_KEY);
    window.sessionStorage.removeItem(OPTIMIZE_CACHE_KEY);
    window.localStorage.removeItem(OPTIMIZE_CACHE_KEY);
  } catch {
    // ignore quota / private mode
  }
}

export function persistOptimizeInput(payload: OptimizeRunInput): void {
  if (typeof window === "undefined") return;
  clearOptimizeBrowserArtifacts();
  const serialized = JSON.stringify(payload);
  try {
    window.sessionStorage.setItem(OPTIMIZE_INPUT_KEY, serialized);
    window.localStorage.setItem(OPTIMIZE_INPUT_KEY, serialized);
  } catch {
    // ignore
  }
}

/** Whether a cached optimize result belongs to the current optimize input. */
export function cacheMatchesOptimizeRun(
  cache: { optimizeRunId?: string },
  input: { optimizeRunId?: string }
): boolean {
  if (input.optimizeRunId) {
    return cache.optimizeRunId === input.optimizeRunId;
  }
  // Legacy inputs (before run ids): only reuse cache that also lacks a run id.
  return !cache.optimizeRunId;
}
