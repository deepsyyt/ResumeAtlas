"use client";

import { useForm } from "react-hook-form";
import type { Resume } from "@/app/types/resume";

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
  lastJD: string | null;
  lastRoleLevel: string;
  onReoptimizeSummary: () => void;
  isReoptimizingSummary: boolean;
  isLoggedIn: boolean;
};

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-black/20 transition min-h-[100px]";
const labelClass = "block text-sm font-semibold tracking-tight text-slate-700 mb-2";

export function ResumeForm({
  resume,
  onResumeChange,
  onGenerate,
  isGenerating,
  error,
  lastJD,
  lastRoleLevel,
  onReoptimizeSummary,
  isReoptimizingSummary,
  isLoggedIn,
}: ResumeFormProps) {
  const { register, handleSubmit } = useForm<GenerateInputs>({
    defaultValues: {
      resumeText: "",
      jobDescription: "",
      country: "USA",
      roleLevel: "Mid",
      customRoleLevel: "",
    },
  });

  const onSubmit = (data: GenerateInputs) => {
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

  return (
    <div className="relative bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
      {isGenerating && (
        <div className="absolute inset-0 bg-white/70 z-10 flex flex-col items-center justify-center gap-3 rounded-2xl">
          <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-900 rounded-full animate-spin" />
          <p className="text-sm font-medium text-slate-600">
            Analyzing JD and Optimizing Resume...
          </p>
        </div>
      )}

      <div className="p-6 space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1 */}
          <section>
            <h3 className="text-sm font-semibold tracking-tight text-slate-900 mb-4">
              Step 1: Provide Your Resume
            </h3>
            <label className={labelClass}>Paste your resume</label>
            <textarea
              {...register("resumeText", { required: true })}
              rows={4}
              className={inputClass + " sm:min-h-[120px] min-h-[80px]"}
              placeholder="Paste your current resume text here..."
              disabled={isGenerating}
            />
          </section>

          <div className="border-t border-slate-200 pt-6" />

          {/* Step 2 */}
          <section>
            <h3 className="text-sm font-semibold tracking-tight text-slate-900 mb-4">
              Step 2: Paste Job Description
            </h3>
            <label className={labelClass}>Job description</label>
            <textarea
              {...register("jobDescription", { required: true })}
              rows={4}
              className={inputClass + " sm:min-h-[120px] min-h-[80px]"}
              placeholder="Paste the job description here..."
              disabled={isGenerating}
            />
          </section>

          <p className="text-xs text-slate-500">
            Resume analysis is free and does not require login. Sign in later to save optimizations and download PDFs.
          </p>

          <button
            type="submit"
            disabled={isGenerating}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-slate-800 hover:scale-[1.02] transform transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            Analyze my resume free
          </button>
        </form>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {error}
          </div>
        )}

        {resume && (
          <div className="border-t border-slate-200 pt-6 space-y-6">
            <p className="text-xs text-slate-500">
              Editable – Changes reflect instantly in preview.
            </p>

            <section className="bg-slate-50/80 rounded-xl border border-slate-200 p-4 space-y-3">
              <h4 className="text-sm font-semibold tracking-tight text-slate-800">
                Summary
              </h4>
              <textarea
                value={resume.basics.summary}
                onChange={(e) => updateBasics("summary", e.target.value)}
                rows={4}
                className={inputClass + " min-h-[80px]"}
              />
              {lastJD && (
                <button
                  type="button"
                  onClick={onReoptimizeSummary}
                  disabled={isReoptimizingSummary}
                  className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-200 transition disabled:opacity-50"
                >
                  {isReoptimizingSummary ? "Re-optimizing…" : "Re-optimize for this JD"}
                </button>
              )}
            </section>

            {resume.experience.map((exp, i) => (
              <section
                key={i}
                className="bg-slate-50/80 rounded-xl border border-slate-200 p-4 space-y-3"
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
                  className={inputClass}
                  placeholder="One bullet per line"
                />
              </section>
            ))}

            <section className="bg-slate-50/80 rounded-xl border border-slate-200 p-4 space-y-3">
              <h4 className="text-sm font-semibold tracking-tight text-slate-800">
                Skills
              </h4>
              <input
                type="text"
                value={resume.skills.join(", ")}
                onChange={(e) => updateSkills(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-black/20 transition min-h-0"
                placeholder="Skill 1, Skill 2, Skill 3"
              />
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
