import Link from "next/link";
import {
  CHECK_RESUME_AGAINST_JD_PATH,
  RESUME_KEYWORD_SCANNER_PATH,
} from "@/app/lib/internalLinks";
import { ALL_TOOL_CLUSTER_CONFIGS } from "@/app/lib/toolClusterPages";

type Props = {
  /** Current page path, e.g. "/resume-score-checker" */
  currentPath: string;
};

/**
 * Cross-links adjacent tool-cluster URLs. Hidden on the primary JD workbench—one product funnel.
 */
export function ToolClusterRelatedLinks({ currentPath }: Props) {
  const normalized = currentPath.replace(/\/$/, "") || "/";
  if (normalized === CHECK_RESUME_AGAINST_JD_PATH) return null;

  const others = ALL_TOOL_CLUSTER_CONFIGS.filter((c) => c.path !== normalized);
  if (others.length === 0) return null;

  const isKeywordScanner = normalized === RESUME_KEYWORD_SCANNER_PATH;
  const isAtsChecker = normalized === "/ats-resume-checker";

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
        {isKeywordScanner ? (
          <>
            This page extracts <strong className="text-slate-800">keywords from a job posting</strong> and
            flags gaps in your resume. For evidence match and optimization, use the{" "}
            <Link
              href={CHECK_RESUME_AGAINST_JD_PATH}
              className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
            >
              job description matcher
            </Link>
            . For parser and formatting risk, use the ATS checker.
          </>
        ) : isAtsChecker ? (
          <>
            This page focuses on <strong className="text-slate-800">ATS parsing and format</strong>.
            For missing keywords vs a posting, use the resume keyword scanner. For full JD match,
            use{" "}
            <Link
              href={CHECK_RESUME_AGAINST_JD_PATH}
              className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
            >
              compare resume to job description
            </Link>
            .
          </>
        ) : (
          <>
            The primary free tool is{" "}
            <Link
              href={CHECK_RESUME_AGAINST_JD_PATH}
              className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
            >
              compare resume to job description
            </Link>
            : ATS match score, keyword gaps, and AI optimization in one workflow.
          </>
        )}
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
