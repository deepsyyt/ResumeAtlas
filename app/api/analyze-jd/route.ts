import { NextResponse } from "next/server";
import { analyzeJD } from "@/app/lib/jdAnalysis";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { jobDescription?: string };
    const jobDescription = body?.jobDescription;
    if (typeof jobDescription !== "string" || !jobDescription.trim()) {
      return NextResponse.json(
        { error: "jobDescription (string) is required" },
        { status: 400 }
      );
    }
    const result = await analyzeJD(jobDescription.trim());
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "JD analysis failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
