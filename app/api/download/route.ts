import { NextResponse } from "next/server";
import {
  createResumePdfDocument,
  renderProfessionalResumePdf,
  type PdfDoc,
} from "@/app/lib/resumeExportPdf";
import { getSupabaseAdmin } from "@/app/lib/supabase/server";
import {
  assertFunnelAllowsDownload,
  completeApplication,
} from "@/app/lib/billing/funnelServer";
import {
  buildResumeHash,
  createDownloadPass,
  verifyDownloadPass,
} from "@/app/lib/billing/downloadPass";
import type { Resume } from "@/app/types/resume";

type DownloadRequestBody = {
  resume?: Resume;
  rawText?: string;
};

/** Minimal plain-text fallback when only rawText is sent (legacy path). */
function renderPlainTextPdf(doc: PdfDoc, rawText: string): void {
  const lines = rawText.replace(/\r\n?/g, "\n").split("\n");
  doc.font("Helvetica").fontSize(10).fillColor("#1e293b");
  for (const line of lines) {
    const t = line.trim();
    if (!t) {
      doc.moveDown(0.35);
      continue;
    }
    const h =
      doc.heightOfString(t, { width: doc.page.width - doc.page.margins.left - doc.page.margins.right }) +
      4;
    if (doc.page.height - doc.page.margins.bottom - doc.y < h) {
      doc.addPage();
    }
    doc.text(t, { align: "left", lineGap: 1.1 });
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const accessToken = authHeader?.replace(/Bearer\s+/i, "").trim() || null;

    if (!accessToken) {
      return NextResponse.json(
        { error: "Login required to download resume." },
        { status: 401 }
      );
    }

    const supabase = getSupabaseAdmin();
    const {
      data: { user },
    } = await supabase.auth.getUser(accessToken);

    if (!user) {
      return NextResponse.json(
        { error: "Login required to download resume." },
        { status: 401 }
      );
    }

    const body = (await request.json()) as DownloadRequestBody;
    const resume = body?.resume;
    const rawText = typeof body?.rawText === "string" ? body.rawText.trim() : "";

    if (!resume && !rawText) {
      return NextResponse.json(
        { error: "Missing resume payload." },
        { status: 400 }
      );
    }

    const reservationSeed = rawText || JSON.stringify(resume);
    const resumeHash = buildResumeHash(reservationSeed);
    const downloadPassToken = request.headers.get("x-resumeatlas-download-pass");
    const hasValidPass = verifyDownloadPass(downloadPassToken, {
      userId: user.id,
      resumeHash,
      format: "pdf",
    });
    if (!hasValidPass) {
      const allowed = await assertFunnelAllowsDownload(user.id);
      if (!allowed.ok) {
        return NextResponse.json(
          {
            error: allowed.message,
            code: allowed.code,
          },
          { status: 403 }
        );
      }
      if (allowed.paymentRequired) {
        return NextResponse.json(
          {
            error: "Payment required to download your tailored resume.",
            code: "DOWNLOAD_PAYMENT_REQUIRED",
          },
          { status: 402 }
        );
      }
    }

    const doc = createResumePdfDocument();
    const chunks: Buffer[] = [];

    doc.on("data", (chunk) => {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    });

    const pdfPromise = new Promise<Buffer>((resolve) => {
      doc.on("end", () => {
        resolve(Buffer.concat(chunks));
      });
    });

    if (resume) {
      renderProfessionalResumePdf(doc, resume);
    } else {
      renderPlainTextPdf(doc, rawText);
    }

    doc.end();
    const pdfBuffer = await pdfPromise;

    if (!hasValidPass) {
      const completed = await completeApplication(user.id);
      if (!completed.ok) {
        console.error("[download] funnel complete failed", completed.code);
      }
    }
    const nextPass = hasValidPass
      ? null
      : createDownloadPass({
          userId: user.id,
          resumeHash,
          allowFormat: "editable",
        });
    return new Response(pdfBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="ResumeAtlas_Optimized_Resume.pdf"',
        ...(nextPass ? { "x-resumeatlas-download-pass": nextPass } : {}),
      },
    });
  } catch (error) {
    console.error("Download PDF error", error);
    return NextResponse.json(
      { error: "Failed to generate PDF." },
      { status: 500 }
    );
  }
}
