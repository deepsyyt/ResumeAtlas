import Link from "next/link";
import { HeroDashboardPreview } from "@/app/components/postingFit/HeroDashboardPreview";
import {
  CHECK_RESUME_AGAINST_JD_HERO_CTA,
  CHECK_RESUME_AGAINST_JD_PATH,
} from "@/app/lib/internalLinks";
import {
  HOME_MARKETING_H1,
  HOME_MARKETING_OUTCOMES,
  HOME_MARKETING_SEO_BRIDGE,
  HOME_MARKETING_SUBHEAD,
  HOME_MARKETING_TRUST_EYEBROW,
  HOME_COMPARE_SECTION_DETAIL_LINK_ANCHOR,
  HOME_COMPARE_SECTION_DETAIL_LINK_PREFIX,
  HOME_COMPARE_SECTION_DETAIL_LINK_SUFFIX,
} from "@/app/lib/homeMarketingContent";

const OUTCOME_BADGE_CLASSES = [
  "bg-indigo-100 text-indigo-800",
  "bg-rose-100 text-rose-900",
  "bg-amber-100 text-amber-900",
  "bg-emerald-100 text-emerald-900",
] as const;

export function HomeStep1PreviewSection() {
  return (
    <section
      aria-labelledby="home-page-heading"
      className="marketing-page-bg marketing-hero-bg relative overflow-hidden border-b border-slate-200/60"
    >
      <div className="marketing-grid-overlay pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative page-shell py-10 sm:py-12 lg:py-14">
        <div className="grid min-w-0 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-8 xl:gap-10">
          <div className="text-center lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700/90">
              {HOME_MARKETING_TRUST_EYEBROW}
            </p>
            <h1
              id="home-page-heading"
              className="mt-2.5 text-pretty text-[1.75rem] font-bold leading-[1.12] tracking-[-0.035em] text-slate-950 sm:text-4xl sm:leading-[1.08] lg:text-[2.625rem]"
            >
              {HOME_MARKETING_H1}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-relaxed text-slate-600 sm:text-base lg:mx-0">
              {HOME_MARKETING_SUBHEAD}
            </p>
            <p className="mx-auto mt-3 max-w-xl text-pretty text-sm font-medium leading-relaxed text-slate-700 sm:text-base lg:mx-0">
              {HOME_MARKETING_SEO_BRIDGE}
            </p>

            <ol className="mx-auto mt-6 max-w-md list-none space-y-3 p-0 text-left text-sm leading-relaxed text-slate-700 lg:mx-0">
              {HOME_MARKETING_OUTCOMES.map((outcome, index) => (
                <li key={outcome.label} className="flex gap-3">
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${OUTCOME_BADGE_CLASSES[index] ?? OUTCOME_BADGE_CLASSES[3]}`}
                  >
                    {index + 1}
                  </span>
                  <span>
                    <strong className="font-semibold text-slate-900">{outcome.label}:</strong>{" "}
                    {outcome.body}
                  </span>
                </li>
              ))}
            </ol>

            <p className="mx-auto mt-5 max-w-lg text-pretty text-sm leading-relaxed text-slate-600 sm:text-base lg:mx-0">
              {HOME_COMPARE_SECTION_DETAIL_LINK_PREFIX}
              <Link
                href={CHECK_RESUME_AGAINST_JD_PATH}
                className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                {HOME_COMPARE_SECTION_DETAIL_LINK_ANCHOR}
              </Link>
              {HOME_COMPARE_SECTION_DETAIL_LINK_SUFFIX}
            </p>

            <div className="mt-7 flex flex-col items-center gap-3 lg:items-start">
              <Link
                href={CHECK_RESUME_AGAINST_JD_PATH}
                className="inline-flex min-w-[min(100%,18rem)] items-center justify-center rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white shadow-[0_14px_40px_-14px_rgba(15,23,42,0.45)] transition hover:bg-slate-800 sm:text-base"
              >
                {CHECK_RESUME_AGAINST_JD_HERO_CTA}
              </Link>
              <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs font-medium text-slate-500 sm:text-sm lg:justify-start">
                <span>✓ 100% free</span>
                <span className="text-slate-300" aria-hidden>
                  ·
                </span>
                <span>✓ Instant results</span>
                <span className="text-slate-300" aria-hidden>
                  ·
                </span>
                <span>✓ No signup</span>
              </p>
              <p className="text-xs font-medium text-slate-500">
                Paste-only · No file upload · Your data stays yours
              </p>
            </div>
          </div>

          <div className="mx-auto w-full max-w-lg lg:sticky lg:top-20 lg:mx-0 lg:flex lg:justify-end xl:top-24">
            <div className="w-full lg:max-w-[30rem] xl:max-w-[32rem]">
              <HeroDashboardPreview />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
