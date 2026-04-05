"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ResumeForm, type GenerateInputs } from "@/app/components/ResumeForm";
import { ResumePreview } from "@/app/components/ResumePreview";
import { IntelligencePanel } from "@/app/components/IntelligencePanel";
import { LimitModal } from "@/app/components/LimitModal";
import { CreditPackModal } from "@/app/components/CreditPackModal";
import type { CreditPackageId } from "@/app/lib/billing/packages";
import {
  alignSupabaseOAuthAuthorizeUrl,
  buildAuthCallbackRedirectTo,
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
import { resolveProblemInterviewCallout } from "@/app/lib/problemInterviewCallout";
import { getSiteUrl } from "@/app/lib/siteUrl";
import { TOOL_CLUSTER_PATHS_FOR_OAUTH } from "@/app/lib/toolClusterPages";
import { useRef } from "react";

const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a good ATS resume score?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Most resumes that score above 75% ATS compatibility have strong keyword alignment with the job description and clearly labeled experience. Higher scores usually mean your skills and titles closely match what the role is asking for.",
      },
    },
    {
      "@type": "Question",
      name: "Can ATS reject my resume?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. If your resume is missing required skills, uses confusing formatting, or hides important keywords in images or graphics, it may never reach a recruiter. Passing ATS checks is the first step before a human can review your profile.",
      },
    },
    {
      "@type": "Question",
      name: "How can I improve my ATS score?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Mirror the language of the job description, add missing but relevant keywords, and use a clean structure with clear sections for experience, skills, and education. Tools like ResumeAtlas help you spot keyword gaps and alignment issues before you apply.",
      },
    },
  ],
} as const;

const homeSoftwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ResumeAtlas",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: getSiteUrl(),
  description:
    "AI-powered ATS resume checker that compares your resume with job descriptions and optimizes it for specific roles.",
  featureList: [
    "ATS resume checker",
    "Resume vs job description comparison",
    "AI resume optimization",
    "Keyword gap analysis",
    "Editable resume output",
  ],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
} as const;

/** Horizontal flow; copy reinforces ATS + JD keywords; paste-only (no file upload). */
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
    title: "Match your resume to any job instantly",
    body:
      "Identify missing keywords and skills recruiters are looking for, in seconds.",
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
  const headers: HeadersInit = {};
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
  const res = await fetch("/api/usage", { credentials: "include", headers });
  if (!res.ok) return FALLBACK_ANON_USAGE;
  try {
    const u = await res.json();
    return u && typeof u.type === "string" ? u : FALLBACK_ANON_USAGE;
  } catch {
    return FALLBACK_ANON_USAGE;
  }
}

async function fetchAnalysisQuota(
  accessToken: string | null
): Promise<AnalysisQuotaStatus | null> {
  const headers: HeadersInit = {};
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
  const res = await fetch("/api/analysis-quota", { credentials: "include", headers });
  if (!res.ok) return null;
  try {
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
};

function writePostOauthAnalyzerSnapshot(state: AnalyzerStoredState) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(POST_OAUTH_ANALYZER_KEY, JSON.stringify(state));
  } catch {
    // ignore quota / private mode
  }
}

export type HomeClientProps = {
  /** `toolOnly`: analyzer grid + modals only (for SEO landing pages with their own H1/copy). */
  variant?: "home" | "toolOnly";
  /**
   * `atsCompliance`: optional job description, resume-first ATS scan (distinct from JD matcher pages).
   * `keywordScanner`: keyword gaps + missing skills focus (required JD; simplified results panel).
   */
  analysisMode?: "jdMatch" | "atsCompliance" | "keywordScanner";
};

