-- Enable Row Level Security (RLS) for the brokers table
ALTER TABLE brokers ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow public read access to all broker records
CREATE POLICY "Allow public read access to brokers" 
  ON brokers 
  FOR SELECT 
  TO authenticated, anon 
  USING (true);

-- Verify the policy was created
SELECT * FROM pg_policies WHERE tablename = 'brokers'; 