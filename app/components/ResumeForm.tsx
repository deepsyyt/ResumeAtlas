"use client";

import { useForm, Controller } from "react-hook-form";
import { useEffect, useRef } from "react";
import { ShareFriendsCta } from "@/app/components/ShareFriendsCta";
import type { Resume } from "@/app/types/resume";
import { CHECK_RESUME_AGAINST_JD_PRIMARY_CTA } from "@/app/lib/internalLinks";
import {
  countWords,
  clipToWordLimit,
  JOB_DESCRIPTION_MAX_WORDS,
  RESUME_TEXT_MAX_WORDS,
} from "@/app/lib/inputWordLimits";
import {
  TARGET_ROLE_TITLE_MAX_CHARS,
} from "@/app/lib/roleFitArchetypes";
import { ANALYSIS_QUOTA_LIMITS } from "@/app/lib/quota/constants";
export const ROLE_LEVELS = ["Entry", "Mid", "Senior", "Leadership"] as const;

export type GenerateInputs = {
  resumeText: string;
  jobDescription: string;
  targetRoleTitle?: string;
  country?: "USA" | "Canada" | "UK";
  roleLevel?: string;
  customRoleLevel?: string;
};

type ResumeFormProps = {
  resume: Resume | null;
  onResumeChange: (resume: Resume) => void;
  onGenerate: (inputs: GenerateInputs) => void;
  isGenerating: boolean;
  error: string | null;
  isLoggedIn: boolean;
  /**
   * `atsCompliance`: resume-only ATS scan; job description optional (paste on JD checker for full keyword match).
   * `keywordScanner`: gap-focused scan; resume + job description required (same API as jdMatch).
   */
  analysisMode?: "jdMatch" | "atsCompliance" | "keywordScanner";
  /** Optional quota for showing usage (rolling window; copy reflects scope). */
  analysisQuota?: {
    remaining: number;
    used: number;
    limit: number;
    scope: string;
  } | null;
  onLoginForMoreScans?: () => void | Promise<void>;
  isLoggingInForMoreScans?: boolean;
  /** Tool workbench: show share CTA for logged-in users. */
  showShareFriendsCta?: boolean;
  /** Dark-sidebar workbench: elevated card on violet rail. */
  variant?: "default" | "workbench";
  /** Split workbench column: fill height, no outer scroll. */
  splitPanelLayout?: boolean;
};

const inputClass =
  "w-full rounded-xl border border-slate-200/90 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 " +
  "focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/15 transition";

type FormAccent = {
  shell: string;
  header: string;
  eyebrow: string;
  stepBadge: string;
  field: string;
  fieldFocus: string;
  cta: string;
  ctaShadow: string;
  divider: string;
  pasteCard1: string;
  pasteCard2: string;
  pasteHint1: string;
  pasteHint2: string;
};

