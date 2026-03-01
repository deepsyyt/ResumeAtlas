import { NextResponse } from "next/server";
import { generateResume } from "@/app/lib/claude";
import { checkResumeLimit, incrementResume } from "@/app/lib/usage";
import type { Resume } from "@/app/types/resume";

export type GenerateRequestBody = {
  resumeText: string;
  jobDescription: string;
  country: "USA" | "Canada" | "UK";
  roleLevel?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as GenerateRequestBody;
    const { resumeText, jobDescription, country, roleLevel } = body;

    if (
      typeof resumeText !== "string" ||
      typeof jobDescription !== "string" ||
      !["USA", "Canada", "UK"].includes(country)
    ) {
      return NextResponse.json(
        { error: "Invalid body: resumeText, jobDescription, and country (USA|Canada|UK) required" },
        { status: 400 }
      );
    }

    const check = await checkResumeLimit(request);
    if (!check.allowed) {
      return NextResponse.json(
        { error: check.reason, code: check.code },
        { status: 403 }
      );
    }

    const payload = {
      resumeText,
      jobDescription,
      country,
      roleLevel: typeof roleLevel === "string" ? roleLevel : "Mid",
    };

    let result: Resume;
    try {
      result = await generateResume(payload);
    } catch (firstError) {
      try {
        result = await generateResume(payload);
      } catch {
        throw firstError;
      }
    }

    const inc = await incrementResume(request);
    const res = NextResponse.json(result);
    if (inc.setCookie) res.headers.set("Set-Cookie", inc.setCookie);
    return res;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
