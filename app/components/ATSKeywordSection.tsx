"use client";

import Link from "next/link";
import { KEYWORD_PAGES } from "@/app/lib/seoPages";

export function ATSKeywordSection() {
  const items = Object.entries(KEYWORD_PAGES).slice(0, 6);

  return (
    <section className="mt-6 text-left">
      <h2 className="text-base font-semibold tracking-tight text-slate-900">
        ATS Keyword Guides
      </h2>
      <p className="mt-1 text-sm text-slate-600">
        Learn which skills, tools, and concepts ATS expect to see for each role before you apply.
      </p>
      <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
        {items.map(([role, page]) => (
          <li key={role}>
            <Link
              href={`/ats-keywords/${role}`}
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

