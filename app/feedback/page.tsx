import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/app/lib/companyInfo";

export const metadata: Metadata = {
  title: "Feedback | ResumeAtlas",
  description:
    "Share feedback about ResumeAtlas. Help us improve your resume scoring and optimization experience.",
};

export default function FeedbackPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white transition"
        >
          <span aria-hidden>←</span> Back
        </Link>

        <h1 className="text-3xl font-semibold tracking-tight">
          Feedback
        </h1>
        <p className="mt-2 text-slate-400">
          We&apos;d love to hear from you
        </p>

        <div className="mt-10 rounded-xl border border-slate-700/60 bg-slate-800/50 p-6">
          <p className="text-slate-300 leading-relaxed">
            Your feedback helps us improve ResumeAtlas whether it&apos;s about ATS scoring,
            the optimization experience, pricing, or anything else. Send us your thoughts,
            suggestions, or report an issue.
          </p>
          <p className="mt-6">
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=ResumeAtlas%20Feedback`}
              className="text-sky-400 hover:text-sky-300 underline underline-offset-2"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
