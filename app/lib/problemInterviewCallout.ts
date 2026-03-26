/**
 * Path-based routing for the site-wide problem CTA (internal link distribution).
 */

export type ProblemInterviewCalloutResolved = {
  /** Text before the link */
  prefix: string;
  linkText: string;
  href: string;
};

export function normalizePathname(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

const ATS_CALLOUT_PATHS = new Set([
  "/how-to-pass-ats",
  "/how-ats-scans-resumes",
  "/common-resume-mistakes-fail-ats",
  "/ats-resume-checker",
]);

/**
 * Maps URL to a problem page for contextual internal linking.
 *
 * - Guides → resume-not-getting-interviews
 * - Keyword cluster (ATS keywords pages, keyword-style SEO, legacy keyword URL) → missing-keywords-in-resume
 * - ATS education / checker pages → ats-rejecting-my-resume
 * - Everything else → resume-not-getting-interviews (broad default)
 */
export function resolveProblemInterviewCallout(
  pathname: string
): ProblemInterviewCalloutResolved | null {
  const p = normalizePathname(pathname);

  if (p === "/problems/resume-not-getting-interviews") {
    return null;
  }
  if (p === "/problems/missing-keywords-in-resume") {
    return null;
  }
  if (p === "/problems/ats-rejecting-my-resume") {
    return null;
  }

  if (p.startsWith("/resume-guides")) {
    return {
      prefix: "Not getting interview calls? ",
      linkText: "See why your resume may be getting rejected",
      href: "/problems/resume-not-getting-interviews",
    };
  }

  if (p === "/ats-keywords" || p.startsWith("/ats-keywords/") || p.startsWith("/seo/")) {
    return {
      prefix: "Worried about keyword gaps on your resume? ",
      linkText: "See how missing keywords affect your interviews",
      href: "/problems/missing-keywords-in-resume",
    };
  }

  if (ATS_CALLOUT_PATHS.has(p)) {
    return {
      prefix: "Think ATS is blocking your resume? ",
      linkText: "See why ATS may reject your resume",
      href: "/problems/ats-rejecting-my-resume",
    };
  }

  return {
    prefix: "Not getting interview calls? ",
    linkText: "See why your resume may be getting rejected",
    href: "/problems/resume-not-getting-interviews",
  };
}
