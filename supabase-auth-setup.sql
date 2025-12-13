-- Enable email confirmations (optional - you can disable this in Supabase dashboard)
-- This is just for reference - actual auth settings are configured in Supabase dashboard

-- The following settings need to be configured in your Supabase dashboard:
-- 1. Go to Authentication → Settings
-- 2. Configure Site URL: https://your-app-url.netlify.app
-- 3. Configure Redirect URLs: https://your-app-url.netlify.app
-- 4. Enable Email confirmations (or disable for easier testing)
-- 5. Configure OAuth providers:

-- For Google OAuth:
-- - Go to Authentication → Providers → Google
-- - Enable Google provider
-- - Add your Google OAuth client ID and secret
-- - Authorized redirect URIs: https://your-supabase-project.supabase.co/auth/v1/callback

-- For GitHub OAuth:
-- - Go to Authentication → Providers → GitHub  
-- - Enable GitHub provider
-- - Add your GitHub OAuth app client ID and secret
-- - Authorization callback URL: https://your-supabase-project.supabase.co/auth/v1/callback

-- Update the urge_entries table to include user_id for authenticated users
ALTER TABLE urge_entries ADD COLUMN user_id UUID REFERENCES auth.users(id);

-- Update the RLS policy to allow users to see their own data
DROP POLICY IF EXISTS "Allow authenticated reads" ON urge_entries;

CREATE POLICY "Users can read own data" ON urge_entries
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR user_id IS NULL);

-- Allow users to insert their own data
CREATE POLICY "Users can insert own data" ON urge_entries
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);