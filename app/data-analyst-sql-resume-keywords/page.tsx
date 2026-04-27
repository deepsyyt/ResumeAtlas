import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SQL Resume Keywords for Data Analyst Roles (2026) | ResumeAtlas",
  description:
    "Data analyst SQL resume keywords recruiters and ATS scan for, with examples for dashboards, ETL, and stakeholder reporting.",
  alternates: { canonical: "/data-analyst-sql-resume-keywords" },
};

export default function DataAnalystSqlResumeKeywordsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          SQL Resume Keywords for Data Analyst Roles
        </h1>
        <p className="mt-4 text-sm text-slate-700 sm:text-base">
          Use SQL terms tied to outcomes, not keyword stuffing: joins, window functions, CTEs, data
          modeling, ETL, query optimization, and metric definitions.
        </p>
        <ul className="mt-5 list-disc space-y-2 pl-5 text-sm text-slate-700 sm:text-base">
          <li>Built SQL pipelines and automated weekly KPI reporting for GTM leadership.</li>
          <li>Optimized warehouse queries to reduce dashboard refresh time and analyst wait time.</li>
          <li>Defined business metrics in SQL to maintain a single source of truth.</li>
        </ul>
        <p className="mt-6 text-sm text-slate-700 sm:text-base">
          See complete{" "}
          <Link href="/data-analyst-resume-example" className="font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-900">
            data analyst resume examples
          </Link>{" "}
          and the{" "}
          <Link href="/data-analyst-resume-example#ats-template" className="font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-900">
            data analyst resume template
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
