"use client";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-black text-white border-b border-slate-800">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.location.href = "/";
            }
          }}
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/80">
            <span className="h-3 w-3 rotate-12 border-l border-b border-white" />
          </span>
          <span className="text-base sm:text-lg font-semibold tracking-tight">
            ResumeAtlas
          </span>
        </div>
        <nav className="flex items-center gap-4 text-xs sm:text-sm">
          <a href="/#how-ats-works" className="hover:underline text-white/80 hover:text-white">
            How ATS Works
          </a>
          <a href="/#faq" className="hover:underline text-white/80 hover:text-white">
            FAQ
          </a>
          <a href="/" className="hover:underline text-white/80 hover:text-white">
            ATS Resume Checker
          </a>
        </nav>
      </div>
    </header>
  );
}

