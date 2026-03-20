"use client";

export type ResumeOptimizerModalProps = {
  open: boolean;
  onClose: () => void;
  resumeText: string;
  jobDescription: string;
  atsScore: number;
  missingSkills: string[];
  keywordCoverage: number;
  onOptimize: () => void | Promise<void>;
  isOptimizing?: boolean;
  /** Shown while waiting on Supabase → Google redirect (not resume optimization). */
  isStartingGoogleAuth?: boolean;
  /** When false, the Optimize button will trigger Google sign-in first. */
  isLoggedIn?: boolean;
};

export function ResumeOptimizerModal({
  open,
  onClose,
  onOptimize,
  isOptimizing = false,
  isStartingGoogleAuth = false,
  isLoggedIn = false,
  resumeText: _resumeText,
  jobDescription: _jobDescription,
  atsScore: _atsScore,
  missingSkills: _missingSkills,
  keywordCoverage: _keywordCoverage,
}: ResumeOptimizerModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50" onClick={onClose} aria-hidden />
      <div
        className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-slate-200"
        role="dialog"
        aria-labelledby="optimizer-modal-title"
        aria-modal="true"
      >
        <h2 id="optimizer-modal-title" className="text-lg font-semibold text-slate-900">
          Increase your ATS score for this job
        </h2>
        <p className="mt-3 text-sm text-slate-600">
          Our AI will improve your resume by:
        </p>
        <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-slate-700">
          <li>inserting missing keywords from the job description</li>
          <li>rewriting weak bullet points</li>
          <li>improving quantified achievements</li>
          <li>optimizing ATS formatting</li>
        </ul>
        {!isLoggedIn && (
          <p className="mt-3 text-xs text-amber-700 font-medium">
            {isStartingGoogleAuth || isOptimizing
              ? "Taking you to Google to sign in…"
              : "Sign in with Google to continue."}
          </p>
        )}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => void onOptimize()}
            disabled={isOptimizing || isStartingGoogleAuth}
            className="flex-1 rounded-xl bg-slate-900 py-2.5 text-center text-sm font-semibold text-white hover:bg-slate-800 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {/*
              When logged out, never imply resume optimization: isLaunchingOptimize can stay true
              if session flips mid-flow, so use Google sign-in copy whenever !isLoggedIn && busy.
            */}
            {isStartingGoogleAuth || (!isLoggedIn && isOptimizing)
              ? "Signing in with Google…"
              : isOptimizing
                ? "Preparing optimization…"
                : isLoggedIn
                  ? "Optimize Resume"
                  : "Sign in with Google & Optimize"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
