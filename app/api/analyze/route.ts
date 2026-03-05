import { NextResponse } from "next/server";
import { analyzeATS, type ATSAnalysisResult } from "@/app/lib/atsEngine";

export type AnalyzeRequestBody = {
  resumeText: string;
  jobDescription: string;
  country: "USA" | "Canada" | "UK";
  roleLevel?: string;
};

export type AnalyzeResponseBody = ATSAnalysisResult;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AnalyzeRequestBody;
    const { resumeText, jobDescription, country } = body;

    if (
      typeof resumeText !== "string" ||
      typeof jobDescription !== "string" ||
      !["USA", "Canada", "UK"].includes(country)
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid body: resumeText, jobDescription, and country (USA|Canada|UK) required",
        },
        { status: 400 }
      );
    }

    const atsResult = await analyzeATS(resumeText, jobDescription);
    const responseBody: AnalyzeResponseBody = atsResult;
    return NextResponse.json(responseBody);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Analysis failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

