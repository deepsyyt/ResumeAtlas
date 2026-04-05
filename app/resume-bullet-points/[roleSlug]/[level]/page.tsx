import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getResumeBulletDetail,
  getResumeBulletHub,
  isResumeBulletRole,
  publicPathForBulletDetail,
  publicPathForBulletHub,
  levelLabel,
  RESUME_BULLET_LEVELS,
  RESUME_BULLET_ROLES,
  splitProjectsAtBulletCount,
  type ResumeBulletLevel,
  type ResumeBulletRole,
} from "@/app/lib/resumeBulletPointContent";
import { ResumeBulletConversionBlocks } from "@/app/components/ResumeBulletConversionBlocks";
import { CHECK_RESUME_AGAINST_JD_FORM_HREF } from "@/app/lib/internalLinks";

type PageParams = { roleSlug: string; level: string };

function parseLevel(raw: string): ResumeBulletLevel | null {
  if (raw === "entry-level" || raw === "junior" || raw === "senior") return raw;
  return null;
}

export function generateStaticParams(): { roleSlug: ResumeBulletRole; level: ResumeBulletLevel }[] {
  const roles: ResumeBulletRole[] = [
    "data-scientist",
    "software-engineer",
    "product-manager",
  ];
  const out: { roleSlug: ResumeBulletRole; level: ResumeBulletLevel }[] = [];
  for (const roleSlug of roles) {
    for (const level of RESUME_BULLET_LEVELS) {
      out.push({ roleSlug, level });
    }
  }
  return out;
}

export function generateMetadata({ params }: { params: PageParams }): Metadata {
  if (!isResumeBulletRole(params.roleSlug)) return {};
  const level = parseLevel(params.level);
  if (!level) return {};
  const d = getResumeBulletDetail(params.roleSlug, level);
  const canonical = publicPathForBulletDetail(params.roleSlug, level);
  return {
    title: d.metaTitle,
    description: d.metaDescription,
    ...(d.keywords?.length ? { keywords: d.keywords } : {}),
    alternates: { canonical },
  };
}

