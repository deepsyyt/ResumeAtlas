import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/app/lib/companyInfo";

export const metadata: Metadata = {
  title: "Refund Policy | ResumeAtlas",
  description:
    "ResumeAtlas refund policy for credit pack purchases. Learn about eligibility and how to request a refund.",
  alternates: {
    canonical: "/refund-policy",
  },
};

export default function RefundPolicyPage() {
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
          Refund Policy
        </h1>
        <p className="mt-2 text-slate-400">Last updated: March 2026</p>

        <div className="mt-10 space-y-8 text-slate-300 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_h2]:first:mt-0 [&_p]:leading-relaxed">
          <section>
            <h2>Eligibility</h2>
            <p>
              Refunds may be available for unused credit pack purchases within a reasonable
              period. Once credits have been consumed for resume optimization, those credits
              are not refundable.
            </p>
          </section>

          <section>
            <h2>How to Request a Refund</h2>
            <p>
              To request a refund, email us at{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-sky-400 hover:text-sky-300 underline underline-offset-2"
              >
                {CONTACT_EMAIL}
              </a>{" "}
              with your account email and the transaction details. We will review your
              request and respond within a few business days.
            </p>
          </section>

          <section>
            <h2>Processing</h2>
            <p>
              Approved refunds are processed to the original payment method. Processing time
              depends on your bank or card issuer.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              For any refund-related questions, contact{" "}
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
