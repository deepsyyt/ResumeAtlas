/**
 * Weekly email campaign cron endpoint.
 *
 * HOW THE CRON WORKS
 * ------------------
 * Vercel Cron (see vercel.json) invokes this route every Friday at 09:00 UTC:
 *   schedule: "0 9 * * 5"  →  /api/cron/send-weekly-emails
 *
 * On each run we:
 * 1. Load all emails from public.profiles (service role bypasses RLS)
 * 2. Filter null/empty values and deduplicate (case-insensitive)
 * 3. Send via Resend Batch API in chunks of 100
 * 4. Continue to the next chunk if one batch fails
 * 5. Return { success, sent, failed } for monitoring
 *
 * HOW TO TEST LOCALLY
 * -------------------
 * 1. Add RESEND_API_KEY, SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL),
 *    and SUPABASE_SERVICE_ROLE_KEY to .env.local
 * 2. Start dev server: npm run dev
 * 3. Send ONE test email first (do not hit this route until verified):
 *      http://localhost:3000/api/test-email?email=you@gmail.com
 * 4. Optionally dry-run this route locally after test email succeeds:
 *      http://localhost:3000/api/cron/send-weekly-emails
 *
 * HOW TO VERIFY EMAIL DELIVERY
 * ----------------------------
 * - Check your inbox (and spam) for the test email
 * - Resend Dashboard → Emails: status, opens, bounces
 * - Resend Dashboard → Logs: API errors and batch results
 *
 * HOW TO MONITOR FAILURES
 * -----------------------
 * - This route logs batch errors to stdout (visible in Vercel → Project → Logs)
 * - JSON response includes sent + failed counts per invocation
 * - Set up Vercel log drains or alerts on non-200 responses / failed > 0
 * - Optional: set CRON_SECRET in Vercel env; Vercel sends Authorization: Bearer <CRON_SECRET>
 */

import { NextResponse } from "next/server";
import { chunkArray, sendWeeklyUpdateBatch } from "@/lib/email/resend";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

const BATCH_SIZE = 100;

function isAuthorizedCron(request: Request): boolean {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) return true;
  const auth = request.headers.get("authorization");
  return auth === `Bearer ${secret}`;
}

function collectUniqueEmails(
  rows: { email: string | null }[] | null
): string[] {
  const seen = new Set<string>();
  const emails: string[] = [];

  for (const row of rows ?? []) {
    const raw = row.email;
    if (raw == null) continue;
    const normalized = raw.trim().toLowerCase();
    if (!normalized) continue;
    if (seen.has(normalized)) continue;
    seen.add(normalized);
    emails.push(normalized);
  }

  return emails;
}

export async function GET(request: Request) {
  if (!isAuthorizedCron(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("profiles")
      .select("email");

    if (error) {
      console.error("[cron/send-weekly-emails] Supabase query failed:", error);
      return NextResponse.json(
        { success: false, error: error.message, sent: 0, failed: 0 },
        { status: 500 }
      );
    }

    const recipients = collectUniqueEmails(data);
    if (recipients.length === 0) {
      console.log("[cron/send-weekly-emails] No valid recipient emails found.");
      return NextResponse.json({ success: true, sent: 0, failed: 0 });
    }

    let sent = 0;
    let failed = 0;
    const chunks = chunkArray(recipients, BATCH_SIZE);

    console.log(
      `[cron/send-weekly-emails] Sending to ${recipients.length} unique recipients in ${chunks.length} batch(es).`
    );

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const result = await sendWeeklyUpdateBatch(chunk);

      sent += result.sent;
      failed += result.failed;

      if (result.error) {
        console.error(
          `[cron/send-weekly-emails] Batch ${i + 1}/${chunks.length} failed:`,
          result.error
        );
        // Continue processing remaining batches
        continue;
      }

      console.log(
        `[cron/send-weekly-emails] Batch ${i + 1}/${chunks.length}: sent=${result.sent}, failed=${result.failed}`
      );
    }

    console.log(
      `[cron/send-weekly-emails] Complete. sent=${sent}, failed=${failed}`
    );

    return NextResponse.json({ success: true, sent, failed });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Cron job failed";
    console.error("[cron/send-weekly-emails] Unhandled error:", message);
    return NextResponse.json(
      { success: false, error: message, sent: 0, failed: 0 },
      { status: 500 }
    );
  }
}
