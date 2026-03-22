import { createHash } from "crypto";

/** Normalize text for hashing: trim, collapse whitespace. */
function normalize(text: string): string {
  return String(text ?? "").trim().replace(/\s+/g, " ");
}

/**
 * SHA-256 hash of input text for dedup and usage recording.
 */
export function hashText(text: string): string {
  return createHash("sha256").update(normalize(text)).digest("hex");
}

/**
 * Combined hash of resume + JD for deduplication checks.
 */
export function hashResumeJd(resumeText: string, jobDescription: string): string {
  const combined = normalize(resumeText) + "\n---\n" + normalize(jobDescription);
  return createHash("sha256").update(combined).digest("hex");
}
