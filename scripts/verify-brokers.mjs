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

async function verifyBrokers() {
  try {
    console.log('Verifying brokers in the database...');
    
    // Get all brokers
    const { data: brokers, error, count } = await supabase
      .from('brokers')
      .select('*', { count: 'exact' });

    if (error) {
      console.error('Error fetching brokers:', error);
      return;
    }

    console.log(`Found ${count || 0} brokers in the database.`);
    
    if (brokers && brokers.length > 0) {
      console.log('First broker details:');
      console.log(JSON.stringify(brokers[0], null, 2));
      
      // Check supported_assets format
      console.log('\nSupported assets format check:');
      if (brokers[0].supported_assets) {
        console.log('Type:', typeof brokers[0].supported_assets);
        console.log('Is array:', Array.isArray(brokers[0].supported_assets));
        console.log('Value:', brokers[0].supported_assets);
        
        if (typeof brokers[0].supported_assets === 'string') {
          console.log('ISSUE DETECTED: supported_assets is a string instead of an array');
          console.log('Attempting to fix...');
          
          // Fix supported_assets format if needed
          for (const broker of brokers) {
            if (typeof broker.supported_assets === 'string') {
              try {
                const parsedAssets = JSON.parse(broker.supported_assets);
                const { error: updateError } = await supabase
                  .from('brokers')
                  .update({ supported_assets: parsedAssets })
                  .eq('id', broker.id);
                  
                if (updateError) {
                  console.error(`Error updating broker ${broker.id}:`, updateError);
                } else {
                  console.log(`Fixed supported_assets format for broker ${broker.id}`);
                }
              } catch (e) {
                console.error(`Error parsing supported_assets for broker ${broker.id}:`, e);
              }
            }
          }
        }
      } else {
        console.log('ISSUE DETECTED: No supported_assets field found');
      }
    } else {
      console.log('No brokers found in the database. Let\'s insert them again.');
      
      // Re-insert sample brokers with proper format
      const { data: insertedData, error: insertError } = await supabase
        .from('brokers')
        .insert([
          {
            id: 'b1000000-0000-0000-0000-000000000001',
            name: 'XYZ Broker',
            country: 'United Kingdom',
            regulations: 'FCA, ASIC',
            min_deposit: 100,
            trading_fee: 0.8,
            logo_url: 'https://placehold.co/150x60?text=XYZ',
            rating: 4.7,
            supported_assets: ['Forex', 'Stocks', 'Commodities', 'Crypto'],
            url: 'https://xyz-broker.example.com'
          },
          {
            id: 'b2000000-0000-0000-0000-000000000002',
            name: 'Alpha Trading',
            country: 'Australia',
            regulations: 'ASIC, CySEC',
            min_deposit: 200,
            trading_fee: 1.2,
            logo_url: 'https://placehold.co/150x60?text=Alpha',
            rating: 4.2,
            supported_assets: ['Forex', 'Commodities', 'Indices'],
            url: 'https://alpha-trading.example.com'
          },
          {
            id: 'b3000000-0000-0000-0000-000000000003',
            name: 'Global FX',
            country: 'Cyprus',
            regulations: 'CySEC, FSA',
            min_deposit: 50,
            trading_fee: 0.5,
            logo_url: 'https://placehold.co/150x60?text=GlobalFX',
            rating: 4.8,
            supported_assets: ['Forex', 'Crypto', 'Metals'],
            url: 'https://globalfx.example.com'
          }
        ])
        .select();

      if (insertError) {
        console.error('Error inserting sample brokers:', insertError);
      } else {
        console.log(`Successfully inserted ${insertedData?.length || 0} sample brokers.`);
      }
    }
    
    // Display table structure
    const { data: tableInfo, error: tableError } = await supabase
      .rpc('exec_sql', {
        sql: `
          SELECT column_name, data_type 
          FROM information_schema.columns 
          WHERE table_name = 'brokers'
        `
      });
      
    if (tableError) {
      if (tableError.message.includes('function')) {
        console.log('Cannot get table structure details (exec_sql function not available)');
      } else {
        console.error('Error getting table structure:', tableError);
      }
    } else {
      console.log('\nTable structure:');
      console.table(tableInfo);
    }
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

verifyBrokers(); 