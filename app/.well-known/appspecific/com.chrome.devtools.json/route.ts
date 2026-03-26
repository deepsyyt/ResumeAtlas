import { NextResponse } from "next/server";

/**
 * Chrome DevTools may request this optional file. Returning 200 avoids noisy 404s in dev logs.
 * @see https://developer.chrome.com/docs/devtools/overview
 */
export async function GET() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Cache-Control": "public, max-age=86400",
      },
    }
  );
}
