import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://imndrogsolkrupmuzikd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltbmRyb2dzb2xrcnVwbXV6aWtkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzI4NjkyMiwiZXhwIjoyMDU4ODYyOTIyfQ.HfXVNcxF7sqOsaclotpm8vR8lF_tGk-WGZvQik-8GRM';

const supabase = createClient(supabaseUrl, supabaseKey);

async function addXMBroker() {
  try {
    console.log('Adding XM broker to database...');

    const xmId = 'b2000000-0000-0000-0000-000000000020';
    
    // Check if XM already exists
    const { data: existingBroker } = await supabase
      .from('brokers')
      .select('id')
      .eq('id', xmId)
      .single();

    if (existingBroker) {
      console.log('XM broker already exists in database');
      return;
    }

    // Insert XM broker
    const { data, error } = await supabase
      .from('brokers')
      .insert([
        {
          id: xmId,
          name: 'XM',
          logo_url: '/images/brokers/xm.png',
          min_deposit: 5,
          trading_fee: 1.0,
          regulations: 'CySEC, ASIC, IFSC',
          supported_assets: ['Forex', 'CFDs', 'Commodities', 'Indices'],
          country: 'Cyprus',
          rating: 4.7,
          website_url: 'https://www.xm.com',
          max_leverage: '1:888',
          trading_platforms: 'MT4, MT5',
          spread_from: '1.0 pips',
          headquarters: 'Limassol, Cyprus',
          year_founded: '2009'
        }
      ])
      .select();

    if (error) {
      console.error('Error adding XM broker:', error);
      return;
    }

    console.log('✅ Successfully added XM broker to database');
    console.log('Broker data:', data[0]);

  } catch (error) {
    console.error('Error:', error);
  }
}

addXMBroker();
