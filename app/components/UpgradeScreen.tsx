"use client";

export function UpgradeScreen() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">Upgrade to Pro</h3>
      <p className="mt-2 text-sm text-slate-600">
        You're signed in. Upgrade to Pro to generate and re-optimize resumes.
      </p>
      <a
        href="/upgrade"
        className="mt-6 inline-block rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition"
      >
        Upgrade to Pro – 25 Optimized Resumes / Month
      </a>
    </div>
  );
}