export default function HomeClient({
  variant = "home",
  analysisMode = "jdMatch",
}: HomeClientProps) {
  const isHome = variant === "home";
  const isAtsCompliance = analysisMode === "atsCompliance";
  const isKeywordScanner = analysisMode === "keywordScanner";
  const router = useRouter();
  const [usage, setUsage] = useState<Usage | null>(null);
  const [analysisQuota, setAnalysisQuota] = useState<AnalysisQuotaStatus | null>(null);
  const [limitModalOpen, setLimitModalOpen] = useState(false);
  const [limitModalMessage, setLimitModalMessage] = useState("");
  const [limitModalQuotaScope, setLimitModalQuotaScope] = useState<LimitModalQuotaScope>(null);
  const [creditModalOpen, setCreditModalOpen] = useState(false);
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
  const [lastInputs, setLastInputs] = useState<GenerateInputs | null>(null);
  /** Whether the last completed /api/analyze used a non-empty job description. */
  const [lastAnalysisUsedJd, setLastAnalysisUsedJd] = useState(true);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const openedOptimizerFromQueryRef = useRef(false);

  /** Supabase can send PKCE `code` to Site URL root (`/?code=`) instead of `/auth/callback`. */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const path = window.location.pathname.replace(/\/$/, "") || "/";
    const oauthPaths = new Set<string>(["/", ...TOOL_CLUSTER_PATHS_FOR_OAUTH]);
    if (!oauthPaths.has(path)) return;
    const sp = new URLSearchParams(window.location.search);
    if (!sp.get("code")) return;
    window.location.replace(`${window.location.origin}/auth/callback?${sp.toString()}`);
  }, []);

  /** Logged-in-only path sets this; if session disappears, avoid "optimizing" UI while logged out. */
  useEffect(() => {
    if (!isLoggedIn && isLaunchingOptimize) setIsLaunchingOptimize(false);
  }, [isLoggedIn, isLaunchingOptimize]);

  const refreshUsage = useCallback(async () => {
    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const token = session?.access_token ?? null;
    setIsLoggedIn(!!token);
    const [u, q] = await Promise.all([fetchUsage(token), fetchAnalysisQuota(token)]);
    setUsage(u);
    setAnalysisQuota(q);
  }, []);

  useEffect(() => {
    refreshUsage();
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.access_token);
      refreshUsage();
    });
    if (typeof window !== "undefined") {
      let sid = window.sessionStorage.getItem("session_id");
      if (!sid) {
        sid = crypto.randomUUID();
        window.sessionStorage.setItem("session_id", sid);
      }
      setSessionId(sid);

      const openOptimizerReturn =
        new URLSearchParams(window.location.search).get("openOptimizer") === "1";
      if (openOptimizerReturn) {
        try {
          const raw = window.sessionStorage.getItem(POST_OAUTH_ANALYZER_KEY);
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
    const open = new URLSearchParams(window.location.search).get("openOptimizer");
    if (open !== "1") return;
    if (!analyzeResult || !lastInputs) return;
    openedOptimizerFromQueryRef.current = true;
    setCreditModalOpen(true);
    // Clean the URL so refresh doesn't re-open the modal.
    router.replace("/");
  }, [analyzeResult, lastInputs, router]);

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

  const trackOptimizeAfterAnalysisClick = useCallback(() => {
    void logAnalysisEvent("optimize_after_analysis_clicked");
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "ats_optimize_after_analysis_clicked", {
        event_category: "engagement",
        event_label: "Optimize resume clicked after analysis",
      });
    }
  }, [logAnalysisEvent]);

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
      void logAnalysisEvent("analyze_clicked");
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "ats_analyze_started", {
          event_category: "engagement",
          event_label: "Get ATS score free",
        });
      }
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
          setAnalysisQuota({
            allowed: result.quota.remaining > 0,
            remaining: result.quota.remaining,
            used: result.quota.used ?? 0,
            limit: result.quota.limit ?? 0,
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
        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("event", "ats_dashboard_generated", {
            event_category: "engagement",
            event_label: "ATS dashboard result generated",
          });
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong");
      } finally {
        setIsGenerating(false);
      }
    },
    [logAnalysisEvent, getAuthHeaders]
  );

  const handleStartGoogleAuthForQuota = useCallback(async () => {
    const supabase = createClient();
    setIsStartingGoogleAuth(true);
    setError(null);
    try {
      const redirectTo = buildAuthCallbackRedirectTo("/");
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
      setError(e instanceof Error ? e.message : "Sign-in failed");
      setIsStartingGoogleAuth(false);
    }
  }, []);

  const launchOptimizerFlow = useCallback(async () => {
    if (!lastInputs || !analyzeResult) return;
    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.access_token) {
      setCreditModalOpen(true);
      return;
    }
    setError(null);
    setIsLaunchingOptimize(true);
    try {
      const resumeText = lastInputs.resumeText;
      const jobDescription = lastJD ?? lastInputs.jobDescription;
      let parsedResume: unknown = null;
      if (typeof window !== "undefined") {
        try {
          const res = await fetch("/api/parse-resume", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ resumeText: lastInputs.resumeText }),
          });
          if (res.ok) {
            const data = (await res.json()) as { resume?: unknown };
            if (data && typeof data === "object" && "resume" in data) {
              parsedResume = data.resume;
            }
          }
        } catch {
          // best-effort; fall back to raw text only
        }
      }
      if (typeof window !== "undefined") {
        try {
          const payload = JSON.stringify({
            resumeText,
            jobDescription,
            analyzeResult,
            parsedResume,
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
  }, [lastInputs, analyzeResult, lastJD, router, refreshUsage]);

  const onCreditModalStartOptimize = useCallback(() => {
    return launchOptimizerFlow();
  }, [launchOptimizerFlow]);

  const handleStartGoogleAuthForPackage = useCallback(
    async (packageId: CreditPackageId) => {
      void packageId;
      if (!lastInputs || !analyzeResult) return;
      const supabase = createClient();
      setIsStartingGoogleAuth(true);
      setError(null);
      try {
        if (typeof window !== "undefined") {
          writePostOauthAnalyzerSnapshot({
            lastInputs,
            lastJD: lastJD ?? lastInputs.jobDescription,
            lastRoleLevel,
            analyzeResult,
            savedAt: Date.now(),
          });
        }
        const redirectTo = buildAuthCallbackRedirectTo("/?openOptimizer=1");
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
        setError(e instanceof Error ? e.message : "Sign-in failed");
        setIsStartingGoogleAuth(false);
      }
    },
    [lastInputs, lastJD, lastRoleLevel, analyzeResult]
  );

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

  const homeProblemCallout = resolveProblemInterviewCallout("/");

  const Root = isHome ? "main" : "div";
  const rootClassName = isHome ? "min-h-screen flex flex-col bg-white" : "flex flex-col bg-white";

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
        {isHome ? (
        <header className="text-center mt-0 sm:mt-0 mb-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.2]">
            Free ATS Resume Checker, Get Your ATS Score &amp; Match Your Resume to Any Job Description
          </h1>

          <p className="mt-2 sm:mt-2.5 text-sm sm:text-base text-slate-600 max-w-3xl mx-auto px-2 leading-snug">
            Analyze your resume vs job description, find missing keywords, fix weak bullets, and optimize instantly with AI while keeping your experience intact.
          </p>

          <div className="mt-4 sm:mt-5 mb-4 sm:mb-5 mx-auto w-full max-w-lg px-2 sm:px-0">
            <div className="rounded-xl bg-slate-50 p-4 sm:p-5 text-center">
              <a
                href="#ats-checker-form"
                className="inline-flex w-full sm:w-auto min-w-[min(100%,16rem)] items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-slate-800 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:px-8 sm:py-3 sm:text-base"
              >
                Check My Resume for This Job (Free)
              </a>
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
              className="text-center text-lg sm:text-xl font-semibold tracking-tight text-slate-900"
            >
              What you can do with ResumeAtlas
            </h2>
            <ul className="mt-3 m-0 grid list-none grid-cols-1 gap-2.5 p-0 sm:grid-cols-2 lg:grid-cols-4 sm:gap-3">
              {HOME_CAPABILITY_CARDS.map((card) => (
                <li
                  key={card.title}
                  className="rounded-lg bg-white p-3 text-left shadow-sm ring-1 ring-slate-900/[0.05] sm:p-3.5"
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
                  Instantly transform your resume into a job-specific, ATS-optimized version that
                  increases your chances of getting shortlisted.
                </p>
              </div>

              <motion.ol
                className="m-0 mt-4 sm:mt-5 flex list-none flex-row flex-wrap items-center justify-center gap-y-4 p-0"
                variants={howFlowContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "0px 0px -40px 0px" }}
              >
                {HOW_IT_WORKS_STEPS.map((step, i) => (
                  <motion.li
                    key={step.key}
                    variants={howFlowItem}
                    className="flex items-center"
                  >
                    <div className="flex w-[8.75rem] flex-col items-center text-center sm:w-[9.5rem] md:w-[10rem]">
                      <span
                        className="text-3xl leading-none sm:text-4xl"
                        aria-hidden="true"
                      >
                        {step.emoji}
                      </span>
                      <h3 className="mt-1.5 text-xs font-semibold tracking-tight text-slate-900 sm:mt-2 sm:text-sm">
                        {step.title}
                      </h3>
                      <p className="mt-0.5 text-[11px] leading-snug text-slate-600 sm:text-xs sm:leading-snug">
                        {step.line}
                      </p>
                    </div>
                    {i < HOW_IT_WORKS_STEPS.length - 1 ? (
                      <div
                        className="flex shrink-0 items-center justify-center self-stretch px-1 sm:px-1.5 md:px-2"
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 flex-1 min-h-0">
          <div className="lg:col-span-1" id="ats-checker-form">
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
              />
            )}
          </div>
          <div className="lg:col-span-2 flex flex-col gap-4 min-h-0">
            <IntelligencePanel
              analyzeResult={analyzeResult}
              showFullIntelligence={usage?.showFullIntelligence ?? false}
              showLocked={false}
              onOpenOptimizer={
                analyzeResult && lastInputs && lastAnalysisUsedJd
                  ? () => {
                      void trackOptimizeAfterAnalysisClick();
                      setCreditModalOpen(true);
                    }
                  : undefined
              }
              resumeText={lastInputs?.resumeText ?? ""}
              jobDescription={lastJD ?? ""}
              analysisUsedJobDescription={lastAnalysisUsedJd}
              emptyStateVariant={isAtsCompliance ? "ats" : "jd"}
              panelVariant={isKeywordScanner ? "keywordScanner" : "default"}
            />
            <CreditPackModal
              open={creditModalOpen}
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

      {isHome ? (
      <>
      <section id="how-ats-works" className="border-t border-slate-200 bg-slate-50/60">
        <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900">
            How ATS Systems Scan Resumes
          </h2>
          <p className="mt-2 text-sm text-slate-600 leading-snug">
            Applicant Tracking Systems (ATS) help recruiters sort and rank large volumes of
            applications. Understanding how they scan your resume makes it easier to pass initial
            filters and get seen by a human.
          </p>
          <div className="mt-4 space-y-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                1. Keyword Matching
              </h3>
              <p className="mt-0.5 text-sm text-slate-600 leading-snug">
                ATS platforms compare the keywords in your resume with the job description. If
                critical skills like Python, Machine Learning, or AWS are missing or buried in long
                paragraphs, your resume can be filtered out or ranked lower for that role.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                2. Resume Parsing
              </h3>
              <p className="mt-0.5 text-sm text-slate-600 leading-snug">
                Most ATS tools convert your resume into structured fields such as experience,
                education, and skills. Overly complex templates, columns, or heavy graphics can
                break parsing and cause important information to be missed.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                3. Experience Alignment
              </h3>
              <p className="mt-0.5 text-sm text-slate-600 leading-snug">
                Recruiters often filter by years of experience, seniority, and job titles. If your
                roles and impact are not clearly labeled or aligned to the target job, the ATS may
                not recognize you as a strong match even if you have the right background.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">4. ATS Filtering</h3>
              <p className="mt-0.5 text-sm text-slate-600 leading-snug">
                Some ATS systems score and rank candidates based on keyword match, relevance, and
                experience alignment. Clear language, focused keywords, and clean structure help
                your resume surface higher when recruiters review results.
              </p>
            </div>
          </div>

          <div className="mt-5 border-t border-slate-200 pt-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Learn more
            </p>
            <ul className="mt-2 space-y-0.5 text-sm text-slate-700 list-disc pl-5">
              <li>
                <Link
                  href="/how-to-pass-ats#how-ats-scans-resumes"
                  className="inline-flex items-center gap-1 text-sky-700 underline underline-offset-2 hover:text-sky-900"
                >
                  <span>↗</span>
                  How ATS Systems Scan Resumes
                </Link>
              </li>
              <li>
                <Link
                  href="/how-to-pass-ats#common-resume-mistakes-fail-ats"
                  className="inline-flex items-center gap-1 text-sky-700 underline underline-offset-2 hover:text-sky-900"
                >
                  <span>↗</span>
                  Common Resume Mistakes That Fail ATS
                </Link>
              </li>
              <li>
                <Link
                  href="/data-scientist-resume-keywords"
                  className="inline-flex items-center gap-1 text-sky-700 underline underline-offset-2 hover:text-sky-900"
                >
                  <span>↗</span>
                  ATS Keywords for Data Scientist Resumes
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900">
            Why ATS Rejects Many Resumes
          </h2>
          <p className="mt-2 text-sm text-slate-600 leading-snug">
            Many resumes fail ATS screening before a recruiter ever reads them. Common reasons
            include missing job keywords, incompatible formatting, lack of measurable
            achievements, and poor alignment with the job description. ATS systems prioritize
            resumes that clearly match the required skills and experience listed in the job
            posting.
          </p>
          <ul className="mt-3 space-y-1 text-sm text-slate-700 list-disc pl-5">
            <li>Missing required keywords</li>
            <li>Poor formatting (tables, graphics)</li>
            <li>Generic job descriptions</li>
            <li>Lack of measurable achievements</li>
          </ul>
        </div>
      </section>

      <section id="faq" className="border-t border-slate-200 bg-white">
        <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900">
            Frequently Asked Questions
          </h2>
          <div className="mt-4 space-y-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                What is a good ATS resume score?
              </h3>
              <p className="mt-0.5 text-sm text-slate-600 leading-snug">
                Most resumes that score above 75% ATS compatibility have strong keyword alignment
                with the job description and clearly labeled experience. Higher scores usually mean
                your skills, tools, and titles closely match what the role is asking for.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Can ATS reject my resume?
              </h3>
              <p className="mt-0.5 text-sm text-slate-600 leading-snug">
                Yes. If your resume is missing required skills, uses confusing formatting, or hides
                important keywords in images or graphics, it may never reach a recruiter. Passing
                ATS checks is the first step before a human can review your profile.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                How can I improve my ATS score?
              </h3>
              <p className="mt-0.5 text-sm text-slate-600 leading-snug">
                Start by mirroring the language of the job description, adding missing but relevant
                keywords, and structuring your resume with clear sections for experience, skills,
                and education. Tools like ResumeAtlas help you spot keyword gaps and alignment
                issues before you apply.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="border-t border-slate-200 bg-slate-50/60"
        aria-labelledby="home-resource-links"
      >
        <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <h2 id="home-resource-links" className="sr-only">
            Resources and guides
          </h2>
          {homeProblemCallout ? (
            <p className="mb-6 max-w-3xl text-center text-sm text-slate-700 sm:text-left leading-snug">
              {homeProblemCallout.prefix}
              <Link
                href={homeProblemCallout.href}
                className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                {homeProblemCallout.linkText}
              </Link>
            </p>
          ) : null}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Browse by role</h3>
              <p className="text-sm text-slate-500 mt-1 leading-snug">
                Examples, keyword lists, and writing guides—each index groups everything by role.
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link href="/resume-examples" className="text-sky-700 font-medium hover:underline">
                    Resume examples
                  </Link>
                  <span className="text-slate-600"> — browse by role</span>
                </li>
                <li>
                  <Link href="/ats-keywords" className="text-sky-700 font-medium hover:underline">
                    ATS keyword guides
                  </Link>
                  <span className="text-slate-600"> — skills and terms by role</span>
                </li>
                <li>
                  <Link href="/resume-guides" className="text-sky-700 font-medium hover:underline">
                    Resume writing guides
                  </Link>
                  <span className="text-slate-600"> — sections, formatting, examples</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">ATS help &amp; common issues</h3>
              <p className="text-sm text-slate-500 mt-1 leading-snug">
                How screening works and what to fix when applications stall.
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link href="/how-to-pass-ats" className="text-sky-700 hover:underline">
                    How to pass ATS screening
                  </Link>
                </li>
                <li>
                  <Link href="/how-to-pass-ats#how-ats-scans-resumes" className="text-sky-700 hover:underline">
                    How ATS scans resumes
                  </Link>
                </li>
                <li>
                  <Link href="/problems/ats-rejecting-my-resume" className="text-sky-700 hover:underline">
                    Why ATS may reject your resume
                  </Link>
                </li>
                <li>
                  <Link href="/problems/resume-not-getting-interviews" className="text-sky-700 hover:underline">
                    Resume not getting interviews
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      </>
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
      {isHome ? (
        <>
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(homeSoftwareApplicationSchema),
            }}
          />
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }}
          />
        </>
      ) : null}
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
