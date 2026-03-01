import { getSupabaseAdmin } from "@/app/lib/supabase/server";

const ANON_RESUME_LIMIT = 3;
const ANON_SUMMARY_LIMIT = 3;
const PRO_RESUME_LIMIT = 25;
const PRO_SUMMARY_LIMIT = 25;
const PERIOD_DAYS = 30;

export type UsageType = "anon" | "pro" | "blocked";

export type Usage = {
  type: UsageType;
  resumeCount: number;
  resumeLimit: number;
  summaryCount: number;
  summaryLimit: number;
  showFullIntelligence: boolean;
};

function parseAnonId(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/resumatlas_anon_id=([a-f0-9-]+)/i);
  return match ? match[1] : null;
}

export async function getUsage(
  request: Request,
  accessToken?: string | null
): Promise<Usage> {
  const supabase = getSupabaseAdmin();
  const cookieHeader = request.headers.get("cookie");

  // Logged-in user: check profile
  if (accessToken) {
    const { data: { user } } = await supabase.auth.getUser(accessToken);
    if (!user) {
      // Token invalid, fall back to anon
      const anonId = parseAnonId(cookieHeader);
      return getAnonUsage(supabase, anonId);
    }
    let { data: profile } = await supabase
      .from("profiles")
      .select("plan, monthly_resume_count, monthly_summary_count, period_start")
      .eq("id", user.id)
      .single();

    if (!profile) {
      await supabase.from("profiles").insert({
        id: user.id,
        email: user.email ?? null,
        plan: null,
        monthly_resume_count: 0,
        monthly_summary_count: 0,
        period_start: new Date().toISOString(),
      });
      profile = {
        plan: null,
        monthly_resume_count: 0,
        monthly_summary_count: 0,
        period_start: new Date().toISOString(),
      };
    }

    if (profile.plan !== "pro") {
      return {
        type: "blocked",
        resumeCount: 0,
        resumeLimit: 0,
        summaryCount: 0,
        summaryLimit: 0,
        showFullIntelligence: false,
      };
    }

    let resumeCount = profile.monthly_resume_count ?? 0;
    let summaryCount = profile.monthly_summary_count ?? 0;
    let periodStart = profile.period_start
      ? new Date(profile.period_start)
      : new Date();

    const now = new Date();
    const periodEnd = new Date(periodStart);
    periodEnd.setDate(periodEnd.getDate() + PERIOD_DAYS);
    if (now > periodEnd) {
      await supabase
        .from("profiles")
        .update({
          monthly_resume_count: 0,
          monthly_summary_count: 0,
          period_start: now.toISOString(),
        })
        .eq("id", user.id);
      resumeCount = 0;
      summaryCount = 0;
    }

    return {
      type: "pro",
      resumeCount,
      resumeLimit: PRO_RESUME_LIMIT,
      summaryCount,
      summaryLimit: PRO_SUMMARY_LIMIT,
      showFullIntelligence: true,
    };
  }

  // Anonymous
  const anonId = parseAnonId(cookieHeader);
  return getAnonUsage(supabase, anonId);
}

async function getAnonUsage(
  supabase: Awaited<ReturnType<typeof getSupabaseAdmin>>,
  anonId: string | null
): Promise<Usage> {
  if (!anonId) {
    return {
      type: "anon",
      resumeCount: 0,
      resumeLimit: ANON_RESUME_LIMIT,
      summaryCount: 0,
      summaryLimit: ANON_SUMMARY_LIMIT,
      showFullIntelligence: false,
    };
  }

  const { data: row } = await supabase
    .from("anonymous_usage")
    .select("resume_count, summary_count")
    .eq("anon_id", anonId)
    .single();

  const resumeCount = row?.resume_count ?? 0;
  const summaryCount = row?.summary_count ?? 0;
  const blocked =
    resumeCount >= ANON_RESUME_LIMIT || summaryCount >= ANON_SUMMARY_LIMIT;

  return {
    type: blocked ? "blocked" : "anon",
    resumeCount,
    resumeLimit: ANON_RESUME_LIMIT,
    summaryCount,
    summaryLimit: ANON_SUMMARY_LIMIT,
    showFullIntelligence: false,
  };
}

