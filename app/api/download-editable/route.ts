import { NextResponse } from "next/server";
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

type DownloadEditableRequestBody = {
  rawText?: string;
};

export async function POST(request: Request) {
  let userId: string | undefined;
  try {
    const authHeader = request.headers.get("authorization");
    const accessToken = authHeader?.replace(/Bearer\s+/i, "").trim() || null;
    if (!accessToken) {
      return NextResponse.json(
        { error: "Login required to download editable file." },
        { status: 401 }
      );
    }

    const supabase = getSupabaseAdmin();
    const {
      data: { user },
    } = await supabase.auth.getUser(accessToken);
    if (!user) {
      return NextResponse.json(
        { error: "Login required to download editable file." },
        { status: 401 }
      );
    }
    userId = user.id;

    const body = (await request.json()) as DownloadEditableRequestBody;
    const rawText = typeof body?.rawText === "string" ? body.rawText.trim() : "";
    if (!rawText) {
      return NextResponse.json(
        { error: "Missing editable resume content." },
        { status: 400 }
      );
    }

    const resumeHash = buildResumeHash(rawText);
    const downloadPassToken = request.headers.get("x-resumeatlas-download-pass");
    const hasValidPass = verifyDownloadPass(downloadPassToken, {
      userId: user.id,
      resumeHash,
      format: "editable",
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
    if (!hasValidPass) {
      const completed = await completeApplication(user.id);
      if (!completed.ok) {
        console.error("[download-editable] funnel complete failed", completed.code);
      }
    }
    const nextPass = hasValidPass
      ? null
      : createDownloadPass({
          userId: user.id,
          resumeHash,
          allowFormat: "pdf",
        });
    return new Response(rawText as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Content-Disposition": 'attachment; filename="resume-optimized.txt"',
        ...(nextPass ? { "x-resumeatlas-download-pass": nextPass } : {}),
      },
    });
  } catch (error) {
    console.error("Download editable error", error);
    return NextResponse.json(
      { error: "Failed to generate editable file." },
      { status: 500 }
    );
  }
}
