import type { Metadata } from "next";
import {
  CONTENT_FRESHNESS_YEAR,
  CONTENT_LAST_UPDATED_LABEL,
} from "@/app/lib/contentFreshness";
import { getSiteUrl } from "@/app/lib/siteUrl";

const RESUME_ATLAS_BRAND_TITLE_SUFFIX = " | ResumeAtlas" as const;
export type FaqSchemaEntity = {
  "@type": "Question";
  name: string;
  acceptedAnswer: { "@type": "Answer"; text: string };
};

export type FaqPageSchema = {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: FaqSchemaEntity[];
};

const standaloneRoles = ["data-analyst", "product-manager"] as const;
export type StandaloneResumeExampleRole = (typeof standaloneRoles)[number];

/** Freshness signal in SERP titles; bump when you want “current year” messaging to roll forward. */
export const RESUME_EXAMPLE_SERP_TITLE_YEAR = 2026 as const;

/** Three title/description pairs per role for CTR experiments. Change {@link RESUME_EXAMPLE_SERP_ACTIVE_VARIANT} to rotate. */
export const RESUME_EXAMPLE_SERP_VARIANTS: Record<
  StandaloneResumeExampleRole,
  readonly { title: string; description: string }[]
> = {
  "data-analyst": [
    {
      title: `Data Analyst Resume Example (${CONTENT_FRESHNESS_YEAR} Example + Template)`,
      description:
        `Updated ${CONTENT_LAST_UPDATED_LABEL}: ATS-friendly data analyst resume example with a copy-paste template, metric-driven bullets, and keyword ideas aligned with ${CONTENT_FRESHNESS_YEAR} hiring. Free ATS resume check, then match your resume to any job description on ResumeAtlas.`,
    },
    {
      title: `Data Analyst Resume Example (${RESUME_EXAMPLE_SERP_TITLE_YEAR}): Match Resume to Job Description`,
      description:
        "Full data analyst resume sample plus bullet patterns recruiters and ATS look for. Use ResumeAtlas free tools: resume vs job description checker and ATS resume checker before you apply.",
    },
    {
      title: `Data Analyst Resume Example (${RESUME_EXAMPLE_SERP_TITLE_YEAR}) for ATS Screening + Interviews`,
      description:
        "Template + sample resume for data analysts: SQL, dashboards, and outcomes. Tighten keywords and formatting, run a free ATS check, then compare your resume to each posting.",
    },
  ],
  "product-manager": [
    {
      title: `Product Manager Resume Example (${CONTENT_FRESHNESS_YEAR} Resume Example + Guide)`,
      description:
        `Updated ${CONTENT_LAST_UPDATED_LABEL}: product manager resume example with a copy-paste template, launch and metric bullets, and ATS-friendly structure for ${CONTENT_FRESHNESS_YEAR} PM hiring. Free ATS check, then compare your resume to every job description on ResumeAtlas.`,
    },
    {
      title: `Product Manager Resume Example (${RESUME_EXAMPLE_SERP_TITLE_YEAR}): Roadmaps, Metrics, Launches`,
      description:
        "PM resume sample for roadmaps, stakeholders, and measurable impact. Keyword-friendly for ATS. Match resume to job descriptions free and run the ATS resume checker on ResumeAtlas.",
    },
    {
      title: `PM Resume Example (${RESUME_EXAMPLE_SERP_TITLE_YEAR}): Full Sample + ATS-Friendly Template`,
      description:
        "Full product manager resume example plus a clean one-column template. Improve fit with a free resume vs job description check and ATS scoring on ResumeAtlas.",
    },
  ],
};

/**
 * Which SERP variant (0-2) from {@link RESUME_EXAMPLE_SERP_VARIANTS} is live. After 3-4 weeks in Search Console,
 * compare CTR for queries with impressions; switch index and redeploy to test the next variant.
 */
export const RESUME_EXAMPLE_SERP_ACTIVE_VARIANT = 0 as 0 | 1 | 2;

function pickResumeExampleSerpVariant(
  pageKey: StandaloneResumeExampleRole,
  variantIndex: 0 | 1 | 2
): { title: string; description: string } {
  const variants = RESUME_EXAMPLE_SERP_VARIANTS[pageKey];
  return variants[variantIndex] ?? variants[0];
}

/** Same string as `<title>` / Open Graph for the active variant; use for on-page H1 alignment. */
export function getResumeExampleSerpTitle(
  pageKey: StandaloneResumeExampleRole,
  variantIndex: 0 | 1 | 2 = RESUME_EXAMPLE_SERP_ACTIVE_VARIANT
): string {
  return pickResumeExampleSerpVariant(pageKey, variantIndex).title;
}

export function buildResumeExampleMetadata(
  canonicalPath: string,
  pageKey: StandaloneResumeExampleRole,
  variantIndex: 0 | 1 | 2 = RESUME_EXAMPLE_SERP_ACTIVE_VARIANT
): Metadata {
  const { title, description } = pickResumeExampleSerpVariant(pageKey, variantIndex);
  const url = `${getSiteUrl()}${canonicalPath}`;

  const documentTitle = `${title}${RESUME_ATLAS_BRAND_TITLE_SUFFIX}`;

  return {
    title: documentTitle,
    description,
    robots: { index: true, follow: true },
    alternates: { canonical: url },
    openGraph: {
      title: documentTitle,
      description,
      url,
      siteName: "ResumeAtlas",
      type: "article",
    },
  };
}

export function standardResumeExampleFaqEntities(role: string): FaqSchemaEntity[] {
  return [
    {
      "@type": "Question",
      name: `What should a ${role} resume include?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: "It should include skills, experience, and measurable achievements relevant to the role.",
      },
    },
    {
      "@type": "Question",
      name: "How do I make my resume ATS-friendly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use keywords from the job description and avoid complex formatting.",
      },
    },
    {
      "@type": "Question",
      name: `What skills are important for a ${role}?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: "Key skills include SQL, Python, analytics, and domain knowledge.",
      },
    },
  ];
}

export function mergeResumeExampleFaqSchema(role: string, existing: FaqSchemaEntity[]): FaqPageSchema {
  const seen = new Set(existing.map((e) => e.name));
  const standard = standardResumeExampleFaqEntities(role).filter((e) => !seen.has(e.name));
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [...standard, ...existing],
  };
}

export const DEFAULT_TOP_ATS_KEYWORDS: Record<StandaloneResumeExampleRole, string[]> = {
  "data-analyst": ["SQL", "Python", "Data Analysis", "Machine Learning", "Experimentation"],
  "product-manager": [
    "Product Strategy",
    "Roadmapping",
    "SQL",
    "A/B Testing",
    "Stakeholder Management",
  ],
};

export const DEFAULT_SEO_SAMPLE_BULLETS: Record<StandaloneResumeExampleRole, string[]> = {
  "data-analyst": [
    "Improved model accuracy by 25% using feature engineering",
    "Built dashboards that reduced reporting time by 40%",
    "Analyzed large datasets to identify growth opportunities",
  ],
  "product-manager": [
    "Shipped a roadmap initiative that lifted retention by 18% within two quarters",
    "Partnered with analytics to size experiments and prioritize the highest-ROI bets",
    "Aligned stakeholders across design, engineering, and GTM on a single launch plan",
  ],
};
