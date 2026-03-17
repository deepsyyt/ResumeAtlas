export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-8">
        <header className="text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
            How to use ResumeAtlas
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-2xl mx-auto">
            A simple, step-by-step guide to turning any job description into a tailored, ATS-ready
            resume.
          </p>
        </header>

        <section className="rounded-2xl bg-white shadow-sm border border-slate-200 px-4 sm:px-6 py-6 space-y-6">
          <div className="space-y-3 text-sm text-slate-700">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Step 1: Paste your resume and job description
            </h2>
            <p>
              Start by pasting your current resume on the left and the exact job description you’re
              targeting on the right. You don’t need to log in or upload a file – everything runs
              directly in the browser.
            </p>
            <p>
              For best results, use the most up-to-date version of your resume and the full text of
              the job posting, including responsibilities and requirements.
            </p>
          </div>

          <div className="border-t border-slate-200" />

          <div className="space-y-3 text-sm text-slate-700">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Step 2: See your score & fix your resume
            </h2>
            <p>
              Click <strong>“Get my ATS score free”</strong>. In a few seconds, the right-hand
              dashboard will fill with your ATS score and fix suggestions: keyword
              coverage, semantic similarity, experience alignment, impact score, and resume
              quality.
            </p>
            <p>
              Think of this view as a recruiter-style snapshot of how well your resume fits this
              specific role today.
            </p>
          </div>

          <div className="border-t border-slate-200" />

          <div className="space-y-3 text-sm text-slate-700">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Step 3: Use the dashboard as a checklist
            </h2>
            <p>
              Scroll through the dashboard to see{" "}
              <strong>which skills are matched or missing</strong>, how your experience and titles
              compare to the role, and whether your bullets include enough measurable impact.
            </p>
            <p>
              Use the <strong>Missing skills</strong> line and the impact score as a practical to‑do
              list for rewrites: add honest, specific bullets that cover those skills and quantify
              your results where possible.
            </p>
            <p>
              If you want examples to copy the structure from, start with{" "}
              <a
                href="/seo/bullet-points-data-scientist-resume"
                className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
              >
                Data Scientist resume bullet points
              </a>{" "}
              or{" "}
              <a
                href="/seo/software-engineer-resume-skills"
                className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
              >
                Software Engineer resume skills
              </a>
              , then adapt the patterns to your own experience and role.
            </p>
          </div>

          <div className="border-t border-slate-200" />

          <div className="space-y-3 text-sm text-slate-700">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Step 4: Iterate and re-run
            </h2>
            <p>
              After updating your resume text, run the analysis again. You’ll see your{" "}
              <strong>ATS Pass Probability</strong> and metric cards update in real time, so you can
              quickly see whether your changes are helping.
            </p>
            <p>
              Most users iterate 2–3 times per role until keyword coverage, semantic similarity, and
              impact score all move into the “strong match” range.
            </p>
          </div>

          <div className="border-t border-slate-200" />

          <div className="space-y-3 text-sm text-slate-700">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Step 5: Save and download (optional)
            </h2>
            <p>
              When you’re happy with the results, you can log in to save your optimized resume and
              download a polished PDF. This keeps your best versions in one place and makes it easy
              to tailor quickly for future roles.
            </p>
            <p className="text-xs text-slate-500">
              You can run as many free analyses as you like before deciding whether you want to log
              in or download.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

