import Link from "next/link";
import { CHECK_RESUME_AGAINST_JD_PATH } from "@/app/lib/internalLinks";

const FOOTER_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/feedback", label: "Feedback" },
  { href: "/contact", label: "Contact" },
] as const;

const TOOL_LINKS = [
  {
    href: CHECK_RESUME_AGAINST_JD_PATH,
    label: "Check resume against job description",
  },
  { href: "/resume-keyword-scanner", label: "Resume keyword scanner" },
  { href: "/ats-resume-checker", label: "ATS resume checker" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-black">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:justify-between lg:gap-12">
          <div className="max-w-md">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Tools
            </p>
            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {TOOL_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-slate-300 hover:text-white transition"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm lg:justify-end">
            {FOOTER_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-slate-400 hover:text-white transition"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
