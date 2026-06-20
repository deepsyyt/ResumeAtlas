import { JD_GUIDE_SECTIONS, JD_GUIDE_SECTIONS_COMPACT } from "@/app/lib/jdMatchGuideContent";
import {
  ANALYZE_OPTIMIZE_RESUME_JD_CTA,
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
} from "@/app/lib/internalLinks";

const sectionClass = "scroll-mt-24";

/** In-page anchor for redirects and old fragment links (no duplicate section). */
function LegacyAnchor({ id }: { id: string }) {
  return <span id={id} className="block h-0 scroll-mt-24" aria-hidden="true" />;
}

type JdMatchGuideProps = {
  /** Homepage: tighter layout, fewer duplicate CTAs and role-prep links. */
  homePageMode?: boolean;
  /** Workbench money page: diagnosis-first, ~30% less educational copy. */
  compact?: boolean;
};

export function JdMatchGuide({ homePageMode = false, compact = false }: JdMatchGuideProps) {
  const sections = compact ? JD_GUIDE_SECTIONS_COMPACT : JD_GUIDE_SECTIONS;
  const spacing = compact || homePageMode ? "space-y-8" : "space-y-12";

  if (compact) {
    return (
      <div className={spacing}>
        <section id="compare-resume-jd" className={sectionClass}>
          <LegacyAnchor id="compare-resume-job-posting" />
          <LegacyAnchor id="job-description-analysis" />
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Can you realistically clear this role?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
            Paste one posting&apos;s requirements block — not company boilerplate. ResumeAtlas
            returns an application verdict, which skills are proven in your bullets vs listed only,
            and what may eliminate you before you apply.
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-slate-700 sm:text-base">
            <li>Read the application verdict for this specific role.</li>
            <li>See proven vs weak skills and missing requirements.</li>
            <li>Fix what you can support with real work, then download the version to send.</li>
          </ol>
          <a
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="mt-4 inline-flex rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
          >
            {ANALYZE_OPTIMIZE_RESUME_JD_CTA}
          </a>
        </section>

        <section id="resume-gap-analysis" className={sectionClass}>
          <LegacyAnchor id="jd-keyword-matching" />
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Listed vs proven skills
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
            A skill in your Skills section can still count as weak if no project bullet shows where
            you used it. That is why resumes with the right keywords still get rejected — recruiters
            look for evidence, not lists.
          </p>
        </section>

        <section id="resume-match-score" className={sectionClass}>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Your application verdict
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
            <strong className="text-slate-900">Application verdict</strong> combines:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700 sm:text-base">
            <li>Proven skills</li>
            <li>Missing requirements</li>
            <li>Rejection risks</li>
          </ul>
        </section>

        <section id="ai-resume-optimization" className={sectionClass}>
          <LegacyAnchor id="tailor-resume-jd" />
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Fix proof, then apply
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
            Strengthen bullets where your experience already supports the posting. Unsupported
            requirements stay visible — we do not invent coverage. You review every edit before you
            download the posting-specific file.
          </p>
        </section>

        <section
          id="jd-match-example"
          className={`${sectionClass} rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6`}
        >
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Why a listed skill can still get you rejected
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Before</p>
              <p className="mt-2 text-sm text-slate-700">
                <strong className="text-slate-900">AWS</strong> listed in skills — no project bullet
                shows where you used it.
              </p>
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-amber-800">
                After analysis
              </p>
              <p className="mt-2 text-sm text-slate-700">
                <strong className="text-slate-900">AWS marked as weak</strong> because no project
                bullet demonstrates AWS usage for this posting.
              </p>
            </div>
          </div>
          <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-emerald-800">
              Recommended fix
            </p>
            <p className="mt-2 text-sm text-slate-700">
              Add AWS deployment project evidence — scope, stack, and outcome — in a work or project
              bullet where you actually used it.
            </p>
          </div>
          <a
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="mt-5 inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {ANALYZE_OPTIMIZE_RESUME_JD_CTA}
          </a>
        </section>
      </div>
    );
  }

  return (
    <div className={spacing}>
      <nav
        aria-label="Resume vs job description guide"
        className={
          homePageMode
            ? "border-t border-slate-200/50 pt-10"
            : "rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6"
        }
      >
        <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900">
          {homePageMode ? "How analyze and optimize works" : "Resume vs job description guide"}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          {homePageMode ? (
            <>
              Paste resume + job description, read your application verdict and which skills are
              proven vs weak, then fix what matters for this posting. Role-specific prep links are at
              the{" "}
              <a
                href="#browse-by-role"
                className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                bottom of this page
              </a>
              .
            </>
          ) : (
            <>
              One workflow: compare to a posting, read your application verdict and skill gaps,
              then optimize proof for this role.
            </>
          )}
        </p>
        <ul className="m-0 mt-4 flex list-none flex-wrap gap-2 p-0">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-800 transition hover:border-slate-300 hover:bg-slate-50 sm:text-sm"
              >
                {s.navLabel}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section id="compare-resume-jd" className={sectionClass}>
        <LegacyAnchor id="compare-resume-job-posting" />
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
          Compare resume to job description or job posting
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
          Check one specific listing against your experience — paste the responsibilities and
          requirements block. ResumeAtlas returns an application verdict, proven vs weak skills, and
          honest gap callouts for that posting.
        </p>
      </section>

      <section id="resume-gap-analysis" className={sectionClass}>
        <LegacyAnchor id="jd-keyword-matching" />
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
          Skill proof map and JD gaps
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
          For each JD skill, see whether you proved it in a project bullet, mentioned it in
          experience text, listed it only, or left it missing. A skill in your Skills section can
          still score weak if no bullet shows scope or outcome.
        </p>
      </section>

      <section id="job-description-analysis" className={sectionClass}>
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
          What the posting signals
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
          Must-have skills carry the highest rejection risk. Preferred skills and seniority cues
          matter when you can evidence them. Outcomes in project bullets beat responsibility lists.
        </p>
      </section>

      <section id="resume-match-score" className={sectionClass}>
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
          Application verdict and dashboard metrics
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
          <strong className="text-slate-900">Application verdict</strong> combines proven skills,
          missing requirements, and rejection risks for this posting — not a generic ATS score alone.
        </p>
      </section>

      <section id="ai-resume-optimization" className={sectionClass}>
        <LegacyAnchor id="tailor-resume-jd" />
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
          Evidence-first optimization
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
          Strengthen proof in bullets you already have, move supported skills from lists into work
          experience, and export a posting-specific version. You review every edit before download.
        </p>
        {!homePageMode ? (
          <a
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="mt-5 inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {ANALYZE_OPTIMIZE_RESUME_JD_CTA}
          </a>
        ) : null}
      </section>

      <section
        id="jd-match-example"
        className={`${sectionClass} rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6`}
      >
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
          Why a listed skill can still get you rejected
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Before</p>
            <p className="mt-2 text-sm text-slate-700">
              <strong className="text-slate-900">AWS</strong> listed in skills section — no project
              bullet shows where you used it.
            </p>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-amber-800">After analysis</p>
            <p className="mt-2 text-sm text-slate-700">
              <strong className="text-slate-900">AWS marked as weak</strong> because no project bullet
              demonstrates AWS usage for this posting.
            </p>
          </div>
        </div>
        <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-emerald-800">
            Recommended fix
          </p>
          <p className="mt-2 text-sm text-slate-700">
            Add AWS deployment project evidence — scope, stack, and outcome — in a work or project
            bullet where you actually used it.
          </p>
        </div>
      </section>
    </div>
  );
}
