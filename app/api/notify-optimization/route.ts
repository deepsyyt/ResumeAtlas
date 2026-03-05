import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/app/lib/supabase/server";

type NotifyBody = {
  email: string;
};

export async function POST(request: Request) {
  try {
    const { email } = (await request.json()) as Partial<NotifyBody>;
    if (typeof email !== "string" || !email.trim()) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    await supabase.from("optimization_waitlist").insert({
      email: email.trim().toLowerCase(),
      created_at: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Subscription failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

