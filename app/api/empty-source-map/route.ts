import { NextResponse } from "next/server";

/** Minimal valid source map (V3) for DevTools when a chunk has no published .map. */
const EMPTY_SOURCE_MAP = '{"version":3,"sources":[],"names":[],"mappings":""}';

export async function GET() {
  return new NextResponse(EMPTY_SOURCE_MAP, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
