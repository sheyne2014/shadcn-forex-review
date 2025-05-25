import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://imndrogsolkrupmuzikd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltbmRyb2dzb2xrcnVwbXV6aWtkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzI4NjkyMiwiZXhwIjoyMDU4ODYyOTIyfQ.HfXVNcxF7sqOsaclotpm8vR8lF_tGk-WGZvQik-8GRM';

const supabase = createClient(supabaseUrl, supabaseKey);

const batch10Brokers = [
  {
    id: 'a0000000-0000-0000-0000-000000000600',
    name: 'FXOpen',
    logo_url: '/images/brokers/fxopen.png',
    min_deposit: 1,
    trading_fee: 0.0,
    regulations: 'FCA, CySEC, ASIC',
    supported_assets: ['Forex', 'CFDs', 'Crypto'],
    country: 'UK',
    rating: 4.4,
    website_url: 'https://www.fxopen.com',
    max_leverage: '1:500',
    trading_platforms: 'MT4, MT5, FXOpen Platform',
    spread_from: '0.0 pips',
    headquarters: 'London, UK',
    year_founded: '2005'
  },
  {
    id: 'a1000000-0000-0000-0000-000000000610',
    name: 'Dukascopy',
    logo_url: '/images/brokers/dukascopy.png',
    min_deposit: 100,
    trading_fee: 0.1,
    regulations: 'FINMA, JFSC',
    supported_assets: ['Forex', 'CFDs', 'Cryptocurrencies'],
    country: 'Switzerland',
    rating: 4.4,
    website_url: 'https://www.dukascopy.com',
    max_leverage: '1:100',
    trading_platforms: 'JForex, MT4, Dukascopy Mobile',
    spread_from: '0.1 pips',
    headquarters: 'Geneva, Switzerland',
    year_founded: '1998'
  },
  {
    id: 'a2000000-0000-0000-0000-000000000620',
    name: 'BlackBull Markets',
    logo_url: '/images/brokers/blackbull-markets.png',
    min_deposit: 10,
    trading_fee: 0.0,
    regulations: 'FMA, ASIC',
    supported_assets: ['Forex', 'CFDs', 'Crypto'],
    country: 'New Zealand',
    rating: 4.4,
    website_url: 'https://www.blackbull.com',
    max_leverage: '1:500',
    trading_platforms: 'MT4, MT5, BlackBull Mobile',
    spread_from: '0.0 pips',
    headquarters: 'Auckland, New Zealand',
    year_founded: '2014'
  },
  {
    id: 'a3000000-0000-0000-0000-000000000630',
    name: 'Merrill Edge',
    logo_url: '/images/brokers/merrill-edge.png',
    min_deposit: 0,
    trading_fee: 0.0,
    regulations: 'SEC, FINRA, SIPC',
    supported_assets: ['Stocks', 'ETFs', 'Options'],
    country: 'USA',
    rating: 4.4,
    website_url: 'https://www.merrilledge.com',
    max_leverage: '1:4',
    trading_platforms: 'Merrill Edge Platform, Merrill Edge Mobile',
    spread_from: '$0 commissions',
    headquarters: 'New York, USA',
    year_founded: '2010'
  },
  {
    id: 'a4000000-0000-0000-0000-000000000640',
    name: 'Trading 212',
    logo_url: '/images/brokers/trading-212.png',
    min_deposit: 1,
    trading_fee: 0.0,
    regulations: 'FCA, CySEC',
    supported_assets: ['Stocks', 'ETFs', 'CFDs'],
    country: 'UK',
    rating: 4.4,
    website_url: 'https://www.trading212.com',
    max_leverage: '1:30',
    trading_platforms: 'Trading 212 Platform, Trading 212 Mobile',
    spread_from: '$0 commissions',
    headquarters: 'London, UK',
    year_founded: '2004'
  },
  {
    id: 'a5000000-0000-0000-0000-000000000650',
    name: 'M1 Finance',
    logo_url: '/images/brokers/m1-finance.png',
    min_deposit: 100,
    trading_fee: 0.0,
    regulations: 'SEC, FINRA, SIPC',
    supported_assets: ['Stocks', 'ETFs'],
    country: 'USA',
    rating: 4.4,
    website_url: 'https://www.m1finance.com',
    max_leverage: '1:2',
    trading_platforms: 'M1 Finance Platform, M1 Finance Mobile',
    spread_from: '$0 commissions',
    headquarters: 'Chicago, Illinois, USA',
    year_founded: '2015'
  },
  {
    id: 'a6000000-0000-0000-0000-000000000660',
    name: 'Kotak Securities',
    logo_url: '/images/brokers/kotak-securities.png',
    min_deposit: 0,
    trading_fee: 0.0,
    regulations: 'SEBI, NSE, BSE',
    supported_assets: ['Stocks', 'ETFs', 'Mutual Funds'],
    country: 'India',
    rating: 4.4,
    website_url: 'https://www.kotaksecurities.com',
    max_leverage: '1:5',
    trading_platforms: 'Kotak Platform, Kotak Mobile, Kotak Pro',
    spread_from: 'Low brokerage',
    headquarters: 'Mumbai, India',
    year_founded: '1994'
  },
  {
    id: 'a7000000-0000-0000-0000-000000000670',
    name: 'Optimus Futures',
    logo_url: '/images/brokers/optimus-futures.png',
    min_deposit: 500,
    trading_fee: 0.85,
    regulations: 'CFTC, NFA',
    supported_assets: ['Futures'],
    country: 'USA',
    rating: 4.4,
    website_url: 'https://www.optimusfutures.com',
    max_leverage: '1:50',
    trading_platforms: 'NinjaTrader, Sierra Chart, TradingView',
    spread_from: '$0.85 per contract',
    headquarters: 'Chicago, Illinois, USA',
    year_founded: '2005'
  },
  {
    id: 'a8000000-0000-0000-0000-000000000680',
    name: 'FXCM',
    logo_url: '/images/brokers/fxcm.png',
    min_deposit: 50,
    trading_fee: 1.2,
    regulations: 'FCA, ASIC, FSCA',
    supported_assets: ['Forex', 'CFDs'],
    country: 'UK',
    rating: 4.3,
    website_url: 'https://www.fxcm.com',
    max_leverage: '1:30',
    trading_platforms: 'Trading Station, MT4, FXCM Mobile',
    spread_from: '1.2 pips',
    headquarters: 'London, UK',
    year_founded: '1999'
  },
  {
    id: 'a9000000-0000-0000-0000-000000000690',
    name: 'ThinkMarkets',
    logo_url: '/images/brokers/thinkmarkets.png',
    min_deposit: 250,
    trading_fee: 0.4,
    regulations: 'FCA, ASIC, FSCA',
    supported_assets: ['Forex', 'Indices', 'Commodities'],
    country: 'UK',
    rating: 4.3,
    website_url: 'https://www.thinkmarkets.com',
    max_leverage: '1:30',
    trading_platforms: 'ThinkTrader, MT4, MT5',
    spread_from: '0.4 pips',
    headquarters: 'London, UK',
    year_founded: '2010'
  }
];

async function addBatch10Brokers() {
  try {
    console.log('Adding Batch 10 brokers to database...');

    for (const broker of batch10Brokers) {
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

    console.log('\n🎉 Batch 10 brokers processing complete!');

  } catch (error) {
    console.error('Error:', error);
  }
}

addBatch10Brokers();
