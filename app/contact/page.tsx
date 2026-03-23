import type { Metadata } from "next";
import Link from "next/link";
import {
  COMPANY_NAME,
  CONTACT_EMAIL,
  COMPANY_ADDRESS,
  REGISTRATION,
} from "@/app/lib/companyInfo";

export const metadata: Metadata = {
  title: "Contact Us | ResumeAtlas",
  description:
    "Get in touch with our support team. Contact ResumeAtlas for ATS resume scoring, feedback, and inquiries.",
};

function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-800/50 p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
        {title}
      </h3>
      <div className="mt-3 text-slate-200">{children}</div>
    </div>
  );
}

export default function ContactPage() {
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
          Contact Us
        </h1>
        <p className="mt-2 text-slate-400">
          Get in touch with our support team
        </p>

        <div className="mt-10 space-y-4">
          <InfoCard title="Company Name">
            <p>{COMPANY_NAME}</p>
          </InfoCard>

          <InfoCard title="Address">
            <p className="whitespace-pre-line">{COMPANY_ADDRESS.lines.join("\n")}</p>
          </InfoCard>

          <InfoCard title="Registration">
            <p>{REGISTRATION}</p>
          </InfoCard>

          <InfoCard title="Email Support">
            <p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-sky-400 hover:text-sky-300 underline underline-offset-2"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
            <p className="mt-2 text-sm text-slate-400">
              We typically respond within 24–48 hours.
            </p>
          </InfoCard>
        </div>
      </div>
    </main>
  );
}
