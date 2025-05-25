import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://imndrogsolkrupmuzikd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltbmRyb2dzb2xrcnVwbXV6aWtkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzI4NjkyMiwiZXhwIjoyMDU4ODYyOTIyfQ.HfXVNcxF7sqOsaclotpm8vR8lF_tGk-WGZvQik-8GRM';

const supabase = createClient(supabaseUrl, supabaseKey);

const batch13Brokers = [
  {
    id: 'd0000000-0000-0000-0000-000000000900',
    name: 'Alpha Trading',
    logo_url: '/images/brokers/alpha-trading.png',
    min_deposit: 200,
    trading_fee: 0.8,
    regulations: 'ASIC, VFSC',
    supported_assets: ['Forex', 'Commodities', 'Indices'],
    country: 'Australia',
    rating: 4.2,
    website_url: 'https://www.alphatrading.com.au',
    max_leverage: '1:500',
    trading_platforms: 'MT4, MT5, Alpha Mobile',
    spread_from: '0.8 pips',
    headquarters: 'Sydney, Australia',
    year_founded: '2010'
  },
  {
    id: 'd1000000-0000-0000-0000-000000000910',
    name: 'Darwinex',
    logo_url: '/images/brokers/darwinex.png',
    min_deposit: 500,
    trading_fee: 0.7,
    regulations: 'FCA, CySEC',
    supported_assets: ['Forex', 'Indices', 'Commodities'],
    country: 'UK',
    rating: 4.2,
    website_url: 'https://www.darwinex.com',
    max_leverage: '1:200',
    trading_platforms: 'MT4, MT5, Darwinex Mobile',
    spread_from: '0.7 pips',
    headquarters: 'London, UK',
    year_founded: '2012'
  },
  {
    id: 'd2000000-0000-0000-0000-000000000920',
    name: 'FIBO Group',
    logo_url: '/images/brokers/fibo-group.png',
    min_deposit: 300,
    trading_fee: 0.9,
    regulations: 'CySEC, IFSC',
    supported_assets: ['Forex', 'Metals', 'Indices'],
    country: 'Cyprus',
    rating: 4.2,
    website_url: 'https://www.fibogroup.com',
    max_leverage: '1:1000',
    trading_platforms: 'MT4, MT5, FIBO Mobile',
    spread_from: '0.9 pips',
    headquarters: 'Limassol, Cyprus',
    year_founded: '1998'
  },
  {
    id: 'd3000000-0000-0000-0000-000000000930',
    name: 'BitMax',
    logo_url: '/images/brokers/bitmax.png',
    min_deposit: 0,
    trading_fee: 0.1,
    regulations: 'Various jurisdictions, Compliance programs',
    supported_assets: ['Bitcoin', 'Ethereum', 'Altcoins'],
    country: 'Singapore',
    rating: 4.2,
    website_url: 'https://www.bitmax.io',
    max_leverage: '1:100',
    trading_platforms: 'BitMax Platform, BitMax Mobile, BitMax API',
    spread_from: '0.1% trading fee',
    headquarters: 'Singapore',
    year_founded: '2018'
  },
  {
    id: 'd4000000-0000-0000-0000-000000000940',
    name: 'EightCap',
    logo_url: '/images/brokers/eightcap.png',
    min_deposit: 100,
    trading_fee: 0.0,
    regulations: 'ASIC, SCB',
    supported_assets: ['Forex', 'CFDs', 'Crypto'],
    country: 'Australia',
    rating: 4.2,
    website_url: 'https://www.eightcap.com',
    max_leverage: '1:500',
    trading_platforms: 'MT4, MT5, EightCap Mobile',
    spread_from: '0.0 pips',
    headquarters: 'Melbourne, Australia',
    year_founded: '2009'
  },
  {
    id: 'd5000000-0000-0000-0000-000000000950',
    name: 'FXFlat Pro',
    logo_url: '/images/brokers/fxflat-pro.png',
    min_deposit: 500,
    trading_fee: 0.0,
    regulations: 'BaFin, CySEC',
    supported_assets: ['Forex', 'CFDs', 'Crypto'],
    country: 'Germany',
    rating: 4.2,
    website_url: 'https://www.fxflat.com',
    max_leverage: '1:30',
    trading_platforms: 'MT4, MT5, FXFlat Mobile',
    spread_from: '0.0 pips',
    headquarters: 'Ratingen, Germany',
    year_founded: '2008'
  },
  {
    id: 'd6000000-0000-0000-0000-000000000960',
    name: 'BitMEX',
    logo_url: '/images/brokers/bitmex.png',
    min_deposit: 0,
    trading_fee: 0.075,
    regulations: 'Seychelles FSA, Compliance programs',
    supported_assets: ['Bitcoin', 'Ethereum', 'Altcoins'],
    country: 'Seychelles',
    rating: 4.2,
    website_url: 'https://www.bitmex.com',
    max_leverage: '1:100',
    trading_platforms: 'BitMEX Platform, BitMEX Mobile, BitMEX API',
    spread_from: '0.075% maker fee',
    headquarters: 'Victoria, Seychelles',
    year_founded: '2014'
  },
  {
    id: 'd7000000-0000-0000-0000-000000000970',
    name: 'SoFi Invest',
    logo_url: '/images/brokers/sofi-invest.png',
    min_deposit: 0,
    trading_fee: 0.0,
    regulations: 'SEC, FINRA, SIPC',
    supported_assets: ['Stocks', 'ETFs', 'Crypto'],
    country: 'USA',
    rating: 4.2,
    website_url: 'https://www.sofi.com/invest',
    max_leverage: '1:4',
    trading_platforms: 'SoFi Invest App, SoFi Web Platform',
    spread_from: '$0 commissions',
    headquarters: 'San Francisco, California, USA',
    year_founded: '2011'
  },
  {
    id: 'd8000000-0000-0000-0000-000000000980',
    name: 'FXFlat',
    logo_url: '/images/brokers/fxflat.png',
    min_deposit: 500,
    trading_fee: 1.2,
    regulations: 'BaFin, CySEC',
    supported_assets: ['Forex', 'CFDs', 'Crypto'],
    country: 'Germany',
    rating: 4.2,
    website_url: 'https://www.fxflat.com',
    max_leverage: '1:30',
    trading_platforms: 'MT4, MT5, FXFlat Trader',
    spread_from: '1.2 pips',
    headquarters: 'Ratingen, Germany',
    year_founded: '2008'
  },
  {
    id: 'd9000000-0000-0000-0000-000000000990',
    name: 'Vantagepoint',
    logo_url: '/images/brokers/vantagepoint.png',
    min_deposit: 25,
    trading_fee: 1.0,
    regulations: 'ASIC, VFSC',
    supported_assets: ['Forex', 'CFDs', 'Crypto'],
    country: 'Australia',
    rating: 4.2,
    website_url: 'https://www.vantagepointtrading.com',
    max_leverage: '1:500',
    trading_platforms: 'MT4, MT5, Vantagepoint Mobile',
    spread_from: '1.0 pips',
    headquarters: 'Sydney, Australia',
    year_founded: '2009'
  }
];

async function addBatch13Brokers() {
  try {
    console.log('Adding Batch 13 brokers to database...');

    for (const broker of batch13Brokers) {
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

    console.log('\n🎉 Batch 13 brokers processing complete!');

  } catch (error) {
    console.error('Error:', error);
  }
}

addBatch13Brokers();
