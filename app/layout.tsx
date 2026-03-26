import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { ProblemInterviewCallout } from "@/app/components/ProblemInterviewCallout";
import Script from "next/script";
import { getSiteUrl } from "@/app/lib/siteUrl";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title:
    "ResumeAtlas | AI-Powered ATS Resume Checker & Job Description Match",
  description:
    "ResumeAtlas is an AI-powered ATS resume checker: compare your resume with job descriptions, get your ATS score, and optimize for specific roles. Paste, edit, export PDF or DOCX.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
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
        <main className="pb-16">{children}</main>
        <ProblemInterviewCallout />
        <Footer />
      </body>
    </html>
  );
}
