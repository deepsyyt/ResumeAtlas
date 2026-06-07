import type { Metadata } from "next";
import Link from "next/link";
import {
  ATS_RESUME_TEMPLATE_GUIDE_PATH,
  CHECK_RESUME_AGAINST_JD_PATH,
  OPTIMIZE_RESUME_FOR_JD_PATH,
} from "@/app/lib/internalLinks";
import { ALL_TOOL_CLUSTER_CONFIGS } from "@/app/lib/toolClusterPages";
import { RESUME_KEYWORDS_HUB_PATH } from "@/app/lib/seoHubPages";
import { getSiteUrl } from "@/app/lib/siteUrl";

const RESOURCE_HUB_LINKS = [
  {
    path: CHECK_RESUME_AGAINST_JD_PATH,
    title: "Compare resume to job description",
    description:
      "Primary checker: paste resume + posting for match score, gap analysis, and AI optimization.",
  },
  {
    path: OPTIMIZE_RESUME_FOR_JD_PATH,
    title: "Optimize resume for job description",
    description:
      "Tailor and rewrite your resume for a specific posting with ATS checks, keyword gaps, and role-specific guides.",
  },
  {
    path: "/ats-resume-checker",
    title: "ATS resume guide",
    description:
      "Parsing, formatting, and compatibility guidance. Optional resume-only scan; use the checker above for full job match.",
  },
  {
    path: ATS_RESUME_TEMPLATE_GUIDE_PATH,
    title: "ATS resume template",
    description: "Layout rules, copyable templates, and format examples that parse reliably.",
  },
  {
    path: "/resume-examples",
    title: "Resume examples by role",
    description: "Role-specific samples before you tailor to a posting.",
  },
  {
    path: RESUME_KEYWORDS_HUB_PATH,
    title: "Resume keywords by role",
    description: "ATS keyword lists to prep before you compare against a job description.",
  },
  {
    path: "/methodology",
    title: "How scoring works",
    description: "Posting-fit gates, diagnostic model, and what the match score means.",
  },
] as const;

const siteBase = getSiteUrl().replace(/\/$/, "");
const toolsUrl = `${siteBase}/tools`;

export const metadata: Metadata = {
  title: "Free Resume Tools | ResumeAtlas",
  description:
    "Free online resume tools: compare your resume with a job description, get ATS-style scores, and find missing keywords.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: toolsUrl,
  },
  openGraph: {
    title: "Free Resume Tools | ResumeAtlas",
    description:
      "Free online resume tools: compare your resume with a job description, get ATS-style scores, and find missing keywords.",
    url: toolsUrl,
    type: "website",
    images: [
      {
        url: "/og-resume-checker.png",
        width: 1200,
        height: 630,
        alt: "ResumeAtlas free resume tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Resume Tools | ResumeAtlas",
    description:
      "Free online resume tools: compare your resume with a job description, get ATS-style scores, and find missing keywords.",
    images: ["/og-resume-checker.png"],
  },
};

export default function ToolsPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "ResumeAtlas tool collection",
    itemListElement: RESOURCE_HUB_LINKS.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title,
      url: `${siteBase}${item.path}`,
    })),
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <section className="border-b border-slate-200 bg-slate-50/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
            Free ATS Resume Tools
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Start with the resume vs job description checker. Other guides and hubs are linked below.
          </p>
          <p className="mt-3 text-sm text-slate-600">
            <Link href="/" className="font-medium text-sky-800 underline underline-offset-2">
              Home
            </Link>
            {" · "}
            <Link
              href={CHECK_RESUME_AGAINST_JD_PATH}
              className="font-medium text-sky-800 underline underline-offset-2"
            >
              Open the checker
            </Link>
          </p>
        </div>
      </section>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <section>
          <h2 className="text-lg font-semibold text-slate-900">Free checkers</h2>
          <ul className="mt-4 space-y-4">
            {ALL_TOOL_CLUSTER_CONFIGS.map((c) => (
              <li key={c.path} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">
                  <Link
                    href={c.path}
                    className="text-sky-800 hover:text-sky-950 underline underline-offset-2"
                  >
                    {c.clusterLinkAnchor}
                  </Link>
                </h3>
                <p className="mt-2 text-sm text-slate-600">{c.intro}</p>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-slate-900">Guides &amp; resources</h2>
          <ul className="mt-4 space-y-4">
            {RESOURCE_HUB_LINKS.slice(1).map((item) => (
              <li key={item.path} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
                <h3 className="text-base font-semibold text-slate-900">
                  <Link
                    href={item.path}
                    className="text-sky-800 hover:text-sky-950 underline underline-offset-2"
                  >
                    {item.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm text-slate-600">{item.description}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
    </div>
  );
}
