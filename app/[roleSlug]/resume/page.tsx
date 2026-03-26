import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { RoleSlug } from "@/app/lib/seoPages";

type PageParams = {
  roleSlug: RoleSlug;
};

const ROLE_NAMES: Record<RoleSlug, string> = {
  "data-analyst": "Data Analyst",
  "data-scientist": "Data Scientist",
  "software-engineer": "Software Engineer",
  "product-manager": "Product Manager",
  "business-analyst": "Business Analyst",
  "frontend-developer": "Frontend Developer",
  "backend-developer": "Backend Developer",
  "machine-learning-engineer": "Machine Learning Engineer",
  "devops-engineer": "DevOps Engineer",
  "full-stack-developer": "Full-Stack Developer",
};

export function generateMetadata({ params }: { params: PageParams }): Metadata {
  const roleName = ROLE_NAMES[params.roleSlug];
  if (!roleName) return {};

  return {
    title: `${roleName} Resume Guide (ATS-Friendly Examples, Skills & Keywords) | ResumeAtlas`,
    description: `Learn how to build an ATS-friendly ${roleName.toLowerCase()} resume with examples, skills, keywords, and optimization tips.`,
  };
}

export default function RoleResumeHubPage({ params }: { params: PageParams }) {
  const roleName = ROLE_NAMES[params.roleSlug];
  if (!roleName) notFound();

  const role = params.roleSlug;
  const roleLower = roleName.toLowerCase();

  const resumeExamplePath = `/${role}-resume-example`;
  const atsKeywordsPath = `/ats-keywords/${role}`;
  const skillsPath = `/seo/${role}-resume-skills`;
  const summaryPath = `/seo/${role}-resume-summary`;
  const projectsPath = `/seo/${role}-resume-projects`;
  const bulletsPath = `/seo/bullet-points-${role}-resume`;

  const faqItems = [
    {
      question: `How should a ${roleLower} resume be structured for ATS?`,
      answer:
        `Use a clean, single-column layout with clear headings for Summary, Skills, Experience, Projects, and Education. ` +
        `Make sure your job titles, dates, and company names are easy to parse, and keep important ${roleLower} keywords in plain text rather than graphics or sidebars.`,
    },
    {
      question: `How many pages should a ${roleLower} resume be?`,
      answer:
        "Most early- and mid-career candidates can keep their resume to one page. If you have 8–10+ years of experience, a focused two-page resume is fine as long as every line adds signal for the type of roles you are targeting.",
    },
    {
      question: `How do I tailor my ${roleLower} resume to a specific job description?`,
      answer:
        "Read the posting carefully, highlight tools, responsibilities, and outcomes that repeat, and then mirror that language in your summary, skills, and bullets where it truthfully matches your background. You want the resume to read like evidence for that exact role, not a generic profile.",
    },
    {
      question: "Do I need different resume versions for ATS and recruiters?",
      answer:
        "A single, well-structured, ATS-friendly resume usually works for both. Focus on clarity, strong verbs, and measurable results. You can keep a slightly more visual version for networking, but your online applications should favor simple, parseable formatting.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  } as const;

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="border-b border-slate-200 bg-slate-50/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18 text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
            {roleName} Resume Guide (Examples, Skills, Keywords &amp; Tips)
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            A strong {roleLower} resume balances clean structure, role-specific keywords, and
            measurable impact. This guide brings together example resumes, ATS keyword lists, skills
            and summary guidance, and project and bullet patterns so you can build a resume that
            reads well to both Applicant Tracking Systems (ATS) and hiring managers.
          </p>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Use this page as the central hub for your {roleLower} applications: start with the
            example to shape your layout, borrow ideas from the skills, summary, projects, and
            bullet libraries, and then run everything through an ATS checker before you apply.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900">
            1. Start with a complete {roleLower} resume example
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-700">
            Begin with a full, ATS-friendly resume tailored to {roleLower} roles. Use the example to
            copy the overall structure: section order, bullet style, and how responsibilities and
            impact are balanced, before swapping in your own experience.
          </p>
          <Link
            href={resumeExamplePath}
            className="mt-3 inline-flex text-sm font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-900"
          >
            View the {roleName} resume example →
          </Link>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900">
            2. Identify core ATS keywords for {roleLower} roles
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-700">
            Before you write or rewrite bullets, get familiar with the keywords that show up across
            strong job descriptions for {roleLower} positions. These cover your core tools,
            frameworks, domains, and responsibilities.
          </p>
          <p className="mt-2 text-sm sm:text-base text-slate-700">
            You&apos;ll use these keywords in your summary, skills section, and throughout your
            experience bullets so ATS can quickly match your profile to each job.
          </p>
          <Link
            href={atsKeywordsPath}
            className="mt-3 inline-flex text-sm font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-900"
          >
            Explore ATS keywords for {roleName.toLowerCase()} resumes →
          </Link>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 space-y-4">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900">
              3. Build a focused skills section
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-700">
              Your skills section should make it obvious, in a few seconds, that you work in{" "}
              {roleLower}. Group tools and concepts into clear categories and emphasize the stack
              that matches the roles you actually want next.
            </p>
            <Link
              href={skillsPath}
              className="mt-3 inline-flex text-sm font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-900"
            >
              See {roleName.toLowerCase()} resume skills examples →
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900">
              4. Write a targeted resume summary
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-700">
              A strong summary positions you for a specific type of {roleLower} opportunity, names
              your core strengths and domains, and hints at the business outcomes you deliver. It
              should make a recruiter want to read your bullets, not repeat them.
            </p>
            <Link
              href={summaryPath}
              className="mt-3 inline-flex text-sm font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-900"
            >
              Browse {roleName.toLowerCase()} resume summary examples →
            </Link>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 space-y-4">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900">
              5. Highlight the right projects
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-700">
              Projects (professional, academic, or personal) are a powerful way to prove your skills.
              Focus on work that looks like the problems you&apos;ll solve in your next{" "}
              {roleLower} role, and describe them in terms of problem, approach, and impact.
            </p>
            <Link
              href={projectsPath}
              className="mt-3 inline-flex text-sm font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-900"
            >
              View {roleName.toLowerCase()} resume project examples →
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900">
              6. Turn responsibilities into impact-focused bullet points
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-700">
              The strongest {roleLower} resumes are built from specific, quantified bullets, not
              copied job descriptions. Start each line with a verb, name the tools or methods you
              used, and end with a clear result or metric.
            </p>
            <Link
              href={bulletsPath}
              className="mt-3 inline-flex text-sm font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-900"
            >
              See {roleName.toLowerCase()} resume bullet point examples →
            </Link>
          </div>
        </section>

        <section className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1">
            <h2 className="text-sm sm:text-base font-semibold text-emerald-900">
              Check your ATS score for this resume
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-emerald-900/80">
              Paste your resume and a live job description into ResumeAtlas to see your ATS score,
              missing keywords, and how well your {roleLower} bullets, skills, and projects line up
              with the role.
            </p>
          </div>
          <div className="flex-none">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900 focus-visible:ring-offset-emerald-50 transition"
            >
              Check your ATS score →
            </Link>
          </div>
        </section>

        <section id="faq">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Frequently asked questions
          </h2>
          <div className="mt-5 space-y-4">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="group rounded-xl border border-slate-200 bg-white px-4 py-3"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-slate-900">{item.question}</h3>
                  <span className="text-slate-400 text-xs group-open:hidden">+</span>
                  <span className="text-slate-400 text-xs hidden group-open:inline">−</span>
                </summary>
                <p className="mt-2 text-sm text-slate-600">{item.answer}</p>
              </details>
            ))}
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

