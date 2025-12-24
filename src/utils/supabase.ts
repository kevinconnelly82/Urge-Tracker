import { createClient } from '@supabase/supabase-js';
import { supabaseConfig } from '../config/config';

// Supabase configuration - anon key is safe to expose in client-side code
export const supabase = createClient(supabaseConfig.url, supabaseConfig.anonKey);
