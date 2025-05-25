import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://imndrogsolkrupmuzikd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltbmRyb2dzb2xrcnVwbXV6aWtkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzI4NjkyMiwiZXhwIjoyMDU4ODYyOTIyfQ.HfXVNcxF7sqOsaclotpm8vR8lF_tGk-WGZvQik-8GRM';

const supabase = createClient(supabaseUrl, supabaseKey);

async function addEtoroBroker() {
  try {
    console.log('Adding eToro broker to database...');

    const etoroId = 'b1000000-0000-0000-0000-000000000010';
    
    // Check if eToro already exists
    const { data: existingBroker } = await supabase
      .from('brokers')
      .select('id')
      .eq('id', etoroId)
      .single();

    if (existingBroker) {
      console.log('eToro broker already exists in database');
      return;
    }

    // Insert eToro broker
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
          website_url: 'https://www.etoro.com'
        }
      ])
      .select();

    if (error) {
      console.error('Error adding eToro broker:', error);
      return;
    }

    console.log('✅ Successfully added eToro broker to database');
    console.log('Broker data:', data[0]);

  } catch (error) {
    console.error('Error:', error);
  }
}

addEtoroBroker();
