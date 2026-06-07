import Link from "next/link";
import { JdDemonstrationSection } from "@/app/components/optimize/JdDemonstrationSection";
import { OptimizePagesToolCta } from "@/app/components/optimize/OptimizePagesToolCta";
import { RoleKeywordChecklistSection } from "@/app/components/optimize/RoleKeywordChecklistSection";
import { RoleOptimizeClusterNav } from "@/app/components/optimize/RoleOptimizeClusterNav";
import { LastUpdated } from "@/app/components/LastUpdated";
import { CONTENT_LAST_UPDATED_LABEL } from "@/app/lib/contentFreshness";
import {
  ANALYZE_OPTIMIZE_RESUME_JD_CTA,
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  CHECK_RESUME_AGAINST_JD_PATH,
  CHECK_RESUME_AGAINST_JD_PRIMARY_CTA,
} from "@/app/lib/internalLinks";
import type { RoleOptimizerContent } from "@/app/lib/roleOptimizerContent";
import {
  OPTIMIZE_HUB_CONTENT,
  OPTIMIZE_HUB_PATH,
  ROLE_OPTIMIZER_ORDER,
} from "@/app/lib/roleOptimizerContent";
import { getOptimizeClusterNavFromRole } from "@/app/lib/roleOptimizer/clusterNav";
import {
  optimizerFaqJsonLd,
  roleOptimizerBreadcrumbJsonLd,
  roleOptimizerWebApplicationJsonLd,
} from "@/app/lib/roleOptimizerJsonLd";
import { getRoleOptimizerNeighbors } from "@/app/lib/roleOptimizer/registry";

type Props = { role: RoleOptimizerContent };

const sectionClass = "scroll-mt-24";

export function RoleOptimizerPage({ role }: Props) {
  const { prev, next } = getRoleOptimizerNeighbors(role.path);
  const cluster = getOptimizeClusterNavFromRole(role);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <section className="border-b border-slate-200 bg-slate-50/50">
        <div className="mx-auto max-w-4xl px-4 pb-10 pt-6 text-center sm:px-6 sm:pb-12 sm:pt-8 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4 text-left text-sm text-slate-600">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-slate-900">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-slate-400">
                /
              </li>
              <li>
                <Link href={OPTIMIZE_HUB_PATH} className="hover:text-slate-900">
                  Optimize for job description
                </Link>
              </li>
              <li aria-hidden="true" className="text-slate-400">
                /
              </li>
              <li className="font-medium text-slate-900">{role.roleName}</li>
            </ol>
          </nav>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {role.h1}
          </h1>
          <LastUpdated className="mt-3 text-xs text-slate-500" label={CONTENT_LAST_UPDATED_LABEL} />
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {role.introParagraphs[0]}
          </p>
          <a
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {ANALYZE_OPTIMIZE_RESUME_JD_CTA}
          </a>
        </div>
      </section>

      <div className="mx-auto max-w-3xl space-y-10 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        {cluster ? (
          <RoleOptimizeClusterNav cluster={cluster} currentPath={role.path} />
        ) : null}

        <JdDemonstrationSection role={role} />

        <RoleKeywordChecklistSection role={role} />

        <section id="intro" className={sectionClass}>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Why {role.roleName.toLowerCase()} resumes need job-description tailoring
          </h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700 sm:text-base">
            {role.introParagraphs.slice(1).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        <section id="mistakes" className={sectionClass}>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Common {role.roleName.toLowerCase()} resume mistakes
          </h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-sm text-slate-700 sm:text-base">
            {role.commonMistakes.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </section>

        <section id="skills" className={sectionClass}>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Top skills hiring managers look for
          </h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {role.topSkills.map((skill) => (
              <li
                key={skill}
                className="rounded-lg border border-slate-200 bg-slate-50/80 px-3 py-2 text-sm font-medium text-slate-800"
              >
                {skill}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">
            {role.skillsNarrative}
          </p>
        </section>

        <section id="before-after" className={sectionClass}>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Before vs after resume optimization example
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
            {role.beforeAfterContext}
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-rose-100 bg-rose-50/50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-rose-800">Before</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-800">{role.beforeExample.before}</p>
            </div>
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">After</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-800">{role.beforeExample.after}</p>
            </div>
          </div>
        </section>

        <section id="how-atlas" className={sectionClass}>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            How ResumeAtlas optimizes your {role.roleName.toLowerCase()} resume
          </h2>
          <div className="mt-4 space-y-5">
            {role.howAtlasOptimizes.map((item) => (
              <div key={item.heading}>
                <h3 className="text-base font-semibold text-slate-900 sm:text-lg">{item.heading}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {cluster ? (
          <RoleOptimizeClusterNav cluster={cluster} currentPath={role.path} />
        ) : null}

        <section
          id="cta"
          className="rounded-2xl border border-sky-100 bg-sky-50/60 p-6 text-center sm:p-8"
        >
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Analyze and optimize for your next application
          </h2>
          <p className="mt-3 text-sm text-slate-700 sm:text-base">
            Open the free compare tool: match score, gap analysis, and AI optimization for the{" "}
            {role.roleName.toLowerCase()} posting you paste.
          </p>
          <a
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="mt-5 inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {ANALYZE_OPTIMIZE_RESUME_JD_CTA}
          </a>
        </section>

        <OptimizePagesToolCta roleName={role.roleName} />
      </div>

      <div className="mx-auto max-w-3xl space-y-10 px-4 pb-14 sm:px-6 lg:px-8">
        <section id="faq" className={sectionClass}>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            {role.roleName} resume optimization FAQ
          </h2>
          <dl className="mt-6 space-y-6">
            {role.faq.map((item) => (
              <div key={item.question}>
                <dt className="text-base font-semibold text-slate-900">{item.question}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="related" className={sectionClass}>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            More resources
          </h2>
          <ul className="mt-4 space-y-2 text-sm sm:text-base">
            <li>
              <Link
                href={OPTIMIZE_HUB_PATH}
                className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                {OPTIMIZE_HUB_CONTENT.h1}
              </Link>
            </li>
            <li>
              <Link
                href={CHECK_RESUME_AGAINST_JD_PATH}
                className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
              </Link>
            </li>
          </ul>

          <h3 className="mt-8 text-lg font-semibold text-slate-900">Role optimizers</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {ROLE_OPTIMIZER_ORDER.map((r) => (
              <li key={r.path}>
                <Link
                  href={r.path}
                  className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-medium transition sm:text-sm ${
                    r.path === role.path
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 bg-white text-slate-800 hover:border-slate-300"
                  }`}
                >
                  {r.roleName}
                </Link>
              </li>
            ))}
          </ul>

          <nav
            aria-label="Role optimizer series"
            className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6 text-sm"
          >
            {prev ? (
              <Link
                href={prev.path}
                className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                ← {prev.roleName}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={next.path}
                className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                {next.roleName} →
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </section>
      </div>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(roleOptimizerBreadcrumbJsonLd(role)) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(roleOptimizerWebApplicationJsonLd(role)) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(optimizerFaqJsonLd(role.faq)) }}
      />
    </div>
  );
}
