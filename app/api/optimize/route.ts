import { NextResponse } from "next/server";
import type { StructuredResume } from "@/app/api/parse-resume/route";

export type OptimizeRequestBody = {
  resumeText: string;
  jobDescription: string;
  analyzeResult: {
    ats_score: number;
    missing_skills?: string[];
    matched_skills?: string[];
    keyword_coverage?: number;
  };
  /** Structured resume parsed on the client via /api/parse-resume. */
  structuredResume?: StructuredResume;
};

export type OptimizeResponse = {
  optimizedResume: string;
  scoreAfter: number;
  addedKeywords: string[];
  bulletImprovements: number;
  quantifiedAchievements: number;
  /** Optimized structured resume (bullets rewritten, structure preserved). */
  optimizedStructuredResume?: StructuredResume;
  /** Bullet texts where new quantification (numbers) was added. */
  quantifiedBullets?: string[];
  /** Detailed per-bullet changes for UI explanation. */
  bulletChanges?: {
    original: string;
    improved: string;
    addedKeywords: string[];
    quantified: boolean;
  }[];
};

const API_URL = "https://api.anthropic.com/v1/messages";

/** Weak bullet detector: short, no numbers, or missing strong action verb. */
function isWeakBullet(bullet: string): boolean {
  if (!bullet?.trim()) return false;
  const trimmed = bullet.trim();
  const tooShort = trimmed.length < 90;
  const noNumber = !/\d/.test(trimmed);
  const noStrongVerb = !/^(Developed|Led|Built|Designed|Implemented|Created|Optimized)/i.test(
    trimmed
  );
  return tooShort || noNumber || noStrongVerb;
}

type BulletWithContext = {
  expIndex: number;
  bulletIndex: number;
  text: string;
};

type ImprovedMap = Record<string, string>;

