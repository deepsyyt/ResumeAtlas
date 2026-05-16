/**
 * One-off inventory: unique pathnames (leading slash, no trailing slash except /).
 * Run: npx --yes tsx scripts/count-site-urls.ts
 */
import { getDedupedSitemapEntries } from "../app/lib/sitemapEntries";
import { KEYWORD_PAGES, type RoleSlug } from "../app/lib/seoPages";
import { ROLE_KEYWORD_INTENTS } from "../app/lib/roleSeo";
import { PROBLEM_SLUGS } from "../app/lib/problemPages";
import {
  RESUME_BULLET_ROLES,
  RESUME_BULLET_LEVELS,
} from "../app/lib/resumeBulletPointContent";

const ROLES = Object.keys(KEYWORD_PAGES) as RoleSlug[];

const RESUME_TOPICS = [
  "bullet-points",
  "skills",
  "summary",
  "responsibilities",
  "projects",
  "experience-examples",
] as const;

/** Extra app page routes not covered by sitemap or expansions below. */
const EXTRA_PATHS: string[] = [
  "/problems",
  "/tools",
  "/faq",
  "/how-it-works",
  "/optimize",
  "/auth/callback",
  "/ats-keywords",
  "/ats-resume-checker-free",
  "/ats-compatibility-check",
  "/common-resume-mistakes-fail-ats",
  "/how-ats-scans-resumes",
  "/resume-score-checker",
  "/resume-guides/ats-resume-template",
  "/business-analyst-vs-data-analyst-resume",
  "/data-analyst-interview-questions",
  "/data-analyst-cover-letter-example",
  "/data-analyst-sql-resume-keywords",
  "/tableau-data-analyst-resume-example",
  "/manifest.webmanifest",
  "/.well-known/appspecific/com.chrome.devtools.json",
];

function norm(p: string): string {
  const x = p.startsWith("/") ? p : "/" + p;
  if (x.length > 1 && x.endsWith("/")) return x.slice(0, -1);
  return x;
}

function main() {
  const paths = new Set<string>();

  const add = (p: string) => paths.add(norm(p));

  let sitemapCount = 0;
  for (const e of getDedupedSitemapEntries()) {
    try {
      add(new URL(e.url).pathname);
      sitemapCount += 1;
    } catch {
      /* skip */
    }
  }

  let intentCount = 0;
  for (const role of ROLES) {
    for (const intent of ROLE_KEYWORD_INTENTS) {
      add("/" + role + "/keywords/" + intent);
      intentCount += 1;
    }
  }

  let resumeTopicCount = 0;
  for (const role of ROLES) {
    for (const t of RESUME_TOPICS) {
      add("/" + role + "/resume/" + t);
      resumeTopicCount += 1;
    }
  }

  let problemCount = 0;
  for (const slug of PROBLEM_SLUGS) {
    add("/problems/" + slug);
    problemCount += 1;
  }

  let roleHubCount = 0;
  for (const role of ROLES) {
    add("/" + role);
    roleHubCount += 1;
  }

  let atsKeywordsRoleRedirectCount = 0;
  for (const role of ROLES) {
    add("/ats-keywords/" + role);
    atsKeywordsRoleRedirectCount += 1;
  }

  /** Legacy bullet pathname shapes (still routable in dev; production requests 301 to `/{role}-resume-guide`). */
  let internalBulletCount = 0;
  for (const role of RESUME_BULLET_ROLES) {
    add("/resume-bullet-points/" + role);
    internalBulletCount += 1;
    for (const level of RESUME_BULLET_LEVELS) {
      add("/resume-bullet-points/" + role + "/" + level);
      internalBulletCount += 1;
    }
  }

  let extraAdded = 0;
  for (const p of EXTRA_PATHS) {
    add(p);
    extraAdded += 1;
  }

  const sorted = Array.from(paths).sort((a, b) => a.localeCompare(b));
  const overlapNote =
    sitemapCount > paths.size
      ? "Sitemap rows can dedupe to fewer unique paths than row count."
      : "";

  console.log(JSON.stringify({ siteUrl: "https://resumeatlas.io" }, null, 0));
  console.log("");
  console.log("=== ResumeAtlas URL inventory (pathname-level) ===\n");
  console.log("Unique pathnames:     " + paths.size);
  console.log("from sitemap rows:  " + sitemapCount + " (before cross-bucket dedupe)");
  console.log("/{role}/keywords/*: " + intentCount + " (expanded)");
  console.log("/{role}/resume/*:   " + resumeTopicCount + " (expanded)");
  console.log("/problems/{slug}:   " + problemCount);
  console.log("/{role} hubs:       " + roleHubCount);
  console.log("/ats-keywords/{r}:  " + atsKeywordsRoleRedirectCount);
  console.log("/resume-bullet-points/* (internal): " + internalBulletCount);
  console.log("extra static paths: " + extraAdded);
  if (overlapNote) console.log(overlapNote);
  console.log("");
  console.log("All paths (sorted):");
  for (const p of sorted) {
    console.log("https://resumeatlas.io" + p);
  }
}

main();
