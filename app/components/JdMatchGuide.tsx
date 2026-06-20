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
              Paste resume + job description, read your evidence match score and skill-by-skill proof
              map, then run evidence-first optimization. Role-specific prep links are at the{" "}
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
          ResumeAtlas runs job description analysis on the text you paste, then returns an evidence
          match score, what-we-measured signals, a skill-by-skill proof map, and honest gap
          callouts. ATS keyword score is reference only. Every opening in the same job family can
          emphasize different tools and outcomes, so comparison is always posting-specific.
        </p>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-slate-700 sm:text-base">
          <li>Paste resume + full posting requirements (not a shortened summary).</li>
          <li>Read evidence match and which JD skills are proven in project bullets vs listed only.</li>
          <li>Use the skill proof map to prioritize must-have gaps you can support with real work.</li>
          <li>Run evidence-first optimization to strengthen architecture, deployment, and impact proof.</li>
        </ol>
      </section>

      <section id="resume-gap-analysis" className={sectionClass}>
        <LegacyAnchor id="jd-keyword-matching" />
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
          Skill proof map and JD gaps
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
          The skill-by-skill proof map shows, for each JD skill, whether you proved it in a project
          bullet, mentioned it in experience text, listed it only, or left it missing honestly. Gap
          analysis is always tied to one job description, unlike a generic resume review.
        </p>
        <h3 className="mt-5 text-base font-semibold text-slate-900">Proven vs listed only</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
          A skill can appear in your Skills section but still score as weak if no project bullet shows
          where you used it with scope or outcome. Optimization targets bullets where your experience
          already supports the term, not invented coverage.
        </p>
        <h3 className="mt-5 text-base font-semibold text-slate-900">
          Keyword coverage (reference metric)
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
          Keyword coverage estimates posting vocabulary overlap. It helps, but it is not the same as
          proof. Pair it with the skill proof map and impact signals. For parsing risk without a
          posting, use the{" "}
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
          <li>Move supported JD skills from lists into the project bullets where you used them.</li>
          <li>Strengthen architecture, deployment, and measurable impact on weak bullets.</li>
          <li>Leave unsupported requirements visible as gaps instead of stuffing keywords.</li>
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
            <strong className="text-slate-900">Experience evidence:</strong> outcomes in project
            bullets, not responsibility lists or skills dumps alone.
          </li>
        </ul>
      </section>

      <section id="resume-match-score" className={sectionClass}>
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
          Evidence match and dashboard metrics
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
          <strong className="text-slate-900">Evidence match</strong> is the headline score: how much of
          this job you prove in experience and project bullets. The ATS keyword score is a separate
          formatting and overlap reference.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
          Keyword coverage shows each JD skill with proof status in your bullets — proven, weak, or
          missing.
        </p>
        <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm text-slate-700 sm:text-base">
          <li>
            <strong className="text-slate-900">Strong evidence match:</strong> most must-have skills
            show up in project bullets with outcomes
          </li>
          <li>
            <strong className="text-slate-900">Mixed proof:</strong> skills listed but not evidenced;
            prioritize bullet rewrites before new keywords
          </li>
          <li>
            <strong className="text-slate-900">Thin proof:</strong> large skill proof gaps; optimize
            where supported and leave honest gaps visible
          </li>
        </ul>
        <p className="mt-3 text-sm text-slate-600">
          Use the dashboard to sequence evidence fixes and optimization, not as a hiring guarantee.
        </p>
      </section>

      <section id="ai-resume-optimization" className={sectionClass}>
        <LegacyAnchor id="tailor-resume-jd" />
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
          Evidence-first optimization
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
          After the intelligence dashboard, optimization strengthens proof for the same posting:
          interview-safe summary rewrites, JD skills placed in the right project bullets, and stronger
          architecture, deployment, and impact language from work you already did. Unsupported
          requirements stay on the skill proof map. You review every edit before export.
        </p>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-slate-700 sm:text-base">
          <li>Rewrite your summary for impact and scope, not a tool dump.</li>
          <li>Move supported JD skills into project bullets where you actually used them.</li>
          <li>Apply evidence-first suggestions, then edit manually.</li>
          <li>Export a posting-specific version with honest gaps preserved.</li>
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
            <strong className="text-slate-900">Skill proof gaps:</strong> SQL and experimentation
            listed only, not shown in project bullets
          </li>
          <li>
            <strong className="text-slate-900">Evidence match:</strong> ~58% before optimization
            (ATS keyword score ~66% for reference)
          </li>
          <li>
            <strong className="text-slate-900">After evidence-first optimization:</strong> ~72% with
            SQL and experiment proof moved into project bullets
          </li>
        </ul>
      </section>
    </div>
  );
}
