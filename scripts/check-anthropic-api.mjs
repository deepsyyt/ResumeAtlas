/**
 * Quick Anthropic API smoke test (reads .env.local like other scripts).
 * Usage: node scripts/check-anthropic-api.mjs
 */
import { createHash } from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function loadEnvLocal() {
  const envPath = path.join(root, ".env.local");
  if (!fs.existsSync(envPath)) {
    console.error("Missing .env.local");
    process.exit(1);
  }
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = val;
  }
}

loadEnvLocal();

const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
const candidates = process.env.ANTHROPIC_MODEL_CANDIDATES
  ? process.env.ANTHROPIC_MODEL_CANDIDATES.split(",").map((s) => s.trim()).filter(Boolean)
  : [process.env.ANTHROPIC_MODEL?.trim() || "claude-haiku-4-5-20251001"].filter(Boolean);

if (!apiKey) {
  console.error("ANTHROPIC_API_KEY is not set in .env.local");
  process.exit(1);
}

const keyHash = createHash("sha256").update(apiKey).digest("hex").slice(0, 12);
console.log("API key present, length:", apiKey.length, "fingerprint:", apiKey.slice(-4), "hash:", keyHash);
console.log("Model candidates:", candidates.join(", "));

const API_URL = "https://api.anthropic.com/v1/messages";

const modelListResponse = await fetch("https://api.anthropic.com/v1/models", {
  method: "GET",
  headers: {
    "x-api-key": apiKey,
    "anthropic-version": "2023-06-01",
  },
});
const modelListText = await modelListResponse.text();
console.log("\n--- models list ---");
console.log("HTTP", modelListResponse.status);
if (modelListResponse.ok) {
  try {
    const parsed = JSON.parse(modelListText);
    console.log("models available:", parsed.data?.length ?? 0);
  } catch {
    console.log(modelListText.slice(0, 200));
  }
} else {
  try {
    const err = JSON.parse(modelListText);
    console.log("error:", err.error?.type, "-", err.error?.message);
  } catch {
    console.log(modelListText.slice(0, 300));
  }
}

for (const model of candidates) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: 16,
      temperature: 0,
      messages: [{ role: "user", content: "health check" }],
    }),
  });

  const text = await response.text();
  console.log("\n---", model, "---");
  console.log("HTTP", response.status);

  if (!response.ok) {
    try {
      const err = JSON.parse(text);
      console.log("error:", err.error?.type, "-", err.error?.message);
    } catch {
      console.log(text.slice(0, 300));
    }
    continue;
  }

  const data = JSON.parse(text);
  const assistant = data.content?.find((c) => c.type === "text")?.text?.trim();
  console.log("model (response):", data.model);
  console.log("usage:", JSON.stringify(data.usage));
  console.log("assistant:", assistant);
  process.exit(0);
}

process.exit(2);
