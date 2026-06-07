import {
  ROLE_OPTIMIZER_BY_PATH,
  ROLE_OPTIMIZER_ORDER,
  getRoleOptimizerByPath,
  getRoleOptimizerNeighbors,
} from "@/app/lib/roleOptimizer/roles/index";

export {
  ROLE_OPTIMIZER_BY_PATH,
  ROLE_OPTIMIZER_ORDER,
  getRoleOptimizerByPath,
  getRoleOptimizerNeighbors,
};

export function isRoleOptimizerPath(path: string): boolean {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized in ROLE_OPTIMIZER_BY_PATH;
}