export default function ResumeBulletDetailPage({ params }: { params: PageParams }) {
  if (!isResumeBulletRole(params.roleSlug)) notFound();
  const level = parseLevel(params.level);
  if (!level) notFound();

  const role = params.roleSlug;
  const d = getResumeBulletDetail(role, level);
  const hub = getResumeBulletHub(role);
  const hubPath = publicPathForBulletHub(role);

  const projectBlockCount = d.projects.length;
  const leadershipCount = d.leadershipBullets?.length ?? 0;
  const bulletLineCount =
    (d.aboveFoldBullets?.length ?? 0) +
    d.projects.reduce((n, p) => n + p.bullets.length, 0);

  const entryProjectSplit =
    level === "entry-level" && d.entryProjectsSectionTitle
      ? splitProjectsAtBulletCount(d.projects, 6)
      : { visible: d.projects, rest: [] as typeof d.projects };

  const supplementalFaqExtra =
    (level === "entry-level" && d.entryFaqExtra) ||
    (level === "junior" && d.juniorFaqExtra) ||
    (level === "senior" && d.seniorFaqExtra)
      ? level === "entry-level"
        ? d.entryFaqExtra!
        : level === "junior"
          ? d.juniorFaqExtra!
          : d.seniorFaqExtra!
      : null;

  const supplementalFaqSchema = supplementalFaqExtra
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: supplementalFaqExtra.question,
            acceptedAnswer: { "@type": "Answer", text: supplementalFaqExtra.answer },
          },
        ],
      }
    : null;

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="border-b border-slate-200 bg-slate-50/60">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-sky-700">
            <Link href={hubPath} className="hover:underline">
              {hub.roleName} resume bullet hub
            </Link>
            <span className="text-slate-400"> · </span>
            {levelLabel(level)}
          </p>
          {level === "senior" && leadershipCount > 0 ? (
            <p className="mt-2 text-sm">
              <a
                href="#leadership"
                className="font-semibold text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                Jump to leadership examples
              </a>
            </p>
          ) : null}
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {d.h1}
          </h1>
          {d.noExperienceReassurance ? (
            <p className="mt-4 text-sm font-semibold text-slate-800 sm:text-base">{d.noExperienceReassurance}</p>
          ) : null}
          {d.queryBreadthLine ? (
            <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">{d.queryBreadthLine}</p>
          ) : null}
          {d.studentIntentBlock ? (
            <section
              className="mt-6 rounded-xl border border-sky-100 bg-sky-50/60 px-4 py-4 sm:px-5"
              aria-labelledby="student-intent-heading"
            >
              <h2
                id="student-intent-heading"
                className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl"
              >
                {d.studentIntentBlock.h2}
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-800 sm:text-base">
                {d.studentIntentBlock.bullets.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </section>
          ) : null}
          {d.intentStack ? (
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-800 sm:text-base">
              {d.intentStack}
            </p>
          ) : null}
          {d.exactMatchQueryLine ? (
            <p className="mt-4 text-sm leading-relaxed text-slate-800 sm:text-base">{d.exactMatchQueryLine}</p>
          ) : null}
          {d.copyIntentLine && d.aboveFoldBullets ? (
            <p className="mt-6 text-sm text-slate-600">{d.copyIntentLine}</p>
          ) : null}
          {d.examplesAboveFoldH2 && d.aboveFoldBullets ? (
            <h2
              id="examples-above-fold"
              className="mt-5 text-lg font-semibold tracking-tight text-slate-900 sm:text-xl"
            >
              {d.examplesAboveFoldH2}
            </h2>
          ) : null}
          {d.aboveFoldBullets ? (
            <ul className="mt-3 space-y-2.5 rounded-xl border border-slate-200 bg-white/80 px-4 py-4 text-sm leading-snug text-slate-800 shadow-sm sm:text-[15px]">
              {d.aboveFoldBullets.map((line) => (
                <li key={line} className="flex gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          ) : null}
          {d.earlyAtsWarning ? (
            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50/90 px-4 py-4 text-sm text-amber-950">
              <p className="font-medium">⚠️ {d.earlyAtsWarning.body}</p>
              <Link
                href={d.earlyAtsWarning.href}
                className="mt-3 inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                {d.earlyAtsWarning.ctaLabel}
              </Link>
            </div>
          ) : null}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Compare your resume with this job description
            </Link>
            <Link
              href="/resume-keyword-scanner#ats-checker-form"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              Find missing keywords in your {hub.roleName.toLowerCase()} resume
            </Link>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Paste resume + job description to see overlap and gaps before you rewrite bullets.
          </p>
          {d.snippetDefinition ? (
            <section
              id="what-are-good-snippet"
              className="mt-8 scroll-mt-24 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-4 sm:px-5"
              aria-labelledby="snippet-definition-heading"
            >
              <h2
                id="snippet-definition-heading"
                className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl"
              >
                {d.snippetDefinition.h2}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
                {d.snippetDefinition.line1}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
                {d.snippetDefinition.line2}
              </p>
            </section>
          ) : null}
          {d.howToWriteSnippet ? (
            <section
              id="how-to-write-snippet"
              className="mt-6 scroll-mt-24 rounded-xl border border-slate-200 bg-white px-4 py-4 sm:px-5"
              aria-labelledby="how-to-write-snippet-heading"
            >
              <h2
                id="how-to-write-snippet-heading"
                className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl"
              >
                {d.howToWriteSnippet.h2}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
                {d.howToWriteSnippet.line1}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
                {d.howToWriteSnippet.line2}
              </p>
            </section>
          ) : null}
          {d.authorityLine ? (
            <p className="mt-6 text-xs font-medium uppercase tracking-wide text-slate-500">{d.authorityLine}</p>
          ) : null}
          <p className="mt-6 text-sm leading-relaxed text-slate-700 sm:text-base">{d.intro}</p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-amber-100 bg-amber-50/50 px-4 py-3 text-sm text-amber-950">
          {d.doubtLine}
        </div>

        {d.commonMistakes ? (
          <section
            className="rounded-2xl border border-rose-100 bg-rose-50/50 p-5 sm:p-6"
            aria-labelledby="entry-common-mistakes"
          >
            <h2 id="entry-common-mistakes" className="text-lg font-semibold text-rose-950">
              {d.commonMistakes.title}
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-rose-950/95">
              {d.commonMistakes.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <div className="mt-5">
              <Link
                href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Fix my resume
              </Link>
            </div>
          </section>
        ) : null}

        <section id="project-examples" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            {d.projectsSectionTitle ?? d.entryProjectsSectionTitle ?? "Project-wise resume bullets"}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {d.projectsSectionSubcopy ??
              (d.entryProjectsSectionTitle
                ? "Grouped as academic, internship, and personal-style work—swap in your real project names and metrics."
                : level === "entry-level"
                  ? "2–3 project blocks — typical for internships and new grads."
                  : level === "junior"
                    ? "Four project blocks — mid-level IC scope."
                    : `Five project blocks plus ${leadershipCount} leadership lines — senior / staff-style scope.`)}
          </p>
          {d.realismLine ? (
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{d.realismLine}</p>
          ) : null}
          {d.projectSemanticReinforcement ? (
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{d.projectSemanticReinforcement}</p>
          ) : null}

          <div className="mt-6 space-y-8">
            {entryProjectSplit.visible.map((proj, idx) => (
              <div key={`vis-${proj.name}-${idx}`}>
                {proj.groupHeading ? (
                  <div className="mb-3">
                    <h3 className="text-lg font-semibold tracking-tight text-slate-900">{proj.groupHeading}</h3>
                    {proj.groupIntro ? (
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{proj.groupIntro}</p>
                    ) : null}
                  </div>
                ) : null}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h4 className="text-base font-semibold text-slate-900">{proj.name}</h4>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700 sm:text-base">
                    {proj.bullets.map((line, i) => (
                      <li key={`${proj.name}-${i}-v`}>{line}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {entryProjectSplit.rest.length > 0 ? (
            <>
              <p className="mt-8 text-sm font-medium text-slate-800">
                {d.detailsIntroLine ??
                  "Here are more entry-level resume bullet point examples you can use:"}
              </p>
              <details className="group mt-3 rounded-2xl border border-slate-200 bg-slate-50/50 open:bg-white">
                <summary className="cursor-pointer list-none px-4 py-4 text-sm font-semibold text-slate-900 sm:px-5 [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-3">
                    Show more entry-level examples
                    <span className="text-slate-400 transition group-open:rotate-180">▼</span>
                  </span>
                </summary>
                <div className="space-y-8 border-t border-slate-100 px-4 pb-6 pt-2 sm:px-5">
                  {entryProjectSplit.rest.map((proj, idx) => (
                    <div key={`rest-${proj.name}-${idx}`}>
                      {proj.groupHeading ? (
                        <div className="mb-3">
                          <h3 className="text-lg font-semibold tracking-tight text-slate-900">{proj.groupHeading}</h3>
                          {proj.groupIntro ? (
                            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{proj.groupIntro}</p>
                          ) : null}
                        </div>
                      ) : null}
                      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <h4 className="text-base font-semibold text-slate-900">{proj.name}</h4>
                        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700 sm:text-base">
                          {proj.bullets.map((line, i) => (
                            <li key={`${proj.name}-${i}-r`}>{line}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            </>
          ) : null}
        </section>

        {d.leadershipQueryBridge ? (
          <p className="mt-2 text-sm font-medium leading-relaxed text-slate-800 sm:text-base">
            {d.leadershipQueryBridge}
          </p>
        ) : null}

        {d.leadershipBullets && d.leadershipBullets.length > 0 ? (
          <section
            id="leadership"
            className="scroll-mt-24"
            aria-labelledby="leadership-examples-heading"
          >
            <h2
              id="leadership-examples-heading"
              className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl"
            >
              {d.leadershipSectionTitle ?? "Leadership & org-wide scope"}
            </h2>
            {d.leadershipSectionSubcopy ? (
              <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
                {d.leadershipSectionSubcopy}
              </p>
            ) : (
              <p className="mt-2 text-sm text-slate-600">
                Ten lines you can split across summary and experience—only what matches your real scope.
              </p>
            )}
            {d.leadershipSnippet ? (
              <div
                className="mt-5 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-4 sm:px-5"
                aria-labelledby="leadership-snippet-heading"
              >
                <h3
                  id="leadership-snippet-heading"
                  className="text-base font-semibold tracking-tight text-slate-900 sm:text-lg"
                >
                  {d.leadershipSnippet.h3}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
                  {d.leadershipSnippet.line1}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
                  {d.leadershipSnippet.line2}
                </p>
              </div>
            ) : null}
            <p className="mt-4 text-sm text-slate-600">
              {leadershipCount} leadership resume bullet point examples you can split across summary and
              experience—keep only lines that match your real scope.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700 sm:text-base">
              {d.leadershipBullets.map((line, i) => (
                <li key={`leadership-${i}`}>{line}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {supplementalFaqExtra ? (
          <section
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
            aria-labelledby="supplemental-faq"
          >
            <h2 id="supplemental-faq" className="text-lg font-semibold text-slate-900">
              Quick answer
            </h2>
            <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3">
              <p className="text-sm font-semibold text-slate-900">{supplementalFaqExtra.question}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{supplementalFaqExtra.answer}</p>
            </div>
          </section>
        ) : null}

        {d.endOfPageRecap ? (
          <p className="text-center text-sm leading-relaxed text-slate-800 sm:text-base">{d.endOfPageRecap}</p>
        ) : null}

        {level === "entry-level" || level === "junior" || level === "senior" ? (
          <p className="text-center text-sm font-medium leading-relaxed text-slate-900 sm:text-base">
            Now check how your resume compares to a real job description and see what&apos;s missing{" "}
            <span className="text-slate-500" aria-hidden="true">
              ↓
            </span>
          </p>
        ) : null}

        <ResumeBulletConversionBlocks roleKeywordLabel={hub.roleName.toLowerCase()} />

        {level === "entry-level" ? (
          <section
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
            aria-labelledby="other-roles-bullets"
          >
            <h2 id="other-roles-bullets" className="text-lg font-semibold text-slate-900 sm:text-xl">
              Explore Resume Bullet Points for Other Roles
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Same entry-level structure for other tracks—compare wording and keywords.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {RESUME_BULLET_ROLES.filter((r) => r !== role).map((r) => {
                const otherHub = getResumeBulletHub(r);
                const href = publicPathForBulletDetail(r, "entry-level");
                return (
                  <li key={r}>
                    <Link href={href} className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950">
                      {otherHub.roleName} resume bullet points (entry-level)
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}

        {level === "junior" ? (
          <section
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
            aria-labelledby="other-roles-junior-bullets"
          >
            <h2 id="other-roles-junior-bullets" className="text-lg font-semibold text-slate-900 sm:text-xl">
              Junior resume bullet points for other roles
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Compare mid-level wording and keywords across tracks—then tailor to your posting.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {RESUME_BULLET_ROLES.filter((r) => r !== role).map((r) => {
                const otherHub = getResumeBulletHub(r);
                const href = publicPathForBulletDetail(r, "junior");
                return (
                  <li key={r}>
                    <Link href={href} className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950">
                      {otherHub.roleName} resume bullet points (junior)
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}

        {level === "senior" ? (
          <section
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
            aria-labelledby="other-roles-senior-bullets"
          >
            <h2 id="other-roles-senior-bullets" className="text-lg font-semibold text-slate-900 sm:text-xl">
              Senior resume bullet points for other roles
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Compare leadership and project language across tracks—then tailor to your posting.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {RESUME_BULLET_ROLES.filter((r) => r !== role).map((r) => {
                const otherHub = getResumeBulletHub(r);
                const href = publicPathForBulletDetail(r, "senior");
                return (
                  <li key={r}>
                    <Link href={href} className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950">
                      {otherHub.roleName} resume bullet points (senior)
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}

        <section className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 sm:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Internal links
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link
                href="/resume-keyword-scanner#ats-checker-form"
                className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
              >
                Find missing keywords in your {hub.roleName.toLowerCase()} resume
              </Link>
            </li>
            <li>
              <Link
                href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
                className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
              >
                Compare your resume with this job description
              </Link>
            </li>
            <li>
              <Link
                href="/problems/resume-not-getting-interviews"
                className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
              >
                Why resumes fail to get interviews
              </Link>
            </li>
            <li>
              <Link href={hubPath} className="text-sky-700 underline underline-offset-2 hover:text-sky-900">
                Back to {hub.roleName} resume bullet hub
              </Link>
            </li>
          </ul>
        </section>

        <p className="text-xs text-slate-500">
          {bulletLineCount} example bullet lines on this page · {projectBlockCount} project sections
          {leadershipCount > 0 ? ` · ${leadershipCount} leadership bullets` : ""}.
        </p>
      </div>

      {supplementalFaqSchema ? (
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(supplementalFaqSchema),
          }}
        />
      ) : null}
    </main>
  );
}
