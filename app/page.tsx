"use client";

import { useState, useCallback, useEffect } from "react";
import { ResumeForm, type GenerateInputs, ROLE_LEVELS } from "@/app/components/ResumeForm";
import { ResumePreview } from "@/app/components/ResumePreview";
import { IntelligencePanel } from "@/app/components/IntelligencePanel";
import { UsageBadge } from "@/app/components/UsageBadge";
import { LimitModal } from "@/app/components/LimitModal";
import { UpgradeScreen } from "@/app/components/UpgradeScreen";
import { createClient } from "@/app/lib/supabase/client";
import type { Resume } from "@/app/types/resume";
import type { Usage } from "@/app/lib/usage";
import { computeJDMatch, type JDMatchResult } from "@/app/lib/jdMatch";
import { detectEvidenceGaps } from "@/app/lib/evidenceGap";
import { scanATS, type ATSScanResult } from "@/app/lib/atsScan";
import type { JDAnalysisResult } from "@/app/lib/jdAnalysis";
import type { ATSAnalysisResult } from "@/app/lib/atsEngine";

const FALLBACK_ANON_USAGE: Usage = {
  type: "anon",
  generationCredits: 0,
  downloadCredits: 0,
  freePreviewUsed: false,
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

export default function Home() {
  const [usage, setUsage] = useState<Usage | null>(null);
  const [limitModalOpen, setLimitModalOpen] = useState(false);
  const [limitModalMessage, setLimitModalMessage] = useState("");
  const [resume, setResume] = useState<Resume | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastJD, setLastJD] = useState<string | null>(null);
  const [lastRoleLevel, setLastRoleLevel] = useState<string>("Mid");
  const [jdMatchResult, setJdMatchResult] = useState<JDMatchResult | null>(null);
  const [jdAnalysis, setJdAnalysis] = useState<JDAnalysisResult | null>(null);
  const [evidenceGaps, setEvidenceGaps] = useState<string[]>([]);
  const [atsResult, setAtsResult] = useState<ATSScanResult | null>(null);
  const [engineResult, setEngineResult] = useState<ATSAnalysisResult | null>(null);
  const [isReoptimizingSummary, setIsReoptimizingSummary] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [lastInputs, setLastInputs] = useState<GenerateInputs | null>(null);
  const [optCountry, setOptCountry] = useState<"USA" | "Canada" | "UK">("USA");
  const [optRoleLevel, setOptRoleLevel] = useState<string>("Mid");
  const [sessionId, setSessionId] = useState<string | null>(null);

  const refreshUsage = useCallback(async () => {
    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const token = session?.access_token ?? null;
    setIsLoggedIn(!!token);
    const u = await fetchUsage(token);
    setUsage(u);
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
    }

    return () => subscription.unsubscribe();
  }, [refreshUsage]);

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
        await supabase.from("analysis_events").insert({
          session_id: sid,
          event_type: eventType,
        });
      } catch {
        // Tracking is best-effort; ignore errors in UI.
      }
    },
    [sessionId]
  );

  const runAnalytics = useCallback(
    async (resumeData: Resume, jobDescription: string, showFullIntelligence: boolean) => {
      setJdMatchResult(computeJDMatch(jobDescription, resumeData));
      setAtsResult(scanATS(resumeData));
      if (!showFullIntelligence) {
        setJdAnalysis(null);
        setEvidenceGaps([]);
        return;
      }
      try {
        const res = await fetch("/api/analyze-jd", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jobDescription }),
        });
        const raw = (await res.json()) as JDAnalysisResult | { error?: string };
        if (res.ok && raw && !("error" in raw)) {
          const analysis = raw as JDAnalysisResult;
          setJdAnalysis(analysis);
          setEvidenceGaps(detectEvidenceGaps(analysis, resumeData));
        } else {
          setEvidenceGaps([]);
        }
      } catch {
        setEvidenceGaps([]);
      }
    },
    []
  );

  const getAuthHeaders = useCallback(async () => {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    const h: HeadersInit = { "Content-Type": "application/json" };
    if (session?.access_token) h["Authorization"] = `Bearer ${session.access_token}`;
    return h;
  }, []);

  const handleGenerate = useCallback(
    async (inputs: GenerateInputs) => {
      // Start Analysis – analysis only, no optimization or login required
      setError(null);
      setIsGenerating(true);
      setJdMatchResult(null);
      setJdAnalysis(null);
      setEvidenceGaps([]);
      setAtsResult(null);
      setEngineResult(null);
      const country = inputs.country || "USA";
      const roleLevel = inputs.roleLevel || "Mid";
      const normalizedInputs: GenerateInputs = {
        resumeText: inputs.resumeText,
        jobDescription: inputs.jobDescription,
        country,
        roleLevel,
      };
      setLastInputs(normalizedInputs);
      setLastJD(inputs.jobDescription);
      setLastRoleLevel(roleLevel);
      setOptCountry(country);
      setOptRoleLevel(roleLevel);
      void logAnalysisEvent("analyze_clicked");
      try {
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            resumeText: inputs.resumeText,
            jobDescription: inputs.jobDescription,
            country,
            roleLevel,
          }),
        });
        let data: { error?: string } | ATSAnalysisResult;
        try {
          data = (await res.json()) as typeof data;
        } catch {
          const text = await res.text();
          setError(
            res.ok ? "Invalid response from server" : text || `Request failed (${res.status})`
          );
          return;
        }
        if (!res.ok) {
          const err =
            typeof (data as { error?: string }).error === "string"
              ? (data as { error: string }).error
              : "Analysis failed";
          setError(err);
          return;
        }
        const body = data as ATSAnalysisResult;
        setEngineResult(body);
        void logAnalysisEvent("dashboard_generated");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong");
      } finally {
        setIsGenerating(false);
      }
    },
    [logAnalysisEvent]
  );

  const handleOptimize = useCallback(
    async () => {
      if (!lastInputs) return;
      if (!isLoggedIn) {
        if (typeof window !== "undefined") {
          window.location.href = "/upgrade";
        }
        return;
      }
      setError(null);
      setIsGenerating(true);
      try {
        const headers = await getAuthHeaders();
        const res = await fetch("/api/generate", {
          method: "POST",
          credentials: "include",
          headers,
          body: JSON.stringify({
            resumeText: lastInputs.resumeText,
            jobDescription: lastInputs.jobDescription,
            country: optCountry,
            roleLevel: optRoleLevel || "Mid",
          }),
        });
        let data: { error?: string; code?: string } | Resume;
        try {
          data = (await res.json()) as typeof data;
        } catch {
          const text = await res.text();
          setError(
            res.ok ? "Invalid response from server" : text || `Request failed (${res.status})`
          );
          return;
        }
        if (!res.ok) {
          const err =
            typeof (data as { error?: string }).error === "string"
              ? (data as { error: string; code?: string }).error
              : "Generation failed";
          const code = (data as { code?: string }).code;
          setError(err);
          if (res.status === 403 && (code === "LIMIT_REACHED" || code === "UPGRADE_REQUIRED")) {
            setLimitModalMessage((data as { error?: string }).error ?? err);
            setLimitModalOpen(true);
          }
          return;
        }
        const resumeData = data as Resume;
        setResume(resumeData);
        setLastJD(lastInputs.jobDescription);
        setLastRoleLevel(optRoleLevel || "Mid");
        await runAnalytics(
          resumeData,
          lastInputs.jobDescription,
          usage?.showFullIntelligence ?? true
        );
        await refreshUsage();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong");
      } finally {
        setIsGenerating(false);
      }
    },
    [getAuthHeaders, lastInputs, isLoggedIn, refreshUsage, runAnalytics, usage?.showFullIntelligence]
  );

  const handleResumeChange = useCallback((next: Resume) => {
    setResume(next);
    if (lastJD && next) {
      setJdMatchResult(computeJDMatch(lastJD, next));
      setAtsResult(scanATS(next));
      if (jdAnalysis) setEvidenceGaps(detectEvidenceGaps(jdAnalysis, next));
    }
  }, [lastJD, jdAnalysis]);

  const handleReoptimizeSummary = useCallback(async () => {
    if (!resume?.basics?.summary || !lastJD) return;
    setIsReoptimizingSummary(true);
    try {
      const headers = await getAuthHeaders();
      const res = await fetch("/api/reoptimize-summary", {
        method: "POST",
        credentials: "include",
        headers,
        body: JSON.stringify({
          summary: resume.basics.summary,
          jobDescription: lastJD,
          roleLevel: lastRoleLevel,
        }),
      });
      const data = (await res.json()) as { summary?: string; error?: string; code?: string };
      if (res.ok && typeof data.summary === "string") {
        setResume({
          ...resume,
          basics: { ...resume.basics, summary: data.summary },
        });
        await refreshUsage();
      } else if (!res.ok && data.error) {
        setError(data.error);
      }
    } finally {
      setIsReoptimizingSummary(false);
    }
  }, [resume, lastJD, lastRoleLevel, getAuthHeaders, refreshUsage]);

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
        if (res.status === 403 || res.status === 401) {
          setLimitModalMessage(
            data?.error || "Download requires credits. Unlock 25 Resume Credits for $19 (one-time)."
          );
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

  const showUpgradeScreen = false;
  const showForm = true;

  const showPreviewBanner =
    isLoggedIn &&
    usage?.freePreviewUsed &&
    (usage?.downloadCredits ?? 0) === 0 &&
    !!resume;

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-8 flex flex-col gap-8">
        <header className="text-center mt-0 sm:mt-0 mb-8 sm:mb-10">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Free ATS Resume Checker, JD Match &amp; Gap Analysis
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              AI-powered resume intelligence for real ATS systems.
            </p>
            <UsageBadge usage={usage} />
          </div>
          <p className="mt-3 text-xs sm:text-sm font-semibold text-emerald-700">
            100% free and unlimited. No login required. ATS-style resume checker and JD gap analyzer, not just keyword matching.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto text-left">
            <div className="flex items-start gap-2 rounded-xl border border-slate-200 bg-white/60 px-3 py-2">
              <span className="mt-0.5 h-2 w-2 rounded-full bg-emerald-500" />
              <p className="text-xs text-slate-600">
                <span className="font-semibold text-slate-800">Used by 2,000+ job seekers</span>{" "}
                preparing for competitive roles.
              </p>
            </div>
            <div className="flex items-start gap-2 rounded-xl border border-slate-200 bg-white/60 px-3 py-2">
              <span className="mt-0.5 h-2 w-2 rounded-full bg-emerald-500" />
              <p className="text-xs text-slate-600">
                <span className="font-semibold text-slate-800">Optimized for real ATS systems</span>{" "}
                and recruiter-style screening.
              </p>
            </div>
            <div className="flex items-start gap-2 rounded-xl border border-slate-200 bg-white/60 px-3 py-2">
              <span className="mt-0.5 h-2 w-2 rounded-full bg-emerald-500" />
              <p className="text-xs text-slate-600">
                <span className="font-semibold text-slate-800">Built for FAANG, Fortune 500 & startups</span>{" "}
                across US, UK, and Canada.
              </p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 min-h-0">
          <div className="lg:col-span-1">
            {showUpgradeScreen && <UpgradeScreen />}
            {showForm && (
              <ResumeForm
                resume={resume}
                onResumeChange={handleResumeChange}
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
                error={error}
                lastJD={lastJD}
                lastRoleLevel={lastRoleLevel}
                onReoptimizeSummary={handleReoptimizeSummary}
                isReoptimizingSummary={isReoptimizingSummary}
                isLoggedIn={isLoggedIn}
              />
            )}
          </div>
          <div className="lg:col-span-2 flex flex-col gap-6 min-h-0">
            <IntelligencePanel
              engineResult={engineResult}
              showFullIntelligence={usage?.showFullIntelligence ?? false}
              showLocked={false}
            />
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-semibold">
                  🚀
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Coming soon
                  </p>
                  <h3 className="text-sm sm:text-base font-semibold tracking-tight text-slate-900">
                    AI resume optimization for this exact job
                  </h3>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600">
                You will soon be able to auto‑rewrite your resume for this role, boost your Resume ATS
                score, and download a tailored version in one click.
              </p>
              <p className="text-xs sm:text-sm font-semibold text-emerald-700">
                Get your ATS score above 85%.
              </p>
              <EmailWaitlistForm />
            </section>
            {lastInputs && (jdMatchResult || atsResult || evidenceGaps.length > 0) && (
              <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 space-y-4">
                <h3 className="text-sm font-semibold tracking-tight text-slate-900">
                  Step 2: Configure role & country to optimize your resume
                </h3>
                <div className="flex flex-col md:flex-row md:items-end gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-semibold tracking-tight text-slate-700 mb-1">
                      Country
                    </label>
                    <select
                      value={optCountry}
                      onChange={(e) =>
                        setOptCountry((e.target.value as "USA" | "Canada" | "UK") || "USA")
                      }
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-black/20 transition"
                    >
                      <option value="USA">USA</option>
                      <option value="Canada">Canada</option>
                      <option value="UK">UK</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-semibold tracking-tight text-slate-700 mb-1">
                      Role level
                    </label>
                    <select
                      value={optRoleLevel}
                      onChange={(e) => setOptRoleLevel(e.target.value || "Mid")}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-black/20 transition"
                    >
                      {ROLE_LEVELS.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-none">
                    {isLoggedIn && (
                      <button
                        type="button"
                        onClick={handleOptimize}
                        disabled={isGenerating}
                        className="w-full md:w-auto rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition disabled:opacity-60"
                      >
                        Improve resume & generate optimized version
                      </button>
                    )}
                  </div>
                </div>
              </section>
            )}
            {resume && (
              <div className="flex-1 min-h-0 flex flex-col">
                <div className="mb-3 flex items-center justify-between gap-3">
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
                {showPreviewBanner && (
                    <div className="mb-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-xs text-amber-800">
                      Preview mode: Download requires credits.
                    </div>
                )}
                <div className="flex-1 min-h-0">
                  <ResumePreview resume={resume} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <LimitModal
        open={limitModalOpen}
        onClose={() => setLimitModalOpen(false)}
        message={limitModalMessage}
      />
    </main>
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
