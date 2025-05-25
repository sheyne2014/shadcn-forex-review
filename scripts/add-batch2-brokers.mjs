import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://imndrogsolkrupmuzikd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltbmRyb2dzb2xrcnVwbXV6aWtkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzI4NjkyMiwiZXhwIjoyMDU4ODYyOTIyfQ.HfXVNcxF7sqOsaclotpm8vR8lF_tGk-WGZvQik-8GRM';

const supabase = createClient(supabaseUrl, supabaseKey);

const batch2Brokers = [
  {
    id: 'b7000000-0000-0000-0000-000000000070',
    name: 'Plus500',
    logo_url: '/images/brokers/plus500.png',
    min_deposit: 100,
    trading_fee: 0.0,
    regulations: 'FCA, CySEC, ASIC, MAS',
    supported_assets: ['Forex', 'CFDs', 'Crypto'],
    country: 'Israel',
    rating: 4.4,
    website_url: 'https://www.plus500.com',
    max_leverage: '1:30',
    trading_platforms: 'Plus500 WebTrader, Plus500 Mobile',
    spread_from: 'Variable spreads',
    headquarters: 'Haifa, Israel',
    year_founded: '2008'
  },
  {
    id: 'b8000000-0000-0000-0000-000000000080',
    name: 'Capital.com',
    logo_url: '/images/brokers/capital-com.png',
    min_deposit: 20,
    trading_fee: 0.6,
    regulations: 'FCA, CySEC, ASIC, NBRB',
    supported_assets: ['Forex', 'Stocks', 'Crypto', 'Indices'],
    country: 'UK',
    rating: 4.5,
    website_url: 'https://www.capital.com',
    max_leverage: '1:30',
    trading_platforms: 'Capital.com Platform, MT4, TradingView',
    spread_from: '0.6 pips',
    headquarters: 'London, UK',
    year_founded: '2016'
  },
  {
    id: 'b9000000-0000-0000-0000-000000000090',
    name: 'Saxo Bank',
    logo_url: '/images/brokers/saxo-bank.png',
    min_deposit: 10000,
    trading_fee: 0.4,
    regulations: 'FCA, DFSA, FINMA, ASIC',
    supported_assets: ['Forex', 'Stocks', 'CFDs'],
    country: 'Denmark',
    rating: 4.6,
    website_url: 'https://www.saxobank.com',
    max_leverage: '1:200',
    trading_platforms: 'SaxoTraderGO, SaxoTraderPRO',
    spread_from: '0.4 pips',
    headquarters: 'Copenhagen, Denmark',
    year_founded: '1992'
  },
  {
    id: 'ba000000-0000-0000-0000-0000000000a0',
    name: 'XTB',
    logo_url: '/images/brokers/xtb.png',
    min_deposit: 0,
    trading_fee: 0.8,
    regulations: 'FCA, CySEC, KNF, IFSC',
    supported_assets: ['Forex', 'CFDs', 'Crypto'],
    country: 'Poland',
    rating: 4.5,
    website_url: 'https://www.xtb.com',
    max_leverage: '1:30',
    trading_platforms: 'xStation 5, MT4',
    spread_from: '0.8 pips',
    headquarters: 'Warsaw, Poland',
    year_founded: '2002'
  },
  {
    id: 'bb000000-0000-0000-0000-0000000000b0',
    name: 'Binance',
    logo_url: '/images/brokers/binance.png',
    min_deposit: 10,
    trading_fee: 0.1,
    regulations: 'Various jurisdictions',
    supported_assets: ['Bitcoin', 'Ethereum', 'Altcoins'],
    country: 'Global',
    rating: 4.3,
    website_url: 'https://www.binance.com',
    max_leverage: '1:125',
    trading_platforms: 'Binance Platform, Binance Pro, Binance Mobile',
    spread_from: '0.1% trading fee',
    headquarters: 'Global',
    year_founded: '2017'
  }
];

async function addBatch2Brokers() {
  try {
    console.log('Adding Batch 2 brokers to database...');

    for (const broker of batch2Brokers) {
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

    console.log('\n🎉 Batch 2 brokers processing complete!');

  } catch (error) {
    console.error('Error:', error);
  }
}

addBatch2Brokers();
