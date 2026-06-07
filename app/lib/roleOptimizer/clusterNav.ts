import {
  isResumeExampleClusterSlug,
  resumeExampleClusterPath,
} from "@/app/lib/resumeExampleClusterPages";
import type { RoleOptimizerContent } from "@/app/lib/roleOptimizerContent";
import { ROLE_OPTIMIZER_ORDER } from "@/app/lib/roleOptimizer/roles/index";

export type OptimizeClusterNav = {
  roleName: string;
  optimizerPath: string;
  keywordsPath: string;
  examplePath: string;
};

function normalize(path: string): string {
  return path.replace(/\/$/, "") || "/";
}

const byOptimizerPath = new Map<string, OptimizeClusterNav>();
const byKeywordsPath = new Map<string, OptimizeClusterNav>();
const byExamplePath = new Map<string, OptimizeClusterNav>();

for (const role of ROLE_OPTIMIZER_ORDER) {
  if (!role.relatedKeywordsPath || !role.relatedExamplePath) continue;
  const nav: OptimizeClusterNav = {
    roleName: role.roleName,
    optimizerPath: role.path,
    keywordsPath: role.relatedKeywordsPath,
    examplePath: role.relatedExamplePath,
  };
  byOptimizerPath.set(normalize(role.path), nav);
  byKeywordsPath.set(normalize(role.relatedKeywordsPath), nav);
  byExamplePath.set(normalize(role.relatedExamplePath), nav);
  if (isResumeExampleClusterSlug(role.slug)) {
    byExamplePath.set(normalize(resumeExampleClusterPath(role.slug)), nav);
  }
}

export function getOptimizeClusterNavFromRole(role: RoleOptimizerContent): OptimizeClusterNav | null {
  if (!role.relatedKeywordsPath || !role.relatedExamplePath) return null;
  return {
    roleName: role.roleName,
    optimizerPath: role.path,
    keywordsPath: role.relatedKeywordsPath,
    examplePath: role.relatedExamplePath,
  };
}

/** Resolve optimizer ↔ keywords ↔ example triangle for any cluster page path. */
export function getOptimizeClusterNav(currentPath: string): OptimizeClusterNav | null {
  const n = normalize(currentPath);
  return (
    byOptimizerPath.get(n) ??
    byKeywordsPath.get(n) ??
    byExamplePath.get(n) ??
    null
  );
}

/** Keywords path → optimizer path (for inline links on keyword pages). */
export function getOptimizerPathForKeywordsPath(keywordsPath: string): string | null {
  return byKeywordsPath.get(normalize(keywordsPath))?.optimizerPath ?? null;
}
