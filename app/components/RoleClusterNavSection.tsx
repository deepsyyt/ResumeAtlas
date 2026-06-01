import Link from "next/link";
import {
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  CHECK_RESUME_AGAINST_JD_PRIMARY_CTA,
} from "@/app/lib/internalLinks";
import {
  getRoleClusterNavLinks,
  getRoleClusterTriangle,
  MONEY_PAGE_LINKS,
  resolveRoleClusterKeyFromPath,
} from "@/app/lib/roleClusterLinks";

type Props = {
  currentPath: string;
  className?: string;
};

/**
 * Role cluster triangle (example ↔ guide ↔ keywords) plus money-page funnel.
 * Replaces random “related guides” rotation on role SEO pages.
 */
export function RoleClusterNavSection({ currentPath, className = "" }: Props) {
  const key = resolveRoleClusterKeyFromPath(currentPath);
  if (!key) return null;

  const tri = getRoleClusterTriangle(key);
  const navLinks = getRoleClusterNavLinks(currentPath);
  const normalized = currentPath.replace(/\/$/, "") || "/";

  const triangleItems: { path: string; label: string; description: string }[] = [
    {
      path: tri.examplePath,
      label: tri.exampleLabel,
      description: "Full sample, ATS breakdown, recruiter review",
    },
  ];
  if (tri.guidePath) {
    triangleItems.push({
      path: tri.guidePath,
      label: tri.guideLabel,
      description: "Section patterns, bullets, summary & skills",
    });
  }
  triangleItems.push({
    path: tri.keywordsPath,
    label: tri.keywordsLabel,
    description: "ATS keyword lists & JD gap scan",
  });

  const adjacentOnly = navLinks.filter(
    (l) =>
      !MONEY_PAGE_LINKS.some((m) => m.path === l.path) &&
      !triangleItems.some((t) => t.path.replace(/\/$/, "") === l.path.replace(/\/$/, ""))
  );

  return (
    <section className={`rounded-2xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8 ${className}`}>
      <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
        {tri.roleName} resume resources
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        Use all three role pages together, then run your draft against a real job description.
      </p>

      <ul className="mt-5 space-y-3">
        {triangleItems.map((item) => {
          const itemPath = item.path.replace(/\/$/, "") || "/";
          const isCurrent = itemPath === normalized;
          return (
            <li
              key={item.path}
              className={`rounded-xl border px-4 py-3 ${
                isCurrent ? "border-sky-300 bg-sky-50/80" : "border-slate-200 bg-white"
              }`}
            >
              {isCurrent ? (
                <p className="text-sm font-semibold text-slate-900">{item.label} (this page)</p>
              ) : (
                <Link
                  href={item.path}
                  className="text-sm font-semibold text-sky-800 underline underline-offset-2 hover:text-sky-950"
                >
                  {item.label} →
                </Link>
              )}
              <p className="mt-1 text-xs text-slate-600">{item.description}</p>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 border-t border-slate-200 pt-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Check your resume (free)
        </p>
        <ul className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <li>
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="inline-flex rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
            </Link>
          </li>
          <li>
            <Link
              href="/ats-resume-checker"
              className="inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              ATS resume checker
            </Link>
          </li>
        </ul>
      </div>

      {adjacentOnly.length > 0 ? (
        <div className="mt-6 border-t border-slate-200 pt-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Related keyword guide
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
            {adjacentOnly.map((link) => (
              <li key={link.path}>
                <Link href={link.path} className="text-sky-700 hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
