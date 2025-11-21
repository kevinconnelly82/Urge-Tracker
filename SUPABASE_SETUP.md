# Supabase Setup Instructions

## Database Schema Setup

1. Go to your Supabase project dashboard
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the contents of `supabase-schema.sql`
5. Click **Run** to create the table and policies

## What This Does

### Dual Storage System
- **Local (IndexedDB)**: User's personal entries with notes stay on their device
- **Cloud (Supabase)**: Anonymized aggregate data for research/insights

### Privacy Protection
The cloud database stores ONLY:
- Urge type, intensity, location
- Emotions and physical sensations
- Action taken
- Timestamp (for pattern analysis)

**NOT stored in cloud:**
- User IDs or accounts
- Personal notes
- Any identifying information

### Database Policies
- **Anonymous users** can INSERT data (write-only)
- **Authenticated users** can READ data (for admin dashboard)
- Row Level Security (RLS) is enabled for protection

## Environment Variables

The `.env.local` file contains your Supabase credentials. This file is:
- Already in `.gitignore` (won't be committed)
- Needed for local development
- Should be added to Netlify environment variables for production

### Add to Netlify:
1. Go to Netlify dashboard → Site settings → Environment variables
2. Add these variables:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your anon/public key

## Testing

After running the SQL schema:
1. Log a test urge in the app
2. Go to Supabase → Table Editor → urge_entries
3. You should see the anonymized entry appear

## Viewing Data

To see aggregate statistics:
```sql
SELECT * FROM urge_statistics;
```

Or query directly:
```sql
SELECT 
  urge_type,
  COUNT(*) as count,
  AVG(intensity) as avg_intensity
FROM urge_entries
GROUP BY urge_type
ORDER BY count DESC;
```
