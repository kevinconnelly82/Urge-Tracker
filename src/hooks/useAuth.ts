import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../utils/supabase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const signInWithConsentKeys = () => {
    const authorizeUrl = import.meta.env.VITE_CONSENT_KEYS_AUTHORIZE_URL;
    const clientId = import.meta.env.VITE_CONSENT_KEYS_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_CONSENT_KEYS_REDIRECT_URI;
    
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'openid email profile',
    });

    const authUrl = `${authorizeUrl}?${params.toString()}`;
    window.location.href = authUrl;
  };

  return {
    user,
    loading,
    signOut,
    signInWithConsentKeys,
  };
}