import type { Metadata } from "next";
import Link from "next/link";
import { LastUpdated } from "@/app/components/LastUpdated";
import {
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  SENIOR_PRODUCT_MANAGER_RESUME_PATH,
  PRODUCT_MANAGER_RESUME_SUMMARY_PATH,
  ATS_RESUME_CHECKLIST_PATH,
  RESUME_SUMMARY_GUIDE_PATH,
} from "@/app/lib/internalLinks";
import { roleResumeKeywordsPath, roleResumePillarPath } from "@/app/lib/searchIntentSeo";
import { CONTENT_FRESHNESS_YEAR, CONTENT_LAST_UPDATED_LABEL } from "@/app/lib/contentFreshness";
import { getSiteUrl } from "@/app/lib/siteUrl";

const siteBase = getSiteUrl().replace(/\/$/, "");
const pageUrl = `${siteBase}${SENIOR_PRODUCT_MANAGER_RESUME_PATH}`;

export const metadata: Metadata = {
  title: `Senior Product Manager Resume (${CONTENT_FRESHNESS_YEAR}): ATS Guide, Keywords & Examples | ResumeAtlas`,
  description:
    `Senior product manager resume guide for ${CONTENT_FRESHNESS_YEAR}: roadmap ownership, business impact, cross-functional leadership, and OKR-driven bullets. Keywords and a free JD keyword scan.`,
  alternates: { canonical: SENIOR_PRODUCT_MANAGER_RESUME_PATH },
  openGraph: {
    title: `Senior Product Manager Resume (${CONTENT_FRESHNESS_YEAR}): ATS Guide, Keywords & Examples`,
    description:
      "Senior product manager resume: roadmap ownership, business impact, cross-functional leadership, and OKR-driven bullets. Keywords and a free JD scan.",
    url: pageUrl,
    type: "article",
    siteName: "ResumeAtlas",
  },
};

const faqItems = [
  {
    question: "Do I need to sign up to check my senior product manager resume?",
    answer:
      "No signup needed. Paste your resume and the JD into ResumeAtlas — full keyword match score, rejection risks, and selectable fixes in about 60 seconds. First scan is free.",
  },
  {
    question: "What makes a senior product manager resume different from a mid-level one?",
    answer:
      "Business ownership, cross-functional scope, and strategic influence. Senior PM resumes show: product areas owned end-to-end, revenue or business metrics attached to shipped work, influence over engineering and design prioritization, and OKR-level decision-making. A mid-level PM bullet says 'launched feature X'; a senior PM bullet says 'owned the self-serve onboarding product, shipping 4 major milestones that grew trial-to-paid conversion 28% — $3.2M incremental ARR in H2'.",
  },
  {
    question: "What keywords do senior product manager job descriptions require?",
    answer:
      "Product strategy, roadmap ownership, OKR / KPI setting, cross-functional leadership, stakeholder management, go-to-market, product discovery, user research, A/B testing, business case, P&L ownership, and domain-specific terms (B2B, SaaS, platform, growth, enterprise). Mirror the exact language the posting uses.",
  },
  {
    question: "Should a senior PM resume be one page or two?",
    answer:
      "Two pages are appropriate for 5+ years of PM experience. Use the space for 2–3 major product areas with business outcomes — not for listing every feature shipped.",
  },
  {
    question: "How do I quantify product manager impact on a resume?",
    answer:
      "Attach business metrics to shipped work: revenue ($ARR, $GMV, $LTV), conversion (trial-to-paid %, activation rate, funnel completion), retention (churn reduction, DAU/MAU improvement), and efficiency (cost reduction, cycle time, team velocity). The metric proves business ownership, not just feature delivery.",
  },
  {
    question: "How do I show cross-functional leadership on a PM resume without a management title?",
    answer:
      "Show influence through scope: 'led a 12-person cross-functional team (engineering, design, data) to ship the pricing redesign', 'aligned 4 stakeholders on a go-to-market strategy for enterprise expansion', 'defined the product vision for a platform used by 200 enterprise customers'. Ownership and alignment are the leadership signals.",
  },
  {
    question: "What should a senior PM resume summary say?",
    answer:
      "Your product area + the business metric you moved + the type of company you work best in. Example: 'Senior PM with 7 years owning B2B SaaS growth products: 3 products launched from 0-to-1, $8M ARR generated. Comfortable with discovery, roadmap, engineering partnership, and go-to-market. Looking for a senior PM role at a Series B–D company with a strong data culture.'",
  },
  {
    question: "How do I write A/B test experience on a senior PM resume?",
    answer:
      "Name the hypothesis, the test design (who it touched, how long), and the business decision it informed. 'Designed and ran a 3-week A/B test of two onboarding flows across 8,000 users; the winning variant increased activation 19%, informing a full rollout that moved Q3 activation from 52% to 61%.' The decision + metric pair is the senior-level evidence.",
  },
  {
    question: "How do I handle a product failure or pivot on a senior PM resume?",
    answer:
      "Name what you learned and the decision you made, not the failure itself. 'Led a 6-month discovery effort for a self-serve API product; user research revealed the target segment needed a managed service instead — pivoted roadmap to managed tier, shipped in 4 months, acquired 12 enterprise customers in beta.' Showing the judgment call demonstrates senior PM thinking.",
  },
] as const;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: `Senior Product Manager Resume (${CONTENT_FRESHNESS_YEAR}): ATS Guide, Keywords & Examples`,
  url: pageUrl,
  datePublished: "2026-06-27",
  dateModified: "2026-06-27",
  author: { "@type": "Organization", name: "ResumeAtlas" },
  publisher: { "@type": "Organization", name: "ResumeAtlas", url: siteBase },
};

