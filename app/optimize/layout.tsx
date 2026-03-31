import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume Optimization Workspace | ResumeAtlas",
  description: "Review, edit, and download your optimized resume inside ResumeAtlas.",
  alternates: {
    canonical: "/optimize",
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Resume Optimization Workspace | ResumeAtlas",
    description: "Review, edit, and download your optimized resume inside ResumeAtlas.",
    url: "/optimize",
    type: "website",
    images: [
      {
        url: "/og-resume-checker.png",
        width: 1200,
        height: 630,
        alt: "ResumeAtlas optimization workspace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume Optimization Workspace | ResumeAtlas",
    description: "Review, edit, and download your optimized resume inside ResumeAtlas.",
    images: ["/og-resume-checker.png"],
  },
};

export default function OptimizeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
