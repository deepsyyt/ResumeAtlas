import { getSupabaseAdmin } from "@/app/lib/supabase/server";

export type UsageType = "anon" | "member";

export type Usage = {
  type: UsageType;
  generationCredits: number;
  downloadCredits: number;
  freePreviewUsed: boolean;
  showFullIntelligence: boolean;
};

export async function getUsage(
  _request: Request,
  accessToken?: string | null
): Promise<Usage> {
  const supabase = getSupabaseAdmin();

  if (!accessToken) {
    return {
      type: "anon",
      generationCredits: 0,
      downloadCredits: 0,
      freePreviewUsed: false,
      showFullIntelligence: true,
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser(accessToken);

  if (!user) {
    return {
      type: "anon",
      generationCredits: 0,
      downloadCredits: 0,
      freePreviewUsed: false,
      showFullIntelligence: true,
    };
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

  return {
    type: "member",
    generationCredits: profile.generation_credits ?? 0,
    downloadCredits: profile.download_credits ?? 0,
    freePreviewUsed: profile.free_preview_used ?? false,
    showFullIntelligence: true,
  };
}
