import { DATA_ENGINEER_RESUME_GUIDE_PATH } from "@/app/lib/dataEngineerResumeGuide";
import {
  isResumeExampleClusterSlug,
  resumeExampleClusterPath,
  type ResumeExampleClusterSlug,
} from "@/app/lib/resumeExampleClusterPages";
import { KEYWORD_PAGES, resumeExamplePublicPath, type RoleSlug } from "@/app/lib/seoPages";
import { roleResumeKeywordsPath, roleResumePillarPath } from "@/app/lib/searchIntentSeo";

/** Avoid importing `internalLinks` here — that module imports this file and causes a TDZ cycle at build. */
export type RoleClusterLink = { path: string; label: string };

export const CHECK_RESUME_AGAINST_JD_PATH = "/check-resume-against-job-description" as const;
export const RESUME_KEYWORD_SCANNER_PATH = "/resume-keyword-scanner" as const;
export const CHECK_RESUME_AGAINST_JD_PRIMARY_CTA =
  "Check resume against job description" as const;

/** Roles with a three-page cluster (example + guide + keywords). */
export type RoleClusterKey = RoleSlug | "data-engineer";

export type RoleClusterTriangle = {
  key: RoleClusterKey;
  roleName: string;
  examplePath: string;
  exampleLabel: string;
  guidePath: string | null;
  guideLabel: string;
  keywordsPath: string;
  keywordsLabel: string;
};

export const ATS_RESUME_CHECKER_PATH = "/ats-resume-checker" as const;

export const MONEY_PAGE_LINKS: readonly RoleClusterLink[] = [
  { path: CHECK_RESUME_AGAINST_JD_PATH, label: CHECK_RESUME_AGAINST_JD_PRIMARY_CTA },
  { path: RESUME_KEYWORD_SCANNER_PATH, label: "Resume keyword scanner" },
  { path: ATS_RESUME_CHECKER_PATH, label: "ATS resume checker" },
];

/**
 * Controlled cross-links between keyword hubs (adjacent stacks only).
 * Do not add unrelated roles (e.g. data analyst → product manager).
 */
export const ROLE_KEYWORD_ADJACENCY: Readonly<Record<string, readonly RoleClusterLink[]>> = {
  "/data-analyst-resume-keywords": [
    { path: "/power-bi-resume-keywords", label: "Power BI resume keywords" },
  ],
  "/power-bi-resume-keywords": [
    { path: "/data-analyst-resume-keywords", label: "Data analyst resume keywords" },
  ],
  "/data-engineer-resume-keywords": [
    { path: "/sql-developer-resume-keywords", label: "SQL developer resume keywords" },
  ],
  "/sql-developer-resume-keywords": [
    { path: "/data-engineer-resume-keywords", label: "Data engineer resume keywords" },
  ],
  "/data-scientist-resume-keywords": [
    {
      path: roleResumeKeywordsPath("machine-learning-engineer"),
      label: "Machine learning engineer resume keywords",
    },
  ],
  [roleResumeKeywordsPath("machine-learning-engineer")]: [
    { path: roleResumeKeywordsPath("data-scientist"), label: "Data scientist resume keywords" },
  ],
  [roleResumeKeywordsPath("backend-developer")]: [
    { path: roleResumeKeywordsPath("software-engineer"), label: "Software engineer resume keywords" },
  ],
  [roleResumeKeywordsPath("software-engineer")]: [
    { path: roleResumeKeywordsPath("backend-developer"), label: "Backend developer resume keywords" },
  ],
  [roleResumeKeywordsPath("frontend-developer")]: [
    { path: roleResumeKeywordsPath("full-stack-developer"), label: "Full stack developer resume keywords" },
  ],
  [roleResumeKeywordsPath("full-stack-developer")]: [
    { path: roleResumeKeywordsPath("frontend-developer"), label: "Frontend developer resume keywords" },
  ],
};

function roleNameFor(key: RoleClusterKey): string {
  if (key === "data-engineer") return "Data Engineer";
  return KEYWORD_PAGES[key].roleName;
}

