import Link from "next/link";
import { HeroOptimizedResumePreview } from "@/app/components/postingFit/HeroOptimizedResumePreview";
import {
  CHECK_RESUME_AGAINST_JD_HERO_CTA,
  CHECK_RESUME_AGAINST_JD_PATH,
} from "@/app/lib/internalLinks";
import {
  HOME_OPTIMIZE_POINTS,
  HOME_OPTIMIZE_SECTION_EYEBROW,
  HOME_OPTIMIZE_SECTION_HEADING,
  HOME_OPTIMIZE_SECTION_INTRO,
} from "@/app/lib/homeMarketingContent";

const POINT_BADGE_CLASSES = [
  "bg-indigo-100 text-indigo-800",
  "bg-violet-100 text-violet-800",
  "bg-amber-100 text-amber-900",
  "bg-slate-200 text-slate-700",
] as const;

export function HomeOptimizedResumePreviewSection() {
  return (
    <section
      aria-labelledby="home-optimize-heading"
      className="marketing-optimize-bg relative overflow-hidden border-b border-slate-200/60 bg-[#f6f8fc]"
    >
      <div className="marketing-grid-overlay pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div className="relative page-shell py-10 sm:py-12">
        <div className="grid min-w-0 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-8 xl:gap-10">
          <div className="text-center lg:text-left">
            <p className="text-sm font-semibold tracking-[-0.01em] text-violet-800/90">
              {HOME_OPTIMIZE_SECTION_EYEBROW}
            </p>
            <h2
              id="home-optimize-heading"
              className="mt-1.5 text-pretty text-2xl font-bold tracking-[-0.03em] text-slate-900 sm:text-3xl sm:leading-snug"
            >
              {HOME_OPTIMIZE_SECTION_HEADING}
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-pretty text-sm leading-relaxed text-slate-600 sm:text-base lg:mx-0">
              {HOME_OPTIMIZE_SECTION_INTRO}
            </p>
            <ol className="mx-auto mt-5 max-w-md list-none space-y-3 p-0 text-left text-sm leading-relaxed text-slate-700 lg:mx-0">
              {HOME_OPTIMIZE_POINTS.map((point, index) => (
                <li key={point.label} className="flex gap-3">
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${POINT_BADGE_CLASSES[index] ?? POINT_BADGE_CLASSES[3]}`}
                  >
                    {index + 1}
                  </span>
                  <span>
                    <strong className="font-semibold text-slate-900">{point.label}:</strong>{" "}
                    {point.body}
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-7 flex flex-col items-center gap-3 lg:items-start">
              <Link
                href={CHECK_RESUME_AGAINST_JD_PATH}
                className="inline-flex min-w-[min(100%,18rem)] items-center justify-center rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 sm:text-base"
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
            </div>
          </div>

          <div className="mx-auto w-full max-w-lg lg:mx-0 lg:flex lg:justify-end">
            <div className="w-full lg:max-w-[30rem] xl:max-w-[32rem]">
              <HeroOptimizedResumePreview />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
