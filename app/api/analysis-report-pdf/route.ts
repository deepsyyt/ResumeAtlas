import { NextResponse } from "next/server";
import {
  renderAnalysisReportPdf,
  type AnalysisReportPdfInput,
} from "@/app/lib/analysisReportPdf";
import type { ATSAnalyzeResult } from "@/app/lib/atsAnalyze";
import type { EvidenceDashboard } from "@/app/lib/resumeEvidenceScore";

function isValidBody(body: unknown): body is AnalysisReportPdfInput {
  if (!body || typeof body !== "object") return false;
  const o = body as Record<string, unknown>;
  const ar = o.analyzeResult as ATSAnalyzeResult | undefined;
  const dash = o.evidenceDashboard as EvidenceDashboard | undefined;
  return (
    !!ar &&
    typeof ar.ats_score === "number" &&
    typeof ar.summary === "string" &&
    !!dash &&
    typeof dash.evidenceMatch === "number" &&
    !!dash.snapshot
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as unknown;
    if (!isValidBody(body)) {
      return NextResponse.json({ error: "Invalid report payload" }, { status: 400 });
    }

    const pdfBuffer = await renderAnalysisReportPdf({
      ...body,
      generatedAt: body.generatedAt ?? new Date().toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    });

    return new Response(pdfBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="ResumeAtlas-Job-Match-Report.pdf"',
      },
    });
  } catch (err) {
    console.error("[analysis-report-pdf]", err);
    return NextResponse.json({ error: "Failed to generate report PDF" }, { status: 500 });
  }
}
