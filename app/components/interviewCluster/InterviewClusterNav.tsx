import Link from "next/link";
import {
  INTERVIEW_CLUSTER_COMPARISONS,
  INTERVIEW_CLUSTER_GUIDES,
} from "@/app/lib/interviewCluster/clusterNav";
import { RESUME_NOT_GETTING_INTERVIEWS_PATH } from "@/app/lib/interviewCluster/paths";
import {
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  CHECK_RESUME_AGAINST_JD_PATH,
  CHECK_RESUME_AGAINST_JD_PRIMARY_CTA,
} from "@/app/lib/internalLinks";

type Props = {
  currentPath: string;
  showComparisons?: boolean;
};

function CommercialLinks({ currentPath }: { currentPath: string }) {
  const onMoneyPage = currentPath === CHECK_RESUME_AGAINST_JD_PATH;
  const onHub = currentPath === RESUME_NOT_GETTING_INTERVIEWS_PATH;

  return (
    <div className="mb-4 flex flex-col gap-2 rounded-lg border border-slate-900/10 bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm font-semibold text-slate-900">
        {onMoneyPage
          ? "Why resumes stall"
          : onHub
            ? "Check a specific posting"
            : "Check this posting before you apply"}
      </p>
      <div className="flex flex-wrap gap-2">
        {!onMoneyPage ? (
          <Link
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
          </Link>
        ) : null}
        {!onHub ? (
          <Link
            href={RESUME_NOT_GETTING_INTERVIEWS_PATH}
            className="inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
          >
            Resume not getting interviews
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export function InterviewClusterNav({ currentPath, showComparisons = true }: Props) {
  return (
    <nav
      aria-label="Interview and apply-readiness guides"
      className="rounded-xl border border-slate-200 bg-slate-50/70 p-5"
    >
      <CommercialLinks currentPath={currentPath} />

      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        Interview readiness cluster
      </p>
      <p className="mt-1 text-sm text-slate-600">
        Job seekers want more interviews — not just scores. These guides connect the problem to proof.
      </p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {INTERVIEW_CLUSTER_GUIDES.map((link) => {
          const isCurrent = link.path === currentPath;
          return (
            <li key={link.path} className="list-none">
              <Link
                href={link.path}
                aria-current={isCurrent ? "page" : undefined}
                className={`block rounded-lg border px-3 py-2.5 text-sm transition ${
                  isCurrent
                    ? "border-sky-300 bg-sky-50 font-semibold text-sky-950"
                    : "border-slate-200 bg-white text-slate-800 hover:border-slate-300"
                }`}
              >
                {link.label}
                {link.description ? (
                  <span className="mt-0.5 block text-xs font-normal text-slate-500">
                    {link.description}
                  </span>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
      {showComparisons ? (
        <div className="mt-5 border-t border-slate-200 pt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Tool comparisons
          </p>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {INTERVIEW_CLUSTER_COMPARISONS.map((link) => (
              <li key={link.path} className="list-none">
                <Link
                  href={link.path}
                  className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-5 border-t border-slate-200 pt-4">
        <CommercialLinks currentPath={currentPath} />
      </div>
    </nav>
  );
}
