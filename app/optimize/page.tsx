"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ResumeOptimizationPanel } from "@/app/components/ResumeOptimizationPanel";
import { StructuredResume } from "@/app/components/StructuredResume";
import { parseResumeToJSON } from "@/app/lib/resumeParser";
import {
  resumeDocumentFromHeuristicParsed,
  resumeDocumentToPlainText,
  type ResumeDocument,
} from "@/app/lib/resumeDocument";
import { createClient } from "@/app/lib/supabase/client";
import type { Resume } from "@/app/types/resume";
import type { ATSAnalyzeResult } from "@/app/lib/atsAnalyze";
import { sameResumeAndJob } from "@/app/lib/resumeJobFingerprint";

const OPTIMIZE_INPUT_KEY = "resumeatlas_optimize_input";
const OPTIMIZE_CACHE_KEY = "resumeatlas_optimize_cache";

type OptimizeCacheV1 = {
  result: OptimizeResult;
  editableResume: ResumeDocument | null;
  resumeText?: string;
  jobDescription?: string;
  /** When set, cache must only hydrate for the same signed-in user (shared-device safety). */
  cachedForUserId?: string;
};

type OptimizeInput = {
  resumeText: string;
  jobDescription: string;
  analyzeResult: ATSAnalyzeResult;
  /** Structured resume parsed on the client via /api/parse-resume. */
  parsedResume?: ResumeDocument;
};

