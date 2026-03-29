import type { Metadata } from "next";
import Link from "next/link";
import { ALL_TOOL_CLUSTER_CONFIGS } from "@/app/lib/toolClusterPages";

export const metadata: Metadata = {
  title: "Free Resume Tools | ResumeAtlas",
  description:
    "Free online resume tools: compare your resume with a job description, get ATS-style scores, and find missing keywords.",
  alternates: {
    canonical: "/tools",
  },
};

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <section className="border-b border-slate-200 bg-slate-50/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">Tools</h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Free tools to tune your resume for Applicant Tracking Systems and specific job postings.
          </p>
        </div>
      </section>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <ul className="space-y-4">
          {ALL_TOOL_CLUSTER_CONFIGS.map((c) => (
            <li key={c.path} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">
                <Link
                  href={c.path}
                  className="text-sky-800 hover:text-sky-950 underline underline-offset-2"
                >
                  {c.clusterLinkAnchor}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-slate-600">{c.intro}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
