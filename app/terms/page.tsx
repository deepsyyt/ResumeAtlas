import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/app/lib/companyInfo";

export const metadata: Metadata = {
  title: "Terms of Service | ResumeAtlas",
  description:
    "ResumeAtlas terms of service. Usage terms, account obligations, and service limitations.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white transition"
        >
          <span aria-hidden>←</span> Back
        </Link>

        <h1 className="text-3xl font-semibold tracking-tight">
          Terms of Service
        </h1>
        <p className="mt-2 text-slate-400">Last updated: March 2026</p>

        <div className="mt-10 space-y-8 text-slate-300 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_h2]:first:mt-0 [&_p]:leading-relaxed">
          <section>
            <h2>Acceptance of Terms</h2>
            <p>
              By using ResumeAtlas, you agree to these terms. If you do not agree, please
              do not use the service.
            </p>
          </section>

          <section>
            <h2>Service Description</h2>
            <p>
              ResumeAtlas provides ATS (Applicant Tracking System) resume scoring, optimization
              suggestions, and related tools. We strive to deliver accurate results but do not
              guarantee specific outcomes in job applications.
            </p>
          </section>

          <section>
            <h2>Account and Usage</h2>
            <p>
              You are responsible for your account and the content you submit. You must not
              use the service for unlawful purposes or in ways that harm the platform or
              other users.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              For questions about these terms, contact us at{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-sky-400 hover:text-sky-300 underline underline-offset-2"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
