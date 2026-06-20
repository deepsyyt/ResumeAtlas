import type { ATSAnalyzeResult } from "@/app/lib/atsAnalyze";
import { computeApplicationVerdict } from "@/app/lib/applicationVerdict";
import {
  applicationVerdictReportLine,
  buildKeywordCoverageMetricInput,
  keywordCoverageReportLine,
  TOP_REJECTION_RISKS_TITLE,
} from "@/app/lib/evidenceMetricCopy";
import type { EvidenceDashboard } from "@/app/lib/resumeEvidenceScore";
import { recommendedFixActionLabel, resolveDashboardRecommendedFixes } from "@/app/lib/recommendedFixes";
import { ROLE_FIT_SECTION_TITLE, verdictLabelFor } from "@/app/lib/roleFitArchetypes";
import { resolveKeywordCoverageVerdict } from "@/app/lib/skillProofLlm";

export const SHARE_RECRUITER_CTA_HINT =
  "Download a color PDF report, or share it on LinkedIn with a short message.";
export const SHARE_LINKEDIN_CTA_LABEL = "LinkedIn";
export const SHARE_PDF_CTA_LABEL = "Download PDF";
export const SHARE_GENERATING_LABEL = "Preparing PDF…";
export const SHARE_PDF_READY_LABEL = "PDF ready";
export const SHARE_PDF_SHARED_LABEL = "Shared";

/** Opens LinkedIn messaging; PDF is shared via file or downloaded first. */
export const LINKEDIN_MESSAGING_URL = "https://www.linkedin.com/messaging/";

export const ANALYSIS_REPORT_PDF_FILENAME = "ResumeAtlas-Job-Match-Report.pdf";

/** Short professional note to accompany the PDF on LinkedIn. */
export function buildShareIntroMessage(args: ShareRecruiterReportArgs): string {
  const verdict = computeApplicationVerdict(args.evidenceDashboard);
  const keywordCoverage =
    buildKeywordCoverageMetricInput({
      score: args.analyzeResult.keyword_coverage ?? args.analyzeResult.ats_score,
      matchedSkills: args.analyzeResult.matched_skills ?? [],
      missingSkills: args.analyzeResult.missing_skills ?? [],
    }) ?? null;
  const keywordVerdict =
    keywordCoverage != null
      ? resolveKeywordCoverageVerdict(args.evidenceDashboard, keywordCoverage)
      : null;
  const summaryLead =
    args.analyzeResult.summary?.trim().split(/[.!?]/)[0]?.trim() ||
    "Please find my résumé–job description fit analysis.";
  return [
    "Hello,",
    "",
    "Sharing a résumé–job description fit analysis I prepared with ResumeAtlas for your review.",
    "",
    `• Application verdict: ${applicationVerdictReportLine(verdict)}`,
    keywordCoverage && keywordVerdict
      ? `• Keyword coverage: ${keywordCoverageReportLine(keywordCoverage, keywordVerdict)}`
      : null,
    "",
    summaryLead + ".",
    "",
    "The full color report is in the attached PDF (or the PDF I am sending next).",
    "",
    "Thank you,",
  ]
    .filter((line): line is string => line != null)
    .join("\n");
}

export async function fetchAnalysisReportPdfBlob(
  args: ShareRecruiterReportArgs
): Promise<Blob> {
  const res = await fetch("/api/analysis-report-pdf", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      analyzeResult: args.analyzeResult,
      evidenceDashboard: args.evidenceDashboard,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      typeof (err as { error?: string }).error === "string"
        ? (err as { error: string }).error
        : "Could not generate PDF report"
    );
  }
  return await res.blob();
}

export function downloadPdfBlob(blob: Blob, filename = ANALYSIS_REPORT_PDF_FILENAME): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/** Open LinkedIn messaging in a new tab (call synchronously on click to avoid popup blockers). */
export function openLinkedInMessagingTab(): void {
  window.open(LINKEDIN_MESSAGING_URL, "_blank", "noopener,noreferrer");
}

/** Download PDF and copy intro message for LinkedIn (tab should already be open). */
export async function sharePdfOnLinkedIn(args: {
  blob: Blob;
  introMessage: string;
}): Promise<void> {
  downloadPdfBlob(args.blob);
  const note =
    args.introMessage +
    "\n\nThe full color PDF report was downloaded. Please attach it to your message.";
  try {
    await navigator.clipboard.writeText(note);
  } catch {
    /* clipboard optional */
  }
}

