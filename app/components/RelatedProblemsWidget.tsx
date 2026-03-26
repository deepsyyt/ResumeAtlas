import Link from "next/link";
import type { ProblemSlug } from "@/app/lib/problemPages";

type Entry = { slug: ProblemSlug; label: string };

type Props = {
  entries: Entry[];
  /** Absolute base URL for JSON-LD (same as metadataBase) */
  siteUrl: string;
};

/**
 * Bottom-of-page cluster widget for problem pages; surfaces relatedSlugs for topical linking.
 */
export function RelatedProblemsWidget({ entries, siteUrl }: Props) {
  if (entries.length === 0) return null;

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Related job search problems",
    numberOfItems: entries.length,
    itemListElement: entries.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: e.label,
      url: `${siteUrl}/problems/${e.slug}`,
    })),
  };

  return (
    <>
      <aside
        className="border-t border-slate-200 bg-gradient-to-b from-slate-50/80 to-white"
        aria-labelledby="related-problems-heading"
      >
        <div className="mx-auto max-w-3xl px-4 pb-14 pt-10 sm:px-6 lg:px-8">
          <h2
            id="related-problems-heading"
            className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl"
          >
            Related problems
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Same job-search cluster: jump to a related angle without losing context.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {entries.map((e) => (
              <li key={e.slug}>
                <Link
                  href={`/problems/${e.slug}`}
                  className="group flex h-full min-h-[3.25rem] items-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 shadow-sm transition hover:border-sky-300 hover:bg-sky-50/50 hover:text-sky-950"
                >
                  <span
                    className="pr-2 text-slate-400 transition group-hover:text-sky-600"
                    aria-hidden="true"
                  >
                    →
                  </span>
                  <span className="leading-snug">{e.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-sm sm:text-left">
            <Link
              href="/problems"
              className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
            >
              Browse all problem pages
            </Link>
          </p>
        </div>
      </aside>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
    </>
  );
}
