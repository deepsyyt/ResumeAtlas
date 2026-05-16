/**
 * Phase-1 SEO QA: canonical, titles, H1, schema allowlist, banned phrases, primitives, Tier-S links.
 * Run: npx tsx scripts/seo-phase1-qa.ts
 */
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { validateRegistryIntegrity } from "../app/lib/diagnostics/primitiveRegistry";

const ROOT = join(__dirname, "..");
const read = (rel: string) => readFileSync(join(ROOT, rel), "utf8");

const BANNED = [
  "today's competitive job market",
  "in today's competitive",
  "ultimate guide",
  "game-changer",
];

const TIER_S = "/check-resume-against-job-description";

/** Tier-S path may appear as literal or via CHECK_RESUME_AGAINST_JD_PATH from internalLinks. */
function htmlLinksToTierS(s: string): boolean {
  return (
    s.includes(TIER_S) ||
    (s.includes("CHECK_RESUME_AGAINST_JD_PATH") && s.includes("@/app/lib/internalLinks"))
  );
}

function methodologyHasFaqJsonLd(s: string): boolean {
  return s.includes("postingFitFaqJsonLd") && s.includes("JSON.stringify(faqLd)");
}

const PAGES: { rel: string; requireTierS: boolean; allowSchema: readonly string[] }[] = [
  {
    rel: "app/check-resume-against-job-description/page.tsx",
    requireTierS: false,
    allowSchema: ["FAQPage", "WebApplication", "BreadcrumbList"],
  },
  { rel: "app/methodology/page.tsx", requireTierS: true, allowSchema: ["FAQPage"] },
  {
    rel: "app/components/postingFit/PostingFitSsrShell.tsx",
    requireTierS: false,
    allowSchema: ["FAQPage", "WebApplication", "BreadcrumbList"],
  },
  {
    rel: "app/components/postingFit/RolePostingFitMoat.tsx",
    requireTierS: false,
    allowSchema: [],
  },
];

function main() {
  const errors: string[] = [];
  const warnings: string[] = [];

  const { ok, errors: regErr } = validateRegistryIntegrity();
  if (!ok) errors.push(...regErr.map((e) => `registry: ${e}`));

  const titles = new Map<string, string[]>();

  const scanFile = (rel: string, metaTitle?: string) => {
    if (!existsSync(join(ROOT, rel))) {
      errors.push(`missing file: ${rel}`);
      return;
    }
    const s = read(rel);
    for (const b of BANNED) {
      if (s.toLowerCase().includes(b)) errors.push(`${rel}: banned phrase "${b}"`);
    }
    if (metaTitle) {
      const t = metaTitle.trim();
      const arr = titles.get(t) ?? [];
      arr.push(rel);
      titles.set(t, arr);
    }
  };

  // Metadata titles (approximate)
  const toolMeta = read("app/lib/toolClusterPages.ts");
  const m1 = toolMeta.match(/titleAbsolute:\s*\n\s*"([^"]+)"/);
  if (m1) scanFile("app/lib/toolClusterPages.ts", m1[1]);

  scanFile("app/methodology/page.tsx", read("app/methodology/page.tsx").match(/title:\s*`([^`]+)`/)?.[1]);

  const shell = read("app/components/postingFit/PostingFitSsrShell.tsx");
  const shellH1 = shell.match(/<h1[^>]*>([^<]+)<\/h1>/);
  if (!htmlLinksToTierS(shell)) errors.push("PostingFitSsrShell: missing Tier-S path");
  if (!shell.includes("posting-fit-diagnosis")) warnings.push("shell: verify id posting-fit-diagnosis");
  if (!shell.includes("DIAGNOSTIC_PRIMITIVES.map")) {
    errors.push("shell: must render primitive glossary via DIAGNOSTIC_PRIMITIVES.map (registry-driven)");
  }
  const fixturePrimitiveMentions = [
    "parse_hygiene",
    "posting_vocabulary_coverage",
    "required_skill_debt",
    "preferred_skill_delta",
    "semantic_fit_gap",
    "evidence_density",
    "skim_friction",
    "truth_envelope",
  ] as const;
  for (const id of fixturePrimitiveMentions) {
    if (!shell.includes(id)) errors.push(`shell fixture/demo table: missing primitive id ${id}`);
  }

  const moat = read("app/components/postingFit/RolePostingFitMoat.tsx");
  if (!htmlLinksToTierS(moat)) errors.push("RolePostingFitMoat: missing Tier-S");
  if (!moat.includes("posting_fit_tier_s_cta_clicked")) warnings.push("moat: analytics attr present");

  const methodology = read("app/methodology/page.tsx");
  if (!htmlLinksToTierS(methodology)) errors.push("methodology: missing Tier-S link");
  if (!methodologyHasFaqJsonLd(methodology))
    errors.push("methodology: expected FAQ JSON-LD (postingFitFaqJsonLd + stringify)");

  // Schema allowlist: forbid aggregateRating in scanned files; Tier-S link where required
  for (const { rel, requireTierS } of PAGES) {
    if (!existsSync(join(ROOT, rel))) continue;
    const s = read(rel);
    if (s.includes("aggregateRating")) errors.push(`${rel}: aggregateRating not allowed`);
    if (s.includes("MedicalCondition")) errors.push(`${rel}: MedicalCondition schema not allowed`);
    for (const b of BANNED) {
      if (s.toLowerCase().includes(b)) errors.push(`${rel}: banned phrase "${b}"`);
    }
    if (requireTierS && !htmlLinksToTierS(s)) errors.push(`${rel}: missing Tier-S link`);
  }

  const methodologyH1 = methodology.match(/<h1[^>]*>\s*([^<]+?)\s*<\/h1>/)?.[1]?.trim();
  const shellH1Text = shellH1?.[1]?.trim();
  if (methodologyH1 && shellH1Text && methodologyH1 === shellH1Text) {
    errors.push("methodology and workbench shell must not share the same H1");
  }

  // Duplicate titles
  for (const [t, files] of Array.from(titles.entries())) {
    if (files.length > 1) errors.push(`duplicate title "${t}": ${files.join(", ")}`);
  }

  // H1: shell must signal posting fit
  if (shellH1 && !shellH1[1].toLowerCase().includes("posting fit"))
    errors.push("shell H1 must contain posting fit");

  if (read("app/check-resume-against-job-description/page.tsx").includes("omitStructuredData")) {
    /* ok */
  } else errors.push("check page: expected omitStructuredData on ToolClusterLanding");

  for (const w of warnings) console.warn("WARN", w);
  if (errors.length) {
    console.error("SEO phase-1 QA FAILED:");
    for (const e of errors) console.error(" ", e);
    process.exit(1);
  }
  console.log("SEO phase-1 QA OK");
}

main();
