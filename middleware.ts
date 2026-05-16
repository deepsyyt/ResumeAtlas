import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SEO_RESUME_TOPIC =
  "skills|summary|responsibilities|projects|experience-examples";

/**
 * Fixes legacy `/seo/{role}-resume-{topic}` URLs → `/{role}-resume-guide#{topic}`.
 * (Replaces a brittle next.config redirect that could not concatenate role slugs safely.)
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const re = new RegExp(
    `^/seo/([a-z0-9-]+)-resume-(${SEO_RESUME_TOPIC})/?$`,
    "i"
  );
  const match = pathname.match(re);
  if (!match) {
    return NextResponse.next();
  }
  const role = match[1];
  const topic = match[2];
  const url = request.nextUrl.clone();
  url.pathname = `/${role}-resume-guide`;
  url.hash = topic;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/seo/:path*"],
};
