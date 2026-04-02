import Link from "next/link";

const ROLE_GUIDES: { href: string; label: string }[] = [
  { href: "/data-scientist", label: "Data Scientist resume guide" },
  { href: "/software-engineer", label: "Software Engineer resume guide" },
  { href: "/product-manager", label: "Product Manager resume guide" },
  { href: "/data-analyst", label: "Data Analyst resume guide" },
];

const KEYWORD_GUIDES: { href: string; label: string }[] = [
  { href: "/data-scientist-resume-keywords", label: "Data Scientist keywords" },
  { href: "/software-engineer-resume-keywords", label: "Software Engineer keywords" },
  { href: "/product-manager-resume-keywords", label: "Product Manager keywords" },
];

/**
 * Post-check “next steps” links to role hubs and keyword guides (session depth + internal authority).
 */
export function ToolClusterNextSteps() {
  return (
    <section
      className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-5 sm:p-6"
      aria-labelledby="tool-next-steps"
    >
      <h2
        id="tool-next-steps"
        className="text-lg sm:text-xl font-semibold tracking-tight text-emerald-950"
      >
        After you see your results
      </h2>
      <p className="mt-2 text-sm text-emerald-900/90 leading-relaxed">
        Improve your score with role-specific examples and keyword lists—then come back and run the
        check again on your updated resume.
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 text-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800/80">
            Role resume guides
          </p>
          <ul className="mt-2 space-y-1.5">
            {ROLE_GUIDES.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-emerald-900 font-medium underline underline-offset-2 hover:text-emerald-950"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800/80">
            ATS keyword guides
          </p>
          <ul className="mt-2 space-y-1.5">
            {KEYWORD_GUIDES.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-emerald-900 font-medium underline underline-offset-2 hover:text-emerald-950"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-3">
            <Link
              href="/ats-keywords"
              className="text-sm font-medium text-emerald-900 underline underline-offset-2 hover:text-emerald-950"
            >
              Browse all ATS keyword guides →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
