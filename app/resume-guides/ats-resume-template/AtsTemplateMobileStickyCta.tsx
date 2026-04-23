"use client";

export function AtsTemplateMobileStickyCta({ docxHref }: { docxHref: string }) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/98 p-3 shadow-[0_-8px_30px_rgba(15,23,42,0.12)] backdrop-blur-sm lg:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <a
        href={docxHref}
        download
        className="flex w-full items-center justify-center rounded-xl bg-slate-900 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Download template
      </a>
    </div>
  );
}
