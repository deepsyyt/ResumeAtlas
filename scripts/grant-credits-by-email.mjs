/**
 * Grants optimization credits to a user by email.
 *
 * Usage:
 *   node scripts/grant-credits-by-email.mjs <email> [credits]
 *
 * Examples:
 *   node scripts/grant-credits-by-email.mjs user@example.com
 *   node scripts/grant-credits-by-email.mjs user@example.com 5
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

const emailArg = (process.argv[2] || "").trim().toLowerCase();
const creditsArgRaw = (process.argv[3] || "5").trim();
const credits = Number.parseInt(creditsArgRaw, 10);

if (!emailArg) {
  console.error("Usage: node scripts/grant-credits-by-email.mjs <email> [credits]");
  process.exit(1);
}

if (!Number.isInteger(credits) || credits <= 0) {
  console.error("Invalid credits value. Use a positive integer (e.g. 5).");
  process.exit(1);
}

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("DATABASE_URL missing from .env.local");
  process.exit(1);
}

const sql = postgres(databaseUrl, { max: 1 });

try {
  const users = await sql`
    select id, email
    from auth.users
    where lower(email) = ${emailArg}
    limit 2
  `;

  if (users.length === 0) {
    console.error(`No user found for email: ${emailArg}`);
    process.exit(1);
  }

  const user = users[0];
  const note = `Manual credit grant via script (${credits} credits)`;

  await sql.begin(async (tx) => {
    await tx`
      insert into public.credit_wallets (user_id, credits_remaining, credits_purchased_total)
      values (${user.id}, (${credits})::int, (${credits})::int)
      on conflict (user_id) do update
      set
        credits_remaining = public.credit_wallets.credits_remaining + (${credits})::int,
        credits_purchased_total = public.credit_wallets.credits_purchased_total + (${credits})::int,
        updated_at = now()
    `;

    await tx`
      insert into public.credit_transactions (user_id, type, credits, metadata)
      values (
        ${user.id},
        'admin_adjustment',
        (${credits})::int,
        jsonb_build_object('note', (${note})::text, 'email', (${emailArg})::text)
      )
    `;
  });

  const [wallet] = await sql`
    select credits_remaining, credits_purchased_total, credits_consumed_total, credits_reserved
    from public.credit_wallets
    where user_id = ${user.id}
    limit 1
  `;

  console.log(`Granted ${credits} credit(s) to ${user.email}.`);
  console.log(
    `Balance: remaining=${wallet?.credits_remaining ?? 0}, reserved=${wallet?.credits_reserved ?? 0}, purchased_total=${wallet?.credits_purchased_total ?? 0}, consumed_total=${wallet?.credits_consumed_total ?? 0}`
  );
} catch (e) {
  console.error(e.message || e);
  process.exit(1);
} finally {
  await sql.end({ timeout: 10 });
}
