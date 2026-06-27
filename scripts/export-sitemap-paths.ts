import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { getDedupedSitemapEntries } from "../app/lib/sitemapEntries";
import { buildUrlsetXml } from "../app/lib/sitemapXml";

const entries = getDedupedSitemapEntries();
const paths = entries.map((e) => new URL(e.url).pathname).sort();
const xml = buildUrlsetXml(entries);

const outDir = join(process.cwd(), "ai-context", "competitors", "resumeatlas");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "sitemap.xml"), xml, "utf-8");
writeFileSync(join(outDir, "paths.json"), JSON.stringify(paths, null, 2), "utf-8");

console.log(JSON.stringify({ count: paths.length, paths }, null, 2));
