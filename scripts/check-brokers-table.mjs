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

async function checkBrokersTable() {
  try {
    console.log('Checking brokers table...');
    
    // Try to fetch a single broker to see if the table exists
    const { data: brokers, error: brokersError } = await supabase
      .from('brokers')
      .select('*')
      .limit(1);

    if (brokersError) {
      console.error('Error fetching brokers:', brokersError);
      
      if (brokersError.code === 'PGRST116') {
        console.log('The brokers table does not exist. Let\'s create it.');
        
        // Create the brokers table
        const { error: createError } = await supabase.rpc('exec_sql', {
          sql: `
            CREATE TABLE IF NOT EXISTS brokers (
              id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
              name TEXT NOT NULL,
              logo_url TEXT,
              min_deposit NUMERIC,
              trading_fee NUMERIC,
              regulations TEXT,
              supported_assets TEXT[],
              country TEXT,
              rating NUMERIC,
              description TEXT,
              url TEXT,
              created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
          `
        });
        
        if (createError) {
          console.error('Error creating brokers table:', createError);
          return;
        }
        
        console.log('Brokers table created successfully.');
        
      } else {
        console.log('The brokers table exists but has an unknown structure.');
      }
    } else {
      console.log('The brokers table exists with the following column structure:');
      
      if (brokers && brokers.length > 0) {
        const broker = brokers[0];
        console.log('Columns:', Object.keys(broker));
      } else {
        console.log('The brokers table is empty.');
      }
    }
    
    // Add description column if it doesn't exist
    const { error: alterError } = await supabase.rpc('exec_sql', {
      sql: `
        ALTER TABLE IF EXISTS brokers
        ADD COLUMN IF NOT EXISTS description TEXT;
      `
    });
    
    if (alterError) {
      console.error('Error adding description column:', alterError);
      return;
    }
    
    console.log('Description column added (if it didn\'t exist).');
    
    // Now try to get the structure again
    const { data: updatedBrokers, error: updatedError } = await supabase
      .from('brokers')
      .select('*')
      .limit(1);
      
    if (!updatedError && updatedBrokers) {
      console.log('Updated brokers table columns:', updatedBrokers.length > 0 ? 
        Object.keys(updatedBrokers[0]) : 
        'Still empty');
    }
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

checkBrokersTable(); 