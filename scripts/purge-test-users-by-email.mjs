/**
 * Remove test users and all related billing / usage data by email.
 *
 * Usage:
 *   node scripts/purge-test-users-by-email.mjs           # dry run (counts only)
 *   node scripts/purge-test-users-by-email.mjs --confirm   # delete
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import postgres from "postgres";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const TEST_EMAILS = [
  "deepsyyt@gmail.com",
  "m.merwyn1992@gmail.com",
  "aistackdev@gmail.com",
  "mdnstopby@gmail.com",
  "deepikanadarajan1992@gmail.com",
  "deepika.nadarajan9@gmail.com",
  "merwynecom@gmail.com",
  "shortreelsapp@gmail.com",
].map((e) => e.toLowerCase());

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

const confirm = process.argv.includes("--confirm");
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("DATABASE_URL missing from .env.local");
  process.exit(1);
}

const sql = postgres(databaseUrl, { max: 1 });

async function countFor(label, query) {
  const [row] = await query;
  const n = Number(row?.n ?? 0);
  console.log(`${label}: ${n}`);
  return n;
}

try {
  const users = await sql`
    select id, lower(email) as email
    from auth.users
    where lower(email) in ${sql(TEST_EMAILS)}
    order by email
  `;

  console.log(`\nMatched auth.users (${users.length}):`);
  for (const u of users) console.log(`  - ${u.email} (${u.id})`);

  const userIds = users.map((u) => u.id);
  const emailList = TEST_EMAILS;

  console.log("\nRow counts to delete:\n");

  await countFor(
    "analysis_events (mail_id)",
    sql`select count(*)::int as n from public.analysis_events where lower(mail_id) in ${sql(emailList)}`
  );

  if (userIds.length > 0) {
    await countFor(
      "billing_events (mail_id or user_id)",
      sql`select count(*)::int as n from public.billing_events
          where lower(mail_id) in ${sql(emailList)} or user_id in ${sql(userIds)}`
    );
    await countFor(
      "analysis_usage",
      sql`select count(*)::int as n from public.analysis_usage where user_id in ${sql(userIds)}`
    );
    await countFor(
      "credit_transactions",
      sql`select count(*)::int as n from public.credit_transactions where user_id in ${sql(userIds)}`
    );
    await countFor(
      "payments (user_id)",
      sql`select count(*)::int as n from public.payments where user_id in ${sql(userIds)}`
    );
    await countFor(
      "payments (email)",
      sql`select count(*)::int as n from public.payments where lower(email) in ${sql(emailList)}`
    );
    await countFor(
      "optimizations",
      sql`select count(*)::int as n from public.optimizations where user_id in ${sql(userIds)}`
    );
    await countFor(
      "optimize_events",
      sql`select count(*)::int as n from public.optimize_events where user_id in ${sql(userIds)}`
    );
    await countFor(
      "job_applications",
      sql`select count(*)::int as n from public.job_applications where user_id in ${sql(userIds)}`
    );
    await countFor(
      "credit_wallets",
      sql`select count(*)::int as n from public.credit_wallets where user_id in ${sql(userIds)}`
    );
    await countFor(
      "profiles",
      sql`select count(*)::int as n from public.profiles where id in ${sql(userIds)}`
    );
    await countFor(
      "auth.users",
      sql`select count(*)::int as n from auth.users where id in ${sql(userIds)}`
    );
  } else {
    console.log("(no auth.users rows — skipping user-scoped tables)");
  }

  if (!confirm) {
    console.log("\nDry run only. Re-run with --confirm to delete.\n");
    process.exit(0);
  }

  console.log("\nDeleting…\n");

  await sql.begin(async (tx) => {
    const delAnalysisEvents = await tx`
      delete from public.analysis_events
      where lower(mail_id) in ${tx(emailList)}
      returning id
    `;
    console.log(`Deleted analysis_events: ${delAnalysisEvents.length}`);

    if (userIds.length > 0) {
      await tx`
        update public.credit_wallets
        set active_application_id = null, updated_at = now()
        where user_id in ${tx(userIds)}
      `;

      const delBilling = await tx`
        delete from public.billing_events
        where lower(mail_id) in ${tx(emailList)} or user_id in ${tx(userIds)}
        returning id
      `;
      console.log(`Deleted billing_events: ${delBilling.length}`);

      const delUsage = await tx`
        delete from public.analysis_usage where user_id in ${tx(userIds)} returning id
      `;
      console.log(`Deleted analysis_usage: ${delUsage.length}`);

      const delOptEvents = await tx`
        delete from public.optimize_events where user_id in ${tx(userIds)} returning id
      `;
      console.log(`Deleted optimize_events: ${delOptEvents.length}`);

      const delOptimizations = await tx`
        delete from public.optimizations where user_id in ${tx(userIds)} returning id
      `;
      console.log(`Deleted optimizations: ${delOptimizations.length}`);

      const delTx = await tx`
        delete from public.credit_transactions where user_id in ${tx(userIds)} returning id
      `;
      console.log(`Deleted credit_transactions: ${delTx.length}`);

      const delPayments = await tx`
        delete from public.payments
        where user_id in ${tx(userIds)} or lower(email) in ${tx(emailList)}
        returning id
      `;
      console.log(`Deleted payments: ${delPayments.length}`);

      const delApps = await tx`
        delete from public.job_applications where user_id in ${tx(userIds)} returning id
      `;
      console.log(`Deleted job_applications: ${delApps.length}`);

      const delWallets = await tx`
        delete from public.credit_wallets where user_id in ${tx(userIds)} returning user_id
      `;
      console.log(`Deleted credit_wallets: ${delWallets.length}`);

      const delProfiles = await tx`
        delete from public.profiles where id in ${tx(userIds)} returning id
      `;
      console.log(`Deleted profiles: ${delProfiles.length}`);

      const delUsers = await tx`
        delete from auth.users where id in ${tx(userIds)} returning id
      `;
      console.log(`Deleted auth.users: ${delUsers.length}`);
    }
  });

  console.log("\nDone.\n");
} catch (e) {
  console.error(e.message || e);
  process.exit(1);
} finally {
  await sql.end({ timeout: 15 });
}
