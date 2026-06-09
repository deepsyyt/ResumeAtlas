"use client";

import { useCallback, useState } from "react";
import { CHECK_RESUME_AGAINST_JD_PATH } from "@/app/lib/internalLinks";

const SHARE_MESSAGE =
  "I've been using this free AI resume checker — paste your resume and a job description to see how you match. Worth it if you're job hunting:";

type ShareTone = "jdMatch" | "atsCompliance" | "keywordScanner";

/** Light status-card surface — matches scan allowance / form chips, not primary CTA. */
const sidebarSurfaceClasses: Record<ShareTone, string> = {
  jdMatch:
    "border-amber-300/90 bg-gradient-to-br from-amber-50/95 via-white to-yellow-50/40 text-indigo-950 ring-1 ring-amber-200/80",
  atsCompliance:
    "border-amber-300/90 bg-gradient-to-br from-amber-50/95 via-white to-yellow-50/40 text-indigo-950 ring-1 ring-amber-200/80",
  keywordScanner:
    "border-amber-300/90 bg-gradient-to-br from-amber-50/95 via-white to-yellow-50/40 text-indigo-950 ring-1 ring-amber-200/80",
};

const actionToneClasses: Record<ShareTone, string> = {
  jdMatch: "text-indigo-700 group-hover:text-indigo-900",
  atsCompliance: "text-indigo-700 group-hover:text-indigo-900",
  keywordScanner: "text-indigo-700 group-hover:text-indigo-900",
};

type Props = {
  className?: string;
  tone?: ShareTone;
  /** `sidebar`: form referral row. `nav`: header pill. `button`: standalone compact. */
  layout?: "sidebar" | "nav" | "button";
};

function ShareIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
    </svg>
  );
}

export function ShareFriendsCta({
  className = "",
  tone = "jdMatch",
  layout = "sidebar",
}: Props) {
  const [feedback, setFeedback] = useState<"idle" | "copied" | "shared">("idle");

  const handleShare = useCallback(async () => {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}${CHECK_RESUME_AGAINST_JD_PATH}`
        : `https://resumeatlas.io${CHECK_RESUME_AGAINST_JD_PATH}`;
    const payload = {
      title: "ResumeAtlas — free resume vs job match",
      text: SHARE_MESSAGE,
      url,
    };

    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share(payload);
        setFeedback("shared");
        window.setTimeout(() => setFeedback("idle"), 2200);
        return;
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(`${SHARE_MESSAGE}\n${url}`);
      setFeedback("copied");
      window.setTimeout(() => setFeedback("idle"), 2200);
    } catch {
      window.prompt("Copy this link and share with a friend:", url);
    }
  }, []);

  const actionLabel =
    feedback === "copied"
      ? "Link copied"
      : feedback === "shared"
        ? "Thanks!"
        : "Share";

  if (layout === "nav") {
    const isIdle = feedback === "idle";
    const navSurface =
      "border-indigo-300/90 bg-gradient-to-br from-indigo-50 via-indigo-50/90 to-violet-50/50 text-indigo-800 ring-1 ring-indigo-200/80";
    return (
      <button
        type="button"
        onClick={() => void handleShare()}
        className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-1 text-sm font-semibold text-indigo-700 shadow-sm transition hover:bg-indigo-100/90 hover:text-indigo-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50 ${
          isIdle ? `share-referral-nav ${navSurface}` : navSurface
        } ${className}`}
        aria-label="Share ResumeAtlas with friends searching for a job"
      >
        {actionLabel}
        <ShareIcon className="h-3.5 w-3.5 text-indigo-600 opacity-95" />
      </button>
    );
  }

  if (layout === "sidebar") {
    const isIdle = feedback === "idle";
    return (
      <button
        type="button"
        onClick={() => void handleShare()}
        className={`group flex w-full items-center justify-between gap-2 rounded-lg border px-2 py-1.5 text-left text-[10px] shadow-sm transition hover:bg-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50 sm:px-2.5 sm:text-[11px] ${
          isIdle
            ? `share-referral-card ${sidebarSurfaceClasses[tone]}`
            : sidebarSurfaceClasses[tone]
        } ${className}`}
        aria-label="Share ResumeAtlas with friends searching for a job"
      >
        <span className="min-w-0 font-medium leading-snug text-indigo-900/90">
          {feedback === "idle"
            ? "Know someone job hunting?"
            : feedback === "copied"
              ? "Link copied — paste it anywhere"
              : "Thanks for sharing"}
        </span>
        <span
          className={`inline-flex shrink-0 items-center gap-1 font-semibold ${actionToneClasses[tone]}`}
        >
          {actionLabel}
          <ShareIcon className="h-3 w-3 opacity-80" />
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => void handleShare()}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[10px] font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40 sm:text-[11px] ${className}`}
      aria-label="Share ResumeAtlas with friends searching for a job"
    >
      <ShareIcon />
      {actionLabel}
    </button>
  );
}