export type ShareRecruiterReportArgs = {
  analyzeResult: ATSAnalyzeResult;
  evidenceDashboard: EvidenceDashboard;
  toolUrl?: string;
};

function formatSkillLists(result: ATSAnalyzeResult): string[] {
  const lines: string[] = [];
  const matched = result.matched_skills?.length ?? 0;
  const missing = result.missing_skills?.length ?? 0;
  if (matched + missing > 0) {
    lines.push(`Skills evidenced in work bullets: ${matched} matched · ${missing} gap${missing === 1 ? "" : "s"} noted`);
  }
  if (result.matched_skills?.length) {
    const sample = result.matched_skills.slice(0, 8).join(", ");
    const more =
      result.matched_skills.length > 8
        ? ` (+${result.matched_skills.length - 8} more)`
        : "";
    lines.push(`Matched competencies (sample): ${sample}${more}`);
  }
  return lines;
}

/** Plain-text report suitable for email, ATS notes, or messaging a hiring contact. */
export function buildShareRecruiterReportText(args: ShareRecruiterReportArgs): string {
  const { analyzeResult: r, evidenceDashboard: dash } = args;
  const verdict = computeApplicationVerdict(dash);
  const keywordCoverage =
    buildKeywordCoverageMetricInput({
      score: r.keyword_coverage ?? r.ats_score,
      matchedSkills: r.matched_skills ?? [],
      missingSkills: r.missing_skills ?? [],
    }) ?? null;
  const keywordVerdict =
    keywordCoverage != null ? resolveKeywordCoverageVerdict(dash, keywordCoverage) : null;
  const lines: string[] = [];

  lines.push("RESUME–JOB DESCRIPTION ANALYSIS SUMMARY");
  lines.push("Prepared for hiring-team review");
  lines.push("");
  lines.push("Executive summary");
  lines.push(r.summary?.trim() || "Analysis completed for the pasted job description.");
  lines.push("");
  lines.push("Dashboard scores");
  lines.push(`• Application verdict: ${applicationVerdictReportLine(verdict)}`);
  lines.push(`• ${verdict.headline}`);
  if (keywordCoverage && keywordVerdict) {
    lines.push(`• Keyword coverage: ${keywordCoverageReportLine(keywordCoverage, keywordVerdict)}`);
  }
  for (const skillLine of formatSkillLists(r)) {
    lines.push(`• ${skillLine}`);
  }
  if (dash.mostMissingEvidence && dash.mostMissingEvidence.length > 0) {
    lines.push("");
    lines.push(TOP_REJECTION_RISKS_TITLE);
    dash.mostMissingEvidence.slice(0, 5).forEach((item, index) => {
      lines.push(`${index + 1}. ${item}`);
    });
  }
  if (dash.riskAreas.length > 0) {
    lines.push("");
    lines.push("Areas to strengthen in the résumé narrative");
    for (const risk of resolveDashboardRecommendedFixes(dash.riskAreas).slice(0, 3)) {
      lines.push(`• ${recommendedFixActionLabel(risk)}`);
    }
  }
  if (dash.roleFit && dash.roleFit.length > 0) {
    lines.push("");
    lines.push(ROLE_FIT_SECTION_TITLE);
    for (const row of dash.roleFit) {
      lines.push(`• ${row.role}: ${verdictLabelFor(row.verdict)}`);
    }
  }
  lines.push("");
  lines.push("---");
  lines.push(
    "This summary reflects documented résumé evidence against the job description. It supports screening conversations and is not a substitute for interview evaluation or background verification."
  );
  const url = args.toolUrl?.trim();
  if (url) {
    lines.push(`Analysis generated with ResumeAtlas: ${url}`);
  }
  return lines.join("\n");
}

export function canShareRecruiterReport(
  analyzeResult: ATSAnalyzeResult | null | undefined,
  evidenceDashboard: EvidenceDashboard | null | undefined,
  analysisUsedJobDescription: boolean
): boolean {
  return Boolean(
    analysisUsedJobDescription &&
      analyzeResult &&
      evidenceDashboard &&
      analyzeResult.summary?.trim()
  );
}
