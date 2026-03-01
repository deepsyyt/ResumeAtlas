"use client";

type LimitModalProps = {
  open: boolean;
  onClose: () => void;
  message: string;
};

export function LimitModal({ open, onClose, message }: LimitModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-slate-200">
        <p className="text-slate-800 font-medium">{message}</p>
        <p className="mt-2 text-sm text-slate-500">
          Sign in with Google and upgrade to Pro to continue.
        </p>
        <div className="mt-6 flex gap-3">
          <a
            href="/upgrade"
            className="flex-1 rounded-xl bg-black py-2.5 text-center text-sm font-semibold text-white hover:bg-slate-800 transition"
          >
            Sign in & Upgrade
          </a>
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
