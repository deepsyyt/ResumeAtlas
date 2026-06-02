import type { ResumeExperience, ResumeProject } from "@/app/lib/resumeDocument";

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

/** Preserve strongest originals; cap total bullets per list. */
export function mergeBulletLists(
  originalBullets: string[],
  newBullets: string[],
  maxTotal = 6
): string[] {
  if (newBullets.length === 0) return originalBullets;
  if (originalBullets.length === 0) return newBullets.slice(0, maxTotal);

  const keepCount = Math.min(2, Math.max(1, Math.round(originalBullets.length * 0.3)));
  const preserved = originalBullets.slice(0, keepCount);
  const rewriteSlots = Math.max(0, maxTotal - keepCount);
  const rewritten = newBullets.slice(0, rewriteSlots);
  return [...preserved, ...rewritten];
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
    return { ...original, bullets: incoming };
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
    // Do not pour company-level bullets into project roles (wrong project attribution).
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
