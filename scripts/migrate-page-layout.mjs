import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(process.cwd(), "app");

const WIDTH_MAP = [
  ["max-w-7xl", "page-shell"],
  ["max-w-6xl", "page-shell"],
  ["max-w-5xl", "page-prose-xl"],
  ["max-w-4xl", "page-prose-wide"],
  ["max-w-3xl", "page-prose"],
  ["max-w-2xl", "page-prose-sm"],
];

function migrateClassValue(value) {
  let cls = value;
  let matched = false;

  for (const [width, utility] of WIDTH_MAP) {
    const patterns = [
      new RegExp(String.raw`\brelative mx-auto ${width.replace(/-/g, "\\-")}\b`),
      new RegExp(String.raw`\bmx-auto ${width.replace(/-/g, "\\-")}\b`),
      new RegExp(String.raw`\b${width.replace(/-/g, "\\-")} mx-auto\b`),
    ];
    for (const pattern of patterns) {
      if (pattern.test(cls)) {
        matched = true;
        if (pattern.source.startsWith("\\brelative")) {
          cls = cls.replace(pattern, `relative ${utility}`);
        } else {
          cls = cls.replace(pattern, utility);
        }
      }
    }
  }

  if (!matched) return value;

  cls = cls
    .replace(/\bpx-4\b/g, "")
    .replace(/\bsm:px-6\b/g, "")
    .replace(/\blg:px-8\b/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();

  return cls;
}

function migrateContent(content) {
  return content.replace(/className="([^"]+)"/g, (full, cls) => {
    const next = migrateClassValue(cls);
    return next === cls ? full : `className="${next}"`;
  });
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith(".tsx")) out.push(full);
  }
  return out;
}

let updated = 0;
for (const file of walk(ROOT)) {
  const original = fs.readFileSync(file, "utf8");
  const next = migrateContent(original);
  if (next !== original) {
    fs.writeFileSync(file, next, "utf8");
    updated += 1;
    console.log(path.relative(process.cwd(), file));
  }
}
console.log(`Updated ${updated} files`);
