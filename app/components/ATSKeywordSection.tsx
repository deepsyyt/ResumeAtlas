"use client";

import Link from "next/link";
import { KEYWORD_PAGES } from "@/app/lib/seoPages";

export function ATSKeywordSection() {
  const items = Object.entries(KEYWORD_PAGES).slice(0, 6);
  const seoContentLinks = [
    {
      href: "/data-scientist-resume-example#summary",
      label: "Data Scientist resume summary examples",
    },
    {
      href: "/product-manager-resume-example#bullet-points",
      label: "Product Manager resume responsibilities",
    },
  ];

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
              href={`/${role}-resume-keywords`}
              className="text-sky-700 hover:underline text-xs sm:text-sm"
            >
              {page.h1}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-3">
        <p className="text-[11px] sm:text-xs text-slate-500">
          After you know the right keywords, turn them into strong, ATS-ready content:
        </p>
        <ul className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {seoContentLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[11px] sm:text-xs text-sky-700 hover:underline"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

