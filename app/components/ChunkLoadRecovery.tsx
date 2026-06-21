"use client";

import { useEffect } from "react";

const CHUNK_RELOAD_KEY = "resumeatlas_chunk_reload";

function isChunkLoadError(reason: unknown): boolean {
  if (!reason) return false;
  const message =
    typeof reason === "string"
      ? reason
      : reason instanceof Error
        ? reason.message
        : typeof (reason as { message?: string }).message === "string"
          ? (reason as { message: string }).message
          : "";
  return /ChunkLoadError|Loading chunk [\w./-]+ failed/i.test(message);
}

/**
 * After OAuth or a dev HMR rebuild, the browser may still reference an old chunk
 * manifest. One hard reload usually fixes it; this avoids a stuck error overlay.
 */
export function ChunkLoadRecovery() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(CHUNK_RELOAD_KEY)) {
        sessionStorage.removeItem(CHUNK_RELOAD_KEY);
      }
    } catch {
      /* private mode */
    }

    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (!isChunkLoadError(event.reason)) return;
      try {
        if (sessionStorage.getItem(CHUNK_RELOAD_KEY)) return;
        sessionStorage.setItem(CHUNK_RELOAD_KEY, "1");
      } catch {
        return;
      }
      event.preventDefault();
      window.location.reload();
    };

    window.addEventListener("unhandledrejection", onUnhandledRejection);
    return () => window.removeEventListener("unhandledrejection", onUnhandledRejection);
  }, []);

  return null;
}
