"use client";

import type { ReactNode } from "react";
import {
  WORKBENCH_PREVIEW_BOTTOM_CHIPS,
  WORKBENCH_PREVIEW_EYEBROW,
  WORKBENCH_PREVIEW_FEATURES,
  WORKBENCH_PREVIEW_HEADLINE,
  type WorkbenchPreviewBottomChip,
} from "@/app/lib/workbenchDashboardPreviewCopy";

type Props = {
  children: ReactNode;
  className?: string;
};

function BottomChipIcon({ icon }: { icon: WorkbenchPreviewBottomChip["icon"] }) {
  const common = "h-4 w-4 shrink-0 text-sky-300/90";
  switch (icon) {
    case "clock":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={common} aria-hidden>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4l3 2" strokeLinecap="round" />
        </svg>
      );
    case "chart":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={common} aria-hidden>
          <path d="M4 18V6l6 3v9l-6-3zm8 0V4l6 3v11l-6-3z" strokeLinejoin="round" />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={common} aria-hidden>
          <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" strokeLinejoin="round" />
          <path d="M9.5 12l2 2 3.5-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "trophy":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={common} aria-hidden>
          <path d="M8 4h8v3a4 4 0 01-8 0V4z" strokeLinejoin="round" />
          <path d="M6 4H4v1a3 3 0 003 3M18 4h2v1a3 3 0 01-3 3M12 11v3M9 18h6M10 21h4" strokeLinecap="round" />
        </svg>
      );
  }
}

/**
 * Dark marketing frame around the white intelligence dashboard (demo + live).
 */
export function WorkbenchDashboardPreviewShell({ children, className = "" }: Props) {
  return (
    <div
      className={`workbench-dashboard-preview-shell ref-dash-shell flex w-full min-w-0 flex-col ${className}`.trim()}
    >
      <header className="ref-dash-hero px-4 pb-5 pt-5 text-center sm:px-5 sm:pt-6 lg:px-6">
        <p className="ref-dash-hero-badge mx-auto inline-flex items-center gap-1.5">
          <span aria-hidden>✨</span>
          {WORKBENCH_PREVIEW_EYEBROW}
        </p>
        <h2 className="ref-dash-hero-headline">{WORKBENCH_PREVIEW_HEADLINE}</h2>

        <ol className="ref-dash-hero-steps">
          {WORKBENCH_PREVIEW_FEATURES.map((feature, index) => (
            <li key={feature.title} className="ref-dash-hero-step">
              <span className="ref-dash-hero-step-num">{index + 1}</span>
              <div className="min-w-0 text-left">
                <p className="ref-dash-hero-step-title">{feature.title}</p>
                <p className="ref-dash-hero-step-body">{feature.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </header>

      <div className="ref-dash-main-wrap px-2 sm:px-3 lg:px-4">
        <div className="ref-dash-main-card">{children}</div>
      </div>

      <div className="ref-dash-benefits-strip mt-4 border-t border-white/[0.08] px-3 pt-4 pb-6 sm:mt-5 sm:px-4 sm:pt-5 sm:pb-7 lg:px-6 lg:pb-8">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
          {WORKBENCH_PREVIEW_BOTTOM_CHIPS.map((chip) => (
            <li key={chip.title} className="flex min-w-0 items-start gap-2.5">
              <BottomChipIcon icon={chip.icon} />
              <div className="min-w-0">
                <p className="text-[11px] font-semibold leading-snug text-white sm:text-xs">{chip.title}</p>
                <p className="mt-0.5 text-[10px] leading-normal text-slate-400 sm:text-[11px]">{chip.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
