"use client";

import Link from "next/link";
import {
  RESUME_NOT_GETTING_INTERVIEWS_PATH,
  SKILLS_LISTED_NOT_PROVEN_PATH,
} from "@/app/lib/internalLinks";

function ResumeAtlasShieldMark({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M12 2.5 5 5.5v5.8c0 4.2 2.8 7.9 7 9.2 4.2-1.3 7-5 7-9.2V5.5L12 2.5zm0 2.2 5 2.2v4.4c0 3.1-2 5.9-5 7-3-1.1-5-3.9-5-7V6.9l5-2.2z"
      />
      <path fill="currentColor" d="M10.2 12.1 9 13.3l1.8 1.8 4.2-4.2-1.4-1.4-2.8 2.8z" />
    </svg>
  );
}

function QuotaProgressBar({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-violet-100">
      <div
        className="h-full rounded-full bg-violet-600 transition-[width] duration-300"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

type QuotaCardProps = {
  scanRemaining?: number;
  scanLimit?: number;
  creditRemaining?: number;
  creditTotal?: number;
  loginCopy?: string;
  loginCtaLabel?: string;
  onLogin?: () => void;
  isLoggingIn?: boolean;
  showLogin?: boolean;
};

export function WorkbenchPasteQuotaCard({
  scanRemaining = 0,
  scanLimit = 0,
  creditRemaining,
  creditTotal,
  loginCopy,
  loginCtaLabel,
  onLogin,
  isLoggingIn = false,
  showLogin = false,
}: QuotaCardProps) {
  const showScan = scanLimit > 0;
  const scanPct = showScan ? (scanRemaining / scanLimit) * 100 : 0;
  const showCredits = creditRemaining != null && creditTotal != null && creditTotal > 0;
  const creditPct = showCredits && creditTotal! > 0 ? (creditRemaining! / creditTotal!) * 100 : 0;

  return (
    <div
      className="workbench-paste-quota-card rounded-xl border border-violet-100/90 bg-violet-50/50 p-3"
      role="status"
      aria-live="polite"
    >
      <div className="space-y-3">
        {showScan ? (
          <div>
            <div className="flex items-baseline justify-between gap-2 text-[11px]">
              <span className="font-semibold text-slate-800">Scan allowance</span>
              <span className="tabular-nums text-slate-600">
                {scanRemaining} / {scanLimit} scans this month
              </span>
            </div>
            <QuotaProgressBar value={scanPct} />
          </div>
        ) : null}

        {showCredits ? (
          <div>
            <div className="flex items-baseline justify-between gap-2 text-[11px]">
              <span className="font-semibold text-slate-800">Optimization credits</span>
              <span className="tabular-nums text-slate-600">
                {creditRemaining} / {creditTotal} credits left
              </span>
            </div>
            <QuotaProgressBar value={creditPct} />
          </div>
        ) : null}
      </div>

      {showLogin && loginCopy ? (
        <div className="mt-3 flex items-center justify-between gap-2 border-t border-violet-100/90 pt-3">
          <p className="min-w-0 text-[10px] font-medium leading-snug text-violet-900">{loginCopy}</p>
          {onLogin ? (
            <button
              type="button"
              onClick={onLogin}
              disabled={isLoggingIn}
              className="shrink-0 rounded-lg bg-violet-600 px-2.5 py-1 text-[10px] font-semibold text-white transition hover:bg-violet-700 disabled:opacity-60"
            >
              {isLoggingIn ? "Signing in…" : loginCtaLabel}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export function WorkbenchPasteBrandHeader({ planLabel = "Free Plan" }: { planLabel?: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex min-w-0 items-center gap-2">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white shadow-sm shadow-violet-600/25">
          <ResumeAtlasShieldMark className="h-4 w-4" />
        </span>
        <span className="truncate text-base font-bold tracking-tight text-slate-900">ResumeAtlas</span>
      </div>
      <span className="shrink-0 rounded-full bg-violet-100 px-2.5 py-0.5 text-[10px] font-semibold text-violet-700">
        {planLabel}
      </span>
    </div>
  );
}

export function WorkbenchPasteStepBadge({ step }: { step: 1 | 2 }) {
  return (
    <span
      className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-600 text-[11px] font-bold text-white shadow-sm shadow-violet-600/20"
      aria-hidden
    >
      {step}
    </span>
  );
}

export function WorkbenchPasteRejectionWhyCard() {
  return (
    <div className="workbench-paste-info-card rounded-xl border border-violet-100/80 bg-violet-50/40 p-3">
      <p className="text-xs font-semibold text-slate-900">Why resumes get rejected</p>
      <ul className="mt-2 space-y-1.5 text-[11px] leading-snug text-slate-600">
        <li className="flex gap-2">
          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-sm bg-slate-400" aria-hidden />
          <span>Skills listed but not proven</span>
        </li>
        <li className="flex gap-2">
          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-sm bg-slate-400" aria-hidden />
          <span>Missing keyword matches / weak evidence</span>
        </li>
        <li className="flex gap-2">
          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-sm bg-slate-400" aria-hidden />
          <span>Impact not quantified</span>
        </li>
      </ul>
      <p className="mt-2.5 text-[11px] text-slate-700">
        Learn how to fix:{" "}
        <Link
          href={RESUME_NOT_GETTING_INTERVIEWS_PATH}
          className="font-medium text-violet-700 underline underline-offset-2 hover:text-violet-900"
        >
          resume not getting interviews
        </Link>
        <span className="text-slate-400"> · </span>
        <Link
          href={SKILLS_LISTED_NOT_PROVEN_PATH}
          className="font-medium text-violet-700 underline underline-offset-2 hover:text-violet-900"
        >
          skills listed but not proven
        </Link>
      </p>
    </div>
  );
}

export function WorkbenchPasteAnalyzeIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden>
      <path d="M10 2.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2.5zM5.05 4.55a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06L5.05 5.61a.75.75 0 010-1.06zm9.9 0a.75.75 0 010 1.06l-1.06 1.06a.75.75 0 11-1.06-1.06l1.06-1.06a.75.75 0 011.06 0zM4 10a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 014 10zm10.25-.75a.75.75 0 010 1.5h-1.5a.75.75 0 010-1.5h1.5zM7.28 12.22a.75.75 0 011.06 0l1.72 1.72a.75.75 0 11-1.06 1.06l-1.72-1.72a.75.75 0 010-1.06zm5.44 0a.75.75 0 010 1.06l-1.72 1.72a.75.75 0 11-1.06-1.06l1.72-1.72a.75.75 0 011.06 0zM10 13.25a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75z" />
      <path
        fillRule="evenodd"
        d="M10 6.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm0 1.5a2 2 0 100 4 2 2 0 000-4z"
        clipRule="evenodd"
      />
    </svg>
  );
}
