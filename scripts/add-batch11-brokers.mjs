import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://imndrogsolkrupmuzikd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltbmRyb2dzb2xrcnVwbXV6aWtkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzI4NjkyMiwiZXhwIjoyMDU4ODYyOTIyfQ.HfXVNcxF7sqOsaclotpm8vR8lF_tGk-WGZvQik-8GRM';

const supabase = createClient(supabaseUrl, supabaseKey);

const batch11Brokers = [
  {
    id: 'b0000000-0000-0000-0000-000000000700',
    name: 'AMarkets',
    logo_url: '/images/brokers/amarkets.png',
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
    id: 'b1000000-0000-0000-0000-000000000710',
    name: 'FTX.US',
    logo_url: '/images/brokers/ftxus.png',
    min_deposit: 0,
    trading_fee: 0.1,
    regulations: 'FinCEN, State Licenses',
    supported_assets: ['Bitcoin', 'Ethereum', 'Altcoins'],
    country: 'USA',
    rating: 4.3,
    website_url: 'https://ftx.us',
    max_leverage: '1:20',
    trading_platforms: 'FTX.US Platform, FTX.US Mobile, FTX.US Pro',
    spread_from: '0.1% trading fee',
    headquarters: 'Miami, Florida, USA',
    year_founded: '2020'
  },
  {
    id: 'b2000000-0000-0000-0000-000000000720',
    name: 'OCTA',
    logo_url: '/images/brokers/octa.png',
    min_deposit: 25,
    trading_fee: 0.6,
    regulations: 'SVGFSA',
    supported_assets: ['Forex', 'Crypto', 'Indices'],
    country: 'St. Vincent',
    rating: 4.3,
    website_url: 'https://www.octa.com',
    max_leverage: '1:500',
    trading_platforms: 'MT4, MT5, OCTA Mobile',
    spread_from: '0.6 pips',
    headquarters: 'Kingstown, St. Vincent',
    year_founded: '2011'
  },
  {
    id: 'b3000000-0000-0000-0000-000000000730',
    name: 'FBS',
    logo_url: '/images/brokers/fbs.png',
    min_deposit: 5,
    trading_fee: 0.5,
    regulations: 'IFSC, CySEC',
    supported_assets: ['Forex', 'CFDs', 'Crypto'],
    country: 'Belize',
    rating: 4.3,
    website_url: 'https://www.fbs.com',
    max_leverage: '1:3000',
    trading_platforms: 'MT4, MT5, FBS Mobile',
    spread_from: '0.5 pips',
    headquarters: 'Belize City, Belize',
    year_founded: '2009'
  },
  {
    id: 'b4000000-0000-0000-0000-000000000740',
    name: 'GO Markets',
    logo_url: '/images/brokers/go-markets.png',
    min_deposit: 200,
    trading_fee: 0.0,
    regulations: 'ASIC, VFSC',
    supported_assets: ['Forex', 'CFDs', 'Crypto'],
    country: 'Australia',
    rating: 4.3,
    website_url: 'https://www.gomarkets.com',
    max_leverage: '1:500',
    trading_platforms: 'MT4, MT5, GO Markets Mobile',
    spread_from: '0.0 pips',
    headquarters: 'Melbourne, Australia',
    year_founded: '2006'
  },
  {
    id: 'b5000000-0000-0000-0000-000000000750',
    name: 'HFM',
    logo_url: '/images/brokers/hfm.png',
    min_deposit: 5,
    trading_fee: 0.0,
    regulations: 'CySEC, DFSA, FSCA',
    supported_assets: ['Forex', 'CFDs', 'Crypto'],
    country: 'Cyprus',
    rating: 4.3,
    website_url: 'https://www.hfm.com',
    max_leverage: '1:2000',
    trading_platforms: 'MT4, MT5, HFM Mobile',
    spread_from: '0.0 pips',
    headquarters: 'Limassol, Cyprus',
    year_founded: '2010'
  },
  {
    id: 'b6000000-0000-0000-0000-000000000760',
    name: 'Moneta Markets',
    logo_url: '/images/brokers/moneta-markets.png',
    min_deposit: 50,
    trading_fee: 0.0,
    regulations: 'ASIC, VFSC',
    supported_assets: ['Forex', 'CFDs', 'Crypto'],
    country: 'Australia',
    rating: 4.3,
    website_url: 'https://www.monetamarkets.com',
    max_leverage: '1:500',
    trading_platforms: 'MT4, MT5, Moneta Mobile',
    spread_from: '0.0 pips',
    headquarters: 'Sydney, Australia',
    year_founded: '2018'
  },
  {
    id: 'b7000000-0000-0000-0000-000000000770',
    name: 'Liquid',
    logo_url: '/images/brokers/liquid.png',
    min_deposit: 0,
    trading_fee: 0.1,
    regulations: 'JFSA, FSA',
    supported_assets: ['Bitcoin', 'Ethereum', 'Altcoins'],
    country: 'Japan',
    rating: 4.3,
    website_url: 'https://www.liquid.com',
    max_leverage: '1:4',
    trading_platforms: 'Liquid Platform, Liquid Mobile, Liquid Pro',
    spread_from: '0.1% trading fee',
    headquarters: 'Tokyo, Japan',
    year_founded: '2014'
  },
  {
    id: 'b8000000-0000-0000-0000-000000000780',
    name: 'Phemex',
    logo_url: '/images/brokers/phemex.png',
    min_deposit: 0,
    trading_fee: 0.075,
    regulations: 'Various jurisdictions, Compliance programs',
    supported_assets: ['Bitcoin', 'Ethereum', 'Altcoins'],
    country: 'Singapore',
    rating: 4.3,
    website_url: 'https://www.phemex.com',
    max_leverage: '1:100',
    trading_platforms: 'Phemex Platform, Phemex Mobile, Phemex API',
    spread_from: '0.075% trading fee',
    headquarters: 'Singapore',
    year_founded: '2019'
  },
  {
    id: 'b9000000-0000-0000-0000-000000000790',
    name: 'FxPrimus',
    logo_url: '/images/brokers/fxprimus.png',
    min_deposit: 100,
    trading_fee: 0.0,
    regulations: 'CySEC, VFSC',
    supported_assets: ['Forex', 'CFDs', 'Crypto'],
    country: 'Cyprus',
    rating: 4.3,
    website_url: 'https://www.fxprimus.com',
    max_leverage: '1:1000',
    trading_platforms: 'MT4, MT5, FxPrimus Mobile',
    spread_from: '0.0 pips',
    headquarters: 'Limassol, Cyprus',
    year_founded: '2009'
  }
];

async function addBatch11Brokers() {
  try {
    console.log('Adding Batch 11 brokers to database...');

    for (const broker of batch11Brokers) {
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

    console.log('\n🎉 Batch 11 brokers processing complete!');

  } catch (error) {
    console.error('Error:', error);
  }
}

addBatch11Brokers();
