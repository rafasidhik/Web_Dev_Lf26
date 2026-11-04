-- Supabase Schema for Feedback Portal (Task 12)

-- 1. Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL,
  message VARCHAR(1000) NOT NULL,
  rating SMALLINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  category VARCHAR(30) NOT NULL DEFAULT 'General',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- 3. Row Level Security Policies for Public Access
DROP POLICY IF EXISTS "Allow public read" ON feedback;
CREATE POLICY "Allow public read"
  ON feedback
  FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow public insert" ON feedback;
CREATE POLICY "Allow public insert"
  ON feedback
  FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update" ON feedback;
CREATE POLICY "Allow public update"
  ON feedback
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public delete" ON feedback;
CREATE POLICY "Allow public delete"
  ON feedback
  FOR DELETE
  USING (true);

-- 4. Seed Default Sample Feedback Entry (with μLearn ID)
INSERT INTO feedback (name, message, rating, category)
VALUES (
  'rafasidhik@mulearn',
  'Great platform! Smooth user experience and responsive feedback submission.',
  5,
  'General'
)
ON CONFLICT DO NOTHING;

