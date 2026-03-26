"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  normalizePathname,
  resolveProblemInterviewCallout,
} from "@/app/lib/problemInterviewCallout";

/**
 * Site-wide contextual link to pain-intent SEO (root layout). Target and copy
 * depend on page type (guides vs keyword cluster vs ATS pages).
 */
export function ProblemInterviewCallout() {
  const pathname = usePathname();
  /** Shown inline in the home page resource section instead. */
  if (normalizePathname(pathname) === "/") return null;

  const resolved = resolveProblemInterviewCallout(pathname);
  if (!resolved) return null;

  return (
    <aside
      className="border-t border-slate-200 bg-slate-50"
      aria-label="Job search help"
    >
      <div className="mx-auto max-w-7xl px-4 py-3.5 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-slate-700 sm:text-left">
          {resolved.prefix}
          <Link
            href={resolved.href}
            className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
          >
            {resolved.linkText}
          </Link>
        </p>
      </div>
    </aside>
  );
}
