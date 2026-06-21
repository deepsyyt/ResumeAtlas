import type { ResumeDocument } from "@/app/lib/resumeDocument";
import { resumeDocumentToPlainText } from "@/app/lib/resumeDocument";
import { AUDIT_SYSTEM_PROMPT } from "@/app/lib/optimizePrompts";
import type { JdGapDetail } from "@/app/lib/skillGapRules";

const API_URL = "https://api.anthropic.com/v1/messages";

const METRIC_RE =
  /(\d[\d.,]*\s*%|\$\s*\d[\d.,]*|\d[\d.,]*\s*(x|k|m|b|million|billion|users?|customers?|tickets?|projects?|hours?|days?|weeks?|months?|years?))/gi;

export type BulletDiff = {
  key: string;
  company: string;
  role: string;
  projectTitle?: string;
  original: string;
  optimized: string;
};

export type RefinementEvidence = {
  /** Final text of existing bullets changed vs the pre-optimization resume. */
  refinedBullets: string[];
  /** Final text of bullets that did not exist in the pre-optimization resume. */
  newBullets: string[];
  /** Stable keys for highlight matching in the preview UI. */
  refinedBulletKeys: string[];
  newBulletKeys: string[];
  /** Pairs for optional before/after UI. */
  bulletDiffs: Array<{ original: string; improved: string; key: string }>;
  originalSummary?: string;
  summaryOptimized: boolean;
  /** JD terms intentionally left out of the resume. */
  jdGaps: string[];
  /** Per-gap evidence for the optimization panel (JD source + resume checks). */
  jdGapDetails?: JdGapDetail[];
};

export function buildRefinementEvidence(
  before: ResumeDocument,
  after: ResumeDocument,
  jdGaps: string[],
  jdGapDetails?: JdGapDetail[]
): RefinementEvidence {
  const diffs = collectResumeBulletDiffs(before, after);
  const refined = diffs.filter((d) => d.original.trim());
  const added = diffs.filter((d) => !d.original.trim());
  const summaryOptimized =
    normalizeCompareText(before.summary ?? "") !== normalizeCompareText(after.summary ?? "");
  return {
    refinedBullets: refined.map((d) => d.optimized),
    newBullets: added.map((d) => d.optimized),
    refinedBulletKeys: refined.map((d) => d.key),
    newBulletKeys: added.map((d) => d.key),
    bulletDiffs: diffs.map((d) => ({
      original: d.original,
      improved: d.optimized,
      key: d.key,
    })),
    originalSummary: before.summary?.trim() || undefined,
    summaryOptimized,
    jdGaps: jdGaps.filter(Boolean),
    jdGapDetails: jdGapDetails?.filter((d) => d.phrase?.trim()),
  };
}

export type AuditReview = {
  key: string;
  risk_level: "Low" | "Medium" | "High";
  reason: string;
  reject: boolean;
  recommended_fix?: string;
};

export type SummaryAuditReview = {
  risk_level: "Low" | "Medium" | "High";
  reason: string;
  reject: boolean;
  recommended_fix?: string;
};

export type AuditResult = {
  reviews: AuditReview[];
  summary_review?: SummaryAuditReview;
  deterministic_rejects: string[];
};

