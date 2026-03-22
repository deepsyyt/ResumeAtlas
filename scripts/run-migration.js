/**
 * Run a Supabase migration using DATABASE_URL.
 * Get the connection string from: Supabase Dashboard > Project Settings > Database > Connection string (URI)
 * Add to .env.local: DATABASE_URL="postgresql://postgres.[ref]:[password]@..."
 */
const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

// Load .env.local
try {
  const envPath = path.join(__dirname, "..", ".env.local");
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, "utf8");
    for (const line of content.split("\n")) {
      const m = line.match(/^([^#=]+)=(.*)$/);
      if (m && !process.env[m[1].trim()]) {
        process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "");
      }
    }
  }
} catch (e) {
  console.warn("Could not load .env.local:", e.message);
}

const dbUrl = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;
if (!dbUrl) {
  console.error(
    "Missing DATABASE_URL or SUPABASE_DB_URL. Get it from Supabase Dashboard > Project Settings > Database > Connection string (URI)"
  );
  process.exit(1);
}

async function run() {
  const client = new Client({ connectionString: dbUrl });
  try {
    await client.connect();
    const migrationPath = path.join(__dirname, "..", "supabase", "migrations", "004_analysis_usage.sql");
    const sql = fs.readFileSync(migrationPath, "utf8");
    await client.query(sql);
    console.log("Migration 004_analysis_usage.sql applied successfully.");
  } catch (err) {
    console.error("Migration failed:", err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

run();
