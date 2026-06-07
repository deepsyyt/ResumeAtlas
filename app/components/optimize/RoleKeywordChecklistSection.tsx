import Link from "next/link";
import {
  ANALYZE_OPTIMIZE_RESUME_JD_CTA,
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
} from "@/app/lib/internalLinks";
import type { RoleOptimizerContent } from "@/app/lib/roleOptimizerContent";

type Props = { role: RoleOptimizerContent };

export function RoleKeywordChecklistSection({ role }: Props) {
  const kw = role.keywordSection;

  return (
    <section id="resume-keywords" className="scroll-mt-24">
      <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">{kw.h2}</h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">{kw.intro}</p>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Keyword checklist</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {kw.checklist.map((term) => (
            <li
              key={term}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-800"
            >
              {term}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">{kw.body}</p>
      <a
        href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
        className="mt-4 inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        {ANALYZE_OPTIMIZE_RESUME_JD_CTA}
      </a>

      {role.relatedKeywordsPath ? (
        <p className="mt-4 text-sm text-slate-700">
          Full role checklist:{" "}
          <Link
            href={role.relatedKeywordsPath}
            className="font-semibold text-sky-800 underline underline-offset-2 hover:text-sky-950"
          >
            {role.roleName} resume keywords
          </Link>
        </p>
      ) : null}
    </section>
  );
}
