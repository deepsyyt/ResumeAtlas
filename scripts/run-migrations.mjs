/**
 * Applies all SQL files in supabase/migrations/ in lexical order.
 * Loads DATABASE_URL from process.env or from .env.local in the project root.
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

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("DATABASE_URL is not set. Add it to .env.local or the environment.");
  process.exit(1);
}

const migrationsDir = path.join(root, "supabase", "migrations");
const files = fs
  .readdirSync(migrationsDir)
  .filter((f) => f.endsWith(".sql"))
  .sort();

const sql = postgres(databaseUrl, { max: 1 });

try {
  for (const file of files) {
    const full = path.join(migrationsDir, file);
    const content = fs.readFileSync(full, "utf8");
    console.log("Applying:", file);
    await sql.unsafe(content);
  }
  console.log("Done. Applied", files.length, "migration file(s).");
} catch (e) {
  console.error("Migration failed:", e.message || e);
  process.exit(1);
} finally {
  await sql.end({ timeout: 10 });
}
