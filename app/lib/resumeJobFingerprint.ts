/**
 * Normalize resume/JD strings so client-side cache and “same job” checks survive
 * trivial differences (line endings, NBSP) after reload or re-submit.
 */
export function normalizeResumeJdText(s: string | undefined): string {
  return String(s ?? "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\u00a0/g, " ")
    .trim();
}

export function sameResumeAndJob(
  a: { resumeText?: string; jobDescription?: string },
  b: { resumeText?: string; jobDescription?: string }
): boolean {
  return (
    normalizeResumeJdText(a.resumeText) === normalizeResumeJdText(b.resumeText) &&
    normalizeResumeJdText(a.jobDescription) === normalizeResumeJdText(b.jobDescription)
  );
}
