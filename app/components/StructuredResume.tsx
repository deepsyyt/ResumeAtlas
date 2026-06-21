"use client";

import type { ResumeDocument, ResumeSkillGroup } from "@/app/lib/resumeDocument";
import { formatSkillGroupLine, getSkillGroups } from "@/app/lib/resumeDocument";
import { sanitizeResumeProse } from "@/app/lib/resumeTypography";
import { makeExperienceBulletKey } from "@/app/lib/optimizeExperience";
import type { BulletRefinementReason } from "@/app/lib/optimizeBulletEvidence";
import {
  filterTermsPresentInText,
  strictTermHighlightPattern,
} from "@/app/lib/resumeTermMatch";
import React from "react";

type StructuredResumeProps = {
  resume: ResumeDocument;
  highlightKeywords?: string[];
  /** Bullet texts that should have numeric metrics highlighted (quantified achievements). */
  quantifiedBullets?: string[];
  /** Bullet texts that should be highlighted as rewritten/improved. */
  highlightedBullets?: string[];
  /** Stable bullet keys for refined lines (preferred over text matching). */
  refinedBulletKeys?: string[];
  /** Stable bullet keys for newly added lines. */
  newBulletKeys?: string[];
  /** Bullet texts where JD keywords were newly added. */
  keywordBullets?: string[];
  /** Entirely new bullets added during optimization (not rewrites of prior lines). */
  newBullets?: string[];
  /** On optimized preview: emphasize JD keywords + numeric metrics in the professional summary. */
  highlightOptimizedSummary?: boolean;
  /** When using highlightOptimizedSummary, show the “Job-aligned” chip only if true (e.g. API summaryOptimized). */
  showJdAlignedSummaryBadge?: boolean;
  /** Pre-optimization summary for before/after evidence in the preview. */
  originalSummary?: string;
  /** Pre-optimization bullet text keyed by stable bullet key (refined bullets only). */
  bulletOriginalsByKey?: Record<string, string>;
  /** Weak keywords strengthened per refined bullet key. */
  bulletKeywordsByKey?: Record<string, string[]>;
  /** Why each refined bullet was rewritten. */
  bulletReasonByKey?: Record<string, BulletRefinementReason>;
  /** Stable keys for bullets that address a selected recommended fix. */
  fixBulletKeys?: string[];
  /** Numbered fix indices per bullet key (Fix 1, Fix 2, …). */
  bulletFixIndicesByKey?: Record<string, number[]>;
  /** Numbered proof indices per bullet key (Proof 1, Proof 2, …). */
  bulletProofIndicesByKey?: Record<string, number[]>;
  /** Numbered impact indices per bullet key (Impact 1, Impact 2). */
  bulletImpactIndicesByKey?: Record<string, number[]>;
  /** Global fix-related terms to highlight when they appear in fix bullets. */
  fixHighlightKeywords?: string[];
  /** Per-bullet fix proof terms (Jenkins, CI/CD, etc.) — preferred over global highlights. */
  bulletFixHighlightKeywordsByKey?: Record<string, string[]>;
  /** JD topic tags per stable bullet key (refined bullets only). */
  bulletTopicTags?: Record<string, string[]>;
  /** JD topic tags for tailored summary. */
  summaryTopicTags?: string[];
  /** Show color-key legend above the resume body. */
  showOptimizationLegend?: boolean;
  /** When true, cap height and scroll inside the card (modals). Default: natural document height. */
  scrollable?: boolean;
  editable?: boolean;
  onUpdateSummary?: (value: string) => void;
  onUpdateSkills?: (value: string[]) => void;
  onUpdateSkillGroups?: (groups: ResumeSkillGroup[]) => void;
  onUpdateExperienceBullet?: (
    expIndex: number,
    bulletIndex: number,
    value: string,
    ctx?: { projectIndex: number }
  ) => void;
  onUpdateExperienceField?: (
    expIndex: number,
    field: "role" | "company" | "dates",
    value: string
  ) => void;
  onUpdateProjectTitle?: (
    expIndex: number,
    projectIndex: number,
    value: string
  ) => void;
  onUpdateEducationLine?: (eduIndex: number, line: string) => void;
  onUpdateCertificationLine?: (index: number, line: string) => void;
  onUpdateAwardLine?: (index: number, line: string) => void;
  onUpdateResumeMeta?: (
    patch: Partial<Pick<ResumeDocument, "name" | "title" | "contact">>
  ) => void;
};