function normalizeCompareText(text: string): string {
  return String(text ?? "")
    .replace(/\r?\n+/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim()
    .toLowerCase();
}

function extractMetrics(text: string): string[] {
  return Array.from(String(text ?? "").matchAll(METRIC_RE)).map((m) => m[0].toLowerCase());
}

function hasNewUnsupportedMetrics(
  originalBullet: string,
  optimizedBullet: string,
  fullResumeText: string
): string[] {
  const resumeLower = fullResumeText.toLowerCase();
  const originalMetrics = new Set(extractMetrics(originalBullet));
  return extractMetrics(optimizedBullet).filter(
    (metric) => !originalMetrics.has(metric) && !resumeLower.includes(metric)
  );
}

function parseBulletKey(key: string): {
  expIndex: number;
  projectIndex?: number;
  bulletIndex: number;
} | null {
  const parts = key.split(":");
  if (parts.length < 2) return null;
  const expIndex = Number.parseInt(parts[0] ?? "", 10);
  if (!Number.isFinite(expIndex)) return null;
  if (parts[1]?.startsWith("p")) {
    const projectIndex = Number.parseInt(parts[1].slice(1), 10);
    const bulletIndex = Number.parseInt(parts[2] ?? "", 10);
    if (!Number.isFinite(projectIndex) || !Number.isFinite(bulletIndex)) return null;
    return { expIndex, projectIndex, bulletIndex };
  }
  const bulletIndex = Number.parseInt(parts[1] ?? "", 10);
  if (!Number.isFinite(bulletIndex)) return null;
  return { expIndex, bulletIndex };
}

/** Collect bullet-level diffs between pre- and post-optimization resumes. */
export function collectResumeBulletDiffs(
  before: ResumeDocument,
  after: ResumeDocument
): BulletDiff[] {
  const diffs: BulletDiff[] = [];

  before.experience.forEach((exp, expIndex) => {
    const afterExp = after.experience[expIndex];
    if (!afterExp) return;

    const beforeBullets = exp.bullets ?? [];
    const afterBullets = afterExp.bullets ?? [];
    const roleBulletCount = Math.max(beforeBullets.length, afterBullets.length);
    for (let bulletIndex = 0; bulletIndex < roleBulletCount; bulletIndex++) {
      const original = beforeBullets[bulletIndex] ?? "";
      const optimized = afterBullets[bulletIndex] ?? "";
      if (!original.trim() && !optimized.trim()) continue;
      if (normalizeCompareText(original) === normalizeCompareText(optimized)) continue;
      diffs.push({
        key: `${expIndex}:${bulletIndex}`,
        company: exp.company ?? "",
        role: exp.role ?? "",
        original: original.trim(),
        optimized: optimized.trim(),
      });
    }

    const beforeProjects = exp.projects ?? [];
    const afterProjects = afterExp.projects ?? [];
    const projectCount = Math.max(beforeProjects.length, afterProjects.length);
    for (let projectIndex = 0; projectIndex < projectCount; projectIndex++) {
      const beforeProj = beforeProjects[projectIndex];
      const afterProj = afterProjects[projectIndex];
      const beforeBullets = beforeProj?.bullets ?? [];
      const afterBullets = afterProj?.bullets ?? [];
      const bulletCount = Math.max(beforeBullets.length, afterBullets.length);
      for (let bulletIndex = 0; bulletIndex < bulletCount; bulletIndex++) {
        const original = beforeBullets[bulletIndex] ?? "";
        const optimized = afterBullets[bulletIndex] ?? "";
        if (!original.trim() && !optimized.trim()) continue;
        if (normalizeCompareText(original) === normalizeCompareText(optimized)) continue;
        diffs.push({
          key: `${expIndex}:p${projectIndex}:${bulletIndex}`,
          company: exp.company ?? "",
          role: exp.role ?? "",
          projectTitle: beforeProj?.title ?? afterProj?.title,
          original: original.trim(),
          optimized: optimized.trim(),
        });
      }
    }
  });

  return diffs;
}

function deterministicRejectReview(diff: BulletDiff, _sourceResumeText: string): AuditReview | null {
  if (!diff.optimized.trim()) {
    return {
      key: diff.key,
      risk_level: "High",
      reason: "Empty bullet after optimization.",
      reject: true,
      recommended_fix: "Rewrite the bullet with demonstrated work and impact.",
    };
  }
  return null;
}

function parseStrictJsonFromLLM(raw: string): unknown | null {
  const str = raw.trim();
  const start = str.indexOf("{");
  const end = str.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  try {
    return JSON.parse(str.slice(start, end + 1));
  } catch {
    return null;
  }
}

export async function auditOptimizedResume(args: {
  before: ResumeDocument;
  after: ResumeDocument;
  jobDescription: string;
  apiKey: string | undefined;
  model: string;
  maxOutputTokens: number;
  jdChars: number;
}): Promise<AuditResult> {
  const sourceResumeText = resumeDocumentToPlainText(args.before) ?? "";
  const diffs = collectResumeBulletDiffs(args.before, args.after);
  const summaryChanged =
    normalizeCompareText(args.before.summary ?? "") !==
    normalizeCompareText(args.after.summary ?? "");

  const deterministicReviews = diffs
    .map((diff) => deterministicRejectReview(diff, sourceResumeText))
    .filter((review): review is AuditReview => review !== null);

  const deterministicRejectKeys = new Set<string>(
    deterministicReviews.filter((r) => r.reject).map((r) => r.key)
  );

  if (!args.apiKey || (diffs.length === 0 && !summaryChanged)) {
    return {
      reviews: deterministicReviews,
      summary_review: undefined,
      deterministic_rejects: Array.from(deterministicRejectKeys),
    };
  }

  const pendingDiffs = diffs.filter((d) => !deterministicRejectKeys.has(d.key));
  if (pendingDiffs.length === 0 && !summaryChanged) {
    return {
      reviews: deterministicReviews,
      summary_review: undefined,
      deterministic_rejects: Array.from(deterministicRejectKeys),
    };
  }

  const userPayload = {
    job_description: args.jobDescription.slice(0, args.jdChars),
    source_resume: sourceResumeText.slice(0, 12000),
    summary_changed: summaryChanged,
    original_summary: args.before.summary ?? "",
    optimized_summary: args.after.summary ?? "",
    changed_bullets: pendingDiffs.map((d) => ({
      key: d.key,
      company: d.company,
      role: d.role,
      project: d.projectTitle ?? null,
      original: d.original,
      optimized: d.optimized,
    })),
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": args.apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: args.model,
      max_tokens: args.maxOutputTokens,
      temperature: 0,
      system: AUDIT_SYSTEM_PROMPT,
      messages: [{ role: "user" as const, content: JSON.stringify(userPayload, null, 2) }],
    }),
  });

  if (!response.ok) {
    return {
      reviews: deterministicReviews,
      summary_review: undefined,
      deterministic_rejects: Array.from(deterministicRejectKeys),
    };
  }

  const data = (await response.json().catch(() => null)) as
    | { content?: { type: string; text?: string }[] }
    | null;
  const raw = data?.content?.find((c) => c.type === "text")?.text ?? "";
  const parsed = parseStrictJsonFromLLM(raw) as
    | {
        reviews?: Array<Record<string, unknown>>;
        summary_review?: Record<string, unknown>;
      }
    | null;

  const llmReviews: AuditReview[] = Array.isArray(parsed?.reviews)
    ? parsed.reviews.reduce<AuditReview[]>((acc, row) => {
        const key = typeof row.key === "string" ? row.key.trim() : "";
        if (!key) return acc;
        const risk = String(row.risk_level ?? "Medium");
        const risk_level =
          risk === "Low" || risk === "High" ? risk : ("Medium" as const);
        acc.push({
          key,
          risk_level,
          reason: typeof row.reason === "string" ? row.reason.trim() : "Audit flagged risk.",
          reject: row.reject === true || risk_level === "High",
          ...(typeof row.recommended_fix === "string" && row.recommended_fix.trim()
            ? { recommended_fix: row.recommended_fix.trim() }
            : {}),
        });
        return acc;
      }, [])
    : [];

  let summary_review: SummaryAuditReview | undefined;
  if (summaryChanged && parsed?.summary_review && typeof parsed.summary_review === "object") {
    const sr = parsed.summary_review;
    const risk = String(sr.risk_level ?? "Medium");
    const risk_level = risk === "Low" || risk === "High" ? risk : ("Medium" as const);
    summary_review = {
      risk_level,
      reason:
        typeof sr.reason === "string" ? sr.reason.trim() : "Summary rewrite flagged by audit.",
      reject: sr.reject === true || risk_level === "High",
      recommended_fix:
        typeof sr.recommended_fix === "string" ? sr.recommended_fix.trim() : undefined,
    };
  }

  const mergedByKey = new Map<string, AuditReview>();
  for (const review of deterministicReviews) mergedByKey.set(review.key, review);
  for (const review of llmReviews) mergedByKey.set(review.key, review);

  return {
    reviews: Array.from(mergedByKey.values()),
    summary_review,
    deterministic_rejects: Array.from(deterministicRejectKeys),
  };
}

