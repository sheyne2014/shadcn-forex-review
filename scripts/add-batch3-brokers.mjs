import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://imndrogsolkrupmuzikd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltbmRyb2dzb2xrcnVwbXV6aWtkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzI4NjkyMiwiZXhwIjoyMDU4ODYyOTIyfQ.HfXVNcxF7sqOsaclotpm8vR8lF_tGk-WGZvQik-8GRM';

const supabase = createClient(supabaseUrl, supabaseKey);

const batch3Brokers = [
  {
    id: 'bc000000-0000-0000-0000-0000000000c0',
    name: 'Coinbase',
    logo_url: '/images/brokers/coinbase.png',
    min_deposit: 1,
    trading_fee: 0.5,
    regulations: 'NYDFS, FCA, Various US states',
    supported_assets: ['Bitcoin', 'Ethereum', 'Altcoins'],
    country: 'USA',
    rating: 4.2,
    website_url: 'https://www.coinbase.com',
    max_leverage: '1:1',
    trading_platforms: 'Coinbase Platform, Coinbase Pro, Coinbase Mobile',
    spread_from: '0.5% spread',
    headquarters: 'San Francisco, USA',
    year_founded: '2012'
  },
  {
    id: 'bd000000-0000-0000-0000-0000000000d0',
    name: 'Kraken',
    logo_url: '/images/brokers/kraken.png',
    min_deposit: 1,
    trading_fee: 0.16,
    regulations: 'NYDFS, FCA, JFSA',
    supported_assets: ['Bitcoin', 'Ethereum', 'Altcoins'],
    country: 'USA',
    rating: 4.4,
    website_url: 'https://www.kraken.com',
    max_leverage: '1:5',
    trading_platforms: 'Kraken Platform, Kraken Pro, Kraken Mobile',
    spread_from: '0.16% maker fee',
    headquarters: 'San Francisco, USA',
    year_founded: '2011'
  },
  {
    id: 'be000000-0000-0000-0000-0000000000e0',
    name: 'Crypto.com',
    logo_url: '/images/brokers/crypto-com.png',
    min_deposit: 1,
    trading_fee: 0.4,
    regulations: 'Various jurisdictions',
    supported_assets: ['Bitcoin', 'Ethereum', 'Altcoins'],
    country: 'Singapore',
    rating: 4.1,
    website_url: 'https://www.crypto.com',
    max_leverage: '1:10',
    trading_platforms: 'Crypto.com App, Crypto.com Exchange, DeFi Wallet',
    spread_from: '0.4% spread',
    headquarters: 'Singapore',
    year_founded: '2016'
  },
  {
    id: 'bf000000-0000-0000-0000-0000000000f0',
    name: 'Gemini',
    logo_url: '/images/brokers/gemini.png',
    min_deposit: 1,
    trading_fee: 0.35,
    regulations: 'NYDFS, Various US states',
    supported_assets: ['Bitcoin', 'Ethereum', 'Altcoins'],
    country: 'USA',
    rating: 4.3,
    website_url: 'https://www.gemini.com',
    max_leverage: '1:1',
    trading_platforms: 'Gemini Platform, ActiveTrader, Gemini Mobile',
    spread_from: '0.35% spread',
    headquarters: 'New York, USA',
    year_founded: '2014'
  }
];

async function addBatch3Brokers() {
  try {
    console.log('Adding Batch 3 brokers to database...');

    for (const broker of batch3Brokers) {
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

    console.log('\n🎉 Batch 3 brokers processing complete!');

  } catch (error) {
    console.error('Error:', error);
  }
}

addBatch3Brokers();
