-- Create the urge_entries table for anonymized data collection
CREATE TABLE IF NOT EXISTS urge_entries (
  id BIGSERIAL PRIMARY KEY,
  urge_type TEXT NOT NULL,
  intensity INTEGER NOT NULL CHECK (intensity >= 1 AND intensity <= 10),
  location TEXT NOT NULL,
  emotions TEXT[] NOT NULL,
  sensation_types TEXT[] NOT NULL,
  sensation_locations TEXT[] NOT NULL,
  action_taken TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL,
  hour_of_day INTEGER NOT NULL CHECK (hour_of_day >= 0 AND hour_of_day <= 23),
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_urge_type ON urge_entries(urge_type);
CREATE INDEX IF NOT EXISTS idx_timestamp ON urge_entries(timestamp);
CREATE INDEX IF NOT EXISTS idx_action_taken ON urge_entries(action_taken);
CREATE INDEX IF NOT EXISTS idx_hour_of_day ON urge_entries(hour_of_day);

-- Enable Row Level Security (RLS)
ALTER TABLE urge_entries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts (write-only)
CREATE POLICY "Allow anonymous inserts" ON urge_entries
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow authenticated reads (for your admin dashboard)
CREATE POLICY "Allow authenticated reads" ON urge_entries
  FOR SELECT
  TO authenticated
  USING (true);

-- Optional: Create a view for aggregate statistics
CREATE OR REPLACE VIEW urge_statistics AS
SELECT 
  urge_type,
  COUNT(*) as total_count,
  AVG(intensity) as avg_intensity,
  action_taken,
  COUNT(*) FILTER (WHERE action_taken = 'Processed the urge') as processed_count,
  COUNT(*) FILTER (WHERE action_taken = 'Gave in to urge') as gave_in_count
FROM urge_entries
GROUP BY urge_type, action_taken;
