"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/app/lib/supabase/client";

type Status = "exchanging" | "done" | "error";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<Status>("exchanging");
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const code = searchParams.get("code");
    const next = searchParams.get("next");
    const redirectTo = next && next.startsWith("/") && !next.startsWith("//") ? next : "/";

    // Supabase returns OAuth errors in the URL hash (e.g. #error_code=...&error_description=...)
    if (typeof window !== "undefined" && window.location.hash) {
      const hashParams = new URLSearchParams(window.location.hash.slice(1));
      const errCode = hashParams.get("error_code");
      const errDesc = hashParams.get("error_description");
      if (errCode || errDesc) {
        setErrorMsg(errDesc || (errCode ? `Error: ${errCode}` : "Sign-in failed."));
        setStatus("error");
        // Clear hash so refresh doesn't re-show
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
        return;
      }
    }

    if (!code) {
      router.replace(redirectTo);
      return;
    }

    const supabase = createClient();
    supabase.auth
      .exchangeCodeForSession(code)
      .then(() => {
        setStatus("done");
        router.replace(redirectTo);
      })
      .catch((err) => {
        setErrorMsg(err?.message || "Sign-in failed. Please try again.");
        setStatus("error");
      });
  }, [searchParams, router]);

  if (status === "error") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50 px-4">
        <p className="text-slate-700 text-center max-w-md">{errorMsg}</p>
        <p className="text-slate-500 text-sm">
          Ensure Supabase Site URL is <strong>https://resumeatlas.io</strong> and Redirect URLs include{" "}
          <strong>https://resumeatlas.io/auth/callback</strong>.
        </p>
        <Link
          href="/"
          className="text-sky-600 hover:text-sky-700 font-medium"
        >
          Try again
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <p className="text-slate-600">
        {status === "exchanging" && "Signing you in..."}
        {status === "done" && "Redirecting..."}
      </p>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-600">Signing you in...</p>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}
