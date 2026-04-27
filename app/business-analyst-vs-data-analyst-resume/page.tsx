import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Business Analyst vs Data Analyst Resume: Key Differences | ResumeAtlas",
  description:
    "Compare business analyst vs data analyst resume positioning, keyword choices, and bullet patterns for ATS and recruiter fit.",
  alternates: { canonical: "/business-analyst-vs-data-analyst-resume" },
};

export default function BusinessAnalystVsDataAnalystResumePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Business Analyst vs Data Analyst Resume
        </h1>
        <p className="mt-4 text-sm text-slate-700 sm:text-base">
          The difference is positioning: business analyst resumes emphasize process and requirements; data
          analyst resumes emphasize SQL, experimentation, dashboards, and decision impact.
        </p>
        <ul className="mt-5 list-disc space-y-2 pl-5 text-sm text-slate-700 sm:text-base">
          <li>Business analyst: requirements, process mapping, stakeholder alignment.</li>
          <li>Data analyst: SQL analysis, KPI ownership, experiment readouts, and forecasting.</li>
          <li>Use the role language from the job posting to avoid ATS mismatch.</li>
        </ul>
        <p className="mt-6 text-sm text-slate-700 sm:text-base">
          For direct examples, use{" "}
          <Link href="/data-analyst-resume-example" className="font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-900">
            data analyst resume examples
          </Link>{" "}
          and compare against{" "}
          <Link href="/business-analyst-resume-example" className="font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-900">
            business analyst resume examples
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
