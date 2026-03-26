import { NextResponse } from "next/server";
import { resolveAnalysisActor } from "@/app/lib/quota";
import { getAnalysisQuotaStatus } from "@/app/lib/quota/store";

export const dynamic = "force-dynamic";

/**
 * GET /api/analysis-quota
 * Returns current quota status for the caller (anonymous or signed-in).
 * Sets ra_anon_id cookie if missing (for anonymous users).
 */
export async function GET(request: Request) {
  try {
    const actor = await resolveAnalysisActor(request);
    const status = await getAnalysisQuotaStatus(actor);
    return NextResponse.json(status);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Quota check failed";
    console.error("[analysis-quota] GET error", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
