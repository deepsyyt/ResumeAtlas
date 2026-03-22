"use client";

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-slate-200">
        <p className="text-slate-800 font-medium">{message}</p>
        {!isQuotaAnonymous && !isQuotaUser && (
          <p className="mt-2 text-sm text-slate-500">
            Sign in with Google if needed, then buy optimization credits from the dashboard to continue.
          </p>
        )}
        {isQuotaUser && (
          <p className="mt-2 text-sm text-slate-500">Your free scans reset in a rolling 24‑hour window.</p>
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
                  // Do not call onClose() here: closing the modal can interrupt OAuth; success navigates away.
                })();
              }}
              disabled={isSigningIn}
              className="flex-1 rounded-xl bg-slate-900 py-2.5 text-center text-sm font-semibold text-white hover:bg-slate-800 transition disabled:opacity-60"
            >
              {isSigningIn ? "Signing in…" : "Sign in for more free scans"}
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
