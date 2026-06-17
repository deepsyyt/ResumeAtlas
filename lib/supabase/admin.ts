import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the service role key.
 *
 * Required env vars:
 * - SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL as fallback)
 * - SUPABASE_SERVICE_ROLE_KEY
 *
 * The service role bypasses RLS — use only in API routes / cron jobs, never in the browser.
 */
export function getSupabaseAdmin(): SupabaseClient {
  const url =
    process.env.SUPABASE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url || !key) {
    throw new Error(
      "Missing Supabase admin credentials. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    );
  }

  return createClient(url, key, { auth: { persistSession: false } });
}
