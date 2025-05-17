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

async function testFetchBrokers() {
  try {
    console.log('Fetching all brokers to examine their structure...');
    
    // Get all brokers
    const { data: brokers, error } = await supabase
      .from('brokers')
      .select('*');

    if (error) {
      console.error('Error fetching brokers:', error);
      return;
    }

    console.log(`Found ${brokers?.length || 0} brokers in the database.`);
    
    if (brokers && brokers.length > 0) {
      // Examine the first broker's structure
      const firstBroker = brokers[0];
      console.log('\nFirst broker details:');
      console.log(JSON.stringify(firstBroker, null, 2));
      
      // Specifically check the supported_assets field
      console.log('\nSupported assets details:');
      if (firstBroker.supported_assets) {
        console.log('Type:', typeof firstBroker.supported_assets);
        console.log('Is array:', Array.isArray(firstBroker.supported_assets));
        console.log('Value:', JSON.stringify(firstBroker.supported_assets, null, 2));
        
        // Test if we can parse it
        if (typeof firstBroker.supported_assets === 'string') {
          try {
            const parsed = JSON.parse(firstBroker.supported_assets);
            console.log('Parsed value:', parsed);
            console.log('Successfully parsed as JSON');
          } catch (e) {
            console.log('Failed to parse as JSON:', e.message);
            
            // Try splitting by comma
            const split = firstBroker.supported_assets.split(',').map(s => s.trim());
            console.log('Split by comma:', split);
          }
        }
      } else {
        console.log('No supported_assets field found');
      }
      
      // Test the filtering logic
      console.log('\nTesting category filtering with supported_assets:');
      const categories = ['Forex', 'Crypto', 'Stocks', 'ETF', 'CFD', 'Options', 'Commodities'];
      
      for (const category of categories) {
        const matchingBrokers = brokers.filter(broker => {
          if (!broker.supported_assets) return false;
          
          // Test each method of checking
          const directMatch = Array.isArray(broker.supported_assets) && 
            broker.supported_assets.includes(category);
            
          let stringMatch = false;
          if (typeof broker.supported_assets === 'string') {
            try {
              const parsed = JSON.parse(broker.supported_assets);
              stringMatch = Array.isArray(parsed) && parsed.includes(category);
            } catch {
              stringMatch = broker.supported_assets.split(',')
                .map(s => s.trim())
                .includes(category);
            }
          }
          
          const match = directMatch || stringMatch;
          if (match) {
            console.log(`  - Broker "${broker.name}" matches category "${category}"`);
            console.log(`    supported_assets: ${JSON.stringify(broker.supported_assets)}`);
          }
          
          return match;
        });
        
        console.log(`Category "${category}": ${matchingBrokers.length} brokers`);
      }
    } else {
      console.log('No brokers found in the database.');
    }
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

testFetchBrokers(); 