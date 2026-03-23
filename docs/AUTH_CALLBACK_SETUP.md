# Auth Callback Setup (Supabase + Live Domain)

If Google sign-in works locally but fails on `https://resumeatlas.io`, follow these steps.

## 1. Supabase Dashboard → URL Configuration

Go to **[Authentication → URL Configuration](https://supabase.com/dashboard/project/_/auth/url-configuration)**.

### Site URL
Set to your production domain **without** trailing slash:
```
https://resumeatlas.io
```
If this is still `http://localhost:3000` or `https://resumeatlas.ai-stack.dev`, OAuth redirects will go to the wrong place.

### Redirect URLs
Add these to the allow list (one per line):

```
https://resumeatlas.io/auth/callback
https://resumeatlas.io/**
```

- `https://resumeatlas.io/auth/callback` — exact callback path
- `https://resumeatlas.io/**` — covers query params like `?next=/`

**Important:** The `redirectTo` sent in `signInWithOAuth()` must match a URL in this list. The app builds `https://resumeatlas.io/auth/callback?next=...` from `window.location.origin`, so both entries above ensure it’s allowed.

## 2. Vercel Environment Variables

In **Vercel → Project → Settings → Environment Variables**, for **Production**:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SITE_URL` | `https://resumeatlas.io` |

(No trailing slash.)

Used for server-side auth redirects and canonical URLs. Client-side OAuth uses `window.location.origin`, so this mainly matters for SSR/email links.

## 3. Google Cloud Console (OAuth)

The **Authorized redirect URI** for your Google OAuth client must be the **Supabase** callback, not your app:

```
https://<YOUR_PROJECT_REF>.supabase.co/auth/v1/callback
```

Find your project ref in Supabase Dashboard → Settings → General → Reference ID.

## 4. Common Issues

| Symptom | Fix |
|--------|-----|
| Redirected to wrong domain after Google sign-in | Set Supabase **Site URL** to `https://resumeatlas.io` |
| "Sign-in failed" with error on callback | Add `https://resumeatlas.io/auth/callback` and `https://resumeatlas.io/**` to Supabase **Redirect URLs** |
| Stuck on "Signing you in..." | Check browser console and network tab; ensure `?code=` is in the callback URL (not `#error_code=`) |
| Works on `www.resumeatlas.io` but not `resumeatlas.io` | Add both to Redirect URLs, or canonicalize to one domain |

## 5. Verify

1. Open `https://resumeatlas.io`
2. Click **Sign in with Google**
3. Complete Google auth
4. You should land back on `https://resumeatlas.io` (or the `next` path) and be signed in

If it still fails, the callback page will show a short error message and a “Try again” link.
