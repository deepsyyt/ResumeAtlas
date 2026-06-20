"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  alignSupabaseOAuthAuthorizeUrl,
  buildAuthCallbackRedirectTo,
} from "@/app/lib/auth/redirect";
import {
  beginPendingAuthFlow,
  clearPendingAuthFlow,
} from "@/app/lib/auth/pendingAuthFlow";
import { createClient } from "@/app/lib/supabase/client";
import { ShareFriendsCta } from "@/app/components/ShareFriendsCta";
import {
  CHECK_RESUME_AGAINST_JD_HERO_CTA,
  CHECK_RESUME_AGAINST_JD_PATH,
  HOME_MARKETING_PATH,
  PRIMARY_TOOL_NAV_LABEL,
  PRIMARY_TOOL_NAV_LABEL_SHORT,
} from "@/app/lib/internalLinks";

type UserProfile = {
  email: string | null;
  name: string | null;
};

function navLinkClass(active: boolean) {
  return active
    ? "font-semibold text-slate-900"
    : "font-medium text-slate-600 hover:text-slate-900 transition";
}

export function Navbar() {
  const pathname = usePathname();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [googleAuthStarting, setGoogleAuthStarting] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement | null>(null);

  const isHome = pathname === HOME_MARKETING_PATH;
  const isTool =
    pathname === CHECK_RESUME_AGAINST_JD_PATH ||
    pathname === `${CHECK_RESUME_AGAINST_JD_PATH}/`;
  const isFaq = pathname === "/faq" || pathname === "/faq/";

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
      if (typeof window !== "undefined") window.location.href = HOME_MARKETING_PATH;
    }
  };

  const handleSignInWithGoogle = async () => {
    const supabase = createClient();
    setGoogleAuthStarting(true);
    beginPendingAuthFlow("navbar");
    try {
      const redirectTo = buildAuthCallbackRedirectTo(pathname || HOME_MARKETING_PATH);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo },
      });
      if (error) throw error;
      if (data?.url) {
        window.location.assign(alignSupabaseOAuthAuthorizeUrl(data.url, redirectTo));
      }
    } catch (e) {
      clearPendingAuthFlow();
      console.error("Google sign-in failed", e);
      setGoogleAuthStarting(false);
    }
  };

  const initials =
    profile?.name?.trim()?.split(/\s+/).map((p) => p[0]?.toUpperCase() ?? "").join("").slice(0, 2) ||
    (profile?.email ? profile.email[0]?.toUpperCase() : undefined) ||
    "?";

  const authUi = profile ? (
    <div className="relative shrink-0" ref={accountMenuRef}>
      <button
        type="button"
        onClick={() => setAccountMenuOpen((v) => !v)}
        className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-1.5 text-[11px] font-semibold text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
        aria-haspopup="menu"
        aria-expanded={accountMenuOpen}
      >
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-[11px] font-bold text-white">
          {initials}
        </span>
        <span className="hidden sm:flex flex-col items-start leading-tight">
          <span className="max-w-[140px] truncate text-[11px] font-semibold text-slate-900">
            {profile.name || "Account"}
          </span>
          {profile.email && (
            <span
              className="max-w-[140px] truncate text-[10px] font-medium text-slate-500"
              title={profile.email}
            >
              {profile.email}
            </span>
          )}
        </span>
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
          className="hidden sm:block h-4 w-4 text-slate-400 group-hover:text-slate-600 transition"
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
          className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg z-50"
        >
          <div className="px-3 py-2">
            <p className="text-[11px] font-semibold text-slate-900">{profile.name || "Account"}</p>
            {profile.email && (
              <p className="mt-0.5 text-[10px] text-slate-500 truncate">{profile.email}</p>
            )}
          </div>
          <div className="h-px bg-slate-100" />
          <button
            type="button"
            role="menuitem"
            onClick={() => void handleSignOut()}
            className="w-full px-3 py-2 text-left text-[11px] font-semibold text-slate-700 hover:bg-slate-50 transition"
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
      className="inline-flex shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50 disabled:opacity-60 sm:px-4 sm:text-sm"
    >
      {googleAuthStarting ? "Redirecting…" : "Log in"}
    </button>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-[#f4f7fc]/90 text-slate-900 backdrop-blur-md supports-[backdrop-filter]:bg-[#f4f7fc]/80">
      <div className="page-shell flex h-14 items-center justify-between gap-2 sm:gap-3">
        <Link href={HOME_MARKETING_PATH} className="flex min-w-0 items-center gap-2">
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-slate-50">
            <span className="h-3 w-3 rotate-12 border-l border-b border-slate-800" />
          </span>
          <span className="truncate text-base font-semibold tracking-tight text-slate-900 sm:text-lg">
            ResumeAtlas
          </span>
        </Link>

        <nav
          className="hidden items-center gap-5 md:flex lg:gap-6"
          aria-label="Primary"
        >
          <Link href={HOME_MARKETING_PATH} className={`text-sm ${navLinkClass(isHome)}`}>
            Home
          </Link>
          <Link href={CHECK_RESUME_AGAINST_JD_PATH} className={`text-sm ${navLinkClass(isTool)}`}>
            <span className="hidden xl:inline">{PRIMARY_TOOL_NAV_LABEL}</span>
            <span className="xl:hidden">{PRIMARY_TOOL_NAV_LABEL_SHORT}</span>
          </Link>
          <Link href="/faq" className={`text-sm ${navLinkClass(isFaq)}`}>
            FAQ
          </Link>
          <ShareFriendsCta layout="nav" />
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <span className="md:hidden">
            <ShareFriendsCta layout="nav" />
          </span>
          <Link
            href={CHECK_RESUME_AGAINST_JD_PATH}
            className="hidden rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800 sm:inline-flex sm:text-sm"
          >
            {CHECK_RESUME_AGAINST_JD_HERO_CTA}
          </Link>
          <Link
            href={CHECK_RESUME_AGAINST_JD_PATH}
            className="inline-flex rounded-full bg-slate-900 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800 sm:hidden"
          >
            {PRIMARY_TOOL_NAV_LABEL_SHORT}
          </Link>
          {authUi}
        </div>
      </div>
    </header>
  );
}
