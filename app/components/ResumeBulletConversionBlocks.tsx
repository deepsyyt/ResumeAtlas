import Link from "next/link";
import {
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  CHECK_RESUME_AGAINST_JD_PRIMARY_CTA,
} from "@/app/lib/internalLinks";

type Props = {
  /** e.g. "data scientist" for keyword-rich scan CTA. */
  roleKeywordLabel?: string;
};

/** Mid-page conversion: doubt → keyword scan → JD match → problem page. */
export function ResumeBulletConversionBlocks({ roleKeywordLabel }: Props) {
  const scanLabel = roleKeywordLabel
    ? `Find missing keywords in your ${roleKeywordLabel} resume`
    : "Find missing keywords";

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5 sm:p-6">
        <p className="text-sm font-medium text-amber-950">
          Upload your resume and get instant feedback on missing keywords and ATS issues.
        </p>
        <p className="mt-3 text-sm font-semibold text-amber-950">
          These lines are illustrative. Your resume still needs role-specific keywords to pass ATS.
        </p>
        <p className="mt-2 text-sm text-amber-950/90">
          Paste a job description and compare—see missing skills and weak alignment before you send
          the application.
        </p>
        <p className="mt-4 text-xs font-medium text-amber-950/80">Takes 10 seconds • No signup required</p>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/resume-keyword-scanner#ats-checker-form"
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {scanLabel}
          </Link>
          <Link
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Example gap (illustrative)
        </p>
        <p className="mt-2 text-sm text-slate-800">
          <span className="font-semibold">Your resume vs posting:</span> ~52% keyword overlap — weak
          on SQL depth and experiment design language for this role.
        </p>
        <p className="mt-2 text-sm text-slate-600">
          Run the checker on your real resume and the exact posting to see your gaps—not a generic
          score.
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <Link
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Compare your resume with this job description
          </Link>
          <Link
            href="/problems/resume-not-getting-interviews"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            Why resumes fail to get interviews
          </Link>
        </div>
      </div>
    </div>
  );
}
