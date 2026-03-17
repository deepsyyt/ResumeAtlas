"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/app/lib/supabase/client";

type UserProfile = {
  email: string | null;
  name: string | null;
};

export function Navbar() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

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
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-2.5 py-1">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-[11px] font-semibold text-slate-900">
                {initials}
              </span>
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="text-[11px] font-medium text-white">
                  {profile.name || "Account"}
                </span>
                {profile.email && (
                  <span className="text-[10px] text-white/70 truncate max-w-[160px]" title={profile.email}>
                    {profile.email}
                  </span>
                )}
              </div>
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



