/**
 * Replace em/en dashes in app/ with ASCII punctuation (less "AI sludge" tone).
 * Run: node scripts/strip-em-dashes.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..", "app");
const EM = "\u2014";
const EN = "\u2013";

function transform(content, { skipEnDashRegex = false } = {}) {
  let s = content;
  s = s.split(` ${EM} `).join(" - ");
  s = s.replace(/(\S)—(\S)/g, "$1, $2");
  s = s.split(EM).join("-");
  if (!skipEnDashRegex) {
    s = s.split(` ${EN} `).join(" - ");
    s = s.replace(/([A-Za-z0-9])–([A-Za-z0-9])/g, "$1-$2");
  }
  return s;
}

function walk(dir) {
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, name.name);
    if (name.isDirectory()) {
      if (name.name === "node_modules" || name.name === ".next") continue;
      walk(p);
    } else if (/\.(tsx?|jsx?|mjs)$/.test(name.name)) {
      const raw = fs.readFileSync(p, "utf8");
      if (!raw.includes(EM) && !raw.includes(EN)) continue;
      const skipEn = p.replace(/\\/g, "/").endsWith("lib/resumeParser.ts");
      const next = transform(raw, { skipEnDashRegex: skipEn });
      if (next !== raw) {
        fs.writeFileSync(p, next, "utf8");
        console.log("updated", path.relative(ROOT, p));
      }
    }
  }
}

walk(ROOT);
console.log("done");
