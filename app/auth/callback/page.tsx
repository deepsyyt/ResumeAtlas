"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/app/lib/supabase/client";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"exchanging" | "done" | "error">("exchanging");

  useEffect(() => {
    const code = searchParams.get("code");
    const next = searchParams.get("next");
    const redirectTo = next && next.startsWith("/") && !next.startsWith("//") ? next : "/";
    if (!code) {
      setStatus("error");
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
      .catch(() => {
        setStatus("error");
        router.replace(redirectTo);
      });
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <p className="text-slate-600">
        {status === "exchanging" && "Signing you in..."}
        {status === "done" && "Redirecting..."}
        {status === "error" && "Something went wrong. Taking you back."}
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