const BULLET_REWRITES = [
  {
    weak: "Led the development of a new feature for enterprise customers.",
    strong: "Owned the enterprise SSO integration from discovery to GA: defined requirements with 6 enterprise prospects, partnered with 2 engineers and 1 designer, shipped in 10 weeks — converted 3 blocked enterprise deals worth $720K ARR in Q1.",
  },
  {
    weak: "Worked with the data team to analyze user behavior.",
    strong: "Partnered with data science to build a retention risk model using 90 days of behavioral signals; identified a 3-step activation sequence predictive of 6-month retention. Shipped a targeted nudge flow that moved 30-day retention from 38% to 51% in cohort test.",
  },
  {
    weak: "Ran user research to understand product needs.",
    strong: "Ran 24 discovery interviews with B2B buyers across 4 segments over 6 weeks; synthesized findings into a Jobs-to-Be-Done framework that redirected roadmap priorities — removing 2 low-impact features and accelerating a self-serve billing feature that reduced CS ticket volume 22%.",
  },
] as const;

const SENIOR_KEYWORDS = [
  "Senior product manager", "Product strategy", "Roadmap ownership", "OKR / KPI", "Cross-functional leadership",
  "Stakeholder management", "Go-to-market", "Product discovery", "User research", "A/B testing",
  "Business case", "P&L ownership", "SaaS", "B2B", "Platform product", "Growth", "Activation",
  "Retention", "Revenue ($ARR, $GMV)", "Enterprise sales partnership",
];

const SUMMARY_EXAMPLES = [
  {
    label: "Senior PM — B2B SaaS growth",
    text: `Senior product manager with 7 years owning B2B SaaS growth and onboarding products. Shipped 4 major products generating $6.4M incremental ARR; moved trial-to-paid conversion from 22% to 34% over 18 months through discovery, A/B testing, and cross-functional alignment. Comfortable owning both 0-to-1 and scale phases. Looking for a senior PM role at a product-led growth company.`,
  },
  {
    label: "Senior PM — platform and enterprise",
    text: `Senior product manager with 6 years of platform product experience at enterprise SaaS companies. Owned a developer API platform used by 400 enterprise customers; led 5-person cross-functional team through a v2 launch that reduced integration time 60% and increased API adoption 45% in Q2. Experienced in enterprise discovery, go-to-market, and engineering partnership. Seeking a senior or lead PM role at a platform or infrastructure product company.`,
  },
] as const;

