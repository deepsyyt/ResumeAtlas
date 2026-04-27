import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Data Analyst Cover Letter Example (2026) | ResumeAtlas",
  description:
    "Data analyst cover letter example with concise structure: role fit, analytics outcomes, and stack alignment to the posting.",
  alternates: { canonical: "/data-analyst-cover-letter-example" },
};

export default function DataAnalystCoverLetterExamplePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Data Analyst Cover Letter Example</h1>
        <p className="mt-4 text-sm text-slate-700 sm:text-base">
          Keep it short: role fit in one line, two quantified wins, and one line on why this company and role
          match your strengths.
        </p>
        <ul className="mt-5 list-disc space-y-2 pl-5 text-sm text-slate-700 sm:text-base">
          <li>Open with role relevance and analytics scope.</li>
          <li>Use two bullets with metrics from SQL/dashboard/experimentation work.</li>
          <li>Close with clear intent and posting-specific fit.</li>
        </ul>
        <p className="mt-6 text-sm text-slate-700 sm:text-base">
          Pair this with your{" "}
          <Link href="/data-analyst-resume-example" className="font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-900">
            data analyst resume template and examples
          </Link>{" "}
          for stronger interview conversion.
        </p>
      </div>
    </main>
  );
}
