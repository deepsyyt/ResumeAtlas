import Link from "next/link";
import {
  ANALYZE_OPTIMIZE_RESUME_JD_CTA,
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  CHECK_RESUME_AGAINST_JD_PATH,
} from "@/app/lib/internalLinks";

type Props = {
  roleName?: string;
  className?: string;
};

/**
 * Funnel block on optimize SEO pages. The compare tool URL owns the workbench
 * (match score, gap analysis, and AI optimization)—not the optimize hub URL.
 */
export function OptimizePagesToolCta({ roleName, className = "" }: Props) {
  const roleLine = roleName
    ? `Paste your ${roleName.toLowerCase()} resume and target job description into the free tool.`
    : "Paste your resume and target job description into the free tool.";

  return (
    <section
      id="ats-checker-form"
      className={`scroll-mt-24 rounded-2xl border border-slate-900/10 bg-slate-900 p-6 text-center text-white sm:p-8 ${className}`}
    >
      <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
        Analyze and optimize your resume for this job
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-200 sm:text-base">
        {roleLine} You get a resume match score, missing keywords, gap analysis, and AI optimization
        suggestions for that posting—then edit and download. Same{" "}
        <Link href={CHECK_RESUME_AGAINST_JD_PATH} className="font-medium text-white underline underline-offset-2">
          compare resume to job description
        </Link>{" "}
        tool.
      </p>
      <a
        href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
        className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
      >
        {ANALYZE_OPTIMIZE_RESUME_JD_CTA}
      </a>
    </section>
  );
}
