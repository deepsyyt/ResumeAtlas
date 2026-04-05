import Link from "next/link";
import { getRelatedResumeGuides } from "@/app/lib/internalLinks";

type Props = {
  /** Current page path (e.g. "/data-analyst-resume-keywords") so we exclude it from related links. */
  currentPath: string;
  /** Number of related links to show (default 8 for dense semantic linking). */
  count?: number;
  /** Optional extra class for the section wrapper. */
  className?: string;
};

/**
 * Rotated internal links for topical authority (tools, role guides, articles).
 */
export function RelatedResumeGuidesSection({
  currentPath,
  count = 8,
  className = "",
}: Props) {
  const links = getRelatedResumeGuides(currentPath, count);
  if (links.length === 0) return null;

  return (
    <section className={className}>
      <h2 className="text-lg font-semibold tracking-tight text-slate-900 mb-3">
        Related resources
      </h2>
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
