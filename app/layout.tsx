import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/app/components/Navbar";
import Script from "next/script";
import { getSiteUrl } from "@/app/lib/siteUrl";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Free ATS Score | Fix Your Resume for This Job | ResumeAtlas",
  description:
    "Get your ATS score free. See missing keywords and fix your resume for this job. Compare with any job description and get shortlisted.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="nVipZLHPjFdz1zlYGhXBFHWv4lW7C6MJY1sWfRXjZPo"
        />
        <link
          rel="canonical"
          href={`${siteUrl}/`}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-64KDQ28C42"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-64KDQ28C42');
          `}
        </Script>
      </head>
      <body className="antialiased min-h-screen bg-white text-slate-900">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
