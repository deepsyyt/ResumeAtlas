/** @type {import('next').NextConfig} */
const nextConfig = {
  // Avoid EPERM on .next when project is in OneDrive (use a separate build dir)
  distDir: process.env.NODE_ENV === "development" ? "nextbuild" : ".next",
  async redirects() {
    return [
      {
        source: "/ats-resume-checker",
        destination: "/",
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
    ];
  },
};

export default nextConfig;