function formAccent(analysisMode: ResumeFormProps["analysisMode"]): FormAccent {
  if (analysisMode === "atsCompliance") {
    return {
      shell: "ring-sky-100/90 shadow-sky-900/[0.05]",
      header: "from-sky-50/90 via-white to-cyan-50/40",
      eyebrow: "text-sky-700",
      stepBadge: "from-sky-500 to-cyan-500 shadow-sky-500/30",
      field: "border-sky-100/90 bg-gradient-to-b from-sky-50/50 to-white",
      fieldFocus: "focus:border-sky-300 focus:ring-sky-500/15",
      cta: "from-sky-600 via-sky-600 to-indigo-600 hover:from-sky-700 hover:via-sky-700 hover:to-indigo-700",
      ctaShadow: "shadow-sky-600/25 hover:shadow-sky-600/35",
      divider: "border-sky-100/80",
      pasteCard1:
        "border-sky-200/70 bg-gradient-to-br from-sky-50/80 via-white to-white shadow-sky-900/[0.04] ring-sky-100/60",
      pasteCard2:
        "border-cyan-200/70 bg-gradient-to-br from-cyan-50/70 via-white to-white shadow-cyan-900/[0.04] ring-cyan-100/60",
      pasteHint1: "text-sky-600",
      pasteHint2: "text-cyan-600",
    };
  }
  if (analysisMode === "keywordScanner") {
    return {
      shell: "ring-emerald-100/90 shadow-emerald-900/[0.05]",
      header: "from-emerald-50/90 via-white to-teal-50/40",
      eyebrow: "text-emerald-700",
      stepBadge: "from-emerald-500 to-teal-500 shadow-emerald-500/30",
      field: "border-emerald-100/90 bg-gradient-to-b from-emerald-50/45 to-white",
      fieldFocus: "focus:border-emerald-300 focus:ring-emerald-500/15",
      cta: "from-emerald-600 via-emerald-600 to-teal-600 hover:from-emerald-700 hover:via-emerald-700 hover:to-teal-700",
      ctaShadow: "shadow-emerald-600/25 hover:shadow-emerald-600/35",
      divider: "border-emerald-100/80",
      pasteCard1:
        "border-emerald-200/70 bg-gradient-to-br from-emerald-50/80 via-white to-white shadow-emerald-900/[0.04] ring-emerald-100/60",
      pasteCard2:
        "border-teal-200/70 bg-gradient-to-br from-teal-50/70 via-white to-white shadow-teal-900/[0.04] ring-teal-100/60",
      pasteHint1: "text-emerald-600",
      pasteHint2: "text-teal-600",
    };
  }
  return {
    shell: "ring-indigo-100/90 shadow-indigo-900/[0.06]",
    header: "from-indigo-50/90 via-white to-violet-50/50",
    eyebrow: "text-indigo-700",
    stepBadge: "from-indigo-500 to-violet-600 shadow-indigo-500/30",
    field: "border-indigo-100/90 bg-gradient-to-b from-indigo-50/40 to-white",
    fieldFocus: "focus:border-indigo-300 focus:ring-indigo-500/15",
    cta: "from-indigo-600 via-indigo-600 to-violet-600 hover:from-indigo-700 hover:via-indigo-700 hover:to-violet-700",
    ctaShadow: "shadow-indigo-600/25 hover:shadow-indigo-600/35",
    divider: "border-indigo-100/80",
    pasteCard1:
      "border-indigo-200/70 bg-gradient-to-br from-indigo-50/80 via-white to-white shadow-indigo-900/[0.05] ring-indigo-100/60",
    pasteCard2:
      "border-violet-200/70 bg-gradient-to-br from-violet-50/75 via-white to-white shadow-violet-900/[0.05] ring-violet-100/60",
    pasteHint1: "text-indigo-600",
    pasteHint2: "text-violet-600",
  };
}

