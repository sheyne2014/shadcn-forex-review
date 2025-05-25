import { createClient } from '@supabase/supabase-js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Missing Supabase URL or service role key in environment variables.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Test broker data
const testBrokers = [

];

async function ensureTestBrokers() {
  try {
    console.log('Checking for existing test brokers...');

    // Check if test brokers already exist
    const { data: existingBrokers, error: checkError } = await supabase
      .from('brokers')
      .select('id')
      .in('id', testBrokers.map(b => b.id));

    if (checkError) {
      console.error('Error checking for existing brokers:', checkError);
      return;
    }

    const existingIds = new Set(existingBrokers?.map(b => b.id) || []);
    const brokersToInsert = testBrokers.filter(b => !existingIds.has(b.id));

    if (brokersToInsert.length === 0) {
      console.log('All test brokers already exist in the database.');
      return;
    }

    console.log(`Inserting ${brokersToInsert.length} test brokers...`);

    // Insert test brokers
    const { data: insertedBrokers, error: insertError } = await supabase
      .from('brokers')
      .insert(brokersToInsert)
      .select();

    if (insertError) {
      console.error('Error inserting test brokers:', insertError);
      return;
    }

    console.log(`Successfully inserted ${insertedBrokers?.length || 0} test brokers.`);

    // Verify RLS policies
    console.log('\nVerifying row-level security (RLS) policies...');

    // 1. Create anonymous client to test permissions
    const anonClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    // 2. Try to read the brokers we just inserted
    const { data: anonData, error: anonError } = await anonClient
      .from('brokers')
      .select('*')
      .in('id', testBrokers.map(b => b.id));

    if (anonError) {
      console.error('Anon client cannot read brokers due to error:', anonError);
      console.log('\nYou may need to enable row-level security permissions for the brokers table.');
      console.log('Run the following SQL in the Supabase SQL editor:');
      console.log(`
ALTER TABLE brokers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to brokers"
  ON brokers
  FOR SELECT
  TO authenticated, anon
  USING (true);
      `);
    } else {
      console.log(`Anon client can read ${anonData?.length || 0} test brokers`);

      if (anonData?.length === 0) {
        console.log('\nWARNING: Anon client cannot read any brokers, RLS policy may be too restrictive.');
        console.log('Check your RLS policies in the Supabase dashboard.');
      }
    }

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

ensureTestBrokers();