"use client";

import {
  LIMIT_MODAL_ANON_BENEFITS,
  LIMIT_MODAL_ANON_CTA,
  LIMIT_MODAL_ANON_DISMISS,
  LIMIT_MODAL_ANON_HEADLINE,
  LIMIT_MODAL_ANON_PROMO,
  LIMIT_MODAL_ANON_SUBHEAD_HIGHLIGHT,
  LIMIT_MODAL_ANON_SUBHEAD_PREFIX,
  LIMIT_MODAL_ANON_SUBHEAD_SUFFIX,
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

function GoogleLogoIcon() {
  return (
    <svg viewBox="0 0 24 24" className="limit-modal__google-logo" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function LimitModalHeroIcon() {
  return (
    <div className="limit-modal__hero-icon-wrap" aria-hidden>
      <span className="limit-modal__hero-spark limit-modal__hero-spark--left" />
      <span className="limit-modal__hero-spark limit-modal__hero-spark--right" />
      <div className="limit-modal__hero-icon">
        <svg viewBox="0 0 24 24" fill="none" className="limit-modal__hero-doc">
          <path
            d="M8 4h6l4 4v12a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M14 4v4h4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M9.5 12h5M9.5 15h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="limit-modal__hero-check">
          <svg viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 6.2 5 8.7 9.5 3.8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}

function LimitModalBenefitIcon({ kind }: { kind: "scan" | "optimize" | "chart" }) {
  if (kind === "optimize") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M13 3 5 14h6l-1 7 8-11h-6l1-7z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (kind === "chart") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M6 18V10M12 18V6M18 18V13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        <path d="M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 5H6a1 1 0 0 0-1 1v2M8 19H6a1 1 0 0 1-1-1v-2M16 5h2a1 1 0 0 1 1 1v2M16 19h2a1 1 0 0 0 1-1v-2"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

const BENEFIT_ICONS = ["scan", "optimize", "chart"] as const;

function LimitModalAnonymousContent({
  onSignInClick,
  onClose,
  isSigningIn,
}: {
  onSignInClick?: () => void | Promise<void>;
  onClose: () => void;
  isSigningIn: boolean;
}) {
  return (
    <div className="limit-modal__anon">
      <header className="limit-modal__header">
        <LimitModalHeroIcon />
        <h2 id="limit-modal-title" className="limit-modal__title">
          {LIMIT_MODAL_ANON_HEADLINE}
        </h2>
        <p className="limit-modal__subhead">
          {LIMIT_MODAL_ANON_SUBHEAD_PREFIX}{" "}
          <strong className="limit-modal__subhead-highlight">{LIMIT_MODAL_ANON_SUBHEAD_HIGHLIGHT}</strong>{" "}
          {LIMIT_MODAL_ANON_SUBHEAD_SUFFIX}
        </p>
      </header>

      <div className="limit-modal__promo">
        <svg viewBox="0 0 20 20" fill="none" className="limit-modal__promo-icon" aria-hidden>
          <rect x="3" y="8" width="14" height="9" rx="1.25" stroke="currentColor" strokeWidth="1.25" />
          <path d="M10 8V17M3 11h14" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
          <path
            d="M10 8c-1.75 0-3-1-3-2.25S8.25 3.5 10 3.5 13 4.5 13 5.75 11.75 8 10 8z"
            stroke="currentColor"
            strokeWidth="1.25"
          />
          <path
            d="M10 8c1.75 0 3-1 3-2.25S11.75 3.5 10 3.5 7 4.5 7 5.75 8.25 8 10 8z"
            stroke="currentColor"
            strokeWidth="1.25"
          />
        </svg>
        <span>{LIMIT_MODAL_ANON_PROMO}</span>
      </div>

      <ul className="limit-modal__benefits">
        {LIMIT_MODAL_ANON_BENEFITS.map((benefit, index) => (
          <li key={benefit.title} className="limit-modal__benefit">
            <span className="limit-modal__benefit-icon">
              <LimitModalBenefitIcon kind={BENEFIT_ICONS[index] ?? "scan"} />
            </span>
            <span className="limit-modal__benefit-copy">
              <span className="limit-modal__benefit-title">{benefit.title}</span>
              <span className="limit-modal__benefit-detail">{benefit.detail}</span>
            </span>
          </li>
        ))}
      </ul>

      <div className="limit-modal__footer">
        {onSignInClick ? (
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
            className="limit-modal__google-btn"
          >
            <GoogleLogoIcon />
            {isSigningIn ? "Signing in…" : LIMIT_MODAL_ANON_CTA}
          </button>
        ) : null}
        <button type="button" onClick={onClose} className="limit-modal__dismiss">
          {LIMIT_MODAL_ANON_DISMISS}
        </button>
      </div>
    </div>
  );
}

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
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/50"
        aria-label="Close"
        onClick={onClose}
      />
      <div
        className={
          isQuotaAnonymous
            ? "limit-modal relative w-full max-w-[26rem] rounded-2xl bg-white shadow-[0_24px_64px_-16px_rgba(15,23,42,0.35)]"
            : "relative w-full max-w-md rounded-2xl bg-white p-4 shadow-xl border border-slate-200 sm:p-5"
        }
        role="dialog"
        aria-modal="true"
        aria-labelledby="limit-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        {isQuotaAnonymous ? (
          <LimitModalAnonymousContent
            onSignInClick={onSignInClick}
            onClose={onClose}
            isSigningIn={isSigningIn}
          />
        ) : showQuotaCopy ? (
          <>
            <h2 id="limit-modal-title" className="text-lg font-semibold text-slate-900">
              {message}
            </h2>
            <p className="mt-3 text-xs text-slate-500">{LIMIT_MODAL_USER_FOOTNOTE}</p>
            <div className="mt-6 flex gap-3">
              <a
                href="/"
                className="flex-1 rounded-xl bg-black py-2.5 text-center text-sm font-semibold text-white hover:bg-slate-800 transition"
              >
                Back to analyzer
              </a>
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                Got it
              </button>
            </div>
          </>
        ) : (
          <>
            <p id="limit-modal-title" className="text-slate-800 font-medium">
              {message}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Sign in with Google, then choose a pack to keep checking and tailoring resumes for new jobs.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="/"
                className="flex-1 rounded-xl bg-black py-2.5 text-center text-sm font-semibold text-white hover:bg-slate-800 transition"
              >
                Back to analyzer
              </a>
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
