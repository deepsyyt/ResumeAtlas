import Link from "next/link";
import {
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  CHECK_RESUME_AGAINST_JD_PATH,
} from "@/app/lib/internalLinks";

type MoatRole = "software-engineer" | "data-analyst" | "product-manager";

const MOAT: Record<
  MoatRole,
  { headline: string; paragraphs: string[]; knockoutLine: string }
> = {
  "software-engineer": {
    headline: "Posting fit for engineering hiring (what the skim is actually looking for)",
    paragraphs: [
      "Hiring managers for IC and staff roles often decide in one pass whether your resume proves ownership of ambiguous systems work: on-call, migrations, correctness under load, and tradeoffs—not a keyword cloud of frameworks.",
      "Posting fit diagnosis on ResumeAtlas maps your bullets to the posting’s responsibilities first, then surfaces required skill debt where the JD demands evidence you have not written down yet. That is a different job than memorizing a generic “tech stack” list.",
    ],
    knockoutLine:
      "If the posting names SLOs, incident response, or production ownership and your resume only lists internal tools, you have a Gate B/C gap before ATS layout ever matters.",
  },
  "data-analyst": {
    headline: "Posting fit for analytics roles (credibility before buzzwords)",
    paragraphs: [
      "Strong analyst resumes prove measurement discipline: defining metrics, cleaning messy inputs, and influencing decisions—not only naming SQL and a BI tool.",
      "Use posting fit diagnosis after you draft from this page: paste the exact posting to see whether your SQL depth, stakeholder communication, and experiment language match what that employer wrote—not what a generic “DA keyword list” guesses.",
    ],
    knockoutLine:
      "If the JD stresses experimentation, stakeholder storytelling, or governance and your bullets stay in descriptive reporting mode, vocabulary coverage will look fine while semantic fit and evidence density stay weak.",
  },
  "product-manager": {
    headline: "Posting fit for PM hiring (outcomes and scope, not feature laundry lists)",
    paragraphs: [
      "PM screens reward outcomes tied to business constraints: launches, adoption, revenue or retention movement, and cross-functional leadership under uncertainty.",
      "Posting fit diagnosis checks whether your resume’s responsibilities read like the posting’s problems—not whether you squeezed in every acronym from the JD.",
    ],
    knockoutLine:
      "If the posting demands roadmap tradeoffs, metrics ownership, or B2B complexity and your resume reads like a backlog log, you need Gate C evidence—not more feature names in Gate B.",
  },
};

export function RolePostingFitMoat({ role }: { role: MoatRole }) {
  const m = MOAT[role];
  return (
    <section
      className="mx-auto mt-8 max-w-3xl rounded-2xl border border-slate-200 bg-slate-900 px-5 py-6 text-left text-slate-100 shadow-sm sm:px-7"
      aria-labelledby={`posting-fit-moat-${role}`}
    >
      <h2 id={`posting-fit-moat-${role}`} className="text-lg font-semibold tracking-tight text-white sm:text-xl">
        {m.headline}
      </h2>
      {m.paragraphs.map((p) => (
        <p key={p.slice(0, 24)} className="mt-3 text-sm leading-relaxed text-slate-200 sm:text-base">
          {p}
        </p>
      ))}
      <p className="mt-4 text-sm font-medium text-amber-100/95">{m.knockoutLine}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
          className="inline-flex rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-100 transition"
          data-analytics-event="posting_fit_tier_s_cta_clicked"
          data-analytics-location={`role_moat_${role}`}
        >
          Run posting fit diagnosis
        </Link>
        <Link
          href="/methodology"
          className="inline-flex rounded-xl border border-white/30 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition"
        >
          Methodology
        </Link>
        <Link
          href={CHECK_RESUME_AGAINST_JD_PATH}
          className="text-sm font-medium text-sky-200 underline underline-offset-2 hover:text-white"
        >
          Canonical workbench URL
        </Link>
      </div>
    </section>
  );
}
