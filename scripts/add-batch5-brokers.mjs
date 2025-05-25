import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://imndrogsolkrupmuzikd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltbmRyb2dzb2xrcnVwbXV6aWtkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzI4NjkyMiwiZXhwIjoyMDU4ODYyOTIyfQ.HfXVNcxF7sqOsaclotpm8vR8lF_tGk-WGZvQik-8GRM';

const supabase = createClient(supabaseUrl, supabaseKey);

const batch5Brokers = [
  {
    id: 'c5000000-0000-0000-0000-000000000150',
    name: 'thinkorswim',
    logo_url: '/images/brokers/thinkorswim.png',
    min_deposit: 0,
    trading_fee: 0.0,
    regulations: 'SEC, FINRA, SIPC',
    supported_assets: ['Stocks', 'Options', 'Futures'],
    country: 'USA',
    rating: 4.8,
    website_url: 'https://www.thinkorswim.com',
    max_leverage: '1:2',
    trading_platforms: 'thinkorswim Desktop, thinkorswim Mobile, thinkorswim Web',
    spread_from: '$0 commissions',
    headquarters: 'Omaha, Nebraska, USA',
    year_founded: '1999'
  },
  {
    id: 'c6000000-0000-0000-0000-000000000160',
    name: 'FP Markets',
    logo_url: '/images/brokers/fp-markets.png',
    min_deposit: 100,
    trading_fee: 0.0,
    regulations: 'ASIC, CySEC, FSCA',
    supported_assets: ['Forex', 'CFDs', 'Crypto'],
    country: 'Australia',
    rating: 4.7,
    website_url: 'https://www.fpmarkets.com',
    max_leverage: '1:500',
    trading_platforms: 'MT4, MT5, IRESS, cTrader',
    spread_from: '0.0 pips',
    headquarters: 'Sydney, Australia',
    year_founded: '2005'
  },
  {
    id: 'c7000000-0000-0000-0000-000000000170',
    name: 'Swissquote',
    logo_url: '/images/brokers/swissquote.png',
    min_deposit: 1000,
    trading_fee: 0.8,
    regulations: 'FINMA, FCA, MAS',
    supported_assets: ['Forex', 'Stocks', 'CFDs'],
    country: 'Switzerland',
    rating: 4.7,
    website_url: 'https://www.swissquote.com',
    max_leverage: '1:100',
    trading_platforms: 'Advanced Trader, MT4, MT5, Mobile',
    spread_from: '0.8 pips',
    headquarters: 'Gland, Switzerland',
    year_founded: '1996'
  },
  {
    id: 'c8000000-0000-0000-0000-000000000180',
    name: 'ActivTrades',
    logo_url: '/images/brokers/activtrades.png',
    min_deposit: 0,
    trading_fee: 0.5,
    regulations: 'FCA, SCB, CMVM',
    supported_assets: ['Forex', 'CFDs', 'Stocks'],
    country: 'UK',
    rating: 4.6,
    website_url: 'https://www.activtrades.com',
    max_leverage: '1:30',
    trading_platforms: 'ActivTrader, MT4, MT5',
    spread_from: '0.5 pips',
    headquarters: 'London, UK',
    year_founded: '2001'
  },
  {
    id: 'c9000000-0000-0000-0000-000000000190',
    name: 'IG Markets',
    logo_url: '/images/brokers/ig-markets.png',
    min_deposit: 250,
    trading_fee: 0.6,
    regulations: 'FCA, ASIC, MAS, BaFin',
    supported_assets: ['Forex', 'CFDs', 'Stocks'],
    country: 'UK',
    rating: 4.6,
    website_url: 'https://www.ig.com',
    max_leverage: '1:30',
    trading_platforms: 'IG Platform, MT4, ProRealTime',
    spread_from: '0.6 pips',
    headquarters: 'London, UK',
    year_founded: '1974'
  }
];

async function addBatch5Brokers() {
  try {
    console.log('Adding Batch 5 brokers to database...');

    for (const broker of batch5Brokers) {
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

    console.log('\n🎉 Batch 5 brokers processing complete!');

  } catch (error) {
    console.error('Error:', error);
  }
}

addBatch5Brokers();
