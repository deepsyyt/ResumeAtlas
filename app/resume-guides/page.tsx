import type { Metadata } from "next";
import Link from "next/link";
import { RESUME_GUIDE_PAGES } from "@/app/lib/resumeGuidePages";
import {
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  CHECK_RESUME_AGAINST_JD_PRIMARY_CTA,
} from "@/app/lib/internalLinks";

export const metadata: Metadata = {
  title: "Resume Guides (ATS-Friendly) | ResumeAtlas",
  description: "Browse step-by-step resume guides for skills, summaries, experience, and more.",
  alternates: {
    canonical: "/resume-guides",
  },
  robots: { index: false, follow: true },
};

export default function ResumeGuidesIndexPage() {
  const items = Object.values(RESUME_GUIDE_PAGES).sort((a, b) => a.h1.localeCompare(b.h1));

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="border-b border-slate-200 bg-slate-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
            Resume Guides
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Practical guides for writing ATS-friendly resume sections and templates.
          </p>
          <Link
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="mt-8 inline-flex rounded-xl bg-slate-900 px-6 py-3.5 text-base font-semibold text-white hover:bg-slate-800 transition"
          >
            {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
          </Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-8">
        <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
          <Link
            href="/resume-guides/resume-format-guide"
            className="font-semibold text-slate-900 hover:underline"
          >
            Resume Format Guide
          </Link>
          <p className="mt-1 text-xs text-slate-500">
            A quick overview of layout, sections, and ATS-friendly formatting.
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          {items.map((p) => (
            <li key={p.slug} className="rounded-xl border border-slate-200 bg-white p-4">
              <Link
                href={`/resume-guides/${p.slug}`}
                className="font-semibold text-slate-900 hover:underline"
              >
                {p.h1}
              </Link>
              <p className="mt-1 text-xs text-slate-500">{p.metaDescription}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

