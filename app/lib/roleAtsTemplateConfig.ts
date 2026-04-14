import type { Metadata } from "next";
import { getSiteUrl } from "@/app/lib/siteUrl";

/** Standalone role-specific ATS template page (thin layout + keyword strips). */
export type RoleAtsTemplateKey = "software-engineer";

export const ROLE_ATS_TEMPLATE_KEYS = [
  "software-engineer",
] as const satisfies readonly RoleAtsTemplateKey[];

export const ROLE_ATS_PATH: Record<RoleAtsTemplateKey, string> = {
  "software-engineer": "/ats-resume-template-software-engineer",
};

type RoleBlock = {
  path: string;
  title: string;
  description: string;
  h1: string;
  intro: string[];
  keywordStrip: string[];
  verbStrip: string[];
  copySnippet: string;
  exampleHref: string;
  exampleLabel: string;
  keywordGuideHref: string;
  keywordGuideLabel: string;
  resumeGuideHref: string;
  resumeGuideLabel: string;
};

const BLOCKS: Record<RoleAtsTemplateKey, RoleBlock> = {
  "software-engineer": {
    path: ROLE_ATS_PATH["software-engineer"],
    title: "ATS Resume Template for Software Engineers (Format + Keywords) | ResumeAtlas",
    description:
      "Software engineer ATS resume template: APIs, reliability, and delivery keywords in a scannable layout—starter text plus links to engineer keyword and bullet guides.",
    h1: "ATS resume template for software engineers",
    intro: [
      "Engineering job postings are dense with stack-specific tokens—languages, frameworks, cloud primitives, and reliability work—that ATS and recruiters scan for in seconds. A software engineer ATS resume template keeps those tokens in plain text sections parsers expect: Summary, Skills, Experience, Education—without multi-column layouts that drop content.",
      "Use the strips below as a sanity checklist against your target posting, then adapt the starter snippet with repos, systems, and scale you actually owned. For a structured match, paste your resume and the job description into ResumeAtlas to see missing skills and alignment issues before you apply.",
    ],
    keywordStrip: [
      "TypeScript · JavaScript · React · Node · APIs · microservices · CI/CD · AWS · testing · observability · performance · SQL · system design · code review · mentoring",
    ],
    verbStrip: [
      "Built · Shipped · Refactored · Optimized · Debugged · Automated · Scaled · Secured · Instrumented · Documented · Led",
    ],
    copySnippet: `RILEY NGUYEN
Austin, TX · riley.nguyen@email.com

SUMMARY
Software engineer focused on backend services, API reliability, and CI/CD. TypeScript/Node and AWS in production.

SKILLS
TypeScript · Node.js · PostgreSQL · AWS (ECS, Lambda) · Docker · GitHub Actions · Jest · OpenAPI

EXPERIENCE
Software Engineer · RiverStack · 2021–Present
• Reduced p95 API latency by 28% via caching, query tuning, and connection pool limits.
• Shipped GitHub Actions pipelines for blue/green deploys; cut failed releases by roughly 40% in six months.

EDUCATION
BS Computer Science · State University · 2021`,
    exampleHref: "/resume-bullet-points/software-engineer",
    exampleLabel: "Software engineer resume bullet hub (levels)",
    keywordGuideHref: "/software-engineer-resume-keywords",
    keywordGuideLabel: "Software engineer ATS keywords",
    resumeGuideHref: "/software-engineer-resume-example",
    resumeGuideLabel: "Software engineer resume example",
  },
};

export function getRoleAtsBlock(role: RoleAtsTemplateKey): RoleBlock {
  return BLOCKS[role];
}

export function roleAtsTemplateMetadata(role: RoleAtsTemplateKey): Metadata {
  const b = BLOCKS[role];
  const base = getSiteUrl().replace(/\/$/, "");
  const url = `${base}${b.path}`;
  return {
    title: b.title,
    description: b.description,
    alternates: { canonical: b.path },
    openGraph: {
      title: b.title,
      description: b.description,
      type: "article",
      url,
    },
    keywords: [
      "ATS resume template",
      "software engineer ATS resume",
      "ATS friendly resume format",
      "resume keywords for ATS",
    ],
  };
}
