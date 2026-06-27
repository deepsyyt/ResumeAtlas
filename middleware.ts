import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  resolveAtsKeywordsRedirect,
  resolveLegacyKeywordsRedirect,
  resolveLegacyResumeTopicRedirect,
} from "@/app/lib/legacySeoPaths";

const SEO_RESUME_TOPIC =
  "skills|summary|responsibilities|projects|experience-examples";

/** Indexed guide URLs under `/resume-guides/*` (all other legacy slugs 301). */
const INDEXED_RESUME_GUIDE_PATHS = new Set([
  "/resume-guides/resume-skills-examples",
  "/resume-guides/resume-work-experience-examples",
]);

function normalizePathname(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

/**
 * Legacy paths that must never serve HTML (301/308 only):
 * - `/seo/*` → canonical guides or `/resume-examples`
 * - `/{role}/keywords/*` → `/{role}-resume-keywords`
 * - `/{role}/resume/{topic}` → `/{role}-resume-guide#{topic}`
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const atsKeywords = resolveAtsKeywordsRedirect(pathname);
  if (atsKeywords) {
    const url = request.nextUrl.clone();
    const hashIndex = atsKeywords.indexOf("#");
    if (hashIndex >= 0) {
      url.pathname = atsKeywords.slice(0, hashIndex);
      url.hash = atsKeywords.slice(hashIndex + 1);
    } else {
      url.pathname = atsKeywords;
      url.hash = "";
    }
    const response = NextResponse.redirect(url, 308);
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  if (pathname.startsWith("/resume-guides/")) {
    const normalized = normalizePathname(pathname);
    if (!INDEXED_RESUME_GUIDE_PATHS.has(normalized)) {
      const url = request.nextUrl.clone();
      url.pathname =
        normalized === "/resume-guides/resume-projects-examples"
          ? "/resume-guides/resume-work-experience-examples"
          : "/ats-resume-template";
      url.hash = "";
      return NextResponse.redirect(url, 308);
    }
  }

  const legacyKeywords = resolveLegacyKeywordsRedirect(pathname);
  if (legacyKeywords) {
    const url = request.nextUrl.clone();
    const hashIndex = legacyKeywords.indexOf("#");
    if (hashIndex >= 0) {
      url.pathname = legacyKeywords.slice(0, hashIndex);
      url.hash = legacyKeywords.slice(hashIndex + 1);
    } else {
      url.pathname = legacyKeywords;
      url.hash = "";
    }
    return NextResponse.redirect(url, 308);
  }

  const legacyResumeTopic = resolveLegacyResumeTopicRedirect(pathname);
  if (legacyResumeTopic) {
    const url = request.nextUrl.clone();
    const hashIndex = legacyResumeTopic.indexOf("#");
    url.pathname = legacyResumeTopic.slice(0, hashIndex);
    url.hash = legacyResumeTopic.slice(hashIndex + 1);
    return NextResponse.redirect(url, 308);
  }

  const topicRe = new RegExp(
    `^/seo/([a-z0-9-]+)-resume-(${SEO_RESUME_TOPIC})/?$`,
    "i"
  );
  const topicMatch = pathname.match(topicRe);
  if (topicMatch) {
    const role = topicMatch[1];
    const topic = topicMatch[2];
    const url = request.nextUrl.clone();
    url.pathname = `/${role}-resume-guide`;
    url.hash = topic;
    return NextResponse.redirect(url, 308);
  }

  const bulletRe = /^\/seo\/bullet-points-([a-z0-9-]+)-resume\/?$/i;
  const bulletMatch = pathname.match(bulletRe);
  if (bulletMatch) {
    const url = request.nextUrl.clone();
    url.pathname = `/${bulletMatch[1]}-resume-guide`;
    return NextResponse.redirect(url, 301);
  }

  if (pathname === "/seo" || pathname === "/seo/") {
    const url = request.nextUrl.clone();
    url.pathname = "/resume-examples";
    return NextResponse.redirect(url, 301);
  }

  if (pathname.startsWith("/seo/")) {
    const url = request.nextUrl.clone();
    url.pathname = "/resume-examples";
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/ats-keywords",
    "/ats-keywords/:path*",
    "/seo/:path*",
    "/seo",
    "/:role/keywords",
    "/:role/keywords/:path*",
    "/:role/resume/:path*",
    "/resume-guides/:path*",
  ],
};
