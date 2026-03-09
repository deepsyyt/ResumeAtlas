"use client";

import Link from "next/link";
import { RESUME_PAGES } from "@/app/lib/seoPages";

export function ResumeExamplesSection() {
  const items = Object.entries(RESUME_PAGES).slice(0, 6);

  return (
    <section className="mt-8 text-left">
      <h2 className="text-base font-semibold tracking-tight text-slate-900">
        Popular Resume Examples
      </h2>
      <p className="mt-1 text-sm text-slate-600">
        See ATS‑friendly resume examples for competitive roles, then tailor yours with ResumeAtlas.
      </p>
      <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
        {items.map(([slug, page]) => (
          <li key={slug}>
            <Link
              href={`/${slug}`}
              className="text-sky-700 hover:underline text-xs sm:text-sm"
            >
              {page.h1}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

