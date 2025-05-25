import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function addEtoroBroker() {
  try {
    console.log('Adding eToro broker to database...');

    // Check if eToro already exists
    const { data: existingBroker, error: checkError } = await supabase
      .from('brokers')
      .select('id')
      .eq('name', 'eToro')
      .single();

    if (existingBroker) {
      console.log('eToro broker already exists in database');
      console.log('Existing broker ID:', existingBroker.id);
      return existingBroker.id;
    }

    // Insert eToro broker with a specific UUID
    const etoroId = 'b1000000-0000-0000-0000-000000000010';
    const { data, error } = await supabase
      .from('brokers')
      .insert([
        {
          id: etoroId,
          name: 'eToro',
          logo_url: '/images/brokers/etoro.png',
          min_deposit: 50,
          trading_fee: 1.0,
          regulations: 'FCA, CySEC, ASIC',
          supported_assets: ['Forex', 'Stocks', 'Crypto', 'CFDs'],
          country: 'Israel',
          rating: 4.5,
          website_url: 'https://www.etoro.com',
          max_leverage: '1:30',
          trading_platforms: 'eToro Platform & Mobile',
          spread_from: '1.0 pips',
          headquarters: 'Tel Aviv, Israel',
          year_founded: '2007',
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      console.error('Error adding eToro broker:', error);
      return;
    }

    console.log('✅ Successfully added eToro broker to database');
    console.log('Broker data:', data[0]);
    return data[0].id;

  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the function
addEtoroBroker();
