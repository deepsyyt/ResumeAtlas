"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/app/lib/supabase/client";
export default function UpgradePage() {
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ? { email: session.user.email ?? undefined } : null);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ? { email: session.user.email ?? undefined } : null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${typeof window !== "undefined" ? window.location.origin : ""}/auth/callback?next=/upgrade` },
    });
  };

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-2xl mx-auto px-8 py-12">
        <a href="/" className="text-sm text-slate-600 hover:text-slate-900">
          ← Back to ResumeAtlas
        </a>
        <h1 className="mt-8 text-2xl font-semibold tracking-tight text-slate-900">
          Upgrade to Pro
        </h1>
        <p className="mt-2 text-slate-600">
          25 resume generations and 25 summary re-optimizations per month. Full Intelligence Panel.
        </p>

        {!user ? (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-800">Sign in with Google to upgrade</p>
            <button
              type="button"
              onClick={signInWithGoogle}
              className="mt-4 w-full rounded-xl bg-black py-3 text-sm font-semibold text-white hover:bg-slate-800 transition"
            >
              Sign in with Google
            </button>
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            <p className="text-sm text-slate-600">Signed in as {user.email}</p>
            <a
              href="#"
              className="block w-full rounded-xl bg-black py-3 text-center text-sm font-semibold text-white hover:bg-slate-800 transition"
            >
              Upgrade to Pro – $12/month
            </a>
            <p className="text-xs text-slate-500">
              Payment is handled by Razorpay. Configure your Razorpay subscription and set the webhook URL to /api/razorpay-webhook. Pass user_id in subscription/payment notes so we can activate Pro.
            </p>
            <button
              type="button"
              onClick={signOut}
              className="text-sm text-slate-500 hover:text-slate-700"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
