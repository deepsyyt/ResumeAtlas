import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { RoleSlug } from "@/app/lib/seoPages";
import {
  CHECK_RESUME_AGAINST_JD_PATH,
  CHECK_RESUME_AGAINST_JD_ANCHOR,
} from "@/app/lib/internalLinks";
import { KEYWORD_PAGES } from "@/app/lib/seoPages";
import type { ResumeSeoTopic } from "@/app/lib/resumeTopicTypes";
import { ResumeTopicSectionForGuide } from "@/app/seo/[slug]/page";

type PageParams = { roleSlug: RoleSlug };

const MERGED_TOPICS: readonly ResumeSeoTopic[] = [
  "summary",
  "skills",
  "projects",
  "bullet-points",
];

export function generateMetadata({ params }: { params: PageParams }): Metadata {
  const config = KEYWORD_PAGES[params.roleSlug];
  if (!config) return {};
  const canonical = `/${params.roleSlug}-resume-guide`;
  return {
    title: `${config.roleName} Resume Guide (Summary, Skills, Projects, Bullet Points) | ResumeAtlas`,
    description:
      "One strong resume guide per role: Summary, Skills, Projects, and Bullet Points patterns to improve ATS compatibility and recruiter skim clarity.",
    alternates: {
      canonical,
    },
  };
}

function anchorForTopic(topic: ResumeSeoTopic): string {
  switch (topic) {
    case "summary":
      return "summary";
    case "skills":
      return "skills";
    case "projects":
      return "projects";
    case "bullet-points":
      return "bullet-points";
    default:
      return "bullet-points";
  }
}

export default function RoleResumeGuidePage({ params }: { params: PageParams }) {
  const config = KEYWORD_PAGES[params.roleSlug];
  if (!config) notFound();

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="border-b border-slate-200 bg-slate-50/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
            {config.roleName} Resume Guide
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            One consolidated guide for {config.roleName.toLowerCase()} resumes. Use these patterns
            for Summary, Skills, Projects, and Bullet Points to pass ATS screening and impress
            recruiters.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {MERGED_TOPICS.map((t) => (
              <Link
                key={t}
                href={`#${anchorForTopic(t)}`}
                className="inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition scroll-mt-24"
              >
                {anchorForTopic(t).replace("-", " ")}
              </Link>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href={CHECK_RESUME_AGAINST_JD_PATH}
              className="inline-flex rounded-xl bg-slate-900 px-6 py-3.5 text-base font-semibold text-white hover:bg-slate-800 transition"
            >
              {CHECK_RESUME_AGAINST_JD_ANCHOR}
            </Link>
            <Link
              href="#bullet-points"
              className="inline-flex rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-800 hover:bg-slate-50 transition"
            >
              View resume example
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {MERGED_TOPICS.map((topic) => (
          <ResumeTopicSectionForGuide
            key={topic}
            role={params.roleSlug}
            topic={topic}
            anchorId={anchorForTopic(topic)}
          />
        ))}

        <section className="rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-6 sm:px-6 sm:py-8">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Check your ATS score for this consolidated guide
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
            Paste your resume and the job description into ResumeAtlas to see ATS-style match
            signals and prioritized improvements for this {config.roleName.toLowerCase()} role.
          </p>
          <div className="mt-6">
            <Link
              href={CHECK_RESUME_AGAINST_JD_PATH}
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm sm:text-base font-semibold text-white hover:bg-slate-800 transition"
            >
              {CHECK_RESUME_AGAINST_JD_ANCHOR}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

