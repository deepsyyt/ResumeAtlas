import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Footer } from "@/app/components/Footer";
import { Navbar } from "@/app/components/Navbar";
import { ProblemInterviewCallout } from "@/app/components/ProblemInterviewCallout";
import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/app/lib/gaConfig";
import { HOME_PAGE_DESCRIPTION, HOME_PAGE_TITLE_ABSOLUTE } from "@/app/lib/homePageSeo";
import { getSiteUrl } from "@/app/lib/siteUrl";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

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
  title: HOME_PAGE_TITLE_ABSOLUTE,
  description: HOME_PAGE_DESCRIPTION,
  openGraph: {
    type: "website",
    url: siteUrl,
    title: HOME_PAGE_TITLE_ABSOLUTE,
    description: HOME_PAGE_DESCRIPTION,
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
    <html lang="en" className={plusJakarta.variable}>
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
        {/* Sync stub so client components can queue events before gtag.js loads */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `,
          }}
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
      </head>
      <body className="flex min-h-screen flex-col bg-[#f4f7fc] font-sans text-slate-900 antialiased">
        <Navbar />
        <main className="flex flex-1 flex-col pb-16">{children}</main>
        <ProblemInterviewCallout />
        <Footer />
      </body>
    </html>
  );
}
