"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ScoreImprovementBanner } from "@/app/components/ScoreImprovementBanner";
import { ResumeOptimizationPanel } from "@/app/components/ResumeOptimizationPanel";
import { StructuredResume } from "@/app/components/StructuredResume";
import { parseResumeToJSON } from "@/app/lib/resumeParser";
import type { StructuredResume as ParsedStructuredResume } from "@/app/api/parse-resume/route";
import type { ATSAnalyzeResult } from "@/app/lib/atsAnalyze";

const OPTIMIZE_INPUT_KEY = "resumeatlas_optimize_input";
const OPTIMIZE_RESULT_KEY = "resumeatlas_optimize_result";

type OptimizeInput = {
  resumeText: string;
  jobDescription: string;
  analyzeResult: ATSAnalyzeResult;
  /** Structured resume parsed on the client via /api/parse-resume. */
  parsedResume?: ParsedStructuredResume;
};

type OptimizeResult = {
  optimizedResume: string;
  scoreAfter: number;
  addedKeywords: string[];
  bulletImprovements: number;
  quantifiedAchievements: number;
  optimizedStructuredResume?: ParsedStructuredResume;
  quantifiedBullets?: string[];
  bulletChanges?: {
    original: string;
    improved: string;
    addedKeywords: string[];
    quantified: boolean;
  }[];
};

export default function OptimizePage() {
  const [input, setInput] = useState<OptimizeInput | null>(null);
  const [result, setResult] = useState<OptimizeResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [version, setVersion] = useState<"before" | "after">("after");
  const [displayResume, setDisplayResume] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.sessionStorage.getItem(OPTIMIZE_INPUT_KEY);
      if (!raw) {
        setInput(null);
        setLoading(false);
        return;
      }
      const parsed = JSON.parse(raw) as OptimizeInput;
      if (!parsed?.resumeText || !parsed?.analyzeResult) {
        setInput(null);
        setLoading(false);
        return;
      }
      setInput(parsed);
    } catch {
      setInput(null);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!input) return;
    let cancelled = false;
    setLoading(true);
    setError(null);

    // 1) Try to reuse a cached optimization result to avoid extra LLM calls.
    if (typeof window !== "undefined") {
      try {
        const cachedRaw = window.sessionStorage.getItem(OPTIMIZE_RESULT_KEY);
        if (cachedRaw) {
          const cached = JSON.parse(cachedRaw) as OptimizeResult & { resumeText?: string; jobDescription?: string };
          // Basic sanity check: ensure cached result corresponds to this resumeText + jobDescription.
          if (
            cached &&
            typeof cached.optimizedResume === "string" &&
            cached.resumeText === input.resumeText &&
            cached.jobDescription === input.jobDescription
          ) {
            setResult(cached);
            setDisplayResume(cached.optimizedResume);
            setLoading(false);
            return () => {
              cancelled = true;
            };
          }
        }
      } catch {
        // Ignore cache errors and fall back to fresh optimize call.
      }
    }

    // 2) No valid cache – call /api/optimize once and cache the result.
    fetch("/api/optimize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        resumeText: input.resumeText,
        jobDescription: input.jobDescription,
        analyzeResult: input.analyzeResult,
        structuredResume: input.parsedResume,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Optimization failed");
        return res.json() as Promise<OptimizeResult>;
      })
      .then((data) => {
        if (!cancelled) {
          setResult(data);
          setDisplayResume(data.optimizedResume);
          if (typeof window !== "undefined") {
            try {
              window.sessionStorage.setItem(
                OPTIMIZE_RESULT_KEY,
                JSON.stringify({
                  ...data,
                  resumeText: input.resumeText,
                  jobDescription: input.jobDescription,
                })
              );
            } catch {
              // best-effort; ignore cache failures
            }
          }
        }
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Something went wrong");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [input]);

  const handleDownloadPdf = useCallback(() => {
    window.print();
  }, []);

  const handleDownloadDocx = useCallback(() => {
    const text = displayResume ?? result?.optimizedResume ?? "";
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume-optimized.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [result, displayResume, version, input?.resumeText]);

  const handleUpdateBullet = useCallback(
    (original: string, updated: string) => {
      setDisplayResume((prev) => {
        const base = prev ?? result?.optimizedResume ?? "";
        if (!base || !original || original === updated) return base;
        return base.replace(original, updated);
      });
    },
    [result?.optimizedResume]
  );

  if (loading && !result) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-slate-600">Optimizing your resume for this job…</p>
          <div className="mt-4 h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700 mx-auto" />
        </div>
      </div>
    );
  }

  if (error || !input) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-12">
        <div className="mx-auto max-w-md rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <p className="text-slate-700">
            {error || "No resume data found. Run an ATS analysis and click Optimize Resume to open this page."}
          </p>
          <Link
            href="/"
            className="mt-4 inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Back to analyzer
          </Link>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-12">
        <div className="mx-auto max-w-md rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <p className="text-slate-700">Unable to generate optimized resume. Please try again from the analyzer.</p>
          <Link href="/" className="mt-4 inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
            Back to analyzer
          </Link>
        </div>
      </div>
    );
  }

  const afterContent = displayResume ?? result.optimizedResume;
  const showKeywords = result.addedKeywords;
  const quantifiedBullets = result.quantifiedBullets ?? [];
  const bulletChanges = result.bulletChanges ?? [];
  const parsedAfter = parseResumeToJSON(afterContent);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
            ATS-Optimized Resume for This Job
          </h1>
          <ScoreImprovementBanner
            scoreBefore={input.analyzeResult.ats_score ?? 0}
            scoreAfter={result.scoreAfter}
            keywordsAdded={result.addedKeywords.length}
            quantifiedAchievements={result.quantifiedAchievements}
            bulletImprovements={result.bulletImprovements}
          />
        </div>

        {/* Optimized resume + AI suggestions */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[3fr_2fr]">
          {/* Optimized resume */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-semibold text-slate-700">
                Optimized resume – ATS-friendly format
              </h2>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  className="rounded-lg border border-slate-200 bg-slate-900 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-slate-800"
                >
                  Download PDF
                </button>
                <button
                  type="button"
                  onClick={handleDownloadDocx}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
                >
                  Download DOCX
                </button>
              </div>
            </div>
            <StructuredResume
              resume={parsedAfter}
              highlightKeywords={showKeywords}
              quantifiedBullets={quantifiedBullets}
            />
          </div>

          {/* Optimization summary */}
          <div className="space-y-2">
            <h2 className="mb-1 text-sm font-semibold text-slate-700 text-center">
              Optimization Summary
            </h2>
            <ResumeOptimizationPanel
              addedKeywords={result.addedKeywords}
              bulletImprovements={result.bulletImprovements}
              quantifiedAchievements={result.quantifiedAchievements}
              bulletChanges={bulletChanges}
              onUpdateBullet={handleUpdateBullet}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
