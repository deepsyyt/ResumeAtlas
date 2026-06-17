"use client";

import { useCallback, useState } from "react";
import type { ShareRecruiterReportArgs } from "@/app/lib/shareRecruiterReport";
import {
  buildShareIntroMessage,
  downloadPdfBlob,
  fetchAnalysisReportPdfBlob,
  openLinkedInMessagingTab,
  SHARE_GENERATING_LABEL,
  SHARE_LINKEDIN_CTA_LABEL,
  SHARE_PDF_CTA_LABEL,
  SHARE_PDF_READY_LABEL,
  SHARE_PDF_SHARED_LABEL,
  SHARE_RECRUITER_CTA_HINT,
  sharePdfOnLinkedIn,
} from "@/app/lib/shareRecruiterReport";

type ShareRecruiterReportCtaProps = {
  report: ShareRecruiterReportArgs;
  compact?: boolean;
  className?: string;
};

type Feedback = "idle" | "generating" | "pdf" | "shared";

function LinkedInIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 4.126 0 2.062 2.062 0 0 1-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function PdfIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

const btnBase =
  "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[10px] font-semibold shadow-sm transition focus:outline-none focus-visible:ring-2 sm:text-[11px] disabled:cursor-not-allowed disabled:opacity-60";

export function ShareRecruiterReportCta({
  report,
  compact = false,
  className = "",
}: ShareRecruiterReportCtaProps) {
  const [feedback, setFeedback] = useState<Feedback>("idle");

  const handleDownloadPdf = useCallback(async () => {
    setFeedback("generating");
    try {
      const blob = await fetchAnalysisReportPdfBlob(report);
      downloadPdfBlob(blob);
      setFeedback("pdf");
      window.setTimeout(() => setFeedback("idle"), 2400);
    } catch (err) {
      console.error("[share-report]", err);
      setFeedback("idle");
      window.alert("Could not prepare the PDF report. Please try again.");
    }
  }, [report]);

  const handleLinkedIn = useCallback(() => {
    openLinkedInMessagingTab();
    setFeedback("generating");
    void (async () => {
      try {
        const blob = await fetchAnalysisReportPdfBlob(report);
        const intro = buildShareIntroMessage(report);
        await sharePdfOnLinkedIn({ blob, introMessage: intro });
        setFeedback("shared");
        window.setTimeout(() => setFeedback("idle"), 3200);
      } catch (err) {
        console.error("[share-report]", err);
        setFeedback("idle");
        window.alert("Could not prepare the PDF report. Please try again.");
      }
    })();
  }, [report]);

  const busy = feedback === "generating";

  return (
    <div
      className={`rounded-lg border border-slate-200/90 bg-gradient-to-r from-slate-50/90 via-white to-indigo-50/30 px-2.5 py-2 shadow-sm ${className}`}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-600">
            Shareable report
          </p>
          {!compact ? (
            <p className="mt-0.5 text-[11px] leading-snug text-slate-600">
              {busy ? SHARE_GENERATING_LABEL : SHARE_RECRUITER_CTA_HINT}
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            disabled={busy}
            onClick={handleLinkedIn}
            className={`${btnBase} border border-[#0a66c2]/30 bg-[#0a66c2] text-white hover:bg-[#004182] focus-visible:ring-[#0a66c2]/50`}
            aria-label="Share PDF report on LinkedIn"
          >
            <LinkedInIcon />
            {SHARE_LINKEDIN_CTA_LABEL}
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => void handleDownloadPdf()}
            className={`${btnBase} border border-indigo-200 bg-white text-indigo-800 hover:bg-indigo-50 focus-visible:ring-indigo-400/50`}
            aria-label="Download color PDF report"
          >
            <PdfIcon className="text-indigo-600" />
            {feedback === "pdf" || feedback === "shared"
              ? feedback === "shared"
                ? SHARE_PDF_SHARED_LABEL
                : SHARE_PDF_READY_LABEL
              : SHARE_PDF_CTA_LABEL}
          </button>
        </div>
      </div>
    </div>
  );
}
