"use client";

import { useCallback, useState } from "react";
import type { TemplatePreviewModel } from "./templatePreviewModels";

export type TemplatePreviewWithPlainText = TemplatePreviewModel & { plainText: string };

export function ResumeTemplatePreviewCard({ model }: { model: TemplatePreviewWithPlainText }) {
  const [status, setStatus] = useState<string | null>(null);

  const projectCount = model.projects?.length ?? 0;
  const compactProjectLayout = projectCount > 2;

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(model.plainText);
      setStatus("Copied");
      window.setTimeout(() => setStatus(null), 2000);
    } catch {
      setStatus("Select text in “Plain text” if copy is blocked.");
      window.setTimeout(() => setStatus(null), 3500);
    }
  }, [model.plainText]);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-md shadow-slate-900/10 ring-1 ring-slate-900/[0.04]">
      <div className="border-b border-slate-100 bg-gradient-to-br from-slate-50 to-white px-4 py-2.5">
        <p className="text-[10px] font-bold uppercase tracking-wider text-sky-800">{model.eyebrow}</p>
        <p className="text-xs font-semibold text-slate-700">{model.cardTitle}</p>
      </div>

      <div className="relative flex-1 bg-[#fafafa] px-4 py-4">
        <div
          className="mx-auto max-w-[17rem] rounded-sm border border-slate-200 bg-white px-3.5 py-3 shadow-sm"
          style={{
            minHeight: compactProjectLayout ? "19.5rem" : "16.25rem",
          }}
        >
          <p className="text-center text-[11px] font-bold uppercase tracking-wide text-slate-900">
            {model.name}
          </p>
          <p className="mt-0.5 text-center text-[9px] font-medium text-slate-600">{model.roleLine}</p>
          <p className="mt-1 text-center text-[8px] leading-tight text-slate-500">{model.contactLine}</p>
          {model.contactLine2 ? (
            <p className="mt-0.5 text-center text-[7px] leading-tight text-slate-500">{model.contactLine2}</p>
          ) : null}
          <div className="mt-2 border-t border-slate-100 pt-2">
            <p className="text-[8px] font-bold uppercase tracking-wide text-slate-500">Summary</p>
            <p
              className={`mt-0.5 text-[8px] leading-snug text-slate-800 ${compactProjectLayout ? "line-clamp-3" : "line-clamp-4"}`}
            >
              {model.summary}
            </p>
          </div>
          <div className="mt-2">
            <p className="text-[8px] font-bold uppercase tracking-wide text-slate-500">Skills</p>
            <p className="mt-0.5 text-[8px] leading-snug text-slate-800">{model.skills}</p>
          </div>
          <div className="mt-2">
            <p className="text-[8px] font-bold uppercase tracking-wide text-slate-500">Experience</p>
            {model.experienceJob ? (
              <div className="mt-0.5">
                <p className="text-[8px] font-semibold leading-tight text-slate-900">
                  {model.experienceJob.title}
                  <span className="font-normal text-slate-600"> · {model.experienceJob.company}</span>
                </p>
                <p className="text-[7px] text-slate-500">{model.experienceJob.dates}</p>
              </div>
            ) : null}
            <ul className="mt-0.5 list-disc space-y-0.5 pl-3.5 text-[8px] leading-snug text-slate-800">
              {model.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
          {model.projects?.length ? (
            <div className="mt-2">
              <p className="text-[8px] font-bold uppercase tracking-wide text-slate-500">Projects</p>
              <ul className="mt-0.5 space-y-0.5">
                {model.projects.slice(0, 4).map((p, i) => (
                  <li key={`${p.title}-${i}`} className="text-[7px] leading-snug text-slate-800">
                    <span className="font-semibold text-slate-900">{p.title}</span>
                    {p.context ? (
                      <span className="font-normal text-slate-600"> · {p.context}</span>
                    ) : null}
                    <span
                      className={`mt-0.5 block text-slate-700 ${compactProjectLayout ? "line-clamp-1" : "line-clamp-2"}`}
                    >
                      • {p.outcome}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {model.education ? (
            <div className="mt-2">
              <p className="text-[8px] font-bold uppercase tracking-wide text-slate-500">Education</p>
              <p className="mt-0.5 text-[8px] text-slate-800">{model.education}</p>
            </div>
          ) : null}
        </div>
      </div>

      <div className="border-t border-slate-100 bg-white p-3">
        <button
          type="button"
          onClick={() => void onCopy()}
          className="inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
        >
          Copy full text
        </button>
      </div>
      {status ? <p className="px-3 pb-2 text-center text-[10px] text-emerald-800">{status}</p> : null}
    </article>
  );
}
