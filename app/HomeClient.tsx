"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ResumeForm, type GenerateInputs } from "@/app/components/ResumeForm";
import { ResumePreview } from "@/app/components/ResumePreview";
import { IntelligencePanel } from "@/app/components/IntelligencePanel";
import { LimitModal } from "@/app/components/LimitModal";
import { CreditPackModal } from "@/app/components/CreditPackModal";
import { OptimizeConversionModal } from "@/app/components/OptimizeConversionModal";
import { OptimizeOAuthResumeModal } from "@/app/components/OptimizeOAuthResumeModal";
import { OptimizeDashboardNudgeModal } from "@/app/components/OptimizeDashboardNudgeModal";
import { getCreditPackage, type CreditPackageId } from "@/app/lib/billing/packages";
import { openRazorpayPackCheckout } from "@/app/lib/billing/razorpayPackCheckout";
import {
  alignSupabaseOAuthAuthorizeUrl,
  buildAuthCallbackRedirectTo,
  buildPostAuthReturnPath,
  getPostAuthReturnPath,
} from "@/app/lib/auth/redirect";
import { createClient } from "@/app/lib/supabase/client";
import type { Resume } from "@/app/types/resume";
import type { Usage } from "@/app/lib/usage";
import { computeJDMatch, type JDMatchResult } from "@/app/lib/jdMatch";
import { detectEvidenceGaps } from "@/app/lib/evidenceGap";
import { scanATS, type ATSScanResult } from "@/app/lib/atsScan";
import type { JDAnalysisResult } from "@/app/lib/jdAnalysis";
import type { ATSAnalyzeResult } from "@/app/lib/atsAnalyze";
import type { AnalysisQuotaStatus } from "@/app/lib/quota";
import type { LimitModalQuotaScope } from "@/app/components/LimitModal";
import { CHECK_RESUME_AGAINST_JD_PATH } from "@/app/lib/internalLinks";
import { TOOL_CLUSTER_PATHS_FOR_OAUTH } from "@/app/lib/toolClusterPages";
import { gtagSetUserId } from "@/app/lib/gtagClient";
import type {
  CreditModalOptimizationEntryPoint,
  OptimizationClickSurface,
} from "@/app/lib/analyticsEvents";
import {
  trackAnalysisClicked,
  trackDashboardGenerated,
  trackOptimizationClicked,
  trackOptimizePromptDismissed,
  trackPostDashboardOptimizeModalViewed,
  trackToolPageViewed,
  trackUserLogin,
} from "@/app/lib/analyticsFunnel";
import {
  beginPendingAuthFlow,
  clearPendingAuthFlow,
  hasTrackedAuthFlowSuccess,
  markAuthFlowSuccessTracked,
  readPendingAuthFlow,
} from "@/app/lib/auth/pendingAuthFlow";
import { getActiveFunnelId, setActiveFunnelId, startNewFunnel } from "@/app/lib/funnelTracking";
import { SHOW_AUTOMATIC_OPTIMIZER_PAYWALL_MODALS } from "@/app/lib/optimizerPaywallFlags";
import { useRef } from "react";

/** Horizontal flow for homepage demo; commercial compare/match SEO lives on the tool page. */
const HOW_IT_WORKS_STEPS = [
  {
    key: "paste",
    emoji: "📝",
    title: "Paste resume & job description",
    line: "Copy-paste your resume and the posting. No upload: just paste into the text fields.",
  },
  {
    key: "analyze",
    emoji: "📊",
    title: "ATS score & JD gap analysis",
    line: "See ATS-style compatibility plus missing keywords vs the job description",
  },
  {
    key: "aiOptimize",
    emoji: "✨",
    title: "AI resume optimization",
    line: "JD-aligned rewrites and stronger bullets where they help. Your facts stay yours.",
  },
  {
    key: "download",
    emoji: "⬇️",
    title: "Edit manually & download",
    line: "Tweak any section in the editor, then export PDF or DOCX",
  },
] as const;

const HOME_CAPABILITY_CARDS = [
  {
    title: "Pass ATS screening with confidence",
    body:
      "Stop getting filtered out. See exactly how your resume performs in real ATS systems.",
  },
  {
    title: "See what's weak before you apply",
    body:
      "Get ATS-style feedback and clearer bullets so you know what to fix next.",
  },
  {
    title: "Improve your resume without rewriting everything",
    body:
      "AI enhances your bullet points while preserving your actual experience.",
  },
  {
    title: "Stay in control of your resume",
    body: "Edit everything manually and export clean, job-ready PDFs.",
  },
] as const;

const FALLBACK_ANON_USAGE: Usage = {
  type: "anon",
  creditsRemaining: 0,
  creditsReserved: 0,
  creditsPurchased: 0,
  creditsConsumed: 0,
  showFullIntelligence: true,
};

async function fetchUsage(accessToken: string | null): Promise<Usage> {
  try {
    const headers: HeadersInit = {};
    if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
    const res = await fetch("/api/usage", { credentials: "include", headers });
    if (!res.ok) return FALLBACK_ANON_USAGE;
    const u = await res.json();
    return u && typeof u.type === "string" ? u : FALLBACK_ANON_USAGE;
  } catch {
    return FALLBACK_ANON_USAGE;
  }
}

async function fetchAnalysisQuota(
  accessToken: string | null
): Promise<AnalysisQuotaStatus | null> {
  try {
    const headers: HeadersInit = {};
    if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
    const res = await fetch("/api/analysis-quota", { credentials: "include", headers });
    if (!res.ok) return null;
    const q = await res.json();
    return q && typeof q.remaining === "number" ? q : null;
  } catch {
    return null;
  }
}

const OPTIMIZE_INPUT_KEY = "resumeatlas_optimize_input";
const OPTIMIZE_CACHE_KEY = "resumeatlas_optimize_cache";
const ANALYZER_STATE_KEY = "resumeatlas_analyzer_state_v1";
/** Tab-scoped snapshot so analysis survives Google OAuth → `/?openOptimizer=1` (independent of PERSIST_ANALYZER_STATE). */
const POST_OAUTH_ANALYZER_KEY = "resumeatlas_post_oauth_analyze_v1";
/** Successful logged-in analyses in this tab (sessionStorage). Upgrade modal on 2nd and 4th dashboard only. */
const LOGGED_IN_ANALYSIS_SUCCESS_COUNT_KEY = "resumeatlas_logged_in_analysis_success_count";
/** After JD-backed dashboard renders, pause before showing optimize nudge (lets users scan scores first). */
const OPTIMIZE_NUDGE_DELAY_MS = 60_000;
/** Max nudge impressions per analysis run (first at delay, then every 60s after dismiss). */
const OPTIMIZE_NUDGE_MAX_SHOWS = 3;

function countMissingKeywordsForConversion(r: ATSAnalyzeResult): number {
  const req = r.missing_skills_required?.length ?? 0;
  const pref = r.missing_skills_preferred?.length ?? 0;
  if (req + pref > 0) return req + pref;
  return r.missing_skills?.length ?? 0;
}

/**
 * Restore/save analysis across refresh so the UI can re-display the same
 * cached analysis result for the same JD+resume (trust-preserving).
 */
const PERSIST_ANALYZER_STATE = false;

