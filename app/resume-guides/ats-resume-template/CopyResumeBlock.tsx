"use client";

import { useCallback, useState } from "react";

export function CopyResumeBlock({
  eyebrow,
  title,
  body,
}: {
  eyebrow?: string;
  title: string;
  body: string;
}) {
  const [status, setStatus] = useState<string | null>(null);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(body);
      setStatus("Copied to clipboard");
      window.setTimeout(() => setStatus(null), 2200);
    } catch {
      setStatus("Copy blocked — select the text and press Ctrl+C (Cmd+C on Mac).");
      window.setTimeout(() => setStatus(null), 4000);
    }
  }, [body]);

  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm ring-1 ring-slate-900/[0.04]">
      {eyebrow ? (
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">{eyebrow}</p>
      ) : null}
      <h3 className="mt-1 text-sm font-semibold leading-snug text-slate-900">{title}</h3>
      <pre
        className="mt-2 max-h-56 flex-1 overflow-auto rounded-lg border border-slate-100 bg-slate-50 p-3 text-[10px] leading-snug text-slate-800 sm:max-h-64 sm:text-[11px] font-mono whitespace-pre-wrap"
        tabIndex={0}
      >
        {body}
      </pre>
      <button
        type="button"
        onClick={() => void onCopy()}
        className="mt-3 inline-flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 transition"
      >
        Copy plain text
      </button>
      {status ? <p className="mt-2 text-center text-[11px] text-emerald-800">{status}</p> : null}
    </article>
  );
}
