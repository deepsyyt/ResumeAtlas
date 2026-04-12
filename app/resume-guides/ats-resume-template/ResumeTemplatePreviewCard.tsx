"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import type { TemplatePreviewModel } from "./templatePreviewModels";

export type TemplatePreviewWithPlainText = TemplatePreviewModel & { plainText: string };

export function ResumeTemplatePreviewCard({
  model,
  structureHref,
}: {
  model: TemplatePreviewWithPlainText;
  structureHref: string;
}) {
  const [status, setStatus] = useState<string | null>(null);

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
          style={{ minHeight: "11.5rem" }}
        >
          <p className="text-center text-[11px] font-bold uppercase tracking-wide text-slate-900">
            {model.name}
          </p>
          <p className="mt-0.5 text-center text-[9px] font-medium text-slate-600">{model.roleLine}</p>
          <p className="mt-1 text-center text-[8px] leading-tight text-slate-500">{model.contactLine}</p>
          <div className="mt-2 border-t border-slate-100 pt-2">
            <p className="text-[8px] font-bold uppercase tracking-wide text-slate-500">Summary</p>
            <p className="mt-0.5 text-[8px] leading-snug text-slate-800">{model.summary}</p>
          </div>
          <div className="mt-2">
            <p className="text-[8px] font-bold uppercase tracking-wide text-slate-500">Skills</p>
            <p className="mt-0.5 text-[8px] leading-snug text-slate-800">{model.skills}</p>
          </div>
          <div className="mt-2">
            <p className="text-[8px] font-bold uppercase tracking-wide text-slate-500">Experience</p>
            <ul className="mt-0.5 list-disc space-y-0.5 pl-3.5 text-[8px] leading-snug text-slate-800">
              {model.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
          {model.education ? (
            <div className="mt-2">
              <p className="text-[8px] font-bold uppercase tracking-wide text-slate-500">Education</p>
              <p className="mt-0.5 text-[8px] text-slate-800">{model.education}</p>
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-slate-100 bg-white p-3 sm:flex-row">
        <button
          type="button"
          onClick={() => void onCopy()}
          className="inline-flex flex-1 items-center justify-center rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition"
        >
          Copy full text
        </button>
        <Link
          href={structureHref}
          className="inline-flex flex-1 items-center justify-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 transition"
        >
          View structure
        </Link>
      </div>
      {status ? <p className="px-3 pb-2 text-center text-[10px] text-emerald-800">{status}</p> : null}
    </article>
  );
}
