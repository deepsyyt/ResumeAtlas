import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/app/components/Navbar";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Free ATS Resume Checker | ResumeAtlas",
  description:
    "Check your ATS resume score instantly. Compare your resume with any job description, detect missing skills, and improve your chances of getting shortlisted.",
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
          content="6hHUXSk_KNQSRBmZaIjbLOfdXNkoom0SLOLQs4KAOo4"
        />
        <link
          rel="canonical"
          href="https://resumeatlas.ai-stack.dev/"
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
