import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/app/components/Navbar";

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
      </head>
      <body className="antialiased min-h-screen bg-white text-slate-900">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
