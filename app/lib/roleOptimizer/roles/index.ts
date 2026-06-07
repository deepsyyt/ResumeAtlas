import { aiEngineerOptimizer } from "@/app/lib/roleOptimizer/roles/ai-engineer";
import { analyticsManagerOptimizer } from "@/app/lib/roleOptimizer/roles/analytics-manager";
import { backendEngineerOptimizer } from "@/app/lib/roleOptimizer/roles/backend-engineer";
import { businessAnalystOptimizer } from "@/app/lib/roleOptimizer/roles/business-analyst";
import { dataEngineerOptimizer } from "@/app/lib/roleOptimizer/roles/data-engineer";
import { dataScientistOptimizer } from "@/app/lib/roleOptimizer/roles/data-scientist";
import { devopsEngineerOptimizer } from "@/app/lib/roleOptimizer/roles/devops-engineer";
import { machineLearningEngineerOptimizer } from "@/app/lib/roleOptimizer/roles/machine-learning-engineer";
import { productManagerOptimizer } from "@/app/lib/roleOptimizer/roles/product-manager";
import { softwareEngineerOptimizer } from "@/app/lib/roleOptimizer/roles/software-engineer";
import type { RoleOptimizerContent } from "@/app/lib/roleOptimizerContent";

/** Tier 1 first, then Tier 2 — used for prev/next spoke links. */
export const ROLE_OPTIMIZER_ORDER: readonly RoleOptimizerContent[] = [
  dataScientistOptimizer,
  dataEngineerOptimizer,
  softwareEngineerOptimizer,
  businessAnalystOptimizer,
  productManagerOptimizer,
  machineLearningEngineerOptimizer,
  aiEngineerOptimizer,
  analyticsManagerOptimizer,
  devopsEngineerOptimizer,
  backendEngineerOptimizer,
] as const;

export const ROLE_OPTIMIZER_BY_PATH: Record<string, RoleOptimizerContent> = Object.fromEntries(
  ROLE_OPTIMIZER_ORDER.map((r) => [r.path, r])
);

export function getRoleOptimizerByPath(path: string): RoleOptimizerContent | undefined {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return ROLE_OPTIMIZER_BY_PATH[normalized];
}

export function getRoleOptimizerNeighbors(path: string): {
  prev: RoleOptimizerContent | null;
  next: RoleOptimizerContent | null;
} {
  const idx = ROLE_OPTIMIZER_ORDER.findIndex((r) => r.path === path);
  if (idx < 0) return { prev: null, next: null };
  return {
    prev: idx > 0 ? ROLE_OPTIMIZER_ORDER[idx - 1]! : null,
    next: idx < ROLE_OPTIMIZER_ORDER.length - 1 ? ROLE_OPTIMIZER_ORDER[idx + 1]! : null,
  };
}
