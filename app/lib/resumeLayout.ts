/**
 * Detects the common pasted-resume layout:
 * CONTACT → skill sub-headings (PROGRAMING, TOOLS) → name/title → PROFILE/SUMMARY →
 * WORK EXPERIENCE (with Project: blocks) → EDUCATION/CERTS/AWARDS → more jobs → Soft skills.
 */
export function isContactSkillsHeaderLayout(raw: string): boolean {
  const lower = raw.toLowerCase();
  let score = 0;
  if (/\bcontact\b/.test(lower)) score++;
  if (/\bprogram(m)?ing\b/.test(lower)) score++;
  if (/\btools\b/.test(lower) && !/\btools and\b/.test(lower)) score++;
  if (/project\s*\d*\s*:/.test(lower) || /\bproject:\s/.test(lower)) score++;
  if (/\bwork\s+experience\b/.test(lower)) score++;
  if (/\bsoft\s*skills?\b/.test(lower)) score++;
  return score >= 3;
}
