import Link from "next/link";
import {
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  CHECK_RESUME_AGAINST_JD_PRIMARY_CTA,
  RESUME_NOT_GETTING_INTERVIEWS_PATH,
  SKILLS_LISTED_NOT_PROVEN_PATH,
} from "@/app/lib/internalLinks";

/**
 * Cluster bridge for high-intent readers who scroll deep — repeats problem links + form CTA.
 */
export function JdWorkbenchClusterBridge() {
  return (
    <section
      className="rounded-xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6"
      aria-labelledby="jd-workbench-cluster-bridge"
    >
      <h2
        id="jd-workbench-cluster-bridge"
        className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl"
      >
        Sound familiar?
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
        Many applicants have the right skills on paper but still get filtered out. Paste your resume
        and this posting to see what may be working against you.
      </p>
      <ul className="mt-4 space-y-2 text-sm text-slate-700 sm:text-base">
        <li>
          <Link
            href={RESUME_NOT_GETTING_INTERVIEWS_PATH}
            className="font-semibold text-sky-800 underline underline-offset-2 hover:text-sky-950"
          >
            Resume not getting interviews?
          </Link>
        </li>
        <li>
          <Link
            href={SKILLS_LISTED_NOT_PROVEN_PATH}
            className="font-semibold text-sky-800 underline underline-offset-2 hover:text-sky-950"
          >
            Skills listed but not proven?
          </Link>
        </li>
      </ul>
      <a
        href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
        className="mt-5 inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
      </a>
    </section>
  );
}
