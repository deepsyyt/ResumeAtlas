"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import { ResumeForm, type GenerateInputs, ROLE_LEVELS } from "@/app/components/ResumeForm";
import { ResumePreview } from "@/app/components/ResumePreview";
import { IntelligencePanel } from "@/app/components/IntelligencePanel";
import { LimitModal } from "@/app/components/LimitModal";
import { ResumeOptimizerModal } from "@/app/components/ResumeOptimizerModal";
import { UpgradeScreen } from "@/app/components/UpgradeScreen";
import { createClient } from "@/app/lib/supabase/client";
import type { Resume } from "@/app/types/resume";
import type { Usage } from "@/app/lib/usage";
import { computeJDMatch, type JDMatchResult } from "@/app/lib/jdMatch";
import { detectEvidenceGaps } from "@/app/lib/evidenceGap";
import { scanATS, type ATSScanResult } from "@/app/lib/atsScan";
import type { JDAnalysisResult } from "@/app/lib/jdAnalysis";
import type { ATSAnalyzeResult } from "@/app/lib/atsAnalyze";
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

const OPTIMIZE_INPUT_KEY = "resumeatlas_optimize_input";
const ANALYZER_STATE_KEY = "resumeatlas_analyzer_state_v1";

type AnalyzerStoredState = {
  lastInputs: GenerateInputs;
  lastJD: string;
  lastRoleLevel: string;
  analyzeResult: ATSAnalyzeResult;
  savedAt: number;
};

