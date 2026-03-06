import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ATS Keywords for Data Scientist Resumes | ResumeAtlas",
  description:
    "Use the right ATS keywords for data scientist resumes: Python, machine learning, SQL, and more. Get past applicant tracking systems and land more interviews.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What keywords do ATS look for in data scientist resumes?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "ATS look for the same terms the job description uses: programming languages (Python, R, SQL), frameworks and tools (TensorFlow, PyTorch, scikit-learn), and concepts (machine learning, statistical modeling, A/B testing). Include these keywords naturally in your Skills section and in your experience bullets so the system can match you to the role.",
      },
    },
    {
      "@type": "Question",
      name: "Should I keyword-stuff my data scientist resume for ATS?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "No. Use relevant keywords naturally in context—in your summary, bullet points, and skills list. Keyword stuffing can look spammy to recruiters and some ATS may down-rank it. Focus on real skills and tools you’ve used, and mirror the job posting’s language where it honestly applies.",
      },
    },
    {
      "@type": "Question",
      name: "Where should I put data science keywords on my resume?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Put them in a clear Skills or Technical Skills section and weave them into your experience bullets. For example, 'Built ML models in Python to predict churn' hits both Python and ML. ATS and recruiters scan for these terms in both places, so use them in context rather than only in a long keyword list.",
      },
    },
  ],
};

export default function ATSKeywordsDataScientistResumesPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-slate-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18 text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
            ATS Keywords for Data Scientist Resumes
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Use the right keywords so your data scientist resume passes Applicant Tracking Systems and gets in front of hiring managers.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex rounded-xl bg-slate-900 px-6 py-3.5 text-base font-semibold text-white hover:bg-slate-800 transition"
          >
            Check My Resume for ATS
          </Link>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-14">
        {/* Intro */}
        <section>
          <p className="text-slate-700 text-sm sm:text-base">
            Data scientist roles are highly competitive, and many applications are screened by <strong>Applicant Tracking Systems (ATS)</strong> before a human sees them. To get past the filter, your resume needs to include the <strong>keywords</strong> employers and ATS expect: programming languages, tools, and concepts from the job description. This guide covers the ATS keywords that matter most for data scientist resumes and how to use them without stuffing.
          </p>
        </section>

        {/* 1. Core keywords */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            1. Core ATS Keywords for Data Scientist Roles
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            Job postings for data scientists often list the same skills and tools. Including these terms (when they match your experience) helps ATS and recruiters recognize you as a fit. Common categories:
          </p>
          <ul className="mt-4 space-y-2 text-slate-700 text-sm sm:text-base list-disc pl-5">
            <li><strong>Programming:</strong> Python, R, SQL, Java, Scala</li>
            <li><strong>Machine learning & stats:</strong> Machine learning, deep learning, statistical modeling, predictive modeling, NLP, computer vision, A/B testing, experimentation</li>
            <li><strong>Libraries & frameworks:</strong> TensorFlow, PyTorch, scikit-learn, pandas, NumPy, Spark, XGBoost</li>
            <li><strong>Data & infra:</strong> Data pipelines, ETL, data warehousing, AWS, GCP, Azure, Docker, Kubernetes</li>
            <li><strong>Methods:</strong> Regression, classification, clustering, feature engineering, model deployment</li>
          </ul>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            Pull the exact terms from the <strong>job description</strong> you’re applying to. If the ad says “PyTorch” and “NLP,” use those words in your resume where accurate—ATS often match on the employer’s wording.
          </p>
        </section>

        {/* 2. Where to put keywords */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            2. Where to Put Data Science Keywords on Your Resume
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            Use keywords in two places: a <strong>Skills</strong> (or Technical Skills) section and inside your <strong>experience bullets</strong>. A dedicated Skills section makes it easy for ATS and recruiters to see your stack at a glance. Then reinforce those terms in your bullet points with context—e.g. “Built NLP pipelines in Python to classify support tickets” instead of only listing “Python, NLP” in Skills. That way you pass keyword matching and show how you applied the skills. For more on how ATS read your resume, see <Link href="/how-ats-scans-resumes" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">how ATS scan resumes</Link>.
          </p>
        </section>

        {/* 3. Use job description language */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            3. Mirror the Job Description (Without Stuffing)
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            Copy the job posting’s phrases only where they honestly describe your work. If the role asks for “end-to-end ML pipelines” and you’ve built them, say so. If it mentions “stakeholder communication” or “cross-functional teams,” use that language in a bullet if it’s true. <strong>Keyword stuffing</strong>—repeating terms without real context—can backfire with recruiters and some ATS. Prioritize clarity and accuracy; add keywords in natural sentences and measurable outcomes.
          </p>
        </section>

        {/* 4. Example bullets */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            4. Example Bullets That Hit ATS Keywords
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            Strong data science bullets combine keywords with impact. Examples:
          </p>
          <ul className="mt-3 space-y-2 text-slate-700 text-sm sm:text-base list-disc pl-5">
            <li>Developed <strong>machine learning</strong> models in <strong>Python</strong> (scikit-learn, XGBoost) to predict customer churn, improving retention by 18%.</li>
            <li>Built <strong>NLP</strong> pipelines for sentiment analysis using <strong>TensorFlow</strong>; reduced manual review time by 40%.</li>
            <li>Designed <strong>A/B tests</strong> and <strong>statistical</strong> analyses to optimize conversion; led to 12% lift in sign-ups.</li>
            <li>Created <strong>ETL</strong> and <strong>data pipelines</strong> in <strong>Spark</strong> on <strong>AWS</strong> to support real-time <strong>ML</strong> inference.</li>
          </ul>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            Each bullet uses recruiter- and ATS-friendly terms while showing what you did and the result.
          </p>
        </section>

        {/* 5. Skills section tips */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            5. Skills Section Tips for Data Scientists
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            List skills in clear categories if the role is broad (e.g. <strong>Languages:</strong> Python, R, SQL; <strong>ML & frameworks:</strong> TensorFlow, PyTorch, scikit-learn; <strong>Tools:</strong> AWS, Git, Docker). Use the same spellings and terms as the job ad (e.g. “Machine Learning” if that’s how they write it). Avoid vague lines like “various ML techniques”—name the methods or tools. Keep the section scannable; ATS and humans both look for exact matches.
          </p>
        </section>

        {/* CTA + related */}
        <section className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            See How Your Resume Scores for Data Science Roles
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            Paste your resume and the data scientist job description into ResumeAtlas. You’ll get keyword coverage, missing skills, and ATS-style feedback so you can tighten your resume before applying.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition"
          >
            Check My Resume for ATS
          </Link>
          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Related</p>
            <ul className="mt-2 space-y-1 text-sm">
              <li>
                <Link href="/ats-resume-checker" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">
                  Free ATS Resume Checker
                </Link>
              </li>
              <li>
                <Link href="/how-ats-scans-resumes" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">
                  How ATS Systems Scan Resumes
                </Link>
              </li>
              <li>
                <Link href="/common-resume-mistakes-fail-ats" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">
                  Common Resume Mistakes That Fail ATS
                </Link>
              </li>
              <li>
                <Link href="/how-to-pass-ats" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">
                  How to Pass ATS Screening
                </Link>
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            FAQ
          </h2>
          <div className="mt-6 space-y-4">
            <details className="group rounded-xl border border-slate-200 bg-white px-4 py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-slate-900">What keywords do ATS look for in data scientist resumes?</h3>
                <span className="text-slate-400 text-xs group-open:hidden">+</span>
                <span className="text-slate-400 text-xs hidden group-open:inline">−</span>
              </summary>
              <p className="mt-2 text-sm text-slate-600">
                ATS look for the same terms the job description uses: programming languages (Python, R, SQL), frameworks and tools (TensorFlow, PyTorch, scikit-learn), and concepts (machine learning, statistical modeling, A/B testing). Include these keywords naturally in your Skills section and in your experience bullets so the system can match you to the role.
              </p>
            </details>
            <details className="group rounded-xl border border-slate-200 bg-white px-4 py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-slate-900">Should I keyword-stuff my data scientist resume for ATS?</h3>
                <span className="text-slate-400 text-xs group-open:hidden">+</span>
                <span className="text-slate-400 text-xs hidden group-open:inline">−</span>
              </summary>
              <p className="mt-2 text-sm text-slate-600">
                No. Use relevant keywords naturally in context—in your summary, bullet points, and skills list. Keyword stuffing can look spammy to recruiters and some ATS may down-rank it. Focus on real skills and tools you’ve used, and mirror the job posting’s language where it honestly applies.
              </p>
            </details>
            <details className="group rounded-xl border border-slate-200 bg-white px-4 py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-slate-900">Where should I put data science keywords on my resume?</h3>
                <span className="text-slate-400 text-xs group-open:hidden">+</span>
                <span className="text-slate-400 text-xs hidden group-open:inline">−</span>
              </summary>
              <p className="mt-2 text-sm text-slate-600">
                Put them in a clear Skills or Technical Skills section and weave them into your experience bullets. For example, &quot;Built ML models in Python to predict churn&quot; hits both Python and ML. ATS and recruiters scan for these terms in both places, so use them in context rather than only in a long keyword list.
              </p>
            </details>
          </div>
        </section>
      </div>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  );
}
