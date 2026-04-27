import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tableau Data Analyst Resume Example (ATS-Friendly) | ResumeAtlas",
  description:
    "Tableau-focused data analyst resume example with dashboard, stakeholder, and business impact bullet patterns.",
  alternates: { canonical: "/tableau-data-analyst-resume-example" },
};

export default function TableauDataAnalystResumeExamplePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Tableau Data Analyst Resume Example
        </h1>
        <p className="mt-4 text-sm text-slate-700 sm:text-base">
          Tableau resumes rank better when they combine dashboard terms with business outcomes and stakeholder
          decisions.
        </p>
        <ul className="mt-5 list-disc space-y-2 pl-5 text-sm text-slate-700 sm:text-base">
          <li>Designed Tableau dashboards used in weekly executive reviews across product and finance.</li>
          <li>Reduced manual reporting by automating Tableau extracts and SQL transforms.</li>
          <li>Improved funnel visibility and conversion decisions with cohort and retention dashboard views.</li>
        </ul>
        <p className="mt-6 text-sm text-slate-700 sm:text-base">
          Browse the full{" "}
          <Link href="/data-analyst-resume-example" className="font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-900">
            data analyst resume examples
          </Link>{" "}
          hub for template, summary, and ATS guidance.
        </p>
      </div>
    </main>
  );
}
