/**
 * Send a single weekly campaign email for manual testing.
 *
 * Usage (local):
 *   http://localhost:3000/api/test-email?email=you@gmail.com
 *
 * Always test with your own address before running the full cron job.
 * Verify delivery in Resend Dashboard → Emails.
 */

import { NextRequest, NextResponse } from "next/server";
import { sendWeeklyUpdateEmail } from "@/lib/email/resend";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email")?.trim();

  if (!email) {
    return NextResponse.json(
      { success: false, error: "Missing ?email= query parameter." },
      { status: 400 }
    );
  }

  const result = await sendWeeklyUpdateEmail(email);

  if (!result.success) {
    console.error("[test-email] Failed:", result.error);
    return NextResponse.json(
      { success: false, error: result.error },
      { status: 500 }
    );
  }

  console.log("[test-email] Sent to", email, result.id ? `(id: ${result.id})` : "");
  return NextResponse.json({ success: true });
}
