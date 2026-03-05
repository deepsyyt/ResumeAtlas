import { NextResponse } from "next/server";
import { getUsage } from "@/app/lib/usage";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const accessToken = authHeader?.replace(/Bearer\s+/i, "") || null;
    const usage = await getUsage(request, accessToken);
    return NextResponse.json(usage);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Usage check failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
