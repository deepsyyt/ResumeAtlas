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
  "data-scientist",
  "software-engineer",
  "product-manager",
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
      // Canonical keyword hub moved to `/{role}-resume-keywords` (served by existing `/{role}/keywords` page).
      {
        source: "/:roleSlug-resume-keywords",
        destination: "/:roleSlug/keywords",
      },
      {
        source: "/:roleSlug-resume-keywords/",
        destination: "/:roleSlug/keywords",
      },
      // Canonical resume guide moved to `/{role}-resume-guide` (served by existing `/{role}/resume-guide` page).
      {
        source: "/:roleSlug-resume-guide",
        destination: "/:roleSlug/resume-guide",
      },
      {
        source: "/:roleSlug-resume-guide/",
        destination: "/:roleSlug/resume-guide",
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
        {
          source: `/${role}-resume-bullet-points-entry-level`,
          destination: `/resume-bullet-points/${role}/entry-level`,
        },
        {
          source: `/${role}-resume-bullet-points-junior`,
          destination: `/resume-bullet-points/${role}/junior`,
        },
        {
          source: `/${role}-resume-bullet-points-senior`,
          destination: `/resume-bullet-points/${role}/senior`,
        },
      ]),
    ];
  },
  async redirects() {
    const roleHubRedirects = ROLE_SLUGS.flatMap((role) => [
      {
        source: `/${role}-resume-example`,
        destination: `/${role}`,
        permanent: true,
      },
      {
        source: `/${role}-resume-example/`,
        destination: `/${role}`,
        permanent: true,
      },
      {
        source: `/${role}/resume`,
        destination: `/${role}`,
        permanent: true,
      },
      {
        source: `/${role}/resume/`,
        destination: `/${role}`,
        permanent: true,
      },
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

    const resumeBulletCanonicalRedirects = RESUME_BULLET_ROLES.flatMap((role) => [
      {
        source: `/resume-bullet-points/${role}`,
        destination: `/${role}-resume-bullet-points`,
        permanent: true,
      },
      {
        source: `/resume-bullet-points/${role}/`,
        destination: `/${role}-resume-bullet-points`,
        permanent: true,
      },
      {
        source: `/resume-bullet-points/${role}/entry-level`,
        destination: `/${role}-resume-bullet-points-entry-level`,
        permanent: true,
      },
      {
        source: `/resume-bullet-points/${role}/junior`,
        destination: `/${role}-resume-bullet-points-junior`,
        permanent: true,
      },
      {
        source: `/resume-bullet-points/${role}/senior`,
        destination: `/${role}-resume-bullet-points-senior`,
        permanent: true,
      },
    ]);

    const resumeGuideTopicRedirects = ROLE_SLUGS.flatMap((role) => {
      const topics = [
        "bullet-points",
        "skills",
        "summary",
        "projects",
      ];
      return topics.flatMap((topic) => [
        {
          source: `/${role}/resume/${topic}`,
          destination: `/${role}-resume-guide#${topic}`,
          permanent: true,
        },
        {
          source: `/${role}/resume/${topic}/`,
          destination: `/${role}-resume-guide#${topic}`,
          permanent: true,
        },
      ]);
    });
    return [
      ...resumeBulletCanonicalRedirects,
      ...roleHubRedirects,
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
        source: "/how-ats-scans-resumes",
        destination: "/how-to-pass-ats#how-ats-scans-resumes",
        permanent: true,
      },
      {
        source: "/how-ats-scans-resumes/",
        destination: "/how-to-pass-ats#how-ats-scans-resumes",
        permanent: true,
      },
      {
        source: "/common-resume-mistakes-fail-ats",
        destination: "/how-to-pass-ats#common-resume-mistakes-fail-ats",
        permanent: true,
      },
      {
        source: "/common-resume-mistakes-fail-ats/",
        destination: "/how-to-pass-ats#common-resume-mistakes-fail-ats",
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
      // Retired thin /resume-guides/* — consolidate to main ATS guide for GSC (301).
      {
        source: "/resume-guides",
        destination: "/how-to-pass-ats",
        permanent: true,
      },
      {
        source: "/resume-guides/",
        destination: "/how-to-pass-ats",
        permanent: true,
      },
      {
        source: "/resume-guides/:path*",
        destination: "/how-to-pass-ats",
        permanent: true,
      },
      {
        source: "/seo/bullet-points-:role-resume",
        destination: "/:role/resume/bullet-points",
        permanent: true,
      },
      {
        source:
          "/seo/:role-resume-:topic(skills|summary|responsibilities|projects|experience-examples)",
        destination: "/:role/resume/:topic",
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
    ];
  },
};

export default nextConfig;
