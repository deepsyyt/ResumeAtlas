import Link from "next/link";
import { FaqAccordion } from "@/app/components/FaqAccordion";
import {
  ALL_SITE_FAQ,
  JD_MATCH_WORKBENCH_FAQ,
  SITE_PRIVACY_FAQ,
} from "@/app/lib/jdMatchWorkbenchFaqs";
import { buildFaqPageMetadata, FAQ_PAGE_HERO_INTRO } from "@/app/lib/faqPageSeo";
import { postingFitFaqJsonLd } from "@/app/lib/postingFitJsonLd";
import { CHECK_RESUME_AGAINST_JD_FORM_HREF } from "@/app/lib/internalLinks";

export const metadata = buildFaqPageMetadata();

export default function FAQPage() {
  const faqSchema = postingFitFaqJsonLd(ALL_SITE_FAQ);

  return (
    <main className="min-h-screen bg-white">
      <div className="border-b border-slate-200 bg-gradient-to-b from-sky-50/60 to-white">
        <div className="page-prose py-10 text-center sm:py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-800">
            AI resume optimization &amp; ATS help
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Frequently asked questions
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
            {FAQ_PAGE_HERO_INTRO}
          </p>
        </div>
      </div>

      <div className="page-prose space-y-10 py-10 sm:py-12">
        <section aria-labelledby="workbench-faq-heading">
          <h2
            id="workbench-faq-heading"
            className="text-xs font-semibold uppercase tracking-wider text-slate-500"
          >
            Resume vs job description &amp; ATS checker
          </h2>
          <div className="mt-4">
            <FaqAccordion items={JD_MATCH_WORKBENCH_FAQ} />
          </div>
        </section>

        <section aria-labelledby="privacy-faq-heading">
          <h2
            id="privacy-faq-heading"
            className="text-xs font-semibold uppercase tracking-wider text-slate-500"
          >
            Product &amp; privacy
          </h2>
          <div className="mt-4">
            <FaqAccordion items={SITE_PRIVACY_FAQ} />
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-6 text-center sm:px-8">
          <p className="text-sm font-medium text-slate-900">
            Check your resume against a job description
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Free ATS score and keyword coverage plus application verdict, skill proof map, and
            optimization for the posting you paste.
          </p>
          <Link
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="mt-4 inline-flex rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Open the free checker
          </Link>
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