export default function Home() {
  const router = useRouter();
  const [usage, setUsage] = useState<Usage | null>(null);
  const [limitModalOpen, setLimitModalOpen] = useState(false);
  const [limitModalMessage, setLimitModalMessage] = useState("");
  const [optimizerModalOpen, setOptimizerModalOpen] = useState(false);
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
  const [isReoptimizingSummary, setIsReoptimizingSummary] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isLaunchingOptimize, setIsLaunchingOptimize] = useState(false);
  const [lastInputs, setLastInputs] = useState<GenerateInputs | null>(null);
  const [optCountry, setOptCountry] = useState<"USA" | "Canada" | "UK">("USA");
  const [optRoleLevel, setOptRoleLevel] = useState<string>("Mid");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const openedOptimizerFromQueryRef = useRef(false);

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
          if (li?.resumeText && li?.jobDescription && ajd && ar?.ats_score !== undefined) {
            setLastInputs(li);
            setLastJD(ajd);
            if (arl) setLastRoleLevel(arl);
            setAnalyzeResult(ar);
          }
        }
      } catch {
        // ignore restore failures
      }
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
    setOptimizerModalOpen(true);
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
      setError(null);
      setIsGenerating(true);
      setJdMatchResult(null);
      setJdAnalysis(null);
      setEvidenceGaps([]);
      setAtsResult(null);
      setAnalyzeResult(null);
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
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "ats_analyze_started", {
          event_category: "engagement",
          event_label: "Get ATS score free",
        });
      }
      try {
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            resumeText: inputs.resumeText,
            jobDescription: inputs.jobDescription,
          }),
        });
        const data = (await res.json()) as ATSAnalyzeResult | { error?: string };
        if (!res.ok) {
          setError(
            typeof (data as { error?: string }).error === "string"
              ? (data as { error: string }).error
              : "Analysis failed"
          );
          return;
        }
        setAnalyzeResult(data as ATSAnalyzeResult);
        if (typeof window !== "undefined") {
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
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col gap-8">
        <header className="text-center mt-0 sm:mt-0 mb-0">
          <div className="flex flex-col items-center gap-1.5">
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Free ATS Resume Checker, JD Match &amp; Gap Analysis
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              See your ATS score, find missing keywords, and fix your resume so it passes. Compare with any job description and fix gaps in one click.
            </p>
          </div>
          <p className="mt-2 text-xs sm:text-sm font-semibold text-emerald-700">
            Score is 100% free. See what&apos;s wrong, then fix your resume with AI when you&apos;re ready.
          </p>
          <div className="mt-3 flex justify-center">
            <a
              href="#ats-checker-form"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-2.5 text-sm sm:text-base font-semibold text-white shadow-sm hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900 focus-visible:ring-offset-white transition"
            >
              Get My ATS Score Free
            </a>
          </div>
          <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-3 gap-1.5 max-w-3xl mx-auto text-left">
            <div className="flex items-start gap-1.5 rounded-xl border border-slate-200 bg-white/60 px-2.5 py-1">
              <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <p className="text-[11px] leading-snug text-slate-600">
                <span className="font-semibold text-slate-800">Used by 2,000+ job seekers</span>{" "}
                preparing for competitive roles.
              </p>
            </div>
            <div className="flex items-start gap-1.5 rounded-xl border border-slate-200 bg-white/60 px-2.5 py-1">
              <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <p className="text-[11px] leading-snug text-slate-600">
                <span className="font-semibold text-slate-800">Optimized for real ATS systems</span>{" "}
                and recruiter-style screening.
              </p>
            </div>
            <div className="flex items-start gap-1.5 rounded-xl border border-slate-200 bg-white/60 px-2.5 py-1">
              <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <p className="text-[11px] leading-snug text-slate-600">
                <span className="font-semibold text-slate-800">Built for FAANG, Fortune 500 & startups</span>{" "}
                across US, UK, and Canada.
              </p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-1.5 items-start">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Resume Examples
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              See ATS-friendly resume examples for top roles.
            </p>
            <ul className="mt-1 space-y-1 text-sm">
              <li>
                <Link href="/data-scientist-resume-example" className="text-sky-700 hover:underline">
                  Data Scientist
                </Link>
              </li>
              <li>
                <Link href="/software-engineer-resume-example" className="text-sky-700 hover:underline">
                  Software Engineer
                </Link>
              </li>
              <li>
                <Link href="/product-manager-resume-example" className="text-sky-700 hover:underline">
                  Product Manager
                </Link>
              </li>
            </ul>
            <a
              href="/resume-examples"
              className="inline-block mt-0.5 text-sm font-medium text-sky-700 hover:underline"
            >
              View all resume examples →
            </a>
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-900">
              ATS Keyword Guides
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Learn which skills, tools, and concepts ATS expect to see.
            </p>
            <ul className="mt-1 space-y-1 text-sm">
              <li>
                <Link href="/ats-keywords/data-scientist" className="text-sky-700 hover:underline">
                  Data Scientist
                </Link>
              </li>
              <li>
                <Link href="/ats-keywords/software-engineer" className="text-sky-700 hover:underline">
                  Software Engineer
                </Link>
              </li>
              <li>
                <Link href="/ats-keywords/product-manager" className="text-sky-700 hover:underline">
                  Product Manager
                </Link>
              </li>
            </ul>
            <a
              href="/ats-keywords"
              className="inline-block mt-0.5 text-sm font-medium text-sky-700 hover:underline"
            >
              View all ATS keyword guides →
            </a>
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Resume Guides
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Learn how to write each section in an ATS-friendly way.
            </p>
            <ul className="mt-1 space-y-1 text-sm">
              <li>
                <Link href="/resume-guides/resume-skills-examples" className="text-sky-700 hover:underline">
                  Resume Skills Examples
                </Link>
              </li>
              <li>
                <Link href="/resume-guides/resume-summary-examples" className="text-sky-700 hover:underline">
                  Resume Summary Examples
                </Link>
              </li>
              <li>
                <Link
                  href="/resume-guides/resume-work-experience-examples"
                  className="text-sky-700 hover:underline"
                >
                  Resume Work Experience Examples
                </Link>
              </li>
            </ul>
            <a
              href="/resume-guides"
              className="inline-block mt-0.5 text-sm font-medium text-sky-700 hover:underline"
            >
              View all resume guides →
            </a>
          </div>
        </div>

        <div className="mt-0.5 border-t border-slate-200 pt-1">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 min-h-0">
          <div className="lg:col-span-1" id="ats-checker-form">
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
              analyzeResult={analyzeResult}
              showFullIntelligence={usage?.showFullIntelligence ?? false}
              showLocked={false}
              onOpenOptimizer={
                analyzeResult && lastInputs
                  ? () => setOptimizerModalOpen(true)
                  : undefined
              }
              resumeText={lastInputs?.resumeText ?? ""}
              jobDescription={lastJD ?? ""}
            />
            <ResumeOptimizerModal
              open={optimizerModalOpen}
              onClose={() => setOptimizerModalOpen(false)}
              resumeText={lastInputs?.resumeText ?? ""}
              jobDescription={lastJD ?? ""}
              atsScore={analyzeResult?.ats_score ?? 0}
              missingSkills={analyzeResult?.missing_skills ?? []}
              keywordCoverage={analyzeResult?.keyword_coverage ?? 0}
              isLoggedIn={isLoggedIn}
              isOptimizing={isLaunchingOptimize}
              onOptimize={async () => {
                if (!lastInputs || !analyzeResult || isLaunchingOptimize) return;
                setIsLaunchingOptimize(true);
                let parsedResume = null;
                if (typeof window !== "undefined") {
                  try {
                    const res = await fetch("/api/parse-resume", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ resumeText: lastInputs.resumeText }),
                    });
                    if (res.ok) {
                      const data = (await res.json()) as {
                        resume?: unknown;
                      };
                      if (data && typeof data === "object" && "resume" in data) {
                        parsedResume = (data as { resume: unknown }).resume;
                      }
                    }
                  } catch {
                    // best-effort; fall back to raw text only
                  }
                }
                if (typeof window !== "undefined") {
                  try {
                    const payload = JSON.stringify({
                      resumeText: lastInputs.resumeText,
                      jobDescription: lastJD ?? "",
                      analyzeResult,
                      parsedResume,
                    });
                    window.sessionStorage.setItem(OPTIMIZE_INPUT_KEY, payload);
                    window.localStorage.setItem(OPTIMIZE_INPUT_KEY, payload);
                  } catch {
                    // ignore
                  }
                }
                const supabase = createClient();
                try {
                  const { data: { session } } = await supabase.auth.getSession();
                  if (!session) {
                    setOptimizerModalOpen(false);
                    await supabase.auth.signInWithOAuth({
                      provider: "google",
                      options: {
                        redirectTo: `${window.location.origin}/auth/callback?next=/?openOptimizer=1`,
                      },
                    });
                    return;
                  }
                  try {
                    await fetch("/api/optimize-event", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${session.access_token}`,
                      },
                      body: JSON.stringify({
                        ats_score_before: analyzeResult.ats_score,
                      }),
                    });
                  } catch {
                    // best-effort; still navigate
                  }
                  setOptimizerModalOpen(false);
                  router.push("/optimize");
                } finally {
                  setIsLaunchingOptimize(false);
                }
              }}
            />
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
                    <button
                      type="button"
                      onClick={handleOptimize}
                      disabled={isGenerating}
                      className="w-full md:w-auto rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition disabled:opacity-60"
                    >
                      Improve resume & generate optimized version
                    </button>
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
      </div>

      <section id="how-ats-works" className="border-t border-slate-200 bg-slate-50/60">
        <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            How ATS Systems Scan Resumes
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            Applicant Tracking Systems (ATS) help recruiters sort and rank large volumes of
            applications. Understanding how they scan your resume makes it easier to pass initial
            filters and get seen by a human.
          </p>
          <div className="mt-6 space-y-5">
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                1. Keyword Matching
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                ATS platforms compare the keywords in your resume with the job description. If
                critical skills like Python, Machine Learning, or AWS are missing or buried in long
                paragraphs, your resume can be filtered out or ranked lower for that role.
              </p>
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                2. Resume Parsing
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Most ATS tools convert your resume into structured fields such as experience,
                education, and skills. Overly complex templates, columns, or heavy graphics can
                break parsing and cause important information to be missed.
              </p>
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                3. Experience Alignment
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Recruiters often filter by years of experience, seniority, and job titles. If your
                roles and impact are not clearly labeled or aligned to the target job, the ATS may
                not recognize you as a strong match even if you have the right background.
              </p>
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-slate-900">4. ATS Filtering</h3>
              <p className="mt-1 text-sm text-slate-600">
                Some ATS systems score and rank candidates based on keyword match, relevance, and
                experience alignment. Clear language, focused keywords, and clean structure help
                your resume surface higher when recruiters review results.
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-200 pt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Learn more
            </p>
            <ul className="mt-3 space-y-1 text-sm text-slate-700 list-disc pl-5">
              <li>
                <Link
                  href="/how-ats-scans-resumes"
                  className="inline-flex items-center gap-1 text-sky-700 underline underline-offset-2 hover:text-sky-900"
                >
                  <span>↗</span>
                  How ATS Systems Scan Resumes
                </Link>
              </li>
              <li>
                <Link
                  href="/common-resume-mistakes-fail-ats"
                  className="inline-flex items-center gap-1 text-sky-700 underline underline-offset-2 hover:text-sky-900"
                >
                  <span>↗</span>
                  Common Resume Mistakes That Fail ATS
                </Link>
              </li>
              <li>
                <Link
                  href="/ats-keywords-data-scientist-resumes"
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
        <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Why ATS Rejects Many Resumes
          </h2>
          <p className="mt-4 text-sm text-slate-600">
            Many resumes fail ATS screening before a recruiter ever reads them. Common reasons
            include missing job keywords, incompatible formatting, lack of measurable
            achievements, and poor alignment with the job description. ATS systems prioritize
            resumes that clearly match the required skills and experience listed in the job
            posting.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-700 list-disc pl-5">
            <li>Missing required keywords</li>
            <li>Poor formatting (tables, graphics)</li>
            <li>Generic job descriptions</li>
            <li>Lack of measurable achievements</li>
          </ul>
        </div>
      </section>

      <section id="faq" className="border-t border-slate-200 bg-white">
        <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Frequently Asked Questions
          </h2>
          <div className="mt-6 space-y-5">
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                What is a good ATS resume score?
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Most resumes that score above 75% ATS compatibility have strong keyword alignment
                with the job description and clearly labeled experience. Higher scores usually mean
                your skills, tools, and titles closely match what the role is asking for.
              </p>
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                Can ATS reject my resume?
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Yes. If your resume is missing required skills, uses confusing formatting, or hides
                important keywords in images or graphics, it may never reach a recruiter. Passing
                ATS checks is the first step before a human can review your profile.
              </p>
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                How can I improve my ATS score?
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Start by mirroring the language of the job description, adding missing but relevant
                keywords, and structuring your resume with clear sections for experience, skills,
                and education. Tools like ResumeAtlas help you spot keyword gaps and alignment
                issues before you apply.
              </p>
            </div>
          </div>
        </div>
      </section>

      <LimitModal
        open={limitModalOpen}
        onClose={() => setLimitModalOpen(false)}
        message={limitModalMessage}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }}
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
