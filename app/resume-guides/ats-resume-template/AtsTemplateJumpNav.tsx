import Link from "next/link";

const LINKS = [
  { href: "#ats-template-hero", label: "Template" },
  { href: "#ats-template-downloads", label: "Downloads" },
  { href: "#ats-resume-template-examples", label: "Examples" },
  { href: "#ats-resume-format", label: "Format" },
  { href: "#ats-resume-keywords-examples", label: "Keywords" },
  { href: "#faq", label: "FAQ" },
  { href: "#ats-resume-checker-tool", label: "ATS check" },
] as const;

export function AtsTemplateJumpNav() {
  return (
    <nav
      aria-label="Jump to sections"
      className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 py-2.5 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-white/80"
    >
      <div className="mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-4 sm:px-6 lg:px-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-800 transition hover:border-slate-300 hover:bg-white sm:text-sm"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