export default function SeniorProductManagerResumePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <nav className="mb-6 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <span className="mx-2">/</span>
          <Link href={roleResumePillarPath("product-manager")} className="hover:text-gray-700">Product Manager Resume</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Senior Product Manager Resume</span>
        </nav>

        <header className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-wide text-blue-600">Senior Role Resume Guide</p>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            Senior Product Manager Resume ({CONTENT_FRESHNESS_YEAR}): ATS Guide, Keywords & Examples
          </h1>
          <p className="mb-3 text-lg text-gray-600">
            How to write a senior PM resume that shows roadmap ownership, cross-functional leadership, and business outcomes — not just a list of shipped features.
          </p>
          <p className="mb-6 text-sm text-gray-500">No signup needed for the first scan &middot; Results in about 60 seconds</p>
          <Link href={CHECK_RESUME_AGAINST_JD_FORM_HREF} className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700">
            Check my senior PM resume — free
          </Link>
          <p className="mt-2 text-xs text-gray-400">Guest scan free &middot; sign in for +1 scan + free job-specific optimize &middot; pay to download an ATS-friendly resume in seconds</p>
          <LastUpdated label={CONTENT_LAST_UPDATED_LABEL} className="mt-4" />
        </header>

        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold text-gray-900">What ATS looks for on a senior PM resume</h2>
          <p className="mb-3 text-gray-700">
            Senior PM job descriptions screen for two things simultaneously: domain-specific vocabulary (product strategy, OKR, A/B testing, discovery, go-to-market) and business impact signals ($ARR, conversion, retention, revenue). ATS passes resumes with keyword coverage. Hiring managers filter on whether the bullets show business ownership or just feature delivery. Most experienced PM resumes fail the second test — they list what shipped without attaching the business outcome.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Senior PM Resume Summary Examples</h2>
          <div className="space-y-5">
            {SUMMARY_EXAMPLES.map((ex) => (
              <div key={ex.label} className="rounded-xl border border-gray-200 p-5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">{ex.label}</p>
                <blockquote className="text-sm leading-relaxed text-gray-700 italic">&ldquo;{ex.text}&rdquo;</blockquote>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm text-gray-500">
            More examples: <Link href={PRODUCT_MANAGER_RESUME_SUMMARY_PATH} className="text-blue-600 hover:underline">product manager resume summary — 20+ examples by level</Link>
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Senior PM Resume Bullet Rewrites</h2>
          <div className="space-y-5">
            {BULLET_REWRITES.map((b, i) => (
              <div key={i} className="rounded-xl border border-gray-200 p-5">
                <div className="mb-2 rounded-lg bg-red-50 p-3">
                  <p className="mb-0.5 text-xs font-semibold uppercase text-red-600">Before</p>
                  <p className="text-sm text-gray-700 italic">&ldquo;{b.weak}&rdquo;</p>
                </div>
                <div className="rounded-lg bg-green-50 p-3">
                  <p className="mb-0.5 text-xs font-semibold uppercase text-green-600">After</p>
                  <p className="text-sm text-gray-700 italic">&ldquo;{b.strong}&rdquo;</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Senior PM Keywords for ATS</h2>
          <div className="flex flex-wrap gap-2">
            {SENIOR_KEYWORDS.map((kw) => (
              <span key={kw} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-800">{kw}</span>
            ))}
          </div>
          <p className="mt-3 text-sm text-gray-500">
            Full keyword list: <Link href={roleResumeKeywordsPath("product-manager")} className="text-blue-600 hover:underline">product manager resume keywords — ATS guide</Link>
          </p>
        </section>

        <div className="mb-10 rounded-xl border border-blue-100 bg-blue-50 p-6">
          <p className="mb-1 text-base font-semibold text-blue-900">Generic senior PM keywords don&apos;t match specific postings.</p>
          <p className="mb-4 text-sm text-blue-700">
            One posting says &ldquo;platform product&rdquo;; another says &ldquo;growth PM.&rdquo; Paste your resume and the specific JD to see which required terms are missing before you apply.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Link href={CHECK_RESUME_AGAINST_JD_FORM_HREF} className="inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
              Check keyword match — free
            </Link>
            <span className="text-xs text-blue-600">No signup needed for first scan</span>
          </div>
        </div>

        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Related Resources</h2>
          <ul className="space-y-2 text-sm">
            <li><Link href={roleResumePillarPath("product-manager")} className="text-blue-600 hover:underline">Product manager resume guide — full ATS guide and examples</Link></li>
            <li><Link href={roleResumeKeywordsPath("product-manager")} className="text-blue-600 hover:underline">Product manager resume keywords — ATS guide</Link></li>
            <li><Link href={PRODUCT_MANAGER_RESUME_SUMMARY_PATH} className="text-blue-600 hover:underline">Product manager resume summary — 20+ examples by level</Link></li>
            <li><Link href={RESUME_SUMMARY_GUIDE_PATH} className="text-blue-600 hover:underline">Resume summary guide — how to write a summary that passes ATS</Link></li>
            <li><Link href={ATS_RESUME_CHECKLIST_PATH} className="text-blue-600 hover:underline">ATS resume checklist — 30-point pre-submission guide</Link></li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">Senior Product Manager Resume — FAQ</h2>
          <div className="space-y-6">
            {faqItems.map((item, i) => (
              <div key={i}>
                <h3 className="mb-1 font-semibold text-gray-900">{item.question}</h3>
                <p className="text-sm text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-gray-900 px-6 py-10 text-center text-white">
          <h2 className="mb-3 text-2xl font-bold">Strong product sense doesn&apos;t show if the resume doesn&apos;t prove it.</h2>
          <p className="mx-auto mb-6 max-w-xl text-gray-300">
            Senior PM roles screen for business ownership, not feature lists. Paste your resume and the job description into ResumeAtlas. Full keyword match score and selectable fixes in about 60 seconds.
          </p>
          <Link href={CHECK_RESUME_AGAINST_JD_FORM_HREF} className="inline-block rounded-lg bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow transition hover:bg-gray-100">
            Check my senior PM resume — no signup
          </Link>
          <p className="mt-3 text-xs text-gray-400">Guest scan free &middot; sign in for +1 scan + free job-specific optimize &middot; pay to download an ATS-friendly resume in seconds</p>
        </section>
      </main>
    </>
  );
}
