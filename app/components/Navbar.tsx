"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/app/lib/supabase/client";

type UserProfile = {
  email: string | null;
  name: string | null;
};

export function Navbar() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
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

  const initials =
    profile?.name?.trim()?.split(/\s+/).map((p) => p[0]?.toUpperCase() ?? "").join("").slice(0, 2) ||
    (profile?.email ? profile.email[0]?.toUpperCase() : undefined) ||
    "?";

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
          {profile ? (
            <div className="relative" ref={accountMenuRef}>
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
                  className="h-4 w-4 text-white/70 group-hover:text-white/90 transition"
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
                  className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-slate-800 bg-slate-950/95 shadow-2xl backdrop-blur"
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
            <a
              href="/upgrade"
              className="inline-flex items-center rounded-full bg-white text-black px-3 py-1 text-[11px] font-semibold hover:bg-slate-100"
            >
              Sign in with Google
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}