type OptimizeResult = {
  optimizedResume: string;
  scoreAfter: number;
  roleAlignmentScore?: number;
  matchedStrengthScore?: number;
  addedKeywords: string[];
  bulletImprovements: number;
  bulletsAdded?: number;
  quantifiedAchievements: number;
  summaryOptimized?: boolean;
  optimizedStructuredResume?: ResumeDocument;
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
  /** True until we've read session storage and either restored cache or started work. */
  const [hydrating, setHydrating] = useState(true);
  /** True only while /api/optimize is in flight (not on refresh when cache exists). */
  const [optimizeInFlight, setOptimizeInFlight] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editableResume, setEditableResume] = useState<ResumeDocument | null>(null);

  const toPlainText = useCallback((doc: ResumeDocument) => resumeDocumentToPlainText(doc), []);

  const resumeFromOptimizeResult = useCallback((data: OptimizeResult) => {
    return data.optimizedStructuredResume
      ? data.optimizedStructuredResume
      : resumeDocumentFromHeuristicParsed(parseResumeToJSON(data.optimizedResume));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let cancelled = false;
    const abortController = new AbortController();

    (async () => {
      try {
        const raw =
          window.sessionStorage.getItem(OPTIMIZE_INPUT_KEY) ||
          window.localStorage.getItem(OPTIMIZE_INPUT_KEY);
        if (!raw) {
          window.location.replace("/");
          return;
        }

        let parsed: OptimizeInput;
        try {
          parsed = JSON.parse(raw) as OptimizeInput;
        } catch {
          if (!cancelled) {
            setInput(null);
            setHydrating(false);
          }
          return;
        }

        if (!parsed?.resumeText || !parsed?.analyzeResult) {
          if (!cancelled) {
            setInput(null);
            setHydrating(false);
          }
          return;
        }

        if (!cancelled) setInput(parsed);

        const supabase = createClient();
        const {
          data: { session },
        } = await supabase.auth.getSession();
        const uid = session?.user?.id ?? null;

        const restoreFromCachePayload = (cache: OptimizeCacheV1): boolean => {
          if (!cache?.result?.optimizedResume) return false;
          if (cache.cachedForUserId && uid && cache.cachedForUserId !== uid) return false;
          if (!sameResumeAndJob(cache, parsed)) return false;
          setResult(cache.result);
          setEditableResume(cache.editableResume ?? resumeFromOptimizeResult(cache.result));
          window.sessionStorage.setItem("resumeatlas_optimize_done", "1");
          setHydrating(false);
          return true;
        };

        const tryRestoreFromStorage = (cacheRaw: string | null): boolean => {
          if (!cacheRaw) return false;
          try {
            const cache = JSON.parse(cacheRaw) as OptimizeCacheV1;
            return restoreFromCachePayload(cache);
          } catch {
            return false;
          }
        };

        if (
          tryRestoreFromStorage(window.sessionStorage.getItem(OPTIMIZE_CACHE_KEY)) ||
          tryRestoreFromStorage(window.localStorage.getItem(OPTIMIZE_CACHE_KEY))
        ) {
          if (!cancelled) setHydrating(false);
          return;
        }

        try {
          const staleSession = window.sessionStorage.getItem(OPTIMIZE_CACHE_KEY);
          const staleLocal = window.localStorage.getItem(OPTIMIZE_CACHE_KEY);
          if (staleSession) {
            const c = JSON.parse(staleSession) as OptimizeCacheV1;
            if (!sameResumeAndJob(c, parsed)) window.sessionStorage.removeItem(OPTIMIZE_CACHE_KEY);
          }
          if (staleLocal) {
            const c = JSON.parse(staleLocal) as OptimizeCacheV1;
            if (!sameResumeAndJob(c, parsed)) window.localStorage.removeItem(OPTIMIZE_CACHE_KEY);
          }
        } catch {
          window.sessionStorage.removeItem(OPTIMIZE_CACHE_KEY);
          window.localStorage.removeItem(OPTIMIZE_CACHE_KEY);
        }

        if (cancelled) return;

        setHydrating(false);
        setOptimizeInFlight(true);
        setError(null);

        const headers: HeadersInit = { "Content-Type": "application/json" };
        if (session?.access_token) {
          headers["Authorization"] = `Bearer ${session.access_token}`;
        }

        const res = await fetch("/api/optimize", {
          method: "POST",
          headers,
          signal: abortController.signal,
          body: JSON.stringify({
            resumeText: parsed.resumeText,
            jobDescription: parsed.jobDescription,
            analyzeResult: parsed.analyzeResult,
            structuredResume: parsed.parsedResume,
          }),
        });

        if (res.status === 401) {
          throw new Error("Sign in to run optimization. Return to the home page and open the credit modal.");
        }
        if (res.status === 403) {
          const errBody = (await res.json().catch(() => ({}))) as { error?: string; code?: string };
          throw new Error(
            typeof errBody.error === "string"
              ? errBody.error
              : "No optimization credits. Buy credits on the home page to continue."
          );
        }
        if (!res.ok) throw new Error("Optimization failed");
        const data = (await res.json()) as OptimizeResult;

        if (!cancelled) {
          const nextEditable = resumeFromOptimizeResult(data);
          setResult(data);
          setEditableResume(nextEditable);
          window.sessionStorage.setItem("resumeatlas_optimize_done", "1");
          const cachePayload: OptimizeCacheV1 = {
            result: data,
            editableResume: nextEditable,
            resumeText: parsed.resumeText,
            jobDescription: parsed.jobDescription,
            cachedForUserId: uid ?? undefined,
          };
          const serialized = JSON.stringify(cachePayload);
          try {
            window.sessionStorage.setItem(OPTIMIZE_CACHE_KEY, serialized);
          } catch {
            // quota / private mode
          }
          try {
            window.localStorage.setItem(OPTIMIZE_CACHE_KEY, serialized);
          } catch {
            // quota — session cache still helps for same-tab reload
          }
        }
      } catch (e) {
        if (cancelled || (e instanceof Error && e.name === "AbortError")) return;
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Something went wrong");
        }
      } finally {
        if (!cancelled) {
          setOptimizeInFlight(false);
          setHydrating(false);
        }
      }
    })();

    return () => {
      cancelled = true;
      abortController.abort();
    };
  }, [resumeFromOptimizeResult]);

  useEffect(() => {
    if (typeof window === "undefined" || !result || !input) return;
    void (async () => {
      const {
        data: { session },
      } = await createClient().auth.getSession();
      const uid = session?.user?.id;
      const payload: OptimizeCacheV1 = {
        result,
        editableResume,
        resumeText: input.resumeText,
        jobDescription: input.jobDescription,
        cachedForUserId: uid,
      };
      const serialized = JSON.stringify(payload);
      try {
        window.sessionStorage.setItem(OPTIMIZE_CACHE_KEY, serialized);
      } catch {
        // ignore
      }
      try {
        window.localStorage.setItem(OPTIMIZE_CACHE_KEY, serialized);
      } catch {
        // ignore
      }
    })();
  }, [result, editableResume, input]);

  const handleDownloadPdf = useCallback(async () => {
    try {
      if (!editableResume) {
        setError("No optimized resume available to download.");
        return;
      }

      const resumePayload: Resume = {
        basics: {
          name: editableResume.name ?? "Name",
          title: editableResume.title ?? "",
          summary: editableResume.summary ?? "",
          contact: editableResume.contact ?? "",
        },
        experience: (editableResume.experience ?? []).map((exp) => ({
          company: exp.company ?? "",
          role: exp.role ?? "",
          duration: exp.dates ?? "",
          bullets: exp.bullets ?? [],
          projects: exp.projects?.length
            ? exp.projects.map((p) => ({
                title: p.title,
                bullets: p.bullets ?? [],
              }))
            : undefined,
        })),
        skills: editableResume.skills ?? [],
        education: (editableResume.education ?? []).map((line) => ({
          institution: "",
          degree: line,
          year: "",
        })),
      };
      const rawOptimizedText = toPlainText(editableResume);

      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const headers: HeadersInit = { "Content-Type": "application/json" };
      if (session?.access_token) {
        headers["Authorization"] = `Bearer ${session.access_token}`;
      }

      const res = await fetch("/api/download", {
        method: "POST",
        headers,
        body: JSON.stringify({ resume: resumePayload, rawText: rawOptimizedText }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error || `Download failed (${res.status.toString()})`);
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
      setError(e instanceof Error ? e.message : "Failed to download resume PDF.");
    }
  }, [editableResume, toPlainText]);

  const handleDownloadDocx = useCallback(() => {
    const text = editableResume ? toPlainText(editableResume) : result?.optimizedResume ?? "";
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume-optimized.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [editableResume, result?.optimizedResume, toPlainText]);

  if (!result && !error && (hydrating || optimizeInFlight)) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-slate-600">Optimizing your resume for this job…</p>
          <div className="mt-4 mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700" />
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

  const afterContent = editableResume
    ? toPlainText(editableResume)
    : result.optimizedResume;
  const showKeywords = result.addedKeywords.filter((kw) =>
    afterContent.toLowerCase().includes(kw.toLowerCase())
  );
  const quantifiedBullets = result.quantifiedBullets ?? [];
  const bulletChanges = result.bulletChanges ?? [];
  const highlightedBullets = bulletChanges
    .filter((c) => c.original.trim().length > 0 && c.improved !== c.original)
    .map((c) => c.improved);
  const newBullets = bulletChanges
    .filter((c) => c.original.trim().length === 0 && c.improved.trim().length > 0)
    .map((c) => c.improved);
  const bulletsAddedCount =
    typeof result.bulletsAdded === "number"
      ? result.bulletsAdded
      : newBullets.length;
  const keywordBulletsFromChanges = bulletChanges
    .filter((c) => c.addedKeywords.length > 0)
    .map((c) => c.improved);
  const parsedAfter =
    editableResume ?? resumeDocumentFromHeuristicParsed(parseResumeToJSON(afterContent));
  const keywordBulletsFromFinalResume = parsedAfter.experience.flatMap((exp) => {
    const top = (exp.bullets ?? []).filter((b) => {
      const lower = String(b ?? "").toLowerCase();
      return showKeywords.some((kw) => lower.includes(kw.toLowerCase()));
    });
    const nested = (exp.projects ?? []).flatMap((p) =>
      (p.bullets ?? []).filter((b) => {
        const lower = String(b ?? "").toLowerCase();
        return showKeywords.some((kw) => lower.includes(kw.toLowerCase()));
      })
    );
    return [...top, ...nested];
  });
  const keywordBullets = Array.from(
    new Set([...keywordBulletsFromChanges, ...keywordBulletsFromFinalResume])
  );

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 print:min-h-0 print:bg-white print:px-0 print:py-0">
      <div className="mx-auto max-w-6xl space-y-6 print:max-w-none print:space-y-0">
        {/* Header */}
        <div className="flex flex-col gap-3 print:hidden">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
                Your resume, upgraded for this job
              </h1>
              <p className="mt-1 text-xs text-slate-600">
                Review your optimized version, tweak anything you like, then download when you&apos;re
                ready to apply.
              </p>
            </div>
            <Link
              href="/"
              className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3.5 py-2.5 text-xs font-semibold text-white shadow-sm ring-1 ring-black/10 hover:bg-slate-800 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 transition"
            >
              <span
                aria-hidden
                className="inline-flex h-5 w-5 items-center justify-center rounded-lg bg-white/10"
              >
                ←
              </span>
              Back to analyzer
            </Link>
          </div>
        </div>

        {/* Optimized resume + AI suggestions */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[3fr_2fr] print:block">
          {/* Optimized resume */}
          <div className="space-y-2 print:space-y-0">
            <div className="print:hidden space-y-1">
              <h2 className="text-sm font-semibold text-slate-700">Optimized resume preview</h2>
              <p className="max-w-2xl text-xs leading-relaxed text-slate-500">
                Review and refine this draft by section before you download. Your edits will be
                reflected in the exported resume.
              </p>
            </div>
            <StructuredResume
              resume={parsedAfter}
              highlightKeywords={showKeywords}
              quantifiedBullets={quantifiedBullets}
              highlightedBullets={highlightedBullets}
              keywordBullets={keywordBullets}
              newBullets={newBullets}
              highlightOptimizedSummary
              editable
              onUpdateResumeMeta={(patch) =>
                setEditableResume((prev) => (prev ? { ...prev, ...patch } : prev))
              }
              onUpdateSummary={(value) =>
                setEditableResume((prev) =>
                  prev
                    ? {
                        ...prev,
                        summary: value,
                      }
                    : prev
                )
              }
              onUpdateSkills={(value) =>
                setEditableResume((prev) =>
                  prev
                    ? {
                        ...prev,
                        skills: value,
                      }
                    : prev
                )
              }
              onUpdateExperienceBullet={(expIndex, bulletIndex, value, ctx) =>
                setEditableResume((prev) => {
                  if (!prev) return prev;
                  const cleaned = value
                    .replace(/\r?\n+/g, " ")
                    .replace(/\s{2,}/g, " ")
                    .trim();
                  return {
                    ...prev,
                    experience: prev.experience.map((exp, i) => {
                      if (i !== expIndex) return exp;
                      if (ctx?.projectIndex !== undefined) {
                        const pj = ctx.projectIndex;
                        const projects = exp.projects ?? [];
                        return {
                          ...exp,
                          projects: projects.map((p, pi) =>
                            pi !== pj
                              ? p
                              : {
                                  ...p,
                                  bullets: p.bullets.map((b, j) =>
                                    j === bulletIndex ? cleaned : b
                                  ),
                                }
                          ),
                        };
                      }
                      return {
                        ...exp,
                        bullets: exp.bullets.map((b, j) =>
                          j === bulletIndex ? cleaned : b
                        ),
                      };
                    }),
                  };
                })
              }
              onUpdateExperienceField={(expIndex, field, value) =>
                setEditableResume((prev) => {
                  if (!prev) return prev;
                  return {
                    ...prev,
                    experience: prev.experience.map((exp, i) =>
                      i === expIndex
                        ? {
                            ...exp,
                            [field]: value,
                          }
                        : exp
                    ),
                  };
                })
              }
              onUpdateEducationLine={(eduIndex, line) =>
                setEditableResume((prev) => {
                  if (!prev) return prev;
                  const education = [...(prev.education ?? [])];
                  education[eduIndex] = line;
                  return { ...prev, education };
                })
              }
            />
          </div>

          {/* Optimization summary */}
          <div className="space-y-2 print:hidden">
            <ResumeOptimizationPanel
              addedKeywords={showKeywords}
              bulletImprovements={result.bulletImprovements}
              bulletsAdded={bulletsAddedCount}
              quantifiedAchievements={result.quantifiedAchievements}
              summaryOptimized={result.summaryOptimized === true}
              scoreBefore={input.analyzeResult.ats_score}
              scoreAfter={result.scoreAfter}
              roleAlignmentScore={result.roleAlignmentScore}
              matchedStrengthScore={result.matchedStrengthScore}
              onDownloadPdf={handleDownloadPdf}
              onDownloadDocx={handleDownloadDocx}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
