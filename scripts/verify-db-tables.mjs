/**
 * Lists key public tables (migrations + app expectations). Run: npm run db:verify
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import postgres from "postgres";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function loadEnvLocal() {
  const envPath = path.join(root, ".env.local");
  if (!fs.existsSync(envPath)) return;
  const text = fs.readFileSync(envPath, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    process.env[key] = val;
  }
}

loadEnvLocal();

const required = [
  "anonymous_usage",
  "profiles",
  "optimize_events",
  "credit_wallets",
  "payments",
  "credit_transactions",
  "optimizations",
  "analysis_usage",
  "analysis_events",
  "billing_events",
];

const sql = postgres(process.env.DATABASE_URL, { max: 1 });
try {
  const rows = await sql`
    select table_name
    from information_schema.tables
    where table_schema = 'public'
      and table_name in ${sql(required)}
    order by table_name
  `;
  const found = new Set(rows.map((r) => r.table_name));
  const missing = required.filter((t) => !found.has(t));
  if (missing.length) {
    console.error("Missing tables:", missing.join(", "));
    process.exit(1);
  }
  console.log("All expected tables exist:", [...found].join(", "));
} finally {
  await sql.end({ timeout: 5 });
}
