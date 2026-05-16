import Link from "next/link";

const ROLE_PILLARS: { pillar: string; label: string }[] = [
  { pillar: "/data-scientist-resume-guide", label: "Data Scientist" },
  { pillar: "/software-engineer-resume-guide", label: "Software Engineer" },
  { pillar: "/product-manager-resume-guide", label: "Product Manager" },
  { pillar: "/data-analyst-resume-guide", label: "Data Analyst" },
];

/**
 * Post-check “next steps” links into consolidated role pillar pages + skills anchors (session depth).
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
        Improve your score with one authoritative page per role (examples + structure), jump to the skills
        section for ATS keyword coverage, then rerun the check on your updated resume.
      </p>
      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800/80">
          Role guides
        </p>
        <ul className="mt-2 space-y-2 text-sm">
          {ROLE_PILLARS.map((item) => (
            <li key={item.pillar} className="text-emerald-900">
              <Link
                href={item.pillar}
                className="font-medium underline underline-offset-2 hover:text-emerald-950"
              >
                {item.label} resume guide
              </Link>
              <span className="text-emerald-800/70"> · </span>
              <Link
                href={`${item.pillar}#skills`}
                className="underline underline-offset-2 hover:text-emerald-950"
              >
                ATS keywords section
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-4">
          <Link
            href="/ats-keywords"
            className="text-sm font-medium text-emerald-900 underline underline-offset-2 hover:text-emerald-950"
          >
            Browse all ATS keyword hubs →
          </Link>
        </p>
      </div>
    </section>
  );
}
