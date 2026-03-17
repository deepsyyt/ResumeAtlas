import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/app/lib/supabase/server";

export type OptimizeEventBody = {
  ats_score_before?: number;
};

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const accessToken = authHeader?.replace(/Bearer\s+/i, "").trim() || null;

    if (!accessToken) {
      return NextResponse.json(
        { error: "Sign in with Google to use Optimize Resume." },
        { status: 401 }
      );
    }

    const supabase = getSupabaseAdmin();
    const {
      data: { user },
    } = await supabase.auth.getUser(accessToken);

    if (!user) {
      return NextResponse.json(
        { error: "Sign in with Google to use Optimize Resume." },
        { status: 401 }
      );
    }

    const body = (await request.json().catch(() => ({}))) as OptimizeEventBody;
    const atsScoreBefore =
      typeof body.ats_score_before === "number" ? body.ats_score_before : null;

    await supabase.from("optimize_events").insert({
      user_id: user.id,
      ats_score_before: atsScoreBefore,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[optimize-event]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to record event" },
      { status: 500 }
    );
  }
}
