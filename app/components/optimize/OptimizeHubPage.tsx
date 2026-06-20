import Link from "next/link";
import { LastUpdated } from "@/app/components/LastUpdated";
import { OptimizePagesToolCta } from "@/app/components/optimize/OptimizePagesToolCta";
import { CONTENT_LAST_UPDATED_LABEL } from "@/app/lib/contentFreshness";
import {
  ANALYZE_OPTIMIZE_RESUME_JD_CTA,
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  CHECK_RESUME_AGAINST_JD_PATH,
} from "@/app/lib/internalLinks";
import {
  OPTIMIZE_HUB_CONTENT,
  ROLE_OPTIMIZER_ORDER,
} from "@/app/lib/roleOptimizerContent";
import {
  optimizeHubBreadcrumbJsonLd,
  optimizeHubWebApplicationJsonLd,
  optimizerFaqJsonLd,
} from "@/app/lib/roleOptimizerJsonLd";

const sectionClass = "scroll-mt-24";

export function OptimizeHubPage() {
  const hub = OPTIMIZE_HUB_CONTENT;

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <section className="border-b border-slate-200 bg-slate-50/50">
        <div className="page-prose-wide py-10 text-center sm:py-12">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {hub.h1}
          </h1>
          <LastUpdated className="mt-3 text-xs text-slate-500" label={CONTENT_LAST_UPDATED_LABEL} />
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {hub.heroIntro}
          </p>
          <a
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {ANALYZE_OPTIMIZE_RESUME_JD_CTA}
          </a>
        </div>
      </section>

      <div className="page-prose space-y-10 py-10 sm:py-12">
        <section id="how-it-works" className={sectionClass}>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            How resume optimization works
          </h2>
          <ol className="mt-5 space-y-5">
            {hub.howItWorks.map((step) => (
              <li key={step.step} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                  {step.step}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-slate-900 sm:text-lg">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-700 sm:text-base">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="optimization-vs-ats" className={sectionClass}>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            {hub.optimizationVsAts.heading}
          </h2>
          <div className="mt-4 space-y-3">
            {hub.optimizationVsAts.paragraphs.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed text-slate-700 sm:text-base">
                {p}
              </p>
            ))}
          </div>
        </section>

        <section id="examples" className={sectionClass}>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Before and after resume examples
          </h2>
          <div className="mt-5 space-y-8">
            {hub.beforeAfterExamples.map((ex) => (
              <div key={ex.label}>
                <h3 className="text-base font-semibold text-slate-900">{ex.label}</h3>
                <p className="mt-2 text-sm text-slate-600">{ex.context}</p>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-rose-100 bg-rose-50/50 p-4">
                    <p className="text-xs font-semibold uppercase text-rose-800">Before</p>
                    <p className="mt-2 text-sm text-slate-800">{ex.before}</p>
                  </div>
                  <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
                    <p className="text-xs font-semibold uppercase text-emerald-800">After</p>
                    <p className="mt-2 text-sm text-slate-800">{ex.after}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="role-optimizers" className={sectionClass}>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Related role optimizers
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
            Tailoring language differs by function. Pick your role for hiring signals, common mistakes,
            and examples before you paste a job description into the workbench.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {ROLE_OPTIMIZER_ORDER.map((role) => (
              <li key={role.path}>
                <Link
                  href={role.path}
                  className="flex rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  {role.roleName} resume optimizer
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 text-sm text-slate-700">
          <p>
            Role guides and keyword checklists on this hub prepare you for the{" "}
            <Link
              href={CHECK_RESUME_AGAINST_JD_PATH}
              className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
            >
              compare resume to job description
            </Link>{" "}
            tool—where you run match score, gap analysis, and AI optimization on your resume.
          </p>
        </section>

        <OptimizePagesToolCta />
      </div>

      <div className="page-prose pb-14">
        <section id="faq" className={`${sectionClass} pt-8`}>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Frequently asked questions
          </h2>
          <dl className="mt-6 space-y-6">
            {hub.faq.map((item) => (
              <div key={item.question}>
                <dt className="text-base font-semibold text-slate-900">{item.question}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(optimizeHubBreadcrumbJsonLd()) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(optimizeHubWebApplicationJsonLd()) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(optimizerFaqJsonLd(hub.faq)) }}
      />
    </div>
  );
}
