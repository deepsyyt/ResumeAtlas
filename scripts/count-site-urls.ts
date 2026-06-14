/**
 * One-off inventory: unique pathnames (leading slash, no trailing slash except /).
 * Run: npx --yes tsx scripts/count-site-urls.ts
 *
 * Legacy paths (/{role}/resume/*, /{role}/keywords/*, /seo/*, thin redirects) are
 * listed under "redirect-only" — they 301 in next.config/middleware, not App Router pages.
 */
import { getDedupedSitemapEntries } from "../app/lib/sitemapEntries";
import { KEYWORD_PAGES, type RoleSlug } from "../app/lib/seoPages";
import { getIndexedAltRoleKeywordSlugs, getAltRoleKeywordConfig } from "../app/lib/altRoleKeywordPages";
import { PILOT_KEYWORD_SLUGS, getPilotKeywordConfig } from "../app/lib/pilotKeywordPages";
import { ROLE_KEYWORD_INTENTS } from "../app/lib/roleSeo";
import {
  INDEXED_PROBLEM_SLUGS,
  PROBLEM_REDIRECT_SOURCE_SLUGS,
} from "../app/lib/problemPages";
import {
  RESUME_BULLET_ROLES,
  RESUME_BULLET_LEVELS,
} from "../app/lib/resumeBulletPointContent";

const ROLES = Object.keys(KEYWORD_PAGES) as RoleSlug[];

const RESUME_TOPICS = [
  "bullet-points",
  "skills",
  "summary",
  "projects",
  "responsibilities",
  "experience-examples",
] as const;

/** App routes that exist as pages (not redirect-only). */
const EXTRA_STATIC_PATHS: string[] = [
  "/tools",
  "/faq",
  "/optimize",
  "/auth/callback",
  "/business-analyst-vs-data-analyst-resume",
  "/data-analyst-interview-questions",
  "/data-analyst-cover-letter-example",
  "/manifest.webmanifest",
];

/** Known legacy URLs — 301 only (no page.tsx). */
const REDIRECT_ONLY_PATHS: string[] = [
  "/problems",
  "/common-resume-mistakes-fail-ats",
  "/how-ats-scans-resumes",
  "/resume-guides/ats-resume-template",
  "/resume-guides/ats-friendly-resume-example",
  "/resume-guides/resume-format-guide",
  "/resume-guides/resume-template-for-job-application",
  "/resume-guides/resume-projects-examples",
  "/ats-resume-checker-free",
  "/ats-compatibility-check",
  "/resume-score-checker",
  "/data-analyst-sql-resume-keywords",
  "/tableau-data-analyst-resume-example",
  "/ats-resume-template-software-engineer",
  "/resume-keyword-scanner",
  "/how-it-works",
  "/ats-keywords",
];

function norm(p: string): string {
  const x = p.startsWith("/") ? p : "/" + p;
  if (x.length > 1 && x.endsWith("/")) return x.slice(0, -1);
  return x;
}

function main() {
  const indexed = new Set<string>();
  const redirectOnly = new Set<string>();

  const addIndexed = (p: string) => indexed.add(norm(p));
  const addRedirect = (p: string) => redirectOnly.add(norm(p));

  let sitemapCount = 0;
  for (const e of getDedupedSitemapEntries()) {
    try {
      addIndexed(new URL(e.url).pathname);
      sitemapCount += 1;
    } catch {
      /* skip */
    }
  }

  for (const slug of getIndexedAltRoleKeywordSlugs()) {
    addIndexed(getAltRoleKeywordConfig(slug).path);
  }
  for (const slug of PILOT_KEYWORD_SLUGS) {
    addIndexed(getPilotKeywordConfig(slug).path);
  }

  for (const role of ROLES) {
    addRedirect("/" + role + "/keywords");
    for (const intent of ROLE_KEYWORD_INTENTS) {
      addRedirect("/" + role + "/keywords/" + intent);
    }
  }

  for (const role of ROLES) {
    for (const t of RESUME_TOPICS) {
      addRedirect("/" + role + "/resume/" + t);
    }
  }

  for (const slug of INDEXED_PROBLEM_SLUGS) {
    addIndexed("/problems/" + slug);
  }
  for (const slug of PROBLEM_REDIRECT_SOURCE_SLUGS) {
    addRedirect("/problems/" + slug);
  }

  addRedirect("/ats-keywords");

  for (const role of ROLES) {
    addRedirect("/" + role);
    addRedirect("/ats-keywords/" + role);
  }

  for (const role of ROLES) {
    addIndexed("/" + role + "-resume-guide");
    addIndexed("/" + role + "-resume-keywords");
  }

  for (const role of RESUME_BULLET_ROLES) {
    addRedirect("/resume-bullet-points/" + role);
    for (const level of RESUME_BULLET_LEVELS) {
      addRedirect("/resume-bullet-points/" + role + "/" + level);
    }
  }

  for (const p of EXTRA_STATIC_PATHS) addIndexed(p);
  for (const p of REDIRECT_ONLY_PATHS) addRedirect(p);

  const indexedSorted = Array.from(indexed).sort((a, b) => a.localeCompare(b));
  const redirectSorted = Array.from(redirectOnly).sort((a, b) => a.localeCompare(b));

  console.log("=== ResumeAtlas URL inventory ===\n");
  console.log("Indexed app routes (sitemap + pillars): " + indexedSorted.length);
  console.log("Redirect-only legacy paths:              " + redirectSorted.length);
  console.log("Sitemap rows processed:                  " + sitemapCount);
  console.log("\n--- Indexed (keep) ---");
  for (const p of indexedSorted) {
    console.log("https://resumeatlas.io" + p);
  }
  console.log("\n--- Redirect-only (no page.tsx) ---");
  for (const p of redirectSorted) {
    console.log("https://resumeatlas.io" + p);
  }
}

main();
