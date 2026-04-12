"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  alignSupabaseOAuthAuthorizeUrl,
  buildAuthCallbackRedirectTo,
} from "@/app/lib/auth/redirect";
import { createClient } from "@/app/lib/supabase/client";

type UserProfile = {
  email: string | null;
  name: string | null;
};

export function Navbar() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [googleAuthStarting, setGoogleAuthStarting] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setProfile({
          email: session.user.email ?? null,
          name:
            (session.user.user_metadata?.full_name as string | undefined) ??
            (session.user.user_metadata?.name as string | undefined) ??
            null,
        });
      } else {
        setProfile(null);
      }
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setProfile({
          email: session.user.email ?? null,
          name:
            (session.user.user_metadata?.full_name as string | undefined) ??
            (session.user.user_metadata?.name as string | undefined) ??
            null,
        });
      } else {
        setProfile(null);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileNavOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileNavOpen]);

  useEffect(() => {
    if (!accountMenuOpen) return;
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const el = accountMenuRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) {
        setAccountMenuOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAccountMenuOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown, { passive: true });
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [accountMenuOpen]);

  const handleSignOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } finally {
      if (typeof window !== "undefined") window.location.href = "/";
    }
  };

  const handleSignInWithGoogle = async () => {
    const supabase = createClient();
    setGoogleAuthStarting(true);
    try {
      const redirectTo = buildAuthCallbackRedirectTo("/");
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo },
      });
      if (error) throw error;
      if (data?.url) {
        window.location.assign(
          alignSupabaseOAuthAuthorizeUrl(data.url, redirectTo)
        );
      }
    } catch (e) {
      console.error("Google sign-in failed", e);
      setGoogleAuthStarting(false);
    }
  };

  const initials =
    profile?.name?.trim()?.split(/\s+/).map((p) => p[0]?.toUpperCase() ?? "").join("").slice(0, 2) ||
    (profile?.email ? profile.email[0]?.toUpperCase() : undefined) ||
    "?";

  const closeMobileNav = () => setMobileNavOpen(false);

  const desktopNavLinkClass =
    "hover:underline text-white/80 hover:text-white whitespace-nowrap";
  const mobileNavLinkClass =
    "block rounded-lg px-3 py-3.5 text-base font-medium text-white/90 hover:bg-white/10 active:bg-white/15 transition";

  const authUi = profile ? (
    <div className="relative shrink-0" ref={accountMenuRef}>
      <button
        type="button"
        onClick={() => setAccountMenuOpen((v) => !v)}
        className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1.5 text-[11px] font-semibold text-white/90 hover:bg-white/10 hover:text-white transition"
        aria-haspopup="menu"
        aria-expanded={accountMenuOpen}
      >
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-[11px] font-bold text-slate-900">
          {initials}
        </span>
        <span className="hidden sm:flex flex-col items-start leading-tight">
          <span className="max-w-[160px] truncate text-[11px] font-semibold text-white">
            {profile.name || "Account"}
          </span>
          {profile.email && (
            <span className="max-w-[160px] truncate text-[10px] font-medium text-white/70" title={profile.email}>
              {profile.email}
            </span>
          )}
        </span>
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className="hidden sm:block h-4 w-4 text-white/70 group-hover:text-white/90 transition"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.24 4.5a.75.75 0 0 1-1.08 0l-4.24-4.5a.75.75 0 0 1 .02-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {accountMenuOpen && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-slate-800 bg-slate-950/95 shadow-2xl backdrop-blur z-50"
        >
          <div className="px-3 py-2">
            <p className="text-[11px] font-semibold text-white">
              {profile.name || "Account"}
            </p>
            {profile.email && (
              <p className="mt-0.5 text-[10px] text-white/70 truncate">
                {profile.email}
              </p>
            )}
          </div>
          <div className="h-px bg-white/10" />
          <button
            type="button"
            role="menuitem"
            onClick={() => void handleSignOut()}
            className="w-full px-3 py-2 text-left text-[11px] font-semibold text-white/90 hover:bg-white/10 transition"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  ) : (
    <button
      type="button"
      onClick={() => void handleSignInWithGoogle()}
      disabled={googleAuthStarting}
      className="inline-flex shrink-0 items-center justify-center rounded-full bg-white text-black px-2.5 py-1.5 text-[11px] font-semibold leading-tight hover:bg-slate-100 disabled:opacity-60 sm:px-3 sm:py-1 sm:text-xs"
    >
      {googleAuthStarting ? (
        <>
          <span className="inline sm:hidden">…</span>
          <span className="hidden sm:inline">Redirecting…</span>
        </>
      ) : (
        <>
          <span className="inline sm:hidden">Sign in</span>
          <span className="hidden sm:inline">Sign in with Google</span>
        </>
      )}
    </button>
  );

  return (
    <header className="sticky top-0 z-40 bg-black text-white border-b border-slate-800">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-2 px-3 sm:px-6 lg:px-8">
        <div
          className="flex min-w-0 items-center gap-2 cursor-pointer"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.location.href = "/";
            }
          }}
        >
          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/80">
            <span className="h-3 w-3 rotate-12 border-l border-b border-white" />
          </span>
          <span className="truncate text-base sm:text-lg font-semibold tracking-tight">
            ResumeAtlas
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 lg:gap-3">
          <nav
            className="hidden lg:flex flex-wrap items-center justify-end gap-x-3 gap-y-1 text-sm"
            aria-label="Primary"
          >
            <Link
              href="/check-resume-against-job-description"
              className={desktopNavLinkClass}
              title="Check resume against job description"
            >
              Check resume vs job description
            </Link>
            <Link
              href="/ats-resume-checker"
              className={desktopNavLinkClass}
              title="ATS resume checker"
            >
              ATS resume checker
            </Link>
            <Link
              href="/resume-keyword-scanner"
              className={desktopNavLinkClass}
              title="Resume keyword scanner"
            >
              Keyword scanner
            </Link>
            <a href="/#how-ats-works" className={desktopNavLinkClass}>
              How ATS Works
            </a>
            <a href="/#faq" className={desktopNavLinkClass}>
              FAQ
            </a>
          </nav>
          {authUi}
          <button
            type="button"
            className="inline-flex lg:hidden h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-white hover:bg-white/10 transition"
            aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileNavOpen}
            aria-controls="site-mobile-nav"
            onClick={() => {
              setAccountMenuOpen(false);
              setMobileNavOpen((o) => !o);
            }}
          >
            {mobileNavOpen ? (
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileNavOpen ? (
        <div className="lg:hidden fixed inset-0 top-14 z-50 flex flex-col bg-black/60 backdrop-blur-sm">
          <button
            type="button"
            className="flex-1 min-h-[3rem] w-full cursor-default"
            aria-label="Close menu"
            onClick={closeMobileNav}
          />
          <nav
            id="site-mobile-nav"
            className="max-h-[min(70vh,calc(100dvh-3.5rem))] overflow-y-auto border-t border-white/10 bg-slate-950 px-3 py-2 shadow-2xl"
            aria-label="Mobile primary"
          >
            <Link
              href="/check-resume-against-job-description"
              className={mobileNavLinkClass}
              onClick={closeMobileNav}
            >
              Check resume vs job description
            </Link>
            <Link href="/ats-resume-checker" className={mobileNavLinkClass} onClick={closeMobileNav}>
              ATS resume checker
            </Link>
            <Link href="/resume-keyword-scanner" className={mobileNavLinkClass} onClick={closeMobileNav}>
              Keyword scanner
            </Link>
            <a href="/#how-ats-works" className={mobileNavLinkClass} onClick={closeMobileNav}>
              How ATS Works
            </a>
            <a href="/#faq" className={mobileNavLinkClass} onClick={closeMobileNav}>
              FAQ
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}



