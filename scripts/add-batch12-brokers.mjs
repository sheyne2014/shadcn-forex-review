import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://imndrogsolkrupmuzikd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltbmRyb2dzb2xrcnVwbXV6aWtkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzI4NjkyMiwiZXhwIjoyMDU4ODYyOTIyfQ.HfXVNcxF7sqOsaclotpm8vR8lF_tGk-WGZvQik-8GRM';

const supabase = createClient(supabaseUrl, supabaseKey);

const batch13Brokers = [
  {
    id: 'c0000000-0000-0000-0000-000000000800',
    name: 'Webull',
    logo_url: '/images/brokers/webull.png',
    min_deposit: 0,
    trading_fee: 0.0,
    regulations: 'SEC, FINRA, SIPC',
    supported_assets: ['Stocks', 'ETFs', 'Options'],
    country: 'USA',
    rating: 4.3,
    website_url: 'https://www.webull.com',
    max_leverage: '1:4',
    trading_platforms: 'Webull Platform, Webull Mobile, Webull Desktop',
    spread_from: '$0 commissions',
    headquarters: 'New York, USA',
    year_founded: '2017'
  },
  {
    id: 'c1000000-0000-0000-0000-000000000810',
    name: 'FXDD',
    logo_url: '/images/brokers/fxdd.png',
    min_deposit: 50,
    trading_fee: 0.8,
    regulations: 'MFSA, CySEC',
    supported_assets: ['Forex', 'CFDs'],
    country: 'Malta',
    rating: 4.3,
    website_url: 'https://www.fxdd.com',
    max_leverage: '1:400',
    trading_platforms: 'MT4, MT5, FXDD Mobile',
    spread_from: '0.8 pips',
    headquarters: 'Sliema, Malta',
    year_founded: '2002'
  },
  {
    id: 'c2000000-0000-0000-0000-000000000820',
    name: 'Lightspeed',
    logo_url: '/images/brokers/lightspeed.png',
    min_deposit: 10000,
    trading_fee: 0.45,
    regulations: 'SEC, FINRA, SIPC',
    supported_assets: ['Stocks', 'Options', 'Futures'],
    country: 'USA',
    rating: 4.3,
    website_url: 'https://www.lightspeed.com',
    max_leverage: '1:4',
    trading_platforms: 'Lightspeed Trader, Lightspeed Mobile, Sterling Trader',
    spread_from: '$0.45 per contract',
    headquarters: 'New York, USA',
    year_founded: '1999'
  },
  {
    id: 'c3000000-0000-0000-0000-000000000830',
    name: 'Dorman Trading',
    logo_url: '/images/brokers/dorman-trading.png',
    min_deposit: 2500,
    trading_fee: 1.50,
    regulations: 'CFTC, NFA',
    supported_assets: ['Futures', 'Options'],
    country: 'USA',
    rating: 4.3,
    website_url: 'https://www.dormantrading.com',
    max_leverage: '1:50',
    trading_platforms: 'CQG, TT Platform, Dorman Mobile',
    spread_from: '$1.50 per contract',
    headquarters: 'Chicago, Illinois, USA',
    year_founded: '1956'
  },
  {
    id: 'c4000000-0000-0000-0000-000000000840',
    name: 'Firstrade',
    logo_url: '/images/brokers/firstrade.png',
    min_deposit: 0,
    trading_fee: 0.0,
    regulations: 'SEC, FINRA, SIPC',
    supported_assets: ['Stocks', 'ETFs', 'Options'],
    country: 'USA',
    rating: 4.3,
    website_url: 'https://www.firstrade.com',
    max_leverage: '1:4',
    trading_platforms: 'Firstrade Platform, Firstrade Mobile',
    spread_from: '$0 commissions',
    headquarters: 'New York, USA',
    year_founded: '1985'
  },
  {
    id: 'c5000000-0000-0000-0000-000000000850',
    name: 'TradeZero',
    logo_url: '/images/brokers/tradezero.png',
    min_deposit: 500,
    trading_fee: 0.0,
    regulations: 'SEC, FINRA, SIPC',
    supported_assets: ['Stocks', 'ETFs', 'Options'],
    country: 'USA',
    rating: 4.3,
    website_url: 'https://www.tradezero.co',
    max_leverage: '1:6',
    trading_platforms: 'TradeZero Platform, TradeZero Mobile',
    spread_from: '$0 commissions',
    headquarters: 'New York, USA',
    year_founded: '2015'
  },
  {
    id: 'c6000000-0000-0000-0000-000000000860',
    name: 'AMarkets ECN',
    logo_url: '/images/brokers/amarkets-ecn.png',
    min_deposit: 100,
    trading_fee: 0.0,
    regulations: 'VFSC, FSC',
    supported_assets: ['Forex', 'CFDs', 'Crypto'],
    country: 'Saint Vincent',
    rating: 4.3,
    website_url: 'https://www.amarkets.com',
    max_leverage: '1:1000',
    trading_platforms: 'MT4, MT5, AMarkets Mobile',
    spread_from: '0.0 pips',
    headquarters: 'Kingstown, Saint Vincent',
    year_founded: '2007'
  },
  {
    id: 'c7000000-0000-0000-0000-000000000870',
    name: 'Windsor Brokers',
    logo_url: '/images/brokers/windsor-brokers.png',
    min_deposit: 100,
    trading_fee: 0.0,
    regulations: 'CySEC, BVIFSC',
    supported_assets: ['Forex', 'CFDs', 'Crypto'],
    country: 'Cyprus',
    rating: 4.2,
    website_url: 'https://www.windsorbrokers.com',
    max_leverage: '1:500',
    trading_platforms: 'MT4, MT5, Windsor Mobile',
    spread_from: '0.0 pips',
    headquarters: 'Limassol, Cyprus',
    year_founded: '1988'
  },
  {
    id: 'c8000000-0000-0000-0000-000000000880',
    name: 'Skilling',
    logo_url: '/images/brokers/skilling.png',
    min_deposit: 100,
    trading_fee: 0.1,
    regulations: 'CySEC, FSA',
    supported_assets: ['Forex', 'CFDs', 'Crypto'],
    country: 'Cyprus',
    rating: 4.2,
    website_url: 'https://www.skilling.com',
    max_leverage: '1:30',
    trading_platforms: 'Skilling Trader, MT4, Skilling Mobile',
    spread_from: '0.1 pips',
    headquarters: 'Limassol, Cyprus',
    year_founded: '2016'
  },
  {
    id: 'c9000000-0000-0000-0000-000000000890',
    name: 'Moomoo',
    logo_url: '/images/brokers/moomoo.png',
    min_deposit: 0,
    trading_fee: 0.0,
    regulations: 'SEC, FINRA, SIPC',
    supported_assets: ['Stocks', 'ETFs', 'Options'],
    country: 'USA',
    rating: 4.2,
    website_url: 'https://www.moomoo.com',
    max_leverage: '1:4',
    trading_platforms: 'Moomoo Platform, Moomoo Mobile',
    spread_from: '$0 commissions',
    headquarters: 'Palo Alto, California, USA',
    year_founded: '2018'
  }
];

async function addBatch12Brokers() {
  try {
    console.log('Adding Batch 12 brokers to database...');

    for (const broker of batch12Brokers) {
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

    console.log('\n🎉 Batch 12 brokers processing complete!');

  } catch (error) {
    console.error('Error:', error);
  }
}

addBatch12Brokers();
