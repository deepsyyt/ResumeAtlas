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
    ];
  },
  async redirects() {
    return [
      {
        source: "/ats-keywords-data-scientist-resumes",
        destination: "/data-scientist/keywords",
        permanent: true,
      },
      {
        source: "/ats-keywords-data-scientist-resumes/",
        destination: "/data-scientist/keywords",
        permanent: true,
      },
      {
        source: "/ats-keywords/:role",
        destination: "/:role/keywords",
        permanent: true,
      },
      {
        source: "/ats-resume-checker",
        destination: "/check-resume-against-job-description",
        permanent: true,
      },
      {
        source: "/resume-guides/ats-resume-format",
        destination: "/resume-guides/resume-format-guide#ats-resume-format",
        permanent: true,
      },
      {
        source: "/resume-guides/resume-format-for-ats",
        destination: "/resume-guides/resume-format-guide#resume-format-for-ats",
        permanent: true,
      },
      {
        source: "/resume-guides/best-resume-format-2025",
        destination: "/resume-guides/resume-format-guide#best-resume-format-2025",
        permanent: true,
      },
      {
        source: "/resume-guides/modern-resume-format",
        destination: "/resume-guides/resume-format-guide#modern-resume-format",
        permanent: true,
      },
      {
        source: "/resume-guides/professional-resume-format",
        destination: "/resume-guides/resume-format-guide#professional-resume-format",
        permanent: true,
      },
      {
        source: "/resume-guides/simple-resume-format",
        destination: "/resume-guides/resume-format-guide#simple-resume-format",
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
    ];
  },
};

export default nextConfig;
