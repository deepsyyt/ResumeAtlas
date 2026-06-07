import {
  ANALYZE_OPTIMIZE_RESUME_JD_CTA,
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
} from "@/app/lib/internalLinks";
import type { RoleOptimizerContent } from "@/app/lib/roleOptimizerContent";

type Props = { role: RoleOptimizerContent };

export function JdDemonstrationSection({ role }: Props) {
  const demo = role.jdDemonstration;

  return (
    <section id="jd-demonstration" className="scroll-mt-24">
      <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
        {demo.sectionTitle}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">{demo.intro}</p>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h3 className="text-base font-semibold text-slate-900 sm:text-lg">{demo.sampleJdLabel}</h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {demo.sampleJdRequirements.map((req) => (
            <li
              key={req}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-800"
            >
              {req}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-amber-900">
            Resume match analysis
          </h3>
          <p className="mt-3 text-3xl font-semibold tabular-nums text-slate-900">
            {demo.matchScore}%
            <span className="ml-2 text-base font-normal text-slate-600">current match score</span>
          </p>
          <p className="mt-3 text-sm font-semibold text-slate-900">Missing from resume:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
            {demo.missingKeywords.map((kw) => (
              <li key={kw}>{kw}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-900">
            Optimized resume bullet
          </h3>
          <div className="mt-3 space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase text-rose-800">Before</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-800">{demo.beforeBullet}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-emerald-800">After</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-800">{demo.afterBullet}</p>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">{demo.outro}</p>
      <a
        href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
        className="mt-5 inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        {ANALYZE_OPTIMIZE_RESUME_JD_CTA}
      </a>
    </section>
  );
}
