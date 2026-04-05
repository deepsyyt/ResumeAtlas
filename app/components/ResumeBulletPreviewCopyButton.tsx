"use client";

import Link from "next/link";
import { useState } from "react";

type Props = {
  text: string;
  className?: string;
  /** Shown after a successful copy when `tailoredCtaHref` is set. */
  tailoredPrompt?: string;
  tailoredCtaHref?: string;
  tailoredCtaLabel?: string;
};

export function ResumeBulletPreviewCopyButton({
  text,
  className = "",
  tailoredPrompt = "Want bullet points tailored to your resume?",
  tailoredCtaHref,
  tailoredCtaLabel = "Generate from my resume",
}: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 8000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={`flex flex-col items-end gap-2 ${className}`}>
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
      >
        {copied ? "Copied" : "Copy preview"}
      </button>
      {copied && tailoredCtaHref ? (
        <div className="max-w-sm rounded-lg border border-sky-200 bg-sky-50/80 px-3 py-2 text-left text-xs text-slate-800">
          <p className="font-medium text-slate-900">{tailoredPrompt}</p>
          <Link
            href={tailoredCtaHref}
            className="mt-1 inline-block font-semibold text-sky-800 underline underline-offset-2 hover:text-sky-950"
          >
            {tailoredCtaLabel}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
