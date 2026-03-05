import { NextResponse } from "next/server";
import { reoptimizeSummary } from "@/app/lib/reoptimizeSummary";
import { getSupabaseAdmin } from "@/app/lib/supabase/server";

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

    const supabase = getSupabaseAdmin();
    const authHeader = request.headers.get("authorization");
    const accessToken = authHeader?.replace(/Bearer\s+/i, "").trim() || null;

    if (!accessToken) {
      return NextResponse.json(
        { error: "Login required to re-optimize summary." },
        { status: 401 }
      );
    }

    const {
      data: { user },
    } = await supabase.auth.getUser(accessToken);

    if (!user) {
      return NextResponse.json(
        { error: "Login required to re-optimize summary." },
        { status: 401 }
      );
    }

    let { data: profile, error } = await supabase
      .from("profiles")
      .select("generation_credits, download_credits")
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
      };
    }

    const genCredits = profile.generation_credits ?? 0;
    const dlCredits = profile.download_credits ?? 0;
    if (genCredits <= 0 || dlCredits <= 0) {
      return NextResponse.json(
        {
          error:
            "Your optimization pack is exhausted. Buy another 25 optimizations to continue.",
        },
        { status: 403 }
      );
    }

    const newSummary = await reoptimizeSummary({
      summary: summary.trim(),
      jobDescription: jobDescription.trim(),
      roleLevel: typeof roleLevel === "string" ? roleLevel : "Mid",
    });

    const res = NextResponse.json({ summary: newSummary });
    try {
      await supabase
        .from("profiles")
        .update({ generation_credits: genCredits - 1 })
        .eq("id", user.id)
        .gt("generation_credits", 0);
    } catch {
      // ignore credit update failures
    }
    return res;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Reoptimize failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
