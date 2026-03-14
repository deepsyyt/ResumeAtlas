const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does the ATS Pass Probability mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "ATS Pass Probability is an estimated score from 0–100 that summarizes how likely your resume is to pass an automated applicant tracking system screen for the specific job description you pasted. It combines keyword coverage, semantic similarity, experience alignment, impact score, and overall resume quality into one transparent metric.",
      },
    },
    {
      "@type": "Question",
      name: "How is Keyword Coverage calculated in the dashboard?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Keyword Coverage measures how many of the required skills explicitly listed in the job description also appear in your resume. The dashboard shows which skills were matched, which ones are missing, and a coverage percentage so you can see exactly where you stand.",
      },
    },
    {
      "@type": "Question",
      name: "What is Semantic Similarity in the ResumeAtlas report?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Semantic Similarity captures how closely the overall content and themes of your resume align with the job description, beyond exact keyword matches. It looks at overlapping concepts and context so that relevant experience still counts even if the wording is slightly different.",
      },
    },
    {
      "@type": "Question",
      name: "How does ResumeAtlas measure Experience and Title Alignment?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Experience Alignment compares your total years of relevant experience against what the job description asks for. It indicates whether your seniority and past roles are a strong fit for the position.",
      },
    },
    {
      "@type": "Question",
      name: "What makes ResumeAtlas different from basic ATS checkers?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Most ATS tools only count keywords. ResumeAtlas adds a full dashboard with keyword coverage, semantic similarity, experience alignment, impact score, and resume quality. It explains why your score looks the way it does, highlights missing skills, and surfaces concrete, recruiter-style improvement ideas instead of just showing a black-box number.",
      },
    },
    {
      "@type": "Question",
      name: "Does ResumeAtlas store my resume or job description?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "For anonymous users, ResumeAtlas processes your resume and job description to generate the ATS report and then discards the raw text. If you create an account, we only store what is needed to save your optimized resumes and usage history, and we do not sell or share your resume data with third parties for advertising.",
      },
    },
  ],
};

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="mb-6 text-center">
          <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900">
            FAQ
          </h1>
        </div>

        <div className="space-y-1 text-sm text-slate-700">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mt-3 mb-1">
            Understanding your ATS score
          </p>

          <details className="group rounded-xl border border-slate-200 bg-white px-4 py-3">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
              <h2 className="text-sm font-semibold text-slate-900">
                What does the ATS Pass Probability actually represent?
              </h2>
              <span className="text-xs text-slate-400 group-open:hidden">+</span>
              <span className="text-xs text-slate-400 hidden group-open:inline">−</span>
            </summary>
            <div className="mt-2 space-y-2">
              <p>
                <strong>ATS Pass Probability</strong> is an estimated score from 0–100 that
                summarizes how likely your resume is to pass an automated applicant tracking system
                screen for the specific job description you pasted.
              </p>
              <p>
                It combines several signals from the dashboard – keyword coverage, semantic
                similarity, experience alignment, impact score, and resume quality – into
                a single number, so you can quickly see whether you are in low, moderate, strong, or
                very strong match territory.
              </p>
            </div>
          </details>

          <details className="group rounded-xl border border-slate-200 bg-white px-4 py-3">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
              <h2 className="text-sm font-semibold text-slate-900">
                How should I interpret the Keyword Coverage metric?
              </h2>
              <span className="text-xs text-slate-400 group-open:hidden">+</span>
              <span className="text-xs text-slate-400 hidden group-open:inline">−</span>
            </summary>
            <div className="mt-2 space-y-2">
              <p>
                <strong>Keyword Coverage</strong> looks at the required skills and tools explicitly
                listed in the job description and checks how many of them appear in your resume.
              </p>
              <p>
                The dashboard breaks this down into{" "}
                <strong>Matched skills</strong> and <strong>Missing skills</strong>, plus a coverage
                percentage. Use this list as a checklist for what to add or strengthen in your
                bullets (as long as it is actually true for your experience).
              </p>
            </div>
          </details>

          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mt-4 mb-1">
            Metric breakdown
          </p>

          <details className="group rounded-xl border border-slate-200 bg-white px-4 py-3">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
              <h2 className="text-sm font-semibold text-slate-900">
                What is Semantic Similarity and why does it matter?
              </h2>
              <span className="text-xs text-slate-400 group-open:hidden">+</span>
              <span className="text-xs text-slate-400 hidden group-open:inline">−</span>
            </summary>
            <div className="mt-2 space-y-2">
              <p>
                <strong>Semantic Similarity</strong> measures how closely the overall content and
                themes of your resume align with the job description, beyond exact keyword matches.
              </p>
              <p>
                It helps capture relevant experience written in slightly different words and ensures
                your score reflects the story of your career, not just keyword stuffing.
              </p>
            </div>
          </details>

          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mt-4 mb-1">
            Compatibility & coverage
          </p>

          <details className="group rounded-xl border border-slate-200 bg-white px-4 py-3">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
              <h2 className="text-sm font-semibold text-slate-900">
                How do Experience Alignment and Title Alignment affect my score?
              </h2>
              <span className="text-xs text-slate-400 group-open:hidden">+</span>
              <span className="text-xs text-slate-400 hidden group-open:inline">−</span>
            </summary>
            <div className="mt-2 space-y-2">
              <p>
                <strong>Experience Alignment</strong> compares your total years of relevant
                experience to what the job description asks for.
              </p>
              <p>
                It helps answer: “Am I senior enough for this role based on what the posting is
                asking for?” If this score is low, you may still apply, but you should be realistic
                about competition and highlight stretch qualifications clearly.
              </p>
            </div>
          </details>

          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mt-4 mb-1">
            Product & privacy
          </p>

          <details className="group rounded-xl border border-slate-200 bg-white px-4 py-3">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
              <h2 className="text-sm font-semibold text-slate-900">
                How is ResumeAtlas different from other ATS resume checkers?
              </h2>
              <span className="text-xs text-slate-400 group-open:hidden">+</span>
              <span className="text-xs text-slate-400 hidden group-open:inline">−</span>
            </summary>
            <div className="mt-2 space-y-2">
              <p>
                Many tools show a single ATS score without explaining how they got there.{" "}
                <strong>ResumeAtlas</strong> breaks the score into transparent metrics and
                shows exactly which skills are matched or missing and where your bullets lack
                measurable impact.
              </p>
              <p>
                The goal is not just to grade your resume, but to give you a recruiter-style
                roadmap for how to rewrite it so you are more competitive for the specific role.
              </p>
            </div>
          </details>

          <details className="group rounded-xl border border-slate-200 bg-white px-4 py-3">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
              <h2 className="text-sm font-semibold text-slate-900">
                Do you store my resume or share it with anyone?
              </h2>
              <span className="text-xs text-slate-400 group-open:hidden">+</span>
              <span className="text-xs text-slate-400 hidden group-open:inline">−</span>
            </summary>
            <div className="mt-2 space-y-2">
              <p>
                For anonymous sessions, your resume text is used to compute the analysis in real
                time and then discarded. If you log in, we may store optimized versions and usage
                data so you can download and revisit them later.
              </p>
              <p>
                We do <strong>not</strong> sell your resume data to advertisers or data brokers,
                and we only use it to provide and improve the ResumeAtlas product experience.
              </p>
            </div>
          </details>
        </div>
      </div>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  );
}

