import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export function getSupabaseAdmin() {
  if (!url || !key) throw new Error("Missing Supabase env");
  if (key.startsWith("sb_publishable_")) {
    console.warn(
      "[supabase] SUPABASE_SERVICE_ROLE_KEY looks like a publishable/anon key. Server routes need the secret service_role JWT from Supabase Dashboard → Settings → API."
    );
  } else if (!key.startsWith("eyJ") && key.length < 80) {
    console.warn(
      "[supabase] SUPABASE_SERVICE_ROLE_KEY may be invalid; service_role keys are usually a long JWT starting with eyJ."
    );
  }
  return createClient(url, key, { auth: { persistSession: false } });
}
