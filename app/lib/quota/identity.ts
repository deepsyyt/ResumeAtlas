import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { ANONYMOUS_ID_COOKIE, ANONYMOUS_ID_MAX_AGE } from "./constants";

/**
 * Gets or creates a stable anonymous session ID from a secure cookie.
 * Used for quota tracking when the user is not signed in.
 */
export async function getOrCreateAnonymousAnalysisIdentity(
  request?: Request
): Promise<{ anonymousId: string; isNew: boolean }> {
  const cookieStore = await cookies();
  const existing = cookieStore.get(ANONYMOUS_ID_COOKIE)?.value;
  if (existing && isValidUuid(existing)) {
    return { anonymousId: existing, isNew: false };
  }
  const newId = randomUUID();
  cookieStore.set(ANONYMOUS_ID_COOKIE, newId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: ANONYMOUS_ID_MAX_AGE,
    path: "/",
  });
  return { anonymousId: newId, isNew: true };
}

function isValidUuid(s: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(s);
}
