export function normalizeText(text: string): string {
  if (!text) return "";

  return text
    .toLowerCase()
    // keep letters, numbers, + / . and whitespace, strip other punctuation
    .replace(/[^a-z0-9+/.\\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

