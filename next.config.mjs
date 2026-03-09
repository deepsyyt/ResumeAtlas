/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/ats-resume-checker",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