export async function ensureAnonRecord(request: Request): Promise<{
  anonId: string;
  resumeCount: number;
  summaryCount: number;
  isNew: boolean;
}> {
  const supabase = getSupabaseAdmin();
  const anonId = parseAnonId(request.headers.get("cookie"));
  if (anonId) {
    const { data } = await supabase
      .from("anonymous_usage")
      .select("resume_count, summary_count")
      .eq("anon_id", anonId)
      .single();
    return {
      anonId,
      resumeCount: data?.resume_count ?? 0,
      summaryCount: data?.summary_count ?? 0,
      isNew: false,
    };
  }
  const newId = crypto.randomUUID();
  const { error } = await supabase.from("anonymous_usage").insert({
    anon_id: newId,
    resume_count: 0,
    summary_count: 0,
  });
  if (error) throw new Error("Failed to create anon usage");
  return { anonId: newId, resumeCount: 0, summaryCount: 0, isNew: true };
}

export async function checkResumeLimit(request: Request): Promise<
  | { allowed: true }
  | { allowed: false; reason: string; code: string }
> {
  const authHeader = request.headers.get("authorization");
  const accessToken = authHeader?.replace(/Bearer\s+/i, "") || null;
  const supabase = getSupabaseAdmin();

  if (accessToken) {
    const { data: { user } } = await supabase.auth.getUser(accessToken);
    if (!user) {
      const { resumeCount } = await ensureAnonRecord(request);
      if (resumeCount >= ANON_RESUME_LIMIT)
        return {
          allowed: false,
          reason: "You've used your 3 free resume optimizations. Sign in and upgrade to continue.",
          code: "LIMIT_REACHED",
        };
      return { allowed: true };
    }
    const { data: profile } = await supabase
      .from("profiles")
      .select("plan, monthly_resume_count, period_start")
      .eq("id", user.id)
      .single();
    if (!profile || profile.plan !== "pro")
      return {
        allowed: false,
        reason: "Upgrade to Pro to generate resumes.",
        code: "UPGRADE_REQUIRED",
      };
    let resumeCount = profile.monthly_resume_count ?? 0;
    let periodStart = profile.period_start ? new Date(profile.period_start) : new Date();
    const now = new Date();
    const periodEnd = new Date(periodStart);
    periodEnd.setDate(periodEnd.getDate() + PERIOD_DAYS);
    if (now > periodEnd) resumeCount = 0;
    if (resumeCount >= PRO_RESUME_LIMIT)
      return {
        allowed: false,
        reason: "Monthly limit reached. Resets in 30 days.",
        code: "LIMIT_REACHED",
      };
    return { allowed: true };
  }

  const { resumeCount } = await ensureAnonRecord(request);
  if (resumeCount >= ANON_RESUME_LIMIT)
    return {
      allowed: false,
      reason: "You've used your 3 free resume optimizations. Sign in and upgrade to continue.",
      code: "LIMIT_REACHED",
    };
  return { allowed: true };
}

export async function incrementResume(request: Request): Promise<{ setCookie?: string }> {
  const authHeader = request.headers.get("authorization");
  const accessToken = authHeader?.replace(/Bearer\s+/i, "") || null;
  const supabase = getSupabaseAdmin();

  if (accessToken) {
    const { data: { user } } = await supabase.auth.getUser(accessToken);
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("plan, monthly_resume_count, monthly_summary_count, period_start")
        .eq("id", user.id)
        .single();
      if (profile?.plan === "pro") {
        let resumeCount = profile.monthly_resume_count ?? 0;
        let periodStart = profile.period_start ? new Date(profile.period_start) : new Date();
        const now = new Date();
        const periodEnd = new Date(periodStart);
        periodEnd.setDate(periodEnd.getDate() + PERIOD_DAYS);
        if (now > periodEnd) {
          await supabase.from("profiles").update({
            monthly_resume_count: 1,
            monthly_summary_count: 0,
            period_start: now.toISOString(),
          }).eq("id", user.id);
        } else {
          await supabase.from("profiles").update({
            monthly_resume_count: resumeCount + 1,
          }).eq("id", user.id);
        }
      }
    } else {
      const { anonId, resumeCount, isNew } = await ensureAnonRecord(request);
      await supabase.from("anonymous_usage").update({ resume_count: resumeCount + 1 }).eq("anon_id", anonId);
      if (isNew) return { setCookie: `resumatlas_anon_id=${anonId}; Path=/; Max-Age=31536000; SameSite=Lax` };
    }
    return {};
  }

  const { anonId, resumeCount, isNew } = await ensureAnonRecord(request);
  await supabase.from("anonymous_usage").update({ resume_count: resumeCount + 1 }).eq("anon_id", anonId);
  return isNew ? { setCookie: `resumatlas_anon_id=${anonId}; Path=/; Max-Age=31536000; SameSite=Lax` } : {};
}

