"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/app/lib/supabase/client";

export default function UpgradePage() {
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [upgradeLoading, setUpgradeLoading] = useState(false);
  const [upgradeMessage, setUpgradeMessage] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ? { email: session.user.email ?? undefined } : null);
      setAccessToken(session?.access_token ?? null);
      setLoading(false);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ? { email: session.user.email ?? undefined } : null);
      setAccessToken(session?.access_token ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${
          typeof window !== "undefined" ? window.location.origin : ""
        }/auth/callback?next=/upgrade`,
      },
    });
  };

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
  };

  const handleUpgrade = async () => {
    setUpgradeMessage(null);

    if (!accessToken) {
      await signInWithGoogle();
      return;
    }

    try {
      setUpgradeLoading(true);
      const res = await fetch("/api/create-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setUpgradeMessage(
          (data && data.error) || "Failed to start subscription. Please try again."
        );
        return;
      }

      const subscription = data?.subscription;

      if (subscription?.short_url && typeof window !== "undefined") {
        window.location.href = subscription.short_url;
        return;
      }

      setUpgradeMessage(
        "Subscription created. Complete payment in Razorpay to activate Pro."
      );
    } catch (error) {
      console.error("Upgrade error", error);
      setUpgradeMessage("Something went wrong. Please try again.");
    } finally {
      setUpgradeLoading(false);
    }
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
            <p className="text-sm font-medium text-slate-800">
              Sign in with Google to upgrade
            </p>
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
            <button
              type="button"
              onClick={handleUpgrade}
              disabled={upgradeLoading}
              className="block w-full rounded-xl bg-black py-3 text-center text-sm font-semibold text-white hover:bg-slate-800 transition disabled:opacity-60"
            >
              {upgradeLoading ? "Starting subscription..." : "Upgrade to Pro – $12/month"}
            </button>
            {upgradeMessage && (
              <p className="text-xs text-slate-500">{upgradeMessage}</p>
            )}
            <p className="text-xs text-slate-500">
              Payment is handled by Razorpay. After subscription payment succeeds, our
              webhook at /api/razorpay-webhook will automatically activate your Pro
              plan using your user_id from the subscription notes.
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
