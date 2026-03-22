"use client";

import { useForm, Controller } from "react-hook-form";
import type { Resume } from "@/app/types/resume";
import {
  countWords,
  clipToWordLimit,
  JOB_DESCRIPTION_MAX_WORDS,
  RESUME_TEXT_MAX_WORDS,
} from "@/app/lib/inputWordLimits";

export const ROLE_LEVELS = ["Entry", "Mid", "Senior", "Leadership"] as const;

export type GenerateInputs = {
  resumeText: string;
  jobDescription: string;
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
  /** Optional quota for showing usage (rolling window; copy may say “today” for simplicity). */
  analysisQuota?: {
    remaining: number;
    used: number;
    limit: number;
    scope: string;
  } | null;
};

const textareaClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm leading-snug text-slate-900 placeholder:text-slate-400 shadow-sm " +
  "focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:shadow-sm transition " +
  "min-h-[112px] resize-y disabled:bg-slate-50 disabled:text-slate-500";

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm " +
  "focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 transition";

const stepEyebrowClass = "text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 mb-0.5";
const stepTitleClass = "text-[15px] font-semibold tracking-tight text-slate-900 mb-2";
const fieldLabelClass = "block text-xs font-medium text-slate-800 mb-1.5";

export function ResumeForm({
  resume,
  onResumeChange,
  onGenerate,
  isGenerating,
  error,
  isLoggedIn,
  analysisQuota,
}: ResumeFormProps) {
  const { register, handleSubmit, control } = useForm<GenerateInputs>({
    defaultValues: {
      resumeText: "",
      jobDescription: "",
      country: "USA",
      roleLevel: "Mid",
      customRoleLevel: "",
    },
  });

  const onSubmit = (data: GenerateInputs) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "analyze_resume_click", {
        event_category: "engagement",
        event_label: "Get ATS score free",
      });
    }
    onGenerate({
      resumeText: data.resumeText,
      jobDescription: data.jobDescription,
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

  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-950/[0.04]">
      {isGenerating && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-xl bg-white/80 backdrop-blur-[2px]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-slate-800" />
          <p className="text-xs font-medium text-slate-600">Analyzing your resume…</p>
        </div>
      )}

      <header className="border-b border-slate-200/80 bg-gradient-to-b from-slate-50 to-white px-4 py-4 sm:px-5 sm:py-5">
        <p className={stepEyebrowClass}>Free ATS analysis</p>
        <h2 className="max-w-xl text-lg font-semibold leading-snug tracking-tight text-slate-900 sm:text-xl">
          Get your ATS score free
        </h2>
        <p className="mt-1 max-w-lg text-xs leading-relaxed text-slate-600 sm:text-[13px]">
          No login required. Paste your resume and a job description. We&apos;ll score keyword fit and gaps.
        </p>
        {quota != null && quota.limit > 0 && (
          <div
            className={
              "mt-3 flex w-full flex-col gap-2 rounded-lg border px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 " +
              quotaToneClasses
            }
            role="status"
            aria-live="polite"
          >
            <p className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.14em] opacity-75">
              Scan allowance
            </p>
            <div className="flex min-w-0 flex-wrap items-baseline gap-x-2.5 gap-y-0.5 sm:justify-end">
              <span className="text-2xl font-bold tabular-nums leading-none tracking-tight sm:text-[1.65rem]">
                {quota.used}
                <span className="mx-1 text-base font-semibold opacity-45 sm:text-lg">/</span>
                {quota.limit}
              </span>
              <span className="text-xs font-semibold leading-snug opacity-90 sm:text-[13px]">
                free scans <span className="font-medium opacity-75">today</span>
              </span>
            </div>
          </div>
        )}
      </header>

      <div className="px-4 py-5 sm:px-5 sm:py-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-0">
          {/* Step 1 */}
          <section className="pb-6">
            <p className={stepEyebrowClass}>Step 1</p>
            <h3 className={stepTitleClass}>Provide your resume</h3>
            <label className={fieldLabelClass} htmlFor="resumeatlas-resume-text">
              Resume text
            </label>
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
                      rows={4}
                      className={textareaClass}
                      placeholder="Paste your full resume here (any format is fine)…"
                      disabled={isGenerating}
                      onChange={(e) => {
                        field.onChange(
                          clipToWordLimit(e.target.value, RESUME_TEXT_MAX_WORDS)
                        );
                      }}
                    />
                    <p
                      className={
                        "mt-1 text-[11px] tabular-nums " +
                        (wc >= RESUME_TEXT_MAX_WORDS
                          ? "font-medium text-amber-700"
                          : "text-slate-500")
                      }
                    >
                      {wc.toLocaleString()} / {RESUME_TEXT_MAX_WORDS.toLocaleString()} words
                    </p>
                  </>
                );
              }}
            />
          </section>

          <div className="border-t border-slate-100" />

          {/* Step 2 */}
          <section className="pt-6 pb-1">
            <p className={stepEyebrowClass}>Step 2</p>
            <h3 className={stepTitleClass}>Paste the job description</h3>
            <label className={fieldLabelClass} htmlFor="resumeatlas-jd-text">
              Job description
            </label>
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
                      rows={4}
                      className={textareaClass}
                      placeholder="Paste the role description you are targeting…"
                      disabled={isGenerating}
                      onChange={(e) => {
                        field.onChange(
                          clipToWordLimit(e.target.value, JOB_DESCRIPTION_MAX_WORDS)
                        );
                      }}
                    />
                    <p
                      className={
                        "mt-1 text-[11px] tabular-nums " +
                        (wc >= JOB_DESCRIPTION_MAX_WORDS
                          ? "font-medium text-amber-700"
                          : "text-slate-500")
                      }
                    >
                      {wc.toLocaleString()} / {JOB_DESCRIPTION_MAX_WORDS.toLocaleString()} words
                    </p>
                  </>
                );
              }}
            />
          </section>

          <div className="pt-5">
            <button
              type="submit"
              disabled={isGenerating}
              className="flex w-full items-center justify-center gap-2.5 rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm ring-1 ring-slate-900/10 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-65"
            >
              <span
                aria-hidden
                className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_0_3px_rgba(52,211,153,0.35)]"
              />
              Get my ATS score free
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-800 sm:text-sm">
            {error}
          </div>
        )}

        {resume && (
          <div className="mt-6 space-y-4 border-t border-slate-100 pt-6">
            <p className="text-[11px] font-medium text-slate-500 sm:text-xs">
              Editable — changes update the preview instantly.
            </p>

            <section className="space-y-2 rounded-lg border border-slate-200 bg-slate-50/80 p-3">
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
                className="space-y-2 rounded-lg border border-slate-200 bg-slate-50/80 p-3"
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

            <section className="space-y-2 rounded-lg border border-slate-200 bg-slate-50/80 p-3">
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
