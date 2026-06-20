"use client";

import {
  LIMIT_MODAL_ANON_BODY,
  LIMIT_MODAL_ANON_CTA,
  LIMIT_MODAL_ANON_FOOTNOTE,
  LIMIT_MODAL_ANON_HEADLINE,
  LIMIT_MODAL_ANON_SUBHEAD,
  LIMIT_MODAL_USER_FOOTNOTE,
} from "@/app/lib/evidenceMetricCopy";

export type LimitModalQuotaScope = "anonymous" | "user" | null;

type LimitModalProps = {
  open: boolean;
  onClose: () => void;
  message: string;
  /** Analysis quota exhausted: custom message + CTA. */
  quotaScope?: LimitModalQuotaScope;
  /** When quotaScope is "anonymous", primary CTA to sign in (may return a Promise). */
  onSignInClick?: () => void | Promise<void>;
  isSigningIn?: boolean;
};

export function LimitModal({
  open,
  onClose,
  message,
  quotaScope = null,
  onSignInClick,
  isSigningIn = false,
}: LimitModalProps) {
  if (!open) return null;

  const isQuotaAnonymous = quotaScope === "anonymous";
  const isQuotaUser = quotaScope === "user";
  const showQuotaCopy = isQuotaAnonymous || isQuotaUser;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl bg-white p-4 shadow-xl border border-slate-200 sm:p-5">
        {showQuotaCopy ? (
          <>
            <h2 className="text-lg font-semibold text-slate-900">
              {isQuotaAnonymous ? LIMIT_MODAL_ANON_HEADLINE : message}
            </h2>
            {isQuotaAnonymous ? (
              <>
                <p className="mt-2 text-xs text-slate-600 leading-snug sm:text-sm">{LIMIT_MODAL_ANON_SUBHEAD}</p>
                <p className="mt-2 rounded-lg border border-amber-200/90 bg-amber-50/90 px-2.5 py-1.5 text-xs leading-snug text-amber-950 sm:text-sm">
                  {LIMIT_MODAL_ANON_BODY}
                </p>
                <p className="mt-2 text-[11px] text-slate-500">{LIMIT_MODAL_ANON_FOOTNOTE}</p>
              </>
            ) : (
              <>
                <p className="mt-2 text-sm text-slate-600 leading-snug">{message}</p>
                <p className="mt-3 text-xs text-slate-500">{LIMIT_MODAL_USER_FOOTNOTE}</p>
              </>
            )}
          </>
        ) : (
          <>
            <p className="text-slate-800 font-medium">{message}</p>
            <p className="mt-2 text-sm text-slate-500">
              Sign in with Google, then choose a pack to keep checking and tailoring resumes for new jobs.
            </p>
          </>
        )}
        <div className="mt-6 flex gap-3">
          {isQuotaAnonymous && onSignInClick && (
            <button
              type="button"
              onClick={() => {
                void (async () => {
                  try {
                    await Promise.resolve(onSignInClick());
                  } catch {
                    /* parent sets error + isSigningIn */
                  }
                })();
              }}
              disabled={isSigningIn}
              className="flex-1 rounded-xl bg-slate-900 py-2.5 text-center text-sm font-semibold text-white hover:bg-slate-800 transition disabled:opacity-60"
            >
              {isSigningIn ? "Signing in…" : LIMIT_MODAL_ANON_CTA}
            </button>
          )}
          {!isQuotaAnonymous && (
            <a
              href="/"
              className="flex-1 rounded-xl bg-black py-2.5 text-center text-sm font-semibold text-white hover:bg-slate-800 transition"
            >
              Back to analyzer
            </a>
          )}
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
          >
            {isQuotaUser ? "Got it" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}
