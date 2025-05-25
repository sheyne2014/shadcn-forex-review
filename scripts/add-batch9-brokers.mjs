import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://imndrogsolkrupmuzikd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltbmRyb2dzb2xrcnVwbXV6aWtkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzI4NjkyMiwiZXhwIjoyMDU4ODYyOTIyfQ.HfXVNcxF7sqOsaclotpm8vR8lF_tGk-WGZvQik-8GRM';

const supabase = createClient(supabaseUrl, supabaseKey);

const batch9Brokers = [
  {
    id: '90000000-0000-0000-0000-000000000500',
    name: 'Capital.com',
    logo_url: '/images/brokers/capital-com.png',
    min_deposit: 20,
    trading_fee: 0.6,
    regulations: 'FCA, CySEC, ASIC',
    supported_assets: ['Forex', 'Stocks', 'Crypto', 'Indices'],
    country: 'UK',
    rating: 4.5,
    website_url: 'https://www.capital.com',
    max_leverage: '1:30',
    trading_platforms: 'Capital.com Platform, Capital.com Mobile, MT4',
    spread_from: '0.6 pips',
    headquarters: 'London, UK',
    year_founded: '2016'
  },
  {
    id: '91000000-0000-0000-0000-000000000510',
    name: 'Tradovate Futures',
    logo_url: '/images/brokers/tradovate-futures.png',
    min_deposit: 0,
    trading_fee: 0.85,
    regulations: 'CFTC, NFA',
    supported_assets: ['Futures'],
    country: 'USA',
    rating: 4.5,
    website_url: 'https://www.tradovate.com',
    max_leverage: '1:50',
    trading_platforms: 'Tradovate Platform, Tradovate Mobile, Tradovate API',
    spread_from: '$0.85 per contract',
    headquarters: 'Chicago, Illinois, USA',
    year_founded: '2014'
  },
  {
    id: '92000000-0000-0000-0000-000000000520',
    name: 'HotForex ECN',
    logo_url: '/images/brokers/hotforex-ecn.png',
    min_deposit: 50,
    trading_fee: 0.0,
    regulations: 'CySEC, FCA, DFSA',
    supported_assets: ['Forex', 'CFDs', 'Crypto'],
    country: 'Cyprus',
    rating: 4.5,
    website_url: 'https://www.hotforex.com',
    max_leverage: '1:500',
    trading_platforms: 'MT4, MT5, HotForex Mobile',
    spread_from: '0.0 pips',
    headquarters: 'Limassol, Cyprus',
    year_founded: '2010'
  },
  {
    id: '93000000-0000-0000-0000-000000000530',
    name: 'Forex.com',
    logo_url: '/images/brokers/forex-com.png',
    min_deposit: 100,
    trading_fee: 1.2,
    regulations: 'CFTC, NFA, FCA',
    supported_assets: ['Forex', 'CFDs', 'Indices'],
    country: 'USA',
    rating: 4.4,
    website_url: 'https://www.forex.com',
    max_leverage: '1:50',
    trading_platforms: 'MT4, MT5, Forex.com Platform, Forex.com Mobile',
    spread_from: '1.2 pips',
    headquarters: 'Bedminster, New Jersey, USA',
    year_founded: '1999'
  },
  {
    id: '94000000-0000-0000-0000-000000000540',
    name: 'HYCM',
    logo_url: '/images/brokers/hycm.png',
    min_deposit: 100,
    trading_fee: 1.0,
    regulations: 'FCA, CySEC, DFSA',
    supported_assets: ['Forex', 'CFDs', 'Commodities'],
    country: 'UK',
    rating: 4.4,
    website_url: 'https://www.hycm.com',
    max_leverage: '1:30',
    trading_platforms: 'MT4, MT5, HYCM Platform',
    spread_from: '1.0 pips',
    headquarters: 'London, UK',
    year_founded: '1977'
  },
  {
    id: '95000000-0000-0000-0000-000000000550',
    name: 'Monex',
    logo_url: '/images/brokers/monex.png',
    min_deposit: 0,
    trading_fee: 0.0,
    regulations: 'JFSA, FSA',
    supported_assets: ['Stocks', 'Forex', 'Futures'],
    country: 'Japan',
    rating: 4.4,
    website_url: 'https://www.monex.com',
    max_leverage: '1:25',
    trading_platforms: 'Monex Platform, Monex Mobile, Monex Pro',
    spread_from: 'Competitive fees',
    headquarters: 'Tokyo, Japan',
    year_founded: '1999'
  },
  {
    id: '96000000-0000-0000-0000-000000000560',
    name: 'FXTM',
    logo_url: '/images/brokers/fxtm.png',
    min_deposit: 200,
    trading_fee: 1.3,
    regulations: 'CySEC, FCA, FSCA',
    supported_assets: ['Forex', 'CFDs', 'Stocks'],
    country: 'Cyprus',
    rating: 4.4,
    website_url: 'https://www.forextime.com',
    max_leverage: '1:30',
    trading_platforms: 'MT4, MT5, FXTM Mobile',
    spread_from: '1.3 pips',
    headquarters: 'Limassol, Cyprus',
    year_founded: '2011'
  },
  {
    id: '97000000-0000-0000-0000-000000000570',
    name: 'Axi',
    logo_url: '/images/brokers/axi.png',
    min_deposit: 1,
    trading_fee: 0.0,
    regulations: 'ASIC, FCA, DFSA',
    supported_assets: ['Forex', 'CFDs', 'Stocks'],
    country: 'Australia',
    rating: 4.4,
    website_url: 'https://www.axi.com',
    max_leverage: '1:30',
    trading_platforms: 'MT4, MT5, Axi Mobile',
    spread_from: '0.0 pips',
    headquarters: 'Sydney, Australia',
    year_founded: '2007'
  },
  {
    id: '98000000-0000-0000-0000-000000000580',
    name: 'Huobi',
    logo_url: '/images/brokers/huobi.png',
    min_deposit: 0,
    trading_fee: 0.2,
    regulations: 'Various jurisdictions, Compliance programs',
    supported_assets: ['Bitcoin', 'Ethereum', 'Altcoins'],
    country: 'Seychelles',
    rating: 4.4,
    website_url: 'https://www.huobi.com',
    max_leverage: '1:10',
    trading_platforms: 'Huobi Platform, Huobi Pro, Huobi Mobile',
    spread_from: '0.2% trading fee',
    headquarters: 'Seychelles',
    year_founded: '2013'
  },
  {
    id: '99000000-0000-0000-0000-000000000590',
    name: 'ATFX',
    logo_url: '/images/brokers/atfx.png',
    min_deposit: 100,
    trading_fee: 1.8,
    regulations: 'FCA, CySEC, ASIC',
    supported_assets: ['Forex', 'CFDs', 'Crypto'],
    country: 'UK',
    rating: 4.4,
    website_url: 'https://www.atfx.com',
    max_leverage: '1:30',
    trading_platforms: 'MT4, MT5, ATFX Mobile',
    spread_from: '1.8 pips',
    headquarters: 'London, UK',
    year_founded: '2017'
  }
];

async function addBatch9Brokers() {
  try {
    console.log('Adding Batch 9 brokers to database...');

    for (const broker of batch9Brokers) {
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

    console.log('\n🎉 Batch 9 brokers processing complete!');

  } catch (error) {
    console.error('Error:', error);
  }
}

addBatch9Brokers();
