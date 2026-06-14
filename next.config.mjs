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

/** High-demand “resume example” pages at `/resume-examples/{slug}` (align with app/lib/resumeExampleClusterPages.ts). */
const RESUME_EXAMPLE_CLUSTER_SLUGS = [
  "data-analyst",
  "software-engineer",
  "product-manager",
  "data-engineer",
  "business-analyst",
  "data-scientist",
  "machine-learning-engineer",
  "devops-engineer",
  "frontend-developer",
  "backend-developer",
];
const RESUME_EXAMPLE_CLUSTER_SET = new Set(RESUME_EXAMPLE_CLUSTER_SLUGS);

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
      // Keyword intent (`/{role}-resume-keywords`) internally serves `/{role}/keywords`.
      {
        source: "/:roleSlug-resume-keywords",
        destination: "/:roleSlug/keywords",
      },
      {
        source: "/:roleSlug-resume-keywords/",
        destination: "/:roleSlug/keywords",
      },
      ...RESUME_BULLET_ROLES.flatMap((role) => [
        {
          source: `/${role}-resume-bullet-points`,
          destination: `/resume-bullet-points/${role}`,
        },
        {
          source: `/${role}-resume-bullet-points/`,
          destination: `/resume-bullet-points/${role}`,
        },
      ]),
      // Role optimizer spokes (`/{slug}-resume-optimizer`) internally serve `/resume-optimizer/{slug}`.
      {
        source: "/:roleSlug-resume-optimizer",
        destination: "/resume-optimizer/:roleSlug",
      },
      {
        source: "/:roleSlug-resume-optimizer/",
        destination: "/resume-optimizer/:roleSlug",
      },
    ];
  },
  async redirects() {
    const pillar = (role) => `/${role}-resume-guide`;

    const pathnameBulletRedirects = RESUME_BULLET_ROLES.flatMap((role) => {
      const hub = `/${role}-resume-bullet-points`;
      return [
        {
          source: `/resume-bullet-points/${role}`,
          destination: hub,
          permanent: true,
        },
        {
          source: `/resume-bullet-points/${role}/`,
          destination: hub,
          permanent: true,
        },
        {
          source: `/resume-bullet-points/${role}/entry-level`,
          destination: `${hub}#level-entry-level`,
          permanent: true,
        },
        {
          source: `/resume-bullet-points/${role}/entry-level/`,
          destination: `${hub}#level-entry-level`,
          permanent: true,
        },
        {
          source: `/resume-bullet-points/${role}/junior`,
          destination: `${hub}#level-junior`,
          permanent: true,
        },
        {
          source: `/resume-bullet-points/${role}/junior/`,
          destination: `${hub}#level-junior`,
          permanent: true,
        },
        {
          source: `/resume-bullet-points/${role}/senior`,
          destination: `${hub}#level-senior`,
          permanent: true,
        },
        {
          source: `/resume-bullet-points/${role}/senior/`,
          destination: `${hub}#level-senior`,
          permanent: true,
        },
      ];
    });

    const hyphenBulletLevelRedirects = RESUME_BULLET_ROLES.flatMap((role) => {
      const hub = `/${role}-resume-bullet-points`;
      return [
        {
          source: `/${role}-resume-bullet-points-entry-level`,
          destination: `${hub}#level-entry-level`,
          permanent: true,
        },
        {
          source: `/${role}-resume-bullet-points-entry-level/`,
          destination: `${hub}#level-entry-level`,
          permanent: true,
        },
        {
          source: `/${role}-resume-bullet-points-junior`,
          destination: `${hub}#level-junior`,
          permanent: true,
        },
        {
          source: `/${role}-resume-bullet-points-junior/`,
          destination: `${hub}#level-junior`,
          permanent: true,
        },
        {
          source: `/${role}-resume-bullet-points-senior`,
          destination: `${hub}#level-senior`,
          permanent: true,
        },
        {
          source: `/${role}-resume-bullet-points-senior/`,
          destination: `${hub}#level-senior`,
          permanent: true,
        },
      ];
    });

    const resumeBulletLegacyTopicRedirects = RESUME_BULLET_ROLES.flatMap((role) => {
      const hub = `/${role}-resume-bullet-points`;
      return [
        {
          source: `/${role}/resume/bullet-points-entry-level`,
          destination: `${hub}#level-entry-level`,
          permanent: true,
        },
        {
          source: `/${role}/resume/bullet-points-entry-level/`,
          destination: `${hub}#level-entry-level`,
          permanent: true,
        },
        {
          source: `/${role}/resume/bullet-points-junior`,
          destination: `${hub}#level-junior`,
          permanent: true,
        },
        {
          source: `/${role}/resume/bullet-points-junior/`,
          destination: `${hub}#level-junior`,
          permanent: true,
        },
        {
          source: `/${role}/resume/bullet-points-senior`,
          destination: `${hub}#level-senior`,
          permanent: true,
        },
        {
          source: `/${role}/resume/bullet-points-senior/`,
          destination: `${hub}#level-senior`,
          permanent: true,
        },
      ];
    });

    const roleKeywordIntentRedirects = ROLE_SLUGS.flatMap((role) =>
      ROLE_KEYWORD_INTENTS.flatMap((intent) => [
        {
          source: `/${role}/keywords/${intent}`,
          destination: `/${role}-resume-keywords#${intent}`,
          permanent: true,
        },
        {
          source: `/${role}/keywords/${intent}/`,
          destination: `/${role}-resume-keywords#${intent}`,
          permanent: true,
        },
      ]),
    );

    const roleKeywordsHubRedirects = ROLE_SLUGS.flatMap((role) => [
      {
        source: `/${role}/keywords`,
        destination: `/${role}-resume-keywords`,
        permanent: true,
      },
      {
        source: `/${role}/keywords/`,
        destination: `/${role}-resume-keywords`,
        permanent: true,
      },
    ]);

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
      ];
    });

    const resumeGuideTopicRedirects = ROLE_SLUGS.flatMap((role) => {
      const topics = [
        "bullet-points",
        "skills",
        "summary",
        "projects",
        "responsibilities",
        "experience-examples",
      ];
      const bulletHubSet = new Set(RESUME_BULLET_ROLES);
      return topics.flatMap((topic) => {
        const destination =
          topic === "bullet-points" && bulletHubSet.has(role)
            ? `/${role}-resume-bullet-points`
            : `${pillar(role)}#${topic}`;
        return [
          {
            source: `/${role}/resume/${topic}`,
            destination,
            permanent: true,
          },
          {
            source: `/${role}/resume/${topic}/`,
            destination,
            permanent: true,
          },
        ];
      });
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

    const legacyHyphenExampleRedirects = [
      ...ROLE_SLUGS.flatMap((role) => {
        const destination = RESUME_EXAMPLE_CLUSTER_SET.has(role)
          ? `/resume-examples/${role}`
          : pillar(role);
        return [
          {
            source: `/${role}-resume-example`,
            destination,
            permanent: true,
          },
          {
            source: `/${role}-resume-example/`,
            destination,
            permanent: true,
          },
        ];
      }),
      {
        source: "/data-engineer-resume-example",
        destination: "/resume-examples/data-engineer",
        permanent: true,
      },
      {
        source: "/data-engineer-resume-example/",
        destination: "/resume-examples/data-engineer",
        permanent: true,
      },
    ];

    const seoBulletRedirects = ROLE_SLUGS.flatMap((role) => [
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

    const legacyThinPageRedirects = [
      {
        source: "/data-analyst-sql-resume-keywords",
        destination: "/data-analyst-resume-keywords",
        permanent: true,
      },
      {
        source: "/data-analyst-sql-resume-keywords/",
        destination: "/data-analyst-resume-keywords",
        permanent: true,
      },
      {
        source: "/tableau-data-analyst-resume-example",
        destination: "/data-analyst-resume-guide",
        permanent: true,
      },
      {
        source: "/tableau-data-analyst-resume-example/",
        destination: "/data-analyst-resume-guide",
        permanent: true,
      },
      {
        source: "/ats-resume-template-software-engineer",
        destination: "/ats-resume-template",
        permanent: true,
      },
      {
        source: "/ats-resume-template-software-engineer/",
        destination: "/ats-resume-template",
        permanent: true,
      },
    ];

    return [
      ...pathnameBulletRedirects,
      ...hyphenBulletLevelRedirects,
      ...resumeBulletLegacyTopicRedirects,
      ...resumeTemplateToPillarRedirects,
      ...roleKeywordIntentRedirects,
      ...roleHubRedirects,
      ...standaloneRoleHubToPillarRedirects,
      ...roleKeywordsHubRedirects,
      ...legacyHyphenExampleRedirects,
      ...seoBulletRedirects,
      ...legacyThinPageRedirects,
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
        destination: "/#tailor-resume-jd",
        permanent: true,
      },
      {
        source: "/match-resume-to-job-description/",
        destination: "/#tailor-resume-jd",
        permanent: true,
      },
      {
        source: "/resume-match-score",
        destination: "/#resume-match-score",
        permanent: true,
      },
      {
        source: "/resume-match-score/",
        destination: "/#resume-match-score",
        permanent: true,
      },
      {
        source: "/resume-job-description-match",
        destination: "/#jd-match-example",
        permanent: true,
      },
      {
        source: "/resume-job-description-match/",
        destination: "/#jd-match-example",
        permanent: true,
      },
      {
        source: "/resume-keywords-scanner",
        destination: "/resume-keyword-scanner",
        permanent: true,
      },
      {
        source: "/resume-keywords-scanner/",
        destination: "/resume-keyword-scanner",
        permanent: true,
      },
      {
        source: "/keyword-scanner",
        destination: "/resume-keyword-scanner",
        permanent: true,
      },
      {
        source: "/keyword-scanner/",
        destination: "/resume-keyword-scanner",
        permanent: true,
      },
      {
        source: "/compare-resume-to-job-description",
        destination: "/#compare-resume-jd",
        permanent: true,
      },
      {
        source: "/compare-resume-to-job-description/",
        destination: "/#compare-resume-jd",
        permanent: true,
      },
      {
        source: "/tailor-resume-to-job-description",
        destination: "/optimize-resume-for-job-description",
        permanent: true,
      },
      {
        source: "/tailor-resume-to-job-description/",
        destination: "/optimize-resume-for-job-description",
        permanent: true,
      },
      {
        source: "/job-description-keyword-finder",
        destination: "/resume-keyword-scanner",
        permanent: true,
      },
      {
        source: "/job-description-keyword-finder/",
        destination: "/resume-keyword-scanner",
        permanent: true,
      },
      {
        source: "/resume-keyword-checker",
        destination: "/resume-keyword-scanner",
        permanent: true,
      },
      {
        source: "/resume-keyword-checker/",
        destination: "/resume-keyword-scanner",
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
        source: "/ats-keywords",
        destination: "/resume-keywords",
        permanent: true,
      },
      {
        source: "/ats-keywords/",
        destination: "/resume-keywords",
        permanent: true,
      },
      {
        source: "/ats-keywords-data-scientist-resumes",
        destination: "/data-scientist-resume-keywords",
        permanent: true,
      },
      {
        source: "/ats-keywords-data-scientist-resumes/",
        destination: "/data-scientist-resume-keywords",
        permanent: true,
      },
      {
        source: "/ats-keywords/:role",
        destination: "/:role-resume-keywords",
        permanent: true,
      },
      {
        source: "/ats-keywords/:role/",
        destination: "/:role-resume-keywords",
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
        destination: "/ats-resume-checker#how-ats-scoring-works",
        permanent: true,
      },
      {
        source: "/resume-score-checker/",
        destination: "/ats-resume-checker#how-ats-scoring-works",
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
        source: "/resume-guides/ats-friendly-resume-example",
        destination: "/ats-resume-template",
        permanent: true,
      },
      {
        source: "/resume-guides/ats-friendly-resume-example/",
        destination: "/ats-resume-template",
        permanent: true,
      },
      {
        source: "/resume-guides/resume-format-guide",
        destination: "/ats-resume-template",
        permanent: true,
      },
      {
        source: "/resume-guides/resume-format-guide/",
        destination: "/ats-resume-template",
        permanent: true,
      },
      {
        source: "/resume-guides/resume-template-for-job-application",
        destination: "/ats-resume-template",
        permanent: true,
      },
      {
        source: "/resume-guides/resume-template-for-job-application/",
        destination: "/ats-resume-template",
        permanent: true,
      },
      {
        source: "/resume-guides/resume-projects-examples",
        destination: "/resume-guides/resume-work-experience-examples",
        permanent: true,
      },
      {
        source: "/resume-guides/resume-projects-examples/",
        destination: "/resume-guides/resume-work-experience-examples",
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
      {
        source: "/business-systems-analyst-resume-keywords",
        destination: "/business-analyst-resume-keywords#business-systems-analyst-keywords",
        permanent: true,
      },
      {
        source: "/business-systems-analyst-resume-keywords/",
        destination: "/business-analyst-resume-keywords#business-systems-analyst-keywords",
        permanent: true,
      },
      {
        source: "/how-it-works",
        destination: "/check-resume-against-job-description",
        permanent: true,
      },
      {
        source: "/how-it-works/",
        destination: "/check-resume-against-job-description",
        permanent: true,
      },
      // Legacy /seo/* and /{role}/keywords/* handled by middleware.ts
      {
        source: "/problems",
        destination: "/problems/resume-not-getting-interviews",
        permanent: true,
      },
      {
        source: "/problems/",
        destination: "/problems/resume-not-getting-interviews",
        permanent: true,
      },
      {
        source: "/problems/resume-vs-job-description",
        destination: "/",
        permanent: true,
      },
      {
        source: "/problems/resume-vs-job-description/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/problems/missing-keywords-in-resume",
        destination: "/problems/ats-rejecting-my-resume",
        permanent: true,
      },
      {
        source: "/problems/missing-keywords-in-resume/",
        destination: "/problems/ats-rejecting-my-resume",
        permanent: true,
      },
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
        destination: "/",
        permanent: true,
      },
      {
        source: "/problems/how-to-tailor-resume-to-job-description/",
        destination: "/",
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
