import { NextResponse } from "next/server";
import { getUsage, ensureAnonRecord } from "@/app/lib/usage";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const accessToken = authHeader?.replace(/Bearer\s+/i, "") || null;
    const usage = await getUsage(request, accessToken);

    if (usage.type === "anon" && usage.resumeCount === 0 && usage.summaryCount === 0) {
      const cookieHeader = request.headers.get("cookie");
      const hasAnonCookie = cookieHeader?.includes("resumatlas_anon_id=");
      if (!hasAnonCookie) {
        const { anonId } = await ensureAnonRecord(request);
        const res = NextResponse.json(usage);
        res.headers.set(
          "Set-Cookie",
          `resumatlas_anon_id=${anonId}; Path=/; Max-Age=31536000; SameSite=Lax`
        );
        return res;
      }
    }

    return NextResponse.json(usage);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Usage check failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
