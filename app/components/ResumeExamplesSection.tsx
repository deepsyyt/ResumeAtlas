"use client";

import Link from "next/link";
import {
  RESUME_PAGES,
  type RoleSlug,
  resumeExamplePublicPath,
} from "@/app/lib/seoPages";

export function ResumeExamplesSection() {
  const items = Object.entries(RESUME_PAGES).slice(0, 6);
  const seoDeepDiveLinks = [
    {
      href: "/data-scientist-resume-guide#bullet-points",
      label: "Data Scientist resume bullet points",
    },
    {
      href: "/software-engineer-resume-guide#skills",
      label: "Software Engineer resume skills",
    },
  ];

  return (
    <section className="mt-8 text-left">
      <h2 className="text-base font-semibold tracking-tight text-slate-900">
        Popular Resume Examples
      </h2>
      <p className="mt-1 text-sm text-slate-600">
        See ATS‑friendly resume examples for competitive roles, then tailor yours with ResumeAtlas.
      </p>
      <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
        {items.map(([slug, page]) => {
          const role = slug.replace(/-resume-example$/, "") as RoleSlug;
          return (
            <li key={slug}>
              <Link
                href={resumeExamplePublicPath(role)}
                className="text-sky-700 hover:underline text-xs sm:text-sm"
              >
                {page.h1}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="mt-3">
        <p className="text-[11px] sm:text-xs text-slate-500">
          Want more depth? Explore role-specific guides for bullet points, skills, summaries, and projects:
        </p>
        <ul className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {seoDeepDiveLinks.map((link) => (
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

