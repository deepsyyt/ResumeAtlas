import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/app/components/Navbar";

export const metadata: Metadata = {
  title: "Free ATS Resume Checker | AI Resume Analysis & Job Match – ResumeAtlas",
  description:
    "Analyze your resume with our free ATS resume checker. Get ATS compatibility score, job description match, and keyword gap analysis instantly. No login required.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-white text-slate-900">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
