import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getResumeBulletHub,
  getHubPreviewPlainText,
  flattenHubPreviewBullets,
  isResumeBulletRole,
  publicPathForBulletDetail,
  publicPathForBulletHub,
  levelLabel,
  RESUME_BULLET_LEVELS,
  type ResumeBulletRole,
} from "@/app/lib/resumeBulletPointContent";
import { CHECK_RESUME_AGAINST_JD_FORM_HREF } from "@/app/lib/internalLinks";
import { getSiteUrl } from "@/app/lib/siteUrl";
import { ResumeBulletPreviewCopyButton } from "@/app/components/ResumeBulletPreviewCopyButton";
import { ResumeExampleSeoFunnel } from "@/app/components/ResumeExampleSeoFunnel";

type PageParams = { roleSlug: string };

function levelAnchorId(level: string): string {
  return `level-${level}`;
}

export function generateStaticParams(): { roleSlug: ResumeBulletRole }[] {
  return [
    { roleSlug: "data-scientist" },
    { roleSlug: "software-engineer" },
    { roleSlug: "product-manager" },
  ];
}

export function generateMetadata({ params }: { params: PageParams }): Metadata {
  if (!isResumeBulletRole(params.roleSlug)) return {};
  const hub = getResumeBulletHub(params.roleSlug);
  const canonicalPath = `/${params.roleSlug}-resume-bullet-points`;
  const canonical = `${getSiteUrl().replace(/\/$/, "")}${canonicalPath}`;
  return {
    title: hub.metaTitle,
    description: hub.metaDescription,
    keywords: hub.keywords,
    robots: { index: true, follow: true },
    alternates: { canonical },
    openGraph: {
      title: hub.metaTitle,
      description: hub.metaDescription,
      url: canonical,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: hub.metaTitle,
      description: hub.metaDescription,
    },
  };
}