type AnalyzerStoredState = {
  lastInputs: GenerateInputs;
  lastJD: string;
  lastRoleLevel: string;
  analyzeResult: ATSAnalyzeResult;
  savedAt: number;
  funnelId?: string;
};

function writePostOauthAnalyzerSnapshot(state: AnalyzerStoredState) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(POST_OAUTH_ANALYZER_KEY, JSON.stringify(state));
  } catch {
    // ignore quota / private mode
  }
}

function workbenchSplitPanelColors(
  analysisMode: "jdMatch" | "atsCompliance" | "keywordScanner"
) {
  const previewCanvas =
    "bg-[linear-gradient(160deg,#0f172a_0%,#1e293b_48%,#1e1b4b_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]";
  const previewDivider = "border-slate-700/70";

  if (analysisMode === "atsCompliance") {
    return {
      input: "bg-gradient-to-b from-sky-50/95 via-sky-50/50 to-indigo-50/20",
      preview: previewCanvas,
      divider: previewDivider,
    };
  }
  if (analysisMode === "keywordScanner") {
    return {
      input: "bg-gradient-to-b from-emerald-50/95 via-emerald-50/50 to-teal-50/20",
      preview: previewCanvas,
      divider: previewDivider,
    };
  }
  return {
    input: "bg-gradient-to-b from-indigo-50/95 via-indigo-50/50 to-violet-50/20",
    preview: previewCanvas,
    divider: previewDivider,
  };
}

export type HomeClientProps = {
  /** `toolOnly`: analyzer grid + modals only (for SEO landing pages with their own H1/copy). */
  variant?: "home" | "toolOnly";
  /**
   * `atsCompliance`: optional job description, resume-first ATS scan (distinct from JD matcher pages).
   * `keywordScanner`: keyword gaps + missing skills focus (required JD; simplified results panel).
   */
  analysisMode?: "jdMatch" | "atsCompliance" | "keywordScanner";
  /** Skip homepage marketing hero (SSR shell owns H1/intro on consolidated workbench). */
  hideMarketingHero?: boolean;
  /** Skip post-form footer and browse-by-role (composed separately on homepage). */
  hidePostFormSections?: boolean;
};

