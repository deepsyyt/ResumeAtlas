export type RejectionRiskRow = {
  headline: string;
  description: string;
};

export function rejectionRisksTitle(count: number): string {
  const n = Math.max(1, Math.min(count, 5));
  return `${n} thing${n === 1 ? "" : "s"} reducing interview chances`;
}

export function rejectionRiskRowCopy(item: string): RejectionRiskRow {
  const trimmed = item.trim();
  const lower = trimmed.toLowerCase();

  if (lower.includes("aws") || lower.includes("mentioned but not proven")) {
    return {
      headline: /aws/i.test(trimmed) ? trimmed : "AWS mentioned but not proven",
      description: "Recruiters look for hands-on proof, not just mentions.",
    };
  }

  if (lower.includes("genai") || lower.includes("llm") || lower.includes("quantif")) {
    return {
      headline: trimmed,
      description: "Impact metrics help recruiters assess seniority quickly.",
    };
  }

  if (lower.includes("eval") || lower.includes("experiment")) {
    return {
      headline: trimmed,
      description: "Experiment rigor is a differentiator for ML/AI roles.",
    };
  }

  if (lower.includes("forecast") || lower.includes("budget") || lower.includes("fp&a")) {
    return {
      headline: normalizeHeadline(trimmed),
      description: "Finance roles expect forecasting and budgeting proof in bullets.",
    };
  }

  if (/^no /i.test(trimmed)) {
    const headline = normalizeHeadline(trimmed);
    return {
      headline,
      description: "This gap may cause recruiters to pass on your application.",
    };
  }

  return {
    headline: trimmed,
    description: "Recruiters weigh this when screening for this role.",
  };
}

function normalizeHeadline(item: string): string {
  let headline = item.replace(/^no\s+/i, "").trim();
  if (!headline) return item;

  headline = headline.charAt(0).toUpperCase() + headline.slice(1);

  if (!/\b(not|missing|demonstrated|proven|quantified|shown)\b/i.test(headline)) {
    if (/\bexperience\b/i.test(headline)) {
      return headline.replace(/\bexperience\b/i, "experience not demonstrated");
    }
    return `${headline} not demonstrated`;
  }

  return headline;
}
