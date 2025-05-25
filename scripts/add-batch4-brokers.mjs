import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://imndrogsolkrupmuzikd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltbmRyb2dzb2xrcnVwbXV6aWtkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzI4NjkyMiwiZXhwIjoyMDU4ODYyOTIyfQ.HfXVNcxF7sqOsaclotpm8vR8lF_tGk-WGZvQik-8GRM';

const supabase = createClient(supabaseUrl, supabaseKey);

const batch4Brokers = [
  {
    id: 'c0000000-0000-0000-0000-000000000100',
    name: 'Charles Schwab',
    logo_url: '/images/brokers/charles-schwab.png',
    min_deposit: 0,
    trading_fee: 0.0,
    regulations: 'SEC, FINRA, SIPC',
    supported_assets: ['Stocks', 'ETFs', 'Options'],
    country: 'USA',
    rating: 4.7,
    website_url: 'https://www.schwab.com',
    max_leverage: '1:2',
    trading_platforms: 'Schwab Platform, StreetSmart Edge, Schwab Mobile',
    spread_from: '$0 commissions',
    headquarters: 'Westlake, Texas, USA',
    year_founded: '1971'
  },
  {
    id: 'c1000000-0000-0000-0000-000000000110',
    name: 'Fidelity',
    logo_url: '/images/brokers/fidelity.png',
    min_deposit: 0,
    trading_fee: 0.0,
    regulations: 'SEC, FINRA, SIPC',
    supported_assets: ['Stocks', 'ETFs', 'Bonds'],
    country: 'USA',
    rating: 4.8,
    website_url: 'https://www.fidelity.com',
    max_leverage: '1:2',
    trading_platforms: 'Fidelity.com, Active Trader Pro, Fidelity Mobile',
    spread_from: '$0 commissions',
    headquarters: 'Boston, Massachusetts, USA',
    year_founded: '1946'
  },
  {
    id: 'c2000000-0000-0000-0000-000000000120',
    name: 'TD Ameritrade',
    logo_url: '/images/brokers/td-ameritrade.png',
    min_deposit: 0,
    trading_fee: 0.0,
    regulations: 'SEC, FINRA, SIPC',
    supported_assets: ['Stocks', 'ETFs', 'Options'],
    country: 'USA',
    rating: 4.6,
    website_url: 'https://www.tdameritrade.com',
    max_leverage: '1:2',
    trading_platforms: 'TD Ameritrade Platform, thinkorswim, TD Mobile',
    spread_from: '$0 commissions',
    headquarters: 'Omaha, Nebraska, USA',
    year_founded: '1975'
  },
  {
    id: 'c3000000-0000-0000-0000-000000000130',
    name: 'E*TRADE',
    logo_url: '/images/brokers/etrade.png',
    min_deposit: 0,
    trading_fee: 0.0,
    regulations: 'SEC, FINRA, SIPC',
    supported_assets: ['Stocks', 'ETFs', 'Options'],
    country: 'USA',
    rating: 4.5,
    website_url: 'https://www.etrade.com',
    max_leverage: '1:2',
    trading_platforms: 'E*TRADE Platform, Power E*TRADE, E*TRADE Mobile',
    spread_from: '$0 commissions',
    headquarters: 'Arlington, Virginia, USA',
    year_founded: '1991'
  },
  {
    id: 'c4000000-0000-0000-0000-000000000140',
    name: 'Vanguard',
    logo_url: '/images/brokers/vanguard.png',
    min_deposit: 0,
    trading_fee: 0.0,
    regulations: 'SEC, FINRA, SIPC',
    supported_assets: ['Stocks', 'ETFs', 'Bonds'],
    country: 'USA',
    rating: 4.6,
    website_url: 'https://www.vanguard.com',
    max_leverage: '1:1',
    trading_platforms: 'Vanguard.com, Vanguard Mobile',
    spread_from: '$0 commissions',
    headquarters: 'Malvern, Pennsylvania, USA',
    year_founded: '1975'
  }
];

async function addBatch4Brokers() {
  try {
    console.log('Adding Batch 4 brokers to database...');

    for (const broker of batch4Brokers) {
      console.log(`\nProcessing ${broker.name}...`);
      
      // Check if broker already exists
      const { data: existingBroker } = await supabase
        .from('brokers')
        .select('id')
        .eq('id', broker.id)
        .single();

      if (existingBroker) {
        console.log(`${broker.name} already exists in database`);
        continue;
      }

      // Insert broker
      const { data, error } = await supabase
        .from('brokers')
        .insert([broker])
        .select();

      if (error) {
        console.error(`Error adding ${broker.name}:`, error);
      } else {
        console.log(`✅ Successfully added ${broker.name} to database`);
      }
    }

    console.log('\n🎉 Batch 4 brokers processing complete!');

  } catch (error) {
    console.error('Error:', error);
  }
}

addBatch4Brokers();
