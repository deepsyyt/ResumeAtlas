import Link from "next/link";
import { getRelatedResumeGuides, type RelatedLinkScope } from "@/app/lib/internalLinks";

type Props = {
  /** Current page path (e.g. pillar "/data-analyst-resume-guide") so we exclude it from related links. */
  currentPath: string;
  /** Number of related links to show (default 8 for dense semantic linking). */
  count?: number;
  /** Optional extra class for the section wrapper. */
  className?: string;
  /** Limit links to free tools and role keyword pages only. */
  linkScope?: RelatedLinkScope;
};

/**
 * Rotated internal links for topical authority (tools, role guides, articles).
 */
export function RelatedResumeGuidesSection({
  currentPath,
  count = 8,
  className = "",
  linkScope = "all",
}: Props) {
  const links = getRelatedResumeGuides(currentPath, count, linkScope);
  if (links.length === 0) return null;

  const toolsAndKeywordsOnly = linkScope === "toolsAndKeywords";

  return (
    <section className={className}>
      <h2 className="text-lg font-semibold tracking-tight text-slate-900 mb-3">
        {toolsAndKeywordsOnly ? "Related keyword pages" : "Related resources"}
      </h2>
      <p className="mb-3 text-sm text-slate-600">
        {toolsAndKeywordsOnly
          ? "Open your role&apos;s keyword checklist, then scan gaps against a real job posting."
          : "Prefer your role&apos;s example, guide, and keyword pages—then use the free checker tools."}
      </p>
      <ul className="list-disc pl-5 space-y-1 text-sm">
        {links.map(({ path, label }) => (
          <li key={path}>
            <Link href={path} className="text-sky-700 hover:underline">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
