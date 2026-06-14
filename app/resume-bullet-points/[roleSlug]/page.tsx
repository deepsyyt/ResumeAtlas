import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getResumeBulletHub,
  getHubPreviewPlainText,
  flattenHubPreviewBullets,
  isResumeBulletRole,
  publicPathForBulletHub,
  bulletLevelAnchorId,
  levelLabel,
  RESUME_BULLET_LEVELS,
  RESUME_BULLET_ROLES,
  countUniqueResumeBulletHubExamples,
  defensibleBulletCountLabel,
  buildResumeBulletHubMetaTitle,
  buildResumeBulletHubMetaDescription,
  type ResumeBulletRole,
} from "@/app/lib/resumeBulletPointContent";
import { ResumeBulletLevelEmbed } from "@/app/components/ResumeBulletLevelEmbed";
import {
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  CHECK_RESUME_AGAINST_JD_PRIMARY_CTA,
} from "@/app/lib/internalLinks";
import { getSiteUrl } from "@/app/lib/siteUrl";
import { ResumeBulletPreviewCopyButton } from "@/app/components/ResumeBulletPreviewCopyButton";

type PageParams = { roleSlug: string };

export function generateStaticParams(): { roleSlug: ResumeBulletRole }[] {
  return RESUME_BULLET_ROLES.map((roleSlug) => ({ roleSlug }));
}

export function generateMetadata({ params }: { params: PageParams }): Metadata {
  if (!isResumeBulletRole(params.roleSlug)) return {};
  const hub = getResumeBulletHub(params.roleSlug);
  const canonicalPath = `/${params.roleSlug}-resume-bullet-points`;
  const canonical = `${getSiteUrl().replace(/\/$/, "")}${canonicalPath}`;
  const metaTitle = buildResumeBulletHubMetaTitle(params.roleSlug, hub);
  const metaDescription = buildResumeBulletHubMetaDescription(params.roleSlug, hub);
  return {
    title: { absolute: metaTitle },
    description: metaDescription,
    keywords: [...hub.keywords],
    alternates: { canonical: canonicalPath },
    robots: { index: true, follow: true },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonical,
      siteName: "ResumeAtlas",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
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
  const uniqueExampleCount = countUniqueResumeBulletHubExamples(role);
  const exampleCountLabel = defensibleBulletCountLabel(uniqueExampleCount);

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
    name: buildResumeBulletHubMetaTitle(role, hub),
    description: buildResumeBulletHubMetaDescription(role, hub),
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
    <main className="min-h-screen bg-white text-slate-900">
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
          <p className="mt-2 text-sm font-medium text-slate-600">
            {exampleCountLabel} copy-paste examples on this page—entry-level, junior, and senior sections first.
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
              href="#level-previews"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              View examples
            </Link>
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
            >
              {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
            </Link>
          </div>
          <nav
            className="mt-6 flex flex-wrap justify-center gap-2 sm:justify-start"
            aria-label="Jump to experience level"
          >
            {RESUME_BULLET_LEVELS.map((level) => (
              <a
                key={level}
                href={`#${bulletLevelAnchorId(level)}`}
                className="inline-flex rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-sky-300 hover:text-sky-900"
              >
                {levelLabel(level)}
              </a>
            ))}
          </nav>
          <p className="mt-3 max-w-xl text-xs text-slate-500">
            Copy-paste examples below, then compare your resume to a job description before you apply.
          </p>

          <ul className="mt-6 space-y-2.5 rounded-xl border border-slate-200 bg-white/80 px-4 py-4 text-sm leading-snug text-slate-800 shadow-sm sm:text-[15px]">
            {hub.aboveFoldBullets.map((line) => (
              <li key={line} className="flex gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mx-auto max-w-3xl space-y-12 px-4 py-12 sm:px-6 lg:px-8">
        <section id="level-previews" className="scroll-mt-24 space-y-16">
          {RESUME_BULLET_LEVELS.map((level) => (
            <ResumeBulletLevelEmbed key={level} role={role} level={level} />
          ))}
        </section>

        <section id="preview" className="scroll-mt-24">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                {hub.previewSection.h2}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{hub.previewSectionIntro}</p>
            </div>
            <ResumeBulletPreviewCopyButton
              text={previewPlain}
              tailoredCtaHref={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              tailoredCtaLabel="Generate from my resume"
            />
          </div>
          <div className="mt-6 space-y-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            {hub.previewSection.groups.map((g) => (
              <div key={g.label}>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">{g.label}</h3>
                <ul className="mt-3 list-disc space-y-2.5 pl-5 text-sm text-slate-800 sm:text-base">
                  {g.bullets.map((line, i) => (
                    <li key={`${g.label}-${i}`}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section
          id="how-to-use"
          className="scroll-mt-24 space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base"
          aria-labelledby="how-to-use-heading"
        >
          <h2 id="how-to-use-heading" className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            How to use these {hub.roleName.toLowerCase()} resume bullet points
          </h2>
          <p className="font-medium text-slate-800">{hub.introIntentStack}</p>
          <section
            id="what-are-good"
            className="rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-4 sm:px-5"
            aria-labelledby="snippet-definition-heading"
          >
            <h3
              id="snippet-definition-heading"
              className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl"
            >
              {hub.snippetDefinition.h2}
            </h3>
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
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{hub.authorityLine}</p>
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
    </main>
  );
}
