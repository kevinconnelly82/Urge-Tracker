# ConsentKeys redirect by origin (state)

## How it works

1. **Frontend** sends the current app origin in the OAuth `state` parameter when starting ConsentKeys login (e.g. `http://localhost:5173` or `https://urge-tracker.com`).
2. **ConsentKeys** redirects to the edge function with `?code=...&state=...` and returns the same `state`.
3. **Edge function** reads `state`, decodes it as the app origin, and uses `origin + '/auth/callback'` as the magic link `redirectTo`. So:
   - Local: `http://localhost:5173/auth/callback`
   - Production: `https://urge-tracker.com/auth/callback`

No need to change `APP_URL` per environment; the correct URL is derived from where the user started login.

## Supabase redirect URLs

Add every origin you use (dev and prod) to **Supabase Dashboard → Authentication → URL Configuration → Redirect URLs**, e.g.:

- `http://localhost:5173/auth/callback`
- `http://localhost:5173/**`
- `https://urge-tracker.com/auth/callback`
- `https://urge-tracker.com/**`

Otherwise the magic link redirect may be rejected by Supabase.

## Optional: allowlist (production)

To restrict which origins can be used in `state`, set in the edge function:

```env
CONSENT_KEYS_ALLOWED_ORIGINS=http://localhost:5173,https://urge-tracker.com
```

Comma-separated, no spaces. If not set, any origin in `state` is accepted (fine for dev; consider allowlist in production).
