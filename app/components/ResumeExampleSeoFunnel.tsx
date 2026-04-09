import Link from "next/link";
import { CHECK_RESUME_AGAINST_JD_FORM_HREF } from "@/app/lib/internalLinks";

/** Standard internal links for indexed resume example pages (JD matcher + scanner + problem hub). */
export function ResumeExampleSeoFunnel() {
  return (
    <section className="rounded-2xl border border-sky-100 bg-sky-50/50 p-5 sm:p-6" aria-labelledby="example-funnel-heading">
      <h2 id="example-funnel-heading" className="text-sm font-semibold uppercase tracking-wide text-slate-600">
        Improve this resume
      </h2>
      <ul className="mt-3 space-y-2 text-sm font-medium text-slate-900 list-none p-0 m-0">
        <li>
          <Link
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="text-sky-800 underline underline-offset-2 hover:text-sky-950"
          >
            Check resume against job description
          </Link>
        </li>
        <li>
          <Link href="/resume-keyword-scanner" className="text-sky-800 underline underline-offset-2 hover:text-sky-950">
            Find missing keywords in your resume
          </Link>
        </li>
        <li>
          <Link
            href="/problems/resume-not-getting-interviews"
            className="text-sky-800 underline underline-offset-2 hover:text-sky-950"
          >
            Resume not getting interviews (fix guide)
          </Link>
        </li>
      </ul>
    </section>
  );
}