function highlightKeywordsInText(
  text: string,
  keywords: string[] | undefined,
  variant: "sky" | "amber" | "emerald" | "violet" = "sky"
): React.ReactNode[] {
  const list = keywords?.filter((k) => k.trim().length > 0) ?? [];
  if (list.length === 0) return [text];

  const useStrictBoundaries = variant === "amber" || variant === "emerald" || variant === "violet";
  const present = useStrictBoundaries ? filterTermsPresentInText(text, list) : list;
  if (present.length === 0) return [text];

  const escaped = present
    .map((k) => (useStrictBoundaries ? strictTermHighlightPattern(k) : k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")))
    .filter((p) => p.length > 0)
    .sort((a, b) => b.length - a.length);
  const re = new RegExp(`(${escaped.join("|")})`, useStrictBoundaries ? "gi" : "gi");
  const parts = text.split(re);
  const markClass =
    variant === "emerald"
      ? "rounded bg-emerald-100 px-0.5 font-semibold text-emerald-950 ring-1 ring-emerald-200/80 print:bg-transparent print:px-0 print:font-inherit print:text-inherit print:ring-0"
      : variant === "amber"
        ? "rounded bg-amber-100 px-0.5 font-semibold text-amber-950 ring-1 ring-amber-200/80 print:bg-transparent print:px-0 print:font-inherit print:text-inherit print:ring-0"
        : variant === "violet"
          ? "rounded bg-violet-100 px-0.5 font-semibold text-violet-950 ring-1 ring-violet-200/80 print:bg-transparent print:px-0 print:font-inherit print:text-inherit print:ring-0"
          : "rounded bg-sky-100 px-0.5 font-medium text-sky-900 print:bg-transparent print:px-0 print:font-inherit print:text-inherit";

  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <mark key={`kw-${variant}-${i}`} className={markClass}>
        {part}
      </mark>
    ) : (
      part
    )
  );
}

/** Word-safe highlighting for fix proof terms (avoids matching "app" inside unrelated words). */
function highlightFixTermsInText(text: string, terms: string[]): React.ReactNode[] {
  const list = filterTermsPresentInText(text, terms);
  if (list.length === 0) return [text];

  const patterns = list.map((term) => strictTermHighlightPattern(term)).filter((p) => p.length > 0);
  const re = new RegExp(`(${patterns.join("|")})`, "gi");
  const parts = text.split(re);
  const markClass =
    "rounded bg-emerald-100 px-0.5 font-semibold text-emerald-950 ring-1 ring-emerald-200/80 print:bg-transparent print:px-0 print:font-inherit print:text-inherit print:ring-0";

  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <mark key={`fix-${i}`} className={markClass}>
        {part}
      </mark>
    ) : (
      part
    )
  );
}

type KeywordHighlightSet = {
  keywords: string[];
  variant: "emerald" | "amber" | "violet";
};

/** Apply multiple keyword highlight colors (fix → weak keyword → impact priority for overlaps). */
function highlightKeywordSetsInText(text: string, sets: KeywordHighlightSet[]): React.ReactNode[] {
  const active = sets.filter((s) => s.keywords.length > 0);
  if (active.length === 0) return [text];
  if (active.length === 1) {
    return highlightKeywordsInText(text, active[0]!.keywords, active[0]!.variant);
  }

  let nodes: React.ReactNode[] = [text];
  for (const set of active) {
    const next: React.ReactNode[] = [];
    for (const node of nodes) {
      if (typeof node !== "string") {
        next.push(node);
        continue;
      }
      const highlighted = highlightKeywordsInText(node, set.keywords, set.variant);
      next.push(...highlighted);
    }
    nodes = next;
  }
  return nodes;
}

function JdTopicTag({ topic }: { topic: string }) {
  return (
    <span className="inline-flex rounded-full bg-green-100 px-1.5 py-0.5 text-[10px] font-semibold text-green-900 ring-1 ring-green-200">
      {topic}
    </span>
  );
}

const SECTION_HEADING_CLASS =
  "text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2";