async function rewriteBullet(
  bullet: string,
  keyword: string | null,
  apiKey: string,
  model: string
): Promise<string> {
  const systemPrompt = `You are improving a resume bullet for ATS optimization.

You MUST:
- Keep the original meaning.
- Start with a strong action verb.
- When the bullet describes results, improvements, scale, ownership, or scope, you MUST add at least one realistic numeric metric (%, count, $ or timeframe).
- Only skip adding a number when there is truly no reasonable way to quantify the work from the text.
- Naturally include the given keyword when it fits.
- Keep it realistic (no fake metrics).
- Maximum 22 words.

If the original bullet already has strong impact, improve clarity instead.

Return ONLY the improved bullet. No quotes, no explanation.`;

  const userPrompt = `Bullet:
"${bullet}"

Keyword to include:
"${keyword ?? ""}"`;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: 120,
      temperature: 0,
      top_p: 1,
      system: systemPrompt,
      messages: [{ role: "user" as const, content: userPrompt }],
    }),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => "");
    console.error("[optimize] bullet rewrite error", response.status, errText.slice(0, 200));
    return bullet;
  }

  const data = (await response.json().catch(() => null)) as
    | { content?: { type: string; text?: string }[] }
    | null;
  const raw = data?.content?.find((c) => c.type === "text")?.text?.trim() ?? "";
  const cleaned = raw.replace(/^["']|["']$/g, "").trim();
  return cleaned.length > 0 ? cleaned : bullet;
}

function buildOptimizedTextFromStructured(structured: StructuredResume): string {
  const lines: string[] = [];

  const headerParts: string[] = [];
  if (structured.name) headerParts.push(structured.name);
  if (structured.title) headerParts.push(structured.title);
  const headerLine = headerParts.join(" — ");
  if (headerLine) lines.push(headerLine);
  if (structured.contact) lines.push(structured.contact);
  if (lines.length > 0) lines.push("");

  if (structured.summary) {
    lines.push("Professional Summary");
    lines.push(structured.summary);
    lines.push("");
  }

  if (Array.isArray(structured.skills) && structured.skills.length > 0) {
    lines.push("Skills");
    lines.push(structured.skills.join(" · "));
    lines.push("");
  }

  if (Array.isArray(structured.experience) && structured.experience.length > 0) {
    lines.push("Experience");
    for (const exp of structured.experience) {
      const role = exp.role?.trim();
      const company = exp.company?.trim();
      const dates = exp.dates?.trim();
      const header = [role, company, dates].filter(Boolean).join(" — ");
      if (header) lines.push(header);
      for (const b of exp.bullets ?? []) {
        if (b && b.trim()) lines.push(`• ${b.trim()}`);
      }
      lines.push("");
    }
  }

  if (Array.isArray(structured.education) && structured.education.length > 0) {
    lines.push("Education");
    for (const edu of structured.education) {
      if (edu && edu.trim()) {
        lines.push(edu.trim());
      }
    }
    lines.push("");
  }

  return lines.length > 0 ? lines.join("\n").trim() : "";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as OptimizeRequestBody;
    const resumeText = body?.resumeText;
    const jobDescription = body?.jobDescription ?? "";
    const analyzeResult = body?.analyzeResult;

    if (typeof resumeText !== "string" || !analyzeResult || typeof analyzeResult.ats_score !== "number") {
      return NextResponse.json(
        { error: "resumeText and analyzeResult with ats_score are required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    const model =
      process.env.ANTHROPIC_MODEL && process.env.ANTHROPIC_MODEL.trim().length > 0
        ? process.env.ANTHROPIC_MODEL
        : "claude-3-haiku-20240307";

    // If no structured resume is provided, do not attempt to rebuild from raw text.
    // Just return the original resume and unchanged score.
    if (!body.structuredResume || !Array.isArray(body.structuredResume.experience)) {
      const scoreBefore = analyzeResult.ats_score;
      const response: OptimizeResponse = {
        optimizedResume: resumeText,
        scoreAfter: scoreBefore,
        addedKeywords: [],
        bulletImprovements: 0,
        quantifiedAchievements: 0,
      };
      return NextResponse.json(response);
    }

    const baseStructured = body.structuredResume;

    const missingSkills = Array.isArray(analyzeResult.missing_skills)
      ? analyzeResult.missing_skills.filter((s) => typeof s === "string" && s.trim().length > 0)
      : [];

    const bulletsWithContext: BulletWithContext[] = [];
    baseStructured.experience.forEach((exp, expIndex) => {
      (exp.bullets ?? []).forEach((text, bulletIndex) => {
        if (text && text.trim()) {
          bulletsWithContext.push({ expIndex, bulletIndex, text });
        }
      });
    });

    const weakBullets = bulletsWithContext.filter((b) => isWeakBullet(b.text)).slice(0, 5);

    const improvedMap: ImprovedMap = {};

    if (apiKey && weakBullets.length > 0 && missingSkills.length > 0) {
      for (let i = 0; i < weakBullets.length; i++) {
        const { text } = weakBullets[i]!;
        const keyword = missingSkills[i % missingSkills.length] ?? null;
        const improved = await rewriteBullet(text, keyword, apiKey, model);
        if (improved && improved !== text) {
          improvedMap[text] = improved;
        }
      }
    }

    const optimizedStructured: StructuredResume = {
      ...baseStructured,
      experience: baseStructured.experience.map((exp) => ({
        ...exp,
        bullets: (exp.bullets ?? []).map((b) => improvedMap[b] ?? b),
      })),
    };

    const improvedBullets = Object.values(improvedMap);
    const bulletImprovements = improvedBullets.length;
    const quantifiedBullets = improvedBullets.filter((b) => /\d/.test(b));
    const quantifiedAchievements = quantifiedBullets.length;

    const optimizedText = buildOptimizedTextFromStructured(optimizedStructured) || resumeText;

    // Compute actually added keywords by comparing original vs optimized text.
    const originalTextLower = String(resumeText ?? "").toLowerCase();
    const optimizedTextLower = optimizedText.toLowerCase();
    const addedKeywords = missingSkills.filter((skill) => {
      const s = skill.toLowerCase();
      if (!s) return false;
      const inOptimized = optimizedTextLower.includes(s);
      const inOriginal = originalTextLower.includes(s);
      return inOptimized && !inOriginal;
    });

    // Build per-bullet change metadata for UI clarity.
    const bulletChanges =
      Object.keys(improvedMap).length === 0
        ? []
        : Object.entries(improvedMap).map(([original, improved]) => {
            const originalLower = original.toLowerCase();
            const improvedLower = improved.toLowerCase();
            const perBulletKeywords = missingSkills.filter((skill) => {
              const s = skill.toLowerCase();
              if (!s) return false;
              const inImproved = improvedLower.includes(s);
              const inOriginal = originalLower.includes(s);
              return inImproved && !inOriginal;
            });
            const quantified =
              /\d/.test(improved) && !/\d/.test(original);
            return {
              original,
              improved,
              addedKeywords: perBulletKeywords,
              quantified,
            };
          });

    const scoreBefore = analyzeResult.ats_score;

    const k = addedKeywords.length;
    const b = bulletImprovements;
    const q = quantifiedAchievements;
    const f = 1; // formatting is always improved for optimized resumes

    let scoreAfter: number;

    if (k === 0 && b === 0 && q === 0) {
      // No concrete improvements detected – keep score unchanged
      scoreAfter = scoreBefore;
    } else {
      const keywordScore = Math.min(k * 2, 20);
      const bulletScore = Math.min(b * 1.5, 10);
      const impactScore = Math.min(q * 3, 12);
      const formatScore = f ? 5 : 0;

      const improvementRaw =
        keywordScore * 0.5 +
        bulletScore * 0.2 +
        impactScore * 0.2 +
        formatScore * 0.1;

      const improvement = Math.round(improvementRaw);

      let tentative = scoreBefore + improvement;
      tentative = Math.max(scoreBefore + 2, tentative);
      tentative = Math.min(95, tentative);
      scoreAfter = Math.round(tentative);
    }

    const response: OptimizeResponse = {
      optimizedResume: optimizedText,
      scoreAfter,
      addedKeywords,
      bulletImprovements,
      quantifiedAchievements,
      optimizedStructuredResume: optimizedStructured,
      quantifiedBullets,
    };

    return NextResponse.json(response);
  } catch (err) {
    console.error("[optimize]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Optimization failed" },
      { status: 500 }
    );
  }
}
