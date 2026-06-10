import Link from "next/link";
import type { OptimizeClusterNav } from "@/app/lib/roleOptimizer/clusterNav";

type Props = {
  cluster: OptimizeClusterNav;
  currentPath: string;
  className?: string;
};

type NavItem = {
  key: "optimizer" | "keywords" | "example";
  path: string;
  label: string;
  description: string;
};

export function RoleOptimizeClusterNav({ cluster, currentPath, className = "" }: Props) {
  const normalized = currentPath.replace(/\/$/, "") || "/";

  const items: NavItem[] = [
    {
      key: "optimizer",
      path: cluster.optimizerPath,
      label: `${cluster.roleName} resume optimizer`,
      description: "Tailor your resume to a job description with match score and AI rewrites",
    },
    ...(cluster.keywordsPath
      ? [
          {
            key: "keywords" as const,
            path: cluster.keywordsPath,
            label: `${cluster.roleName} resume keywords`,
            description: "ATS keyword checklist and gap scan for this role",
          },
        ]
      : []),
    {
      key: "example",
      path: cluster.examplePath,
      label: `${cluster.roleName} resume example`,
      description: "Full sample resume, section review, and bullet patterns",
    },
  ];

  return (
    <nav
      aria-label={`${cluster.roleName} resume resources`}
      className={`rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6 ${className}`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {cluster.roleName} resume cluster
      </p>
      <ul className={`mt-4 grid gap-3 ${items.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
        {items.map((item) => {
          const itemPath = item.path.replace(/\/$/, "") || "/";
          const isCurrent = itemPath === normalized;
          return (
            <li
              key={item.key}
              className={`rounded-xl border px-4 py-3 ${
                isCurrent ? "border-sky-400 bg-sky-50 shadow-sm" : "border-slate-200 bg-white"
              }`}
            >
              {isCurrent ? (
                <p className="text-sm font-semibold text-slate-900">{item.label}</p>
              ) : (
                <Link
                  href={item.path}
                  className="text-sm font-semibold text-sky-800 underline underline-offset-2 hover:text-sky-950"
                >
                  {item.label}
                </Link>
              )}
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{item.description}</p>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
