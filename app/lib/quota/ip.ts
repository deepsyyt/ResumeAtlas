import { createHash } from "crypto";

/**
 * Extracts client IP from request headers, accounting for proxies.
 * Checks x-forwarded-for, x-real-ip, cf-connecting-ip (Cloudflare), etc.
 */
export function getClientIp(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first && isValidIp(first)) return first;
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp && isValidIp(realIp)) return realIp;
  const cfIp = request.headers.get("cf-connecting-ip");
  if (cfIp && isValidIp(cfIp)) return cfIp;
  return null;
}

function isValidIp(s: string): boolean {
  const v4 = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
  const v6 = /^[\da-f:]+$/i;
  return v4.test(s) || v6.test(s);
}

const SALT = process.env.ANALYSIS_QUOTA_IP_SALT || "ra-default-salt-change-in-production";

/**
 * One-way hash of IP for storage. Never store raw IP.
 */
export function hashIp(ip: string | null): string | null {
  if (!ip || !ip.trim()) return null;
  return createHash("sha256").update(SALT + ip.trim()).digest("hex");
}
