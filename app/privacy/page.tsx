import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/app/lib/companyInfo";

export const metadata: Metadata = {
  title: "Privacy Policy | ResumeAtlas",
  description:
    "ResumeAtlas privacy policy. Learn how we collect, use, and protect your personal information.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="mt-2 text-slate-400">Last updated: March 2026</p>

        <div className="mt-10 space-y-8 text-slate-300 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_h2]:first:mt-0 [&_p]:leading-relaxed">
          <section>
            <h2>Information We Collect</h2>
            <p>
              When you use ResumeAtlas, we collect information you provide directly, such as
              your resume content, job descriptions, and account details when you sign in with
              Google. We use this to provide ATS scoring, optimization, and related services.
            </p>
          </section>

          <section>
            <h2>How We Use Your Information</h2>
            <p>
              We use your data to analyze resumes against job descriptions, provide
              improvement suggestions, process payments, and communicate with you. We do not
              sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2>Data Security</h2>
            <p>
              We store data securely and use industry-standard practices. Resume and job
              description content is processed to deliver our services and is retained only
              as necessary for your account and support.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              For privacy-related questions, contact us at{" "}
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