export async function checkSummaryLimit(request: Request): Promise<
  | { allowed: true }
  | { allowed: false; reason: string; code: string }
> {
  const authHeader = request.headers.get("authorization");
  const accessToken = authHeader?.replace(/Bearer\s+/i, "") || null;
  const supabase = getSupabaseAdmin();

  if (accessToken) {
    const { data: { user } } = await supabase.auth.getUser(accessToken);
    if (!user) {
      const { summaryCount } = await ensureAnonRecord(request);
      if (summaryCount >= ANON_SUMMARY_LIMIT)
        return {
          allowed: false,
          reason: "You've used your 3 free summary re-optimizations. Sign in and upgrade to continue.",
          code: "LIMIT_REACHED",
        };
      return { allowed: true };
    }
    const { data: profile } = await supabase
      .from("profiles")
      .select("plan, monthly_summary_count, period_start")
      .eq("id", user.id)
      .single();
    if (!profile || profile.plan !== "pro")
      return {
        allowed: false,
        reason: "Upgrade to Pro to re-optimize summaries.",
        code: "UPGRADE_REQUIRED",
      };
    let summaryCount = profile.monthly_summary_count ?? 0;
    const periodStart = profile.period_start ? new Date(profile.period_start) : new Date();
    const now = new Date();
    const periodEnd = new Date(periodStart);
    periodEnd.setDate(periodEnd.getDate() + PERIOD_DAYS);
    if (now > periodEnd) summaryCount = 0;
    if (summaryCount >= PRO_SUMMARY_LIMIT)
      return {
        allowed: false,
        reason: "Monthly limit reached. Resets in 30 days.",
        code: "LIMIT_REACHED",
      };
    return { allowed: true };
  }

  const { summaryCount } = await ensureAnonRecord(request);
  if (summaryCount >= ANON_SUMMARY_LIMIT)
    return {
      allowed: false,
      reason: "You've used your 3 free summary re-optimizations. Sign in and upgrade to continue.",
      code: "LIMIT_REACHED",
    };
  return { allowed: true };
}

export async function incrementSummary(request: Request): Promise<{ setCookie?: string }> {
  const authHeader = request.headers.get("authorization");
  const accessToken = authHeader?.replace(/Bearer\s+/i, "") || null;
  const supabase = getSupabaseAdmin();

  if (accessToken) {
    const { data: { user } } = await supabase.auth.getUser(accessToken);
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("plan, monthly_summary_count, monthly_resume_count, period_start")
        .eq("id", user.id)
        .single();
      if (profile?.plan === "pro") {
        let summaryCount = profile.monthly_summary_count ?? 0;
        let periodStart = profile.period_start ? new Date(profile.period_start) : new Date();
        const now = new Date();
        const periodEnd = new Date(periodStart);
        periodEnd.setDate(periodEnd.getDate() + PERIOD_DAYS);
        if (now > periodEnd) {
          await supabase.from("profiles").update({
            monthly_summary_count: 1,
            monthly_resume_count: 0,
            period_start: now.toISOString(),
          }).eq("id", user.id);
        } else {
          await supabase.from("profiles").update({
            monthly_summary_count: summaryCount + 1,
          }).eq("id", user.id);
        }
      }
    } else {
      const { anonId, summaryCount, isNew } = await ensureAnonRecord(request);
      await supabase.from("anonymous_usage").update({ summary_count: summaryCount + 1 }).eq("anon_id", anonId);
      if (isNew) return { setCookie: `resumatlas_anon_id=${anonId}; Path=/; Max-Age=31536000; SameSite=Lax` };
    }
    return {};
  }

  const { anonId, summaryCount, isNew } = await ensureAnonRecord(request);
  await supabase.from("anonymous_usage").update({ summary_count: summaryCount + 1 }).eq("anon_id", anonId);
  return isNew ? { setCookie: `resumatlas_anon_id=${anonId}; Path=/; Max-Age=31536000; SameSite=Lax` } : {};
}
