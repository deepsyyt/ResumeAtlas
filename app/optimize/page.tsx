"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { OptimizationProcessingScreen } from "@/app/components/OptimizationProcessingScreen";
import { ResumeOptimizationPanel } from "@/app/components/ResumeOptimizationPanel";
import { StructuredResume } from "@/app/components/StructuredResume";
import { parseResumeToJSON } from "@/app/lib/resumeParser";
import { openRazorpayPackCheckout } from "@/app/lib/billing/razorpayPackCheckout";
import {
  resumeDocumentFromHeuristicParsed,
  resumeDocumentToDownloadResume,
  resumeDocumentToPlainText,
  syncResumeSkills,
  type ResumeDocument,
  type ResumeSkillGroup,
} from "@/app/lib/resumeDocument";
import { createClient } from "@/app/lib/supabase/client";
import type { ATSAnalyzeResult } from "@/app/lib/atsAnalyze";
import { sameResumeAndJob } from "@/app/lib/resumeJobFingerprint";
import { setActiveFunnelId } from "@/app/lib/funnelTracking";
import {
  trackOptimizationCompleted,
  trackOptimizationPdfDownloaded,
} from "@/app/lib/analyticsFunnel";
import { DownloadPaymentSuccessModal } from "@/app/components/DownloadPaymentSuccessModal";
import { buildRefinementEvidence } from "@/app/lib/resumeFactualAudit";
import { makeExperienceBulletKey, countRefinedScopesFromBulletKeys } from "@/app/lib/optimizeExperience";
import { buildBulletEvidenceMaps } from "@/app/lib/optimizeBulletEvidence";
import { extractFixHighlightKeywords } from "@/app/lib/recommendedFixes";

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
  funnelId?: string;
  selectedSkills?: string[];
  selectedRejectionRisks?: string[];
  /** Structured resume parsed on the client via /api/parse-resume. */
  parsedResume?: ResumeDocument;
};

