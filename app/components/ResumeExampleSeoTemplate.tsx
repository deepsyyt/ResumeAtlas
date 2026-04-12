import Link from "next/link";
import {
  resumeExamplePublicPath,
  type RoleSlug,
} from "@/app/lib/seoPages";
import type { StandaloneResumeExampleRole } from "@/app/lib/resumeExampleSeoTemplate";

type FooterRole = StandaloneResumeExampleRole | "data-scientist";

const EXPLORE_MORE_ROLES: readonly FooterRole[] = [
  "product-manager",
  "data-analyst",
  "data-scientist",
];

export function ResumeExampleSeoIntro({ role }: { role: string }) {
  return (
    <p className="mt-3 max-w-2xl text-base text-slate-600 sm:text-lg">
      Use this {role.toLowerCase()} resume example to pass ATS screening and get more interviews. This guide
      includes real examples, keywords, and formatting tips. You can also analyze your resume instantly with our
      free ATS checker.
    </p>
  );
}

export function ResumeExampleTopAtsKeywordsSection({
  role,
  keywords,
}: {
  role: string;
  keywords: string[];
}) {
  return (
    <section aria-labelledby="resume-example-ats-keywords">
      <h2 id="resume-example-ats-keywords" className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
        Top ATS Keywords for {role} Resume
      </h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700 sm:text-base">
        {keywords.map((k) => (
          <li key={k}>{k}</li>
        ))}
      </ul>
    </section>
  );
}

export function ResumeExampleSeoBulletSamplesSection({
  role,
  bullets,
}: {
  role: string;
  bullets: string[];
}) {
  return (
    <section aria-labelledby="resume-example-seo-bullets">
      <h2 id="resume-example-seo-bullets" className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
        {role} Resume Bullet Point Examples
      </h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700 sm:text-base">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </section>
  );
}

export function ResumeExampleStandardFaqBlock({ role }: { role: string }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-slate-900">What should a {role} resume include?</h3>
        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          It should include skills, experience, and measurable achievements relevant to the role.
        </p>
      </div>
      <div>
        <h3 className="text-base font-semibold text-slate-900">How do I make my resume ATS-friendly?</h3>
        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          Use keywords from the job description and avoid complex formatting.
        </p>
      </div>
      <div>
        <h3 className="text-base font-semibold text-slate-900">What skills are important for a {role}?</h3>
        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          Key skills include SQL, Python, analytics, and domain knowledge.
        </p>
      </div>
    </div>
  );
}

export function ResumeExampleAtsScoreCta() {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
      <h3 className="text-base font-semibold tracking-tight text-slate-900">Check your resume ATS score</h3>
      <p className="mt-2 text-sm text-slate-600 sm:text-base">
        Upload your resume and see how it performs for this role.
      </p>
      <Link
        href="/ats-resume-checker"
        className="mt-4 inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 sm:text-base"
      >
        Analyze Resume
      </Link>
    </div>
  );
}

export function ResumeExampleExploreMoreFooter({ currentRole }: { currentRole: StandaloneResumeExampleRole }) {
  const links = EXPLORE_MORE_ROLES.filter((r) => r !== currentRole);

  return (
    <section className="border-t border-slate-200 pt-10" aria-labelledby="resume-example-more-examples">
      <h3 id="resume-example-more-examples" className="text-lg font-semibold text-slate-900">
        Explore more resume examples
      </h3>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700 sm:text-base">
        {links.map((r) => {
          const href = resumeExamplePublicPath(r as RoleSlug);
          const label =
            r === "product-manager"
              ? "Product Manager Resume Example"
              : r === "data-analyst"
                ? "Data Analyst Resume Example"
                : "Data Scientist Resume Example";
          return (
            <li key={r}>
              <Link href={href} className="font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-900">
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