export function ResumeForm({
  resume,
  onResumeChange,
  onGenerate,
  isGenerating,
  error,
  isLoggedIn,
  analysisMode = "jdMatch",
  analysisQuota,
  onLoginForMoreScans,
  isLoggingInForMoreScans = false,
  showShareFriendsCta = false,
  variant = "default",
  splitPanelLayout = false,
}: ResumeFormProps) {
  const isWorkbench = variant === "workbench";
  const lastAnalyzeClickAtRef = useRef(0);
  const isAtsCompliance = analysisMode === "atsCompliance";
  const isKeywordScanner = analysisMode === "keywordScanner";
  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<GenerateInputs>({
    defaultValues: {
      resumeText: "",
      jobDescription: "",
      targetRoleTitle: "",
      country: "USA",
      roleLevel: "Mid",
      customRoleLevel: "",
    },
  });
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const resumeFromUrl = params.get("resumeText");
    const jdFromUrl = params.get("jobDescription");
    if (!resumeFromUrl && !jdFromUrl) return;

    if (resumeFromUrl) {
      setValue("resumeText", clipToWordLimit(resumeFromUrl, RESUME_TEXT_MAX_WORDS), {
        shouldDirty: true,
      });
    }
    if (jdFromUrl) {
      setValue("jobDescription", clipToWordLimit(jdFromUrl, JOB_DESCRIPTION_MAX_WORDS), {
        shouldDirty: true,
      });
    }

    // Remove bulky/PII query params after hydration to avoid leaking resume/JD in analytics URLs.
    params.delete("resumeText");
    params.delete("jobDescription");
    const nextQuery = params.toString();
    const nextUrl =
      `${window.location.pathname}${nextQuery ? `?${nextQuery}` : ""}${window.location.hash}`;
    window.history.replaceState(window.history.state, "", nextUrl);
  }, [setValue]);

  const onSubmit = (data: GenerateInputs) => {
    const now = Date.now();
    if (now - lastAnalyzeClickAtRef.current < 1200) return;
    lastAnalyzeClickAtRef.current = now;
    onGenerate({
      resumeText: data.resumeText,
      jobDescription: data.jobDescription,
      targetRoleTitle: data.targetRoleTitle?.trim() ?? "",
    });
  };

  const updateBasics = (field: keyof Resume["basics"], value: string) => {
    if (!resume) return;
    onResumeChange({
      ...resume,
      basics: { ...resume.basics, [field]: value },
    });
  };

  const updateExperienceBullets = (expIndex: number, bullets: string[]) => {
    if (!resume) return;
    const next = [...resume.experience];
    next[expIndex] = { ...next[expIndex], bullets };
    onResumeChange({ ...resume, experience: next });
  };

  const updateSkills = (skillsStr: string) => {
    if (!resume) return;
    const skills = skillsStr
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    onResumeChange({ ...resume, skills });
  };

  const quota = analysisQuota;
  const quotaTone =
    quota == null
      ? null
      : quota.remaining <= 0
        ? "rose"
        : quota.remaining === 1
          ? "amber"
          : "emerald";

  const quotaToneClasses =
    quotaTone === "rose"
      ? "border-rose-300/80 bg-gradient-to-br from-rose-50 to-rose-100/50 text-rose-950 ring-1 ring-rose-200/60"
      : quotaTone === "amber"
        ? "border-amber-300/80 bg-gradient-to-br from-amber-50 to-amber-100/40 text-amber-950 ring-1 ring-amber-200/60"
        : "border-emerald-300/80 bg-gradient-to-br from-emerald-50 to-emerald-100/40 text-emerald-950 ring-1 ring-emerald-200/60";
  const loginRowBgClass = isAtsCompliance
    ? "border-sky-100/90 bg-sky-50/90 text-sky-900"
    : isKeywordScanner
      ? "border-emerald-100/90 bg-emerald-50/90 text-emerald-900"
      : "border-indigo-100/90 bg-indigo-50/90 text-indigo-900";
  const signedInScanAllowance = ANALYSIS_QUOTA_LIMITS.user;
  const signedInScanNoun = signedInScanAllowance === 1 ? "scan" : "scans";
  const loginIntentCopy = isAtsCompliance
    ? `Log in to unlock ${signedInScanAllowance} more free ATS compatibility ${signedInScanNoun}.`
    : isKeywordScanner
      ? `Log in to unlock ${signedInScanAllowance} more free keyword gap ${signedInScanAllowance === 1 ? "analysis" : "analyses"}.`
      : `Log in to unlock ${signedInScanAllowance} more free ${signedInScanAllowance === 1 ? "analysis" : "analyses"}.`;

  const handleLoginForMoreScans = () => {
    if (!onLoginForMoreScans) return;
    void Promise.resolve(onLoginForMoreScans());
  };

  const accent = formAccent(analysisMode);
  const pasteCardShell = (step: 1 | 2) => {
    if (splitPanelLayout) {
      return "";
    }
    return `rounded-2xl border p-3 shadow-sm ring-1 sm:p-3.5 ${
      step === 1 ? accent.pasteCard1 : accent.pasteCard2
    }`;
  };
  const splitTextareaClass =
    `h-40 min-h-40 max-h-40 w-full shrink-0 resize-none overflow-y-auto preview-panel-scroll rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm leading-relaxed text-slate-900 placeholder:text-slate-400 outline-none transition disabled:bg-slate-50 disabled:text-slate-500 ${accent.fieldFocus}`;
  const textareaClass =
    `w-full rounded-xl border bg-white/95 px-3.5 py-3 text-sm leading-relaxed text-slate-900 placeholder:text-slate-400 ` +
    `shadow-inner shadow-slate-900/[0.02] outline-none transition disabled:bg-slate-50 disabled:text-slate-500 ${accent.fieldFocus}` +
    (splitPanelLayout
      ? ""
      : " min-h-[7.5rem] resize-y border-slate-200/70");

  const pasteFieldWrapClass = splitPanelLayout ? "flex shrink-0 flex-col gap-1" : "";

  const shellClass = isWorkbench
    ? "relative overflow-hidden rounded-2xl bg-transparent"
    : splitPanelLayout
      ? "relative flex flex-col bg-white"
      : `relative overflow-hidden rounded-2xl border border-white/80 bg-white/95 shadow-lg ring-1 backdrop-blur-sm ${accent.shell}`;

  const headerClass = isWorkbench
    ? "px-0.5 pb-2"
    : splitPanelLayout
      ? `shrink-0 border-b border-slate-100 px-4 py-2 sm:px-5`
      : `border-b ${accent.divider} bg-gradient-to-br ${accent.header} px-3 py-2.5 sm:px-4 sm:py-3`;

  const splitSectionTitleClass = "text-[13px] font-semibold tracking-tight text-slate-900";
  const splitSectionDividerClass = "shrink-0 border-b border-slate-200/90 pb-2";

  const submitClass =
    "flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r px-4 py-2.5 text-sm font-semibold tracking-[-0.01em] text-white shadow-sm transition " +
    `disabled:cursor-not-allowed disabled:opacity-65 ${accent.cta} ${accent.ctaShadow}`;

  const stepBadgeClass = `inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-[11px] font-bold text-white shadow-sm ${accent.stepBadge}`;
  const stepTitleClass = "text-sm font-bold tracking-[-0.02em] text-slate-900";
  const wordCountClass = (atLimit: boolean) =>
    `text-[10px] tabular-nums sm:text-[11px] ${
      atLimit ? "font-semibold text-amber-700" : "text-slate-400"
    }`;

  const pasteSectionClass = (step: 1 | 2) => {
    if (splitPanelLayout) {
      return "flex shrink-0 flex-col gap-2";
    }
    return pasteCardShell(step);
  };

  const formBodyClass = splitPanelLayout
    ? "px-4 py-3 sm:px-5 sm:py-4"
    : "px-3 py-3 sm:px-4 sm:py-4";

  const formClass = splitPanelLayout
    ? "flex flex-col gap-5 pb-1"
    : "space-y-3";

  const shareCard =
    isLoggedIn && showShareFriendsCta ? (
      <div className="mt-1.5">
        <ShareFriendsCta tone={analysisMode} layout="sidebar" />
      </div>
    ) : null;

  const showTargetRoleField = !isAtsCompliance;
  const targetRoleInputClass =
    `w-full rounded-xl border bg-white/95 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 ` +
    `shadow-inner shadow-slate-900/[0.02] outline-none transition disabled:bg-slate-50 disabled:text-slate-500 ${accent.fieldFocus}` +
    (splitPanelLayout ? " rounded-lg border-slate-200 shadow-none" : " border-slate-200/70");

  const splitPanelTargetRole = showTargetRoleField ? (
    <div className="flex shrink-0 flex-col gap-1 sm:flex-row sm:items-center sm:gap-2.5">
      <label
        className="shrink-0 text-[11px] font-medium text-slate-600"
        htmlFor="resumeatlas-target-role"
      >
        Role <span className="text-rose-600">*</span>
      </label>
      <input
        {...register("targetRoleTitle", {
          required: "Enter the target role title.",
          validate: (value) =>
            String(value ?? "").trim().length > 0 || "Enter the target role title.",
        })}
        id="resumeatlas-target-role"
        type="text"
        required
        maxLength={TARGET_ROLE_TITLE_MAX_CHARS}
        className={`${targetRoleInputClass} min-w-0 flex-1 py-2`}
        placeholder="e.g. Senior GenAI Engineering Manager"
        disabled={isGenerating}
        aria-invalid={errors.targetRoleTitle ? true : undefined}
      />
      {errors.targetRoleTitle ? (
        <p className="text-[10px] font-medium text-rose-700 sm:col-span-2" role="alert">
          {errors.targetRoleTitle.message}
        </p>
      ) : null}
    </div>
  ) : null;

  const targetRoleField = showTargetRoleField ? (
    <>
      <label
        className="text-[11px] font-semibold text-slate-800"
        htmlFor="resumeatlas-target-role"
      >
        Target role title <span className="text-rose-600">*</span>
      </label>
      <input
        {...register("targetRoleTitle", {
          required: "Enter the target role title.",
          validate: (value) =>
            String(value ?? "").trim().length > 0 || "Enter the target role title.",
        })}
        id="resumeatlas-target-role"
        type="text"
        required
        maxLength={TARGET_ROLE_TITLE_MAX_CHARS}
        className={`${targetRoleInputClass} mt-1`}
        placeholder="e.g. Senior GenAI Engineering Manager"
        disabled={isGenerating}
        aria-invalid={errors.targetRoleTitle ? true : undefined}
      />
      {errors.targetRoleTitle ? (
        <p className="mt-1 text-[10px] font-medium text-rose-700" role="alert">
          {errors.targetRoleTitle.message}
        </p>
      ) : null}
    </>
  ) : null;

  const defaultTargetRoleField = showTargetRoleField ? (
    <div className="mb-2.5">{targetRoleField}</div>
  ) : null;

  if (isWorkbench) {
    return (
      <div className="relative flex h-full min-h-[min(70vh,36rem)] flex-col">
        {isGenerating ? (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-2xl bg-white/85 backdrop-blur-sm">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-100 border-t-indigo-600" />
            <p className="text-xs font-medium text-slate-600">Analyzing your resume…</p>
          </div>
        ) : null}

        <form onSubmit={handleSubmit(onSubmit)} className="flex h-full flex-col gap-3">
          <section className={`flex min-h-0 flex-1 flex-col ${pasteCardShell(1)}`}>
            <div className="mb-2 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className={stepBadgeClass} aria-hidden>
                  1
                </span>
                <label className="text-xs font-bold text-slate-900" htmlFor="resumeatlas-resume-text">
                  Your resume
                </label>
              </div>
              <span className={`text-[10px] font-semibold ${accent.pasteHint1}`}>Paste resume</span>
            </div>
            <Controller
              name="resumeText"
              control={control}
              rules={{ required: true }}
              render={({ field }) => {
                const wc = countWords(field.value);
                return (
                  <>
                    <textarea
                      {...field}
                      id="resumeatlas-resume-text"
                      className={textareaClass}
                      placeholder="Paste your full resume here…"
                      disabled={isGenerating}
                      onChange={(e) => {
                        field.onChange(clipToWordLimit(e.target.value, RESUME_TEXT_MAX_WORDS));
                      }}
                    />
                    <p className={`mt-1.5 text-right ${wordCountClass(wc >= RESUME_TEXT_MAX_WORDS)}`}>
                      {wc.toLocaleString()} / {RESUME_TEXT_MAX_WORDS.toLocaleString()} words
                    </p>
                  </>
                );
              }}
            />
          </section>

          <section className={`flex min-h-0 flex-1 flex-col ${pasteCardShell(2)}`}>
            <div className="mb-2 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className={stepBadgeClass} aria-hidden>
                  2
                </span>
                <label className="text-xs font-bold text-slate-900" htmlFor="resumeatlas-jd-text">
                  Job description
                </label>
              </div>
              <span className={`text-[10px] font-semibold ${accent.pasteHint2}`}>Paste job description</span>
            </div>
            {defaultTargetRoleField}
            <Controller
              name="jobDescription"
              control={control}
              rules={{ required: true }}
              render={({ field }) => {
                const wc = countWords(field.value);
                return (
                  <>
                    <textarea
                      {...field}
                      id="resumeatlas-jd-text"
                      className={textareaClass}
                      placeholder="Paste the job description you're targeting…"
                      disabled={isGenerating}
                      onChange={(e) => {
                        field.onChange(clipToWordLimit(e.target.value, JOB_DESCRIPTION_MAX_WORDS));
                      }}
                    />
                    <p className={`mt-1.5 text-right ${wordCountClass(wc >= JOB_DESCRIPTION_MAX_WORDS)}`}>
                      {wc.toLocaleString()} / {JOB_DESCRIPTION_MAX_WORDS.toLocaleString()} words
                    </p>
                  </>
                );
              }}
            />
          </section>

          <div className="shrink-0 pt-1">
            <button
              type="submit"
              data-analytics="analyzer_form_analyze_submit"
              disabled={isGenerating}
              className={submitClass}
            >
              {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
            </button>
            {quota != null && quota.limit > 0 ? (
              <div className="mt-2 overflow-hidden rounded-lg border border-slate-200/80 bg-slate-50/80 text-[11px] text-slate-500">
                <p className="px-2 py-1.5 text-center">
                  <span className={quota.remaining <= 0 ? "font-medium text-rose-600" : undefined}>
                    {Math.min(quota.used, quota.limit)}/{quota.limit} free
                  </span>
                  {!isLoggedIn ? (
                    <>
                      {" · "}
                      <button
                        type="button"
                        onClick={handleLoginForMoreScans}
                        disabled={isLoggingInForMoreScans || !onLoginForMoreScans}
                        className="font-medium text-slate-600 underline underline-offset-2 hover:text-slate-900 disabled:opacity-60"
                      >
                        {isLoggingInForMoreScans ? "Signing in…" : "Log in for 5 more"}
                      </button>
                    </>
                  ) : null}
                </p>
              </div>
            ) : null}
            {shareCard}
          </div>
        </form>

        {error ? (
          <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-800">
            {error}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className={shellClass}>
      {isGenerating && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-2xl bg-white/85 backdrop-blur-sm">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-100 border-t-indigo-600" />
          <p className="text-xs font-medium text-slate-600">
            {isKeywordScanner ? "Scanning for keyword gaps…" : "Analyzing your resume…"}
          </p>
        </div>
      )}

      <header className={`${headerClass}${splitPanelLayout ? " shrink-0" : ""}`}>
        {!isWorkbench ? (
          <>
            <div className={`flex flex-wrap items-center gap-x-2 gap-y-0.5${splitPanelLayout ? " text-left" : ""}`}>
              <p className={`text-[11px] font-bold tracking-[-0.01em] ${splitPanelLayout ? "text-slate-800" : accent.eyebrow}`}>
                {isAtsCompliance
                  ? "ATS compatibility scan"
                  : isKeywordScanner
                    ? "Keyword gap scan"
                    : "Resume vs job match"}
              </p>
              {!splitPanelLayout ? (
                <>
                  <span className="hidden text-slate-300 sm:inline" aria-hidden>
                    ·
                  </span>
                  <p className="flex flex-wrap items-center gap-1 text-[10px] font-medium text-slate-600">
                    <span className="rounded-full bg-white/80 px-1.5 py-0.5 ring-1 ring-slate-200/90">
                      Free
                    </span>
                    <span className="rounded-full bg-white/80 px-1.5 py-0.5 ring-1 ring-slate-200/90">
                      Paste only
                    </span>
                    <span className="rounded-full bg-white/80 px-1.5 py-0.5 ring-1 ring-slate-200/90">
                      No signup
                    </span>
                  </p>
                </>
              ) : (
                <p className="text-[10px] font-medium text-slate-500">
                  Free · Paste only · No signup
                </p>
              )}
            </div>
          </>
        ) : null}
        {quota != null && quota.limit > 0 ? (
          <div
            className={
              (isWorkbench ? "mt-1.5 " : "mt-2 ") +
              `overflow-hidden rounded-lg border text-[10px] sm:text-[11px] ${quotaToneClasses}`
            }
            role="status"
            aria-live="polite"
          >
            <p className="px-2 py-1.5 leading-snug sm:px-2.5">
              <span className="font-medium">{isWorkbench ? "Scans" : "Scan allowance"}</span>
              <span className="mx-1.5 text-current/35" aria-hidden>
                ·
              </span>
              <span className="font-semibold tabular-nums">
                {Math.min(quota.used, quota.limit)}/{quota.limit}
              </span>{" "}
              <span className="font-medium opacity-90">
                {isWorkbench
                  ? "free"
                  : isLoggedIn
                    ? quota.limit === 1
                      ? "free scan today"
                      : "free scans today"
                    : "free scan this month"}
              </span>
            </p>
            {!isLoggedIn ? (
              <div
                className={`flex items-center justify-between gap-2 border-t px-2 py-1.5 sm:px-2.5 ${loginRowBgClass}`}
              >
                <p
                  className={
                    isWorkbench
                      ? "min-w-0 text-[10px] font-medium leading-snug text-indigo-900"
                      : "min-w-0 text-[10px] font-medium leading-snug opacity-80 sm:text-[11px]"
                  }
                >
                  {loginIntentCopy}
                </p>
                <button
                  type="button"
                  onClick={handleLoginForMoreScans}
                  disabled={isLoggingInForMoreScans || !onLoginForMoreScans}
                  className={
                    isWorkbench
                      ? `shrink-0 rounded-md bg-gradient-to-r px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm disabled:opacity-60 ${accent.cta}`
                      : `inline-flex shrink-0 items-center rounded-md bg-gradient-to-r px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm transition disabled:opacity-60 sm:text-[11px] ${accent.cta}`
                  }
                >
                  {isLoggingInForMoreScans ? "Signing in..." : "Log in for 5 more"}
                </button>
              </div>
            ) : null}
          </div>
        ) : null}
        {shareCard && !splitPanelLayout ? shareCard : null}
      </header>

      <div className={formBodyClass}>
        <form onSubmit={handleSubmit(onSubmit)} className={formClass}>
          <section className={pasteSectionClass(1)}>
            {splitPanelLayout ? (
              <div className={splitSectionDividerClass}>
                <h3 className={splitSectionTitleClass}>Your resume</h3>
              </div>
            ) : (
              <div className="mb-2.5 flex shrink-0 items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className={stepBadgeClass} aria-hidden>
                    1
                  </span>
                  <h3 className={stepTitleClass}>Your resume</h3>
                </div>
                <span className={`text-[10px] font-semibold sm:text-[11px] ${accent.pasteHint1}`}>
                  Paste resume
                </span>
              </div>
            )}
            <Controller
              name="resumeText"
              control={control}
              rules={{ required: true }}
              render={({ field }) => {
                const wc = countWords(field.value);
                return (
                  <div className={pasteFieldWrapClass}>
                    {splitPanelLayout ? (
                      <textarea
                        {...field}
                        id="resumeatlas-resume-text"
                        className={splitTextareaClass}
                        placeholder="Paste your full resume here…"
                        disabled={isGenerating}
                        onChange={(e) => {
                          field.onChange(
                            clipToWordLimit(e.target.value, RESUME_TEXT_MAX_WORDS)
                          );
                        }}
                      />
                    ) : (
                      <>
                        <textarea
                          {...field}
                          id="resumeatlas-resume-text"
                          rows={4}
                          className={textareaClass}
                          placeholder="Paste your full resume here…"
                          disabled={isGenerating}
                          onChange={(e) => {
                            field.onChange(
                              clipToWordLimit(e.target.value, RESUME_TEXT_MAX_WORDS)
                            );
                          }}
                        />
                      </>
                    )}
                    <p className={`shrink-0 text-right ${splitPanelLayout ? "text-[10px]" : "mt-1.5"} ${wordCountClass(wc >= RESUME_TEXT_MAX_WORDS)}`}>
                      {wc.toLocaleString()} / {RESUME_TEXT_MAX_WORDS.toLocaleString()} words
                    </p>
                  </div>
                );
              }}
            />
          </section>

          <section className={pasteSectionClass(2)}>
            {splitPanelLayout ? (
              <div className={splitSectionDividerClass}>
                <h3 className={splitSectionTitleClass}>
                  {isKeywordScanner ? "Job posting" : isAtsCompliance ? "Job description (optional)" : "Job description"}
                </h3>
              </div>
            ) : (
              <div className="mb-2.5 flex shrink-0 items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className={stepBadgeClass} aria-hidden>
                    2
                  </span>
                  <h3 className={stepTitleClass}>
                    {isKeywordScanner ? "Job posting" : isAtsCompliance ? "Job description (optional)" : "Job description"}
                  </h3>
                </div>
                <span className={`text-[10px] font-semibold sm:text-[11px] ${accent.pasteHint2}`}>
                  Paste job description
                </span>
              </div>
            )}
            {isAtsCompliance && !splitPanelLayout ? (
              <p className="mb-2 text-[11px] leading-snug text-slate-600 sm:text-xs">
                Leave blank for ATS parsing and formatting only. For keyword match to a specific
                posting, paste the job description here or use the dedicated job description
                checker.
              </p>
            ) : null}
            {isKeywordScanner && !splitPanelLayout ? (
              <p className="mb-2 text-[11px] leading-snug text-slate-600 sm:text-xs">
                We extract keywords from this posting and flag gaps in your resume.
              </p>
            ) : null}
            {splitPanelLayout ? splitPanelTargetRole : defaultTargetRoleField}
            <Controller
              name="jobDescription"
              control={control}
              rules={{ required: !isAtsCompliance }}
              render={({ field }) => {
                const wc = countWords(field.value);
                return (
                  <div className={pasteFieldWrapClass}>
                    {splitPanelLayout ? (
                      <textarea
                        {...field}
                        id="resumeatlas-jd-text"
                        className={splitTextareaClass}
                        placeholder={
                          isAtsCompliance
                            ? "Optional — add a job description for keyword alignment"
                            : isKeywordScanner
                              ? "Paste the full job posting…"
                              : "Paste the job description you're targeting…"
                        }
                        disabled={isGenerating}
                        onChange={(e) => {
                          field.onChange(
                            clipToWordLimit(e.target.value, JOB_DESCRIPTION_MAX_WORDS)
                          );
                        }}
                      />
                    ) : (
                      <textarea
                        {...field}
                        id="resumeatlas-jd-text"
                        rows={4}
                        className={textareaClass}
                        placeholder={
                          isAtsCompliance
                            ? "Optional — add a job description for keyword alignment"
                            : isKeywordScanner
                              ? "Paste the full job posting…"
                              : "Paste the job description you're targeting…"
                        }
                        disabled={isGenerating}
                        onChange={(e) => {
                          field.onChange(
                            clipToWordLimit(e.target.value, JOB_DESCRIPTION_MAX_WORDS)
                          );
                        }}
                      />
                    )}
                    <p className={`shrink-0 text-right ${splitPanelLayout ? "text-[10px]" : "mt-1.5"} ${wordCountClass(wc >= JOB_DESCRIPTION_MAX_WORDS)}`}>
                      {wc.toLocaleString()} / {JOB_DESCRIPTION_MAX_WORDS.toLocaleString()} words
                    </p>
                  </div>
                );
              }}
            />
          </section>

          <div className={splitPanelLayout ? "shrink-0 border-t border-slate-100 pt-4" : isWorkbench ? "pt-2" : "pt-3"}>
            <button
              type="submit"
              data-analytics="analyzer_form_analyze_submit"
              disabled={isGenerating}
              className={submitClass}
            >
              <svg
                aria-hidden
                className="h-3.5 w-3.5 shrink-0 opacity-90"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="whitespace-nowrap">
                {isAtsCompliance
                  ? "Run ATS check"
                  : isKeywordScanner
                    ? "Scan keyword gaps"
                    : CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
              </span>
            </button>
            {!isWorkbench ? (
              <p className="mt-1.5 text-center text-[10px] text-slate-500 sm:text-[11px]">
                Results in seconds · no file upload · no account needed
              </p>
            ) : null}
          </div>
        </form>

        {error && (
          <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-800 sm:text-sm">
            {error}
          </div>
        )}

        {resume && (
          <div className="mt-4 space-y-3 border-t border-slate-100 pt-4">
            <p className="text-[11px] font-medium text-slate-500 sm:text-xs">
              Editable: changes update the preview instantly.
            </p>

            <section className="space-y-1.5 rounded-xl border border-indigo-100/80 bg-indigo-50/30 p-2.5">
              <h4 className="text-sm font-semibold tracking-tight text-slate-800">
                Summary
              </h4>
              <textarea
                value={resume.basics.summary}
                onChange={(e) => updateBasics("summary", e.target.value)}
                rows={4}
                className={textareaClass + " min-h-[88px]"}
              />
            </section>

            {resume.experience.map((exp, i) => (
              <section
                key={i}
                className="space-y-1.5 rounded-xl border border-indigo-100/80 bg-indigo-50/30 p-2.5"
              >
                <h4 className="text-sm font-semibold tracking-tight text-slate-800">
                  Experience: {exp.company}
                </h4>
                <label className="text-xs text-slate-500">Bullets (one per line)</label>
                <textarea
                  value={exp.bullets.join("\n")}
                  onChange={(e) =>
                    updateExperienceBullets(
                      i,
                      e.target.value.split("\n").filter(Boolean)
                    )
                  }
                  rows={Math.max(3, exp.bullets.length)}
                  className={textareaClass}
                  placeholder="One bullet per line"
                />
              </section>
            ))}

            <section className="space-y-1.5 rounded-xl border border-indigo-100/80 bg-indigo-50/30 p-2.5">
              <h4 className="text-sm font-semibold tracking-tight text-slate-800">
                Skills
              </h4>
              <input
                type="text"
                value={resume.skills.join(", ")}
                onChange={(e) => updateSkills(e.target.value)}
                className="min-h-0 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 transition focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                placeholder="Skill 1, Skill 2, Skill 3"
              />
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
