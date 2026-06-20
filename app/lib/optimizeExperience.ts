import type { ResumeExperience, ResumeProject } from "@/app/lib/resumeDocument";
import { acceptBulletRewrite } from "@/app/lib/resumeTypography";

export type RecomposedProject = {
  title?: string;
  bullets?: string[];
};

export type RecomposedExperienceCompany = {
  company: string;
  role: string;
  bullets?: string[];
  projects?: RecomposedProject[];
};

export function experienceCompanyMatches(
  resumeCompany: string,
  recomposedCompany: string
): boolean {
  const a = resumeCompany.toLowerCase().trim();
  const b = recomposedCompany.toLowerCase().trim();
  if (!a || !b) return false;
  return a.includes(b) || b.includes(a);
}

export function normalizeProjectTitleKey(title: string): string {
  return String(title ?? "")
    .toLowerCase()
    .replace(/^project\s*\d*\s*:\s*/i, "")
    .replace(/^project\s*:\s*/i, "")
    .trim();
}

export function projectTitleMatches(a: string, b: string): boolean {
  const na = normalizeProjectTitleKey(a);
  const nb = normalizeProjectTitleKey(b);
  if (!na || !nb) return false;
  return na === nb || na.includes(nb) || nb.includes(na);
}

function bulletTokenSet(text: string): Set<string> {
  return new Set(
    String(text ?? "")
      .toLowerCase()
      .split(/[^a-z0-9+/#.-]+/g)
      .map((t) => t.trim())
      .filter((t) => t.length >= 3)
  );
}

function bulletJaccard(a: string, b: string): number {
  const setA = bulletTokenSet(a);
  const setB = bulletTokenSet(b);
  if (setA.size === 0 || setB.size === 0) return 0;
  let inter = 0;
  setA.forEach((t) => {
    if (setB.has(t)) inter++;
  });
  const union = new Set([...Array.from(setA), ...Array.from(setB)]).size;
  return union > 0 ? inter / union : 0;
}

/** Drop near-duplicate bullets in the same list (keeps the richer line). */
export function dedupeNearDuplicateBullets(bullets: string[]): string[] {
  const out: string[] = [];
  for (const raw of bullets) {
    const t = String(raw ?? "").trim();
    if (!t) continue;
    const dupIndex = out.findIndex((existing) => bulletJaccard(existing, t) >= 0.65);
    if (dupIndex === -1) {
      out.push(t);
      continue;
    }
    if (t.length > out[dupIndex]!.length) {
      out[dupIndex] = t;
    }
  }
  return out;
}

/**
 * Merge LLM rewrites into existing bullets by index (replace, do not append).
 * Prevents duplicate original + rewritten pairs in the same project.
 */
export function mergeBulletLists(
  originalBullets: string[],
  newBullets: string[],
  maxTotal = 6
): string[] {
  if (newBullets.length === 0) {
    return dedupeNearDuplicateBullets(originalBullets).slice(0, maxTotal);
  }
  if (originalBullets.length === 0) {
    return dedupeNearDuplicateBullets(newBullets).slice(0, maxTotal);
  }

  const len = Math.min(originalBullets.length, maxTotal);
  const merged: string[] = [];
  for (let i = 0; i < len; i++) {
    const incoming = newBullets[i]?.trim();
    const orig = originalBullets[i]?.trim() ?? "";
    merged.push(incoming ? acceptBulletRewrite(orig, incoming) : orig);
  }
  return dedupeNearDuplicateBullets(merged.filter(Boolean)).slice(0, maxTotal);
}

function findRecomposedCompany(
  company: string,
  recomposed: RecomposedExperienceCompany[]
): RecomposedExperienceCompany | undefined {
  return recomposed.find(
    (r) => typeof r.company === "string" && experienceCompanyMatches(company, r.company)
  );
}

function mergeProjectBullets(
  original: ResumeProject,
  recomposedProjects: RecomposedProject[]
): ResumeProject {
  const match = recomposedProjects.find(
    (r) => typeof r.title === "string" && projectTitleMatches(r.title, original.title)
  );
  if (!match || !Array.isArray(match.bullets) || match.bullets.length === 0) {
    return original;
  }
  const incoming = match.bullets
    .filter((b): b is string => typeof b === "string" && b.trim().length > 0)
    .map((b) => b.trim());
  const originalBullets = original.bullets ?? [];
  if (originalBullets.length === 0) {
    return { ...original, bullets: dedupeNearDuplicateBullets(incoming) };
  }
  return {
    ...original,
    bullets: mergeBulletLists(originalBullets, incoming),
  };
}

export function mergeExperienceWithRecomposed(
  exp: ResumeExperience,
  recomposed: RecomposedExperienceCompany[]
): ResumeExperience {
  if (!exp.company) return exp;
  const match = findRecomposedCompany(exp.company, recomposed);
  if (!match) return exp;

  const projects = exp.projects ?? [];
  if (projects.length > 0) {
    const recomposedProjects = Array.isArray(match.projects) ? match.projects : [];
    if (recomposedProjects.length > 0) {
      return {
        ...exp,
        projects: projects.map((proj) => mergeProjectBullets(proj, recomposedProjects)),
      };
    }
    return exp;
  }

  const originalBullets = exp.bullets ?? [];
  const newBullets = (match.bullets ?? [])
    .filter((b): b is string => typeof b === "string" && b.trim().length > 0)
    .map((b) => b.trim());
  if (originalBullets.length === 0 || newBullets.length === 0) return exp;

  return {
    ...exp,
    bullets: mergeBulletLists(originalBullets, newBullets),
  };
}

function tokenSet(text: string): Set<string> {
  return new Set(
    String(text ?? "")
      .toLowerCase()
      .split(/[^a-z0-9+/#.-]+/g)
      .map((t) => t.trim())
      .filter((t) => t.length >= 3)
  );
}

/** Pick the project under a role that best matches a skill phrase (for new bullets). */
export function pickProjectIndexForNewBullet(
  exp: ResumeExperience,
  skillOrHint: string
): number {
  const projects = exp.projects ?? [];
  if (projects.length === 0) return 0;
  const skillTokens = tokenSet(skillOrHint);
  let best = 0;
  let bestScore = -1;
  for (let i = 0; i < projects.length; i++) {
    const p = projects[i]!;
    const text = `${p.title} ${(p.bullets ?? []).join(" ")}`;
    const tokens = tokenSet(text);
    let score = 0;
    skillTokens.forEach((t) => {
      if (tokens.has(t)) score++;
    });
    if (score > bestScore) {
      bestScore = score;
      best = i;
    }
  }
  return best;
}

export function appendBulletToExperience(
  exp: ResumeExperience,
  expIndex: number,
  bullet: string,
  skillHint: string
): string {
  const projects = exp.projects ?? [];
  if (projects.length > 0) {
    const pi = pickProjectIndexForNewBullet(exp, skillHint);
    const proj = projects[pi]!;
    proj.bullets = proj.bullets ?? [];
    proj.bullets.push(bullet);
    return `${expIndex}:p${pi}:${proj.bullets.length - 1}`;
  }
  exp.bullets = exp.bullets ?? [];
  exp.bullets.push(bullet);
  return `${expIndex}:${exp.bullets.length - 1}`;
}

export function makeExperienceBulletKey(
  expIndex: number,
  bulletIndex: number,
  projectIndex?: number
): string {
  return projectIndex === undefined
    ? `${expIndex}:${bulletIndex}`
    : `${expIndex}:p${projectIndex}:${bulletIndex}`;
}

/** Distinct project/role scopes touched by refined bullet keys (`exp:pN:…` or `exp:bullet`). */
export function countRefinedScopesFromBulletKeys(keys: string[]): number {
  const scopes = new Set<string>();
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]!;
    const parts = key.split(":");
    const expIndex = parts[0];
    if (!expIndex) continue;
    const scopePart = parts[1];
    if (scopePart?.startsWith("p")) {
      scopes.add(`${expIndex}:${scopePart}`);
    } else {
      scopes.add(`${expIndex}:role`);
    }
  }
  return scopes.size;
}
