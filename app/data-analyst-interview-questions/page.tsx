import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Data Analyst Interview Questions (SQL, Metrics, BI) | ResumeAtlas",
  description:
    "Data analyst interview questions covering SQL, metrics, dashboard decisions, experimentation, and stakeholder communication.",
  alternates: { canonical: "/data-analyst-interview-questions" },
};

export default function DataAnalystInterviewQuestionsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Data Analyst Interview Questions</h1>
        <ul className="mt-5 list-disc space-y-2 pl-5 text-sm text-slate-700 sm:text-base">
          <li>How would you diagnose a sudden conversion drop using SQL and dashboard signals?</li>
          <li>What KPI definitions did you own, and how did you prevent metric drift?</li>
          <li>How do you decide whether an A/B test result is actionable?</li>
          <li>Describe a dashboard that changed stakeholder behavior.</li>
          <li>How do you balance analytical rigor with business decision speed?</li>
        </ul>
        <p className="mt-6 text-sm text-slate-700 sm:text-base">
          Use these with your{" "}
          <Link href="/data-analyst-resume-example" className="font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-900">
            data analyst ATS resume and example templates
          </Link>{" "}
          to align your interview narrative with resume claims.
        </p>
      </div>
    </main>
  );
}
