import type { Metadata } from "next";
import Link from "next/link";
import { RESUME_PAGES } from "@/app/lib/seoPages";
import {
  CHECK_RESUME_AGAINST_JD_PATH,
  CHECK_RESUME_AGAINST_JD_ANCHOR,
} from "@/app/lib/internalLinks";

export const metadata: Metadata = {
  title: "Resume Examples (ATS-Friendly) | ResumeAtlas",
  description: "Browse ATS-friendly resume examples for top roles and industries.",
  alternates: {
    canonical: "/resume-examples",
  },
};

export default function ResumeExamplesIndexPage() {
  const items = Object.values(RESUME_PAGES).sort((a, b) => a.roleName.localeCompare(b.roleName));

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="border-b border-slate-200 bg-slate-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
            Resume Examples
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            ATS-friendly resume examples you can copy, tailor, and improve.
          </p>
          <Link
            href={CHECK_RESUME_AGAINST_JD_PATH}
            className="mt-8 inline-flex rounded-xl bg-slate-900 px-6 py-3.5 text-base font-semibold text-white hover:bg-slate-800 transition"
          >
            {CHECK_RESUME_AGAINST_JD_ANCHOR}
          </Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-10">
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          {items.map((p) => (
            <li key={p.slug} className="rounded-xl border border-slate-200 bg-white p-4">
              <Link href={`/${p.slug}`} className="font-semibold text-slate-900 hover:underline">
                {p.h1}
              </Link>
              <p className="mt-1 text-xs text-slate-500">{p.metaDescription}</p>
            </li>
          ))}
        </ul>

        <div className="border-t border-slate-200 pt-6">
          <h2 className="text-base font-semibold text-slate-900">More resume writing resources</h2>
          <p className="text-sm text-slate-500 mt-1">
            Deep dives for bullet points, skills, summaries, and projects.
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link
                href="/data-scientist/resume/bullet-points"
                className="text-sky-700 hover:underline"
              >
                Data Scientist resume bullet points
              </Link>
            </li>
            <li>
              <Link
                href="/software-engineer/resume/skills"
                className="text-sky-700 hover:underline"
              >
                Software Engineer resume skills
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}

