import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import { consentKeysConfig, validateConsentKeysConfig } from '../config/config';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // First, check if user is already authenticated (in case of direct navigation to callback)
        const { data: { session: existingSession } } = await supabase.auth.getSession();
        if (existingSession) {
          // User is already logged in, just redirect
          navigate('/dashboard', { replace: true });
          return;
        }

        // Check if this is a ConsentKeys callback (has code parameter in query string)
        const code = searchParams.get('code');
        
        if (code) {
          // Handle ConsentKeys authorization code flow
          validateConsentKeysConfig();
          
          const { tokenUrl, clientId, clientSecret, redirectUri } = consentKeysConfig;

          // Exchange authorization code for tokens
          const response = await fetch(tokenUrl!, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              grant_type: 'authorization_code',
              code: code,
              redirect_uri: redirectUri,
              client_id: clientId!,
              client_secret: clientSecret!,
            }),
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Token exchange failed' }));
            throw new Error(errorData.error || `Failed to exchange authorization code: ${response.status} ${response.statusText}`);
          }

          const tokenData = await response.json();
          
          if (!tokenData.access_token) {
            throw new Error('No access token received from ConsentKeys');
          }

          // TODO: Create Supabase user or map ConsentKeys user to Supabase
          // For now, we'll store tokens in localStorage and redirect
          // You'll need to implement proper user creation/mapping logic
          localStorage.setItem('consentkeys_access_token', tokenData.access_token);
          if (tokenData.refresh_token) {
            localStorage.setItem('consentkeys_refresh_token', tokenData.refresh_token);
          }
          
          // Redirect to dashboard (you may need to create a user session first)
          navigate('/dashboard', { replace: true });
          return;
        }

        // Handle Supabase OAuth callback (Google, etc.)
        // Supabase OAuth redirects with tokens in the URL hash
        // Check URL hash for tokens (Supabase OAuth)
        const hash = window.location.hash.substring(1);
        if (hash) {
          const hashParams = new URLSearchParams(hash);
          const accessToken = hashParams.get('access_token');
          const refreshToken = hashParams.get('refresh_token');
          const errorParam = hashParams.get('error');
          const errorDescription = hashParams.get('error_description');

          if (errorParam) {
            throw new Error(errorDescription || errorParam || 'OAuth authentication failed');
          }

          if (accessToken && refreshToken) {
            // Set session with tokens from hash
            const { error: setSessionError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });

            if (setSessionError) {
              throw setSessionError;
            }

            // Clear the hash from URL
            window.history.replaceState(null, '', window.location.pathname);
            navigate('/dashboard', { replace: true });
            return;
          }
        }

        // No tokens found in hash or query params
        // Check if there are any query params or hash at all
        const hasQueryParams = Array.from(searchParams.keys()).length > 0;
        const hasHash = window.location.hash.length > 0;
        
        if (!hasQueryParams && !hasHash) {
          // User navigated directly to callback URL without auth params
          // Just redirect to home/login
          navigate('/', { replace: true });
          return;
        }
        
        throw new Error('No authentication tokens found in callback URL');
      } catch (err: any) {
        console.error('Auth callback error:', err);
        setError(err.message || 'Authentication failed');
        // Redirect to login after error
        setTimeout(() => navigate('/', { replace: true }), 3000);
      } finally {
        setLoading(false);
      }
    };

    handleCallback();
  }, [navigate, searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Completing sign in...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-700">Authentication failed: {error}</p>
          </div>
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return null;
}