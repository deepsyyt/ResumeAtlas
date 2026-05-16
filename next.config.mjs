/** Role slugs aligned with `KEYWORD_PAGES` / `RESUME_PAGES`. */
const ROLE_SLUGS = [
  "data-analyst",
  "data-scientist",
  "software-engineer",
  "product-manager",
  "business-analyst",
  "frontend-developer",
  "backend-developer",
  "machine-learning-engineer",
  "devops-engineer",
  "full-stack-developer",
];

/** Role slugs with resume bullet hub + level pages (`app/lib/resumeBulletPointContent.ts`). */
const RESUME_BULLET_ROLES = [
  "data-analyst",
  "business-analyst",
  "data-scientist",
  "software-engineer",
  "product-manager",
];

/** Align with `ROLE_KEYWORD_INTENTS` in `app/lib/roleSeo.ts` (next.config is plain JS). */
const ROLE_KEYWORD_INTENTS = [
  "core-keywords",
  "technical-skills",
  "tools-platforms",
  "action-verbs",
  "projects",
  "summary",
];

/**
 * Roles with consolidated `/{role}-resume-guide` pillar (patterns + sample appendix).
 * Their `/{role}` hub is noindex and redirects here so one URL owns the cluster.
 */
const RESUME_EXAMPLE_STANDALONE_ROLES = [
  "data-analyst",
  "data-scientist",
  "software-engineer",
  "product-manager",
  "business-analyst",
  "frontend-developer",
  "backend-developer",
  "machine-learning-engineer",
  "devops-engineer",
  "full-stack-developer",
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Avoid EPERM on .next when project is in OneDrive (use a separate build dir)
  distDir: process.env.NODE_ENV === "development" ? "nextbuild" : ".next",
  async rewrites() {
    return [
      // Browsers request /favicon.ico; route to our generated raster icon endpoint.
      { source: "/favicon.ico", destination: "/icon" },
      // DevTools may request this chunk map; Next may not emit it — avoid 404 noise in dev logs.
      {
        source: "/_next/static/chunks/app/LayoutGroupContext.mjs.map",
        destination: "/api/empty-source-map",
      },
      // Canonical role pillar (`/{role}-resume-guide`) internally serves `/{role}/resume-example`.
      {
        source: "/:roleSlug-resume-guide",
        destination: "/:roleSlug/resume-example",
      },
      {
        source: "/:roleSlug-resume-guide/",
        destination: "/:roleSlug/resume-example",
      },
    ];
  },
  async redirects() {
    const pillar = (role) => `/${role}-resume-guide`;

    const pathnameBulletRedirects = RESUME_BULLET_ROLES.flatMap((role) => {
      const dest = pillar(role);
      return [
        {
          source: `/resume-bullet-points/${role}`,
          destination: dest,
          permanent: true,
        },
        {
          source: `/resume-bullet-points/${role}/`,
          destination: dest,
          permanent: true,
        },
        {
          source: `/resume-bullet-points/${role}/entry-level`,
          destination: dest,
          permanent: true,
        },
        {
          source: `/resume-bullet-points/${role}/junior`,
          destination: dest,
          permanent: true,
        },
        {
          source: `/resume-bullet-points/${role}/senior`,
          destination: dest,
          permanent: true,
        },
      ];
    });

    const hyphenBulletRedirects = RESUME_BULLET_ROLES.flatMap((role) => {
      const dest = pillar(role);
      return [
        {
          source: `/${role}-resume-bullet-points`,
          destination: dest,
          permanent: true,
        },
        {
          source: `/${role}-resume-bullet-points/`,
          destination: dest,
          permanent: true,
        },
        {
          source: `/${role}-resume-bullet-points-entry-level`,
          destination: dest,
          permanent: true,
        },
        {
          source: `/${role}-resume-bullet-points-entry-level/`,
          destination: dest,
          permanent: true,
        },
        {
          source: `/${role}-resume-bullet-points-junior`,
          destination: dest,
          permanent: true,
        },
        {
          source: `/${role}-resume-bullet-points-junior/`,
          destination: dest,
          permanent: true,
        },
        {
          source: `/${role}-resume-bullet-points-senior`,
          destination: dest,
          permanent: true,
        },
        {
          source: `/${role}-resume-bullet-points-senior/`,
          destination: dest,
          permanent: true,
        },
      ];
    });

    const resumeBulletLegacyTopicRedirects = RESUME_BULLET_ROLES.flatMap((role) => {
      const dest = pillar(role);
      return [
        {
          source: `/${role}/resume/bullet-points`,
          destination: dest,
          permanent: true,
        },
        {
          source: `/${role}/resume/bullet-points/`,
          destination: dest,
          permanent: true,
        },
        {
          source: `/${role}/resume/bullet-points-entry-level`,
          destination: dest,
          permanent: true,
        },
        {
          source: `/${role}/resume/bullet-points-entry-level/`,
          destination: dest,
          permanent: true,
        },
        {
          source: `/${role}/resume/bullet-points-senior`,
          destination: dest,
          permanent: true,
        },
        {
          source: `/${role}/resume/bullet-points-senior/`,
          destination: dest,
          permanent: true,
        },
      ];
    });

    const roleKeywordIntentRedirects = ROLE_SLUGS.flatMap((role) =>
      ROLE_KEYWORD_INTENTS.flatMap((intent) => [
        {
          source: `/${role}/keywords/${intent}`,
          destination: pillar(role),
          permanent: true,
        },
        {
          source: `/${role}/keywords/${intent}/`,
          destination: pillar(role),
          permanent: true,
        },
      ]),
    );

    const roleHubRedirects = ROLE_SLUGS.flatMap((role) => {
      return [
        {
          source: `/${role}/resume`,
          destination: `/${role}`,
          permanent: true,
        },
        {
          source: `/${role}/resume-example`,
          destination: pillar(role),
          permanent: true,
        },
        {
          source: `/${role}/resume-example/`,
          destination: pillar(role),
          permanent: true,
        },
        {
          source: `/${role}/resume/`,
          destination: `/${role}`,
          permanent: true,
        },
        {
          source: `/${role}/keywords`,
          destination: pillar(role),
          permanent: true,
        },
        {
          source: `/${role}/keywords/`,
          destination: pillar(role),
          permanent: true,
        },
      ];
    });

    const resumeGuideTopicRedirects = ROLE_SLUGS.flatMap((role) => {
      const topics = ["bullet-points", "skills", "summary", "projects"];
      return topics.flatMap((topic) => [
        {
          source: `/${role}/resume/${topic}`,
          destination: `${pillar(role)}#${topic}`,
          permanent: true,
        },
        {
          source: `/${role}/resume/${topic}/`,
          destination: `${pillar(role)}#${topic}`,
          permanent: true,
        },
      ]);
    });

    const standaloneRoleHubToPillarRedirects =
      RESUME_EXAMPLE_STANDALONE_ROLES.flatMap((role) => [
        {
          source: `/${role}`,
          destination: pillar(role),
          permanent: true,
        },
        {
          source: `/${role}/`,
          destination: pillar(role),
          permanent: true,
        },
      ]);

    const resumeTemplateToPillarRedirects = ROLE_SLUGS.flatMap((role) => [
      {
        source: `/${role}-resume-template`,
        destination: pillar(role),
        permanent: true,
      },
      {
        source: `/${role}-resume-template/`,
        destination: pillar(role),
        permanent: true,
      },
    ]);

    const legacyHyphenExampleAndKeywordRedirects = ROLE_SLUGS.flatMap((role) => [
      {
        source: `/${role}-resume-example`,
        destination: pillar(role),
        permanent: true,
      },
      {
        source: `/${role}-resume-example/`,
        destination: pillar(role),
        permanent: true,
      },
      {
        source: `/${role}-resume-keywords`,
        destination: pillar(role),
        permanent: true,
      },
      {
        source: `/${role}-resume-keywords/`,
        destination: pillar(role),
        permanent: true,
      },
    ]);

    const seoBulletRedirects = RESUME_BULLET_ROLES.flatMap((role) => [
      {
        source: `/seo/bullet-points-${role}-resume`,
        destination: pillar(role),
        permanent: true,
      },
      {
        source: `/seo/bullet-points-${role}-resume/`,
        destination: pillar(role),
        permanent: true,
      },
    ]);

    return [
      ...pathnameBulletRedirects,
      ...hyphenBulletRedirects,
      ...resumeBulletLegacyTopicRedirects,
      ...resumeTemplateToPillarRedirects,
      ...roleKeywordIntentRedirects,
      ...roleHubRedirects,
      ...standaloneRoleHubToPillarRedirects,
      ...legacyHyphenExampleAndKeywordRedirects,
      ...seoBulletRedirects,
      ...resumeGuideTopicRedirects,
      {
        source: "/resume-vs-job-description-checker",
        destination: "/check-resume-against-job-description",
        permanent: true,
      },
      {
        source: "/resume-vs-job-description-checker/",
        destination: "/check-resume-against-job-description",
        permanent: true,
      },
      {
        source: "/match-resume-to-job-description",
        destination: "/check-resume-against-job-description",
        permanent: true,
      },
      {
        source: "/match-resume-to-job-description/",
        destination: "/check-resume-against-job-description",
        permanent: true,
      },
      {
        source: "/resume-keyword-scanner",
        destination: "/check-resume-against-job-description",
        permanent: true,
      },
      {
        source: "/resume-keyword-scanner/",
        destination: "/check-resume-against-job-description",
        permanent: true,
      },
      {
        source: "/how-ats-scans-resumes",
        destination: "/ats-resume-template#how-ats-scans",
        permanent: true,
      },
      {
        source: "/how-ats-scans-resumes/",
        destination: "/ats-resume-template#how-ats-scans",
        permanent: true,
      },
      {
        source: "/common-resume-mistakes-fail-ats",
        destination: "/ats-resume-template#common-mistakes",
        permanent: true,
      },
      {
        source: "/common-resume-mistakes-fail-ats/",
        destination: "/ats-resume-template#common-mistakes",
        permanent: true,
      },
      {
        source: "/how-to-pass-ats",
        destination: "/ats-resume-template",
        permanent: true,
      },
      {
        source: "/how-to-pass-ats/",
        destination: "/ats-resume-template",
        permanent: true,
      },
      {
        source: "/ats-keywords-data-scientist-resumes",
        destination: "/data-scientist-resume-guide",
        permanent: true,
      },
      {
        source: "/ats-keywords-data-scientist-resumes/",
        destination: "/data-scientist-resume-guide",
        permanent: true,
      },
      {
        source: "/ats-keywords/:role",
        destination: "/:role-resume-guide",
        permanent: true,
      },
      {
        source: "/ats-resume-checker-free",
        destination: "/ats-resume-checker",
        permanent: true,
      },
      {
        source: "/ats-resume-checker-free/",
        destination: "/ats-resume-checker",
        permanent: true,
      },
      {
        source: "/resume-score-checker",
        destination: "/ats-resume-checker#resume-score-checker",
        permanent: true,
      },
      {
        source: "/resume-score-checker/",
        destination: "/ats-resume-checker#resume-score-checker",
        permanent: true,
      },
      {
        source: "/ats-compatibility-check",
        destination: "/ats-resume-checker#ats-compatibility-check",
        permanent: true,
      },
      {
        source: "/ats-compatibility-check/",
        destination: "/ats-resume-checker#ats-compatibility-check",
        permanent: true,
      },
      // /resume-guides hub + legacy canonical path → /ats-resume-template.
      {
        source: "/resume-guides/ats-resume-template",
        destination: "/ats-resume-template",
        permanent: true,
      },
      {
        source: "/resume-guides/ats-resume-template/",
        destination: "/ats-resume-template",
        permanent: true,
      },
      {
        source: "/resume-guides",
        destination: "/ats-resume-template",
        permanent: true,
      },
      {
        source: "/resume-guides/",
        destination: "/ats-resume-template",
        permanent: true,
      },
      {
        source: "/ats-resume-template-data-analyst",
        destination: "/data-analyst-resume-guide",
        permanent: true,
      },
      {
        source: "/ats-resume-template-data-analyst/",
        destination: "/data-analyst-resume-guide",
        permanent: true,
      },
      {
        source: "/ats-resume-template-product-manager",
        destination: "/product-manager-resume-guide",
        permanent: true,
      },
      {
        source: "/ats-resume-template-product-manager/",
        destination: "/product-manager-resume-guide",
        permanent: true,
      },
      // Legacy /seo/* URLs handled by middleware.ts → /{role}-resume-guide#{topic}
      // Problems intent deduplication (keep only one pillar page per intent)
      {
        source: "/problems/why-am-i-not-getting-interviews",
        destination: "/problems/resume-not-getting-interviews",
        permanent: true,
      },
      {
        source: "/problems/why-am-i-not-getting-interviews/",
        destination: "/problems/resume-not-getting-interviews",
        permanent: true,
      },
      {
        source: "/problems/applied-to-200-jobs-no-response",
        destination: "/problems/no-response-after-applying",
        permanent: true,
      },
      {
        source: "/problems/applied-to-200-jobs-no-response/",
        destination: "/problems/no-response-after-applying",
        permanent: true,
      },
      {
        source: "/problems/resume-not-passing-ats",
        destination: "/problems/ats-rejecting-my-resume",
        permanent: true,
      },
      {
        source: "/problems/resume-not-passing-ats/",
        destination: "/problems/ats-rejecting-my-resume",
        permanent: true,
      },
      {
        source: "/problems/how-to-tailor-resume-to-job-description",
        destination: "/problems/resume-vs-job-description",
        permanent: true,
      },
      {
        source: "/problems/how-to-tailor-resume-to-job-description/",
        destination: "/problems/resume-vs-job-description",
        permanent: true,
      },
      {
        source: "/problems/why-recruiters-ignore-resume",
        destination: "/problems/resume-not-getting-interviews",
        permanent: true,
      },
      {
        source: "/problems/why-recruiters-ignore-resume/",
        destination: "/problems/resume-not-getting-interviews",
        permanent: true,
      },
      {
        source: "/sitemap-resume.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/sitemap-keywords.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
