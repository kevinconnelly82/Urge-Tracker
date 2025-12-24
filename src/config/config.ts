/**
 * Application configuration
 * Centralized environment variable management
 */

interface Config {
  // Supabase
  supabase: {
    url: string;
    anonKey: string;
  };
  
  // ConsentKeys OAuth
  consentKeys: {
    authorizeUrl: string | undefined;
    tokenUrl: string | undefined;
    clientId: string | undefined;
    clientSecret: string | undefined;
    redirectUri: string;
  };
}

/**
 * Get ConsentKeys redirect URI with fallback
 */
function getConsentKeysRedirectUri(): string {
  const envRedirectUri = import.meta.env.VITE_CONSENT_KEYS_REDIRECT_URI;
  if (envRedirectUri) {
    return envRedirectUri;
  }
  // Fallback to current origin + /auth/callback
  // Use typeof check to ensure window is available (client-side only)
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/auth/callback`;
  }
  // Fallback for SSR/build time (shouldn't happen in Vite, but safe)
  return '/auth/callback';
}

/**
 * Application configuration object
 */
export const config: Config = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || 'https://drjntkkqtdhunaqwemvi.supabase.co',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyam50a2txdGRodW5hcXdlbXZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3MzAzODYsImV4cCI6MjA3OTMwNjM4Nn0.ArbzN8h0s2YxPy-v5AhH_6s5la0ay6oKXzFiCfIGNhc',
  },
  consentKeys: {
    authorizeUrl: import.meta.env.VITE_CONSENT_KEYS_AUTHORIZE_URL,
    tokenUrl: import.meta.env.VITE_CONSENT_KEYS_TOKEN_URL,
    clientId: import.meta.env.VITE_CONSENT_KEYS_CLIENT_ID,
    clientSecret: import.meta.env.VITE_CONSENT_KEYS_CLIENT_SECRET,
    redirectUri: getConsentKeysRedirectUri(),
  },
};

/**
 * Validate that required ConsentKeys configuration is present
 * @throws Error if required config is missing
 */
export function validateConsentKeysConfig(): void {
  const { tokenUrl, clientId, clientSecret } = config.consentKeys;
  
  if (!tokenUrl || !clientId || !clientSecret) {
    throw new Error(
      'ConsentKeys token exchange not configured. Please set VITE_CONSENT_KEYS_TOKEN_URL, VITE_CONSENT_KEYS_CLIENT_ID, and VITE_CONSENT_KEYS_CLIENT_SECRET environment variables.'
    );
  }
}

/**
 * Check if ConsentKeys is fully configured
 */
export function isConsentKeysConfigured(): boolean {
  const { authorizeUrl, tokenUrl, clientId, clientSecret } = config.consentKeys;
  return !!(authorizeUrl && tokenUrl && clientId && clientSecret);
}

// Export individual config sections for convenience
export const supabaseConfig = config.supabase;
export const consentKeysConfig = config.consentKeys;
