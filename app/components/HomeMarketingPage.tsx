import Link from "next/link";
import { HomeBrowseByRoleSection } from "@/app/components/HomeBrowseByRoleSection";
import { HomeOptimizedResumePreviewSection } from "@/app/components/HomeOptimizedResumePreviewSection";
import { HomeStep1PreviewSection } from "@/app/components/HomeStep1PreviewSection";
import {
  CHECK_RESUME_AGAINST_JD_PATH,
  CHECK_RESUME_AGAINST_JD_PRIMARY_CTA,
} from "@/app/lib/internalLinks";
import {
  HOME_CAPABILITY_CARDS,
  HOME_HOW_IT_WORKS_STEPS,
} from "@/app/lib/homeMarketingContent";

export function HomeMarketingPage() {
  return (
    <main className="min-h-screen">
      <HomeStep1PreviewSection />
      <HomeOptimizedResumePreviewSection />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <section aria-labelledby="home-capabilities-heading" className="text-center">
          <h2
            id="home-capabilities-heading"
            className="text-xl font-bold tracking-[-0.025em] text-slate-900 sm:text-2xl"
          >
            What you get for free
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            One workflow: check ATS fit, compare to a job description, then optimize with AI.
          </p>
          <ul className="mt-8 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {HOME_CAPABILITY_CARDS.map((card) => (
              <li
                key={card.title}
                className="rounded-2xl border border-white/80 bg-white/75 p-4 text-left shadow-sm shadow-slate-900/[0.04] ring-1 ring-slate-900/[0.04] backdrop-blur-sm"
              >
                <h3 className="text-sm font-semibold text-slate-900">{card.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{card.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="home-how-heading"
          className="mt-12 rounded-2xl border border-white/70 bg-white/60 px-5 py-8 shadow-sm shadow-slate-900/[0.03] ring-1 ring-slate-900/[0.04] backdrop-blur-sm sm:px-8 sm:py-10"
        >
          <div className="text-center">
            <h2 id="home-how-heading" className="text-xl font-bold tracking-[-0.025em] text-slate-900">
              How it works
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600">
              Open the free checker, paste your resume and job description, then review and optimize.
            </p>
          </div>
          <ol className="mt-8 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {HOME_HOW_IT_WORKS_STEPS.map((step, index) => (
              <li
                key={step.key}
                className="rounded-xl border border-white/80 bg-white/90 p-4 text-center shadow-sm ring-1 ring-slate-900/[0.04] sm:text-left"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Step {index + 1}
                </p>
                <p className="mt-2 text-2xl" aria-hidden>
                  {step.emoji}
                </p>
                <h3 className="mt-2 text-sm font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.line}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-12 text-center">
          <div className="rounded-2xl bg-slate-900 px-6 py-10 text-white sm:px-10">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Ready to check your resume?
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-slate-300 sm:text-base">
              Open the free AI checker and optimizer. Paste only, instant results, no signup.
            </p>
            <Link
              href={CHECK_RESUME_AGAINST_JD_PATH}
              className="mt-6 inline-flex rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 sm:text-base"
            >
              {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
            </Link>
            <p className="mt-4 text-sm text-slate-400">
              Need parsing-only?{" "}
              <Link href="/ats-resume-checker" className="font-medium text-white underline underline-offset-2">
                ATS resume checker
              </Link>{" "}
              · Questions?{" "}
              <Link href="/faq" className="font-medium text-white underline underline-offset-2">
                FAQ
              </Link>
            </p>
          </div>
        </section>
      </div>

      <HomeBrowseByRoleSection />
    </main>
  );
}
