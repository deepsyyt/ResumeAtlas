"use client";

// Intelligence panel driven by atsEngine:
// - ATS Pass Probability
// - Keyword coverage
// - Semantic similarity
// - Experience and title alignment
// - Impact and resume quality

import type { ATSAnalysisResult } from "@/app/lib/atsEngine";

type IntelligencePanelProps = {
  engineResult: ATSAnalysisResult | null;
  showFullIntelligence?: boolean;
  showLocked?: boolean;
};

export function IntelligencePanel({
  engineResult,
  showFullIntelligence = true,
  showLocked = false,
}: IntelligencePanelProps) {
  const hasAny = !!engineResult;

  if (showLocked) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="relative">
          <div className="absolute inset-0 rounded-2xl bg-slate-100/90 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="text-center p-4">
              <p className="text-sm font-medium text-slate-700">
                Upgrade to unlock full Intelligence insights for your resume.
              </p>
              <a
                href="/upgrade"
                className="mt-3 inline-block rounded-full bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition"
              >
                Upgrade to Pro
              </a>
            </div>
          </div>
          <h2 className="text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase mb-4">
            Intelligence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 opacity-40">
            <div className="rounded-xl border border-slate-200 bg-slate-50 h-20" />
            <div className="rounded-xl border border-slate-200 bg-slate-50 h-20" />
            <div className="rounded-xl border border-slate-200 bg-slate-50 h-20" />
          </div>
        </div>
      </section>
    );
  }

  // Empty state – static sample preview that mirrors the live dashboard layout
  if (!hasAny) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div>
            <h2 className="text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase">
              Intelligence
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              See how your resume scores across ATS-style signals before you run an analysis.
            </p>
          </div>
          <span className="inline-flex items-center rounded-full bg-slate-900 text-white px-2 py-0.5 text-[10px] font-medium">
            Demo dashboard
          </span>
        </div>

        {/* Top: sample ATS score */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative flex items-center justify-center h-16 w-16 rounded-full bg-slate-100">
              <div className="h-14 w-14 rounded-full bg-white border border-slate-200 flex items-center justify-center">
                <span className="text-lg font-semibold text-slate-900">78%</span>
              </div>
            </div>
            <div className="text-xs text-slate-600">
              <p className="font-semibold text-slate-900">
                Resume ATS score (Estimated)
              </p>
              <p className="mt-0.5 inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border-emerald-200">
                Strong Match
              </p>
              <p className="mt-1 text-[11px] text-slate-500">
                Example of a resume with strong alignment to the job description across ATS
                signals.
              </p>
            </div>
          </div>
        </div>

        {/* Metric breakdown preview */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Keyword coverage
            </p>
            <p className="mt-1 text-xl font-semibold text-slate-900">82%</p>
            <p className="mt-1 text-xs text-slate-600">
              Most required skills from the JD are present in the resume.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Semantic similarity
            </p>
            <p className="mt-1 text-xl font-semibold text-slate-900">75%</p>
            <p className="mt-1 text-xs text-slate-600">
              The overall experience context closely matches the job description.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Experience alignment
            </p>
            <p className="mt-1 text-xl font-semibold text-slate-900">90%</p>
            <p className="mt-1 text-xs text-slate-600">
              Required: <span className="font-semibold">5 yrs</span> • Example resume:{" "}
              <span className="font-semibold">7 yrs</span>.
            </p>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Title alignment
            </p>
            <p className="mt-1 text-xl font-semibold text-slate-900">84%</p>
            <p className="mt-1 text-xs text-slate-600">
              Target: <span className="font-semibold">Senior ML Engineer</span>
            </p>
            <p className="mt-0.5 text-[11px] text-slate-500">
              Example titles: ML Engineer • Data Scientist.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Impact score
            </p>
            <p className="mt-1 text-xl font-semibold text-slate-900">68%</p>
            <p className="mt-1 text-xs text-slate-600">
              Sample resume includes several quantified achievements (e.g. “improved CTR by 22%”).
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Resume quality
            </p>
            <p className="mt-1 text-xl font-semibold text-slate-900">72%</p>
            <ul className="mt-1 text-[11px] text-slate-600 space-y-0.5">
              <li>✔ Clear bullet point structure</li>
              <li>✔ Skills and experience sections detected</li>
              <li>⚠ A few long paragraphs can be shortened</li>
            </ul>
          </div>
        </div>

        {/* Keyword coverage detail preview */}
        <div className="mt-4 rounded-xl border border-slate-200 bg-white px-3 py-3">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
            <div className="flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1">
                Matched skills
              </p>
              <p className="text-xs text-emerald-700">
                Python • machine learning • LLMs • RAG • AWS • Docker
              </p>
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1">
                Missing skills (from JD)
              </p>
              <p className="text-xs text-red-700">
                transformers • orchestration frameworks • experimentation platforms
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Your live analysis will use your own resume and the pasted job description to compute
            these metrics.
          </p>
        </div>
      </section>
    );
  }

  // Live analysis – ATS dashboard
  const atsScore = engineResult?.ats_score ?? 0;
  const band = engineResult?.ats_band ?? "low";
  const keyword = engineResult?.keyword_coverage;
  const semantic = engineResult?.semantic_similarity;
  const exp = engineResult?.experience_alignment;
  const title = engineResult?.title_alignment;
  const impact = engineResult?.impact_score;
  const quality = engineResult?.resume_quality;

  const bandLabel =
    band === "very_strong"
      ? "Very Strong Match"
      : band === "strong"
      ? "Strong Match"
      : band === "moderate"
      ? "Moderate Match"
      : "Low Match";

  const bandColor =
    band === "very_strong" || band === "strong"
      ? "text-emerald-600 bg-emerald-50 border-emerald-200"
      : band === "moderate"
      ? "text-amber-600 bg-amber-50 border-amber-200"
      : "text-red-600 bg-red-50 border-red-200";

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
      {/* Top: ATS score */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase">
            Intelligence
          </h2>
          <p className="mt-1 text-sm font-semibold text-slate-800">
            Your analysis report based on the pasted resume and job description.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center h-16 w-16 rounded-full bg-slate-100">
            <div className="h-14 w-14 rounded-full bg-white border border-slate-200 flex items-center justify-center">
              <span className="text-lg font-semibold text-slate-900">
                {atsScore}%
              </span>
            </div>
          </div>
          <div className="text-xs text-slate-600">
            <p className="font-semibold text-slate-900">Resume ATS score (Estimated)</p>
            <p
              className={
                "mt-0.5 inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold " +
                bandColor
              }
            >
              {bandLabel}
            </p>
            <p className="mt-1 text-[11px] text-slate-500">
              This estimates how likely your resume is to pass an automated ATS screen for this role.
            </p>
          </div>
        </div>
      </div>

      {/* Metric breakdown */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Keyword coverage */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Keyword coverage
          </p>
          <p className="mt-1 text-xl font-semibold text-slate-900">
            {keyword?.score ?? 0}%
          </p>
          <p className="mt-1 text-xs text-slate-600">{keyword?.explanation}</p>
        </div>

        {/* Semantic similarity */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Semantic similarity
          </p>
          <p className="mt-1 text-xl font-semibold text-slate-900">
            {semantic?.score ?? 0}%
          </p>
          <p className="mt-1 text-xs text-slate-600">
            {semantic?.explanation ||
              "Contextual overlap between your resume and the job description."}
          </p>
        </div>

        {/* Experience alignment */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Experience alignment
          </p>
          <p className="mt-1 text-xl font-semibold text-slate-900">
            {exp?.score ?? 0}%
          </p>
          <p className="mt-1 text-xs text-slate-600">
            Required:{" "}
            <span className="font-semibold">
              {exp?.required_experience ?? 0} yrs
            </span>
            {" • "}You:{" "}
            <span className="font-semibold">
              {exp?.resume_experience ?? 0} yrs
            </span>
          </p>
        </div>
      </div>

      {/* Second row of metrics */}
      <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Title alignment */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Title alignment
          </p>
          <p className="mt-1 text-xl font-semibold text-slate-900">
            {title?.score ?? 0}%
          </p>
          <p className="mt-1 text-xs text-slate-600">
            Target:{" "}
            <span className="font-semibold">{title?.target_title || "N/A"}</span>
          </p>
          {title?.resume_titles?.length ? (
            <p className="mt-0.5 text-[11px] text-slate-500">
              Your titles: {title.resume_titles.join(" • ")}
            </p>
          ) : null}
        </div>

        {/* Impact score */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Impact score
          </p>
          <p className="mt-1 text-xl font-semibold text-slate-900">
            {impact?.score ?? 0}%
          </p>
          <p className="mt-1 text-xs text-slate-600">
            We detected{" "}
            <span className="font-semibold">
              {impact?.metrics_detected ?? 0}
            </span>{" "}
            quantified achievements.
          </p>
          <p className="mt-0.5 text-[11px] text-slate-500">
            Adding more measurable results can improve ATS ranking.
          </p>
        </div>

        {/* Resume quality */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Resume quality
          </p>
          <p className="mt-1 text-xl font-semibold text-slate-900">
            {quality?.score ?? 0}%
          </p>
          <ul className="mt-1 text-[11px] text-slate-600 space-y-0.5">
            <li>
              {quality?.bullet_density && quality.bullet_density > 0.4
                ? "✔ Good bullet point usage"
                : "⚠ Consider using more bullet points"}
            </li>
            <li>
              {quality?.has_skills_section
                ? "✔ Skills section detected"
                : "⚠ Add a clear skills section"}
            </li>
            <li>
              {quality?.has_experience_section
                ? "✔ Experience section detected"
                : "⚠ Add a clear experience section"}
            </li>
          </ul>
        </div>
      </div>

      {/* Keyword coverage detail */}
      <div className="mt-4 rounded-xl border border-slate-200 bg-white px-3 py-3">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
          <div className="flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1">
              Matched skills
            </p>
            {keyword?.matched_skills?.length ? (
              <p className="text-xs text-emerald-700">
                {keyword.matched_skills.join(" • ")}
              </p>
            ) : (
              <p className="text-xs text-slate-500">
                No explicit skill matches detected yet.
              </p>
            )}
          </div>
          <div className="flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1">
              Missing skills (from JD)
            </p>
            {keyword?.missing_skills?.length ? (
              <p className="text-xs text-red-700">
                {keyword.missing_skills.join(" • ")}
              </p>
            ) : (
              <p className="text-xs text-emerald-700">
                No major missing skills detected compared to the JD.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

