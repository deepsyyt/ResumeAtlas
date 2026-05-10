import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/app/lib/supabase/server";
import {
  finalizeOptimizationCredit,
  reserveOptimizationCredit,
} from "@/app/lib/billing/creditsServer";
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
  let optimizationId: string | undefined;
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
      const reserved = await reserveOptimizationCredit(user.id, rawText, "download");
      if (!reserved.ok) {
        return NextResponse.json(
          {
            error:
              reserved.code === "NO_CREDITS"
                ? "No downloads remaining. Buy a pack to continue."
                : "Unable to reserve a download credit. Try again.",
            code: reserved.code,
          },
          { status: 403 }
        );
      }
      optimizationId = reserved.optimizationId;
    }

    if (optimizationId) {
      await finalizeOptimizationCredit(optimizationId, user.id, true);
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
    if (optimizationId && userId) {
      await finalizeOptimizationCredit(optimizationId, userId, false);
    }
    console.error("Download editable error", error);
    return NextResponse.json(
      { error: "Failed to generate editable file." },
      { status: 500 }
    );
  }
}
