import Link from "next/link";
import { ALL_TOOL_CLUSTER_CONFIGS } from "@/app/lib/toolClusterPages";

type Props = {
  /** Current page path, e.g. "/resume-score-checker" */
  currentPath: string;
};

/**
 * Cross-links all tool cluster URLs (excluding current) with stable keyword anchors for topical authority.
 */
export function ToolClusterRelatedLinks({ currentPath }: Props) {
  const normalized = currentPath.replace(/\/$/, "") || "/";
  const others = ALL_TOOL_CLUSTER_CONFIGS.filter((c) => c.path !== normalized);
  if (others.length === 0) return null;

  return (
    <section
      className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6"
      aria-labelledby="tool-cluster-related"
    >
      <h2
        id="tool-cluster-related"
        className="text-lg font-semibold tracking-tight text-slate-900"
      >
        Related free resume tools
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        Same engine—pick the entry that matches what you searched for. Interlinking helps you
        compare resume vs job description from different angles (score, keywords, ATS fit).
      </p>
      <ul className="mt-4 space-y-2 text-sm text-slate-800 list-disc pl-5">
        {others.map((c) => (
          <li key={c.path}>
            <Link
              href={c.path}
              className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
            >
              {c.clusterLinkAnchor}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
