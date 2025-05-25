import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://imndrogsolkrupmuzikd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltbmRyb2dzb2xrcnVwbXV6aWtkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzI4NjkyMiwiZXhwIjoyMDU4ODYyOTIyfQ.HfXVNcxF7sqOsaclotpm8vR8lF_tGk-WGZvQik-8GRM';

const supabase = createClient(supabaseUrl, supabaseKey);

const batch1Brokers = [
  {
    id: 'b3000000-0000-0000-0000-000000000030',
    name: 'IC Markets',
    logo_url: '/images/brokers/ic-markets.png',
    min_deposit: 200,
    trading_fee: 0.0,
    regulations: 'ASIC, CySEC, FSA',
    supported_assets: ['Forex', 'CFDs', 'Crypto'],
    country: 'Australia',
    rating: 4.9,
    website_url: 'https://www.icmarkets.com',
    max_leverage: '1:500',
    trading_platforms: 'MT4, MT5, cTrader',
    spread_from: '0.0 pips',
    headquarters: 'Sydney, Australia',
    year_founded: '2007'
  },
  {
    id: 'b4000000-0000-0000-0000-000000000040',
    name: 'Pepperstone',
    logo_url: '/images/brokers/pepperstone.png',
    min_deposit: 200,
    trading_fee: 0.0,
    regulations: 'FCA, ASIC, CySEC, DFSA, SCB',
    supported_assets: ['Forex', 'CFDs'],
    country: 'Australia',
    rating: 4.8,
    website_url: 'https://www.pepperstone.com',
    max_leverage: '1:500',
    trading_platforms: 'MT4, MT5, cTrader',
    spread_from: '0.0 pips',
    headquarters: 'Melbourne, Australia',
    year_founded: '2010'
  },
  {
    id: 'b5000000-0000-0000-0000-000000000050',
    name: 'OANDA',
    logo_url: '/images/brokers/oanda.png',
    min_deposit: 0,
    trading_fee: 1.2,
    regulations: 'FCA, ASIC, CFTC, NFA',
    supported_assets: ['Forex', 'CFDs'],
    country: 'USA',
    rating: 4.6,
    website_url: 'https://www.oanda.com',
    max_leverage: '1:50',
    trading_platforms: 'OANDA Trade, MT4',
    spread_from: '1.2 pips',
    headquarters: 'New York, USA',
    year_founded: '1996'
  },
  {
    id: 'b6000000-0000-0000-0000-000000000060',
    name: 'Interactive Brokers',
    logo_url: '/images/brokers/interactive-brokers.png',
    min_deposit: 0,
    trading_fee: 0.2,
    regulations: 'SEC, FINRA, FCA, IIROC',
    supported_assets: ['Stocks', 'Forex', 'Futures', 'Options', 'ETFs'],
    country: 'USA',
    rating: 4.8,
    website_url: 'https://www.interactivebrokers.com',
    max_leverage: '1:50',
    trading_platforms: 'TWS, IBKR Mobile',
    spread_from: '0.2 pips',
    headquarters: 'Greenwich, USA',
    year_founded: '1978'
  }
];

async function addBatch1Brokers() {
  try {
    console.log('Adding Batch 1 brokers to database...');

    for (const broker of batch1Brokers) {
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

    console.log('\n🎉 Batch 1 brokers processing complete!');

  } catch (error) {
    console.error('Error:', error);
  }
}

addBatch1Brokers();
