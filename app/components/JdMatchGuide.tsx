import Link from "next/link";
import { JD_GUIDE_SECTIONS } from "@/app/lib/jdMatchGuideContent";
import { CHECK_RESUME_AGAINST_JD_FORM_HREF } from "@/app/lib/internalLinks";

const sectionClass = "scroll-mt-20";

export function JdMatchGuide() {
  return (
    <div className="space-y-12">
      <nav
        aria-label="Resume vs job description guide"
        className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6"
      >
        <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900">
          Resume vs job description guide
        </h2>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          Compare, score, and tailor your resume to one posting—the commercial intents this page
          owns.
        </p>
        <ul className="mt-4 flex flex-wrap gap-2 list-none m-0 p-0">
          {JD_GUIDE_SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-800 hover:border-slate-300 hover:bg-slate-50 transition"
              >
                {s.navLabel}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section id="compare-resume-jd" className={sectionClass}>
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
          How to compare resume to a job description
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
          Comparing your resume to a job description means reading one specific posting side by side
          with your experience—not running a generic resume audit. Paste the exact job description
          you plan to apply to, then look for three signals: keyword coverage, evidence quality in
          bullets, and whether your titles and scope read like the role.
        </p>
        <ol className="mt-4 space-y-3 list-decimal pl-5 text-sm sm:text-base text-slate-700">
          <li>Paste your resume and the full job posting (not a shortened summary).</li>
          <li>Review your match score and missing keywords from that posting.</li>
          <li>Prioritize must-have requirements before nice-to-have terms.</li>
          <li>Rewrite top bullets with tools + outcomes the posting emphasizes.</li>
        </ol>
        <a
          href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
          className="mt-5 inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition"
        >
          Compare my resume to this job description (free)
        </a>
      </section>

      <section id="resume-match-score" className={sectionClass}>
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
          Resume match score explained
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
          Your resume match score summarizes alignment with the pasted job description. Most systems
          weight keyword overlap, skills evidence, experience relevance, and readable structure—not
          design aesthetics.
        </p>
        <ul className="mt-4 list-disc pl-5 space-y-1.5 text-sm sm:text-base text-slate-700">
          <li>
            <strong className="text-slate-900">75%+</strong> — strong alignment; polish top bullets
            and confirm must-haves are evidenced
          </li>
          <li>
            <strong className="text-slate-900">60–74%</strong> — workable base; close keyword and
            skill gaps before applying
          </li>
          <li>
            <strong className="text-slate-900">Below 60%</strong> — likely missing core posting
            vocabulary or weak evidence; tailor before submitting
          </li>
        </ul>
        <p className="mt-3 text-sm text-slate-600">
          Employers use different ATS rules. Use the score to sequence edits, not as a pass/fail
          verdict.
        </p>
      </section>

      <section id="jd-keyword-matching" className={sectionClass}>
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
          Resume keyword matching vs a job posting
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
          Resume keyword matching checks whether important terms from the job description appear
          clearly in your resume—skills, tools, certifications, and domain phrases. Missing
          must-have keywords is one of the fastest ways to lose ATS rank for that role.
        </p>
        <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
          This workbench surfaces keyword gaps as part of a full match readout (not a vanity keyword
          list). For parsing and formatting risk without a posting, use the{" "}
          <Link
            href="/ats-resume-checker"
            className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
          >
            ATS resume checker
          </Link>
          .
        </p>
      </section>

      <section id="tailor-resume-jd" className={sectionClass}>
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
          How to tailor resume to a job description
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
          Tailoring means adjusting summary, skills, and top bullets for one posting while keeping
          claims truthful. The highest-ROI sequence:
        </p>
        <ol className="mt-4 space-y-3 list-decimal pl-5 text-sm sm:text-base text-slate-700">
          <li>Mirror must-have vocabulary where you have real experience.</li>
          <li>Rewrite 2–3 bullets with scope, tool, and metric the posting cares about.</li>
          <li>Reorder skills so posting-critical terms appear early.</li>
          <li>Run AI optimization to draft JD-aligned edits you review before export.</li>
        </ol>
      </section>

      <section
        id="jd-match-example"
        className={`${sectionClass} rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6`}
      >
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
          Resume job description match example
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-700">
          <strong className="text-slate-900">Posting requires:</strong> Python, SQL, stakeholder
          communication, and experimentation.
        </p>
        <p className="mt-2 text-sm sm:text-base text-slate-700">
          <strong className="text-slate-900">Resume contains:</strong> Python, dashboards, and
          ad-hoc analysis.
        </p>
        <ul className="mt-3 list-disc pl-5 space-y-1 text-sm sm:text-base text-slate-700">
          <li>
            <strong className="text-slate-900">Missing:</strong> SQL depth, experimentation, and
            stakeholder-facing outcomes
          </li>
          <li>
            <strong className="text-slate-900">Match score:</strong> ~66% before targeted edits
          </li>
          <li>
            <strong className="text-slate-900">Fix first:</strong> one SQL project bullet and one
            experiment-impact bullet where truthful
          </li>
        </ul>
        <a
          href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
          className="mt-5 inline-flex rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition"
        >
          Run my resume job description match (free)
        </a>
      </section>
    </div>
  );
}
