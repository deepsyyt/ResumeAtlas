import { createClient } from "@/app/lib/supabase/client";

function getOrCreateAnalyticsSessionId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    let sid = window.sessionStorage.getItem("session_id");
    if (!sid) {
      sid = crypto.randomUUID();
      window.sessionStorage.setItem("session_id", sid);
    }
    return sid;
  } catch {
    return null;
  }
}

/**
 * Best-effort insert into public.billing_events (RLS: insert for anon + authenticated).
 */
export async function logBillingEvent(
  eventType: string,
  metadata?: Record<string, string | number | boolean | null | undefined>
): Promise<void> {
  try {
    const sessionId = getOrCreateAnalyticsSessionId();
    if (!sessionId) return;
    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const meta =
      metadata && Object.keys(metadata).length > 0
        ? Object.fromEntries(
            Object.entries(metadata).filter(([, v]) => v !== undefined)
          )
        : null;
    await supabase.from("billing_events").insert({
      session_id: sessionId,
      event_type: eventType,
      mail_id: session?.user?.email ?? null,
      user_id: session?.user?.id ?? null,
      metadata: meta,
    });
  } catch {
    /* tracking only */
  }
}
