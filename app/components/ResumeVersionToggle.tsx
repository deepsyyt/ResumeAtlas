"use client";

export type ResumeVersionToggleProps = {
  value: "before" | "after";
  onChange: (v: "before" | "after") => void;
};

export function ResumeVersionToggle({ value, onChange }: ResumeVersionToggleProps) {
  return (
    <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5">
      <button
        type="button"
        onClick={() => onChange("before")}
        className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
          value === "before"
            ? "bg-white text-slate-900 shadow-sm"
            : "text-slate-600 hover:text-slate-900"
        }`}
      >
        Before
      </button>
      <button
        type="button"
        onClick={() => onChange("after")}
        className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
          value === "after"
            ? "bg-white text-slate-900 shadow-sm"
            : "text-slate-600 hover:text-slate-900"
        }`}
      >
        Optimized
      </button>
    </div>
  );
}