export default function HomeClient({
  variant = "home",
  analysisMode = "jdMatch",
  hideMarketingHero = false,
  hidePostFormSections = false,
}: HomeClientProps) {
  const isHome = variant === "home";
  const isToolOnly = variant === "toolOnly";
  const isAtsCompliance = analysisMode === "atsCompliance";
  const isKeywordScanner = analysisMode === "keywordScanner";
  const router = useRouter();
  const pathname = usePathname();
  const [usage, setUsage] = useState<Usage | null>(null);
  const [analysisQuota, setAnalysisQuota] = useState<AnalysisQuotaStatus | null>(null);
  const [limitModalOpen, setLimitModalOpen] = useState(false);
  const [limitModalMessage, setLimitModalMessage] = useState("");
  const [limitModalQuotaScope, setLimitModalQuotaScope] = useState<LimitModalQuotaScope>(null);
  const [creditModalOpen, setCreditModalOpen] = useState(false);
  const [optimizeConversionModalOpen, setOptimizeConversionModalOpen] = useState(false);
  const [conversionModalBusy, setConversionModalBusy] = useState(false);
  const [conversionModalError, setConversionModalError] = useState<string | null>(null);
  const [optimizeConversionPaymentSuccess, setOptimizeConversionPaymentSuccess] = useState(false);
  const [optimizeConversionPaymentReceipt, setOptimizeConversionPaymentReceipt] = useState<{
    packName: string;
    creditsGranted: number;
    creditsRemaining: number;
  } | null>(null);
  const [resume, setResume] = useState<Resume | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastJD, setLastJD] = useState<string | null>(null);
  const [lastRoleLevel, setLastRoleLevel] = useState<string>("Mid");
  const [jdMatchResult, setJdMatchResult] = useState<JDMatchResult | null>(null);
  const [jdAnalysis, setJdAnalysis] = useState<JDAnalysisResult | null>(null);
  const [evidenceGaps, setEvidenceGaps] = useState<string[]>([]);
  const [atsResult, setAtsResult] = useState<ATSScanResult | null>(null);
  const [analyzeResult, setAnalyzeResult] = useState<ATSAnalyzeResult | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isLaunchingOptimize, setIsLaunchingOptimize] = useState(false);
  const [isStartingGoogleAuth, setIsStartingGoogleAuth] = useState(false);
  const [authStartSource, setAuthStartSource] = useState<
    "quota_modal" | "pricing_modal" | "conversion_modal" | null
  >(null);
  const [lastInputs, setLastInputs] = useState<GenerateInputs | null>(null);
  /** Whether the last completed /api/analyze used a non-empty job description. */
  const [lastAnalysisUsedJd, setLastAnalysisUsedJd] = useState(true);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [activeFunnelId, setActiveFunnelIdState] = useState<string | null>(null);
  const [optimizeOauthResumeModalOpen, setOptimizeOauthResumeModalOpen] = useState(false);
  const [optimizeDashboardNudgeOpen, setOptimizeDashboardNudgeOpen] = useState(false);
  const [optimizeNudgeTrigger, setOptimizeNudgeTrigger] = useState(0);
  const optimizeNudgeTriggerRef = useRef(0);
  /** Triggers (`optimizeNudgeTrigger` at fire time) the user dismissed or acted on - allows nudge again on a new analysis. */
  const dismissedOptimizeNudgeTriggersRef = useRef<Set<number>>(new Set());
  /** Which analysis generation the open nudge belongs to (for per-run dismiss tracking). */
  const optimizeNudgeModalForTriggerRef = useRef<number | null>(null);
  /** How many times the nudge was shown for each analysis trigger (max OPTIMIZE_NUDGE_MAX_SHOWS). */
  const optimizeNudgeShowsByTriggerRef = useRef<Map<number, number>>(new Map());
  const optimizeNudgeReshowTimeoutRef = useRef<number | null>(null);
  const modalStackRef = useRef({
    credit: false,
    conversion: false,
    oauthResume: false,
    limit: false,
  });
  const openedOptimizerFromQueryRef = useRef(false);
  const oauthResumeLaunchGuardRef = useRef(false);
  const activeFunnelIdRef = useRef<string | null>(null);
  const authStartSourceRef = useRef<
    "quota_modal" | "pricing_modal" | "conversion_modal" | null
  >(null);

  useEffect(() => {
    activeFunnelIdRef.current = activeFunnelId;
  }, [activeFunnelId]);

  useEffect(() => {
    authStartSourceRef.current = authStartSource;
  }, [authStartSource]);

  useEffect(() => {
    modalStackRef.current = {
      credit: creditModalOpen,
      conversion: SHOW_AUTOMATIC_OPTIMIZER_PAYWALL_MODALS && optimizeConversionModalOpen,
      oauthResume: optimizeOauthResumeModalOpen,
      limit: limitModalOpen,
    };
  }, [creditModalOpen, optimizeConversionModalOpen, optimizeOauthResumeModalOpen, limitModalOpen]);

  const tryOpenOptimizeDashboardNudge = useCallback((trigger: number) => {
    if (trigger !== optimizeNudgeTriggerRef.current) return;
    if (dismissedOptimizeNudgeTriggersRef.current.has(trigger)) return;
    const shows = optimizeNudgeShowsByTriggerRef.current.get(trigger) ?? 0;
    if (shows >= OPTIMIZE_NUDGE_MAX_SHOWS) return;
    const m = modalStackRef.current;
    if (m.credit || m.conversion || m.oauthResume || m.limit) return;
    optimizeNudgeShowsByTriggerRef.current.set(trigger, shows + 1);
    optimizeNudgeModalForTriggerRef.current = trigger;
    setOptimizeDashboardNudgeOpen(true);
  }, []);

  const clearOptimizeNudgeReshowTimeout = useCallback(() => {
    if (optimizeNudgeReshowTimeoutRef.current) {
      window.clearTimeout(optimizeNudgeReshowTimeoutRef.current);
      optimizeNudgeReshowTimeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (optimizeNudgeTrigger === 0) return;
    if (!analyzeResult || !lastInputs || !lastAnalysisUsedJd || isGenerating) return;

    const scheduledFor = optimizeNudgeTrigger;
    let cancelled = false;

    const t =
      typeof window !== "undefined"
        ? window.setTimeout(() => {
            if (cancelled) return;
            tryOpenOptimizeDashboardNudge(scheduledFor);
          }, OPTIMIZE_NUDGE_DELAY_MS)
        : 0;

    return () => {
      cancelled = true;
      if (t) window.clearTimeout(t);
    };
  }, [
    optimizeNudgeTrigger,
    analyzeResult,
    lastInputs,
    lastAnalysisUsedJd,
    isGenerating,
    tryOpenOptimizeDashboardNudge,
  ]);

  /** Supabase can send PKCE `code` to Site URL root (`/?code=`) instead of `/auth/callback`. */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const path = window.location.pathname.replace(/\/$/, "") || "/";
    const oauthPaths = new Set<string>(["/", ...TOOL_CLUSTER_PATHS_FOR_OAUTH]);
    if (!oauthPaths.has(path)) return;
    const sp = new URLSearchParams(window.location.search);
    if (!sp.get("code")) return;
    if (!sp.has("next")) sp.set("next", path);
    window.location.replace(`${window.location.origin}/auth/callback?${sp.toString()}`);
  }, []);

  /** Logged-in-only path sets this; if session disappears, avoid "optimizing" UI while logged out. */
  useEffect(() => {
    if (!isLoggedIn && isLaunchingOptimize) setIsLaunchingOptimize(false);
  }, [isLoggedIn, isLaunchingOptimize]);

  /**
   * OAuth can be canceled/closed without throwing in some browser/provider paths.
   * If user returns to this tab and no navigation happened, clear stuck "Signing in…" UI.
   */
  useEffect(() => {
    if (!isStartingGoogleAuth || typeof window === "undefined") return;

    let cancelled = false;
    const clearIfActive = () => {
      if (cancelled) return;
      setIsStartingGoogleAuth(false);
      setAuthStartSource(null);
      clearPendingAuthFlow();
    };
    const clearSoonIfVisible = () => {
      window.setTimeout(() => {
        if (!cancelled && document.visibilityState === "visible") {
          setIsStartingGoogleAuth(false);
        }
      }, 300);
    };

    // Hard fallback in case provider flow silently stalls.
    const timeoutId = window.setTimeout(() => {
      if (document.visibilityState === "visible") {
        clearIfActive();
      }
    }, 15000);

    window.addEventListener("focus", clearSoonIfVisible);
    document.addEventListener("visibilitychange", clearSoonIfVisible);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      window.removeEventListener("focus", clearSoonIfVisible);
      document.removeEventListener("visibilitychange", clearSoonIfVisible);
    };
  }, [isStartingGoogleAuth]);

  const refreshUsage = useCallback(async () => {
    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const token = session?.access_token ?? null;
    gtagSetUserId(session?.user?.id ?? null);
    setIsLoggedIn(!!token);
    const [u, q] = await Promise.all([fetchUsage(token), fetchAnalysisQuota(token)]);
    setUsage(u);
    setAnalysisQuota(q);
  }, []);

  const closeOptimizeConversionModal = useCallback(() => {
    setOptimizeConversionPaymentSuccess(false);
    setOptimizeConversionPaymentReceipt(null);
    setOptimizeConversionModalOpen(false);
  }, []);

  useEffect(() => {
    refreshUsage();
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session?.access_token);
      gtagSetUserId(session?.user?.id ?? null);
      if (event === "SIGNED_IN") {
        const pending = readPendingAuthFlow();
        if (pending) {
          const effectiveFunnelId = pending.funnelId ?? activeFunnelIdRef.current;
          if (!hasTrackedAuthFlowSuccess(pending.flowId)) {
            trackUserLogin(pending.source, pending.flowId);
            markAuthFlowSuccessTracked(pending.flowId);
          }
          if (effectiveFunnelId) setActiveFunnelIdState(effectiveFunnelId);
          clearPendingAuthFlow();
        }
        setIsStartingGoogleAuth(false);
        setAuthStartSource(null);
      }
      if (!session?.access_token) {
        try {
          window.sessionStorage.removeItem(LOGGED_IN_ANALYSIS_SUCCESS_COUNT_KEY);
        } catch {
          /* ignore */
        }
      }
      refreshUsage();
    });
    if (typeof window !== "undefined") {
      setActiveFunnelIdState(getActiveFunnelId());
      let sid = window.sessionStorage.getItem("session_id");
      if (!sid) {
        sid = crypto.randomUUID();
        window.sessionStorage.setItem("session_id", sid);
      }
      setSessionId(sid);

      const currentSearchParams = new URLSearchParams(window.location.search);
      const openOptimizerReturn = currentSearchParams.get("openOptimizer") === "1";
      if (openOptimizerReturn) {
        try {
          const raw = window.sessionStorage.getItem(POST_OAUTH_ANALYZER_KEY);
          if (raw) {
            const parsed = JSON.parse(raw) as Partial<AnalyzerStoredState>;
            const li = parsed.lastInputs as GenerateInputs | undefined;
            const ajd = typeof parsed.lastJD === "string" ? parsed.lastJD : undefined;
            const arl = typeof parsed.lastRoleLevel === "string" ? parsed.lastRoleLevel : undefined;
            const ar = parsed.analyzeResult as ATSAnalyzeResult | undefined;
            const fid = typeof parsed.funnelId === "string" ? parsed.funnelId : null;
            if (li?.resumeText && ar?.ats_score !== undefined) {
              setLastInputs(li);
              setLastJD(ajd ?? li.jobDescription ?? "");
              setLastAnalysisUsedJd(!!(li.jobDescription ?? "").trim());
              if (arl) setLastRoleLevel(arl);
              setAnalyzeResult(ar);
              if (fid) {
                setActiveFunnelId(fid);
                setActiveFunnelIdState(fid);
              }
            }
            window.sessionStorage.removeItem(POST_OAUTH_ANALYZER_KEY);
          }
        } catch {
          // ignore
        }
      } else {
        try {
          window.sessionStorage.removeItem(POST_OAUTH_ANALYZER_KEY);
        } catch {
          // ignore
        }
      }

      if (!PERSIST_ANALYZER_STATE) {
        try {
          window.sessionStorage.removeItem(ANALYZER_STATE_KEY);
          window.localStorage.removeItem(ANALYZER_STATE_KEY);
        } catch {
          // ignore
        }
      } else {
        // Restore analyzer state after hard reload / OAuth round-trip.
        // Prefer sessionStorage (tab-scoped), fall back to localStorage (more durable).
        try {
          const raw =
            window.sessionStorage.getItem(ANALYZER_STATE_KEY) ||
            window.localStorage.getItem(ANALYZER_STATE_KEY);
          if (raw) {
            const parsed = JSON.parse(raw) as Partial<AnalyzerStoredState>;
            const li = parsed.lastInputs as GenerateInputs | undefined;
            const ajd = typeof parsed.lastJD === "string" ? parsed.lastJD : undefined;
            const arl = typeof parsed.lastRoleLevel === "string" ? parsed.lastRoleLevel : undefined;
            const ar = parsed.analyzeResult as ATSAnalyzeResult | undefined;
            if (li?.resumeText && ar?.ats_score !== undefined) {
              setLastInputs(li);
              setLastJD(ajd ?? li.jobDescription ?? "");
              setLastAnalysisUsedJd(!!(li.jobDescription ?? "").trim());
              if (arl) setLastRoleLevel(arl);
              setAnalyzeResult(ar);
            }
          }
        } catch {
          // ignore restore failures
        }
      }

      // No longer clear optimize artifacts here; they are used to restore state.
    }

    return () => subscription.unsubscribe();
  }, [refreshUsage]);

  useEffect(() => {
    if (openedOptimizerFromQueryRef.current) return;
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const open = params.get("openOptimizer");
    const optimizerFlow = params.get("optimizerFlow");
    if (open !== "1") return;
    if (!analyzeResult || !lastInputs) return;
    openedOptimizerFromQueryRef.current = true;

    if (optimizerFlow === "optimize") {
      setOptimizeConversionModalOpen(false);
      setCreditModalOpen(false);
      oauthResumeLaunchGuardRef.current = false;
      setOptimizeOauthResumeModalOpen(true);
    } else if (!SHOW_AUTOMATIC_OPTIMIZER_PAYWALL_MODALS) {
      setOptimizeConversionPaymentSuccess(false);
      setOptimizeConversionPaymentReceipt(null);
      setConversionModalError(null);
      setOptimizeConversionModalOpen(false);
      setCreditModalOpen(false);
    } else if (optimizerFlow === "conversion") {
      setOptimizeConversionPaymentSuccess(false);
      setOptimizeConversionPaymentReceipt(null);
      setConversionModalError(null);
      setCreditModalOpen(false);
      setOptimizeConversionModalOpen(true);
    } else {
      setOptimizeConversionModalOpen(false);
      setCreditModalOpen(true);
    }
    // Clean the URL so refresh doesn't re-open the modal (stay on same page).
    router.replace(pathname || "/");
  }, [analyzeResult, lastInputs, router, pathname]);

  const logAnalysisEvent = useCallback(
    async (eventType: string) => {
      try {
        let sid = sessionId;
        if (!sid && typeof window !== "undefined") {
          sid = window.sessionStorage.getItem("session_id");
          if (!sid) {
            sid = crypto.randomUUID();
            window.sessionStorage.setItem("session_id", sid);
          }
          setSessionId(sid);
        }
        if (!sid) return;
        const supabase = createClient();
        const {
          data: { session },
        } = await supabase.auth.getSession();
        const mailId = session?.user?.email ?? null;
        const userId = session?.user?.id ?? null;
        await supabase.from("analysis_events").insert({
          session_id: sid,
          event_type: eventType,
          mail_id: mailId,
          user_id: userId,
        });
      } catch {
        // Tracking is best-effort; ignore errors in UI.
      }
    },
    [sessionId]
  );

  useEffect(() => {
    if (!optimizeDashboardNudgeOpen) return;
    void logAnalysisEvent("optimize_dashboard_nudge_shown");
    const trigger = optimizeNudgeModalForTriggerRef.current;
    if (trigger != null) trackPostDashboardOptimizeModalViewed(trigger);
  }, [optimizeDashboardNudgeOpen, logAnalysisEvent]);

  useEffect(() => {
    if (!isToolOnly) return;
    trackToolPageViewed(pathname || CHECK_RESUME_AGAINST_JD_PATH);
  }, [isToolOnly, pathname]);

  const getAuthHeaders = useCallback(async () => {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    const h: HeadersInit = { "Content-Type": "application/json" };
    if (session?.access_token) h["Authorization"] = `Bearer ${session.access_token}`;
    return h;
  }, []);

  const handleGenerate = useCallback(
    async (inputs: GenerateInputs) => {
      setError(null);
      setOptimizeConversionModalOpen(false);
      setOptimizeConversionPaymentSuccess(false);
      setOptimizeConversionPaymentReceipt(null);
      setConversionModalError(null);
      setOptimizeDashboardNudgeOpen(false);
      clearOptimizeNudgeReshowTimeout();
      if (optimizeNudgeModalForTriggerRef.current != null) {
        dismissedOptimizeNudgeTriggersRef.current.add(optimizeNudgeModalForTriggerRef.current);
      }
      optimizeNudgeModalForTriggerRef.current = null;
      setIsGenerating(true);
      setJdMatchResult(null);
      setJdAnalysis(null);
      setEvidenceGaps([]);
      setAtsResult(null);
      setAnalyzeResult(null);
      const country = inputs.country || "USA";
      const roleLevel = inputs.roleLevel || "Mid";
      const jdTrimmed = inputs.jobDescription.trim();
      setLastAnalysisUsedJd(!!jdTrimmed);
      const normalizedInputs: GenerateInputs = {
        resumeText: inputs.resumeText,
        jobDescription: inputs.jobDescription,
        country,
        roleLevel,
      };
      setLastInputs(normalizedInputs);
      setLastJD(inputs.jobDescription);
      setLastRoleLevel(roleLevel);
      const funnelId = startNewFunnel("analyze_submit");
      setActiveFunnelIdState(funnelId);
      void logAnalysisEvent("analyze_clicked");
      trackAnalysisClicked(isLoggedIn ? "logged_in" : "anonymous");
      try {
        const headers = await getAuthHeaders();
        const res = await fetch("/api/analyze", {
          method: "POST",
          credentials: "include",
          headers: { ...headers, "Content-Type": "application/json" },
          body: JSON.stringify({
            resumeText: inputs.resumeText,
            jobDescription: jdTrimmed,
          }),
        });
        const raw = await res.text();
        let data: ATSAnalyzeResult | { error?: string | { code?: string; message?: string; quota?: AnalysisQuotaStatus } };
        try {
          data = JSON.parse(raw) as typeof data;
        } catch {
          setError(
            res.ok
              ? "Analysis returned an invalid response. Check the dev server console or try again."
              : `Analysis failed (${res.status}). If you see this after a deploy, confirm API routes built successfully.`
          );
          return;
        }
        if (!res.ok) {
          if (res.status === 429) {
            const err = (data as { error?: { code?: string; message?: string; quota?: AnalysisQuotaStatus } })?.error;
            const quotaErr =
              typeof err === "object" && err && "code" in err && err.code === "ANALYSIS_QUOTA_EXCEEDED";
            if (quotaErr && typeof err === "object" && "quota" in err && err.quota) {
              const q = err.quota as AnalysisQuotaStatus;
              setLimitModalQuotaScope(q.scope);
              setLimitModalMessage(
                typeof err.message === "string" ? err.message : "You've used your free ATS scans for now."
              );
              setLimitModalOpen(true);
              setAnalysisQuota(q);
              return;
            }
          }
          setError(
            typeof (data as { error?: string }).error === "string"
              ? (data as { error: string }).error
              : "Analysis failed"
          );
          return;
        }
        const result = data as ATSAnalyzeResult & { quota?: Partial<AnalysisQuotaStatus> };
        setAnalyzeResult(result);
        if (result.quota && typeof result.quota.remaining === "number") {
          const limit = result.quota.limit ?? 0;
          const used = Math.min(result.quota.used ?? 0, limit);
          const remaining = Math.min(result.quota.remaining, Math.max(0, limit - used));
          setAnalysisQuota({
            allowed: remaining > 0,
            remaining,
            used,
            limit,
            scope: (result.quota.scope as AnalysisQuotaStatus["scope"]) ?? "anonymous",
          });
        }
        if (typeof window !== "undefined" && PERSIST_ANALYZER_STATE) {
          const toStore: AnalyzerStoredState = {
            lastInputs: normalizedInputs,
            lastJD: inputs.jobDescription,
            lastRoleLevel: roleLevel,
            analyzeResult: data as ATSAnalyzeResult,
            savedAt: Date.now(),
          };
          try {
            window.sessionStorage.setItem(ANALYZER_STATE_KEY, JSON.stringify(toStore));
          } catch {
            // ignore
          }
          try {
            window.localStorage.setItem(ANALYZER_STATE_KEY, JSON.stringify(toStore));
          } catch {
            // ignore
          }
        }
        void logAnalysisEvent("dashboard_generated");
        trackDashboardGenerated({
          evidenceMatch: result.evidence_dashboard?.evidenceMatch,
          userState: isLoggedIn ? "logged_in" : "anonymous",
          jdUsed: jdTrimmed ? "yes" : "no",
          analysisId: funnelId,
        });

        if (jdTrimmed) {
          setOptimizeNudgeTrigger((n) => {
            const next = n + 1;
            optimizeNudgeTriggerRef.current = next;
            return next;
          });
        }

        // Pricing is shown at download time on /optimize (not after analysis).
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong");
      } finally {
        setIsGenerating(false);
      }
    },
    [clearOptimizeNudgeReshowTimeout, getAuthHeaders, isLoggedIn, logAnalysisEvent]
  );

  const handleStartGoogleAuthForQuota = useCallback(async () => {
    const supabase = createClient();
    setAuthStartSource("quota_modal");
    setIsStartingGoogleAuth(true);
    setError(null);
    const flowId = beginPendingAuthFlow("quota_modal", activeFunnelId);
    void flowId;
    try {
      const redirectTo = buildAuthCallbackRedirectTo(getPostAuthReturnPath("/"));
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo },
      });
      if (error) throw error;
      // Some environments rely on explicit navigation; @supabase/ssr usually redirects automatically.
      if (data?.url) {
        window.location.assign(
          alignSupabaseOAuthAuthorizeUrl(data.url, redirectTo)
        );
      }
    } catch (e) {
      clearPendingAuthFlow();
      setError(e instanceof Error ? e.message : "Sign-in failed");
      setIsStartingGoogleAuth(false);
      setAuthStartSource(null);
    }
  }, [activeFunnelId]);

  const handleStartGoogleAuthForOptimize = useCallback(async () => {
    if (!lastInputs || !analyzeResult) return;
    const supabase = createClient();
    const source: "pricing_modal" = "pricing_modal";
    setAuthStartSource(source);
    setIsStartingGoogleAuth(true);
    setError(null);
    const flowId = beginPendingAuthFlow(source, activeFunnelId);
    void flowId;
    try {
      if (typeof window !== "undefined") {
        writePostOauthAnalyzerSnapshot({
          lastInputs,
          lastJD: lastJD ?? lastInputs.jobDescription,
          lastRoleLevel,
          analyzeResult,
          savedAt: Date.now(),
          funnelId: activeFunnelId ?? undefined,
        });
      }
      const redirectTo = buildAuthCallbackRedirectTo(
        buildPostAuthReturnPath({ openOptimizer: true, optimizerFlow: "optimize" })
      );
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo },
      });
      if (error) throw error;
      if (data?.url) {
        window.location.assign(
          alignSupabaseOAuthAuthorizeUrl(data.url, redirectTo)
        );
      }
    } catch (e) {
      clearPendingAuthFlow();
      setError(e instanceof Error ? e.message : "Sign-in failed");
      setIsStartingGoogleAuth(false);
      setAuthStartSource(null);
    }
  }, [lastInputs, analyzeResult, activeFunnelId, lastJD, lastRoleLevel]);

  const launchOptimizerFlow = useCallback(async () => {
    if (!lastInputs || !analyzeResult) return;
    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.access_token) {
      await handleStartGoogleAuthForOptimize();
      return;
    }
    setError(null);
    setIsLaunchingOptimize(true);
    try {
      const resumeText = lastInputs.resumeText;
      const jobDescription = lastJD ?? lastInputs.jobDescription;
      // Parse-resume runs on /optimize so navigation is not blocked (localhost parse can take several seconds).
      if (typeof window !== "undefined") {
        try {
          const payload = JSON.stringify({
            resumeText,
            jobDescription,
            analyzeResult,
            funnelId: activeFunnelId ?? undefined,
          });
          window.sessionStorage.setItem(OPTIMIZE_INPUT_KEY, payload);
          window.localStorage.setItem(OPTIMIZE_INPUT_KEY, payload);
          window.sessionStorage.removeItem("resumeatlas_optimize_done");
          window.sessionStorage.removeItem(OPTIMIZE_CACHE_KEY);
          window.localStorage.removeItem(OPTIMIZE_CACHE_KEY);
        } catch {
          // ignore
        }
      }
      void fetch("/api/optimize-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ ats_score_before: analyzeResult.ats_score }),
      }).catch(() => {
        /* analytics only */
      });
      setCreditModalOpen(false);
      void refreshUsage();
      router.push("/optimize");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not start optimization");
    } finally {
      setIsLaunchingOptimize(false);
    }
  }, [
    lastInputs,
    analyzeResult,
    lastJD,
    router,
    refreshUsage,
    activeFunnelId,
    handleStartGoogleAuthForOptimize,
  ]);

  const dismissOptimizeDashboardNudge = useCallback(() => {
    trackOptimizePromptDismissed("post_dashboard_nudge");
    const t = optimizeNudgeModalForTriggerRef.current;
    optimizeNudgeModalForTriggerRef.current = null;
    setOptimizeDashboardNudgeOpen(false);
    if (t == null) return;

    const shows = optimizeNudgeShowsByTriggerRef.current.get(t) ?? 0;
    if (shows >= OPTIMIZE_NUDGE_MAX_SHOWS) {
      dismissedOptimizeNudgeTriggersRef.current.add(t);
      return;
    }

    clearOptimizeNudgeReshowTimeout();
    optimizeNudgeReshowTimeoutRef.current = window.setTimeout(() => {
      optimizeNudgeReshowTimeoutRef.current = null;
      tryOpenOptimizeDashboardNudge(t);
    }, OPTIMIZE_NUDGE_DELAY_MS);
  }, [clearOptimizeNudgeReshowTimeout, tryOpenOptimizeDashboardNudge]);

  const onOptimizeFromDashboardNudge = useCallback(() => {
    const t = optimizeNudgeModalForTriggerRef.current;
    clearOptimizeNudgeReshowTimeout();
    if (t != null) dismissedOptimizeNudgeTriggersRef.current.add(t);
    optimizeNudgeModalForTriggerRef.current = null;
    setOptimizeDashboardNudgeOpen(false);
    trackOptimizationClicked("post_dashboard_nudge");
    void launchOptimizerFlow();
  }, [clearOptimizeNudgeReshowTimeout, launchOptimizerFlow]);

  const onCreditModalStartOptimize = useCallback(
    (entryPoint: CreditModalOptimizationEntryPoint) => {
      trackOptimizationClicked(entryPoint);
      return launchOptimizerFlow();
    },
    [launchOptimizerFlow]
  );

  const dismissOptimizeOAuthResumeModal = useCallback(() => {
    trackOptimizePromptDismissed("oauth_return");
    oauthResumeLaunchGuardRef.current = false;
    setOptimizeOauthResumeModalOpen(false);
  }, []);

  const startOptimizationAfterOAuthReturn = useCallback(() => {
    if (oauthResumeLaunchGuardRef.current) return;
    oauthResumeLaunchGuardRef.current = true;
    trackOptimizationClicked("oauth_return");
    void launchOptimizerFlow().finally(() => {
      oauthResumeLaunchGuardRef.current = false;
      setOptimizeOauthResumeModalOpen(false);
    });
  }, [launchOptimizerFlow]);

  const handleStartGoogleAuthForPackage = useCallback(
    async (
      packageId: CreditPackageId,
      source: "pricing_modal" | "conversion_modal" = "pricing_modal",
      targetFlow: "pricing" | "conversion" | "optimize" = "pricing"
    ) => {
      void packageId;
      if (!lastInputs || !analyzeResult) return;
      const supabase = createClient();
      setAuthStartSource(source);
      setIsStartingGoogleAuth(true);
      setError(null);
      const flowId = beginPendingAuthFlow(source, activeFunnelId);
      void flowId;
      try {
        if (typeof window !== "undefined") {
          writePostOauthAnalyzerSnapshot({
            lastInputs,
            lastJD: lastJD ?? lastInputs.jobDescription,
            lastRoleLevel,
            analyzeResult,
            savedAt: Date.now(),
            funnelId: activeFunnelId ?? undefined,
          });
        }
        const redirectTo = buildAuthCallbackRedirectTo(
          buildPostAuthReturnPath({
            openOptimizer: true,
            optimizerFlow:
              targetFlow === "conversion"
                ? "conversion"
                : targetFlow === "optimize"
                  ? "optimize"
                  : undefined,
          })
        );
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: { redirectTo },
        });
        if (error) throw error;
        if (data?.url) {
          window.location.assign(
            alignSupabaseOAuthAuthorizeUrl(data.url, redirectTo)
          );
        }
      } catch (e) {
        clearPendingAuthFlow();
        setError(e instanceof Error ? e.message : "Sign-in failed");
        setIsStartingGoogleAuth(false);
        setAuthStartSource(null);
      }
    },
    [lastInputs, lastJD, lastRoleLevel, analyzeResult, activeFunnelId]
  );

  const handleConversionPrimaryAction = useCallback(async () => {
    setConversionModalError(null);
    if (!lastInputs || !analyzeResult) return;
    if (!isLoggedIn) {
      closeOptimizeConversionModal();
      await handleStartGoogleAuthForPackage("starter", "conversion_modal");
      return;
    }
    const credits = usage?.creditsRemaining ?? 0;
    if (credits > 0) {
      closeOptimizeConversionModal();
      trackOptimizationClicked("conversion_modal");
      await launchOptimizerFlow();
      return;
    }
    void logAnalysisEvent("upgrade_modal_pay");
    setConversionModalBusy(true);
    try {
      const result = await openRazorpayPackCheckout({
        packageId: "starter",
        creditsRemaining: credits,
        isLoggedIn: true,
        getAuthHeaders,
        onRefreshBalance: refreshUsage,
        checkoutTrigger: "conversion_modal",
        funnelId: activeFunnelId ?? undefined,
      });
      if (result.status === "paid") {
        await refreshUsage();
        const pkg = getCreditPackage("starter");
        setOptimizeConversionPaymentReceipt({
          packName: pkg?.name ?? "Starter",
          creditsGranted: result.creditsGranted,
          creditsRemaining: result.creditsRemaining,
        });
        setOptimizeConversionPaymentSuccess(true);
      } else if (result.status === "error") {
        setConversionModalError(result.message);
      }
    } finally {
      setConversionModalBusy(false);
    }
  }, [
    analyzeResult,
    closeOptimizeConversionModal,
    getAuthHeaders,
    handleStartGoogleAuthForPackage,
    isLoggedIn,
    lastInputs,
    launchOptimizerFlow,
    logAnalysisEvent,
    refreshUsage,
    usage?.creditsRemaining,
    activeFunnelId,
  ]);

  const handleConversionFixResumeNow = useCallback(async () => {
    void logAnalysisEvent("optimize_conversion_modal_fix_resume_now_clicked");
    trackOptimizationClicked("conversion_modal_after_payment");
    closeOptimizeConversionModal();
    await launchOptimizerFlow();
  }, [closeOptimizeConversionModal, launchOptimizerFlow, logAnalysisEvent]);

  const handleResumeChange = useCallback((next: Resume) => {
    setResume(next);
    if (lastJD && next) {
      setJdMatchResult(computeJDMatch(lastJD, next));
      setAtsResult(scanATS(next));
      if (jdAnalysis) setEvidenceGaps(detectEvidenceGaps(jdAnalysis, next));
    }
  }, [lastJD, jdAnalysis]);

  const handleDownload = useCallback(async () => {
    if (!resume) return;
    setError(null);
    setIsDownloading(true);
    try {
      const headers = await getAuthHeaders();
      const res = await fetch("/api/download", {
        method: "POST",
        headers,
        body: JSON.stringify({ resume }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        if (res.status === 401) {
          setLimitModalQuotaScope(null);
          setLimitModalMessage(data?.error || "Sign in to download your resume PDF.");
          setLimitModalOpen(true);
        } else {
          setError(
            data?.error || `Download failed (${res.status.toString()})`
          );
        }
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ResumeAtlas_Optimized_Resume.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Failed to download resume PDF."
      );
    } finally {
      setIsDownloading(false);
    }
  }, [getAuthHeaders, resume]);

  const showForm = true;

  const reduceMotion = useReducedMotion();
  const howFlowContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.08,
        delayChildren: reduceMotion ? 0 : 0.05,
      },
    },
  };
  const howFlowItem = {
    hidden: reduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  const Root = isHome ? "main" : "div";
  const useSplitPanels = !isHome;
  const splitPanels = workbenchSplitPanelColors(analysisMode);
  const rootClassName =
    isHome && !hideMarketingHero
      ? "min-h-screen flex flex-col bg-white"
      : "flex flex-col";

  return (
    <Root
      className={rootClassName}
      {...(!isHome
        ? {
            "aria-label": isAtsCompliance
              ? "ATS resume compatibility checker"
              : isKeywordScanner
                ? "Resume keyword scanner"
                : "Resume and job description checker",
          }
        : {})}
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-2 sm:py-3 flex flex-col gap-3 sm:gap-4">
        {isHome && !hideMarketingHero ? (
        <header className="text-center mt-0 sm:mt-0 mb-0">
          <h1 className="text-xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 max-w-4xl mx-auto leading-snug sm:leading-[1.2]">
            ResumeAtlas: free AI resume editor and ATS checker
          </h1>

          <p className="mt-2 sm:mt-2.5 text-[13px] sm:text-base text-slate-600 max-w-3xl mx-auto px-1 sm:px-2 leading-relaxed sm:leading-snug">
            Try the resume checker below: paste your resume, get ATS-style feedback, improve bullets
            with AI, and export when ready. Free until download.
          </p>

          <div className="mt-4 sm:mt-5 mb-4 sm:mb-5 mx-auto w-full max-w-lg px-0 sm:px-0">
            <div className="rounded-xl bg-slate-50 px-4 py-4 sm:p-5 text-center">
              <button
                type="button"
                data-analytics="hero_scroll_to_checker"
                className="inline-flex w-full sm:w-auto min-w-[min(100%,16rem)] items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-[13px] font-semibold text-white shadow-md transition hover:bg-slate-800 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:px-8 sm:py-3 sm:text-base"
                onClick={() => {
                  document
                    .getElementById("ats-checker-form")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                Try the resume checker (free)
              </button>
              <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm leading-snug text-slate-600">
                <span className="mr-1.5 inline-block" aria-hidden="true">
                  👉
                </span>
                Edit everything before download. No fake content. Ready-to-apply in minutes.
              </p>
            </div>
          </div>

          <section
            className="mt-1 sm:mt-2 w-full rounded-xl bg-slate-50 px-3 py-4 sm:px-4 sm:py-4"
            aria-labelledby="home-capabilities-heading"
          >
            <h2
              id="home-capabilities-heading"
              className="text-center text-base sm:text-xl font-semibold tracking-tight text-slate-900"
            >
              What you can do with ResumeAtlas
            </h2>
            <ul className="mt-3 m-0 grid list-none grid-cols-1 gap-2.5 p-0 sm:grid-cols-2 lg:grid-cols-4 sm:gap-3">
              {HOME_CAPABILITY_CARDS.map((card) => (
                <li
                  key={card.title}
                  className="rounded-lg bg-white p-3 text-center shadow-sm ring-1 ring-slate-900/[0.05] sm:p-3.5 sm:text-left"
                >
                  <h3 className="text-sm font-semibold leading-snug text-slate-900">
                    {card.title}
                  </h3>
                  <p className="mt-1 text-xs leading-snug text-slate-600 sm:text-[13px]">
                    {card.body}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section
            className="mt-4 sm:mt-5 w-full pb-5 sm:pb-6"
            aria-labelledby="home-how-it-works-heading"
          >
            <div className="max-w-7xl mx-auto w-full px-2 sm:px-3">
              <div className="flex flex-col items-center text-center">
                <h2
                  id="home-how-it-works-heading"
                  className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900"
                >
                  How it works
                </h2>
                <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm leading-snug text-slate-600 max-w-xl">
                  Paste, review feedback, refine with AI, and download. Same workflow on this page
                  and on the dedicated job-description checker.
                </p>
              </div>

              <motion.ol
                className="m-0 mt-4 sm:mt-5 flex list-none flex-col items-stretch gap-4 p-0 md:flex-row md:flex-wrap md:items-center md:justify-center md:gap-y-4"
                variants={howFlowContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "0px 0px -40px 0px" }}
              >
                {HOW_IT_WORKS_STEPS.map((step, i) => (
                  <motion.li
                    key={step.key}
                    variants={howFlowItem}
                    className="flex items-stretch md:items-center"
                  >
                    <div className="flex w-full max-w-md mx-auto flex-row items-start gap-3 rounded-xl bg-white/80 px-3 py-3 text-left shadow-sm ring-1 ring-slate-900/[0.06] md:w-[9.5rem] md:max-w-none md:flex-col md:items-center md:bg-transparent md:p-0 md:text-center md:shadow-none md:ring-0 lg:w-[10rem]">
                      <span
                        className="text-2xl leading-none sm:text-4xl md:text-4xl shrink-0"
                        aria-hidden="true"
                      >
                        {step.emoji}
                      </span>
                      <div className="min-w-0 flex-1 md:w-full">
                        <h3 className="mt-0 text-sm font-semibold tracking-tight text-slate-900 md:mt-1.5 md:text-sm">
                          {step.title}
                        </h3>
                        <p className="mt-0.5 text-xs leading-snug text-slate-600 sm:leading-snug">
                          {step.line}
                        </p>
                      </div>
                    </div>
                    {i < HOW_IT_WORKS_STEPS.length - 1 ? (
                      <div
                        className="hidden md:flex shrink-0 items-center justify-center self-stretch px-1 sm:px-1.5 md:px-2"
                        aria-hidden="true"
                      >
                        <span className="text-xl font-semibold leading-none text-slate-400 sm:text-2xl md:text-3xl">
                          →
                        </span>
                      </div>
                    ) : null}
                  </motion.li>
                ))}
              </motion.ol>
            </div>
          </section>
        </header>
        ) : null}

        <div className={isHome ? "mt-3 sm:mt-4" : "mt-0 sm:mt-0"}>
          <div
            className={
              useSplitPanels
                ? "grid min-h-0 flex-1 grid-cols-1 gap-0 overflow-hidden rounded-2xl border border-slate-200/70 shadow-sm shadow-slate-900/[0.04] lg:grid-cols-3"
                : "grid min-h-0 flex-1 grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-3"
            }
          >
          <div
            className={
              useSplitPanels
                ? `border-b p-3 sm:p-4 lg:col-span-1 lg:border-b-0 lg:p-5 ${splitPanels.input} ${splitPanels.divider}`
                : "lg:col-span-1"
            }
            id="ats-checker-form"
          >
            {showForm && (
              <ResumeForm
                resume={resume}
                onResumeChange={handleResumeChange}
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
                error={error}
                isLoggedIn={isLoggedIn}
                analysisMode={analysisMode}
                analysisQuota={analysisQuota}
                onLoginForMoreScans={handleStartGoogleAuthForQuota}
                isLoggingInForMoreScans={isStartingGoogleAuth}
                showShareFriendsCta={isToolOnly}
              />
            )}
          </div>
          <div
            className={
              useSplitPanels
                ? `flex min-h-0 flex-col gap-4 p-3 sm:p-4 lg:col-span-2 lg:border-l lg:p-5 ${splitPanels.preview} ${splitPanels.divider}`
                : "flex min-h-0 flex-col gap-4 lg:col-span-2"
            }
          >
            <div
              className={
                useSplitPanels
                  ? "flex h-[min(82vh,42rem)] min-h-0 w-full flex-col overflow-hidden"
                  : ""
              }
            >
            <IntelligencePanel
              analyzeResult={analyzeResult}
              showFullIntelligence={usage?.showFullIntelligence ?? false}
              showLocked={false}
              compactHomeEmpty={isHome && hideMarketingHero}
              compactToolEmpty={isToolOnly}
              compactToolResult={isToolOnly && useSplitPanels}
              previewSurface={useSplitPanels}
              isAnalyzing={isGenerating}
              compactEmptyHint={
                isToolOnly
                  ? isAtsCompliance
                    ? "Paste your resume on the left and run a free ATS check. Job description is optional."
                    : isKeywordScanner
                      ? "Paste resume and job description on the left, then scan for missing keywords."
                      : "Paste resume and job description on the left, then run evidence match and optimization."
                  : undefined
              }
              onOpenOptimizer={
                analyzeResult && lastInputs && lastAnalysisUsedJd
                  ? (surface) => {
                      clearOptimizeNudgeReshowTimeout();
                      dismissedOptimizeNudgeTriggersRef.current.add(optimizeNudgeTriggerRef.current);
                      optimizeNudgeModalForTriggerRef.current = null;
                      setOptimizeDashboardNudgeOpen(false);
                      void logAnalysisEvent(
                        surface === "post_dashboard_nudge"
                          ? "optimize_dashboard_nudge_clicked"
                          : "optimize_after_analysis_clicked"
                      );
                      trackOptimizationClicked(surface);
                      closeOptimizeConversionModal();
                      void launchOptimizerFlow();
                    }
                  : undefined
              }
              resumeText={lastInputs?.resumeText ?? ""}
              jobDescription={lastJD ?? ""}
              analysisUsedJobDescription={lastAnalysisUsedJd}
              emptyStateVariant={isAtsCompliance ? "ats" : "jd"}
              panelVariant={isKeywordScanner ? "keywordScanner" : "default"}
            />
            </div>
            <CreditPackModal
              open={creditModalOpen}
              onDismiss={() => trackOptimizePromptDismissed("credit_pack")}
              onClose={() => {
                setCreditModalOpen(false);
              }}
              isLoggedIn={isLoggedIn}
              creditsRemaining={usage?.creditsRemaining ?? 0}
              onStartOptimization={onCreditModalStartOptimize}
              onRefreshBalance={refreshUsage}
              onStartGoogleAuthForPackage={handleStartGoogleAuthForPackage}
              isStartingGoogleAuth={isStartingGoogleAuth}
              isBusy={isLaunchingOptimize}
              funnelId={activeFunnelId ?? undefined}
            />
            <OptimizeConversionModal
              open={SHOW_AUTOMATIC_OPTIMIZER_PAYWALL_MODALS && optimizeConversionModalOpen}
              onDismiss={() => trackOptimizePromptDismissed("conversion_modal")}
              onClose={closeOptimizeConversionModal}
              onContinueManual={() => {
                void logAnalysisEvent("optimize_conversion_modal_continue_manual");
                closeOptimizeConversionModal();
              }}
              onPrimaryAction={() => void handleConversionPrimaryAction()}
              onFixResumeNow={() => void handleConversionFixResumeNow()}
              paymentSuccess={optimizeConversionPaymentSuccess}
              paymentReceipt={optimizeConversionPaymentReceipt}
              missingKeywordCount={
                analyzeResult ? countMissingKeywordsForConversion(analyzeResult) : 0
              }
              isLoggedIn={isLoggedIn}
              hasOptimizationCredits={(usage?.creditsRemaining ?? 0) > 0}
              isBusy={conversionModalBusy || isLaunchingOptimize}
              isStartingGoogleAuth={isStartingGoogleAuth}
              localError={conversionModalError}
            />
            <OptimizeOAuthResumeModal
              open={optimizeOauthResumeModalOpen}
              onDismiss={dismissOptimizeOAuthResumeModal}
              onStartOptimization={startOptimizationAfterOAuthReturn}
              isBusy={isLaunchingOptimize}
            />
            <OptimizeDashboardNudgeModal
              open={optimizeDashboardNudgeOpen}
              onDismiss={dismissOptimizeDashboardNudge}
              onOptimize={onOptimizeFromDashboardNudge}
              isLoggedIn={isLoggedIn}
              isBusy={isLaunchingOptimize}
              isStartingGoogleAuth={isStartingGoogleAuth}
            />
            {resume && (
              <div className="flex-1 min-h-0 flex flex-col">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <h2 className="text-sm font-semibold tracking-tight text-slate-500">
                    Preview
                  </h2>
                  <button
                    type="button"
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition disabled:opacity-60"
                  >
                    {isDownloading ? "Preparing PDF…" : "Download PDF"}
                  </button>
                </div>
                <div className="flex-1 min-h-0">
                  <ResumePreview resume={resume} />
                </div>
              </div>
            )}
          </div>
        </div>
        </div>
      </div>

      {isHome && !hidePostFormSections ? (
      <section className="border-t border-slate-200 bg-slate-50/60">
        <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
          <p className="text-sm text-slate-600 leading-snug">
            Need ATS format and parsing guidance?{" "}
            <Link
              href="/ats-resume-checker"
              className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
            >
              ATS resume checker
            </Link>
            . Need role-specific prep first? Browse{" "}
            <Link
              href="/resume-examples"
              className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
            >
              resume examples by role
            </Link>
            .
          </p>
        </div>
      </section>
      ) : null}

      <LimitModal
        open={limitModalOpen}
        onClose={() => {
          setLimitModalOpen(false);
          setLimitModalQuotaScope(null);
        }}
        message={limitModalMessage}
        quotaScope={limitModalQuotaScope}
        onSignInClick={limitModalQuotaScope === "anonymous" ? handleStartGoogleAuthForQuota : undefined}
        isSigningIn={isStartingGoogleAuth}
      />
    </Root>
  );
}

function EmailWaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || status === "submitting") return;
    setStatus("submitting");
    setMessage(null);
    try {
      const res = await fetch("/api/notify-optimization", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      if (!res.ok || (data && data.error)) {
        setStatus("error");
        setMessage(data?.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      setMessage("You’ll be the first to know when AI optimization is live.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 sm:items-center">
      <div className="flex-1">
        <label className="sr-only" htmlFor="waitlist-email">
          Email address
        </label>
        <input
          id="waitlist-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email to get notified"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-black/15"
        />
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="flex-none rounded-lg bg-slate-900 px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-slate-800 transition disabled:opacity-60"
      >
        {status === "submitting" ? "Adding…" : "Notify me when available"}
      </button>
      {message && (
        <p
          className={
            "text-xs mt-1 sm:mt-0 " +
            (status === "success" ? "text-emerald-700" : "text-red-700")
          }
        >
          {message}
        </p>
      )}
    </form>
  );
}
