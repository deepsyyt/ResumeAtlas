"use client";

import type { Resume } from "@/app/types/resume";

type ResumePreviewProps = {
  resume: Resume | null;
};

export function ResumePreview({ resume }: ResumePreviewProps) {
  if (!resume) {
    return (
      <div className="h-full min-h-[320px] flex items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm p-10 text-slate-500 text-sm leading-relaxed">
        Paste resume and job description, then click Generate to see preview.
      </div>
    );
  }

  const { basics, experience, skills, education } = resume;

  return (
    <div className="h-full overflow-auto rounded-2xl border border-slate-200 bg-white shadow-sm p-10 text-slate-900">
      <header className="border-b border-slate-100 pb-6 mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          {basics.name}
        </h1>
        <p className="text-slate-600 mt-1 leading-relaxed">
          {basics.title}
        </p>
      </header>

      {basics.summary && (
        <section className="border-t border-slate-100 my-6 pt-6">
          <h2 className="text-sm uppercase tracking-widest text-slate-500 font-semibold mb-2">
            Summary
          </h2>
          <p className="text-sm leading-relaxed text-slate-700">
            {basics.summary}
          </p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="border-t border-slate-100 my-6 pt-6">
          <h2 className="text-sm uppercase tracking-widest text-slate-500 font-semibold mb-4">
            Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline gap-2 flex-wrap">
                  <span className="font-semibold text-slate-900">
                    {exp.role}
                  </span>
                  <span className="text-xs text-slate-500 shrink-0">
                    {exp.duration}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mt-0.5">
                  {exp.company}
                </p>
                {exp.bullets.length > 0 && (
                  <ul className="list-disc pl-5 space-y-1 mt-2 text-sm text-slate-700 leading-relaxed">
                    {exp.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="border-t border-slate-100 my-6 pt-6">
          <h2 className="text-sm uppercase tracking-widest text-slate-500 font-semibold mb-2">
            Skills
          </h2>
          <p className="text-sm leading-relaxed text-slate-700">
            {skills.join(" · ")}
          </p>
        </section>
      )}

      {education.length > 0 && (
        <section className="border-t border-slate-100 my-6 pt-6">
          <h2 className="text-sm uppercase tracking-widest text-slate-500 font-semibold mb-2">
            Education
          </h2>
          <div className="space-y-2">
            {education.map((edu, i) => (
              <div key={i}>
                <p className="font-medium text-sm text-slate-900">
                  {edu.degree}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {edu.institution} · {edu.year}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
