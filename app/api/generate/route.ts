import { NextResponse } from "next/server";
import { generateResume } from "@/app/lib/claude";
import { getSupabaseAdmin } from "@/app/lib/supabase/server";
import type { Resume } from "@/app/types/resume";
import {
  clipToWordLimit,
  JOB_DESCRIPTION_MAX_WORDS,
  RESUME_TEXT_MAX_WORDS,
} from "@/app/lib/inputWordLimits";

export type GenerateRequestBody = {
  resumeText: string;
  jobDescription: string;
  country: "USA" | "Canada" | "UK";
  roleLevel?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as GenerateRequestBody;
    const { country, roleLevel } = body;
    let resumeText = body.resumeText;
    let jobDescription = body.jobDescription;

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

    resumeText = clipToWordLimit(resumeText, RESUME_TEXT_MAX_WORDS);
    jobDescription = clipToWordLimit(jobDescription, JOB_DESCRIPTION_MAX_WORDS);

    const supabase = getSupabaseAdmin();
    const authHeader = request.headers.get("authorization");
    const accessToken = authHeader?.replace(/Bearer\s+/i, "").trim() || null;

    if (!accessToken) {
      return NextResponse.json(
        { error: "Login required to optimize resume." },
        { status: 401 }
      );
    }

    const {
      data: { user },
    } = await supabase.auth.getUser(accessToken);

    if (!user) {
      return NextResponse.json(
        { error: "Login required to optimize resume." },
        { status: 401 }
      );
    }

    let { data: profile, error } = await supabase
      .from("profiles")
      .select("generation_credits, download_credits, free_preview_used")
      .eq("id", user.id)
      .single();

    if (!profile || error) {
      await supabase.from("profiles").insert({
        id: user.id,
        email: user.email ?? null,
        resume_credits: 0,
        free_preview_used: false,
        generation_credits: 0,
        download_credits: 0,
      });
      profile = {
        generation_credits: 0,
        download_credits: 0,
        free_preview_used: false,
      };
    }

    const hasFreePreview = !profile.free_preview_used;
    const generationCredits = profile.generation_credits ?? 0;
    const downloadCredits = profile.download_credits ?? 0;

    let consumeMode: "free" | "generation";
    if (hasFreePreview) {
      consumeMode = "free";
    } else if (generationCredits > 0 && downloadCredits > 0) {
      consumeMode = "generation";
    } else {
      return NextResponse.json(
        {
          error:
            "Your optimization pack is exhausted. Buy another 25 optimizations to continue.",
        },
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

    const res = NextResponse.json(result);

    try {
      if (consumeMode === "free") {
        await supabase
          .from("profiles")
          .update({ free_preview_used: true })
          .eq("id", user.id)
          .eq("free_preview_used", false);
      } else {
        await supabase
          .from("profiles")
          .update({
            generation_credits: generationCredits - 1,
          })
          .eq("id", user.id)
          .gt("generation_credits", 0);
      }
    } catch {
      // swallow credit update errors so generation still succeeds
    }

    return res;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
