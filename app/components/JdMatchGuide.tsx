import Link from "next/link";
import { JD_GUIDE_SECTIONS } from "@/app/lib/jdMatchGuideContent";
import {
  ANALYZE_OPTIMIZE_RESUME_JD_CTA,
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  OPTIMIZE_RESUME_FOR_JD_PATH,
} from "@/app/lib/internalLinks";
import { RESUME_KEYWORDS_HUB_PATH } from "@/app/lib/seoHubPages";

const sectionClass = "scroll-mt-24";

/** In-page anchor for redirects and old fragment links (no duplicate section). */
function LegacyAnchor({ id }: { id: string }) {
  return <span id={id} className="block h-0 scroll-mt-24" aria-hidden="true" />;
}

type JdMatchGuideProps = {
  /** Homepage: tighter layout, fewer duplicate CTAs and role-prep links. */
  homePageMode?: boolean;
};

export function JdMatchGuide({ homePageMode = false }: JdMatchGuideProps) {
  return (
    <div className={homePageMode ? "space-y-8" : "space-y-12"}>
      <nav
        aria-label="Resume vs job description guide"
        className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6"
      >
        <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900">
          {homePageMode ? "How analyze and optimize works" : "Resume vs job description guide"}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          {homePageMode ? (
            <>
              Paste resume + job description, read ATS match score and keyword gaps, then apply AI
              optimization. Role-specific prep links are at the{" "}
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
              One workflow: compare to a posting, read ATS match score and keyword gaps, then optimize.
              Need role keyword prep first? Browse the{" "}
              <Link
                href={RESUME_KEYWORDS_HUB_PATH}
                className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                resume keywords by role hub
              </Link>
              .
            </>
          )}
        </p>
        <ul className="m-0 mt-4 flex list-none flex-wrap gap-2 p-0">
          {JD_GUIDE_SECTIONS.map((s) => (
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
          Whether you search compare resume to job description or compare resume to job posting, the
          task is the same: check one specific listing against your experience, not a generic resume
          audit. A full posting often includes company copy and benefits; for matching, paste the
          responsibilities and requirements block. That is what ATS and recruiters weight.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
          ResumeAtlas runs job description analysis on the text you paste, then returns ATS match
          score, keyword gap analysis, and optimization priorities. Every opening in the same job
          family can emphasize different tools and outcomes, so comparison is always
          posting-specific.
        </p>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-slate-700 sm:text-base">
          <li>Paste resume + full posting requirements (not a shortened summary).</li>
          <li>Read ATS match score and missing keywords for that listing.</li>
          <li>Prioritize must-have gaps before nice-to-have terms.</li>
          <li>Optimize top bullets with tools and outcomes the posting names.</li>
        </ol>
      </section>

      <section id="resume-gap-analysis" className={sectionClass}>
        <LegacyAnchor id="jd-keyword-matching" />
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
          Resume gap analysis and keyword gaps
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
          Gap analysis answers what job requirements your resume never evidences and which posting
          terms are missing entirely. It is always tied to one job description, unlike a generic
          resume review.
        </p>
        <h3 className="mt-5 text-base font-semibold text-slate-900">Skill gaps</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
          Required and preferred skills from the posting are compared to your skills section and
          bullets. A gap exists when a must-have appears in the JD but your resume does not show
          where you used it with scope or outcome proof.
        </p>
        <h3 className="mt-5 text-base font-semibold text-slate-900">
          Keyword gaps (resume keyword scanner)
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
          The keyword layer flags missing resume keywords: tools, frameworks, certifications, and
          domain phrases from the posting. This is posting vocabulary coverage, not a vanity keyword
          count. For parsing risk without a posting, use the{" "}
          <Link
            href="/ats-resume-checker"
            className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
          >
            ATS resume checker
          </Link>
          .
        </p>
        <h3 className="mt-5 text-base font-semibold text-slate-900">Fix order</h3>
        <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-slate-700 sm:text-base">
          <li>Close must-have skill gaps where you have real experience.</li>
          <li>Add missing keywords into bullets with truthful examples.</li>
          <li>Rewrite weak bullets for evidence density (tool + scope + metric).</li>
        </ol>
      </section>

      <section id="job-description-analysis" className={sectionClass}>
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
          Job description analysis: what recruiters look for
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
          Before you optimize, know what the tool extracts from the posting you pasted:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700 sm:text-base">
          <li>
            <strong className="text-slate-900">Required skills:</strong> must-have tools and
            competencies (highest-risk gaps).
          </li>
          <li>
            <strong className="text-slate-900">Preferred skills:</strong> differentiators when you
            can evidence them honestly.
          </li>
          <li>
            <strong className="text-slate-900">Seniority signals:</strong> scope words and experience
            cues that should match titles and bullets.
          </li>
          <li>
            <strong className="text-slate-900">Domain keywords:</strong> industry vocabulary that
            proves context fit.
          </li>
          <li>
            <strong className="text-slate-900">Experience evidence:</strong> outcomes in bullets, not
            responsibility lists alone.
          </li>
        </ul>
      </section>

      <section id="resume-match-score" className={sectionClass}>
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
          ATS match score explained
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
          Your ATS match score summarizes alignment with the pasted posting: keyword overlap, skills
          evidence, experience relevance, and readable structure.
        </p>
        <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm text-slate-700 sm:text-base">
          <li>
            <strong className="text-slate-900">75%+:</strong> strong alignment; polish and optimize
            top bullets
          </li>
          <li>
            <strong className="text-slate-900">60–74%:</strong> workable; close keyword and skill gaps
            first
          </li>
          <li>
            <strong className="text-slate-900">Below 60%:</strong> core posting vocabulary or evidence
            likely missing
          </li>
        </ul>
        <p className="mt-3 text-sm text-slate-600">
          Use the score to sequence gap fixes and AI optimization, not as a hiring guarantee.
        </p>
      </section>

      <section id="ai-resume-optimization" className={sectionClass}>
        <LegacyAnchor id="tailor-resume-jd" />
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
          AI resume optimization and tailoring
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
          After match score and gap analysis, optimize bullets for the same posting: JD-aligned
          rewrites, skills ordering, and phrasing that mirrors posting vocabulary where you have
          evidence. You review every edit before export.
        </p>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-slate-700 sm:text-base">
          <li>Mirror must-have vocabulary where experience is real.</li>
          <li>Rewrite 2–3 priority bullets with tool, scope, and metric.</li>
          <li>Apply AI suggestions, then edit manually.</li>
          <li>Export a posting-specific version.</li>
        </ol>
        {!homePageMode ? (
          <>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">
              For sample JD walkthroughs by role first, see the{" "}
              <Link
                href={OPTIMIZE_RESUME_FOR_JD_PATH}
                className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                optimize resume for job description hub
              </Link>{" "}
              or{" "}
              <Link
                href="/resume-examples"
                className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                resume examples by role
              </Link>
              .
            </p>
            <a
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="mt-5 inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              {ANALYZE_OPTIMIZE_RESUME_JD_CTA}
            </a>
          </>
        ) : null}
      </section>

      <section
        id="jd-match-example"
        className={`${sectionClass} rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6`}
      >
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
          Resume job description match example
        </h2>
        <p className="mt-3 text-sm text-slate-700 sm:text-base">
          <strong className="text-slate-900">Posting requires:</strong> Python, SQL, stakeholder
          communication, experimentation.
        </p>
        <p className="mt-2 text-sm text-slate-700 sm:text-base">
          <strong className="text-slate-900">Resume contains:</strong> Python, dashboards, ad-hoc
          analysis.
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700 sm:text-base">
          <li>
            <strong className="text-slate-900">Keyword gaps:</strong> SQL depth, experimentation,
            stakeholder outcomes
          </li>
          <li>
            <strong className="text-slate-900">ATS match score:</strong> ~66% before edits
          </li>
          <li>
            <strong className="text-slate-900">After optimization:</strong> ~78% with evidenced SQL
            and experiment bullets
          </li>
        </ul>
      </section>
    </div>
  );
}