type OptimizeResult = {
  optimizedResume: string;
  scoreBefore?: number;
  scoreAfter: number;
  evidenceMatchDelta?: number;
  atsScoreReference?: number;
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
    addressedRejectionRisks?: string[];
  }[];
  selectedRejectionRisks?: string[];
  addressedRejectionRisks?: string[];
  insights?: {
    strongMatches?: string[];
    missingCritical?: string[];
    jdGapDetails?: Array<{
      phrase: string;
      jdSource: "required" | "preferred" | "target";
      inOriginalResume: boolean;
      inOptimizedResume: boolean;
    }>;
    dominantIntents?: string[];
  };
  alignmentInsights?: {
    coverageBreakdown?: {
      covered?: string[];
      missing?: string[];
    };
  };
  targetSkillCoverage?: {
    total: number;
    coveredBefore: number;
    coveredAfter: number;
  };
  refinementEvidence?: {
    refinedBullets: string[];
    newBullets: string[];
    refinedBulletKeys: string[];
    newBulletKeys: string[];
    bulletDiffs: Array<{ original: string; improved: string; key: string }>;
    originalSummary?: string;
    summaryOptimized: boolean;
    jdGaps: string[];
    jdGapDetails?: Array<{
      phrase: string;
      jdSource: "required" | "preferred" | "target";
      inOriginalResume: boolean;
      inOptimizedResume: boolean;
    }>;
  };
  evidenceDashboard?: {
    before: import("@/app/lib/resumeEvidenceScore").EvidenceDashboard;
    after: import("@/app/lib/resumeEvidenceScore").EvidenceDashboard;
  };
  improvedSkillProof?: import("@/app/lib/resumeEvidenceScore").OptimizedSkillProofRow[];
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
  const [isUnlockingDownload, setIsUnlockingDownload] = useState(false);
  const [downloadPassToken, setDownloadPassToken] = useState<string | null>(null);
  const [downloadPaidSuccessOpen, setDownloadPaidSuccessOpen] = useState(false);
  const lastPdfDownloadAtRef = useRef(0);
  const lastEditableDownloadAtRef = useRef(0);

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

        if (parsed.funnelId) {
          setActiveFunnelId(parsed.funnelId);
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
          trackOptimizationCompleted({
            jobId:
              parsed.funnelId ??
              `cache:${parsed.resumeText.length}:${parsed.jobDescription.length}`,
            scoreBefore: parsed.analyzeResult.ats_score,
            scoreAfter: cache.result.scoreAfter,
            restoredFromCache: true,
          });
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

        const selectedFixes = (parsed.selectedRejectionRisks ?? []).filter(
          (f): f is string => typeof f === "string" && f.trim().length > 0
        );
        if (selectedFixes.length === 0) {
          setHydrating(false);
          setError(
            "Select at least one recommended fix on the analyzer, then run Optimize again."
          );
          return;
        }

        /** Home page skips parse before navigate so /optimize loads immediately; parse here while the loading UI shows. */
        let structuredResume: ResumeDocument | undefined = parsed.parsedResume;
        if (!structuredResume || !Array.isArray(structuredResume.experience)) {
          const parseRes = await fetch("/api/parse-resume", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ resumeText: parsed.resumeText }),
            signal: abortController.signal,
          });
          if (parseRes.ok) {
            const parseData = (await parseRes.json()) as { resume?: ResumeDocument };
            if (parseData?.resume && typeof parseData.resume === "object") {
              structuredResume = parseData.resume;
            }
          }
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
            structuredResume,
            selectedSkills: parsed.selectedSkills,
            selectedRejectionRisks: selectedFixes,
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
              : "No optimizations available. Buy a pack on the home page to continue."
          );
        }
        if (!res.ok) {
          const errBody = (await res.json().catch(() => ({}))) as { error?: string; code?: string };
          if (res.status === 400 && errBody.code === "OPTIMIZE_FIXES_REQUIRED") {
            throw new Error(
              typeof errBody.error === "string"
                ? errBody.error
                : "Select at least one recommended fix before optimizing."
            );
          }
          throw new Error(
            typeof errBody.error === "string" ? errBody.error : "Optimization failed"
          );
        }
        const data = (await res.json()) as OptimizeResult;

        if (!cancelled) {
          const nextEditable = resumeFromOptimizeResult(data);
          setResult(data);
          setEditableResume(nextEditable);
          trackOptimizationCompleted({
            jobId:
              parsed.funnelId ??
              `run:${parsed.resumeText.length}:${parsed.jobDescription.length}`,
            scoreBefore: parsed.analyzeResult.ats_score,
            scoreAfter: data.scoreAfter,
            restoredFromCache: false,
          });
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
            // quota - session cache still helps for same-tab reload
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

  const refreshDownloadWallet = useCallback(async () => {
    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.access_token) return;
    await fetch("/api/usage", {
      credentials: "include",
      headers: { Authorization: `Bearer ${session.access_token}` },
    });
  }, []);

  type DownloadGateResult =
    | { ok: true; justPaidForDownload: false }
    | { ok: true; justPaidForDownload: true }
    | { ok: false };

  const resolveDownloadGate = useCallback(async (): Promise<DownloadGateResult> => {
    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.access_token) {
      setError("Please sign in again to unlock downloads.");
      return { ok: false };
    }

    const usageRes = await fetch("/api/usage", {
      credentials: "include",
      headers: { Authorization: `Bearer ${session.access_token}` },
    });
    const usageJson = (await usageRes.json().catch(() => null)) as
      | { creditsRemaining?: number }
      | null;
    const creditsRemaining =
      typeof usageJson?.creditsRemaining === "number"
        ? usageJson.creditsRemaining
        : 0;
    if (creditsRemaining > 0) {
      return { ok: true, justPaidForDownload: false };
    }

    const checkout = await openRazorpayPackCheckout({
      packageId: "starter",
      creditsRemaining: 0,
      isLoggedIn: true,
      getAuthHeaders: async () => ({
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      }),
      checkoutTrigger: "download_gate",
      onRefreshBalance: refreshDownloadWallet,
    });
    if (checkout.status === "error") {
      setError(checkout.message);
      return { ok: false };
    }
    if (checkout.status === "dismissed") {
      return { ok: false };
    }
    if (checkout.status !== "paid") {
      return { ok: false };
    }
    await refreshDownloadWallet();
    return { ok: true, justPaidForDownload: true };
  }, [refreshDownloadWallet]);

  type DownloadSurface = "optimize_panel" | "payment_success_modal";

  const handleDownloadPdf = useCallback(
    async (surface: DownloadSurface = "optimize_panel") => {
    try {
      if (!editableResume) {
        setError("No optimized resume available to download.");
        return;
      }
      setIsUnlockingDownload(true);
      const gate: DownloadGateResult = downloadPassToken
        ? { ok: true, justPaidForDownload: false }
        : await resolveDownloadGate();
      if (!gate.ok) return;
      if (gate.justPaidForDownload) {
        setDownloadPaidSuccessOpen(true);
        return;
      }
      const now = Date.now();
      if (now - lastPdfDownloadAtRef.current < 1200) return;
      lastPdfDownloadAtRef.current = now;

      const resumePayload = resumeDocumentToDownloadResume(editableResume);
      const rawOptimizedText = toPlainText(editableResume);

      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const headers: HeadersInit = { "Content-Type": "application/json" };
      if (session?.access_token) {
        headers["Authorization"] = `Bearer ${session.access_token}`;
      }
      if (downloadPassToken) {
        headers["x-resumeatlas-download-pass"] = downloadPassToken;
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
      const nextPassToken = res.headers.get("x-resumeatlas-download-pass");
      if (nextPassToken) {
        setDownloadPassToken(nextPassToken);
      } else if (downloadPassToken) {
        // One-time paired pass consumed.
        setDownloadPassToken(null);
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ResumeAtlas_Optimized_Resume.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      trackOptimizationPdfDownloaded(surface);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to download resume PDF.");
    } finally {
      setIsUnlockingDownload(false);
    }
  },
  [editableResume, toPlainText, resolveDownloadGate, downloadPassToken]
  );

  const handleDownloadDocx = useCallback(
    async (surface: DownloadSurface = "optimize_panel") => {
    try {
      setIsUnlockingDownload(true);
      const gate: DownloadGateResult = downloadPassToken
        ? { ok: true, justPaidForDownload: false }
        : await resolveDownloadGate();
      if (!gate.ok) return;
      if (gate.justPaidForDownload) {
        setDownloadPaidSuccessOpen(true);
        return;
      }
      const now = Date.now();
      if (now - lastEditableDownloadAtRef.current < 1200) return;
      lastEditableDownloadAtRef.current = now;
      const text = editableResume ? toPlainText(editableResume) : result?.optimizedResume ?? "";
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const headers: HeadersInit = { "Content-Type": "application/json" };
      if (session?.access_token) {
        headers["Authorization"] = `Bearer ${session.access_token}`;
      }
      if (downloadPassToken) {
        headers["x-resumeatlas-download-pass"] = downloadPassToken;
      }
      const res = await fetch("/api/download-editable", {
        method: "POST",
        headers,
        body: JSON.stringify({ rawText: text }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error || `Download failed (${res.status.toString()})`);
        return;
      }
      const blob = await res.blob();
      const nextPassToken = res.headers.get("x-resumeatlas-download-pass");
      if (nextPassToken) {
        setDownloadPassToken(nextPassToken);
      } else if (downloadPassToken) {
        setDownloadPassToken(null);
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "resume-optimized.txt";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // no-op
    } finally {
      setIsUnlockingDownload(false);
    }
  },
  [
    editableResume,
    result?.optimizedResume,
    toPlainText,
    resolveDownloadGate,
    downloadPassToken,
  ]
  );

  if (!result && !error && (hydrating || optimizeInFlight)) {
    return <OptimizationProcessingScreen />;
  }

  if (error || !input) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center bg-slate-50 px-4 py-12">
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
      <div className="flex flex-1 flex-col items-center justify-center bg-slate-50 px-4 py-12">
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
  const parsedAfter =
    editableResume ?? resumeDocumentFromHeuristicParsed(parseResumeToJSON(afterContent));
  const jdGapsFallback =
    result.insights?.missingCritical ??
    result.alignmentInsights?.coverageBreakdown?.missing ??
    [];
  const evidence =
    result.refinementEvidence ??
    (input.parsedResume && parsedAfter
      ? buildRefinementEvidence(input.parsedResume, parsedAfter, jdGapsFallback)
      : undefined);
  const strengthenedSkills = (result.improvedSkillProof ?? []).map((row) => row.skill);
  const quantifiedBullets = result.quantifiedBullets ?? [];
  const bulletChanges = result.bulletChanges ?? [];
  const highlightedBullets =
    evidence?.refinedBullets ??
    bulletChanges
      .filter((c) => c.original.trim().length > 0 && c.improved !== c.original)
      .map((c) => c.improved);
  const newBullets =
    evidence?.newBullets ??
    bulletChanges
      .filter((c) => c.original.trim().length === 0 && c.improved.trim().length > 0)
      .map((c) => c.improved);
  const originalSummary =
    evidence?.originalSummary ??
    (input.parsedResume?.summary?.trim() || undefined);
  const jdGaps = evidence?.jdGaps ?? jdGapsFallback;
  const jdGapDetails =
    evidence?.jdGapDetails ??
    result.insights?.jdGapDetails ??
    jdGaps.map((phrase) => ({
      phrase,
      jdSource: "required" as const,
      inOriginalResume: false,
      inOptimizedResume: false,
    }));
  const keywordBulletsFromChanges = bulletChanges
    .filter((c) => c.addedKeywords.length > 0)
    .map((c) => c.improved);
  const rawBulletDiffs =
    evidence?.bulletDiffs ??
    bulletChanges
      .filter((c) => c.original.trim() && c.improved !== c.original)
      .map((c) => ({ original: c.original, improved: c.improved }));
  const bulletDiffsWithKeys: Array<{ original: string; improved: string; key?: string }> =
    rawBulletDiffs.map((diff) => {
    const existingKey =
      "key" in diff && typeof diff.key === "string" ? diff.key : undefined;
    if (existingKey) return { original: diff.original, improved: diff.improved, key: existingKey };
    const target = diff.improved.trim().toLowerCase();
    for (let idx = 0; idx < parsedAfter.experience.length; idx++) {
      const exp = parsedAfter.experience[idx];
      for (let j = 0; j < (exp.bullets ?? []).length; j++) {
        const text = String(exp.bullets?.[j] ?? "").trim().toLowerCase();
        if (text && text === target) {
          return {
            original: diff.original,
            improved: diff.improved,
            key: makeExperienceBulletKey(idx, j),
          };
        }
      }
      for (let pIdx = 0; pIdx < (exp.projects ?? []).length; pIdx++) {
        for (let j = 0; j < (exp.projects?.[pIdx]?.bullets ?? []).length; j++) {
          const text = String(exp.projects?.[pIdx]?.bullets?.[j] ?? "").trim().toLowerCase();
          if (text && text === target) {
            return {
              original: diff.original,
              improved: diff.improved,
              key: makeExperienceBulletKey(idx, j, pIdx),
            };
          }
        }
      }
    }
    return { original: diff.original, improved: diff.improved };
  });
  const refinedBulletKeys = (
    evidence?.refinedBulletKeys ??
    bulletDiffsWithKeys.map((d) => d.key).filter((k): k is string => Boolean(k))
  );
  const projectsRefined = countRefinedScopesFromBulletKeys(refinedBulletKeys);
  const bulletDiffsKeyed = bulletDiffsWithKeys.filter(
    (d): d is { original: string; improved: string; key: string } => Boolean(d.key)
  );
  const { bulletOriginalsByKey, bulletKeywordsByKey, bulletReasonByKey, strengthenedWeakKeywords } =
    buildBulletEvidenceMaps(bulletChanges, bulletDiffsKeyed);
  const selectedRejectionRisks =
    result.selectedRejectionRisks ?? input.selectedRejectionRisks ?? [];
  const fixBulletKeys = Object.entries(bulletReasonByKey)
    .filter(([, reason]) => reason.kind === "rejection_risk")
    .map(([key]) => key);
  const fixHighlightKeywords = extractFixHighlightKeywords(selectedRejectionRisks).filter((kw) =>
    afterContent.toLowerCase().includes(kw.toLowerCase())
  );
  const showKeywords = (
    strengthenedWeakKeywords.length > 0 ? strengthenedWeakKeywords : strengthenedSkills
  ).filter((kw) => afterContent.toLowerCase().includes(kw.toLowerCase()));
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
    <div className="flex-1 bg-slate-50 py-6 pb-20 sm:py-8 print:min-h-0 print:bg-white print:py-0">
      <div className="page-shell space-y-5 sm:space-y-6 print:max-w-none print:space-y-0 print:px-0">
        {/* Header */}
        <div className="flex flex-col gap-3 print:hidden">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                Your resume, upgraded for this job
              </h1>
              <p className="mt-1 text-xs text-slate-600">
                Review your optimized version, tweak anything you like, then download when you&apos;re
                ready to apply.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex shrink-0 items-center gap-2 self-start rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white shadow-sm ring-1 ring-black/10 transition hover:bg-slate-800 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 sm:px-3.5 sm:py-2.5"
            >
              <span
                aria-hidden
                className="inline-flex h-5 w-5 items-center justify-center rounded-lg bg-white/10"
              >
                ←
              </span>
              <span className="hidden sm:inline">Back to analyzer</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </div>
        </div>

        {/* Optimized resume + AI suggestions */}
        <div className="page-split-grid print:block">
          {/* Optimized resume */}
          <div className="space-y-2 print:space-y-0" id="optimized-resume-preview">
            <div className="print:hidden space-y-1">
              <h2 className="text-sm font-semibold text-slate-700">Your tailored resume</h2>
              <p className="max-w-2xl text-xs leading-relaxed text-slate-500">
                Green highlights show fixes you selected and the keywords they added. Click{" "}
                <span className="font-medium">Edit</span> on any section to adjust wording before you
                download.
              </p>
            </div>
            <StructuredResume
              resume={parsedAfter}
              highlightKeywords={showKeywords}
              quantifiedBullets={quantifiedBullets}
              highlightedBullets={highlightedBullets}
              refinedBulletKeys={evidence?.refinedBulletKeys}
              newBulletKeys={evidence?.newBulletKeys}
              keywordBullets={keywordBullets}
              newBullets={newBullets}
              highlightOptimizedSummary
              showJdAlignedSummaryBadge={result.summaryOptimized === true}
              originalSummary={originalSummary}
              bulletOriginalsByKey={bulletOriginalsByKey}
              bulletKeywordsByKey={bulletKeywordsByKey}
              bulletReasonByKey={bulletReasonByKey}
              fixBulletKeys={fixBulletKeys}
              fixHighlightKeywords={fixHighlightKeywords}
              showOptimizationLegend
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
                  prev ? syncResumeSkills({ ...prev, skills: value }) : prev
                )
              }
              onUpdateSkillGroups={(groups: ResumeSkillGroup[]) =>
                setEditableResume((prev) =>
                  prev ? syncResumeSkills({ ...prev, skillGroups: groups }) : prev
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
              onUpdateProjectTitle={(expIndex, projectIndex, value) =>
                setEditableResume((prev) => {
                  if (!prev) return prev;
                  return {
                    ...prev,
                    experience: prev.experience.map((exp, i) => {
                      if (i !== expIndex) return exp;
                      const projects = exp.projects ?? [];
                      return {
                        ...exp,
                        projects: projects.map((project, pIdx) =>
                          pIdx === projectIndex
                            ? { ...project, title: value }
                            : project
                        ),
                      };
                    }),
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
              onUpdateCertificationLine={(index, line) =>
                setEditableResume((prev) => {
                  if (!prev) return prev;
                  const certifications = [...(prev.certifications ?? [])];
                  certifications[index] = line;
                  return { ...prev, certifications };
                })
              }
              onUpdateAwardLine={(index, line) =>
                setEditableResume((prev) => {
                  if (!prev) return prev;
                  const awards = [...(prev.awards ?? [])];
                  awards[index] = line;
                  return { ...prev, awards };
                })
              }
            />
          </div>

          {/* Optimization summary */}
          <div className="space-y-2 print:hidden">
            <ResumeOptimizationPanel
              surfacedKeywords={showKeywords}
              bulletsRefined={result.bulletImprovements}
              bulletsAdded={result.bulletsAdded ?? 0}
              projectsRefined={projectsRefined}
              summaryTailored={result.summaryOptimized === true}
              jdGapsRemaining={jdGaps.length}
              jdGapDetails={jdGapDetails}
              weakKeywordsStrengthened={strengthenedWeakKeywords.length}
              selectedFixes={selectedRejectionRisks}
              availableRecommendedFixes={
                input.analyzeResult.evidence_dashboard?.riskAreas ?? []
              }
              improvedSkillProof={result.improvedSkillProof}
              evidenceMatchDelta={result.evidenceMatchDelta}
              atsScoreReference={
                result.atsScoreReference ?? input.analyzeResult.ats_score
              }
              onScrollToPreview={() => {
                document
                  .getElementById("optimized-resume-preview")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              onDownloadPdf={() => {
                void handleDownloadPdf("optimize_panel");
              }}
              onDownloadDocx={() => {
                void handleDownloadDocx("optimize_panel");
              }}
            />
            {isUnlockingDownload ? (
              <p className="text-xs text-slate-600">
                Unlocking download and opening secure checkout...
              </p>
            ) : null}
          </div>
        </div>

        <DownloadPaymentSuccessModal
          open={downloadPaidSuccessOpen}
          onClose={() => setDownloadPaidSuccessOpen(false)}
          isBusy={isUnlockingDownload}
          onDownloadPdf={async () => {
            try {
              await handleDownloadPdf("payment_success_modal");
            } finally {
              setDownloadPaidSuccessOpen(false);
            }
          }}
          onDownloadEditable={async () => {
            try {
              await handleDownloadDocx("payment_success_modal");
            } finally {
              setDownloadPaidSuccessOpen(false);
            }
          }}
        />
      </div>
    </div>
  );
}
