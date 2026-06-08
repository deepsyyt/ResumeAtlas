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

import { TOOL_CLUSTER_PATHS_FOR_OAUTH } from "@/app/lib/toolClusterPages";

const ATS_CALLOUT_PATHS = new Set<string>([
  "/ats-resume-template",
  ...TOOL_CLUSTER_PATHS_FOR_OAUTH,
]);

/**
 * Maps URL to a problem page for contextual internal linking.
 *
 * - Keyword cluster (ATS keywords pages and role resume topic pages) → resume keyword scanner
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
  if (p === "/problems/ats-rejecting-my-resume") {
    return null;
  }
  if (p === "/optimize") {
    return null;
  }

  const isRoleKeywordsPath =
    /^\/[^/]+-resume-keywords$/.test(p) ||
    /^\/[^/]+-resume-guide$/.test(p) ||
    /^\/(business-systems-analyst|systems-analyst|business-intelligence|data-engineer|sql-developer|power-bi)-resume-keywords$/.test(
      p
    );
  if (p === "/ats-keywords" || isRoleKeywordsPath) {
    return {
      prefix: "Worried about keyword gaps on your resume? ",
      linkText: "Scan your resume against a job posting",
      href: "/#ats-checker-form",
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