export function getRoleClusterTriangle(key: RoleClusterKey): RoleClusterTriangle {
  const roleName = roleNameFor(key);
  const examplePath =
    key === "data-engineer"
      ? resumeExampleClusterPath("data-engineer")
      : isResumeExampleClusterSlug(key)
        ? resumeExampleClusterPath(key)
        : resumeExamplePublicPath(key);
  const guidePath =
    key === "data-engineer" ? DATA_ENGINEER_RESUME_GUIDE_PATH : roleResumePillarPath(key);
  const keywordsPath =
    key === "data-engineer" ? "/data-engineer-resume-keywords" : roleResumeKeywordsPath(key);

  return {
    key,
    roleName,
    examplePath,
    exampleLabel: `${roleName} resume example`,
    guidePath,
    guideLabel: `${roleName} resume guide`,
    keywordsPath,
    keywordsLabel: `${roleName} resume keywords`,
  };
}

export const ALL_ROLE_CLUSTER_KEYS: readonly RoleClusterKey[] = [
  ...(Object.keys(KEYWORD_PAGES) as RoleSlug[]),
  "data-engineer",
];

export function normalizeClusterPath(path: string): string {
  return path.replace(/\/$/, "") || "/";
}

/** Map public URL → cluster role (supports guide, keywords, cluster example, legacy hyphen example). */
export function resolveRoleClusterKeyFromPath(path: string): RoleClusterKey | null {
  const n = normalizeClusterPath(path);

  const clusterExample = n.match(/^\/resume-examples\/([a-z0-9-]+)$/);
  if (clusterExample && isResumeExampleClusterSlug(clusterExample[1])) {
    return clusterExample[1] as RoleClusterKey;
  }

  const guide = n.match(/^\/([a-z0-9-]+)-resume-guide$/);
  if (guide?.[1] === "data-engineer") return "data-engineer";
  if (guide?.[1] && Object.prototype.hasOwnProperty.call(KEYWORD_PAGES, guide[1])) {
    return guide[1] as RoleSlug;
  }

  const keywords = n.match(/^\/([a-z0-9-]+)-resume-keywords$/);
  if (keywords?.[1] === "data-engineer") return "data-engineer";
  if (keywords?.[1] && Object.prototype.hasOwnProperty.call(KEYWORD_PAGES, keywords[1])) {
    return keywords[1] as RoleSlug;
  }

  const legacyExample = n.match(/^\/([a-z0-9-]+)-resume-example$/);
  if (legacyExample?.[1] && isResumeExampleClusterSlug(legacyExample[1])) {
    return legacyExample[1] as ResumeExampleClusterSlug;
  }

  return null;
}

/** Triangle + money pages + at most one adjacent keyword hub. Excludes current path. */
export function getRoleClusterNavLinks(currentPath: string): RoleClusterLink[] {
  const key = resolveRoleClusterKeyFromPath(currentPath);
  if (!key) return [];

  const n = normalizeClusterPath(currentPath);
  const tri = getRoleClusterTriangle(key);
  const out: RoleClusterLink[] = [];
  const seen = new Set<string>();

  function add(link: RoleClusterLink) {
    const p = normalizeClusterPath(link.path);
    if (p === n || seen.has(p)) return;
    seen.add(p);
    out.push({ path: p, label: link.label });
  }

  if (n !== normalizeClusterPath(tri.examplePath)) {
    add({ path: tri.examplePath, label: tri.exampleLabel });
  }
  if (tri.guidePath && n !== normalizeClusterPath(tri.guidePath)) {
    add({ path: tri.guidePath, label: tri.guideLabel });
  }
  if (n !== normalizeClusterPath(tri.keywordsPath)) {
    add({ path: tri.keywordsPath, label: tri.keywordsLabel });
  }

  for (const link of MONEY_PAGE_LINKS) add(link);

  const adjacency =
    ROLE_KEYWORD_ADJACENCY[n] ?? ROLE_KEYWORD_ADJACENCY[normalizeClusterPath(tri.keywordsPath)] ?? [];
  for (const link of adjacency) add(link);

  return out;
}

/** Register cluster example URLs for semantic link resolution. */
export function roleClusterInternalLinks(): RoleClusterLink[] {
  const links: RoleClusterLink[] = [];
  for (const key of ALL_ROLE_CLUSTER_KEYS) {
    const tri = getRoleClusterTriangle(key);
    links.push({ path: tri.examplePath, label: tri.exampleLabel });
    if (tri.guidePath) links.push({ path: tri.guidePath, label: tri.guideLabel });
    links.push({ path: tri.keywordsPath, label: tri.keywordsLabel });
  }
  return links;
}
