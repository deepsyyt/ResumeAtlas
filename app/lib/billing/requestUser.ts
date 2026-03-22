import { getSupabaseAdmin } from "@/app/lib/supabase/server";

export async function getBearerUser(request: Request) {
  const authHeader = request.headers.get("authorization");
  const accessToken = authHeader?.replace(/^Bearer\s+/i, "").trim() || null;
  if (!accessToken) {
    return { user: null as null, accessToken: null as null };
  }
  const supabase = getSupabaseAdmin();
  const {
    data: { user },
  } = await supabase.auth.getUser(accessToken);
  return { user, accessToken };
}