export function applyAuditRejections(
  optimized: ResumeDocument,
  before: ResumeDocument,
  audit: AuditResult
): ResumeDocument {
  const rejectKeys = new Set(
    audit.reviews.filter((r) => r.reject).map((r) => r.key)
  );
  const rejectSummary = audit.summary_review?.reject === true;

  if (rejectKeys.size === 0 && !rejectSummary) return optimized;

  const next: ResumeDocument = {
    ...optimized,
    experience: optimized.experience.map((exp) => ({
      ...exp,
      bullets: [...(exp.bullets ?? [])],
      projects: (exp.projects ?? []).map((proj) => ({
        ...proj,
        bullets: [...(proj.bullets ?? [])],
      })),
    })),
  };

  if (rejectSummary) {
    next.summary = before.summary;
  }

  const keysToRevert: string[] = [];
  const keysToRemove: Array<{ key: string; parsed: NonNullable<ReturnType<typeof parseBulletKey>> }> =
    [];

  for (const key of Array.from(rejectKeys)) {
    const parsed = parseBulletKey(key);
    if (!parsed) continue;
    const beforeExp = before.experience[parsed.expIndex];
    if (!beforeExp) continue;

    let original = "";
    if (parsed.projectIndex !== undefined) {
      original = beforeExp.projects?.[parsed.projectIndex]?.bullets?.[parsed.bulletIndex] ?? "";
    } else {
      original = beforeExp.bullets?.[parsed.bulletIndex] ?? "";
    }

    if (!original.trim()) {
      keysToRemove.push({ key, parsed });
    } else {
      keysToRevert.push(key);
    }
  }

  for (const key of keysToRevert) {
    const parsed = parseBulletKey(key);
    if (!parsed) continue;
    const beforeExp = before.experience[parsed.expIndex];
    const nextExp = next.experience[parsed.expIndex];
    if (!beforeExp || !nextExp) continue;

    if (parsed.projectIndex !== undefined) {
      const beforeProj = beforeExp.projects?.[parsed.projectIndex];
      const nextProj = nextExp.projects?.[parsed.projectIndex];
      if (!nextProj) continue;
      nextProj.bullets[parsed.bulletIndex] =
        beforeProj?.bullets?.[parsed.bulletIndex] ?? "";
      continue;
    }

    nextExp.bullets[parsed.bulletIndex] = beforeExp.bullets?.[parsed.bulletIndex] ?? "";
  }

  keysToRemove.sort((a, b) => {
    if (a.parsed.expIndex !== b.parsed.expIndex) {
      return a.parsed.expIndex - b.parsed.expIndex;
    }
    const aProject = a.parsed.projectIndex ?? -1;
    const bProject = b.parsed.projectIndex ?? -1;
    if (aProject !== bProject) return aProject - bProject;
    return b.parsed.bulletIndex - a.parsed.bulletIndex;
  });

  for (const { parsed } of keysToRemove) {
    const nextExp = next.experience[parsed.expIndex];
    if (!nextExp) continue;

    if (parsed.projectIndex !== undefined) {
      const nextProj = nextExp.projects?.[parsed.projectIndex];
      if (!nextProj) continue;
      nextProj.bullets.splice(parsed.bulletIndex, 1);
      continue;
    }

    nextExp.bullets.splice(parsed.bulletIndex, 1);
  }

  return next;
}
