import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { ProblemInterviewCallout } from "@/app/components/ProblemInterviewCallout";
import Script from "next/script";
import { getSiteUrl } from "@/app/lib/siteUrl";

const siteUrl = getSiteUrl();
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: "ResumeAtlas",
  url: siteUrl,
  publisher: { "@id": `${siteUrl}/#organization` },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "ResumeAtlas",
  url: siteUrl,
  logo: `${siteUrl}/favicon.svg`,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "ResumeAtlas",
  manifest: "/manifest.webmanifest",
  title: "Free AI Resume Optimizer & ATS Checker | ResumeAtlas",
  description:
    "100% free AI resume optimizer and ATS resume checker. Compare your resume to any job description, find missing keywords, and optimize bullets instantly. No signup.",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Free AI Resume Optimizer & ATS Checker | ResumeAtlas",
    description:
      "100% free: compare resume to job description, ATS match score, missing keywords, and AI resume optimization. Paste only, instant results.",
    siteName: "ResumeAtlas",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
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
      <body className="flex min-h-screen flex-col antialiased bg-white text-slate-900">
        <Navbar />
        <main className="flex flex-1 flex-col pb-16">{children}</main>
        <ProblemInterviewCallout />
        <Footer />
      </body>
    </html>
  );
}
