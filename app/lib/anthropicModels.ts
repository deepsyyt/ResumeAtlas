const DEFAULT_MODEL_CANDIDATES = [
  "claude-3-5-haiku-latest",
  "claude-3-5-sonnet-latest",
  "claude-3-opus-latest",
] as const;

export function resolveAnthropicModelCandidates(): string[] {
  const fromList = process.env.ANTHROPIC_MODEL_CANDIDATES
    ?.split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (fromList && fromList.length > 0) return fromList;

  const single = process.env.ANTHROPIC_MODEL?.trim();
  if (single) return [single, ...DEFAULT_MODEL_CANDIDATES.filter((m) => m !== single)];

  return [...DEFAULT_MODEL_CANDIDATES];
}

export function parseAnthropicErrorType(responseText: string): string | null {
  try {
    const parsed = JSON.parse(responseText) as {
      error?: { type?: unknown };
    };
    return typeof parsed.error?.type === "string" ? parsed.error.type : null;
  } catch {
    return null;
  }
}