export default function ResumeBulletHubPage({ params }: { params: PageParams }) {
  if (!isResumeBulletRole(params.roleSlug)) notFound();
  const role = params.roleSlug;
  const hub = getResumeBulletHub(role);
  const canonicalPath = publicPathForBulletHub(role);
  const previewPlain = getHubPreviewPlainText(hub);
  const previewFlat = flattenHubPreviewBullets(hub);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: hub.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${getSiteUrl().replace(/\/$/, "")}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: `${hub.roleName} resume bullets`,
        item: `${getSiteUrl().replace(/\/$/, "")}${canonicalPath}`,
      },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: hub.metaTitle,
    description: hub.metaDescription,
    url: `${getSiteUrl().replace(/\/$/, "")}${canonicalPath}`,
    isPartOf: { "@type": "WebSite", name: "ResumeAtlas" },
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: hub.previewSection.h2,
    description: `Sample ${hub.roleName.toLowerCase()} resume bullet point examples (preview).`,
    numberOfItems: previewFlat.length,
    itemListElement: previewFlat.map((text, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: text,
    })),
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-slate-50 via-white to-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-sky-50/80 to-transparent" />
        <div className="relative mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-sky-700">
            {hub.roleName} · Resume bullets hub
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl sm:leading-tight">
            {hub.h1}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-700 sm:text-lg">
            {hub.heroSubheadline}
          </p>
          <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-slate-600 sm:text-sm">
            <span className="inline-flex items-center gap-1">
              <span className="text-emerald-600" aria-hidden>
                ✓
              </span>{" "}
              Free tools
            </span>
            <span className="text-slate-300" aria-hidden>
              ·
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="text-emerald-600" aria-hidden>
                ✓
              </span>{" "}
              Job-description match
            </span>
            <span className="text-slate-300" aria-hidden>
              ·
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="text-emerald-600" aria-hidden>
                ✓
              </span>{" "}
              Keyword gaps
            </span>
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              Generate bullets for my resume
            </Link>
            <Link
              href="/resume-keyword-scanner#ats-checker-form"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
            >
              Find missing keywords in your resume
            </Link>
          </div>
          <p className="mt-3 max-w-xl text-xs text-slate-500">
            Paste resume + job description to see overlap and gaps—before you rewrite bullets blind.
          </p>

          <ul className="mt-6 space-y-2.5 rounded-xl border border-slate-200 bg-white/80 px-4 py-4 text-sm leading-snug text-slate-800 shadow-sm sm:text-[15px]">
            {hub.aboveFoldBullets.map((line) => (
              <li key={line} className="flex gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                <span>{line}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
            <p className="font-medium text-slate-800">{hub.introIntentStack}</p>
            <section
              id="what-are-good"
              className="scroll-mt-24 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-4 sm:px-5"
              aria-labelledby="snippet-definition-heading"
            >
              <h2
                id="snippet-definition-heading"
                className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl"
              >
                {hub.snippetDefinition.h2}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
                {hub.snippetDefinition.line1}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
                {hub.snippetDefinition.line2}
              </p>
            </section>
            <p>{hub.paragraphs[0]}</p>
            <p>{hub.paragraphs[1]}</p>
            <p className="text-slate-600">{hub.semanticVariation}</p>
            <p className="text-slate-700">{hub.roleKeywordDensity}</p>
          </div>

          <p className="mt-5 text-xs font-medium uppercase tracking-wide text-slate-500">{hub.authorityLine}</p>

          <p className="mt-6 text-sm leading-relaxed text-slate-700">
            Compared to the posting, many resumes lose keyword overlap first—so run a scan to{" "}
            <Link
              href="/resume-keyword-scanner#ats-checker-form"
              className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
            >
              find missing keywords in your {hub.roleName.toLowerCase()} resume
            </Link>
            . You can also{" "}
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
            >
              compare your resume with this job description
            </Link>{" "}
            to see exact gaps—not guesswork. If screening feels random,{" "}
            <Link
              href="/how-to-pass-ats"
              className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
            >
              check why your resume gets rejected by ATS
            </Link>{" "}
            before you rewrite more bullets.
          </p>

          <nav
            className="mt-8 flex flex-wrap gap-x-4 gap-y-2 border-t border-slate-200 pt-6 text-sm"
            aria-label="Jump to level sections"
          >
            <span className="font-medium text-slate-500">Jump to:</span>
            <a
              href="#what-are-good"
              className="font-semibold text-slate-600 underline underline-offset-2 hover:text-slate-900"
            >
              Definition
            </a>
            {RESUME_BULLET_LEVELS.map((level) => (
              <a
                key={level}
                href={`#${levelAnchorId(level)}`}
                className="font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-900"
              >
                {levelLabel(level)}
              </a>
            ))}
            <a
              href="#preview"
              className="font-semibold text-slate-600 underline underline-offset-2 hover:text-slate-900"
            >
              Preview bullets
            </a>
          </nav>
        </div>
      </section>

      <div className="mx-auto max-w-3xl space-y-12 px-4 py-12 sm:px-6 lg:px-8">
        <ResumeExampleSeoFunnel />
        <section id="preview" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            {hub.previewSection.h2}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">{hub.previewSectionIntro}</p>
          <p className="mt-2 text-xs text-slate-500">
            Crawlable HTML (collapsed by default)—full per-level banks live on entry-level, junior, and senior pages.
          </p>
          <details className="mt-4 group rounded-2xl border border-slate-200 bg-white shadow-sm open:shadow-md">
            <summary className="cursor-pointer list-none rounded-2xl px-4 py-4 text-sm font-semibold text-slate-900 sm:px-5 sm:py-4 [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between gap-3">
                <span>
                  Show {previewFlat.length} example resume bullet points (copy & paste)
                </span>
                <span className="text-slate-400 group-open:rotate-180 transition">▼</span>
              </span>
            </summary>
            <div className="border-t border-slate-100 px-4 pb-5 pt-2 sm:px-5">
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-3">
                <p className="text-xs text-slate-500">Copy all preview text for your notes or editor.</p>
                <ResumeBulletPreviewCopyButton
                  text={previewPlain}
                  tailoredCtaHref={CHECK_RESUME_AGAINST_JD_FORM_HREF}
                  tailoredCtaLabel="Generate from my resume"
                />
              </div>
              <div className="mt-4 space-y-6">
                {hub.previewSection.groups.map((g) => (
                  <div key={g.label}>
                    <h3 className="text-sm font-semibold text-slate-800">{g.label}</h3>
                    <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-700 sm:text-base">
                      {g.bullets.map((line, i) => (
                        <li key={`${g.label}-${i}`}>{line}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </details>
        </section>

        <section
          className="rounded-2xl border border-rose-100 bg-rose-50/40 p-5 sm:p-6"
          aria-labelledby="comparison-wedge"
        >
          <h2 id="comparison-wedge" className="text-lg font-semibold text-rose-950">
            {hub.comparisonSection.title}
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-rose-950/90">
            {hub.comparisonSection.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <div className="mt-5">
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Fix my resume bullet points for this job
            </Link>
          </div>
        </section>

        <section id="pick-level" className="scroll-mt-24">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                Full examples by level (40+ lines each path)
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Each page expands into project-wise blocks—deeper than this hub preview.
              </p>
            </div>
          </div>

          <ul className="mt-8 space-y-4">
            {RESUME_BULLET_LEVELS.map((level) => {
              const href = publicPathForBulletDetail(role, level);
              const card = hub.levelCards[level];
              return (
                <li key={level} id={levelAnchorId(level)} className="scroll-mt-24">
                  <Link
                    href={href}
                    className="group block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-sky-300 hover:shadow-md sm:p-6"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0 flex-1">
                        <span className="inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-800">
                          {levelLabel(level)}
                        </span>
                        <p className="mt-3 text-base font-semibold text-slate-900 group-hover:text-sky-900">
                          {card.hook}
                        </p>
                        <ul className="mt-3 space-y-2 text-sm text-slate-600">
                          {card.whatsInside.map((line) => (
                            <li key={line} className="flex gap-2">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
                              <span>{line}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <span className="shrink-0 text-sm font-semibold text-sky-700 group-hover:text-sky-900">
                        Open examples →
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section
          className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50/90 to-white p-5 sm:p-6"
          aria-labelledby="hub-ats-hook"
        >
          <h2 id="hub-ats-hook" className="text-lg font-semibold text-amber-950">
            Bullets are only half the battle
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-amber-950/90">
            Even strong lines fail if the posting’s keywords and themes are missing. Compare your resume to{" "}
            <strong>this</strong> job description—not a generic checklist—then fix gaps before you hit submit.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Compare your resume with this job description
            </Link>
            <Link
              href="/resume-keyword-scanner#ats-checker-form"
              className="inline-flex items-center justify-center rounded-xl border border-amber-300/80 bg-white px-4 py-2.5 text-sm font-semibold text-amber-950 transition hover:bg-amber-50"
            >
              Find missing keywords in your {hub.roleName.toLowerCase()} resume
            </Link>
            <Link
              href="/how-to-pass-ats"
              className="inline-flex items-center justify-center rounded-xl border border-amber-300/80 bg-white px-4 py-2.5 text-sm font-semibold text-amber-950 transition hover:bg-amber-50"
            >
              Check why your resume gets rejected by ATS
            </Link>
            <Link
              href="/customize-resume-without-lying"
              className="inline-flex items-center justify-center rounded-xl border border-amber-300/80 bg-white px-4 py-2.5 text-sm font-semibold text-amber-950 transition hover:bg-amber-50"
            >
              Tailor without lying
            </Link>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 sm:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Climb the topic graph
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Contextual internal links: related topics on ResumeAtlas before you apply.
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            <li>
              <Link
                href={`/${role}-resume-keywords`}
                className="block rounded-xl border border-white bg-white p-4 text-sm font-medium text-sky-800 shadow-sm transition hover:border-sky-200"
              >
                ATS keywords for {hub.roleName.toLowerCase()} resumes →
              </Link>
            </li>
            <li>
              <Link
                href={`/${role}-resume-guide`}
                className="block rounded-xl border border-white bg-white p-4 text-sm font-medium text-sky-800 shadow-sm transition hover:border-sky-200"
              >
                Full {hub.roleName} resume guide (summary, skills, projects) →
              </Link>
            </li>
            <li>
              <Link
                href="/resume-examples"
                className="block rounded-xl border border-white bg-white p-4 text-sm font-medium text-sky-800 shadow-sm transition hover:border-sky-200"
              >
                Resume examples by role →
              </Link>
            </li>
            <li>
              <Link
                href="/how-to-pass-ats"
                className="block rounded-xl border border-white bg-white p-4 text-sm font-medium text-sky-800 shadow-sm transition hover:border-sky-200"
              >
                How to pass ATS screening →
              </Link>
            </li>
            <li className="sm:col-span-2">
              <Link
                href="/problems/resume-not-getting-interviews"
                className="block rounded-xl border border-white bg-white p-4 text-sm font-medium text-sky-800 shadow-sm transition hover:border-sky-200"
              >
                Why resumes fail to get interviews →
              </Link>
            </li>
          </ul>
        </section>

        <section aria-labelledby="related-searches" className="scroll-mt-24">
          <h2 id="related-searches" className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Related Resume Bullet Point Searches
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Common next searches—most link to deeper guides or level-specific example pages on ResumeAtlas.
          </p>
          <ul className="mt-5 space-y-2">
            {hub.relatedSearches.map((item) => (
              <li key={item.href + item.label}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section id="faq" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">FAQ</h2>
          <div className="mt-5 space-y-3">
            {hub.faq.map((item) => (
              <details
                key={item.question}
                className="group rounded-xl border border-slate-200 bg-white px-4 py-3"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-slate-900">
                  {item.question}
                  <span className="text-slate-400 group-open:hidden">+</span>
                  <span className="hidden text-slate-400 group-open:inline">−</span>
                </summary>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <p className="text-center text-xs text-slate-500">
          Updated for 2026 hiring trends · ResumeAtlas ·{" "}
          <time dateTime="2026-04-02">April 2026</time>
        </p>
      </div>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
    </div>
  );
}
