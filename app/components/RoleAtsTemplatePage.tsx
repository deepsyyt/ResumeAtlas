import Link from "next/link";
import { CopyResumeBlock } from "@/app/resume-guides/ats-resume-template/CopyResumeBlock";
import {
  ATS_RESUME_TEMPLATE_GUIDE_PATH,
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  CHECK_RESUME_AGAINST_JD_PRIMARY_CTA,
} from "@/app/lib/internalLinks";
import { getRoleAtsBlock, type RoleAtsTemplateKey } from "@/app/lib/roleAtsTemplateConfig";

export function RoleAtsTemplatePage({ role }: { role: RoleAtsTemplateKey }) {
  const b = getRoleAtsBlock(role);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="border-b border-slate-200 bg-slate-50/70">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-sky-900/80">
            Role-specific ATS resume template
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {b.h1}
          </h1>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700 sm:text-base">
            {b.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition"
            >
              {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
            </Link>
            <Link
              href={ATS_RESUME_TEMPLATE_GUIDE_PATH}
              className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition"
            >
              Full ATS format guide
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl space-y-12 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
            ATS resume keywords for this role
          </h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Mirror these only where they match your real stack—keyword stuffing hurts interviews and
            can backfire with recruiters.
          </p>
          <p className="mt-4 rounded-lg bg-slate-50 p-3 text-sm font-medium leading-relaxed text-slate-800 ring-1 ring-slate-900/5">
            {b.keywordStrip[0]}
          </p>
          <h3 className="mt-6 text-base font-semibold text-slate-900">Strong action verbs</h3>
          <p className="mt-2 text-sm text-slate-700">{b.verbStrip.join(" · ")}</p>
          <p className="mt-4 text-sm text-slate-600">
            Deeper lists:{" "}
            <Link href={b.keywordGuideHref} className="font-semibold text-sky-800 underline underline-offset-2 hover:text-sky-950">
              {b.keywordGuideLabel}
            </Link>{" "}
            ·{" "}
            <Link href={b.resumeGuideHref} className="font-semibold text-sky-800 underline underline-offset-2 hover:text-sky-950">
              {b.resumeGuideLabel}
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">Copy-paste starter template</h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Paste into Google Docs or Word, apply simple heading styles, then replace every line with
            your real experience.
          </p>
          <div className="mt-4 max-w-lg">
            <CopyResumeBlock eyebrow="Starter" title={`${b.h1} — plain text`} body={b.copySnippet} />
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">Long-form example on ResumeAtlas</h2>
          <p className="mt-2 text-sm text-slate-700 sm:text-base">
            Use this walkthrough for section-by-section structure and more sample bullets:
          </p>
          <Link
            href={b.exampleHref}
            className="mt-4 inline-flex font-semibold text-sky-800 underline underline-offset-2 hover:text-sky-950"
          >
            {b.exampleLabel}
          </Link>
        </section>
      </div>
    </main>
  );
}
