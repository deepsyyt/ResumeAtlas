/**
 * Deletes public.payments rows for auth.users matching the given emails.
 * credit_transactions.payment_id becomes NULL (ON DELETE SET NULL).
 *
 * Usage: node scripts/delete-payments-by-email.mjs <email> [<email> ...]
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

const emails = process.argv.slice(2).map((e) => e.trim().toLowerCase()).filter(Boolean);
if (emails.length === 0) {
  console.error("Usage: node scripts/delete-payments-by-email.mjs <email> [<email> ...]");
  process.exit(1);
}

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("DATABASE_URL missing from .env.local");
  process.exit(1);
}

const sql = postgres(databaseUrl, { max: 1 });

try {
  const rows = await sql`
    delete from public.payments
    where user_id in (
      select id from auth.users
      where lower(email) in ${sql(emails)}
    )
    returning id
  `;
  console.log("Deleted", rows.length, "payment row(s) for:", emails.join(", "));
} catch (e) {
  console.error(e.message || e);
  process.exit(1);
} finally {
  await sql.end({ timeout: 10 });
}
