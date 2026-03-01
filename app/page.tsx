"use client";

import { useState, useCallback, useEffect } from "react";
import { ResumeForm, type GenerateInputs } from "@/app/components/ResumeForm";
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

const FALLBACK_ANON_USAGE: Usage = {
  type: "anon",
  resumeCount: 0,
  resumeLimit: 3,
  summaryCount: 0,
  summaryLimit: 3,
  showFullIntelligence: false,
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
  const [isReoptimizingSummary, setIsReoptimizingSummary] = useState(false);

  const refreshUsage = useCallback(async () => {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    const u = await fetchUsage(session?.access_token ?? null);
    setUsage(u);
  }, []);

  useEffect(() => {
    refreshUsage();
    const supabase = createClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      refreshUsage();
    });
    return () => subscription.unsubscribe();
  }, [refreshUsage]);

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

  const handleGenerate = useCallback(async (inputs: GenerateInputs) => {
    setError(null);
    setIsGenerating(true);
    setJdMatchResult(null);
    setJdAnalysis(null);
    setEvidenceGaps([]);
    setAtsResult(null);
    try {
      const headers = await getAuthHeaders();
      const res = await fetch("/api/generate", {
        method: "POST",
        credentials: "include",
        headers,
        body: JSON.stringify({
          resumeText: inputs.resumeText,
          jobDescription: inputs.jobDescription,
          country: inputs.country,
          roleLevel: inputs.roleLevel || "Mid",
        }),
      });
      let data: { error?: string; code?: string } | Resume;
      try {
        data = (await res.json()) as { error?: string; code?: string } | Resume;
      } catch {
        const text = await res.text();
        setError(res.ok ? "Invalid response from server" : text || `Request failed (${res.status})`);
        return;
      }
      if (!res.ok) {
        const err = typeof (data as { error?: string }).error === "string" ? (data as { error: string; code?: string }).error : "Generation failed";
        const code = (data as { code?: string }).code;
        setError(err);
        if (res.status === 403 && code === "LIMIT_REACHED") {
          setLimitModalMessage((data as { error?: string }).error ?? err);
          setLimitModalOpen(true);
        }
        if (res.status === 403 && code === "UPGRADE_REQUIRED") {
          setLimitModalMessage((data as { error?: string }).error ?? err);
          setLimitModalOpen(true);
        }
        return;
      }
      const resumeData = data as Resume;
      setResume(resumeData);
      setLastJD(inputs.jobDescription);
      setLastRoleLevel(inputs.roleLevel || "Mid");
      await runAnalytics(resumeData, inputs.jobDescription, usage?.showFullIntelligence ?? false);
      await refreshUsage();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setIsGenerating(false);
    }
  }, [getAuthHeaders, runAnalytics, refreshUsage, usage?.showFullIntelligence]);

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
      } else if (res.status === 403 && (data.code === "LIMIT_REACHED" || data.code === "UPGRADE_REQUIRED")) {
        setLimitModalMessage(data.error ?? "Limit reached.");
        setLimitModalOpen(true);
        await refreshUsage();
      }
    } finally {
      setIsReoptimizingSummary(false);
    }
  }, [resume, lastJD, lastRoleLevel, getAuthHeaders, refreshUsage]);

  const showUpgradeScreen = usage?.type === "blocked";
  const showForm = !showUpgradeScreen;

  return (
    <main className="min-h-screen flex flex-col">
      <div className="max-w-7xl mx-auto w-full px-8 py-10 flex flex-col gap-8">
        <header className="text-center mt-8 mb-12">
          <div className="flex justify-center gap-3 items-center flex-wrap">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
              ResumeAtlas
            </h1>
            <UsageBadge usage={usage} />
          </div>
          <p className="mt-2 text-xl text-slate-600 font-medium tracking-tight">
            AI Resume Intelligence Engine
          </p>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Increase your chances of passing ATS and executive screening.
          </p>
          <span className="inline-block mt-4 text-xs font-medium uppercase tracking-wider text-slate-400 border border-slate-200 rounded-full px-3 py-1 bg-white">
            Powered by AI Analysis
          </span>
          <p className="mt-4 text-sm text-slate-500">
            Built for global applicants targeting competitive markets like the US, UK, and Canada.
          </p>
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
              />
            )}
          </div>
          <div className="lg:col-span-2 flex flex-col gap-6 min-h-0">
            <IntelligencePanel
              jdMatch={jdMatchResult}
              atsResult={atsResult}
              evidenceGaps={evidenceGaps}
              showFullIntelligence={usage?.showFullIntelligence ?? false}
              showLocked={usage?.type === "blocked"}
            />
            <div className="flex-1 min-h-0 flex flex-col">
              <h2 className="text-sm font-semibold tracking-tight text-slate-500 mb-3">
                Preview
              </h2>
              <div className="flex-1 min-h-0">
                <ResumePreview resume={resume} />
              </div>
            </div>
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
