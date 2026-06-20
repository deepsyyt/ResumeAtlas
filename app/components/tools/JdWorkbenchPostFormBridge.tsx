import { CLUSTER_JD_MATCH_TOOL_COPY } from "@/app/lib/canonicalIntentClusters";
import { RESUME_NOT_GETTING_INTERVIEWS_PATH } from "@/app/lib/interviewCluster/paths";
import {
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  CHECK_RESUME_AGAINST_JD_PRIMARY_CTA,
} from "@/app/lib/internalLinks";
import Link from "next/link";

/**
 * Conversion bridge between the workbench form and long-form guide content.
 * Sales-focused: what you get in one scan + apply-readiness pitch.
 */
export function JdWorkbenchPostFormBridge() {
  const outcomes = CLUSTER_JD_MATCH_TOOL_COPY.postFormOutcomes ?? [];
  const outcomesHeading =
    CLUSTER_JD_MATCH_TOOL_COPY.postFormOutcomesHeading ?? "What you'll learn in one scan";

  return (
    <section
      className="border-b border-slate-200 bg-white"
      aria-labelledby="jd-workbench-post-form-bridge"
    >
      <div className="page-shell space-y-4 py-4 sm:space-y-5 sm:py-5">
        <div className="rounded-xl border border-sky-200/80 bg-sky-50/40 p-4 sm:p-5">
          <h2
            id="jd-workbench-post-form-bridge"
            className="text-base font-semibold tracking-tight text-slate-900 sm:text-lg"
          >
            {outcomesHeading}
          </h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {outcomes.map((line) => (
              <li key={line} className="flex gap-2 text-sm text-slate-700">
                <span className="mt-0.5 font-semibold text-emerald-600" aria-hidden>
                  ✓
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <a
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="mt-4 inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
          </a>
        </div>

        <div className="rounded-xl border border-amber-200/80 bg-amber-50/40 p-4 sm:p-5">
          <h2 className="text-base font-semibold tracking-tight text-slate-900 sm:text-lg">
            {CLUSTER_JD_MATCH_TOOL_COPY.differentiatorHeading}
          </h2>
          <div className="mt-2 space-y-2">
            {CLUSTER_JD_MATCH_TOOL_COPY.differentiatorBody.map((para) => (
              <p key={para.slice(0, 40)} className="text-sm leading-relaxed text-slate-700">
                {para}
              </p>
            ))}
          </div>
          <p className="mt-3 text-sm text-slate-700">
            <Link
              href={RESUME_NOT_GETTING_INTERVIEWS_PATH}
              className="font-semibold text-sky-800 underline underline-offset-2 hover:text-sky-950"
            >
              Resume not getting interviews
            </Link>{" "}
            — why skills on paper still get filtered out.
          </p>
        </div>
      </div>
    </section>
  );
}
