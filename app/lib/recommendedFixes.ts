import type { ApplicationVerdict } from "@/app/lib/applicationVerdict";
import { rejectionRiskThemeTokens } from "@/app/lib/rejectionRiskOptimize";

const FIX_KEYWORD_STOP = new Set([
  "add",
  "the",
  "your",
  "you",
  "to",
  "in",
  "on",
  "at",
  "for",
  "and",
  "or",
  "with",
  "from",
  "into",
  "that",
  "this",
  "a",
  "an",
  "of",
  "by",
  "as",
  "is",
  "are",
  "was",
  "were",
  "be",
  "have",
  "has",
  "had",
  "not",
  "no",
  "mention",
  "include",
  "show",
  "proof",
  "evidence",
  "experience",
  "project",
  "bullet",
  "bullets",
  "resume",
  "role",
  "job",
  "using",
  "use",
  "more",
  "new",
  "line",
  "lines",
]);

/** Terms to highlight in preview for selected recommended fixes. */
export function extractFixHighlightKeywords(fixes: string[]): string[] {
  const out = new Set<string>();

  for (const fix of fixes) {
    const trimmed = fix.trim();
    if (!trimmed) continue;

    const quoted = trimmed.match(/["']([^"']{2,48})["']/g);
    if (quoted) {
      for (const raw of quoted) {
        const inner = raw.slice(1, -1).trim();
        if (inner) out.add(inner);
      }
    }

    const caps = trimmed.match(/\b([A-Z][a-zA-Z0-9+#/.-]{1,28}|[A-Z]{2,})\b/g);
    if (caps) {
      for (const token of caps) {
        if (token.length >= 2 && !FIX_KEYWORD_STOP.has(token.toLowerCase())) {
          out.add(token);
        }
      }
    }

    const percents = trimmed.match(/\d+(?:\.\d+)?%/g);
    if (percents) {
      for (const pct of percents) out.add(pct);
    }

    for (const token of rejectionRiskThemeTokens(trimmed)) {
      if (token.length >= 3 && !FIX_KEYWORD_STOP.has(token.toLowerCase())) {
        out.add(token);
      }
    }

    const chip = recommendedFixChipLabel(trimmed, 0);
    const chipLower = chip.toLowerCase();
    if (chipLower.includes("aws")) out.add("AWS");
    if (chipLower.includes("azure")) out.add("Azure");
    if (chipLower.includes("genai") || chipLower.includes("llm")) out.add("GenAI");
    if (chipLower.includes("langchain")) out.add("LangChain");
    if (chipLower.includes("bedrock")) out.add("Bedrock");
    if (chipLower.includes("kubernetes") || chipLower.includes(" k8s")) out.add("Kubernetes");
  }

  return Array.from(out)
    .filter((kw) => kw.trim().length >= 2)
    .sort((a, b) => b.length - a.length);
}

export function recommendedFixKey(fix: string): string {
  return fix.toLowerCase().trim();
}

/** Short chip label from LLM recommended-fix sentence. */
export function recommendedFixChipLabel(fix: string, _index: number): string {
  const t = fix.trim();
  const lower = t.toLowerCase();
  if (lower.includes("aws")) return "Add AWS project evidence";
  if (lower.includes("genai") || lower.includes("llm")) return "Add measurable GenAI outcome";
  if (lower.includes("eval")) return "Add evaluation metrics";
  if (lower.includes("langchain") || lower.includes("bedrock")) {
    return `Add ${lower.includes("langchain") ? "LangChain" : "Bedrock"} proof`;
  }
  if (t.length <= 42) return t;
  const cut = t.slice(0, 40).replace(/\s+\S*$/, "").trim();
  return cut.length >= 12 ? `${cut}…` : t.slice(0, 36).trim() + (t.length > 36 ? "…" : "");
}

export function distributeFixUplift(totalUplift: number, count: number): number[] {
  if (count <= 0) return [];
  if (totalUplift <= 0) return Array.from({ length: count }, () => 0);
  const base = Math.floor(totalUplift / count);
  const extra = totalUplift % count;
  return Array.from({ length: count }, (_, i) => base + (i < extra ? 1 : 0));
}

export function selectedFixUpliftTotal(
  fixes: string[],
  selected: string[],
  verdict: ApplicationVerdict
): number {
  if (fixes.length === 0 || selected.length === 0) return 0;
  const uplifts = distributeFixUplift(verdict.shortlistUplift, fixes.length);
  const selectedKeys = new Set(selected.map(recommendedFixKey));
  return fixes.reduce((sum, fix, index) => {
    if (selectedKeys.has(recommendedFixKey(fix))) return sum + (uplifts[index] ?? 0);
    return sum;
  }, 0);
}
