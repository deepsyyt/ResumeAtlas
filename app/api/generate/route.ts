import { NextResponse } from "next/server";

/**
 * Legacy full-resume generation endpoint. Optimization and credits now run through
 * `/optimize` + `/api/optimize` + credit wallets.
 */
export async function POST() {
  return NextResponse.json(
    {
      error:
        "This flow has moved. Run your free ATS analysis, then use Optimize resume to open the credit-based optimizer.",
      code: "USE_OPTIMIZE_FLOW",
    },
    { status: 410 }
  );
}
