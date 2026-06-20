import Link from "next/link";

type CompactToolHeroProps = {
  eyebrow: string;
  h1: string;
  intro: string;
  ctaHref?: string;
  ctaLabel?: string;
  /** Short intent chips — keep distinct per tool page. */
  chips?: readonly string[];
  /** Muted line under trust badges */
  footnote?: string;
  /** Tighter header for in-app workbench pages (widget directly below). */
  variant?: "default" | "workbench";
};

export function CompactToolHero({
  eyebrow,
  h1,
  intro,
  ctaHref = "#ats-checker-form",
  ctaLabel,
  chips = [],
  footnote,
  variant = "default",
}: CompactToolHeroProps) {
  const isWorkbench = variant === "workbench";
  const showCta = Boolean(ctaLabel?.trim());
  const ctaClassName =
    "inline-flex rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800";

  return (
    <section
      className={
        isWorkbench
          ? "border-b border-slate-200/90 bg-white"
          : "border-b border-slate-200/80 bg-gradient-to-b from-slate-50/80 to-white"
      }
    >
      <div
        className={`page-shell ${
          isWorkbench ? "py-5 sm:py-6" : showCta ? "py-8 sm:py-10" : "py-6 sm:py-7"
        }`}
      >
        <div className={isWorkbench ? "max-w-2xl" : "max-w-3xl"}>
          <p
            className={`font-medium uppercase text-sky-800/90 ${
              isWorkbench
                ? "text-[11px] tracking-[0.14em]"
                : "text-xs font-semibold tracking-[0.16em]"
            }`}
          >
            {eyebrow}
          </p>
          <h1
            className={`mt-1.5 text-pretty font-semibold tracking-tight text-slate-950 ${
              isWorkbench
                ? "text-[1.625rem] leading-[1.25] sm:text-[1.875rem] sm:leading-[1.2]"
                : "mt-2 text-2xl sm:text-3xl sm:leading-snug"
            }`}
          >
            {h1}
          </h1>
          <p
            className={`text-pretty leading-relaxed text-slate-600 ${
              isWorkbench
                ? "mt-2 max-w-xl text-[15px] sm:text-base"
                : "mt-2.5 max-w-2xl text-sm sm:text-base"
            }`}
          >
            {intro}
          </p>
          <p
            className={`flex flex-wrap items-center gap-x-2 gap-y-1 font-medium text-slate-500 ${
              isWorkbench ? "mt-2.5 text-xs" : "mt-3 text-xs text-slate-600 sm:text-sm"
            }`}
          >
            <span>Free</span>
            <span className="text-slate-300" aria-hidden>
              ·
            </span>
            <span>Instant results</span>
            <span className="text-slate-300" aria-hidden>
              ·
            </span>
            <span>No signup</span>
          </p>
          {showCta ? (
            <div className="mt-5">
              {ctaHref.startsWith("#") ? (
                <a href={ctaHref} className={ctaClassName}>
                  {ctaLabel}
                </a>
              ) : (
                <Link href={ctaHref} className={ctaClassName}>
                  {ctaLabel}
                </Link>
              )}
            </div>
          ) : null}
          {chips.length > 0 ? (
            <ul className={`flex flex-wrap gap-2 ${showCta ? "mt-5" : "mt-4"}`}>
              {chips.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700"
                >
                  {chip}
                </li>
              ))}
            </ul>
          ) : null}
          {footnote ? (
            <p className="mt-4 text-xs leading-relaxed text-slate-500">{footnote}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