function ResumeListSection({
  title,
  lines,
  editable,
  editing,
  onToggleEdit,
  onUpdateLine,
}: {
  title: string;
  lines: string[];
  editable: boolean;
  editing: boolean;
  onToggleEdit: () => void;
  onUpdateLine?: (index: number, value: string) => void;
}) {
  if (lines.length === 0) return null;
  return (
    <section className="border-t border-slate-100 pt-4 mt-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <h2 className={SECTION_HEADING_CLASS}>{title}</h2>
        {editable ? (
          <button
            type="button"
            onClick={onToggleEdit}
            className="rounded border border-slate-300 bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-700 hover:bg-slate-50 print:hidden"
          >
            {editing ? "Done" : "Edit"}
          </button>
        ) : null}
      </div>
      <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
        {lines.map((line, idx) => (
          <li key={`${title}-${idx}`}>
            {editable && editing ? (
              <input
                value={line}
                onChange={(e) => onUpdateLine?.(idx, e.target.value)}
                className="w-full rounded-md border border-slate-300 bg-white px-2 py-1 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400"
              />
            ) : (
              line
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

function highlightMetrics(
  nodes: React.ReactNode[],
  variant: "emerald" | "violet" = "emerald"
): React.ReactNode {
  const out: React.ReactNode[] = [];
  const metricRe = /(\d[\d.,]*(?:\s*[%+xX]?)?)/g;
  const markClass =
    variant === "violet"
      ? "rounded bg-violet-100 px-0.5 font-semibold text-violet-950 ring-1 ring-violet-200/80 print:bg-transparent print:px-0 print:font-inherit print:text-inherit print:ring-0"
      : "rounded bg-emerald-50 px-0.5 font-semibold text-emerald-800 print:bg-transparent print:px-0 print:font-inherit print:text-inherit";

  nodes.forEach((node, idx) => {
    if (typeof node !== "string") {
      out.push(<React.Fragment key={`n-${idx}`}>{node}</React.Fragment>);
      return;
    }
    const parts = node.split(metricRe);
    parts.forEach((part, j) => {
      const key = `m-${idx}-${j}`;
      if (j % 2 === 1 && part.trim().length > 0) {
        out.push(
          <mark key={key} className={markClass}>
            {part}
          </mark>
        );
      } else if (part) {
        out.push(<React.Fragment key={key}>{part}</React.Fragment>);
      }
    });
  });

  return <>{out}</>;
}

function sanitizeBulletText(text: string): string {
  return sanitizeResumeProse(
    String(text ?? "")
      .replace(/^\s*(?:optimized|optimised|rewritten|improved)\s+bullet\s*:\s*/i, "")
      .replace(/^\s*bullet\s*:\s*/i, "")
      .replace(/\r?\n+/g, " ")
      .replace(/\s{2,}/g, " ")
      .trim()
  );
}

function normalizeBulletKey(text: string): string {
  return sanitizeBulletText(text).toLowerCase();
}

type ExperienceBulletRowProps = {
  text: string;
  bulletIndex: number;
  expIndex: number;
  projectIndex?: number;
  editable: boolean;
  editingExperience: boolean;
  onUpdateExperienceBullet?: StructuredResumeProps["onUpdateExperienceBullet"];
  highlightedSet: Set<string>;
  refinedKeySet: Set<string>;
  newKeySet: Set<string>;
  bulletKey: string;
  quantifiedSet: Set<string>;
  newBulletSet: Set<string>;
  strengthenedKeywords?: string[];
  bulletFixHighlightKeywords?: string[];
  fixKeySet: Set<string>;
  originalBullet?: string;
  refinementReason?: BulletRefinementReason;
  fixIndices?: number[];
  impactIndices?: number[];
};

function ExperienceBulletRow({
  text,
  bulletIndex,
  expIndex,
  projectIndex,
  editable,
  editingExperience,
  onUpdateExperienceBullet,
  highlightedSet,
  refinedKeySet,
  newKeySet,
  bulletKey,
  quantifiedSet,
  newBulletSet,
  strengthenedKeywords = [],
  bulletFixHighlightKeywords = [],
  fixKeySet,
  originalBullet,
  refinementReason,
  fixIndices = [],
  impactIndices = [],
}: ExperienceBulletRowProps) {
  const key = normalizeBulletKey(text);
  const ctx =
    projectIndex === undefined ? undefined : { projectIndex };

  const isFixBullet =
    fixKeySet.has(bulletKey) || refinementReason?.kind === "rejection_risk";
  const isNewBullet = newKeySet.has(bulletKey) || newBulletSet.has(key);
  const isRewritten =
    !isNewBullet && (refinedKeySet.has(bulletKey) || highlightedSet.has(key));
  const weakKeywordHighlightTerms =
    strengthenedKeywords.length > 0
      ? strengthenedKeywords
      : refinementReason?.kind === "weak_keyword"
        ? refinementReason.keywords
        : [];
  const fixKeywords = isFixBullet ? filterTermsPresentInText(text, bulletFixHighlightKeywords) : [];
  const weakKeywords = filterTermsPresentInText(text, weakKeywordHighlightTerms);
  const isWeakKeyword = !isFixBullet && weakKeywords.length > 0;
  const isImpactBullet =
    !isFixBullet && impactIndices.length > 0;
  const isQuantified =
    isImpactBullet &&
    (quantifiedSet.has(key) ||
      (refinementReason?.kind === "impact_polish" && refinementReason.quantified) ||
      impactIndices.length > 0);

  const hasFixProof = fixKeywords.length > 0;
  const showFixCallout = isFixBullet && (hasFixProof || fixIndices.length > 0);

  const highlightSets: KeywordHighlightSet[] = [];
  if (!hasFixProof && fixKeywords.length > 0) {
    highlightSets.push({ keywords: fixKeywords, variant: "emerald" });
  }
  if (weakKeywords.length > 0) {
    highlightSets.push({ keywords: weakKeywords, variant: "amber" });
  }

  const hasCallout =
    showFixCallout || isWeakKeyword || isImpactBullet || isNewBullet;
  const calloutClass = [
    hasCallout ? "rounded-md px-2 py-1.5 print:bg-transparent print:px-0 print:py-0 print:ring-0 print:border-l-0" : "py-0.5",
    showFixCallout ? "bg-emerald-50/95 ring-1 ring-emerald-200 border-l-2 border-emerald-500" : "",
    !showFixCallout && isImpactBullet
      ? "bg-violet-50 ring-1 ring-violet-200 border-l-2 border-violet-500"
      : "",
    !showFixCallout && !isImpactBullet && isWeakKeyword
      ? "bg-amber-50/90 ring-1 ring-amber-200 border-l-2 border-amber-500"
      : "",
    !showFixCallout && !isWeakKeyword && !isImpactBullet && isNewBullet
      ? "bg-slate-50 ring-1 ring-slate-200 border-l-2 border-slate-400"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  let renderedText: React.ReactNode[];
  if (hasFixProof) {
    const base =
      weakKeywords.length > 0
        ? highlightKeywordSetsInText(text, [{ keywords: weakKeywords, variant: "amber" }])
        : [text];
    renderedText = base.flatMap((node, i) =>
      typeof node === "string"
        ? highlightFixTermsInText(node, fixKeywords).map((part, j) =>
            typeof part === "string" ? (
              part
            ) : (
              <React.Fragment key={`fix-wrap-${i}-${j}`}>{part}</React.Fragment>
            )
          )
        : [<React.Fragment key={`node-${i}`}>{node}</React.Fragment>]
    );
  } else if (highlightSets.length > 0) {
    renderedText = highlightKeywordSetsInText(text, highlightSets);
  } else {
    renderedText = [text];
  }

  const finalNodes = isImpactBullet
    ? highlightMetrics(renderedText, "violet")
    : renderedText.map((node, k) => <React.Fragment key={k}>{node}</React.Fragment>);

  return (
    <li className="m-0 flex list-none items-start gap-2">
      <span
        className="mt-1.5 w-3 shrink-0 select-none text-center text-sm text-slate-600"
        aria-hidden
      >
        •
      </span>
      <div className={`min-w-0 flex-1 text-sm leading-relaxed text-slate-700 ${calloutClass}`}>
        {editable && editingExperience ? (
          <textarea
            value={text}
            onChange={(e) =>
              onUpdateExperienceBullet?.(expIndex, bulletIndex, e.target.value, ctx)
            }
            className="w-full rounded-md border border-slate-300 bg-white px-2 py-1 text-sm leading-relaxed text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-400"
            rows={2}
          />
        ) : (
          finalNodes
        )}
        {isRewritten &&
        originalBullet?.trim() &&
        originalBullet.trim().toLowerCase() !== text.toLowerCase() ? (
          <details className="mt-1.5 print:hidden">
            <summary className="cursor-pointer text-[10px] font-semibold text-slate-500 hover:text-slate-700">
              View original bullet
            </summary>
            <p className="mt-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs leading-relaxed text-slate-600">
              {originalBullet.trim()}
            </p>
          </details>
        ) : null}
        {hasCallout ? (
          <span className="ml-2 inline-flex flex-wrap gap-1 align-middle print:hidden">
            {showFixCallout && fixIndices.length > 0 ? (
              <span className="inline-flex rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-950">
                Fix {fixIndices[0]}
              </span>
            ) : showFixCallout ? (
              <span className="inline-flex rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-950">
                Fix applied
              </span>
            ) : null}
            {isWeakKeyword ? (
              <span className="inline-flex rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-950">
                Keyword proven
              </span>
            ) : null}
            {isImpactBullet ? (
              <span className="inline-flex rounded-full bg-violet-100 px-1.5 py-0.5 text-[10px] font-semibold text-violet-900">
                {impactIndices.length > 0
                  ? `Impact ${impactIndices[0]}`
                  : isQuantified
                    ? "Impact quantified"
                    : "Impact refined"}
              </span>
            ) : null}
            {isNewBullet ? (
              <span className="inline-flex rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-700">
                New bullet
              </span>
            ) : null}
          </span>
        ) : null}
      </div>
    </li>
  );
}

export function StructuredResume({
  resume,
  highlightKeywords,
  quantifiedBullets,
  highlightedBullets,
  refinedBulletKeys,
  newBulletKeys,
  keywordBullets,
  newBullets,
  highlightOptimizedSummary = false,
  showJdAlignedSummaryBadge = false,
  originalSummary,
  bulletOriginalsByKey,
  bulletKeywordsByKey,
  bulletReasonByKey,
  fixBulletKeys,
  bulletFixIndicesByKey,
  bulletProofIndicesByKey,
  bulletImpactIndicesByKey,
  bulletFixHighlightKeywordsByKey,
  bulletTopicTags,
  summaryTopicTags = [],
  showOptimizationLegend = false,
  scrollable = false,
  editable = false,
  onUpdateSummary,
  onUpdateSkills,
  onUpdateSkillGroups,
  onUpdateExperienceBullet,
  onUpdateExperienceField,
  onUpdateProjectTitle,
  onUpdateEducationLine,
  onUpdateCertificationLine,
  onUpdateAwardLine,
  onUpdateResumeMeta,
}: StructuredResumeProps) {
  const name = resume.name?.trim() ?? "";
  const title = resume.title?.trim() ?? "";
  const contact = resume.contact?.trim() ?? "";
  const summary = resume.summary?.trim() ?? "";
  const skillGroups = React.useMemo(() => getSkillGroups(resume), [resume]);
  const skills = resume.skills ?? [];
  const experience = resume.experience ?? [];
  const education = resume.education ?? [];
  const highlightedSet = React.useMemo(
    () => new Set((highlightedBullets ?? []).map((b) => normalizeBulletKey(String(b ?? "")))),
    [highlightedBullets]
  );
  const refinedKeySet = React.useMemo(
    () => new Set(refinedBulletKeys ?? []),
    [refinedBulletKeys]
  );
  const newKeySet = React.useMemo(() => new Set(newBulletKeys ?? []), [newBulletKeys]);
  const keywordSet = React.useMemo(
    () => new Set((keywordBullets ?? []).map((b) => normalizeBulletKey(String(b ?? "")))),
    [keywordBullets]
  );
  const quantifiedSet = React.useMemo(
    () => new Set((quantifiedBullets ?? []).map((b) => normalizeBulletKey(String(b ?? "")))),
    [quantifiedBullets]
  );
  const newBulletSet = React.useMemo(
    () => new Set((newBullets ?? []).map((b) => normalizeBulletKey(String(b ?? "")))),
    [newBullets]
  );
  const fixKeySet = React.useMemo(() => new Set(fixBulletKeys ?? []), [fixBulletKeys]);
  const certifications = resume.certifications ?? [];
  const awards = resume.awards ?? [];
  const additionalSections = resume.additionalSections ?? [];
  const [editing, setEditing] = React.useState({
    header: false,
    summary: false,
    experienceIndex: null as number | null,
    education: false,
    skills: false,
    certifications: false,
    awards: false,
  });

  const bulletEvidenceForKey = (bulletKey: string) => ({
    strengthenedKeywords: bulletKeywordsByKey?.[bulletKey] ?? [],
    bulletFixHighlightKeywords: bulletFixHighlightKeywordsByKey?.[bulletKey] ?? [],
    originalBullet: bulletOriginalsByKey?.[bulletKey],
    refinementReason: bulletReasonByKey?.[bulletKey],
    fixIndices: bulletFixIndicesByKey?.[bulletKey] ?? [],
    impactIndices: bulletImpactIndicesByKey?.[bulletKey] ?? [],
  });

  return (
    <div
      className={`min-w-0 rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 shadow-sm sm:p-6 lg:p-8 print:h-auto print:overflow-visible print:rounded-none print:border-0 print:shadow-none print:p-0 ${
        scrollable ? "max-h-[70vh] overflow-auto" : ""
      }`}
    >
      {showOptimizationLegend ? (
        <div className="mb-4 rounded-lg border border-slate-200 bg-slate-50/90 p-3 print:hidden">
          <p className="text-[10px] font-bold uppercase tracking-wide text-slate-700">
            Highlight key
          </p>
          <ul className="mt-2 flex flex-wrap gap-2 text-[10px] text-slate-600">
            <li className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm border border-indigo-300 bg-indigo-50" aria-hidden />
              Summary tailored
            </li>
            <li className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm border border-emerald-300 bg-emerald-100" aria-hidden />
              Recommended fix
            </li>
            <li className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm border border-amber-300 bg-amber-100" aria-hidden />
              Weak keyword proven
            </li>
            <li className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm border border-violet-300 bg-violet-100" aria-hidden />
              Impact enhanced
            </li>
          </ul>
        </div>
      ) : null}
      {/* Header */}
      <header className="border-b border-slate-200 pb-4 mb-4">
        {editable ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-violet-700">
                  Header details
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setEditing((prev) => ({ ...prev, header: !prev.header }))
                  }
                  className="rounded border border-slate-300 bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-700 hover:bg-slate-50 print:hidden"
                >
                  {editing.header ? "Done" : "Edit"}
                </button>
              </div>
            </div>
            {editing.header ? (
              <div className="space-y-2">
                <input
                  value={resume.name ?? ""}
                  onChange={(e) => onUpdateResumeMeta?.({ name: e.target.value })}
                  placeholder="Name"
                  className="w-full rounded-md border border-slate-300 bg-white px-2 py-1 text-2xl font-bold tracking-tight text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400"
                />
                <input
                  value={resume.title ?? ""}
                  onChange={(e) => onUpdateResumeMeta?.({ title: e.target.value })}
                  placeholder="Title / headline"
                  className="w-full rounded-md border border-slate-300 bg-white px-2 py-1 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-400"
                />
                <textarea
                  value={resume.contact ?? ""}
                  onChange={(e) => onUpdateResumeMeta?.({ contact: e.target.value })}
                  placeholder="Phone, email, location, links (one per line is fine)"
                  className="w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-400"
                  rows={4}
                />
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  {name || "Resume"}
                </h1>
                {title ? (
                  <p className="text-sm font-semibold text-slate-800 mt-0.5">{title}</p>
                ) : null}
                {contact
                  ? contact.split(/\r?\n/).map((line, i) =>
                      line.trim() ? (
                        <p key={i} className="text-xs text-slate-600 mt-0.5">
                          {line.trim()}
                        </p>
                      ) : null
                    )
                  : null}
              </>
            )}
          </div>
        ) : name || title || contact ? (
          <>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">{name || "Resume"}</h1>
            {title ? (
              <p className="text-sm font-semibold text-slate-800 mt-0.5">{title}</p>
            ) : null}
            {contact
              ? contact.split(/\r?\n/).map((line, i) =>
                  line.trim() ? (
                    <p key={i} className="text-xs text-slate-600 mt-0.5">
                      {line.trim()}
                    </p>
                  ) : null
                )
              : null}
          </>
        ) : (
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Resume</h1>
        )}
      </header>

      {/* Summary */}
      {summary && (
        <section className="border-t border-slate-100 pt-4 mt-4">
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Professional Summary
              </h2>
              {highlightOptimizedSummary && showJdAlignedSummaryBadge ? (
                <span className="print:hidden inline-flex flex-wrap items-center gap-1">
                  <span className="inline-flex rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-indigo-900 ring-1 ring-indigo-200">
                    Summary tailored
                  </span>
                  {summaryTopicTags.map((topic) => (
                    <JdTopicTag key={topic} topic={topic} />
                  ))}
                </span>
              ) : null}
            </div>
            {editable && (
              <button
                type="button"
                onClick={() =>
                  setEditing((prev) => ({ ...prev, summary: !prev.summary }))
                }
                className="rounded border border-slate-300 bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-700 hover:bg-slate-50 print:hidden"
              >
                {editing.summary ? "Done" : "Edit"}
              </button>
            )}
          </div>
          {editable && editing.summary ? (
            <textarea
              value={resume.summary ?? ""}
              onChange={(e) => onUpdateSummary?.(e.target.value)}
              className="w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm leading-relaxed text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-400"
              rows={4}
            />
          ) : (
            <p
              className={`text-sm leading-relaxed text-slate-700 ${
                highlightOptimizedSummary && showJdAlignedSummaryBadge
                  ? "rounded-md border border-indigo-200 bg-indigo-50/60 px-2 py-1.5 print:border-0 print:bg-transparent print:px-0 print:py-0"
                  : ""
              }`}
            >
              {highlightOptimizedSummary && showJdAlignedSummaryBadge ? (
                highlightMetrics(highlightKeywordsInText(summary, highlightKeywords))
              ) : (
                highlightKeywordsInText(summary, highlightKeywords).map((node, i) => (
                  <React.Fragment key={i}>{node}</React.Fragment>
                ))
              )}
            </p>
          )}
          {highlightOptimizedSummary &&
          showJdAlignedSummaryBadge &&
          originalSummary?.trim() &&
          originalSummary.trim().toLowerCase() !== summary.toLowerCase() ? (
            <details className="mt-2 print:hidden">
              <summary className="cursor-pointer text-[10px] font-semibold text-slate-500 hover:text-slate-700">
                View original summary
              </summary>
              <p className="mt-1.5 rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs leading-relaxed text-slate-600">
                {originalSummary.trim()}
              </p>
            </details>
          ) : null}
        </section>
      )}

      {/* Skills - grouped subsections (ATS-friendly); matches resumeDocumentToPlainText */}
      {skillGroups.length > 0 && (
        <section className="border-t border-slate-100 pt-4 mt-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Skills
            </h2>
            {editable && (
              <button
                type="button"
                onClick={() =>
                  setEditing((prev) => ({ ...prev, skills: !prev.skills }))
                }
                className="rounded border border-slate-300 bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-700 hover:bg-slate-50 print:hidden"
              >
                {editing.skills ? "Done" : "Edit"}
              </button>
            )}
          </div>
          <div className="space-y-1.5">
            {skillGroups.map((group, groupIndex) => {
              const line = formatSkillGroupLine(group.items);
              return (
                <div key={`${group.label}-${groupIndex}`} className="text-sm leading-snug text-slate-700">
                  {editable && editing.skills ? (
                    <>
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                        {group.label}
                      </span>
                      <textarea
                        value={line}
                        onChange={(e) => {
                          const items = e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean);
                          const next = skillGroups.map((g, i) =>
                            i === groupIndex ? { ...g, items } : g
                          );
                          onUpdateSkillGroups?.(next);
                          onUpdateSkills?.(next.flatMap((g) => g.items));
                        }}
                        className="mt-1 w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm leading-relaxed text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-400"
                        rows={2}
                      />
                    </>
                  ) : (
                    <p className="m-0">
                      <span className="font-semibold text-slate-800">{group.label}: </span>
                      {highlightKeywordsInText(line, highlightKeywords).map((node, i) => (
                        <React.Fragment key={i}>{node}</React.Fragment>
                      ))}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="border-t border-slate-100 pt-4 mt-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
            Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp, idx) => (
              <div key={idx}>
                {editable && (
                  <div className="mb-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        setEditing((prev) => ({
                          ...prev,
                          experienceIndex:
                            prev.experienceIndex === idx ? null : idx,
                        }))
                      }
                      className="rounded border border-slate-300 bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-700 hover:bg-slate-50 print:hidden"
                    >
                      {editing.experienceIndex === idx ? "Done" : "Edit"}
                    </button>
                  </div>
                )}
                <div className="flex justify-between items-baseline gap-2 flex-wrap">
                  {editable && editing.experienceIndex === idx ? (
                    <div className="grid w-full grid-cols-1 gap-1.5 sm:grid-cols-3">
                      <input
                        value={exp.role ?? ""}
                        onChange={(e) =>
                          onUpdateExperienceField?.(idx, "role", e.target.value)
                        }
                        placeholder="Role"
                        className="rounded-md border border-slate-300 bg-white px-2 py-1 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400"
                      />
                      <input
                        value={exp.company ?? ""}
                        onChange={(e) =>
                          onUpdateExperienceField?.(idx, "company", e.target.value)
                        }
                        placeholder="Company"
                        className="rounded-md border border-slate-300 bg-white px-2 py-1 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400"
                      />
                      <input
                        value={exp.dates ?? ""}
                        onChange={(e) =>
                          onUpdateExperienceField?.(idx, "dates", e.target.value)
                        }
                        placeholder="Dates (e.g. Jan 2022 - Mar 2025)"
                        className="rounded-md border border-slate-300 bg-white px-2 py-1 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400"
                      />
                    </div>
                  ) : (
                    <>
                      <p className="font-semibold text-sm text-slate-900">
                        {exp.role || exp.company || "Experience"}
                      </p>
                      {exp.dates && (
                        <p className="text-xs text-slate-500 shrink-0">{exp.dates}</p>
                      )}
                    </>
                  )}
                </div>
                {exp.company && !(editable && editing.experienceIndex === idx) && (
                  <p className="text-xs text-slate-600 mt-0.5">{exp.company}</p>
                )}
                {exp.bullets.filter((b) => sanitizeBulletText(String(b ?? "")).length > 0).length >
                  0 && (
                  <ul className="mt-2 flex list-none flex-col gap-2 pl-0 text-sm text-slate-700 leading-relaxed">
                    {exp.bullets
                      .map((b, j) => ({
                        j,
                        text: sanitizeBulletText(String(b ?? "")),
                      }))
                      .filter((b) => b.text.length > 0)
                      .map(({ j, text }) => {
                        const rowKey = makeExperienceBulletKey(idx, j);
                        return (
                        <ExperienceBulletRow
                          key={`top-${idx}-${j}`}
                          text={text}
                          bulletIndex={j}
                          expIndex={idx}
                          editable={editable}
                          editingExperience={editing.experienceIndex === idx}
                          onUpdateExperienceBullet={onUpdateExperienceBullet}
                          highlightedSet={highlightedSet}
                          refinedKeySet={refinedKeySet}
                          newKeySet={newKeySet}
                          bulletKey={rowKey}
                          quantifiedSet={quantifiedSet}
                          newBulletSet={newBulletSet}
                          fixKeySet={fixKeySet}
                          {...bulletEvidenceForKey(rowKey)}
                        />
                        );
                      })}
                  </ul>
                )}
                {(exp.projects ?? []).map((proj, pIdx) => (
                  <div key={`proj-${idx}-${pIdx}`} className="mt-3">
                    {editable && editing.experienceIndex === idx ? (
                      <input
                        value={proj.title ?? ""}
                        onChange={(e) =>
                          onUpdateProjectTitle?.(idx, pIdx, e.target.value)
                        }
                        placeholder="Project title"
                        className="w-full rounded-md border border-slate-300 bg-white px-2 py-1 text-xs font-semibold text-slate-800 leading-snug focus:outline-none focus:ring-1 focus:ring-slate-400"
                      />
                    ) : (
                      <p className="text-xs font-semibold text-slate-800 leading-snug">
                        {proj.title}
                      </p>
                    )}
                    <ul className="mt-2 flex list-none flex-col gap-2 pl-0 text-sm text-slate-700 leading-relaxed">
                      {(proj.bullets ?? [])
                        .map((b, j) => ({
                          j,
                          text: sanitizeBulletText(String(b ?? "")),
                        }))
                        .filter((b) => b.text.length > 0)
                        .map(({ j, text }) => {
                          const rowKey = makeExperienceBulletKey(idx, j, pIdx);
                          return (
                          <ExperienceBulletRow
                            key={`p-${idx}-${pIdx}-${j}`}
                            text={text}
                            bulletIndex={j}
                            expIndex={idx}
                            projectIndex={pIdx}
                            editable={editable}
                            editingExperience={editing.experienceIndex === idx}
                            onUpdateExperienceBullet={onUpdateExperienceBullet}
                            highlightedSet={highlightedSet}
                            refinedKeySet={refinedKeySet}
                            newKeySet={newKeySet}
                            bulletKey={rowKey}
                            quantifiedSet={quantifiedSet}
                            newBulletSet={newBulletSet}
                            fixKeySet={fixKeySet}
                            {...bulletEvidenceForKey(rowKey)}
                          />
                          );
                        })}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      )}

      <ResumeListSection
        title="Certifications"
        lines={certifications}
        editable={editable}
        editing={editing.certifications}
        onToggleEdit={() =>
          setEditing((prev) => ({ ...prev, certifications: !prev.certifications }))
        }
        onUpdateLine={onUpdateCertificationLine}
      />

      <ResumeListSection
        title="Awards"
        lines={awards}
        editable={editable}
        editing={editing.awards}
        onToggleEdit={() => setEditing((prev) => ({ ...prev, awards: !prev.awards }))}
        onUpdateLine={onUpdateAwardLine}
      />

      {/* Education */}
      {education.length > 0 && (
        <section className="border-t border-slate-100 pt-4 mt-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <h2 className={SECTION_HEADING_CLASS}>Education</h2>
            {editable && (
              <button
                type="button"
                onClick={() =>
                  setEditing((prev) => ({
                    ...prev,
                    education: !prev.education,
                  }))
                }
                className="rounded border border-slate-300 bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-700 hover:bg-slate-50 print:hidden"
              >
                {editing.education ? "Done" : "Edit"}
              </button>
            )}
          </div>
          <div className="space-y-2 text-sm text-slate-700">
            {education.map((line, idx) => (
              <div key={idx}>
                {editable && editing.education ? (
                  <input
                    value={line}
                    onChange={(e) =>
                      onUpdateEducationLine?.(idx, e.target.value)
                    }
                    placeholder="Degree · Institution · Year"
                    className="w-full rounded-md border border-slate-300 bg-white px-2 py-1 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400"
                  />
                ) : (
                  <p className="text-slate-900">{line}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {additionalSections.map((section, sectionIndex) => {
        const lines = (section.lines ?? []).map((l) => l?.trim()).filter(Boolean);
        if (!section.title?.trim() || lines.length === 0) return null;
        return (
          <section key={`${section.title}-${sectionIndex}`} className="border-t border-slate-100 pt-4 mt-4">
            <h2 className={SECTION_HEADING_CLASS}>{section.title}</h2>
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              {lines.map((line, idx) => (
                <li key={idx}>{line.replace(/^•\s*/, "")}</li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

