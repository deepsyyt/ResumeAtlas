import { NextResponse } from "next/server";
import { reoptimizeSummary } from "@/app/lib/reoptimizeSummary";
import { checkSummaryLimit, incrementSummary } from "@/app/lib/usage";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      summary?: string;
      jobDescription?: string;
      roleLevel?: string;
    };
    const summary = body?.summary;
    const jobDescription = body?.jobDescription;
    const roleLevel = body?.roleLevel ?? "Mid";

    if (typeof summary !== "string" || !summary.trim()) {
      return NextResponse.json(
        { error: "summary (string) is required" },
        { status: 400 }
      );
    }
    if (typeof jobDescription !== "string" || !jobDescription.trim()) {
      return NextResponse.json(
        { error: "jobDescription (string) is required" },
        { status: 400 }
      );
    }

    const check = await checkSummaryLimit(request);
    if (!check.allowed) {
      return NextResponse.json(
        { error: check.reason, code: check.code },
        { status: 403 }
      );
    }

    const newSummary = await reoptimizeSummary({
      summary: summary.trim(),
      jobDescription: jobDescription.trim(),
      roleLevel: typeof roleLevel === "string" ? roleLevel : "Mid",
    });

    const inc = await incrementSummary(request);
    const res = NextResponse.json({ summary: newSummary });
    if (inc.setCookie) res.headers.set("Set-Cookie", inc.setCookie);
    return res;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Reoptimize failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
