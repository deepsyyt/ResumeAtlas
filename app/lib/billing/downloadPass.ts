import crypto from "crypto";

export type DownloadFormat = "pdf" | "editable";

type DownloadPassPayload = {
  userId: string;
  resumeHash: string;
  allowFormat: DownloadFormat;
  exp: number;
};

const DOWNLOAD_PASS_TTL_SECONDS = 10 * 60;

function getSecret(): string {
  const secret =
    process.env.DOWNLOAD_PASS_SECRET?.trim() ||
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    "";
  if (!secret) {
    throw new Error("Missing DOWNLOAD_PASS_SECRET (or SUPABASE_SERVICE_ROLE_KEY fallback).");
  }
  return secret;
}

function toBase64Url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromBase64Url(input: string): Buffer {
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));
  return Buffer.from(normalized + pad, "base64");
}

function signBody(body: string): string {
  const secret = getSecret();
  return toBase64Url(crypto.createHmac("sha256", secret).update(body).digest());
}

export function buildResumeHash(rawText: string): string {
  return crypto.createHash("md5").update(rawText.slice(0, 8000)).digest("hex");
}

export function createDownloadPass(args: {
  userId: string;
  resumeHash: string;
  allowFormat: DownloadFormat;
}): string {
  const payload: DownloadPassPayload = {
    userId: args.userId,
    resumeHash: args.resumeHash,
    allowFormat: args.allowFormat,
    exp: Math.floor(Date.now() / 1000) + DOWNLOAD_PASS_TTL_SECONDS,
  };
  const body = toBase64Url(JSON.stringify(payload));
  const sig = signBody(body);
  return `${body}.${sig}`;
}

export function verifyDownloadPass(
  token: string | null | undefined,
  expected: { userId: string; resumeHash: string; format: DownloadFormat }
): boolean {
  if (!token || !token.includes(".")) return false;
  const [body, sig] = token.split(".", 2);
  if (!body || !sig) return false;
  const expectedSig = signBody(body);
  const a = Buffer.from(sig);
  const b = Buffer.from(expectedSig);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;

  let payload: DownloadPassPayload | null = null;
  try {
    payload = JSON.parse(fromBase64Url(body).toString("utf-8")) as DownloadPassPayload;
  } catch {
    return false;
  }
  if (!payload) return false;
  if (payload.exp < Math.floor(Date.now() / 1000)) return false;
  if (payload.userId !== expected.userId) return false;
  if (payload.resumeHash !== expected.resumeHash) return false;
  if (payload.allowFormat !== expected.format) return false;
  return true;
}
