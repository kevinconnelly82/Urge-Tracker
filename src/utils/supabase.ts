import { createClient } from '@supabase/supabase-js';

// Supabase configuration - anon key is safe to expose in client-side code
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://drjntkkqtdhunaqwemvi.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyam50a2txdGRodW5hcXdlbXZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3MzAzODYsImV4cCI6MjA3OTMwNjM4Nn0.ArbzN8h0s2YxPy-v5AhH_6s5la0ay6oKXzFiCfIGNhc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
