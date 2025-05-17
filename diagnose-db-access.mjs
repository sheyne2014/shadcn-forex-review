// Script to diagnose database access issues
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { resolve } from 'path';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: resolve(__dirname, '.env.local') });

async function diagnoseDbAccess() {
  try {
    console.log('Database Access Diagnostics\n------------------------');
    
    // Check environment variables
    console.log('Environment Variables:');
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    console.log(`NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl ? '✓ Defined' : '✗ Missing'}`);
    console.log(`NEXT_PUBLIC_SUPABASE_ANON_KEY: ${supabaseAnonKey ? '✓ Defined' : '✗ Missing'}`);
    console.log(`SUPABASE_SERVICE_ROLE_KEY: ${supabaseServiceKey ? '✓ Defined' : '✗ Missing'}`);
    
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('\nERROR: Required environment variables are missing.');
      return;
    }
    
    // Try connecting with anon key (public access)
    console.log('\nTesting Anonymous Access:');
    const supabaseAnon = createClient(supabaseUrl, supabaseAnonKey);
    
    const { data: anonData, error: anonError } = await supabaseAnon
      .from('brokers')
      .select('count')
      .limit(1);
      
    if (anonError) {
      console.error('✗ Anonymous access error:', anonError.message);
    } else {
      console.log('✓ Anonymous access successful');
    }
    
    // Test direct access to brokers table
    const { data: brokersData, error: brokersError } = await supabaseAnon
      .from('brokers')
      .select('*')
      .limit(5);
      
    if (brokersError) {
      console.error('✗ Failed to read from brokers table:', brokersError.message);
    } else {
      console.log(`✓ Successfully read from brokers table (${brokersData.length} records)`);
      if (brokersData.length > 0) {
        console.log('  First broker:', brokersData[0].name);
        console.log('  supported_assets:', JSON.stringify(brokersData[0].supported_assets));
      }
    }
    
    // Try service role key if available
    if (supabaseServiceKey) {
      console.log('\nTesting Service Role Access:');
      const supabaseService = createClient(supabaseUrl, supabaseServiceKey);
      
      const { data: serviceData, error: serviceError } = await supabaseService
        .from('brokers')
        .select('count')
        .limit(1);
        
      if (serviceError) {
        console.error('✗ Service role access error:', serviceError.message);
      } else {
        console.log('✓ Service role access successful');
      }
    }
    
    // Check table structure
    console.log('\nChecking Database Structure:');
    let client;
    
    if (supabaseServiceKey) {
      client = createClient(supabaseUrl, supabaseServiceKey);
    } else {
      client = supabaseAnon;
    }
    
    // List tables
    const { data: tablesData, error: tablesError } = await client.rpc('exec_sql', {
      sql: "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
    }).catch(() => ({ data: null, error: { message: 'RPC not available' } }));
    
    if (tablesError) {
      console.log('Note: Could not list tables -', tablesError.message);
    } else if (tablesData) {
      console.log('Tables in database:', tablesData.map(t => t.table_name).join(', '));
    }
    
    console.log('\nDiagnostics complete.');
  } catch (err) {
    console.error('Diagnostics failed with error:', err);
  }
}

diagnoseDbAccess(); 