import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://imndrogsolkrupmuzikd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltbmRyb2dzb2xrcnVwbXV6aWtkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzI4NjkyMiwiZXhwIjoyMDU4ODYyOTIyfQ.HfXVNcxF7sqOsaclotpm8vR8lF_tGk-WGZvQik-8GRM';

const supabase = createClient(supabaseUrl, supabaseKey);

const batch7Brokers = [
  {
    id: 'e0000000-0000-0000-0000-000000000300',
    name: 'Tickmill',
    logo_url: '/images/brokers/tickmill.png',
    min_deposit: 100,
    trading_fee: 0.0,
    regulations: 'FCA, CySEC, FSCA',
    supported_assets: ['Forex', 'Indices', 'Commodities'],
    country: 'UK',
    rating: 4.5,
    website_url: 'https://www.tickmill.com',
    max_leverage: '1:30',
    trading_platforms: 'MT4, MT5, Tickmill WebTrader',
    spread_from: '0.0 pips',
    headquarters: 'London, UK',
    year_founded: '2014'
  },
  {
    id: 'e1000000-0000-0000-0000-000000000310',
    name: 'KuCoin',
    logo_url: '/images/brokers/kucoin.png',
    min_deposit: 0,
    trading_fee: 0.1,
    regulations: 'Various jurisdictions, Compliance programs',
    supported_assets: ['Bitcoin', 'Ethereum', 'Altcoins'],
    country: 'Seychelles',
    rating: 4.5,
    website_url: 'https://www.kucoin.com',
    max_leverage: '1:10',
    trading_platforms: 'KuCoin Platform, KuCoin Pro, KuCoin Mobile',
    spread_from: '0.1% trading fee',
    headquarters: 'Seychelles',
    year_founded: '2017'
  },
  {
    id: 'e2000000-0000-0000-0000-000000000320',
    name: 'OKX',
    logo_url: '/images/brokers/okx.png',
    min_deposit: 0,
    trading_fee: 0.1,
    regulations: 'Various jurisdictions, Compliance programs',
    supported_assets: ['Bitcoin', 'Ethereum', 'Altcoins'],
    country: 'Seychelles',
    rating: 4.5,
    website_url: 'https://www.okx.com',
    max_leverage: '1:125',
    trading_platforms: 'OKX Platform, OKX Pro, OKX Mobile',
    spread_from: '0.1% trading fee',
    headquarters: 'Seychelles',
    year_founded: '2017'
  },
  {
    id: 'e3000000-0000-0000-0000-000000000330',
    name: 'Bitfinex',
    logo_url: '/images/brokers/bitfinex.png',
    min_deposit: 0,
    trading_fee: 0.1,
    regulations: 'Various jurisdictions, Compliance programs',
    supported_assets: ['Bitcoin', 'Ethereum', 'Altcoins'],
    country: 'Hong Kong',
    rating: 4.5,
    website_url: 'https://www.bitfinex.com',
    max_leverage: '1:10',
    trading_platforms: 'Bitfinex Platform, Bitfinex Mobile, Bitfinex API',
    spread_from: '0.1% trading fee',
    headquarters: 'Hong Kong',
    year_founded: '2012'
  },
  {
    id: 'e4000000-0000-0000-0000-000000000340',
    name: 'Bitstamp',
    logo_url: '/images/brokers/bitstamp.png',
    min_deposit: 0,
    trading_fee: 0.5,
    regulations: 'EU regulations, Luxembourg license',
    supported_assets: ['Bitcoin', 'Ethereum', 'Altcoins'],
    country: 'Luxembourg',
    rating: 4.5,
    website_url: 'https://www.bitstamp.net',
    max_leverage: '1:3',
    trading_platforms: 'Bitstamp Platform, Bitstamp Mobile, Bitstamp API',
    spread_from: '0.5% trading fee',
    headquarters: 'Luxembourg',
    year_founded: '2011'
  },
  {
    id: 'e5000000-0000-0000-0000-000000000350',
    name: 'Tastyworks',
    logo_url: '/images/brokers/tastyworks.png',
    min_deposit: 0,
    trading_fee: 0.0,
    regulations: 'SEC, FINRA, SIPC',
    supported_assets: ['Stocks', 'Options', 'Futures'],
    country: 'USA',
    rating: 4.5,
    website_url: 'https://www.tastyworks.com',
    max_leverage: '1:4',
    trading_platforms: 'Tastyworks Desktop, Tastyworks Mobile, Tastyworks Web',
    spread_from: '$0 commissions',
    headquarters: 'Chicago, Illinois, USA',
    year_founded: '2017'
  },
  {
    id: 'e6000000-0000-0000-0000-000000000360',
    name: 'TradeStation',
    logo_url: '/images/brokers/tradestation.png',
    min_deposit: 2000,
    trading_fee: 0.0,
    regulations: 'SEC, FINRA, SIPC',
    supported_assets: ['Stocks', 'Options', 'Futures'],
    country: 'USA',
    rating: 4.5,
    website_url: 'https://www.tradestation.com',
    max_leverage: '1:4',
    trading_platforms: 'TradeStation Desktop, TradeStation Mobile, TradeStation Web',
    spread_from: '$0 commissions',
    headquarters: 'Plantation, Florida, USA',
    year_founded: '1982'
  },
  {
    id: 'e7000000-0000-0000-0000-000000000370',
    name: 'Degiro',
    logo_url: '/images/brokers/degiro.png',
    min_deposit: 0,
    trading_fee: 2.0,
    regulations: 'AFM, DNB, BaFin',
    supported_assets: ['Stocks', 'ETFs', 'Options'],
    country: 'Netherlands',
    rating: 4.5,
    website_url: 'https://www.degiro.eu',
    max_leverage: '1:5',
    trading_platforms: 'Degiro Platform, Degiro Mobile, Degiro Web',
    spread_from: 'Low fees',
    headquarters: 'Amsterdam, Netherlands',
    year_founded: '2008'
  },
  {
    id: 'e8000000-0000-0000-0000-000000000380',
    name: 'CMC Markets',
    logo_url: '/images/brokers/cmc-markets.png',
    min_deposit: 0,
    trading_fee: 0.7,
    regulations: 'FCA, ASIC, MAS',
    supported_assets: ['Forex', 'CFDs', 'Stocks'],
    country: 'UK',
    rating: 4.5,
    website_url: 'https://www.cmcmarkets.com',
    max_leverage: '1:30',
    trading_platforms: 'CMC Markets Platform, MT4, CMC Mobile',
    spread_from: '0.7 pips',
    headquarters: 'London, UK',
    year_founded: '1989'
  },
  {
    id: 'e9000000-0000-0000-0000-000000000390',
    name: 'Tradovate',
    logo_url: '/images/brokers/tradovate.png',
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
  }
];

async function addBatch7Brokers() {
  try {
    console.log('Adding Batch 7 brokers to database...');

    for (const broker of batch7Brokers) {
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

    console.log('\n🎉 Batch 7 brokers processing complete!');

  } catch (error) {
    console.error('Error:', error);
  }
}

addBatch7Brokers();
